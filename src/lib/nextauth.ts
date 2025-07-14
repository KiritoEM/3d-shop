import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { compareData } from "./hash";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (
                    !user ||
                    !compareData(credentials.password, user.password!)
                ) {
                    return null;
                }

                return {
                    id: user.id,
                    email: credentials.email,
                    name: user.name,
                    image: user.image ?? "",
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: profile?.email },
                    include: { accounts: true },
                });

                if (
                    existingUser &&
                    !existingUser.accounts.some(
                        (acc) => acc.provider === "google",
                    )
                ) {
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
                    id: token.id,
                },
            };
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                //when updating session in clien-side
                return {
                    ...token,
                    ...session.user,
                };
            }

            if (user) {
                return {
                    ...token,
                    id: (user as unknown as User).id,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};
