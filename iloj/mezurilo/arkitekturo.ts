// ≺⧼ ការវាស់ធរណីមាត្រស្ថាបត្យកម្ម 🏛️ ⧽≻
import * as THREE from "three";
import { preniTavolajnGeometriojn } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { aldoniEnirejon } from "../../eskekoj/konstruajxoj/satalaj/enirejo.js";
import { aldoniPilolFenestron } from "../../eskekoj/konstruajxoj/satalaj/fenestroj.js";
import { alOkto } from "../../kantaoj/komunajxoj/unuoj.js";

interface Mezuro {
  verticoj: number;
  trianguloj: number;
  geometrioj: number;
}

function mezuriRadikon( radiko: THREE.Object3D ): Mezuro {
  const mezuro = { verticoj: 0, trianguloj: 0, geometrioj: 0 };
  radiko.traverse(objekto => {
    const mesho = objekto as THREE.Mesh;
    if ( !mesho.isMesh ) return;
    const geometrio = mesho.geometry;
    mezuro.verticoj += geometrio.getAttribute("position").count;
    mezuro.trianguloj += ( geometrio.index?.count ?? geometrio.getAttribute("position").count ) / 3;
    mezuro.geometrioj++;
  });
  return mezuro;
}

function raporti( nomo: string, radiko: THREE.Object3D ): Mezuro {
  const mezuro = mezuriRadikon(radiko);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${nomo} | កំពូល ${alOkto(mezuro.verticoj, 0)} | ត្រីកោណ ${alOkto(mezuro.trianguloj, 0)} | ធរណីមាត្រ ${alOkto(mezuro.geometrioj, 0)}`);
  return mezuro;
}

const tavolaj = preniTavolajnGeometriojn("domo", 0o10, 0o10, 0o4, 0o4);
const tavolaGrupo = new THREE.Group();
tavolaGrupo.add(new THREE.Mesh(tavolaj.muroj, new THREE.MeshStandardMaterial()));
tavolaGrupo.add(new THREE.Mesh(tavolaj.kadroj, new THREE.MeshStandardMaterial()));
raporti("ស្រទាប់ 0o4", tavolaGrupo);

const eniraGrupo = new THREE.Group();
aldoniEnirejon(eniraGrupo, 0o10, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial());
raporti("ច្រកចូល", eniraGrupo);

const fenestraGrupo = new THREE.Group();
aldoniPilolFenestron(fenestraGrupo, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial(),
  0, 0, 0o4, 0o1, 0o4, 0o1);
raporti("បង្អួច", fenestraGrupo);
