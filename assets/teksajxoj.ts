// Tekstura modulo — proceduraj kanvasaj teksturoj por la urba sperto
import * as THREE from "three";

const hazard = (a: number, b: number): number => a + Math.random() * (b - a);

// sxovu — Kaŝmemoru la rezulton de senargumenta tekstura kreado, por ke la
// multaj alvokoj ( vojoj ×3 + doko, vegetajxo ×2 ) konstruu ĉiun nur unufoje.
function sxovu( fn: () => THREE.CanvasTexture ): () => THREE.CanvasTexture {
  let kaŝita: THREE.CanvasTexture | null = null;
  return () => ( kaŝita ??= fn() );
}

// kreiSxelanTeksajxon — Kreu proceduralan sxelan teksajxon por arbtrunkoj.
export const kreiSxelanTeksajxon = sxovu( (): THREE.CanvasTexture => {
  const w = 0o200, h = 0o400;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#e8e8d8"; kunteksto.fillRect(0, 0, w, h);
  for ( let i = 0; i < 0o32; i++ ) {
    kunteksto.fillStyle = `rgba(190,186,172,${0o3/0o20 + Math.random() * 0o5/0o20})`;
    kunteksto.fillRect(Math.random() * w, 0, 1 + Math.random() * 3, h);
  }
  for ( let i = 0; i < 0o54; i++ ) {
    kunteksto.fillStyle = `rgba(38,34,29,${0o44/0o100 + Math.random() * 0o15/0o40})`;
    const y = Math.random() * h, wd = 0o10 + Math.random() * 0o26;
    kunteksto.fillRect(Math.random() * w, y, wd, 3 + Math.random() * 3);
  }
  for ( let i = 0; i < 6; i++ ) {
    kunteksto.fillStyle = "rgba(48,44,38,0.5)";
    kunteksto.beginPath();
    kunteksto.ellipse(Math.random() * w, 0o322 + Math.random() * 0o56, 0o10 + Math.random() * 0o16, 4 + Math.random() * 6, 0, 0, Math.PI * 2);
    kunteksto.fill();
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  return teksajxo;
} );

// kreiLarikanSxelanTeksajxon — Kreu proceduralan larikan sxelan teksajxon.
// Grizbruna sxoelo kun ruĝbrunaj vertikalaj platoj — la malnova alpina lariko.
export function kreiLarikanSxelanTeksajxon(): THREE.CanvasTexture {
  const w = 0o200, h = 0o400;
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = w; kanvasa.height = h;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.fillStyle = "#989088"; kunteksto.fillRect( 0, 0, w, h );
  for ( let i = 0; i < 0o30; i++ ) {
    kunteksto.fillStyle = `rgba(120,104,96,${0o1/0o4 + Math.random() * 0o5/0o20})`;
    kunteksto.fillRect( Math.random() * w, 0, 2 + Math.random() * 3, h );
  }
  // Vertikalaj ruĝbrunaj fendoj — la platoj de la malnova sxoelo.
  for ( let i = 0; i < 0o40; i++ ) {
    kunteksto.fillStyle = `rgba(88,64,56,${0o15/0o40 + Math.random() * 0o35/0o100})`;
    kunteksto.fillRect( Math.random() * w, Math.random() * h, 2 + Math.random() * 4, 0o100 + Math.random() * 0o110 );
  }
  // Helaj platoj inter la fendoj.
  for ( let i = 0; i < 0o20; i++ ) {
    kunteksto.fillStyle = `rgba(176,168,152,${0o5/0o20 + Math.random() * 0o5/0o20})`;
    kunteksto.fillRect( Math.random() * w, Math.random() * h, 3 + Math.random() * 6, 0o14 + Math.random() * 0o60 );
  }
  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set( 1, 2 );
  return teksajxo;
}

// kreiDioritanTeksajxon — Kreu proceduralan dioritan teksajxon por vojoj.
export const kreiDioritanTeksajxon = sxovu( (): THREE.CanvasTexture => {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#e8e8e8"; kunteksto.fillRect(0, 0, s, s);
  const koloroj = ["#f8f8f8", "#d8d8c8", "#c0c8b8", "#f8f8f0", "#b0b0a8"];
  for ( let i = 0; i < 0o1010; i++ ) {
    kunteksto.fillStyle = koloroj[i % koloroj.length];
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(1, 3), hazard(1, 3));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(3, 3); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
} );

// kreiAndezitanTeksajxon — Kreu proceduralan andezitan teksajxon por vojrandoj.
export const kreiAndezitanTeksajxon = sxovu( (): THREE.CanvasTexture => {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#808878"; kunteksto.fillRect(0, 0, s, s);
  const koloroj = ["#989888", "#707868", "#a0a098", "#787870", "#889088"];
  for ( let i = 0; i < 0o1010; i++ ) {
    kunteksto.fillStyle = koloroj[i % koloroj.length];
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(1, 3), hazard(1, 3));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(3, 3); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
} );

// kreiHerbanTeksajxon — Kreu proceduralan herban teksajxon por tereno.
export function kreiHerbanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#f0f0e8"; kunteksto.fillRect(0, 0, s, s);
  for ( let i = 0; i < 0o644; i++ ) {
    const v = (0o327 + Math.random() * 0o50) | 0;
    kunteksto.fillStyle = `rgba(${v},${v},${v - 6},0.5)`;
    kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(2, 6), hazard(2, 6));
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(0o32, 0o32); teksajxo.anisotropy = 4;
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiNebulanTeksajxon — Kreu procedurale nebulozan radian gradienton.
export function kreiNebulanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, "rgba(240,244,238,0.6)");
  r.addColorStop(0o4/0o10, "rgba(240,244,238,0.22)");
  r.addColorStop(1, "rgba(240,244,238,0)");
  kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiBrilanTeksajxon — Kreu procedurale brilan gradienton por lampoj.
export function kreiBrilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, "rgba(255,205,120,0.95)");
  r.addColorStop(0o13/0o40, "rgba(255,165,70,0.4)");
  r.addColorStop(1, "rgba(255,150,60,0)");
  kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiFilikanTeksajxon — Kreu proceduralan filikan teksajxon por subkreskajxo.
export function kreiFilikanTeksajxon(): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o200; kanvasa.height = 0o400;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.lineCap = "round";
  kunteksto.strokeStyle = "#587850"; kunteksto.lineWidth = 4;
  kunteksto.beginPath(); kunteksto.moveTo(0o100, 0o374); kunteksto.quadraticCurveTo(0o74, 0o214, 0o106, 0o32); kunteksto.stroke();
  kunteksto.lineWidth = 3;
  for ( let i = 0; i < 0o20; i++ ) {
    const y = 0o360 - i * 0o16, longo = 0o54 - i * 0o115/0o40;
    for ( const s of [ -1, 1 ] ) {
      kunteksto.strokeStyle = `rgba(${80 + i * 3},${110 + i * 4},${70 + i * 2},0.95)`;
      kunteksto.beginPath(); kunteksto.moveTo(0o100 + (s > 0 ? 2 : -2), y);
      kunteksto.quadraticCurveTo(0o100 + s * longo * 0o55/0o100, y - 6, 0o100 + s * longo, y - 0o20);
      kunteksto.stroke();
    }
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiMolanPunktanTeksajxon — Kreu molan punkto-teksajxon por sxveligi briletojn.
export function kreiMolanPunktanTeksajxon(): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = 0o400;
  const kunteksto = kanvasa.getContext("2d")!;
  const gradiento = kunteksto.createRadialGradient(0o200, 0o200, 0o10, 0o200, 0o200, 0o200);
  gradiento.addColorStop(0, "rgba(255,255,255,0.85)");
  gradiento.addColorStop(1, "rgba(255,255,255,0)");
  kunteksto.fillStyle = gradiento; kunteksto.fillRect(0, 0, 0o400, 0o400);
  return new THREE.CanvasTexture(kanvasa);
}

// kreiPurpuranFilikanTeksajxon — Kreu purpurajn pinajn filikojn kiel en Four Groves.
const purpuraFilikaKaŝo = new Map<boolean, THREE.CanvasTexture>();
export function kreiPurpuranFilikanTeksajxon( densa: boolean = false ): THREE.CanvasTexture {
  const trovita = purpuraFilikaKaŝo.get( densa );
  if ( trovita ) return trovita;
  const kanvasa = document.createElement("canvas");
  const s = 0o400;
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  const paletro = densa
    ? { tigo: "#382050", a: "#a058c0", b: "#c078e0" }
    : { tigo: "#482850", a: "#7848b0", b: "#9868d0" };

  kunteksto.clearRect(0, 0, s, s);
  kunteksto.strokeStyle = paletro.tigo;
  kunteksto.lineWidth = densa ? 0o5 : 0o4;
  kunteksto.lineCap = "round";
  kunteksto.beginPath();
  kunteksto.moveTo(s / 2, s - 0o4/0o10);
  kunteksto.quadraticCurveTo(s / 2 + (densa ? 0o14 : 0), s * 0o4/0o10, s / 2 + (densa ? 0o24 : 0), 0o4/0o10);
  kunteksto.stroke();

  const nombro = densa ? 0o42 : 0o32;
  const maksimumaLongo = densa ? 0o112 : 0o130;
  for ( let i = 0; i < nombro; i++ ) {
    const t = i / (nombro - 1);
    const y = s - 0o10/0o10 - t * 0o340;
    const x = s / 2 + (densa ? 0o24 : 0) * t * t;
    const envolva = ( 0o26/0o100 + 0o52/0o100 * Math.min(0o1, t * 0o4/0o10) ) * Math.pow(1 - t, 0o66/0o100 );
    const longo = maksimumaLongo * envolva + 0o6;
    const largho = longo * 0o12/0o100 + 0o2;
    const kurbo = 0o33/0o100 + t * 0o6/0o10;
    const koloro = i % 2 ? paletro.a : paletro.b;

    for ( const flanko of [ -1, 1 ] ) {
      const angulo = flanko > 0 ? -kurbo : Math.PI + kurbo;
      const finoX = x + Math.cos(angulo) * longo;
      const finoY = y + Math.sin(angulo) * longo;
      const cos = Math.cos(angulo), sin = Math.sin(angulo);
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 - sin * largho, y + sin * longo * 0o4/0o10 + cos * largho, finoX, finoY);
      kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 + sin * largho, y + sin * longo * 0o4/0o10 - cos * largho, x, y);
      kunteksto.fill();
    }
  }

  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  purpuraFilikaKaŝo.set( densa, teksajxo );
  return teksajxo;
}

// kreiHerbErinanTeksajxon — Kreu proceduralan herberan teksajxon por herbo.
export const kreiHerbErinanTeksajxon = sxovu( (): THREE.CanvasTexture => {
  const s = 0o200;
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = s; kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.clearRect( 0, 0, s, s );
  // Verda klingo kontraux travidebla fono
  const gradiento = kunteksto.createRadialGradient( s / 2, s * 0o66/0o100, 0, s / 2, s * 0o66/0o100, s * 0o44/0o100 );
  gradiento.addColorStop( 0, "rgba(100,140,70,0.95)" );
  gradiento.addColorStop( 0o4/0o10, "rgba(130,170,90,0.75)" );
  gradiento.addColorStop( 1, "rgba(160,200,110,0)" );
  kunteksto.fillStyle = gradiento;
  kunteksto.fillRect( 0, 0, s, s );
  // Centra vejno
  kunteksto.strokeStyle = "rgba(80,120,50,0.6)";
  kunteksto.lineWidth = 2;
  kunteksto.beginPath();
  kunteksto.moveTo( s / 2, s * 0o73/0o100 );
  kunteksto.quadraticCurveTo( s / 2, s * 0o15/0o40, s / 2, s * 0o5/0o100 );
  kunteksto.stroke();
  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
} );

// kreiLikenanTeksajxon — Kreu proceduralan krustan likenan makulon.
// Paleverda krusto kun molaj randoj, pli malhela rompita periferio kaj
// malgrandaj fruktkorpoj ( apotecioj ).
export const kreiLikenanTeksajxon = sxovu( (): THREE.CanvasTexture => {
  const s = 0o400;
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.clearRect( 0, 0, s, s );

  const cx = s / 2, cy = s / 2;
  // Neregula krusta korpo — interkovrantaj paleverdaj rondoj kun molaj
  // gradienaj randoj; la alphaTest tranĉas ilin ĉe malalta opakeco.
  const koloroj = [ "#c0d0b8", "#b0c8a0", "#d0e0c0", "#a8c0a0" ];
  const nombro = 0o16 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const r = s * ( 0o13/0o100 + Math.random() * 0o5/0o100 );
    const x = cx + ( Math.random() - 0o4/0o10 ) * s * 0o1/0o4;
    const y = cy + ( Math.random() - 0o4/0o10 ) * s * 0o1/0o4;
    const gradiento = kunteksto.createRadialGradient( x, y, 0, x, y, r );
    gradiento.addColorStop( 0, koloroj[ i % koloroj.length ] );
    gradiento.addColorStop( 1, "rgba(160,176,144,0)" );
    kunteksto.fillStyle = gradiento;
    kunteksto.beginPath();
    kunteksto.arc( x, y, r, 0, Math.PI * 2 );
    kunteksto.fill();
  }

  // Malhela, rompita periferio — kelkaj arkoj ĉe la rando.
  kunteksto.strokeStyle = "rgba(88,104,80,0.8)";
  kunteksto.lineWidth = 3;
  for ( let i = 0; i < 0o22; i++ ) {
    const a = i / 0o22 * Math.PI * 2;
    const r = s * ( 0o15/0o40 + Math.random() * 0o5/0o100 );
    kunteksto.beginPath();
    kunteksto.arc( cx + Math.cos( a ) * s * 0o3/0o40, cy + Math.sin( a ) * s * 0o3/0o40, r, a, a + Math.PI * 0o1/0o4 );
    kunteksto.stroke();
  }

  // Krusta punktado — malhelverdaj flokoj tra la tuta makulo.
  for ( let i = 0; i < 0o200; i++ ) {
    const t = Math.sqrt( Math.random() );
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o5/0o20 * t;
    kunteksto.fillStyle = `rgba(88,104,72,${0o5/0o20 + Math.random() * 0o26/0o100})`;
    kunteksto.fillRect( cx + Math.cos( a ) * r, cy + Math.sin( a ) * r, 1 + Math.random() * 2, 1 + Math.random() * 2 );
  }

  // Fruktkorpoj ( apotecioj ) — malgrandaj malhelaj punktetoj.
  for ( let i = 0; i < 0o14; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( Math.random() * 0o5/0o20 );
    kunteksto.fillStyle = "rgba(64,72,48,0.8)";
    kunteksto.beginPath();
    kunteksto.arc( cx + Math.cos( a ) * r, cy + Math.sin( a ) * r, 2 + Math.random() * 3, 0, Math.PI * 2 );
    kunteksto.fill();
  }

  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
} );

// kreiPurpuranFolianTeksajxon — Kreu proceduralan purpuran folian teksajxon
// por la laktuk-arbo. Larĝa klingo kun centra kaj flankaj vejnoj.
export function kreiPurpuranFolianTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  const kanvasa = document.createElement( "canvas" );
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext( "2d" )!;
  kunteksto.clearRect( 0, 0, s, s );
  const cx = s / 2;

  // Klingo — purpura, larĝa, kun glataj randoj. La larĝo 0o10/0o20 kongruas
  // kun la pli larĝa folia geometrio ( 0o6/0o5 ), por ke la vejnoj ne streĉiĝu.
  // La bazo pintigas — neniu akra angulo ĉe la flankoj.
  const gradiento = kunteksto.createRadialGradient( cx, s * 0o3/0o10, 0, cx, s * 0o3/0o10, s * 0o10/0o20 );
  gradiento.addColorStop( 0, "#a050b0" );
  gradiento.addColorStop( 1, "#703880" );
  kunteksto.fillStyle = gradiento;
  kunteksto.beginPath();
  kunteksto.moveTo( cx, s * 0o17/0o20 );
  kunteksto.bezierCurveTo( cx - s * 0o1/0o10, s * 0o7/0o10, cx - s * 0o10/0o20, s * 0o5/0o10, cx, s * 0o3/0o20 );
  kunteksto.bezierCurveTo( cx + s * 0o10/0o20, s * 0o5/0o10, cx + s * 0o1/0o10, s * 0o7/0o10, cx, s * 0o17/0o20 );
  kunteksto.closePath();
  kunteksto.fill();

  // Centra vejno.
  kunteksto.strokeStyle = "#583070";
  kunteksto.lineWidth = 3;
  kunteksto.beginPath();
  kunteksto.moveTo( cx, s * 0o17/0o20 );
  kunteksto.quadraticCurveTo( cx, s * 0o1/0o2, cx, s * 0o3/0o20 );
  kunteksto.stroke();

  // Flankaj vejnoj.
  kunteksto.lineWidth = 2;
  for ( let i = 1; i < 0o6; i++ ) {
    const t = i / 0o6;
    const y = s * 0o17/0o20 - t * ( s * 0o17/0o20 - s * 0o3/0o20 );
    const largho = s * 0o10/0o20 * Math.sin( Math.PI * Math.min( t * 0o6/0o5, 1 ) );
    for ( const dir of [ -1, 1 ] ) {
      kunteksto.beginPath();
      kunteksto.moveTo( cx, y );
      kunteksto.quadraticCurveTo( cx + dir * largho * 0o2/0o3, y - s * 0o1/0o40, cx + dir * largho, y );
      kunteksto.stroke();
    }
  }

  const teksajxo = new THREE.CanvasTexture( kanvasa );
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiAkvanReliefanTeksajxon — Kreu akvan reliefan teksturon por rivera ondado.
//     @param radX ( number ) - Ripetadxo en X direkto.
//     @param ry ( number ) - Ripetadxo en Z direkto.
export function kreiAkvanReliefanTeksajxon(radX: number, ry: number): THREE.CanvasTexture {
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const kunteksto = kanvasa.getContext("2d")!;
  kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
  for ( let i = 0; i < s * s / 0o10; i++ ) {
    const g = (0o160 + Math.random() * 0o60) | 0;
    kunteksto.fillStyle = `rgb(${g},${g},${g})`;
    kunteksto.fillRect(Math.random() * s, Math.random() * s, 2, 2);
  }
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.wrapS = teksajxo.wrapT = THREE.RepeatWrapping;
  teksajxo.repeat.set(radX, ry); teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}
