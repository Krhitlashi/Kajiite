// ≺⧼ វត្ថុធាតុ 🎨 ⧽≻
import * as THREE from "three";
import { kreiLederanTeksajxon } from "../../komunajxoj/teksajxoj/ledo.js";
import { kreiSxtofanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/sxtofo.js";
import { type Vesto } from "../../vestaro/vestoj.js";
import { vestaTeksajxo } from "./pentristoj.js";

// ⟨ ហេតុអ្វីវត្ថុធាតុដោយឡែក 📃 ⟩
const UNGA_KOLORO = 0x987880;
let ungaMaterialoStoko: THREE.MeshStandardMaterial | null = null;
export function ungaMaterialo(): THREE.MeshStandardMaterial {
  if ( !ungaMaterialoStoko ) ungaMaterialoStoko = new THREE.MeshStandardMaterial({
    color: UNGA_KOLORO, roughness: 0o25/0o100 });
  return ungaMaterialoStoko;
}

// ⟨ វត្ថុធាតុស្បែក 📃 ⟩
// ⟨ ពណ៌សង្កត់ត្រឡប់មកស្បែកជើងវិញ 📃 ⟩
interface LedajMaterialoj {
  botoM: THREE.MeshStandardMaterial;
  akcentaM: THREE.MeshStandardMaterial;
}
const LEDAJ_MATERIALOJ = new Map<string, LedajMaterialoj>();
export function ledajMaterialoj(o: Vesto): LedajMaterialoj {
  const klavo = o.botoj + ":" + o.akcenta;
  let m = LEDAJ_MATERIALOJ.get(klavo);
  if ( !m ) {
    m = {
      botoM: new THREE.MeshStandardMaterial({
        color: o.botoj, map: kreiLederanTeksajxon(), bumpMap: kreiLederanTeksajxon(),
        bumpScale: 0o1/0o50, roughness: 0o33/0o40,
      }),
      akcentaM: new THREE.MeshStandardMaterial({
        color: o.akcenta, map: kreiLederanTeksajxon(),
        bumpMap: kreiLederanTeksajxon(), bumpScale: 0o1/0o400, roughness: 0o63/0o100,
      }),
    };
    LEDAJ_MATERIALOJ.set(klavo, m);
  }
  return m;
}

// ⟨ វត្ថុធាតុសម្លៀកបំពាក់រួម 📃 ⟩
// ⟨ ចម្លាក់ក្រណាត់ 📃 ⟩
interface VestajMaterialoj {
  internoM: THREE.MeshStandardMaterial;
  eksteraM: THREE.MeshStandardMaterial;
  pantalonoM: THREE.MeshStandardMaterial;
  manikoM: THREE.MeshStandardMaterial;
}
const vestajMaterialojStoko = new Map<string, VestajMaterialoj>();
export function vestajMaterialoj(o: Vesto): VestajMaterialoj {
  const klavo = o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono;
  let m = vestajMaterialojStoko.get(klavo);
  if ( !m ) {
    const tukO = kreiSxtofanBumpanTeksajxon();
    const vesto = ( speco: string, roughness: number ): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({
        map: vestaTeksajxo(o, speco),
        bumpMap: tukO, bumpScale: 0o1/0o400,
        roughness,
        side: THREE.DoubleSide,
      });
    m = {
      internoM: vesto("interno", 0o33/0o40),
      eksteraM: vesto("supra", 0o63/0o100),
      pantalonoM: vesto("pantalono", 0o63/0o100),
      manikoM: vesto("maniko", 0o63/0o100),
    };
    vestajMaterialojStoko.set(klavo, m);
  }
  return m;
}
