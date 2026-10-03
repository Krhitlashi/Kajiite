// ≺⧼ ម៉ាស៊ីនមេរក្សាទុក 💾 ⧽≻
import { createServer } from "http";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(RADIKO, "kantaoj");

// ⟪ ឯកសារទិន្នន័យដែលអនុញ្ញាត 📃 ⟫
const DOSIEROJ = {
  "krado.ts": "// ≺⧼ Skulptita krado",
  "akvo.ts": "// ≺⧼ Skulptita akvo",
  "akvofontoj.ts": "// ≺⧼ Skulptitaj akvofontoj",
  "biomoj.ts": "// ≺⧼ Skulptitaj biomoj",
  "bestoj.ts": "// ≺⧼ Skulptitaj bestoj",
  "objektoj.ts": "// ≺⧼ Skulptitaj objektoj",
  "urboj.ts": "// ≺⧼ Skulptitaj urboj",
  "vojoj.ts": "// ≺⧼ Skulptitaj vojoj",
};
// ⟪ ឯកសារចុះបញ្ជី 📃 ⟫
const REGISTRAJ = {
  "mapoj.ts": "// ≺⧼ Mapoj",
  "aktiva.ts": "// ≺⧼ Aktiva mapo",
};

function markiloDe(nomo) {
  if ( typeof nomo !== "string" ) return null;
  const datumo = /^tero-datumaro\/([a-z0-9\-]{1,40})\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( datumo ) return DOSIEROJ[datumo[2]] ?? null;
  const registra = /^tero-datumaro\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( registra ) return REGISTRAJ[registra[1]] ?? null;
  return null;
}

// ⟪ CORS 📃 ⟫
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const servilo = createServer(async (peto, respondo) => {
  if ( peto.method === "OPTIONS" ) {
    respondo.writeHead(200, CORS);
    respondo.end();
    return;
  }
  if ( peto.method === "GET" ) {
    respondo.writeHead(200, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("konservilo preta — POST la JSON-datumaron al cxi tiu adreso");
    return;
  }
  if ( peto.method !== "POST" ) {
    respondo.writeHead(405, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("Nur POST");
    return;
  }
  const KORPA_LIMO = 0o10 * 0o2000 * 0o2000;
  let korpo = "";
  for await ( const peceto of peto ) {
    korpo += peceto;
    if ( korpo.length > KORPA_LIMO ) {
      peto.destroy();
      respondo.writeHead(413, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("Korpo tro granda — 8 MiB maksimumo");
      return;
    }
  }
  try {
    let dosieroj;
    if ( korpo.trim().startsWith("{") ) {
      const parzita = JSON.parse(korpo);
      dosieroj = parzita && typeof parzita === "object" ? parzita.dosieroj || parzita : null;
    } else {
      dosieroj = { "tero-datumo.ts": korpo };
    }
    if ( !dosieroj || typeof dosieroj !== "object" ) {
      respondo.writeHead(400, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("Ne skulpta datumaro — ne skribite");
      return;
    }
    let skribitaj = 0;
    for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) {
      const markilo = markiloDe(nomo);
      if ( !markilo || typeof teksto !== "string" || !teksto.startsWith(markilo) ) {
        respondo.writeHead(400, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
        respondo.end("Rifuzita dosiero: " + nomo + " — ne skribite");
        return;
      }
      await mkdir(dirname(join(SRC, nomo)), { recursive: true });
      await writeFile(join(SRC, nomo), teksto, "utf8");
      skribitaj++;
    }
    respondo.writeHead(200, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ok: " + skribitaj + " dosiero(j) al kantaoj/");
  } catch ( e ) {
    respondo.writeHead(500, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("Eraro: " + ( e && e.message ? e.message : String(e) ));
  }
});

servilo.listen(PORD, "127.0.0.1", () => {
  console.log("Konservilo — http://127.0.0.1:" + PORD + " → kantaoj/tero-datumaro/<mapo>/ ( 7 datumodosieroj + la mapoj-registro )");
});
