module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        highlight: "#FFFF01", // Adds custom highlight color
      },
      fontFamily: {
        worksans: ['"Work Sans"', "sans-serif"], // Adds Work Sans font
      },
      fontSize: {
        title: ["24px", { letterSpacing: "-0.03em" }], // TITLE style with -3% letter spacing
        h2: ["16px", { fontWeight: "500" }], // H2 with medium weight
        button: ["16px", { fontWeight: "500" }], // BUTTON with medium weight
        body: [
          "14px",
          { fontWeight: "300", lineHeight: "1.44", letterSpacing: "-0.03em" },
        ], // BODY style
        bodyHighlight: ["14px", { fontWeight: "400" }], // BODY HIGHLIGHT with regular weight
      },
    },
  },
  plugins: [],
};
