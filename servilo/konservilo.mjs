// ≺⧼ Konserva servilo 💾 ⧽≻
// Eta loka servilo por la terena skulptilo ( iloj/tero-skulptilo.html ). gxi
// ricevas la generitan datumaron per POST kaj skribas gxin REKTE al src/ —
// la datumoj vivas en PROPRAJ dosieroj en src/tero-datumaro/ ( la krado,
// akvo, biomoj, bestoj, objektoj, urboj kaj vojoj ), kaj la
// skulptilo sendas ilin kiel JSON { dosieroj. { nomo. teksto } }. La skulptilo
// montras la butonon „Savi rekte al src/ ✍️“ kiam cxi tiu servilo kuras — la
// savo tiam ne bezonas la dosier-elektilon nek elSxuton.
//
// Kuru.   npm run konservilo        ( au. node servilo/konservilo.mjs )
// POST al http://127.0.0.1.4173/   korpo = JSON { dosieroj. { nomo. teksto } }
import { createServer } from "http";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;                                // 4173
// RADIKO — la projektradiko. new URL( "..", import.meta.url ) jam kondukas al
// la patro de servilo/ ( la projekto ); NE uzu dirname sur gxi — tio forprenus
// la lastan nomon ( Kajiite ) kaj la skribo irus al la patro de la projekto!
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(RADIKO, "src");

// La permesitaj dosieroj kaj iliaj titol-markiloj — la servilo skribas nur
// konatajn datumodosierojn kun la ĝusta markilo.
const DOSIEROJ = {
  "tero-datumaro/krado.ts": "// ≺⧼ Skulptita krado",
  "tero-datumaro/akvo.ts": "// ≺⧼ Skulptita akvo",
  "tero-datumaro/biomoj.ts": "// ≺⧼ Skulptitaj biomoj",
  "tero-datumaro/bestoj.ts": "// ≺⧼ Skulptitaj bestoj",
  // rultempo.ts NE plu skribiĝas — ĝi estas la komuna modulo ( la malkodaj
  // kaj samplaj funkcioj ) kiun la skulptilo importas; la savo skribas nur
  // la konstantajn dosierojn.
  "tero-datumaro/objektoj.ts": "// ≺⧼ Skulptitaj objektoj",
  "tero-datumaro/urboj.ts": "// ≺⧼ Skulptitaj urboj",
  "tero-datumaro/vojoj.ts": "// ≺⧼ Skulptitaj vojoj",
};

// CORS — la skulptilo kuras en Vite ( localhost.5173 ) kaj postulas la
// alian originon. Loka ilo — la permeso estas larĝa sen risko.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// La HTTP-stat-kodoj estas DEKUMAJ ( la retumila protokolo — 200, 400, 405, 500 ).
// La nura escepto de la 0o-oktala regulo — la kabloprotokolaj valoroj.

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
  // La korpo estas ĉirkaŭbarita — freneza kliento ne rajtas kreskigi la
  // memoron senlima ( la datumaroj estas malpli ol unu megobajto ).
  const KORPA_LIMO = 8 * 1024 * 1024;   // 8 MiB
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
    // Sekurigu — la skulptilo skribas nur la datumodosierojn en src/, kaj
    // cxiu dosiero devas komencigxi per sia markilo. Akceptu ankoraŭ la
    // malnovan platan korpon ( unu dosiero ) por retro-kongruo.
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
      const markilo = DOSIEROJ[nomo];
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
    respondo.end("ok: " + skribitaj + " dosiero(j) al src/");
  } catch ( e ) {
    respondo.writeHead(500, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("Eraro: " + ( e && e.message ? e.message : String(e) ));
  }
});

servilo.listen(PORD, "127.0.0.1", () => {
  console.log("Konservilo — http://127.0.0.1:" + PORD + " → src/tero-datumaro/ ( 7 datumodosieroj )");
});
