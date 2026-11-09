// ≺⧼ ម៉ាស៊ីនមេ 🖧 ⧽≻
import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname, normalize } from "path";
import { fileURLToPath } from "url";
import { konektiRetilon } from "./retilo-servilo.js";

const PORD = 0o5660;
const PORD_FALLO = 0o5671;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));

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

// ⟪ តែថតនិងឯកសារដែលទំព័រត្រូវការ 📃 ⟫
// ម៉ាស៊ីនមេនេះបម្រើ WS ផងដែរ , ដូច្នេះការពិនិត្យត្រឹម RADIKO មិនគ្រប់គ្រាន់ទេ ។
// គ្មានហេតុផលឱ្យ HTTP អាន .git , node_modules , servilo ឬថតលាក់ផ្សេងៗ ។
const PERMESITAJ_RADIKOJ = new Set([
  "index.html", "stiloj.css", "panoramo.png",
  "kantaoj", "eskekoj", "iloj", "dist",
]);

function cxuPermesita( vojo ) {
  if ( !vojo.startsWith(RADIKO) ) return false;
  const resto = vojo.slice(RADIKO.length).replace( /\\/g, "/" );
  const partoj = resto.split( "/" );
  if ( partoj.some( p => p === "" || p === "." || p === ".." || p.startsWith(".") ) ) return false;
  const radiko = partoj[0];
  return PERMESITAJ_RADIKOJ.has( radiko ) || radiko.endsWith(".ico");
}

const servilo = createServer(async (peto, respondo) => {
  let url = ( peto.url === "/" ? "/index.html" : peto.url ).split("?")[0];

  const vojo = normalize(join(RADIKO, url.replace(/^\//, "")));
  if ( !cxuPermesita(vojo) ) { respondo.writeHead(0o623); respondo.end("ត្រូវបានហាមឃាត់"); return; }
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
