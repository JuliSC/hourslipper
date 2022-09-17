/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        component: {
          background: "#363844",
          text: "white",
          active: "#4A4D5D",
        },
        input: {
          background: "#3F4751",
        },
        link: "#5169E1",
      },
      borderRadius: {
        lg: "5px",
      },
      boxShadow: {
        xl: "0px 2px 4px black",
      },
    },
  },
  plugins: [],
};
