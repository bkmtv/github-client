import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Repositories.module.scss";

type Repo = {
  image: string;
  title: string;
  subtitle: string;
  content: string;
};

function Repositories() {
  const navigate = useNavigate();
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
            content: repo.stargazers_count,
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
          content={repo.content}
          onClick={() => {
            navigate(`/repos/${repo.title}`);
          }}
        />
      ))}
    </main>
  );
}

export default Repositories;
