// ≺⧼ បេរ៉ូអេ 🪼 ⧽≻
// ⟨ អ្វីដែលបានបែក 📃 ⟩
import * as THREE from "three";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { aldoniKombovicojn, aplikiKtenoforanPulson, gluuSurfacxon, kreiKombilanMaterialon,
  kreiKorpon, ktenoforaPulsaFazo, profiloR, surfacxaParto } from "./ktenofora-komunajxoj.js";
import { kreiGelanTeksajxon } from "../komunajxoj/teksajxoj/ktenofora-gelo.js";

const PROFILO: [ number, number ][] = [
  [ 0.21, -1.00 ],
  [ 0.30, -0.95 ],
  [ 0.34, -0.85 ],
  [ 0.35, -0.65 ],
  [ 0.35, -0.35 ],
  [ 0.34, -0o1/0o20 ],
  [ 0.32, 0o1/0o4 ],
  [ 0.28, 0.50 ],
  [ 0.22, 0.72 ],
  [ 0.14, 0.88 ],
  [ 0.06, 0.97 ],
];

export function konstruiMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const gelo = kreiGelanTeksajxon({
    bazo: "rgb(240,212,222)", kanalo: "rgb(198,140,168)",
    poluso: "rgb(236,180,198)", polusaForto: 0o50/0o100, grajnoj: 0o500,
  });
  const korpo = kreiKorpon(gelo, teksajxo, PROFILO, 0xe8d8e0, 0x285078);
  korpo.name = "korpo";
  grupo.add(korpo);

  aldoniKombovicojn(grupo, PROFILO, kreiKombilanMaterialon(0x88c0f0));

  const buŝaY = -0o74/0o100;
  const buŝaR = profiloR(PROFILO, buŝaY);
  const buŝaRando = new THREE.Mesh(
    new THREE.TorusGeometry(buŝaR, buŝaR * 0o12/0o100, 0o6, 0o24),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8a8c0, transparent: true, opacity: 0o11/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x50203a, emissiveIntensity: 0o1/0o4,
    }));
  buŝaRando.rotation.x = -Math.PI / 0o2;
  buŝaRando.position.y = buŝaY;
  buŝaRando.name = "busxo";
  surfacxaParto(buŝaRando);
  grupo.add(buŝaRando);

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
  surfacxaParto(faringo);
  grupo.add(faringo);
  const stomako = new THREE.Mesh(
    new THREE.SphereGeometry(0o11/0o100, 0o10, 0o10).scale(0o1, 0o15/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xa06888, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    }));
  stomako.name = "stomako";
  stomako.position.y = 0o44/0o100;
  surfacxaParto(stomako);
  grupo.add(stomako);

  const statocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6).scale(0o1, 0o7/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xf0d8e4, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0xc07898, emissiveIntensity: 0o7/0o10,
    }));
  statocisto.name = "statocisto";
  statocisto.position.y = 0o74/0o100;
  surfacxaParto(statocisto);
  grupo.add(statocisto);

  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o63/0o100),
    supro: 0o1, speco: "beroe",
    pulsaRapido: 0o25/0o10, pulsaForto: 0o1/0o10, pulsaOndo: 0o1/0o10,
    plata: 0o5/0o10 };
}

export function gxisdatigiBeran(b: Besto, t: number): void {
  const pulso = aplikiKtenoforanPulson(b, t);
  const malfermo = 0o1 + Math.max(0, Math.sin(ktenoforaPulsaFazo(b, t) + 0o1/0o4)) * 0o2/0o10;
  const vertikalaAldono = 1 + ( malfermo - 1 ) * 0o1/0o2;
  for ( const parto of b.animajxoj ) {
    if ( parto.name === "busxo" ) {
      gluuSurfacxon(parto, pulso, { x: malfermo, y: vertikalaAldono, z: malfermo });
    } else if ( parto.name === "faringo" || parto.name === "stomako" ) {
      const milda = 1 + ( malfermo - 1 ) * 0o1/0o4;
      gluuSurfacxon(parto, pulso, { x: milda, y: 1 + ( malfermo - 1 ) * 0o1/0o2, z: milda });
    } else if ( parto.name === "statocisto" ) {
      gluuSurfacxon(parto, pulso);
    }
  }
  b.grupo.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o2/0o100;
  b.grupo.rotation.z = Math.sin(t * b.rapido + b.phase) * 0o1/0o100;
}
