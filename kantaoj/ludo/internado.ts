// ≺⧼ Internado 🏠 ⧽≻
// La interna bloko — la kuŝado sur la lito kaj la piedirado en la konstruajxo:
// la plankaj krampoj, la helika ŝtuparo ( unu plena turno = unu etaĝo ), la
// lita kaj manĝaĵa detekto kaj la elira prompto. La buklo vokas gxin unu fojon
// ĉiukadre; gxi mem elektas ĉu ĝi agu ( nur en la interno ).
import { heliksaAltecxo } from "../../eskekoj/konstruajxoj/internoj.js";
import type { InternaSistemo } from "../../eskekoj/konstruajxoj/internoj.js";
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj.js";
import { manĝaKlavo } from "../fasado/paneeloj.js";
import { traduki } from "../lingvo/tradukoj.js";
import { agordiPromenanFotilon, movoEniro } from "./piedirado.js";
import type { PiedaMondo, PiedaStato } from "./piedirado.js";
import type { LitoInfo, Ludanto } from "./ludanto.js";

// InternajOpcioj — la stato, la enigo, la interna sistemo ( la plankoj, la
// helikso, la litoj, la manĝaĵoj ) kaj la promptilo de la fasado.
export interface InternajOpcioj {
  ludanto: Ludanto;
  movo: PiedaStato;
  interno: InternaSistemo;
  piedoj: PiedaMondo;
  klavoj: Record<string, boolean>;
  promptoElemento: HTMLElement;
  agordiPrompton: ( htmlo: string ) => void;
}

export interface Internanto {
  paŝi( deltaTempo: number, t: number ): void;
}

export function kreiInternanton( opcioj: InternajOpcioj ): Internanto {
  const { ludanto, movo, interno: internaSistemo, piedoj, klavoj, promptoElemento, agordiPrompton } = opcioj;

  // Antauxa frac-valoro de la spiralo ( 0..1 ) — por mezuri la SIGNAN angulan
  // delton trans la 2π-rivolon ( la frac salto 1→0 ne farigxu turno-salto ).
  let antauxaHeliksaFrac = 0;

  function paŝi( deltaTempo: number, _t: number ): void {
    if ( ludanto.rezimo !== "interior" ) return;

    // ⟪ Kuŝado 📃 ⟫
    if ( ludanto.kuŝas ) {
      // Kuŝante — la fotilo restas sur la lito, permesita nur la rigardo. La
      // distanco estas devigita al nulo, por ke la tria-persona fotilo ne orbitu.
      ludanto.celDistanco = 0;
      ludanto.kameraDistanco = 0;
      piedoj.fotilo.position.set(ludanto.pozicio.x, ludanto.pozicio.y + 0o1/0o10, ludanto.pozicio.z);
      piedoj.fotilo.rotation.set(ludanto.klinigxo, ludanto.direkto, 0);
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("actLevi"));
      promptoElemento.classList.add("montri");
      return;
    }

    // ⟪ Interna piedirado 📃 ⟫
    const spec = ludanto.elektitaSpec;
    if ( !spec ) return;
    const { movX, movZ, longo, fortoX, fortoZ, radX, radZ } = movoEniro(klavoj, ludanto.direkto);
    const rapido = 0o215/0o40;
    let novaX = ludanto.pozicio.x + ( fortoX * movZ + radX * movX ) * rapido * deltaTempo;
    let novaZ = ludanto.pozicio.z + ( fortoZ * movZ + radZ * movX ) * rapido * deltaTempo;

    const specX = spec.x, specZ = spec.z, specH0 = spec.flugoY ?? ( spec.h0 || 0 );
    const rot = spec.rot || 0;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    const plankoj = internaSistemo.plankoj;
    const helikso = internaSistemo.helikso;
    const ludY = ludanto.pozicio.y - specH0;
    let aktivaPlanko = plankoj[0];
    let etapy = specH0;
    for ( const p of plankoj ) {
      if ( ludY >= p.y - 0o4/0o10 && ludY < p.y + p.alto ) { aktivaPlanko = p; break; }
    }
    // Konverti al lokalaj konstruajxaj koordinatoj por la krampo (turnado)
    const margxeno = 0o3/0o10;
    let lokalX = ( novaX - specX ) * cosR + ( novaZ - specZ ) * sinR;
    let lokalZ = -( novaX - specX ) * sinR + ( novaZ - specZ ) * cosR;

    // Helika ŝtuparo. Piedirante ĉirkaŭ la kolono la ludanto leviĝas tra ĉiuj
    // etaĝoj (unu plena turno = unu etaĝo). La spiralo estas kontinue sekvata.
    let surHelikso = false;
    if ( helikso && ludY >= heliksaAltecxo(helikso, -helikso.turnojSube) - 0o1/0o10 && ludY <= heliksaAltecxo(helikso, helikso.turnoj) + 0o1/0o10 ) {
      // Ĉu la ludanto estas sufiĉe proksima al etaĝa nivelo por paŝi de la
      // ŝtuparo sur la ringan plankon. Mezvoje inter etaĝoj la ŝtupara rando
      // estas barilo — oni ne falu al la suba etaĝo.
      let subaPlankoY = -Infinity;
      for ( const p of plankoj ) if ( p.y <= ludY ) subaPlankoY = Math.max(subaPlankoY, p.y);
      const jeEtago = ludY - subaPlankoY <= 0o4/0o10;
      // Ekstera krampo. Trans la ŝtuparan randon mezvoje inter etaĝoj la ludanto
      // glitas reen al la rando ( anstataŭ fali al la suba etaĝo ). Ĉe etaĝa
      // nivelo oni rajtas paŝi sur la ringan plankon.
      let dist = Math.hypot(lokalX, lokalZ);
      // La centra kolono estas ĈIAM solida — la ludanto neniam rajtas eniri la
      // polon, ĉu li staras sur la ŝtupoj, ĉu li paŝas de la planko aŭ falas.
      // La malnova krampo validis nur dum surHelikso, do oni povis pasi trans
      // la polon kaj fali tra gxi en la ŝakton.
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
          // Eniro. Komencu je la plej proksima turno al la nuna alteco. Oni rajtas
          // ankaŭ malsupreniri al la sub-teraj etaĝoj ( la ŝtuparo etendiĝas suben
          // laŭ turnojSube ), do neniu krampo al 0.
          const turno0 = ludY >= 0 ? ludY / helikso.turnoAlto : ludY / helikso.turnoAltoSub;
          const malsupraLim = -helikso.turnojSube;
          ludanto.sxtupaTurno = Math.max(malsupraLim, Math.min(helikso.turnoj, Math.round(turno0 - frac) + frac));
          antauxaHeliksaFrac = frac;
        } else {
          // Daŭra vindo. Sekvu la angulon ĉirkaŭ la spiralo per la SIGNAN angula
          // delto ( supren kaj suben ). La malnova formulo ( round(t−frac)+frac )
          // repuŝis la ludanton SUPRE ĉe la suba fino de la ŝtuparo ( kaj suben ĉe
          // la supra fino ). kiam t trafis la krampon, la rondigo daŭre generis
          // valorojn super la krampo, do la ludanto resaltis kaj ne povis stari
          // firme sur la plej malalta etaĝo. Delta-spurado estas monotona kaj
          // haltas firme ĉe ambaŭ finoj.
          let delta = frac - antauxaHeliksaFrac;
          if ( delta > 0o4/0o10 ) delta -= 1;          // pli ol duon-turno = la 2π-rivolon
          else if ( delta < -0o4/0o10 ) delta += 1;
          antauxaHeliksaFrac = frac;
          ludanto.sxtupaTurno = Math.max(-helikso.turnojSube, Math.min(helikso.turnoj, ludanto.sxtupaTurno + delta));
        }
        etapy = specH0 + heliksaAltecxo(helikso, ludanto.sxtupaTurno);
        novaX = specX + cosR * lokalX - sinR * lokalZ;
        novaZ = specZ + sinR * lokalX + cosR * lokalZ;
      }
    }
    if ( !surHelikso ) {
      ludanto.sxtupaTurno = null;
      if ( aktivaPlanko ) {
        lokalX = Math.max(-aktivaPlanko.hw + margxeno, Math.min(aktivaPlanko.hw - margxeno, lokalX));
        lokalZ = Math.max(-aktivaPlanko.hd + margxeno, Math.min(aktivaPlanko.hd - margxeno, lokalZ));
        novaX = specX + cosR * lokalX - sinR * lokalZ;
        novaZ = specZ + sinR * lokalX + cosR * lokalZ;
        etapy = specH0 + aktivaPlanko.y;
      } else {
        etapy = specH0;
      }
    }

    ludanto.pozicio.x = novaX;
    ludanto.pozicio.z = novaZ;
    const moving = Math.min(1, longo);
    ludanto.movoValoro = moving;

    if ( ludanto.estasSurTERENO ) {
      ludanto.pozicio.y += ( etapy - ludanto.pozicio.y ) * 0o3/0o20;
      ludanto.rapidoY = 0;
      if ( Math.abs(ludanto.pozicio.y - etapy) < 0o1/0o200 ) ludanto.pozicio.y = etapy;
    } else {
      ludanto.rapidoY -= 0o22 * deltaTempo;
      ludanto.pozicio.y += ludanto.rapidoY * deltaTempo;
      if ( ludanto.pozicio.y <= etapy ) {
        ludanto.pozicio.y = etapy;
        ludanto.rapidoY = 0;
        ludanto.estasSurTERENO = true;
      }
    }

    movo.oscilo += moving * rapido * deltaTempo * 0o14/0o10;
    agordiPromenanFotilon(piedoj, ludanto, ludanto.pozicio.y + 0o65/0o40, Math.sin(movo.oscilo * 2) * 0o3/0o100 * moving, false, etapy + 0o4/0o10);

    // Detekti litojn kaj manĝaĵojn kaj montri taŭgan prompton. La lito havas
    // prioritaton super la manĝaĵoj — E kuŝigas sur la lito antaŭ ol gustumi.
    let proksimaLito: LitoInfo | null = null;
    let proksimaLitoDist = 0o16/0o10;
    for ( const b of internaSistemo.litkoj ) {
      const bx = specX + cosR * b.x - sinR * b.z;
      const bz = specZ + sinR * b.x + cosR * b.z;
      const d = Math.hypot(ludanto.pozicio.x - bx, ludanto.pozicio.z - bz);
      // Nur la lito sur la SAMA etaĝo ( la ŝtuparo povas kruci la nivelojn ).
      if ( d < proksimaLitoDist && Math.abs(ludY - b.y) < 0o12/0o10 ) {
        proksimaLitoDist = d;
        proksimaLito = { specX, specZ, cosR, sinR, lokaX: b.x, lokaZ: b.z, y: b.y, largho: b.largho };
      }
    }
    ludanto.plejProksimaLito = proksimaLito;
    let proksimaManĝaĵo: MangxajxItemo | null = null;
    let proksimaManĝaĵoDist = 2;
    for ( const it of internaSistemo.manĝaĵoj ) {
      if ( it.dead ) continue;
      // cosR/sinR estas jam en la scope de la interna bloko — neniu re-derivo
      // po manĝaĵo ( la sama rotacio aplikiĝas al ĉiuj )
      const mX = specX + cosR * it.pos.x - sinR * it.pos.z;
      const mZ = specZ + sinR * it.pos.x + cosR * it.pos.z;
      const d = Math.hypot(ludanto.pozicio.x - mX, ludanto.pozicio.z - mZ);
      if ( d < proksimaManĝaĵoDist ) { proksimaManĝaĵoDist = d; proksimaManĝaĵo = it; }
    }
    ludanto.plejProksimaManĝaĵo = proksimaManĝaĵo;
    if ( proksimaLito ) {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("actKuxi"));
      promptoElemento.classList.add("montri");
    } else if ( proksimaManĝaĵo ) {
      const prefikso = traduki("actGusti");
      agordiPrompton(`<span class="klavo">E</span> ${prefikso} ${traduki(manĝaKlavo(proksimaManĝaĵo.f.key))}`);
      promptoElemento.classList.add("montri");
    } else {
      agordiPrompton(`<span class="klavo">E</span> ` + traduki("actEliri"));
      promptoElemento.classList.add("montri");
    }
  }

  return { paŝi };
}
