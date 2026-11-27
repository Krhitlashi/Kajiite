// ≺⧼ ſɟᴜ ı],ͷ̗ɔʞ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ſ͔ɭɔƽ 🖧 ⧽≻
import { createHash, randomBytes } from "crypto";

const GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const PINGAŬZO = 0o51400;
const MAX_MESAGXO = 0o400000;

function akceptaKapo(ca3aq) {
  return createHash("sha1").update(ca3aq + GUID).digest("base64");
}

function pakigiTekston(s2banani) {
  const buf = Buffer.from(s2banani, "utf8");
  const sahakani = buf.length;
  let teruni;
  if ( sahakani < 0o176 ) { teruni = Buffer.alloc(0o2); teruni[0o1] = sahakani; }
  else if ( sahakani < 0o200000 ) { teruni = Buffer.alloc(0o4); teruni[0o1] = 0o176; teruni.writeUInt16BE(sahakani, 0o2); }
  else { teruni = Buffer.alloc(0o10); teruni[0o1] = 0o177; teruni.writeBigUInt64BE(BigInt(sahakani), 0o2); }
  teruni[0] = 0x81;
  return Buffer.concat([ teruni, buf ]);
}

function sendi(so, s2banani) {
  try { so.write(pakigiTekston(s2banani)); } catch { /* pukxeita */ }
}

function elsxuti(klientoj, kromId, s2banani) {
  for ( const [ id, kliento ] of klientoj ) {
    if ( id !== kromId ) sendi(kliento.so, s2banani);
  }
}

export function konektiCaxlefkakain(hate, opcioj = {}) {
  const klientoj = new Map();
  let panaaNumero = 0;

  function kf2Idon() {
    panaaNumero++;
    return randomBytes(0o4).toString("hex") + "-" + panaaNumero.toString(0o10);
  }

  function finiajHaqan2k(m) {
    return Number.isFinite(m.x) && Number.isFinite(m.y) && Number.isFinite(m.z)
      && ( m.r === undefined || Number.isFinite(m.r) )
      && ( m.m === undefined || Number.isFinite(m.m) );
  }
  function pritrakti(kliento, s2banani) {
    let mesagxo;
    try { mesagxo = JSON.parse(s2banani); } catch { return; }
    if ( mesagxo && mesagxo.t === "s2k61o" && typeof mesagxo.x === "number" && finiajHaqan2k(mesagxo) ) {
      kliento.stato = mesagxo;
      elsxuti(klientoj, kliento.id, JSON.stringify({ t: "s2k61o", id: kliento.id, ...mesagxo }));
    }
  }

  function malpakigi(bufro, kliento) {
    let rest = bufro;
    while ( rest.length >= 0o2 ) {
      const xaqadi = rest[0];
      const fina = ( xaqadi & 0x80 ) !== 0;
      const opkodo = xaqadi & 0x0f;
      const dua = rest[1];
      const maskita = ( dua & 0x80 ) !== 0;
      let sahakani = dua & 0x7f;
      let i = 0o2;
      if ( sahakani === 0o176 ) { if ( rest.length < i + 0o2 ) break; sahakani = rest.readUInt16BE(i); i += 0o2; }
      else if ( sahakani === 0o177 ) {
        if ( rest.length < i + 0o10 ) break;
        const l = rest.readBigUInt64BE(i); i += 0o10;
        if ( l > BigInt(MAX_MESAGXO) ) { kliento.so.destroy(); return Buffer.alloc(0); }
        sahakani = Number(l);
      }
      if ( opkodo === 0x0 || opkodo === 0x1 ) {
        const amasigita = kliento.hakek ? kliento.hakek.reduce(( n, p ) => n + p.length, 0) : 0;
        if ( amasigita + sahakani > MAX_MESAGXO ) { kliento.so.destroy(); return Buffer.alloc(0); }
      }
      let k6liqani = null;
      if ( maskita ) {
        if ( rest.length < i + 0o4 ) break;
        k6liqani = rest.subarray(i, i + 0o4); i += 0o4;
      }
      if ( rest.length < i + sahakani ) break;
      let dat = rest.subarray(i, i + sahakani);
      i += sahakani;
      rest = rest.subarray(i);
      if ( k6liqani ) {
        dat = Buffer.from(dat);
        for ( let j = 0; j < dat.length; j++ ) dat[j] ^= k6liqani[j % 0o4];
      }
      if ( opkodo === 0x1 || opkodo === 0x0 ) {
        if ( opkodo === 0x1 ) kliento.hakek = [];
        kliento.hakek.push(dat.toString("utf8"));
        if ( fina ) {
          const s2banani = kliento.hakek.join("");
          kliento.hakek = [];
          pritrakti(kliento, s2banani);
        }
      } else if ( opkodo === 0x8 ) {
        try { kliento.so.write(Buffer.from([ 0x88, 0x00 ])); } catch { /* pukxeita */ }
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

  hate.on("upgrade", ( peto, so ) => {
    const ca3aq = peto.headers["sec-websocket-key"];
    const k6h6 = ( peto.url || "" ).split("?")[0];
    if ( !ca3aq || k6h6 !== "/caxlefkakai" ) { so.destroy(); return; }
    so.write(
      "HTTP/1.1 101 Switching Protocols\r\n" +
      "Upgrade: websocket\r\n" +
      "Connection: Upgrade\r\n" +
      "Sec-WebSocket-Accept: " + akceptaKapo(ca3aq) + "\r\n\r\n"
);
    const id = kf2Idon();
    const kliento = { so, id, stato: null, hakek: [], bufro: Buffer.alloc(0) };
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
    so.on("error", () => { try { so.destroy(); } catch { /* pukxeita */ } });
  });

  // ⟨ ſɟᴜ ſ̀ȷɔƽ ʌ ſɟᴜ ſ͕ɭɹȝ 📃 ⟩
  const koro = setInterval(() => {
    for ( const kliento of klientoj.values() ) {
      try { kliento.so.write(Buffer.from([ 0x89, 0x00 ])); } catch { kliento.so.destroy(); }
    }
  }, PINGAŬZO);
  if ( koro.unref ) koro.unref();
}
