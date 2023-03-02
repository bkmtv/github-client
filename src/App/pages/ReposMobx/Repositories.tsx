import { useEffect } from "react";

import { Card } from "@components/Card";
import { ReposStore } from "@store/ReposStore";
import { Repo } from "@types";
import { useLocalStore } from "@utils/useLocal";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./Repositories.module.scss";

function Repositories() {
  const navigate = useNavigate();
  const store = useLocalStore(() => new ReposStore());

  useEffect(() => {
    store.getRepos();
  }, [store]);

  return (
    <main className={styles.repos}>
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

export default observer(Repositories);
