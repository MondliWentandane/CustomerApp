# Hotel App - Customer Frontend

A React + TypeScript + Vite application for hotel customers to book rooms and manage their reservations.

## Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Start your backend** (in a separate terminal):
   ```bash
   # In your backend directory
   npm start
   ```
   Make sure it's running on `http://localhost:3000`

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will automatically connect to your local backend via the Vite proxy.

## Local Backend Connection

The app is configured to connect to your local backend running on `http://localhost:3000` through a Vite proxy.

### How It Works

- Frontend runs on: `http://localhost:5174`
- Backend should run on: `http://localhost:3000`
- All `/api/*` requests are automatically proxied to your local backend

### Environment Variables (Optional)

- `VITE_API_URL`: Only needed if you want to override the default localhost URL (defaults to `http://localhost:3000/api`)
- `VITE_SUPABASE_URL`: (Optional) Supabase project URL for client-side features
- `VITE_SUPABASE_ANON_KEY`: (Optional) Supabase anonymous key for client-side features

The API client is configured in `src/lib/api.ts` and automatically:
- Includes authentication tokens from localStorage
- Handles CORS with credentials
- Manages token expiration and redirects to login

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
