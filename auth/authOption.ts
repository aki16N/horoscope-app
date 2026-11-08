import { NextAuthOptions } from "next-auth";
import { authProviders } from "./providers";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
    providers: authProviders,
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "database",
        maxAge: 60 * 60 * 24 * 30,  // 30日
        updateAge: 60 * 60 * 24,    // 1日
    },

    callbacks: {
        async session({ session, user}) {
            console.log(session)
            if(session.user){
                session.user.id = user.id;
            }
            return session
        },
    }
}