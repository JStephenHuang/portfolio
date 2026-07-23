import { ButtonExample } from "./_components/ButtonExample";
import { DialogExample } from "./_components/DialogExample";
import { FormExample } from "./_components/FormExample";
import { SpinnerExample } from "./_components/SpinnerExample";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <main className={styles.page}>
      <SpinnerExample />
      <ButtonExample />
      <FormExample />
      <DialogExample />
    </main>
  );
};

export default Home;
