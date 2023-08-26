/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kpopPink: "#f4a7bb",
        kpopPurple: "#A844BC",
        kpopBlue: "#2BA9FF",
        kpopYellow: "#FFCC1F",
      },
    },
  },
  plugins: [],
};
