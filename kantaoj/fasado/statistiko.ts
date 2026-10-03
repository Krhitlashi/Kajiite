// ≺⧼ ស្ថិតិ 📊 ⧽≻
import * as THREE from "three";
import { kunfandajxoStatistiko } from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { sferoDe, vidlimaStatistiko } from "../bildo/vidlimo.js";
import { HE_POR_SEKUNDO } from "../komunajxoj/unuoj.js";

const CENSA_PERIODO = 0o34;

export interface Statistiko {
  sceno: THREE.Scene;
  fotilo: THREE.Camera;
  bildilo: THREE.WebGLRenderer;
  ŝaltita: boolean;
  ŝalti: ( ŝaltita: boolean ) => void;
  gxisdatigu: () => void;
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

  function gxisdatigu(): void {
    if ( !statistiko.ŝaltita ) return;
    const nun = performance.now();
    const kadraTempo = antaŭaTempo === 0 ? 0o1/0o70 : Math.max(0o1/0o100, nun - antaŭaTempo) / 0o1750;
    antaŭaTempo = nun;
    const tujKadro = 1 / kadraTempo;
    glataKadro = glataKadro === 0 ? tujKadro : glataKadro * ( 0o76/0o100 ) + tujKadro * ( 0o2/0o100 );
    kadroj++;
    kadraNombro++;
    const informo = bildilo.info;
    const limo = vidlimaStatistiko();
    const kunfando = kunfandajxoStatistiko();
    if ( kadraNombro >= CENSA_PERIODO ) { kadraNombro = 0; censu(); }
    const linioj = [
      (glataKadro / HE_POR_SEKUNDO).toFixed(1) + " ហ្វ្រេម/He   " + (HE_POR_SEKUNDO / Math.max(1e-4, glataKadro)).toFixed(3) + " He   ហ្វ្រេម " + kadroj,
      "ការហៅ " + informo.render.calls + "   ត្រីកោណ " + (informo.render.triangles / 1e6).toFixed(1) + " M"
        + "   កម្មវិធី " + (informo.programs === null ? 0 : informo.programs.length),
      "ធរណីមាត្រ " + informo.memory.geometries + "   វាយនភាព " + informo.memory.textures,
      "ដែនមើលឃើញ " + limo.videblaj + "/" + limo.eroj + " មើលឃើញ",
      "ការបញ្ចូលគ្នា " + kunfando.antaŭe + " សំណាញ់ → " + kunfando.poste,
      "<( វត្ថុក្នុងដែនមើលឃើញ · ការហៅ និងឧទាហរណ៍ )>",
    ];
    for ( const c of censo ) linioj.push("  " + c.nomo.padEnd(0o20).slice(0, 0o20) + String(c.obj).padStart(0o6) + " · " + String(c.vid));
    surmetajxo.textContent = linioj.join("\n");
  }

  const statistiko: Statistiko = {
    sceno,
    fotilo,
    bildilo,
    ŝaltita: sxlosilo,
    ŝalti: ( ŝaltita: boolean ) => {
      statistiko.ŝaltita = ŝaltita;
      surmetajxo.style.display = ŝaltita ? "block" : "none";
      kadroj = 0; glataKadro = 0;
    },
    gxisdatigu,
  };
  statistiko.ŝalti(sxlosilo);
  return statistiko;
}
