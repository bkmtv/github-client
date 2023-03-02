import { Input } from "@components/Input";

import styles from "./Home.module.scss";

function Home() {
  return (
    <main className={styles.home}>
      <Input value={""} onChange={() => {}} />
    </main>
  );
}

export default Home;
