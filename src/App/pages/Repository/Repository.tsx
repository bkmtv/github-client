import { useEffect, useState } from "react";

import { Loader } from "@components/Loader";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

import styles from "./Repository.module.scss";
import eye from "../../assets/eye.png";
import fork from "../../assets/fork.png";
import star from "../../assets/star.png";

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
};

function Repository() {
  let { title } = useParams();
  const [loading, setLoading] = useState(true);

  const [repo, setRepo] = useState<Repo>({
    full_name: "",
    description: "",
    html_url: "",
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
  });
  const [readme, setReadme] = useState<any>();

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/ktsstudio/${title}`)
      .then((response) => {
        setLoading(false);
        setRepo(response.data);
      });
    axios
      .get(
        `https://raw.githubusercontent.com/ktsstudio/${title}/master/README.md`
      )
      .then((response) => {
        setLoading(false);
        setReadme(response.data);
      });
  }, [title]);

  return (
    <main className={styles.repository}>
      <h3>Repository</h3>
      <Loader loading={loading} />
      {!loading && (
        <>
          <p>
            <Link to={repo.html_url}>{repo.full_name}</Link>
          </p>
          <p>{repo.description}</p>
          <div className={styles.counters}>
            <li>
              <img src={star} alt="star" /> {repo.stargazers_count} stars
            </li>
            <li>
              <img src={eye} alt="eye" /> {repo.watchers_count} watching
            </li>
            <li>
              <img src={fork} alt="fork" /> {repo.forks_count} forks
            </li>
          </div>
          <div className={styles.readme}>
            <h4>README.md</h4>
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        </>
      )}
    </main>
  );
}

export default Repository;
