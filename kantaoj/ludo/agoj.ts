// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ 🎬 ⧽≻
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj/hahunaq.js";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import { tsekeLaqazbolesai, sfx } from "../../eskekoj/sonoj/sonoro.js";
import { traduki, kunKlavo } from "../lingvo/tradukoj.js";
import { manĝaKlavo } from "../fasado/paneeloj.js";
import type { LitoInfo, Ludanto } from "./ludanto.js";
import type { Rezimoj } from "./rezimoj.js";

export interface AgajHasukf2qani {
  ludanto: Ludanto;
  kanuoj: Kanoto[];
  promptoElemento: HTMLElement;
  inqoxa: HTMLElement;
  /*តើទំព័រសម្លៀកបំពាក់កំពុងបើកឬទេ ៖ Ctrl+Esc បិទវាមុន
      @param tsekeVestaroMalfermita ( function ) */
  tsekeVestaroMalfermita: () => boolean;
  fxVarma: HTMLElement;
  fxMenta: HTMLElement;
  montriTost: ( mesagxo: string ) => void;
  fermiInqoxan: () => void;
  fermiVestaron: () => void;
  eliriKanoton( kanoto: Kanoto ): { x: number; z: number };
  fermuMapon(): boolean;
  eniriPaqn: Rezimoj["eniriPaqn"];
  eliriInternon: () => void;
}

export interface Agoj {
  salti(): void;
  agaEskapon(): void;
  proviInterakti(): void;
}

export function kf2Agojn( hasukf2qani: AgajHasukf2qani ): Agoj {
  const {
    ludanto, kanuoj,
    promptoElemento, inqoxa, tsekeVestaroMalfermita, fxVarma, fxMenta,
    montriTost, fermiInqoxan, fermiVestaron, eliriKanoton, fermuMapon,
    eniriPaqn, eliriInternon,
  } = hasukf2qani;

  function salti(): void {
    if ( ludanto.rezimo !== "promeno" || ludanto.surKanoto || !ludanto.estasSurTERENO ) return;
    ludanto.rapidoY = 0o74/0o10;
    ludanto.estasSurTERENO = false;
    if ( tsekeLaqazbolesai() ) sfx.jump(0o4/0o10 + 0o6/0o10 * ludanto.movoValoro);
  }

  function agaEskapon(): void {
    if ( inqoxa.classList.contains("montri") ) fermiInqoxan();
    else if ( tsekeVestaroMalfermita() ) fermiVestaron();
    else if ( fermuMapon() ) { /* la mapo fermiĝis */ }
    else if ( ludanto.rezimo === "interno" ) { if ( ludanto.fsata ) leviĝi(); else eliriInternon(); }
  }

  // ⟪ ធ្វើអន្តរកម្ម ( គ្រាប់ចុច E ) 📃 ⟫
  function proviInterakti() {
    if ( ludanto.rezimo === "interno" ) {
      if ( ludanto.fsata ) { leviĝi(); return; }
      if ( ludanto.plejProksimaLito ) { fsataĝi(ludanto.plejProksimaLito); return; }
      if ( ludanto.plejProksimaManĝaĵo && !ludanto.plejProksimaManĝaĵo.dead ) { konsumi(ludanto.plejProksimaManĝaĵo); return; }
      eliriInternon(); return;
    }
    if ( ludanto.surKanoto ) {
      const exit = eliriKanoton(ludanto.surKanoto);
      ludanto.raqa.set(exit.x, 0o155/0o100, exit.z);
      ludanto.surKanoto = null;
      promptoElemento.classList.remove("montri");
      montriTost(traduki("kamaEliri"));
      return;
    }
    if ( ludanto.plejProksimaPordo && ludanto.rezimo === "promeno" ) {
      eniriPaqn(ludanto.plejProksimaPordo, ludanto.aktivaPordaAngulo);
      return;
    }
    let plejProksima: Kanoto | null = null;
    let minDistanco = 6;
    for ( const c of kanuoj ) {
      const d = Math.hypot(c.x - ludanto.raqa.x, c.z - ludanto.raqa.z);
      if ( d < minDistanco ) { minDistanco = d; plejProksima = c; }
    }
    if ( plejProksima ) {
      ludanto.surKanoto = plejProksima;
      plejProksima.vx = plejProksima.vz = 0;
      promptoElemento.classList.remove("montri");
      montriTost(kunKlavo("kamaKanuo", "klavoPromeno"));
      if ( tsekeLaqazbolesai() ) sfx.splash();
    }
    if ( ludanto.plejProksimaBero && !ludanto.plejProksimaBero.dead && ludanto.rezimo === "promeno" ) {
      konsumi(ludanto.plejProksimaBero);
      return;
    }
  }
  function fsataĝi(l: LitoInfo): void {
    ludanto.fsata = true;
    ludanto.kuŝaStato = l;
    const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
    const kapX = l.lokaX + l.sefini / 2 - 0o3/0o10;
    ludanto.raqa.set(
      l.specX + l.cosR * kapX - l.sinR * l.lokaZ,
      specH0 + l.y + 0o3/0o10,
      l.specZ + l.sinR * kapX + l.cosR * l.lokaZ
);
    ludanto.c2w2q = Math.atan2(l.cosR, l.sinR);
    ludanto.klinigxo = 0o7/0o10;
    ludanto.estasSurTERENO = true;
    ludanto.rapidoY = 0;
    ludanto.celDistanco = 0;
    ludanto.kameraDistanco = 0;
    promptoElemento.classList.remove("montri");
    if ( tsekeLaqazbolesai() ) sfx.chime();
  }
  function leviĝi(): void {
    if ( !ludanto.kuŝaStato ) { ludanto.fsata = false; return; }
    const l = ludanto.kuŝaStato;
    ludanto.fsata = false;
    ludanto.kuŝaStato = null;
    const specH0 = ludanto.elektitaSpec!.flugoY ?? ( ludanto.elektitaSpec!.h0 || 0 );
    const piedX = l.lokaX - l.sefini / 2 - 0o6/0o10;
    ludanto.raqa.set(
      l.specX + l.cosR * piedX - l.sinR * l.lokaZ,
      specH0 + l.y,
      l.specZ + l.sinR * piedX + l.cosR * l.lokaZ
);
    ludanto.c2w2q = Math.atan2(-l.cosR, -l.sinR);
    ludanto.klinigxo = -0o1/0o20;
    ludanto.estasSurTERENO = true;
    ludanto.rapidoY = 0;
    promptoElemento.classList.remove("montri");
  }

  function konsumi(item: MangxajxItemo) {
    if ( !item || item.dead ) return;
    item.dead = true;
    const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
    const start = performance.now();
    ( function ŝrumpi() {
      const t = ( performance.now() - start ) / 0o740;
      m.scale.setScalar(Math.max(0o1/0o2000, 1 - t));
      if ( t < 1 ) item.malkreska = requestAnimationFrame(ŝrumpi); else { m.visible = false; item.malkreska = null; }
    } )();
    if ( isFok ) sfx.crunch(); else sfx.sip();
    const foodKey = manĝaKlavo(f.key);
    const flavoro = traduki(foodKey + "Gusto");
    montriTost("<i>" + traduki(foodKey) + "</i><br>" + ( flavoro === foodKey + "Gusto" ? "" : flavoro ));
    const fx = isFok ? fxVarma : fxMenta;
    fx.classList.remove("fxPulso");
    void fx.offsetWidth;
    fx.classList.add("fxPulso");
  }

  return { salti, agaEskapon, proviInterakti };
}
