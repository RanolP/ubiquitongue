import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
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
