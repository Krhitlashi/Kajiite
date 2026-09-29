// ≺⧼ Ludanto 🎮 ⧽≻
// La ŝanĝiĝema stato de la ludanto — la reĝimo, la pozicio, la rigardo, la movaj
// rapidoj kaj la interagaj proksimuloj. Gxi restas UNU objekto, por ke la
// orkestrilo, la reĝimaj transiroj, la eniga tavolo kaj la animacia buklo vidu
// la samajn valorojn sen longa listo de legiloj kaj skribiloj.
import * as THREE from "three";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import type { KonstruSpec } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj/tipoj.js";

// Rezimo — la tri reĝimoj de la ludo. La animacia buklo elektas per gxi la
// promenan, la internan aŭ la orbitan blokon, kaj la retila stato sendas gxin
// al la aliaj ludantoj.
export type Rezimo = "orbit" | "walk" | "interior";

// LitoInfo — la lito sur kiu oni kuŝas. La transformo de la konstruajxo kaj la
// loka pozicio, por ke la leviĝo metu la ludanton ĝuste ĉe la piedo de la lito.
export interface LitoInfo {
  specX: number; specZ: number; cosR: number; sinR: number;
  lokaX: number; lokaZ: number; y: number; largho: number;
}

// Ludanto — la tuta promena kaj interna stato. La proksimuloj ( la pordo, la
// kanuo, la bero, la manĝaĵo, la lito ) estas trovitaj de la alproksimiĝa
// skanado de la buklo kaj legataj de la E-ago kaj de la promptilo.
export interface Ludanto {
  rezimo: Rezimo;
  antauxaRezimo: "orbit" | "walk" | null;
  surKanoto: Kanoto | null;
  elektitaSpec: KonstruSpec | null;
  plejProksimaPordo: KonstruSpec | null;
  // Angulo de la pordo tra kiu la ludanto eniros ( la centra sanktejo havas 4 ).
  aktivaPordaAngulo: number;
  plejProksimaManĝaĵo: MangxajxItemo | null;
  // La plej proksima Pussxlefo-ber-klastro en la mondo — E kolektas ( manĝas ) gxin.
  plejProksimaBero: MangxajxItemo | null;
  // La plej proksima kanuo — nur por la prompto ( la E-ago faras sian propran
  // serĉon per la distanco 6 ).
  plejProksimaKanuo: Kanoto | null;
  // Kontinua vindo de la helika ŝtuparo ( nulo = ne sur la spiralo ).
  sxtupaTurno: number | null;
  direkto: number;
  klinigxo: number;
  pozicio: THREE.Vector3;
  rapidoY: number;
  estasSurTERENO: boolean;
  // Tria-persona distanco. 0 = unua persono; la rado malzomas eksteren por vidi
  // la modelon de la ludanto. celDistanco estas la celo, kameraDistanco sekvas
  // gxin glate cxiun kadron.
  kameraDistanco: number;
  celDistanco: number;
  // Kuŝado sur la lito ( nur en la interno de domoj ). La fotilo malaltigas al
  // la lita supro kaj la movado haltas ĝis la ludanto leviĝas.
  kuŝas: boolean;
  kuŝaStato: LitoInfo | null;
  // La plej proksima lito en la nuna interno ( por la E-promptilo ).
  plejProksimaLito: LitoInfo | null;
  // 0..1 — nuna mova intenseco por la figuro-animacio.
  movoValoro: number;
}

export function kreiLudanton(): Ludanto {
  return {
    rezimo: "orbit",
    antauxaRezimo: null,
    surKanoto: null,
    elektitaSpec: null,
    plejProksimaPordo: null,
    aktivaPordaAngulo: 0,
    plejProksimaManĝaĵo: null,
    plejProksimaBero: null,
    plejProksimaKanuo: null,
    sxtupaTurno: null,
    direkto: 0,
    klinigxo: -0o1/0o20,
    pozicio: new THREE.Vector3(0, 0o5/0o40, 0o44),
    rapidoY: 0,
    estasSurTERENO: false,
    kameraDistanco: 0,
    celDistanco: 0,
    kuŝas: false,
    kuŝaStato: null,
    plejProksimaLito: null,
    movoValoro: 0,
  };
}
