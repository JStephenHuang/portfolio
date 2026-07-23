import type React from "react";

import { Button } from "@/components/ui";

import styles from "./styles.module.scss";

const ButtonExample: React.FC = () => (
  <section className={styles.section}>
    <h2>Button loading states</h2>
    <div className={styles.row}>
      <Button.Primary isLoading>Get started</Button.Primary>
      <Button.Secondary isLoading>Documentation</Button.Secondary>
      <Button.Link isLoading>Learn more</Button.Link>
    </div>
    <div className={styles.row}>
      <Button.Primary>Get started</Button.Primary>
      <Button.Secondary>Documentation</Button.Secondary>
      <Button.Link>Learn more</Button.Link>
    </div>
  </section>
);

export { ButtonExample };
