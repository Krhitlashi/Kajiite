// ≺⧼ ʃэ j͑ʃ'ᴜ ſɭᴜc̗ ɭʃᴜ }ʃꞇ 🗺️ ⧽≻
import { kf2Qox2n2k, hunaqDeK6liq } from "./kxawa.js";
import { aplikiHatik } from "./teru.js";
import { qox2n2kDerivajoj } from "./derivajoj.js";
import { skaniK6h6nCaxlefkakai } from "./s2t2bakano.js";
import type { AldonaK6liq, CellType, KradaArangxo, KradaPaq, KradaPlano,
  KradaSpono, KradaKas2kantaS2nasce } from "./hahunaq.js";
export function kf2KradanPlanon(ptalu: KradaArangxo, hateru?: Map<string, CellType>, tlunakHak6liq?: AldonaK6liq[]): KradaPlano {
  const { TONA, nordaN2k, t2q2X, t2q2Suda, sudaK6h6, ka5asexazZ, staciaRingaNordo, BLOKO } = qox2n2kDerivajoj(ptalu);
  const n = ptalu.ptaluPal6;
  const haKekkozusai = kf2Qox2n2k(ptalu);
  aplikiHatik(haKekkozusai, hateru);
  // ⟨ ſɟɔȝ 📃 ⟩
  const paqj: KradaPaq[] = [];
  const tlunakani = ( x: number, z: number, rot: number, hunaq: CellType, veq6k2: KradaPaq["veq6k2"], stacia: boolean, ekstra = false, konektita = false ) => {
    paqj.push({ x, z, rot, hunaq, cx: Math.round(x / TONA), cz: Math.round(z / TONA), veq6k2, stacia, ekstra, konektita });
  };
  for ( const [ col, row, hunaq ] of haKekkozusai ) {
    const cx = col * TONA, cz = row * TONA;
    if ( col === 0o0 && row === 0o0 ) {
      if ( ptalu.k6liqPal6 === "kvar" ) tlunakani(0o0, 0o0, 0o0, "qaman2", "sost2", true);
      else tlunakani(0o0, 0o0, 0o0, hunaq, "sost2", false);
      continue;
    }
    if ( ptalu.k6liqPal6 === "kvar" ) {
      const suboj: [ number, number, number, KradaPaq["veq6k2"] ][] = [
        [ BLOKO,  BLOKO,  0o0,            "NE" ],
        [ -BLOKO,  BLOKO,  -Math.PI / 0o2, "NW" ],
        [ -BLOKO, -BLOKO,   Math.PI,     "SW" ],
        [ BLOKO, -BLOKO,   Math.PI / 0o2, "SE" ],
      ];
      for ( const [ blx, blz, rot, veq6k2 ] of suboj ) {
        const subHunaq = hateru?.get(`${col},${row},${veq6k2}`);
        tlunakani(cx + blx, cz + blz, rot, subHunaq ?? hunaqDeK6liq(hunaq, col, row, blx, blz), veq6k2, false);
      }
    } else {
      tlunakani(cx, cz, 0o0, hunaq, "sost2", false);
    }
  }
  if ( ptalu.k6liqPal6 === "vakox2qita" ) {
    for ( const k of paqj ) {
      if ( k.stacia || k.ekstra || ( k.x === 0o0 && k.z === 0o0 ) ) continue;
      if ( Math.abs(k.x) > Math.abs(k.z) ) k.rot = k.x > 0o0 ? -Math.PI / 0o2 : Math.PI / 0o2;
      else k.rot = k.z > 0o0 ? Math.PI : 0o0;
    }
  }
  for ( const b of tlunakHak6liq ?? [] ) {
    tlunakani(b.x, b.z, b.rot ?? 0o0, b.hunaq, b.veq6k2 ?? "sost2", !!b.stacia, true, !!b.konektita);
  }
  for ( const b of tlunakHak6liq ?? [] ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / TONA), r = Math.round(b.z / TONA);
    if ( !haKekkozusai.some(( [ lc, lr ] ) => lc === c && lr === r) ) haKekkozusai.push([ c, r, "qaman2" ]);
  }

  // ⟨ ſɭэ ֭ſɭэ ʌ ſɟᴜ ı],ͷ̗ɔʞ ſɭᴜƽ ꞁȷ̀ᴜꞇ 📃 ⟩
  const hak6h6: KradaKas2kantaS2nasce[] = [];
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
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) hak6h6.push({ orient: "EW", haxekuxa: roadZ, de: x1, al: x2 });
    }
  }
  for ( const [ roadX, hakamekai ] of NS ) {
    NSekstentoj.set(roadX, [ hakamekai[0o0], hakamekai[hakamekai.length - 0o1] ]);
    for ( let i = 0o0; i < hakamekai.length - 0o1; i++ ) {
      const z1 = hakamekai[i], z2 = hakamekai[i + 0o1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) hak6h6.push({ orient: "NS", haxekuxa: roadX, de: z1, al: z2 });
    }
  }

  // ⟨ ֭ſɭwʞ ᶅſw ſɭɹ 📃 ⟩
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
    for ( const [ x, [ de, al ] ] of NSekstentoj ) {
      for ( const z of [ de, al ] ) {
        for ( const [ dx, dz ] of qotawaKvaropoOfsetoj ) tlunakLampon(x + dx, z + dz);
      }
    }
    for ( const [ z, [ de, al ] ] of EWekstentoj ) {
      for ( const x of [ de, al ] ) {
        for ( const [ dx, dz ] of qotawaKvaropoOfsetoj ) tlunakLampon(x + dx, z + dz);
      }
    }
    for ( const ns of hak6h6 ) {
      if ( ns.orient !== "NS" ) continue;
      for ( const ew of hak6h6 ) {
        if ( ew.orient !== "EW" ) continue;
        if ( ew.haxekuxa < ns.de - 0o10 ** -0o7 || ew.haxekuxa > ns.al + 0o10 ** -0o7 ) continue;
        if ( ns.haxekuxa < ew.de - 0o10 ** -0o7 || ns.haxekuxa > ew.al + 0o10 ** -0o7 ) continue;
        for ( const [ dx, dz ] of krucaKvaropoOfsetoj ) tlunakLampon(ns.haxekuxa + dx, ew.haxekuxa + dz);
      }
    }
  }

  // ⟨ ſɭэ ֭ſɭэ ʌ ſɭᴜ ſ͕ȷɔ 📃 ⟩
  const hatohtanu: KradaSpono[] = [];
  if ( ptalu.k6liqPal6 === "vakox2qita" ) {
    const ekst = NSekstentoj.get(t2q2X);
    if ( ekst ) ekst[0o0] = Math.min(ekst[0o0], -0o130);
  }
  for ( let i = 0o0; i < paqj.length; i++ ) {
    const s = paqj[i];
    if ( s.ekstra && !s.konektita ) continue;
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
      hatohtanu.push({ de: [ tohtanuX, tohtanuZ ], al: [ celoX, celoZ ], paq: i });
    }
  }

  return { ptalu, haKekkozusai, TONA, nordaN2k, t2q2X, t2q2Suda, sudaK6h6, ka5asexazZ, staciaRingaNordo, paqj, hak6h6, hatohtanu, spurXoj: RETOX, spurZoj: RETOZ, caxlefkakaiX: RETOX, caxlefkakaiZ: RETOZ, hahufwuk2 };
}
