/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "var(--color-primarydark)",
        primaryLighterDark: "var(--color-primaryLighterDark)",
        gradientBackground: "var(--color-gradientBackground)",
      },
    },
  },
  plugins: [],
};
