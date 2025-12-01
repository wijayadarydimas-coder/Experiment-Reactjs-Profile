import React, { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./GameCommon.css";

const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

const COLORS = {
  I: "#00e5ff",
  O: "#ffd600",
  T: "#d500f9",
  L: "#ff9100",
  J: "#2962ff",
  S: "#00e676",
  Z: "#ff1744",
};

function GameTetris() {
  const canvasRef = useRef(null);

  // State UI (boleh pakai useState)
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  // REALTIME state pakai ref (agar game tidak macet)
  const gridRef = useRef([]);
  const pieceRef = useRef(null);
  const posRef = useRef({ x: 3, y: 0 });
  const dropTimer = useRef(0);
  const overRef = useRef(false);

  function initGrid() {
    gridRef.current = Array.from({ length: ROWS }, () =>
      Array(COLS).fill(null)
    );
  }

  function randomPiece() {
    const keys = Object.keys(SHAPES);
    const k = keys[Math.floor(Math.random() * keys.length)];
    return { shape: SHAPES[k], color: COLORS[k] };
  }

  function spawnPiece() {
    pieceRef.current = randomPiece();
    posRef.current = { x: 3, y: 0 };

    if (collides(0, 0, pieceRef.current.shape)) {
      overRef.current = true;
      setOver(true);
    }
  }

  function collides(offX, offY, shape) {
    const pos = posRef.current;
    const grid = gridRef.current;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (!shape[y][x]) continue;

        const nx = pos.x + x + offX;
        const ny = pos.y + y + offY;

        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && grid[ny][nx]) return true;
      }
    }
    return false;
  }

  function mergePiece() {
    const grid = gridRef.current;
    const piece = pieceRef.current;
    const pos = posRef.current;

    piece.shape.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v) {
          const gy = pos.y + y;
          const gx = pos.x + x;
          if (gy >= 0) grid[gy][gx] = piece.color;
        }
      })
    );
  }

  function clearLines() {
    let newGrid = gridRef.current.filter((row) => row.some((c) => !c));
    const cleared = ROWS - newGrid.length;

    if (cleared > 0) {
      for (let i = 0; i < cleared; i++) {
        newGrid.unshift(Array(COLS).fill(null));
      }
      gridRef.current = newGrid;
      setScore((s) => s + cleared * 100);
    }
  }

  function rotatePiece() {
    if (overRef.current) return;

    const p = pieceRef.current;
    const rotated = p.shape[0].map((_, i) =>
      p.shape.map((row) => row[i]).reverse()
    );

    if (!collides(0, 0, rotated)) {
      pieceRef.current = { ...p, shape: rotated };
    }
  }

  /** MAIN GAME LOOP **/
  function update(delta) {
    if (overRef.current) return;

    dropTimer.current += delta;

    if (dropTimer.current > 500) {
      dropTimer.current = 0;

      if (!collides(0, 1, pieceRef.current.shape)) {
        posRef.current.y++;
      } else {
        mergePiece();
        clearLines();
        spawnPiece();
      }
    }
  }

  /** RENDER CANVAS **/
  function draw() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grid = gridRef.current;
    const piece = pieceRef.current;

    // Draw grid
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (grid[y][x]) {
          ctx.fillStyle = grid[y][x];
          ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
        }
      }
    }

    // Draw falling piece
    if (piece) {
      ctx.fillStyle = piece.color;
      piece.shape.forEach((row, y) =>
        row.forEach((v, x) => {
          if (v) {
            ctx.fillRect(
              (posRef.current.x + x) * BLOCK,
              (posRef.current.y + y) * BLOCK,
              BLOCK,
              BLOCK
            );
          }
        })
      );
    }
  }

  /** GAME LOOP using requestAnimationFrame */
  useEffect(() => {
    initGrid();
    spawnPiece();

    let last = performance.now();

    function loop(now) {
      const delta = now - last;
      last = now;

      update(delta);
      draw();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, []);

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

  /** CONTROLS */
  useEffect(() => {
    const key = (e) => {
      if (overRef.current) return;

      if (e.key === "ArrowLeft" && !collides(-1, 0, pieceRef.current.shape))
        posRef.current.x--;

      if (e.key === "ArrowRight" && !collides(1, 0, pieceRef.current.shape))
        posRef.current.x++;

      if (e.key === "ArrowDown" && !collides(0, 1, pieceRef.current.shape))
        posRef.current.y++;

      if (e.key === "ArrowUp") rotatePiece();
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  return (
    <div className="game-container">
      <h2 className="game-title">Tetris</h2>

      {over && <p className="game-over">Game Over</p>}

      <canvas
        ref={canvasRef}
        width={COLS * BLOCK}
        height={ROWS * BLOCK}
        className="tetris-canvas"
      />

      <p className="game-score">Score: {score}</p>

      <BackButton />
    </div>
  );
}

export default GameTetris;
