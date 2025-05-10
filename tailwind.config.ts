import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Optional: Center the container
        padding: '2rem', // Optional: Add padding
      },
      colors: {
        // primary: "#D4AF37",
        // secondary: "#FFD700",
        primary: "#736DF8",
        secondary: "#4F48F7",
      },
    },
  },
  plugins: [],
};

export default config;
