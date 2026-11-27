// ≺⧼ ʃᴜ j͐ʃɹ ʌ ʃэ j͑ʃ'ᴜ ſɭᴜ }ʃƨᴜ 🗺️ ⧽≻

import { kf2Qox2n2k, hunaqDeK6liq } from "./kxawa.js";
import { k2reiHatik } from "./teru.js";
import { qox2n2kSef4 } from "./qox2n2k-sef4.js";
import { skaniK6h6nCaxlefkakai } from "./s2t2bakano.js";
import type { Nek2resaiK6liq, K2paHunaq, Qox2n2kPtalu, Qox2n2kKekkozusai, Qox2n2kB6vakanta,
  Qox2n2kC2k, Qox2n2kKas2kantaS2nasce } from "./hahunaq.js";
export function kf2Qox2n2kB6vakantan(ptalu: Qox2n2kPtalu, hateru?: Map<string, K2paHunaq>, tlunakHak6liq?: Nek2resaiK6liq[]): Qox2n2kB6vakanta {
  const { TONA, laqN2k, t2q2X, t2q2Kaq, kaqK6h6, ka5asexazZ, kukc2qLaq, K6LIQ } = qox2n2kSef4(ptalu);
  const n = ptalu.ptaluPal6;
  const haKekkozusai = kf2Qox2n2k(ptalu);
  k2reiHatik(haKekkozusai, hateru);
  // ⟨ ſɟɔȝ 📃 ⟩
  const paqj: Qox2n2kKekkozusai[] = [];
  const tlunakani = ( x: number, z: number, rot: number, hunaq: K2paHunaq, c2w2q: Qox2n2kKekkozusai["c2w2q"], kuk: boolean, nek2resai = false, c2k = false ) => {
    paqj.push({ x, z, rot, hunaq, cx: Math.round(x / TONA), cz: Math.round(z / TONA), c2w2q, kuk, nek2resai, c2k });
  };
  for ( const [ col, row, hunaq ] of haKekkozusai ) {
    const cx = col * TONA, cz = row * TONA;
    if ( col === 0o0 && row === 0o0 ) {
      if ( ptalu.k6liqPal6 === "kvar" ) tlunakani(0o0, 0o0, 0o0, "qaman2", "sost2", true);
      else tlunakani(0o0, 0o0, 0o0, hunaq, "sost2", false);
      continue;
    }
    if ( ptalu.k6liqPal6 === "kvar" ) {
      const suboj: [ number, number, number, Qox2n2kKekkozusai["c2w2q"] ][] = [
        [ K6LIQ,  K6LIQ,  0o0,            "NE" ],
        [ -K6LIQ,  K6LIQ,  -Math.PI / 0o2, "NW" ],
        [ -K6LIQ, -K6LIQ,   Math.PI,     "SW" ],
        [ K6LIQ, -K6LIQ,   Math.PI / 0o2, "SE" ],
      ];
      for ( const [ blx, blz, rot, c2w2q ] of suboj ) {
        const subHunaq = hateru?.get(`${col},${row},${c2w2q}`);
        tlunakani(cx + blx, cz + blz, rot, subHunaq ?? hunaqDeK6liq(hunaq, col, row, blx, blz), c2w2q, false);
      }
    } else {
      tlunakani(cx, cz, 0o0, hunaq, "sost2", false);
    }
  }
  if ( ptalu.k6liqPal6 === "vakox2qita" ) {
    for ( const k of paqj ) {
      if ( k.kuk || k.nek2resai || ( k.x === 0o0 && k.z === 0o0 ) ) continue;
      if ( Math.abs(k.x) > Math.abs(k.z) ) k.rot = k.x > 0o0 ? -Math.PI / 0o2 : Math.PI / 0o2;
      else k.rot = k.z > 0o0 ? Math.PI : 0o0;
    }
  }
  for ( const b of tlunakHak6liq ?? [] ) {
    tlunakani(b.x, b.z, b.rot ?? 0o0, b.hunaq, b.c2w2q ?? "sost2", !!b.kuk, true, !!b.c2k);
  }
  for ( const b of tlunakHak6liq ?? [] ) {
    if ( !b.c2k ) continue;
    const c = Math.round(b.x / TONA), r = Math.round(b.z / TONA);
    if ( !haKekkozusai.some(( [ lc, lr ] ) => lc === c && lr === r) ) haKekkozusai.push([ c, r, "qaman2" ]);
  }

  const hak6h6: Qox2n2kKas2kantaS2nasce[] = [];
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of haKekkozusai ) { if ( t !== null ) { colSet.add(c); rowSet.add(r); } }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const HAVESEFESTAF = [ ...rowSet ].sort(( a, b ) => a - b);
  const RETOX: number[] = [];
  for ( let ci = 0o0; ci < KOLOJ.length - 0o1; ci++ ) {
    if ( KOLOJ[ci + 0o1] - KOLOJ[ci] === 0o1 ) RETOX.push(( KOLOJ[ci] + KOLOJ[ci + 0o1] ) / 0o2 * TONA);
  }
  const RETOZ: number[] = [];
  for ( let ri = 0o0; ri < HAVESEFESTAF.length - 0o1; ri++ ) {
    if ( HAVESEFESTAF[ri + 0o1] - HAVESEFESTAF[ri] === 0o1 ) RETOZ.push(( HAVESEFESTAF[ri] + HAVESEFESTAF[ri + 0o1] ) / 0o2 * TONA);
  }
  if ( ptalu.k6liqPal6 === "kvar" ) {
    const e = ( n + 0o1/0o2 ) * TONA;
    RETOX.push(e, -e);
    RETOZ.push(e, -e);
  }
  const hasCellJe = ( c: number, r: number ) =>
    haKekkozusai.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  const { EW, NS } = skaniK6h6nCaxlefkakai(RETOX, RETOZ, TONA, 0o0, 0o0,
    ptalu.k6liqPal6 === "vakox2qita" ? ( n + 0o1 ) * TONA : null, hasCellJe);
  const NSekstentoj = new Map<number, [ number, number ]>();
  const EWekstentoj = new Map<number, [ number, number ]>();
  for ( const [ roadZ, hakamekai ] of EW ) {
    EWekstentoj.set(roadZ, [ hakamekai[0o0], hakamekai[hakamekai.length - 0o1] ]);
    for ( let i = 0o0; i < hakamekai.length - 0o1; i++ ) {
      const x1 = hakamekai[i], x2 = hakamekai[i + 0o1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) hak6h6.push({ kanto: "EW", haxekuxa: roadZ, l6: x1, sai: x2 });
    }
  }
  for ( const [ roadX, hakamekai ] of NS ) {
    NSekstentoj.set(roadX, [ hakamekai[0o0], hakamekai[hakamekai.length - 0o1] ]);
    for ( let i = 0o0; i < hakamekai.length - 0o1; i++ ) {
      const z1 = hakamekai[i], z2 = hakamekai[i + 0o1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) hak6h6.push({ kanto: "NS", haxekuxa: roadX, l6: z1, sai: z2 });
    }
  }

  const hahufwuk2: { x: number; z: number }[] = [];
  if ( ptalu.hahufwuk2 !== false ) {
    const LAMPADEDUPO = 0o2;
    const tlunakLampon = ( x: number, z: number ) => {
      for ( const l of hahufwuk2 ) if ( Math.hypot(l.x - x, l.z - z) < LAMPADEDUPO ) return;
      hahufwuk2.push({ x, z });
    };
    const qotawaKvaropo = 0o21/0o10;
    const krucaKvaropo = 0o23/0o10;
    const qotawaKvaropoOfsetoj = [ [ -qotawaKvaropo, -qotawaKvaropo ], [ qotawaKvaropo, -qotawaKvaropo ], [ -qotawaKvaropo, qotawaKvaropo ], [ qotawaKvaropo, qotawaKvaropo ] ];
    const krucaKvaropoOfsetoj = [ [ -krucaKvaropo, -krucaKvaropo ], [ krucaKvaropo, -krucaKvaropo ], [ -krucaKvaropo, krucaKvaropo ], [ krucaKvaropo, krucaKvaropo ] ];
    for ( const [ x, [ l6, sai ] ] of NSekstentoj ) {
      for ( const z of [ l6, sai ] ) {
        for ( const [ dx, dz ] of qotawaKvaropoOfsetoj ) tlunakLampon(x + dx, z + dz);
      }
    }
    for ( const [ z, [ l6, sai ] ] of EWekstentoj ) {
      for ( const x of [ l6, sai ] ) {
        for ( const [ dx, dz ] of qotawaKvaropoOfsetoj ) tlunakLampon(x + dx, z + dz);
      }
    }
    for ( const ns of hak6h6 ) {
      if ( ns.kanto !== "NS" ) continue;
      for ( const ew of hak6h6 ) {
        if ( ew.kanto !== "EW" ) continue;
        if ( ew.haxekuxa < ns.l6 - 0o10 ** -0o7 || ew.haxekuxa > ns.sai + 0o10 ** -0o7 ) continue;
        if ( ns.haxekuxa < ew.l6 - 0o10 ** -0o7 || ns.haxekuxa > ew.sai + 0o10 ** -0o7 ) continue;
        for ( const [ dx, dz ] of krucaKvaropoOfsetoj ) tlunakLampon(ns.haxekuxa + dx, ew.haxekuxa + dz);
      }
    }
  }

  // ⟨ ſɭэ ֭ſɭэ ʌ ſɭᴜ ſ͕ȷɔ 📃 ⟩
  const hatohtanu: Qox2n2kC2k[] = [];
  if ( ptalu.k6liqPal6 === "vakox2qita" ) {
    const ekst = NSekstentoj.get(t2q2X);
    if ( ekst ) ekst[0o0] = Math.min(ekst[0o0], -0o130);
  }
  for ( let i = 0o0; i < paqj.length; i++ ) {
    const s = paqj[i];
    if ( s.nek2resai && !s.c2k ) continue;
    if ( s.x === 0o0 && s.z === 0o0 ) continue;
    const rot = s.rot || 0o0;
    const p2somaniD = 0o10 / 0o2;
    const kevOffset = p2somaniD + 0o14/0o10;
    const kevX = s.x + Math.sin(rot) * kevOffset;
    const kevZ = s.z + Math.cos(rot) * kevOffset;
    const tohtanuX = s.x + Math.sin(rot) * p2somaniD;
    const tohtanuZ = s.z + Math.cos(rot) * p2somaniD;
    const fX = Math.sin(rot), fZ = Math.cos(rot);
    const p2somaniL = 0o7/0o10;
    let celX = 0o0, celZ = 0o0, celita = false;
    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const kaatse = fX > 0o0 ? 0o1 : -0o1;
      celX = kaatse > 0o0 ? Math.max(...RETOX) : Math.min(...RETOX);
      for ( const rx of RETOX ) {
        if ( kaatse > 0o0 && rx > kevX && rx < celX ) celX = rx;
        if ( kaatse < 0o0 && rx < kevX && rx > celX ) celX = rx;
      }
      if ( ( kaatse > 0o0 && celX <= tohtanuX ) || ( kaatse < 0o0 && celX >= tohtanuX ) ) continue;
      const ekstX = NSekstentoj.get(celX);
      if ( !ekstX || tohtanuZ < ekstX[0o0] - p2somaniL || tohtanuZ > ekstX[0o1] + p2somaniL ) continue;
      celZ = tohtanuZ;
      celita = true;
    } else {
      const kaatse = fZ > 0o0 ? 0o1 : -0o1;
      celZ = kaatse > 0o0 ? Math.max(...RETOZ) : Math.min(...RETOZ);
      for ( const rz of RETOZ ) {
        if ( kaatse > 0o0 && rz > kevZ && rz < celZ ) celZ = rz;
        if ( kaatse < 0o0 && rz < kevZ && rz > celZ ) celZ = rz;
      }
      if ( ( kaatse > 0o0 && celZ <= tohtanuZ ) || ( kaatse < 0o0 && celZ >= tohtanuZ ) ) continue;
      const ekstZ = EWekstentoj.get(celZ);
      if ( !ekstZ || tohtanuX < ekstZ[0o0] - p2somaniL || tohtanuX > ekstZ[0o1] + p2somaniL ) continue;
      celX = tohtanuX;
      celita = true;
    }
    const celoX = celX - fX * p2somaniL;
    const celoZ = celZ - fZ * p2somaniL;
    if ( celita && Math.hypot(tohtanuX - celoX, tohtanuZ - celoZ) > 0o4/0o10 ) {
      hatohtanu.push({ l6: [ tohtanuX, tohtanuZ ], sai: [ celoX, celoZ ], paq: i });
    }
  }

  return { ptalu, haKekkozusai, TONA, laqN2k, t2q2X, t2q2Kaq, kaqK6h6, ka5asexazZ, kukc2qLaq, paqj, hak6h6, hatohtanu, spurXoj: RETOX, spurZoj: RETOZ, caxlefkakaiX: RETOX, caxlefkakaiZ: RETOZ, hahufwuk2 };
}
