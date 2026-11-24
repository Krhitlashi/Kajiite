// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 🛣️ ⧽≻
// ⟨ ɭʃэ ſɭɔȝ , ꞙɭı , ⟅ 📃 ⟩
import type { K6h6Punkto, K6h6RetoQakaj2, K6h6RetoVeb6kek, K6h6RetoK6h6 } from "./hahunaq.js";
import { TOLERANCO } from "./hahunaq.js";
import { VOJA_DIORITA_DUONO } from "../hak6h6/havecax2l.js";
import { k6h6KunigaDuono, k6h6Projekcio, k6h6SupraDuono } from "./geometrio.js";
import { qakaj2LandaS2nasce } from "./kunfandoj.js";

function rotacioPor( direktaj: K6h6Punkto[] ): number {
  if ( !direktaj.length ) return 0;
  const hatafkaq: number[] = [];
  for ( const d of direktaj ) hatafkaq.push( Math.atan2( d[1], d[0] ), Math.atan2( d[1], d[0] ) + Math.PI / 2 );
  const aksaToleranco = 0o1/0o40;
  let plejbona = 0, plejAlineitaj = -1, plejAksa = -Infinity;
  for ( const tafkaq of hatafkaq ) {
    const kos = Math.cos( tafkaq ), sin = Math.sin( tafkaq );
    let aksa = 0, alineitaj = 0;
    for ( const d of direktaj ) {
      const x = Math.abs( kos * d[0] + sin * d[1] );
      const z = Math.abs( -sin * d[0] + kos * d[1] );
      // ⟨ ꞙɭı , ꞙɭı , }ʃɹƽ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭɔ.ƨı , ꞙɭı , ꞙɭэꞟ ,
      //   ꞙɭı |x|+|z| , ꞙɭı , ꞙɭэꞟ , ꞙɭı , ⟅ 📃 ⟩
      aksa += Math.max( x, z );
      if ( x < aksaToleranco || z < aksaToleranco ) alineitaj++;
    }
    if ( alineitaj > plejAlineitaj
      || ( alineitaj === plejAlineitaj && aksa > plejAksa + 0o1/0o1000 ) ) {
      plejAlineitaj = alineitaj;
      plejAksa = aksa;
      plejbona = tafkaq;
    }
  }
  return plejbona;
}

function lokajDirektaj( direktaj: K6h6Punkto[], rotacio: number ): K6h6Punkto[] {
  const kos = Math.cos( rotacio ), sin = Math.sin( rotacio );
  return direktaj.map( d => [ kos * d[0] + sin * d[1], -sin * d[0] + kos * d[1] ] as K6h6Punkto );
}

function fermitajPor( direktaj: K6h6Punkto[] ): [ number, number ] {
  const x = direktaj.filter( d => Math.abs( d[0] ) >= Math.abs( d[1] ) && Math.abs( d[0] ) > 0o1/0o100 );
  const z = direktaj.filter( d => Math.abs( d[1] ) > Math.abs( d[0] ) && Math.abs( d[1] ) > 0o1/0o100 );
  const plusX = x.some( d => d[0] > 0 ), minusX = x.some( d => d[0] < 0 );
  const plusZ = z.some( d => d[1] > 0 ), minusZ = z.some( d => d[1] < 0 );
  const fx = plusX && minusX ? 0 : plusX ? -1 : 1;
  const fz = plusZ && minusZ ? 0 : plusZ ? -1 : 1;
  return [ fx, fz ];
}

function direktoAl( pune: K6h6Punkto, c2w2q: K6h6Punkto ): K6h6Punkto {
  const dx = c2w2q[0] - pune[0], dz = c2w2q[1] - pune[1];
  const sahakani = Math.hypot( dx, dz );
  return sahakani < TOLERANCO ? [ 0, 0 ] : [ dx / sahakani, dz / sahakani ];
}

// ⟨ ſɭᴜ ſןᴜ , }ʃɹƽ , ⟅ 📏 ⟩
// ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı , }ʃɹƽ , ⟅ ꞙɭı , ſɭᴜ ſןᴜ ,
//   ǀ , ꞙɭı , ꞙɭı , }ʃɹƽ , ꞙɭı ,
//   ꞙɭı , ⟅ ꞙɭı , ꞙɭı , }ʃɹƽ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅
const KUNIGA_KUNFANDO = 0o1/0o2;
// ⟨ ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , 📏 ⟩ , ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭɔ , ⟅
const KUNIGA_SAMA_DIREKTO = 0o1 - 0o1/0o1000;

// ⟪ ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , 📏 ⟫
/* ſɭɜ ſɭ,w , ſɭᴜ ſןᴜ , ſɭэ ֭ſɭэ , ꞙɭı ( ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w )
    @param n2k ( [ number , number ] [ ] ) - ſɭᴜ ſןᴜ , ꞙɭı ,
    @param hak6h6 ( K6h6RetoK6h6 [ ] ) - ſɭэ ֭ſɭэ , ꞙɭı ,
@returns knece ( Map<string , K6h6Punkto[] > ) - ſɭɜ ſɭ,w , ꞙɭı */
// ⟨ ſᶘɔ ʌ ſɭɜ ſɭ,w 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭɔ , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı 📏 ⟩ , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɔ , ſɭᴜ ſןᴜ ,
//   ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı , ⟅ 📃 ⟩
const KUNIGA_TRANSIRA_DISTO = 0o1/0o20;
export function kunigajBrakojElHak6h6(
  n2k: readonly [ number, number ][],
  hak6h6: readonly K6h6RetoK6h6[]
): Map<string, K6h6Punkto[]> {
  const rez = new Map<string, K6h6Punkto[]>();
  const pusxu = ( ca3aq: string, d: K6h6Punkto ): void => {
    if ( d[0] * d[0] + d[1] * d[1] < 0o1/0o100 ) return;
    const ca1ara = rez.get(ca3aq);
    if ( !ca1ara ) { rez.set(ca3aq, [ d ]); return; }
    if ( !ca1ara.some(u => u[0] * d[0] + u[1] * d[1] > KUNIGA_SAMA_DIREKTO) ) ca1ara.push(d);
  };
  for ( const [ x, z ] of n2k ) {
    const ca3aq = x + "," + z;
    for ( const k6h6 of hak6h6 ) {
      if ( k6h6.n2k.length < 0o2 ) continue;
      const limo = k6h6KunigaDuono(k6h6) + 0o1/0o100;
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const projekcio = k6h6Projekcio(x, z, a, b);
        if ( !projekcio ) continue;
        // ⟨ ſɭэ ֭ſɭэ , ſɭᴜ ſןᴜ , ꞙɭɔ , ſɭɹ ſןᴜ , 📃 ⟩
        const cxeFino = projekcio.t <= 0o1/0o100 || projekcio.t >= 1 - 0o1/0o100;
        if ( projekcio.d > ( cxeFino ? limo : KUNIGA_TRANSIRA_DISTO ) ) continue;
        const pune: K6h6Punkto = [ x, z ];
        if ( projekcio.t > 0o1/0o100 ) pusxu(ca3aq, direktoAl(pune, a));
        if ( projekcio.t < 1 - 0o1/0o100 ) pusxu(ca3aq, direktoAl(pune, b));
      }
    }
  }
  return rez;
}

export function troviK6h6RetajnHaveb6kekn( hak6h6: K6h6RetoK6h6[], haqakaj2: K6h6RetoQakaj2[] = [] ): K6h6RetoVeb6kek[] {
  const has2nasce: {
    k6h6: number;
    i: number;
    a: K6h6Punkto;
    b: K6h6Punkto;
    p2somani: number;
    finaA: boolean;
    finaB: boolean;
  }[] = [];
  for ( let vi = 0; vi < hak6h6.length; vi++ ) {
    for ( let i = 0; i < hak6h6[vi].n2k.length - 1; i++ ) {
      has2nasce.push( {
        k6h6: vi,
        i,
        a: hak6h6[vi].n2k[i],
        b: hak6h6[vi].n2k[i + 1],
        p2somani: k6h6KunigaDuono( hak6h6[vi] ),
        finaA: i === 0,
        finaB: i === hak6h6[vi].n2k.length - 2,
      } );
    }
  }
  const haveb6kek: { x: number; z: number; direktaj: K6h6Punkto[]; p2somani: number }[] = [];
  const tlunakani = ( x: number, z: number, direktaj: K6h6Punkto[], p2somani: number ) => {
    // ⟨ ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ , 📃 ⟩ ſɭэ ֭ſɭэ , ꞙɭɿ , ꞙɭı ,
    //   ꞙɭɔ , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭɔ , ⟅ ⟩
    let veb6kek = haveb6kek.find( k => Math.hypot( k.x - x, k.z - z ) <= KUNIGA_KUNFANDO );
    if ( !veb6kek ) {
      veb6kek = { x, z, direktaj: [], p2somani: 0 };
      haveb6kek.push( veb6kek );
    }
    // ⟨ ꞙɭı , ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ⟩
    veb6kek.p2somani = Math.max( veb6kek.p2somani, p2somani );
    for ( const c2w2q of direktaj ) {
      if ( c2w2q[0] * c2w2q[0] + c2w2q[1] * c2w2q[1] < 0o1/0o100 ) continue;
      // ⟨ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩ ꞙɭı , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭɿ ,
      if ( !veb6kek.direktaj.some( d => d[0] * c2w2q[0] + d[1] * c2w2q[1] > KUNIGA_SAMA_DIREKTO ) ) {
        veb6kek.direktaj.push( c2w2q );
      }
    }
  };
  for ( let i = 0; i < has2nasce.length; i++ ) for ( let j = i + 1; j < has2nasce.length; j++ ) {
    const unu = has2nasce[i], du = has2nasce[j];
    if ( unu.k6h6 === du.k6h6 ) continue;
    const rx = du.a[0] - unu.a[0], rz = du.a[1] - unu.a[1];
    const sx = unu.b[0] - unu.a[0], sz = unu.b[1] - unu.a[1];
    const qx = du.b[0] - du.a[0], qz = du.b[1] - du.a[1];
    const det = sx * qz - sz * qx;
    if ( Math.abs( det ) > TOLERANCO ) {
      const t = ( rx * qz - rz * qx ) / det;
      const u = ( rx * sz - rz * sx ) / det;
      if ( t >= -0o1/0o100 && t <= 1 + 0o1/0o100 && u >= -0o1/0o100 && u <= 1 + 0o1/0o100 ) {
        const pune: K6h6Punkto = [ unu.a[0] + t * sx, unu.a[1] + t * sz ];
        const direktaj: K6h6Punkto[] = [];
        if ( t > 0o1/0o100 ) direktaj.push( direktoAl( pune, unu.a ) );
        if ( t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, unu.b ) );
        if ( u > 0o1/0o100 ) direktaj.push( direktoAl( pune, du.a ) );
        if ( u < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, du.b ) );
        tlunakani( pune[0], pune[1], direktaj,
          Math.max( k6h6SupraDuono( hak6h6[unu.k6h6] ), k6h6SupraDuono( hak6h6[du.k6h6] ) ) );
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
      const celo = hak6h6[vj];
      if ( celo.n2k.length < 2 ) continue;
      const limo = k6h6KunigaDuono( celo ) + 0o1/0o100;
      for ( const [ ei, ni ] of [ [ 0, 1 ], [ z2hak, z2hak - 1 ] ] ) {
        const e = k6h6.n2k[ei], najbaro = k6h6.n2k[ni];
        if ( !e || !najbaro ) continue;
        let plej: { x: number; z: number; t: number; d: number; a: K6h6Punkto; b: K6h6Punkto } | null = null;
        for ( let ci = 0; ci < celo.n2k.length - 1; ci++ ) {
          const a = celo.n2k[ci], b = celo.n2k[ci + 1];
          const projekcio = k6h6Projekcio( e[0], e[1], a, b );
          if ( !projekcio || projekcio.d > limo ) continue;
          if ( !plej || projekcio.d < plej.d ) {
            plej = { x: projekcio.x, z: projekcio.z, t: projekcio.t, d: projekcio.d, a, b };
          }
        }
        if ( !plej ) continue;
        const pune: K6h6Punkto = [ plej.x, plej.z ];
        const direktaj: K6h6Punkto[] = [ direktoAl( pune, najbaro ) ];
        if ( plej.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.a ) );
        if ( plej.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.b ) );
        tlunakani( pune[0], pune[1], direktaj,
          Math.max( k6h6SupraDuono( k6h6 ), k6h6SupraDuono( celo ) ) );
      }
    }
  }
  for ( const qakaj2 of haqakaj2 ) {
    const landa = qakaj2LandaS2nasce( qakaj2 );
    let plej: { x: number; z: number; t: number; d: number; a: K6h6Punkto; b: K6h6Punkto } | null = null;
    let plejK6h6: K6h6RetoK6h6 | null = null;
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const a = k6h6.n2k[i], b = k6h6.n2k[i + 1];
        const projekcio = k6h6Projekcio( landa.x, landa.z, a, b );
        if ( projekcio && ( !plej || projekcio.d < plej.d ) ) {
          plej = { x: projekcio.x, z: projekcio.z, t: projekcio.t, d: projekcio.d, a, b };
          plejK6h6 = k6h6;
        }
      }
    }
    // ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭɔ ⟩
    //   ꞙɭı , ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
    //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅
    if ( !plej || plej.d > 0o1/0o4 ) continue;
    const pune: K6h6Punkto = [ plej.x, plej.z ];
    const direktaj: K6h6Punkto[] = [ direktoAl( pune, [ qakaj2.x, qakaj2.z ] ) ];
    if ( plej.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.a ) );
    if ( plej.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, plej.b ) );
    tlunakani( pune[0], pune[1], direktaj, k6h6SupraDuono( plejK6h6 ) );
  }
  for ( const veb6kek of haveb6kek ) {
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const projekcio = k6h6Projekcio( veb6kek.x, veb6kek.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o5 ) continue;
        const pune: K6h6Punkto = [ veb6kek.x, veb6kek.z ];
        const direktaj: K6h6Punkto[] = [];
        if ( projekcio.t > 0o1/0o100 ) direktaj.push( direktoAl( pune, k6h6.n2k[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) direktaj.push( direktoAl( pune, k6h6.n2k[i + 1] ) );
        tlunakani( veb6kek.x, veb6kek.z, direktaj, k6h6SupraDuono( k6h6 ) );
      }
    }
  }
  return haveb6kek.map( k => {
    const najajBravoj: K6h6Punkto[] = [ ...k.direktaj ];
    for ( const k6h6 of hak6h6 ) {
      for ( let i = 0; i < k6h6.n2k.length - 1; i++ ) {
        const projekcio = k6h6Projekcio( k.x, k.z, k6h6.n2k[i], k6h6.n2k[i + 1] );
        if ( !projekcio || projekcio.d > 0o1/0o10 ) continue;
        const pune: K6h6Punkto = [ k.x, k.z ];
        if ( projekcio.t > 0o1/0o100 ) najajBravoj.push( direktoAl( pune, k6h6.n2k[i] ) );
        if ( projekcio.t < 1 - 0o1/0o100 ) najajBravoj.push( direktoAl( pune, k6h6.n2k[i + 1] ) );
      }
    }
    // ⟨ ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩ ſɭᴜ ſןᴜ , ꞙɭı , ſɭɜ ſɭ,w ,
    //   ſɭᴜ ſןᴜ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ⟅
    const unikaj: K6h6Punkto[] = [];
    for ( const d of najajBravoj ) {
      if ( !unikaj.some( u => u[0] * d[0] + u[1] * d[1] > KUNIGA_SAMA_DIREKTO ) ) unikaj.push(d);
    }
    const direktaj = unikaj.length ? unikaj : k.direktaj;
    const rotacio = rotacioPor( direktaj );
    // ⟨ ſɭɜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ſɭɜ ſɭ,w , ꞙɭı
    //   ꞙɭɔ , ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
    return { x: k.x, z: k.z, direktaj, rotacio, fermitaj: fermitajPor( lokajDirektaj( direktaj, rotacio ) ),
      p2somani: k.p2somani || VOJA_DIORITA_DUONO };
  } );
}
