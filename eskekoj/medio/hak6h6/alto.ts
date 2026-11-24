// ≺⧼ ſɭэ ֭ſɭэ j͑ʃᴜꞇ ʌ j͐ʃэ ɭ(ᴜ 📏 ⧽≻
// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ }ʃɹƽ ,
//   j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , ꞙɭɔ , ⟅ ꞙɭı ,
//   ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
import { surGrid, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TERA_KLINO, VOJA_TRUA_DUONO } from "./havecax2l.js";
import { kf2PlataVem2n, kunigajBrakAltoj, plataAltoCxe, k6h6SuproDeVeb6kek,
  type PlataVem2 } from "./haqoxa.js";

export { VOJA_TERA_KLINO };

// ⟪ ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
export interface AltaVeb6kek {
  x: number;
  z: number;
  direktaj: readonly [ number, number ][];
  // ⟨ ꞙɭı , ꞙɭı , ſɭэ ֭ſɭэ , ⟅ ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  p2somani?: number;
}

// ⟪ ſɭɜ ſɭ,w , 📏 ⟫
// ⟨ VOJA_TERA_KLINO , havecax2l.js , ⟅ ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ſןɔ˞ᴜƴ 🦶 ⟩ , ſɭэ ֭ſɭэ , ꞙɭɔ.ꞟ , ꞙɭɔ.ꞟ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭɔ.ꞟ ,
//   ꞙɭɩ , ꞙɭıɿ , ꞙɭɔ ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , 📃 ⟩ , ꞙɭэ , ⟅ ꞙɭı , ꞙɭı ,
//   ꞙɭэ , ꞙɭɿ , ⟅ ꞙɭц.э , ꞙɭɿ.цꞟ , ꞙɭɿ ,
//   ꞙɭı , ꞙɭɔ , ⟅ 📃 ⟩
export const VOJA_TERA_RADII = [ 0o1/0o2, 0o1, 0o2 ];
export const VOJA_TERA_ANGULOJ = 0o20;
export const VOJA_ALTECA_KVANTO = 0o4;

// ⟪ j͑ʃᴜ ſɭ,w , ꞙɭı 📏 ⟫
/* ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı ,
    @param alteco ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param akvaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , -Infinity ,
@returns bazaK6h6Alteco ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w , ſɭэ ֭ſɭэ , */
// ⟨ ſᶘᴜ j͑ʃᴜ , ſɭэ ſɭ,w 📃 ⟩ , ſɭэ ֭ſɭэ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
//   ꞙɭı , ſᶘᴜ j͑ʃᴜ , ſɭᴜ ſןᴜ , ſןɔ˞ᴜƴ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
// ⟨ ꞙɭı , ⟅ 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const TERA_OFSETAJ: readonly ( readonly [ number, number, number ] )[] = ( () => {
  const ca1ara: [ number, number, number ][] = [];
  for ( const r of VOJA_TERA_RADII )
    for ( let i = 0; i < VOJA_TERA_ANGULOJ; i++ ) {
      const tafkaq = i * Math.PI * 0o2 / VOJA_TERA_ANGULOJ;
      ca1ara.push([ Math.cos(tafkaq) * r, Math.sin(tafkaq) * r, VOJA_TERA_KLINO * r ]);
    }
  return ca1ara;
} )();

export function kf2BazanK6h6Alton(
  alteco: ( x: number, z: number ) => number,
  akvaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const supero = akvaFn
    ? ( x: number, z: number ): number => Math.max(alteco(x, z), akvaFn(x, z))
    : alteco;
  // ⟨ ɭl̀ɜ ſ͕ɭᴜ , ꞙɭı , ꞙɭı , 📏 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭı , `px + "," + pz`
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
  //   VOJA_ALTECA_KVANTO , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const memoro = new Map<number, Map<number, number>>();
  return ( x: number, z: number ): number => {
    const ix = Math.round(x * VOJA_ALTECA_KVANTO);
    const iz = Math.round(z * VOJA_ALTECA_KVANTO);
    let x2pa = memoro.get(ix);
    if ( x2pa === undefined ) { x2pa = new Map(); memoro.set(ix, x2pa); }
    let milda = x2pa.get(iz);
    if ( milda === undefined ) {
      const px = ix / VOJA_ALTECA_KVANTO, pz = iz / VOJA_ALTECA_KVANTO;
      milda = supero(px, pz);
      for ( const [ ofsX, ofsZ, falo ] of TERA_OFSETAJ )
        milda = Math.max(milda, supero(px + ofsX, pz + ofsZ) - falo);
      x2pa.set(iz, milda);
    }
    return Math.max(supero(x, z), milda);
  };
}

// ⟪ ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
// ⟨ ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
//   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
export const VOJA_KUNIGA_CELO = 0o20;
// ⟨ ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const KUNIGA_CXELOJ = 0o2;
export const VOJA_KUNIGA_RADIUSO = Math.hypot(VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO);

// ⟪ ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ 📏 ⟫
/* j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭэ ֭ſɭэ , ſɭɜ ſɭ,w , ꞙɭı ,
    @param alteco ( function ) - ſɭɜ ſɭ,w , j͑ʃᴜ ſɭ,w ,
    @param haveb6kek ( AltaVeb6kek [ ] ) - ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭı ,
    @param akvaFn ( function , optional ) - ſᶘᴜ j͑ʃᴜ , j͑ʃᴜ ſɭ,w , -Infinity ,
@returns k6h6Alteco ( function ) - ſɭэ ֭ſɭэ , j͑ʃᴜ ſɭ,w */
export function kf2K6h6Alton(
  alteco: ( x: number, z: number ) => number,
  haveb6kek: readonly AltaVeb6kek[],
  akvaFn?: ( x: number, z: number ) => number
): ( x: number, z: number ) => number {
  const bazaK6h6Alteco = kf2BazanK6h6Alton(alteco, akvaFn);
  const unikaj = new Map<string, AltaVeb6kek>();
  for ( const k of haveb6kek ) {
    if ( !Number.isFinite(k.x) || !Number.isFinite(k.z) ) continue;
    unikaj.set(k.x + "," + k.z, k);
  }
  const ankroj = [ ...unikaj.values() ];
  // ⟪ j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı 📏 ⟫
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , 📃 ⟩ , ſɭɜ ſɭ,w , ꞙɭı , ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ⟅ ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , 📃 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const brakAltoj: number[][] = ankroj.map(veb6kek =>
    kunigajBrakAltoj(veb6kek.x, veb6kek.z, veb6kek.direktaj,
      veb6kek.direktaj.map(() => veb6kek.p2somani ?? VOJA_DIORITA_DUONO), bazaK6h6Alteco));
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɔ , 📃 ⟩ , ꞙɭı , ꞙɭɔ , ꞙɭı ,
  const hapa12 = ankroj.map((veb6kek, i) => {
    const validaj = brakAltoj[ i ].filter(Number.isFinite);
    if ( validaj.length ) return Math.max(...validaj);
    return surGrid(k6h6SuproDeVeb6kek(veb6kek.x, veb6kek.z, veb6kek.direktaj,
      VOJA_EKSTERA_DUONO, bazaK6h6Alteco).hateru - VOJA_SUPRO_LEVIGXO);
  });
  // ⟪ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı 📏 ⟫
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭı , ꞙɭı , 📃 ⟩ , ꞙɭı , ꞙɭı , D ,
  //   ꞙɭı , VOJA_TERA_KLINO * ( D - ꞙɭɿ * VOJA_TRUA_DUONO ) ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ⟅ ꞙɭı ,
  // ⟨ ꞙɭı , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const KUNIGA_ALTECA_PASOJ = 0o4;
  const BRAKA_TOLERO = Math.cos(Math.PI / 0o10);
  // ⟨ ꞙɭı , ꞙɭı , }ʃɹƽ 📏 ⟩ , ꞙɭı , -ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩
  const brakaIndekso = ( k: AltaVeb6kek, tx: number, tz: number ): number => {
    let plej = -1, plejGajno = BRAKA_TOLERO;
    for ( let b = 0; b < k.direktaj.length; b++ ) {
      const [ dx, dz ] = k.direktaj[ b ];
      const sahakani = Math.hypot(dx, dz);
      if ( sahakani < 0o1/0o1000 ) continue;
      const gajno = ( dx * tx + dz * tz ) / sahakani;
      if ( gajno > plejGajno ) { plejGajno = gajno; plej = b; }
    }
    return plej;
  };
  const legi = ( i: number, b: number ): number =>
    b >= 0 && Number.isFinite(brakAltoj[ i ][ b ]) ? brakAltoj[ i ][ b ] : hapa12[ i ];
  const skribu = ( i: number, b: number, l6da: number ): void => {
    if ( b >= 0 && Number.isFinite(brakAltoj[ i ][ b ]) ) brakAltoj[ i ][ b ] = l6da;
    else hapa12[ i ] = Math.max(hapa12[ i ], l6da);
  };
  for ( let vepat6ni = 0; vepat6ni < KUNIGA_ALTECA_PASOJ; vepat6ni++ ) {
    let sxangxo = false;
    for ( let i = 0; i < ankroj.length; i++ ) {
      for ( let j = i + 1; j < ankroj.length; j++ ) {
        const dx = ankroj[ j ].x - ankroj[ i ].x, dz = ankroj[ j ].z - ankroj[ i ].z;
        const h6kuni = Math.hypot(dx, dz);
        if ( h6kuni < 0o1/0o100 ) continue;
        const ux = dx / h6kuni, uz = dz / h6kuni;
        // ⟨ ꞙɭı , ſɭэ ֭ſɭэ , 📃 ⟩ , ſɭᴜ ſןᴜ , ꞙɭɿ , ꞙɭɔ ,
        //   ꞙɭı , ⟅ ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
        //   ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
        const bi = brakaIndekso(ankroj[ i ], ux, uz);
        const bj = brakaIndekso(ankroj[ j ], -ux, -uz);
        if ( bi < 0 || bj < 0 ) continue;
        const limo = VOJA_TERA_KLINO * ( h6kuni - 0o2 * VOJA_TRUA_DUONO );
        if ( limo <= 0 ) continue;
        const altI = legi(i, bi), altJ = legi(j, bj);
        if ( altJ - altI > limo ) {
          skribu(i, bi, surGrid(altJ - limo));
          sxangxo = true;
        } else if ( altI - altJ > limo ) {
          skribu(j, bj, surGrid(altI - limo));
          sxangxo = true;
        }
      }
    }
    if ( !sxangxo ) break;
  }
  // ⟪ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟫
  // ⟨ ꞙɭı , ꞙɭı , 📃 ⟩ , j͑ʃᴜ ſɭ,w , ꞙɭı , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭɔ , ſɭᴜ ſןᴜ , ⟅ 📃 ⟩
  const havem2: PlataVem2[] = ankroj.map((veb6kek, i) =>
    kf2PlataVem2n(veb6kek.direktaj,
      veb6kek.direktaj.map(() => veb6kek.p2somani ?? VOJA_DIORITA_DUONO),
      brakAltoj[ i ], hapa12[ i ]));
  // ⟨ ꞙɭı , ꞙɭɔ , ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭɔ , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſןᴜ , }ʃɹƽ , ꞙɭɔ , ⟅ ꞙɭı ,
  // ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭɔ ,
  //   ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const hatsiq: { x: number; z: number; vem2: PlataVem2; maksAlto: number }[][] = [];
  let kradoMinX = 0, kradoMinZ = 0, kradoSefini = 0, kradoAlto = 0;
  if ( ankroj.length ) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for ( const veb6kek of ankroj ) {
      const cx = Math.floor(veb6kek.x / VOJA_KUNIGA_CELO);
      const cz = Math.floor(veb6kek.z / VOJA_KUNIGA_CELO);
      if ( cx < minX ) minX = cx;
      if ( cx > maxX ) maxX = cx;
      if ( cz < minZ ) minZ = cz;
      if ( cz > maxZ ) maxZ = cz;
    }
    kradoMinX = minX; kradoMinZ = minZ;
    kradoSefini = maxX - minX + 1; kradoAlto = maxZ - minZ + 1;
    hatsiq.length = kradoSefini * kradoAlto;
    for ( let i = 0; i < ankroj.length; i++ ) {
      const veb6kek = ankroj[ i ];
      const gx = Math.floor(veb6kek.x / VOJA_KUNIGA_CELO) - kradoMinX;
      const gz = Math.floor(veb6kek.z / VOJA_KUNIGA_CELO) - kradoMinZ;
      const indico = gx + gz * kradoSefini;
      const vem2 = havem2[ i ];
      let maksAlto = vem2.l6da;
      for ( const l6da of vem2.hal6da ) if ( l6da > maksAlto ) maksAlto = l6da;
      ( hatsiq[ indico ] ??= [] ).push({ x: veb6kek.x, z: veb6kek.z, vem2, maksAlto });
    }
  }
  // ⟨ ſᶘᴜ j͑ʃᴜ , 📃 ⟩ , ſᶘᴜ j͑ʃᴜ , ſɭэ ֭ſɭэ , ꞙɭɔ , ꞙɭı , ꞙɭı ,
  //   ſɭэ ſɭ,w , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ⟅ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const tsekeAkva = akvaFn
    ? ( x: number, z: number ): boolean => akvaFn( x, z ) > -Infinity
    : () => false;
  return ( x, z ) => {
    let l6da = bazaK6h6Alteco(x, z);
    // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı ,
    //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
    const surAkvo = tsekeAkva(x, z);
    const cx = Math.floor(x / VOJA_KUNIGA_CELO) - kradoMinX;
    const cz = Math.floor(z / VOJA_KUNIGA_CELO) - kradoMinZ;
    for ( let dx = -KUNIGA_CXELOJ; dx <= KUNIGA_CXELOJ; dx++ ) {
      const gx = cx + dx;
      if ( gx < 0 || gx >= kradoSefini ) continue;
      for ( let dz = -KUNIGA_CXELOJ; dz <= KUNIGA_CXELOJ; dz++ ) {
        const gz = cz + dz;
        if ( gz < 0 || gz >= kradoAlto ) continue;
        const ca1ara = hatsiq[ gx + gz * kradoSefini ];
        if ( ca1ara === undefined ) continue;
        for ( const tsiq of ca1ara ) {
          const h6kuni = Math.hypot(x - tsiq.x, z - tsiq.z);
          // ⟨ ꞙɭı , 📏 ⟩ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ⟅ 📃 ⟩
          if ( h6kuni > VOJA_KUNIGA_RADIUSO + 0o2 * ( tsiq.maksAlto - l6da ) ) continue;
          // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          const tsiqAlto = plataAltoCxe(tsiq.vem2,
            Math.atan2(z - tsiq.z, x - tsiq.x), h6kuni);
          // ⟨ ſɭᴜc̗ ɭʃɜ }ʃᴜȝ , ꞙɭı , ꞙɭı , ꞙɭı ,
          //   ꞙɭı , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ꞙɭı ,
          //   ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ꞙɭı , ꞙɭı ,
          // ⟨ ꞙɭı , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          if ( h6kuni > VOJA_KUNIGA_RADIUSO + 0o2 * ( tsiqAlto - l6da ) ) continue;
          // ⟨ ſᶘᴜ j͑ʃᴜ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
          if ( surAkvo ) continue;
          l6da = Math.max(l6da, tsiqAlto - VOJA_SUPRO_LEVIGXO - VOJA_TERA_KLINO
            * Math.max(0, h6kuni - VOJA_KUNIGA_RADIUSO));
        }
      }
    }
    return l6da;
  };
}
