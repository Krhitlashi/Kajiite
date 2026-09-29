// ≺⧼ Piedirado 🚶 ⧽≻
// La komuna ilaro de la du piediraj blokoj ( la promenado ekstere kaj la
// piedirado en la interno ) — la eniga legilo, la piedira fotilo ( unua aŭ tria
// persono, kun la tera kaj konstruajxa krampo ) kaj la du akumuliloj, kiujn la
// blokoj kaj la vosta figuro-animacio kunhavas.
//
// La kolizia krado kaj la fotilo venas kune kiel `PiedaMondo` — la du blokoj
// neniam konstruas sian propran.
import * as THREE from "three";
import { kreiKolizianKradon } from "../mondo/kolizioj.js";
import { alteco } from "../mondo/tereno.js";
import type { Ludanto } from "./ludanto.js";

// La kolizia krado, kiun kreiKolizianKradon redonas ( la vojaj supraĵoj, la
// koliziiloj kaj la dokoj ). La tipo vivas ĉi tie, ĉar la piediraj blokoj, la
// kanuado kaj la animacia buklo ĉiuj bezonas gxin.
export type KoliziaKrado = ReturnType<typeof kreiKolizianKradon>;

export interface PiedaMondo {
  fotilo: THREE.PerspectiveCamera;
  kolizioj: KoliziaKrado;
}

// PiedaStato — la du akumuliloj de la piedirado. La paŝa oscilo movas la
// balancadon de la fotilo kaj de la figuro, do la du blokoj kaj la vosto devas
// vidi la SAMAN valoron; estisNaĝanta decidas ĉu la figuro mergiĝu kaj kiun
// staton la retilo sendu.
export interface PiedaStato {
  oscilo: number;
  estisNaĝanta: boolean;
}

export function kreiPiedanStaton(): PiedaStato {
  return { oscilo: 0, estisNaĝanta: false };
}

// movoEniro — La komuna enigo de la du piediraj blokoj ( ekstere kaj en la
// interno — la sama kapo antaŭe kopita duoble ). Legu la klavojn kaj la
// stirstangon ( la stirstango de la enigo skribas en klavoj.KeyW ktp ), normaligu
// la diagonalon kaj konvertu al la mondaj fortoj de la nuna direkto.
//     @param klavoj ( Record<string, boolean> , deviga ) - La klav-stato.
//     @param direkto ( number , deviga ) - La rigarda angulo de la ludanto.
//     @returns ( movX, movZ, longo, fortoX, fortoZ, radX, radZ ) - La normaligita
//        enigo kaj la antaŭa/posta aksoj de la fotila direkto.
export function movoEniro(klavoj: Record<string, boolean>, direkto: number): { movX: number; movZ: number; longo: number; fortoX: number; fortoZ: number; radX: number; radZ: number } {
  let movX = ( klavoj.KeyD || klavoj.ArrowRight ? 1 : 0 ) - ( klavoj.KeyA || klavoj.ArrowLeft ? 1 : 0 );
  let movZ = ( klavoj.KeyW || klavoj.ArrowUp ? 1 : 0 ) - ( klavoj.KeyS || klavoj.ArrowDown ? 1 : 0 );
  const longo = Math.hypot(movX, movZ);
  if ( longo > 1 ) { movX /= longo; movZ /= longo; }
  const fortoX = -Math.sin(direkto), fortoZ = -Math.cos(direkto);
  const radX = Math.cos(direkto), radZ = -Math.sin(direkto);
  return { movX, movZ, longo, fortoX, fortoZ, radX, radZ };
}

// agordiPromenanFotilon — Unua aŭ tria persono. En unua persono la fotilo sidas
// ĉe la okuloj de la ludanto. En tria persono gxi orbitas malantaux la figuro
// je kameraDistanco, klinigxante kun la rigardo ( klinigxo ) kaj rigardante la
// kapon. La tera krampo ( krampi ) tenas la fotilon super la tereno kaj ekster
// la konstruajxoj; subaLimo ( interno ) tenas gxin super la planko.
//     @param mondo ( PiedaMondo , deviga ) - La fotilo kaj la kolizia krado.
//     @param ludanto ( Ludanto , deviga ) - La stato de la ludanto.
//     @param okulY ( number , deviga ) - La okula alteco de la ludanto.
//     @param bob ( number , deviga ) - La paŝa balancado de la kadro.
//     @param krampi ( boolean , nedeviga ) - Ĉu teni la fotilon super la tereno
//        kaj ekster la konstruajxoj ( ekstere jes, en la interno ne ).
//     @param subaLimo ( number | null , nedeviga ) - La plej malalta permesita
//        fotila alteco ( la planko de la nuna etaĝo ).
export function agordiPromenanFotilon(mondo: PiedaMondo, ludanto: Ludanto, okulY: number, bob: number, krampi = true, subaLimo: number | null = null): void {
  const { fotilo, kolizioj } = mondo;
  if ( ludanto.kameraDistanco <= 0o1/0o20 ) {
    fotilo.position.set(ludanto.pozicio.x, okulY + bob, ludanto.pozicio.z);
    fotilo.rotation.set(ludanto.klinigxo, ludanto.direkto, 0);
    return;
  }
  const d = ludanto.kameraDistanco;
  const kos = Math.cos(ludanto.klinigxo), sinP = Math.sin(ludanto.klinigxo);
  fotilo.position.set(
    ludanto.pozicio.x + Math.sin(ludanto.direkto) * d * kos,
    okulY + d * 0o3/0o10 - d * sinP * 0o7/0o10 + bob,
    ludanto.pozicio.z + Math.cos(ludanto.direkto) * d * kos
);
  if ( krampi ) {
    // Ekstere — ne eniru la teron nek la konstruajxojn.
    const { dokaSuproY, vojaSuproY, solviKolizion } = kolizioj;
    const teraY = Math.max(alteco(fotilo.position.x, fotilo.position.z), dokaSuproY(fotilo.position.x, fotilo.position.z), vojaSuproY(fotilo.position.x, fotilo.position.z));
    if ( fotilo.position.y < teraY + 0o4/0o10 ) fotilo.position.y = teraY + 0o4/0o10;
    const r = solviKolizion(fotilo.position.x, fotilo.position.z);
    fotilo.position.x = r.x;
    fotilo.position.z = r.z;
  }
  if ( subaLimo !== null && fotilo.position.y < subaLimo ) fotilo.position.y = subaLimo;
  fotilo.lookAt(ludanto.pozicio.x, okulY + d * 0o1/0o10, ludanto.pozicio.z);
}
