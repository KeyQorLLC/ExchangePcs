/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kpopPink: "#FF6F9E",
        kpopPurple: "#A844BC",
        kpopBlue: "#2BA9FF",
        kpopYellow: "#FFCC1F",
      },
    },
  },
  plugins: [],
};
