"use server";

import { AuthError } from "next-auth";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/lib/auth/server";
import { err, handleNextAuthError, isErr, ok, type Result, tryCatch } from "@/lib/error";

export const signIn = async (data: { password: string }): Promise<Result<void, Error>> => {
  const result = await tryCatch(
    nextAuthSignIn("credentials", {
      password: data.password,
      redirect: false,
    })
  );

  if (isErr(result)) {
    return handleNextAuthError(result.error);
  }

  return ok(undefined);
};

export const signOut = async (): Promise<Result<void, Error>> => {
  const result = await tryCatch(nextAuthSignOut({ redirect: false }));

  if (isErr(result)) {
    return handleNextAuthError(result.error);
  }
  return ok(undefined);
};
