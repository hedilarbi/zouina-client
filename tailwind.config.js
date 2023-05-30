/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pr: "#BD72C8",
        sc: "#F1D2E7",
        ct: "#FDCB6E",
        txt: "#4A4A4A",
        acc: "#C6B7D",
      },
    },
  },
  plugins: [],
};
