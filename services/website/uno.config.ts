import { defineConfig, presetUno, presetTypography, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
    },
  },
});