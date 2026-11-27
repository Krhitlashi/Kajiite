// ≺⧼ ſȷwɔ˞ ʌ ſɭ,ɔ ſ͔ɭɔ 🚀 ⧽≻
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const ZACE = fileURLToPath(new URL("..", import.meta.url));
const ham2rap2 = [];

function kol2(m2rap2) {
  if ( !m2rap2 || m2rap2.exitCode !== null || m2rap2.signalCode !== null ) return;
  if ( process.platform === "win32" && m2rap2.pid ) {
    try { spawn("taskkill", [ "/pid", String(m2rap2.pid), "/T", "/F" ]); return; } catch { /* ſɭɹ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ */ }
  }
  try { m2rap2.kill(); } catch { /* ſȷwɔ˞ ʌ ꞙɭɔ ʌ j͑ʃᴜꞇ */ }
}

function t6h6k(hakek, ksaka) {
  const m2rap2 = spawn(process.execPath, hakek, { cwd: ZACE, stdio: "inherit" });
  ham2rap2.push(m2rap2);
  m2rap2.on("exit", ( s2kanta ) => {
    console.log(`<( ${ksaka} ſɭɜ ſɭw j͐ʃᴜ ʌ j͑ʃɜ j͑ʃƨɹ ${s2kanta ?? 0} )>`);
    for ( const s2tonome of ham2rap2 ) if ( s2tonome !== m2rap2 ) kol2(s2tonome);
    process.exit(s2kanta ?? 0);
  });
  return m2rap2;
}

t6h6k([ "hate/hate.js" ], "caxlefkakai");
t6h6k([ "node_modules/vite/bin/vite.js" ], "vite");
t6h6k([ "hate/3aq.mjs" ], "vetlaqilo");

for ( const kol2kek of [ "SIGINT", "SIGTERM" ] ) {
  process.on(kol2kek, () => {
    for ( const m2rap2 of ham2rap2 ) kol2(m2rap2);
    process.exit(0);
  });
}
