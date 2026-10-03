// ≺⧼ ទីក្រុងក្រឡា 📐 ⧽≻
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../../eskekoj/komunajxoj/kunfandajxoj.js";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { KonstruSpec } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import { kreiKradon, tipoDeBloko } from "../krado/celoj.js";
import { kradajDerivajoj } from "../krado/derivajoj.js";
import { skaniVojanReton } from "../krado/skanado.js";
import { aplikiSuperojn } from "../krado/superoj.js";
import type { KradaArangxo, CellType, AldonaBloko } from "../krado/tipoj.js";
import { konstruiKeuxfhxeso, KeuxfhxesoLoko } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { riveroZ, alteco, akvo } from "../tereno.js";
import { kreiLampAldonilon } from "./lampoj.js";

export interface KradaUrbaRezulto {
  konstruSpecoj: KonstruSpec[];
  kolizioj: { x: number; z: number; r: number }[];
  selektajxoj: THREE.Mesh[];
  konstruGrupoj: THREE.Group[];
  placajNodoj: [ number, number ][];
  // ⟨ បណ្តាញផ្លូវជាទិន្នន័យ មិនមែនធរណីមាត្រ 📃 ⟩
  vojDifinoj: VojDifino[];
  kunigajPunktoj: [ number, number ][];
  kunigajFermitaj: Map<string, [ number, number ]>;
  lampLokoj: { x: number; z: number; y: number; rotacio?: number }[];
  keuxfhxesoLokoj: KeuxfhxesoLoko[];
  staciaPozicio: [ number, number ];
  ringoX: number;
  sudaVojo: number;
}

export function konstruiKradanUrbon(
  sceno: THREE.Scene,
  arangxo: KradaArangxo,
  ofseto: [ number, number ],
  oraMaterialo: THREE.MeshStandardMaterial,
  aldonajBlokoj: AldonaBloko[] = [],
  superoj?: Map<string, CellType>,
): KradaUrbaRezulto {
  const [ ofsX, ofsZ ] = ofseto;
  const ĉeloj = kreiKradon(arangxo);
  aplikiSuperojn(ĉeloj, superoj);
  const kolizioj: { x: number; z: number; r: number }[] = [];
  const { PASXO, nordaPinto, ringoX, sudaVojo, stacioZ, BLOKO } = kradajDerivajoj(arangxo);

  let bldgIdx = 0;
  const konstruSpecoj: KonstruSpec[] = [];
  const kreiSpecon = ( x: number, z: number, type: CellType, rot: number, fiksita?: string ): void => {
    const estasStacio = type === "stacio";
    const specTipo = estasStacio ? "stacioxipo" : type;
    const niveloj = estasStacio ? 3 : type === "sanktejo" ? 7 : type === "turo" ? 0o10 : 4;
    const w = 0o10, d = w;
    const tieroAlto = estasStacio ? 0o155/0o40
      : type === "sanktejo" ? 0o30/0o10 : type === "turo" ? 0o30/0o10 : type === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
    const sube = estasStacio ? undefined : niveloj;
    const tieroAltoSub = 0o123/0o40;
    konstruSpecoj.push({ x, z, type: specTipo, name: "paq" + bldgIdx, niveloj, w, d, tieroAlto, sube, tieroAltoSub, rot, diamond: true, fixed: fiksita });
    bldgIdx++;
  };
  for ( const [ col, row, type ] of ĉeloj ) {
    const cx = ofsX + col * PASXO, cz = ofsZ + row * PASXO;
    if ( col === 0 && row === 0 ) {
      if ( arangxo.blokaGrando === "kvar" ) {
        konstruSpecoj.push({ x: ofsX, z: ofsZ, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: 0, diamond: true, fixed: "kvar" });
        bldgIdx++;
      } else {
        kreiSpecon(ofsX, ofsZ, type, 0);
      }
      continue;
    }
    if ( arangxo.blokaGrando === "kvar" ) {
      const suboj: [ number, number, number ][] = [
        [ BLOKO, BLOKO, 0 ],
        [ -BLOKO, BLOKO, -Math.PI/2 ],
        [ -BLOKO, -BLOKO, Math.PI ],
        [ BLOKO, -BLOKO, Math.PI/2 ],
      ];
      for ( const [ blx, blz, rot ] of suboj ) {
        const subNomo = blx > 0 ? ( blz > 0 ? "NE" : "SE" ) : ( blz > 0 ? "NW" : "SW" );
        const subTipo = superoj?.get(col + "," + row + "," + subNomo);
        kreiSpecon(cx + blx, cz + blz, subTipo ?? tipoDeBloko(type, col, row, blx, blz), rot, "kvar");
      }
    } else {
      kreiSpecon(cx, cz, type, 0);
    }
  }

  for ( const b of aldonajBlokoj ) {
    const fiksita = b.konektita ? "aldona-konektita" : "aldona";
    if ( b.stacia ) {
      konstruSpecoj.push({ x: ofsX + b.x, z: ofsZ + b.z, type: "stacioxipo", name: "paq" + bldgIdx, niveloj: 3, w: 0o10, d: 0o10, tieroAlto: 0o155/0o40, rot: b.rot ?? 0, diamond: true, fixed: fiksita });
      bldgIdx++;
    } else {
      kreiSpecon(ofsX + b.x, ofsZ + b.z, b.tipo, b.rot ?? 0, fiksita);
    }
  }
  for ( const b of aldonajBlokoj ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / PASXO), r = Math.round(b.z / PASXO);
    if ( !ĉeloj.some(( [ lc, lr ] ) => lc === c && lr === r) ) ĉeloj.push([ c, r, "sanktejo" ]);
  }

  konstruSpecoj.forEach(s => {
    s.h0 = alteco(s.x, s.z);
    kolizioj.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 0o4/0o10 });
  });

  const selektajxoj: THREE.Mesh[] = [];

  // ⟪ បណ្តាញផ្លូវ 📃 ⟫
  const vojDifinoj: VojDifino[] = [];

  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of ĉeloj ) {
    if ( t !== null ) { colSet.add(c); rowSet.add(r); }
  }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const VICOJ = [ ...rowSet ].sort(( a, b ) => a - b);

  const RETO_X: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) {
      RETO_X.push(ofsX + ( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * PASXO);
    }
  }

  const RETO_Z: number[] = [];
  for ( let ri = 0; ri < VICOJ.length - 1; ri++ ) {
    if ( VICOJ[ri + 1] - VICOJ[ri] === 1 ) {
      RETO_Z.push(ofsZ + ( VICOJ[ri] + VICOJ[ri + 1] ) / 2 * PASXO);
    }
  }
  if ( arangxo.blokaGrando === "kvar" ) {
    const e = ( arangxo.arangxaGrando + 0o1/0o2 ) * PASXO;
    RETO_X.push(ofsX + e, ofsX - e);
    RETO_Z.push(ofsZ + e, ofsZ - e);
  }

  konstruSpecoj.forEach(s => {
    if ( s.fixed ) return;
    const rx = s.x - ofsX, rz = s.z - ofsZ;
    if ( rx !== 0 || rz !== 0 ) {
      if ( Math.abs(rx) > Math.abs(rz) ) {
        s.rot = rx > 0 ? -Math.PI / 2 : Math.PI / 2;
      } else {
        s.rot = rz > 0 ? Math.PI : 0;
      }
    }
  });

  const konstruGrupoj: THREE.Group[] = [];
  const antaŭajGefiloj = new Set<THREE.Object3D>(sceno.children);
  konstruSpecoj.forEach(s => konstruGrupoj.push(konstruiSatalon(s, sceno, selektajxoj)));
  // ⟪ អគារទីក្រុងរលាយ 📃 ⟫
  const konservotaj = new Set<THREE.Object3D>(selektajxoj);
  kunfandiMondajnMeshojn(sceno, sceno.children.filter(o => !antaŭajGefiloj.has(o)), {
    celo: 0o100,
    konservu: ( m ) => konservotaj.has(m),
  });

  const hasCellAt = ( c: number, r: number ) =>
    ĉeloj.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  const placajNodoj: [ number, number ][] = [];
  const cxuNodoValidas = ( x: number, z: number ): boolean => {
    if ( akvo(x, z) ) return false;
    if ( Math.hypot(x - ofsX, z - ofsZ) > nordaPinto + 0o100 ) return false;
    for ( const s of konstruSpecoj ) {
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return false;
    }
    return true;
  };
  const aldoniPlacon = ( x: number, z: number ) => {
    if ( !cxuNodoValidas(x, z) ) return;
    placajNodoj.push([ x, z ]);
  };

  const finoRegistro = new Map<string, { sx: number; sz: number }>();
  const aldoniFinon = ( x: number, z: number, sx: number, sz: number ) => {
    const k = x + "," + z;
    const e = finoRegistro.get(k) || { sx: 0, sz: 0 };
    if ( sx !== 0 ) e.sx = sx;
    if ( sz !== 0 ) e.sz = sz;
    finoRegistro.set(k, e);
    aldoniPlacon(x, z);
  };

  const realajIntersekcoj = new Set<string>();
  const NS_ekstentoj = new Map<number, [ number, number ]>();
  const EW_ekstentoj = new Map<number, [ number, number ]>();

  const { EW, NS } = skaniVojanReton(RETO_X, RETO_Z, PASXO, ofsX, ofsZ,
    arangxo.blokaGrando === "unu" ? ( arangxo.arangxaGrando + 1 ) * PASXO : null, hasCellAt);
  for ( const [ roadZ, uzeblaj ] of EW ) {
    for ( const rx of uzeblaj ) realajIntersekcoj.add(rx + "," + roadZ);
    EW_ekstentoj.set(roadZ, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    aldoniFinon(uzeblaj[0], roadZ, -1, 0);
    aldoniFinon(uzeblaj[uzeblaj.length - 1], roadZ, 1, 0);
    const w = 0o16/0o10;
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const x1 = uzeblaj[i], x2 = uzeblaj[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) {
        vojDifinoj.push({ pts: [ [ x1, roadZ ], [ x2, roadZ ] ], w });
      }
    }
  }

  for ( const [ roadX, uzeblaj ] of NS ) {
    for ( const rz of uzeblaj ) realajIntersekcoj.add(roadX + "," + rz);
    NS_ekstentoj.set(roadX, [ uzeblaj[0], uzeblaj[uzeblaj.length - 1] ]);
    aldoniFinon(roadX, uzeblaj[0], 0, -1);
    aldoniFinon(roadX, uzeblaj[uzeblaj.length - 1], 0, 1);
    const w = 0o16/0o10;
    for ( let i = 0; i < uzeblaj.length - 1; i++ ) {
      const z1 = uzeblaj[i], z2 = uzeblaj[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) {
        vojDifinoj.push({ pts: [ [ roadX, z1 ], [ roadX, z2 ] ], w });
      }
    }
  }

  const arkajNodoj: { x: number; z: number; sx: number; sz: number }[] = [];
  const arkajKlavoj = new Set<string>();
  for ( const [ k, e ] of finoRegistro ) {
    if ( e.sx !== 0 && e.sz !== 0 ) {
      const [ x, z ] = k.split(",").map(Number);
      if ( cxuNodoValidas(x, z) ) {
        arkajNodoj.push({ x, z, sx: e.sx, sz: e.sz });
        arkajKlavoj.add(k);
      }
    }
  }
  for ( let i = placajNodoj.length - 1; i >= 0; i-- ) {
    const [ x, z ] = placajNodoj[i];
    if ( arkajKlavoj.has(x + "," + z) ) placajNodoj.splice(i, 1);
  }
  const tNodoj = placajNodoj.filter(( [ px, pz ] ) => realajIntersekcoj.has(px + "," + pz));
  const traNodoj = new Set<string>([ `${ofsX + ringoX},${ofsZ + sudaVojo}` ]);
  const tFermitaj = new Map<string, [ number, number ]>();
  const spronajKunigoj = new Map<string, [ number, number ]>();
  for ( const [ tx, tz ] of tNodoj ) {
    const e = finoRegistro.get(tx + "," + tz);
    if ( e && !traNodoj.has(tx + "," + tz) ) tFermitaj.set(tx + "," + tz, e.sx !== 0 ? [ e.sx, 0 ] : [ 0, e.sz ]);
  }
  for ( const [ px, pz ] of placajNodoj ) realajIntersekcoj.delete(px + "," + pz);
  for ( const klavo of arkajKlavoj ) realajIntersekcoj.delete(klavo);

  // ⟪ ផ្លូវស្ពរ៉ុន 📃 ⟫
  // ⟨ ស្ពរ៉ុនជាផ្លូវធម្មតា 📃 ⟩
  const spurXoj = RETO_X;
  const spurZoj = RETO_Z;
  if ( arangxo.blokaGrando === "unu" ) {
    const ekst = NS_ekstentoj.get(ofsX + ringoX);
    if ( ekst ) ekst[0] = Math.min(ekst[0], ofsZ - 0o130);
  }
  for ( const s of konstruSpecoj ) {
    if ( s.x === ofsX && s.z === ofsZ ) continue;
    if ( s.fixed === "aldona" ) continue;
    const rot = s.rot || 0;
    const pordoOffset = s.d / 2 + 0o14/0o10;
    const pordoX = s.x + Math.sin(rot) * pordoOffset;
    const pordoZ = s.z + Math.cos(rot) * pordoOffset;
    const spronoX = s.x + Math.sin(rot) * ( s.d / 2 );
    const spronoZ = s.z + Math.cos(rot) * ( s.d / 2 );

    const fX = Math.sin(rot), fZ = Math.cos(rot);
    let vojX: number, vojZ: number;
    let spronaKunigo: [ number, number, number, number ] | null = null;

    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const signo = fX > 0 ? 1 : -1;
      let celX = signo > 0 ? Math.max(...spurXoj) : Math.min(...spurXoj);
      for ( const rx of spurXoj ) {
        if ( signo > 0 && rx > pordoX && rx < celX ) celX = rx;
        if ( signo < 0 && rx < pordoX && rx > celX ) celX = rx;
      }
      if ( ( signo > 0 && celX <= spronoX ) || ( signo < 0 && celX >= spronoX ) ) continue;
      const duonL = 0o7/0o10;
      const ekstX = NS_ekstentoj.get(celX);
      if ( !ekstX || spronoZ < ekstX[0] - duonL || spronoZ > ekstX[1] + duonL ) continue;
      // ⟨ ដល់កណ្តាលផ្លូវ 📃 ⟩
      vojX = celX;
      vojZ = spronoZ;
      spronaKunigo = [ celX, spronoZ, signo, 0 ];
    } else {
      const signo = fZ > 0 ? 1 : -1;
      let celZ = signo > 0 ? Math.max(...spurZoj) : Math.min(...spurZoj);
      for ( const rz of spurZoj ) {
        if ( signo > 0 && rz > pordoZ && rz < celZ ) celZ = rz;
        if ( signo < 0 && rz < pordoZ && rz > celZ ) celZ = rz;
      }
      if ( ( signo > 0 && celZ <= spronoZ ) || ( signo < 0 && celZ >= spronoZ ) ) continue;
      const duonL = 0o7/0o10;
      const ekstZ = EW_ekstentoj.get(celZ);
      if ( !ekstZ || spronoX < ekstZ[0] - duonL || spronoX > ekstZ[1] + duonL ) continue;
      vojX = spronoX;
      vojZ = celZ;
      spronaKunigo = [ spronoX, celZ, 0, signo ];
    }

    if ( Math.hypot(spronoX - vojX, spronoZ - vojZ) > 0o4/0o10 ) {
      if ( spronaKunigo ) {
        const klavo = spronaKunigo[0] + "," + spronaKunigo[1];
        if ( !tFermitaj.has(klavo) && !realajIntersekcoj.has(klavo) && !arkajKlavoj.has(klavo) )
          spronajKunigoj.set(klavo, [ spronaKunigo[2], spronaKunigo[3] ]);
      }
      vojDifinoj.push({ pts: [ [ spronoX, spronoZ ], [ vojX, vojZ ] ], w: 0o16/0o10 });
    }
  }

  // ⟪ ចានភ្ជាប់ 📃 ⟫
  const kunigajKlavoj = [ ...realajIntersekcoj, ...spronajKunigoj.keys(), ...arkajKlavoj,
    ...tNodoj.map(( [ px, pz ] ) => px + "," + pz ) ];
  const kunigajPunktoj = kunigajKlavoj.map(klavo => klavo.split(",").map(Number) as [ number, number ]);
  const fermitaj = new Map<string, [ number, number ]>([ ...tFermitaj, ...spronajKunigoj ]);
  for ( const a of arkajNodoj ) fermitaj.set(a.x + "," + a.z, [ a.sx, a.sz ]);

  // ⟨ បណ្តាញមួយ ការសាងសង់មួយ 📃 ⟩

  // ⟪ ចង្កៀង ( ផ្នែកក្រឡា ) 📃 ⟫
  const lampLokoj: { x: number; z: number; y: number; rotacio?: number }[] = [];
  const addLamp = kreiLampAldonilon(konstruSpecoj, lampLokoj);
  if ( arangxo.lampoj !== false ) {
    for ( const [ aX, aZ ] of placajNodoj ) {
      for ( const [ dx, dz ] of [ [ -0o21/0o10, -0o21/0o10 ], [ 0o21/0o10, -0o21/0o10 ], [ -0o21/0o10, 0o21/0o10 ], [ 0o21/0o10, 0o21/0o10 ] ] ) addLamp(aX + dx, aZ + dz);
    }
    for ( const gx of RETO_X ) {
      for ( const gz of RETO_Z ) {
        if ( Math.abs(gz - riveroZ(gx)) < 0o14 ) continue;
        if ( !realajIntersekcoj.has(gx + "," + gz) ) continue;
        addLamp(gx + 0o23/0o10, gz + 0o23/0o10);
        addLamp(gx + 0o23/0o10, gz - 0o23/0o10);
        addLamp(gx - 0o23/0o10, gz + 0o23/0o10);
        addLamp(gx - 0o23/0o10, gz - 0o23/0o10);
      }
    }
    for ( const a of arkajNodoj ) {
      addLamp(a.x + 0o23/0o10, a.z + 0o23/0o10);
      addLamp(a.x + 0o23/0o10, a.z - 0o23/0o10);
      addLamp(a.x - 0o23/0o10, a.z + 0o23/0o10);
      addLamp(a.x - 0o23/0o10, a.z - 0o23/0o10);
    }
  }

  // ⟪ គីហ្វហេសូ 📃 ⟫
  const KEUXFHXESO_R = 0o10;
  const keuxfhxesoLokoj: KeuxfhxesoLoko[] = [];
  if ( arangxo.keuxfhxeso ) {
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      keuxfhxesoLokoj.push({ x: ofsX + Math.cos(a) * KEUXFHXESO_R, z: ofsZ + Math.sin(a) * KEUXFHXESO_R, rot: a });
    }
    konstruiKeuxfhxeso(sceno, keuxfhxesoLokoj, alteco, oraMaterialo);
    for ( const l of keuxfhxesoLokoj ) kolizioj.push({ x: l.x, z: l.z, r: 0o16/0o10 });
  }

  const staciaBloko = aldonajBlokoj.find(b => b.stacia) ?? aldonajBlokoj[0];
  return {
    konstruSpecoj, kolizioj, selektajxoj, konstruGrupoj, placajNodoj,
    vojDifinoj, kunigajPunktoj, kunigajFermitaj: fermitaj,
    lampLokoj, keuxfhxesoLokoj,
    staciaPozicio: staciaBloko
      ? [ ofsX + staciaBloko.x, ofsZ + staciaBloko.z ]
      : [ ofsX, ofsZ + ( arangxo.blokaGrando === "kvar" ? 0 : stacioZ ) ],
    ringoX: ofsX + ringoX,
    sudaVojo: ofsZ + sudaVojo,
  };
}
