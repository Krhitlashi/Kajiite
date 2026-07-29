// Minimum statika dosierservilo por Kajiite
import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname, normalize } from "path";
import { fileURLToPath } from "url";

const PORD = 0o5670;
const PORD_FALLO = 0o5671;
const RADIKO = fileURLToPath(new URL("..", import.meta.url)); // parent dir (project root)

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

const servilo = createServer(async (peto, respondo) => {
  let url = (peto.url === "/" ? "/index.html" : peto.url).split("?")[0];
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
  servilo.listen(pordo, () => console.log("Servilo: http://localhost:" + pordo + "/index.html"));
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
