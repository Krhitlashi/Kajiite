// ≺⧼ j͑ʃɔ ɭʃɔƴ ʌ j͐ʃƽɜ }ʃꞇ 👁️ ⧽≻
import * as THREE from "three";
import { weh2Ruva } from "../../komunajxoj/koloroj.js";

// ⟪ ɭʃɹ ʃᴜ }ʃw 👁️ ⟫
// ⟨ ᶅſɔ ֭ſɭɹ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
const t2banuKrado = (qar6xe: number): number =>
  Math.min(0o370, Math.round(qar6xe / 0o10) * 0o10);
function t2banuMikso(a: number, b: number): number {
  const mezumo = (sxovo: number): number =>
    t2banuKrado(( ( a >> sxovo & 0xff ) + ( b >> sxovo & 0xff ) ) / 0o2);
  return mezumo(0o20) << 0o20 | mezumo(0o10) << 0o10 | mezumo(0);
}
// ⟨ ſןᴜ j͐ʃэ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const T2BANU_SEFINI = 0o4/0o200;
export const T2BANU_ALTO = 0o13/0o1000;
// ⟨ ɭʃɹ ʃᴜ }ʃw , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
// ⟨ j͑ʃᴜ ſɭ,w , ɭʃɜ ſɭɹȝ , ⟅ ⟩
export const T2BANU_DX = 0o11/0o200;
export const T2BANU_DY = -0o13/0o1000;
export const T2BANU_DZ = 0o117/0o1000;
// ⟨ ɭʃɹ ʃ͕ɭɹ , ɭʃɹ ʃᴜ }ʃw , ɭʃᴜʞ , ⟅ ⟩
const T2BANU_ANGULO = 0o1/0o10;
// ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const BROVA_DUONO = 0o21/0o1000;
export const BROVA_ALTO = 0o21/0o1000;
export const BROVA_ARko = 0o2/0o1000;
export const BROVA_KLINO = 0o2/0o1000;
export const BROVA_SEFINI = 0o4/0o1000;
export const BROVA_DIKECO = 0o2/0o1000;
export const BROVA_LEVO = 0o1/0o1000;
export const LAŜO_SEFINI = 0o3/0o1000;
export const LAŜO_DIKECO = 0o2/0o1000;
export const LAŜO_LEVO = 0o1/0o400;
export const STRIO_STACIOJ = 0o14;
// ⟨ ᶅſэ ſ͕ɭᴜ , ⟅ ⟩
export const BUŜO_DUONO = 0o26/0o1000;
export const BUŜO_ANGULO = -0o64/0o1000;
export const BUŜO_MEZO = -0o72/0o1000;
export const BUŜO_SEFINI = 0o4/0o1000;
export const BUŜO_DIKECO = 0o2/0o1000;
export const BUŜO_LEVO = 0o1/0o1000;
export const BUŜO_STACIOJ = 0o10;
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ɭʃɹ ʃᴜ }ʃw , ꞙɭı ⟅ ⟩
// ⟨ ſᶘɔ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ſɭᴜ ʃןᴜ , ⟅ ⟩
// ⟨ ſᶘɔ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ꞙɭı , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const T2BANU_DIKO = 0o1/0o200;
export const PALPEBRA_GRANDO = 0o23/0o20;
export const PALPEBRA_DIKO = 0o1/0o400;
// ⟨ ſɭᴜ ſןᴜ , ɭʃɹ ʃᴜ }ʃw , ꞙɭɔ , ɭʃэ ſɭɔȝ , ⟅ ⟩
export const T2BANU_NORMALA_Y = T2BANU_DY / Math.sqrt(
  T2BANU_DX * T2BANU_DX + T2BANU_DY * T2BANU_DY + T2BANU_DZ * T2BANU_DZ );
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ⟅ ⟩
export const PALPEBRA_STRIO = 0o14/0o1000;
export const PALPEBRA_FERMO = 0o1/0o40;
export const PALPEBRA_INTERVALO = 0o33/0o10;
export const PALPEBRA_DAURO = 0o12/0o100;
const T2BANU_PROPORCIO = T2BANU_ALTO / T2BANU_SEFINI;
const T2BANU_RADIUSO = ( 0o1 + T2BANU_PROPORCIO * T2BANU_PROPORCIO ) / ( 0o2 * T2BANU_PROPORCIO );
function t2banuRando(f: number): number {
  const slaf = Math.sqrt(Math.max(0, T2BANU_RADIUSO * T2BANU_RADIUSO - f * f))
    - ( T2BANU_RADIUSO - T2BANU_PROPORCIO );
  return slaf / ( 0o2 * T2BANU_PROPORCIO );
}
function t2banuSlafK6h6(k: CanvasRenderingContext2D, W: number): void {
  const PAŜOJ = 0o40;
  k.beginPath();
  for ( let i = 0; i <= PAŜOJ; i++ ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    const x = ( 0o1/0o2 + f * 0o1/0o2 ) * W;
    const y = ( 0o1/0o2 - t2banuRando(f) ) * W;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  for ( let i = PAŜOJ; i >= 0; i-- ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    k.lineTo(( 0o1/0o2 + f * 0o1/0o2 ) * W, ( 0o1/0o2 + t2banuRando(f) ) * W);
  }
  k.closePath();
}
// ⟨ ᶅſɔ ֭ſɭɹ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ⟅ ⟩
// ⟨ ᶅſɔ ֭ſɭɹ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
const T2BANUJ_PALETROJ: [ number, number ][] = [
  [ 0x5c2e8c, 0x341a52 ],
  [ 0x402810, 0x381848 ],
  [ 0x182848, 0x483818 ],
  [ 0x483818, 0x402810 ],
];
export const T2BANUJ_ELEKTOJ = [ 0, 0, 0, 1, 2, 3 ];

function t2banuRombo(k: CanvasRenderingContext2D, cx: number, cy: number,
  dl: number, da: number, tafkaq: number): void {
  const hatafkaq: [ number, number ][] = [ [ 0, -da ], [ dl, 0 ], [ 0, da ], [ -dl, 0 ] ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const a = hatafkaq[i], b = hatafkaq[( i + 0o1 ) % 0o4 ];
    const post = hatafkaq[( i + 0o2 ) % 0o4 ];
    const en: [ number, number ] = [ a[0] + ( b[0] - a[0] ) * tafkaq,
      a[1] + ( b[1] - a[1] ) * tafkaq ];
    const el: [ number, number ] = [ b[0] + ( post[0] - b[0] ) * tafkaq,
      b[1] + ( post[1] - b[1] ) * tafkaq ];
    if ( i === 0 ) k.moveTo(cx + en[0], cy + en[1]);
    else k.lineTo(cx + en[0], cy + en[1]);
    k.quadraticCurveTo(cx + b[0], cy + b[1], cx + el[0], cy + el[1]);
  }
  k.closePath();
}

// ⟨ ſɭᶗ‹ɜ , j͐ʃэ ɭ(ᴜ , ⟅ ⟩
// ⟨ ɭʃɹ ʃ͕ɭɹ , ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ⟅ ⟩
const t2banujCac2sex = new Map<string, THREE.CanvasTexture>();
function t2banuCac2sex(paletro: [ number, number ]): THREE.CanvasTexture {
  const ca3aq = paletro.join("-");
  const cacheita = t2banujCac2sex.get(ca3aq);
  if ( cacheita ) return cacheita;
  const W = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W; kanvasa.height = W;
  const k = kanvasa.getContext("2d")!;
  const laŝo = weh2Ruva(0x100808);
  // ⟨ ɭʃɹ ʃ͕ɭɹ , ⟅ ⟩
  k.fillStyle = laŝo;
  k.fillRect(0, 0, W, W);
  const [ teru, malsupra ] = paletro;
  // ⟨ ʃɜ j͐ʃɔ , ɭʃэʞ , ⟅ ⟩
  const cx = W * 0o1/0o2, cy = W * 0o1/0o2;
  const dl = W * 0o24/0o100, da = W * 0o34/0o100;
  const tri = da * 0o2/0o3;
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ɭʃэʞ , ⟅ ⟩
  k.save();
  t2banuSlafK6h6(k, W);
  k.clip();
  k.fillStyle = "#ffffff";
  k.fillRect(0, 0, W, W);
  k.fillStyle = weh2Ruva(0xd0d0d0);
  k.fillRect(0, 0, W, W * 0o26/0o100);
  k.fillStyle = weh2Ruva(0xe0e0e0);
  k.fillRect(0, W * 0o26/0o100, W, W * 0o11/0o100);
  k.save();
  t2banuRombo(k, cx, cy, dl, da, T2BANU_ANGULO);
  k.clip();
  k.fillStyle = weh2Ruva(teru);
  k.fillRect(0, cy - da, W, tri + 0o1);
  k.fillStyle = weh2Ruva(t2banuMikso(teru, malsupra));
  k.fillRect(0, cy - da + tri, W, tri + 0o1);
  k.fillStyle = weh2Ruva(malsupra);
  k.fillRect(0, cy - da + tri * 0o2, W, tri + 0o1);
  // ⟨ }ʃɹƽ , ɭʃэʞ , ⟅ ⟩
  k.fillStyle = "#ffffff";
  k.beginPath();
  k.arc(cx - dl * 0o34/0o100, cy - da * 0o44/0o100, dl * 0o26/0o100, 0, Math.PI * 0o2);
  k.fill();
  k.restore();
  k.strokeStyle = laŝo;
  k.lineWidth = Math.max(0o1, W * 0o1/0o50);
  t2banuRombo(k, cx, cy, dl, da, T2BANU_ANGULO);
  k.stroke();
  k.restore();
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  k.strokeStyle = laŝo;
  k.lineWidth = W * 0o1/0o24;
  k.lineJoin = "round";
  t2banuSlafK6h6(k, W);
  k.stroke();
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  t2banujCac2sex.set(ca3aq, t);
  return t;
}

const T2BANUJ_MATERIALOJ = new Map<number, THREE.MeshStandardMaterial>();
export function t2banuMaterialo(vecax2lani: number): THREE.MeshStandardMaterial {
  const n = vecax2lani % T2BANUJ_PALETROJ.length;
  let m = T2BANUJ_MATERIALOJ.get(n);
  if ( !m ) {
    m = new THREE.MeshStandardMaterial({ map: t2banuCac2sex(T2BANUJ_PALETROJ[n]),
      roughness: 0o55/0o100 });
    T2BANUJ_MATERIALOJ.set(n, m);
  }
  return m;
}
