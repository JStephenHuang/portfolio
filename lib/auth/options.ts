import "server-only";

import argon2 from "argon2";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { isErr, tryCatch } from "@/lib/error";

import { clearLoginFailures, getLoginDelay, recordLoginFailure } from "./throttle";

const credentialsSchema = z.object({ password: z.string().min(1).max(512) });
const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: "/admin" },
  cookies: {
    sessionToken: {
      name: "__Secure-dump-admin-session",
      options: { httpOnly: true, sameSite: "strict", path: "/", secure: true, maxAge: 24 * 60 * 60 },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: { password: { label: "Password", type: "password" } },
      authorize: async (rawCredentials, request) => {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success || !process.env.ADMIN_PASSWORD_HASH) return null;
        const { password } = parsed.data;
        const ip = request.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || request.headers?.["x-real-ip"] || "unknown";
        const existingDelay = getLoginDelay(ip);
        if (existingDelay) await wait(existingDelay);
        const verification = await tryCatch(argon2.verify(process.env.ADMIN_PASSWORD_HASH, password));
        const valid = !isErr(verification) && verification.data;
        if (!valid) {
          const delay = recordLoginFailure(ip);
          if (delay) await wait(delay);
          return null;
        }
        clearLoginFailures(ip);
        return { id: "admin", name: "Admin" };
      },
    }),
  ],
};
