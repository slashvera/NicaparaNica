import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2563eb",        // Tailwind blue-600
          "primary-focus": "#1d4ed8" // Tailwind blue-700
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
          "primary-focus": "#1d4ed8"
        },
      },
    ],
  },
};