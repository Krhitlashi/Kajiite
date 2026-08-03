// Vesta modulo — kostumaj teksturoj kun kvarpinta stelo kaj rombo-motivoj, foliaj manikoj
import * as THREE from "three";

export interface Vesto {
  nomo: string;
  ĉefa: number;    // deksesuma
  akcenta: number; // deksesuma
  interno: number;   // deksesuma
  pantalono: number; // deksesuma — kutime hela aŭ malhela bluo
  botoj: number;     // deksesuma — kutime bruno
}

export const VESTOJ: Vesto[] = [
  { nomo: "vestoVerdant", ĉefa: 0x184838, akcenta: 0xd8b068, interno: 0x103828, pantalono: 0x285880, botoj: 0x583818 },
  { nomo: "vestoHearth", ĉefa: 0x584830, akcenta: 0xd8c8a0, interno: 0x302818, pantalono: 0x3878a0, botoj: 0x583808 },
  { nomo: "vestoMist",   ĉefa: 0xd8e0e0, akcenta: 0x889898, interno: 0xa8b8b8, pantalono: 0x5898b8, botoj: 0x503808 },
  { nomo: "vestoEmber", ĉefa: 0x783828, akcenta: 0xe0a858, interno: 0x402018, pantalono: 0x2858a0, botoj: 0x583838 },
];

const deksesuma = (c: number): string => "#" + c.toString(0o20).padStart(0o6, "0");

function kvarStelo( kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, r: number, koloro: string
): void {
  const s = r * 0o7/0o40;
  kunteksto.fillStyle = koloro;
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - r);
  kunteksto.quadraticCurveTo(cX + s, cy - s, cX + r, cy);
  kunteksto.quadraticCurveTo(cX + s, cy + s, cX, cy + r);
  kunteksto.quadraticCurveTo(cX - s, cy + s, cX - r, cy);
  kunteksto.quadraticCurveTo(cX - s, cy - s, cX, cy - r);
  kunteksto.fill();
}

function rombo( kunteksto: CanvasRenderingContext2D,
  cX: number, cy: number, w: number, h: number,
  plenigo: string | null, bordo: string | null
): void {
  kunteksto.beginPath();
  kunteksto.moveTo(cX, cy - h);
  kunteksto.lineTo(cX + w, cy);
  kunteksto.lineTo(cX, cy + h);
  kunteksto.lineTo(cX - w, cy);
  kunteksto.closePath();
  if ( plenigo ) { kunteksto.fillStyle = plenigo; kunteksto.fill(); }
  if ( bordo ) { kunteksto.strokeStyle = bordo; kunteksto.lineWidth = 0o4; kunteksto.stroke(); }
}

// rondaRechto — Desegnu plenigitajn rektangulojn kun iomete rondaj anguloj,
// kongruante kun la rondaj anguloj de la 3D-ŝuoj.
function rondaRechto( kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
): void {
  kunteksto.beginPath();
  kunteksto.moveTo( x + r, y );
  kunteksto.lineTo( x + w - r, y );
  kunteksto.quadraticCurveTo( x + w, y, x + w, y + r );
  kunteksto.lineTo( x + w, y + h - r );
  kunteksto.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
  kunteksto.lineTo( x + r, y + h );
  kunteksto.quadraticCurveTo( x, y + h, x, y + h - r );
  kunteksto.lineTo( x, y + r );
  kunteksto.quadraticCurveTo( x, y, x + r, y );
  kunteksto.closePath();
  kunteksto.fill();
}

// kreiVestanTeksajxon — Kreu teksturon por NPC-vesto laux speco (supra, interna, malsupra, pantalono).
export function kreiVestanTeksajxon( o: Vesto,
  speco: "supra" | "interno" | "malsupra" | "pantalono"
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o400; kanvasa.height = 0o1000;
  const kunteksto = kanvasa.getContext("2d")!;
  // La pantalono uzas sian propran bazkoloron ( bluan ); la cetero la ĉefan.
  const M = deksesuma(speco === "pantalono" ? o.pantalono : o.ĉefa);
  const A = deksesuma(o.akcenta);
  const I = deksesuma(o.interno);

  kunteksto.fillStyle = M;
  kunteksto.fillRect(0, 0, 0o400, 0o1000);
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0, 0o726, 0o400, 0o32);
  kunteksto.fillStyle = A;
  kunteksto.globalAlpha = 0o15/0o40;
  kunteksto.fillRect(0, 0o704, 0o400, 0o6);
  kunteksto.globalAlpha = 0o1;

  if ( speco === "supra" ) {
    kvarStelo(kunteksto, 0o200, 0o226, 0o54, A);
    rombo(kunteksto, 0o200, 0o226, 0o72, 0o72, null, A);
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o4; i++ ) {
      kunteksto.beginPath();
      kunteksto.arc(0o200, 0o50 + i * 0o32, 0o5, 0, Math.PI * 0o2);
      kunteksto.fill();
    }
    rombo(kunteksto, 0o124, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o254, 0o512, 0o32, 0o42, I, A);
    rombo(kunteksto, 0o200, 0o610, 0o26, 0o34, I, A);
  } else if ( speco === "interno" || speco === "pantalono" ) {
    for ( let i = 0; i < 0o3; i++ ) {
      rombo(kunteksto, 0o200, 0o120 + i * 0o156, 0o36, 0o50, null, A);
    }
    kunteksto.globalAlpha = 0o2/0o10;
    kunteksto.fillStyle = A;
    for ( let i = 0; i < 0o6; i++ ) {
      for ( let j = 0; j < 0o3; j++ ) {
        rombo(kunteksto, 0o50 + j * 0o130, 0o50 + i * 0o124, 0o12, 0o16, A, null);
      }
    }
    kunteksto.globalAlpha = 0o1;
  }

  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
}

// kreiVestanAntauxrigardon — Kreu malgrandan antauxrigardan kanvason por vesta elekta karto.
//     @param o ( Vesto ) - La vesta objekto por montri.
export function kreiVestanAntauxrigardon(o: Vesto): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o210; kanvasa.height = 0o300;
  const kunteksto = kanvasa.getContext("2d")!;
  const M = deksesuma(o.ĉefa);
  const A = deksesuma(o.akcenta);
  const I = deksesuma(o.interno);

  kunteksto.fillStyle = "rgba(6,16,12,0.9)";
  kunteksto.fillRect(0, 0, 0o210, 0o300);

  // interna ĉemizo
  kunteksto.fillStyle = I;
  kunteksto.beginPath();
  kunteksto.moveTo(0o64, 0o64); kunteksto.lineTo(0o124, 0o64);
  kunteksto.lineTo(0o146, 0o250); kunteksto.lineTo(0o42, 0o250);
  kunteksto.closePath();
  kunteksto.fill();

  // ekstera ĉemizo
  kunteksto.fillStyle = M;
  kunteksto.beginPath();
  kunteksto.moveTo(0o62, 0o62); kunteksto.lineTo(0o126, 0o62);
  kunteksto.lineTo(0o140, 0o170); kunteksto.lineTo(0o50, 0o170);
  kunteksto.closePath();
  kunteksto.fill();

  // malsupra robo
  kunteksto.beginPath();
  kunteksto.moveTo(0o50, 0o156); kunteksto.lineTo(0o140, 0o156);
  kunteksto.lineTo(0o150, 0o240); kunteksto.lineTo(0o40, 0o240);
  kunteksto.closePath();
  kunteksto.globalAlpha = 0o73/0o100;
  kunteksto.fill();
  kunteksto.globalAlpha = 0o1;

  // akcenta ornamo
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o40, 0o234, 0o110, 0o7);

  // pantalono — du simetriaj kruroj ( hela aŭ malhela bluo ) sub la robo,
  // centritaj ĉirkaŭ la korpo-akso kaj enŝoviĝantaj en la botojn.
  kunteksto.fillStyle = deksesuma(o.pantalono);
  kunteksto.fillRect(0o46, 0o244, 0o14, 0o16);   // maldekstra kruro
  kunteksto.fillRect(0o126, 0o244, 0o14, 0o16);  // dekstra kruro

  // botoj — pli altaj, simetriaj ŝaftoj kun sxoforma piedo antaŭen kaj
  // akcenta plando ĉe la malsupro, kun iomete rondaj anguloj kiel la 3D-ŝuoj.
  // Ĉiu boto spegulas la alian ĉirkaŭ la akso.
  kunteksto.fillStyle = deksesuma(o.botoj);
  rondaRechto(kunteksto, 0o45, 0o252, 0o16, 0o14, 0o3);   // ŝafto maldekstra
  rondaRechto(kunteksto, 0o125, 0o252, 0o16, 0o14, 0o3);  // ŝafto dekstra
  rondaRechto(kunteksto, 0o44, 0o264, 0o20, 0o6, 0o2);    // piedo maldekstra
  rondaRechto(kunteksto, 0o124, 0o264, 0o20, 0o6, 0o2);   // piedo dekstra
  kunteksto.fillStyle = A;
  rondaRechto(kunteksto, 0o40, 0o270, 0o30, 0o4, 0o1);    // plando maldekstra
  rondaRechto(kunteksto, 0o120, 0o270, 0o30, 0o4, 0o1);   // plando dekstra

  // butona plateto — vertikala akcenta linio laŭ la fronta centro
  kunteksto.fillStyle = A;
  kunteksto.fillRect(0o101, 0o66, 0o3, 0o104);
  for ( let i = 0; i < 0o3; i++ ) kunteksto.fillRect(0o102, 0o74 + i * 0o32, 0o3, 0o3);

  // motivoj
  kvarStelo(kunteksto, 0o104, 0o124, 0o17, A);
  rombo(kunteksto, 0o66, 0o204, 0o11, 0o15, I, A);
  rombo(kunteksto, 0o122, 0o204, 0o11, 0o15, I, A);

  // manikoj — simetriaj tuboj kliniĝantaj eksteren ( la maldekstra spegulas
  // la dekstran ), finiĝantaj per foli-tondita rando kun akcenta rimo laŭ la
  // tondo. La senkapa manekeno montras nur la vestojn.
  for ( const dir of [ -0o1, 0o1 ] ) {
    const cx = 0o104 + dir * 0o46;
    const eno = cx - dir * 0o4;
    const ekstero = cx + dir * 0o4;
    const ySup = 0o74, yOrlo = 0o150;
    kunteksto.fillStyle = M;
    kunteksto.beginPath();
    kunteksto.moveTo( eno, ySup );
    kunteksto.lineTo( eno, yOrlo );
    // du foli-pintoj pendantaj sub la pojno, spegulitaj per dir
    kunteksto.quadraticCurveTo( eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o5 );
    kunteksto.quadraticCurveTo( eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo );
    kunteksto.lineTo( ekstero, ySup );
    kunteksto.closePath();
    kunteksto.fill();
    // akcenta rimo laŭ la tondita malsupro
    kunteksto.strokeStyle = A;
    kunteksto.lineWidth = 0o3;
    kunteksto.beginPath();
    kunteksto.moveTo( eno, yOrlo );
    kunteksto.quadraticCurveTo( eno + dir * 0o3, yOrlo + 0o14, eno + dir * 0o6, yOrlo + 0o5 );
    kunteksto.quadraticCurveTo( eno + dir * 0o11, yOrlo + 0o14, ekstero, yOrlo );
    kunteksto.stroke();
  }

  return kanvasa;
}

// kreiFolianManikGeometrion — Kreu foli-forman manikan geometrion por NPC-oj.
//     @param skalo ( number = 0o35/0o40 ) - Skala faktoro por la geometrio.
export function kreiFolianManikGeometrion(skalo: number = 0o35/0o40): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  formo.moveTo(0, 0);
  formo.quadraticCurveTo(0o23/0o100, 0o7/0o40, 0o25/0o40, 0o1/0o20);
  formo.quadraticCurveTo(0o27/0o40, 0, 0o25/0o40, -0o1/0o100);
  formo.quadraticCurveTo(0o23/0o100, -0o5/0o40, 0, 0);
  return new THREE.ExtrudeGeometry(formo, {
    depth: 0o1/0o40,
    bevelEnabled: false,
    curveSegments: 0o10,
  }).scale(skalo, skalo, skalo);
}
