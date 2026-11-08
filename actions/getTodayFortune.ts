"use server";

import { getJapanTodayRange } from "@/lib/date";
import { prisma } from "@/lib/prisma";

export async function getTodayFortune(userId: string) {
    const { startOfToday, startOfTommorow } = getJapanTodayRange();

    const ranking = await prisma.ranking.findFirst({
        where: {
            userId,
            createdAt: {
                gte: startOfToday,
                lt: startOfTommorow,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return ranking;
}