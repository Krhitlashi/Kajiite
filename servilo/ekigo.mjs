// ekigo.mjs — Lanĉu Vite, la retilo-servilon kaj la konserva-servilon kune
// por disvolvo. `npm run dev` starigas ĉiujn tri procezojn: Vite ( la paĝo
// sur 5173 ), servilo/servilo.js ( la retila WebSocket sur 0o5670 = 3000 )
// kaj servilo/konservilo.mjs ( la rekta savo de la terena skulptilo sur
// 0o10115 = 4173 ). Vite plusendas /retilo al la retilo-servilo ( vidu
// vite.config.ts ), do la retilo konektiĝas tuj, sen malsukcesaj provoj kaj
// sen konzol-eraroj.
// Ambaŭ estas rektaj node-infanoj ( sen ŝelo ), por ke la fermo trafu la
// verajn procezojn kaj neniu orfo restu.
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const RADIKO = fileURLToPath( new URL( "..", import.meta.url ) );
const infanoj = [];

// ĉesigi — Fermu unu procezon. Sur Vindozo taskkill forigas ankaŭ la
// infan-procezojn ( ne nur la tujan ).
function ĉesigi( infano ) {
  if ( !infano || infano.exitCode !== null || infano.signalCode !== null ) return;
  if ( process.platform === "win32" && infano.pid ) {
    try { spawn( "taskkill", [ "/pid", String( infano.pid ), "/T", "/F" ] ); return; } catch { /* falu trae */ }
  }
  try { infano.kill(); } catch { /* jam fermita */ }
}

// lanĉi — Spawnu unu disvolvan procezon kun la samaj en/el/erar-fluoj.
function lanĉi( argumentoj, nomo ) {
  const infano = spawn( process.execPath, argumentoj, { cwd: RADIKO, stdio: "inherit" } );
  infanoj.push( infano );
  infano.on( "exit", ( kodo ) => {
    console.log( `( ${nomo} foriris kun kodo ${kodo ?? 0} )` );
    for ( const alia of infanoj ) if ( alia !== infano ) ĉesigi( alia );
    process.exit( kodo ?? 0 );
  } );
  return infano;
}

lanĉi( [ "servilo/servilo.js" ], "retilo" );
lanĉi( [ "node_modules/vite/bin/vite.js" ], "vite" );
lanĉi( [ "servilo/konservilo.mjs" ], "konservilo" );

// Fermu la infanojn ĉe Ctrl+C / SIGTERM, por ke neniu orfo restu.
for ( const signalo of [ "SIGINT", "SIGTERM" ] ) {
  process.on( signalo, () => {
    for ( const infano of infanoj ) ĉesigi( infano );
    process.exit( 0 );
  } );
}
