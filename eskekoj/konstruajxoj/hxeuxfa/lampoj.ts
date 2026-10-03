// ≺⧼ ចង្កៀង 🏮 ⧽≻
import * as THREE from "three";
import { kreiDioritanTeksajxon } from "../../komunajxoj/teksajxoj/diorito.js";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { BOVLA_ALTO, kreiFlamanGeometrion, LANGA_ALTO } from "./flamo.js";
import { kreiFalekon } from "./faleko.js";
import type { HxeuxfaLoko, HxeuxfaSistemo } from "./tipoj.js";
export function konstruiHxeuxfojn(sceno: THREE.Scene,
  spots: HxeuxfaLoko[],
  dioritaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): HxeuxfaSistemo {
  const kolonajGeometrioj: THREE.BufferGeometry[] = [];
  const bovlajGeometrioj: THREE.BufferGeometry[] = [];
  const orajGeometrioj: THREE.BufferGeometry[] = [];
  const flamajLokoj: THREE.Vector3[] = [];

  const lampaMaterialo = dioritaMaterialo.clone();
  const lampaMap = ( dioritaMaterialo.map ?? kreiDioritanTeksajxon() ).clone();
  lampaMap.repeat.set(0o4, 0o4); lampaMap.needsUpdate = true;
  lampaMaterialo.map = lampaMap;
  if ( dioritaMaterialo.bumpMap ) {
    const lampaBump = dioritaMaterialo.bumpMap.clone();
    lampaBump.repeat.set(0o4, 0o4); lampaBump.needsUpdate = true;
    lampaMaterialo.bumpMap = lampaBump;
  }

  for ( const p of spots ) {
    const rotacio = p.rotacio ?? Math.PI / 4;
    const pillar = new THREE.CylinderGeometry(0o5/0o40, 0o13/0o40, 0o155/0o40, 4, 1);
    pillar.rotateY(rotacio);
    pillar.translate(p.x, p.y + 0o155/0o100, p.z);
    kolonajGeometrioj.push(pillar);

    const profilo: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      ...new THREE.SplineCurve([
        new THREE.Vector2(0o5/0o40, 0),
        new THREE.Vector2(0o2/0o10, BOVLA_ALTO * 0.42),
        new THREE.Vector2(0o3/0o10, BOVLA_ALTO * 0.83),
        new THREE.Vector2(0o35/0o100, BOVLA_ALTO),
      ]).getPoints(0o10),
      new THREE.Vector2(0o31/0o100, BOVLA_ALTO),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.67),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.42),
      new THREE.Vector2(0, BOVLA_ALTO * 0.42),
    ];
    const bowl = new THREE.LatheGeometry(profilo, 4);
    bowl.rotateY(rotacio);
    bowl.translate(p.x, p.y + 0o155/0o40, p.z);
    bovlajGeometrioj.push(bowl);

    const rando = new THREE.CylinderGeometry(0o70/0o200, 0o57/0o200, 0o1/0o20, 4, 1);
    rando.rotateY(rotacio);
    rando.translate(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 0.875, p.z);
    orajGeometrioj.push(rando);

    const falekaPinto = 0o32/0o10, falekaSubo = 0o1/0o4, falekaMargxeno = 0o1/0o20;
    for ( let k = 0; k < 4; k++ ) {
      const faleko = kreiFalekon(Math.PI / 4 + k * Math.PI / 2, falekaPinto, falekaSubo, falekaMargxeno, 0o1/0o40, 0o13/0o40, 0o5/0o40, 0o155/0o40);
      faleko.rotateY(rotacio);
      faleko.translate(p.x, p.y + 0o155/0o100, p.z);
      orajGeometrioj.push(faleko);
    }

    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 2, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiGeometriojn(kolonajGeometrioj), lampaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiGeometriojn(bovlajGeometrioj), lampaMaterialo);
  sceno.add(bovloj);

  const orajRandoj = new THREE.Mesh(kunfandiGeometriojn(orajGeometrioj), oraMaterialo);
  sceno.add(orajRandoj);

  // ⟨ អណ្តាតភ្លើង ស្រទាប់បី 📃 ⟩
  const N = flamajLokoj.length;
  const flamaMaterialo = ( koloro: number, opaco: number ) => new THREE.MeshBasicMaterial({
    color: koloro, toneMapped: false, transparent: true, opacity: opaco,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const flamaEkstero = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o35/0o100, 0o21/0o100, 1, 0.7),
    flamaMaterialo(0xff6a1e, 0o35/0o40), N);
  const flamaInterno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o23/0o100, 0o14/0o100, 0o3/0o4, 2.3),
    flamaMaterialo(0xffb545, 0o33/0o40), N);
  const flamaKerno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o10/0o100, 0o4/0o100, 0o1/0o2, 5.1),
    flamaMaterialo(0xfff4d0, 0o5/0o10), N);
  flamaEkstero.frustumCulled = false;
  flamaInterno.frustumCulled = false;
  flamaKerno.frustumCulled = false;
  sceno.add(flamaEkstero, flamaInterno, flamaKerno);

  // ⟨ អណ្តាត 📃 ⟩
  const LANGOJ = 0o3;
  const flamaLangoj = new THREE.InstancedMesh(
    kreiFlamanGeometrion(LANGA_ALTO, 0o11/0o100, 0o6/0o10, 3.7),
    flamaMaterialo(0xff8a2c, 0o17/0o40), N * LANGOJ);
  flamaLangoj.frustumCulled = false;
  sceno.add(flamaLangoj);
  const langajBazoj: THREE.Vector3[] = [];
  const langajFazoj: number[] = [];
  flamajLokoj.forEach(() => {
    const turno = Math.random() * Math.PI * 2;
    for ( let j = 0; j < LANGOJ; j++ ) {
      const a = turno + j / LANGOJ * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
      const r = 0o5/0o100 + Math.random() * 0o4/0o100;
      langajBazoj.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r,
        0o7/0o10 + Math.random() * 0o5/0o10));
      langajFazoj.push(Math.random() * Math.PI * 2);
    }
  });

  const gPozicio = new Float32Array(N * 3);
  const gSemo = new Float32Array(N);
  const gGrando = new Float32Array(N);
  const phases: number[] = [];

  flamajLokoj.forEach(( p, i ) => {
    gPozicio.set([ p.x, p.y + 0o15/0o100, p.z ], i * 3);
    gSemo[i] = Math.random() * 0o140;
    gGrando[i] = 0o20 + Math.random() * 0o10;
    phases.push(Math.random() * Math.PI * 2);
  });

  const gg = new THREE.BufferGeometry();
  gg.setAttribute("position", new THREE.BufferAttribute(gPozicio, 3));
  gg.setAttribute("semo", new THREE.BufferAttribute(gSemo, 1));
  gg.setAttribute("aSize", new THREE.BufferAttribute(gGrando, 1));

  const brilaMaterialo = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOp: { value: 0o15/0o40 },
      uCol: { value: new THREE.Color(0xf8b058) },
      uPR: { value: 1 },
    },
    vertexShader: `
      attribute float semo; attribute float aSize;
      uniform float uTime, uPR;
      varying float vA;
      void main() {
        vA = 0.75 + 0.25 * sin(uTime * 9.0 + semo * 7.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPR * (160.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uCol; uniform float uOp;
      varying float vA;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        gl_FragColor = vec4(uCol, smoothstep(0.5, 0.0, d) * uOp * vA);
      }
    `,
  });

  const brilajPunktoj = new THREE.Points(gg, brilaMaterialo);
  brilajPunktoj.frustumCulled = false;
  sceno.add(brilajPunktoj);
  const LUMOJ = Math.min(0o4, flamajLokoj.length);
  const punktajLumoj: THREE.PointLight[] = [];
  const lumajIndeksoj: number[] = [];
  const lumajDistancoj = new Float32Array(LUMOJ);
  for ( let k = 0; k < LUMOJ; k++ ) {
    const L = new THREE.PointLight(0xf89838, 0o15/0o40, 0o32, 2);
    sceno.add(L);
    punktajLumoj.push(L);
    lumajIndeksoj.push(k);
  }

  let lumCentroX = NaN, lumCentroZ = NaN;
  function sekviLumojn( x: number, z: number ): void {
    if ( LUMOJ === 0 ) return;
    if ( Math.abs(x - lumCentroX) < 0o2 && Math.abs(z - lumCentroZ) < 0o2 ) return;
    lumCentroX = x; lumCentroZ = z;
    for ( let k = 0; k < LUMOJ; k++ ) lumajDistancoj[k] = Infinity;
    for ( let i = 0; i < flamajLokoj.length; i++ ) {
      const p = flamajLokoj[i];
      const sxovX = p.x - x, sxovZ = p.z - z;
      const d = sxovX * sxovX + sxovZ * sxovZ;
      let plejMalproksima = 0;
      for ( let k = 1; k < LUMOJ; k++ ) if ( lumajDistancoj[k] > lumajDistancoj[plejMalproksima] ) plejMalproksima = k;
      if ( d < lumajDistancoj[plejMalproksima] ) {
        lumajDistancoj[plejMalproksima] = d;
        lumajIndeksoj[plejMalproksima] = i;
      }
    }
    for ( let k = 0; k < LUMOJ; k++ ) {
      const p = flamajLokoj[lumajIndeksoj[k]];
      punktajLumoj[k].position.set(p.x, p.y + 0o23/0o100, p.z);
    }
  }
  sekviLumojn(0, 0);

  const M = new THREE.Matrix4();
  flamajLokoj.forEach(( p, i ) => {
    M.makeTranslation(p.x, p.y, p.z);
    flamaEkstero.setMatrixAt(i, M);
    flamaInterno.setMatrixAt(i, M);
    flamaKerno.setMatrixAt(i, M);
    for ( let j = 0; j < LANGOJ; j++ ) flamaLangoj.setMatrixAt(i * LANGOJ + j, M);
  });
  flamaEkstero.instanceMatrix.needsUpdate = true;
  flamaInterno.instanceMatrix.needsUpdate = true;
  flamaKerno.instanceMatrix.needsUpdate = true;
  flamaLangoj.instanceMatrix.needsUpdate = true;

  return { flamaEkstero, flamaInterno, flamaKerno, flamaLangoj, langojPoLampo: LANGOJ,
    langajBazoj, langajFazoj, brilajPunktoj, brilaMaterialo, punktajLumoj,
    lumajIndeksoj, spots: flamajLokoj, phases, sekviLumojn };
}
