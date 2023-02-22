import { useEffect, useState } from "react";

import { Loader } from "@components/Loader";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";

import arrow from "./assets/arrow.png";
import eye from "./assets/eye.png";
import fork from "./assets/fork.png";
import link from "./assets/link.png";
import star from "./assets/star.png";
import styles from "./Repository.module.scss";

type Repo = {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
};

function Repository() {
  let { title } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [repo, setRepo] = useState<Repo>({
    full_name: "",
    description: "",
    html_url: "",
    stargazers_count: 0,
    watchers_count: 0,
    forks_count: 0,
    topics: [],
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
      <Loader loading={loading} />
      {!loading && (
        <>
          <div className={styles.title}>
            <img
              src={arrow}
              alt="arrow"
              onClick={() => {
                navigate(-1);
              }}
            />
            {repo.full_name}
          </div>
          <p>
            <img src={link} className={styles.image} alt="link" />
            <Link to={repo.html_url}>{repo.full_name}</Link>
          </p>
          <div className={styles.topics}>
            {repo.topics.map((topic, key) => (
              <li key={key}>{topic}</li>
            ))}
          </div>
          <p>{repo.description}</p>
          <div className={styles.counters}>
            <li>
              <img src={star} className={styles.image} alt="star" />{" "}
              {repo.stargazers_count} stars
            </li>
            <li>
              <img src={eye} className={styles.image} alt="eye" />{" "}
              {repo.watchers_count} watching
            </li>
            <li>
              <img src={fork} className={styles.image} alt="fork" />{" "}
              {repo.forks_count} forks
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
