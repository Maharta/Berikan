const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primarydark)",
        primaryLighterDark: "var(--color-primaryLighterDark)",
        gradientBackground: "var(--color-gradientBackground)",
        whatsappGreen: "var(--color-whatsapp)",
        whatsappGreen_light: 'var(--color-whatsapp-light)',
        overlayBlack: "rgba(0, 0, 0, 0.54)",
      },
      fontFamily: {
        roboto: ['"Roboto", sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridAutoColumns: {
        mobile: "max(65%, 260px)",
      },
    },
    screens: {
      xxs: "420px",
      xs: "570px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("prettier-plugin-tailwindcss"),
  ],
};
