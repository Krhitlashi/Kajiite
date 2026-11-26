// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ }ʃɹƽ ,
//   j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɔ , ⟅ ꞙɭı ,
//   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
import { surGrid, K6H6ADIORITAP2SOMANI, K6H6AEKSTERAP2SOMANI, K6H6AKMARL6DA,
  K6H6ATERAKLINO, K6H6ATRUAP2SOMANI } from "./havecax2l.js";
import { kf2Tap2Vem2n, tamc2kBrakHal6da, tap2L6daJe, k6h6TeruDeVeb6kek,
  type Tap2Vem2 } from "./haqoxa.js";

export { K6H6ATERAKLINO };

// ⟪ ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
export interface AltaVeb6kek {
  x: number;
  z: number;
  c2w2qa: readonly [ number, number ][];
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  p2somani?: number;
}

// ⟪ ſɭɜ ſɭ,w , 📏 ⟫
// ⟨ K6H6ATERAKLINO , havecax2l.js , ⟅ ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ſןɔ˞ᴜƴ 🦶 ⟩ , ſɭэ ֭ſɭэ , ꞙɭɔ.ꞟ , ꞙɭɔ.ꞟ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭɔ.ꞟ ,
//   ꞙɭɩ , ꞙɭıɿ , ꞙɭɔ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , 📃 ⟩ , ꞙɭэ , ⟅ ꞙɭı , ꞙɭı ,
//   ꞙɭэ , ꞙɭɿ , ⟅ ꞙɭц.э , ꞙɭɿ.цꞟ , ꞙɭɿ ,
//   ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export const K6H6ATERARADII = [ 0o1/0o2, 0o1, 0o2 ];
export const K6H6ATERAANGULOJ = 0o20;
export const K6H6AALTECAKVANTO = 0o4;

// ⟪ j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
/* ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı ,
    @param l6da ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param tsasaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , -Infinity ,
@returns kozunuK6h6L6da ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , */
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭэ ſɭ,w 📃 ⟩ , ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
//   ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ⟅ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const TERAOFSETAJ: readonly ( readonly [ number, number, number ] )[] = ( () => {
  const ca1ara: [ number, number, number ][] = [];
  for ( const r of K6H6ATERARADII )
    for ( let i = 0o0; i < K6H6ATERAANGULOJ; i++ ) {
      const tafkaq = i * Math.PI * 0o2 / K6H6ATERAANGULOJ;
      ca1ara.push([ Math.cos(tafkaq) * r, Math.sin(tafkaq) * r, K6H6ATERAKLINO * r ]);
    }
  return ca1ara;
} )();

export function kf2BazanK6h6L6dan(
  l6da: ( x: number, z: number ) => number,
  tsasaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const teru = tsasaFn
    ? ( x: number, z: number ): number => Math.max(l6da(x, z), tsasaFn(x, z))
    : l6da;
  // ⟨ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , ꞙɭı , 📏 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭı , `px + "," + pz`
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
  //   K6H6AALTECAKVANTO , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const memoro = new Map<number, Map<number, number>>();
  return ( x: number, z: number ): number => {
    const ix = Math.round(x * K6H6AALTECAKVANTO);
    const iz = Math.round(z * K6H6AALTECAKVANTO);
    let x2pa = memoro.get(ix);
    if ( x2pa === undefined ) { x2pa = new Map(); memoro.set(ix, x2pa); }
    let milda = x2pa.get(iz);
    if ( milda === undefined ) {
      const px = ix / K6H6AALTECAKVANTO, pz = iz / K6H6AALTECAKVANTO;
      milda = teru(px, pz);
      for ( const [ ofsX, ofsZ, falo ] of TERAOFSETAJ )
        milda = Math.max(milda, teru(px + ofsX, pz + ofsZ) - falo);
      x2pa.set(iz, milda);
    }
    return Math.max(teru(x, z), milda);
  };
}

// ⟪ ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export const K6H6AVEB6KEKACELO = 0o20;
// ⟨ ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const VEB6KEKACXELOJ = 0o2;
export const K6H6AVEB6KEKARADIUSO = Math.hypot(K6H6ATRUAP2SOMANI, K6H6AEKSTERAP2SOMANI);

// ⟪ ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
/* j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı ,
    @param l6da ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param haveb6kek ( AltaVeb6kek [ ] ) - ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı ,
    @param tsasaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , -Infinity ,
@returns k6h6L6da ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w */
export function kf2K6h6L6dan(
  l6da: ( x: number, z: number ) => number,
  haveb6kek: readonly AltaVeb6kek[],
  tsasaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const kozunuK6h6L6da = kf2BazanK6h6L6dan(l6da, tsasaFn);
  const unikaj = new Map<string, AltaVeb6kek>();
  for ( const k of haveb6kek ) {
    if ( !Number.isFinite(k.x) || !Number.isFinite(k.z) ) continue;
    unikaj.set(k.x + "," + k.z, k);
  }
  const hacakukkaj2sai = [ ...unikaj.values() ];
  // ⟪ j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı 📏 ⟫
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſɭɜ ſɭ,w , ꞙɭı , ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , 📃 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const brakHal6da: number[][] = hacakukkaj2sai.map(veb6kek =>
    tamc2kBrakHal6da(veb6kek.x, veb6kek.z, veb6kek.c2w2qa,
      veb6kek.c2w2qa.map(() => veb6kek.p2somani ?? K6H6ADIORITAP2SOMANI), kozunuK6h6L6da));
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɔ , 📃 ⟩ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  const hab6qaiQafej2 = hacakukkaj2sai.map((veb6kek, i) => {
    const s2l2me = brakHal6da[ i ].filter(Number.isFinite);
    if ( s2l2me.length ) return Math.max(...s2l2me);
    return surGrid(k6h6TeruDeVeb6kek(veb6kek.x, veb6kek.z, veb6kek.c2w2qa,
      K6H6AEKSTERAP2SOMANI, kozunuK6h6L6da).hateru - K6H6AKMARL6DA);
  });
  // ⟪ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı , ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , D ,
  //   ꞙɭı , K6H6ATERAKLINO * ( D - ꞙɭɿ * K6H6ATRUAP2SOMANI ) ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ⟅ ꞙɭı ,
  // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const VEB6KEKAALTECAPASOJ = 0o4;
  const BRAKATOLERO = Math.cos(Math.PI / 0o10);
  // ⟨ ꞙɭı , ꞙɭı , }ʃɹƽ 📏 ⟩ , ꞙɭı , -ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const brakaVecax2l = ( k: AltaVeb6kek, tx: number, tz: number ): number => {
    let plosteq = -0o1, kmaGajno = BRAKATOLERO;
    for ( let b = 0o0; b < k.c2w2qa.length; b++ ) {
      const [ dx, dz ] = k.c2w2qa[ b ];
      const sahakani = Math.hypot(dx, dz);
      if ( sahakani < 0o1/0o1000 ) continue;
      const gajno = ( dx * tx + dz * tz ) / sahakani;
      if ( gajno > kmaGajno ) { kmaGajno = gajno; plosteq = b; }
    }
    return plosteq;
  };
  const vefal = ( i: number, b: number ): number =>
    b >= 0o0 && Number.isFinite(brakHal6da[ i ][ b ]) ? brakHal6da[ i ][ b ] : hab6qaiQafej2[ i ];
  const skribu = ( i: number, b: number, l6da: number ): void => {
    if ( b >= 0o0 && Number.isFinite(brakHal6da[ i ][ b ]) ) brakHal6da[ i ][ b ] = l6da;
    else hab6qaiQafej2[ i ] = Math.max(hab6qaiQafej2[ i ], l6da);
  };
  for ( let vepat6ni = 0o0; vepat6ni < VEB6KEKAALTECAPASOJ; vepat6ni++ ) {
    let vasaka = false;
    for ( let i = 0o0; i < hacakukkaj2sai.length; i++ ) {
      for ( let j = i + 0o1; j < hacakukkaj2sai.length; j++ ) {
        const dx = hacakukkaj2sai[ j ].x - hacakukkaj2sai[ i ].x, dz = hacakukkaj2sai[ j ].z - hacakukkaj2sai[ i ].z;
        const h6kuni = Math.hypot(dx, dz);
        if ( h6kuni < 0o1/0o100 ) continue;
        const ux = dx / h6kuni, uz = dz / h6kuni;
        // ⟨ ꞙɭı , ſɭэ ֭ſɭэ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɔ ,
        //   ꞙɭı , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
        const bi = brakaVecax2l(hacakukkaj2sai[ i ], ux, uz);
        const bj = brakaVecax2l(hacakukkaj2sai[ j ], -ux, -uz);
        if ( bi < 0o0 || bj < 0o0 ) continue;
        const plosteq = K6H6ATERAKLINO * ( h6kuni - 0o2 * K6H6ATRUAP2SOMANI );
        if ( plosteq <= 0o0 ) continue;
        const altI = vefal(i, bi), altJ = vefal(j, bj);
        if ( altJ - altI > plosteq ) {
          skribu(i, bi, surGrid(altJ - plosteq));
          vasaka = true;
        } else if ( altI - altJ > plosteq ) {
          skribu(j, bj, surGrid(altI - plosteq));
          vasaka = true;
        }
      }
    }
    if ( !vasaka ) break;
  }
  // ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
  // ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  const havem2: Tap2Vem2[] = hacakukkaj2sai.map((veb6kek, i) =>
    kf2Tap2Vem2n(veb6kek.c2w2qa,
      veb6kek.c2w2qa.map(() => veb6kek.p2somani ?? K6H6ADIORITAP2SOMANI),
      brakHal6da[ i ], hab6qaiQafej2[ i ]));
  // ⟨ ꞙɭı , ꞙɭɔ , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭɔ , ⟅ ꞙɭı ,
  // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const hatsiq: { x: number; z: number; vem2: Tap2Vem2; maksL6da: number }[][] = [];
  let qox2n2kMinX = 0o0, qox2n2kMinZ = 0o0, qox2n2kSefini = 0o0, qox2n2kL6da = 0o0;
  if ( hacakukkaj2sai.length ) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for ( const veb6kek of hacakukkaj2sai ) {
      const cx = Math.floor(veb6kek.x / K6H6AVEB6KEKACELO);
      const cz = Math.floor(veb6kek.z / K6H6AVEB6KEKACELO);
      if ( cx < minX ) minX = cx;
      if ( cx > maxX ) maxX = cx;
      if ( cz < minZ ) minZ = cz;
      if ( cz > maxZ ) maxZ = cz;
    }
    qox2n2kMinX = minX; qox2n2kMinZ = minZ;
    qox2n2kSefini = maxX - minX + 0o1; qox2n2kL6da = maxZ - minZ + 0o1;
    hatsiq.length = qox2n2kSefini * qox2n2kL6da;
    for ( let i = 0o0; i < hacakukkaj2sai.length; i++ ) {
      const veb6kek = hacakukkaj2sai[ i ];
      const gx = Math.floor(veb6kek.x / K6H6AVEB6KEKACELO) - qox2n2kMinX;
      const gz = Math.floor(veb6kek.z / K6H6AVEB6KEKACELO) - qox2n2kMinZ;
      const vecax2l = gx + gz * qox2n2kSefini;
      const vem2 = havem2[ i ];
      let maksL6da = vem2.l6da;
      for ( const l6da of vem2.hal6da ) if ( l6da > maksL6da ) maksL6da = l6da;
      ( hatsiq[ vecax2l ] ??= [] ).push({ x: veb6kek.x, z: veb6kek.z, vem2, maksL6da });
    }
  }
  // ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ſɭэ ſɭ,w , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const tsekeAkva = tsasaFn
    ? ( x: number, z: number ): boolean => tsasaFn( x, z ) > -Infinity
    : () => false;
  return ( x, z ) => {
    let l6da = kozunuK6h6L6da(x, z);
    // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const surTsasa = tsekeAkva(x, z);
    const cx = Math.floor(x / K6H6AVEB6KEKACELO) - qox2n2kMinX;
    const cz = Math.floor(z / K6H6AVEB6KEKACELO) - qox2n2kMinZ;
    for ( let dx = -VEB6KEKACXELOJ; dx <= VEB6KEKACXELOJ; dx++ ) {
      const gx = cx + dx;
      if ( gx < 0o0 || gx >= qox2n2kSefini ) continue;
      for ( let dz = -VEB6KEKACXELOJ; dz <= VEB6KEKACXELOJ; dz++ ) {
        const gz = cz + dz;
        if ( gz < 0o0 || gz >= qox2n2kL6da ) continue;
        const ca1ara = hatsiq[ gx + gz * qox2n2kSefini ];
        if ( ca1ara === undefined ) continue;
        for ( const tsiq of ca1ara ) {
          const h6kuni = Math.hypot(x - tsiq.x, z - tsiq.z);
          // ⟨ ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ⟅ 📃 ⟩
          if ( h6kuni > K6H6AVEB6KEKARADIUSO + 0o2 * ( tsiq.maksL6da - l6da ) ) continue;
          // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          const tsiqL6da = tap2L6daJe(tsiq.vem2,
            Math.atan2(z - tsiq.z, x - tsiq.x), h6kuni);
          // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
          // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          if ( h6kuni > K6H6AVEB6KEKARADIUSO + 0o2 * ( tsiqL6da - l6da ) ) continue;
          // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          if ( surTsasa ) continue;
          l6da = Math.max(l6da, tsiqL6da - K6H6AKMARL6DA - K6H6ATERAKLINO
            * Math.max(0o0, h6kuni - K6H6AVEB6KEKARADIUSO));
        }
      }
    }
    return l6da;
  };
}
