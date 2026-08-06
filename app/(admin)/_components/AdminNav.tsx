"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ErrorText } from "@/components/form";
import { Button, Link } from "@/components/ui";
import { signOut } from "@/lib/action/auth";
import { isErr } from "@/lib/error";

import styles from "./styles.module.scss";

const AdminNav: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const handleLogout = (): void => {
    setError(undefined);
    startTransition(async () => {
      const result = await signOut();

      if (isErr(result)) {
        console.error(result.error.message);
        return;
      }

      router.replace("/login");
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link href="/admin">admin</Link>
        <Link href="/">portfolio</Link>
      </div>
      <div className={styles.logout}>
        <Button.Link onClick={handleLogout} isLoading={isPending}>
          logout
        </Button.Link>
      </div>
    </nav>
  );
};

export default AdminNav;
