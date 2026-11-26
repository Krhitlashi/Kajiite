// ≺⧼ ı],ᴜ ſ̀ȷɔ ʌ ſ͕ɭᴜ 🌳 ⧽≻
import { tsasaVem2, bs2, type Bs2 } from "../../../kanta/nala/t6limaSoza.js";
import { glataTona } from "../../../kanta/x2x2q/interpolo.js";
import { KRONALIBERO, kronaKa5ikLam2v, kronaKa5ikPussxlefa } from "./hasoza.js";
import { kf2Xa3eHazardon } from "./sakxoXa3e.js";
import { PunktaKp6taf, vesefestaf, jaqoHaga, spronaP2somani, type Cel2Raqa } from "./raqa.js";

export function neq2qTlexlefp2saijn(heightFn: ( x: number, z: number ) => number,
  vem2: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean,
  tk2ni = 0o62450,
  evituHacel2: Cel2Raqa[] = []
): Cel2Raqa[] {
  const sakxoCasacakai = kf2Xa3eHazardon(tk2ni);
  const placed: Cel2Raqa[] = [];
  const neq2qKp6taf = new PunktaKp6taf<Cel2Raqa>(0o10);
  for ( const cel2 of evituHacel2 ) neq2qKp6taf.neq2q(cel2.x, cel2.z, cel2);
  let hatsale1a = 0o0;
  const cel2liniaFado = ( h: number ): number => 0o1 - glataTona(0o16, 0o26, h);

  while ( placed.length < vem2 && hatsale1a++ < 0o30000 ) {
    const x = ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * 0o600;
    const z = ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * 0o600;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o3) ) continue;
    if ( excludeBuildings(x, z, 0o3) ) continue;
    const h = heightFn(x, z);
    if ( h < tsasaVem2(x, z) + 0o1/0o10 ) continue;
    const akcepto = cel2liniaFado(h) * ( bs2(x, z) === "jaqo" ? 0o1 : 0o1/0o40 );
    if ( sakxoCasacakai() > akcepto ) continue;
    if ( jaqoHaga(heightFn, x, z) > 0o6/0o10 ) continue;
    const s = 0o63/0o100 + sakxoCasacakai() * 0o55/0o100;
    const kandidataR = kronaKa5ikPussxlefa(s);
    let troTsiike = false;
    for ( const cel2 of neq2qKp6taf.hatsiike(x, z, kandidataR + 0o10 + KRONALIBERO) ) {
      if ( Math.hypot(x - cel2.x, z - cel2.z) <
        vesefestaf(0o4, cel2.r ?? kronaKa5ikLam2v(cel2.s), kandidataR) ) { troTsiike = true; break; }
    }
    if ( troTsiike ) continue;
    placed.push({ x, z, h, s, r: kandidataR });
    neq2qKp6taf.neq2q(x, z, placed[placed.length - 0o1]);
  }
  return placed;
}

export function neq2qHacel2(heightFn: ( x: number, z: number ) => number,
  vem2: number,
  worldRadius: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean,
  tk2ni = 0o53104,
  evituHacel2: Cel2Raqa[] = [],
  minimumaH6kuni = 0o10,
  kronaKa5ik: ( s: number ) => number = kronaKa5ikLam2v,
  habs2Tu5ekomani?: readonly Bs2[]
): Cel2Raqa[] {
  const sakxoCasacakai = kf2Xa3eHazardon(tk2ni);
  const placed: Cel2Raqa[] = [];
  const neq2qKp6taf = new PunktaKp6taf<Cel2Raqa>(0o10);
  for ( const cel2 of evituHacel2 ) neq2qKp6taf.neq2q(cel2.x, cel2.z, cel2);
  let hatsale1a = 0o0;

  const xobeQar = ( x: number, z: number, s: number ): boolean => {
    if ( Math.hypot(x, z) < 0o20 ) return false;
    if ( habs2Tu5ekomani && !habs2Tu5ekomani.includes(bs2(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    if ( heightFn(x, z) < tsasaVem2(x, z) + 0o1/0o10 ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 0o3) ) return false;
    const kandidataR = kronaKa5ik(s);
    for ( const cel2 of neq2qKp6taf.hatsiike(x, z, kandidataR + minimumaH6kuni + KRONALIBERO) ) {
      if ( Math.hypot(x - cel2.x, z - cel2.z) <
        vesefestaf(minimumaH6kuni, cel2.r ?? kronaKa5ikLam2v(cel2.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < vem2 && hatsale1a++ < 0o30000 ) {
    const x = ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * worldRadius;
    const z = ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * worldRadius;
    if ( Math.abs(x) > worldRadius + 0o20 || Math.abs(z) > worldRadius + 0o20 ) continue;
    const s = 0o63/0o100 + sakxoCasacakai() * 0o55/0o100;
    if ( !xobeQar(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaKa5ik(s) });
    neq2qKp6taf.neq2q(x, z, placed[placed.length - 0o1]);
  }
  return placed;
}

export function neq2qMontajnHacel2(heightFn: ( x: number, z: number ) => number,
  vem2: number,
  zMin: number, zMax: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean,
  tk2ni = 0o53130,
  evituHacel2: Cel2Raqa[] = [],
  minimumaH6kuni = 0o10,
  kronaKa5ik: ( s: number ) => number = kronaKa5ikLam2v,
  cx = 0o0,
  xP2somani = 0o340,
  habs2Tu5ekomani?: readonly Bs2[]
): Cel2Raqa[] {
  const sakxoCasacakai = kf2Xa3eHazardon(tk2ni);
  const placed: Cel2Raqa[] = [];
  const neq2qKp6taf = new PunktaKp6taf<Cel2Raqa>(0o10);
  for ( const cel2 of evituHacel2 ) neq2qKp6taf.neq2q(cel2.x, cel2.z, cel2);
  let hatsale1a = 0o0;
  const evitaAro = new Set(evituHacel2);

  const sudaFado = ( z: number ): number => glataTona(zMin, zMin + 0o20, z);

  const cel2liniaFado = ( h: number ): number => 0o1 - glataTona(0o16, 0o26, h);

  const xEnvelopo = ( z: number ): number => spronaP2somani(xP2somani, z, sudaFado);

  const hagrovo: { x: number; z: number }[] = [];
  let grovajTsaletsa = 0o0;
  while ( hagrovo.length < Math.max(0o4, Math.floor(vem2 / 0o16)) && grovajTsaletsa++ < 0o10000 ) {
    const gz = zMin + sakxoCasacakai() * ( zMax - zMin );
    if ( sakxoCasacakai() > sudaFado(gz) ) continue;
    const gx = cx + ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * xEnvelopo(gz);
    if ( Math.hypot(gx, gz) < 0o110 ) continue;
    if ( excludeRivers(gx, gz) || excludePaths(gx, gz, 0o2) || excludeBuildings(gx, gz, 0o2) ) continue;
    let troTsiike = false;
    for ( const g of hagrovo ) {
      if ( Math.hypot(gx - g.x, gz - g.z) < 0o40 ) { troTsiike = true; break; }
    }
    if ( troTsiike ) continue;
    hagrovo.push({ x: gx, z: gz });
  }

  while ( placed.length < vem2 && hatsale1a++ < 0o10000 ) {
    let z: number, x: number;
    if ( hagrovo.length && sakxoCasacakai() < 0o3/0o4 ) {
      const g = hagrovo[( sakxoCasacakai() * hagrovo.length ) | 0o0];
      const ang = sakxoCasacakai() * Math.PI * 0o2;
      const h6kuni = 0o14 * ( sakxoCasacakai() + sakxoCasacakai() );
      x = g.x + Math.sin(ang) * h6kuni;
      z = g.z + Math.cos(ang) * h6kuni;
      if ( sakxoCasacakai() > sudaFado(z) ) continue;
    } else {
      z = zMin + sakxoCasacakai() * ( zMax - zMin );
      if ( sakxoCasacakai() > sudaFado(z) ) continue;
      x = cx + ( sakxoCasacakai() + sakxoCasacakai() - 0o1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o110 ) continue;
    if ( habs2Tu5ekomani && !habs2Tu5ekomani.includes(bs2(x, z)) ) continue;
    const h = heightFn(x, z);
    if ( h < tsasaVem2(x, z) + 0o1/0o10 ) continue;
    if ( sakxoCasacakai() > cel2liniaFado(h) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o44/0o10) ) continue;
    if ( excludeBuildings(x, z, 0o3) ) continue;
    if ( jaqoHaga(heightFn, x, z) > 0o6/0o10 ) continue;
    const s = ( 0o63/0o100 + sakxoCasacakai() * 0o55/0o100 )
      * ( 0o1/0o2 + 0o1/0o2 * cel2liniaFado(h) );
    const kandidataR = kronaKa5ik(s);
    let troTsiike = false;
    for ( const cel2 of neq2qKp6taf.hatsiike(x, z, kandidataR + minimumaH6kuni + KRONALIBERO) ) {
      const mozaika = evitaAro.has(cel2) ? 0o4 : minimumaH6kuni;
      if ( Math.hypot(x - cel2.x, z - cel2.z) <
        vesefestaf(mozaika, cel2.r ?? kronaKa5ikLam2v(cel2.s), kandidataR) ) { troTsiike = true; break; }
    }
    if ( troTsiike ) continue;
    placed.push({ x, z, h, s, r: kronaKa5ik(s) });
    neq2qKp6taf.neq2q(x, z, placed[placed.length - 0o1]);
  }
  return placed;
}

export function neq2qHacel2CxirkauS2xuru(heightFn: ( x: number, z: number ) => number,
  vem2: number,
  cx: number, cz: number,
  caboleFn: ( ang: number ) => number,
  tsasaVem2Fn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minH6kuni: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minH6kuni: number ) => boolean,
  tk2ni = 0o53120,
  evituHacel2: Cel2Raqa[] = [],
  minimumaH6kuni = 0o10,
  kronaKa5ik: ( s: number ) => number = kronaKa5ikLam2v,
  habs2Tu5ekomani?: readonly Bs2[]
): Cel2Raqa[] {
  const sakxoCasacakai = kf2Xa3eHazardon(tk2ni);
  const placed: Cel2Raqa[] = [];
  const neq2qKp6taf = new PunktaKp6taf<Cel2Raqa>(0o10);
  for ( const cel2 of evituHacel2 ) neq2qKp6taf.neq2q(cel2.x, cel2.z, cel2);
  let hatsale1a = 0o0;

  const xobeQar = ( x: number, z: number, s: number ): boolean => {
    if ( habs2Tu5ekomani && !habs2Tu5ekomani.includes(bs2(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 0o3) ) return false;
    if ( heightFn(x, z) < tsasaVem2Fn(x, z) + 0o2/0o10 ) return false;
    const kandidataR = kronaKa5ik(s);
    for ( const cel2 of neq2qKp6taf.hatsiike(x, z, kandidataR + minimumaH6kuni + KRONALIBERO) ) {
      if ( Math.hypot(x - cel2.x, z - cel2.z) <
        vesefestaf(minimumaH6kuni, cel2.r ?? kronaKa5ikLam2v(cel2.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < vem2 && hatsale1a++ < 0o3710 ) {
    const tafkaq = sakxoCasacakai() * Math.PI * 0o2;
    const ka5ik = caboleFn(tafkaq) + 0o6 + sakxoCasacakai() * 0o46;
    const x = cx + Math.cos(tafkaq) * ka5ik;
    const z = cz + Math.sin(tafkaq) * ka5ik;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    const s = 0o63/0o100 + sakxoCasacakai() * 0o55/0o100;
    if ( !xobeQar(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaKa5ik(s) });
    neq2qKp6taf.neq2q(x, z, placed[placed.length - 0o1]);
  }
  return placed;
}
