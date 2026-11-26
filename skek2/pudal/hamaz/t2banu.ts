// ≺⧼ j͑ʃɔ ɭʃɔƴ ʌ j͐ʃƽɜ }ʃꞇ 👁️ ⧽≻
import * as THREE from "three";
import { weh2Ruva } from "../../x2x2q/haweh2.js";

// ⟪ ɭʃɹ ʃᴜ }ʃw 👁️ ⟫
// ⟨ ᶅſɔ ֭ſɭɹ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
const t2banuQox2n2k = (qar6xe: number): number =>
  Math.min(0o370, Math.round(qar6xe / 0o10) * 0o10);
function t2banuMikso(a: number, b: number): number {
  const mezumo = (santa: number): number =>
    t2banuQox2n2k(( ( a >> santa & 0xff ) + ( b >> santa & 0xff ) ) / 0o2);
  return mezumo(0o20) << 0o20 | mezumo(0o10) << 0o10 | mezumo(0o0);
}
// ⟨ ſןᴜ j͐ʃэ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const T2BANUSEFINI = 0o4/0o200;
export const T2BANUL6DA = 0o13/0o1000;
// ⟨ ɭʃɹ ʃᴜ }ʃw , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
// ⟨ j͑ʃᴜ ſɭ,w , ɭʃɜ ſɭɹȝ , ⟅ ⟩
export const T2BANUDX = 0o11/0o200;
export const T2BANUDY = -0o13/0o1000;
export const T2BANUDZ = 0o117/0o1000;
// ⟨ ɭʃɹ ʃ͕ɭɹ , ɭʃɹ ʃᴜ }ʃw , ɭʃᴜʞ , ⟅ ⟩
const T2BANUANGULO = 0o1/0o10;
// ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const BROVAP2SOMANI = 0o21/0o1000;
export const BROVAL6DA = 0o21/0o1000;
export const BROVAARko = 0o2/0o1000;
export const BROVAKLINO = 0o2/0o1000;
export const BROVASEFINI = 0o4/0o1000;
export const BROVADIKECO = 0o2/0o1000;
export const BROVALEVO = 0o1/0o1000;
export const LAŜOSEFINI = 0o3/0o1000;
export const LAŜODIKECO = 0o2/0o1000;
export const LAŜOLEVO = 0o1/0o400;
export const STRIOKA5ASEXAZ = 0o14;
// ⟨ ᶅſэ ſ͕ɭᴜ , ⟅ ⟩
export const BUŜOP2SOMANI = 0o26/0o1000;
export const BUŜOANGULO = -0o64/0o1000;
export const BUŜOMEZO = -0o72/0o1000;
export const BUŜOSEFINI = 0o4/0o1000;
export const BUŜODIKECO = 0o2/0o1000;
export const BUŜOLEVO = 0o1/0o1000;
export const BUŜOSTACIOJ = 0o10;
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ɭʃɹ ʃᴜ }ʃw , ꞙɭı ⟅ ⟩
// ⟨ ſᶘɔ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ſɭᴜ ʃןᴜ , ⟅ ⟩
// ⟨ ſᶘɔ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ꞙɭı , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
export const T2BANUDIKO = 0o1/0o200;
export const PALPEBRAGRANDO = 0o23/0o20;
export const PALPEBZACE = 0o1/0o400;
// ⟨ ſɭᴜ ſןᴜ , ɭʃɹ ʃᴜ }ʃw , ꞙɭɔ , ɭʃэ ſɭɔȝ , ⟅ ⟩
export const T2BANUNORMALAY = T2BANUDY / Math.sqrt(
  T2BANUDX * T2BANUDX + T2BANUDY * T2BANUDY + T2BANUDZ * T2BANUDZ );
// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ , ꞙɭɔ , ⟅ ⟩
export const PALPEBRASTRIO = 0o14/0o1000;
export const PALPEBRAPUKXEO = 0o1/0o40;
export const PALPEBRAINTERVALO = 0o33/0o10;
export const PALPEBRADAURO = 0o12/0o100;
const T2BANUPROPORCIO = T2BANUL6DA / T2BANUSEFINI;
const T2BANURADIUSO = ( 0o1 + T2BANUPROPORCIO * T2BANUPROPORCIO ) / ( 0o2 * T2BANUPROPORCIO );
function t2banuRando(f: number): number {
  const slaf = Math.sqrt(Math.max(0o0, T2BANURADIUSO * T2BANURADIUSO - f * f))
    - ( T2BANURADIUSO - T2BANUPROPORCIO );
  return slaf / ( 0o2 * T2BANUPROPORCIO );
}
function t2banuSlafK6h6(k: CanvasRenderingContext2D, W: number): void {
  const PAŜOJ = 0o40;
  k.beginPath();
  for ( let i = 0o0; i <= PAŜOJ; i++ ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    const x = ( 0o1/0o2 + f * 0o1/0o2 ) * W;
    const y = ( 0o1/0o2 - t2banuRando(f) ) * W;
    if ( i === 0o0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  for ( let i = PAŜOJ; i >= 0o0; i-- ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    k.lineTo(( 0o1/0o2 + f * 0o1/0o2 ) * W, ( 0o1/0o2 + t2banuRando(f) ) * W);
  }
  k.closePath();
}
// ⟨ ᶅſɔ ֭ſɭɹ , j͑ʃᴜ ſɭᴜ ɭʃɹ , ⟅ ⟩
// ⟨ ᶅſɔ ֭ſɭɹ , ꞙɭı , ꞙɭı , ꞙɭı , ⟅ ⟩
const T2BANUJHAWEH2CAX2LOJ: [ number, number ][] = [
  [ 0x582888, 0x301850 ],
  [ 0x402810, 0x381848 ],
  [ 0x182848, 0x483818 ],
  [ 0x483818, 0x402810 ],
];
export const T2BANUJSUKF2QOJ = [ 0o0, 0o0, 0o0, 0o1, 0o2, 0o3 ];

function t2banuRombo(k: CanvasRenderingContext2D, cx: number, cy: number,
  dl: number, da: number, tafkaq: number): void {
  const hatafkaq: [ number, number ][] = [ [ 0o0, -da ], [ dl, 0o0 ], [ 0o0, da ], [ -dl, 0o0 ] ];
  k.beginPath();
  for ( let i = 0o0; i < 0o4; i++ ) {
    const a = hatafkaq[i], b = hatafkaq[( i + 0o1 ) % 0o4 ];
    const post = hatafkaq[( i + 0o2 ) % 0o4 ];
    const en: [ number, number ] = [ a[0o0] + ( b[0o0] - a[0o0] ) * tafkaq,
      a[0o1] + ( b[0o1] - a[0o1] ) * tafkaq ];
    const el: [ number, number ] = [ b[0o0] + ( post[0o0] - b[0o0] ) * tafkaq,
      b[0o1] + ( post[0o1] - b[0o1] ) * tafkaq ];
    if ( i === 0o0 ) k.moveTo(cx + en[0o0], cy + en[0o1]);
    else k.lineTo(cx + en[0o0], cy + en[0o1]);
    k.quadraticCurveTo(cx + b[0o0], cy + b[0o1], cx + el[0o0], cy + el[0o1]);
  }
  k.closePath();
}

// ⟨ ſɭᶗ‹ɜ , j͐ʃэ ɭ(ᴜ , ⟅ ⟩
// ⟨ ɭʃɹ ʃ͕ɭɹ , ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ⟅ ⟩
const t2banujCac2sex = new Map<string, THREE.CanvasTexture>();
function t2banuCac2sex(weh2Cax2lo: [ number, number ]): THREE.CanvasTexture {
  const ca3aq = weh2Cax2lo.join("-");
  const cacheita = t2banujCac2sex.get(ca3aq);
  if ( cacheita ) return cacheita;
  const W = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W; kanvasa.height = W;
  const k = kanvasa.getContext("2d")!;
  const laŝo = weh2Ruva(0x100808);
  // ⟨ ɭʃɹ ʃ͕ɭɹ , ⟅ ⟩
  k.fillStyle = laŝo;
  k.fillRect(0o0, 0o0, W, W);
  const [ teru, maltik ] = weh2Cax2lo;
  // ⟨ ʃɜ j͐ʃɔ , ɭʃэʞ , ⟅ ⟩
  const cx = W * 0o1/0o2, cy = W * 0o1/0o2;
  const dl = W * 0o24/0o100, da = W * 0o34/0o100;
  const tri = da * 0o2/0o3;
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ɭʃэʞ , ⟅ ⟩
  k.save();
  t2banuSlafK6h6(k, W);
  k.clip();
  k.fillStyle = "#ffffff";
  k.fillRect(0o0, 0o0, W, W);
  k.fillStyle = weh2Ruva(0xd0d0d0);
  k.fillRect(0o0, 0o0, W, W * 0o26/0o100);
  k.fillStyle = weh2Ruva(0xe0e0e0);
  k.fillRect(0o0, W * 0o26/0o100, W, W * 0o11/0o100);
  k.save();
  t2banuRombo(k, cx, cy, dl, da, T2BANUANGULO);
  k.clip();
  k.fillStyle = weh2Ruva(teru);
  k.fillRect(0o0, cy - da, W, tri + 0o1);
  k.fillStyle = weh2Ruva(t2banuMikso(teru, maltik));
  k.fillRect(0o0, cy - da + tri, W, tri + 0o1);
  k.fillStyle = weh2Ruva(maltik);
  k.fillRect(0o0, cy - da + tri * 0o2, W, tri + 0o1);
  // ⟨ }ʃɹƽ , ɭʃэʞ , ⟅ ⟩
  k.fillStyle = "#ffffff";
  k.beginPath();
  k.arc(cx - dl * 0o34/0o100, cy - da * 0o44/0o100, dl * 0o26/0o100, 0o0, Math.PI * 0o2);
  k.fill();
  k.restore();
  k.strokeStyle = laŝo;
  k.lineWidth = Math.max(0o1, W * 0o1/0o50);
  t2banuRombo(k, cx, cy, dl, da, T2BANUANGULO);
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

const T2BANUJHAPUKEK = new Map<number, THREE.MeshStandardMaterial>();
export function t2banuPukek(vecax2lani: number): THREE.MeshStandardMaterial {
  const n = vecax2lani % T2BANUJHAWEH2CAX2LOJ.length;
  let m = T2BANUJHAPUKEK.get(n);
  if ( !m ) {
    m = new THREE.MeshStandardMaterial({ map: t2banuCac2sex(T2BANUJHAWEH2CAX2LOJ[n]),
      roughness: 0o55/0o100 });
    T2BANUJHAPUKEK.set(n, m);
  }
  return m;
}
