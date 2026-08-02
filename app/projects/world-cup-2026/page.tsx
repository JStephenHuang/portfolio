import { ProjectHeader } from "@/app/projects/_components/ProjectHeader";

import styles from "./styles.module.scss";

const WorldCupPage = () => {
  return (
    <main className={styles.page}>
      <ProjectHeader projectId="world-cup-2026" />
    </main>
  );
};

export default WorldCupPage;
