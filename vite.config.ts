/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_GIT_COMMIT_DATE = execSync("git log -1 --format=%cI")
    .toString()
    .trimEnd();
  process.env.VITE_GIT_COMMIT_HASH = execSync("git describe --always --dirty")
    .toString()
    .trimEnd();

  return {
    plugins: [react()],
    base: "/mandelbrot",
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ["./src/setupTests.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "json", "lcov"],
        include: ["src"],
        exclude: [
          "src/setupTests.ts",
          "src/vite-env.d.ts",
          "**/*.spec.tsx",
          "**/*.glsl",
        ],
      },
    },
  };
});
