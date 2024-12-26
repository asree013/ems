import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        shadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      },
      colors: {
        blue: {
          gd: {
            from: "#021B79",
            to: "#0575E6"
          },
        }
      }
    },
  },
  plugins: [],
};
export default config;
