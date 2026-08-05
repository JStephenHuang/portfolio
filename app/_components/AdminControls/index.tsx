"use client";

import { PencilSimpleIcon, PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./styles.module.scss";

interface AdminControlsProps { dumpId?: string }

const AdminControls: React.FC<AdminControlsProps> = ({ dumpId }) => {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return (
    <Link className={styles.control} href={dumpId ? `/admin/dumps/${dumpId}` : "/admin/dumps/new"} aria-label={dumpId ? "Edit dump" : "Create dump"}>
      {dumpId ? <PencilSimpleIcon size={20} /> : <PlusIcon size={20} />}
    </Link>
  );
};

export default AdminControls;
