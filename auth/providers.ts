import GithubProvider from "next-auth/providers/github";

export const authProviders = [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
]