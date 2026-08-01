// Skripta bildilo — vertikala skribsistemo el octaveil-city
// Uzas kurbajn vertikalajn liniojn (vl) kaj horizontalajn konektilojn (hk) kun
// "plena bloko" kaj "maldekstre duono plena, dekstre nur supre" modeloj laux Description.md
import * as THREE from "three";

// Determinisma LCG por konsekvenca glifo-generado
let _seed = 0x752;
function hazardo(): number {
  _seed = (_seed * 0x1663 + 0x1015) % 0x100000;
  return _seed / 0x100000;
}

function hashiStringo(s: string): number {
  let h = 2166136261;
  for ( let i = 0; i < s.length; i++ ) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// Nesimetra rondigita rektangulo (32px 16px 32px 16px motivo)
function nesimetraRecto( kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: [number, number, number, number]
): void {
  const [tl, tr, br, bl] = r;
  kunteksto.beginPath();
  kunteksto.moveTo(x + tl, y);
  kunteksto.lineTo(x + w - tr, y); kunteksto.quadraticCurveTo(x + w, y, x + w, y + tr);
  kunteksto.lineTo(x + w, y + h - br); kunteksto.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  kunteksto.lineTo(x + bl, y + h); kunteksto.quadraticCurveTo(x, y + h, x, y + h - bl);
  kunteksto.lineTo(x, y + tl); kunteksto.quadraticCurveTo(x, y, x + tl, y);
  kunteksto.closePath();
}

// Octaveil-stila glifa bloko. kurbaj vertikalaj linioj + horizontalaj konektiloj
function glifaBloko( kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  ink: string
): void {
  kunteksto.save();
  kunteksto.strokeStyle = ink;
  kunteksto.lineCap = "round";
  kunteksto.lineJoin = "round";
  kunteksto.lineWidth = w * 3/32;

  // Vertikala linia helpilo — desegnas de malsupre al supre kun laŭvola kurbo
  const vl = ( fortoX: number, y0: number, y1: number, bend: number ): void => {
    kunteksto.beginPath();
    kunteksto.moveTo(x + w * fortoX, y + h * y0);
    kunteksto.quadraticCurveTo( x + w * (fortoX + bend),
      y + h * (y0 + y1) / 2,
      x + w * (fortoX + bend * 13/64),
      y + h * y1 );
    kunteksto.stroke();
  };

  // Horizontala konektilo
  const hk = ( x0: number, x1: number, fY: number, dip: number ): void => {
    kunteksto.beginPath();
    kunteksto.moveTo(x + w * x0, y + h * fY);
    kunteksto.quadraticCurveTo( x + w * (x0 + x1) / 2,
      y + h * (fY + dip),
      x + w * x1,
      y + h * (fY + dip * 13/64) );
    kunteksto.stroke();
  };

  if (hazardo() < 4/8) {
    // Plena bloka modelo
    const n = 2 + ((hazardo() * 2) | 0);
    for ( let i = 0; i < n; i++ ) {
      vl( 13/64 + i * 19/32 / Math.max(1, n - 1),
        3/32, 23/32,
        (hazardo() - 13/32) * 13/32 );
    }
    if (hazardo() < 4/8) hk(1/8, 45/64, 5/32 + hazardo() * 3/32, 19/64);
  } else {
    // Maldekstre duono plena, dekstre nur supre (laŭ Description.md)
    vl(9/64, 3/32, 23/32, (hazardo() - 13/32) * 19/64);
    vl(5/16, 9/64, 45/64, (hazardo() - 13/32) * 19/64);
    vl(19/32, 3/32, 13/32, (hazardo() - 13/32) * 13/64);
    hk(29/64, 23/32, 15/64, 17/64);
  }

  kunteksto.restore();
}

// Desegnu kompletan skriptan panelon — malsupre al supre
function desegniSkripto( kunteksto: CanvasRenderingContext2D,
  W: number, H: number,
  ink: string, frame: string | null
): void {
  if ( frame ) {
    kunteksto.strokeStyle = frame;
    kunteksto.lineWidth = Math.max(2, W * 1/64);
    nesimetraRecto(kunteksto,
      W * 1/16, H * 1/32,
      W * 45/64, H * 6/8,
      [W * 13/64, W * 3/32, W * 13/64, W * 3/32] );
    kunteksto.stroke();
  }

  const blokoLargho = W * 11/32;
  const blokoAlto = blokoLargho * 12/8;
  const interspaco = blokoAlto * 5/32;
  const n = Math.max(2, Math.floor((H * 45/64) / (blokoAlto + interspaco)));

  let y = H * 47/64 - blokoAlto; // Unua glifo sidas malalte, legado supreniras
  for ( let b = 0; b < n; b++ ) {
    const cX = W / 2 + (hazardo() - 13/32) * W * 3/32;
    glifaBloko(kunteksto, cX - blokoLargho / 2, y, blokoLargho, blokoAlto, ink);
    y -= (blokoAlto + interspaco);
  }
}

export interface SkriptajOpcioj {
  w?: number; h?: number;
  ink?: string; frame?: string | null;
  seedName?: string;
  bg?: string;
}

// generiSkriptanKanvason — Generu script-skriban kanvason kun determinismaj glifoj.
//     @param opts ( SkriptajOpcioj ) - Opcioj por largho, alto, inko, koloroj, semo.
export function generiSkriptanKanvason(opts: SkriptajOpcioj = {}): HTMLCanvasElement {
  const o = { w: 0o300, h: 0o460, ink: "#183828", frame: "#c8a058" as string | null, seedName: "", bg: "" as string | undefined, ...opts };
  // Seed the RNG for deterministic output
  if ( o.seedName ) {
    _seed = (hashiStringo(o.seedName) % 0xFFFF0) | 1;
  }

  const kanvasa = document.createElement("canvas");
  kanvasa.width = o.w;
  kanvasa.height = o.h;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( o.bg ) { kunteksto.fillStyle = o.bg; kunteksto.fillRect(0, 0, o.w, o.h); }
  desegniSkripto(kunteksto, o.w, o.h, o.ink, o.frame);
  return kanvasa;
}

// generiSkriptanURL — Generu data URL de script-skriba kanvaso.
//     @param opts ( SkriptajOpcioj ) - Opcioj por la generado.
export function generiSkriptanURL(opts: SkriptajOpcioj = {}): string {
  return generiSkriptanKanvason(opts).toDataURL();
}

// La Gawekiif-tiparo estas ŝarĝita per la ekstera krhitlashi-stylesheet
// ( @font-face familio j͑ʃꞇȝ ), kune kun ĝiaj rezervaj familioj.
const GAWEKIIF_FAMILIO = `"j͑ʃꞇȝ","ı],ᴜ }ʃᴜ","ʃɹ ı],ɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬꞇᴜ",sans-serif`;

// generiSkribanTeksajxon — Generu texturon kun REALA Gawekiif-teksto:
// skribita suben-supren, rompita je spacoj (unua vorto malsupre, sekvaj supren).
// Reuzebla por la strat-signoj kaj la internaj platoj.
export function generiSkribanTeksajxon(teksto: string, opts: SkriptajOpcioj = {}): THREE.CanvasTexture {
  const vortoj = teksto.split(/\s+/).filter(Boolean);
  const kanvasa = document.createElement("canvas");
  kanvasa.width = opts.w || 0o140;
  kanvasa.height = opts.h || 0o300;
  const kunteksto = kanvasa.getContext("2d")!;
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.anisotropy = 4;

  const desegni = (): void => {
    kunteksto.clearRect(0, 0, kanvasa.width, kanvasa.height);
    if ( opts.bg ) { kunteksto.fillStyle = opts.bg; kunteksto.fillRect(0, 0, kanvasa.width, kanvasa.height); }
    if ( vortoj.length === 0 ) return;
    kunteksto.textAlign = "center";
    kunteksto.textBaseline = "middle";
    kunteksto.fillStyle = opts.ink || "#d8b068";
    // Mezuru ĉe referenca grando (100px) — tekstaj larĝoj skaliĝas lineare, do la
    // proporcioj restas ĝustaj eĉ antaŭ la ŝargo de la ekstera tiparo, kaj la teksto
    // neniam estas premita (smush) al mikroskopa grando.
    const REF = 100;
    kunteksto.font = `${REF}px ${GAWEKIIF_FAMILIO}`;
    const maksLargho = kanvasa.width * 44/50;
    const largho100 = Math.max( 1, ...vortoj.map( v => kunteksto.measureText( v ).width ) );
    const fsLargho = REF * maksLargho / largho100;
    const fsAlto = kanvasa.height / ( 45/64 + ( vortoj.length - 1 ) * 7/4 + 5/8 );
    const fs = Math.max( 8, Math.min( fsLargho, fsAlto ) );
    const linioAlto = fs * 7/4;
    // Vertikale centru la tutan vorto-stakon sur la kanvaso: la unua vorto
    // (plej malsupra) ne plu algluiĝas al la malsupro de la plato.
    const stakoCentro = kanvasa.height / 2;
    let y = stakoCentro + ( vortoj.length - 1 ) * linioAlto / 2;
    for ( const v of vortoj ) {
      kunteksto.font = `${fs}px ${GAWEKIIF_FAMILIO}`;
      kunteksto.fillText( v, kanvasa.width / 2, y );
      y -= linioAlto;
    }
  };

  desegni();
  // Re-desegnu POST la ŝargo de la ekstera tiparo: la promeso de load() solviĝas
  // ĝuste kiam tiu tiparo estos preta, do la realaj glifoj ĉiam aperas.
  if ( document.fonts && document.fonts.load ) {
    document.fonts.load( `16px "j͑ʃꞇȝ"` )
      .then( () => { desegni(); teksajxo.needsUpdate = true; } )
      .catch( () => {} );
  }
  return teksajxo;
}

// Generu rapidan glifan strion por UI-elementoj
export function generiGlifanStrion(height: number, ink: string): HTMLCanvasElement {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = 0o64;
  kanvasa.height = height;
  const kunteksto = kanvasa.getContext("2d")!;

  const blokoLargho = 0o44;
  const blokoAlto = blokoLargho * 12/8;
  const interspaco = blokoAlto * 5/32;
  const n = Math.floor(height / (blokoAlto + interspaco));

  let y = height - 0o10;
  for ( let b = 0; b < n; b++ ) {
    glifaBloko(kunteksto, 0o10, y - blokoAlto, blokoLargho, blokoAlto, ink);
    y -= (blokoAlto + interspaco);
  }

  return kanvasa;
}
