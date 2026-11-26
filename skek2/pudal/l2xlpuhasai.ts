// ≺⧼ j͐ʃɹ ı],ͷ̗ɘw ֭ſɭᴜ j͑ʃᴜꞇ 🪼 ⧽≻
// ⟨ ſɭɔ˞ɹ ɭʃᴜ , ſɟꞇ ᶅſɔƽ ʌ ſןw ſןᴜ ֭ſɭᴜƽ 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { tlunakKombohax2pan, aplikiLiixnPulson, gluuSurfacxon, kf2KombilanPukekn,
  kf2Korpon, s2qenaR, sozaParto } from "./l2x-hax2x2q.js";
import { kf2GelanCac2sex } from "../x2x2q/cac2sex/l2x-gelo.js";

const S2qena: [ number, number ][] = [
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

const INGAY = 0o43/0o100;
const TENTAKLALONGO = 0o130/0o100;

export function vepaqMalneton(cac2sex: THREE.CanvasTexture): PudalMalneto {
  const hate2 = new THREE.Group();
  const gelo = kf2GelanCac2sex({
    kozuni: "rgb(224,240,232)", qar6xe: "rgb(152,200,184)",
    poluso: "rgb(192,232,208)", polusaG2sa: 0o45/0o100, hacehe: 0o470,
  });
  const soq = kf2Korpon(gelo, cac2sex, S2qena, 0xd8f0e8, 0x286858);
  soq.name = "korpo";
  hate2.add(soq);
  tlunakKombohax2pan(hate2, S2qena, kf2KombilanPukekn(0x60d8b8));

  const s2k61ocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o5/0o100, 0o10, 0o6).scale(0o1, 0o6/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8f0e0, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0x48a888, emissiveIntensity: 0o7/0o10,
    }));
  s2k61ocisto.name = "s2k61ocisto";
  s2k61ocisto.position.y = 0o75/0o100;
  sozaParto(s2k61ocisto);
  hate2.add(s2k61ocisto);

  const w6qaY = -0o74/0o100;
  const w6qaPukaz = new THREE.Mesh(
    new THREE.TorusGeometry(s2qenaR(S2qena, w6qaY), 0o25/0o1000, 0o6, 0o16),
    new THREE.MeshPhysicalMaterial({
      color: 0xb8e0d0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x205848, emissiveIntensity: 0o2/0o10,
    }));
  w6qaPukaz.rotation.x = -Math.PI / 0o2;
  w6qaPukaz.position.y = w6qaY;
  w6qaPukaz.name = "tlace";
  sozaParto(w6qaPukaz);
  hate2.add(w6qaPukaz);

  const palpaPukek = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8e0, transparent: true, opacity: 0o1/0o2, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x288878, emissiveIntensity: 0o1/0o2,
    side: THREE.DoubleSide,
  });
  const ingaR = s2qenaR(S2qena, INGAY);
  for ( const s of [ 0o1, -0o1 ] ) {
    const ingo = new THREE.Mesh(new THREE.ConeGeometry(0o6/0o100, 0o12/0o100, 0o10),
      palpaPukek);
    ingo.name = "ingo";
    ingo.position.set(s * ingaR, INGAY, 0o0);
    ingo.rotation.z = s * 0o1/0o2;
    ingo.userData.vek2fe = s;
    sozaParto(ingo);
    hate2.add(ingo);
    // ⟨ j͐ʃᴜ ſןɔȝ 📃 ⟩
    const bazX = s * ingaR;
    const n2k: THREE.Vector3[] = [];
    for ( let i = 0o0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      n2k.push(new THREE.Vector3(
        bazX + s * Math.sin(u * Math.PI * 0o3/0o2) * 0o22/0o100,
        INGAY - u * TENTAKLALONGO,
        Math.sin(u * Math.PI * 0o2 + s) * 0o20/0o100));
    }
    const kkaxte = new THREE.CatmullRomCurve3(n2k);
    const hakek: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kkaxte, 0o16, 0o3/0o1000, 0o6) ];
    for ( let i = 0o1; i < 0o16; i++ ) {
      const p = kkaxte.getPoint(i / 0o16);
      const tsaq = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o12/0o100, 0o4);
      tsaq.rotateZ(s * ( 0o4/0o5 + ( i % 0o2 ? 0o15/0o100 : -0o15/0o100 )));
      tsaq.translate(p.x, p.y, p.z);
      hakek.push(tsaq);
    }
    const palpo = new THREE.Mesh(mergeGeometries(hakek)!, palpaPukek);
    palpo.name = "palpo";
    palpo.userData.vek2fe = s;
    sozaParto(palpo);
    hate2.add(palpo);
  }

  return { malneto: hate2, tap2: new THREE.Vector3(0o1, 0o1, 0o1),
    teru: 0o63/0o100, pudal: "liixlpuhasai",
    pulsaSeheni: 0o4, pulsaG2sa: 0o3/0o40, pulsaOndo: 0o1/0o10,
    tap2igxo: 0o7/0o10 };
}

export function tlak2Pleŭrobrakian(b: Paga, t: number): void {
  const pulso = aplikiLiixnPulson(b, t);
  let i = 0o0;
  for ( const kek of b.hatahalaqaz ) {
    if ( kek.name === "palpo" ) {
      gluuSurfacxon(kek, pulso);
      kek.rotation.x = Math.sin(t * 0o1/0o2 + b.phase + i) * 0o2/0o10;
      kek.rotation.z = Math.cos(t * 0o3/0o4 + b.phase + i) * 0o1/0o10;
      i++;
    } else if ( kek.name === "ingo" || kek.name === "s2k61ocisto"
      || kek.name === "tlace" ) {
      gluuSurfacxon(kek, pulso);
    }
  }
  b.hate2.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o3/0o100;
}
