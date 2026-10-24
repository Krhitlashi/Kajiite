// ≺⧼ ការកំណត់ Vite ⚙️ ⧽≻
import { defineConfig, type Plugin } from "vite";

const PORD_RETILO = 0o5660;

// ⟨ ឧបករណ៍វាស់មិនផ្ទុកហ្គេមឡើងវិញ ៖ `iloj/mezurilo` រត់លើ Node ហើយមិនមែនជា
// ផ្នែកនៃទំព័រណាមួយទេ ។ ដូច្នេះការកែវាមិនត្រូវផ្ទុកហ្គេមឡើងវិញទេ ។ 📃 ⟩
const ignoriIlojn = (): Plugin => ( {
  name: "ignori-ilojn",
  apply: "serve",
  handleHotUpdate( kunteksto ) {
    const dosiero = kunteksto.file.split( "\\" ).join( "/" );
    if ( !dosiero.includes( "/iloj/" ) ) return;
    if ( dosiero.includes( "/iloj/mezurilo/" ) || dosiero.endsWith( ".mjs" ) ) return [];
  },
} );

export default defineConfig({
  plugins: [ ignoriIlojn() ],
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
