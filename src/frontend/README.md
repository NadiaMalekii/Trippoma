# Trippoma frontend

React + Vite + Tailwind frontend for the Trippoma API.

## Run locally

```bash
pnpm --ignore-workspace install
pnpm --ignore-workspace dev
```

The Vite development server proxies `/api` to `http://localhost:5081`, matching the backend HTTP launch profile. Start the API before opening the frontend.

For a separately hosted frontend, set `VITE_API_URL` to the API base URL, for example `https://api.example.com/api`.

## Build

```bash
pnpm --ignore-workspace build
```
