// ≺⧼ Statistiko 📊 ⧽≻
// La diagnoza surmeto. La agordo de la bildigo estas nevidebla el la ludado.
// oni vidas la fram-mankon sed ne KIU kostas ĝin. Ĉi tiu modulo
// montras la verajn nombrojn de la bildilo ( renderer.info ) plus la staton de
// la vidlimo ( src/vidlimo.ts ) kaj la objekto-censon de la sceno, do ĉiu
// plibonigo de la rendimento mezuriĝas anstataŭ diveniĝi.
//
// Ŝaltita per la adreso ?statistiko ( aŭ per la konzolo: statistiko.ŝalti(true) ).
// La surmetaĵo algluiĝas al la supra maldekstra angulo kaj neniam kaptas la
// muson — la ludado restas plene funkcia sub ĝi.
import * as THREE from "three";
import { kunfandajxoStatistiko } from "../assets/komunajxoj/kunfandajxoj.js";
import { vidlimaStatistiko } from "./vidlimo.js";
import { HE_POR_SEKUNDO } from "./unuoj.js";

// Kiom da kadroj inter la scenaj censoj. La censo trairas la tutan scenon ( kiel
// la bildigo mem ), do ĝi ne rulas ĉiukadre — la nombroj estas stabilaj kaj la
// krado de la surmetaĵo legiĝas pli bone.
const CENSA_PERIODO = 0o34;   // 28

export interface Statistiko {
  // La sceno kaj la bildilo ankaŭ elportas — la konzolo tiel povas esplori la
  // scen-grafon ( statistiko.sceno.children, .render.info ) dum ludado.
  sceno: THREE.Scene;
  fotilo: THREE.Camera;
  bildilo: THREE.WebGLRenderer;
  ŝaltita: boolean;
  ŝalti: ( ŝaltita: boolean ) => void;
  gxisdatigu: () => void;
}

// kreiStatistikon — Konstruu la diagnozan surmetaĵon.
//     @param bildilo ( THREE.WebGLRenderer ) - La bildilo legata ( info.render ).
//     @param sceno ( THREE.Scene ) - La sceno por la objekto-censo.
//     @param fotilo ( THREE.Camera ) - La aktiva fotilo por la vida censo.
//     @returns ( Statistiko ) - La regilo ( ŝalti / gxisdatigu ).
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

  // ⟨ La fram-manko 📃 ⟩ — mezurita per performance.now(), NE per la horloĝo de
  // la ludo. Tiu horloĝo estas dividata kun la tuta simulado ( kaj vokiĝas ankaŭ
  // aliloke ), do ĝia delta foje estas proksima al nulo kaj la nombresprimado
  // mensogus ( ĝi raportis "0o251 kadroj en He" dum la vera ritmo estis 0o5 ).
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
      // `obj` = la objektoj kiuj pasus la vidkampon ( ≈ desegnaj alvokoj, ĉar
      // ĉiu InstancedMesh estas unu alvoko ); `vid` = la instancoj ( la pezo ).
      let obj = 0, vid = 0;
      infano.traverse(o => {
        let gepatraVidebla = true;
        for ( let g: THREE.Object3D | null = o; g !== null && g !== sceno; g = g.parent ) {
          if ( !g.visible ) { gepatraVidebla = false; break; }
        }
        if ( !gepatraVidebla ) return;
        const mesa = o as THREE.Mesh;
        if ( mesa.isMesh !== true || mesa.geometry === undefined ) return;
        if ( mesa.geometry.boundingSphere === null ) mesa.geometry.computeBoundingSphere();
        SFERO.copy(mesa.geometry.boundingSphere!);
        SFERO.applyMatrix4(o.matrixWorld);
        // La limiga sfero de instancigita tavolo estas la UNIO de ĉiuj ĝiaj
        // instancoj — la sama takso kiun la vidkampo mem faras, do la nombroj
        // kongruas kun la alvokoj de la bildilo.
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
    // La unua kadro ankoraŭ ne havas antaŭulon — prenu 0o1/0o70 ( ≈ 0o32 kadroj
    // en He ) kiel semon.
    const kadraTempo = antaŭaTempo === 0 ? 0o1/0o70 : Math.max(0o1/0o100, nun - antaŭaTempo) / 1000;
    antaŭaTempo = nun;
    const tujKadro = 1 / kadraTempo;
    // La EMA ( 62/64 + 2/64 ≈ 32-kadra konstanto ) — la kruda nombro saltadas
    // tro multe por legiĝi.
    glataKadro = glataKadro === 0 ? tujKadro : glataKadro * ( 0o76/0o100 ) + tujKadro * ( 0o2/0o100 );
    kadroj++;
    kadraNombro++;
    const informo = bildilo.info;
    const limo = vidlimaStatistiko();
    const kunfando = kunfandajxoStatistiko();
    if ( kadraNombro >= CENSA_PERIODO ) { kadraNombro = 0; censu(); }
    const linioj = [
      (glataKadro / HE_POR_SEKUNDO).toFixed(1) + " kadroj/He   " + (HE_POR_SEKUNDO / Math.max(1e-4, glataKadro)).toFixed(3) + " He   kadroj " + kadroj,
      "alvokoj " + informo.render.calls + "   trianguloj " + (informo.render.triangles / 1e6).toFixed(1) + " M"
        + "   programoj " + (informo.programs === null ? 0 : informo.programs.length),
      "geometrioj " + informo.memory.geometries + "   teksturoj " + informo.memory.textures,
      "vidlimo " + limo.videblaj + "/" + limo.eroj + " videblaj",
      "kunfando " + kunfando.antaŭe + " meshoj → " + kunfando.poste,
      "<( La objektoj en la vidkampo · alvokoj kaj instancoj )>",
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
