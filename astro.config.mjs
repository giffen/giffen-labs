// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://giffenlabs.ca',
  vite: {
    // Tailwind v4 ships a Vite plugin typed against a different vite version
    // than Astro's bundled vite — the runtime is compatible; the type isn't.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
