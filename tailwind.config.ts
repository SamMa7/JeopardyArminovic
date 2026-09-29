import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
      './app/pages/**/*.vue',
      './app/storyblok/**/*.vue',
  ],
  safelist: [
    {pattern: /grid-cols-./}, 
    {pattern: /grid-rows-./,}
  ],
  theme: {
      extend: {
      },
  }
};
