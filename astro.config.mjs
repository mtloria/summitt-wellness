import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://summittwellness.com',
  base: '/',
  integrations: [react()],
  output: 'static',
});
