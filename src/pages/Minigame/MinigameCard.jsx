import React from "react";
import "./MinigameCard.css";

function MinigameCard({ title, desc, image, onClick }) {
  return (
    <div className="minigame-card" onClick={onClick}>
      <div className="minigame-thumb">
        <img src={image} alt={title} />
      </div>

      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default MinigameCard;
