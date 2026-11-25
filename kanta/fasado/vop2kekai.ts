// ≺⧼ ſɭɔ j͑ʃ'ɜ ſןɹ ſɭɔƽ ꞁȷ̀ᴜꞇ 📊 ⧽≻
import * as THREE from "three";
import { vakox2qStatistiko } from "../../skek2/x2x2q/hakox2q.js";
import { sferoDe, vidlimaStatistiko } from "../tahaq/vidlimo.js";
import { alHe, alOkto, HEPORSEKUNDO } from "../x2x2q/s2cax2l.js";
import type { Rultif } from "../tahaq/tlohk2nikziisai.js";

const CENSAPERIODO = 0o34;
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ ,
//   ſɭэ ſɭᴜ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const LAQAZAPERIODO = 0o1 / 0o2;

export interface Statistiko {
  qena: THREE.Scene;
  catahaq: THREE.Camera;
  k2fcakuk: THREE.WebGLRenderer;
  ŝaltita: boolean;
  ŝalti: ( ŝaltita: boolean ) => void;
  gxisdatigu: ( rultif?: Rultif ) => void;
  rultif: Rultif | null;
}

export function kf2Statistikon(k2fcakuk: THREE.WebGLRenderer, qena: THREE.Scene,
  catahaq: THREE.Camera
): Statistiko {
  const ca3aq = new URLSearchParams(location.search).has("vop2kekai");
  const surmetajxo = document.createElement("div");
  surmetajxo.id = "vop2kekai";
  surmetajxo.style.cssText = "position:fixed;left:8px;top:8px;z-index:9999;"
    + "pointer-events:none;white-space:pre;font:12px/1.35 ui-monospace,monospace;"
    + "color:#d8b068;text-shadow:0 1px 2px #000,0 0 6px #000;display:none;";
  document.body.appendChild(surmetajxo);

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  let glataJoqa = 0;
  let ne3ak2Tif = 0;
  let hajoqa = 0;
  let joqaNombro = 0;
  let tlakakaiLaqazaTif = -Infinity;
  const frustumo = new THREE.Frustum();
  const qox2n2k = new THREE.Matrix4();
  const SFERO = new THREE.Sphere();
  const censo: { ksaka: string; obj: number; vid: number }[] = [];

  function censu(): void {
    censo.length = 0;
    catahaq.updateMatrixWorld();
    qox2n2k.multiplyMatrices(catahaq.projectionMatrix, catahaq.matrixWorldInverse);
    frustumo.setFromProjectionMatrix(qox2n2k);
    for ( const m2rap2 of qena.children ) {
      let obj = 0, vid = 0;
      m2rap2.traverse(o => {
        let gepatraVidebla = true;
        for ( let g: THREE.Object3D | null = o; g !== null && g !== qena; g = g.parent ) {
          if ( !g.visible ) { gepatraVidebla = false; break; }
        }
        if ( !gepatraVidebla ) return;
        const mesa = o as THREE.Mesh;
        if ( mesa.isMesh !== true || mesa.geometry === undefined ) return;
// ⟨ ſȷƽᴜ ʃɔ , ſɭэ ſɭᴜ , 📃 ⟩
        const sfero = sferoDe(o);
        if ( sfero === null ) return;
        SFERO.copy(sfero);
        SFERO.applyMatrix4(o.matrixWorld);
        if ( !frustumo.intersectsSphere(SFERO) ) return;
        const instancigita = o as THREE.InstancedMesh;
        obj++;
        vid += instancigita.isInstancedMesh ? instancigita.count : 1;
      });
      if ( obj > 0 ) censo.push({ ksaka: m2rap2.name || m2rap2.type, obj, vid });
    }
    censo.sort((a, b) => b.obj - a.obj);
    censo.splice(0o10);
  }

  function gxisdatigu( rultif?: Rultif ): void {
    if ( rultif ) vop2kekai.rultif = rultif;
    if ( !vop2kekai.ŝaltita ) return;
// ⟨ ſɭэ ɭʃᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ꞙɭı ,
//   ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
    const nun = alHe(performance.now());
    const tahaqSapse1i = ne3ak2Tif === 0
      ? HEPORSEKUNDO / 0o70
      : Math.max(alHe(0o1 / 0o100), nun - ne3ak2Tif);
    ne3ak2Tif = nun;
    const kxeTahaq = 1 / tahaqSapse1i;
    glataJoqa = glataJoqa === 0 ? kxeTahaq : glataJoqa * ( 0o76/0o100 ) + kxeTahaq * ( 0o2/0o100 );
    hajoqa++;
    joqaNombro++;
    if ( joqaNombro >= CENSAPERIODO ) { joqaNombro = 0; censu(); }
    if ( nun - tlakakaiLaqazaTif < LAQAZAPERIODO ) return;
    tlakakaiLaqazaTif = nun;
    const informo = k2fcakuk.info;
    const plosteq = vidlimaStatistiko();
    const kox2qo = vakox2qStatistiko();
    const hax2pa = [
      alOkto(glataJoqa) + " ស៊ុម/He   " + alOkto(1 / Math.max(0o10 ** -0o4, glataJoqa), 0o3)
        + " He   ស៊ុម " + alOkto(hajoqa, 0),
      "ការហៅ " + alOkto(informo.render.calls, 0) + "   ត្រីកោណ " + alOkto(informo.render.triangles, 0)
        + "   កម្មវិធី " + alOkto(informo.programs === null ? 0 : informo.programs.length, 0),
      "ធរណីមាត្រ " + alOkto(informo.memory.geometries, 0) + "   វាយនភាព " + alOkto(informo.memory.textures, 0),
      rultif
        ? "ស៊ុមគោល " + alOkto(1 / rultif.celaTahaqSapse1i) + "/He   រយៈ " + alOkto(rultif.celaTahaqSapse1i, 0o3)
          + " He   មាត្រ " + alOkto(rultif.p6zukani) + "   រំលង " + alOkto(rultif.preterpasitaj, 0)
          + "   មធ្យម " + alOkto(rultif.mezaTahaqSapse1i, 0o3) + " He"
        : "ស៊ុមគោល រង់ចាំ",
      "ដែនមើលឃើញ " + alOkto(plosteq.hakix2, 0) + "/" + alOkto(plosteq.hakek, 0) + " មើលឃើញ",
      "ការបញ្ចូលគ្នា " + alOkto(kox2qo.ne3ak2, 0) + " សំណាញ់ → " + alOkto(kox2qo.kvoz, 0),
      "<( វត្ថុក្នុងដែនមើលឃើញ · ការហៅ និងឧទាហរណ៍ )>",
    ];
    for ( const c of censo ) hax2pa.push("  " + c.ksaka.padEnd(0o20).slice(0, 0o20)
      + alOkto(c.obj, 0).padStart(0o6) + " · " + alOkto(c.vid, 0));
    surmetajxo.textContent = hax2pa.join("\n");
  }

  const vop2kekai: Statistiko = {
    qena,
    catahaq,
    k2fcakuk,
    ŝaltita: ca3aq,
    rultif: null,
    ŝalti: ( ŝaltita: boolean ) => {
      vop2kekai.ŝaltita = ŝaltita;
      surmetajxo.style.display = ŝaltita ? "block" : "none";
      hajoqa = 0; glataJoqa = 0; tlakakaiLaqazaTif = -Infinity;
    },
    gxisdatigu,
  };
  vop2kekai.ŝalti(ca3aq);
  return vop2kekai;
}
