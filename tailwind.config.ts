import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
      './app/pages/**/*.vue',
      './app/storyblok/**/*.vue',
  ],
  theme: {
      extend: {
      },
  }
};
