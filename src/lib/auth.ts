import GoogleProvider from "next-auth/providers/google";
import db from "../db/index";
import { Keypair } from "@solana/web3.js";

import { Session } from 'next-auth';

export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              
              newSession.user.uid = token.uid ?? ""; // removed ts-ignore
            }
            return newSession!;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account }: any) { // removed profile
            const user = await db.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            if (user) {
              token.uid = user.id
            }
            return token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async signIn({ user, account, profile }: any) { // , email, credentials
            if (account?.provider === "google") {
                const email = user.email;
                if (!email) {
                    return false
                }

                const userDb = await db.user.findFirst({
                    where: {
                        username: email
                    }
                })

                if (userDb) {
                    return true;
                }

                const keypair = Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;

                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        
                        profilePicture: profile?.picture, // removed ts-ignpre
                        provider: "Google",
                        sub: account.providerAccountId,
                        solWallet: {
                            create: {
                                publicKey: publicKey,
                                privateKey: privateKey.toString()
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                })

                return true;

            }
            
            return false
        },
    }
}