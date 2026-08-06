import "server-only";

import argon2 from "argon2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { isErr, tryCatch } from "@/lib/error";

import { clearLoginFailures, getLoginDelay, recordLoginFailure } from "./throttle";

const credentialsSchema = z.object({
  password: z.string().min(1).max(512),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Password",
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (rawCredentials, request) => {
        const parsed = credentialsSchema.safeParse(rawCredentials);

        if (!parsed.success || !process.env.ADMIN_PASSWORD_HASH) {
          return null;
        }

        const forwardedFor = request.headers.get("x-forwarded-for");
        const realIp = request.headers.get("x-real-ip");

        const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

        const existingDelay = getLoginDelay(ip);

        if (existingDelay > 0) {
          return null;
        }

        const verification = await tryCatch(argon2.verify(process.env.ADMIN_PASSWORD_HASH, parsed.data.password));

        if (isErr(verification)) return null;

        if (!verification.data) {
          recordLoginFailure(ip);
          return null;
        }

        clearLoginFailures(ip);

        return {
          id: "admin",
          name: "jsh",
        };
      },
    }),
  ],
});
