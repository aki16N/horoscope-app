import { authOptions } from "@/auth/authOption";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { ERROR_MESSAGES } from "./message";

export async function findUserId(): Promise<{ userId: string, zodiacSign: string | null }> {
  try {
    let userId: string = "";
    const session = await getServerSession(authOptions);
    if (session) {
      userId = session.user.id;
    } else {
      const cookieStore = await cookies();
      const guestToken = cookieStore.get("guestToken")?.value;

      // セッションもゲストユーザトークンもなければ、不正なクエリパラメータの変換とみなす
      if (!guestToken) {
        notFound();
      }

      const guestUser = await prisma.user.findUnique({
        where: {
          guestToken,
        }
      });

      if (!guestUser) {
        notFound();
      }

      userId = guestUser.id;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      }
    });
    if (!user) {
      notFound();
    }

    return { userId, zodiacSign: user.zodiacSign };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new Error(ERROR_MESSAGES.DATABASE_CONNECTION_FAILED);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          throw new Error(ERROR_MESSAGES.DUPLICATE_DATA);

        case "P2025":
          throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);

        default:
          throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
}