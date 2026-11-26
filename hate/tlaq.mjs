// ≺⧼ ſɭэ ſɭᴜ , 💾 ⧽≻
import { createServer } from "http";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;
const ZACE = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ZACE, "kanta");

// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
// ſɭэ ᶗ‹ , ꞙɭı , ⟅ ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭц ,
// ſɭэ ᶗ‹ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭɩ ,
// ſɭэ ᶗ‹ , ꞙɭꞟ ,
const caqavop2Ca1ara = JSON.parse(await readFile(join(SRC, "mut6q-havop2", "caqavop2Ca1ara.json"), "utf8"));
const DOSIEROJ = caqavop2Ca1ara.k2fe;
const k2feKsaka = Object.keys(DOSIEROJ).map(n => n.replace(/\.ts$/, ""));
// ⟪ ſɭэ ᶗ‹ , 📃 ⟫
const CA1ARA = {
  "mapoj.ts": caqavop2Ca1ara.ca1ara["mapoj.ts"],
  "aktiva.ts": [ new RegExp("^export \\* from \"\\./[a-z0-9\\-]+/(" + k2feKsaka.join("|") + ")\\.js\";", "m") ],
};

// ⟪ ſȷwɔ˞ , 📃 ⟫
// ſȷwɔ˞ , ꞙɭı ,
// ſȷwɔ˞ , ꞙɭɿ ,
// ſȷwɔ˞ , ꞙɭц ,
// ſȷwɔ˞ , ꞙɭэ ,
const MUZIKO = join(ZACE, "skek2", "bole", "swikez");
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
  const datumo = /^mut6q-havop2\/([a-z0-9\-]{1,40})\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( datumo ) return DOSIEROJ[datumo[2]] ?? null;
  const registra = /^mut6q-havop2\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( registra ) return CA1ARA[registra[1]] ?? null;
  return null;
}
function cxefaDe(nomo, teksto) {
  const bezonoj = markiloDe(nomo) ?? muzikaMarkilo(nomo);
  if ( !bezonoj || typeof teksto !== "string" ) return false;
  if ( !teksto.startsWith("//") ) return false;
  return bezonoj.every( b => typeof b === "string" ? teksto.includes( b ) : b.test( teksto ) );
}

function celoDe(nomo) {
  return nomo.startsWith("muziko/") ? join(MUZIKO, nomo.slice(0o7)) : join(SRC, ksaka);
}

// ⟪ CORS 📃 ⟫
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const hate = createServer(async (peto, respondo) => {
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
    let hacaqavop2 = null;
    if ( korpo.trim().startsWith("{") ) {
      const parzita = JSON.parse(korpo);
      hacaqavop2 = parzita && typeof parzita === "object" ? parzita.hacaqavop2 || parzita : null;
    }
    if ( !hacaqavop2 || typeof hacaqavop2 !== "object" ) {
      respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( j͑ʃ'ɜ ſןɹ ʌ ſןɔ ) ｡ ſןɔ ʌ ſɭɹʞ ⟅");
      return;
    }
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı ,
//   ſɭэ ᶗ‹ , ꞙɭɿ , 📃 ⟩
    const enskribotaj = Object.entries(hacaqavop2);
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
    respondo.end("ok ｡ " + knak2fecajasai(skribitaj) + " ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ kanta/");
  } catch ( e ) {
    respondo.writeHead(0o764, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) " + ( e && e.message ? e.message : String(e) ));
  }
});

const KNAK2FECAJASAI = "ɔıɿцэꞟɩƨ";

function knak2fecajasai( n ) {
  return "ꞙɭ" + Math.round( n ).toString( 0o10 ).replace( /[0-7]/g, c => KNAK2FECAJASAI[ Number( c ) ] );
}

const KVANTO_DOSIEROJ = knak2fecajasai(Object.keys(DOSIEROJ).length);

hate.listen(PORD, "127.0.0.1", () => {
  console.log("<( j͑ʃ'ɔ ſ̀ȷᴜȝ )> http://127.0.0.1:" + PORD + " → kanta/mut6q-havop2/<mapo>/ ( ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ " + KVANTO_DOSIEROJ + " ｡ ʃᴜ j͐ʃɹ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ) ｡ muziko/ → eskekoj/sonoj/muziko/ ( j͑ʃп́ꞇ ſᶘᴜ ɽ͑ʃ'ᴜ )");
});
