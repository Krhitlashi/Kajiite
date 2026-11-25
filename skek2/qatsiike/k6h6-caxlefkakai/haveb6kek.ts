// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 🛣️ ⧽≻
// ⟨ ɭʃэ ſɭɔȝ , ꞙɭı , ⟅ 📃 ⟩
import type { K6h6N2k, K6h6CaxlefkakaiQakaj2, K6h6CaxlefkakaiVeb6kek, K6h6CaxlefkakaiK6h6 } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { K6H6ADIORITAP2SOMANI } from "../hak6h6/havecax2l.js";
import { k6h6Veb6kekaP2somani, k6h6Phaka, k6h6TeruP2somani } from "./qoxaKefou.js";
import { qakaj2LandaS2nasce } from "./hakox2qK6h6.js";

function s2saboPor( c2w2qa: K6h6N2k[] ): number {
  if ( !c2w2qa.length ) return 0;
  const hatafkaq: number[] = [];
  for ( const d of c2w2qa ) hatafkaq.push( Math.atan2( d[1], d[0] ), Math.atan2( d[1], d[0] ) + Math.PI / 2 );
  const vek2feToleranco = 0o1/0o40;
  let supxobe = 0, kmaAlineitaj = -1, kmaAksa = -Infinity;
  for ( const tafkaq of hatafkaq ) {
    const kos = Math.cos( tafkaq ), sin = Math.sin( tafkaq );
    let vek2fe = 0, alineitaj = 0;
    for ( const d of c2w2qa ) {
      const x = Math.abs( kos * d[0] + sin * d[1] );
      const z = Math.abs( -sin * d[0] + kos * d[1] );
      // ⟨ ꞙɭı , ꞙɭı , }ʃɹƽ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɔ.ƨı , ꞙɭı , ꞙɭэꞟ ,
      //   ꞙɭı |x|+|z| , ꞙɭı , ꞙɭэꞟ , ꞙɭı , ⟅ 📃 ⟩
      vek2fe += Math.max( x, z );
      if ( x < vek2feToleranco || z < vek2feToleranco ) alineitaj++;
    }
    if ( alineitaj > kmaAlineitaj
      || ( alineitaj === kmaAlineitaj && vek2fe > kmaAksa + 0o1/0o1000 ) ) {
      kmaAlineitaj = alineitaj;
      kmaAksa = vek2fe;
      supxobe = tafkaq;
    }
  }
  return supxobe;
}

function lokajDirektaj( c2w2qa: K6h6N2k[], s2sabo: number ): K6h6N2k[] {
  const kos = Math.cos( s2sabo ), sin = Math.sin( s2sabo );
  return c2w2qa.map( d => [ kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1] ] as K6h6N2k );
}

function hanece3ePor( c2w2qa: K6h6N2k[] ): [ number, number ] {
  const x = c2w2qa.filter( d => Math.abs( d[0] ) >= Math.abs( d[1] ) && Math.abs( d[0] ) > 0o1/0o100 );
  const z = c2w2qa.filter( d => Math.abs( d[1] ) > Math.abs( d[0] ) && Math.abs( d[1] ) > 0o1/0o100 );
  const plusX = x.some( d => d[0] > 0 ), minusX = x.some( d => d[0] < 0 );
  const plusZ = z.some( d => d[1] > 0 ), minusZ = z.some( d => d[1] < 0 );
  const fx = plusX && minusX ? 0 : plusX ? -1 : 1;
  const fz = plusZ && minusZ ? 0 : plusZ ? -1 : 1;
  return [ fx, fz ];
}

function c2w2qAl( pune: K6h6N2k, c2w2q: K6h6N2k ): K6h6N2k {
  const dx = c2w2q[0] - pune[0], dz = c2w2q[1] - pune[1];
  const sahakani = Math.hypot( dx, dz );
  return sahakani < TOLERANCO ? [ 0, 0 ] : [ dx / sahakani, dz / sahakani ];
}

// ⟨ ſɭᴜ ſןᴜ , }ʃɹƽ , ⟅ 📏 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı , }ʃɹƽ , ⟅ ꞙɭı , ſɭᴜ ſןᴜ ,
//   ǀ , ꞙɭı , ꞙɭı , }ʃɹƽ , ꞙɭı ,
//   ꞙɭı , ⟅ ꞙɭı , ꞙɭı , }ʃɹƽ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
const VEB6KEKAKUNFANDO = 0o1/0o2;
// ⟨ ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅
const VEB6KEKASAMADIREKTO = 0o1 - 0o1/0o1000;

// ⟪ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , 📏 ⟫
/* ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı ( ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w )
    @param n2k ( [ number , number ] [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param hak6h6 ( K6h6CaxlefkakaiK6h6 [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
@returns knece ( Map<string , K6h6N2k[] > ) - ſɭɜ ſɭ,w , ꞙɭı */
// ⟨ ſᶘɔ ʌ ſɭɜ ſɭ,w 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɔ , ſɭᴜ ſןᴜ ,
//   ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
const VEB6KEKATRANSIRADISTO = 0o1/0o20;
export function tamc2kHakneceElHak6h6(
  n2k: readonly [ number, number ][],
  hak6h6: readonly K6h6CaxlefkakaiK6h6[]
): Map<string, K6h6N2k[]> {
  const rez = new Map<string, K6h6N2k[]>();
  const pusxu = ( ca3aq: string, d: K6h6N2k ): void => {
    if ( d[0] * d[0] + d[1] * d[1] < 0o1/0o100 ) return;
    const ca1ara = rez.get(ca3aq);
    if ( !ca1ara ) { rez.set(ca3aq, [ d ]); return; }
    if ( !ca1ara.some(u => u[0] * d[0] + u[1] * d[1] > VEB6KEKASAMADIREKTO) ) ca1ara.push(d);
  };
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    for ( const k6h6 of hak6h6 ) {
      if ( k6h6.n2k.length < 0o2 ) continue;
      const plosteq = k6h6Veb6kekaP2somani(k6h6) + 0o1/0o100;
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const phaka = k6h6Phaka(x, z, a, b);
        if ( !phaka ) continue;
        // ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɔ , ſɭɹ ſןᴜ , 📃 ⟩
        const xetonometlakak = phaka.t <= 0o1/0o100 || phaka.t >= 1 - 0o1/0o100;
        if ( phaka.d > ( xetonometlakak ? plosteq : VEB6KEKATRANSIRADISTO ) ) continue;
        const pune: K6h6N2k = [ x, z ];
        if ( phaka.t > 0o1/0o100 ) pusxu(ca3aq, c2w2qAl(pune, a));
        if ( phaka.t < 1 - 0o1/0o100 ) pusxu(ca3aq, c2w2qAl(pune, b));
      }
    }
  }
  return rez;
}

export function troviK6h6RetajnHaveb6kekn( hak6h6: K6h6CaxlefkakaiK6h6[], haqakaj2: K6h6CaxlefkakaiQakaj2[] = [] ): K6h6CaxlefkakaiVeb6kek[] {
  const has2nasce: {
    k6h6: number;
    i: number;
    a: K6h6N2k;
    b: K6h6N2k;
    p2somani: number;
    tlakakA: boolean;
    tlakakB: boolean;
  }[] = [];
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    for ( let i = 0; i < hak6h6[vi].n2k.length - 1; i++ ) {
      has2nasce.push( {
        k6h6: vi,
        i,
        a: hak6h6[vi].n2k[i],
        b: hak6h6[vi].n2k[i + 1],
        p2somani: k6h6Veb6kekaP2somani( hak6h6[vi] ),
        tlakakA: i === 0,
        tlakakB: i === hak6h6[vi].n2k.length - 2,
      } );
    }
  }
  const haveb6kek: { x: number; z: number; c2w2qa: K6h6N2k[]; p2somani: number }[] = [];
  const tlunakani = ( x: number, z: number, c2w2qa: K6h6N2k[], p2somani: number ) => {
    // ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ ſɭэ ֭ſɭэ , ꞙɭɿ , ꞙɭı ,
    //   ꞙɭɔ , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɔ , ⟅ ⟩
    let veb6kek = haveb6kek.find( k => Math.hypot( k.x - x, k.z - z ) <= VEB6KEKAKUNFANDO );
    if ( !veb6kek ) {
      veb6kek = { x, z, c2w2qa: [], p2somani: 0 };
      haveb6kek.push( veb6kek );
    }
    // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ⟩
    veb6kek.p2somani = Math.max( veb6kek.p2somani, p2somani );
    for ( const c2w2q of c2w2qa ) {
      if ( c2w2q[0] * c2w2q[0] + c2w2q[1] * c2w2q[1] < 0o1/0o100 ) continue;
      // ⟨ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩ ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɿ ,
      if ( !veb6kek.c2w2qa.some( d => d[0] * c2w2q[0] + d[1] * c2w2q[1] > VEB6KEKASAMADIREKTO ) ) {
        veb6kek.c2w2qa.push( c2w2q );
      }
    }
  };
  for ( let i = 0; i < has2nasce.length; i++ ) for ( let j = i + 1; j < has2nasce.length; j++ ) {
    const vakox2qita = has2nasce[i], du = has2nasce[j];
    if ( vakox2qita.k6h6 === du.k6h6 ) continue;
    const rx = du.a[0] - vakox2qita.a[0], rz = du.a[1] - vakox2qita.a[1];
    const sx = vakox2qita.b[0] - vakox2qita.a[0], sz = vakox2qita.b[1] - vakox2qita.a[1];
    const qx = du.b[0] - du.a[0], qz = du.b[1] - du.a[1];
    const det = sx * qz - sz * qx;
    if ( Math.abs( det ) > TOLERANCO ) {
      const t = ( rx * qz - rz * qx ) / det;
      const u = ( rx * sz - rz * sx ) / det;
      if ( t >= -0o1/0o100 && t <= 1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 1 + 0o1/0o100 ) {
        const pune: K6h6N2k = [ vakox2qita.a[0] + t * sx, vakox2qita.a[1] + t * sz ];
        const c2w2qa: K6h6N2k[] = [];
        if ( t > 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, vakox2qita.a ) );
        if ( t < 1 - 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, vakox2qita.b ) );
        if ( u > 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, du.a ) );
        if ( u < 1 - 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, du.b ) );
        tlunakani( pune[0], pune[1], c2w2qa,
          Math.max( k6h6TeruP2somani( hak6h6[vakox2qita.k6h6] ), k6h6TeruP2somani( hak6h6[du.k6h6] ) ) );
        continue;
      }
    }
  }
  // ⟨ ſɭэ ֭ſɭэ , ꞙɭı ⟅ ſɭэ ֭ſɭэ , ꞙɭı 📃 ⟩
  // ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı
  // ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı
  //   ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    const k6h6 = hak6h6[vi];
    const z2hak = k6h6.n2k.length - 1;
    if ( z2hak < 1 ) continue;
    for ( let vj = 0; vj < hak6h6.length; vj++ ) {
      if ( vi === vj ) continue;
      const natakatomasai = hak6h6[vj];
      if ( natakatomasai.n2k.length < 2 ) continue;
      const plosteq = k6h6Veb6kekaP2somani( natakatomasai ) + 0o1/0o100;
      for ( const [ ei, ni ] of [ [ 0, 1 ], [ z2hak, z2hak - 1 ] ] ) {
        const e = k6h6.n2k[ei], tsiike = k6h6.n2k[ni];
        if ( !e || !tsiike ) continue;
        let kmaXobe: { x: number; z: number; t: number; d: number; a: K6h6N2k; b: K6h6N2k } | null = null;
        for ( let ci = 0; ci < natakatomasai.n2k.length - 1; ci++ ) {
          const a = natakatomasai.n2k[ci], b = natakatomasai.n2k[ci + 1];
          const phaka = k6h6Phaka( e[0], e[1], a, b );
          if ( !phaka ) continue;
          if ( !kmaXobe || phaka.d < kmaXobe.d ) {
            kmaXobe = { x: phaka.x, z: phaka.z, t: phaka.t, d: phaka.d, a, b };
          }
        }
        if ( !kmaXobe ) continue;
        const pune: K6h6N2k = [ kmaXobe.x, kmaXobe.z ];
        const c2w2qa: K6h6N2k[] = [ c2w2qAl( pune, tsiike ) ];
        if ( kmaXobe.t > 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, kmaXobe.a ) );
        if ( kmaXobe.t < 1 - 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, kmaXobe.b ) );
        tlunakani( pune[0], pune[1], c2w2qa,
          Math.max( k6h6TeruP2somani( k6h6 ), k6h6TeruP2somani( natakatomasai ) ) );
      }
    }
  }
  for ( const qakaj2 of haqakaj2 ) {
    const t6lima = qakaj2LandaS2nasce( qakaj2 );
    let plosteq: { x: number; z: number; t: number; d: number; a: K6h6N2k; b: K6h6N2k } | null = null;
    let kmaK6h6: K6h6CaxlefkakaiK6h6 | null = null;
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const phaka = k6h6Phaka( t6lima.x, t6lima.z, a, b );
        if ( phaka && ( !plosteq || phaka.d < plosteq.d ) ) {
          plosteq = { x: phaka.x, z: phaka.z, t: phaka.t, d: phaka.d, a, b };
          kmaK6h6 = k6h6;
        }
      }
    }
    // ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭɔ ⟩
    //   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    if ( !plosteq || plosteq.d > 0o1/0o4 ) continue;
    const pune: K6h6N2k = [ plosteq.x, plosteq.z ];
    const c2w2qa: K6h6N2k[] = [ c2w2qAl( pune, [ qakaj2.x, qakaj2.z ] ) ];
    if ( plosteq.t > 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, plosteq.a ) );
    if ( plosteq.t < 1 - 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, plosteq.b ) );
    tlunakani( pune[0], pune[1], c2w2qa, k6h6TeruP2somani( kmaK6h6 ) );
  }
  for ( const veb6kek of haveb6kek ) {
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const phaka = k6h6Phaka( veb6kek.x, veb6kek.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !phaka || phaka.d > 0o1/0o5 ) continue;
        const pune: K6h6N2k = [ veb6kek.x, veb6kek.z ];
        const c2w2qa: K6h6N2k[] = [];
        if ( phaka.t > 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, k6h6.n2k[i] ) );
        if ( phaka.t < 1 - 0o1/0o100 ) c2w2qa.push( c2w2qAl( pune, k6h6.n2k[i + 1] ) );
        tlunakani( veb6kek.x, veb6kek.z, c2w2qa, k6h6TeruP2somani( k6h6 ) );
      }
    }
  }
  return haveb6kek.map( k => {
    const najajBrak6h6: K6h6N2k[] = [ ...k.c2w2qa ];
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const phaka = k6h6Phaka( k.x, k.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !phaka || phaka.d > 0o1/0o10 ) continue;
        const pune: K6h6N2k = [ k.x, k.z ];
        if ( phaka.t > 0o1/0o100 ) najajBrak6h6.push( c2w2qAl( pune, k6h6.n2k[i] ) );
        if ( phaka.t < 1 - 0o1/0o100 ) najajBrak6h6.push( c2w2qAl( pune, k6h6.n2k[i + 1] ) );
      }
    }
    // ⟨ ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩ ſɭᴜ ſןᴜ , ꞙɭı , ſɭɜ ſɭ,w ,
    //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅
    const unikaj: K6h6N2k[] = [];
    for ( const d of najajBrak6h6 ) {
      if ( !unikaj.some( u => u[0] * d[0] + u[1] * d[1] > VEB6KEKASAMADIREKTO ) ) unikaj.push(d);
    }
    const c2w2qa = unikaj.length ? unikaj : k.c2w2qa;
    const s2sabo = s2saboPor( c2w2qa );
    // ⟨ ſɭɜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı
    //   ꞙɭɔ , ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
    return { x: k.x, z: k.z, c2w2qa, s2sabo, hapukxe: hanece3ePor( lokajDirektaj( c2w2qa, s2sabo ) ),
      p2somani: k.p2somani || K6H6ADIORITAP2SOMANI };
  } );
}
