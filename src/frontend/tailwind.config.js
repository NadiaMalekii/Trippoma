/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16231f",
        night: "#0c1714",
        surface: "#1a2b25",
        line: "#30473e",
        sand: "#ede3ce",
        teal: "#2f6e68",
        clay: "#a8562e",
        gold: "#c9a227",
        muted: "#9fb0a8",
      },
      fontFamily: {
        display: ["Zilla Slab", "Georgia", "serif"],
        body: ["Work Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 20px 70px rgba(0, 0, 0, 0.22)",
      },
    },
  },
  plugins: [],
};
