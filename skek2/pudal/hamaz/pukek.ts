// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſןw ſɭɔƽ 📃 ⧽≻

import * as THREE from "three";
import { kf2LederanCac2sex } from "../../p6kpu/cac2sex/1uha.js";
import { kf2SxtofanBumpanCac2sex } from "../../p6kpu/cac2sex/lassiraq.js";
import { type Soqte } from "../../hasoqte/hasoqte.js";
import { vestaCac2sex } from "./kx2weh2ani.js";

const UNGAWEH2 = 0x987880;
let ungaPukekStoko: THREE.MeshStandardMaterial | null = null;
export function ungaPukek(): THREE.MeshStandardMaterial {
  if ( !ungaPukekStoko ) ungaPukekStoko = new THREE.MeshStandardMaterial({
    color: UNGAWEH2, roughness: 0o25/0o100 });
  return ungaPukekStoko;
}

let ceqaPukekStoko: THREE.MeshStandardMaterial | null = null;
export function ceqaPukek(): THREE.MeshStandardMaterial {
  if ( !ceqaPukekStoko ) ceqaPukekStoko = new THREE.MeshStandardMaterial({
    color: 0x605050, roughness: 0o55/0o100 });
  return ceqaPukekStoko;
}

interface LedajHapukek {
  botoM: THREE.MeshStandardMaterial;
  akcentaM: THREE.MeshStandardMaterial;
}
const LEDAJHAPUKEK = new Map<string, LedajHapukek>();
export function ledajHapukek(o: Soqte): LedajHapukek {
  const ca3aq = o.pat6te + ":" + o.tokhaxesai;
  let m = LEDAJHAPUKEK.get(ca3aq);
  if ( !m ) {
    m = {
      botoM: new THREE.MeshStandardMaterial({
        color: o.pat6te, map: kf2LederanCac2sex(), bumpMap: kf2LederanCac2sex(),
        bumpScale: 0o1/0o50, roughness: 0o33/0o40,
      }),
      akcentaM: new THREE.MeshStandardMaterial({
        color: o.tokhaxesai, map: kf2LederanCac2sex(),
        bumpMap: kf2LederanCac2sex(), bumpScale: 0o1/0o400, roughness: 0o63/0o100,
      }),
    };
    LEDAJHAPUKEK.set(ca3aq, m);
  }
  return m;
}

interface VestajHapukek {
  c2h2M: THREE.MeshStandardMaterial;
  eksteraM: THREE.MeshStandardMaterial;
  pantalonoM: THREE.MeshStandardMaterial;
  manikoM: THREE.MeshStandardMaterial;
}
const vestajHapukekStoko = new Map<string, VestajHapukek>();
export function vestajHapukek(o: Soqte): VestajHapukek {
  const ca3aq = o.ksaka + "|" + o.soqteWeh2 + "|" + o.tokhaxesai + "|" + o.c2h2 + "|" + o.nascete;
  let m = vestajHapukekStoko.get(ca3aq);
  if ( !m ) {
    const tukO = kf2SxtofanBumpanCac2sex();
    const soqte = ( pudal: string, roughness: number ): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({
        map: vestaCac2sex(o, pudal),
        bumpMap: tukO, bumpScale: 0o1/0o400,
        roughness,
        side: THREE.DoubleSide,
      });
    m = {
      c2h2M: soqte("c2h2", 0o33/0o40),
      eksteraM: soqte("soza", 0o63/0o100),
      pantalonoM: soqte("nascete", 0o63/0o100),
      manikoM: soqte("maniko", 0o63/0o100),
    };
    vestajHapukekStoko.set(ca3aq, m);
  }
  return m;
}
