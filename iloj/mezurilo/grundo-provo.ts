// ≺⧼ សាកល្បងដី 🏔️ ⧽≻
import * as THREE from "three";
import { kreiScenon } from "../../kantaoj/bildo/scena.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { kreiGrundanKanvason } from "../../eskekoj/komunajxoj/teksajxoj/grundo.js";

// ⟪ ការកំណត់ពីអាសយដ្ឋាន 📃 ⟫
const parametroj = new URLSearchParams(location.search);
const nombro = ( nomo: string, defaŭlto: number ): number => {
  const valoro = parametroj.get(nomo);
  return valoro === null ? defaŭlto : Number(valoro);
};
const sxaltita = ( nomo: string ): boolean => parametroj.get(nomo) !== "0";

const kanvaso = document.getElementById("sceno") as HTMLCanvasElement;
const sistemo = kreiScenon(kanvaso, document.body);
const { bildilo, sceno, fotilo } = sistemo;

// ⟨ កាមេរ៉ានៅកម្រិតដី 📏 ⟩
const x = nombro("x", 0o10);
const z = nombro("z", 0o30);
const y = nombro("y", alteco(x, z) + 0o16/0o10);
fotilo.position.set(x, y, z);
fotilo.rotation.set(nombro("pitch", -0o6) * Math.PI / 0o200,
  nombro("yaw", 0) * Math.PI / 0o200, 0);
fotilo.fov = nombro("fov", 0o70);
fotilo.updateProjectionMatrix();

// ⟪ ការបិទផ្នែក ៗ ដើម្បីរកមូលហេតុ 📃 ⟫
// ⟨ ហេតុអ្វីត្រូវបិទម្តងមួយ 📃 ⟩ ៖ ខ្សែលើដីអាចមកពីវាយនភាព , ពីភាពប្រែប្រួល
// កម្ពស់ ( bump ) , ឬពីផែនទីស្រមោល ។ ការបិទម្តងមួយបង្ហាញថាតើមួយណាជាមូលហេតុ ។ 📃 ⟩
const senTeksajxo = !sxaltita("teksajxo");
const senBumpo = !sxaltita("bumpo");
const senOmbroj = !sxaltita("ombroj");
const senNebulo = !sxaltita("nebulo");
const bumpaForto = nombro("bumpoforto", 0o2/0o10);

const materialoj = new Set<THREE.Material>();
sceno.traverse(o => {
  const m = o as THREE.Mesh;
  if ( m.isMesh !== true ) return;
  const materialo = m.material;
  for ( const unu of Array.isArray(materialo) ? materialo : [ materialo ] ) materialoj.add(unu);
  if ( senOmbroj ) m.castShadow = m.receiveShadow = false;
});
for ( const materialo of materialoj ) {
  const norma = materialo as THREE.MeshStandardMaterial;
  if ( senTeksajxo && norma.map !== null ) { norma.map = null; norma.needsUpdate = true; }
  if ( senBumpo && norma.bumpMap !== null ) { norma.bumpMap = null; norma.needsUpdate = true; }
  if ( norma.bumpMap !== null ) norma.bumpScale = bumpaForto;
}
if ( senOmbroj ) bildilo.shadowMap.enabled = false;
if ( senNebulo ) sceno.fog = null;
if ( parametroj.has("ombrobiaso") ) {
  sistemo.suna.shadow.normalBias = nombro("ombrobiaso", 0);
  sistemo.suna.shadow.bias = nombro("ombrabiaso", 0);
  sistemo.gxisdatigiOmbron(x + 0o1, z + 0o1);
}

// ⟪ ការវាស់ភាពជាប់នៃវាយនភាព 📏 ⟫
// ⟨ ហេតុអ្វីត្រូវវាស់ 📃 ⟩ ៖ វាយនភាពដីលាតរាប់រយដង ។ បើគែមឆ្វេង និងស្ដាំមិនដូចគ្នា ,
// គ្រប់ព្រំដែនក្បឿងបង្ហាញជាខ្សែ ។ ការវាស់នេះបង្ហាញលេខជាក់លាក់ ។ 📃 ⟩
if ( parametroj.has("kudro") ) {
  const kanvasa = kreiGrundanKanvason(true);
  const k = kanvasa.getContext("2d")!;
  const s = kanvasa.width;
  const datumoj = k.getImageData(0, 0, s, s).data;
  const indekso = ( px: number, py: number ): number => ( py * s + px ) * 0o4;
  const diferenco = ( a: number, b: number ): number =>
    Math.abs(datumoj[a] - datumoj[b]) + Math.abs(datumoj[a + 1] - datumoj[b + 1])
    + Math.abs(datumoj[a + 2] - datumoj[b + 2]);
  let maldekstra = 0, supra = 0, apuda = 0;
  for ( let i = 0; i < s; i++ ) {
    maldekstra += diferenco(indekso(0, i), indekso(s - 1, i));
    supra += diferenco(indekso(i, 0), indekso(i, s - 1));
    apuda += diferenco(indekso(i, 0), indekso(i, 1));
  }
  ( window as unknown as { __kudro: unknown } ).__kudro = {
    maldekstra: maldekstra / s, supra: supra / s, apuda: apuda / s,
  };
}

// ⟪ ការគូរ 📃 ⟫
let kadroj = 0;
function ripeti(): void {
  sistemo.aplikiRezimon(0o1/0o2);
  sistemo.gxisdatigiOmbron(x, z);
  bildilo.render(sceno, fotilo);
  kadroj++;
  if ( kadroj === 0o3 ) ( window as unknown as { __grundo: unknown } ).__grundo = { preta: true, kadroj };
  requestAnimationFrame(ripeti);
}
ripeti();

window.addEventListener("resize", () => {
  fotilo.aspect = innerWidth / innerHeight;
  fotilo.updateProjectionMatrix();
  bildilo.setSize(innerWidth, innerHeight);
});
