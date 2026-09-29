// ≺⧼ La krada urbo kaj la vojoj 🏙️ ⧽≻
// La Krado-langeto montras kaj redaktas la saman urban kradon kiun la ludo
// konstruas el KradaArangxo, kaj la mond-nivelajn vojojn kaj dokojn. La du
// partoj estas unu ilo — la krado KONEKTIĜAS al la mond-vojoj ( la staciaj
// kradaj vojoj ) kaj la vojoj ALGLUIĜAS al la krada reto, do ili ne disigxas.
// La stato legigxas rekte ( la vivaj ligoj de ES-moduloj ); sxangxas gxin nur
// la agord-funkcioj ( agordiDatumojn, agordiUrbojn, agordiVojojn, ... ).
import { MONDO_HALFO } from "./mezuroj.js";
import { akvaRezulto, cxuAkvo } from "./akvo.js";
import { bildilo3d } from "./vido3d.js";
import { rekonstruiKradon3D, rekonstruiVojojn3D } from "./krado3d.js";
// La sama pura krado-modulo kiel la ludo ( kantaoj/mondo/krado.ts ).
import { kreiKradanPlanon } from "../../../kantaoj/mondo/krado/plano.js";
import { validiKradon } from "../../../kantaoj/mondo/krado/validigo.js";
import { aldoniVojon } from "../../../kantaoj/mondo/krado/aldonoj.js";
import { superajElDatumo, superojElDatumo } from "../../../kantaoj/mondo/krado/superoj.js";
// La vojaj helpiloj de la ludo ( la kunfandigxoj, la dokoj, la gluo ).
import { vojaDuonLargho as retoVojaDuonLargho, vojaKunigaDuono as retoVojaKunigaDuono,
  pontoDuonLargho as retoPontoDuonLargho, vojaProjekcio as retoVojaProjekcio,
  vojoKunfandiĝas as retoVojoKunfandiĝas,
  dokoKunfandiĝas as retoDokoKunfandiĝas, dokoKonektasVojon as dokoKonektasVojonReto,
  vojajKunfandajxoj as retoVojajKunfandajxoj, plejProximaVojo as retoPlejProximaVojo,
  konektiDokonAlVojo as retoKonektiDokonAlVojo,
  dokoLandaSegmento as retoDokoLandaSegmento,
  DOKO_PLATFORMA_LARĜO } from "../../../eskekoj/medio/voj-reto.js";

// ⟪ La ligo kun la redaktilo 📃 ⟫ — la referencoj de la cefa dosiero, ligitaj
// unufoje per agordiKradaron. La vido ( la centro kaj la zomo ) sxangxigxas
// dum la uzo, do gxi legigxas per FUNKCIOJ.
let vidCX, vidCZ, vidSkalo, momenti, statuso, markiSxangxitan, markiDesegnon;

// agordiKradaron — la unufoja kunligo kun la ĉefa dosiero.
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiKradaron(k) {
  vidCX = k.vidCX; vidCZ = k.vidCZ; vidSkalo = k.vidSkalo;
  momenti = k.momenti; statuso = k.statuso;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
}

// ⟪ La agord-funkcioj 📃 ⟫ — la solaj skriboj al la stato de la urboj kaj la
// vojoj el la cefa dosiero ( la ŝarĝo de mapo, la malfaro kaj la antaŭaj
// konservoj ). La listoj legigxas rekte.
export function agordiUrbojn( listo ) { urboj = Array.isArray(listo) ? listo : []; }
export function agordiElektitanUrbon( i ) { elektitaUrbo = i; }
export function agordiElektitanAldonanBlokon( i ) { elektitaAldonaBloko = i; }
export function agordiVojojn( listo ) { vojoj = Array.isArray(listo) ? listo : []; }
export function agordiDokojn( listo ) { dokoj = Array.isArray(listo) ? listo : []; }

// La kanvaso de la 2D-mapo — la krada tavolo desegnigxas sur gxin.
const mapo = document.getElementById("mapo");

// ════════════════════════ Krado 🏙️ ( la urba krado ) ════════════════════════
// La Krado-langeto montras kaj redaktas la saman urban kradon kiun la ludo
// konstruas el KradaArangxo ( kantaoj/mondo/urbo.ts → kantaoj/mondo/krado.ts — la sama pura
// modulo ). La konstruaĵoj montriĝas NUR dum ĉi tiu langeto estas aktiva —
// en 2D sur la mapo ( desegniKradanTavolon ) kaj kiel reala 3D-aspekto en la
// 3D-vido ( rekonstruiKradon3D — la VERAJ konstruaĵoj de la ludo; tiu aspekto
// logxas en tero-skulptilo/krado3d.js ). La
// agordoj ŝanĝas la aranĝon ( grandeco, bloko ) kaj la ofseton; la paletro
// elektas la tipon por la klako-redaktado; la superoj ( Mapo "c,r" → tipo )
// ŝanĝas aŭ aldonas ĉelojn mane.
// La urboj — la kradaj aranĝoj kaj ofsetoj de SKULPTA_URBOJ ( la sama listo
// kiun la ludo konstruas ). La urbo-elektilo en la Krado-panelo elektas la
// urbon por redakti; la ŝanĝoj skribiĝas reen al la urbo kaj saviĝas al la
// datumodosiero ( generiDosierojn skribas SKULPTA_URBOJ al kantaoj/tero-datumaro/urboj.ts ).
export let urboj = [];                 // la kradaj arangxoj kaj ofsetoj ( SKULPTA_URBOJ )
export let elektitaUrbo = 0;            // la elektita urbo ( la unua estas la ĉefa )
export let kradoGrandeco = 3;           // arangxaGrando ( 1–6 )
export let kradoBloko = "unu";          // blokaGrando ( "unu" | "kvar" )
export let kradoOfsX = 0, kradoOfsZ = 0;   // la ofseto de la krada centro
export let kradoKeuxfhxeso = false;     // keŭfĥesoj ĉirkaŭ la centro
export let kradoLampoj = true;          // la kvar-lampa strato-ŝablono ( defaŭlte ŝaltita )
export let kradoTipoElektita = "automata";   // la paletro ( "automata" = la generita tipo )
export let kradoSuperoj = new Map();    // "c,r" → tipo ( unu ) aŭ "c,r,SUB" → tipo ( kvar )
export let vojoj = [];                  // la mond-nivelaj vojoj ( SKULPTA_VOJOJ )
export let dokoj = [];                  // la dokoj ( SKULPTA_DOKOJ )

// agordiDatumojn — la unua ŝarĝo de la datumaro ( la urboj, la vojoj, la
// dokoj de la mapo ). La defaŭltoj ( la Kajo, la Avenuo kaj la tri dokoj )
// validas, kiam la mapo havas neniun vojon — kiel la malnovaj mapoj.
export function agordiDatumojn( datumoj ) {
  urboj = ( datumoj.urboj ?? [] ).map(u => ( { ...u } ));
  elektitaUrbo = 0;
  kradoGrandeco = urboj[0]?.arangxaGrando ?? 3;
  kradoBloko = urboj[0]?.blokaGrando ?? "unu";
  kradoOfsX = urboj[0]?.ofsX ?? 0;
  kradoOfsZ = urboj[0]?.ofsZ ?? 0;
  kradoKeuxfhxeso = !!urboj[0]?.keuxfhxeso;
  kradoLampoj = urboj[0]?.lampoj !== false;
  vojoj = ( datumoj.vojoj ?? [] ).length
    ? datumoj.vojoj.map(v => ( { ...v, punktoj: v.punktoj.map(pp => [ pp[0], pp[1] ]) } ))
    : [ { nomo: "Kajo", larĝo: 0o7/0o2, punktoj: [ [ -84, -96 ], [ -56, -104 ], [ -48, -100 ], [ 0, -90 ], [ 48, -80 ], [ 56, -84 ], [ 84, -82 ] ] },
        { nomo: "Avenuo", larĝo: 0o7/0o2, punktoj: [ [ 12, -64 ], [ 12, -88 ] ] } ];
  dokoj = ( datumoj.dokoj ?? [] ).length
    ? datumoj.dokoj.map(d => ( { ...d } ))
    : [ { x: -48, z: -108, profundo: 16 }, { x: 0, z: -98, profundo: 16 }, { x: 48, z: -88, profundo: 16 } ];
}

// sinkronigiSuperojn — la vivaj ĉel-superoj al la konservita urbo-datumo
// ( la savo skribas ilin en SKULPTA_URBOJ kaj la ludo aplikas ilin ).
export function sinkronigiSuperojn() {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.superoj = superojElDatumo(kradoSuperoj);
}
let kradaPlanoCache = null;
// La dokoj kaj la vojoj estas la mondaj trajtoj de la ĉefa urbo ( SKULPTA_DOKOJ
// kaj SKULPTA_VOJOJ en kantaoj/tero-datumaro/vojoj.ts ), redaktataj per la
// Vojoj sub-langeto de la Krado-panelo. La spacosxipo kaj la kanuoj estas
// objektoj ( SKULPTA_OBJEKTOJ ) — redaktataj
// per la objekta ilo, ne plu per la Vojoj sub-langeto.
export const kradaro = document.getElementById("kradaro");
export const kradoPanel = document.getElementById("kradoPanel");
const urboElektilo = document.getElementById("urboElektilo");
const urboNomoEl = document.getElementById("urboNomo");
const urboAldoniBtn = document.getElementById("urboAldoni");
const urboForigiBtn = document.getElementById("urboForigi");
const kradoGrandecoEl = document.getElementById("kradoGrandeco");
const kradoBlokoEl = document.getElementById("kradoBloko");
const kradoOfsXEl = document.getElementById("kradoOfsX");
const kradoOfsZEl = document.getElementById("kradoOfsZ");
const kradoKeuxfhxesoEl = document.getElementById("kradoKeuxfhxeso");
const kradoLampojEl = document.getElementById("kradoLampoj");
const kradoRestarigiBtn = document.getElementById("kradoRestarigi");
const kradoKopiiBtn = document.getElementById("kradoKopii");
// La aldonaj blokoj — la ekstraj konstruajxoj de la redaktata urbo
// ( la spacosxipa stacio de la cefa urbo estas unu ), metitaj aparte de la
// krada generado. La elektita bloko kaj la trenado sur la mapo.
export let elektitaAldonaBloko = -1;
export let aldonaTrenata = -1;             // indekso de la trenata aldona bloko
const aldonaBlokoElektilo = document.getElementById("aldonaBlokoElektilo");
const aldonaBlokoTipoEl = document.getElementById("aldonaBlokoTipo");
const aldonaBlokoXEl = document.getElementById("aldonaBlokoX");
const aldonaBlokoZEl = document.getElementById("aldonaBlokoZ");
const aldonaBlokoRotEl = document.getElementById("aldonaBlokoRot");
const aldonaBlokoStaciaEl = document.getElementById("aldonaBlokoStacia");
const aldonaBlokoKonektitaEl = document.getElementById("aldonaBlokoKonektita");
const aldonaBlokoAldoniBtn = document.getElementById("aldonaBlokoAldoni");
const aldonaBlokoForigiBtn = document.getElementById("aldonaBlokoForigi");
// La Vojoj sub-langeto de la Krado-panelo — la elektitaj vojo/punkto/doko kaj
// la mapaj sub-iloj. La mondaj trajtoj ( vojoj, dokoj ) redaktigxas ĉi tie,
// sed restas MOND-nivelaj ( por ke ili povu konekti plurajn urbojn estonte ).
export let elektitaVojo = 0;          // indekso en vojoj
export let elektitaPunkto = -1;       // punkto de la elektita vojo ( -1 = neniu )
export let elektitaDoko = 0;          // indekso en dokoj
let vojaIlo = "movu";          // "movu" | "aldoni" | "forigi"
export let vojaTrenata = null;        // { speco: "punkto"|"doko", ... }

const vojoElektilo = document.getElementById("vojoElektilo");
const vojoNomoEl = document.getElementById("vojoNomo");
const vojoLargxoEl = document.getElementById("vojoLargxo");
const vojoAldoniBtn = document.getElementById("vojoAldoni");
const vojoForigiBtn = document.getElementById("vojoForigi");
const vojoKonektiBtn = document.getElementById("vojoKonekti");
const vojoPunktoElektilo = document.getElementById("vojoPunktoElektilo");
const vojoPunktoAldoniBtn = document.getElementById("vojoPunktoAldoni");
const vojoPunktoForigiBtn = document.getElementById("vojoPunktoForigi");
const vojoPunktoXEl = document.getElementById("vojoPunktoX");
const vojoPunktoZEl = document.getElementById("vojoPunktoZ");
const dokoElektilo = document.getElementById("dokoElektilo");
const dokoXEl = document.getElementById("dokoX");
const dokoZEl = document.getElementById("dokoZ");
const dokoProfundoEl = document.getElementById("dokoProfundo");
const dokoRotacioEl = document.getElementById("dokoRotacio");
const dokoAldoniBtn = document.getElementById("dokoAldoni");
const dokoForigiBtn = document.getElementById("dokoForigi");

// kradoPlano — la nuna plano kun la superoj. La ĉelo-redaktado validiĝas
// tuj. la vojoj, spronoj kaj konstruaĵoj rekalkuliĝas ĉirkaŭ la ŝanĝitaj aŭ
// aldonitaj ĉeloj — la sama logiko kiel la ludo. La ALDONAJ blokoj de la
// redaktata urbo ( la spacosxipa stacio kaj la aliaj ekstraj konstruajxoj )
// venas el la urbo-datumo ( aldonajBlokoj ) — aparte de la krada generado.
// Kiam la ĉefa urbo estas elektita, la voja konstruanto ( aldoniVojon )
// aldonas la dokan avenuon — la mond-nivela vojo de la ĉefa urbo.
export function kradoPlano() {
  if ( !kradaPlanoCache ) {
    const u = urboj[elektitaUrbo];
    kradaPlanoCache = kreiKradanPlanon(
      { arangxaGrando: kradoGrandeco, blokaGrando: kradoBloko, lampoj: kradoLampoj },
      kradoSuperoj, u && u.aldonajBlokoj ? u.aldonajBlokoj : []);
    // La mond-nivelaj vojoj KONEKTIĜAS al la krada reto — aks-paralelaj
    // segmentoj sur la SAMA linio kiel ekzistanta krada vojo ( la pozicio
    // egalas ) aldoniĝas kiel staciaj kradaj vojoj. La krado tiam montras
    // ilin kiel sian propran etendaĵon ( la 2D-overlajo, la 3D-vido kaj la
    // spronoj atingas ilin ) — la avenuo de la ĉefa urbo estas la ekzemplo.
    // ĝi daŭrigas la NS-vojon ĉe x=12 suden ĝis la kajo.
    const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
    for ( const v of vojoj ) {
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      for ( let i = 0; i < v.punktoj.length - 1; i++ ) {
        const a = v.punktoj[i], b = v.punktoj[i + 1];
        if ( Math.abs(a[0] - b[0]) < 1e-6 ) {
          const poz = a[0] - ofsX;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "NS" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "NS", poz,
              Math.min(a[1], b[1]) - ofsZ, Math.max(a[1], b[1]) - ofsZ, true);
        } else if ( Math.abs(a[1] - b[1]) < 1e-6 ) {
          const poz = a[1] - ofsZ;
          if ( kradaPlanoCache.vojoj.some(r => r.orient === "EW" && Math.abs(r.poz - poz) < 1e-6) )
            aldoniVojon(kradaPlanoCache, "EW", poz,
              Math.min(a[0], b[0]) - ofsX, Math.max(a[0], b[0]) - ofsX, true);
        }
      }
    }
  }
  return kradaPlanoCache;
}
export function gxisdatigiKradon() {
  // La plano venas ĈIAM de kradoPlano — la sola konstruanto ( ĝi aldonas
  // ankaŭ la konektajn vojajn stubojn ). Antaŭe ĉi tiu funkcio konstruis
  // sen la stuboj, kaj ili malaperis ĉe ĉiu ĉela redakto.
  kradaPlanoCache = null;
  kradoPlano();
  gxisdatigiKradajnStatistikojn();
  rekonstruiKradon3D();
  markiDesegnon();
}
function gxisdatigiKradajnStatistikojn() {
  const el = document.getElementById("kradoStatistikoj");
  if ( !el || !kradaPlanoCache ) return;
  const plano = kradaPlanoCache;
  // La simetriaj kontroloj validas nur por la GENERITAJ kradoj — la mana
  // redaktado rompas ilin intence ( unu ĉelo ŝanĝiĝas, ne ĉiuj kvar
  // speguloj ). La statistikoj montras la strukturajn problemojn.
  const problemoj = validiKradon(plano).filter(p => !p.kodo.startsWith("simetrio-"));
  const bazo = `${plano.ĉeloj.length} ĉeloj · ${plano.konstruaĵoj.length} konstruaĵoj · ${plano.vojoj.length} vojoj · ${plano.spronoj.length} spronoj`;
  el.textContent = problemoj.length
    ? bazo + ` — ✗ ${problemoj.length} problemo(j): ${problemoj.slice(0, 3).map(p => p.kodo).join(", ")}`
    : bazo + " — ✓ strukture validas";
}

// gxisdatigiUrboElektilon — rekonstruu la urbo-elektilon el la urboj. Cxiu
// opcio montras la nomon kaj la ofseton; la elektita urbo restas elektita.
export function gxisdatigiUrboElektilon() {
  urboElektilo.innerHTML = "";
  urboj.forEach(( u, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = u.nomo + " ( " + u.ofsX + ", " + u.ofsZ + " )";
    urboElektilo.appendChild(o);
  });
  urboElektilo.value = String(elektitaUrbo);
  urboNomoEl.value = urboj[elektitaUrbo]?.nomo ?? "";
  urboForigiBtn.disabled = urboj.length <= 1;
}

// elektiUrbon — sxargu la urbon ( grandeco, bloko, ofseto, nomo ) en la
// redaktajn regilojn kaj montru gxian kradon. La superoj ( manaj ĉel-ŝanĝoj )
// restas — la ĉelo-redaktado apartenas al la redaktata urbo.
export function elektiUrbon(i) {
  elektitaUrbo = Math.max(0, Math.min(urboj.length - 1, i));
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  kradoGrandeco = u.arangxaGrando;
  kradoBloko = u.blokaGrando;
  kradoOfsX = u.ofsX;
  kradoOfsZ = u.ofsZ;
  kradoKeuxfhxeso = !!u.keuxfhxeso;
  kradoLampoj = u.lampoj !== false;
  // La ĉel-superoj de ĈI TIU urbo — la redaktoj de la Krado-langeto ne
  // estas komunaj inter la urboj.
  kradoSuperoj = superajElDatumo(u.superoj) ?? new Map();
  kradoGrandecoEl.value = String(kradoGrandeco);
  kradoBlokoEl.value = kradoBloko;
  kradoOfsXEl.value = String(kradoOfsX);
  kradoOfsZEl.value = String(kradoOfsZ);
  kradoKeuxfhxesoEl.checked = kradoKeuxfhxeso;
  kradoLampojEl.checked = kradoLampoj;
  urboNomoEl.value = u.nomo;
  gxisdatigiUrboElektilon();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
}

// skribiElektitanUrbon — skribu la nuntempajn regilojn reen al la elektita
// urbo kaj marku la datumaron sxangxita ( la savo skribas la urbojn al
// SKULPTA_URBOJ ).
function skribiElektitanUrbon() {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.arangxaGrando = kradoGrandeco;
  u.blokaGrando = kradoBloko;
  u.ofsX = kradoOfsX;
  u.ofsZ = kradoOfsZ;
  u.keuxfhxeso = kradoKeuxfhxeso;
  u.lampoj = kradoLampoj;
  sinkronigiSuperojn();
  markiSxangxitan();
}

// gxisdatigiAldonaBlokojn — sxargu la aldonajn blokojn de la redaktata urbo
// en la regilojn ( la elektita bloko restas elektita ).
export function gxisdatigiAldonaBlokojn() {
  if ( !aldonaBlokoElektilo ) return;
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  aldonaBlokoElektilo.innerHTML = "";
  blokoj.forEach(( b, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( b.stacia ? "Stacio" : ALDONA_TIPO_NOMOJ[b.tipo] || b.tipo ) + ( b.konektita ? " 🛣️" : "" ) + " ( " + b.x + ", " + b.z + " )";
    aldonaBlokoElektilo.appendChild(o);
  });
  elektitaAldonaBloko = blokoj.length ? Math.max(0, Math.min(blokoj.length - 1, elektitaAldonaBloko)) : -1;
  aldonaBlokoElektilo.value = String(Math.max(0, elektitaAldonaBloko));
  aldonaBlokoForigiBtn.disabled = blokoj.length === 0;
  const b = blokoj[elektitaAldonaBloko];
  if ( b ) {
    aldonaBlokoTipoEl.value = b.tipo;
    aldonaBlokoXEl.value = String(b.x);
    aldonaBlokoZEl.value = String(b.z);
    aldonaBlokoRotEl.value = String(b.rot ?? 0);
    aldonaBlokoStaciaEl.checked = !!b.stacia;
    aldonaBlokoKonektitaEl.checked = !!b.konektita;
  }
  markiDesegnon();
}

// skribiAldonanBlokon — legu la regilojn en la elektitan aldonan blokon kaj
// marku la datumaron sxangxita ( la savo skribas la urbojn al SKULPTA_URBOJ ).
function skribiAldonanBlokon() {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( !b ) return;
  b.tipo = aldonaBlokoTipoEl.value;
  b.x = Math.round(( parseFloat(aldonaBlokoXEl.value) || 0 ) * 2) / 2;
  b.z = Math.round(( parseFloat(aldonaBlokoZEl.value) || 0 ) * 2) / 2;
  b.rot = parseFloat(aldonaBlokoRotEl.value) || 0;
  b.stacia = aldonaBlokoStaciaEl.checked;
  b.konektita = aldonaBlokoKonektitaEl.checked;
  markiSxangxitan();
}
const ALDONA_TIPO_NOMOJ = { sanktejo: "Sanktejo", turo: "Turo", domo: "Domo", mangxejo: "Manĝejo", kasafeo: "Kasafeo", stacio: "Stacio" };

// aldonaBlokoCxePunkto — la indekso de la aldona bloko kies markilo kovras la
// mondan punkton ( ekran-bazita, kiel la urbaj markiloj ), aux -1.
export function aldonaBlokoCxePunkto(mx, mz) {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX ) * vidSkalo;
  const sy = duonh - ( mz - vidCZ ) * vidSkalo;
  for ( let i = 0; i < blokoj.length; i++ ) {
    const b = blokoj[i];
    const bx = duonw - ( kradoOfsX + b.x - vidCX ) * vidSkalo;
    const bz = duonh - ( kradoOfsZ + b.z - vidCZ ) * vidSkalo;
    if ( Math.hypot(bx - sx, bz - sy) < 14 ) return i;
  }
  return -1;
}

// komenciAldonaTrenon — kaptu aldonan blokon por movi gxin sur la mapo ( la
// movo estas malfarebla — la historio momentigxas cxe la kapto ).
export function komenciAldonaTrenon(i) {
  if ( aldonaTrenata >= 0 ) return;
  momenti();
  aldonaTrenata = i;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  markiDesegnon();
}
export function sxangiAldonaPozicion(mx, mz) {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[aldonaTrenata];
  if ( !b ) return;
  b.x = Math.round(( mx - kradoOfsX ) * 2) / 2;
  b.z = Math.round(( mz - kradoOfsZ ) * 2) / 2;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  markiDesegnon();
}
export function finiAldonaTrenon() {
  if ( aldonaTrenata < 0 ) return;
  aldonaTrenata = -1;
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
  markiDesegnon();
}

// gxisdatigiVojajnRegilojn — sxargu la vojojn, punktojn, dokojn kaj la sxipon
// en la regilojn de la Vojoj sub-langeto ( la elektitaj restas elektitaj ).
export function gxisdatigiVojajnRegilojn() {
  if ( !vojoElektilo ) return;
  // La krada plano dependas de la mond-nivelaj vojoj ( la konektaj stubs ) —
  // ĉiu ŝanĝo ĉi tie malnovigas la kaŝon. La 3D-vojoj rekonstruiĝas ĉe ĉiu
  // ŝanĝo, sed NE dum la treno ( la 2D-mapo montras la vivan trenon; la 3D
  // refreŝiĝas ĉe la fino ).
  kradaPlanoCache = null;
  if ( bildilo3d && !vojaTrenata ) rekonstruiVojojn3D();
  vojoElektilo.innerHTML = "";
  vojoj.forEach(( v, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = ( v.nomo || "Vojo" ) + " ( " + v.punktoj.length + " pkt )";
    vojoElektilo.appendChild(o);
  });
  elektitaVojo = Math.max(0, Math.min(vojoj.length - 1, elektitaVojo));
  vojoElektilo.value = String(elektitaVojo);
  vojoForigiBtn.disabled = vojoj.length <= 1;
  const v = vojoj[elektitaVojo];
  if ( v ) {
    vojoNomoEl.value = v.nomo || "";
    vojoLargxoEl.value = String(v.larĝo || 0o7/0o2);
    vojoPunktoElektilo.innerHTML = "";
    v.punktoj.forEach(( p, j ) => {
      const o = document.createElement("option");
      o.value = String(j);
      o.textContent = "Punkto " + ( j + 1 ) + " ( " + p[0] + ", " + p[1] + " )";
      vojoPunktoElektilo.appendChild(o);
    });
    elektitaPunkto = Math.max(0, Math.min(v.punktoj.length - 1, elektitaPunkto));
    vojoPunktoElektilo.value = String(elektitaPunkto);
    vojoPunktoForigiBtn.disabled = v.punktoj.length <= 2;
    const p = v.punktoj[elektitaPunkto];
    if ( p ) {
      vojoPunktoXEl.value = String(p[0]);
      vojoPunktoZEl.value = String(p[1]);
    }
  } else {
    vojoNomoEl.value = "";
    vojoLargxoEl.value = "3.5";
    vojoPunktoElektilo.innerHTML = "";
    vojoPunktoForigiBtn.disabled = true;
  }
  dokoElektilo.innerHTML = "";
  dokoj.forEach(( d, i ) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = "Doko " + ( i + 1 ) + " ( " + d.x + ", " + d.z + " )";
    dokoElektilo.appendChild(o);
  });
  elektitaDoko = Math.max(0, Math.min(dokoj.length - 1, elektitaDoko));
  dokoElektilo.value = String(elektitaDoko);
  dokoForigiBtn.disabled = dokoj.length <= 1;
  const d = dokoj[elektitaDoko];
  if ( d ) {
    dokoXEl.value = String(d.x);
    dokoZEl.value = String(d.z);
    dokoProfundoEl.value = String(d.profundo || 16);
    dokoRotacioEl.value = String(d.rotacio ?? 0);
  }
  gxisdatigiVojaStatistikojn();
}

// skribiVojajnRegilojn — legu la regilojn en la staton kaj marku la datumaron
// sxangxita ( la savo skribas SKULPTA_VOJOJ kaj SKULPTA_DOKOJ ).
function skribiVojajnRegilojn() {
  const v = vojoj[elektitaVojo];
  if ( v ) {
    v.nomo = vojoNomoEl.value;
    v.larĝo = parseFloat(vojoLargxoEl.value) || 0o7/0o2;
    const p = v.punktoj[elektitaPunkto];
    // La tajpitaj valoroj estas prenataj kiel ili estas ( nur la mapo-treno
    // algluas al 0.5 — la sxargitaj riverbordaj valoroj restu netusxataj ).
    if ( p ) {
      p[0] = parseFloat(vojoPunktoXEl.value) || 0;
      p[1] = parseFloat(vojoPunktoZEl.value) || 0;
    }
  }
  const d = dokoj[elektitaDoko];
  if ( d ) {
    d.x = parseFloat(dokoXEl.value) || 0;
    d.z = parseFloat(dokoZEl.value) || 0;
    d.profundo = Math.max(4, parseFloat(dokoProfundoEl.value) || 16);
    // La turno ( kiel la metitaj objektoj ) — la pinto de la doko montras al la
    // akvo. 0 = suden ( la kajo de la urbo ), Math.PI = norden ( la
    // malproksima riverbordo ).
    d.rotacio = parseFloat(dokoRotacioEl.value) || 0;
  }
  markiSxangxitan();
}

function skribiVojoSekure() {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  const kopio = { ...v, punktoj: v.punktoj.map( p => [ ...p ] ) };
  const kunfandisAntaŭ = vojoKunfandiĝas( v, elektitaVojo );
  v.nomo = vojoNomoEl.value;
  v.larĝo = parseFloat( vojoLargxoEl.value ) || 0o7/0o2;
  const p = v.punktoj[elektitaPunkto];
  if ( p ) {
    p[0] = parseFloat( vojoPunktoXEl.value ) || 0;
    p[1] = parseFloat( vojoPunktoZEl.value ) || 0;
  }
  if ( p && ( elektitaPunkto === 0 || elektitaPunkto === v.punktoj.length - 1 ) ) {
    const najbaro = elektitaPunkto === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
    const algluo = vojaAlgluo( p[0], p[1], elektitaVojo, najbaro );
    if ( algluo ) {
      p[0] = algluo[0];
      p[1] = algluo[1];
    }
  }
  if ( vojoKunfandiĝas( v, elektitaVojo ) && !kunfandisAntaŭ ) {
    vojoj[elektitaVojo] = kopio;
    statuso( "Tajlita vojo estis malakceptita pro interkovrido 🛑" );
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

function skribiDokoSekure() {
  const d = dokoj[elektitaDoko];
  if ( !d ) return;
  const kopio = { ...d };
  const kunfandisAntaŭ = dokoKunfandiĝas( d, elektitaDoko );
  d.x = parseFloat( dokoXEl.value ) || 0;
  d.z = parseFloat( dokoZEl.value ) || 0;
  d.profundo = Math.max( 4, parseFloat( dokoProfundoEl.value ) || 16 );
  d.rotacio = parseFloat( dokoRotacioEl.value ) || 0;
  konektiDokonAlVojo( d, elektitaDoko );
  if ( dokoKunfandiĝas( d, elektitaDoko ) && !kunfandisAntaŭ ) {
    dokoj[elektitaDoko] = kopio;
    statuso( "Tajlita doko estis malakceptita pro interkovrido 🛑" );
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// gxisdatigiVojaStatistikojn — la voja statistiklinio ( kvanto kaj longo ).
function gxisdatigiVojaStatistikojn() {
  const el = document.getElementById("vojaStatistikoj");
  if ( !el ) return;
  const longo = vojoj.reduce(( s, v ) => s + v.punktoj.reduce(( a, p, i ) => {
    if ( i === 0 ) return a;
    const q = v.punktoj[i - 1];
    return a + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0), 0);
  const kunfandajxoj = vojajKunfandajxoj();
  el.textContent = vojoj.length + " vojoj ( " + longo.toFixed(1) + " un ) · "
    + dokoj.length + " dokoj · " + vojaKunigoj() + " kunigoj 🔗 · "
    + ( kunfandajxoj.totalo ? kunfandajxoj.totalo + " interkovridoj ( "
      + kunfandajxoj.vojoVojo + " vojo-vojo, " + kunfandajxoj.vojoDoko
      + " vojo-doko, " + kunfandajxoj.dokoDoko + " doko-doko ) ⚠️" : "0 interkovridoj ✓" );
}

// vojaKunigoj — kiom da voj-finoj sidas sur ALIA vojo ( vertico aux segmento ).
// La statistiko montras, ĉu la reto vere estas konektita — sen la algluo la
// vojoj aspektas ligitaj sur la mapo sed lasas fendetojn en la ludo.
//     @returns kunigoj ( number ) - La nombro de konektitaj finoj.
function vojaKunigoj() {
  let kunigoj = 0;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    if ( v.punktoj.length < 2 ) continue;
    for ( const pi of [ 0, v.punktoj.length - 1 ] ) {
      const p = v.punktoj[pi];
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
      if ( vojaAlgluo( p[0], p[1], vi, najbaro ) ) kunigoj++;
    }
  }
  for ( const d of dokoj ) {
    if ( vojoj.some( v => dokoKonektasVojon( d, v ) ) ) kunigoj++;
  }
  return kunigoj;
}

const VOJA_TUSXA_TOLERANCO = 0o1/0o1000;

export function vojaDuonLargho( v ) {
  return retoVojaDuonLargho( v );
}

function vojaKunigaDuono( v ) {
  return retoVojaKunigaDuono( v );
}

export function pontoDuonLargho( v ) {
  return retoPontoDuonLargho( v );
}



function vojoKunfandiĝas( v, kromVojo ) {
  return retoVojoKunfandiĝas( v, vojoj, dokoj, kromVojo );
}

function dokoKunfandiĝas( d, kromDoko, kromVojo = -1 ) {
  return retoDokoKunfandiĝas( d, dokoj, vojoj, kromDoko, kromVojo );
}

function dokoKonektasVojon( d, v ) {
  return dokoKonektasVojonReto( d, v );
}

function vojaProjekcio( px, pz, a, b ) {
  return retoVojaProjekcio( px, pz, a, b );
}

function plejProximaVojo( px, pz, kromVojo = -1 ) {
  return retoPlejProximaVojo( px, pz, vojoj, kromVojo );
}

function konektiDokonAlVojo( d, kromDoko ) {
  const akvas = akvaRezulto ? cxuAkvo : undefined;
  return retoKonektiDokonAlVojo( d, vojoj, dokoj, kromDoko, akvas );
}

function konektiDokojnAlVojojn() {
  let kunigoj = 0;
  for ( let di = 0; di < dokoj.length; di++ ) {
    if ( konektiDokonAlVojo( dokoj[di], di ) ) kunigoj++;
  }
  return kunigoj;
}

function vojajKunfandajxoj() {
  return retoVojajKunfandajxoj( vojoj, dokoj );
}

// urboCxePunkto — la indekso de la urbo kies markilo kovras la mondan punkton
// ( komparata sur la ekrano ). -1 se neniu. La sama mondo → ekrano transformo
// kiel en desegniVidon.
export function urboCxePunkto(mx, mz) {
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  const sx = duonw - ( mx - vidCX ) * vidSkalo;
  const sy = duonh - ( mz - vidCZ ) * vidSkalo;
  for ( let i = 0; i < urboj.length; i++ ) {
    const u = urboj[i];
    const ux = duonw - ( u.ofsX - vidCX ) * vidSkalo;
    const uz = duonh - ( u.ofsZ - vidCZ ) * vidSkalo;
    if ( Math.hypot(ux - sx, uz - sy) < 12 ) return i;
  }
  return -1;
}

// vojaCeloCxePunkto — la celo de la Vojoj sub-langeto sub la monda punkto,
// aux null. La elektada ordo — la punktoj de la vojoj unue ( la plej proksima
// ene de la ekrana radiuso ), poste la dokoj, kaj la voja linio
// ( la plej proksima segmento ) laste.
function vojaCeloCxePunkto(mx, mz) {
  const r = 8 / vidSkalo;
  let plej = null, plejD = r;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length; pi++ ) {
      const p = v.punktoj[pi];
      const d = Math.hypot(p[0] - mx, p[1] - mz);
      if ( d < plejD ) { plejD = d; plej = { speco: "punkto", vojo: vi, punkto: pi }; }
    }
  }
  if ( plej ) return plej;
  // La dokoj — la punkto transformiĝas en la LOKAN kadron de la doko ( la
  // inversa turno ), do ankaŭ turnita platformo kaptiĝas per sia vera areo.
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di];
    const prof = d.profundo || 16;
    const rotacio = d.rotacio ?? 0;
    const dx = mx - d.x, dz = mz - d.z;
    const lx = dx * Math.cos(rotacio) - dz * Math.sin(rotacio);
    const lz = dx * Math.sin(rotacio) + dz * Math.cos(rotacio);
    if ( Math.abs(lx) < 0o16/0o10 + 0o5/0o2 && Math.abs(lz) < prof / 2 + 0o5/0o2 ) return { speco: "doko", doko: di };
  }
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( mx - a[0] ) * ( b[0] - a[0] ) + ( mz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - mx, a[1] + t * ( b[1] - a[1] ) - mz);
      if ( d < ( v.larĝo || 0o7/0o2 ) / 2 + 0o3/0o2 + r ) return { speco: "vojo", vojo: vi };
    }
  }
  return null;
}

// sxangxiVojanCelon — la klako-redaktado sur la 2D-mapo en la Vojoj
// sub-langeto de la Krado-panelo.
// la sub-ilo decidas. Elektu/Movu ✋ elektas la plej proksiman punkton, dokon
// aux la sxipon ( kaj kaptas gxin por treni ); klako sur la vojan linion
// elektas la vojon. Aldoni punkton ➕ enmetas punkton en la elektitan vojon.
// Forigi punkton 🗑️ forigas la plej proksiman punkton.
export function sxangxiVojanCelon(mx, mz) {
  const proks = vojaCeloCxePunkto(mx, mz);
  if ( vojaIlo === "forigi" ) {
    if ( proks && proks.speco === "punkto" ) forigiVojanPunkton(proks.vojo, proks.punkto);
    return;
  }
  if ( proks && proks.speco === "punkto" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = proks.punkto;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "punkto", vojo: proks.vojo, punkto: proks.punkto });
  } else if ( proks && proks.speco === "doko" ) {
    elektitaDoko = proks.doko;
    if ( vojaIlo === "movu" ) komenciVojaTrenon({ speco: "doko", doko: proks.doko });
  } else if ( proks && proks.speco === "vojo" ) {
    elektitaVojo = proks.vojo;
    elektitaPunkto = -1;
  } else if ( vojaIlo === "aldoni" ) {
    aldoniVojanPunkton(mx, mz);
    return;
  } else {
    elektitaPunkto = -1;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// komenciVojaTrenon — kaptu punkton, dokon aux la sxipon por Elektu/Movu ✋
// ( la movo estas malfarebla — la historio momentigxas cxe la kapto ).
function komenciVojaTrenon(celo) {
  if ( vojaTrenata ) return;
  momenti();
  vojaTrenata = celo;
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  markiDesegnon();
}

// sxangiVojaPozicion — gxisdatigu la pozicion de la trenata celo ( algluita
// al 0.5 ) dum Elektu/Movu ✋.
// kradaVojaAlglu — la plej proksima krada vojo-linio ( la voja reto de la
// nuna urbo ) ĉe la monda punkto, aux null. NS-vojoj. vertikala linio ĉe fiksa
// x; EW-vojoj. horizontala ĉe fiksa z. La treno de voja punkto algluiĝas al la
// linio ene de la rando, por ke la vojo KONEKTIĜU al la krado.
function kradaVojaAlglu(mx, mz) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  let plej = null, plejD = rando;
  for ( const r of plano.vojoj ) {
    if ( r.orient === "NS" ) {
      const wx = ofsX + r.poz;
      const d = Math.abs(mx - wx);
      // La libera koordinato restas sur la sama 0.5-krado kiel la aliaj punktoj.
      // NENIU etenda limo. la punkto povas gliti sur la linion ankaux preter la
      // urba intervalo — la vojo tiam DAŬRIGAS la kradan linion ( la avenuo
      // suden de la ĉefurbo estas la ekzemplo ) kaj KONEKTIĜAS al la krado.
      if ( d < plejD ) { plejD = d; plej = [ wx, Math.round(mz * 2) / 2 ]; }
    } else {
      const wz = ofsZ + r.poz;
      const d = Math.abs(mz - wz);
      if ( d < plejD ) { plejD = d; plej = [ Math.round(mx * 2) / 2, wz ]; }
    }
  }
  return plej;
}
// kradaSegmentoAlglu — la TUTA segmento A→B algluiĝas al la krada voja
// reto. se la segmento estas preskaŭ paralela al krada vojo-linio kaj ĉiu
// punkto de ĝi restas ene de la alglua rando ( 2.5 ) de tiu linio, ĝi glitas
// sur la linion — ambaŭ finoj samlinias, do la segmento KONEKTIĜAS al la
// krado ( ne nur unu finpunkto ). Revenas { linioX } aŭ { linioZ } ( la monda
// pozicio de la linio ) aŭ null.
function kradaSegmentoAlglu(ax, az, bx, bz) {
  const plano = kradoPlano();
  const ofsX = kradoOfsX, ofsZ = kradoOfsZ;
  const rando = 0o5/0o2;
  const dx = bx - ax, dz = bz - az;
  if ( Math.hypot(dx, dz) < 1e-6 ) return null;
  // NS — preskaŭ-vertikala segmento ( la angulo al la vertikalo ≤ ~14° )
  // proksime al NS-linio. NENIU etenda limo. la segmento povas gliti sur la
  // linion ankaux preter la urba intervalo kaj tiam DAŬRIGAS la kradan
  // linion ( samkiel la finpunkto-algluo ).
  if ( Math.abs(dx) <= 0o1/0o4 * Math.abs(dz) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "NS" ) continue;
      const wx = ofsX + r.poz;
      const d = Math.max(Math.abs(ax - wx), Math.abs(bx - wx));
      if ( d < plejD ) { plejD = d; plej = wx; }
    }
    if ( plej !== null ) return { linioX: plej, linioZ: null };
  }
  // EW — preskaŭ-horizontala segmento proksime al EW-linio.
  if ( Math.abs(dz) <= 0o1/0o4 * Math.abs(dx) ) {
    let plej = null, plejD = rando;
    for ( const r of plano.vojoj ) {
      if ( r.orient !== "EW" ) continue;
      const wz = ofsZ + r.poz;
      const d = Math.max(Math.abs(az - wz), Math.abs(bz - wz));
      if ( d < plejD ) { plejD = d; plej = wz; }
    }
    if ( plej !== null ) return { linioX: null, linioZ: plej };
  }
  return null;
}
// ⟨ Aŭtomata konekto de la vojoj 📃 ⟩ — la vojoj KONEKTIĜU inter si, por ke
// la konstruanto ne tajpu la samajn koordinatojn dufoje kaj por ke la vojoj ne
// interkovriĝu per duonnajbaraj strioj. La algluo serĉas sur la ALIAJ
// mond-nivelaj vojoj kaj revenas la mondan punkton, sur kiu la trenata punkto
// sidiĝu.
//   · VERTICO — se alia vojo havas verticon ene de la rando, la punkto sidiĝas
//     ĜUSTE sur ĝin — du vojoj tiam KUNHAVAS la saman punkton ( vera kunigo de
//     fino al fino aŭ de fino al angulo, kiel la avenuo ĉe la kajo ).
//   · SEGMENTO — alie, se la punkto estas apud la CENTRA LINIO de alia vojo, ĝi
//     sidiĝas sur la projekcion — la vojo tiam aliĝas MEZE de la alia ( la
//     T-kunigo de la ponto al la norda kajo ). La kunigo sidas precize sur la
//     linio kaj ne sur la 0.5-krado — la du vojoj tiel ne povas duon-kunfali.
// La SAMA vojo neniam algluiĝas al si — ĝiaj propraj segmentoj estas la vojo
// mem, kaj punkto sur ili ne estas kunigo.
//     @param mx, mz ( number ) - La mondo-punkto de la kursoro.
//     @param kromVojo ( number ) - La indekso de la trenata vojo.
//     @returns punkto ( [ number, number ] | null ) - La kuniga punkto.
const VOJA_ALGLUA_RANDO = 0o5/0o2;
function vojaAlgluo( mx, mz, kromVojo, najbaro = null ) {
  let plej = null, plejD = Infinity;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    if ( vi === kromVojo ) continue;
    const v = vojoj[vi];
    const duono = vojaKunigaDuono( v );
    const rando = VOJA_ALGLUA_RANDO + duono;
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const projekcio = vojaProjekcio( mx, mz, a, b );
      if ( !projekcio || projekcio.d > rando ) continue;
      const dx = b[0] - a[0], dz = b[1] - a[1], longo = Math.hypot( dx, dz );
      const nx = -dz / longo, nz = dx / longo;
      const flankX = najbaro ? najbaro[0] : mx, flankZ = najbaro ? najbaro[1] : mz;
      const flankoValoro = ( flankX - projekcio.x ) * nx + ( flankZ - projekcio.z ) * nz;
      const flanko = Math.abs( flankoValoro ) < VOJA_TUSXA_TOLERANCO
        ? ( ( mx - projekcio.x ) * nx + ( mz - projekcio.z ) * nz >= 0 ? 1 : -1 )
        : ( flankoValoro >= 0 ? 1 : -1 );
      const kandidato = [ projekcio.x + nx * duono * flanko, projekcio.z + nz * duono * flanko ];
      const kandidataD = Math.hypot( kandidato[0] - mx, kandidato[1] - mz );
      if ( kandidataD < plejD ) { plejD = kandidataD; plej = kandidato; }
    }
  }
  for ( let di = 0; di < dokoj.length; di++ ) {
    const d = dokoj[di], r = retoDokoLandaSegmento( d );
    const projekcio = vojaProjekcio(mx, mz, [ r.x - r.dx * DOKO_PLATFORMA_LARĜO / 2, r.z - r.dz * DOKO_PLATFORMA_LARĜO / 2 ],
      [ r.x + r.dx * DOKO_PLATFORMA_LARĜO / 2, r.z + r.dz * DOKO_PLATFORMA_LARĜO / 2 ]);
    if ( !projekcio || projekcio.d > VOJA_ALGLUA_RANDO + DOKO_PLATFORMA_LARĜO / 2 ) continue;
    const kandidataD = Math.hypot( projekcio.x - mx, projekcio.z - mz );
    if ( kandidataD < plejD ) { plejD = kandidataD; plej = [ projekcio.x, projekcio.z ]; }
  }
  return plej;
}

// forigiDuoblajnPunktojn — forigu sinsekvajn punktojn kiuj sidas sur la sama
// loko. La kunigo de du finoj ( aux la treno de punkto sur sian najbaron )
// lasas duoblan punkton, kiu produktas NULAN segmenton — la voja moduo desegnas
// ĝin kiel videblan kudron, kaj la polilinio raportas falsan longon.
//     @param v ( object ) - La vojo ( la punktoj sxangxigxas surloke ).
//     @returns forigitaj ( number ) - Kiom da punktoj foriĝis.
function forigiDuoblajnPunktojn(v) {
  let forigitaj = 0;
  for ( let i = v.punktoj.length - 1; i > 0 && v.punktoj.length > 2; i-- ) {
    const a = v.punktoj[i], b = v.punktoj[i - 1];
    if ( Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6 ) { v.punktoj.splice(i, 1); forigitaj++; }
  }
  return forigitaj;
}

// konektiVojajnFinojn — kunigu la du FINOJN de ĉiu vojo kun la ceteraj vojoj
// ( vertico aux segmento ) se ili estas ene de la alglua rando, kaj forigu la
// duoblajn punktojn. Nur la FINOJ moviĝas — la mezo kaj la formo de ĉiu vojo
// restas tiaj, kiaj la konstruanto desegnis ilin.
//     @returns kunigoj ( number ) - Kiom da finoj sidiĝis sur alian vojon.
function konektiVojajnFinojn() {
  let kunigoj = 0;
  for ( let vi = 0; vi < vojoj.length; vi++ ) {
    const v = vojoj[vi];
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    const lasta = v.punktoj.length - 1;
    for ( const pi of [ 0, lasta ] ) {
      const p = v.punktoj[pi], malnova = [ p[0], p[1] ];
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[lasta - 1];
      const algluo = vojaAlgluo( p[0], p[1], vi, najbaro );
      if ( !algluo ) continue;
      if ( Math.hypot( algluo[0] - p[0], algluo[1] - p[1] ) < 1e-6 ) continue;
      const kiuKunfandisAntaŭ = vojoKunfandiĝas( v, vi );
      p[0] = algluo[0];
      p[1] = algluo[1];
      if ( vojoKunfandiĝas( v, vi ) && ! kiuKunfandisAntaŭ ) {
        p[0] = malnova[0];
        p[1] = malnova[1];
        continue;
      }
      kunigoj++;
    }
    forigiDuoblajnPunktojn(v);
  }
  return kunigoj;
}

export function sxangiVojaPozicion(mx, mz) {
  if ( !vojaTrenata ) return;
  const c = vojaTrenata;
  if ( c.speco === "punkto" ) {
    const v = vojoj[c.vojo];
    if ( !v || !v.punktoj[c.punkto] ) return;
    const pi = c.punkto;
    const malnovaj = new Map();
    for ( const ni of [ pi - 1, pi, pi + 1 ] ) {
      if ( ni >= 0 && ni < v.punktoj.length ) malnovaj.set( ni, [ ...v.punktoj[ni] ] );
    }
    // La algluo, en la ordo de la forto — la krada reto unue ( la vojo
    // KONEKTIĜU al la urbo ), poste la ALIAJ mond-nivelaj vojoj ( la vojoj
    // KONEKTIĜU inter si ), laste la libera 0.5-krado.
    const kradaAlgluo = kradaVojaAlglu(mx, mz);
    let gx, gz;
    if ( kradaAlgluo ) {
      gx = kradaAlgluo[0];
      gz = kradaAlgluo[1];
    } else {
      const najbaro = pi === 0 ? v.punktoj[1] : v.punktoj[v.punktoj.length - 2];
      const voja = vojaAlgluo( mx, mz, c.vojo, najbaro );
      if ( voja ) { gx = voja[0]; gz = voja[1]; }
      else { gx = Math.round(mx * 2) / 2; gz = Math.round(mz * 2) / 2; }
    }
    // La SEGMENTO-algluo — se najbara segmento ( najbaro → la trenata punkto )
    // estas preskaŭ paralela al krada vojo-linio kaj proksima, ankaŭ la najbaro
    // glitas sur la linion. La tuta segmento tiam estas samlinia kaj KONEKTIĜAS
    // al la krado ( ne nur la finpunkto ). Ĉe du fluigitaj segmentoj la punkto
    // venas al la linia intersekco.
    let linioX = null, linioZ = null;
    for ( const ni of [ pi - 1, pi + 1 ] ) {
      const n = v.punktoj[ni];
      if ( !n ) continue;
      const s = kradaSegmentoAlglu(n[0], n[1], gx, gz);
      if ( !s ) continue;
      if ( s.linioX !== null ) { n[0] = s.linioX; linioX = s.linioX; }
      else { n[1] = s.linioZ; linioZ = s.linioZ; }
    }
    if ( linioX !== null ) gx = linioX;
    if ( linioZ !== null ) gz = linioZ;
    v.punktoj[pi] = [ gx, gz ];
    if ( vojoKunfandiĝas( v, c.vojo ) ) {
      for ( const [ ni, p ] of malnovaj ) v.punktoj[ni] = p;
      statuso( "Tiu vojo interkovrus sin aŭ dokon 🛑" );
      return;
    }
    elektitaPunkto = pi;
  } else if ( c.speco === "doko" ) {
    const d = dokoj[c.doko];
    if ( !d ) return;
    const kandidato = { ...d, x: Math.round(mx * 2) / 2, z: Math.round(mz * 2) / 2 };
    const projekcio = plejProximaVojo( kandidato.x, kandidato.z );
    const rando = ( kandidato.profundo || 16 ) / 2 + VOJA_ALGLUA_RANDO;
    if ( projekcio && projekcio.d <= rando ) {
      kandidato.rotacio = Math.atan2( -projekcio.dz, projekcio.dx );
      const duonZ = ( kandidato.profundo || 16 ) / 2;
      kandidato.x = projekcio.x - Math.sin( kandidato.rotacio ) * duonZ;
      kandidato.z = projekcio.z - Math.cos( kandidato.rotacio ) * duonZ;
    }
    if ( dokoKunfandiĝas( kandidato, c.doko ) ) {
      statuso( "Tiu doko interkovrus vojon aŭ dokon 🛑" );
      return;
    }
    d.x = kandidato.x;
    d.z = kandidato.z;
    if ( kandidato.rotacio !== undefined ) d.rotacio = kandidato.rotacio;
    elektitaDoko = c.doko;
  }
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// staciaPozicio — la monda pozicio de la cefa stacio ( la stacia aldona
// bloko de la cefa urbo, aux la defaŭlta pozicio — ofseto + stacioZ por la
// unu-bloka, la centro por la kvar-bloka ).
function staciaPozicio() {
  const u = urboj[0];
  if ( !u ) return null;
  const blokoj = u.aldonajBlokoj && u.aldonajBlokoj.length ? u.aldonajBlokoj : null;
  const stacio = blokoj ? ( blokoj.find(b => b.stacia) || blokoj[0] ) : null;
  if ( stacio ) return [ u.ofsX + stacio.x, u.ofsZ + stacio.z ];
  const pasxo = u.blokaGrando === "kvar" ? 0o40 : 0o30;
  const stacioZ = u.blokaGrando === "kvar" ? 0 : u.arangxaGrando * pasxo + 0o30;
  return [ u.ofsX, u.ofsZ + stacioZ ];
}
export function finiVojaTrenon() {
  if ( !vojaTrenata ) return;
  // La treno finiĝis — la kuniĝinta punkto restas sur la alia vojo, kaj
  // eventualaj duoblaj punktoj ( treno sur la propran najbaron ) foriĝas.
  if ( vojaTrenata.speco === "punkto" ) {
    const v = vojoj[vojaTrenata.vojo];
    if ( v ) forigiDuoblajnPunktojn(v);
  }
  vojaTrenata = null;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// aldoniVojanPunkton — enmetu punkton en la elektitan vojon cxe la klako
// ( sur la plej proksima segmento — la punkto dividas la segmenton; se la
// vojo havas nur unu punkton, la nova punkto metigxas cxe la klako mem ).
function aldoniVojanPunkton(mx, mz) {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  const kopio = { ...v, punktoj: v.punktoj.map( p => [ ...p ] ) };
  const kunfandisAntaŭ = vojoKunfandiĝas( v, elektitaVojo );
  momenti();
  // La klako algluiĝas al la krada voja reto se ĝi estas proksime al krada
  // vojo-linio — la nova punkto tiam KONEKTIĜAS la vojon al la krado
  // ( samkiel la treno de punkto en Elektu/Movu ✋ ).
  const algluo = kradaVojaAlglu(mx, mz);
  const gx = algluo ? algluo[0] : mx, gz = algluo ? algluo[1] : mz;
  if ( v.punktoj.length < 2 ) {
    v.punktoj.push([ Math.round(gx * 2) / 2, Math.round(gz * 2) / 2 ]);
    elektitaPunkto = v.punktoj.length - 1;
  } else {
    let plej = 0, plejD = Infinity, plejT = 0;
    for ( let pi = 0; pi < v.punktoj.length - 1; pi++ ) {
      const a = v.punktoj[pi], b = v.punktoj[pi + 1];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = Math.max(0, Math.min(1, ( ( gx - a[0] ) * ( b[0] - a[0] ) + ( gz - a[1] ) * ( b[1] - a[1] ) ) / ( l * l )));
      const d = Math.hypot(a[0] + t * ( b[0] - a[0] ) - gx, a[1] + t * ( b[1] - a[1] ) - gz);
      if ( d < plejD ) { plejD = d; plej = pi; plejT = t; }
    }
    const a = v.punktoj[plej], b = v.punktoj[plej + 1];
    // La SEGMENTO-algluo — se la dividata segmento ( a→b ) estas preskaŭ
    // paralela al krada vojo-linio kaj proksima, la TUTA segmento glitas sur
    // la linion. a, b kaj la nova punkto samlinias, do la segmento ( kaj la
    // du novaj duonsegmentoj ) KONEKTIĜAS al la krado.
    const seg = kradaSegmentoAlglu(a[0], a[1], b[0], b[1]);
    let nx, nz;
    if ( seg ) {
      if ( seg.linioX !== null ) {
        a[0] = seg.linioX; b[0] = seg.linioX;
        nx = seg.linioX;
        nz = Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
      } else {
        a[1] = seg.linioZ; b[1] = seg.linioZ;
        nz = seg.linioZ;
        nx = Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      }
    } else {
      // Algluita punkto restas SUR la krada linio; alie la projekcio sur la
      // segmenton ( 0.5-algluita ).
      nx = algluo ? gx : Math.round(( a[0] + plejT * ( b[0] - a[0] ) ) * 2) / 2;
      nz = algluo ? gz : Math.round(( a[1] + plejT * ( b[1] - a[1] ) ) * 2) / 2;
    }
    v.punktoj.splice(plej + 1, 0, [ nx, nz ]);
    elektitaPunkto = plej + 1;
  }
  if ( vojoKunfandiĝas( v, elektitaVojo ) && !kunfandisAntaŭ ) {
    vojoj[elektitaVojo] = kopio;
    elektitaPunkto = Math.min( elektitaPunkto, kopio.punktoj.length - 1 );
    statuso( "Nova punkto interkovrus vojon aŭ dokon 🛑" );
    gxisdatigiVojajnRegilojn();
    markiDesegnon();
    return;
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// forigiVojanPunkton — forigu la punkton ( la vojo restas kun almenaux 2 ).
function forigiVojanPunkton(vi, pi) {
  const v = vojoj[vi];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(pi, 1);
  elektitaVojo = vi;
  elektitaPunkto = Math.max(0, pi - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
}

// sxangxiKradanCelon — la klako-redaktado sur la 2D-mapo. la elektita paletra
// tipo metas sur la ĉelon ( aŭ ALDONAS novan ĉelon ĉe la klakita pozicio );
// Aŭtomata ⚙️ forigas la superon — la ĉelo revenas al la generita tipo, aŭ
// foriĝas se ĝi estis aldonita.
export function sxangxiKradanCelon(mx, mz) {
  const plano = kradoPlano();
  const PASXO = plano.PASXO;
  const c = Math.round(( mx - kradoOfsX ) / PASXO);
  const r = Math.round(( mz - kradoOfsZ ) / PASXO);
  // La kvar-bloka krado — la klako ŝanĝas la INDIVIDUAN konstruajxon ( la
  // sub-blokon ) sub la kursoro, ne la tutan blokon. La sub-pozicio estas la
  // plej proksima angulo ( NE, NW, SW, SE je ±BLOKO — 8 ).
  if ( kradoBloko === "kvar" ) {
    const BLOKO = 0o10;
    const cx = kradoOfsX + c * PASXO, cz = kradoOfsZ + r * PASXO;
    let plej = "NE", plejD = Infinity;
    for ( const [ sx, sz, nomo ] of [ [ BLOKO, BLOKO, "NE" ], [ -BLOKO, BLOKO, "NW" ], [ -BLOKO, -BLOKO, "SW" ], [ BLOKO, -BLOKO, "SE" ] ] ) {
      const d = Math.hypot(mx - ( cx + sx ), mz - ( cz + sz ));
      if ( d < plejD ) { plejD = d; plej = nomo; }
    }
    const ŝ = c + "," + r + "," + plej;
    if ( kradoTipoElektita === "automata" ) {
      if ( !kradoSuperoj.delete(ŝ) ) return;   // neniu sub-supero — nenio ŝanĝiĝas
    } else {
      // Limoj — la krado povas etendiĝi nur al la rando de la mondo.
      if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
      kradoSuperoj.set(ŝ, kradoTipoElektita);
    }
    sinkronigiSuperojn();
    gxisdatigiKradon();
    return;
  }
  const ŝ = c + "," + r;
  if ( kradoTipoElektita === "automata" ) {
    if ( !kradoSuperoj.delete(ŝ) ) return;   // neniu supero — nenio ŝanĝiĝas
  } else {
    // Limoj — la krado povas etendiĝi nur al la rando de la mondo.
    if ( Math.abs(c * PASXO + kradoOfsX) > MONDO_HALFO || Math.abs(r * PASXO + kradoOfsZ) > MONDO_HALFO ) return;
    kradoSuperoj.set(ŝ, kradoTipoElektita);
  }
  sinkronigiSuperojn();
  markiSxangxitan();
  statuso("Nesavitaj ŝanĝoj");
  gxisdatigiKradon();
}

// desegniKradanTavolon — la krada urbo sur AJNA kunteksto. vojoj ( larĝaj
// strioj ), spronoj ( maldikaj linioj ) kaj konstruaĵoj ( kvadratoj turnitaj
// per la rotacio, kun blanka pordo-punkto — la pordoj kaj la turnitaj
// kvar-blokaj konstruaĵoj videblas ). X/Z mapas la planajn koordinatojn
// ( relativaj al la krada centro ) al pikseloj; skalo estas pikseloj po
// mond-unuo. La tavolo desegniĝas sur la 2D-mapo ( kun la vido kaj la
// ofseto ).
const KRADAJ_KOLOROJ = {
  sanktejo: "#e0b840",
  turo: "#98a8b8",
  domo: "#c08858",
  mangxejo: "#e07050",
  kasafeo: "#6898d8",
  stacio: "#9868e0",
};
export function desegniKradanTavolon(k, plano, X, Z, skalo) {
  // Vojoj — la samaj segmentoj kiel la ludo ( plena larĝo 3.5 ).
  k.lineWidth = 0o7/0o2 * skalo;
  k.strokeStyle = "rgba(218,218,228,0.9)";
  k.beginPath();
  for ( const v of plano.vojoj ) {
    if ( v.orient === "EW" ) { k.moveTo(X(v.de), Z(v.poz)); k.lineTo(X(v.al), Z(v.poz)); }
    else { k.moveTo(X(v.poz), Z(v.de)); k.lineTo(X(v.poz), Z(v.al)); }
  }
  k.stroke();
  // Spronoj — la pordaj vojetoj ( maldikaj ).
  k.lineWidth = Math.max(1, 1.4 * skalo);
  k.strokeStyle = "rgba(255,255,255,0.55)";
  k.beginPath();
  for ( const sp of plano.spronoj ) {
    k.moveTo(X(sp.de[0]), Z(sp.de[1]));
    k.lineTo(X(sp.al[0]), Z(sp.al[1]));
  }
  k.stroke();
  // Konstruaĵoj — kvadratoj ( 8×8 ) turnitaj per la rotacio, la pordo kiel
  // blanka punkto je la porda distanco.
  const radu = 5.657 * skalo;   // la duona diagonalo de 8×8
  for ( const b of plano.konstruaĵoj ) {
    const sx = X(b.x), sy = Z(b.z);
    const koloro = b.stacia ? KRADAJ_KOLOROJ.stacio : KRADAJ_KOLOROJ[b.tipo];
    k.fillStyle = koloro;
    k.beginPath();
    for ( let q = 0; q < 4; q++ ) {
      const ang = b.rot + Math.PI / 4 + q * Math.PI / 2;
      const px = sx + Math.cos(ang) * radu;
      const py = sy + Math.sin(ang) * radu;
      if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
    }
    k.closePath();
    k.fill();
    k.strokeStyle = "rgba(0,0,0,0.35)";
    k.lineWidth = 1;
    k.stroke();
    const pdx = X(b.x + Math.sin(b.rot) * 0o13/0o2);
    const pdz = Z(b.z + Math.cos(b.rot) * 0o13/0o2);
    k.fillStyle = "rgba(255,255,255,0.9)";
    k.beginPath();
    k.arc(pdx, pdz, Math.max(0o3/0o2, 1.2 * skalo), 0, Math.PI * 2);
    k.fill();
  }
}

// La paletro — elektas la tipon por la klako-redaktado. Aŭtomata ⚙️ ( la
// defaŭlto ) resendas la ĉelon al la generita tipo aŭ forigas aldonitan.
document.querySelectorAll("#kradaro button").forEach(b => {
  b.addEventListener("click", () => {
    kradoTipoElektita = b.dataset.kradoTipo;
    document.querySelectorAll("#kradaro button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
// La urbo-elektilo — elekti urbon sxargas gxian aranĝon en la regilojn.
urboElektilo.addEventListener("change", () => elektiUrbon(parseInt(urboElektilo.value, 10) || 0));
urboNomoEl.addEventListener("input", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  u.nomo = urboNomoEl.value;
  gxisdatigiUrboElektilon();
  markiSxangxitan();
  markiDesegnon();
});
urboAldoniBtn.addEventListener("click", () => {
  urboj.push({ nomo: "Nova urbo", arangxaGrando: 1, blokaGrando: "unu", ofsX: 0o200, ofsZ: -0o200, aldonajBlokoj: [] });
  elektiUrbon(urboj.length - 1);
  markiSxangxitan();
  markiDesegnon();
});
urboForigiBtn.addEventListener("click", () => {
  if ( urboj.length <= 1 ) return;
  urboj.splice(elektitaUrbo, 1);
  elektiUrbon(Math.max(0, elektitaUrbo - 1));
  markiSxangxitan();
  markiDesegnon();
});
// La agordoj — ĉiu ŝanĝo rekonstruas la planon tuj kaj skribas reen al la
// elektita urbo ( la savo skribas la urbojn al SKULPTA_URBOJ ).
kradoGrandecoEl.addEventListener("change", () => { kradoGrandeco = parseInt(kradoGrandecoEl.value, 10); skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoBlokoEl.addEventListener("change", () => { kradoBloko = kradoBlokoEl.value; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoOfsXEl.addEventListener("change", () => { kradoOfsX = parseFloat(kradoOfsXEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoOfsZEl.addEventListener("change", () => { kradoOfsZ = parseFloat(kradoOfsZEl.value) || 0; skribiElektitanUrbon(); gxisdatigiUrboElektilon(); gxisdatigiKradon(); });
kradoKeuxfhxesoEl.addEventListener("change", () => { kradoKeuxfhxeso = kradoKeuxfhxesoEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
kradoLampojEl.addEventListener("change", () => { kradoLampoj = kradoLampojEl.checked; skribiElektitanUrbon(); gxisdatigiKradon(); });
// La aldonaj blokoj — ĉiu ŝanĝo skribas la blokon reen al la urbo ( la savo
// skribas la urbojn al SKULPTA_URBOJ ) kaj rekonstruas la planon tuj.
aldonaBlokoElektilo.addEventListener("change", () => {
  elektitaAldonaBloko = parseInt(aldonaBlokoElektilo.value, 10) || 0;
  gxisdatigiAldonaBlokojn();
  markiDesegnon();
});
aldonaBlokoTipoEl.addEventListener("change", () => {
  skribiAldonanBlokon();
  // Stacio 🚀 ( stacia ) kaj la tipo kongruu — tipo ekster "stacio" malŝaltas
  // la stacian flagon ( la flago igas la blokon stacioxipo kaj kaŝas la
  // elektitan tipon ). La malnova datumaro ( sanktejo + stacia ) restas
  // netuŝata ĝis la tipo estas efektive ŝanĝita.
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  const b = blokoj[elektitaAldonaBloko];
  if ( b && b.stacia && b.tipo !== "stacio" ) {
    aldonaBlokoStaciaEl.checked = false;
    skribiAldonanBlokon();
  }
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoXEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoZEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoRotEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiKradon(); });
aldonaBlokoStaciaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoKonektitaEl.addEventListener("change", () => { skribiAldonanBlokon(); gxisdatigiAldonaBlokojn(); gxisdatigiKradon(); });
aldonaBlokoAldoniBtn.addEventListener("click", () => {
  const u = urboj[elektitaUrbo];
  if ( !u ) return;
  momenti();
  if ( !u.aldonajBlokoj ) u.aldonajBlokoj = [];
  const pasxo = kradoBloko === "kvar" ? 0o40 : 0o30;
  const stacioZ = kradoBloko === "kvar" ? 0 : kradoGrandeco * pasxo + 0o30;
  u.aldonajBlokoj.push({ x: 0, z: stacioZ, tipo: "stacio", rot: Math.PI, sub: "centro", stacia: true, konektita: true });
  elektitaAldonaBloko = u.aldonajBlokoj.length - 1;
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
aldonaBlokoForigiBtn.addEventListener("click", () => {
  const u = urboj[elektitaUrbo];
  const blokoj = u && u.aldonajBlokoj ? u.aldonajBlokoj : [];
  if ( !blokoj.length ) return;
  momenti();
  blokoj.splice(elektitaAldonaBloko, 1);
  elektitaAldonaBloko = Math.max(0, elektitaAldonaBloko - 1);
  markiSxangxitan();
  gxisdatigiAldonaBlokojn();
  gxisdatigiKradon();
});
// La Vojoj sub-langeto — ĉiu ŝanĝo skribas la datumojn kaj markas la dosieron
// sxangxita ( la savo skribas SKULPTA_VOJOJ kaj SKULPTA_DOKOJ ).
vojoElektilo.addEventListener("change", () => {
  elektitaVojo = parseInt(vojoElektilo.value, 10) || 0;
  elektitaPunkto = -1;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoNomoEl.addEventListener("input", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  v.nomo = vojoNomoEl.value;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoLargxoEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoPunktoElektilo.addEventListener("change", () => {
  elektitaPunkto = parseInt(vojoPunktoElektilo.value, 10) || 0;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoPunktoXEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoPunktoZEl.addEventListener("change", () => { skribiVojoSekure(); });
vojoAldoniBtn.addEventListener("click", () => {
  momenti();
  const v = vojoj[elektitaVojo];
  const last = v && v.punktoj && v.punktoj.length ? v.punktoj[v.punktoj.length - 1] : [ 0, 0 ];
  const nova = { nomo: "Nova vojo", larĝo: 0o7/0o2, punktoj: [ [ Math.round(( last[0] - 10 ) * 2) / 2, last[1] ], [ Math.round(( last[0] + 10 ) * 2) / 2, last[1] ] ] };
  vojoj.push( nova );
  if ( vojoKunfandiĝas( nova, vojoj.length - 1 ) ) {
    vojoj.pop();
    statuso( "Nova vojo interkovrus ekzistan vojon aŭ dokon 🛑" );
    return;
  }
  elektitaVojo = vojoj.length - 1;
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoForigiBtn.addEventListener("click", () => {
  if ( vojoj.length <= 1 ) return;
  momenti();
  vojoj.splice(elektitaVojo, 1);
  elektitaVojo = Math.max(0, elektitaVojo - 1);
  elektitaPunkto = -1;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
// „Konekti ĉiujn 🔗“ — unu klako kunigas la finojn de ĉiuj vojoj ( la tuta
// reto, ne nur la elektita ) kaj forigas la duoblajn punktojn. La historio
// momentiĝas unufoje, do la tuta konekto malfareblas per unu Ctrl+Z.
vojoKonektiBtn.addEventListener("click", () => {
  momenti();
  let vojajKunigoj = 0, movaj = 0, rondoj = 0;
  do {
    movaj = konektiVojajnFinojn();
    vojajKunigoj += movaj;
  } while ( movaj > 0 && ++rondoj < vojoj.length * 2 );
  const dokojajKunigoj = konektiDokojnAlVojojn();
  movaj = 0;
  rondoj = 0;
  do {
    movaj = konektiVojajnFinojn();
    vojajKunigoj += movaj;
  } while ( movaj > 0 && ++rondoj < vojoj.length * 2 );
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  gxisdatigiKradon();
  statuso( "Konektitaj " + vojajKunigoj + " voj-finoj kaj " + dokojajKunigoj + " dokoj 🔗" );
  markiDesegnon();
});
vojoPunktoAldoniBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v ) return;
  momenti();
  const last = v.punktoj[v.punktoj.length - 1];
  v.punktoj.push([ Math.round(( last[0] + 10 ) * 2) / 2, Math.round(last[1] * 2) / 2 ]);
  elektitaPunkto = v.punktoj.length - 1;
  if ( vojoKunfandiĝas( v, elektitaVojo ) ) {
    v.punktoj.pop();
    elektitaPunkto = v.punktoj.length - 1;
    statuso( "Nova punkto interkovrus vojon aŭ dokon 🛑" );
  }
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
vojoPunktoForigiBtn.addEventListener("click", () => {
  const v = vojoj[elektitaVojo];
  if ( !v || v.punktoj.length <= 2 ) return;
  momenti();
  v.punktoj.splice(elektitaPunkto, 1);
  elektitaPunkto = Math.max(0, elektitaPunkto - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoElektilo.addEventListener("change", () => {
  elektitaDoko = parseInt(dokoElektilo.value, 10) || 0;
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoXEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoZEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoProfundoEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoRotacioEl.addEventListener("change", () => { skribiDokoSekure(); });
dokoAldoniBtn.addEventListener("click", () => {
  momenti();
  const last = dokoj[dokoj.length - 1];
  const nova = { x: last ? Math.round(( last.x + 24 ) * 2) / 2 : 0, z: last ? last.z : 0, profundo: 16, rotacio: last ? ( last.rotacio ?? 0 ) : 0 };
  dokoj.push( nova );
  const indekso = dokoj.length - 1;
  if ( dokoKunfandiĝas( nova, indekso ) ) {
    dokoj.pop();
    statuso( "Nova doko interkovrus vojon aŭ dokon 🛑" );
    return;
  }
  konektiDokonAlVojo( nova, indekso );
  elektitaDoko = indekso;
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
dokoForigiBtn.addEventListener("click", () => {
  if ( dokoj.length <= 1 ) return;
  momenti();
  dokoj.splice(elektitaDoko, 1);
  elektitaDoko = Math.max(0, elektitaDoko - 1);
  markiSxangxitan();
  gxisdatigiVojajnRegilojn();
  markiDesegnon();
});
document.querySelectorAll("#vojaIloj button").forEach(b => {
  b.addEventListener("click", () => {
    vojaIlo = b.dataset.vojaIlo;
    document.querySelectorAll("#vojaIloj button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
});
kradoRestarigiBtn.addEventListener("click", () => { kradoSuperoj.clear(); sinkronigiSuperojn(); markiSxangxitan(); statuso("Nesavitaj ŝanĝoj"); gxisdatigiKradon(); });
kradoKopiiBtn.addEventListener("click", async () => {
  const u = urboj[elektitaUrbo];
  const teksto = u
    ? `{ nomo: "${u.nomo}", arangxaGrando: ${u.arangxaGrando}, blokaGrando: "${u.blokaGrando}", ofsX: ${u.ofsX}, ofsZ: ${u.ofsZ} }`
    : "";
  try {
    await navigator.clipboard.writeText(teksto);
    statuso("Kopiita: " + teksto);
  } catch {
    statuso("Ne eblis kopii aŭtomate — elektu mane: " + teksto);
  }
});

// La akva nivelo apartenas al la peniko Akvo 🌊 — gxi montrigxas en la
// agordoj nur dum la akvo-ilo estas aktiva ( ne kun la aliaj iloj ).
