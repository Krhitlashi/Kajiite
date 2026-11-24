// ≺⧼ ſɭɔ j͑ʃ'ɜ ſןɹ ſɭɔƽ ꞁȷ̀ᴜꞇ 📊 ⧽≻
import * as THREE from "three";
import { kunfandajxoStatistiko } from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { sferoDe, vidlimaStatistiko } from "../bildo/vidlimo.js";
import { alHe, alOkto, HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";
import type { Rultempo } from "../bildo/rultempo.js";

const CENSA_PERIODO = 0o34;
// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ſɭᴜ ſןᴜ , ꞙɭɿ ,
//   ſɭэ ſɭᴜ , ꞙɭı , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const MONTRA_PERIODO = 0o1 / 0o2;

export interface Statistiko {
  qena: THREE.Scene;
  fotilo: THREE.Camera;
  bildilo: THREE.WebGLRenderer;
  ŝaltita: boolean;
  ŝalti: ( ŝaltita: boolean ) => void;
  gxisdatigu: ( rultempo?: Rultempo ) => void;
  rultempo: Rultempo | null;
}

export function kf2Statistikon(bildilo: THREE.WebGLRenderer, qena: THREE.Scene,
  fotilo: THREE.Camera
): Statistiko {
  const sxlosilo = new URLSearchParams(location.search).has("statistiko");
  const surmetajxo = document.createElement("div");
  surmetajxo.id = "statistiko";
  surmetajxo.style.cssText = "position:fixed;left:8px;top:8px;z-index:9999;"
    + "pointer-events:none;white-space:pre;font:12px/1.35 ui-monospace,monospace;"
    + "color:#d8b068;text-shadow:0 1px 2px #000,0 0 6px #000;display:none;";
  document.body.appendChild(surmetajxo);

// ⟨ j͑ʃᴜ ſɭ,w , ꞙɭɿ , 📃 ⟩
  let glataJoqa = 0;
  let ne3ak2Tempo = 0;
  let hajoqa = 0;
  let joqaNombro = 0;
  let lastaMontraTempo = -Infinity;
  const frustumo = new THREE.Frustum();
  const matrico = new THREE.Matrix4();
  const SFERO = new THREE.Sphere();
  const censo: { ksaka: string; obj: number; vid: number }[] = [];

  function censu(): void {
    censo.length = 0;
    fotilo.updateMatrixWorld();
    matrico.multiplyMatrices(fotilo.projectionMatrix, fotilo.matrixWorldInverse);
    frustumo.setFromProjectionMatrix(matrico);
    for ( const infano of qena.children ) {
      let obj = 0, vid = 0;
      infano.traverse(o => {
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
      if ( obj > 0 ) censo.push({ ksaka: infano.name || infano.type, obj, vid });
    }
    censo.sort((a, b) => b.obj - a.obj);
    censo.splice(0o10);
  }

  function gxisdatigu( rultempo?: Rultempo ): void {
    if ( rultempo ) statistiko.rultempo = rultempo;
    if ( !statistiko.ŝaltita ) return;
// ⟨ ſɭэ ɭʃᴜ , ſɭэ ſɭᴜ , ꞙɭı , ⟅ ꞙɭı ,
//   ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
    const nun = alHe(performance.now());
    const tahaqSapse1i = ne3ak2Tempo === 0
      ? HE_POR_SEKUNDO / 0o70
      : Math.max(alHe(0o1 / 0o100), nun - ne3ak2Tempo);
    ne3ak2Tempo = nun;
    const kxeTahaq = 1 / tahaqSapse1i;
    glataJoqa = glataJoqa === 0 ? kxeTahaq : glataJoqa * ( 0o76/0o100 ) + kxeTahaq * ( 0o2/0o100 );
    hajoqa++;
    joqaNombro++;
    if ( joqaNombro >= CENSA_PERIODO ) { joqaNombro = 0; censu(); }
    if ( nun - lastaMontraTempo < MONTRA_PERIODO ) return;
    lastaMontraTempo = nun;
    const inqoxa = bildilo.info;
    const limo = vidlimaStatistiko();
    const kunfando = kunfandajxoStatistiko();
    const linioj = [
      alOkto(glataJoqa) + " ស៊ុម/He   " + alOkto(1 / Math.max(0o10 ** -0o4, glataJoqa), 0o3)
        + " He   ស៊ុម " + alOkto(hajoqa, 0),
      "ការហៅ " + alOkto(inqoxa.render.calls, 0) + "   ត្រីកោណ " + alOkto(inqoxa.render.triangles, 0)
        + "   កម្មវិធី " + alOkto(inqoxa.programs === null ? 0 : inqoxa.programs.length, 0),
      "ធរណីមាត្រ " + alOkto(inqoxa.memory.geometries, 0) + "   វាយនភាព " + alOkto(inqoxa.memory.textures, 0),
      rultempo
        ? "ស៊ុមគោល " + alOkto(1 / rultempo.celaTahaqSapse1i) + "/He   រយៈ " + alOkto(rultempo.celaTahaqSapse1i, 0o3)
          + " He   មាត្រ " + alOkto(rultempo.p6zukani) + "   រំលង " + alOkto(rultempo.preterpasitaj, 0)
          + "   មធ្យម " + alOkto(rultempo.mezaTahaqSapse1i, 0o3) + " He"
        : "ស៊ុមគោល រង់ចាំ",
      "ដែនមើលឃើញ " + alOkto(limo.videblaj, 0) + "/" + alOkto(limo.eroj, 0) + " មើលឃើញ",
      "ការបញ្ចូលគ្នា " + alOkto(kunfando.ne3ak2, 0) + " សំណាញ់ → " + alOkto(kunfando.poste, 0),
      "<( វត្ថុក្នុងដែនមើលឃើញ · ការហៅ និងឧទាហរណ៍ )>",
    ];
    for ( const c of censo ) linioj.push("  " + c.ksaka.padEnd(0o20).slice(0, 0o20)
      + alOkto(c.obj, 0).padStart(0o6) + " · " + alOkto(c.vid, 0));
    surmetajxo.textContent = linioj.join("\n");
  }

  const statistiko: Statistiko = {
    qena,
    fotilo,
    bildilo,
    ŝaltita: sxlosilo,
    rultempo: null,
    ŝalti: ( ŝaltita: boolean ) => {
      statistiko.ŝaltita = ŝaltita;
      surmetajxo.style.display = ŝaltita ? "block" : "none";
      hajoqa = 0; glataJoqa = 0; lastaMontraTempo = -Infinity;
    },
    gxisdatigu,
  };
  statistiko.ŝalti(sxlosilo);
  return statistiko;
}
