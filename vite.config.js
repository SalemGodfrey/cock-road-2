import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
export default defineConfig({
  optimizeDeps: {
    include: ["@esotericsoftware/spine-phaser"],
  },
  plugins: [vue(), viteSingleFile()],
});
