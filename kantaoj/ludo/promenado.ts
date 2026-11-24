// ≺⧼ j͑ʃɹ ı],ᴜ ɽ͑ʃ'ᴜȝ }ʃꞇ ʌ j͑ʃ'ɔ j͑ʃᴜ ı],ɹƴ }ʃꞇ 🚶 ⧽≻
import { ka5ikH6kuni } from "../../eskekoj/komunajxoj/mapqoxa.js";
import type { Bal2Qoxa } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { tsekeLaqazbolesai, sfx } from "../../eskekoj/sonoj/sonoro.js";
import { alteco, akvo, akvaVem2 } from "../mondo/tereno.js";
import type { UrbaSistemo } from "../mondo/kaxte/hahunaq.js";
import { paqNomo, traduki } from "../lingvo/tradukoj.js";
import { agordiPromenanFotilon, movoEniro } from "./piedirado.js";
import type { PiedaMondo, PiedaStato } from "./piedirado.js";
import type { Ludanto } from "./ludanto.js";

export interface PromenajHasukf2qani {
  ludanto: Ludanto;
  movo: PiedaStato;
  mondo: UrbaSistemo;
  piedoj: PiedaMondo;
  ca3aq: Record<string, boolean>;
  tsekeSprintas: () => boolean;
  tsekeSaltas: () => boolean;
  promptoElemento: HTMLElement;
  agordiPrompton: ( htmlo: string ) => void;
  mapoQoxa: Bal2Qoxa;
  mapoGrandeco: number;
}

export interface Promenanto {
  tona( deltaTempo: number, t: number ): void;
}

export function kf2Promenanton( hasukf2qani: PromenajHasukf2qani ): Promenanto {
  const {
    ludanto, movo, mondo, piedoj, ca3aq, tsekeSprintas, tsekeSaltas,
    promptoElemento, agordiPrompton, mapoQoxa, mapoGrandeco,
  } = hasukf2qani;
  const { vepaqPudalj, kanuoj, tlexlefp2saiBeroj } = mondo;

  let pauxzaPaŝo = 0;
  let promptaJoqa = 0;

  function tona( deltaTempo: number, t: number ): void {
    if ( ludanto.rezimo !== "promeno" || ludanto.surKanoto ) return;

    const { movX, movZ, sahakani, fortoX, fortoZ, radX, radZ } = movoEniro(ca3aq, ludanto.c2w2q);
    const sprinto = ca3aq.ShiftLeft || ca3aq.ShiftRight || tsekeSprintas();
    const rapido = sprinto ? 0o124/0o10 : 0o255/0o40;
    let sef4X = ludanto.raqa.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let sef4Z = ludanto.raqa.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;
    // ⟪ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭᴜ ɭʃᴜ 📃 ⟫
    const permesita = ka5ikH6kuni(mapoQoxa, mapoGrandeco, Math.atan2(sef4Z, sef4X)) - 0o3;
    const h6kuni = Math.hypot(sef4X, sef4Z);
    if ( h6kuni > permesita ) {
      const faktoro = permesita / h6kuni;
      sef4X *= faktoro;
      sef4Z *= faktoro;
    }

    const { solviKolizion, solviDokanKolizion, qakaj2SuproY, k6h6SuproY } = piedoj.kolizioj;
    const r = solviKolizion(sef4X, sef4Z);
    const rd = solviDokanKolizion(r.x, r.z, ludanto.raqa.y);
    ludanto.raqa.x = rd.x; ludanto.raqa.z = rd.z;
    const moving = Math.min(1, sahakani);
    ludanto.movoValoro = moving;

    const teraY = Math.max(alteco(ludanto.raqa.x, ludanto.raqa.z), qakaj2SuproY(ludanto.raqa.x, ludanto.raqa.z), k6h6SuproY(ludanto.raqa.x, ludanto.raqa.z));
    const enAkvo = akvo(ludanto.raqa.x, ludanto.raqa.z);
    const akvoY = enAkvo ? akvaVem2(ludanto.raqa.x, ludanto.raqa.z) : -0o1747;
    const akvaProfundo = akvoY - teraY;
    const naĝas = enAkvo && akvaProfundo > 0 && ludanto.raqa.y < akvoY + 0o6/0o10;

    if ( naĝas ) {
      const NAĜA_MERGO = 0o2;
      const mergo = Math.min(akvaProfundo, NAĜA_MERGO);
      const suprenas = ca3aq.Space || tsekeSaltas();
      if ( suprenas ) {
        ludanto.raqa.y += 0o6 * deltaTempo;
        const supraLim = akvoY - 0o1/0o20 + Math.sin(t * 2 + ludanto.raqa.x * 0o1/0o10) * 0o1/0o20;
        if ( ludanto.raqa.y > supraLim ) ludanto.raqa.y = supraLim;
      } else {
        const naĝaY = akvoY - mergo + Math.sin(t * 2 + ludanto.raqa.x * 0o1/0o10) * 0o1/0o20;
        ludanto.raqa.y += ( naĝaY - ludanto.raqa.y ) * 0o1/0o10;
      }
      ludanto.rapidoY = 0;
      ludanto.estasSurTERENO = false;
      if ( !movo.estisNaĝanta && tsekeLaqazbolesai() ) sfx.splash();
    } else if ( enAkvo && !ludanto.estasSurTERENO && ludanto.raqa.y < teraY ) {
      ludanto.raqa.y += ( teraY - ludanto.raqa.y ) * 0o1/0o4;
      if ( ludanto.raqa.y >= teraY - 0o1/0o100 ) { ludanto.raqa.y = teraY; ludanto.estasSurTERENO = true; ludanto.rapidoY = 0; }
    } else if ( ludanto.estasSurTERENO ) {
      if ( ludanto.raqa.y > teraY + 0o23/0o100 ) {
        ludanto.estasSurTERENO = false;
      } else {
        ludanto.raqa.y = teraY;
      }
      ludanto.rapidoY = 0;
    } else {
      ludanto.rapidoY -= 0o22 * deltaTempo;
      ludanto.raqa.y += ludanto.rapidoY * deltaTempo;
      if ( ludanto.raqa.y <= teraY ) {
        const falaForto = Math.min(1, -ludanto.rapidoY / 0o24);
        const falis = ludanto.rapidoY < -0o4/0o10 && tsekeLaqazbolesai();
        ludanto.raqa.y = teraY;
        ludanto.rapidoY = 0;
        ludanto.estasSurTERENO = true;
        if ( falis ) {
          sfx.land(falaForto);
          if ( falaForto > 0o6/0o10 ) sfx.crunch();
        }
      }
    }
    movo.estisNaĝanta = naĝas;

    movo.oscilo += moving * rapido * deltaTempo * 0o14/0o10;
    const bobAmplo = naĝas ? 0o1/0o100 : 0o3/0o100;
    agordiPromenanFotilon(piedoj, ludanto, ludanto.raqa.y + 0o65/0o40, Math.sin(movo.oscilo * 2) * bobAmplo * moving);

    if ( !naĝas ) {
      pauxzaPaŝo += moving * deltaTempo;
      if ( pauxzaPaŝo > 0o15/0o40 && tsekeLaqazbolesai() ) {
        sfx.step();
        pauxzaPaŝo = 0;
      }
    }

    // ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃᴜꞇ , j͑ʃɔ ֭ſɭɔ ʌ ꞙɭɔ 📃 ⟫
    promptaJoqa++;
    let proksimaPordo = ludanto.plejProksimaPordo;
    let proksimaKanuo = ludanto.plejProksimaKanuo;
    let proksimaBero = ludanto.plejProksimaBero;
    if ( promptaJoqa % 0o10 === 0 ) {
      proksimaPordo = null;
      let proksimaPordoDist = 3;
      for ( const s of vepaqPudalj ) {
        if ( s.x === 0 && s.z === 0 ) {
          for ( let k = 0; k < 4; k++ ) {
            const a = k * Math.PI / 2;
            const pordoX = s.x + Math.sin(a) * ( s.d / 2 + 0o14/0o10 );
            const pordoZ = s.z + Math.cos(a) * ( s.d / 2 + 0o14/0o10 );
            const d = Math.hypot(ludanto.raqa.x - pordoX, ludanto.raqa.z - pordoZ);
            if ( d < proksimaPordoDist ) { proksimaPordoDist = d; proksimaPordo = s; ludanto.aktivaPordaAngulo = a; }
          }
          continue;
        }
        const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
        const pordoX = s.x + difX * ( s.d / 2 + 0o14/0o10 ), pordoZ = s.z + difZ * ( s.d / 2 + 0o14/0o10 );
        const d = Math.hypot(ludanto.raqa.x - pordoX, ludanto.raqa.z - pordoZ);
        if ( d < proksimaPordoDist ) { proksimaPordoDist = d; proksimaPordo = s; ludanto.aktivaPordaAngulo = 0; }
      }
      ludanto.plejProksimaPordo = proksimaPordo;
      proksimaKanuo = null;
      let proksimaKanuoDist = 6;
      for ( const c of kanuoj ) {
        const d = Math.hypot(c.x - ludanto.raqa.x, c.z - ludanto.raqa.z);
        if ( d < proksimaKanuoDist ) { proksimaKanuoDist = d; proksimaKanuo = c; }
      }
      ludanto.plejProksimaKanuo = proksimaKanuo;
      proksimaBero = null;
      let proksimaBeroDist = 0o25/0o10;
      for ( const it of tlexlefp2saiBeroj ) {
        if ( it.dead ) continue;
        const d = Math.hypot(it.haxekuxa.x - ludanto.raqa.x, it.haxekuxa.z - ludanto.raqa.z);
        if ( d < proksimaBeroDist ) { proksimaBeroDist = d; proksimaBero = it; }
      }
      ludanto.plejProksimaBero = proksimaBero;
    }
    if ( ludanto.plejProksimaPordo ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniri") + ` ` + paqNomo(ludanto.plejProksimaPordo.name, ludanto.plejProksimaPordo.type));
      promptoElemento.classList.add("montri");
    } else if ( proksimaBero && !ludanto.surKanoto ) {
      const prefikso = traduki("agoGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki("manĝPuss0")}`);
      promptoElemento.classList.add("montri");
    } else if ( !ludanto.surKanoto ) {
      promptoElemento.classList.remove("montri");
    }
  }

  return { tona };
}
