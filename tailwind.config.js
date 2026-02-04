/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Ocean Depths Theme Colors
        navy: {
          50: '#e7f0f5',
          100: '#d1e3ec',
          200: '#a3c7d9',
          300: '#75abc6',
          400: '#478fb3',
          500: '#2d8b8b', // Teal accent
          600: '#1a2332', // Deep navy
          700: '#161d2a',
          800: '#121722',
          900: '#0e111a',
          950: '#0a0d12',
        },
        // Botanical Garden Theme Colors
        fern: {
          50: '#f0f7f2',
          100: '#dcebe0',
          200: '#bbd7c3',
          300: '#8fbca0',
          400: '#5f9d79',
          500: '#4a7c59', // Fern green
          600: '#3a6347',
          700: '#304f3a',
          800: '#294030',
          900: '#233528',
          950: '#111d15',
        },
        marigold: {
          50: '#fefae8',
          100: '#fef3c3',
          200: '#fee789',
          300: '#fdd246',
          400: '#f9a620', // Marigold
          500: '#e98b07',
          600: '#ca6503',
          700: '#a14606',
          800: '#85370d',
          900: '#712e11',
          950: '#421605',
        },
        terracotta: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#fad3cd',
          300: '#f5b5aa',
          400: '#ed8a79',
          500: '#b7472a', // Terracotta
          600: '#9f3820',
          700: '#852d1a',
          800: '#6f2919',
          900: '#5e261a',
          950: '#33100a',
        },
        seafoam: {
          50: '#f1fbfb',
          100: '#d3f3f4',
          200: '#a8dadc', // Seafoam
          300: '#7bc6c9',
          400: '#4dadb1',
          500: '#329196',
          600: '#2c757a',
          700: '#295f63',
          800: '#284e51',
          900: '#254245',
          950: '#13282b',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
