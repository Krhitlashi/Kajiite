// ≺⧼ La flamo 🔥 ⧽≻
// La flama profilo, la altaj konstantoj de la langoj kaj de la bovlo, kaj la
// konstruilo de unu flama tavolo ( kreiFlamanGeometrion ).
import * as THREE from "three";
// ⟨ La flama silueto 📃 ⟩ — la antaŭa flamo estis simpla KONUSO ( ConeGeometry
// kun sep flankoj ): ĝi aspektis kiel oranĝa triangulo, ne kiel flamo. Vera
// flamo havas VENTRON ( iomete super la bazo ), TALION super ĝi, kaj longan
// pintiĝantan langon. Ĉi tiu profilo ( r, y ) iras de la akso ĉe la bazo
// ( fermita fundo ) ĝis la pinto ĉe y = 1.
const FLAMA_PROFILO: [ number, number ][] = [
  [ 0.00, 0.00 ],   // la akso ĉe la bazo — la fundo estas fermita
  [ 0.30, 0.00 ],
  [ 0.44, 0.06 ],
  [ 0.50, 0.16 ],   // la ventro de la flamo
  [ 0.49, 0.27 ],
  [ 0.44, 0.38 ],
  [ 0.36, 0.50 ],   // la talio
  [ 0.27, 0.62 ],
  [ 0.19, 0.73 ],
  [ 0.12, 0.82 ],
  [ 0.07, 0.90 ],
  [ 0.03, 0.96 ],
  [ 0.00, 1.00 ],   // la pinto
];

// La alto de unu lango ( la malgrandaj teardropoj, kiuj lekas ĉirkaŭ la ĉefa
// flamo ) en mondunuoj. Ĝi ankaŭ estas uzata de la animacio, por ke la bazo de
// ĉiu lango restu sur la meĉo dum la lango longiĝas supren.
export const LANGA_ALTO = 0o14/0o100;

// ⟨ La bovla alto 📃 ⟩ — unu nombro regas la tutan dioritan bovlon: la lathe-
// profilo, la oran randan bendon kaj la lokon de la flamo ĉiuj derivas sian
// vertikalan mezuron el ĉi tiu konstanto, do la altecon eblas ŝanĝi en unu
// loko. La bovlo estis 0.375 alta ( preskaŭ same alta kiel larĝa ĉe la rando ),
// do ĝi legiĝis kiel PROFUNDA taso, precipe ĉar la kolono sub ĝi estas mallarĝa
// — la lampo aspektis kiel pokalo. Poste 0.266 ( triono pli malalta ), sed la
// bovlo ankoraŭ legiĝis kiel pelvo kun videbla kavo. Nun 0.203: la muro
// leviĝas je preskaŭ duono de la originalo, la interna kavo preskaŭ malaperas
// ( la interna fundo estas frakcio de BOVLA_ALTO, do malaltiĝante ĝi ankaŭ
// malleviĝas ), kaj la silueto de la lampo legiĝas kiel flamo sur plata telero.
export const BOVLA_ALTO = 0o15/0o100;   // 13/64 ≈ 0.203

// kreiFlamanGeometrion — Unu tavolo de la flamo: lathe-korpo laŭ FLAMA_PROFILO,
// kun du realismoj aldonitaj al la verticoj — la surfaco RIPLIĜAS ( la flamo
// ne estas glata konuso; ĝia rando ondiĝas, kaj des pli ĉe la pinto ) kaj la
// PINTO KLINIĜAS for de la akso ( flamo staras sur la meĉo, sed ĝia lango
// leviĝas malrekte ).
//     @param alto ( number ) - La flama alto en mondunuoj.
//     @param largho ( number ) - La plej granda diametro de la flamo.
//     @param ml ( number ) - La klino-multobliko ( la ekstera tavolo klinas pli ).
//     @param semo ( number ) - La hazardo-semo, por ke ĉiu tavolo riplu malsame.
//     @returns geometrio ( THREE.BufferGeometry ) - La flama tavolo, centre je y = 0.
export function kreiFlamanGeometrion( alto: number, largho: number, ml: number,
  semo: number ): THREE.BufferGeometry {
  const punktoj = FLAMA_PROFILO.map(( [ r, y ] ) =>
    new THREE.Vector2(r * largho / 2, ( y - 0o1/0o2 ) * alto));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o20);   // 16 flankoj
  const pozicioj = geometrio.attributes.position;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i), y = pozicioj.getY(i), z = pozicioj.getZ(i);
    const t = y / alto + 0o1/0o2;               // 0 ĉe la bazo, 1 ĉe la pinto
    const angulo = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    // La riploj — kvar ondoj ĉirkaŭ la flamo, kiuj plifortiĝas supren.
    const riplo = 1 + ( 0o3/0o100 + 0o10/0o100 * t )
      * Math.sin(4 * angulo + t * 0o7 + semo);
    // La klino — la pinto leviĝas malrekte. Ĝi komenciĝas ĉe la malsupra
    // duono ( t³ ), do la ventro de la flamo restas vertikala kaj nur la lango
    // flankenkliniĝas, kiel ĉe vera flamo.
    const klino = ml * 0o7/0o100 * alto * t * t * t;
    pozicioj.setXYZ(i, r * riplo * Math.cos(angulo) + klino,
      y + riplo * 0o2/0o100 * alto * Math.sin(t * 0o5 + angulo * 2),
      r * riplo * Math.sin(angulo) + klino * 0o7/0o10);
  }
  geometrio.computeVertexNormals();
  return geometrio;
}
