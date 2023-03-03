import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Input } from "@components/Input";
import { ReposStore } from "@store/ReposStore";
import { Repo } from "@types";
import { useLocalStore } from "@utils/useLocal";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.scss";

function Home() {
  const navigate = useNavigate();
  const store = useLocalStore(() => new ReposStore());

  return (
    <main className={styles.home}>
      <div className={styles.search}>
        <Input
          value={store.input.value}
          onChange={(value) => store.input.setValue(value)}
        />
        <Button
          onClick={() => {
            store.getRepos();
          }}
        />
      </div>
      <h2>Repositories</h2>
      {store.repos.map((repo: Repo) => (
        <Card
          key={repo.id}
          image={repo.image}
          title={repo.title}
          subtitle={repo.subtitle}
          stars={repo.stars}
          updated={repo.updated.toDateString()}
          onClick={() => {
            navigate(`/repos/${repo.title}`);
          }}
        />
      ))}
    </main>
  );
}

export default observer(Home);
