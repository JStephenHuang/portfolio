import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth/session";

import LoginForm from "./LoginForm";
import styles from "./styles.module.scss";

const AdminPage = async () => {
  const session = await getAdminSession();
  if (session?.user) redirect("/");
  return <main className={styles.page}><section><h1>Dump editor</h1><p>Sign in to edit repository content.</p><LoginForm /></section></main>;
};

export default AdminPage;
