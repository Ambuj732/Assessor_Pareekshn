/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#5A5A5A",
        customBlack: "#000000",
        customLightGreen: "#CCFAB6",
        customGreen: "#7DA56A",
        customDarkGreen: "#3E622D",
        customLightYellow: "#FFDFAE",
        customBrown: "#AE8C58",
        customDarkBrown: "#76521B",
        customLightBlue: "#B6EEFB",
        customMediumBlue: "#61A4B3",
        customDarkBlue: "#237182",
      },
    },
  },
  plugins: [],
};
