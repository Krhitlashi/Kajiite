// ≺⧼ Materialoj 🎨 ⧽≻
// Materiala modulo — komunaj materialaj fabrikoj por la tuta mondo
import * as THREE from "three";
import {
  kreiDioritanTeksajxon, kreiAndezitanTeksajxon,
  kreiDioritanBumpanTeksajxon, kreiAndezitanBumpanTeksajxon,
} from "./teksajxoj.js";

// kreiDioritanMaterialon — Diorita ŝtonmaterialo ( helgriza, POLURITA,
// glata kaj reflekta ). La defaŭlta teksajxo montras la interplektitajn
// kristalojn de diorito, la bump-teksajxo donas nur subtilan reliefon ( la
// polurita ŝtono estas preskaŭ glata ), kaj la malalta roughnesso kun la
// eta metalnesso donas la brilan poluron.
//     @param map ( THREE.Texture, nedeviga ) - Diorita teksturo ( defaŭlte la
//     komuna kristala teksajxo, kiun reuzas la vojoj, dokoj kaj lampoj ).
//     @param envMapIntensity ( number, nedeviga ) - Reflekta intenseco ( en la
//     sceno 0o6/0o10; en la doko la defaŭlto ).
export function kreiDioritanMaterialon(map?: THREE.Texture, envMapIntensity?: number): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiDioritanTeksajxon(),
    bumpMap: kreiDioritanBumpanTeksajxon(),
    bumpScale: 0o1/0o100,
    roughness: 0o1/0o10,
    metalness: 0o1/0o20,
  });
  if ( envMapIntensity !== undefined ) m.envMapIntensity = envMapIntensity;
  return m;
}

// kreiAndezitanMaterialon — Andezita ŝtonmaterialo ( malhela verdgriza,
// malebena ). La defaŭlta teksajxo montras la fajngrajnan afanitan mason kaj
// la bump-teksajxo donas subtilan malebenecon.
//     @param map ( THREE.Texture, nedeviga ) - Andezita teksturo ( defaŭlte la
//     komuna fajngrajna teksajxo, kiun reuzas la vojoj kaj dokoj ).
export function kreiAndezitanMaterialon(map?: THREE.Texture): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: map ?? kreiAndezitanTeksajxon(),
    bumpMap: kreiAndezitanBumpanTeksajxon(),
    bumpScale: 0o3/0o100,
    roughness: 0o63/0o100,
  });
  return m;
}

// kreiPordanMaterialon. La pordo estas la MURO mem, nur pli malhela. Ni kopias
// ĉiujn ecojn de la mura materialo ( la mapon, la bump-mapojn, la roughness, la
// metalness kaj la medion ), do la pordo havas la SAMAN surfacon kiel la muro kaj
// sekvas ĝin aŭtomate se la muro ricevas teksajxon. La sola aldono estas la eta
// varma embero de la sojlo.
// ⟨ La koloro venas de la KONSTRUAJXO 📃 ⟩ Antaŭe ĉiu pordo estis la sama fiksa
// malhelverda ( 0x082018 ), do la pordo de la sabla manĝejo kaj tiu de la verda
// domo aspektis idente kaj la pordo neniam apartenis al sia konstruaĵo.
// ⟨ La malheligo estas SUBTRAHO 📃 ⟩ La pordo estas la muro MINUS unu konstanto
// ĉe ĉiu kanalo ( PORDA_SUBTRAHO, kiel koloro 0x080808 ). Subtraho anstataŭ
// multipliko tenas la nuancon de ĉiu tipo kaj konservas la #nmnmnm-formon de la
// projektaj koloroj, ĉar la malaltaj duonbyteoj de la mur-koloroj estas 0 aŭ 8
// ( la domo 0x184838 fariĝas 0x104030, la turo 0x205040 fariĝas 0x184838, la
// sanktejo 0x184038 fariĝas 0x103830, la stacidomo 0xc8c8c8 fariĝas 0xc0c0c0 ).
// ⟨ Kiom granda la subtraho 📃 ⟩ 0x08. La valoro devis malgrandiĝi, ĉar en la
// sRGB-spaco egala subtraho ne estas egala ŝanĝo — la sama 16/255 preskaŭ ne
// videblas sur hela muro ( 0xc8c8c8 → 0xb8b8b8 ) sed preskaŭ neniigas malhelan
// muron ( 0x18 → 0x08 estas 3.7-oble malpli en la linia spaco ). Kun la antaŭa
// 0x10 la sankteja pordo ( 0x083028, nun 0x103830 ) legiĝis NIGRA anstataŭ
// malhelverda, kvankam ĝi havis la ĝustan koloron — la centro de la urbo do
// aspektis kiel konstruaĵo sen pordo. Kun 0x08 la pordoj de ĉiuj tapiĝoj restas samtempe pli malhelaj
// kaj rekoneblaj ( la sanktejo 0x103830, la domo 0x104030, la manĝejo 0x503820 ).
// ⟨ Kial ne pli malgranda 📃 ⟩ 0x08 estas proksimume 25% malpli en la linia
// brilo de malhela muro — videbla sed ne fortranĉita. Sub tio la pordo komencas
// malfacili distingi de sia muro, ĉar la pordo havas ankaŭ oran kadron, kiu jam
// apartigas ĝin.
// ⟨ La emisio FORFALIS 📃 ⟩ La pordo havis etan konstantan emision el oranĝa
// 0xf89840 ( unue 0.03, poste 0.01 ). Eĉ la malgranda valoro rompis la regulon
// "la pordo estas la muro minus la subtraho", ĉar la emisio aldoniĝas SUPER la
// koloro. En la linia spaco la ruĝa parto de la emisio ( 0.01 × 0.94 ) estas
// proksimume kvar oble pli granda ol la ruĝa kanalo de la malhela doma pordo
// ( 0x08 = 0.0024 linie ), do la pordo aspektis VARMA BRUNA kaj la sankteja
// pordo — la plej videbla, ĉar ĝi staras en la centro de la urbo — preskaŭ
// NIGRA, kvankam ĝia koloro ( 0x083028 ) estas malhela VERDO. Nun la pordo
// ricevas neniun emision, do ĝia koloro en ĉiu lumo estas precize la mura
// koloro minus la subtraho, kun la sama nuanco.
//     @param muraMaterialo ( THREE.MeshStandardMaterial ) - La materialo de la
//     muroj de la konstruaĵo. Ĝia koloro estas malheleigita por la pordo, kaj
//     ĉiuj ceteraj ecoj ( angle la teksajxoj ) estas kopiitaj sen sxangxo.
const PORDA_SUBTRAHO = 0x08;
// malheleigi. Pli malhela versio de koloro, po unu kanalo en la sRGB-spaco ( la
// sama spaco, en kiu la koloroj estas skribitaj en la fonto ).
function malheleigi(koloro: number): number {
  const r = Math.max(0, (( koloro >> 0o20 ) & 0xff) - PORDA_SUBTRAHO);
  const g = Math.max(0, (( koloro >> 0o10 ) & 0xff) - PORDA_SUBTRAHO);
  const b = Math.max(0, (koloro & 0xff) - PORDA_SUBTRAHO);
  return ( r << 0o20 ) | ( g << 0o10 ) | b;
}
export function kreiPordanMaterialon(muraMaterialo: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  const pordo = muraMaterialo.clone();
  pordo.color = new THREE.Color(malheleigi(muraMaterialo.color.getHex()));
  // Neniu emisio — la klono jam portas la emision de la muro ( nigra ), do la
  // pordo restas precize la muro kun malheligita koloro. La antaŭa oranĝa
  // embero estas forigita ( vidu la klarigon supre ).
  return pordo;
}

// kreiFenestranMaterialon. La UNU vitra materialo de la mondo. La sama difino
// servas la pilol-fenestrojn de la konstruaĵoj, la fenestrojn interne, la
// fenestrojn de la kosmoŝipo kaj la vitrajn pordojn de la kunvenejo, de la
// stacidomo kaj de la ŝipo. Antaŭe estis kvar preskaŭ samaj difinoj dise, kaj la
// kosmoŝipa vitro eĉ havis sian propran alian nuancon, do la samaj vitroj de la
// mondo ne vere aspektis same.
// ⟨ Ĉiam nova instance 📃 ⟩ La materialo NE estas dividita. La fenestroj de la
// kosmoŝipo pulsas sian emision dum la flugo ( animaciiKrasesxagxon ), kaj
// dividita materialo ŝanĝus ankaŭ ĉiujn konstruaĵojn ĉiun kadron. La konstruaĵoj
// mem uzas unu kasxitan instancon ( vidu fenestraMaterialo en
// satalaj-konstruajxoj.ts ).
// ⟨ Kio faras ĝin vitro 📃 ⟩ Tri aferoj kune. La malhela bluverda bazo kun eta
// travidebleco ( 0.7 ) montras la malantaŭan muron tra la plato. La roughness
// 0o7/0o100 ( 0.109375 ) tenas la surfacon preskaŭ spegula, do la ĉielo kaj la
// lampoj reflektiĝas akre sur ĝi. La `envMapIntensity` 0o15/0o10 ( 1.5 )
// plifortigas tiun reflekton super la muroj, kiuj reflektas neniom. La bluverda
// emisio ( 0.15 ) estas la lumo de la interno, kiu restas videbla nokte.
export function kreiFenestranMaterialon(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x081818, emissive: 0x688888, emissiveIntensity: 0o3/0o20,
    roughness: 0o7/0o100, metalness: 0o3/0o20,
    transparent: true, opacity: 0o7/0o10, envMapIntensity: 0o15/0o10,
  });
}

// kreiOranMaterialon — Ora kadro-materialo ( brila metala, kun varma emisio ).
//     @param koloro ( number ) - La ora nuanco ( 0xd8b068 en la sceno, la
//     kadro-koloro en la satalaj konstruaĵoj ).
export function kreiOranMaterialon(koloro: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: koloro, metalness: 0o33/0o40, roughness: 0o13/0o40, emissive: 0x302808, emissiveIntensity: 0o13/0o40, envMapIntensity: 0o12/0o10 });
}
