// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ 🎬 ⧽≻
import type { MangxajxEro } from "../../skek2/w2ta/m7x/hahunaq.js";
import type { S2tani } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import { tsekeLaqazbolesai, sfx } from "../../skek2/bole/boleS2t2bakano.js";
import { traduki, kunCatlaq } from "../gawe/baskakefani.js";
import { manĝaCatlaq } from "../fasado/mak2zaf.js";
import type { CamutsaInfo, Masax2z } from "./masax2z.js";
import type { Rezimoj } from "./supknu.js";

export interface AgajHasukf2qani {
  masax2z: Masax2z;
  has2kaj2: S2tani[];
  x2paKfe: HTMLElement;
  informo: HTMLElement;
  /*j͑ʃɜ j͑ʃƨɹ ʌ j͑ʃɜȝ ɭʃɔ ⟅ Ctrl+Esc ʌ ſȷwɔ˞ ʌ ꞙɭɔ
      @param tsekeHasoqteH6w6ita ( function ) */
  tsekeHasoqteH6w6ita: () => boolean;
  fxKafs2: HTMLElement;
  fxMenta: HTMLElement;
  laqaziTost: ( vop2lna: string ) => void;
  pukxeiInformon: () => void;
  pukxeiHasoqte: () => void;
  eliriS2tani( s2tani: S2tani ): { x: number; z: number };
  pukxeuBal2(): boolean;
  eniriPaqn: Rezimoj["eniriPaqn"];
  eliriC2h2: () => void;
}

export interface Agoj {
  salti(): void;
  agaEskapon(): void;
  proviInterakti(): void;
}

export function kf2Agojn( hasukf2qani: AgajHasukf2qani ): Agoj {
  const {
    masax2z, has2kaj2,
    x2paKfe, informo, tsekeHasoqteH6w6ita, fxKafs2, fxMenta,
    laqaziTost, pukxeiInformon, pukxeiHasoqte, eliriS2tani, pukxeuBal2,
    eniriPaqn, eliriC2h2,
  } = hasukf2qani;

  function salti(): void {
    if ( masax2z.supknu !== "promeno" || masax2z.surS2tani || !masax2z.estasSurKOZU ) return;
    masax2z.seheniY = 0o74/0o10;
    masax2z.estasSurKOZU = false;
    if ( tsekeLaqazbolesai() ) sfx.jump(0o4/0o10 + 0o6/0o10 * masax2z.movoVem2);
  }

  function agaEskapon(): void {
    if ( informo.classList.contains("laqazi") ) pukxeiInformon();
    else if ( tsekeHasoqteH6w6ita() ) pukxeiHasoqte();
    else if ( pukxeuBal2() ) { /* la bal2 pukxeiĝis */ }
    else if ( masax2z.supknu === "c2h2" ) { if ( masax2z.fsata ) leviĝi(); else eliriC2h2(); }
  }

  // ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ( ſɟᴜ ſ̀ȷᴜȝ E ) 📃 ⟫
  function proviInterakti() {
    if ( masax2z.supknu === "c2h2" ) {
      if ( masax2z.fsata ) { leviĝi(); return; }
      if ( masax2z.kmaTsiikeCamutsa ) { fsataĝi(masax2z.kmaTsiikeCamutsa); return; }
      if ( masax2z.kmaTsiikeManĝaĵo && !masax2z.kmaTsiikeManĝaĵo.dead ) { konsumi(masax2z.kmaTsiikeManĝaĵo); return; }
      eliriC2h2(); return;
    }
    if ( masax2z.surS2tani ) {
      const exit = eliriS2tani(masax2z.surS2tani);
      masax2z.raqa.set(exit.x, 0o155/0o100, exit.z);
      masax2z.surS2tani = null;
      x2paKfe.classList.remove("laqazi");
      laqaziTost(traduki("kamaEliri"));
      return;
    }
    if ( masax2z.kmaTsiikeKev && masax2z.supknu === "promeno" ) {
      eniriPaqn(masax2z.kmaTsiikeKev, masax2z.tikPordaTafkaq);
      return;
    }
    let kmaTsiike: S2tani | null = null;
    let minH6kuni = 6;
    for ( const c of has2kaj2 ) {
      const d = Math.hypot(c.x - masax2z.raqa.x, c.z - masax2z.raqa.z);
      if ( d < minH6kuni ) { minH6kuni = d; kmaTsiike = c; }
    }
    if ( kmaTsiike ) {
      masax2z.surS2tani = kmaTsiike;
      kmaTsiike.vx = kmaTsiike.vz = 0;
      x2paKfe.classList.remove("laqazi");
      laqaziTost(kunCatlaq("kamaKanuo", "catlaqPromeno"));
      if ( tsekeLaqazbolesai() ) sfx.splash();
    }
    if ( masax2z.kmaTsiikeBero && !masax2z.kmaTsiikeBero.dead && masax2z.supknu === "promeno" ) {
      konsumi(masax2z.kmaTsiikeBero);
      return;
    }
  }
  function fsataĝi(l: CamutsaInfo): void {
    masax2z.fsata = true;
    masax2z.kuŝaS2k61o = l;
    const specH0 = masax2z.sukf2qitaSpec!.flugoY ?? ( masax2z.sukf2qitaSpec!.h0 || 0 );
    const kapX = l.lokaX + l.sefini / 2 - 0o3/0o10;
    masax2z.raqa.set(
      l.specX + l.cosR * kapX - l.sinR * l.lokaZ,
      specH0 + l.y + 0o3/0o10,
      l.specZ + l.sinR * kapX + l.cosR * l.lokaZ
);
    masax2z.c2w2q = Math.atan2(l.cosR, l.sinR);
    masax2z.s2sabo = 0o7/0o10;
    masax2z.estasSurKOZU = true;
    masax2z.seheniY = 0;
    masax2z.celH6kuni = 0;
    masax2z.kameraH6kuni = 0;
    x2paKfe.classList.remove("laqazi");
    if ( tsekeLaqazbolesai() ) sfx.chime();
  }
  function leviĝi(): void {
    if ( !masax2z.kuŝaS2k61o ) { masax2z.fsata = false; return; }
    const l = masax2z.kuŝaS2k61o;
    masax2z.fsata = false;
    masax2z.kuŝaS2k61o = null;
    const specH0 = masax2z.sukf2qitaSpec!.flugoY ?? ( masax2z.sukf2qitaSpec!.h0 || 0 );
    const piedX = l.lokaX - l.sefini / 2 - 0o6/0o10;
    masax2z.raqa.set(
      l.specX + l.cosR * piedX - l.sinR * l.lokaZ,
      specH0 + l.y,
      l.specZ + l.sinR * piedX + l.cosR * l.lokaZ
);
    masax2z.c2w2q = Math.atan2(-l.cosR, -l.sinR);
    masax2z.s2sabo = -0o1/0o20;
    masax2z.estasSurKOZU = true;
    masax2z.seheniY = 0;
    x2paKfe.classList.remove("laqazi");
  }

  function konsumi(item: MangxajxEro) {
    if ( !item || item.dead ) return;
    item.dead = true;
    const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
    const start = performance.now();
    ( function ŝrumpi() {
      const t = ( performance.now() - start ) / 0o740;
      m.scale.setScalar(Math.max(0o1/0o2000, 1 - t));
      if ( t < 1 ) item.vam2m2 = requestAnimationFrame(ŝrumpi); else { m.visible = false; item.vam2m2 = null; }
    } )();
    if ( isFok ) sfx.crunch(); else sfx.sip();
    const foodKey = manĝaCatlaq(f.key);
    const flavoro = traduki(foodKey + "Gusto");
    laqaziTost("<i>" + traduki(foodKey) + "</i><br>" + ( flavoro === foodKey + "Gusto" ? "" : flavoro ));
    const fx = isFok ? fxKafs2 : fxMenta;
    fx.classList.remove("fxPulso");
    void fx.offsetWidth;
    fx.classList.add("fxPulso");
  }

  return { salti, agaEskapon, proviInterakti };
}
