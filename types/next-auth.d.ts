import { DefaultSelection } from "@prisma/client/runtime/client";
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSelection {
        user: {
            id: string;
            email: string;
            provider?: string;
            providerAccountId?: string;
        }
    }
}
