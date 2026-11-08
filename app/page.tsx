import { getTodayFortune } from "@/actions/getTodayFortune";
import { authOptions } from "@/auth/authOption";
import MainForm from "@/components/MainForm";
import { ERROR_MESSAGES } from "@/lib/message";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Home() {
  try {
    let userId: string | null = null;
    let zodiacSignOfUser: string | null = null;
    const session = await getServerSession(authOptions);
    if (session) {
      userId = session.user.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        }
      });

      if (!user) {
        notFound();
      }

      zodiacSignOfUser = user.zodiacSign;

      // セッションがなかった場合、ゲストユーザーを取得
    } else {
      const cookieStore = await cookies();
      const guestToken = cookieStore.get("guestToken")?.value;
      if (guestToken) {
        const guestUser = await prisma.user.findUnique({
          where: {
            guestToken,
          }
        });

        if (!guestUser) {
          notFound();
        }

        userId = guestUser.id;
        zodiacSignOfUser = guestUser.zodiacSign;
      }
    }

    let todayRanking = null;
    if (userId) {
      todayRanking = await getTodayFortune(userId);
      if (!todayRanking) {
        notFound();
      }
    }

    return (
      <div>
        <MainForm todayRanking={todayRanking} zodiacSignOfUser={zodiacSignOfUser} />
      </div>
    );
  } catch (error) {
    // error.tsxに飛ばす
    throw error;
  }
}
