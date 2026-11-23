// ≺⧼ j͐ʃɹ ı],ͷ̗ɘw ֭ſɭᴜ j͑ʃᴜꞇ 🪼 ⧽≻
// ⟨ ស្រោម និងសរីរាង្គតុល្យភាព 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { aldoniKombohax2pan, aplikiL2xnPulson, gluuSurfacxon, kf2KombilanMaterialon,
  kf2Korpon, profiloR, surfacxaParto } from "./l2x-komunajxoj.js";
import { kf2GelanCac2sex } from "../komunajxoj/cac2sex/l2x-gelo.js";

const PROFILO: [ number, number ][] = [
  [ 0o2/0o100, -0o1 ],
  [ 0o15/0o100, -0o74/0o100 ],
  [ 0o33/0o100, -0o67/0o100 ],
  [ 0o50/0o100, -0o54/0o100 ],
  [ 0o62/0o100, -0o33/0o100 ],
  [ 0o70/0o100, -0o12/0o100 ],
  [ 0o73/0o100, 0o12/0o100 ],
  [ 0o71/0o100, 0o32/0o100 ],
  [ 0o63/0o100, 0o50/0o100 ],
  [ 0o51/0o100, 0o62/0o100 ],
  [ 0o34/0o100, 0o71/0o100 ],
  [ 0o16/0o100, 0o75/0o100 ],
  [ 0o3/0o100, 0o77/0o100 ],
];

const INGA_Y = 0o43/0o100;
const TENTAKLA_LONGO = 0o130/0o100;

export function vepaqMalneton(cac2sex: THREE.CanvasTexture): PudalMalneto {
  const hate = new THREE.Group();
  const gelo = kf2GelanCac2sex({
    kozuni: "rgb(224,240,232)", qar6xe: "rgb(152,200,184)",
    poluso: "rgb(192,232,208)", polusaForto: 0o45/0o100, grajnoj: 0o470,
  });
  const korpo = kf2Korpon(gelo, cac2sex, PROFILO, 0xd8f0e8, 0x286858);
  korpo.name = "korpo";
  hate.add(korpo);
  aldoniKombohax2pan(hate, PROFILO, kf2KombilanMaterialon(0x60d8b8));

  const statocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6).scale(0o1, 0o6/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8f0e0, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0x48a888, emissiveIntensity: 0o7/0o10,
    }));
  statocisto.name = "statocisto";
  statocisto.position.y = 0o75/0o100;
  surfacxaParto(statocisto);
  hate.add(statocisto);

  const w6qaY = -0o74/0o100;
  const w6qaPukaz = new THREE.Mesh(
    new THREE.TorusGeometry(profiloR(PROFILO, w6qaY), 0o25/0o1000, 0o6, 0o16),
    new THREE.MeshPhysicalMaterial({
      color: 0xb8e4d0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x205848, emissiveIntensity: 0o2/0o10,
    }));
  w6qaPukaz.rotation.x = -Math.PI / 0o2;
  w6qaPukaz.position.y = w6qaY;
  w6qaPukaz.name = "busxo";
  surfacxaParto(w6qaPukaz);
  hate.add(w6qaPukaz);

  const palpaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8e0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x288878, emissiveIntensity: 0o1/0o2,
    side: THREE.DoubleSide,
  });
  const ingaR = profiloR(PROFILO, INGA_Y);
  for ( const s of [ 0o1, -0o1 ] ) {
    const ingo = new THREE.Mesh(new THREE.ConeGeometry(0o6/0o100, 0o12/0o100, 0o10),
      palpaMaterialo);
    ingo.name = "ingo";
    ingo.position.set(s * ingaR, INGA_Y, 0);
    ingo.rotation.z = s * 0o1/0o2;
    ingo.userData.kanto = s;
    surfacxaParto(ingo);
    hate.add(ingo);
    // ⟨ តង់តាក់ 📃 ⟩
    const bazX = s * ingaR;
    const n2k: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      n2k.push(new THREE.Vector3(
        bazX + s * Math.sin(u * Math.PI * 0o3/0o2) * 0o22/0o100,
        INGA_Y - u * TENTAKLA_LONGO,
        Math.sin(u * Math.PI * 0o2 + s) * 0o20/0o100));
    }
    const kkaxte = new THREE.CatmullRomCurve3(n2k);
    const hakek: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kkaxte, 0o16, 0o3/0o1000, 0o6) ];
    for ( let i = 1; i < 0o16; i++ ) {
      const p = kkaxte.getPoint(i / 0o16);
      const haro = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o12/0o100, 0o4);
      haro.rotateZ(s * ( 0o4/0o5 + ( i % 0o2 ? 0o15/0o100 : -0o15/0o100 )));
      haro.translate(p.x, p.y, p.z);
      hakek.push(haro);
    }
    const palpo = new THREE.Mesh(mergeGeometries(hakek)!, palpaMaterialo);
    palpo.name = "palpo";
    palpo.userData.kanto = s;
    surfacxaParto(palpo);
    hate.add(palpo);
  }

  return { malneto: hate, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
    teru: 0o63/0o100, pudal: "l2xlpuhasai",
    pulsaRapido: 0o4, pulsaForto: 0o3/0o40, pulsaOndo: 0o1/0o10,
    plata: 0o7/0o10 };
}

export function gxisdatigiPleŭrobrakian(b: Paga, t: number): void {
  const pulso = aplikiL2xnPulson(b, t);
  let i = 0;
  for ( const kek of b.animajxoj ) {
    if ( kek.name === "palpo" ) {
      gluuSurfacxon(kek, pulso);
      kek.rotation.x = Math.sin(t * 0o1/0o2 + b.phase + i) * 0o2/0o10;
      kek.rotation.z = Math.cos(t * 0o3/0o4 + b.phase + i) * 0o1/0o10;
      i++;
    } else if ( kek.name === "ingo" || kek.name === "statocisto"
      || kek.name === "busxo" ) {
      gluuSurfacxon(kek, pulso);
    }
  }
  b.hate.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o3/0o100;
}
