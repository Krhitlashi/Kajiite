// ≺⧼ ſɭw ſ̀ȷᴜ }ʃꞇ 🏠 ⧽≻
import { heliksaAltecxo, type InternaSistemo } from "../../eskekoj/hapaq/internoj/hahunaq.js";
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj/hahunaq.js";
import { manĝaKlavo } from "../fasado/paneeloj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { agordiPromenanFotilon, movoEniro } from "./piedirado.js";
import type { PiedaMondo, PiedaStato } from "./piedirado.js";
import type { LitoInfo, Ludanto } from "./ludanto.js";

export interface InternajHasukf2qani {
  ludanto: Ludanto;
  movo: PiedaStato;
  interno: InternaSistemo;
  piedoj: PiedaMondo;
  ca3aq: Record<string, boolean>;
  promptoElemento: HTMLElement;
  agordiPrompton: ( htmlo: string ) => void;
}

export interface Internanto {
  tona( deltaTempo: number, t: number ): void;
}

export function kf2Internanton( hasukf2qani: InternajHasukf2qani ): Internanto {
  const { ludanto, movo, interno: internaSistemo, piedoj, ca3aq, promptoElemento, agordiPrompton } = hasukf2qani;

  let antauxaHeliksaFrac = 0;

  function tona( deltaTempo: number, _t: number ): void {
    if ( ludanto.rezimo !== "interno" ) return;

    // ⟪ ការដេក 📃 ⟫
    if ( ludanto.fsata ) {
      ludanto.celDistanco = 0;
      ludanto.kameraDistanco = 0;
      piedoj.fotilo.position.set(ludanto.raqa.x, ludanto.raqa.y + 0o1/0o10, ludanto.raqa.z);
      piedoj.fotilo.rotation.set(ludanto.klinigxo, ludanto.c2w2q, 0);
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("agoLevi"));
      promptoElemento.classList.add("montri");
      return;
    }

    // ⟪ ការដើរខាងក្នុង 📃 ⟫
    const spec = ludanto.elektitaSpec;
    if ( !spec ) return;
    const { movX, movZ, sahakani, fortoX, fortoZ, radX, radZ } = movoEniro(ca3aq, ludanto.c2w2q);
    const rapido = 0o215/0o40;
    let sef4X = ludanto.raqa.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let sef4Z = ludanto.raqa.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;

    const specX = spec.x, specZ = spec.z, specH0 = spec.flugoY ?? ( spec.h0 || 0 );
    const rot = spec.rot || 0;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    const plankoj = internaSistemo.plankoj;
    const helikso = internaSistemo.helikso;
    const ludY = ludanto.raqa.y - specH0;
    let aktivaPlanko = plankoj[0];
    let etapy = specH0;
    for ( const p of plankoj ) {
      if ( ludY >= p.y - 0o4/0o10 && ludY < p.y + p.l6da ) { aktivaPlanko = p; break; }
    }
    const margxeno = 0o3/0o10;
    let lokalX = ( sef4X - specX ) * cosR + ( sef4Z - specZ ) * sinR;
    let lokalZ = -( sef4X - specX ) * sinR + ( sef4Z - specZ ) * cosR;

    let surHelikso = false;
    if ( helikso && ludY >= heliksaAltecxo(helikso, -helikso.turnojSube) - 0o1/0o10 && ludY <= heliksaAltecxo(helikso, helikso.turnoj) + 0o1/0o10 ) {
      let subaPlankoY = -Infinity;
      for ( const p of plankoj ) if ( p.y <= ludY ) subaPlankoY = Math.max(subaPlankoY, p.y);
      const jeEtago = ludY - subaPlankoY <= 0o4/0o10;
      let dist = Math.hypot(lokalX, lokalZ);
      if ( dist < helikso.rKol + 0o1/0o20 ) {
        const nR = helikso.rKol + 0o1/0o20;
        if ( dist > 0o1/0o20000 ) {
          lokalX = ( lokalX / dist ) * nR;
          lokalZ = ( lokalZ / dist ) * nR;
        } else {
          lokalX = nR;
          lokalZ = 0;
        }
        dist = nR;
      }
      if ( dist > helikso.rEkster && !jeEtago ) {
        const nR = helikso.rEkster - 0o1/0o40;
        lokalX = ( lokalX / dist ) * nR;
        lokalZ = ( lokalZ / dist ) * nR;
        dist = nR;
      }
      if ( dist >= helikso.rKol - 0o1/0o10 && dist <= helikso.rEkster ) {
        surHelikso = true;
        const ang = Math.atan2(lokalX, lokalZ);
        const frac = ( ( ang % ( Math.PI * 2 ) ) + Math.PI * 2 ) % ( Math.PI * 2 ) / ( Math.PI * 2 );
        if ( ludanto.sxtupaTurno === null ) {
          const turno0 = ludY >= 0 ? ludY / helikso.turnoAlto : ludY / helikso.turnoAltoSub;
          const malsupraLim = -helikso.turnojSube;
          ludanto.sxtupaTurno = Math.max(malsupraLim, Math.min(helikso.turnoj, Math.round(turno0 - frac) + frac));
          antauxaHeliksaFrac = frac;
        } else {
          let delta = frac - antauxaHeliksaFrac;
          if ( delta > 0o4/0o10 ) delta -= 1;
          else if ( delta < -0o4/0o10 ) delta += 1;
          antauxaHeliksaFrac = frac;
          ludanto.sxtupaTurno = Math.max(-helikso.turnojSube, Math.min(helikso.turnoj, ludanto.sxtupaTurno + delta));
        }
        etapy = specH0 + heliksaAltecxo(helikso, ludanto.sxtupaTurno);
        sef4X = specX + cosR * lokalX - sinR * lokalZ;
        sef4Z = specZ + sinR * lokalX + cosR * lokalZ;
      }
    }
    if ( !surHelikso ) {
      ludanto.sxtupaTurno = null;
      if ( aktivaPlanko ) {
        lokalX = Math.max(-aktivaPlanko.hw + margxeno, Math.min(aktivaPlanko.hw - margxeno, lokalX));
        lokalZ = Math.max(-aktivaPlanko.hd + margxeno, Math.min(aktivaPlanko.hd - margxeno, lokalZ));
        sef4X = specX + cosR * lokalX - sinR * lokalZ;
        sef4Z = specZ + sinR * lokalX + cosR * lokalZ;
        etapy = specH0 + aktivaPlanko.y;
      } else {
        etapy = specH0;
      }
    }

    ludanto.raqa.x = sef4X;
    ludanto.raqa.z = sef4Z;
    const moving = Math.min(1, sahakani);
    ludanto.movoValoro = moving;

    if ( ludanto.estasSurTERENO ) {
      ludanto.raqa.y += ( etapy - ludanto.raqa.y ) * 0o3/0o20;
      ludanto.rapidoY = 0;
      if ( Math.abs(ludanto.raqa.y - etapy) < 0o1/0o200 ) ludanto.raqa.y = etapy;
    } else {
      ludanto.rapidoY -= 0o22 * deltaTempo;
      ludanto.raqa.y += ludanto.rapidoY * deltaTempo;
      if ( ludanto.raqa.y <= etapy ) {
        ludanto.raqa.y = etapy;
        ludanto.rapidoY = 0;
        ludanto.estasSurTERENO = true;
      }
    }

    movo.oscilo += moving * rapido * deltaTempo * 0o14/0o10;
    agordiPromenanFotilon(piedoj, ludanto, ludanto.raqa.y + 0o65/0o40, Math.sin(movo.oscilo * 2) * 0o3/0o100 * moving, false, etapy + 0o4/0o10);

    let proksimaLito: LitoInfo | null = null;
    let proksimaLitoDist = 0o16/0o10;
    for ( const b of internaSistemo.litkoj ) {
      const bx = specX + cosR * b.x - sinR * b.z;
      const bz = specZ + sinR * b.x + cosR * b.z;
      const d = Math.hypot(ludanto.raqa.x - bx, ludanto.raqa.z - bz);
      if ( d < proksimaLitoDist && Math.abs(ludY - b.y) < 0o12/0o10 ) {
        proksimaLitoDist = d;
        proksimaLito = { specX, specZ, cosR, sinR, lokaX: b.x, lokaZ: b.z, y: b.y, sefini: b.sefini };
      }
    }
    ludanto.plejProksimaLito = proksimaLito;
    let proksimaManĝaĵo: MangxajxItemo | null = null;
    let proksimaManĝaĵoDist = 2;
    for ( const it of internaSistemo.m7x ) {
      if ( it.dead ) continue;
      const mX = specX + cosR * it.haxekuxa.x - sinR * it.haxekuxa.z;
      const mZ = specZ + sinR * it.haxekuxa.x + cosR * it.haxekuxa.z;
      const d = Math.hypot(ludanto.raqa.x - mX, ludanto.raqa.z - mZ);
      if ( d < proksimaManĝaĵoDist ) { proksimaManĝaĵoDist = d; proksimaManĝaĵo = it; }
    }
    ludanto.plejProksimaManĝaĵo = proksimaManĝaĵo;
    if ( proksimaLito ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("agoKuxi"));
      promptoElemento.classList.add("montri");
    } else if ( proksimaManĝaĵo ) {
      const prefikso = traduki("agoGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki(manĝaKlavo(proksimaManĝaĵo.f.key))}`);
      promptoElemento.classList.add("montri");
    } else {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("kamaEliri"));
      promptoElemento.classList.add("montri");
    }
  }

  return { tona };
}
