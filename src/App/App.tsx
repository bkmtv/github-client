import { useQueryParamsStoreInit } from "@store/RootStore/useQueryParamsStoreInit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Repository from "./pages/Repository";
import Repositories from "./pages/ReposMobx";

function App() {
  useQueryParamsStoreInit();
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos" element={<Repositories />} />
          <Route path="/repos/:title" element={<Repository />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
