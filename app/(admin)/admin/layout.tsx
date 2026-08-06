import { redirect } from "next/navigation";

import { getAuth } from "@/lib/auth/session";

import styles from "./styles.module.scss";
import AdminNav from "../_components/AdminNav";

const AdminLayout: React.FC<Readonly<React.PropsWithChildren>> = async ({ children }) => {
  const result = await getAuth();
  const auth = result.data;

  if (!auth?.session) redirect("/login");

  return (
    <>
      <AdminNav />
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1>Admin</h1>
            <p>Signed in as {auth.user?.name}</p>
          </div>
        </header>
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
