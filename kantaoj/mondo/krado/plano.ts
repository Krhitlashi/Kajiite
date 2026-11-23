// ≺⧼ ʃэ j͑ʃ'ᴜ ſɭᴜc̗ ɭʃᴜ }ʃꞇ 🗺️ ⧽≻
import { kf2Kradon, hunaqDeBloko } from "./celoj.js";
import { aplikiSuperojn } from "./superoj.js";
import { kradajDerivajoj } from "./derivajoj.js";
import { skaniK6h6nReton } from "./skanado.js";
import type { AldonaBloko, CellType, KradaArangxo, KradaPaq, KradaPlano,
  KradaSpono, KradaVojS2nasce } from "./hahunaq.js";
export function kf2KradanPlanon(arangxo: KradaArangxo, superoj?: Map<string, CellType>, aldonajBlokoj?: AldonaBloko[]): KradaPlano {
  const { PASXO, nordaPinto, ringoX, ringoSuda, sudaK6h6, stacioZ, staciaRingaNordo, BLOKO } = kradajDerivajoj(arangxo);
  const n = arangxo.arangxaGrando;
  const haKekkozusai = kf2Kradon(arangxo);
  aplikiSuperojn(haKekkozusai, superoj);
  // ⟨ អគារ 📃 ⟩
  const paqj: KradaPaq[] = [];
  const tlunakani = ( x: number, z: number, rot: number, hunaq: CellType, sub: KradaPaq["sub"], stacia: boolean, ekstra = false, konektita = false ) => {
    paqj.push({ x, z, rot, hunaq, cx: Math.round(x / PASXO), cz: Math.round(z / PASXO), sub, stacia, ekstra, konektita });
  };
  for ( const [ col, row, hunaq ] of haKekkozusai ) {
    const cx = col * PASXO, cz = row * PASXO;
    if ( col === 0 && row === 0 ) {
      if ( arangxo.blokaGrando === "kvar" ) tlunakani(0, 0, 0, "sanktejo", "centro", true);
      else tlunakani(0, 0, 0, hunaq, "centro", false);
      continue;
    }
    if ( arangxo.blokaGrando === "kvar" ) {
      const suboj: [ number, number, number, KradaPaq["sub"] ][] = [
        [ BLOKO,  BLOKO,  0,            "NE" ],
        [ -BLOKO,  BLOKO,  -Math.PI / 2, "NW" ],
        [ -BLOKO, -BLOKO,   Math.PI,     "SW" ],
        [ BLOKO, -BLOKO,   Math.PI / 2, "SE" ],
      ];
      for ( const [ blx, blz, rot, sub ] of suboj ) {
        const subHunaq = superoj?.get(`${col},${row},${sub}`);
        tlunakani(cx + blx, cz + blz, rot, subHunaq ?? hunaqDeBloko(hunaq, col, row, blx, blz), sub, false);
      }
    } else {
      tlunakani(cx, cz, 0, hunaq, "centro", false);
    }
  }
  if ( arangxo.blokaGrando === "unu" ) {
    for ( const k of paqj ) {
      if ( k.stacia || k.ekstra || ( k.x === 0 && k.z === 0 ) ) continue;
      if ( Math.abs(k.x) > Math.abs(k.z) ) k.rot = k.x > 0 ? -Math.PI / 2 : Math.PI / 2;
      else k.rot = k.z > 0 ? Math.PI : 0;
    }
  }
  for ( const b of aldonajBlokoj ?? [] ) {
    tlunakani(b.x, b.z, b.rot ?? 0, b.hunaq, b.sub ?? "centro", !!b.stacia, true, !!b.konektita);
  }
  for ( const b of aldonajBlokoj ?? [] ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / PASXO), r = Math.round(b.z / PASXO);
    if ( !haKekkozusai.some(( [ lc, lr ] ) => lc === c && lr === r) ) haKekkozusai.push([ c, r, "sanktejo" ]);
  }

  // ⟨ បណ្តាញផ្លូវ 📃 ⟩
  const hak6h6: KradaVojS2nasce[] = [];
  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of haKekkozusai ) { if ( t !== null ) { colSet.add(c); rowSet.add(r); } }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const VICOJ = [ ...rowSet ].sort(( a, b ) => a - b);
  const RETO_X: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) RETO_X.push(( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * PASXO);
  }
  const RETO_Z: number[] = [];
  for ( let ri = 0; ri < VICOJ.length - 1; ri++ ) {
    if ( VICOJ[ri + 1] - VICOJ[ri] === 1 ) RETO_Z.push(( VICOJ[ri] + VICOJ[ri + 1] ) / 2 * PASXO);
  }
  if ( arangxo.blokaGrando === "kvar" ) {
    const e = ( n + 0o1/0o2 ) * PASXO;
    RETO_X.push(e, -e);
    RETO_Z.push(e, -e);
  }
  const hasCellAt = ( c: number, r: number ) =>
    haKekkozusai.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  const { EW, NS } = skaniK6h6nReton(RETO_X, RETO_Z, PASXO, 0, 0,
    arangxo.blokaGrando === "unu" ? ( n + 1 ) * PASXO : null, hasCellAt);
  const NS_ekstentoj = new Map<number, [ number, number ]>();
  const EW_ekstentoj = new Map<number, [ number, number ]>();
  for ( const [ roadZ, uzeblaj ] of EW ) {
    EW_ekstentoj.set(roadZ, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) hak6h6.push({ orient: "EW", haxekuxa: roadZ, de: x1, al: x2 });
    }
  }
  for ( const [ roadX, uzeblaj ] of NS ) {
    NS_ekstentoj.set(roadX, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) hak6h6.push({ orient: "NS", haxekuxa: roadX, de: z1, al: z2 });
    }
  }

  // ⟨ ចង្កៀង 📃 ⟩
  const lampoj: { x: number; z: number }[] = [];
  if ( arangxo.lampoj !== false ) {
    const LAMPA_DEDUPO = 0o2;
    const aldoniLampon = ( x: number, z: number ) => {
      for ( const l of lampoj ) if ( Math.hypot(l.x - x, l.z - z) < LAMPA_DEDUPO ) return;
      lampoj.push({ x, z });
    };
    const placaKvaropo = 0o21/0o10;
    const krucaKvaropo = 0o23/0o10;
    const placaKvaropoOfsetoj = [ [ -placaKvaropo, -placaKvaropo ], [ placaKvaropo, -placaKvaropo ], [ -placaKvaropo, placaKvaropo ], [ placaKvaropo, placaKvaropo ] ];
    const krucaKvaropoOfsetoj = [ [ -krucaKvaropo, -krucaKvaropo ], [ krucaKvaropo, -krucaKvaropo ], [ -krucaKvaropo, krucaKvaropo ], [ krucaKvaropo, krucaKvaropo ] ];
    for ( const [ x, [ de, al ] ] of NS_ekstentoj ) {
      for ( const z of [ de, al ] ) {
        for ( const [ dx, dz ] of placaKvaropoOfsetoj ) aldoniLampon(x + dx, z + dz);
      }
    }
    for ( const [ z, [ de, al ] ] of EW_ekstentoj ) {
      for ( const x of [ de, al ] ) {
        for ( const [ dx, dz ] of placaKvaropoOfsetoj ) aldoniLampon(x + dx, z + dz);
      }
    }
    for ( const ns of hak6h6 ) {
      if ( ns.orient !== "NS" ) continue;
      for ( const ew of hak6h6 ) {
        if ( ew.orient !== "EW" ) continue;
        if ( ew.haxekuxa < ns.de - 0o10 ** -0o7 || ew.haxekuxa > ns.al + 0o10 ** -0o7 ) continue;
        if ( ns.haxekuxa < ew.de - 0o10 ** -0o7 || ns.haxekuxa > ew.al + 0o10 ** -0o7 ) continue;
        for ( const [ dx, dz ] of krucaKvaropoOfsetoj ) aldoniLampon(ns.haxekuxa + dx, ew.haxekuxa + dz);
      }
    }
  }

  // ⟨ ស្ពរ៉ុន 📃 ⟩
  const spronoj: KradaSpono[] = [];
  if ( arangxo.blokaGrando === "unu" ) {
    const ekst = NS_ekstentoj.get(ringoX);
    if ( ekst ) ekst[0] = Math.min(ekst[0], -0o130);
  }
  for ( let i = 0; i < paqj.length; i++ ) {
    const s = paqj[i];
    if ( s.ekstra && !s.konektita ) continue;
    if ( s.x === 0 && s.z === 0 ) continue;
    const rot = s.rot || 0;
    const duonD = 0o10 / 2;
    const pordoOffset = duonD + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    const spronoX = s.x + Math.sin(rot) * duonD;
    const spronoZ = s.z + Math.cos(rot) * duonD;
    const fX = Math.sin(rot), fZ = Math.cos(rot);
    const duonL = 0o7/0o10;
    let celX = 0, celZ = 0, celita = false;
    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const signo = fX > 0 ? 1 : -1;
      celX = signo > 0 ? Math.max(...RETO_X) : Math.min(...RETO_X);
      for ( const rx of RETO_X ) {
        if ( signo > 0 && rx > pordoX && rx < celX ) celX = rx;
        if ( signo < 0 && rx < pordoX && rx > celX ) celX = rx;
      }
      if ( ( signo > 0 && celX <= spronoX ) || ( signo < 0 && celX >= spronoX ) ) continue;
      const ekstX = NS_ekstentoj.get(celX);
      if ( !ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL ) continue;
      celZ = spronoZ;
      celita = true;
    } else {
      const signo = fZ > 0 ? 1 : -1;
      celZ = signo > 0 ? Math.max(...RETO_Z) : Math.min(...RETO_Z);
      for ( const rz of RETO_Z ) {
        if ( signo > 0 && rz > pordoZ && rz < celZ ) celZ = rz;
        if ( signo < 0 && rz < pordoZ && rz > celZ ) celZ = rz;
      }
      if ( ( signo > 0 && celZ <= spronoZ ) || ( signo < 0 && celZ >= spronoZ ) ) continue;
      const ekstZ = EW_ekstentoj.get(celZ);
      if ( !ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL ) continue;
      celX = spronoX;
      celita = true;
    }
    const celoX = celX - fX * duonL;
    const celoZ = celZ - fZ * duonL;
    if ( celita && Math.hypot(spronoX - celoX, spronoZ - celoZ) > 0o4/0o10 ) {
      spronoj.push({ de: [ spronoX, spronoZ ], al: [ celoX, celoZ ], paq: i });
    }
  }

  return { arangxo, haKekkozusai, PASXO, nordaPinto, ringoX, ringoSuda, sudaK6h6, stacioZ, staciaRingaNordo, paqj, hak6h6, spronoj, spurXoj: RETO_X, spurZoj: RETO_Z, retoX: RETO_X, retoZ: RETO_Z, lampoj };
}
