/** @type {import('tailwindcss').Config} */
export default {
  //Ekle
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Consolas: ["consolas"],
      },
    },
  },
  plugins: [],
};
