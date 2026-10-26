// ≺⧼ ម៉ាស៊ីនមេរក្សាទុក 💾 ⧽≻
import { createServer } from "http";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(RADIKO, "kantaoj");

// ⟪ ឯកសារទិន្នន័យដែលអនុញ្ញាត 📃 ⟫
// ផ្ទៀងផ្ទាត់ដោយច្បាប់ចម្លងនៃឈ្មោះចេញ ( export const ... ) ដែលឧបករណ៍
// ឆ្លាក់ដីសរសេរក្នុងឯកសារនីមួយៗ ។ បឋមកថាផ្លាស់ប្តូរអក្សរ ( ឈ្មោះ
// ឯកសារជាភាសាខ្មែរ ) ដូច្នេះមិនត្រូវពឹងផ្អែកលើវាទេ ។ អត្ថបទត្រូវ
// ចាប់ផ្តើមដោយយោបល់ ( ឯកសារទិន្នន័យទាំងអស់មានបឋមកថា ) ។
const DOSIEROJ = {
  "krado.ts": [ "export const SKULPTA_PASO", "export const SKULPTA_DELTAJ" ],
  "akvo.ts": [ "export const SKULPTA_AKVA_NIVELO", "export const SKULPTA_AKVA_MASKO" ],
  "akvofontoj.ts": [ "export const SKULPTA_AKVOFONTOJ" ],
  "biomoj.ts": [ "export const SKULPTA_BIOMOJ" ],
  "bestoj.ts": [ "export const SKULPTA_BESTOJ" ],
  "objektoj.ts": [ "export const SKULPTA_OBJEKTOJ" ],
  "urboj.ts": [ "export const SKULPTA_URBOJ" ],
  "vojoj.ts": [ "export const SKULPTA_VOJOJ", "export const SKULPTA_DOKOJ" ],
};
// ⟪ ឯកសារចុះបញ្ជី 📃 ⟫
const REGISTRAJ = {
  "mapoj.ts": [ "export const MAPOJ" ],
  "aktiva.ts": [ "export * from \"./", "krado.js" ],
};

function markiloDe(nomo) {
  if ( typeof nomo !== "string" ) return null;
  const datumo = /^tero-datumaro\/([a-z0-9\-]{1,40})\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( datumo ) return DOSIEROJ[datumo[2]] ?? null;
  const registra = /^tero-datumaro\/([a-z0-9\-]+\.ts)$/.exec(nomo);
  if ( registra ) return REGISTRAJ[registra[1]] ?? null;
  return null;
}
function cxefaDe(nomo, teksto) {
  const bezonoj = markiloDe(nomo);
  if ( !bezonoj || typeof teksto !== "string" ) return false;
  if ( !teksto.startsWith("//") ) return false;
  return bezonoj.every(b => teksto.includes(b));
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
    respondo.end("<( ឧបករណ៍រក្សាទុករួចរាល់ )> POST ទិន្នន័យ JSON ទៅអាសយដ្ឋាននេះ");
    return;
  }
  if ( peto.method !== "POST" ) {
    respondo.writeHead(0o625, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("តែ POST ប៉ុណ្ណោះ");
    return;
  }
  const KORPA_LIMO = 0o10 * 0o2000 * 0o2000;
  let korpo = "";
  for await ( const peceto of peto ) {
    korpo += peceto;
    if ( korpo.length > KORPA_LIMO ) {
      peto.destroy();
      respondo.writeHead(0o635, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) តួធំពេក , អតិបរមា 0o10 MiB");
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
      respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) មិនមែនទិន្នន័យឆ្លាក់ , មិនបានសរសេរ");
      return;
    }
    let skribitaj = 0;
    for ( const [ nomo, teksto ] of Object.entries(dosieroj) ) {
      if ( !cxefaDe(nomo, teksto) ) {
        respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
        respondo.end("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ឯកសារត្រូវបានបដិសេធ , " + nomo + " , មិនបានសរសេរ");
        return;
      }
      await mkdir(dirname(join(SRC, nomo)), { recursive: true });
      await writeFile(join(SRC, nomo), teksto, "utf8");
      skribitaj++;
    }
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ok , " + skribitaj + " ឯកសារ ទៅ kantaoj/");
  } catch ( e ) {
    respondo.writeHead(0o764, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) " + ( e && e.message ? e.message : String(e) ));
  }
});

servilo.listen(PORD, "127.0.0.1", () => {
  console.log("<( ឧបករណ៍រក្សាទុក )> http://127.0.0.1:" + PORD + " → kantaoj/tero-datumaro/<mapo>/ ( ឯកសារទិន្នន័យ 7 + បញ្ជីផែនទី )");
});
