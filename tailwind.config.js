/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        pad: "5rem",
      },
      colors: {
        blue: "#38699F",
        light: "#eeeeee",
      },
      fontFamily: {
        poppins: "Poppins",
        "montserrat-regular": "Montserrat-regular",
        "montserrat-bold": "Montserrat-bold",
      },
    },
    letterSpacing: {
      widest: "0.4rem",
    },
  },
  plugins: [],
};
