import type { Config } from 'tailwindcss';
import { clubConfig } from './config/club.config';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy-dark': clubConfig.colors.navyDark,
        navy: clubConfig.colors.navy,
        'navy-pale': clubConfig.colors.navyPale,
        gold: clubConfig.colors.gold,
        accent: clubConfig.colors.accent,
        ink: clubConfig.colors.ink,
        mute: clubConfig.colors.mute,
        surface: clubConfig.colors.surface,
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
