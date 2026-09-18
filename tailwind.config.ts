import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

/** Raccourci: chaque jeton est un triplet HSL, ce qui préserve `bg-navy/40`. */
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.375rem",
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Public Sans", "Arial", "Helvetica", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        /* jetons shadcn/ui */
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },

        /* palette institutionnelle PROTECT-CAMEROUN */
        navy: {
          DEFAULT: token("navy"),
          2: token("navy-2"),
          3: token("navy-3"),
        },
        "on-navy": token("on-navy-2"),
        blue: {
          DEFAULT: token("blue"),
          soft: token("blue-soft"),
          line: token("blue-line"),
        },
        teal: {
          DEFAULT: token("teal"),
          mark: token("teal-mark"),
          soft: token("teal-soft"),
          line: token("teal-line"),
          light: token("teal-light"),
          ink: token("teal-ink"),
        },
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
        },
        "muted-ink": token("muted-ink"),
        canvas: token("canvas"),
        zebra: token("zebra"),
        gris: token("gris"),
        line: {
          DEFAULT: token("line"),
          2: token("line-2"),
        },
        grid: token("grid"),
        danger: {
          DEFAULT: token("danger"),
          soft: token("danger-soft"),
          ink: token("danger-ink"),
        },
        orange: {
          DEFAULT: token("orange"),
          mark: token("orange-mark"),
          soft: token("orange-soft"),
        },
        green: {
          soft: token("green-soft"),
          ink: token("green-ink"),
        },
        seq: {
          1: token("seq-1"),
          2: token("seq-2"),
          3: token("seq-3"),
          4: token("seq-4"),
          5: token("seq-5"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
        soft: "var(--shadow-soft)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0.4" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.25s ease",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
