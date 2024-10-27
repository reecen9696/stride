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
        titlemd: ["28px", { letterSpacing: "-0.03em" }], // TITLE style with -3% letter spacing
        titlexl: ["32px", { letterSpacing: "-0.03em" }], // TITLE style with -3% letter spacing
        h2: ["16px", { fontWeight: "500" }], // H2 with medium weight
        h3: ["16px"],
        h3md: ["20px"],
        h3xl: ["26px"],
        button: ["16px", { fontWeight: "500" }], // BUTTON with medium weight
        body: [
          "14px",
          { fontWeight: "300", lineHeight: "1.44", letterSpacing: "-0.03em" },
        ], // BODY style
        bodymd: [
          "18px",
          { fontWeight: "300", lineHeight: "1.44", letterSpacing: "-0.03em" },
        ], // BODY style
        bodyxl: [
          "24px",
          { fontWeight: "300", lineHeight: "1.44", letterSpacing: "-0.03em" },
        ], // BODY style
        bodyHighlight: ["14px", { fontWeight: "400" }], // BODY HIGHLIGHT with regular weight
        bodyHighlightmd: ["18px", { fontWeight: "400" }], // BODY HIGHLIGHT with regular weight
        bodyHighlightxl: ["24px", { fontWeight: "400" }], // BODY HIGHLIGHT with regular weight
      },
    },
  },
  plugins: [],
};
