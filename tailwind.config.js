import { isTypeAliasDeclaration } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        "blackLight" : "#333"
      }
    },
  },
  plugins: [],
}

