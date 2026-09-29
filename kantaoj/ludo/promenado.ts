// ≺⧼ Promenado 🚶 ⧽≻
// La ekstera piedira bloko — la movado sur la tereno, la naĝado, la promenaj
// limoj, la paŝaj sonoj kaj la malakrigita skanado de la proksimaj
// interageblaĵoj ( la pordoj, la kanuoj, la beroj ). La buklo vokas gxin unu
// fojon ĉiukadre; gxi mem elektas ĉu ĝi agu ( nur dum promenado, ne sur kanuo ).
import { radiusaDistanco } from "../../eskekoj/komunajxoj/mapformo.js";
import type { MapFormo } from "../../eskekoj/komunajxoj/mapformo.js";
import { cxuAŭdio, sfx } from "../../eskekoj/sonoj/sonoro.js";
import { alteco, akvo, akvaNivelo } from "../mondo/tereno.js";
import type { UrbaSistemo } from "../mondo/urbo.js";
import { konstruaĵaNomo, traduki } from "../lingvo/tradukoj.js";
import { agordiPromenanFotilon, movoEniro } from "./piedirado.js";
import type { PiedaMondo, PiedaStato } from "./piedirado.js";
import type { Ludanto } from "./ludanto.js";

// PromenajOpcioj — la stato, la enigo, la mondo ( la pordoj, la kanuoj, la
// beroj ), la kolizia krado kaj la promptilo de la fasado.
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

  // La paŝa sona paŭzo kaj la prompto-skanada kadro. La detekto de la pordoj,
  // kanuoj kaj beroj kuras malakrigite ( ĉiun 0o10-an kadron ).
  let pauxzaPaŝo = 0;
  let promptaKadro = 0;

  function paŝi( deltaTempo: number, t: number ): void {
    if ( ludanto.rezimo !== "walk" || ludanto.surKanoto ) return;

    const { movX, movZ, longo, fortoX, fortoZ, radX, radZ } = movoEniro(klavoj, ludanto.direkto);
    const sprinto = klavoj.ShiftLeft || klavoj.ShiftRight || cxuSprintas();
    const rapido = sprinto ? 0o124/0o10 : 0o255/0o40;
    let novaX = ludanto.pozicio.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let novaZ = ludanto.pozicio.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;
    // ⟪ La promenaj limoj 📃 ⟫ — la mondo havas la FORMON de la mapo ( la
    // cirklo, la rondigita kvadrato aŭ la rondigita triangulo ), ne kvadraton.
    // La limo sekvas la formon per la sama radiusa funkcio kiel la tereno
    // ( mapformo.ts ), tri unuojn antaŭ la rando — trans la rando la tereno
    // premiĝas sur la randon kaj falus en la malplenon.
    const permesita = radiusaDistanco(mapoFormo, mapoGrandeco, Math.atan2(novaZ, novaX)) - 0o3;
    const disto = Math.hypot(novaX, novaZ);
    if ( disto > permesita ) {
      const faktoro = permesita / disto;
      novaX *= faktoro;
      novaZ *= faktoro;
    }

    const { solviKolizion, solviDokanKolizion, dokaSuproY, vojaSuproY } = piedoj.kolizioj;
    const r = solviKolizion(novaX, novaZ);
    // Dokoj. Bloku eniron SUB la platformon ( sur-gxin piedirado restas libera )
    const rd = solviDokanKolizion(r.x, r.z, ludanto.pozicio.y);
    ludanto.pozicio.x = rd.x; ludanto.pozicio.z = rd.z;
    const moving = Math.min(1, longo);
    ludanto.movoValoro = moving;

    const teraY = Math.max(alteco(ludanto.pozicio.x, ludanto.pozicio.z), dokaSuproY(ludanto.pozicio.x, ludanto.pozicio.z), vojaSuproY(ludanto.pozicio.x, ludanto.pozicio.z));
    // La akvo estas la skulptita masko — la ludanto naĝas kie la skulptilo
    // pentris la akvon.
    const enAkvo = akvo(ludanto.pozicio.x, ludanto.pozicio.z);
    const akvoY = enAkvo ? akvaNivelo(ludanto.pozicio.x, ludanto.pozicio.z) : -999;
    // Naĝado estas la AŬTOMATA movo sub la akvosurfaco. Tuj kiam la tereno
    // subeniras sub la akvonivelo, la ludanto mergiĝas kaj naĝas — neniu
    // interago ( E ) aŭ transiro necesas. La sekaj bordo-strioj ene de la
    // (pli larĝa) akvo-zono restas piedireblaj anstataŭ naĝeblaj.
    const akvaProfundo = akvoY - teraY;   // > 0 = tereno sub la surfaco
    // ( la lasta kondiĉo tenas saltantajn enirantojn. Ili naĝu nur kiam ili jam
    //   alproksimiĝis al la surfaco, ne dum la falo de alta bordo )
    const naĝas = enAkvo && akvaProfundo > 0 && ludanto.pozicio.y < akvoY + 0o6/0o10;

    if ( naĝas ) {
      // Profunda akvo — subakva naĝado. La korpo mergiĝas ĝis la okuloj ĉe la
      // ondsurfaco ( la ondeto donas la naĝan balancadon ). En malprofunda akvo
      // la celo restas ĉe la fundo, do la ludanto vadadas kun kapo super la akvo.
      // NAĜA_MERGO. La maksimuma mergo ( 0o2 ≈ 2 unuoj ) tenas la fotilon iomete
      // sub la surfaco — ĉi tiu valoro agordas la forton de la "subakva" efekto.
      // La saltbutono ( Spaco aŭ la poŝtelefona butono ) donas suprenan impulson.
      // tenante ĝin la naĝanto supreniras al la surfaco, la okulojn ĝuste ĉe la
      // akvonivelo; la impulso forfadas kaj la korpo remergiĝas al la kutima mergo.
      const NAĜA_MERGO = 0o2;
      const mergo = Math.min(akvaProfundo, NAĜA_MERGO);
      // Tenante la saltbutonon ( Spaco aŭ la poŝtelefona butono ) la naĝanto
      // supreniras al la surfaco TIOM LONGE kiom ĝi estas premita; depremite
      // la korpo remergiĝas al la kutima mergo.
      const suprenas = klavoj.Space || cxuSaltas();
      if ( suprenas ) {
        ludanto.pozicio.y += 0o6 * deltaTempo;
        // Ne supren trans la surfacon — la okuloj haltas ĝuste ĉe la akvonivelo.
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
      // Malprofunda bordo — glate surgrimpu el la naĝado anstataŭ fali sub la fundon.
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
        // La surteriĝo — la mola planda bato kaj la frotŝovo. La forto venas
        // de la fala rapido, do malsupreniro de malalta ŝtupo apenaŭ aŭdiĝas
        // dum de alta bordo la bato estas peza; frapiĝo sur la teron
        // ( rapidoY < -0o4/0o10 ) aldonas la akran kraĉeton de la falo.
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
    // Dum naĝado la paŝa balancado estas mallaŭtigita — la ondeto jam movas la vidon.
    const bobAmplo = naĝas ? 0o1/0o100 : 0o3/0o100;
    agordiPromenanFotilon(piedoj, ludanto, ludanto.pozicio.y + 0o65/0o40, Math.sin(movo.oscilo * 2) * bobAmplo * moving);

    // Paŝaj sonoj ( ĉiun ~0o7/0o10 He dum movado ) — dum naĝado la silento regas.
    if ( !naĝas ) {
      pauxzaPaŝo += moving * deltaTempo;
      if ( pauxzaPaŝo > 0o15/0o40 && cxuAŭdio() ) {
        sfx.step();
        pauxzaPaŝo = 0;
      }
    }

    // Detekti pordojn kaj kanuojn. La centra sanktejo havas pordojn sur CXiUJ
    // kvar flankoj — la plej proksima pordo decidas tra kiu eniri.
    // ⟪ Detekto de la proksimaj interageblaĵoj — MALAKRIGITA 📃 ⟫
    // La plena skanado ( la pordoj × 4, la kanuoj, la beroj ) kuras ĉiun
    // 0o10-an kadron ( ≈ 0o3 fojojn en He ) anstataŭ ĉiukadre — la prompto restas
    // respondema ( la ŝarĝ-rilataj animacioj bezonas ĝin ) kaj la ŝarĝo
    // malkreskas per ~0o10-oble pli malmultaj skanadoj.
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
      // Pussxlefo-beroj — la kolekteblaj manĝeblaj beroj en la arbaro.
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
