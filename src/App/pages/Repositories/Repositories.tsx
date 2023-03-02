import { useEffect, useState } from "react";

import { Card } from "@components/Card";
import { Loader } from "@components/Loader";
import { getReposUrl } from "@config/urls";
import type { Repo } from "@types";
import { normalizeRepo } from "@utils/normalizeRepo";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

import styles from "./Repositories.module.scss";

const REPOS_PER_PAGE = 10;

function Repositories() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * REPOS_PER_PAGE;
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const displayRepos = repos
    .slice(pagesVisited, pagesVisited + REPOS_PER_PAGE)
    .map((repo) => {
      return (
        <Card
          key={repo.id}
          image={repo.image}
          title={repo.title}
          subtitle={repo.subtitle}
          stars={repo.stars}
          onClick={() => {
            navigate(`/repos/${repo.title}`);
          }}
        />
      );
    });

  const pageCount = Math.ceil(repos.length / REPOS_PER_PAGE);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios.get(getReposUrl()).then((response) => {
      setLoading(false);
      setRepos(response.data.map(normalizeRepo));
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
            containerClassName={styles.btns}
            previousLinkClassName={styles.prev}
            nextLinkClassName={styles.next}
            disabledClassName={styles.disabled}
            activeClassName={styles.active}
          />
          {displayRepos}
        </>
      )}
    </main>
  );
}

export default Repositories;
