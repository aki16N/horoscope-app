"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { ERROR_MESSAGES } from "@/lib/message";

export async function createGuestUser(zodiacSign: string = "") {
    console.info("ゲストユーザーを作成");
    try {
        const cookieStore = await cookies();
        let guestToken = cookieStore.get("guestToken")?.value;
        if (guestToken) {
            const guestUser = await prisma.user.findUnique({
                where: {
                    guestToken,
                }
            })

            if (!guestUser) {
                throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
            }

            return guestUser.id;
        } else {
            guestToken = crypto.randomUUID();
            const guestUser = await prisma.user.create({
                data: {
                    isGuest: true,
                    guestToken,
                    zodiacSign
                },
            });

            cookieStore.set("guestToken", guestToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });

            return guestUser.id;
        }
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