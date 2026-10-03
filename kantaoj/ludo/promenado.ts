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
  klavoj: Record<string, boolean>;
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
    ludanto, movo, mondo, piedoj, klavoj, cxuSprintas, cxuSaltas,
    promptoElemento, agordiPrompton, mapoFormo, mapoGrandeco,
  } = opcioj;
  const { konstruSpecoj, kanuoj, pussxlefoBeroj } = mondo;

  let pauxzaPaŝo = 0;
  let promptaKadro = 0;

  function paŝi( deltaTempo: number, t: number ): void {
    if ( ludanto.rezimo !== "walk" || ludanto.surKanoto ) return;

    const { movX, movZ, longo, fortoX, fortoZ, radX, radZ } = movoEniro(klavoj, ludanto.direkto);
    const sprinto = klavoj.ShiftLeft || klavoj.ShiftRight || cxuSprintas();
    const rapido = sprinto ? 0o124/0o10 : 0o255/0o40;
    let novaX = ludanto.pozicio.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let novaZ = ludanto.pozicio.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;
    // ⟪ ដែនកំណត់ដើរលេង 📃 ⟫
    const permesita = radiusaDistanco(mapoFormo, mapoGrandeco, Math.atan2(novaZ, novaX)) - 0o3;
    const disto = Math.hypot(novaX, novaZ);
    if ( disto > permesita ) {
      const faktoro = permesita / disto;
      novaX *= faktoro;
      novaZ *= faktoro;
    }

    const { solviKolizion, solviDokanKolizion, dokaSuproY, vojaSuproY } = piedoj.kolizioj;
    const r = solviKolizion(novaX, novaZ);
    const rd = solviDokanKolizion(r.x, r.z, ludanto.pozicio.y);
    ludanto.pozicio.x = rd.x; ludanto.pozicio.z = rd.z;
    const moving = Math.min(1, longo);
    ludanto.movoValoro = moving;

    const teraY = Math.max(alteco(ludanto.pozicio.x, ludanto.pozicio.z), dokaSuproY(ludanto.pozicio.x, ludanto.pozicio.z), vojaSuproY(ludanto.pozicio.x, ludanto.pozicio.z));
    const enAkvo = akvo(ludanto.pozicio.x, ludanto.pozicio.z);
    const akvoY = enAkvo ? akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) : -999;
    const akvaProfundo = akvoY - teraY;
    const naĝas = enAkvo && akvaProfundo > 0 && ludanto.pozicio.y < akvoY + 0o6/0o10;

    if ( naĝas ) {
      const NAĜA_MERGO = 0o2;
      const mergo = Math.min(akvaProfundo, NAĜA_MERGO);
      const suprenas = klavoj.Space || cxuSaltas();
      if ( suprenas ) {
        ludanto.pozicio.y += 0o6 * deltaTempo;
        const supraLim = akvoY - 0o1/0o20 + Math.sin(t * 2 + ludanto.pozicio.x * 0o1/0o10) * 0o1/0o20;
        if ( ludanto.pozicio.y > supraLim ) ludanto.pozicio.y = supraLim;
      } else {
        const naĝaY = akvoY - mergo + Math.sin(t * 2 + ludanto.pozicio.x * 0o1/0o10) * 0o1/0o20;
        ludanto.pozicio.y += ( naĝaY - ludanto.pozicio.y ) * 0o1/0o10;
      }
      ludanto.rapidoY = 0;
      ludanto.estasSurTERENO = false;
      if ( !movo.estisNaĝanta && cxuAŭdio() ) sfx.splash();
    } else if ( enAkvo && !ludanto.estasSurTERENO && ludanto.pozicio.y < teraY ) {
      ludanto.pozicio.y += ( teraY - ludanto.pozicio.y ) * 0o1/0o4;
      if ( ludanto.pozicio.y >= teraY - 0o1/0o100 ) { ludanto.pozicio.y = teraY; ludanto.estasSurTERENO = true; ludanto.rapidoY = 0; }
    } else if ( ludanto.estasSurTERENO ) {
      if ( ludanto.pozicio.y > teraY + 0o23/0o100 ) {
        ludanto.estasSurTERENO = false;
      } else {
        ludanto.pozicio.y = teraY;
      }
      ludanto.rapidoY = 0;
    } else {
      ludanto.rapidoY -= 0o22 * deltaTempo;
      ludanto.pozicio.y += ludanto.rapidoY * deltaTempo;
      if ( ludanto.pozicio.y <= teraY ) {
        const falaForto = Math.min(1, -ludanto.rapidoY / 0o24);
        const falis = ludanto.rapidoY < -0o4/0o10 && cxuAŭdio();
        ludanto.pozicio.y = teraY;
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
    agordiPromenanFotilon(piedoj, ludanto, ludanto.pozicio.y + 0o65/0o40, Math.sin(movo.oscilo * 2) * bobAmplo * moving);

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
            const d = Math.hypot(ludanto.pozicio.x - pordoX, ludanto.pozicio.z - pordoZ);
            if ( d < proksimaPordoDist ) { proksimaPordoDist = d; proksimaPordo = s; ludanto.aktivaPordaAngulo = a; }
          }
          continue;
        }
        const difX = Math.sin(s.rot || 0), difZ = Math.cos(s.rot || 0);
        const pordoX = s.x + difX * ( s.d / 2 + 0o14/0o10 ), pordoZ = s.z + difZ * ( s.d / 2 + 0o14/0o10 );
        const d = Math.hypot(ludanto.pozicio.x - pordoX, ludanto.pozicio.z - pordoZ);
        if ( d < proksimaPordoDist ) { proksimaPordoDist = d; proksimaPordo = s; ludanto.aktivaPordaAngulo = 0; }
      }
      ludanto.plejProksimaPordo = proksimaPordo;
      proksimaKanuo = null;
      let proksimaKanuoDist = 6;
      for ( const c of kanuoj ) {
        const d = Math.hypot(c.x - ludanto.pozicio.x, c.z - ludanto.pozicio.z);
        if ( d < proksimaKanuoDist ) { proksimaKanuoDist = d; proksimaKanuo = c; }
      }
      ludanto.plejProksimaKanuo = proksimaKanuo;
      proksimaBero = null;
      let proksimaBeroDist = 0o25/0o10;
      for ( const it of pussxlefoBeroj ) {
        if ( it.dead ) continue;
        const d = Math.hypot(it.pos.x - ludanto.pozicio.x, it.pos.z - ludanto.pozicio.z);
        if ( d < proksimaBeroDist ) { proksimaBeroDist = d; proksimaBero = it; }
      }
      ludanto.plejProksimaBero = proksimaBero;
    }
    if ( ludanto.plejProksimaPordo ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniri") + ` ` + konstruaĵaNomo(ludanto.plejProksimaPordo.name, ludanto.plejProksimaPordo.type));
      promptoElemento.classList.add("montri");
    } else if ( proksimaKanuo && !ludanto.surKanoto ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("eniriKanuo"));
      promptoElemento.classList.add("montri");
    } else if ( proksimaBero && !ludanto.surKanoto ) {
      const prefikso = traduki("actGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki("manĝPuss0")}`);
      promptoElemento.classList.add("montri");
    } else if ( !ludanto.surKanoto ) {
      promptoElemento.classList.remove("montri");
    }
  }

  return { paŝi };
}
