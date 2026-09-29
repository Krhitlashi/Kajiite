// ≺⧼ La lampaj tipoj 🏮 ⧽≻
// La datumaj tipoj de la lampoj — la loko de unu lampo ( HxeuxfaLoko ) kaj la
// tuta konstruita sistemo kun siaj flamaj kaj lumaj partoj ( HxeuxfaSistemo ).
import * as THREE from "three";

export interface HxeuxfaLoko {
  x: number; z: number; y: number;
  /** Nedeviga kvadrata orientiĝo; platformaj lampoj povas vicigi kun sia rombo. */
  rotacio?: number;
}

export interface HxeuxfaSistemo {
  flamaEkstero: THREE.InstancedMesh;
  flamaInterno: THREE.InstancedMesh;
  flamaKerno: THREE.InstancedMesh;   // la varma kerno ĉe la bazo
  flamaLangoj: THREE.InstancedMesh;  // la malgrandaj langoj, kiuj lekas supren
  langojPoLampo: number;
  langajBazoj: THREE.Vector3[];      // x, z = deŝovo de la lango; y = larĝa multiplikilo
  langajFazoj: number[];
  brilajPunktoj: THREE.Points;
  brilaMaterialo: THREE.ShaderMaterial;
  punktajLumoj: THREE.PointLight[];
  lumajIndeksoj: number[];      // la flama indico sur kiu sidas ĉiu el la kvar lumoj
  spots: THREE.Vector3[];
  phases: number[];
  sekviLumojn: ( x: number, z: number ) => void;
}
