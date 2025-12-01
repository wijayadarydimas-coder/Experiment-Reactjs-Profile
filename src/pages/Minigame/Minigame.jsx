import React from "react";
import "./Minigame.css";
import MinigameCard from "./MinigameCard";
import { useNavigate } from "react-router-dom";
import tetris from "../../assets/images/Minigame/tetris.png";
import snake from "../../assets/images/Minigame/snake.jpg";

function Minigame() {
  const navigate = useNavigate();

  return (
    <section className="minigame-page">
      <h1 className="mg-title">Minigames</h1>
      <p className="mg-sub">Pilih game untuk dimainkan 🎮</p>

      <div className="mg-grid">
        <MinigameCard
          title="Tetris"
          desc="Game klasik menyusun balok!"
          image={tetris}
          onClick={() => navigate("/game/tetris")}
        />

        <MinigameCard
          title="Ular (Snake)"
          desc="Gerakkan ular dan kumpulkan poin!"
          image={snake}
          onClick={() => navigate("/game/snake")}
        />
      </div>
    </section>
  );
}

export default Minigame;
