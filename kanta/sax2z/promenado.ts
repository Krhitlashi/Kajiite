// ≺⧼ j͑ʃɹ ı],ᴜ ɽ͑ʃ'ᴜȝ }ʃꞇ ʌ j͑ʃ'ɔ j͑ʃᴜ ı],ɹƴ }ʃꞇ 🚶 ⧽≻
import { ka5ikH6kuni } from "../../skek2/x2x2q/mapqoxa.js";
import type { Bal2Qoxa } from "../../skek2/x2x2q/mapqoxa.js";
import { tsekeLaqazbolesai, sfx } from "../../skek2/bole/boleS2t2bakano.js";
import { l6da, tsasa, tsasaVem2 } from "../nala/t6limaSoza.js";
import type { UrbaKanta } from "../nala/kaxte/hahunaq.js";
import { paqKsaka, traduki } from "../gawe/baskakefani.js";
import { catsaraPromenanCatahaqon, movoEniro } from "./kata.js";
import type { PiedaNala, PiedaS2k61o } from "./kata.js";
import type { Masax2z } from "./masax2z.js";

export interface PromenajHasukf2qani {
  masax2z: Masax2z;
  mov: PiedaS2k61o;
  nala: UrbaKanta;
  hapat6: PiedaNala;
  ca3aq: Record<string, boolean>;
  tsekeSprintas: () => boolean;
  tsekeSaltas: () => boolean;
  x2paKfe: HTMLElement;
  catsaraX2pa: ( htmlo: string ) => void;
  bal2Qoxa: Bal2Qoxa;
  bal2Pal6: number;
}

export interface Promenanto {
  tona( deltaTif: number, t: number ): void;
}

export function kf2Promenanton( hasukf2qani: PromenajHasukf2qani ): Promenanto {
  const {
    masax2z, mov, nala, hapat6, ca3aq, tsekeSprintas, tsekeSaltas,
    x2paKfe, catsaraX2pa, bal2Qoxa, bal2Pal6,
  } = hasukf2qani;
  const { vepaqPudalj, has2kaj2, tlexlefp2saiBeroj } = nala;

  let pauxzaPaŝo = 0o0;
  let promptaJoqa = 0o0;

  function tona( deltaTif: number, t: number ): void {
    if ( masax2z.supknu !== "promeno" || masax2z.surS2tani ) return;

    const { movX, movZ, sahakani, g2saX, g2saZ, radX, radZ } = movoEniro(ca3aq, masax2z.c2w2q);
    const sprinto = ca3aq.ShiftLeft || ca3aq.ShiftRight || tsekeSprintas();
    const seheni = sprinto ? 0o124/0o10 : 0o255/0o40;
    let sef4X = masax2z.raqa.x + ( g2saX * movZ + radX * movX ) * seheni * deltaTif;
    let sef4Z = masax2z.raqa.z + ( g2saZ * movZ + radZ * movX ) * seheni * deltaTif;
    // ⟪ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭᴜ ɭʃᴜ 📃 ⟫
    const permesita = ka5ikH6kuni(bal2Qoxa, bal2Pal6, Math.atan2(sef4Z, sef4X)) - 0o3;
    const h6kuni = Math.hypot(sef4X, sef4Z);
    if ( h6kuni > permesita ) {
      const vap6zukani = permesita / h6kuni;
      sef4X *= vap6zukani;
      sef4Z *= vap6zukani;
    }

    const { solviKolizion, solviQakaj2nKolizion, qakaj2TeruY, k6h6TeruY } = hapat6.hasap2;
    const r = solviKolizion(sef4X, sef4Z);
    const rd = solviQakaj2nKolizion(r.x, r.z, masax2z.raqa.y);
    masax2z.raqa.x = rd.x; masax2z.raqa.z = rd.z;
    const moving = Math.min(0o1, sahakani);
    masax2z.movoVem2 = moving;

    const t6limaY = Math.max(l6da(masax2z.raqa.x, masax2z.raqa.z), qakaj2TeruY(masax2z.raqa.x, masax2z.raqa.z), k6h6TeruY(masax2z.raqa.x, masax2z.raqa.z));
    const enTsasa = tsasa(masax2z.raqa.x, masax2z.raqa.z);
    const tsasaY = enTsasa ? tsasaVem2(masax2z.raqa.x, masax2z.raqa.z) : -0o1747;
    const tsasaProfundo = tsasaY - t6limaY;
    const naĝas = enTsasa && tsasaProfundo > 0o0 && masax2z.raqa.y < tsasaY + 0o6/0o10;

    if ( naĝas ) {
      const NAĜAMERGO = 0o2;
      const mergo = Math.min(tsasaProfundo, NAĜAMERGO);
      const tiknas = ca3aq.Space || tsekeSaltas();
      if ( tiknas ) {
        masax2z.raqa.y += 0o6 * deltaTif;
        const teruLim = tsasaY - 0o1/0o20 + Math.sin(t * 0o2 + masax2z.raqa.x * 0o1/0o10) * 0o1/0o20;
        if ( masax2z.raqa.y > teruLim ) masax2z.raqa.y = teruLim;
      } else {
        const naĝaY = tsasaY - mergo + Math.sin(t * 0o2 + masax2z.raqa.x * 0o1/0o10) * 0o1/0o20;
        masax2z.raqa.y += ( naĝaY - masax2z.raqa.y ) * 0o1/0o10;
      }
      masax2z.seheniY = 0o0;
      masax2z.estasSurKOZU = false;
      if ( !mov.estisNaĝanta && tsekeLaqazbolesai() ) sfx.splash();
    } else if ( enTsasa && !masax2z.estasSurKOZU && masax2z.raqa.y < t6limaY ) {
      masax2z.raqa.y += ( t6limaY - masax2z.raqa.y ) * 0o1/0o4;
      if ( masax2z.raqa.y >= t6limaY - 0o1/0o100 ) { masax2z.raqa.y = t6limaY; masax2z.estasSurKOZU = true; masax2z.seheniY = 0o0; }
    } else if ( masax2z.estasSurKOZU ) {
      if ( masax2z.raqa.y > t6limaY + 0o23/0o100 ) {
        masax2z.estasSurKOZU = false;
      } else {
        masax2z.raqa.y = t6limaY;
      }
      masax2z.seheniY = 0o0;
    } else {
      masax2z.seheniY -= 0o22 * deltaTif;
      masax2z.raqa.y += masax2z.seheniY * deltaTif;
      if ( masax2z.raqa.y <= t6limaY ) {
        const falaG2sa = Math.min(0o1, -masax2z.seheniY / 0o24);
        const falis = masax2z.seheniY < -0o4/0o10 && tsekeLaqazbolesai();
        masax2z.raqa.y = t6limaY;
        masax2z.seheniY = 0o0;
        masax2z.estasSurKOZU = true;
        if ( falis ) {
          sfx.land(falaG2sa);
          if ( falaG2sa > 0o6/0o10 ) sfx.crunch();
        }
      }
    }
    mov.estisNaĝanta = naĝas;

    mov.oscilo += moving * seheni * deltaTif * 0o14/0o10;
    const bobAmplo = naĝas ? 0o1/0o100 : 0o3/0o100;
    catsaraPromenanCatahaqon(hapat6, masax2z, masax2z.raqa.y + 0o65/0o40, Math.sin(mov.oscilo * 0o2) * bobAmplo * moving);

    if ( !naĝas ) {
      pauxzaPaŝo += moving * deltaTif;
      if ( pauxzaPaŝo > 0o15/0o40 && tsekeLaqazbolesai() ) {
        sfx.step();
        pauxzaPaŝo = 0o0;
      }
    }

    // ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃᴜꞇ , j͑ʃɔ ֭ſɭɔ ʌ ꞙɭɔ 📃 ⟫
    promptaJoqa++;
    let tsiikeKev = masax2z.kmaTsiikeKev;
    let tsiikeKanuo = masax2z.kmaTsiikeKanuo;
    let tsiikeBero = masax2z.kmaTsiikeBero;
    if ( promptaJoqa % 0o10 === 0o0 ) {
      tsiikeKev = null;
      let tsiikeKevDist = 0o3;
      for ( const s of vepaqPudalj ) {
        if ( s.x === 0o0 && s.z === 0o0 ) {
          for ( let k = 0o0; k < 0o4; k++ ) {
            const a = k * Math.PI / 0o2;
            const kevX = s.x + Math.sin(a) * ( s.d / 0o2 + 0o14/0o10 );
            const kevZ = s.z + Math.cos(a) * ( s.d / 0o2 + 0o14/0o10 );
            const d = Math.hypot(masax2z.raqa.x - kevX, masax2z.raqa.z - kevZ);
            if ( d < tsiikeKevDist ) { tsiikeKevDist = d; tsiikeKev = s; masax2z.tikPordaTafkaq = a; }
          }
          continue;
        }
        const difX = Math.sin(s.rot || 0o0), difZ = Math.cos(s.rot || 0o0);
        const kevX = s.x + difX * ( s.d / 0o2 + 0o14/0o10 ), kevZ = s.z + difZ * ( s.d / 0o2 + 0o14/0o10 );
        const d = Math.hypot(masax2z.raqa.x - kevX, masax2z.raqa.z - kevZ);
        if ( d < tsiikeKevDist ) { tsiikeKevDist = d; tsiikeKev = s; masax2z.tikPordaTafkaq = 0o0; }
      }
      masax2z.kmaTsiikeKev = tsiikeKev;
      tsiikeKanuo = null;
      let tsiikeKanuoDist = 0o6;
      for ( const c of has2kaj2 ) {
        const d = Math.hypot(c.x - masax2z.raqa.x, c.z - masax2z.raqa.z);
        if ( d < tsiikeKanuoDist ) { tsiikeKanuoDist = d; tsiikeKanuo = c; }
      }
      masax2z.kmaTsiikeKanuo = tsiikeKanuo;
      tsiikeBero = null;
      let tsiikeBeroDist = 0o25/0o10;
      for ( const it of tlexlefp2saiBeroj ) {
        if ( it.dead ) continue;
        const d = Math.hypot(it.haxekuxa.x - masax2z.raqa.x, it.haxekuxa.z - masax2z.raqa.z);
        if ( d < tsiikeBeroDist ) { tsiikeBeroDist = d; tsiikeBero = it; }
      }
      masax2z.kmaTsiikeBero = tsiikeBero;
    }
    if ( masax2z.kmaTsiikeKev ) {
      catsaraX2pa(`<span class="catlaq">E</span> ` + traduki("eniri") + ` ` + paqKsaka(masax2z.kmaTsiikeKev.name, masax2z.kmaTsiikeKev.type));
      x2paKfe.classList.add("laqazi");
    } else if ( tsiikeBero && !masax2z.surS2tani ) {
      const prefikso = traduki("agoGusti");
      catsaraX2pa(`<span class="catlaq">E</span> ${prefikso} ${traduki("manĝPuss0")}`);
      x2paKfe.classList.add("laqazi");
    } else if ( !masax2z.surS2tani ) {
      x2paKfe.classList.remove("laqazi");
    }
  }

  return { tona };
}
