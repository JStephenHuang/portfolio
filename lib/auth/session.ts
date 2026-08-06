import "server-only";

import { auth } from "./server";
import { isErr, ok, err, type Result, tryCatch } from "../error";
import { Session, User } from "next-auth";
import { cache } from "react";

interface AuthResult {
  session: Session | null;
  user?: User;
}

export const getAuth = cache(async (): Promise<Result<AuthResult, Error>> => {
  const result = await tryCatch(auth());

  if (isErr(result)) {
    return ok({ session: null });
  }

  const session = result.data;

  return ok({ session, user: session?.user });
});

export const unauthorizedResponse = (): Response =>
  Response.json(
    { error: "Unauthorized" },
    {
      status: 401,
    }
  );
