// Minimum statika dosierservilo por Kajiite — kun viva reŝargo (SSE)
import { createServer } from "http";
import { readFile } from "fs/promises";
import { watch } from "fs";
import { join, extname, normalize } from "path";
import { fileURLToPath } from "url";

const PORD = 0o5670;
const PORD_FALLO = 0o5671;
const RADIKO = fileURLToPath(new URL("..", import.meta.url)); // parent dir (project root)
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

// ⟪ SSE-klientoj por viva reŝargo 📃 ⟫
const sseKlientoj = new Set();
let reŝargaTempilo = null;

function sciigiSSEKluentojn() {
  // Malakrigi: se tsc skribas plurajn dosierojn samtempe, sendu nur unu reŝargon
  if (reŝargaTempilo) clearTimeout(reŝargaTempilo);
  reŝargaTempilo = setTimeout(() => {
    const pakajxo = "event: reload\ndata: " + Date.now() + "\n\n";
    for (const res of sseKlientoj) {
      try { res.write(pakajxo); } catch { sseKlientoj.delete(res); }
    }
    reŝargaTempilo = null;
  }, 80);
}

// Spekti dist/-on por sxangxoj
function komenciVidanReŝargon() {
  try {
    watch(DISTO, { recursive: true }, (_, dosiero) => {
      if (!dosiero || dosiero.endsWith(".map")) return; // saltu source map-ojn
      sciigiSSEKluentojn();
    });
    console.log("Viva reŝargo: spektas dist/");
  } catch (e) {
    console.warn("Ne povis spekti dist/: dist/ eble ne ekzistas");
  }
}

const servilo = createServer(async (peto, respondo) => {
  let url = (peto.url === "/" ? "/index.html" : peto.url).split("?")[0];

  // SSE-punkto por viva reŝargo
  if (url === "/__reload") {
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
  if (!vojo.startsWith(RADIKO)) { respondo.writeHead(0o623); respondo.end("Malpermesita"); return; }
  try {
    const datumoj = await readFile(vojo);
    respondo.writeHead(0o310, { "Content-Type": MIMEOFINOJ[extname(vojo).toLowerCase()] || "application/octet-stream" });
    respondo.end(datumoj);
  } catch {
    respondo.writeHead(0o624); respondo.end("Ne trovita");
  }
});

function komencu(pordo) {
  servilo.listen(pordo, () => {
    console.log("Servilo: http://localhost:" + pordo + "/index.html");
    komenciVidanReŝargon();
  });
  servilo.on("error", (e) => {
    if (e.code === "EADDRINUSE" && pordo === PORD) {
      console.log("Pordo " + pordo + " jam uzata — provas " + PORD_FALLO);
      komencu(PORD_FALLO);
    } else {
      console.error("Servila eraro:", e.message);
    }
  });
}
komencu(PORD);
