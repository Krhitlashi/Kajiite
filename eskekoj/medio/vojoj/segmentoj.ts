// ≺⧼ ផ្នែកផ្លូវ 🧩 ⧽≻
import { matricoPor, ANGULA_PROVOLIRO, type VojBendo, type VojGeometriajBufroj } from "./bufroj.js";
import { kreiSegmentGeometrion } from "./formoj.js";
import { VOJA_EKSTERA_DUONO, VOJA_TRUA_DUONO } from "./mezuroj.js";
import { vojSuprajxoj } from "./tipoj.js";

// ⟨ ការអត់ធ្មត់កែង 📃 ⟩
export function kreiSegmentajnPartojn(aX: number, aZ: number, bX: number, bZ: number,
  longo: number,
  kunigoj: [ number, number ][]
): [ number, number, boolean ][] {
  const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
  const truoj: [ number, number ][] = [];
  for ( const [ kX, kZ ] of kunigoj ) {
    const rx = kX - aX, rz = kZ - aZ;
    const laux = rx * ndx + rz * ndz;
    if ( laux < -VOJA_TRUA_DUONO || laux > longo + VOJA_TRUA_DUONO ) continue;
    const perpendikulara = Math.abs(rx * ndz - rz * ndx);
    // ⟨ នៅកណ្តាល ត្រង់ខ្សែកណ្តាល 📃 ⟩
    const cxeFino = laux <= VOJA_TRUA_DUONO || laux >= longo - VOJA_TRUA_DUONO;
    const perpendikularaTolero = ( cxeFino ? VOJA_EKSTERA_DUONO : 0o1/0o100 ) + 0o1/0o1000;
    if ( perpendikulara > perpendikularaTolero ) continue;
    truoj.push([ Math.max(0, laux - VOJA_TRUA_DUONO), Math.min(longo, laux + VOJA_TRUA_DUONO) ]);
  }
  truoj.sort(( p, q ) => p[0] - q[0]);
  const partoj: [ number, number, boolean ][] = [];
  let kur = 0;
  for ( const [ t0, t1 ] of truoj ) {
    if ( t1 <= kur ) continue;
    if ( t0 > kur ) partoj.push([ kur, t0, true ]);
    partoj.push([ Math.max(kur, t0), t1, false ]);
    kur = t1;
  }
  if ( kur < longo ) partoj.push([ kur, longo, true ]);
  return partoj;
}

// ⟨ តែជណ្តើរ 📃 ⟩
export function konstruiSegmentonEnBufrojn(x1: number, z1: number, x2: number, z2: number,
  bendoj: VojBendo[],
  dikecoBaza: number,
  heightFn: ( x: number, z: number ) => number,
  bufroj: VojGeometriajBufroj,
  glata = false
): void {
  const difX = x2 - x1, difZ = z2 - z1;
  const longo = Math.hypot(difX, difZ);
  if ( longo < 0o1/0o100 ) return;
  const steps = Math.max(1, Math.round(longo / 4));
  const pasoLongo = longo / steps;
  const ndx = difX / longo, ndz = difZ / longo;
  let eksteraDuon = 0;
  for ( const bendo of bendoj ) {
    const rando = Math.abs(bendo.ofseto) + bendo.largho / 2;
    if ( rando > eksteraDuon ) eksteraDuon = rando;
  }
  const latX = -ndz * eksteraDuon, latZ = ndx * eksteraDuon;
  for ( let s = 0; s < steps; s++ ) {
    const t0 = s / steps, t1 = ( s + 1 ) / steps;
    const sx1 = x1 + difX * t0, sz1 = z1 + difZ * t0;
    const sx2 = x1 + difX * t1, sz2 = z1 + difZ * t1;
    const movX = ( sx1 + sx2 ) / 2, movZ = ( sz1 + sz2 ) / 2;
    // ⟨ ការគំរូគែម 📃 ⟩
    const h0a = heightFn(sx1 - latX, sz1 - latZ);
    const h0b = heightFn(sx1 + latX, sz1 + latZ);
    const h1a = heightFn(sx2 - latX, sz2 - latZ);
    const h1b = heightFn(sx2 + latX, sz2 + latZ);
    const minimum0 = Math.min(h0a, h0b);
    const minimum1 = Math.min(h1a, h1b);
    const maks0 = Math.max(h0a, h0b);
    const maks1 = Math.max(h1a, h1b);
    if ( glata ) {
      // ⟨ ជម្រាលរលូន ( តែដប់ស្ពាន ) 📃 ⟩
      const s0 = maks0 + 0o1/0o100 + dikecoBaza;
      const s1 = maks1 + 0o1/0o100 + dikecoBaza;
      const difo = s1 - s0;
      vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: s0, y1: s1 });
      const klinoL = Math.hypot(pasoLongo, difo);
      const ang = Math.atan2(difo, pasoLongo);
      const dikeco = ( Math.max(s0 - minimum0, s1 - minimum1) + ANGULA_PROVOLIRO ) / Math.cos(ang);
      const y = ( s0 + s1 ) / 2 - dikeco * Math.cos(ang);
      for ( const bendo of bendoj ) {
        const geometrio = kreiSegmentGeometrion(bendo.largho, klinoL, dikeco, bendo.ofseto);
        geometrio.rotateX(ang);
        bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
      }
      continue;
    }
    // ⟨ ជណ្តើរជានិច្ច ជម្រាលមិនដែល 📃 ⟩
    // ⟨ គំរូបន្ថែមនៅកណ្តាល 📃 ⟩
    let maksSupro = Math.max(maks0, maks1);
    let minProfundo = Math.min(minimum0, minimum1);
    for ( const f of [ 0o1/0o4, 0o1/0o2, 0o3/0o4 ] ) {
      const mezaX = sx1 + ( sx2 - sx1 ) * f, mezaZ = sz1 + ( sz2 - sz1 ) * f;
      const hmA = heightFn(mezaX - latX, mezaZ - latZ);
      const hmB = heightFn(mezaX + latX, mezaZ + latZ);
      const hmC = heightFn(mezaX, mezaZ);
      if ( hmA > maksSupro ) maksSupro = hmA;
      if ( hmB > maksSupro ) maksSupro = hmB;
      if ( hmC > maksSupro ) maksSupro = hmC;
      if ( hmA < minProfundo ) minProfundo = hmA;
      if ( hmB < minProfundo ) minProfundo = hmB;
      if ( hmC < minProfundo ) minProfundo = hmC;
    }
    const supro = maksSupro + 0o1/0o100 + dikecoBaza;
    vojSuprajxoj.push({ x1: sx1, z1: sz1, x2: sx2, z2: sz2, duono: eksteraDuon, y0: supro, y1: supro });
    const dikeco = supro - ( minProfundo - ANGULA_PROVOLIRO );
    const y = supro - dikeco;
    for ( const bendo of bendoj ) {
      const geometrio = kreiSegmentGeometrion(bendo.largho, pasoLongo, dikeco, bendo.ofseto);
      bufroj.aldoni(geometrio, bendo.materialo, matricoPor(difX, difZ, movX, y, movZ));
    }
  }
}
