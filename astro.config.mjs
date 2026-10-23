import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weluvsnakes.com',
  integrations: [sitemap()],
  redirects: { '/games': '/#games', '/play': '/' },
});
