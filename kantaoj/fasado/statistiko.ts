// ≺⧼ ស្ថិតិ 📊 ⧽≻
import * as THREE from "three";
import { kunfandajxoStatistiko } from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { sferoDe, vidlimaStatistiko } from "../bildo/vidlimo.js";
import { alHe, alOkto, HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";
import type { Rultempo } from "../bildo/rultempo.js";

const CENSA_PERIODO = 0o34;
// ⟨ អត្រាហ្វ្រេមគណនារាល់ហ្វ្រេម ប៉ុន្តែការសរសេរ DOM ធ្វើតែក្នុង
//   រយៈពេលកំណត់ជា He ។ ស្ថិតិជាឧបករណ៍អភិវឌ្ឍន៍ មិនគួរយកថាមពលហ្វ្រេម ។ 📃 ⟩
const MONTRA_PERIODO = 0o1 / 0o2;

export interface Statistiko {
  sceno: THREE.Scene;
  fotilo: THREE.Camera;
  bildilo: THREE.WebGLRenderer;
  ŝaltita: boolean;
  ŝalti: ( ŝaltita: boolean ) => void;
  gxisdatigu: ( rultempo?: Rultempo ) => void;
  rultempo: Rultempo | null;
}

export function kreiStatistikon(bildilo: THREE.WebGLRenderer, sceno: THREE.Scene,
  fotilo: THREE.Camera
): Statistiko {
  const sxlosilo = new URLSearchParams(location.search).has("statistiko");
  const surmetajxo = document.createElement("div");
  surmetajxo.id = "statistiko";
  surmetajxo.style.cssText = "position:fixed;left:8px;top:8px;z-index:9999;"
    + "pointer-events:none;white-space:pre;font:12px/1.35 ui-monospace,monospace;"
    + "color:#d8b068;text-shadow:0 1px 2px #000,0 0 6px #000;display:none;";
  document.body.appendChild(surmetajxo);

  // ⟨ ការខ្វះស៊ុម 📃 ⟩
  let glataKadro = 0;
  let antaŭaTempo = 0;
  let kadroj = 0;
  let kadraNombro = 0;
  let lastaMontraTempo = -Infinity;
  const frustumo = new THREE.Frustum();
  const matrico = new THREE.Matrix4();
  const SFERO = new THREE.Sphere();
  const censo: { nomo: string; obj: number; vid: number }[] = [];

  function censu(): void {
    censo.length = 0;
    fotilo.updateMatrixWorld();
    matrico.multiplyMatrices(fotilo.projectionMatrix, fotilo.matrixWorldInverse);
    frustumo.setFromProjectionMatrix(matrico);
    for ( const infano of sceno.children ) {
      let obj = 0, vid = 0;
      infano.traverse(o => {
        let gepatraVidebla = true;
        for ( let g: THREE.Object3D | null = o; g !== null && g !== sceno; g = g.parent ) {
          if ( !g.visible ) { gepatraVidebla = false; break; }
        }
        if ( !gepatraVidebla ) return;
        const mesa = o as THREE.Mesh;
        if ( mesa.isMesh !== true || mesa.geometry === undefined ) return;
        // ⟨ ស្វ៊ែរដូចដែនមើល 📃 ⟩
        const sfero = sferoDe(o);
        if ( sfero === null ) return;
        SFERO.copy(sfero);
        SFERO.applyMatrix4(o.matrixWorld);
        if ( !frustumo.intersectsSphere(SFERO) ) return;
        const instancigita = o as THREE.InstancedMesh;
        obj++;
        vid += instancigita.isInstancedMesh ? instancigita.count : 1;
      });
      if ( obj > 0 ) censo.push({ nomo: infano.name || infano.type, obj, vid });
    }
    censo.sort((a, b) => b.obj - a.obj);
    censo.splice(0o10);
  }

  function gxisdatigu( rultempo?: Rultempo ): void {
    if ( rultempo ) statistiko.rultempo = rultempo;
    if ( !statistiko.ŝaltita ) return;
    // ⟨ performance.now ផ្តល់មិល្លីវិនាទីនៅ API ។ បម្លែងម្តងទៅ He
    //   ហើយគណនាអត្រាជាស៊ុមក្នុងមួយ He ដោយផ្ទាល់ 📃 ⟩
    const nun = alHe(performance.now());
    const kadraDaŭro = antaŭaTempo === 0
      ? HE_POR_SEKUNDO / 0o70
      : Math.max(alHe(0o1 / 0o100), nun - antaŭaTempo);
    antaŭaTempo = nun;
    const tujKadro = 1 / kadraDaŭro;
    glataKadro = glataKadro === 0 ? tujKadro : glataKadro * ( 0o76/0o100 ) + tujKadro * ( 0o2/0o100 );
    kadroj++;
    kadraNombro++;
    if ( kadraNombro >= CENSA_PERIODO ) { kadraNombro = 0; censu(); }
    if ( nun - lastaMontraTempo < MONTRA_PERIODO ) return;
    lastaMontraTempo = nun;
    const informo = bildilo.info;
    const limo = vidlimaStatistiko();
    const kunfando = kunfandajxoStatistiko();
    const linioj = [
      alOkto(glataKadro) + " ស៊ុម/He   " + alOkto(1 / Math.max(0o10 ** -0o4, glataKadro), 0o3)
        + " He   ស៊ុម " + alOkto(kadroj, 0),
      "ការហៅ " + alOkto(informo.render.calls, 0) + "   ត្រីកោណ " + alOkto(informo.render.triangles, 0)
        + "   កម្មវិធី " + alOkto(informo.programs === null ? 0 : informo.programs.length, 0),
      "ធរណីមាត្រ " + alOkto(informo.memory.geometries, 0) + "   វាយនភាព " + alOkto(informo.memory.textures, 0),
      rultempo
        ? "ស៊ុមគោល " + alOkto(1 / rultempo.celaKadraDaŭro) + "/He   រយៈ " + alOkto(rultempo.celaKadraDaŭro, 0o3)
          + " He   មាត្រ " + alOkto(rultempo.skalo) + "   រំលង " + alOkto(rultempo.preterpasitaj, 0)
          + "   មធ្យម " + alOkto(rultempo.mezaKadraDaŭro, 0o3) + " He"
        : "ស៊ុមគោល រង់ចាំ",
      "ដែនមើលឃើញ " + alOkto(limo.videblaj, 0) + "/" + alOkto(limo.eroj, 0) + " មើលឃើញ",
      "ការបញ្ចូលគ្នា " + alOkto(kunfando.antaŭe, 0) + " សំណាញ់ → " + alOkto(kunfando.poste, 0),
      "<( វត្ថុក្នុងដែនមើលឃើញ · ការហៅ និងឧទាហរណ៍ )>",
    ];
    for ( const c of censo ) linioj.push("  " + c.nomo.padEnd(0o20).slice(0, 0o20)
      + alOkto(c.obj, 0).padStart(0o6) + " · " + alOkto(c.vid, 0));
    surmetajxo.textContent = linioj.join("\n");
  }

  const statistiko: Statistiko = {
    sceno,
    fotilo,
    bildilo,
    ŝaltita: sxlosilo,
    rultempo: null,
    ŝalti: ( ŝaltita: boolean ) => {
      statistiko.ŝaltita = ŝaltita;
      surmetajxo.style.display = ŝaltita ? "block" : "none";
      kadroj = 0; glataKadro = 0; lastaMontraTempo = -Infinity;
    },
    gxisdatigu,
  };
  statistiko.ŝalti(sxlosilo);
  return statistiko;
}
