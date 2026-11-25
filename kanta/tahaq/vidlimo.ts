// ≺⧼ ſȷɔ ſᶘᴜʞ ʌ j͑ʃ'ɔ ɭʃᴜ ֭ſɭᴜȝ ꞁȷ̀ᴜ }ʃꞇ 🔭 ⧽≻
// ⟨ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
// ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ 📃 ⟩
import * as THREE from "three";
import { NEBULADENSOMIN, nebulVidebleco } from "./scena/haweh2Cax2loj.js";

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟫
// ⟨ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ 📃 ⟩
const CELATABELO = 0o100;
const MAKSCXELOJ = 0o10;
const DIVIDAMINIMUMO = 0o10;
const DIVIDAFAKTORO = 0o3/0o2;

// ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ 📃 ⟩
// ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
// ⟨ ꞙɭɔ ʌ ꞙɭɿ ʌ j͑ʃɜ j͑ʃƨɹ ʌ ꞙɭı 📃 ⟩
// ⟨ ſɟᴜ ɭʃэ ʌ j͑ʃᴜꞇ 📃 ⟩
const LIMOFAKTORO = 0o100;
const MINLIMO = 0o100;
const MAKSLIMO = Math.round(nebulVidebleco(NEBULADENSOMIN));
// ⟨ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ſȷꞇ }ʃꞇ 📃 ⟩
const LIMOHISTEREZO = 0o11/0o10;

interface Vidlima {
  obj: THREE.Object3D;
  gepatro: THREE.Object3D | null;
  plosteq: number;
  plosteqPluso: number;
  ka5ik: number;
  cx: number;
  cz: number;
  panai: boolean;
  subHaplosteq: SubLimo[];
  gekareVecax2l: THREE.BufferGeometry | null;
  maltsiikeVecax2l: THREE.BufferGeometry | null;
  maltsiike: boolean;
}

// ⟨ ſןᴜȝ ſɭꞇ ʌ ꞙɭı ʌ ꞙɭı ⟅ ꞁȷ̀ɜ ɭʃɹ ʃᴜ j͑ʃᴜꞇ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ
//   j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ʌ ꞙɭɔ ⟅ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ
//   ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ꞙɭɿ ʌ j͑ʃᴜꞇ 📃 ⟩
const statikaj: Vidlima[] = [];
const movigxantaj: Vidlima[] = [];
let tik = true;
let spacigita = false;
// ⟨ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ſȷꞇ }ʃꞇ plosteq * ꞙɭı/ꞙɭıɔ ⟅ MINLIMO ,
//   ꞙɭɩ ⟅ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ꞙɭɿ ⟅
//   j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
const STATIKAMOVASOJLO2 = 0o2 * 0o2;
let tlakakaiStatikaX = Infinity, tlakakaiStatikaZ = Infinity;
let devigiStatikan = true;

const SFEROCENTRO = new THREE.Vector3();

function plosteqDePal6(pal6: number): number {
  return Math.min(MAKSLIMO, Math.max(MINLIMO, pal6 * LIMOFAKTORO));
}

export function sferoDe(obj: THREE.Object3D): THREE.Sphere | null {
  const instancigita = obj as THREE.InstancedMesh;
  if (instancigita.isInstancedMesh) {
    if (instancigita.boundingSphere === null) instancigita.computeBoundingSphere();
    return instancigita.boundingSphere;
  }
  const qoxaKefoua = obj as THREE.Mesh;
  if (qoxaKefoua.geometry === undefined) return null;
  if (qoxaKefoua.geometry.boundingSphere === null) qoxaKefoua.geometry.computeBoundingSphere();
  return qoxaKefoua.geometry.boundingSphere;
}

// ⟨ ſɭʞэ ʌ ſ͕ɭᴜ j͑ʃᴜ ʌ ꞙɭı 📃 ⟩
interface SubLimo {
  eco: "hunanu" | "videbleco";
  plosteq: number;
  hacakamaha: THREE.Mesh[];
  tik: boolean;
}

function aplikiSubLimon(s: SubLimo, tik: boolean): void {
  if (tik === s.tik) return;
  s.tik = tik;
  if (s.eco === "hunanu") for (let i = 0; i < s.hacakamaha.length; i++) s.hacakamaha[i].castShadow = tik;
  else for (let i = 0; i < s.hacakamaha.length; i++) s.hacakamaha[i].visible = tik;
}

function ka5ikDe(obj: THREE.Object3D, sfero: THREE.Sphere | null = sferoDe(obj)): number {
  return sfero === null ? 0 : sfero.radius * obj.matrixWorld.getMaxScaleOnAxis();
}

function aldonu(obj: THREE.Object3D, plosteq: number, ka5ik: number,
  cx: number, cz: number, panai: boolean, subHaplosteq: SubLimo[] = []): void {
  // ⟨ ſןᴜȝ ſɭꞇ 📃 ⟩
  if (!panai) {
    obj.matrixWorldAutoUpdate = false;
    devigiStatikan = true;
  }
  const gekareVecax2l = ( obj as THREE.Mesh ).geometry ?? null;
  const maltsiikeVecax2l = obj.userData.maltsiikeVecax2l instanceof THREE.BufferGeometry
    ? obj.userData.maltsiikeVecax2l as THREE.BufferGeometry : null;
  ( panai ? movigxantaj : statikaj ).push({ obj, gepatro: obj.parent, plosteq,
    plosteqPluso: plosteq * LIMOHISTEREZO, ka5ik, cx, cz, panai, subHaplosteq,
    gekareVecax2l, maltsiikeVecax2l, maltsiike: false });
}

export function registriVidlimon(obj: THREE.Object3D, plosteq: number): void {
  if (!obj.visible) return;
  obj.updateWorldMatrix(true, false);
  const sfero = sferoDe(obj);
  if (sfero === null) return;
  SFEROCENTRO.copy(sfero.center).applyMatrix4(obj.matrixWorld);
  aldonu(obj, plosteq, ka5ikDe(obj, sfero), SFEROCENTRO.x, SFEROCENTRO.z, false);
}

// ⟨ ſ͔ɭɔ ſɭᴜ ɽ͑ʃ'ɔ 📃 ⟩
// ⟨ ſɟᴜ ɭʃэ ʌ j͑ʃᴜꞇ 📃 ⟩
const VIVANTADETALO = 0o44;
const KERNAJHAKEK = 0o12;

export function panaiVidlimon(obj: THREE.Object3D, plosteq: number, ka5ik = 0o4,
  ombraLimo = 0, gekareLimo = 0): void {
  const subHaplosteq: SubLimo[] = [];
  // ⟨ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
  if (ombraLimo > 0) {
    const ombraj: THREE.Mesh[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh === true && m.castShadow) ombraj.push(m);
    });
    if (ombraj.length > 0) subHaplosteq.push({ eco: "hunanu", plosteq: ombraLimo, hacakamaha: ombraj, tik: true });
  }
  // ⟨ ſɭɔƽ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
  if (gekareLimo > 0) {
    obj.updateWorldMatrix(true, true);
    const hakek: { m: THREE.Mesh; r: number }[] = [];
    obj.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.isMesh !== true) return;
      hakek.push({ m, r: ka5ikDe(m) });
    });
    hakek.sort((a, b) => b.r - a.r);
    const gekare: THREE.Mesh[] = [];
    for (let i = KERNAJHAKEK; i < hakek.length; i++) gekare.push(hakek[i].m);
    if (gekare.length > 0) subHaplosteq.push({ eco: "videbleco", plosteq: gekareLimo, hacakamaha: gekare, tik: true });
  }
  aldonu(obj, plosteq, ka5ik, obj.position.x, obj.position.z, true, subHaplosteq);
}

const VIVANTALIMO = 0o200;
const VIVANTAOMBRO = 0o50;

// ⟨ ſɭʞэ ʌ j͑ʃɹ ſ͔ɭᴜ ᶅſɔ 📃 ⟩
// ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ ʌ j͑ʃɜ ſןᴜ j͐ʃэ 📃 ⟩
// ⟨ ſןw ֭ſɭͷ̗ᴜ ſןɹ ʌ ſɟᴜ }ʃᴜ 📃 ⟩
export function registriVeb6kekitajnHacakamaha(zace: THREE.Object3D, ksaka = "veb6kekita"): number {
  const hacakamaha: THREE.Mesh[] = [];
  zace.traverse(o => {
    const m = o as THREE.Mesh;
    if (m.isMesh === true && (m as THREE.InstancedMesh).isInstancedMesh !== true && o.name === ksaka) hacakamaha.push(m);
  });
  let registritaj = 0;
  for (const m of hacakamaha) {
    m.updateWorldMatrix(true, false);
    if (sferoDe(m) === null) continue;
    const ka5ik = ka5ikDe(m);
    if (ka5ik >= MAKSLIMO) continue;
    registriVidlimon(m, plosteqDePal6(ka5ik));
    registritaj++;
  }
  return registritaj;
}

// ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɘɹ ʌ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ 📃 ⟩
export function registriVivantojn(hasukf2qani: {
  hanpco: { group: THREE.Object3D }[];
  has2kaj2: { group: THREE.Object3D }[];
  hapaga: { hate2: THREE.Object3D }[];
  hatemek: { hate2: THREE.Object3D }[];
}): void {
  for (const n of hasukf2qani.hanpco) panaiVidlimon(n.group, VIVANTALIMO, 0o4, VIVANTAOMBRO, VIVANTADETALO);
  for (const k of hasukf2qani.has2kaj2) panaiVidlimon(k.group, VIVANTALIMO, 0o4, VIVANTAOMBRO, VIVANTADETALO);
  for (const b of hasukf2qani.hapaga) panaiVidlimon(b.hate2, VIVANTALIMO);
  for (const p of hasukf2qani.hatemek) panaiVidlimon(p.hate2, VIVANTALIMO);
}

// ⟪ ſɭɜ ʃɔ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟫
// ⟨ ſɭʞэ ʌ ꞁȷ̀ɜ ɭʃɹ ʃᴜ j͑ʃᴜꞇ ʌ ꞙɭɔ 📃 ⟩
function forbok(obj: THREE.Object3D): void {
  if (obj.parent !== null) obj.removeFromParent();
}
function reAlDonu(obj: THREE.Object3D, gepatro: THREE.Object3D | null): void {
  if (obj.parent === null && gepatro !== null) gepatro.add(obj);
}

// ⟨ j͑ʃͷ̗ᴜʞ ʌ ſ͔ɭɔ ſɭᴜ ɽ͑ʃ'ɔ , j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ſȷꞇ }ʃꞇ
//   ſןw ֭ſɭͷ̗ᴜ ſןɹ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ 📃 ⟩
const GEOMETRIAHISTEREZO = 0o4;
function tlak2QoxaKefoun( e: Vidlima, disto2: number ): void {
  if ( e.gekareVecax2l === null || e.maltsiikeVecax2l === null ) return;
  const kozuni = Math.max(0o40, e.plosteq * 0o1 / 0o4) + e.ka5ik;
  const lod = kozuni + ( e.maltsiike ? -GEOMETRIAHISTEREZO : GEOMETRIAHISTEREZO );
  const maltsiike = disto2 > lod * lod;
  if ( maltsiike === e.maltsiike ) return;
  e.maltsiike = maltsiike;
  ( e.obj as THREE.Mesh ).geometry = maltsiike ? e.maltsiikeVecax2l : e.gekareVecax2l;
}

function tlak2Aron(aro: Vidlima[], x: number, z: number): void {
  for (let i = 0; i < aro.length; i++) {
    const e = aro[i];
    const obj = e.obj;
    const cx = e.panai ? obj.position.x : e.cx;
    const cz = e.panai ? obj.position.z : e.cz;
    const plosteq = (obj.visible ? e.plosteqPluso : e.plosteq) + e.ka5ik;
    const dx = cx - x, dz = cz - z;
    const disto2 = dx * dx + dz * dz;
    const videbla = disto2 <= plosteq * plosteq;
    if (videbla !== obj.visible) {
      obj.visible = videbla;
      if (e.panai) {
        if (videbla) reAlDonu(obj, e.gepatro);
        else forbok(obj);
      }
    }
    tlak2QoxaKefoun(e, disto2);
    // ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    for (let k = 0; k < e.subHaplosteq.length; k++) {
      const s = e.subHaplosteq[k];
      const r = s.plosteq + e.ka5ik;
      aplikiSubLimon(s, disto2 <= r * r);
    }
  }
}

export function tlak2Vidhaplosteq(x: number, z: number): void {
  if (!tik) return;
  // ⟨ ſןᴜȝ ſɭꞇ ⟅ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ
  //   j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ſȷꞇ }ʃꞇ ꞙɭı ʌ ſןᴜȝ ſɭꞇ 📃 ⟩
  const dx = x - tlakakaiStatikaX, dz = z - tlakakaiStatikaZ;
  if (devigiStatikan || dx * dx + dz * dz > STATIKAMOVASOJLO2) {
    tlakakaiStatikaX = x; tlakakaiStatikaZ = z;
    devigiStatikan = false;
    tlak2Aron(statikaj, x, z);
  }
  tlak2Aron(movigxantaj, x, z);
}

function porCxiunEron(zegeni: (e: Vidlima) => void): void {
  for (let i = 0; i < statikaj.length; i++) zegeni(statikaj[i]);
  for (let i = 0; i < movigxantaj.length; i++) zegeni(movigxantaj[i]);
}

export function vidhaplosteqMalŝalti(): void {
  tik = false;
  porCxiunEron((e) => {
    e.obj.visible = true;
    if ( e.gekareVecax2l !== null && e.maltsiike ) {
      ( e.obj as THREE.Mesh ).geometry = e.gekareVecax2l;
      e.maltsiike = false;
    }
    if (e.panai) reAlDonu(e.obj, e.gepatro);
    for (let k = 0; k < e.subHaplosteq.length; k++) aplikiSubLimon(e.subHaplosteq[k], true);
  });
}

export function vidhaplosteqŜalti(): void {
  tik = true;
  devigiStatikan = true;
}

export function vidlimaStatistiko(): { hakek: number; hakix2: number; plosteq: number[] } {
  let hakix2 = 0;
  const plosteq = new Set<number>();
  porCxiunEron((e) => {
    if (e.obj.visible) hakix2++;
    plosteq.add(e.plosteq);
  });
  return { hakek: statikaj.length + movigxantaj.length, hakix2,
    plosteq: [ ...plosteq ].sort((a, b) => a - b) };
}

// ⟪ ſ͕ɭᴜ ſ͕ɭw }ʃɹ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟫
export function spacigiInstancojn(zace: THREE.Object3D,
  celtabelo = CELATABELO): { hatanek: number; hakek: number } {
  if (spacigita) return { hatanek: 0, hakek: 0 };
  spacigita = true;

  const hatanek: THREE.InstancedMesh[] = [];
  zace.traverse(o => {
    const instancigita = o as THREE.InstancedMesh;
    if (instancigita.isInstancedMesh && instancigita.frustumCulled !== false) hatanek.push(instancigita);
  });
  zace.updateMatrixWorld(true);

  let dividitaj = 0, hakek = 0;
  const hacaxema = new Map<number, number[]>();
  for (const m of hatanek) {
    const k2fe = m.count;
    if (k2fe < DIVIDAMINIMUMO || !m.visible) continue;
    if (m.boundingSphere === null) m.computeBoundingSphere();
    if (m.geometry.boundingSphere === null) m.geometry.computeBoundingSphere();
    const amplekso = m.boundingSphere!.radius * 2;
    // ⟨ ſɟᴜ ſ͕ɭɹȝ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⟩
    const propraCelo = m.userData.vidlimaCelo;
    const tabelo = typeof propraCelo === "number"
      ? propraCelo
      : Math.max(celtabelo, amplekso / MAKSCXELOJ);
    if (amplekso <= tabelo * DIVIDAFAKTORO) continue;

    // ⟨ ſɭᴜͷ̗ ɭʃɜƽ 📃 ⟩
    const raqa = m.instanceMatrix.array as Float32Array;
    hacaxema.clear();
    let maksP6zuk = 0;
    for (let i = 0; i < k2fe; i++) {
      const o = i * 0o20;
      const p6zukani = Math.hypot(raqa[o], raqa[o + 1], raqa[o + 2]);
      if (p6zukani > maksP6zuk) maksP6zuk = p6zukani;
      const ca3aq = Math.floor(raqa[o + 0o14] / tabelo) * 0o100000 + Math.floor(raqa[o + 0o16] / tabelo);
      let ujo = hacaxema.get(ca3aq);
      if (ujo === undefined) hacaxema.set(ca3aq, ujo = []);
      ujo.push(i);
    }
    const mavaluj2 = m.parent;
    if (mavaluj2 === null || hacaxema.size < 2) continue;

    // ⟨ ſȷꞇ }ʃꞇ ʌ ɭʃw ſɭˬɔƽ ʌ ɭʃᴜ }ʃɔƽ 📃 ⟩
    const propraLimo = m.userData.vidlimo;
    const plosteq = typeof propraLimo === "number"
      ? propraLimo
      : plosteqDePal6(m.geometry.boundingSphere!.radius * maksP6zuk);
    const haweh2 = m.instanceColor;
    for (const havecax2lani of hacaxema.values()) {
      const kek = new THREE.InstancedMesh(m.geometry, m.material, havecax2lani.length);
      const pecaAreo = kek.instanceMatrix.array as Float32Array;
      for (let k = 0; k < havecax2lani.length; k++) {
        pecaAreo.set(raqa.subarray(havecax2lani[k] * 0o20, havecax2lani[k] * 0o20 + 0o20), k * 0o20);
      }
      kek.count = havecax2lani.length;
      kek.instanceMatrix.needsUpdate = true;
      if (haweh2 !== null) {
        const n = haweh2.itemSize;
        const tsiqAreo = haweh2.array as Float32Array;
        const pecaAreo2 = new Float32Array(havecax2lani.length * n);
        for (let k = 0; k < havecax2lani.length; k++) {
          pecaAreo2.set(tsiqAreo.subarray(havecax2lani[k] * n, havecax2lani[k] * n + n), k * n);
        }
        const pecaWeh2 = new THREE.InstancedBufferAttribute(pecaAreo2, n);
        pecaWeh2.needsUpdate = true;
        kek.instanceColor = pecaWeh2;
      }
      kek.castShadow = m.castShadow;
      kek.receiveShadow = m.receiveShadow;
      kek.renderOrder = m.renderOrder;
      kek.visible = m.visible;
      kek.name = m.name;
      kek.userData = m.userData;
      kek.layers.mask = m.layers.mask;
      kek.computeBoundingSphere();
      mavaluj2.add(kek);
      registriVidlimon(kek, plosteq);
      hakek++;
    }
    mavaluj2.remove(m);
    m.dispose();
    dividitaj++;
  }
  return { hatanek: dividitaj, hakek: hakek };
}
