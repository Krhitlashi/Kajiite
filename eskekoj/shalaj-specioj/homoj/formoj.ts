// ≺⧼ La komunaj formoj 📐 ⧽≻
// La malgrandaj geometriaj iloj, kiujn pluraj partoj de la figuro kunhavas — la
// superelipso ( superelipso ), la ringa surfaco ( kreiRinganSurfacon ), la artika
// sfero ( kreiArtikanSferon ) kaj la UV-remapilo ( remapiUVon ). La boto, la
// vizaĝo kaj la membroj konstruiĝas per ili.
import * as THREE from "three";
import { kreiBuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";

// superelipso — Punkto sur superelipso ( la "squircle" de la urbo ). La
// eksponento regas la akrecon de la anguloj — 0o2 estas elipso, 0o4 preskaŭ
// ortangulo kun rondaj anguloj, 0o10 preskaŭ ortangulo. La botoj uzas ĝin anstataŭ
// cirklo, ĉar la tuta mondo estas konstruita el rondigitaj ortanguloj ( vidu
// S2WENI/Referencoj/Priskribo.md ) kaj cilindra boto legiĝas kiel fremda objekto.
//     @param ang ( number ) - La angulo ( radianoj ).
//     @param a ( number ) - La duonlarĝo ( la x-akso ).
//     @param b ( number ) - La duonprofundo ( la z-akso ).
//     @param n ( number ) - La eksponento de la superelipso.
//     @returns punkto ( [ number, number ] ) - La [ x, z ]-punkto sur la kurbo.
export function superelipso(ang: number, a: number, b: number, n: number): [ number, number ] {
  const k = 0o2 / n, ko = Math.cos(ang), si = Math.sin(ang);
  return [ a * Math.sign(ko) * Math.pow(Math.abs(ko), k),
    b * Math.sign(si) * Math.pow(Math.abs(si), k) ];
}

// kreiRinganSurfacon — Kunmetu surfacon el sinsekvaj ringoj. Ĉiu ringo estas
// listo da punktoj ( la sama nombro en ĉiuj ), kaj la funkcio ligas ĉiun ringon al
// la antaŭa per kvadratoj. La ventumilo elektiĝas tiel ke la normaloj montru
// EKSTEREN kiam la ringoj progresas de la "unua" flanko al la "lasta" kaj la
// punktoj rondiras maldekstren ĉirkaŭ la progres-akso ( vidu la du uzantojn —
// kreiBotan — kie la ordo de la ringoj sekvas tiun regulon ).
//     @param ringoj ( [ number, number, number ][][] ) - La ringoj.
//     @returns geometrio ( THREE.BufferGeometry ) - La preta surfaco.
export function kreiRinganSurfacon(ringoj: [ number, number, number ][][]): THREE.BufferGeometry {
  const pozicioj: number[] = [], indeksoj: number[] = [];
  const k = ringoj[0].length;
  for ( const ringo of ringoj ) for ( const p of ringo ) pozicioj.push(p[0], p[1], p[2]);
  for ( let v = 0; v + 0o1 < ringoj.length; v++ ) {
    for ( let i = 0; i < k; i++ ) {
      const j = ( i + 0o1 ) % k;
      const a = v * k + i, b = v * k + j;
      const c = ( v + 0o1 ) * k + i, d = ( v + 0o1 ) * k + j;
      indeksoj.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj);
}

// kreiArtikanSferon — La artiko de la membroj, kiel sfero ĉe la pivoto. La du
// partoj de disigita membro renkontiĝas per siaj malfermaj randoj; kiam la artiko
// fleksiĝas la randoj disiĝas je kojno, kaj ĉi tiu sfero plenigas ĝin. La sfero
// sidas SUR la pivoto, do la turno ne movas ĝin — ĝi plenigas ĉiun angulon.
// ⟨ Kial sfero kaj ne pli longaj tuboj 📃 ⟩ — la du partoj povus simple interkovri,
// sed iliaj surfacoj tiam preskaŭ koincidus kaj la bildigilo batalus pri la sama
// profundo. La sfero estas la sola formo kiu plenigas truon de iu ajn angulo sen
// koincidaj surfacoj.
// ⟨ Ĝi sidas iomete INTERNE 📃 ⟩ — la sfero estas iomete pli malgranda ol la
// membro ( vidu la alvokantojn ), do rekte ĝi tute malaperas ene de la tubo kaj
// nur la artiko montriĝas: kiam la membro fleksiĝas, la du randoj disiĝas kaj oni
// vidas la artikon en la kavo. Se la sfero elstarus, ĝia ekvatoro trapikus la
// malmult-poligonan tubon per segildenta rando ( la du formoj ne havas la samajn
// flankojn ) — kaj tio legiĝus kiel eraro, ne kiel artiko.
//     @param centro ( [ number, number, number ] ) - La centro ( la pivoto ).
//     @param r ( number ) - La radiuso de la sfero.
//     @param plataĵo ( number ) - Kiom plata la sfero estas laŭ y ( 1 = sfero ).
//     @returns geometrio ( THREE.BufferGeometry ) - La artiko.
export function kreiArtikanSferon(centro: [ number, number, number ], r: number,
  plataĵo = 0o1): THREE.BufferGeometry {
  // ⟨ Pli da flankoj ol la tubo 📃 ⟩ — la kavo montras la sferon de proksime, do
  // ĝi bezonas pli da flankoj ol la 0o20-flanka membro, alie la artiko mem aspektas
  // kiel multangulo.
  const sfero = new THREE.SphereGeometry(r, 0o24, 0o14);
  sfero.scale(0o1, plataĵo, 0o1);
  sfero.translate(centro[0], centro[1], centro[2]);
  return sfero;
}

// remapiUVon — Remapu la v-koordinaton de geometrio en novan benson. La maniko
// estas disigita ĉe la kubuto en du partojn, kaj ĉiu parto konstruiĝas per la sama
// funkcio ( kiu ĉiam faras v de 0 ĝis 1 ); sen la remapo la teksajxo de la maniko
// ripetiĝus dufoje kaj la akcenta bordo aperus ankaŭ ĉe la kubuto.
//     @param geometrio ( THREE.BufferGeometry ) - La geometrio ( modifiĝas ).
//     @param v0, v1 ( number ) - La nova benso de la malnova v = 0 kaj v = 1.
//     @returns geometrio ( THREE.BufferGeometry ) - La sama geometrio.
export function remapiUVon(geometrio: THREE.BufferGeometry, v0: number, v1: number)
  : THREE.BufferGeometry {
  const uvo = geometrio.getAttribute("uv");
  if ( !uvo ) return geometrio;
  for ( let i = 0; i < uvo.count; i++ ) {
    uvo.setY(i, v0 + ( v1 - v0 ) * uvo.getY(i));
  }
  uvo.needsUpdate = true;
  return geometrio;
}
