import type {Config} from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fp-yellow': "#e3b505",
        'fp-header': "#A87919",
        'fp-darkyellow': {
          100: "#e3b505",
          200: "#c49d04",
          300: "#a58403",
          400: "#866a02",
        },
        'fp-dark': {
          100: "#121111",
          200: "#2b2929",
          300: "#403d3d",
          400: "#545050",
        },
        'fp-backdark': "#121111",
        'fp-darker': "#202020",
        'fp-lightdark': "#303030",
        'fp-lightdarker': "#2B2929",
        'fp-text': "#CACACA",
        'fp-darkertext': "#bebebe",
      },
      screens: {
        'xxs': '300px',
        'xs': '420px',
      },
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
