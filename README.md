# Vue 3 + Tailwind v4 Starter (CSS Variables Theme)

Mitreka Template

## Fix for Tailwind v4 + PostCSS

Tailwind v4 moves the PostCSS plugin into a separate package.

Install deps:

```bash
npm i -D @tailwindcss/postcss
```

PostCSS config (already set):

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

Then run:

```bash
npm i
npm run dev
```
