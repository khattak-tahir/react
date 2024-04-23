/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          white: "#fff",
          lightslategray: {
            "100": "#8898aa",
            "200": "rgba(136, 152, 170, 0.1)",
          },
          gray: "#212529",
          royalblue: "#5e72e4",
          darkgray: "#adb5bd",
          mediumseagreen: "#2dce89",
          slategray: "#525f7f",
          whitesmoke: "#f4f5f7",
        },
        spacing: {},
        fontFamily: {
          "open-sans": "'Open Sans'",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        inherit: "inherit",
      },
    },
    corePlugins: {
      preflight: false,
    },
  };
  