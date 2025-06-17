# Rick & Morty Character Quiz

This is a small web quiz that fetches random characters from the [Rick and Morty API](https://rickandmortyapi.com/) and challenges you to identify them. It is built with **React**, **TypeScript**, **Vite**, **Chakra UI** and **Tailwind CSS**.

## How it works

- On start you are presented with an intro card. Press **Start Quiz** to begin.
- The quiz consists of five random characters. Each question shows an image and some info (origin and current location) as hints.
- Choose the correct character name from the list of options. You have up to three hints that eliminate two wrong answers.
- After the last question you see your score and can export a shareable image or restart the quiz.
- Dark mode is supported via the toggle button in the top‑left corner.

## Running locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   Then open `http://localhost:5173` in your browser.

3. **Other commands**

   - `npm run build` – build a production bundle
   - `npm run preview` – preview the production build
   - `npm run lint` – run ESLint on the source files

Node.js 18 or newer is recommended.

## Project structure

The main application lives in [`src/`](src) with the following key pieces:

- [`src/App.tsx`](src/App.tsx) – application shell and page flow
- [`src/components/sections`](src/components/sections) – Intro, Quiz and Results components
- [`src/components/ui`](src/components/ui) – UI helpers like theming and toaster
- [`src/types`](src/types) – TypeScript definitions used across the app

Feel free to explore and modify the code. Have fun!
