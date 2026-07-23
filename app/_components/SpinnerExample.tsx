import type React from "react";

import { Spinner } from "@/components/ui";

import styles from "./styles.module.scss";

const SpinnerExample: React.FC = () => (
  <>
    <section className={styles.section}>
      <h2>Spinner sizes</h2>
      <div className={styles.row}>
        <div className={styles.swatch}>
          <Spinner size={16} />
          <span>16</span>
        </div>
        <div className={styles.swatch}>
          <Spinner size={24} />
          <span>24</span>
        </div>
        <div className={styles.swatch}>
          <Spinner size={40} />
          <span>40</span>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <h2>Spinner colors</h2>
      <div className={styles.row}>
        <Spinner size={32} className={styles.accent} />
        <Spinner size={32} className={styles.danger} />
      </div>
    </section>
  </>
);

export { SpinnerExample };
