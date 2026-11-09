// ≺⧼ ម៉ាស៊ីនមេរក្សាទុក 💾 ⧽≻
import { createServer } from "http";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(RADIKO, "kantaoj");

// ⟪ ឯកសារទិន្នន័យដែលអនុញ្ញាត 📃 ⟫
// បញ្ជីតែមួយនៅ kantaoj/tero-datumaro/manifesto.json , ចែករំលែកជាមួយ
// ឧបករណ៍ឆ្លាក់ដី ។ ផ្ទៀងផ្ទាត់ដោយច្បាប់ចម្លងនៃឈ្មោះចេញ
// ( export const ... ) ដែលឧបករណ៍ឆ្លាក់ដីសរសេរក្នុងឯកសារនីមួយៗ ។
// បឋមកថាផ្លាស់ប្តូរអក្សរ ( ឈ្មោះឯកសារជាភាសាខ្មែរ ) ដូច្នេះមិនត្រូវ
// ពឹងផ្អែកលើវាទេ ។ អត្ថបទត្រូវចាប់ផ្តើមដោយយោបល់ ( ឯកសារទិន្នន័យ
// ទាំងអស់មានបឋមកថា ) ។ ឯកសារចុះបញ្ជីប្រើលំនាំបន្ទាត់ពេញ
// មិនមែនឃ្លារលុងពីរដាច់ពីគ្នាទេ ។
const manifesto = JSON.parse(await readFile(join(SRC, "tero-datumaro", "manifesto.json"), "utf8"));
const DOSIEROJ = manifesto.datumaj;
const datumajNomoj = Object.keys(DOSIEROJ).map(n => n.replace(/\.ts$/, ""));
// ⟪ ឯកសារចុះបញ្ជី 📃 ⟫
const REGISTRAJ = {
  "mapoj.ts": manifesto.registraj["mapoj.ts"],
  "aktiva.ts": [ new RegExp("^export \\* from \"\\./[a-z0-9\\-]+/(" + datumajNomoj.join("|") + ")\\.js\";", "m") ],
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
  return bezonoj.every( b => typeof b === "string" ? teksto.includes( b ) : b.test( teksto ) );
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
    let dosieroj = null;
    if ( korpo.trim().startsWith("{") ) {
      const parzita = JSON.parse(korpo);
      dosieroj = parzita && typeof parzita === "object" ? parzita.dosieroj || parzita : null;
    }
    if ( !dosieroj || typeof dosieroj !== "object" ) {
      respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) មិនមែនទិន្នន័យឆ្លាក់ , មិនបានសរសេរ");
      return;
    }
    // ⟨ ពិនិត្យគ្រប់ឯកសារជាមុនសិន ។ បើឯកសារណាមួយខុស គ្មានឯកសារណាត្រូវសរសេរ
    //   ទាល់តែសោះ , កុំឱ្យទិន្នន័យផែនទីនៅពាក់កណ្តាល ។ 📃 ⟩
    const enskribotaj = Object.entries(dosieroj);
    for ( const [ nomo, teksto ] of enskribotaj ) {
      if ( !cxefaDe(nomo, teksto) ) {
        respondo.writeHead(0o620, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
        respondo.end("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ឯកសារត្រូវបានបដិសេធ , " + nomo + " , មិនបានសរសេរ");
        return;
      }
    }
    let skribitaj = 0;
    for ( const [ nomo, teksto ] of enskribotaj ) {
      await mkdir(dirname(join(SRC, nomo)), { recursive: true });
      await writeFile(join(SRC, nomo), teksto, "utf8");
      skribitaj++;
    }
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ok , 0o" + skribitaj.toString(8) + " ឯកសារ ទៅ kantaoj/");
  } catch ( e ) {
    respondo.writeHead(0o764, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) " + ( e && e.message ? e.message : String(e) ));
  }
});

const KVANTO_DOSIEROJ = "0o" + Object.keys(DOSIEROJ).length.toString(8);

servilo.listen(PORD, "127.0.0.1", () => {
  console.log("<( ឧបករណ៍រក្សាទុក )> http://127.0.0.1:" + PORD + " → kantaoj/tero-datumaro/<mapo>/ ( ឯកសារទិន្នន័យ " + KVANTO_DOSIEROJ + " + បញ្ជីផែនទី )");
});
