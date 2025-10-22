/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="mitrekadark"]'],
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        base: {
          100: "var(--color-base-100)",
          200: "var(--color-base-200)",
          300: "var(--color-base-300)",
          content: "var(--color-base-content)",
        },
        primary: "var(--color-primary)",
        "primary-content": "var(--color-primary-content)",
        secondary: "var(--color-secondary)",
        "secondary-content": "var(--color-secondary-content)",
        accent: "var(--color-accent)",
        "accent-content": "var(--color-accent-content)",
        neutral: "var(--color-neutral)",
        "neutral-content": "var(--color-neutral-content)",
        info: "var(--color-info)",
        "info-content": "var(--color-info-content)",
        success: "var(--color-success)",
        "success-content": "var(--color-success-content)",
        warning: "var(--color-warning)",
        "warning-content": "var(--color-warning-content)",
        error: "var(--color-error)",
        "error-content": "var(--color-error-content)",
      },
      borderRadius: {
        selector: "var(--radius-selector)",
        field: "var(--radius-field)",
        box: "var(--radius-box)",
      },
      spacing: {
        selector: "var(--size-selector)",
        field: "var(--size-field)",
      },
      borderWidth: {
        DEFAULT: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
