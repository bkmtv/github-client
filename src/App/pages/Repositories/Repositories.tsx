import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import axios from "axios";

import styles from "./Repositories.module.scss";

type Repo = {
  image: string;
  title: string;
  subtitle: string;
};

function Repositories() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/orgs/ktsstudio/repos")
      .then((response) => {
        setRepos(
          response.data.map((repo: any) => ({
            image: repo.owner.avatar_url,
            title: repo.name,
            subtitle: repo.owner.login,
          }))
        );
      });
  }, []);

  return (
    <main className={styles.repos}>
      <h2>Repositories</h2>
      {repos.map((repo, key) => (
        <Card
          key={key}
          image={repo.image}
          title={repo.title}
          subtitle={repo.subtitle}
        />
      ))}
    </main>
  );
}

export default Repositories;
