import Link from "next/link";

import styles from "./styles.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <span>404, not a page</span>
    </div>
  );
}
