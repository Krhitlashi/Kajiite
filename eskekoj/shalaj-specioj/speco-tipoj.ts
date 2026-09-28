// ≺⧼ Speco-tipoj 🐾 ⧽≻
// La komunaj tipoj de la akvaj bestoj kaj de la petreloj.
//
// Ĉiu specio nun havas sian propran dosieron ( beroe.ts, mnemiopsis.ts,
// pleurobrakia.ts, glacifiso.ts, marlaraksxo.ts, petrelo.ts ); ĉi tiu dosiero
// tenas nur la kontrakton, kiun ili ĉiuj plenumas, do la speco-dosieroj ne
// dependas unu de la alia ( nenia cirkla importo ). bestoj.ts importas la
// specojn kaj estas la sola fasado, kiun la ludo uzas.
import * as THREE from "three";

// ⟨ Bestoj ↔ biomoj ( kiu vivas kie ) 📃 ⟩ — la kontrolo de la besta spawno.
// La akvaj bestoj ( ktenoforoj, glacifiso, marlaraksxo ) vivas en la akva
// biomo; la neĝopetreloj rondflugas super la montara biomo ( la neĝaj pintoj )
// kaj super la akva ( la lago kaj la rivero ).
export const BIOMO_DE_BESTO = {
  ktenoforoj: "akvo",
  glacifiso: "akvo",
  marlaraksxo: "akvo",
  neĝopetrelo: "montaro",
} as const;

export interface Besto {
  grupo: THREE.Group;
  korpo: THREE.Mesh;
  vosto?: THREE.Object3D;  // vosta naĝilo ( glacifiso ) — batas dum naĝado
  animajxoj: THREE.Object3D[]; // specio-specifaj movaj partoj ( palpoj, loboj, kruroj )
  segmentoj: THREE.Object3D[]; // la korpaj ĉenaj segmentoj ( glacifiso )
  naĝiloj: THREE.Object3D[];   // ĉiuj naĝiloj trafe ( glacifiso )
  bazajKruroj: Array<{ kruro: THREE.Object3D; q: THREE.Quaternion; ankro: THREE.Vector3;
                       genuo?: THREE.Object3D; flanko: number }>;
  x: number;           // baza x — laŭ la rivero aŭ en la lago
  zOfseto: number;     // laterala forpreno de la rivercentro
  cz: number;          // baza z — en la lago la besto restas ĉe sia propra centro
  enLago: boolean;     // ĉu la besto naĝas en la lago ( anstataŭ la rivero )
  nivelo?: number;     // la akvosurfaca Y de la besto ( de akvaNivelo aŭ de la
                       // objekta ilo ) — la animacio restas ĉe ĝi, anstataŭ
                       // ree kalkuli la akvon ĉiukadre
  bazaY: number;       // negativa kroma alteco — korpocentro sub la akvosurfaco
  direkto: number;     // la kapo-direkto — la glacifiso turniĝas al la movo
  turno: number;       // la lasta turnrapido ( por la kliniĝo de la glacifiso )
  phase: number;
  amplitudo: number;   // oscila intervalo laŭ la rivero
  rapido: number;      // naĝa rapido ( oscilfrekvenco )
  speco: string;       // speco-specifa animacio
  // ⟨ La ktenofora pulso kaj la platigo 📃 ⟩ — la valoroj venas de la
  // speco-malneto ( vidu SpecoMalneto ); la fiŝo kaj la marlaraksxo ricevas la
  // neŭtralajn valorojn ( neniu pulso, neniu platigo ).
  pulsaRapido: number;
  pulsaForto: number;
  pulsaOndo: number;
  plata: number;
  bazaSkalo: THREE.Vector3;   // la grupo-skalo sen la ĉiukadra platigo
}

export interface BestoSistemo {
  bestoj: Besto[];
  riverFn: ( x: number ) => number;
  akvoYFn: ( x: number ) => number;
  lago?: { x: number; z: number; r: number; nivelo: number };
}

// SpecoMalneto — la priskribo, kiun ĉiu specio-dosiero redonas: la modelo ( la
// grupo ) kaj la nombroj, per kiuj la komuna sistemo lokas kaj animas la
// beston.
export interface SpecoMalneto {
  malneto: THREE.Group;
  platigxo: THREE.Vector3;
  supro: number;   // korpa supro super la grupo-origino ( × grandeco )
  speco: string;
  mergo?: number;  // kroma subakvigo por fundaj bestoj ( pozitiva = pli profunde )
  fundaMergo?: number;   // multiplikilo de la loka akva profundo — la fiŝoj,
                         // kiuj naĝas antaŭ la fundo, anstataŭ ĉe la surfaco
  rapidaMultoblo?: number;     // multiplikilo de la naĝa oscilfrekvenco
  ampleksaMultoblo?: number;   // multiplikilo de la naĝa amplekso
  // ⟨ La ktenofora pulso 📃 ⟩ — la tri ktenoforoj pulsas MALSAME: la granda
  // Beroe malrapide kaj forte, Mnemiopsis rapide kaj milde. La pulso, la
  // kombovica ondo kaj la platigo legas ĉi tiujn nombrojn ( vidu
  // ktenofora-komunajxoj.ts ); la fiŝo kaj la marlaraksxo ne pulsas ( la
  // defaŭltoj ).
  pulsaRapido?: number;   // la pulsa frekvenco ( rad/s )
  pulsaForto?: number;    // la pulsa amplekso ( la frakcio de la korpa kunpremo )
  pulsaOndo?: number;     // kiom malfruas ĉiu sekva kombovico ( la metakrona ondo )
  plata?: number;         // kiom la besto platigas laŭ la vertikala akso
}
