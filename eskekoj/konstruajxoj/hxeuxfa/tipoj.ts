// ≺⧼ ប្រភេទចង្កៀង 🏮 ⧽≻
import * as THREE from "three";

export interface HxeuxfaLoko {
  x: number; z: number; y: number;
  /** ការតម្រង់ទិសការ៉េស្រេចចិត្ត , ចង្កៀងវេទិកាអាចតម្រង់ជួរជាមួយពេជ្ររបស់វា។ */
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
