// ≺⧼ ដែនមើល 🔭 ⧽≻
// ⟨ ការបែងចែកលំហ 📃 ⟩
// ⟨ ដែនកំណត់ចម្ងាយ 📃 ⟩
import * as THREE from "three";
import { NEBULA_DENSO_MIN, nebulVidebleco } from "./scena/paletroj.js";

// ⟪ ការកំណត់ 📃 ⟫
// ⟨ ក្រឡាលំហ 📃 ⟩
const CELA_TABELO = 0o100;
const MAKS_CXELOJ = 0o10;
const DIVIDA_MINIMUMO = 0o10;
const DIVIDA_FAKTORO = 0o3/0o2;

// ⟨ ដែនកំណត់ចម្ងាយ 📃 ⟩
// ⟨ មាត្រខាងក្រោយដែនកំណត់អតិបរមា 📃 ⟩
// ⟨ លែងមានលេខពីរសម្រាប់រឿងតែមួយ 📃 ⟩
// ⟨ វាស់វែង 📃 ⟩
const LIMO_FAKTORO = 0o100;
const MIN_LIMO = 0o100;
const MAKS_LIMO = Math.round(nebulVidebleco(NEBULA_DENSO_MIN));
// ⟨ អ៊ីស្តេរេស៊ីស 📃 ⟩
const LIMO_HISTEREZO = 0o11/0o10;

interface Vidlima {
  obj: THREE.Object3D;
  gepatro: THREE.Object3D | null;
  limo: number;
  limoPluso: number;
  radiuso: number;
  cx: number;
  cz: number;
  sekvi: boolean;
  subLimoj: SubLimo[];
}

const registro: Vidlima[] = [];
let aktiva = true;
let spacigita = false;

const SFERO_CENTRO = new THREE.Vector3();

function limoDeGrandeco(grandeco: number): number {
  return Math.min(MAKS_LIMO, Math.max(MIN_LIMO, grandeco * LIMO_FAKTORO));
}

export function sferoDe(obj: THREE.Object3D): THREE.Sphere | null {
  const instancigita = obj as THREE.InstancedMesh;
  if (instancigita.isInstancedMesh) {
    if (instancigita.boundingSphere === null) instancigita.computeBoundingSphere();
    return instancigita.boundingSphere;
  }
  const geometria = obj as THREE.Mesh;
  if (geometria.geometry === undefined) return null;
  if (geometria.geometry.boundingSphere === null) geometria.geometry.computeBoundingSphere();
  return geometria.geometry.boundingSphere;
}

// ⟨ ហេតុអ្វីប្រភេទមួយ 📃 ⟩
interface SubLimo {
  eco: "ombro" | "videbleco";
  limo: number;
  meshoj: THREE.Mesh[];
  aktiva: boolean;
}

function aplikiSubLimon(s: SubLimo, aktiva: boolean): void {
  if (aktiva === s.aktiva) return;
  s.aktiva = aktiva;
  if (s.eco === "ombro") for (let i = 0; i < s.meshoj.length; i++) s.meshoj[i].castShadow = aktiva;
  else for (let i = 0; i < s.meshoj.length; i++) s.meshoj[i].visible = aktiva;
}

function radiusoDe(obj: THREE.Object3D, sfero: THREE.Sphere | null = sferoDe(obj)): number {
  return sfero === null ? 0 : sfero.radius * obj.matrixWorld.getMaxScaleOnAxis();
}

function aldonu(obj: THREE.Object3D, limo: number, radiuso: number,
  cx: number, cz: number, sekvi: boolean, subLimoj: SubLimo[] = []): void {
  // ⟨ វត្ថុស្ងៀមកក 📃 ⟩
  if (!sekvi) obj.matrixWorldAutoUpdate = false;
  registro.push({ obj, gepatro: obj.parent, limo, limoPluso: limo * LIMO_HISTEREZO, radiuso, cx, cz, sekvi,
    subLimoj });
}

export function registriVidlimon(obj: THREE.Object3D, limo: number): void {
  if (!obj.visible) return;
  obj.updateWorldMatrix(true, false);
  const sfero = sferoDe(obj);
  if (sfero === null) return;
  SFERO_CENTRO.copy(sfero.center).applyMatrix4(obj.matrixWorld);
  aldonu(obj, limo, radiusoDe(obj, sfero), SFERO_CENTRO.x, SFERO_CENTRO.z, false);
}

// ⟨ ព័ត៌មានលម្អិតរូប 📃 ⟩
// ⟨ វាស់វែង 📃 ⟩
const VIVANTA_DETALO = 0o44;
const KERNAJ_PARTOJ = 0o12;

export function sekviVidlimon(obj: THREE.Object3D, limo: number, radiuso = 0o4,
  ombraLimo = 0, detalaLimo = 0): void {
  const subLimoj: SubLimo[] = [];
  // ⟨ ស្រមោល 📃 ⟩
  if (ombraLimo > 0) {
    const ombraj: THREE.Mesh[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh === true && m.castShadow) ombraj.push(m);
    });
    if (ombraj.length > 0) subLimoj.push({ eco: "ombro", limo: ombraLimo, meshoj: ombraj, aktiva: true });
  }
  // ⟨ ផ្នែកតូចៗ 📃 ⟩
  if (detalaLimo > 0) {
    obj.updateWorldMatrix(true, true);
    const partoj: { m: THREE.Mesh; r: number }[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh !== true) return;
      partoj.push({ m, r: radiusoDe(m) });
    });
    partoj.sort((a, b) => b.r - a.r);
    const detala: THREE.Mesh[] = [];
    for (let i = KERNAJ_PARTOJ; i < partoj.length; i++) detala.push(partoj[i].m);
    if (detala.length > 0) subLimoj.push({ eco: "videbleco", limo: detalaLimo, meshoj: detala, aktiva: true });
  }
  aldonu(obj, limo, radiuso, obj.position.x, obj.position.z, true, subLimoj);
}

const VIVANTA_LIMO = 0o200;
const VIVANTA_OMBRO = 0o50;

// ⟨ ហេតុអ្វីពួកវាត្រូវការចុះបញ្ជីផ្ទាល់ 📃 ⟩
// ⟨ ដែនកំណត់មកពីទំហំផ្ទាល់ 📃 ⟩
// ⟨ ការការពារជើងមេឃ 📃 ⟩
export function registriKunigitajnMeshojn(radiko: THREE.Object3D, nomo = "kunigita"): number {
  const meshoj: THREE.Mesh[] = [];
  radiko.traverse(o => {
    const m = o as THREE.Mesh;
    if (m.isMesh === true && (m as THREE.InstancedMesh).isInstancedMesh !== true && o.name === nomo) meshoj.push(m);
  });
  let registritaj = 0;
  for (const m of meshoj) {
    m.updateWorldMatrix(true, false);
    if (sferoDe(m) === null) continue;
    const radiuso = radiusoDe(m);
    if (radiuso >= MAKS_LIMO) continue;
    registriVidlimon(m, limoDeGrandeco(radiuso));
    registritaj++;
  }
  return registritaj;
}

// ⟨ ដែនកំណត់ស្រមោលរបស់មានជីវិត ⟩
export function registriVivantojn(opcioj: {
  npcoj: { group: THREE.Object3D }[];
  kanuoj: { group: THREE.Object3D }[];
  bestoj: { grupo: THREE.Object3D }[];
  petreloj: { grupo: THREE.Object3D }[];
}): void {
  for (const n of opcioj.npcoj) sekviVidlimon(n.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO, VIVANTA_DETALO);
  for (const k of opcioj.kanuoj) sekviVidlimon(k.group, VIVANTA_LIMO, 0o4, VIVANTA_OMBRO, VIVANTA_DETALO);
  for (const b of opcioj.bestoj) sekviVidlimon(b.grupo, VIVANTA_LIMO);
  for (const p of opcioj.petreloj) sekviVidlimon(p.grupo, VIVANTA_LIMO);
}

// ⟪ ការដកអ្វីដែលលាក់ចេញ 📃 ⟫
// ⟨ ហេតុអ្វីការមើលឃើញមិនគ្រប់ 📃 ⟩
function forprenu(obj: THREE.Object3D): void {
  if (obj.parent !== null) obj.removeFromParent();
}
function reAlDonu(obj: THREE.Object3D, gepatro: THREE.Object3D | null): void {
  if (obj.parent === null && gepatro !== null) gepatro.add(obj);
}

export function gxisdatigiVidlimojn(x: number, z: number): void {
  if (!aktiva) return;
  for (let i = 0; i < registro.length; i++) {
    const e = registro[i];
    const obj = e.obj;
    let cx = e.cx, cz = e.cz;
    if (e.sekvi) { cx = obj.position.x; cz = obj.position.z; }
    const limo = (obj.visible ? e.limoPluso : e.limo) + e.radiuso;
    const dx = cx - x, dz = cz - z;
    const disto2 = dx * dx + dz * dz;
    const videbla = disto2 <= limo * limo;
    if (videbla !== obj.visible) {
      obj.visible = videbla;
      if (e.sekvi) {
        if (videbla) reAlDonu(obj, e.gepatro);
        else forprenu(obj);
      }
    }
    // ⟨ ដែនកំណត់បន្ថែម 📃 ⟩
    for (let k = 0; k < e.subLimoj.length; k++) {
      const s = e.subLimoj[k];
      const r = s.limo + e.radiuso;
      aplikiSubLimon(s, disto2 <= r * r);
    }
  }
}

export function vidlimojnMalŝalti(): void {
  aktiva = false;
  for (let i = 0; i < registro.length; i++) {
    const e = registro[i];
    e.obj.visible = true;
    if (e.sekvi) reAlDonu(e.obj, e.gepatro);
    for (let k = 0; k < e.subLimoj.length; k++) aplikiSubLimon(e.subLimoj[k], true);
  }
}

export function vidlimojnŜalti(): void {
  aktiva = true;
}

export function vidlimaStatistiko(): { eroj: number; videblaj: number; limoj: number[] } {
  let videblaj = 0;
  const limoj = new Set<number>();
  for (const e of registro) {
    if (e.obj.visible) videblaj++;
    limoj.add(e.limo);
  }
  return { eroj: registro.length, videblaj, limoj: [ ...limoj ].sort((a, b) => a - b) };
}

// ⟪ ការបែងចែកលំហ 📃 ⟫
export function spacigiInstancojn(radiko: THREE.Object3D,
  celtabelo = CELA_TABELO): { tavoloj: number; pecoj: number } {
  if (spacigita) return { tavoloj: 0, pecoj: 0 };
  spacigita = true;

  const tavoloj: THREE.InstancedMesh[] = [];
  radiko.traverse(o => {
    const instancigita = o as THREE.InstancedMesh;
    if (instancigita.isInstancedMesh && instancigita.frustumCulled !== false) tavoloj.push(instancigita);
  });
  radiko.updateMatrixWorld(true);

  let dividitaj = 0, pecoj = 0;
  const ujoj = new Map<number, number[]>();
  for (const m of tavoloj) {
    const nombro = m.count;
    if (nombro < DIVIDA_MINIMUMO || !m.visible) continue;
    if (m.boundingSphere === null) m.computeBoundingSphere();
    if (m.geometry.boundingSphere === null) m.geometry.computeBoundingSphere();
    const amplekso = m.boundingSphere!.radius * 2;
    // ⟨ ទំហំក្រឡាផ្ទាល់ 📃 ⟩
    const propraCelo = m.userData.vidlimaCelo;
    const tabelo = typeof propraCelo === "number"
      ? propraCelo
      : Math.max(celtabelo, amplekso / MAKS_CXELOJ);
    if (amplekso <= tabelo * DIVIDA_FAKTORO) continue;

    // ⟨ ការខ្ចាត់ខ្ចាយ 📃 ⟩
    const areo = m.instanceMatrix.array as Float32Array;
    ujoj.clear();
    let maksSkalo = 0;
    for (let i = 0; i < nombro; i++) {
      const o = i * 16;
      const skalo = Math.hypot(areo[o], areo[o + 1], areo[o + 2]);
      if (skalo > maksSkalo) maksSkalo = skalo;
      const ŝlosilo = Math.floor(areo[o + 12] / tabelo) * 0o100000 + Math.floor(areo[o + 14] / tabelo);
      let ujo = ujoj.get(ŝlosilo);
      if (ujo === undefined) ujoj.set(ŝlosilo, ujo = []);
      ujo.push(i);
    }
    const gepatra = m.parent;
    if (gepatra === null || ujoj.size < 2) continue;

    // ⟨ ដែនកំណត់ផ្ទាល់នៃស្រទាប់ 📃 ⟩
    const propraLimo = m.userData.vidlimo;
    const limo = typeof propraLimo === "number"
      ? propraLimo
      : limoDeGrandeco(m.geometry.boundingSphere!.radius * maksSkalo);
    const koloroj = m.instanceColor;
    for (const indeksoj of ujoj.values()) {
      const peco = new THREE.InstancedMesh(m.geometry, m.material, indeksoj.length);
      const pecaAreo = peco.instanceMatrix.array as Float32Array;
      for (let k = 0; k < indeksoj.length; k++) {
        pecaAreo.set(areo.subarray(indeksoj[k] * 16, indeksoj[k] * 16 + 16), k * 16);
      }
      peco.count = indeksoj.length;
      peco.instanceMatrix.needsUpdate = true;
      if (koloroj !== null) {
        const n = koloroj.itemSize;
        const fontaAreo = koloroj.array as Float32Array;
        const pecaAreo2 = new Float32Array(indeksoj.length * n);
        for (let k = 0; k < indeksoj.length; k++) {
          pecaAreo2.set(fontaAreo.subarray(indeksoj[k] * n, indeksoj[k] * n + n), k * n);
        }
        const pecaKoloro = new THREE.InstancedBufferAttribute(pecaAreo2, n);
        pecaKoloro.needsUpdate = true;
        peco.instanceColor = pecaKoloro;
      }
      peco.castShadow = m.castShadow;
      peco.receiveShadow = m.receiveShadow;
      peco.renderOrder = m.renderOrder;
      peco.visible = m.visible;
      peco.name = m.name;
      peco.userData = m.userData;
      peco.layers.mask = m.layers.mask;
      peco.computeBoundingSphere();
      gepatra.add(peco);
      registriVidlimon(peco, limo);
      pecoj++;
    }
    gepatra.remove(m);
    m.dispose();
    dividitaj++;
  }
  return { tavoloj: dividitaj, pecoj };
}
