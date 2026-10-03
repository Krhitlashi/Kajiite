// ≺⧼ មនេមីអុបស៊ីស 🪼 ⧽≻
// ⟨ អ្វីដែលបានបែក 📃 ⟩
// ⟨ តង់តាក់តូច 📃 ⟩
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { aldoniKombovicojn, aplikiKtenoforanPulson, gluuSurfacxon, kreiKombilanMaterialon,
  kreiKorpon, ktenoforaPulsaFazo,
  surfacxaParto } from "./ktenofora-komunajxoj.js";
import { kreiGelanTeksajxon } from "../komunajxoj/teksajxoj/ktenofora-gelo.js";

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

function kreiLobon(): THREE.ExtrudeGeometry {
  const formo = new THREE.Shape();
  formo.moveTo(0, 0);
  formo.quadraticCurveTo(0o34/0o100, -0o5/0o100, 0o30/0o100, -0o34/0o100);
  formo.quadraticCurveTo(0o24/0o100, -0o52/0o100, 0o12/0o100, -0o56/0o100);
  formo.quadraticCurveTo(0o5/0o100, -0o44/0o100, -0o2/0o100, -0o50/0o100);
  formo.quadraticCurveTo(-0o10/0o100, -0o40/0o100, -0o12/0o100, -0o46/0o100);
  formo.quadraticCurveTo(-0o16/0o100, -0o30/0o100, -0o10/0o100, -0o10/0o100);
  formo.quadraticCurveTo(-0o6/0o100, -0o2/0o100, 0, 0);
  return new THREE.ExtrudeGeometry(formo, { depth: 0o2/0o100, bevelEnabled: false });
}

export function konstruiMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const gelo = kreiGelanTeksajxon({
    bazo: "rgb(224,240,246)", kanalo: "rgb(160,196,214)",
    poluso: "rgb(196,224,236)", polusaForto: 0o45/0o100, grajnoj: 0o460,
  });
  const korpo = kreiKorpon(gelo, teksajxo, PROFILO, 0xd8e8f0, 0x285878);
  korpo.name = "korpo";
  grupo.add(korpo);
  aldoniKombovicojn(grupo, PROFILO, kreiKombilanMaterialon(0x78b8f0));

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
  grupo.add(stomako);

  const lobaFormo = kreiLobon();
  const buŝaY = -0o46/0o100 + 0o2/0o100;
  for ( const s of [ 0o1, -0o1 ] ) {
    // ⟨ បបូរមាត់ 📃 ⟩
    const lobo = new THREE.Mesh(lobaFormo, lobaMaterialo);
    lobo.name = "lobo";
    lobo.position.set(s * 0o24/0o100, buŝaY, 0);
    lobo.rotation.z = -s * 0o3/0o10;
    lobo.scale.set(s * 0o12/0o10, 0o12/0o10, 0o1);
    lobo.userData.flanko = s;
    surfacxaParto(lobo);
    grupo.add(lobo);
    for ( const t of [ 0o1, -0o1 ] ) {
      const auriklo = new THREE.Mesh(lobaFormo, lobaMaterialo);
      auriklo.name = "lobo";
      auriklo.position.set(s * 0o16/0o100, buŝaY + 0o2/0o100, t * 0o16/0o100);
      auriklo.rotation.y = -s * t * 0o5/0o10;
      auriklo.scale.set(s * 0o5/0o10, 0o5/0o10, 0o1);
      auriklo.userData.flanko = s;
      surfacxaParto(auriklo);
      grupo.add(auriklo);
    }
    // ⟨ តង់តាក់កាត់បន្ថយ 📃 ⟩
    const punktoj: THREE.Vector3[] = [];
    for ( let i = 0; i <= 0o10; i++ ) {
      const u = i / 0o10;
      punktoj.push(new THREE.Vector3(
        s * ( 0o20/0o100 + u * 0o10/0o100 + Math.sin(u * Math.PI * 0o2) * 0o4/0o100 ),
        buŝaY - u * 0o34/0o100,
        Math.sin(u * Math.PI) * 0o10/0o100));
    }
    const kurbo = new THREE.CatmullRomCurve3(punktoj);
    const partoj: THREE.BufferGeometry[] = [ new THREE.TubeGeometry(kurbo, 0o12, 0o4/0o1000, 0o6) ];
    for ( let i = 1; i < 0o10; i++ ) {
      const p = kurbo.getPoint(i / 0o10);
      const haro = new THREE.CylinderGeometry(0o1/0o200, 0o2/0o200, 0o10/0o100, 0o4);
      haro.rotateZ(s * ( 0o7/0o10 + ( i % 0o2 ? 0o1/0o10 : -0o1/0o10 )));
      haro.translate(p.x, p.y, p.z);
      partoj.push(haro);
    }
    const palpo = new THREE.Mesh(mergeGeometries(partoj)!, lobaMaterialo);
    palpo.name = "palpo";
    palpo.userData.flanko = s;
    surfacxaParto(palpo);
    grupo.add(palpo);
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
  grupo.add(statocisto);

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o1),
    supro: 0o40/0o100, speco: "mnemiopsis",
    pulsaRapido: 0o34/0o10, pulsaForto: 0o1/0o20, pulsaOndo: 0o1/0o20,
    plata: 0o6/0o10 };
}

export function gxisdatigiMnemiopsan(b: Besto, t: number): void {
  const pulso = aplikiKtenoforanPulson(b, t);
  const fazo = ktenoforaPulsaFazo(b, t);
  let i = 0;
  for ( const parto of b.animajxoj ) {
    if ( parto.name === "lobo" ) {
      const malfermo = 0o1 + Math.max(0, Math.sin(fazo + i * 0o5/0o10)) * 0o12/0o100;
      gluuSurfacxon(parto, pulso, { x: 1 + ( malfermo - 1 ) * 0o4/0o5,
        y: malfermo, z: 1 + ( malfermo - 1 ) * 0o4/0o5 });
      parto.rotation.x = Math.sin(t * 0o2 + b.phase + i) * 0o2/0o10;
      i++;
    } else if ( parto.name === "palpo" ) {
      gluuSurfacxon(parto, pulso);
      parto.rotation.x = Math.sin(t * 0o15/0o10 + b.phase) * 0o15/0o100;
      parto.rotation.z = Math.cos(t * 0o11/0o10 + b.phase) * 0o1/0o10;
    } else if ( parto.name === "statocisto" || parto.name === "stomako" ) {
      gluuSurfacxon(parto, pulso);
    }
  }
  b.grupo.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o4/0o100;
}
