// ≺⧼ ſןᴜȝ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ ʌ j͑ʃɹ ſɟᴜ ı],ɹͷ̗ 🏛️ ⧽≻
import * as THREE from "three";
import { preniTavolajnGeometriojn } from "../../eskekoj/hapaq/satalaj-hapaq.js";
import { aldoniEnirejon } from "../../eskekoj/hapaq/satalaj/enirejo.js";
import { aldoniPilolFenestron } from "../../eskekoj/hapaq/satalaj/fenestroj.js";
import { alOkto } from "../../kantaoj/komunajxoj/unuoj.js";

interface Vecax2l {
  verticoj: number;
  trianguloj: number;
  geometrioj: number;
}

function mezuriRadikon( zace: THREE.Object3D ): Vecax2l {
  const vecax2l = { verticoj: 0, trianguloj: 0, geometrioj: 0 };
  zace.traverse(objekto => {
    const mesho = objekto as THREE.Mesh;
    if ( !mesho.isMesh ) return;
    const geometrio = mesho.geometry;
    vecax2l.verticoj += geometrio.getAttribute("position").count;
    vecax2l.trianguloj += ( geometrio.index?.count ?? geometrio.getAttribute("position").count ) / 3;
    vecax2l.geometrioj++;
  });
  return vecax2l;
}

function raporti( ksaka: string, zace: THREE.Object3D ): Vecax2l {
  const vecax2l = mezuriRadikon(zace);
  console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ${ksaka} | កំពូល ${alOkto(vecax2l.verticoj, 0)} | ត្រីកោណ ${alOkto(vecax2l.trianguloj, 0)} | ធរណីមាត្រ ${alOkto(vecax2l.geometrioj, 0)}`);
  return vecax2l;
}

const tavolaj = preniTavolajnGeometriojn("domo", 0o10, 0o10, 0o4, 0o4);
const tavolaGrupo = new THREE.Group();
tavolaGrupo.add(new THREE.Mesh(tavolaj.muroj, new THREE.MeshStandardMaterial()));
tavolaGrupo.add(new THREE.Mesh(tavolaj.hajoqa, new THREE.MeshStandardMaterial()));
raporti("ស្រទាប់ 0o4", tavolaGrupo);

const eniraGrupo = new THREE.Group();
aldoniEnirejon(eniraGrupo, 0o10, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial());
raporti("ច្រកចូល", eniraGrupo);

const fenestraGrupo = new THREE.Group();
aldoniPilolFenestron(fenestraGrupo, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial(),
  0, 0, 0o4, 0o1, 0o4, 0o1);
raporti("បង្អួច", fenestraGrupo);
