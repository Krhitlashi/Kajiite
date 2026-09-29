// ≺⧼ La metitaj objektoj 📦 ⧽≻
// La enmeto de la individuaj objektoj de la objekta ilo ( SKULPTA_OBJEKTOJ ) —
// plantoj, akvaj bestoj, petreloj, NPC-oj, kanuoj kaj la kosmoŝipo
// ( konstruiMetitajnObjektojn ).
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../../eskekoj/komunajxoj/kunfandajxoj.js";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { BestoSistemo, PetreloSistemo,
  konstruiMetitanBeston, konstruiMetitanPetrelon } from "../../../eskekoj/shalaj-specioj/bestoj.js";
import { konstruiMetitanRokon } from "../../../eskekoj/shalaj-specioj/vegetajxo/rokoj.js";
import { konstruiMetitanFilikon } from "../../../eskekoj/shalaj-specioj/vegetajxo/filikoj.js";
import { konstruiHxsxaksxlefojn } from "../../../eskekoj/shalaj-specioj/vegetajxo/hxsxaksxlefo.js";
import { konstruiPussxlefojn } from "../../../eskekoj/shalaj-specioj/vegetajxo/pussxlefo.js";
import { konstruiArbaron } from "../../../eskekoj/shalaj-specioj/vegetajxo/betuloj/arbaro.js";
import { konstruiLarikon } from "../../../eskekoj/shalaj-specioj/vegetajxo/larikoj.js";
import { konstruiKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kreiKanoton, Kanoto } from "../../../eskekoj/medio/transporto.js";
import { konstruiFiguron } from "../../../eskekoj/shalaj-specioj/homoj.js";
import type { Figuro } from "../../../eskekoj/shalaj-specioj/homoj.js";
import { konstruiKrasesxagxon } from "../../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { VESTOJ } from "../../../eskekoj/vestaro/vestoj.js";
import type { MetitaObjekto } from "./tipoj.js";

// konstruiMetitajnObjektojn — Spawnu la individuajn objektojn de la objekta
// ilo ( SKULPTA_OBJEKTOJ ). plantoj cxe siaj precizaj pozicioj ( la
// pozicio-listaj konstruantoj akceptas unu-elementan liston ), akvaj bestoj
// kaj petreloj en la ekzistantajn animaci-sistemojn ( ili naĝas/flugas cxe la
// ankro ), kaj NPC-oj en la npc-aron ( ili piediras kiel la ceteraj ). La
// kanuoj 🛶 kaj la spacosxipo 🚀 estas ankaŭ objektoj — la kanuoj en la
// kanuan aron ( la fiziko de sperto.ts ), la sxipo en la mondan spacon super
// la cefa stacio. Revenu la konstruitan spacosxipon ( aux null se neniu ).
export function konstruiMetitajnObjektojn(
  sceno: THREE.Scene,
  objektoj: MetitaObjekto[],
  altecoFn: ( x: number, z: number ) => number,
  akvoFn: ( x: number, z: number ) => boolean,
  akvaNiveloFn: ( x: number, z: number ) => number,
  bestoj: BestoSistemo,
  petreloj: PetreloSistemo,
  npcoj: Figuro[],
  kanuoj: Kanoto[],
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  selektajxoj: THREE.Mesh[],
): Krasesxagxo | null {
  const xipoj: Krasesxagxo[] = [];
  // La gefiloj de la sceno antaŭ la meto — ĉio nova poste estas la metitaj
  // objektoj ( la konstruaĵoj kaj iliaj speguloj ), kiujn la kunfandilo povas
  // preni ( vidu la kunfandon malsupre ).
  const antaŭajGefiloj = new Set<THREE.Object3D>(sceno.children);
  for ( const o of objektoj ) {
    const s = o.skalo ?? 1;
    if ( o.speco === "betulo" ) konstruiArbaron(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "lariko" ) konstruiLarikon(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "hxsxaksxlefo" ) konstruiHxsxaksxlefojn(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "pussxlefo" ) konstruiPussxlefojn(sceno, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.speco === "roko" ) konstruiMetitanRokon(sceno, o.x, o.z, altecoFn, s, o.rotacio ?? -1);
    else if ( o.speco === "filiko" ) konstruiMetitanFilikon(sceno, o.x, o.z, altecoFn, s, o.filikaSpeco ?? 0);
    else if ( o.speco === "akvabesto" ) {
      if ( !akvoFn(o.x, o.z) ) continue;   // la akvaj bestoj naĝas nur en akvo
      const b = konstruiMetitanBeston(sceno, o.bestospeco ?? 0, o.x, o.z, akvaNiveloFn(o.x, o.z), s);
      if ( b ) bestoj.bestoj.push(b);
    } else if ( o.speco === "petrelo" ) {
      const p = konstruiMetitanPetrelon(sceno, o.x, o.z, altecoFn, o.radio ?? 4, s);
      if ( p ) petreloj.petreloj.push(p);
    } else if ( o.speco === "npco" ) {
      const v = VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length];
      const fig = konstruiFiguron(v, ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
      const h = altecoFn(o.x, o.z);
      fig.group.position.set(o.x, h, o.z);
      fig.hejmo.set(o.x, h, o.z);
      fig.celo.set(o.x, h, o.z);
      fig.group.rotation.y = o.rotacio ?? 0;
      fig.atendo = Math.random() * 4;
      fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
      sceno.add(fig.group);
      npcoj.push(fig);
    } else if ( o.speco === "kanuo" ) {
      // La kanuoj flosas nur sur akvo ( la fiziko de sperto.ts refreŝigas
      // la nivelon ĉiukadre ). La baza nivelo venas de la akvosurfaca
      // funkcio — la sama kiel la antaŭe koditaj kanuoj.
      if ( !akvoFn(o.x, o.z) ) continue;
      kanuoj.push(kreiKanoton(sceno, o.x, o.z, o.rotacio ?? 0, oraMaterialo,
        akvaNiveloFn(o.x, o.z), o.stilo === "satala" ? "satala" : "baza"));
    } else if ( o.speco === "hxeuxfo" || o.speco === "hxeuxfoPlato" ) {
      // La lampoj kiel OBJEKTOJ jam konstruiĝis en la komuna lampa sistemo
      // ( konstruiUrbon aldonas iliajn lokojn al lampLokoj antaŭ la sistemo
      // — la flamoj animiĝas kune kaj la kolizioj aldoniĝas; la plato de la
      // hxeuxfoPlato-varianto konstruiĝis ankaŭ tie ).
    } else if ( o.speco === "keuxfhxeso" ) {
      // La keŭfĥeso — unu starfrukta strukturo kun ses oraj ripoj ( la sama
      // konstruanto kiel la kradaj keŭfĥesoj ).
      konstruiKeuxfhxeso(sceno, [ { x: o.x, z: o.z, rot: o.rotacio ?? 0 } ], altecoFn, oraMaterialo);
    } else if ( o.speco === "spacosxipo" ) {
      // La spacosxipo flosas super la cefa stacio ( y = 40 — la sama
      // alteco kiel antaŭe ). La stacia enirejo ricevas la flugan altecon
      // malsupre, post la tuta konstruo.
      xipoj.push(konstruiKrasesxagxon(sceno, o.x, 0o40, o.z, oraMaterialo, eniraMaterialo));
    } else if ( o.speco === "sanktejo" || o.speco === "turo" || o.speco === "domo"
        || o.speco === "mangxejo" || o.speco === "kasafeo" || o.speco === "stacio" ) {
      // La individuaj konstruajxoj ( sataloj ) — la samaj specoj kiel la
      // krada paletro ( stacio kiel stacioxipo ), kun la samaj tavoloj kaj
      // altoj kiel la kradaj konstruaĵoj ( kreiSpecon en konstruiKradanUrbon ).
      const tipo = o.speco === "stacio" ? "stacioxipo" : o.speco;
      const niveloj = tipo === "stacioxipo" ? 3 : tipo === "sanktejo" ? 7 : tipo === "turo" ? 0o10 : 4;
      const w = 0o10 * ( o.skalo ?? 1 ), d = w;
      konstruiSatalon({
        x: o.x, z: o.z, type: tipo, name: "objekto",
        niveloj, w, d,
        tieroAlto: tipo === "stacioxipo" ? 0o155/0o40
          : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
        rot: o.rotacio ?? 0, diamond: true, h0: altecoFn(o.x, o.z),
        sube: tipo === "stacioxipo" ? 0 : niveloj, tieroAltoSub: 0o123/0o40,
      }, sceno, selektajxoj);
    }
  }
  // ⟨ Kunfando de la metitaj konstruaĵoj 📃 ⟩ — la individuaj objektoj de la
  // terena skulptilo ( la sanktejoj, turoj, domoj, manĝejoj, kasafeoj kaj
  // stacidomoj ) konstruiĝas per la SAMA konstruiSatalon kiel la kradaj urboj,
  // do ili alportas la samajn 10-20 meshojn po konstruaĵo ( plus la diamantan
  // spegulon ). Ili estas la plej granda restanta grupo de desegnaj alvokoj
  // post la kunfando de la kradaj urboj, kaj ili same neniam moviĝas. La
  // moviĝantaj objektoj de ĉi tiu buklo ( la NPC-oj, la bestoj, la petreloj, la
  // kanuoj, la kosmoŝipo ) RESTAS solaj — iliaj transformoj kaj animacioj
  // bezonas la proprajn meshojn, kaj la kunfandilo bakus ilian nunan pozicion.
  const konservotaj = new Set<THREE.Object3D>(selektajxoj);
  const movaj = new Set<THREE.Object3D>();
  for ( const f of npcoj ) movaj.add(f.group);
  for ( const b of bestoj.bestoj ) movaj.add(b.grupo);
  for ( const p of petreloj.petreloj ) movaj.add(p.grupo);
  for ( const k of kanuoj ) movaj.add(k.group);
  for ( const x of xipoj ) movaj.add(x.group);
  kunfandiMondajnMeshojn(sceno,
    sceno.children.filter(o => !antaŭajGefiloj.has(o) && !movaj.has(o)), {
      celo: 0o100,
      konservu: ( m ) => konservotaj.has(m),
    });
  return xipoj.length ? xipoj[0] : null;
}
