import type React from "react";

import styles from "./styles.module.scss";

interface Props {
  message?: string;
}

const ErrorText: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return <span className={styles["error-message"]}>{message}</span>;
};

export { ErrorText };
