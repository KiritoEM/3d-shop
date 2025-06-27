import type { Awaitable, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";
import { compareData } from "./hash";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !(compareData(credentials.password, user.password!))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: credentials.email,
                    name: user.name
                }
            }
        }),
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
        signIn: `${process.env.NEXTAUTH_URL}/login`,
        error: `${process.env.NEXTAUTH_URL}/login`
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
};