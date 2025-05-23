import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import type { Plugin } from "vite";

export function imageResize(): Plugin {
  return {
    name: "image-resize",
    async buildStart() {
      const sizes = [48, 64, 128, 512, 600];
      const inputPath = "public/avatar.webp";
      const outputDir = "public/.avatar";

      if (!existsSync(inputPath)) {
        console.warn(
          `[!] source image ${inputPath} not found, skipping resize`,
        );
        return;
      }

      console.log("[1] generating responsive images...");

      await mkdir(outputDir, { recursive: true });

      for (const size of sizes) {
        await sharp(inputPath)
          .resize(size, size)
          .webp({ quality: 85 })
          .toFile(join(outputDir, `${size}.webp`));
      }

      console.log("[2] responsive images generated");
    },
  };
}
