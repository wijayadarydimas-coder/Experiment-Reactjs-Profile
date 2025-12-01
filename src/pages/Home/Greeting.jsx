import React from "react";
import { motion } from "framer-motion";

function Greeting() {
  return (
    <div className="w-full flex flex-col items-center mt-24 select-none">
      {/* Animasi nama RGB */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          textShadow: [
            "0px 0px 8px #ff0000",
            "0px 0px 8px #00ff00",
            "0px 0px 8px #0000ff",
            "0px 0px 12px #ff00ff",
          ],
          color: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ff00ff",
            "#00ffff",
            "#ffffff",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="text-5xl md:text-6xl font-extrabold tracking-wide text-center"
      >
        Welcome to Dimas Code
      </motion.h1>

      {/* Subtext berjalan fade-in */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="mt-6 text-lg md:text-xl text-center max-w-2xl text-gray-300"
      >
        Tempat dimana kamu melihat hasil Vibes Code.
      </motion.p>

      {/* Garis neon bawah */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "200px", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="h-1 mt-6 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)",
          boxShadow: "0 0 12px cyan",
        }}
      ></motion.div>
    </div>
  );
}

export default Greeting;
