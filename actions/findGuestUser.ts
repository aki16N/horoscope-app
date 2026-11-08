"use server"

import { ERROR_MESSAGES } from "@/lib/message";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function findGuestUser(): Promise<string | null> {
    try{
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
        }else{
            return null;
        }
    } catch(error){
        throw error;
    }
}
