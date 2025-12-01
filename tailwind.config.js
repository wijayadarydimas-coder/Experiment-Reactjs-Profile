/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neonBlue: "#00FFFF",
        neonPurple: "#8A2BE2",
        darkBg: "#0A0A0A",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(0, 255, 255, 0.5)",
        "glow-purple": "0 0 20px rgba(138, 43, 226, 0.5)",
      },
    },
  },
  plugins: [],
};
