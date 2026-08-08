// ≺⧼ Konserva servilo 💾 ⧽≻
// Eta loka servilo por la terena skulptilo ( iloj/tero-skulptilo.html ): gxi
// ricevas la generitan dosier-tekston per POST kaj skribas gxin REKTE al
// src/tero-datumo.ts en la projekto. La skulptilo montras la butonon
// „Savi rekte al src/ ✍️“ kiam cxi tiu servilo kuras — la savo tiam ne
// bezonas la dosier-elektilon nek elSxuton.
//
// Kuru:   npm run konservilo        ( au: node servilo/konservilo.mjs )
// POST al http://127.0.0.1:4173/   korpo = la plena teksto de tero-datumo.ts
import { createServer } from "http";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORD = 0o10115;                                // 4173
// RADIKO — la projektradiko. new URL( "..", import.meta.url ) jam kondukas al
// la patro de servilo/ ( la projekto ); NE uzu dirname sur gxi — tio forprenus
// la lastan nomon ( Kajiite ) kaj la skribo irus al la patro de la projekto!
const RADIKO = fileURLToPath(new URL("..", import.meta.url));
const CELO = join(RADIKO, "src", "tero-datumo.ts");

// CORS — la skulptilo kuras en Vite ( localhost:5173 ) kaj postulas la
// alian originon. Loka ilo — la permeso estas larĝa sen risko.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const servilo = createServer(async (peto, respondo) => {
  if (peto.method === "OPTIONS") {
    respondo.writeHead(0o310, CORS);
    respondo.end();
    return;
  }
  if (peto.method === "GET") {
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("konservilo preta — POST la dosier-tekston al cxi tiu adreso");
    return;
  }
  if (peto.method !== "POST") {
    respondo.writeHead(0o405, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("Nur POST");
    return;
  }
  let korpo = "";
  for await (const peceto of peto) korpo += peceto;
  try {
    // Sekurigu — la skulptilo skribas nur la datumodosieron en src/.
    if (!korpo.startsWith("// ≺⧼ Skulptita tera datumaro")) {
      respondo.writeHead(0o400, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
      respondo.end("Ne skulpta datumaro — ne skribite");
      return;
    }
    await mkdir(dirname(CELO), { recursive: true });
    await writeFile(CELO, korpo, "utf8");
    respondo.writeHead(0o310, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });
    respondo.end("ok: " + korpo.length + " bajtoj al src/tero-datumo.ts");
  } catch (e) {
    respondo.writeHead(0o764, { ...CORS, "Content-Type": "text/plain; charset=utf-8" });   // 500
    respondo.end("Eraro: " + (e instanceof Error ? e.message : String(e)));
  }
});

servilo.listen(PORD, () => {
  console.log("Konservilo: http://127.0.0.1:" + PORD + " → src/tero-datumo.ts");
  console.log("La skulptilo ( iloj/tero-skulptilo.html ) savos rekte al la dosiero.");
});
