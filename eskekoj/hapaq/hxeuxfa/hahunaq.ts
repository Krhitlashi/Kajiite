// ≺⧼ ֭ſɭw }ʃᴜȝ ʌ ſɟᴜ ſɟɹ ᶅſɹƽ 🏮 ⧽≻
import * as THREE from "three";

export interface HxeuxfaLoko {
  x: number; z: number; y: number;
  /** ſɭɔ }ʃɹȝ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ , ſɭɜ ſɭ,w }ʃw ʌ ֭ſɭwʞ ᶅſw ſɭɹ ʌ ɭʃэᴜ̩ ſɭɹ ⟅ */
  rotacio?: number;
}

export interface HxeuxfaSistemo {
  flamaEkstero: THREE.InstancedMesh;
  flamaInterno: THREE.InstancedMesh;
  flamaKerno: THREE.InstancedMesh;
  flamaLangoj: THREE.InstancedMesh;
  langojPoLampo: number;
  langajBazoj: THREE.Vector3[];
  langajFazoj: number[];
  brilajPunktoj: THREE.Points;
  brilaMaterialo: THREE.ShaderMaterial;
  punktajLumoj: THREE.PointLight[];
  lumajIndeksoj: number[];
  spots: THREE.Vector3[];
  phases: number[];
  sekviLumojn: ( x: number, z: number ) => void;
}
