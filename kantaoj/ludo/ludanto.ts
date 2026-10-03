// ≺⧼ អ្នកលេង 🎮 ⧽≻
import * as THREE from "three";
import type { Kanoto } from "../../eskekoj/medio/transporto.js";
import type { KonstruSpec } from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { MangxajxItemo } from "../../eskekoj/mebloj/mangxajxoj/tipoj.js";

export type Rezimo = "orbito" | "promeno" | "interno";

export interface LitoInfo {
  specX: number; specZ: number; cosR: number; sinR: number;
  lokaX: number; lokaZ: number; y: number; largho: number;
}

export interface Ludanto {
  rezimo: Rezimo;
  antauxaRezimo: "orbito" | "promeno" | null;
  surKanoto: Kanoto | null;
  elektitaSpec: KonstruSpec | null;
  plejProksimaPordo: KonstruSpec | null;
  aktivaPordaAngulo: number;
  plejProksimaManĝaĵo: MangxajxItemo | null;
  plejProksimaBero: MangxajxItemo | null;
  plejProksimaKanuo: Kanoto | null;
  sxtupaTurno: number | null;
  direkto: number;
  klinigxo: number;
  pozicio: THREE.Vector3;
  rapidoY: number;
  estasSurTERENO: boolean;
  kameraDistanco: number;
  celDistanco: number;
  kuŝas: boolean;
  kuŝaStato: LitoInfo | null;
  plejProksimaLito: LitoInfo | null;
  movoValoro: number;
}

export function kreiLudanton(): Ludanto {
  return {
    rezimo: "orbito",
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
