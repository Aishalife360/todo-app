# To Do App

A Todo web app built with React, TypeScript, Redux Toolkit, and Tailwind CSS, backed by Supabase (Auth + Postgres) and deployed on Vercel.

## Features

- Register / Login (Supabase Auth, email + password)
- Add, complete, and delete todos, scoped per authenticated user
- Filter todos by All / Active / Completed
- Todos persisted in Supabase Postgres with row-level security

## Tech Stack

- React + TypeScript (Vite)
- React Router for client-side routing
- Redux Toolkit for global state
- Tailwind CSS for styling
- Supabase for auth and data storage

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL and anon key
npm run dev
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public API key |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally
