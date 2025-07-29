/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Make sure this is correct
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // ✅ MUST be inside plugins array
  ],
};
