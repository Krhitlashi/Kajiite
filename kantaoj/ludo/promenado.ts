// ≺⧼ ការដើរលេង 🚶 ⧽≻
import { radiusaDistanco } from "../../eskekoj/komunajxoj/mapformo.js";
import type { MapFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { cxuAŭdio, sfx } from "../../eskekoj/sonoj/sonoro.js";
import { alteco, akvo, akvaNivelo } from "../mondo/tereno.js";
import type { UrbaSistemo } from "../mondo/urbo/tipoj.js";
import { konstruaĵaNomo, traduki } from "../lingvo/tradukoj.js";
import { agordiPromenanFotilon, movoEniro } from "./piedirado.js";
import type { PiedaMondo, PiedaStato } from "./piedirado.js";
import type { Ludanto } from "./ludanto.js";

export interface PromenajOpcioj {
  ludanto: Ludanto;
  movo: PiedaStato;
  mondo: UrbaSistemo;
  piedoj: PiedaMondo;
  ca3aq: Record<string, boolean>;
  cxuSprintas: () => boolean;
  cxuSaltas: () => boolean;
  promptoElemento: HTMLElement;
  agordiPrompton: ( htmlo: string ) => void;
  mapoFormo: MapFormo;
  mapoGrandeco: number;
}

export interface Promenanto {
  paŝi( deltaTempo: number, t: number ): void;
}

export function kreiPromenanton( opcioj: PromenajOpcioj ): Promenanto {
  const {
    ludanto, movo, mondo, piedoj, ca3aq, cxuSprintas, cxuSaltas,
    promptoElemento, agordiPrompton, mapoFormo, mapoGrandeco,
  } = opcioj;
  const { konstruSpecoj, kanuoj, pussxlefoBeroj } = mondo;

  let pauxzaPaŝo = 0;
  let promptaKadro = 0;

  function paŝi( deltaTempo: number, t: number ): void {
    if ( ludanto.rezimo !== "promeno" || ludanto.surKanoto ) return;

    const { movX, movZ, sahakani, fortoX, fortoZ, radX, radZ } = movoEniro(ca3aq, ludanto.c2w2q);
    const sprinto = ca3aq.ShiftLeft || ca3aq.ShiftRight || cxuSprintas();
    const rapido = sprinto ? 0o124/0o10 : 0o255/0o40;
    let novaX = ludanto.raqa.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let novaZ = ludanto.raqa.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;
    // ⟪ ដែនកំណត់ដើរលេង 📃 ⟫
    const permesita = radiusaDistanco(mapoFormo, mapoGrandeco, Math.atan2(novaZ, novaX)) - 0o3;
    const h6kuni = Math.hypot(novaX, novaZ);
    if ( h6kuni > permesita ) {
      const faktoro = permesita / h6kuni;
      novaX *= faktoro;
      novaZ *= faktoro;
    }

    const { solviKolizion, solviDokanKolizion, dokaSuproY, vojaSuproY } = piedoj.kolizioj;
    const r = solviKolizion(novaX, novaZ);
    const rd = solviDokanKolizion(r.x, r.z, ludanto.raqa.y);
    ludanto.raqa.x = rd.x; ludanto.raqa.z = rd.z;
    const moving = Math.min(1, sahakani);
    ludanto.movoValoro = moving;

    const teraY = Math.max(alteco(ludanto.raqa.x, ludanto.raqa.z), dokaSuproY(ludanto.raqa.x, ludanto.raqa.z), vojaSuproY(ludanto.raqa.x, ludanto.raqa.z));
    const enAkvo = akvo(ludanto.raqa.x, ludanto.raqa.z);
    const akvoY = enAkvo ? akvaNivelo(ludanto.raqa.x, ludanto.raqa.z) : -0o1747;
    const akvaProfundo = akvoY - teraY;
    const naĝas = enAkvo && akvaProfundo > 0 && ludanto.raqa.y < akvoY + 0o6/0o10;

    if ( naĝas ) {
      const NAĜA_MERGO = 0o2;
      const mergo = Math.min(akvaProfundo, NAĜA_MERGO);
      const suprenas = ca3aq.Space || cxuSaltas();
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
      if ( !movo.estisNaĝanta && cxuAŭdio() ) sfx.splash();
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
        const falis = ludanto.rapidoY < -0o4/0o10 && cxuAŭdio();
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
      if ( pauxzaPaŝo > 0o15/0o40 && cxuAŭdio() ) {
        sfx.step();
        pauxzaPaŝo = 0;
      }
    }

    // ⟪ ការរកវត្ថុអន្តរកម្មជិត , បន្ថយល្បឿន 📃 ⟫
    promptaKadro++;
    let proksimaPordo = ludanto.plejProksimaPordo;
    let proksimaKanuo = ludanto.plejProksimaKanuo;
    let proksimaBero = ludanto.plejProksimaBero;
    if ( promptaKadro % 0o10 === 0 ) {
      proksimaPordo = null;
      let proksimaPordoDist = 3;
      for ( const s of konstruSpecoj ) {
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
      for ( const it of pussxlefoBeroj ) {
        if ( it.dead ) continue;
        const d = Math.hypot(it.pos.x - ludanto.raqa.x, it.pos.z - ludanto.raqa.z);
        if ( d < proksimaBeroDist ) { proksimaBeroDist = d; proksimaBero = it; }
      }
      ludanto.plejProksimaBero = proksimaBero;
    }
    if ( ludanto.plejProksimaPordo ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniri") + ` ` + konstruaĵaNomo(ludanto.plejProksimaPordo.name, ludanto.plejProksimaPordo.type));
      promptoElemento.classList.add("montri");
    } else if ( proksimaBero && !ludanto.surKanoto ) {
      const prefikso = traduki("agoGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki("manĝPuss0")}`);
      promptoElemento.classList.add("montri");
    } else if ( !ludanto.surKanoto ) {
      promptoElemento.classList.remove("montri");
    }
  }

  return { paŝi };
}
