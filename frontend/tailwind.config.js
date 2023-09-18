/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const myClass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".translate-rotate": {
      transform: "translateX(-100%) rotateY(-180deg)",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".transitiontransform": {
      transition: "transform 1s",
    },
  });
});
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Comic Sans MS"],
      },
      colors: {
        kpopPink: "#f4a7bb",
        kpopPurple: "#A844BC",
        kpopBlue: "#2BA9FF",
        kpopYellow: "#FFCC1F",
      },
    },
  },
  plugins: [myClass],
};
