// ≺⧼ ការកំណត់ Vite ⚙️ ⧽≻
import { defineConfig } from "vite";

const PORD_RETILO = 0o5660;

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 0o1400,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "tri", test: /node_modules[\\/]three/ },
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      "/retilo": {
        target: `ws://localhost:${PORD_RETILO}`,
        ws: true,
      },
    },
  },
});
