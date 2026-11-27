// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃ'ꞇ ɭ(ͷ̗ꞇ ŋᷠɜ 📃 ⧽≻

import * as THREE from "three";
import { MAHAVEM2MIN, mahaH6kuni } from "./scena/haweh2-cax2loj.js";

const C2TACA1ARA = 0o100;
const PLOSTEQC2TA = 0o10;
const KALTOKMIN = 0o10;
const KALTOKVEM2 = 0o3/0o2;

const PLOSTEQVEM2 = 0o100;
const PLOSTEQSAXE = 0o100;
const PLOSTEQ3AKAK = Math.round(mahaH6kuni(MAHAVEM2MIN));

const PLOSTEQP2SA = 0o11/0o10;

interface KekVidlima {
  obj: THREE.Object3D;
  xaqadiKuba: THREE.Object3D | null;
  plosteq: number;
  plosteqP2sa: number;
  ka5ik: number;
  c2taX: number;
  c2taZ: number;
  haxekuxaSak: boolean;
  hapLimoCatsara: HapLimo[];
  gekareVecax2l: THREE.BufferGeometry | null;
  maltsiikeVecax2l: THREE.BufferGeometry | null;
  maltsiike: boolean;
}

const kant2Catsara: KekVidlima[] = [];
const sakCatsara: KekVidlima[] = [];
let tlak2Amal = true;
let kaltokAmal = false;

const KANT2SAKPLOSTEQ2 = 0o2 * 0o2;
let tlakakaiKant2X = Infinity, tlakakaiKant2Z = Infinity;
let devigiKant2n = true;

const KUQASOST2 = new THREE.Vector3();

function plosteqDePal6(pal6: number): number {
  return Math.min(PLOSTEQ3AKAK, Math.max(PLOSTEQSAXE, pal6 * PLOSTEQVEM2));
}

export function kuqaDe(obj: THREE.Object3D): THREE.Sphere | null {
  const kekKantan = obj as THREE.InstancedMesh;
  if (kekKantan.isInstancedMesh) {
    if (kekKantan.boundingSphere === null) kekKantan.computeBoundingSphere();
    return kekKantan.boundingSphere;
  }
  const zaceKefoua = obj as THREE.Mesh;
  if (zaceKefoua.geometry === undefined) return null;
  if (zaceKefoua.geometry.boundingSphere === null) zaceKefoua.geometry.computeBoundingSphere();
  return zaceKefoua.geometry.boundingSphere;
}

interface HapLimo {
  s2kanta: "hunanu" | "videbleco";
  plosteq: number;
  hacakamaha: THREE.Mesh[];
  c2h2: boolean;
}

function k2reiHapLimon(hapLimo: HapLimo, c2h2: boolean): void {
  if (c2h2 === hapLimo.c2h2) return;
  hapLimo.c2h2 = c2h2;
  if (hapLimo.s2kanta === "hunanu") for (let kek = 0o0; kek < hapLimo.hacakamaha.length; kek++) hapLimo.hacakamaha[kek].castShadow = c2h2;
  else for (let kek = 0o0; kek < hapLimo.hacakamaha.length; kek++) hapLimo.hacakamaha[kek].visible = c2h2;
}

function ka5ikDe(obj: THREE.Object3D, kuqa: THREE.Sphere | null = kuqaDe(obj)): number {
  return kuqa === null ? 0o0 : kuqa.radius * obj.matrixWorld.getMaxScaleOnAxis();
}

function k2reiKekon(obj: THREE.Object3D, plosteq: number, ka5ik: number,
  c2taX: number, c2taZ: number, haxekuxaSak: boolean, hapLimoCatsara: HapLimo[] = []): void {
  // ⟨ ſןᴜȝ ſɭꞇ 📃 ⟩
  if (!haxekuxaSak) {
    obj.matrixWorldAutoUpdate = false;
    devigiKant2n = true;
  }
  const gekareVecax2l = ( obj as THREE.Mesh ).geometry ?? null;
  const maltsiikeVecax2l = obj.userData.maltsiikeVecax2l instanceof THREE.BufferGeometry
    ? obj.userData.maltsiikeVecax2l as THREE.BufferGeometry : null;
  ( haxekuxaSak ? sakCatsara : kant2Catsara ).push({ obj, xaqadiKuba: obj.parent, plosteq,
    plosteqP2sa: plosteq * PLOSTEQP2SA, ka5ik, c2taX, c2taZ, haxekuxaSak, hapLimoCatsara,
    gekareVecax2l, maltsiikeVecax2l, maltsiike: false });
}

export function registriVidlimon(obj: THREE.Object3D, plosteq: number): void {
  if (!obj.visible) return;
  obj.updateWorldMatrix(true, false);
  const kuqa = kuqaDe(obj);
  if (kuqa === null) return;
  KUQASOST2.copy(kuqa.center).applyMatrix4(obj.matrixWorld);
  k2reiKekon(obj, plosteq, ka5ikDe(obj, kuqa), KUQASOST2.x, KUQASOST2.z, false);
}

// ⟨ ſ͔ɭɔ ſɭᴜ ɽ͑ʃ'ɔ 📃 ⟩

const VIVANTAH6KUNI = 0o44;
const KERNAHAKEK = 0o12;

export function panaiVidlimon(obj: THREE.Object3D, plosteq: number, ka5ik = 0o4,
  hunanuPlosteq = 0o0, gekarePlosteq = 0o0): void {
  const hapLimoCatsara: HapLimo[] = [];
  // ⟨ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
  if (hunanuPlosteq > 0o0) {
    const hunanuKek: THREE.Mesh[] = [];
    obj.traverse(kub => {
      const cakamaha = kub as THREE.Mesh;
      if (cakamaha.isMesh === true && cakamaha.castShadow) hunanuKek.push(cakamaha);
    });
    if (hunanuKek.length > 0o0) hapLimoCatsara.push({ s2kanta: "hunanu", plosteq: hunanuPlosteq, hacakamaha: hunanuKek, c2h2: true });
  }
  // ⟨ ſɭɔƽ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
  if (gekarePlosteq > 0o0) {
    obj.updateWorldMatrix(true, true);
    const hakek: { cakamaha: THREE.Mesh; kuqaKa5ik: number }[] = [];
    obj.traverse(kub => {
      const cakamaha = kub as THREE.Mesh;
      if (cakamaha.isMesh !== true) return;
      hakek.push({ cakamaha, kuqaKa5ik: ka5ikDe(cakamaha) });
    });
    hakek.sort((kek1, kek4) => kek4.kuqaKa5ik - kek1.kuqaKa5ik);
    const gekare: THREE.Mesh[] = [];
    for (let kek = KERNAHAKEK; kek < hakek.length; kek++) gekare.push(hakek[kek].cakamaha);
    if (gekare.length > 0o0) hapLimoCatsara.push({ s2kanta: "videbleco", plosteq: gekarePlosteq, hacakamaha: gekare, c2h2: true });
  }
  k2reiKekon(obj, plosteq, ka5ik, obj.position.x, obj.position.z, true, hapLimoCatsara);
}

const VIVANTAPLOSTEQ = 0o200;
const VIVANTAHUNANU = 0o50;

export function registriVeb6kekitajnHacakamaha(zace: THREE.Object3D, ksaka = "veb6kekita"): number {
  const hacakamaha: THREE.Mesh[] = [];
  zace.traverse(kub => {
    const cakamaha = kub as THREE.Mesh;
    if (cakamaha.isMesh === true && (cakamaha as THREE.InstancedMesh).isInstancedMesh !== true && kub.name === ksaka) hacakamaha.push(cakamaha);
  });
  let registritaj = 0o0;
  for (const cakamaha of hacakamaha) {
    cakamaha.updateWorldMatrix(true, false);
    if (kuqaDe(cakamaha) === null) continue;
    const ka5ik = ka5ikDe(cakamaha);
    if (ka5ik >= PLOSTEQ3AKAK) continue;
    registriVidlimon(cakamaha, plosteqDePal6(ka5ik));
    registritaj++;
  }
  return registritaj;
}

export function registriVivantojn(hasukf2qani: {
  hanpco: { group: THREE.Object3D }[];
  has2kaj2: { group: THREE.Object3D }[];
  hapaga: { hate2: THREE.Object3D }[];
  hatemek: { hate2: THREE.Object3D }[];
}): void {
  for (const kekPal6 of hasukf2qani.hanpco) panaiVidlimon(kekPal6.group, VIVANTAPLOSTEQ, 0o4, VIVANTAHUNANU, VIVANTAH6KUNI);
  for (const kek2 of hasukf2qani.has2kaj2) panaiVidlimon(kek2.group, VIVANTAPLOSTEQ, 0o4, VIVANTAHUNANU, VIVANTAH6KUNI);
  for (const kek4 of hasukf2qani.hapaga) panaiVidlimon(kek4.hate2, VIVANTAPLOSTEQ);
  for (const kek3 of hasukf2qani.hatemek) panaiVidlimon(kek3.hate2, VIVANTAPLOSTEQ);
}

function k2reiKoben(obj: THREE.Object3D): void {
  if (obj.parent !== null) obj.removeFromParent();
}
function k2reiKuban(obj: THREE.Object3D, xaqadiKuba: THREE.Object3D | null): void {
  if (obj.parent === null && xaqadiKuba !== null) xaqadiKuba.add(obj);
}

const ZACEP2SA = 0o4;
function tlak2ZaceKefoun( kekVidlima: KekVidlima, h6kuni2: number ): void {
  if ( kekVidlima.gekareVecax2l === null || kekVidlima.maltsiikeVecax2l === null ) return;
  const kozuH6kuni = Math.max(0o40, kekVidlima.plosteq * 0o1 / 0o4) + kekVidlima.ka5ik;
  const h6kuniPlosteq = kozuH6kuni + ( kekVidlima.maltsiike ? -ZACEP2SA : ZACEP2SA );
  const maltsiike = h6kuni2 > h6kuniPlosteq * h6kuniPlosteq;
  if ( maltsiike === kekVidlima.maltsiike ) return;
  kekVidlima.maltsiike = maltsiike;
  ( kekVidlima.obj as THREE.Mesh ).geometry = maltsiike ? kekVidlima.maltsiikeVecax2l : kekVidlima.gekareVecax2l;
}

function tlak2Catsaran(aro: KekVidlima[], x: number, z: number): void {
  for (let kek = 0o0; kek < aro.length; kek++) {
    const kekVidlima = aro[kek];
    const obj = kekVidlima.obj;
    const c2taX = kekVidlima.haxekuxaSak ? obj.position.x : kekVidlima.c2taX;
    const c2taZ = kekVidlima.haxekuxaSak ? obj.position.z : kekVidlima.c2taZ;
    const plosteq = (obj.visible ? kekVidlima.plosteqP2sa : kekVidlima.plosteq) + kekVidlima.ka5ik;
    const h6kuniX = c2taX - x, h6kuniZ = c2taZ - z;
    const h6kuni2 = h6kuniX * h6kuniX + h6kuniZ * h6kuniZ;
    const ot2basai = h6kuni2 <= plosteq * plosteq;
    if (ot2basai !== obj.visible) {
      obj.visible = ot2basai;
      if (kekVidlima.haxekuxaSak) {
        if (ot2basai) k2reiKuban(obj, kekVidlima.xaqadiKuba);
        else k2reiKoben(obj);
      }
    }
    tlak2ZaceKefoun(kekVidlima, h6kuni2);

    for (let kek2 = 0o0; kek2 < kekVidlima.hapLimoCatsara.length; kek2++) {
      const hapLimo = kekVidlima.hapLimoCatsara[kek2];
      const kuqaKa5ik = hapLimo.plosteq + kekVidlima.ka5ik;
      k2reiHapLimon(hapLimo, h6kuni2 <= kuqaKa5ik * kuqaKa5ik);
    }
  }
}

export function tlak2Vidhaplosteq(x: number, z: number): void {
  if (!tlak2Amal) return;

  const h6kuniX = x - tlakakaiKant2X, h6kuniZ = z - tlakakaiKant2Z;
  if (devigiKant2n || h6kuniX * h6kuniX + h6kuniZ * h6kuniZ > KANT2SAKPLOSTEQ2) {
    tlakakaiKant2X = x; tlakakaiKant2Z = z;
    devigiKant2n = false;
    tlak2Catsaran(kant2Catsara, x, z);
  }
  tlak2Catsaran(sakCatsara, x, z);
}

function hakekCatsara(k2reiKek: (kekVidlima: KekVidlima) => void): void {
  for (let kek = 0o0; kek < kant2Catsara.length; kek++) k2reiKek(kant2Catsara[kek]);
  for (let kek = 0o0; kek < sakCatsara.length; kek++) k2reiKek(sakCatsara[kek]);
}

export function vidhaplosteqKol2(): void {
  tlak2Amal = false;
  hakekCatsara((kekVidlima) => {
    kekVidlima.obj.visible = true;
    if ( kekVidlima.gekareVecax2l !== null && kekVidlima.maltsiike ) {
      ( kekVidlima.obj as THREE.Mesh ).geometry = kekVidlima.gekareVecax2l;
      kekVidlima.maltsiike = false;
    }
    if (kekVidlima.haxekuxaSak) k2reiKuban(kekVidlima.obj, kekVidlima.xaqadiKuba);
    for (let kek2 = 0o0; kek2 < kekVidlima.hapLimoCatsara.length; kek2++) k2reiHapLimon(kekVidlima.hapLimoCatsara[kek2], true);
  });
}

export function vidhaplosteqSaxe(): void {
  tlak2Amal = true;
  devigiKant2n = true;
}

export function vidlimaVop2kekai(): { hakek: number; hakix2: number; plosteq: number[] } {
  let hakix2 = 0o0;
  const plosteq = new Set<number>();
  hakekCatsara((kekVidlima) => {
    if (kekVidlima.obj.visible) hakix2++;
    plosteq.add(kekVidlima.plosteq);
  });
  return { hakek: kant2Catsara.length + sakCatsara.length, hakix2,
    plosteq: [ ...plosteq ].sort((kek1, kek4) => kek1 - kek4) };
}

export function spacigiInstancojn(zace: THREE.Object3D,
  c2taPal6 = C2TACA1ARA): { kekKantanVek2fe: number; hakek: number } {
  if (kaltokAmal) return { kekKantanVek2fe: 0o0, hakek: 0o0 };
  kaltokAmal = true;

  const kekKantanVek2fe: THREE.InstancedMesh[] = [];
  zace.traverse(kub => {
    const kekKantan = kub as THREE.InstancedMesh;
    if (kekKantan.isInstancedMesh && kekKantan.frustumCulled !== false) kekKantanVek2fe.push(kekKantan);
  });
  zace.updateMatrixWorld(true);

  let kaltokVek2fe = 0o0, hakek = 0o0;
  const c2taBal2 = new Map<number, number[]>();
  for (const cakamaha of kekKantanVek2fe) {
    const k2fe = cakamaha.count;
    if (k2fe < KALTOKMIN || !cakamaha.visible) continue;
    if (cakamaha.boundingSphere === null) cakamaha.computeBoundingSphere();
    if (cakamaha.geometry.boundingSphere === null) cakamaha.geometry.computeBoundingSphere();
    const pal6 = cakamaha.boundingSphere!.radius * 0o2;
    // ⟨ ſɟᴜ ſ͕ɭɹȝ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 📃 ⟩
    const kekC2ta = cakamaha.userData.vidlimaCelo;
    const c2taSefini = typeof kekC2ta === "number"
      ? kekC2ta
      : Math.max(c2taPal6, pal6 / PLOSTEQC2TA);
    if (pal6 <= c2taSefini * KALTOKVEM2) continue;

    // ⟨ ſɭᴜͷ̗ ɭʃɜƽ 📃 ⟩
    const raqa = cakamaha.instanceMatrix.array as Float32Array;
    c2taBal2.clear();
    let plosteqP6zuk = 0o0;
    for (let kek = 0o0; kek < k2fe; kek++) {
      const haxekuxaVem2 = kek * 0o20;
      const p6zukani = Math.hypot(raqa[haxekuxaVem2], raqa[haxekuxaVem2 + 0o1], raqa[haxekuxaVem2 + 0o2]);
      if (p6zukani > plosteqP6zuk) plosteqP6zuk = p6zukani;
      const ca3aq = Math.floor(raqa[haxekuxaVem2 + 0o14] / c2taSefini) * 0o100000 + Math.floor(raqa[haxekuxaVem2 + 0o16] / c2taSefini);
      let kuba = c2taBal2.get(ca3aq);
      if (kuba === undefined) c2taBal2.set(ca3aq, kuba = []);
      kuba.push(kek);
    }
    const sozaKuba = cakamaha.parent;
    if (sozaKuba === null || c2taBal2.size < 0o2) continue;

    const kekPlosteq = cakamaha.userData.vidlimo;
    const plosteq = typeof kekPlosteq === "number"
      ? kekPlosteq
      : plosteqDePal6(cakamaha.geometry.boundingSphere!.radius * plosteqP6zuk);
    const haweh2 = cakamaha.instanceColor;
    for (const havecax2lani of c2taBal2.values()) {
      const kek = new THREE.InstancedMesh(cakamaha.geometry, cakamaha.material, havecax2lani.length);
      const kekHaxekuxa = kek.instanceMatrix.array as Float32Array;
      for (let kek2 = 0o0; kek2 < havecax2lani.length; kek2++) {
        kekHaxekuxa.set(raqa.subarray(havecax2lani[kek2] * 0o20, havecax2lani[kek2] * 0o20 + 0o20), kek2 * 0o20);
      }
      kek.count = havecax2lani.length;
      kek.instanceMatrix.needsUpdate = true;
      if (haweh2 !== null) {
        const kekPal6 = haweh2.itemSize;
        const weh2Haxekuxa = haweh2.array as Float32Array;
        const kekWeh2Haxekuxa = new Float32Array(havecax2lani.length * kekPal6);
        for (let kek2 = 0o0; kek2 < havecax2lani.length; kek2++) {
          kekWeh2Haxekuxa.set(weh2Haxekuxa.subarray(havecax2lani[kek2] * kekPal6, havecax2lani[kek2] * kekPal6 + kekPal6), kek2 * kekPal6);
        }
        const kekWeh2 = new THREE.InstancedBufferAttribute(kekWeh2Haxekuxa, kekPal6);
        kekWeh2.needsUpdate = true;
        kek.instanceColor = kekWeh2;
      }
      kek.castShadow = cakamaha.castShadow;
      kek.receiveShadow = cakamaha.receiveShadow;
      kek.renderOrder = cakamaha.renderOrder;
      kek.visible = cakamaha.visible;
      kek.name = cakamaha.name;
      kek.userData = cakamaha.userData;
      kek.layers.mask = cakamaha.layers.mask;
      kek.computeBoundingSphere();
      sozaKuba.add(kek);
      registriVidlimon(kek, plosteq);
      hakek++;
    }
    sozaKuba.remove(cakamaha);
    cakamaha.dispose();
    kaltokVek2fe++;
  }
  return { kekKantanVek2fe: kaltokVek2fe, hakek: hakek };
}
