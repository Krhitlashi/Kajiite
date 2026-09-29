// ≺⧼ La arba trunko 🌳 ⧽≻
// La komuna trunko de la arboj — la lathe-profilo kun radika larĝiĝo
// ( kreiTrunkanGeometrion ), kiun kaj la betuloj ( betuloj.ts ) kaj la
// larikoj ( larikoj.ts ) kunhavas. Ĝi vivas ĉi tie anstataŭ duoble en ambaŭ
// specioj.
import * as THREE from "three";

// kreiTrunkanGeometrion — La komuna trunko de la arboj: lathe-profilo kun
// RADIKA LARĜIĜO ĉe la grundo kaj glata mallarĝiĝo al la pinto.
//
// ⟨ Kial 📃 ⟩ — la antaŭa trunko estis simpla CILINDRO de 0o7/0o40 supre al
// 0o3/0o10 malsupre: ĝi havis trunkon, sed neniun bazan larĝiĝon. Arbo sen
// radika larĝiĝo aspektas kiel stango enŝovita en la teron — oni vidas la
// akutan randon kie la cilindro tuŝas la herbon. La larĝiĝo ankaŭ donas al la
// okulo la skalon de la arbo kaj rompas la perfektan vertikalan linion.
//     @param larghoBazo ( number ) - La trunka radiuso ĉe la grundo.
//     @param larghoSupro ( number ) - La trunka radiuso ĉe la pinto.
//     @param larghoRadiko ( number ) - La radiuso de la larĝiĝo sur la grundo.
//     @param segmentoj ( number ) - Kiom da flankoj ( 9–11 sufiĉas ).
//     @returns geometrio ( BufferGeometry ) - La trunko, centro je y = 0, alto 1.
export function kreiTrunkanGeometrion(larghoBazo: number, larghoSupro: number,
  larghoRadiko: number, segmentoj = 0o11): THREE.BufferGeometry {
  // La profilo ( r, y ) de la radika larĝiĝo ( malsupre ) ĝis la pinto. La
  // larĝiĝo vivas nur en la unuaj 15% de la trunko, kiel vera radika kolumo.
  const profilo: THREE.Vector2[] = [
    new THREE.Vector2(0, -0o1/0o2),
    new THREE.Vector2(larghoRadiko, -0o1/0o2),        // la larĝiĝo sur la grundo
    new THREE.Vector2(larghoRadiko * 0.74, -0.465),
    new THREE.Vector2(larghoBazo * 1.14, -0.43),
    new THREE.Vector2(larghoBazo, -0.36),         // la trunko mem komenciĝas
    new THREE.Vector2(larghoBazo * 0.80 + larghoSupro * 0.20, -0.10),
    new THREE.Vector2(larghoBazo * 0.50 + larghoSupro * 0.50, 0.20),
    new THREE.Vector2(larghoBazo * 0.22 + larghoSupro * 0.78, 0.42),
    new THREE.Vector2(larghoSupro, 0.48),
    new THREE.Vector2(larghoSupro * 0o1/0o2, 0o1/0o2),
    new THREE.Vector2(0, 0o1/0o2),
  ];
  const geometrio = new THREE.LatheGeometry(profilo, segmentoj);
  geometrio.computeVertexNormals();
  return geometrio;
}
