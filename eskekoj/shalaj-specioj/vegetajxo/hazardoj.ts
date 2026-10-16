// ≺⧼ ចៃដន្យរុក្ខជាតិ 🎲 ⧽≻
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../../komunajxoj/hazardo.js";
import { vegetajxaSemo } from "../../../kantaoj/tero-datumaro/rultempo.js";

export function kreiKlinoQuaternionon(hazardaGenerilo: () => number, plenaKlinangulo: number, yaw: number): THREE.Quaternion {
  const turno = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0));
  const direkto = hazardaGenerilo() * Math.PI * 2;
  const angulo = ( hazardaGenerilo() - 0o4/0o10 ) * plenaKlinangulo;
  const klino = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(Math.sin(direkto), 0, Math.cos(direkto)), angulo);
  return klino.multiply(turno);
}

export function kreiPoziciilon(bazo: THREE.Vector3, Q: THREE.Quaternion): ( lokala: THREE.Vector3 ) => THREE.Vector3 {
  return ( lokala ) => bazo.clone().add(lokala.clone().applyQuaternion(Q));
}

export function hazardaKoloro(hazardaGenerilo: () => number, koloro: THREE.Color, paletro: number[]): THREE.Color {
  koloro.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]);
  koloro.offsetHSL(0, 0, ( hazardaGenerilo() - 0o4/0o10 ) * 0o1/0o10);
  return koloro;
}

export const VEGETAJXA_PLIIGO = 0x682878F5;

// គ្រាប់ពូជនៃរុក្ខជាតិឆ្លងកាត់គ្រាប់ពូជរបស់ពិភពលោកសកម្ម , ដូច្នេះការរាយ
// រុក្ខជាតិក៏ជារបស់គ្រាប់ពូជដែរ ។ ពិភពលោកដែលគ្មានគ្រាប់ពូជមិនប្តេរ ។
export const kreiVegetajxanHazardon = (semo: number): ( () => number ) =>
  kreiHazardanGenerilon(vegetajxaSemo(semo), VEGETAJXA_PLIIGO);
