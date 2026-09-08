// vite.config.ts — Disvolva agordo. La retilo ( multludada ) kuras en sia
// propra procezo ( servilo/servilo.js, pordo 0o5660 = 2992 ); Vite plusendas
// /retilo al gxi, por ke la kliento konektigxu al la SAMA pordo kiel la pagxo
// ( 5173 ) sen malsukcesa unua provo kaj sen la konzol-eraro
// "WebSocket connection to ws://localhost.5173/retilo failed".
import { defineConfig } from "vite";

const PORD_RETILO = 0o5660;

export default defineConfig({
  build: {
    // three.js mem estas pli ol 500 kB minigita — tio estas atendata por
    // 3D-motoro, ne pakiga eraro, do la averto leveriĝas super ĝian realan
    // grandon.
    chunkSizeWarningLimit: 0o1400,
    rolldownOptions: {
      output: {
        // Aparta vendisto-ĉerpo por three.js — la aplikaĵa kodo ŝanĝiĝas
        // ofte, la motoro ne, do la foliumilo reuzas la motoran ĉerpon inter
        // versioj.
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
