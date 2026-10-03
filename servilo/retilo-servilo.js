// ≺⧼ ម៉ាស៊ីនមេបណ្តាញ 🖧 ⧽≻
import { createHash, randomBytes } from "crypto";

const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const PINGAŬZO = 0o51400;
const MAX_MESAGXO = 0o400000;

function akceptaKapo(klavo) {
  return createHash("sha1").update(klavo + GUID).digest("base64");
}

function pakigiTekston(teksto) {
  const buf = Buffer.from(teksto, "utf8");
  const longo = buf.length;
  let kapo;
  if ( longo < 0o176 ) { kapo = Buffer.alloc(0o2); kapo[0o1] = longo; }
  else if ( longo < 0o200000 ) { kapo = Buffer.alloc(0o4); kapo[0o1] = 0o176; kapo.writeUInt16BE(longo, 0o2); }
  else { kapo = Buffer.alloc(0o10); kapo[0o1] = 0o177; kapo.writeBigUInt64BE(BigInt(longo), 0o2); }
  kapo[0] = 0x81;
  return Buffer.concat([ kapo, buf ]);
}

function sendi(so, teksto) {
  try { so.write(pakigiTekston(teksto)); } catch { /* fermita */ }
}

function elsxuti(klientoj, kromId, teksto) {
  for ( const [ id, kliento ] of klientoj ) {
    if ( id !== kromId ) sendi(kliento.so, teksto);
  }
}

export function konektiRetilon(servilo, opcioj = {}) {
  const klientoj = new Map();
  let sekvaNumero = 0;

  function kreiIdon() {
    sekvaNumero++;
    return randomBytes(0o4).toString("hex") + "-" + sekvaNumero.toString(0o10);
  }

  function finiajKoordinatoj(m) {
    return Number.isFinite(m.x) && Number.isFinite(m.y) && Number.isFinite(m.z)
      && ( m.r === undefined || Number.isFinite(m.r) )
      && ( m.m === undefined || Number.isFinite(m.m) );
  }
  function pritrakti(kliento, teksto) {
    let mesagxo;
    try { mesagxo = JSON.parse(teksto); } catch { return; }
    if ( mesagxo && mesagxo.t === "stato" && typeof mesagxo.x === "number" && finiajKoordinatoj(mesagxo) ) {
      kliento.stato = mesagxo;
      elsxuti(klientoj, kliento.id, JSON.stringify({ t: "stato", id: kliento.id, ...mesagxo }));
    }
  }

  function malpakigi(bufro, kliento) {
    let rest = bufro;
    while ( rest.length >= 0o2 ) {
      const unua = rest[0];
      const fina = ( unua & 0x80 ) !== 0;
      const opkodo = unua & 0x0f;
      const dua = rest[1];
      const maskita = ( dua & 0x80 ) !== 0;
      let longo = dua & 0x7f;
      let i = 0o2;
      if ( longo === 0o176 ) { if ( rest.length < i + 0o2 ) break; longo = rest.readUInt16BE(i); i += 0o2; }
      else if ( longo === 0o177 ) {
        if ( rest.length < i + 0o10 ) break;
        const l = rest.readBigUInt64BE(i); i += 0o10;
        if ( l > BigInt(MAX_MESAGXO) ) { kliento.so.destroy(); return Buffer.alloc(0); }
        longo = Number(l);
      }
      if ( opkodo === 0x0 || opkodo === 0x1 ) {
        const amasigita = kliento.partoj ? kliento.partoj.reduce(( n, p ) => n + p.length, 0) : 0;
        if ( amasigita + longo > MAX_MESAGXO ) { kliento.so.destroy(); return Buffer.alloc(0); }
      }
      let masko = null;
      if ( maskita ) {
        if ( rest.length < i + 0o4 ) break;
        masko = rest.subarray(i, i + 0o4); i += 0o4;
      }
      if ( rest.length < i + longo ) break;
      let dat = rest.subarray(i, i + longo);
      i += longo;
      rest = rest.subarray(i);
      if ( masko ) {
        dat = Buffer.from(dat);
        for ( let j = 0; j < dat.length; j++ ) dat[j] ^= masko[j % 0o4];
      }
      if ( opkodo === 0x1 || opkodo === 0x0 ) {
        if ( opkodo === 0x1 ) kliento.partoj = [];
        kliento.partoj.push(dat.toString("utf8"));
        if ( fina ) {
          const teksto = kliento.partoj.join("");
          kliento.partoj = [];
          pritrakti(kliento, teksto);
        }
      } else if ( opkodo === 0x8 ) {
        try { kliento.so.write(Buffer.from([ 0x88, 0x00 ])); } catch { /* fermita */ }
        kliento.so.end();
        klientoj.delete(kliento.id);
        elsxuti(klientoj, kliento.id, JSON.stringify({ t: "foriris", id: kliento.id }));
        if ( opcioj.jeForiro ) opcioj.jeForiro(kliento.id, klientoj.size);
        return rest;
      } else if ( opkodo === 0x9 ) {
        const pong = Buffer.alloc(dat.length + 0o2);
        pong[0] = 0x8a; pong[1] = dat.length;
        dat.copy(pong, 0o2);
        kliento.so.write(pong);
      }
    }
    return rest;
  }

  servilo.on("upgrade", ( peto, so ) => {
    const klavo = peto.headers["sec-websocket-key"];
    const vojo = ( peto.url || "" ).split("?")[0];
    if ( !klavo || vojo !== "/retilo" ) { so.destroy(); return; }
    so.write(
      "HTTP/1.1 101 Switching Protocols\r\n" +
      "Upgrade: websocket\r\n" +
      "Connection: Upgrade\r\n" +
      "Sec-WebSocket-Accept: " + akceptaKapo(klavo) + "\r\n\r\n"
);
    const id = kreiIdon();
    const kliento = { so, id, stato: null, partoj: [], bufro: Buffer.alloc(0) };
    klientoj.set(id, kliento);
    sendi(so, JSON.stringify({ t: "saluton", id }));
    elsxuti(klientoj, id, JSON.stringify({ t: "aliĝis", id }));
    if ( opcioj.jeAliĝo ) opcioj.jeAliĝo(id, klientoj.size);

    so.on("data", ( d ) => {
      kliento.bufro = Buffer.concat([ kliento.bufro, d ]);
      kliento.bufro = malpakigi(kliento.bufro, kliento);
    });
    so.on("close", () => {
      if ( !klientoj.has(id) ) return;
      klientoj.delete(id);
      elsxuti(klientoj, id, JSON.stringify({ t: "foriris", id }));
      if ( opcioj.jeForiro ) opcioj.jeForiro(id, klientoj.size);
    });
    so.on("error", () => { try { so.destroy(); } catch { /* fermita */ } });
  });

  // ⟨ ការវាយកន្ត្រក 📃 ⟩
  const koro = setInterval(() => {
    for ( const kliento of klientoj.values() ) {
      try { kliento.so.write(Buffer.from([ 0x89, 0x00 ])); } catch { kliento.so.destroy(); }
    }
  }, PINGAŬZO);
  if ( koro.unref ) koro.unref();
}
