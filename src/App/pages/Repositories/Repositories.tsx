import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import { Loader } from "@components/Loader";
import axios from "axios";
import ReactPaginate from "react-paginate";
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
  const [pageNumber, setPageNumber] = useState(0);
  const reposPerPage = 10;
  const pagesVisited = pageNumber * reposPerPage;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const displayRepos = repos
    .slice(pagesVisited, pagesVisited + reposPerPage)
    .map((repo, key) => {
      return (
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
      );
    });

  const pageCount = Math.ceil(repos.length / reposPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

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
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.page_btns}
            previousLinkClassName={styles.prev_btn}
            nextLinkClassName={styles.next_btn}
            disabledClassName={styles.page_disabled}
            activeClassName={styles.active_btn}
          ></ReactPaginate>
          {displayRepos}
        </>
      )}
    </main>
  );
}

export default Repositories;
