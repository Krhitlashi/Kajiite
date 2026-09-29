// ≺⧼ Bako 🎨 ⧽≻
// La 2D-bako de la tereno — la teraj kaj akvaj koloroj, la biomaj kaj bestaj
// nuancoj, la monteta ombrado kaj la pentrado de la mondkanvaso. La modulo ne
// posedas la skulptan staton — agordiBakon ricevas la referencojn de la ĉefa
// dosiero ( la deltoj, la tavoloj kaj la specimenaj helpiloj ), do la bukloj
// logxas ĉi tie kaj la stato restas tie.
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { katmullRom } from "../../../kantaoj/komunajxoj/interpolo.js";
import { terenaKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { MONDO, MONDO_HALFO, REZ } from "./mezuroj.js";

// ⟪ La skulpta stato 📃 ⟫ — la referencoj venas de agordiBakon unufoje, ĉe la
// ŝarĝo. La tabeloj ( deltoj, masko, biomoj, bestoj ) neniam reasigniĝas — la
// modulo legas la samajn areojn, do la referencoj restas validaj dum la tuta
// seanco.
let deltoj, masko, biomoj, bestoj;
let N, PASO, X0, Z0;
let deltoInterp, maskoInterp, akvaKavoInterp, akvaNiveloEn, cxuAkvo, akvaNiveloProksima;
let penikoAktiva, bestoAktiva;

// agordiBakon — La unufoja kunligo kun la ĉefa dosiero. La lastaj du
// ( peniko, besto ) estas FUNKCIOJ, ne valoroj — la aktiva peniko sxangxigxas
// dum la uzo, do la bako legas gxin ĝustatempe ( la nuancoj aperas kaj
// malaperas kun la iloj ).
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiBakon(k) {
  deltoj = k.deltoj; masko = k.masko; biomoj = k.biomoj; bestoj = k.bestoj;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  deltoInterp = k.deltoInterp; maskoInterp = k.maskoInterp; akvaKavoInterp = k.akvaKavoInterp;
  akvaNiveloEn = k.akvaNiveloEn; cxuAkvo = k.cxuAkvo; akvaNiveloProksima = k.akvaNiveloProksima;
  penikoAktiva = k.peniko; bestoAktiva = k.besto;
}

// ⟪ La mondkanvaso 📃 ⟫ — la fiksita 768²-bildo de la tereno kaj la tri
// akompanaj tabeloj: la proceduraj altoj, la monteta ombra faktoro kaj la
// deklivaj gradientoj ( la roka deklivo por la komuna paletro ).
export const bazaCanvas = document.createElement("canvas");
bazaCanvas.width = bazaCanvas.height = REZ;
const bazaKunteksto = bazaCanvas.getContext("2d");
const bazaBildo = bazaKunteksto.createImageData(REZ, REZ);
const bazoj = new Float32Array(REZ * REZ);            // proceduraj altoj
const deklivoj = new Float32Array(REZ * REZ);         // monteta ombra faktoro
const deklivoGradientoj = new Float32Array(REZ * REZ); // |∇h| — la roka deklivo por la komuna paletro

// prerenderiBazon — la proceduraj altoj ( la bazo sen la deltoj ) por la tuta
// kanvaso. La baza alteco venas de la komuna tereno ( bazaAlteco ), do la
// skulptilo kaj la ludo kunfalas.
export function prerenderiBazon(){
  for ( let py = 0; py < REZ; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = 0; px < REZ; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      bazoj[i] = bazaAlteco(x, z);
    }
  }
}

// La terena paletro venas de la komuna modulo ( kiel en la ludo ) — antaŭe ĝi
// estis kopiita ĉi tie kaj devojiĝis de la paletro de la ludo. terenaKoloro255
// — la tera koloro en sRGB-bajtoj ( 0-255 ) por la 2D-mapo kaj la nuancaj
// tavoloj: la komuna linia koloro de la ludo, konvertita al sRGB. La skulptita
// zono montrigxas per eta freŝa-tero malheliĝo ( delta ≠ 0 ) — nur la ilo, ne
// la ludo.
const skrapaKoloro = new THREE.Color();
export function terenaKoloro255(h, x, z, deklivo) {
  // La akvoborda tavolo legas la REALAN akvan nivelon ( akvaNiveloProksima ) —
  // la riveroj malsupreniras, do unu fiksa ebeno miskolorigus la bordojn.
  terenaKoloroEn(skrapaKoloro, h, x, z, deklivo, akvaNiveloProksima);
  skrapaKoloro.convertLinearToSRGB();
  return [
    Math.max(0, Math.min(255, skrapaKoloro.r * 255)),
    Math.max(0, Math.min(255, skrapaKoloro.g * 255)),
    Math.max(0, Math.min(255, skrapaKoloro.b * 255)),
  ];
}

// ⟨ Biomaj montraĵoj ( la biomo-zonoj de la skulptita tero ) 📃 ⟩
// La biomo ( tereno.ts ) venas TUTE de la PENTRITA tavolo. akvo ( la masko )
// kaj la pentritaj montaro/valo/ebenaĵo/akvaj-plantoj/ekvizeto
// ( SKULPTA_BIOMOJ ). Neniu deriva biomo ekzistas — malplena ( 0 = aŭtomata,
// aux sen datumoj ) estas nenio. La skulptilo montras la biomojn nur dum la
// biomo-ilo ( Biomo 🎨 ) estas malfermita — purpura sur la montara biomo,
// verda-blua sur la vala, pala helverda sur la ebenaĵo, kaj la akvaj biomoj
// ( akvaj-plantoj, ekvizeto ) kolorigas la akvajn ĉelojn per siaj propraj
// nuancoj. Ferminte la ilon la tero montras siajn naturajn kolorojn. La
// nuanco sekvas la vivajn pentritajn ĉelojn, do gxi sxangxigxas dum la
// pentrado mem.
const MONTA_NUANCO = [ 0o230, 0o60, 0o300 ];    // purpura — la montara biomo
const VALA_NUANCO = [ 0o40, 0o230, 0o260 ];     // verda-blua — la vala biomo
const EBENAJA_NUANCO = [ 0o220, 0o300, 0o110 ]; // pala helverda — la ebenaĵa biomo
const AKVAJ_PLANTOJ_NUANCO = [ 0o40, 0o200, 0o260 ]; // profunda blu-verda — la akvaj plantoj
const EKVIZETO_NUANCO = [ 0o100, 0o260, 0o140 ];     // helverda — la ekvizeto
const BIOMA_NUANCO = {
  montaro: [ MONTA_NUANCO, 0.3 ],
  valo: [ VALA_NUANCO, 0.3 ],
  ebenaĵo: [ EBENAJA_NUANCO, 0.3 ],
  "akvaj-plantoj": [ AKVAJ_PLANTOJ_NUANCO, 0.45 ],
  ekvizeto: [ EKVIZETO_NUANCO, 0.45 ],
};
// La besta-tavolo montrigxas nur dum la besto-ilo ( Animaloj 🐾 ) estas
// malfermita. helbluaj punktoj sur la akvaj-bestaj ĉeloj, helaj punktoj sur
// la petrelaj ĉeloj, helflavaj punktoj sur la NPC-ĉeloj. La vido montras
// NUR la elektitan specion — kaj la forviŝo montras la samajn ĉelojn, por
// ke oni vidu, kion oni forigas.
const AKVAJ_BESTOJ_NUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELA_NUANCO = [ 0o320, 0o320, 0o320 ];
const NPCA_NUANCO = [ 0o320, 0o260, 0o110 ];
const BESTO_NUANCO = {
  1: [ AKVAJ_BESTOJ_NUANCO, 0.35 ],
  2: [ PETRELA_NUANCO, 0.35 ],
  4: [ NPCA_NUANCO, 0.35 ],
};

// biomoInterp — La pentrita biomo de la punkto ( la plej proksima ĉelo de la
// biomo-tavolo ). 0=aŭtomata, 1=montaro, 2=valo, 3=ebenaĵo, 4=akvaj-plantoj,
// 5=ekvizeto. La sama samplo kiel skulptitaBiomo en tero-datumo.ts.
function biomoInterp(x, z) {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return biomoj[j * N + i];
}
const BIOMA_NOMOJ = [ null, "montaro", "valo", "ebenaĵo", "akvaj-plantoj", "ekvizeto" ];

// bestoInterp — La pentrita besta zono de la punkto ( la plej proksima ĉelo
// de la besta-tavolo ). bitoj 1=akvaj bestoj, 2=petreloj, 4=NPC-oj. La sama
// samplo kiel skulptitaBesto en tero-datumo.ts.
function bestoInterp(x, z) {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return bestoj[j * N + i];
}

// biomoDe — La biomo de la punkto en la skulptilo ( la sama decido kiel la
// ludo ). la akvaj biomoj validas nur sur la akvo, la masko ĉiam superregas
// la terajn biomojn, kaj malplena ( 0 = aŭtomata, aux sen datumoj ) estas
// nenio — neniu nuanco. Nur la masko ( ne la teralto ) decidas la akvon.
function biomoDe(x, z) {
  const pentrita = biomoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0o1/0o2;
  if ( pentrita === 4 && akva ) return "akvaj-plantoj";
  if ( pentrita === 5 && akva ) return "ekvizeto";
  if ( akva ) return "akvo";
  if ( pentrita !== 0 ) return BIOMA_NOMOJ[pentrita];
  return "nenio";
}
// almetiBiomanNuancon — la biomo- aux besta-nuanco sur la koloron k. Nur dum
// la koncerna ilo estas malfermita ( la aktiva peniko ); alie la koloro restas
// senŝanĝa.
export function almetiBiomanNuancon(k, x, z, d) {
  // Nur dum la biomo-ilo estas malfermita. La nuda akvo ricevas NENIAN
  // nuancon — la akvaj biomoj ( akvaj-plantoj, ekvizeto ) kolorigas siajn
  // pentritajn ĉelojn, kaj la akvo montras sian propran koloron aliloke.
  if ( penikoAktiva() === "biomo" ) {
    const n = BIOMA_NUANCO[biomoDe(x, z)];
    if ( n ) {
      const m = n[1];
      return [
        k[0] + ( n[0][0] - k[0] ) * m,
        k[1] + ( n[0][1] - k[1] ) * m,
        k[2] + ( n[0][2] - k[2] ) * m,
      ];
    }
    return k;
  }  // Nur dum la besto-ilo estas malfermita. la vido montras NUR la elektitan
  // specion ( la akvaj bestoj helbluaj, la petreloj helaj, la NPC-oj
  // helflavaj ).
  if ( penikoAktiva() === "bestoj" ) {
    const b = bestoInterp(x, z);
    const n = BESTO_NUANCO[bestoAktiva() & 7];
    if ( !n || ( b & ( bestoAktiva() & 7 ) ) === 0 ) return k;
    const m = n[1];
    return [
      k[0] + ( n[0][0] - k[0] ) * m,
      k[1] + ( n[0][1] - k[1] ) * m,
      k[2] + ( n[0][2] - k[2] ) * m,
    ];
  }
  return k;
}

// kolorigiAkvon — la akva koloro laŭ la profundo, ombrita kiel la tero. En
// skulptita ĉelo ( delta ≠ 0 ) la akvo malklarigxas ( kiel skuita koto ), por
// ke la peniko montru sian efikon ankaŭ en la rivero kaj la lago — levita
// tero restus alie nevidebla sub la opaka akvo.
function kolorigiAkvon(datumoj, o, h, nivelo, ombro, delta, x, z) {
  const prof = Math.min(6, nivelo - h);
  const t = prof / 6;
  let r = 0o40 + ( 0o10 - 0o40 ) * t;
  let g = 0o150 - 0o110 * t;
  let b = 0o150 - 0o110 * t;
  if ( delta !== 0 ) {
    const s = 0.15 + Math.min(0o1/0o2, Math.abs(delta) / 4);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }
  // La biomo- kaj besta-nuancoj kovras ankaŭ la akvon — la akvaj biomoj
  // ( akvaj-plantoj, ekvizeto ) kaj la akvaj bestoj pentrigxas sur la akvo mem.
  const k = almetiBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0]; g = k[1]; b = k[2];
  datumoj[o] = Math.min(255, r * ombro);
  datumoj[o + 1] = Math.min(255, g * ombro);
  datumoj[o + 2] = Math.min(255, b * ombro);
  datumoj[o + 3] = 255;
}

// bicubaDerivata — la derivaĵo de la Katmull-Rom kurbo laŭ t.
function bicubaDerivata(p0, p1, p2, p3, t) {
  const t2 = t * t;
  return 0o1/0o2 * ( ( -p0 + p2 ) + 2 * ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t
    + 3 * ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t2 );
}
// deltoKunDerivajoj — la dukuba alto kaj la du partaj derivaĵoj ĉe ( x, z ).
// Unu 4×4-lego donas ĉiujn tri valorojn — 5× pli rapide ol la centraj
// diferencoj de kvin dulinearaj samploj, kaj la normalo estas glata ( la
// derivaĵo de la glata surfaco, sen krad-restaĵoj ).
export function deltoKunDerivajoj(x, z) {
  const fx = ( x - X0 ) / PASO, fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i, j ) => deltoj[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  // La kvar vicoj — alto kaj u-derivaĵo po vico.
  const r = [], rd = [];
  for ( let k = -1; k <= 2; k++ ) {
    const j = j0 + k;
    const a = cxelo(i0 - 1, j), b = cxelo(i0, j), c = cxelo(i0 + 1, j), d = cxelo(i0 + 2, j);
    r.push(katmullRom(a, b, c, d, u));
    rd.push(bicubaDerivata(a, b, c, d, u));
  }
  const h = katmullRom(r[0], r[1], r[2], r[3], v);
  const dhdu = katmullRom(rd[0], rd[1], rd[2], rd[3], v);
  const dhdv = bicubaDerivata(r[0], r[1], r[2], r[3], v);
  return [ h, dhdu / PASO, dhdv / PASO ];
}
// rekalkuliDeklivojn — La monteta ombrado ( hillshade ) por la rektangulo.
// La normalo de la alteca kampo kontraŭ lumo el la nordokcidento; la ombra
// faktoro 0.7..1.2 multobliĝas la terajn kolorojn. La derivaĵoj venas de la
// analiza dukuba surfaco ( la bazo estas plata, do la deltoj sufiĉas ).
export function rekalkuliDeklivojn(px0, py0, px1, py1) {
  const lumoX = -0.55, lumoY = 0.65, lumoZ = 0.52;
  const lumoLen = Math.hypot(lumoX, lumoY, lumoZ);
  const minPx = Math.max(1, px0), maxPx = Math.min(REZ - 2, px1);
  const minPy = Math.max(1, py0), maxPy = Math.min(REZ - 2, py1);
  for ( let py = minPy; py <= maxPy; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = minPx; px <= maxPx; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      const [ , deklX, deklZ ] = deltoKunDerivajoj(x, z);
      deklivoGradientoj[i] = Math.hypot(deklX, deklZ);
      const nx = -deklX * 2.2, nz = -deklZ * 2.2, ny = 1;
      const len = Math.hypot(nx, ny, nz);
      const lumo = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      deklivoj[i] = 0.7 + 0o1/0o2 * Math.max(0, lumo);
    }
  }
}

// pentri — La kolora pentrado de la rektangulo sur la mondkanvason. La tereno
// inkluzivas la AKVAN ELTRANCSON ( la riverlito ) — la sama sumo kiel alteco()
// en la ludo. La akvo venas de la KALKULO ( la fontoj kaj la basenoj ), ne de
// la pentrita masko; la nivelo estas la propra nivelo de la punkto ( la rivero
// malsupreniras, la baseno restas plata ).
//     @param px0, py0, px1, py1 ( number ) - La rektangulo en kanvasaj pikseloj.
export function pentri(px0, py0, px1, py1) {
  const datumoj = bazaBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      const bazo = bazoj[i];
      const delta = deltoInterp(x, z);
      // La tereno inkluzivas la AKVAN ELTRANCSON ( la riverlito ) — la sama
      // sumo kiel alteco() en la ludo.
      const h = bazo + delta - akvaKavoInterp(x, z);
      const o = i * 4;
      const ombro = deklivoj[i] || 1;
      // La akvo venas de la kalkulo ( la fontoj kaj la basenoj ), ne de la
      // pentrita masko. La nivelo estas la propra nivelo de la punkto — la
      // rivero malsupreniras, la baseno restas plata.
      const nivelo = akvaNiveloEn(x, z);
      if ( nivelo !== null && cxuAkvo(x, z) && h < nivelo - 0o1/0o100 ) {
        kolorigiAkvon(datumoj, o, h, nivelo, ombro, delta, x, z);
      } else {
        const k = almetiBiomanNuancon(terenaKoloro255(h, x, z, deklivoGradientoj[i] || 0), x, z, delta);
        datumoj[o] = Math.min(255, k[0] * ombro);
        datumoj[o + 1] = Math.min(255, k[1] * ombro);
        datumoj[o + 2] = Math.min(255, k[2] * ombro);
        datumoj[o + 3] = 255;
      }
    }
  }
  bazaKunteksto.putImageData(bazaBildo, 0, 0);
}
