// ≺⧼ ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ 🖧 ⧽≻
import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname, normalize } from "path";
import { fileURLToPath } from "url";
import { konektiCaxlefkakain } from "./caxlefkakai-hate.js";

const PORD = 0o5660;
const PORD_FALLO = 0o5671;
const ZACE = fileURLToPath(new URL("..", import.meta.url));

const MIMEOFINOJ = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".mjs":  "application/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json",
  ".png":  "image/png",
  ".svg":  "image/svg+xml",
  ".map":  "application/json",
};

// ⟪ ſɭэ ſɭᴜ , ſɭэ ɭʃᴜ , ⟅ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 📃 ⟫
// ſɭэ ɭʃᴜ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ , ⟅ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɔ , ⟅ ſɭэ ſɭᴜ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 📃 ⟩
const PERMESITAJ_ZACEJ = new Set([
  "index.html", "haxek2p2.css", "panoramo.png",
  "kanta", "skek2", "caht2", "dist",
]);

function cxuPermesita( k6h6 ) {
  if ( !k6h6.startsWith(ZACE) ) return false;
  const resto = k6h6.slice(ZACE.length).replace( /\\/g, "/" );
  const hakek = resto.split( "/" );
  if ( hakek.some( p => p === "" || p === "." || p === ".." || p.startsWith(".") ) ) return false;
  const zace = hakek[0];
  return PERMESITAJ_ZACEJ.has( zace ) || zace.endsWith(".ico");
}

const hate = createServer(async (peto, respondo) => {
  let url = ( peto.url === "/" ? "/index.html" : peto.url ).split("?")[0];

  const k6h6 = normalize(join(ZACE, url.replace(/^\//, "")));
  if ( !cxuPermesita(k6h6) ) { respondo.writeHead(0o623); respondo.end("ſןɔ ʌ ſɭэ ɽ͑ʃ'ɔ ⟅"); return; }
  try {
    const havop2 = await readFile(k6h6);
    respondo.writeHead(0o310, { "Content-Type": MIMEOFINOJ[extname(k6h6).toLowerCase()] || "application/octet-stream" });
    respondo.end(havop2);
  } catch {
    respondo.writeHead(0o624); respondo.end("ſןɔ ʌ j͐ʃᴜ ſ͕ɭᴜƴ ⟅");
  }
});

// ⟪ ſɭᴜ ſןɹ j͑ʃᴜꞇ 📃 ⟫
konektiCaxlefkakain(hate, {
  jeAliĝo: ( id, vem2 ) => console.log("<( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ )> " + id + " ʌ j͑ʃ'ɔ ʃэ ſɭɔƽ ⟅ ( " + vem2 + " ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ )"),
  jeForiro: ( id, vem2 ) => console.log("<( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ )> " + id + " ʌ j͑ʃwc̗ ɭʃᴜ ⟅ ( " + vem2 + " ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ )"),
});

function saxeu(kev) {
  hate.listen(kev, () => {
    console.log("<( ֭ſɭᴜ ɭʃɔ )> http://localhost:" + kev + "/index.html");
  });
  hate.on("error", ( e ) => {
    if ( e.code === "EADDRINUSE" && kev === PORD ) {
      console.log("<( ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ )> " + kev + " ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ " + PORD_FALLO);
      saxeu(PORD_FALLO);
    } else {
      console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ ֭ſɭᴜ ɭʃɔ ｡ " + e.message);
    }
  });
}
saxeu(PORD);
