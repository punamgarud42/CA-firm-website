import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0F172A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D4AF37",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          500: "#2563EB",
          800: "#1e3a8a",
          900: "#0F172A",
          950: "#020617",
        },
        gold: {
          400: "#f0c040",
          500: "#D4AF37",
          600: "#b8962a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0F172A 0%, #1e3a8a 50%, #0F172A 100%)",
      },
      boxShadow: {
        card:       "0 4px 24px rgba(15,23,42,0.08)",
        "card-hover":"0 8px 40px rgba(15,23,42,0.16)",
        gold:       "0 4px 24px rgba(212,175,55,0.3)",
        nav:        "0 2px 20px rgba(15,23,42,0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
