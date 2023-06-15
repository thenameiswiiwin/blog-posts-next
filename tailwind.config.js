/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{tsx,jsx,js,ts}",
    "./src/pages/**/*.{tsx,jsx,js,ts}",
    "./src/components/**/*.{tsx,jsx,js,ts}",
  ],
  theme: {
    animation: {
      "fade-in":
        "fade-in 300ms var(--animation-duration, 0ms) ease-in forwards",
      spinning: "semipolar-spinner-animation 2s infinite",
    },
    keyframes: {
      "fade-in": {
        from: { opacity: 0, transform: "translateY(-10px)" },
        to: { opacity: 1, transform: "none" },
      },
      "semipolar-spinner-animation": {
        "50%": { transform: "rotate(360deg)", scale: 0.7 },
      },
    },
    extend: {
      spacing: {
        "ring-tl": "calc(65px * 0.1 * var(--ring-spacing))",
        "ring-hw": "calc(65px - 65px * 0.2 * var(--ring-spacing))",
      },
    },
  },
  plugins: [],
};
