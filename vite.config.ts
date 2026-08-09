// vite.config.ts — Disvolva agordo. La retilo ( multludada ) kuras en sia
// propra procezo ( servilo/servilo.js, pordo 0o5670 = 3000 ); Vite plusendas
// /retilo al gxi, por ke la kliento konektigxu al la SAMA pordo kiel la pagxo
// ( 5173 ) sen malsukcesa unua provo kaj sen la konzol-eraro
// "WebSocket connection to ws://localhost:5173/retilo failed".
import { defineConfig } from "vite";

const PORD_RETILO = 0o5670;

export default defineConfig( {
  server: {
    proxy: {
      "/retilo": {
        target: `ws://localhost:${PORD_RETILO}`,
        ws: true,
      },
    },
  },
} );
