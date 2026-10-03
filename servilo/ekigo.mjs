// ≺⧼ ការចាប់ផ្តើម 🚀 ⧽≻
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const infanoj = [];

function ĉesigi(infano) {
  if ( !infano || infano.exitCode !== null || infano.signalCode !== null ) return;
  if ( process.platform === "win32" && infano.pid ) {
    try { spawn("taskkill", [ "/pid", String(infano.pid), "/T", "/F" ]); return; } catch { /* falu trae */ }
  }
  try { infano.kill(); } catch { /* jam fermita */ }
}

function lanĉi(argumentoj, nomo) {
  const infano = spawn(process.execPath, argumentoj, { cwd: RADIKO, stdio: "inherit" });
  infanoj.push(infano);
  infano.on("exit", ( kodo ) => {
    console.log(`( ${nomo} foriris kun kodo ${kodo ?? 0} )`);
    for ( const alia of infanoj ) if ( alia !== infano ) ĉesigi(alia);
    process.exit(kodo ?? 0);
  });
  return infano;
}

lanĉi([ "servilo/servilo.js" ], "retilo");
lanĉi([ "node_modules/vite/bin/vite.js" ], "vite");
lanĉi([ "servilo/konservilo.mjs" ], "konservilo");

for ( const signalo of [ "SIGINT", "SIGTERM" ] ) {
  process.on(signalo, () => {
    for ( const infano of infanoj ) ĉesigi(infano);
    process.exit(0);
  });
}
