// ≺⧼ ម៉ាស៊ីនមេ 🖧 ⧽≻
import { createServer } from "http";
import { readFile } from "fs/promises";
import { watch } from "fs";
import { join, extname, normalize } from "path";
import { fileURLToPath } from "url";
import { konektiRetilon } from "./retilo-servilo.js";

const PORD = 0o5660;
const PORD_FALLO = 0o5671;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const DISTO = join(RADIKO, "dist");

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

// ⟪ អតិថិជន SSE សម្រាប់ផ្ទុកបន្តផ្ទាល់ 📃 ⟫
const sseKlientoj = new Set();
let reŝargaTempilo = null;

function sciigiSSEKluentojn() {
  if ( reŝargaTempilo ) clearTimeout(reŝargaTempilo);
  reŝargaTempilo = setTimeout(() => {
    const pakajxo = "event: reload\ndata: " + Date.now() + "\n\n";
    for ( const res of sseKlientoj ) {
      try { res.write(pakajxo); } catch { sseKlientoj.delete(res); }
    }
    reŝargaTempilo = null;
  }, 0o100);
}

function komenciVidanReŝargon() {
  try {
    watch(DISTO, { recursive: true }, ( _, dosiero ) => {
      if ( !dosiero || dosiero.endsWith(".map") ) return;
      sciigiSSEKluentojn();
    });
    console.log("<( ផ្ទុកឡើងវិញផ្ទាល់ )> ឃ្លាំមើល dist/");
  } catch ( e ) {
    console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) មិនអាចឃ្លាំមើល dist/ បានទេ , dist/ ប្រហែលមិនមាន");
  }
}

const servilo = createServer(async (peto, respondo) => {
  let url = ( peto.url === "/" ? "/index.html" : peto.url ).split("?")[0];

  if ( url === "/__reload" ) {
    respondo.writeHead(0o310, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    });
    respondo.write("event: connected\ndata: \n\n");
    sseKlientoj.add(respondo);
    peto.on("close", () => sseKlientoj.delete(respondo));
    return;
  }

  const vojo = normalize(join(RADIKO, url.replace(/^\//, "")));
  if ( !vojo.startsWith(RADIKO) ) { respondo.writeHead(0o623); respondo.end("ត្រូវបានហាមឃាត់"); return; }
  try {
    const datumoj = await readFile(vojo);
    respondo.writeHead(0o310, { "Content-Type": MIMEOFINOJ[extname(vojo).toLowerCase()] || "application/octet-stream" });
    respondo.end(datumoj);
  } catch {
    respondo.writeHead(0o624); respondo.end("រកមិនឃើញ");
  }
});

// ⟪ បណ្តាញ 📃 ⟫
konektiRetilon(servilo, {
  jeAliĝo: ( id, kvanto ) => console.log("<( បណ្តាញ )> " + id + " បានចូលរួម ( " + kvanto + " សកម្ម )"),
  jeForiro: ( id, kvanto ) => console.log("<( បណ្តាញ )> " + id + " បានចាកចេញ ( " + kvanto + " សកម្ម )"),
});

function komencu(pordo) {
  servilo.listen(pordo, () => {
    console.log("<( ម៉ាស៊ីនបម្រើ )> http://localhost:" + pordo + "/index.html");
    komenciVidanReŝargon();
  });
  servilo.on("error", ( e ) => {
    if ( e.code === "EADDRINUSE" && pordo === PORD ) {
      console.log("<( ច្រក )> " + pordo + " កំពុងប្រើរួច , ព្យាយាម " + PORD_FALLO);
      komencu(PORD_FALLO);
    } else {
      console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) កំហុសម៉ាស៊ីនបម្រើ , " + e.message);
    }
  });
}
komencu(PORD);
