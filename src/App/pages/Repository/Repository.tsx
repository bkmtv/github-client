import { useEffect, useState } from "react";

import { Loader } from "@components/Loader";
import { getRepoUrl, getReadmeUrl } from "@config/urls";
import type { RepoPage } from "@types";
import { normalizeRepoPage } from "@utils/normalizeRepo";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";

import arrow from "./assets/arrow.png";
import eye from "./assets/eye.png";
import fork from "./assets/fork.png";
import link from "./assets/link.png";
import star from "./assets/star.png";
import styles from "./Repository.module.scss";

function Repository() {
  const { title } = useParams<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [repo, setRepo] = useState<RepoPage | null>(null);
  const [readme, setReadme] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get(getRepoUrl(title!)).then((response) => {
        setRepo(response.data.map(normalizeRepoPage));
      }),
      axios
        .get(getReadmeUrl(title!), {
          validateStatus: function (status) {
            return status < 500;
          },
        })
        .then((response) => {
          setReadme(response.data);
        }),
    ]).then(() => {
      setLoading(false);
    });
  }, [title]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (!repo || !readme) {
    return <div className={styles.repository}>Произошла ошибка</div>;
  }

  return (
    <main className={styles.repository}>
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
            {repo.title}
          </div>
          <p>
            <img src={link} className={styles.image} alt="link" />
            <Link to={repo.url}>{repo.title}</Link>
          </p>
          <div className={styles.topics}>
            {repo.topics.map((topic, key) => (
              <li key={key}>{topic}</li>
            ))}
          </div>
          <p>{repo.description}</p>
          <div className={styles.counters}>
            <li>
              <img src={star} className={styles.image} alt="star" />
              {repo.stars} stars
            </li>
            <li>
              <img src={eye} className={styles.image} alt="eye" />
              {repo.watchers} watching
            </li>
            <li>
              <img src={fork} className={styles.image} alt="fork" />
              {repo.forks} forks
            </li>
          </div>
          <div className={styles.readme}>
            <h4>README.md</h4>
            {readme === "404: Not Found" ? (
              <p>README.md отсутствует</p>
            ) : (
              <ReactMarkdown>{readme}</ReactMarkdown>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default Repository;
