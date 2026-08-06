import { redirect } from "next/navigation";

import LoginPageView from "../_components/LoginPageView";
import { getAuth } from "@/lib/auth/session";

const LoginPage: React.FC = async () => {
  // page only for these
  const result = await getAuth();
  const session = result.data?.session;
  if (session) redirect("/admin");

  return <LoginPageView />;
};

export default LoginPage;
