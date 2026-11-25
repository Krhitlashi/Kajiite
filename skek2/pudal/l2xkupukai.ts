// ≺⧼ j͐ʃɹ ı],ƽw ſןw ſɭᴜꞇ 🪼 ⧽≻
// ⟨ j͑ʃᴜꞇ ʌ ſɭᴜͷ̗ ɭʃɜƽ 📃 ⟩
import * as THREE from "three";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { tlunakKombohax2pan, aplikiLiixnPulson, gluuSurfacxon, kf2KombilanPukekn,
  kf2Korpon, liixPulsaFazo, s2qenaR, sozaParto } from "./l2x-hax2x2q.js";
import { kf2GelanCac2sex } from "../x2x2q/cac2sex/l2x-gelo.js";

const S2qena: [ number, number ][] = [
  [ 0o15/0o100, -0o10/0o10 ],
  [ 0o23/0o100, -0o75/0o100 ],
  [ 0o13/0o40, -0o33/0o40 ],
  [ 0o13/0o40, -0o25/0o40 ],
  [ 0o13/0o40, -0o13/0o40 ],
  [ 0o13/0o40, -0o1/0o20 ],
  [ 0o5/0o20, 0o1/0o4 ],
  [ 0o11/0o40, 0o4/0o10 ],
  [ 0o7/0o40, 0o27/0o40 ],
  [ 0o11/0o100, 0o7/0o10 ],
  [ 0o1/0o20, 0o37/0o40 ],
];

export function vepaqMalneton(cac2sex: THREE.CanvasTexture): PudalMalneto {
  const hate2 = new THREE.Group();
  const gelo = kf2GelanCac2sex({
    kozuni: "rgb(240,208,216)", qar6xe: "rgb(192,136,168)",
    poluso: "rgb(232,176,192)", polusaG2sa: 0o50/0o100, hacehe: 0o500,
  });
  const soq = kf2Korpon(gelo, cac2sex, S2qena, 0xe8d8e0, 0x285078);
  soq.name = "korpo";
  hate2.add(soq);

  tlunakKombohax2pan(hate2, S2qena, kf2KombilanPukekn(0x88c0f0));

  const w6qaY = -0o74/0o100;
  const w6qaR = s2qenaR(S2qena, w6qaY);
  const w6qaPukaz = new THREE.Mesh(
    new THREE.TorusGeometry(w6qaR, w6qaR * 0o12/0o100, 0o6, 0o24),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8a8c0, transparent: true, opacity: 0o11/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x50203a, emissiveIntensity: 0o1/0o4,
    }));
  w6qaPukaz.rotation.x = -Math.PI / 0o2;
  w6qaPukaz.position.y = w6qaY;
  w6qaPukaz.name = "tlace";
  sozaParto(w6qaPukaz);
  hate2.add(w6qaPukaz);

  const faringo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o40/0o1000, 0o10/0o100, 0o7/0o10, 0o12)
      .translate(0, 0o7/0o20, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x986080, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
      side: THREE.DoubleSide,
    }));
  faringo.name = "faringo";
  faringo.position.y = -0o64/0o100;
  sozaParto(faringo);
  hate2.add(faringo);
  const stomako = new THREE.Mesh(
    new THREE.SphereGeometry(0o11/0o100, 0o10, 0o10).scale(0o1, 0o15/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xa06888, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    }));
  stomako.name = "stomako";
  stomako.position.y = 0o44/0o100;
  sozaParto(stomako);
  hate2.add(stomako);

  const s2k61ocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6).scale(0o1, 0o7/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xf0d8e4, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0xc07898, emissiveIntensity: 0o7/0o10,
    }));
  s2k61ocisto.name = "s2k61ocisto";
  s2k61ocisto.position.y = 0o74/0o100;
  sozaParto(s2k61ocisto);
  hate2.add(s2k61ocisto);

  return { malneto: hate2, tap2: new THREE.Vector3(0o1, 0o1, 0o63/0o100),
    teru: 0o1, pudal: "liixkupukai",
    pulsaSeheni: 0o25/0o10, pulsaG2sa: 0o1/0o10, pulsaOndo: 0o1/0o10,
    tap2igxo: 0o5/0o10 };
}

export function tlak2Beran(b: Paga, t: number): void {
  const pulso = aplikiLiixnPulson(b, t);
  const h6w6o = 0o1 + Math.max(0, Math.sin(liixPulsaFazo(b, t) + 0o1/0o4)) * 0o2/0o10;
  const vertikalaAldono = 1 + ( h6w6o - 1 ) * 0o1/0o2;
  for ( const kek of b.hatahalaqaz ) {
    if ( kek.name === "tlace" ) {
      gluuSurfacxon(kek, pulso, { x: h6w6o, y: vertikalaAldono, z: h6w6o });
    } else if ( kek.name === "faringo" || kek.name === "stomako" ) {
      const milda = 1 + ( h6w6o - 1 ) * 0o1/0o4;
      gluuSurfacxon(kek, pulso, { x: milda, y: 1 + ( h6w6o - 1 ) * 0o1/0o2, z: milda });
    } else if ( kek.name === "s2k61ocisto" ) {
      gluuSurfacxon(kek, pulso);
    }
  }
  b.hate2.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o2/0o100;
  b.hate2.rotation.z = Math.sin(t * b.seheni + b.phase) * 0o1/0o100;
}
