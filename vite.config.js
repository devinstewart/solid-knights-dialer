import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    root: './src',
    build: {
        target: 'esnext',
        outDir: '../dist',
        emptyOutDir: true
    }
});
