"use server";

import { authOptions } from "@/auth/authOption";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createGuestUser } from "./createGuestUser";
import { ERROR_MESSAGES } from "@/lib/message";

type CreateRankingResult =
    | { success: true; rankId: number }
    | { success: false; message: string };

export async function createRanking(zodiacSign: string): Promise<CreateRankingResult> {
    try {
        let userId: string | null = null;
        const session = await getServerSession(authOptions);
        if (session) {
            userId = session.user.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });

            if (!user) {
                return {
                    success: false,
                    message: ERROR_MESSAGES.USER_NOT_FOUND,
                }
            }
        } else {
            userId = await createGuestUser(zodiacSign);
        }

        console.info("ランキングデータ作成開始");
        // 乱数生成（1〜12）
        const randomScore = Math.floor(Math.random() * 12) + 1;
        const createRankingResult = await prisma.ranking.create({
            data: {
                score: randomScore,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        console.info("ランキングデータ作成終了");

        return {
            success: true,
            rankId: createRankingResult.id,
        };
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