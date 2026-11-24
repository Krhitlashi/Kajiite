// ≺⧼ ſɭэ ſɭᴜ , 💾 ⧽≻
import { createServer } from "http";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(RADIKO, "kantaoj");

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
// ſɭэ ᶗ‹ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭɩ ,
// ſɭэ ᶗ‹ , ꞙɭꞟ ,
const manifesto = JSON.parse(await readFile(join(SRC, "tero-datumaro", "manifesto.json"), "utf8"));
const DOSIEROJ = manifesto.datumaj;
const datumajNomoj = Object.keys(DOSIEROJ).map(n => n.replace(/\.ts$/, ""));
// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
const REGISTRAJ = {
  "mapoj.ts": manifesto.registraj["mapoj.ts"],
  "aktiva.ts": [ new RegExp("^export \\* from \"\\./[a-z0-9\\-]+/(" + datumajNomoj.join("|") + ")\\.js\";", "m") ],
};

// ⟪ ſȷwɔ˞ , 📃 ⟫
// ſȷwɔ˞ , ꞙɭı ,
// ſȷwɔ˞ , ꞙɭɿ ,
// ſȷwɔ˞ , ꞙɭц ,
// ſȷwɔ˞ , ꞙɭэ ,
const MUZIKO = join(RADIKO, "eskekoj", "sonoj", "muziko");
function muzikaMarkilo(nomo) {
  if ( typeof nomo !== "string" ) return null;
  const trako = /^muziko\/trako(\d{2})\.ts$/.exec(nomo);
  if ( trako ) {
    const n = parseInt(trako[1], 0o12);
    if ( n < 0o1 || n > 0o143 ) return null;
    return [ "export function buildTrack" + n + "(", "SpuroDateno" ];
  }
  if ( nomo === "muziko/kantoj.ts" ) return [ "export const KANTOJ" ];
  return null;
}
function markiloDe(nomo) {
  if ( typeof nomo !== "string" ) return null;
  const datumo = /^tero-datumaro\/([a-z0-9\-]{1,40})\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( datumo ) return DOSIEROJ[datumo[2]] ?? null;
  const registra = /^tero-datumaro\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( registra ) return REGISTRAJ[registra[1]] ?? null;
  return null;
}
function cxefaDe(nomo, teksto) {
  const bezonoj = markiloDe(nomo) ?? muzikaMarkilo(nomo);
  if ( !bezonoj || typeof teksto !== "string" ) return false;
  if ( !teksto.startsWith("//") ) return false;
  return bezonoj.every( b => typeof b === "string" ? teksto.includes( b ) : b.test( teksto ) );
}

function celoDe(nomo) {
  return nomo.startsWith("muziko/") ? join(MUZIKO, nomo.slice(0o7)) : join(SRC, nomo);
}

// ⟪ CORS 📃 ⟫
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const servilo = createServer(async (peto, respondo) => {
  if ( peto.method === "OPTIONS" ) {
    respondo.writeHead(0o310, CORS);
    respondo.end();
    return;
  }
  if ( peto.method === "GET" ) {
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("<( j͑ʃ'ɔ ſ̀ȷᴜȝ )> j͑ʃ'ɜ ſןɹ ʌ JSON ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ j͑ʃᴜ ı],ᴜ ſ͕ɭᴜ ʌ j͑ʃᴜꞇ ( ʃɔ˞ɹ ｡ j͑ʃп́ꞇ ſɭɔƴ )");
    return;
  }
  if ( peto.method !== "POST" ) {
    respondo.writeHead(0o625, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ſɭɹ ſᶘɔ ʌ POST ⟅");
    return;
  }
  const KORPA_LIMO = 0o10 * 0o2000 * 0o2000;
  let korpo = "";
  for await ( const peceto of peto ) {
    korpo += peceto;
    if ( korpo.length > KORPA_LIMO ) {
      peto.destroy();
      respondo.writeHead(0o635, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( ſןᴜ j͐ʃэ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ ) ꞙɭıɔ MiB");
      return;
    }
  }
  try {
    let dosieroj = null;
    if ( korpo.trim().startsWith("{") ) {
      const parzita = JSON.parse(korpo);
      dosieroj = parzita && typeof parzita === "object" ? parzita.dosieroj || parzita : null;
    }
    if ( !dosieroj || typeof dosieroj !== "object" ) {
      respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( j͑ʃ'ɜ ſןɹ ʌ ſןɔ ) ｡ ſןɔ ʌ ſɭɹʞ ⟅");
      return;
    }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
//   ſɭэ ᶗ‹ , ꞙɭɿ , 📃 ⟩
    const enskribotaj = Object.entries(dosieroj);
    for ( const [ nomo, teksto ] of enskribotaj ) {
      if ( !cxefaDe(nomo, teksto) ) {
        respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
        respondo.end("( ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɔ j͑ʃw ) " + nomo + " ｡ ſןɔ ʌ ſɭɹʞ ⟅");
        return;
      }
    }
    let skribitaj = 0;
    for ( const [ nomo, teksto ] of enskribotaj ) {
      await mkdir(dirname(celoDe(nomo)), { recursive: true });
      await writeFile(celoDe(nomo), teksto, "utf8");
      skribitaj++;
    }
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ok ｡ ꞙɭ" + skribitaj.toString(8) + " ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ kantaoj/");
  } catch ( e ) {
    respondo.writeHead(0o764, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) " + ( e && e.message ? e.message : String(e) ));
  }
});

const KVANTO_DOSIEROJ = "ꞙɭ" + Object.keys(DOSIEROJ).length.toString(8);

servilo.listen(PORD, "127.0.0.1", () => {
  console.log("<( j͑ʃ'ɔ ſ̀ȷᴜȝ )> http://127.0.0.1:" + PORD + " → kantaoj/tero-datumaro/<mapo>/ ( ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃ'ɜ ſןɹ ꞙɭ" + KVANTO_DOSIEROJ + " ｡ ʃᴜ j͐ʃɹ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ) ｡ muziko/ → eskekoj/sonoj/muziko/ ( j͑ʃп́ꞇ ſɭɔƴ ｡ j͑ʃп́ꞇ ſɭɔƴ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ )");
});
