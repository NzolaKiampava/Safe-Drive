import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Plugin: copies MediaPipe WASM files into public/mediapipe-wasm
// Checks multiple possible pnpm install locations without relying on require.resolve,
// which fails when the package blocks ./package.json via "exports".
function mediapipeWasmPlugin() {
  return {
    name: "mediapipe-wasm-copy",
    buildStart() {
      // pnpm may hoist the package to the workspace root or keep it local
      const candidates = [
        // Local (safedrive's own node_modules — most common with pnpm)
        path.resolve(import.meta.dirname, "node_modules/@mediapipe/tasks-vision/wasm"),
        // Workspace root node_modules
        path.resolve(import.meta.dirname, "../../node_modules/@mediapipe/tasks-vision/wasm"),
        // pnpm virtual store (flat layout)
        path.resolve(import.meta.dirname, "../../node_modules/.pnpm/@mediapipe+tasks-vision@0.10.35/node_modules/@mediapipe/tasks-vision/wasm"),
      ];

      const src = candidates.find((p) => fs.existsSync(p));

      if (!src) {
        console.warn("[mediapipe-wasm] Could not find WASM files. Tried:\n" + candidates.join("\n"));
        return;
      }

      const dest = path.resolve(import.meta.dirname, "public/mediapipe-wasm");
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      for (const file of fs.readdirSync(src)) {
        fs.copyFileSync(path.join(src, file), path.join(dest, file));
      }
      console.log("[mediapipe-wasm] Copied WASM from:", src);
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
