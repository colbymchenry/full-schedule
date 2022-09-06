import adapter from '@sveltejs/adapter-auto';
import {sveltePreprocess} from "svelte-preprocess/dist/autoProcess.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      ssr: {
        // noExternal: [ 'dayjs' ]
      }
    }
  },
  preprocess: sveltePreprocess()
};

export default config;
