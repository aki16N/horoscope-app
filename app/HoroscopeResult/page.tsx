import HoroscopeResult from "@/components/HoroscopeResult";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AverageRanking } from "@/types/ranking";
import StarField from "@/components/StarField";
import { findUserId } from "@/lib/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "統計的星座占い｜占い結果",
  description: "星座ごとの統計データをもとに、あなたの今日の運勢ランキングを表示したページです。",
};

type Props = {
  searchParams: Promise<{ rankId?: string }>
}

export default async function RankResult({ searchParams }: Props) {
  const params = await searchParams;
  const rankId = Number(params.rankId);
  if (!params.rankId || isNaN(rankId)) {
    redirect("/");
  }

  const { userId, zodiacSign } = await findUserId();
  if (!userId && userId === "") {
    redirect("/");
  }

  const userRanking = await prisma.ranking.findFirst({
    where: {
      id: rankId,
      userId,
    },
  });
  if (!userRanking) {
    redirect("/");
  }

  const result = await prisma.$queryRaw<AverageRanking[]>
  `
  SELECT 
    u."zodiacSign",
    AVG(r.score) AS "averageScore",
    COUNT(*) AS "count"
  FROM "Ranking" r
  JOIN "User" u
    ON r."userId" = u.id
  WHERE
    u."zodiacSign" IS NOT NULL
    AND r."score" IS NOT NULL
    AND r."createdAt" >= (date_trunc('day', NOW() AT TIME ZONE 'Asia/Tokyo')
    AT TIME ZONE 'Asia/Tokyo'
    AT TIME ZONE 'UTC'
  )
  AND r."createdAt" < (
    (date_trunc('day', NOW() AT TIME ZONE 'Asia/Tokyo') + INTERVAL '1 day')
    AT TIME ZONE 'Asia/Tokyo'
    AT TIME ZONE 'UTC'
  )
  GROUP BY u."zodiacSign"
  ORDER BY AVG(r.score) ASC;
  `;

  const averageRankingOfZodiacSigns = result.map((item) => ({
    zodiacSign: item.zodiacSign,
    averageScore: Number(item.averageScore),
    count: Number(item.count),
  }));

  return (
    <main className={styles.page}>
      <StarField />

      <div className={styles.content}>
        <HoroscopeResult myRank={Number(userRanking.score)} zodiacSign={zodiacSign} averageRankings={averageRankingOfZodiacSigns} />
      </div>
    </main>
  );
}