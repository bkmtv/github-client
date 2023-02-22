import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import { Loader } from "@components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Repositories.module.scss";

type Repo = {
  image: string;
  title: string;
  subtitle: string;
  stars: number;
  updated: string;
};

function Repositories() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.github.com/orgs/ktsstudio/repos")
      .then((response) => {
        setLoading(false);
        setRepos(
          response.data.map((repo: any) => ({
            image: repo.owner.avatar_url,
            title: repo.name,
            subtitle: repo.owner.login,
            stars: repo.stargazers_count,
            updated: repo.updated_at,
          }))
        );
      });
  }, []);

  return (
    <main className={styles.repos}>
      <h2>Repositories</h2>
      <Loader loading={loading} />
      {!loading && (
        <>
          {repos.map((repo, key) => (
            <Card
              key={key}
              image={repo.image}
              title={repo.title}
              subtitle={repo.subtitle}
              stars={repo.stars}
              updated={repo.updated.slice(0, 10)}
              onClick={() => {
                navigate(`/repos/${repo.title}`);
              }}
            />
          ))}
        </>
      )}
    </main>
  );
}

export default Repositories;
