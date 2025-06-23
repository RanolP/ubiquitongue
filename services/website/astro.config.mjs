// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import unocss from '@unocss/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ranolp.github.io',
  base: '/ubiquitongue',
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
