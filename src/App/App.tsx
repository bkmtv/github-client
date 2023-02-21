import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos" element={<Repositories />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
