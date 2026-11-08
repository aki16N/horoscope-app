"use server";

import { authOptions } from "@/auth/authOption";
import { ERROR_MESSAGES } from "@/lib/message";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { findGuestUser } from "./findGuestUser";

type UpdateRankingResult =
    | { success: true; rankId: number }
    | { success: false; message: string };

export async function updateRanking(rankId: number, newZodiacSign: string): Promise<UpdateRankingResult> {
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
            userId = await findGuestUser();
            if (!userId) {
                return {
                    success: false,
                    message: ERROR_MESSAGES.USER_NOT_FOUND,
                }
            }
        }
        
        // ユーザー情報の星座を更新する
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                zodiacSign: newZodiacSign,
            }
        })

        // ランキングの更新
        const randomScore = Math.floor(Math.random() * 12) + 1;
        const updateRankingResult = await prisma.ranking.update({
            where: {
                id: rankId,
            },
            data: {
                score: randomScore,
            }
        });

        return{
            success: true,
            rankId: updateRankingResult.id,
        };
    } catch (error) {
        throw error;
    }
}