import type { Config } from "tailwindcss";

// Every value here maps to a token in Aariva_website_design_guide.md.
// Colours are the same hex values as the CSS variables in app/globals.css (hex here so
// Tailwind opacity modifiers like bg-maroon/80 work).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    screens: {
      sm: "640px",
      md: "900px", // guide: desktop > 900px
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        maroon: { DEFAULT: "#551F17", deep: "#3B1A12" },
        gold: { DEFAULT: "#C9A227", text: "#886916" },
        ink: { DEFAULT: "#2A211C", muted: "#5E534B" },
        ivory: "#FBF6EE",
        sand: "#F5EDE4",
        cream: "#FBF6EE",
        line: "rgba(42, 33, 28, 0.13)",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      fontSize: {
        xs: ["13px", { lineHeight: "20px" }],
        sm: ["14px", { lineHeight: "22px" }],
        md: ["15px", { lineHeight: "24px" }],
        base: ["16px", { lineHeight: "27px" }],
        xl: ["24px", { lineHeight: "32px" }],
        "2xl": ["28px", { lineHeight: "36px" }],
        "3xl": ["29px", { lineHeight: "37px" }],
        "4xl": ["30px", { lineHeight: "38px" }],
      },
      spacing: {
        "s1": "5px",
        "s2": "7.5px",
        "s3": "10px",
        "s4": "12px",
        "s5": "13px",
        "s6": "15px",
        "s7": "16px",
        "s8": "18px",
      },
      borderRadius: {
        xs: "12px",
        sm: "17px",
        md: "25px",
        lg: "50px",
      },
      maxWidth: {
        container: "1200px",
        wide: "1280px",
        prose: "68ch",
      },
      transitionDuration: {
        instant: "300ms",
        fast: "400ms",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
