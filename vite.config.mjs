import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: '/',
  define: {
    global: 'window'
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    open: true,
    port: 3000
  },
  preview: {
    open: true,
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});
