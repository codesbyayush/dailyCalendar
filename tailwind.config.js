/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [{
    pattern: /bg-(grey | red | yellow | green | blue | purple | pink | indigo)-(100|200|300|400|500|600|50)/
  }]
  ,
  theme: {
    extend: {},
  },
  plugins: [],
};
