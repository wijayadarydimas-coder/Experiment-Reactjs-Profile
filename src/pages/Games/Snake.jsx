import React, { useEffect, useState, useRef } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./GameCommon.css";

const GRID_SIZE = 20;
const TILE = 20; // pixel size

function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 8, y: 8 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 12, y: 12 });
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);

  // Cegah browser scroll saat tekan arrow keys
  useEffect(() => {
    const preventArrowScroll = (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault(); // STOP SCROLLING
      }
    };

    window.addEventListener("keydown", preventArrowScroll, { passive: false });

    return () => {
      window.removeEventListener("keydown", preventArrowScroll);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction.y !== 1)
        setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y !== -1)
        setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x !== 1)
        setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x !== -1)
        setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 120);
    return () => clearInterval(interval);
  });

  function update() {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    // Check Wall
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // Check Self Collision
    if (newSnake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Eat Food
    if (head.x === food.x && head.y === food.y) {
      spawnFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    draw(newSnake, food);
  }

  function spawnFood() {
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
  }

  function draw(snakeData, foodData) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(foodData.x * TILE, foodData.y * TILE, TILE, TILE);

    // Snake
    ctx.fillStyle = "#00ff99";
    snakeData.forEach((s) => {
      ctx.fillRect(s.x * TILE, s.y * TILE, TILE, TILE);
    });
  }

  return (
    <div className="game-container">
      <h2 className="game-title">Snake</h2>

      {gameOver && <p className="game-over">Game Over!</p>}

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * TILE}
        height={GRID_SIZE * TILE}
        className="snake-canvas"
      />

      <BackButton />
    </div>
  );
}

export default SnakeGame;
