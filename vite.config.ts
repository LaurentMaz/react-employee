import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Pour utiliser les APIs globales de Vitest comme `describe`, `it`, etc.
    environment: "jsdom", // pour que Vitest fonctionne avec DOM
    setupFiles: "./tests/setup.ts", // si vous avez un fichier de setup
    exclude: [...configDefaults.exclude, "e2e/*"], // Exclure certains dossiers de test
  },
});
