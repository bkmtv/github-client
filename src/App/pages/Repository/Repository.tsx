import { RepoStore } from "@store/RepoStore";
import { useLocalStore } from "@utils/useLocal";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

import arrow from "./assets/arrow.png";
import eye from "./assets/eye.png";
import fork from "./assets/fork.png";
import link from "./assets/link.png";
import star from "./assets/star.png";
import styles from "./Repository.module.scss";

function Repository() {
  const navigate = useNavigate();
  const store = useLocalStore(() => new RepoStore());

  return (
    <main className={styles.repository}>
      <div className={styles.title}>
        <img
          src={arrow}
          alt="arrow"
          onClick={() => {
            navigate(-1);
          }}
        />
        {store.repoPage.title}
      </div>
      <p>
        <img src={link} className={styles.image} alt="link" />
        <Link to={store.repoPage.url}>{store.repoPage.title}</Link>
      </p>
      <div className={styles.topics}>
        {store.repoPage.topics.map((topic, key) => (
          <li key={key}>{topic}</li>
        ))}
      </div>
      <p>{store.repoPage.description}</p>
      <div className={styles.counters}>
        <li>
          <img src={star} className={styles.image} alt="star" />
          {store.repoPage.stars} stars
        </li>
        <li>
          <img src={eye} className={styles.image} alt="eye" />
          {store.repoPage.watchers} watching
        </li>
        <li>
          <img src={fork} className={styles.image} alt="fork" />
          {store.repoPage.forks} forks
        </li>
      </div>
    </main>
  );
}

export default observer(Repository);
