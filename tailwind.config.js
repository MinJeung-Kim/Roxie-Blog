/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        highlight: {
          "0%, 100%": { backgroundColor: "rgba(229, 231, 235, 1)" }, // bg-gray-200
          "50%": { backgroundColor: "rgba(229, 231, 235, 0.5)" },
        },
      },
      animation: {
        highlight: "highlight 1.5s ease-in-out infinite",
      },
      variants: {
        extend: {
          display: ["group-focus"],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
