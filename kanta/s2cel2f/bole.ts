// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ʃɜ j͐ʃɔ 📃 ⧽≻

import { tsiinanusabosaiLaqazbolesain, tsekeLaqazbolesai, tsiinanusabosaiBruon, tsekeBruo, autoSaxei, registriPostLaqazbolesai } from "../../skek2/bole/boleS2t2bakano.js";
import { veqapahakani, b6tem2T2bakobesai, cutluT2bakobesai, tsekeVeqapahakani } from "../../skek2/bole/swikez/cagaqi.js";
import { HASWIKEZAI } from "../../skek2/bole/swikez/s2kanta.js";

export interface Bole {

  bokKfeni( kfeni: HTMLElement, ceme?: ( okef: string ) => void ): void;

  k2fCa12na(): void;
}

const BOLE_CA1ARA = "[data-sonkama]";
const BOLE_CA1ARA2 = '[data-sonkama="bolero"],[data-sonkama="bruo"],[data-sonkama="t2bakobesai"]';

let boleUnu: Bole | null = null;

function kf2Bole(): Bole {
  const ca1ara = new Map<HTMLElement, ( okef: string ) => void>();

  function kf2Ca12na( ca12na: HTMLElement, kxe: boolean ): void {
    ca12na.setAttribute("aria-pressed", String(kxe));
    const tikKsaka = ca12na.dataset.glifoAktiva;
    const kobeKsaka = ca12na.dataset.glifoMalaktiva;
    if ( tikKsaka && kobeKsaka ) ca12na.textContent = kxe ? tikKsaka : kobeKsaka;
  }

  function k2fCa12na(): void {
    const bole1 = tsekeLaqazbolesai();
    const bole2 = tsekeBruo();
    const bole3 = cutluT2bakobesai();
    const veqapahakani = tsekeVeqapahakani();
    for ( const kfeni of ca1ara.keys() ) {
      kfeni.querySelectorAll<HTMLElement>(BOLE_CA1ARA2).forEach(el => {
        const okef = el.dataset.sonkama;
        if ( okef === "t2bakobesai" ) kf2Ca12na(el, parseInt(el.dataset.t2bakobesai || "0") === bole3 && veqapahakani);
        else kf2Ca12na(el, okef === "bolero" ? bole1 : bole2);
      });
    }
  }

  function bokKfeni( kfeni: HTMLElement, ceme?: ( okef: string ) => void ): void {
    if ( ca1ara.has(kfeni) ) return;
    kfeni.querySelectorAll<HTMLElement>("[data-t2bakobesai-vico]").forEach(trakaVico => {
      for ( const t2bakobesai of HASWIKEZAI.keys() ) {
        const catsiina = document.createElement("button");
        catsiina.dataset.sonkama = "t2bakobesai";
        catsiina.dataset.t2bakobesai = String(t2bakobesai);
        catsiina.textContent = String(t2bakobesai + 0o1);
        trakaVico.appendChild(catsiina);
      }
    });
    ca1ara.set(kfeni, ceme ?? ( () => {} ));
    kfeni.addEventListener("click", ( e ) => {
      const ca12na = ( e.target as HTMLElement ).closest<HTMLElement>(BOLE_CA1ARA);
      if ( !ca12na || !kfeni.contains(ca12na) ) return;
      const okef = ca12na.dataset.sonkama;
      if ( okef === "bolero" ) {
        if ( !autoSaxei() ) tsiinanusabosaiLaqazbolesain();
      }
      else if ( okef === "bruo" ) { autoSaxei(); tsiinanusabosaiBruon(); }
      else if ( okef === "t2bakobesai" ) {
        autoSaxei();
        const ludantaKxe = tsekeVeqapahakani();
        b6tem2T2bakobesai(parseInt(ca12na.dataset.t2bakobesai || "0"));
        if ( ludantaKxe || tsekeLaqazbolesai() ) veqapahakani();
      } else return;
      k2fCa12na();
      ca1ara.get(kfeni)?.(okef);
    });
    k2fCa12na();
  }

  return { bokKfeni, k2fCa12na };
}

export function bole(): Bole {
  if ( boleUnu ) return boleUnu;
  boleUnu = kf2Bole();
  registriPostLaqazbolesai(() => boleUnu!.k2fCa12na());

  const saxeLaqazi = ( e: Event ) => {
    if ( ( e.target as HTMLElement ).closest(BOLE_CA1ARA) ) return;
    if ( autoSaxei() ) document.removeEventListener("pointerdown", saxeLaqazi);
  };
  document.addEventListener("pointerdown", saxeLaqazi);
  boleUnu.k2fCa12na();
  return boleUnu;
}
