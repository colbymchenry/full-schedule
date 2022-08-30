import adapter from '@sveltejs/adapter-auto';
import {sveltePreprocess} from "svelte-preprocess/dist/autoProcess.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      define: {
        'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
        'CLOUDINARY_URL': process.env.CLOUDINARY_URL
      },
      ssr: {
        noExternal: [ 'dayjs' ]
      }
    }
  },
  preprocess: sveltePreprocess()
};

export default config;
