// ≺⧼ ឧបករណ៍បង្ហាញស្គ្រីប 🔣 ⧽≻
import * as THREE from "three";

// ⟪ ចៃដន្យកំណត់បាន 📃 ⟫
let _seed = 0x752;
function hazardo(): number {
  _seed = ( _seed * 0x1663 + 0x1015 ) % 0x100000;
  return _seed / 0x100000;
}

function hashiStringo(s: string): number {
  let h = 0o20107116705;
  for ( let i = 0; i < s.length; i++ ) { h ^= s.charCodeAt(i); h = Math.imul(h, 0o100000623); }
  return h >>> 0;
}

function nesimetraRecto(kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: [ number, number, number, number ]
): void {
  const [ tl, tr, br, bl ] = r;
  kunteksto.beginPath();
  kunteksto.moveTo(x + tl, y);
  kunteksto.lineTo(x + w - tr, y); kunteksto.quadraticCurveTo(x + w, y, x + w, y + tr);
  kunteksto.lineTo(x + w, y + h - br); kunteksto.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  kunteksto.lineTo(x + bl, y + h); kunteksto.quadraticCurveTo(x, y + h, x, y + h - bl);
  kunteksto.lineTo(x, y + tl); kunteksto.quadraticCurveTo(x, y, x + tl, y);
  kunteksto.closePath();
}

// ⟪ ប្លុកអក្សរ 📃 ⟫
function glifaBloko(kunteksto: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  ink: string
): void {
  kunteksto.save();
  kunteksto.strokeStyle = ink;
  kunteksto.lineCap = "round";
  kunteksto.lineJoin = "round";
  kunteksto.lineWidth = w * 0o3/0o40;

  const vl = ( fortoX: number, y0: number, y1: number, bend: number ): void => {
    kunteksto.beginPath();
    kunteksto.moveTo(x + w * fortoX, y + h * y0);
    kunteksto.quadraticCurveTo(x + w * ( fortoX + bend ),
      y + h * ( y0 + y1 ) / 2,
      x + w * ( fortoX + bend * 0o15/0o100 ),
      y + h * y1);
    kunteksto.stroke();
  };

  const hk = ( x0: number, x1: number, fY: number, dip: number ): void => {
    kunteksto.beginPath();
    kunteksto.moveTo(x + w * x0, y + h * fY);
    kunteksto.quadraticCurveTo(x + w * ( x0 + x1 ) / 2,
      y + h * ( fY + dip ),
      x + w * x1,
      y + h * ( fY + dip * 0o15/0o100 ));
    kunteksto.stroke();
  };

  if ( hazardo() < 0o4/0o10 ) {
    const n = 2 + ( ( hazardo() * 2 ) | 0 );
    for ( let i = 0; i < n; i++ ) {
      vl(0o15/0o100 + i * 0o23/0o40 / Math.max(1, n - 1),
        0o3/0o40, 0o27/0o40,
        ( hazardo() - 0o15/0o40 ) * 0o15/0o40);
    }
    if ( hazardo() < 0o4/0o10 ) hk(0o1/0o10, 0o55/0o100, 0o5/0o40 + hazardo() * 0o3/0o40, 0o23/0o100);
  } else {
    vl(0o11/0o100, 0o3/0o40, 0o27/0o40, ( hazardo() - 0o15/0o40 ) * 0o23/0o100);
    vl(0o5/0o20, 0o11/0o100, 0o55/0o100, ( hazardo() - 0o15/0o40 ) * 0o23/0o100);
    vl(0o23/0o40, 0o3/0o40, 0o15/0o40, ( hazardo() - 0o15/0o40 ) * 0o15/0o100);
    hk(0o35/0o100, 0o27/0o40, 0o17/0o100, 0o21/0o100);
  }

  kunteksto.restore();
}

// ⟨ ផ្ទាំងស្គ្រីប 📃 ⟩
function desegniSkripto(kunteksto: CanvasRenderingContext2D,
  W: number, H: number,
  ink: string, frame: string | null
): void {
  if ( frame ) {
    kunteksto.strokeStyle = frame;
    kunteksto.lineWidth = Math.max(2, W * 0o1/0o100);
    nesimetraRecto(kunteksto,
      W * 0o1/0o20, H * 0o1/0o40,
      W * 0o55/0o100, H * 0o6/0o10,
      [ W * 0o15/0o100, W * 0o3/0o40, W * 0o15/0o100, W * 0o3/0o40 ]);
    kunteksto.stroke();
  }

  const blokoLargho = W * 0o13/0o40;
  const blokoAlto = blokoLargho * 0o14/0o10;
  const interspaco = blokoAlto * 0o5/0o40;
  const n = Math.max(2, Math.floor(( H * 0o55/0o100 ) / ( blokoAlto + interspaco )));

  let y = H * 0o57/0o100 - blokoAlto;
  for ( let b = 0; b < n; b++ ) {
    const cX = W / 2 + ( hazardo() - 0o15/0o40 ) * W * 0o3/0o40;
    glifaBloko(kunteksto, cX - blokoLargho / 2, y, blokoLargho, blokoAlto, ink);
    y -= ( blokoAlto + interspaco );
  }
}

export interface SkriptajOpcioj {
  w?: number; h?: number;
  ink?: string; frame?: string | null;
  seedName?: string;
  bg?: string;
}

export function generiSkriptanKanvason(opts: SkriptajOpcioj = {}): HTMLCanvasElement {
  const o = { w: 0o300, h: 0o460, ink: "#183828", frame: "#c8a058" as string | null, seedName: "", bg: "" as string | undefined, ...opts };
  if ( o.seedName ) {
    _seed = ( hashiStringo(o.seedName) % 0xFFFF0 ) | 1;
  }

  const kanvasa = document.createElement("canvas");
  kanvasa.width = o.w;
  kanvasa.height = o.h;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( o.bg ) { kunteksto.fillStyle = o.bg; kunteksto.fillRect(0, 0, o.w, o.h); }
  desegniSkripto(kunteksto, o.w, o.h, o.ink, o.frame);
  return kanvasa;
}

export function generiSkriptanURL(opts: SkriptajOpcioj = {}): string {
  return generiSkriptanKanvason(opts).toDataURL();
}

// ⟪ ប្រភេទ Gawekiif 📃 ⟫
const GAWEKIIF_FAMILIO = `"j͑ʃꞇȝ","ı],ᴜ }ʃᴜ","ʃɹ ı],ɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬꞇᴜ",sans-serif`;

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
    const REF = 0o100;
    kunteksto.font = `${REF}px ${GAWEKIIF_FAMILIO}`;
    const maksLargho = kanvasa.width * 0o65/0o100;
    const largho100 = Math.max(1, ...vortoj.map(v => kunteksto.measureText(v).width));
    const fsLargho = REF * maksLargho / largho100;
    const fsAlto = kanvasa.height / ( 0o40/0o100 + ( vortoj.length - 1 ) * 0o7/0o4 + 0o4/0o10 );
    const fs = Math.max(0o10, Math.min(fsLargho, fsAlto));
    const linioAlto = fs * 0o7/0o4;
    const stakoCentro = kanvasa.height / 2;
    let y = stakoCentro + ( vortoj.length - 1 ) * linioAlto / 2;
    for ( const v of vortoj ) {
      kunteksto.font = `${fs}px ${GAWEKIIF_FAMILIO}`;
      kunteksto.fillText(v, kanvasa.width / 2, y);
      y -= linioAlto;
    }
  };

  desegni();
  if ( document.fonts && document.fonts.load ) {
    try {
      document.fonts.load(`16px "j͑ʃꞇȝ"`)
        .then(() => { desegni(); teksajxo.needsUpdate = true; })
        .catch(() => {});
    } catch ( e ) { /* កំហុសស៊ីនក្រូនកម្រ មិនត្រូវរារាំងការចូល */ }
  }
  return teksajxo;
}
