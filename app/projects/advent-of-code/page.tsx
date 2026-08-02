import { ProjectHeader } from "@/app/projects/_components/ProjectHeader";

import styles from "./styles.module.scss";

const AdventOfCodePage = () => {
  return (
    <main className={styles.page}>
      <ProjectHeader projectId="advent-of-code" />
    </main>
  );
};

export default AdventOfCodePage;
