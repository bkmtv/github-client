import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import styles from "./Repository.module.scss";

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
};

function Repository() {
  let { title } = useParams();

  const [repo, setRepo] = useState<Repo>({
    full_name: "",
    description: "",
    html_url: "",
  });

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/ktsstudio/${title}`)
      .then((response) => {
        setRepo(response.data);
      });
  }, [title]);

  return (
    <main className={styles.repository}>
      <h3>Repository</h3>
      <p>
        <Link to={repo.html_url}>{repo.full_name}</Link>
      </p>
      <p>{repo.description}</p>
    </main>
  );
}

export default Repository;
