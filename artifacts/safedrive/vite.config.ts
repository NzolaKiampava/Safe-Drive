import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Plugin: copies MediaPipe WASM files into public/mediapipe-wasm
// Uses require.resolve to find the package regardless of pnpm hoisting strategy.
function mediapipeWasmPlugin() {
  return {
    name: "mediapipe-wasm-copy",
    buildStart() {
      const require = createRequire(import.meta.url);
      // Resolve the real package location (works with pnpm virtual store)
      const pkgDir = path.dirname(
        require.resolve("@mediapipe/tasks-vision/package.json")
      );
      const src = path.join(pkgDir, "wasm");
      const dest = path.resolve(import.meta.dirname, "public/mediapipe-wasm");

      if (!fs.existsSync(src)) {
        console.warn("[mediapipe-wasm] WASM source not found at:", src);
        return;
      }
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      for (const file of fs.readdirSync(src)) {
        fs.copyFileSync(path.join(src, file), path.join(dest, file));
      }
      console.log("[mediapipe-wasm] WASM files copied to public/mediapipe-wasm");
    },
  };
}


const rawPort = process.env.PORT || "3000";

const port = Number(rawPort);

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    mediapipeWasmPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
