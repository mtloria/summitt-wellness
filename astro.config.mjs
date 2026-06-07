import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Update `site` to your GitHub Pages URL (e.g. 'https://yourusername.github.io')
// Update `base` to '/' once you have a custom domain pointed at GitHub Pages
export default defineConfig({
  site: 'https://mtloria.github.io',
  base: '/summitt-wellness',
  integrations: [react()],
  output: 'static',
});
