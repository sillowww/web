import { defineConfig } from "vite";
import { imageResize } from "./vite/image-resize";

export default defineConfig({
  plugins: [imageResize()],
});
