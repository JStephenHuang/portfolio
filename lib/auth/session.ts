import "server-only";

import { getServerSession } from "next-auth";

import { authOptions } from "./options";

export const getAdminSession = () => getServerSession(authOptions);

export const requireAdminSession = async () => {
  const session = await getAdminSession();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
};
