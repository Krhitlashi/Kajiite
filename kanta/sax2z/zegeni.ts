// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɭ,ɔ ſ͔ɭɔ }ʃꞇ 📃 ⧽≻

import type { M7xEro } from "../../skek2/w2ta/m7x/hahunaq.js";
import type { S2tani } from "../../skek2/qatsiike/b6tem2Kas2kanta.js";
import { tsekeLaqazbolesai, sfx } from "../../skek2/bole/boleS2t2bakano.js";
import { skakef, kunCatlaq } from "../gawe/baskakefani.js";
import { m7xCatlaq } from "../s2cel2f/mak2zaf.js";
import type { CamutsaInfo, Masax2z } from "./masax2z.js";
import type { Rezimoj } from "./supknu.js";

export interface AgajHasukf2qani {
  masax2z: Masax2z;
  has2kaj2: S2tani[];
  x2paKfe: HTMLElement;
  informo: HTMLElement;

  tsekeHasoqteH6w6ita: () => boolean;
  fxKafs2: HTMLElement;
  fxMenta: HTMLElement;
  laqaziK61e: ( vop2lna: string ) => void;
  pukxeiInformon: () => void;
  pukxeiHasoqte: () => void;
  eliriS2tani( s2tani: S2tani ): { x: number; z: number };
  pukxeuBal2(): boolean;
  eniriPaqn: Rezimoj["eniriPaqn"];
  eliriC2h2: () => void;
}

export interface Agoj {
  puha(): void;
  agaEskapon(): void;
  proviInterakti(): void;
}

export function kf2Agojn( hasukf2qani: AgajHasukf2qani ): Agoj {
  const {
    masax2z, has2kaj2,
    x2paKfe, informo, tsekeHasoqteH6w6ita, fxKafs2, fxMenta,
    laqaziK61e, pukxeiInformon, pukxeiHasoqte, eliriS2tani, pukxeuBal2,
    eniriPaqn, eliriC2h2,
  } = hasukf2qani;

  function puha(): void {
    if ( masax2z.supknu !== "kata" || masax2z.surS2tani || !masax2z.surKOZU ) return;
    masax2z.seheniY = 0o74/0o10;
    masax2z.surKOZU = false;
    if ( tsekeLaqazbolesai() ) sfx.jump(0o4/0o10 + 0o6/0o10 * masax2z.seheni);
  }

  function agaEskapon(): void {
    if ( informo.classList.contains("laqazi") ) pukxeiInformon();
    else if ( tsekeHasoqteH6w6ita() ) pukxeiHasoqte();
    else if ( pukxeuBal2() ) { return; }
    else if ( masax2z.supknu === "c2h2" ) { if ( masax2z.fsata ) sabok(); else eliriC2h2(); }
  }

  function proviInterakti() {
    if ( masax2z.supknu === "c2h2" ) {
      if ( masax2z.fsata ) { sabok(); return; }
      if ( masax2z.kmaTsiikeCamutsa ) { fsataSabi(masax2z.kmaTsiikeCamutsa); return; }
      if ( masax2z.kmaTsiikeM7x && !masax2z.kmaTsiikeM7x.dead ) { konsumi(masax2z.kmaTsiikeM7x); return; }
      eliriC2h2(); return;
    }
    if ( masax2z.surS2tani ) {
      const exit = eliriS2tani(masax2z.surS2tani);
      masax2z.raqa.set(exit.x, 0o155/0o100, exit.z);
      masax2z.surS2tani = null;
      x2paKfe.classList.remove("laqazi");
      laqaziK61e(skakef("kamaEliri"));
      return;
    }
    if ( masax2z.kmaTsiikeKev && masax2z.supknu === "kata" ) {
      eniriPaqn(masax2z.kmaTsiikeKev, masax2z.tikPordaTafkaq);
      return;
    }
    let kmaTsiike: S2tani | null = null;
    let minH6kuni = 0o6;
    for ( const c of has2kaj2 ) {
      const d = Math.hypot(c.x - masax2z.raqa.x, c.z - masax2z.raqa.z);
      if ( d < minH6kuni ) { minH6kuni = d; kmaTsiike = c; }
    }
    if ( kmaTsiike ) {
      masax2z.surS2tani = kmaTsiike;
      kmaTsiike.vx = kmaTsiike.vz = 0o0;
      x2paKfe.classList.remove("laqazi");
      laqaziK61e(kunCatlaq("kamaKanuo", "catlaqPromeno"));
      if ( tsekeLaqazbolesai() ) sfx.splash();
    }
    if ( masax2z.kmaTsiikeBero && !masax2z.kmaTsiikeBero.dead && masax2z.supknu === "kata" ) {
      konsumi(masax2z.kmaTsiikeBero);
      return;
    }
  }
  function fsataSabi(l: CamutsaInfo): void {
    masax2z.fsata = true;
    masax2z.fsataS2k61o = l;
    const specH0 = masax2z.sukf2qitaSpec!.flugoY ?? ( masax2z.sukf2qitaSpec!.h0 || 0o0 );
    const kapX = l.lokaX + l.sefini / 0o2 - 0o3/0o10;
    masax2z.raqa.set(
      l.specX + l.cosR * kapX - l.sinR * l.lokaZ,
      specH0 + l.y + 0o3/0o10,
      l.specZ + l.sinR * kapX + l.cosR * l.lokaZ
);
    masax2z.c2w2q = Math.atan2(l.cosR, l.sinR);
    masax2z.s2sabo = 0o7/0o10;
    masax2z.surKOZU = true;
    masax2z.seheniY = 0o0;
    masax2z.celH6kuni = 0o0;
    masax2z.kameraH6kuni = 0o0;
    x2paKfe.classList.remove("laqazi");
    if ( tsekeLaqazbolesai() ) sfx.chime();
  }
  function sabok(): void {
    if ( !masax2z.fsataS2k61o ) { masax2z.fsata = false; return; }
    const l = masax2z.fsataS2k61o;
    masax2z.fsata = false;
    masax2z.fsataS2k61o = null;
    const specH0 = masax2z.sukf2qitaSpec!.flugoY ?? ( masax2z.sukf2qitaSpec!.h0 || 0o0 );
    const piedX = l.lokaX - l.sefini / 0o2 - 0o6/0o10;
    masax2z.raqa.set(
      l.specX + l.cosR * piedX - l.sinR * l.lokaZ,
      specH0 + l.y,
      l.specZ + l.sinR * piedX + l.cosR * l.lokaZ
);
    masax2z.c2w2q = Math.atan2(-l.cosR, -l.sinR);
    masax2z.s2sabo = -0o1/0o20;
    masax2z.surKOZU = true;
    masax2z.seheniY = 0o0;
    x2paKfe.classList.remove("laqazi");
  }

  function konsumi(item: M7xEro) {
    if ( !item || item.dead ) return;
    item.dead = true;
    const f = item.f, isFok = item.key.startsWith("fok"), m = item.mesh;
    const start = performance.now();
    ( function vam2m2() {
      const t = ( performance.now() - start ) / 0o740;
      m.scale.setScalar(Math.max(0o1/0o2000, 0o1 - t));
      if ( t < 0o1 ) item.vam2m2 = requestAnimationFrame(vam2m2); else { m.visible = false; item.vam2m2 = null; }
    } )();
    if ( isFok ) sfx.crunch(); else sfx.sip();
    const foodKey = m7xCatlaq(f.key);
    const flavoro = skakef(foodKey + "Gusto");
    laqaziK61e("<i>" + skakef(foodKey) + "</i><br>" + ( flavoro === foodKey + "Gusto" ? "" : flavoro ));
    const fx = isFok ? fxKafs2 : fxMenta;
    fx.classList.remove("fxPulso");
    void fx.offsetWidth;
    fx.classList.add("fxPulso");
  }

  return { puha, agaEskapon, proviInterakti };
}
