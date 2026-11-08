
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getJapanTodayRange() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);

  const year = Number(
    parts.find((part) => part.type === "year")?.value
  );
  const month = Number(
    parts.find((part) => part.type === "month")?.value
  );
  const day = Number(
    parts.find((part) => part.type === "day")?.value
  );

  // 日本時間の午前0時をUTCのDateに変換
  const start = new Date(
    Date.UTC(year, month - 1, day) - 9 * 60 * 60 * 1000
  );

  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  return { start, end };
}

export async function GET(request: Request) {
  // Cron専用のAPIを保護する
  const authHeader = request.headers.get("authorization");

  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  console.info("ダミーデータ作成");
  try {
    const { start, end } = getJapanTodayRange();

    // ダミーユーザーを取得
    const dummyUsers = await prisma.user.findMany({
      where: {
        isDummy: true,
        zodiacSign: { not: null },
      },
      select: {
        id: true,
        zodiacSign: true,
      },
    });

    let createdCount = 0;
    let skippedCount = 0;

    for (const user of dummyUsers) {
      // 今日の結果がすでにあるか確認
      const existingRanking = await prisma.ranking.findFirst({
        where: {
          userId: user.id,
          createdAt: {
            gte: start,
            lt: end,
          },
        },
        select: { id: true },
      });

      if (existingRanking) {
        skippedCount++;
        continue;
      }

      // 1〜12のランダムなスコアを作成
      const score = Math.floor(Math.random() * 12) + 1;

      await prisma.ranking.create({
        data: {
          userId: user.id,
          score,
        },
      });

      createdCount++;
    }

    return NextResponse.json({
      success: true,
      createdCount,
      skippedCount,
      totalDummyUsers: dummyUsers.length,
    });
  } catch (error) {
    console.error("Daily dummy fortune creation failed:");

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
