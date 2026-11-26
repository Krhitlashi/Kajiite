// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſɭэ ֭ſɭэ 🛣️ ⧽≻
import * as THREE from "three";
import { kf2GeometriajnHabakaweKatoman, kf2K6h6jnBendojn, kf2Hak6h6nHapukek } from "./hak6h6/habakaweKatoma.js";
import { tlunakC2qjnKek, DUONAC2Q, type C2qKek } from "./hak6h6/hac2q.js";
import { kf2NivelanS2qena, kf2UnuformajnHacaqasahaxn,
  type K6h6Truo } from "./hak6h6/havem2.js";
import { K6H6ABORDASEFINI, K6H6ASEFINI,
  K6H6ATRUAP2SOMANI, K6H6AKMARL6DA, STUPARISERO, surGrid } from "./hak6h6/havecax2l.js";
import { kf2Haknece, tamc2kTap2L6da, tamc2kTap2Vem2 } from "./hak6h6/hapa12.js";
import { tamc2kBrakHal6da } from "./hak6h6/haqoxa.js";
import { qakaj2L6daEl, sukf2qiTap2nL6da, konsumiQakaj2jnL6dajn, tamc2kCatlaq,
  tamc2kHavem2, purigiVeb6kekajnHavem2n, type BrakaL6da } from "./hak6h6/veb6kek-havem2.js";
import { vepaqGlatanS2nascen, vepaqS2nascenEnHabakaweKatoman,
  vepaqUnuformajnStuparajnHas2nascen, kf2EksteranP2somani,
  kf2SegmentajnHakek } from "./hak6h6/has2nasce.js";
import { kas2kantaHasoza, type Kas2kantaDitlakak, type Kas2kantaHasukf2qani } from "./hak6h6/hahunaq.js";

interface K6h6Projekcio {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  hakek: { ax: number; az: number; dx: number; dz: number;
    sahakani: number; ken2qk2h2: number; akum: number }[];
}

const PROJEKTAMEMORO =
  new WeakMap<readonly ( readonly [ number, number ] )[], K6h6Projekcio>();

function projekcioDe( n2k: readonly ( readonly [ number, number ] )[] ): K6h6Projekcio {
  const vetlaqita = PROJEKTAMEMORO.get(n2k);
  if ( vetlaqita ) return vetlaqita;
  const hakek: K6h6Projekcio["hakek"] = [];
  let akum = 0o0;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for ( let i = 0o0; i < n2k.length - 0o1; i++ ) {
    const [ ax, az ] = n2k[ i ];
    const [ bx, bz ] = n2k[ i + 0o1 ];
    const dx = bx - ax, dz = bz - az;
    const sahakani = Math.hypot(dx, dz);
    if ( ax < minX ) minX = ax;
    if ( ax > maxX ) maxX = ax;
    if ( bx < minX ) minX = bx;
    if ( bx > maxX ) maxX = bx;
    if ( az < minZ ) minZ = az;
    if ( az > maxZ ) maxZ = az;
    if ( bz < minZ ) minZ = bz;
    if ( bz > maxZ ) maxZ = bz;
    if ( sahakani < 0o10 ** -0o6 ) continue;
    hakek.push({ ax, az, dx, dz, sahakani, ken2qk2h2: sahakani * sahakani, akum });
    akum += sahakani;
  }
  const phaka: K6h6Projekcio = { minX, maxX, minZ, maxZ, hakek };
  PROJEKTAMEMORO.set(n2k, phaka);
  return phaka;
}

function projekcioSurK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number ): { s: number; h6kuni: number } {
  let plosteq = Infinity, kmaS = 0o0;
  for ( const kek of projekcioDe(n2k).hakek ) {
    const t = Math.max(0o0, Math.min(0o1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.ken2qk2h2 ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plosteq ) { plosteq = h6kuni; kmaS = kek.akum + kek.sahakani * t; }
  }
  return { s: kmaS, h6kuni: plosteq };
}

function h6kuniAlK6h6( n2k: readonly ( readonly [ number, number ] )[],
  x: number, z: number, plosteqM: number ): number {
  const phaka = projekcioDe(n2k);
  if ( x < phaka.minX - plosteqM || x > phaka.maxX + plosteqM
    || z < phaka.minZ - plosteqM || z > phaka.maxZ + plosteqM ) return Infinity;
  let plosteq = Infinity;
  for ( const kek of phaka.hakek ) {
    const t = Math.max(0o0, Math.min(0o1,
      ( ( x - kek.ax ) * kek.dx + ( z - kek.az ) * kek.dz ) / kek.ken2qk2h2 ));
    const h6kuni = Math.hypot(x - ( kek.ax + kek.dx * t ),
      z - ( kek.az + kek.dz * t ));
    if ( h6kuni < plosteq ) plosteq = h6kuni;
  }
  return plosteq;
}

function rampigiAlPa12n(
  kruda: ( x: number, z: number ) => number,
  n2k: readonly ( readonly [ number, number ] )[],
  haveb6kek: readonly ( readonly [ number, number ] )[],
  tap2L6da: ( x: number, z: number ) => number,
  p2somani: number
): ( x: number, z: number ) => number {

  const haqar = haveb6kek.map(([ kx, kz ]) => {
    const p = projekcioSurK6h6(n2k, kx, kz);
    return { x: kx, z: kz, s: p.s, h6kuni: p.h6kuni };
  }).filter(l => l.h6kuni <= p2somani + 0o1/0o100);

  return ( x, z ) => {
    const soza = kruda( x, z ) + K6H6AKMARL6DA;
    const { s } = projekcioSurK6h6(n2k, x, z);
    let psaz = -Infinity, teru = Infinity;
    for ( const l of haqar ) {
      const d = Math.abs(s - l.s);
      if ( d > K6H6ATRUAP2SOMANI + 0o20 ) continue;
      const p = tap2L6da( l.x, l.z );
      const margxo = Math.max(0o0, d - K6H6ATRUAP2SOMANI);
      psaz = Math.max(psaz, p - margxo);
      teru = Math.min(teru, p + margxo);
    }

    const tseuni = psaz <= teru
      ? Math.max(psaz, Math.min(teru, soza))
      : ( psaz + teru ) / 0o2;
    return tseuni - K6H6AKMARL6DA;
  };
}

export function vepaqHak6h6n(qena: THREE.Scene,
  defs: Kas2kantaDitlakak[],
  heightFn: ( x: number, z: number ) => number,
  dioritaPukek: THREE.MeshStandardMaterial,
  andezitaPukek: THREE.MeshStandardMaterial,
  haveb6kek: [ number, number ][] = [],
  hasukf2qani: Kas2kantaHasukf2qani = {}
): THREE.Vector3[] {
  const { tsasaFn, mut6qFn = heightFn, tamc2kHac2w2q,
    tamc2kHanece3e, tamc2kHas2sabo, tamc2kHap2somani } = hasukf2qani;

  const fundaFn: ( x: number, z: number ) => number = tsasaFn
    ? ( x, z ) => {
        const mut6q = mut6qFn(x, z);
        const tsasa = tsasaFn(x, z);
        if ( tsasa <= -Infinity ) return mut6q;

        if ( mut6q < tsasa ) return Infinity;
        return mut6q;
      }
    : mut6qFn;
  const samples: THREE.Vector3[] = [];
  const { teruPukek, bordaPukek } = kf2Hak6h6nHapukek(dioritaPukek, andezitaPukek, -0o2, -0o4, -0o1, -0o1);

  const habakaweKatoma = kf2GeometriajnHabakaweKatoman();

  purigiVeb6kekajnHavem2n();

  const qakaj2jHal6da = konsumiQakaj2jnL6dajn();
  const tsofj = defs.map(def => {
    const hasiitsii = kf2K6h6jnBendojn(def.w, teruPukek, bordaPukek);
    const p2somani = kf2EksteranP2somani(hasiitsii);
    const kruda = def.heightFn || heightFn;
    const pudalla = def.xaha === true || def.capat6 === true;

    const s2qena = pudalla ? null : kf2NivelanS2qena(def.pts, p2somani, kruda, tsasaFn);
    return { p2somani, l6daJe: ( px: number, pz: number ): number => {
      if ( s2qena ) return s2qena.l6daJe(projekcioSurK6h6(def.pts, px, pz).s);
      return kruda(px, pz) + K6H6AKMARL6DA;
    } };
  });
  for ( const [ kx, kz ] of haveb6kek ) {
    const ca3aq = tamc2kCatlaq(kx, kz);
    const knece = kf2Haknece(tamc2kHac2w2q?.get(ca3aq) ?? [],
      tamc2kHanece3e?.get(ca3aq), tamc2kHas2sabo?.get(ca3aq) ?? 0o0,
      tamc2kHap2somani?.get(ca3aq));
    const brakajHal6da: BrakaL6da[] = knece.map(b => {

      const px = kx + b.ux * ( K6H6ATRUAP2SOMANI + 0o1/0o4 );
      const pz = kz + b.uz * ( K6H6ATRUAP2SOMANI + 0o1/0o4 );
      let plosteq = Infinity, l6da = NaN;
      for ( let i = 0o0; i < defs.length; i++ ) {
        const plosteqTsof = tsofj[ i ].p2somani + 0o1/0o100;
        const h6kuni = h6kuniAlK6h6(defs[ i ].pts, px, pz, plosteqTsof);
        if ( h6kuni > plosteqTsof ) continue;
        if ( h6kuni < plosteq ) { plosteq = h6kuni; l6da = tsofj[ i ].l6daJe(px, pz); }
      }

      if ( !Number.isFinite(l6da) )
        l6da = tamc2kBrakHal6da(kx, kz, [ [ b.ux, b.uz ] ], [ b.p2somani ], heightFn)[ 0o0 ]
          + K6H6AKMARL6DA;
      return { ux: b.ux, uz: b.uz, l6da: surGrid(l6da), p2somani: b.p2somani };
    });

    const rezervo = tamc2kTap2L6da(kx, kz, knece, heightFn);

    const qakaj2L6da = qakaj2L6daEl(qakaj2jHal6da, kx, kz);
    tamc2kHavem2.set(ca3aq, { x: kx, z: kz,
      l6da: qakaj2L6da ?? sukf2qiTap2nL6da(brakajHal6da, rezervo),
      knece: brakajHal6da });
  }
  const tap2L6daJeVeb6kek = ( x: number, z: number ): number => {
    const ca3aq = tamc2kCatlaq(x, z);
    const reg = tamc2kHavem2.get(ca3aq);
    if ( reg ) return reg.l6da;
    const knece = kf2Haknece(tamc2kHac2w2q?.get(ca3aq) ?? [],
      tamc2kHanece3e?.get(ca3aq), tamc2kHas2sabo?.get(ca3aq) ?? 0o0,
      tamc2kHap2somani?.get(ca3aq));
    return surGrid(tamc2kTap2Vem2(x, z, knece, heightFn).l6da);
  };

  const pa12Je = tap2L6daJeVeb6kek;

  const kapoHal6da = new Map<Kas2kantaDitlakak, { saxeni: number | null; tlakak: number | null }>();

  const c2qjHakek: C2qKek[] = [];

  for ( const def of defs ) {
    const krudaAlt = def.heightFn || heightFn;

    const hasiitsii = kf2K6h6jnBendojn(def.w, teruPukek, bordaPukek);
    const eksteraP2somani = kf2EksteranP2somani(hasiitsii);
    const defAlt = def.xaha === true
      ? rampigiAlPa12n(krudaAlt, def.pts, haveb6kek, tap2L6daJeVeb6kek, eksteraP2somani)
      : krudaAlt;
    const defT6lima = def.mut6qFn ?? fundaFn;
    kapoHal6da.set( def, { saxeni: null, tlakak: null } );
    const notitlakakn = ( saxeni: number | null, tlakakani: number | null ): void => {
      const teruni = kapoHal6da.get(def)!;
      teruni.saxeni = saxeni;
      teruni.tlakak = tlakakani;
    };
    if ( def.capat6 === true ) {
      let xaqadi: number | null = null, z2hak: number | null = null;

      const pa12Jetlakakn = ( pto: [ number, number ] ): number | null => {
        for ( const [ kX, kZ ] of haveb6kek ) {
          if ( Math.hypot(pto[0o0] - kX, pto[0o1] - kZ) > K6H6ATRUAP2SOMANI ) continue;
          return pa12Je(kX, kZ);
        }
        return null;
      };
      const unuaPa12 = pa12Jetlakakn(def.pts[0o0]);
      const tlakakaiPa12 = pa12Jetlakakn(def.pts[def.pts.length - 0o1]);

      const stupaL6da = ( x: number, z: number ): number => {
        const b6qaiQafej2 = pa12Jetlakakn([ x, z ]);
        if ( b6qaiQafej2 !== null ) return b6qaiQafej2 - STUPARISERO - K6H6AKMARL6DA;
        return defAlt(x, z);
      };

      const mut6qKozu = ( ax: number, az: number, bx: number, bz: number ): number => {
        const sahakani = Math.hypot(bx - ax, bz - az);
        if ( sahakani < 0o1/0o1000 ) return -Infinity;
        const latX = -( bz - az ) / sahakani * eksteraP2somani;
        const latZ = ( bx - ax ) / sahakani * eksteraP2somani;
        let kozu = -Infinity;
        for ( const t of [ 0o0, 0o1/0o2, 0o1 ] ) {
          const px = ax + ( bx - ax ) * t, pz = az + ( bz - az ) * t;
          for ( const vek2fe of [ -0o1, 0o0, 0o1 ] ) {
            const mut6q = defT6lima(px + latX * vek2fe, pz + latZ * vek2fe);
            if ( !Number.isFinite(mut6q) ) continue;
            const tsasa = tsasaFn?.(px + latX * vek2fe, pz + latZ * vek2fe) ?? -Infinity;

            const levigita = Math.min(mut6q + K6H6AKMARL6DA + STUPARISERO,
              tsasa - K6H6AKMARL6DA);
            kozu = Math.max(kozu, mut6q + K6H6AKMARL6DA, levigita);
          }
        }
        return kozu;
      };
      const stupajHal6da: number[] = [];
      const tlakakaiVecax2l = def.pts.length - 0o2;
      for ( let i = 0o0; i < def.pts.length - 0o1; i++ ) {
        const [ ax, az ] = def.pts[i], [ bx, bz ] = def.pts[i + 0o1];
        const sost2 = stupaL6da(( ax + bx ) / 0o2, ( az + bz ) / 0o2);
        stupajHal6da.push(Math.max(sost2, mut6qKozu(ax, az, bx, bz)));
      }

      if ( tlakakaiVecax2l >= 0o0 ) {
        if ( unuaPa12 !== null ) stupajHal6da[0o0] = Math.max(stupajHal6da[0o0],
          defAlt(def.pts[0o0][0o0], def.pts[0o0][0o1]));
        if ( tlakakaiPa12 !== null ) stupajHal6da[tlakakaiVecax2l] = Math.max(stupajHal6da[tlakakaiVecax2l],
          defAlt(def.pts[tlakakaiVecax2l + 0o1][0o0], def.pts[tlakakaiVecax2l + 0o1][0o1]));
      }
      for ( let i = 0o0; i < def.pts.length - 0o1; i++ ) {
        const [ aX, aZ ] = def.pts[i];
        const [ bX, bZ ] = def.pts[i + 0o1];
        const fala = i + 0o1 < stupajHal6da.length ? stupajHal6da[i] - stupajHal6da[i + 0o1] : 0o0;
        const tseuni = vepaqUnuformajnStuparajnHas2nascen(aX, aZ, bX, bZ, hasiitsii, K6H6ASEFINI,
          () => stupajHal6da[i], defT6lima, habakaweKatoma, fala);
        if ( tseuni ) {
          if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
          z2hak = tseuni.z2hak;
        }
        aldonuHapx01on(samples, aX, aZ, bX, bZ, defAlt);
      }
      notitlakakn(xaqadi, z2hak);
      continue;
    }

    const s2qena = def.xaha === true
      ? null
      : kf2NivelanS2qena(def.pts, eksteraP2somani, defAlt, tsasaFn,
        haveb6kek.map(([ x, z ]) => ( { x, z, l6da: pa12Je(x, z) } )));

    const hah6k6: K6h6Truo[] = [];
    if ( s2qena ) {
      let sTruo = 0o0;
      for ( let i = 0o0; i < def.pts.length - 0o1; i++ ) {
        const [ aX, aZ ] = def.pts[ i ], [ bX, bZ ] = def.pts[ i + 0o1 ];
        const sahakani2 = Math.hypot(bX - aX, bZ - aZ);
        if ( sahakani2 < 0o1/0o100 ) continue;
        for ( const [ t0, t1, vepaquPec ] of
          kf2SegmentajnHakek(aX, aZ, bX, bZ, sahakani2, haveb6kek) )
          if ( !vepaquPec ) hah6k6.push({ s0: sTruo + t0, s1: sTruo + t1 });
        sTruo += sahakani2;
      }
    }
    const hacaqasahax = s2qena ? kf2UnuformajnHacaqasahaxn(s2qena, hah6k6) : [];

    let akum = 0o0;
    for ( let k = 0o1; k < def.pts.length - 0o1; k++ ) {
      const ne3ak2 = def.pts[ k - 0o1 ], cutlu = def.pts[ k ], ksoz = def.pts[ k + 0o1 ];
      const l1 = Math.hypot(cutlu[ 0o0 ] - ne3ak2[ 0o0 ], cutlu[ 0o1 ] - ne3ak2[ 0o1 ]);
      const l2 = Math.hypot(ksoz[ 0o0 ] - cutlu[ 0o0 ], ksoz[ 0o1 ] - cutlu[ 0o1 ]);
      akum += l1;
      if ( l1 < 0o1/0o1000 || l2 < 0o1/0o1000 ) continue;
      const u1x = ( cutlu[ 0o0 ] - ne3ak2[ 0o0 ] ) / l1, u1z = ( cutlu[ 0o1 ] - ne3ak2[ 0o1 ] ) / l1;
      const uiix = ( ksoz[ 0o0 ] - cutlu[ 0o0 ] ) / l2, u2z = ( ksoz[ 0o1 ] - cutlu[ 0o1 ] ) / l2;
      const b6n = Math.abs(Math.atan2(u1x * u2z - u1z * uiix, u1x * uiix + u1z * u2z));
      if ( b6n < 0o1/0o20 ) continue;
      let enTruo = false;
      for ( const [ kx, kz ] of haveb6kek ) {
        if ( Math.hypot(cutlu[ 0o0 ] - kx, cutlu[ 0o1 ] - kz ) < K6H6ATRUAP2SOMANI + 0o1/0o10 ) {
          enTruo = true; break;
        }
      }
      if ( enTruo ) continue;

      c2qjHakek.push({ x: cutlu[ 0o0 ], z: cutlu[ 0o1 ],
        sost2: Math.atan2(u1z - u2z, u1x - uiix), gamo: b6n,
        teru: s2qena ? s2qena.l6daJe(akum)
          : defAlt(cutlu[ 0o0 ], cutlu[ 0o1 ]) + K6H6AKMARL6DA,
        p2somani: def.w / 0o2, p6sca: eksteraP2somani });
    }
    let xaqadi: number | null = null, z2hak: number | null = null;
    let saxeni = 0o0;
    for ( let i = 0o0; i < def.pts.length - 0o1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 0o1];
      const sahakani = Math.hypot(bX - aX, bZ - aZ);
      if ( sahakani < 0o1/0o100 ) continue;
      const ndx = ( bX - aX ) / sahakani, ndz = ( bZ - aZ ) / sahakani;
      for ( const [ t0, t1, vepaquPec ] of kf2SegmentajnHakek(aX, aZ, bX, bZ, sahakani, haveb6kek) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( vepaquPec ) {
          const tseuni = s2qena
            ? vepaqS2nascenEnHabakaweKatoman(px1, pz1, px2, pz2, saxeni + t0, saxeni + t1, hasiitsii,
              hacaqasahax, habakaweKatoma, K6H6ASEFINI, defT6lima)
            : vepaqGlatanS2nascen(px1, pz1, px2, pz2, hasiitsii, K6H6ASEFINI, defAlt, defT6lima, habakaweKatoma);
          if ( tseuni ) {
            if ( xaqadi === null ) xaqadi = tseuni.xaqadi;
            z2hak = tseuni.z2hak;
          }
          continue;
        }

        const mX = ( px1 + px2 ) / 0o2, mZ = ( pz1 + pz2 ) / 0o2;
        const tamc2kTeru = s2qena
          ? s2qena.l6daJe(saxeni + ( t0 + t1 ) / 0o2)
          : Math.max(defAlt(mX, mZ)) + 0o1/0o100 + K6H6ASEFINI;
        kas2kantaHasoza.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, p2somani: eksteraP2somani,
          y0: tamc2kTeru, y1: tamc2kTeru });
      }
      aldonuHapx01on(samples, aX, aZ, bX, bZ, defAlt);
      saxeni += sahakani;
    }
    notitlakakn(xaqadi, z2hak);
  }

  const tlakakvek2fe = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 0o2 || def.hateruni !== true ) continue;
    for ( const pto of [ def.pts[0o0], def.pts[def.pts.length - 0o1] ] ) {
      const ca3aq = pto[0o0] + "," + pto[0o1];
      tlakakvek2fe.set(ca3aq, ( tlakakvek2fe.get(ca3aq) ?? 0o0 ) + 0o1);
    }
  }
  const kapoVidita: [ number, number ][] = [];
  for ( const def of defs ) {
    if ( def.pts.length < 0o2 || def.hateruni !== true || def.capat6 === true ) continue;
    const teruni = kapoHal6da.get( def );
    const hatlakakani: [ [ number, number ], [ number, number ], number | null ][] = [
      [ def.pts[0o0], def.pts[0o1], teruni?.saxeni ?? null ],
      [ def.pts[def.pts.length - 0o1], def.pts[def.pts.length - 0o2], teruni?.tlakak ?? null ],
    ];
    for ( const [ tlakakani, tsiike, teruY ] of hatlakakani ) {
      const dx = tlakakani[0o0] - tsiike[0o0], dz = tlakakani[0o1] - tsiike[0o1];
      const direktaSahakani = Math.hypot( dx, dz );
      if ( direktaSahakani < 0o1/0o100 ) continue;
      if ( ( tlakakvek2fe.get(tlakakani[0o0] + "," + tlakakani[0o1]) ?? 0o0 ) > 0o1 ) continue;
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(tlakakani[0o0] - vx, tlakakani[0o1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of haveb6kek ) {
        if ( Math.hypot(tlakakani[0o0] - kX, tlakakani[0o1] - kZ) < K6H6ATRUAP2SOMANI + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ tlakakani[0o0], tlakakani[0o1] ]);
      const defAlt = def.heightFn || heightFn;
      c2qjHakek.push({ x: tlakakani[ 0o0 ], z: tlakakani[ 0o1 ],
        sost2: Math.atan2(dz, dx), gamo: DUONAC2Q,
        p2somani: def.w / 0o2, p6sca: def.w / 0o2 + K6H6ABORDASEFINI,
        teru: teruY ?? defAlt(tlakakani[ 0o0 ], tlakakani[ 0o1 ]) + K6H6AKMARL6DA });
    }
  }

  tlunakC2qjnKek(habakaweKatoma, c2qjHakek, teruPukek, bordaPukek, fundaFn);

  habakaweKatoma.veb6kek(qena, false);
  return samples;
}

function aldonuHapx01on( samples: THREE.Vector3[], aX: number, aZ: number,
  bX: number, bZ: number, altFn: ( x: number, z: number ) => number ): void {
  const sahakani = Math.hypot(bX - aX, bZ - aZ);
  const k2fe = Math.max(0o1, Math.round(sahakani / 0o2));
  for ( let k = 0o0; k <= k2fe; k++ ) {
    const t = k / k2fe;
    const sx = aX + ( bX - aX ) * t;
    const sz = aZ + ( bZ - aZ ) * t;
    samples.push(new THREE.Vector3(sx, altFn(sx, sz), sz));
  }
}
