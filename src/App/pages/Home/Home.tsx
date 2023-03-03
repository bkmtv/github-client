import { Button } from "@components/Button";
import { Input } from "@components/Input";

import styles from "./Home.module.scss";

function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.search}>
        <Input value={""} onChange={() => {}} />
        <Button />
      </div>
    </main>
  );
}

export default Home;
