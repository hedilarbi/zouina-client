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
        pr: "#93729A",
        sc: "#F9679A",
        bg: "#EEF4F9",
        txt: "#525252",
        gry: "#FBFBFB",
        wr: "#E21C4A",
      },
      fontFamily: {
        montserrat: ["Montserrat_400Regular"],
        montserratB: ["Montserrat_600SemiBold"],
        lato: ["Lato_400Regular"],
        latoB: ["Lato_700Bold"],
      },
    },
  },
  plugins: [],
};
