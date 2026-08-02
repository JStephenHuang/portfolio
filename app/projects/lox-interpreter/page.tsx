import { ProjectHeader } from "@/app/projects/_components/ProjectHeader";

import styles from "./styles.module.scss";

const LoxInterpreterPage = () => {
  return (
    <main className={styles.page}>
      <ProjectHeader projectId="lox-interpreter" />
    </main>
  );
};

export default LoxInterpreterPage;
