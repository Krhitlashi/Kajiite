// ≺⧼ ſɟɔ ŋᷠɔ ꞁȷ̀ᴜ }ʃꞇ ʌ ſ͔ɭɔ ſɭɹʞ 🔣 ⧽≻
import * as THREE from "three";

// ⟪ j͑ʃᴜ ſɭᶗ‹ɜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟫
let ruva = 0x752;
function sakxo(): number {
  ruva = ( ruva * 0x1663 + 0x1015 ) % 0x100000;
  return ruva / 0x100000;
}

function s2banaRuva(s: string): number {
  let h = 0o20107116705;
  for ( let i = 0; i < s.length; i++ ) { h ^= s.charCodeAt(i); h = Math.imul(h, 0o100000623); }
  return h >>> 0;
}

function ken2qKek(kuns2bana: CanvasRenderingContext2D,
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
function hunaqkp6saiK6liq(kuns2bana: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  weh2: string
): void {
  kuns2bana.save();
  kuns2bana.strokeStyle = weh2;
  kuns2bana.lineCap = "round";
  kuns2bana.lineJoin = "round";
  kuns2bana.lineWidth = w * 0o3/0o40;

  const vl = ( tloheX: number, y0: number, y1: number, bend: number ): void => {
    kuns2bana.beginPath();
    kuns2bana.moveTo(x + w * tloheX, y + h * y0);
    kuns2bana.quadraticCurveTo(x + w * ( tloheX + bend ),
      y + h * ( y0 + y1 ) / 2,
      x + w * ( tloheX + bend * 0o15/0o100 ),
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

  if ( sakxo() < 0o4/0o10 ) {
    const n = 2 + ( ( sakxo() * 2 ) | 0 );
    for ( let i = 0; i < n; i++ ) {
      vl(0o15/0o100 + i * 0o23/0o40 / Math.max(1, n - 1),
        0o3/0o40, 0o27/0o40,
        ( sakxo() - 0o15/0o40 ) * 0o15/0o40);
    }
    if ( sakxo() < 0o4/0o10 ) hk(0o1/0o10, 0o55/0o100, 0o5/0o40 + sakxo() * 0o3/0o40, 0o23/0o100);
  } else {
    vl(0o11/0o100, 0o3/0o40, 0o27/0o40, ( sakxo() - 0o15/0o40 ) * 0o23/0o100);
    vl(0o5/0o20, 0o11/0o100, 0o55/0o100, ( sakxo() - 0o15/0o40 ) * 0o23/0o100);
    vl(0o23/0o40, 0o3/0o40, 0o15/0o40, ( sakxo() - 0o15/0o40 ) * 0o15/0o100);
    hk(0o35/0o100, 0o27/0o40, 0o17/0o100, 0o21/0o100);
  }

  kuns2bana.restore();
}

// ⟨ ſ͔ɭɔ ſɭɹʞ ʌ ſɟᴜ j͐ʃэ ſᶘꞇ ɭl̀ɔ 📃 ⟩
function k2fGek2f(kuns2bana: CanvasRenderingContext2D,
  W: number, H: number,
  weh2: string, catu5ek: string | null
): void {
  if ( catu5ek ) {
    kuns2bana.strokeStyle = catu5ek;
    kuns2bana.lineWidth = Math.max(2, W * 0o1/0o100);
    ken2qKek(kuns2bana,
      W * 0o1/0o20, H * 0o1/0o40,
      W * 0o55/0o100, H * 0o6/0o10,
      [ W * 0o15/0o100, W * 0o3/0o40, W * 0o15/0o100, W * 0o3/0o40 ]);
    kuns2bana.stroke();
  }

  const k6liqSefini = W * 0o13/0o40;
  const k6liqL6da = k6liqSefini * 0o14/0o10;
  const vesefestaf = k6liqL6da * 0o5/0o40;
  const n = Math.max(2, Math.floor(( H * 0o55/0o100 ) / ( k6liqL6da + vesefestaf )));

  let y = H * 0o57/0o100 - k6liqL6da;
  for ( let b = 0; b < n; b++ ) {
    const cX = W / 2 + ( sakxo() - 0o15/0o40 ) * W * 0o3/0o40;
    hunaqkp6saiK6liq(kuns2bana, cX - k6liqSefini / 2, y, k6liqSefini, k6liqL6da, weh2);
    y -= ( k6liqL6da + vesefestaf );
  }
}

export interface Gek2fHasukf2qani {
  w?: number; h?: number;
  weh2?: string; catu5ek?: string | null;
  ruvaKsaka?: string;
  iit2l?: string;
}

export function kf2Gek2fP2t6zon(ku1o: Gek2fHasukf2qani = {}): HTMLCanvasElement {
  const o = { w: 0o300, h: 0o460, weh2: "#183828", catu5ek: "#c8a058" as string | null, ruvaKsaka: "", iit2l: "" as string | undefined, ...ku1o };
  if ( o.ruvaKsaka ) {
    ruva = ( s2banaRuva(o.ruvaKsaka) % 0xFFFF0 ) | 1;
  }

  const p2t6zo = document.createElement("canvas");
  p2t6zo.width = o.w;
  p2t6zo.height = o.h;
  const kuns2bana = p2t6zo.getContext("2d")!;
  if ( o.iit2l ) { kuns2bana.fillStyle = o.iit2l; kuns2bana.fillRect(0, 0, o.w, o.h); }
  k2fGek2f(kuns2bana, o.w, o.h, o.weh2, o.catu5ek);
  return p2t6zo;
}

// ⟪ ſ͕ɭᴜ j͑ʃᴜ ʌ Gawekiif 📃 ⟫
const GAWEKIIFDAKAQ = `"j͑ʃꞇȝ","ı],ᴜ }ʃᴜ","ʃɹ ı],ɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬꞇᴜ",sans-serif`;

export function kf2S2banaCac2sex(s2banani: string, ku1o: Gek2fHasukf2qani = {}): THREE.CanvasTexture {
  const hakef = s2banani.split(/\s+/).filter(Boolean);
  const p2t6zo = document.createElement("canvas");
  p2t6zo.width = ku1o.w || 0o140;
  p2t6zo.height = ku1o.h || 0o300;
  const kuns2bana = p2t6zo.getContext("2d")!;
  const cac2sex = new THREE.CanvasTexture(p2t6zo);
  cac2sex.colorSpace = THREE.SRGBColorSpace;
  cac2sex.anisotropy = 4;

  const k2f = (): void => {
    kuns2bana.clearRect(0, 0, p2t6zo.width, p2t6zo.height);
    if ( ku1o.iit2l ) { kuns2bana.fillStyle = ku1o.iit2l; kuns2bana.fillRect(0, 0, p2t6zo.width, p2t6zo.height); }
    if ( hakef.length === 0 ) return;
    kuns2bana.textAlign = "center";
    kuns2bana.textBaseline = "middle";
    kuns2bana.fillStyle = ku1o.weh2 || "#d8b068";
    const REF = 0o100;
    kuns2bana.font = `${REF}px ${GAWEKIIFDAKAQ}`;
    const plosteqSefini = p2t6zo.width * 0o65/0o100;
    const sefini100 = Math.max(1, ...hakef.map(v => kuns2bana.measureText(v).width));
    const fsSefini = REF * plosteqSefini / sefini100;
    const fsL6da = p2t6zo.height / ( 0o40/0o100 + ( hakef.length - 1 ) * 0o7/0o4 + 0o4/0o10 );
    const fs = Math.max(0o10, Math.min(fsSefini, fsL6da));
    const x2paL6da = fs * 0o7/0o4;
    const haca1araSost2 = p2t6zo.height / 2;
    let y = haca1araSost2 + ( hakef.length - 1 ) * x2paL6da / 2;
    for ( const v of hakef ) {
      kuns2bana.font = `${fs}px ${GAWEKIIFDAKAQ}`;
      kuns2bana.fillText(v, p2t6zo.width / 2, y);
      y -= x2paL6da;
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
