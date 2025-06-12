import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: profile?.email },
                    include: { accounts: true }
                });

                if (existingUser && !existingUser.accounts.some((acc) => acc.provider === "google")) {
                    throw new Error("account_already_exist_with_that_email");
                }
            }
            return true;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        },
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: (user as unknown as User).id
                }
            }
            return token;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
};