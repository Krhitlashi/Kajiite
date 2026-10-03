// ≺⧼ វាយនភាពមុខ 👁️ ⧽≻
import * as THREE from "three";
import { deksesuma } from "../../komunajxoj/koloroj.js";

// ⟪ ភ្នែក 👁️ ⟫
// ⟨ ពណ៌ភ្នែក 📃 ⟩
const okulaKrado = (kanalo: number): number =>
  Math.min(0o370, Math.round(kanalo / 0o10) * 0o10);
function okulaMikso(a: number, b: number): number {
  const mezumo = (sxovo: number): number =>
    okulaKrado(( ( a >> sxovo & 0xff ) + ( b >> sxovo & 0xff ) ) / 0o2);
  return mezumo(0o20) << 0o20 | mezumo(0o10) << 0o10 | mezumo(0);
}
// ⟨ មាត្រភ្នែក 📃 ⟩
export const OKULA_LARĜO = 0o4/0o200;
export const OKULA_ALTO = 0o13/0o1000;
// ⟨ ភ្នែកឡើងលើ 📃 ⟩
// ⟨ ជម្រៅតាមលលាដ៍ 📃 ⟩
export const OKULA_DX = 0o11/0o200;
export const OKULA_DY = -0o13/0o1000;
export const OKULA_DZ = 0o117/0o1000;
// ⟨ ជ្រុងរង្វង់ភ្នែកនៅស្រួច 📃 ⟩
const OKULA_ANGULO = 0o1/0o10;
// ⟨ ចិញ្ចើម និងរោមភ្នែក 📃 ⟩
export const BROVA_DUONO = 0o21/0o1000;
export const BROVA_ALTO = 0o21/0o1000;
export const BROVA_ARko = 0o2/0o1000;
export const BROVA_KLINO = 0o2/0o1000;
export const BROVA_LARĜO = 0o4/0o1000;
export const BROVA_DIKECO = 0o2/0o1000;
export const BROVA_LEVO = 0o1/0o1000;
export const LAŜO_LARĜO = 0o3/0o1000;
export const LAŜO_DIKECO = 0o2/0o1000;
export const LAŜO_LEVO = 0o1/0o400;
export const STRIO_STACIOJ = 0o14;
// ⟨ មាត់ 📃 ⟩
export const BUŜO_DUONO = 0o26/0o1000;
export const BUŜO_ANGULO = -0o64/0o1000;
export const BUŜO_MEZO = -0o72/0o1000;
export const BUŜO_LARĜO = 0o4/0o1000;
export const BUŜO_DIKECO = 0o2/0o1000;
export const BUŜO_LEVO = 0o1/0o1000;
export const BUŜO_STACIOJ = 0o10;
// ⟨ ត្របកភ្នែក 📃 ⟩
// ⟨ ត្របកភ្នែកជាច្បាប់ចម្លងភ្នែក 📃 ⟩
// ⟨ ហេតុអ្វីត្របកភ្នែកស្កេល មិនរអិល 📃 ⟩
// ⟨ ហេតុអ្វីត្របកភ្នែកនៅមុខ 📃 ⟩
export const OKULA_DIKO = 0o1/0o200;
export const PALPEBRA_GRANDO = 0o23/0o20;
export const PALPEBRA_DIKO = 0o1/0o400;
// ⟨ ន័រម៉ាល់ភ្នែកមិនផ្តេក 📃 ⟩
export const OKULA_NORMALA_Y = OKULA_DY / Math.sqrt(
  OKULA_DX * OKULA_DX + OKULA_DY * OKULA_DY + OKULA_DZ * OKULA_DZ );
// ⟨ ខ្សែត្របកភ្នែកបិទ 📃 ⟩
export const PALPEBRA_STRIO = 0o14/0o1000;
export const PALPEBRA_FERMO = 0o1/0o40;
export const PALPEBRA_INTERVALO = 0o33/0o10;
export const PALPEBRA_DAURO = 0o12/0o100;
const OKULA_PROPORCIO = OKULA_ALTO / OKULA_LARĜO;
const OKULA_RADIUSO = ( 0o1 + OKULA_PROPORCIO * OKULA_PROPORCIO ) / ( 0o2 * OKULA_PROPORCIO );
function okulaRando(f: number): number {
  const folio = Math.sqrt(Math.max(0, OKULA_RADIUSO * OKULA_RADIUSO - f * f))
    - ( OKULA_RADIUSO - OKULA_PROPORCIO );
  return folio / ( 0o2 * OKULA_PROPORCIO );
}
function okulaFoliaVojo(k: CanvasRenderingContext2D, W: number): void {
  const PAŜOJ = 0o40;
  k.beginPath();
  for ( let i = 0; i <= PAŜOJ; i++ ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    const x = ( 0o1/0o2 + f * 0o1/0o2 ) * W;
    const y = ( 0o1/0o2 - okulaRando(f) ) * W;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  for ( let i = PAŜOJ; i >= 0; i-- ) {
    const f = -0o1 + i / PAŜOJ * 0o2;
    k.lineTo(( 0o1/0o2 + f * 0o1/0o2 ) * W, ( 0o1/0o2 + okulaRando(f) ) * W);
  }
  k.closePath();
}
// ⟨ បាលេត 📃 ⟩
// ⟨ បាលេតទីមួយជាពណ៌ស្វាយ ហើយជាញឹកញាប់បំផុត 📃 ⟩
const OKULAJ_PALETROJ: [ number, number ][] = [
  [ 0x5c2e8c, 0x341a52 ],
  [ 0x402810, 0x381848 ],
  [ 0x182848, 0x483818 ],
  [ 0x483818, 0x402810 ],
];
export const OKULAJ_ELEKTOJ = [ 0, 0, 0, 1, 2, 3 ];

function okulaRombo(k: CanvasRenderingContext2D, cx: number, cy: number,
  dl: number, da: number, angulo: number): void {
  const anguloj: [ number, number ][] = [ [ 0, -da ], [ dl, 0 ], [ 0, da ], [ -dl, 0 ] ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const a = anguloj[i], b = anguloj[( i + 0o1 ) % 0o4 ];
    const post = anguloj[( i + 0o2 ) % 0o4 ];
    const en: [ number, number ] = [ a[0] + ( b[0] - a[0] ) * angulo,
      a[1] + ( b[1] - a[1] ) * angulo ];
    const el: [ number, number ] = [ b[0] + ( post[0] - b[0] ) * angulo,
      b[1] + ( post[1] - b[1] ) * angulo ];
    if ( i === 0 ) k.moveTo(cx + en[0], cy + en[1]);
    else k.lineTo(cx + en[0], cy + en[1]);
    k.quadraticCurveTo(cx + b[0], cy + b[1], cx + el[0], cy + el[1]);
  }
  k.closePath();
}

// ⟨ ពេជ្រតូចជាងកម្ពស់ 📃 ⟩
// ⟨ រង្វង់ភ្នែកធំជាង 📃 ⟩
const okulajTeksajxoj = new Map<string, THREE.CanvasTexture>();
function okulaTeksajxo(paletro: [ number, number ]): THREE.CanvasTexture {
  const klavo = paletro.join("-");
  const cacheita = okulajTeksajxoj.get(klavo);
  if ( cacheita ) return cacheita;
  const W = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = W; kanvasa.height = W;
  const k = kanvasa.getContext("2d")!;
  const laŝo = deksesuma(0x100808);
  // ⟨ ស៊ុម 📃 ⟩
  k.fillStyle = laŝo;
  k.fillRect(0, 0, W, W);
  const [ supra, malsupra ] = paletro;
  // ⟨ ផ្នែកសបានភ្លឺ 📃 ⟩
  const cx = W * 0o1/0o2, cy = W * 0o1/0o2;
  const dl = W * 0o24/0o100, da = W * 0o34/0o100;
  const tri = da * 0o2/0o3;
  // ⟨ គ្រាប់ភ្នែកស 📃 ⟩
  k.save();
  okulaFoliaVojo(k, W);
  k.clip();
  k.fillStyle = "#FFFFFF";
  k.fillRect(0, 0, W, W);
  k.fillStyle = deksesuma(0xd0d0d0);
  k.fillRect(0, 0, W, W * 0o26/0o100);
  k.fillStyle = deksesuma(0xe0e0e0);
  k.fillRect(0, W * 0o26/0o100, W, W * 0o11/0o100);
  k.save();
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.clip();
  k.fillStyle = deksesuma(supra);
  k.fillRect(0, cy - da, W, tri + 0o1);
  k.fillStyle = deksesuma(okulaMikso(supra, malsupra));
  k.fillRect(0, cy - da + tri, W, tri + 0o1);
  k.fillStyle = deksesuma(malsupra);
  k.fillRect(0, cy - da + tri * 0o2, W, tri + 0o1);
  // ⟨ ចំណុចពន្លឺ 📃 ⟩
  k.fillStyle = "#FFFFFF";
  k.beginPath();
  k.arc(cx - dl * 0o34/0o100, cy - da * 0o44/0o100, dl * 0o26/0o100, 0, Math.PI * 0o2);
  k.fill();
  k.restore();
  k.strokeStyle = laŝo;
  k.lineWidth = Math.max(0o1, W * 0o1/0o50);
  okulaRombo(k, cx, cy, dl, da, OKULA_ANGULO);
  k.stroke();
  k.restore();
  // ⟨ ខ្សែចំណង 📃 ⟩
  k.strokeStyle = laŝo;
  k.lineWidth = W * 0o1/0o24;
  k.lineJoin = "round";
  okulaFoliaVojo(k, W);
  k.stroke();
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  okulajTeksajxoj.set(klavo, t);
  return t;
}

const OKULAJ_MATERIALOJ = new Map<number, THREE.MeshStandardMaterial>();
export function okulaMaterialo(indekso: number): THREE.MeshStandardMaterial {
  const n = indekso % OKULAJ_PALETROJ.length;
  let m = OKULAJ_MATERIALOJ.get(n);
  if ( !m ) {
    m = new THREE.MeshStandardMaterial({ map: okulaTeksajxo(OKULAJ_PALETROJ[n]),
      roughness: 0o55/0o100 });
    OKULAJ_MATERIALOJ.set(n, m);
  }
  return m;
}
