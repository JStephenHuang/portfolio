import { Link } from "@/components/ui";
import { rootItems } from "@/lib/data";

import styles from "./styles.module.scss";

const AdminPage: React.FC = () => (
  <section className={styles.section}>
    <h2>Items</h2>
    <ul className={styles.list}>
      {rootItems.map((item) => (
        <li key={item.id} className={styles.item}>
          <div>
            <h3>{item.title}</h3>
            <span className={styles.id}>{item.id}</span>
          </div>
          <div className={styles.actions}>
            <Link href={`/admin/dumps/${item.id}`}>Edit</Link>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default AdminPage;
