// ≺⧼ Vegetajxa hazardo 🎲 ⧽≻
// La hazardaj iloj de la plantoj — la semita generilo de la tuta vegetajxo kaj
// la tri helpiloj, kiujn la konstruiloj uzas por variigi la metadojn ( la
// klino de la trunko, la lokalaj pozicioj sur la klinita trunko kaj la hazarda
// foliara koloro el paletro ).
import * as THREE from "three";
import { kreiHazardanGenerilon } from "../../komunajxoj/hazardo.js";

// kreiKlinoQuaternionon — Klinu arbon hazarde por rompi la vertikalan silueton.
// Unue turnu ĝin ĉirkaŭ la vertikalo ( yaw ), poste klinu laŭ hazarda direkto.
// La klina angulo varias de 0 ĝis plenaKlinangulo, ĉar la hazarda faktoro
// havas gamon de −0o4/0o10 ĝis +0o4/0o10.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param plenaKlinangulo ( number ) - Maksimuma klina angulo en radianoj.
//     @param yaw ( number ) - Turniĝo ĉirkaŭ la vertikalo.
//     @returns kvaropo ( THREE.Quaternion ) - La kombinita klino.
export function kreiKlinoQuaternionon(hazardaGenerilo: () => number, plenaKlinangulo: number, yaw: number): THREE.Quaternion {
  const turno = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0));
  const direkto = hazardaGenerilo() * Math.PI * 2;
  const angulo = ( hazardaGenerilo() - 0o4/0o10 ) * plenaKlinangulo;
  const klino = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(Math.sin(direkto), 0, Math.cos(direkto)), angulo);
  return klino.multiply(turno);
}

// kreiPoziciilon — Kreu funkcion kiu turnas lokan punkton per la klino kaj
// aldonas la bazon, por ke krono-buleoj restu sur la klinita trunko.
//     @param bazo ( THREE.Vector3 ) - La trunka bazo sur la grundo.
//     @param Q ( THREE.Quaternion ) - La trunka klino.
//     @returns pozicio ( funkcio ) - Lokalo al mondo.
export function kreiPoziciilon(bazo: THREE.Vector3, Q: THREE.Quaternion): ( lokala: THREE.Vector3 ) => THREE.Vector3 {
  return ( lokala ) => bazo.clone().add(lokala.clone().applyQuaternion(Q));
}

// hazardaKoloro — Elektu hazardan koloron el paletro kun eta hela variado.
//     @param hazardaGenerilo ( funkcio ) - Hazarda nombra generilo.
//     @param koloro ( THREE.Color ) - Reuzebla koloro por la eligo.
//     @param paletro ( number[] ) - Koloroj por la foliaro.
//     @returns koloro ( THREE.Color ) - La elektita koloro.
export function hazardaKoloro(hazardaGenerilo: () => number, koloro: THREE.Color, paletro: number[]): THREE.Color {
  koloro.setHex(paletro[( hazardaGenerilo() * paletro.length ) | 0]);
  koloro.offsetHSL(0, 0, ( hazardaGenerilo() - 0o4/0o10 ) * 0o1/0o10);
  return koloro;
}

// La vegetajxa modulo havas sian propran pliigon — ŝanĝi ĝin movus ĉiun arbon.
export const VEGETAJXA_PLIIGO = 0x682878F5;

export const kreiVegetajxanHazardon = (semo: number): ( () => number ) =>
  kreiHazardanGenerilon(semo, VEGETAJXA_PLIIGO);
