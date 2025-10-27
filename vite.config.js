import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@esotericsoftware/spine-phaser']
  }
});
