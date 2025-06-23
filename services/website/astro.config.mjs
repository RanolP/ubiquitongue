// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import unocss from '@unocss/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ubqt.ranolp.dev',
  integrations: [
    solidJs(),
    unocss({
      injectReset: true,
    }),
    sitemap(),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
});
