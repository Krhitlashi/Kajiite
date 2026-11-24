// ≺⧼ ſןw ſɭɔƽ 🎨 ⧽≻
import * as THREE from "three";
import { kf2LederanCac2sex } from "../../komunajxoj/cac2sex/ledo.js";
import { kf2SxtofanBumpanCac2sex } from "../../komunajxoj/cac2sex/sxtofo.js";
import { type Vesto } from "../../vestaro/vestoj.js";
import { vestaCac2sex } from "./pentristoj.js";

// ⟨ ſᶘɔ ʌ ſןw ſɭɔƽ , ꞙɭı , ⟅ ⟩
const UNGA_KOLORO = 0x987880;
let ungaMaterialoStoko: THREE.MeshStandardMaterial | null = null;
export function ungaMaterialo(): THREE.MeshStandardMaterial {
  if ( !ungaMaterialoStoko ) ungaMaterialoStoko = new THREE.MeshStandardMaterial({
    color: UNGA_KOLORO, roughness: 0o25/0o100 });
  return ungaMaterialoStoko;
}

// ⟨ ſɟɔȝ , ꞙɭı , ſןw ſɭɔƽ , ꞙɭı ⟅ ⟩
let ceqaMaterialoStoko: THREE.MeshStandardMaterial | null = null;
export function ceqaMaterialo(): THREE.MeshStandardMaterial {
  if ( !ceqaMaterialoStoko ) ceqaMaterialoStoko = new THREE.MeshStandardMaterial({
    color: 0x605050, roughness: 0o55/0o100 });
  return ceqaMaterialoStoko;
}

// ⟨ ſןw ſɭɔƽ , ſɟɔȝ , ⟅ ⟩
// ⟨ j͑ʃ'ɔ ŋᷠɹ , ſɟɔȝ , j͑ʃᴜ ſןᴜ , ⟅ ⟩
interface LedajMaterialoj {
  botoM: THREE.MeshStandardMaterial;
  akcentaM: THREE.MeshStandardMaterial;
}
const LEDAJ_MATERIALOJ = new Map<string, LedajMaterialoj>();
export function ledajMaterialoj(o: Vesto): LedajMaterialoj {
  const ca3aq = o.botoj + ":" + o.akcenta;
  let m = LEDAJ_MATERIALOJ.get(ca3aq);
  if ( !m ) {
    m = {
      botoM: new THREE.MeshStandardMaterial({
        color: o.botoj, map: kf2LederanCac2sex(), bumpMap: kf2LederanCac2sex(),
        bumpScale: 0o1/0o50, roughness: 0o33/0o40,
      }),
      akcentaM: new THREE.MeshStandardMaterial({
        color: o.akcenta, map: kf2LederanCac2sex(),
        bumpMap: kf2LederanCac2sex(), bumpScale: 0o1/0o400, roughness: 0o63/0o100,
      }),
    };
    LEDAJ_MATERIALOJ.set(ca3aq, m);
  }
  return m;
}

// ⟨ ſןw ſɭɔƽ , j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
// ⟨ j͑ʃɜȝ ɭʃɔ , ſ͕ɭɜ ı],ᴜ , ⟅ ⟩
interface VestajMaterialoj {
  internoM: THREE.MeshStandardMaterial;
  eksteraM: THREE.MeshStandardMaterial;
  pantalonoM: THREE.MeshStandardMaterial;
  manikoM: THREE.MeshStandardMaterial;
}
const vestajMaterialojStoko = new Map<string, VestajMaterialoj>();
export function vestajMaterialoj(o: Vesto): VestajMaterialoj {
  const ca3aq = o.ksaka + "|" + o.geles + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono;
  let m = vestajMaterialojStoko.get(ca3aq);
  if ( !m ) {
    const tukO = kf2SxtofanBumpanCac2sex();
    const vesto = ( pudal: string, roughness: number ): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({
        map: vestaCac2sex(o, pudal),
        bumpMap: tukO, bumpScale: 0o1/0o400,
        roughness,
        side: THREE.DoubleSide,
      });
    m = {
      internoM: vesto("interno", 0o33/0o40),
      eksteraM: vesto("soza", 0o63/0o100),
      pantalonoM: vesto("pantalono", 0o63/0o100),
      manikoM: vesto("maniko", 0o63/0o100),
    };
    vestajMaterialojStoko.set(ca3aq, m);
  }
  return m;
}
