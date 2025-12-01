import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Minigame from "./pages/Minigame/Minigame";
import GeospatialFinder from "./pages/Geospatial/GeospatialFinder";

import Tetris from "./pages/Games/Tetris";
import Snake from "./pages/Games/Snake";

function App() {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ABOUT */}
          <Route path="/about" element={<About />} />
          {/* GEOSPATIAL PAGE */}
          <Route path="/geospatial" element={<GeospatialFinder />} />
          {/* PAGE MINIGAME */}
          <Route path="/minigame" element={<Minigame />} />

          {/* GAME ROUTES */}
          <Route path="/game/tetris" element={<Tetris />} />
          <Route path="/game/snake" element={<Snake />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
