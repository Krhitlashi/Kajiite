// ≺⧼ j͐ʃɹ ı],ᴜ̭ᴜ ı],ͷ̗ɔ ſȷᴜꞇ 🪼 ⧽≻
// ⟨ អ្វីដែលបានបែក 📃 ⟩
// ⟨ តង់តាក់តូច 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Paga, PudalMalneto } from "./pudal-hahunaq.js";
import { aldoniKombohax2pan, aplikiL2xnPulson, gluuSurfacxon, kf2KombilanMaterialon,
  kf2Korpon, l2xPulsaFazo,
  surfacxaParto } from "./l2x-komunajxoj.js";
import { kf2GelanCac2sex } from "../komunajxoj/cac2sex/l2x-gelo.js";

const PROFILO: [ number, number ][] = [
  [ 0o23/0o100, -0o50/0o100 ],
  [ 0o35/0o100, -0o43/0o100 ],
  [ 0o43/0o100, -0o33/0o100 ],
  [ 0o46/0o100, -0o20/0o100 ],
  [ 0o47/0o100, -0o3/0o100 ],
  [ 0o45/0o100, 0o20/0o100 ],
  [ 0o37/0o100, 0o33/0o100 ],
  [ 0o27/0o100, 0o43/0o100 ],
  [ 0o15/0o100, 0o47/0o100 ],
  [ 0o5/0o100, 0o50/0o100 ],
];

function kf2Lobon(): THREE.ExtrudeGeometry {
  const qoxa = new THREE.Shape();
  qoxa.moveTo(0, 0);
  qoxa.quadraticCurveTo(0o34/0o100, -0o5/0o100, 0o30/0o100, -0o34/0o100);
  qoxa.quadraticCurveTo(0o24/0o100, -0o52/0o100, 0o12/0o100, -0o56/0o100);
  qoxa.quadraticCurveTo(0o5/0o100, -0o44/0o100, -0o2/0o100, -0o50/0o100);
  qoxa.quadraticCurveTo(-0o10/0o100, -0o40/0o100, -0o12/0o100, -0o46/0o100);
  qoxa.quadraticCurveTo(-0o16/0o100, -0o30/0o100, -0o10/0o100, -0o10/0o100);
  qoxa.quadraticCurveTo(-0o6/0o100, -0o2/0o100, 0, 0);
  return new THREE.ExtrudeGeometry(qoxa, { depth: 0o2/0o100, bevelEnabled: false });
}

export function vepaqMalneton(cac2sex: THREE.CanvasTexture): PudalMalneto {
  const hate = new THREE.Group();
  const gelo = kf2GelanCac2sex({
    kozuni: "rgb(224,240,240)", qar6xe: "rgb(160,192,208)",
    poluso: "rgb(192,224,232)", polusaForto: 0o45/0o100, grajnoj: 0o460,
  });
  const korpo = kf2Korpon(gelo, cac2sex, PROFILO, 0xd8e8f0, 0x285878);
  korpo.name = "korpo";
  hate.add(korpo);
  aldoniKombohax2pan(hate, PROFILO, kf2KombilanMaterialon(0x78b8f0));

  const lobaMaterialo = new THREE.MeshPhysicalMaterial({
    color: 0xd0e8f8, transparent: true, opacity: 0o5/0o20, depthWrite: false,
    roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10,
    side: THREE.DoubleSide,
  });
  const stomako = new THREE.Mesh(
    new THREE.CylinderGeometry(0o24/0o1000, 0o74/0o1000, 0o1, 0o10),
    new THREE.MeshPhysicalMaterial({
      color: 0x88b0c0, transparent: true, opacity: 0o4/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x285878, emissiveIntensity: 0o3/0o10,
      side: THREE.DoubleSide,
    }));
  stomako.name = "stomako";
  stomako.position.y = -0o1/0o4;
  surfacxaParto(stomako);
  hate.add(stomako);

  const lobaQoxa = kf2Lobon();
  const w6qaY = -0o46/0o100 + 0o2/0o100;
  for ( const s of [ 0o1, -0o1 ] ) {
    // ⟨ បបូរមាត់ 📃 ⟩
    const lobo = new THREE.Mesh(lobaQoxa, lobaMaterialo);
    lobo.name = "lobo";
    lobo.position.set(s * 0o24/0o100, w6qaY, 0);
    lobo.rotation.z = -s * 0o3/0o10;
    lobo.scale.set(s * 0o12/0o10, 0o12/0o10, 0o1);
    lobo.userData.kanto = s;
    surfacxaParto(lobo);
    hate.add(lobo);
    for ( const t of [ 0o1, -0o1 ] ) {
      const auriklo = new THREE.Mesh(lobaQoxa, lobaMaterialo);
      auriklo.name = "lobo";
      auriklo.position.set(s * 0o16/0o100, w6qaY + 0o2/0o100, t * 0o16/0o100);
      auriklo.rotation.y = -s * t * 0o5/0o10;
      auriklo.scale.set(s * 0o5/0o10, 0o5/0o10, 0o1);
      auriklo.userData.kanto = s;
      surfacxaParto(auriklo);
      hate.add(auriklo);
    }
    // ⟨ តង់តាក់កាត់បន្ថយ 📃 ⟩
    const n2k: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      n2k.push(new THREE.Vector3(
        s * ( 0o20/0o100 + u * 0o10/0o100 + Math.sin(u * Math.PI * 0o2) * 0o4/0o100 ),
        w6qaY - u * 0o34/0o100,
        Math.sin(u * Math.PI) * 0o10/0o100));
    }
    const kkaxte = new THREE.CatmullRomCurve3(n2k);
    const hakek: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kkaxte, 0o12, 0o4/0o1000, 0o6) ];
    for ( let i = 1; i < 0o10; i++ ) {
      const p = kkaxte.getPoint(i / 0o10);
      const haro = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o10/0o100, 0o4);
      haro.rotateZ(s * ( 0o7/0o10 + ( i % 0o2 ? 0o1/0o10 : -0o1/0o10 )));
      haro.translate(p.x, p.y, p.z);
      hakek.push(haro);
    }
    const palpo = new THREE.Mesh(mergeGeometries(hakek)!, lobaMaterialo);
    palpo.name = "palpo";
    palpo.userData.kanto = s;
    surfacxaParto(palpo);
    hate.add(palpo);
  }

  const statocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6).scale(0o1, 0o6/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xe0f0f8, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0x78b8d8, emissiveIntensity: 0o7/0o10,
    }));
  statocisto.name = "statocisto";
  statocisto.position.y = 0o47/0o100;
  surfacxaParto(statocisto);
  hate.add(statocisto);

  return { malneto: hate, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
    teru: 0o40/0o100, pudal: "l2xcaxlefai",
    pulsaRapido: 0o34/0o10, pulsaForto: 0o1/0o20, pulsaOndo: 0o1/0o20,
    plata: 0o6/0o10 };
}

export function gxisdatigiMnemiopsan(b: Paga, t: number): void {
  const pulso = aplikiL2xnPulson(b, t);
  const fazo = l2xPulsaFazo(b, t);
  let i = 0;
  for ( const kek of b.animajxoj ) {
    if ( kek.name === "lobo" ) {
      const malfermo = 0o1 + Math.max(0, Math.sin(fazo + i * 0o5/0o10)) * 0o12/0o100;
      gluuSurfacxon(kek, pulso, { x: 1 + ( malfermo - 1 ) * 0o4/0o5,
        y: malfermo, z: 1 + ( malfermo - 1 ) * 0o4/0o5 });
      kek.rotation.x = Math.sin(t * 0o2 + b.phase + i) * 0o2/0o10;
      i++;
    } else if ( kek.name === "palpo" ) {
      gluuSurfacxon(kek, pulso);
      kek.rotation.x = Math.sin(t * 0o15/0o10 + b.phase) * 0o15/0o100;
      kek.rotation.z = Math.cos(t * 0o11/0o10 + b.phase) * 0o1/0o10;
    } else if ( kek.name === "statocisto" || kek.name === "stomako" ) {
      gluuSurfacxon(kek, pulso);
    }
  }
  b.hate.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o4/0o100;
}
