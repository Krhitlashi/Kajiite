// ≺⧼ ការដាក់រុក្ខជាតិ 🌳 ⧽≻
import { glataPaso, akvaNivelo, biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { KRONA_LIBERO, kronaRadiusoBetula, kronaRadiusoPussxlefa } from "./kronoj.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";
import { PunktaHasho, interspaco, montaKruteco, spronaDuono, type ArboMetado } from "./metado.js";

export function metiPussxlefojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o62450,
  evituArbojn: ArboMetado[] = []
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const placed: ArboMetado[] = [];
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;
  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o16, 0o26, h);

  while ( placed.length < kvanto && provoj++ < 0o30000 ) {
    const x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * 0o600;
    const z = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * 0o600;
    if ( Math.hypot(x, z) < 0o20 ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o3) ) continue;
    if ( excludeBuildings(x, z, 0o3) ) continue;
    const h = heightFn(x, z);
    if ( h < akvaNivelo(x, z) + 0o1/0o10 ) continue;
    const akcepto = arboliniaFado(h) * ( biomo(x, z) === "montaro" ? 1 : 0o1/0o40 );
    if ( hazardaGenerilo() > akcepto ) continue;
    if ( montaKruteco(heightFn, x, z) > 0o6/0o10 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    const kandidataR = kronaRadiusoPussxlefa(s);
    let troProksima = false;
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + 0o10 + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(0o4, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kandidataR });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

export function metiArbojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  worldRadius: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53104,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const placed: ArboMetado[] = [];
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;

  const bonaLoko = ( x: number, z: number, s: number ): boolean => {
    if ( Math.hypot(x, z) < 0o20 ) return false;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    if ( heightFn(x, z) < akvaNivelo(x, z) + 0o1/0o10 ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 3) ) return false;
    const kandidataR = kronaRadiuso(s);
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(minimumaDistanco, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o30000 ) {
    const x = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * worldRadius;
    const z = ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * worldRadius;
    if ( Math.abs(x) > worldRadius + 0o20 || Math.abs(z) > worldRadius + 0o20 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if ( !bonaLoko(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

export function metiMontajnArbojn(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  zMin: number, zMax: number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53130,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  cx = 0,
  xDuono = 0o340,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const placed: ArboMetado[] = [];
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;
  const evitaAro = new Set(evituArbojn);

  const sudaFado = ( z: number ): number => glataPaso(zMin, zMin + 0o20, z);

  const arboliniaFado = ( h: number ): number => 1 - glataPaso(0o16, 0o26, h);

  const xEnvelopo = ( z: number ): number => spronaDuono(xDuono, z, sudaFado);

  const grovoj: { x: number; z: number }[] = [];
  let grovajProvoj = 0;
  while ( grovoj.length < Math.max(0o4, Math.floor(kvanto / 0o16)) && grovajProvoj++ < 0o10000 ) {
    const gz = zMin + hazardaGenerilo() * ( zMax - zMin );
    if ( hazardaGenerilo() > sudaFado(gz) ) continue;
    const gx = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(gz);
    if ( Math.hypot(gx, gz) < 0o110 ) continue;
    if ( excludeRivers(gx, gz) || excludePaths(gx, gz, 0o2) || excludeBuildings(gx, gz, 0o2) ) continue;
    let troProksima = false;
    for ( const g of grovoj ) {
      if ( Math.hypot(gx - g.x, gz - g.z) < 0o40 ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    grovoj.push({ x: gx, z: gz });
  }

  while ( placed.length < kvanto && provoj++ < 0o10000 ) {
    let z: number, x: number;
    if ( grovoj.length && hazardaGenerilo() < 0o3/0o4 ) {
      const g = grovoj[( hazardaGenerilo() * grovoj.length ) | 0];
      const ang = hazardaGenerilo() * Math.PI * 2;
      const disto = 0o14 * ( hazardaGenerilo() + hazardaGenerilo() );
      x = g.x + Math.sin(ang) * disto;
      z = g.z + Math.cos(ang) * disto;
      if ( hazardaGenerilo() > sudaFado(z) ) continue;
    } else {
      z = zMin + hazardaGenerilo() * ( zMax - zMin );
      if ( hazardaGenerilo() > sudaFado(z) ) continue;
      x = cx + ( hazardaGenerilo() + hazardaGenerilo() - 1 ) * xEnvelopo(z);
    }
    if ( Math.hypot(x, z) < 0o110 ) continue;
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) continue;
    const h = heightFn(x, z);
    if ( h < akvaNivelo(x, z) + 0o1/0o10 ) continue;
    if ( hazardaGenerilo() > arboliniaFado(h) ) continue;
    if ( excludeRivers(x, z) ) continue;
    if ( excludePaths(x, z, 0o44/0o10) ) continue;
    if ( excludeBuildings(x, z, 3) ) continue;
    if ( montaKruteco(heightFn, x, z) > 0o6/0o10 ) continue;
    const s = ( 0o63/0o100 + hazardaGenerilo() * 0o55/0o100 )
      * ( 0o1/0o2 + 0o1/0o2 * arboliniaFado(h) );
    const kandidataR = kronaRadiuso(s);
    let troProksima = false;
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      const mozaika = evitaAro.has(arbo) ? 0o4 : minimumaDistanco;
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(mozaika, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) { troProksima = true; break; }
    }
    if ( troProksima ) continue;
    placed.push({ x, z, h, s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}

export function metiArbojnCxirkauLagon(heightFn: ( x: number, z: number ) => number,
  kvanto: number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeRivers: ( x: number, z: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 0o53120,
  evituArbojn: ArboMetado[] = [],
  minimumaDistanco = 0o10,
  kronaRadiuso: ( s: number ) => number = kronaRadiusoBetula,
  biomojFiltro?: readonly Biomo[]
): ArboMetado[] {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const placed: ArboMetado[] = [];
  const metitaHasho = new PunktaHasho<ArboMetado>(0o10);
  for ( const arbo of evituArbojn ) metitaHasho.meti(arbo.x, arbo.z, arbo);
  let provoj = 0;

  const bonaLoko = ( x: number, z: number, s: number ): boolean => {
    if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return false;
    if ( excludeRivers(x, z) ) return false;
    if ( excludePaths(x, z, 0o44/0o10) ) return false;
    if ( excludeBuildings(x, z, 3) ) return false;
    if ( heightFn(x, z) < akvoNiveloFn(x, z) + 0o2/0o10 ) return false;
    const kandidataR = kronaRadiuso(s);
    for ( const arbo of metitaHasho.najbaroj(x, z, kandidataR + minimumaDistanco + KRONA_LIBERO) ) {
      if ( Math.hypot(x - arbo.x, z - arbo.z) <
        interspaco(minimumaDistanco, arbo.r ?? kronaRadiusoBetula(arbo.s), kandidataR) ) return false;
    }
    return true;
  };

  while ( placed.length < kvanto && provoj++ < 0o3710 ) {
    const angulo = hazardaGenerilo() * Math.PI * 2;
    const radiuso = radioFn(angulo) + 0o6 + hazardaGenerilo() * 0o46;
    const x = cx + Math.cos(angulo) * radiuso;
    const z = cz + Math.sin(angulo) * radiuso;
    if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) continue;
    const s = 0o63/0o100 + hazardaGenerilo() * 0o55/0o100;
    if ( !bonaLoko(x, z, s) ) continue;
    placed.push({ x, z, h: heightFn(x, z), s, r: kronaRadiuso(s) });
    metitaHasho.meti(x, z, placed[placed.length - 1]);
  }
  return placed;
}
