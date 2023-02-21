import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h2>Github Client</h2>
      <nav>
        <Link to="/">Home</Link> | <Link to="/repos">Repositories</Link>
      </nav>
    </header>
  );
}

export default Header;
