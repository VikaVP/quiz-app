import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig(configEnv => ({
  plugins: [
    react(),
    envCompatible(),
    tsConfigPaths(),
    viteCommonjs(),
    svgrPlugin(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3001,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
}))
