// ≺⧼ Agoj 🎬 ⧽≻
// La agoj de la ludanto — la salto, la E-interago ( la pordoj, la kanuoj, la
// litoj, la manĝaĵoj kaj la beroj ), la kuŝiĝo sur la lito, la leviĝo kaj la
// manĝado. La eniga tavolo ( kantaoj/fasado/enigoj.ts ) vokas la tri agojn, kiujn
// la orkestrilo ricevas reen.
//
// La stato de la ludanto vivas en kantaoj/ludo/ludanto.ts kaj venas ĉi tien kiel
// unu objekto. La agoj, kiuj apartenas al la aliaj moduloj ( la eniro kaj la
// eliro de konstruaĵo, la fermoj de la paneloj, la tosto ), venas kiel
// parametroj — la modulo mem importas nur la sonojn, la tradukojn, la
// manĝaĵajn klavojn kaj la konstruajn tiparojn.
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj.js";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import { cxuAŭdio, sfx } from "../../eskekoj/sonoj/sonoro.js";
import { traduki } from "../lingvo/tradukoj.js";
import { manĝaKlavo } from "../fasado/paneeloj.js";
import type { LitoInfo, Ludanto } from "./ludanto.js";
import type { Rezimoj } from "./rezimoj.js";

// AgajOpcioj — la stato, la kanuoj de la mondo ( ili venas de la urba sistemo ),
// la elementoj de la fasado kaj la agoj de la aliaj moduloj, kiujn la interago
// vokas. La kanua bloko kaj la minimapo naskiĝas post ĉi tiu modulo ( ili bezonas
// la enigon kaj la kolizian kradon ), do ili venas kiel mallongaj pordegoj — ili
// vokiĝas nur en la klako, kiam ambaŭ jam ekzistas.
export interface AgajOpcioj {
  ludanto: Ludanto;
  kanuoj: Kanoto[];
  promptoElemento: HTMLElement;
  informo: HTMLElement;
  vestaro: HTMLElement;
  fxVarma: HTMLElement;
  fxMenta: HTMLElement;
  montriTost: ( mesagxo: string ) => void;
  fermiInformon: () => void;
  fermiVestaron: () => void;
  // eliriKanoton — la seka, ne-doka bordo-punkto apud la kanuo ( kantaoj/ludo/kanuado.ts ).
  eliriKanoton( kanoto: Kanoto ): { x: number; z: number };
  // fermuMapon — Fermu la PLENAN mapon se ĝi estas malfermita; redonu ĉu ĝi estis.
  fermuMapon(): boolean;
  eniriKonstruajxon: Rezimoj["eniriKonstruajxon"];
  eliriInternon: () => void;
}

export interface Agoj {
  salti(): void;
  agaEskapon(): void;
  proviInterakti(): void;
}

export function kreiAgojn( opcioj: AgajOpcioj ): Agoj {
  const {
    ludanto, kanuoj,
    promptoElemento, informo, vestaro, fxVarma, fxMenta,
    montriTost, fermiInformon, fermiVestaron, eliriKanoton, fermuMapon,
    eniriKonstruajxon, eliriInternon,
  } = opcioj;

  // salti — La salto ( Spaco aŭ la telefona butono ). La impuso kaj la forpuŝa
  // sono; la sona forto sekvas la nunan promenan rapidon ( movoValoro ), do kure
  // la forpuŝo kaj la aera ŝovo estas pli laŭtaj ol de loko.
  function salti(): void {
    if ( ludanto.rezimo !== "walk" || ludanto.surKanoto || !ludanto.estasSurTERENO ) return;
    ludanto.rapidoY = 0o74/0o10;
    ludanto.estasSurTERENO = false;
    if ( cxuAŭdio() ) sfx.jump(0o4/0o10 + 0o6/0o10 * ludanto.movoValoro);
  }

  // agaEskapon — La Escape-klavo fermas la plej supran malfermitan aferon.
  // Kiam la PLENA MAPO estas malfermita, fermuMapon devas okupiĝi ( la nura
  // .montri-forigo lasus la mapon malfermita kaj la kompaso rifuzus remalfermi ĝin ).
  // La ŝtupetaro estas la informo-panelo, la vestejo, la plena mapo kaj fine la
  // interno de la konstruaĵo.
  function agaEskapon(): void {
    if ( informo.classList.contains("montri") ) fermiInformon();
    else if ( vestaro.classList.contains("montri") ) fermiVestaron();
    else if ( fermuMapon() ) { /* la mapo fermiĝis */ }
    else if ( ludanto.rezimo === "interior" ) { if ( ludanto.kuŝas ) leviĝi(); else eliriInternon(); }
  }

  // ⟪ Interagu (E-klavo) 📃 ⟫ — la interago elektas per la stato ( la reĝimo kaj
  // la proksimuloj skanitaj de la piediraj blokoj ), ne per la distanco mem.
  function proviInterakti() {
    if ( ludanto.rezimo === "interior" ) {
      if ( ludanto.kuŝas ) { leviĝi(); return; }
      if ( ludanto.plejProksimaLito ) { kuŝiĝi(ludanto.plejProksimaLito); return; }
      if ( ludanto.plejProksimaManĝaĵo && !ludanto.plejProksimaManĝaĵo.dead ) { konsumi(ludanto.plejProksimaManĝaĵo); return; }
      eliriInternon(); return;
    }
    if ( ludanto.surKanoto ) {
      const exit = eliriKanoton(ludanto.surKanoto);
      ludanto.pozicio.set(exit.x, 0o155/0o100, exit.z);
      ludanto.surKanoto = null;
      promptoElemento.classList.remove("montri");
      montriTost(traduki("eliri"));
      return;
    }
    // En orbita reximo E movas la fotilon vertikale, do la pordo/kanuo
    // interago validas nur dum promenado (ne kun malnovaj statoj).
    if ( ludanto.plejProksimaPordo && ludanto.rezimo === "walk" ) {
      eniriKonstruajxon(ludanto.plejProksimaPordo, ludanto.aktivaPordaAngulo);
      return;
    }
    let plejProksima: Kanoto | null = null;
    let minDistanco = 6;
    for ( const c of kanuoj ) {
      const d = Math.hypot(c.x - ludanto.pozicio.x, c.z - ludanto.pozicio.z);
      if ( d < minDistanco ) { minDistanco = d; plejProksima = c; }
    }
    if ( plejProksima ) {
      ludanto.surKanoto = plejProksima;
      plejProksima.vx = plejProksima.vz = 0;
      promptoElemento.classList.remove("montri");
      montriTost(traduki("regiloKanuo"));
      if ( cxuAŭdio() ) sfx.splash();
    }
    // Pussxlefo-beroj — kolekti ( manĝi ) la beron funkcias same kiel manĝi la
    // manĝaĵojn en la interno. Nur dum promenado — en orbito E movas la fotilon.
    if ( ludanto.plejProksimaBero && !ludanto.plejProksimaBero.dead && ludanto.rezimo === "walk" ) {
      konsumi(ludanto.plejProksimaBero);
      return;
    }
  }
  // kuŝiĝi — Kuŝi sur la lito. La fotilo malaltigas al la tola, la kapo sur la
  // kapkuseno ( +x loka ), rigardante la plafonon. La movado haltas ( la lito
  // forigas la movan blokon en la animacia buklo ) ĝis la leviĝo.
  function kuŝiĝi(l: LitoInfo): void {
    ludanto.kuŝas = true;
    ludanto.kuŝaStato = l;
    const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
    // La kapo ripozas sur la kapkuseno ĉe la kapo-fino ( +x loka ). La korpo
    // kuŝas sur la tola ( supro je 0o3/0o10 ) — la fotilo estas iomete super gxi.
    const kapX = l.lokaX + l.largho / 2 - 0o3/0o10;
    ludanto.pozicio.set(
      l.specX + l.cosR * kapX - l.sinR * l.lokaZ,
      specH0 + l.y + 0o3/0o10,
      l.specZ + l.sinR * kapX + l.cosR * l.lokaZ
);
    // Rigardu la plafonon laŭ la longa akso de la lito ( al la piedo ).
    ludanto.direkto = Math.atan2(l.cosR, l.sinR);
    ludanto.klinigxo = 0o7/0o10;
    ludanto.estasSurTERENO = true;
    ludanto.rapidoY = 0;
    ludanto.celDistanco = 0;
    ludanto.kameraDistanco = 0;
    promptoElemento.classList.remove("montri");
    if ( cxuAŭdio() ) sfx.chime();
  }
  // leviĝi — Stari de la piedo de la lito, frontante la liton.
  function leviĝi(): void {
    if ( !ludanto.kuŝaStato ) { ludanto.kuŝas = false; return; }
    const l = ludanto.kuŝaStato;
    ludanto.kuŝas = false;
    ludanto.kuŝaStato = null;
    const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
    const piedX = l.lokaX - l.largho / 2 - 0o6/0o10;
    ludanto.pozicio.set(
      l.specX + l.cosR * piedX - l.sinR * l.lokaZ,
      specH0 + l.y,
      l.specZ + l.sinR * piedX + l.cosR * l.lokaZ
);
    ludanto.direkto = Math.atan2(-l.cosR, -l.sinR);
    ludanto.klinigxo = -0o1/0o20;
    ludanto.estasSurTERENO = true;
    ludanto.rapidoY = 0;
    promptoElemento.classList.remove("montri");
  }

  // konsumi — Manĝi aŭ trinki. La manĝaĵo ŝrumpos, la tosto montras la guston kaj
  // la varma aŭ menta ekrano-pulso sekvas. La animacio estas nuligebla — kiam la
  // interno estas kasxita kaj reuzata, la pendanta malkresko ne plu rajtas tuŝi la
  // reaperantan manĝaĵon.
  function konsumi(item: MangxajxItemo) {
    if ( !item || item.dead ) return;
    item.dead = true;
    const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
    const start = performance.now();
    ( function ŝrumpi() {
      const t = ( performance.now() - start ) / 480;
      m.scale.setScalar(Math.max(0o1/0o2000, 1 - t));
      if ( t < 1 ) item.malkreska = requestAnimationFrame(ŝrumpi); else { m.visible = false; item.malkreska = null; }
    } )();
    if ( isFok ) sfx.crunch(); else sfx.sip();
    const foodKey = manĝaKlavo(f.key);
    // En aih la gustoj de la novaj manĝaĵoj estas provizore malplenaj — montru
    // la nomon sole anstataŭ la kruda traduka klavo.
    const flavoro = traduki(foodKey + "Flavor");
    montriTost("<i>" + traduki(foodKey) + "</i><br>" + ( flavoro === foodKey + "Flavor" ? "" : flavoro ));
    const fx = isFok ? fxVarma : fxMenta;
    fx.classList.remove("fxPulso");
    void fx.offsetWidth;
    fx.classList.add("fxPulso");
  }

  return { salti, agaEskapon, proviInterakti };
}
