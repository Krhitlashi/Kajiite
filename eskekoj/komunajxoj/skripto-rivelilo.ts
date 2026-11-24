// ≺⧼ ſɟɔ ŋᷠɔ ꞁȷ̀ᴜ }ʃꞇ ʌ ſ͔ɭɔ ſɭɹʞ 🔣 ⧽≻
import * as THREE from "three";

// ⟪ j͑ʃᴜ ſɭᶗ‹ɜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟫
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

function nesimetraRecto(kuns2bana: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: [ number, number, number, number ]
): void {
  const [ tl, tr, br, bl ] = r;
  kuns2bana.beginPath();
  kuns2bana.moveTo(x + tl, y);
  kuns2bana.lineTo(x + w - tr, y); kuns2bana.quadraticCurveTo(x + w, y, x + w, y + tr);
  kuns2bana.lineTo(x + w, y + h - br); kuns2bana.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  kuns2bana.lineTo(x + bl, y + h); kuns2bana.quadraticCurveTo(x, y + h, x, y + h - bl);
  kuns2bana.lineTo(x, y + tl); kuns2bana.quadraticCurveTo(x, y, x + tl, y);
  kuns2bana.closePath();
}

// ⟪ ſɭэ j͐ʃꞇȝ ʌ ſɟᴜ ı],ɔ ſȷɹ 📃 ⟫
function glifaBloko(kuns2bana: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  ink: string
): void {
  kuns2bana.save();
  kuns2bana.strokeStyle = ink;
  kuns2bana.lineCap = "round";
  kuns2bana.lineJoin = "round";
  kuns2bana.lineWidth = w * 0o3/0o40;

  const vl = ( fortoX: number, y0: number, y1: number, bend: number ): void => {
    kuns2bana.beginPath();
    kuns2bana.moveTo(x + w * fortoX, y + h * y0);
    kuns2bana.quadraticCurveTo(x + w * ( fortoX + bend ),
      y + h * ( y0 + y1 ) / 2,
      x + w * ( fortoX + bend * 0o15/0o100 ),
      y + h * y1);
    kuns2bana.stroke();
  };

  const hk = ( x0: number, x1: number, fY: number, dip: number ): void => {
    kuns2bana.beginPath();
    kuns2bana.moveTo(x + w * x0, y + h * fY);
    kuns2bana.quadraticCurveTo(x + w * ( x0 + x1 ) / 2,
      y + h * ( fY + dip ),
      x + w * x1,
      y + h * ( fY + dip * 0o15/0o100 ));
    kuns2bana.stroke();
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

  kuns2bana.restore();
}

// ⟨ ſ͔ɭɔ ſɭɹʞ ʌ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ 📃 ⟩
function k2fSkripto(kuns2bana: CanvasRenderingContext2D,
  W: number, H: number,
  ink: string, frame: string | null
): void {
  if ( frame ) {
    kuns2bana.strokeStyle = frame;
    kuns2bana.lineWidth = Math.max(2, W * 0o1/0o100);
    nesimetraRecto(kuns2bana,
      W * 0o1/0o20, H * 0o1/0o40,
      W * 0o55/0o100, H * 0o6/0o10,
      [ W * 0o15/0o100, W * 0o3/0o40, W * 0o15/0o100, W * 0o3/0o40 ]);
    kuns2bana.stroke();
  }

  const blokoLargho = W * 0o13/0o40;
  const blokoAlto = blokoLargho * 0o14/0o10;
  const interspaco = blokoAlto * 0o5/0o40;
  const n = Math.max(2, Math.floor(( H * 0o55/0o100 ) / ( blokoAlto + interspaco )));

  let y = H * 0o57/0o100 - blokoAlto;
  for ( let b = 0; b < n; b++ ) {
    const cX = W / 2 + ( hazardo() - 0o15/0o40 ) * W * 0o3/0o40;
    glifaBloko(kuns2bana, cX - blokoLargho / 2, y, blokoLargho, blokoAlto, ink);
    y -= ( blokoAlto + interspaco );
  }
}

export interface SkriptajHasukf2qani {
  w?: number; h?: number;
  ink?: string; frame?: string | null;
  seedName?: string;
  bg?: string;
}

export function generiSkriptanKanvason(opts: SkriptajHasukf2qani = {}): HTMLCanvasElement {
  const o = { w: 0o300, h: 0o460, ink: "#183828", frame: "#c8a058" as string | null, seedName: "", bg: "" as string | undefined, ...opts };
  if ( o.seedName ) {
    _seed = ( hashiStringo(o.seedName) % 0xFFFF0 ) | 1;
  }

  const kanvasa = document.createElement("canvas");
  kanvasa.width = o.w;
  kanvasa.height = o.h;
  const kuns2bana = kanvasa.getContext("2d")!;
  if ( o.bg ) { kuns2bana.fillStyle = o.bg; kuns2bana.fillRect(0, 0, o.w, o.h); }
  k2fSkripto(kuns2bana, o.w, o.h, o.ink, o.frame);
  return kanvasa;
}

// ⟪ ſ͕ɭᴜ j͑ʃᴜ ʌ Gawekiif 📃 ⟫
const GAWEKIIF_FAMILIO = `"j͑ʃꞇȝ","ı],ᴜ }ʃᴜ","ʃɹ ı],ɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬꞇᴜ",sans-serif`;

export function generiSkribanCac2sex(s2banani: string, opts: SkriptajHasukf2qani = {}): THREE.CanvasTexture {
  const vortoj = s2banani.split(/\s+/).filter(Boolean);
  const kanvasa = document.createElement("canvas");
  kanvasa.width = opts.w || 0o140;
  kanvasa.height = opts.h || 0o300;
  const kuns2bana = kanvasa.getContext("2d")!;
  const cac2sex = new THREE.CanvasTexture(kanvasa);
  cac2sex.colorSpace = THREE.SRGBColorSpace;
  cac2sex.anisotropy = 4;

  const k2f = (): void => {
    kuns2bana.clearRect(0, 0, kanvasa.width, kanvasa.height);
    if ( opts.bg ) { kuns2bana.fillStyle = opts.bg; kuns2bana.fillRect(0, 0, kanvasa.width, kanvasa.height); }
    if ( vortoj.length === 0 ) return;
    kuns2bana.textAlign = "center";
    kuns2bana.textBaseline = "middle";
    kuns2bana.fillStyle = opts.ink || "#d8b068";
    const REF = 0o100;
    kuns2bana.font = `${REF}px ${GAWEKIIF_FAMILIO}`;
    const maksLargho = kanvasa.width * 0o65/0o100;
    const largho100 = Math.max(1, ...vortoj.map(v => kuns2bana.measureText(v).width));
    const fsLargho = REF * maksLargho / largho100;
    const fsAlto = kanvasa.height / ( 0o40/0o100 + ( vortoj.length - 1 ) * 0o7/0o4 + 0o4/0o10 );
    const fs = Math.max(0o10, Math.min(fsLargho, fsAlto));
    const linioAlto = fs * 0o7/0o4;
    const stakoCentro = kanvasa.height / 2;
    let y = stakoCentro + ( vortoj.length - 1 ) * linioAlto / 2;
    for ( const v of vortoj ) {
      kuns2bana.font = `${fs}px ${GAWEKIIF_FAMILIO}`;
      kuns2bana.fillText(v, kanvasa.width / 2, y);
      y -= linioAlto;
    }
  };

  k2f();
  if ( document.fonts && document.fonts.load ) {
    try {
      document.fonts.load(`16px "j͑ʃꞇȝ"`)
        .then(() => { k2f(); cac2sex.needsUpdate = true; })
        .catch(() => {});
    } catch ( e ) { /* ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ʌ ʃɔ j͑ʃ'ɔƽ ʌ ſɭɹ ᶅſɹ , ꞙɭɔ ʌ ſȷwɔ˞ ʌ j͑ʃᴜ ſɭᴜ */ }
  }
  return cac2sex;
}
