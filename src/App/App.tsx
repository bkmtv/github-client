import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import styles from "./App.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";
import Repository from "./pages/Repository";

function App() {
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
