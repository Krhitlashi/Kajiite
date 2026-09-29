// ≺⧼ Vido 3D 🧊 ⧽≻
// La 3D-vido kaj la 3D-redaktado de la skulptilo — la sceno, la fotilo, la
// teraj/akvaj meŝoj, la krutaĵo, la penika ringo, la radia trafo kaj la
// penikoj sur la reliefo. La stato de la vido logxas cxi tie — la cefa dosiero
// legas gxin rekte ( la vivaj ligoj de ES-moduloj ), kaj la agord-funkcioj
// malsupre estas la nura vojo sxangxi la staton de la redaktilo ( la penikoj,
// la historio, la objektoj ) — tiuj logxas en la cefa dosiero.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { alternajDiagonalojn, terenaStrataKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { premuAlFormo, kreiFormanBazon, MONDO_BAZA_Y } from "../../../eskekoj/komunajxoj/mapformo.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./mezuroj.js";
import { terenaKoloro255, almetiBiomanNuancon, deltoKunDerivajoj,
  rekalkuliDeklivojn, pentri } from "./bako.js";
// La akvo — la meŝo de la akvo sekvas la NIVELOJN de la kalkulo ( ne la
// pentritan maskon ), kaj la fontaj markiloj montras la fontojn.
import { fontoj, elektitaFonto, fontoTrenata, akvaRezulto, akvaNiveloDe,
  teraAlto, fontoCxePunkto, metiFonton, forigiFonton, komenciFontanTrenon,
  sxangiFontanPozicion, finiFontanTrenon, markiAkvonMalpuran,
  agordiAkvoTrenantan } from "./akvo.js";

// ⟪ La stato de la vido 📃 ⟫ — la sceno kaj gxiaj meŝoj, la kamerao, la
// penika ringo kaj la radia treno. La cefa dosiero legas ilin rekte; la
// agord-funkcioj ( agordiVidon ) ligas la redaktilon.
export let triaDimensia = false;      // ĉu la 3D-vido montriĝas
export let bildilo3d = null;          // THREE.WebGLRenderer
export let sceno3d = null, fotilo3d = null, regiloj3d = null;
export let teraMesh = null, akvaMesh = null;
export let ringaObjekto = null;
export let radiaTreno = null;         // 3D-penika treno ( { lastX, lastZ, ix0, ... } )
export let radiaPunkto = null;        // la lasta radia trafo sur la tereno
// La grupoj de la sceno — la metitaj objektoj ( la vera 3D-aspekto ), la krada
// urbo, la staciaj kradaj vojoj kaj la mond-nivelaj vojoj. La cefa dosiero
// plenigas ilin ( rekonstruiObjektojn, rekonstruiKradon3D, rekonstruiVojojn3D )
// kaj sxaltas ilian videblecon; la grupoj mem kreiĝas ĉi tie ( eniri3D ).
export let objektaGrupo3D = null;
export let kradaGrupo3D = null;               // la 3D-aspekto de la krada urbo ( nur en la Krado-langeto )
export let kradaStaciaGrupo3D = null;         // la STACIAJ kradaj vojoj — kaŝiĝas dum la Vojoj sub-langeto
export let vojaGrupo3D = null;                // la 3D-aspekto de la mond-nivelaj vojoj ( nur en la Vojoj sub-langeto )
export const YTROIGO = 0o24/0o10;             // 2.5 — vertikala troigo por la reliefo
const RINGA_PUNKTOJ = 0o100;                  // 64 — segmentoj de la penika ringo
export const mapo3d = document.getElementById("mapo3d");
// La 2D-kanvaso — la SAMA elemento kiel en la cefa dosiero; sxaltiVidon
// malsxaltas gxin kune kun la 3D-kanvaso ( la du vidoj estas alternaj ).
const mapo = document.getElementById("mapo");
// La loka stilfolio ( stiloj.css ) plenigas la larghon kaj tondas la
// WebGL-bildon al la rondaj anguloj.
mapo3d.style.cursor = "crosshair";
mapo3d.style.touchAction = "none";
mapo3d.style.display = "none";

// La krutaĵo kaj la fundo de la mondo, la fontaj markiloj kaj la skrapa koloro
// de la tera meŝo — nur la 3D-vido uzas ilin.
let formoBazo3D = null;
let bazaMesh3D = null;
let fontaGrupo3D = null;
// skrapaLinia — la linia THREE.Color por la 3D-mesho ( la sRGB-bajtoj de la
// nuancaj tavoloj konvertitaj reen al la linia laborejo — la ludo skribas
// la vertexColorojn linie, do la 3D-vido de la ilo nun kongruas ).
const skrapaLinia = new THREE.Color();

// ⟪ La ligo kun la redaktilo 📃 ⟫ — la referencoj de la cefa dosiero, ligitaj
// unufoje per agordiVidon. La tabeloj kaj la funkcioj de la redaktilo ( la
// penikoj, la statuso, la historio, la objektoj, la krado ) logxas tie; la
// valoroj, kiuj sxangxigxas dum la uzo, legigxas per FUNKCIOJ.
let deltoj, deltoInterp, N, PASO, X0, Z0;
let formo, peniko, radiuso, forto, penikoApliki, agordiPlatiganCelon;
let momenti, statuso, markiSxangxitan, markiDesegnon;
let cxuMovigi, gxisdatigiKursoro, gxisdatigiKoordinatojn;
let aktivaTabo, vojojAktiva;
let objektaModo, objektaIlo, objektaTrenata;
let objektoCxePunkto, metiObjekton, forigiObjekton, komenciObjektanTrenon,
  sxangiObjektanPozicion, finiObjektanTrenon, rekonstruiObjektojn;
let rekonstruiKradon3D, rekonstruiVojojn3D;

// agordiVidon — la unufoja kunligo kun la ĉefa dosiero.
//     @param k ( object ) - La referencoj de la ĉefa dosiero.
export function agordiVidon(k) {
  deltoj = k.deltoj; deltoInterp = k.deltoInterp;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  formo = k.formo;
  peniko = k.peniko; radiuso = k.radiuso; forto = k.forto;
  penikoApliki = k.penikoApliki; agordiPlatiganCelon = k.agordiPlatiganCelon;
  momenti = k.momenti; statuso = k.statuso;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
  cxuMovigi = k.cxuMovigi; gxisdatigiKursoro = k.gxisdatigiKursoro;
  gxisdatigiKoordinatojn = k.gxisdatigiKoordinatojn;
  aktivaTabo = k.aktivaTabo; vojojAktiva = k.vojojAktiva;
  objektaModo = k.objektaModo; objektaIlo = k.objektaIlo;
  objektaTrenata = k.objektaTrenata;
  objektoCxePunkto = k.objektoCxePunkto; metiObjekton = k.metiObjekton;
  forigiObjekton = k.forigiObjekton;
  komenciObjektanTrenon = k.komenciObjektanTrenon;
  sxangiObjektanPozicion = k.sxangiObjektanPozicion;
  finiObjektanTrenon = k.finiObjektanTrenon;
  rekonstruiObjektojn = k.rekonstruiObjektojn;
  rekonstruiKradon3D = k.rekonstruiKradon3D;
  rekonstruiVojojn3D = k.rekonstruiVojojn3D;
}

// ════════════════════════ 3D-vido kaj redaktado ════════════════════════
// konstrui3DIndeksojn — la triangula krado por ( N + 1 )² verticoj, el la
// KOMUNA konstruanto ( la sama ŝaktabula diagonal-alternado kiel la grundo
// de la ludo en scena.ts — antaŭe kopiita ĉi tie ).
function konstrui3DIndeksojn(){
  return alternajDiagonalojn(N);
}

// inicializi3DKradon — la horizontala krado ( x, z ) de la verticoj. La krado
// estas kvadrata ( la datumkrado estas kvadrata ), sed la mondo estas la FORMO
// de la mapo — la eksteraj verticoj premiĝas sur la randon, do la 3D-vido
// montras la saman formon kiel la ludo ( kaj la krutaĵo sekvas tiun randon ).
function inicializi3DKradon(geometrio) {
  const N1 = N + 1;
  const poz = geometrio.attributes.position;
  const premita = { x: 0, z: 0 };
  const [ fl, fg ] = formo();
  for ( let j = 0; j <= N; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = 0; i <= N; i++ ) {
      const v = ( j * N1 + i ) * 3;
      const x = X0 + i * PASO;
      if ( premuAlFormo(fl, fg, x, z, premita) ) {
        poz.array[v] = premita.x;
        poz.array[v + 2] = premita.z;
      } else {
        poz.array[v] = x;
        poz.array[v + 2] = z;
      }
    }
  }
}

// gxisdatigiFormon3D — la formo aŭ la grandeco de la mondo sxangxigxis; re-
// premu la kadrajn verticojn sur la novan randon, re-ŝargu la krutaĵon kaj
// re-desegnu la terenon.
export function gxisdatigiFormon3D() {
  if ( !teraMesh ) return;
  inicializi3DKradon(teraMesh.geometry);
  if ( akvaMesh ) inicializi3DKradon(akvaMesh.geometry);
  if ( bazaMesh3D ) {
    bazaMesh3D.geometry.dispose();
    const [ fl, fg ] = formo();
    formoBazo3D = kreiFormanBazon({
      formo: fl, grandeco: fg, koloro: terenaStrataKoloroEn,
      punktojPoArko: 0o100,
    });
    bazaMesh3D.geometry = formoBazo3D.geometrio;
  }
  gxisdatigi3DMeshon({ ix0: 0, iz0: 0, ix1: N, iz1: N });
}

// grundo3D — la terena alta funkcio de la 3D-vido ( kun la alta troigo ).
function grundo3D(x, z) { return teraAlto(x, z) * YTROIGO; }

// ⟨ La fontaj markiloj ( la 3D-vido ) 📃 ⟩ — unu grupo por cxiuj fontoj, kun
// sfero ( la mezuro laux la fluo ) kaj ringo cxe la grundo. La grupo
// rekonstruigxas kiam la fontoj aux la tereno sxangxigxas.
export function rekonstruiFontojn3D() {
  if ( !fontaGrupo3D ) return;
  for ( const infano of fontaGrupo3D.children.slice() ) {
    fontaGrupo3D.remove(infano);
    if ( infano.geometry ) infano.geometry.dispose();
  }
  for ( let i = 0; i < fontoj.length; i++ ) {
    const f = fontoj[i];
    const r = 0o1/0o2 + Math.min(1.6, f.fluo * 0.06);
    const sfero = new THREE.Mesh(
      new THREE.SphereGeometry(r, 12, 8),
      new THREE.MeshStandardMaterial({
        color: i === elektitaFonto ? 0xd8f4ff : 0x48a8d0,
        emissive: 0x206080, roughness: 0.3, metalness: 0o1/0o10,
      }));
    sfero.position.set(f.x, teraAlto(f.x, f.z) * YTROIGO + r, f.z);
    fontaGrupo3D.add(sfero);
    const ringo = new THREE.Mesh(
      new THREE.TorusGeometry(r * 1.7, r * 0.16, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0xe8f8ff, roughness: 0o1/0o2, metalness: 0 }));
    ringo.rotation.x = -Math.PI / 2;
    ringo.position.set(f.x, teraAlto(f.x, f.z) * YTROIGO + 0o1/0o4, f.z);
    fontaGrupo3D.add(ringo);
  }
}

// gxisdatigiFormanBazon3D — sekvigu la krutaĵon al la tereno de la 3D-vido.
function gxisdatigiFormanBazon3D() {
  if ( !formoBazo3D ) return;
  formoBazo3D.aktualigu(grundo3D, MONDO_BAZA_Y * YTROIGO);
}

function eniri3D(){
  if ( bildilo3d ) return;
  try {
    sceno3d = new THREE.Scene();
    // Ĉielo — vertikala gradiento ( la samaj tonoj kiel la ludo ) kaj nebulo
    // kiu kunfandas la malproksiman terenon kun la horizonto.
    const cieloK = document.createElement("canvas");
    cieloK.width = 2; cieloK.height = 0o200;
    const ck = cieloK.getContext("2d");
    const cieloGradiento = ck.createLinearGradient(0, 0, 0, 0o200);
    cieloGradiento.addColorStop(0, "#70a8d8");
    cieloGradiento.addColorStop(0o5/0o10, "#a8d0e8");
    cieloGradiento.addColorStop(1, "#e0f0f0");
    ck.fillStyle = cieloGradiento;
    ck.fillRect(0, 0, 2, 0o200);
    const cieloTeksajxo = new THREE.CanvasTexture(cieloK);
    cieloTeksajxo.colorSpace = THREE.SRGBColorSpace;
    sceno3d.background = cieloTeksajxo;
    sceno3d.fog = new THREE.Fog(0xe0f0f0, 0o1000, 0o3000);
    fotilo3d = new THREE.PerspectiveCamera(50, 1, 1, 0o4770);
    fotilo3d.position.set(0o400, 0o300, 0o400);   // ( 256, 192, 256 )
    bildilo3d = new THREE.WebGLRenderer({ canvas: mapo3d, antialias: true });
    // Lumo — hema ĉiela lumo kaj suno el la nordokcidento.
    const hemo = new THREE.HemisphereLight(0xb8d8e8, 0x384838, 0.9);
    sceno3d.add(hemo);
    const suno = new THREE.DirectionalLight(0xf8f0d8, 1.1);
    suno.position.set(-0o400, 0o470, 0o300);      // ( -256, 312, 192 )
    sceno3d.add(suno);
    sceno3d.add(new THREE.AmbientLight(0x404848, 0.4));
    // La tera meŝo — la sama krado kiel la skulpto, kun vertikalaj koloroj.
    const N1 = N + 1;
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setIndex(new THREE.BufferAttribute(konstrui3DIndeksojn(), 1));
    inicializi3DKradon(geometrio);
    teraMesh = new THREE.Mesh(geometrio, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.92, metalness: 0,
    }));
    sceno3d.add(teraMesh);
    // La krutaĵo kaj la fundo de la mondo — la sama formo kaj la sama paletro
    // kiel en la ludo ( scena.ts ), por ke la 3D-vido montru la veran aspekton
    // de la rando de la mondo.
    const [ fl, fg ] = formo();
    formoBazo3D = kreiFormanBazon({
      formo: fl, grandeco: fg, koloro: terenaStrataKoloroEn,
      punktojPoArko: 0o100,
    });
    gxisdatigiFormanBazon3D();
    bazaMesh3D = new THREE.Mesh(formoBazo3D.geometrio, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    }));
    sceno3d.add(bazaMesh3D);
    // La akvo — travidebla ebeno sekvanta la nivelojn; senakvaj ĉeloj estas
    // mergitaj sub la terenon por ne videbli.
    const akvaGeometrio = new THREE.BufferGeometry();
    akvaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    akvaGeometrio.setIndex(new THREE.BufferAttribute(konstrui3DIndeksojn(), 1));
    inicializi3DKradon(akvaGeometrio);
    // La akvo estas duon-travidebla, por ke la kolorigita fundo ( kaj la
    // skulptado sub la surfaco ) videblu dum redaktado.
    akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
      color: 0x287888, transparent: true, opacity: 0.55,
      roughness: 0.15, metalness: 0o1/0o10, side: THREE.DoubleSide,
    }));
    akvaMesh.renderOrder = 1;
    sceno3d.add(akvaMesh);
    // ⟪ La akvofontoj 📃 ⟫ — malgrandaj markiloj cxe la fontoj de la akvo, por
    // ke oni vidu, de kie la riveroj elfluas ( la fontoj estas la enigo ).
    fontaGrupo3D = new THREE.Group();
    sceno3d.add(fontaGrupo3D);
    rekonstruiFontojn3D();
    // Normoj por ambaŭ meŝoj — MeshStandardMaterial postulas la atributon ĉe
    // la unua bildigo ( gxisdatigi3DMeshon rekomputas la teron ĉiufoje ).
    geometrio.computeVertexNormals();
    akvaGeometrio.computeVertexNormals();
    // La penika ringo — sekvas la terenon ĉe la kursoro.
    const ringaGeometrio = new THREE.BufferGeometry();
    ringaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(( RINGA_PUNKTOJ + 1 ) * 3), 3));
    ringaObjekto = new THREE.Line(ringaGeometrio, new THREE.LineBasicMaterial({ color: 0xffffff }));
    ringaObjekto.visible = false;
    sceno3d.add(ringaObjekto);
    // La metitaj objektoj — la VERAJ 3D-meshxoj ( la samaj konstruantoj
    // kiel la ludo ), rekonstruitaj cxe cxiu sxangxo.
    objektaGrupo3D = new THREE.Group();
    sceno3d.add(objektaGrupo3D);
    rekonstruiObjektojn();
    // La krada urbo — la 3D-aspekto de la nuna aranĝo. Videbla nur dum la
    // Krado-langeto estas aktiva ( sxaltiIlTabon administras la videblecon ).
    kradaGrupo3D = new THREE.Group();
    kradaGrupo3D.visible = aktivaTabo() === "krado";
    sceno3d.add(kradaGrupo3D);
    // La STACIAJ kradaj vojoj — la etendaĵoj de la mond-nivelaj vojoj ( la
    // doka avenuo ). Ili montriĝas kun la krado en la ĉel-redaktaj
    // sub-langetoj, sed KAŜIĜAS dum la Vojoj sub-langeto — tie la VERAJ
    // mond-vojoj montriĝas, kaj la staciaj duobliĝus sur la sama vojo.
    kradaStaciaGrupo3D = new THREE.Group();
    kradaStaciaGrupo3D.visible = aktivaTabo() === "krado" && !vojojAktiva();
    sceno3d.add(kradaStaciaGrupo3D);
    rekonstruiKradon3D();
    // La mond-nivelaj vojoj — la VERAJ vojoj de la ludo ( dioritaj/andezitaj
    // strioj ), videblaj nur dum la Vojoj sub-langeto ( vojojAktiva ).
    vojaGrupo3D = new THREE.Group();
    vojaGrupo3D.visible = vojojAktiva();
    sceno3d.add(vojaGrupo3D);
    rekonstruiVojojn3D();
    // Orbito. Dekstra klako turnas, meza movas, rado zomas — la maldekstra
    // restas por la peniko.
    regiloj3d = new OrbitControls(fotilo3d, bildilo3d.domElement);
    regiloj3d.target.set(0, 0, 0);
    regiloj3d.enableDamping = true;
    regiloj3d.dampingFactor = 0o1/0o20;
    regiloj3d.minDistance = 0o60;                    // 48
    regiloj3d.maxDistance = 0o1400;                  // 768
    regiloj3d.maxPolarAngle = Math.PI * 0.48;
    regiloj3d.mouseButtons = { LEFT: -1, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    regiloj3d.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  } catch ( eraro ) {
    console.error("La 3D-vido ne haveblas:", eraro);
    statuso("La 3D-vido ne haveblas");
    sxaltiVidon(false);
  }
}

// gxisdatigi3DMeshon — rekalkulu la altojn kaj kolorojn de la tera meŝo en la
// krada rektangulo g ( ix0..ix1, iz0..iz1, kradĉeloj ). La akvo sekvas.
export function gxisdatigi3DMeshon(g) {
  if ( !teraMesh ) return;
  const N1 = N + 1;
  const poz = teraMesh.geometry.attributes.position;
  const kol = teraMesh.geometry.attributes.color;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    for ( let i = ix0; i <= ix1; i++ ) {
      const v = ( j * N1 + i ) * 3;
      // La alto venas de la PREMITA pozicio — la verticoj premataj sur la randon
      // ricevas la alton de la rando, do la rando de la tereno kaj la krutaĵo
      // kuntuŝiĝas sen ŝtupo.
      const x = poz.array[v], z = poz.array[v + 2];
      const d = deltoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
      // Kun la AKVA ELTRANCSO — la riverlito videblas en la 3D-vido same kiel
      // en la ludo ( alteco() = bazaAlteco + skulptaDelta + akvaEltrancxo ).
      const kav = akvaRezulto ? akvaRezulto.kavoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)] : 0;
      const h = bazaAlteco(x, z) + d + kav;
      poz.array[v + 1] = h * YTROIGO;
      // La deklivo el la analiza dukuba surfaco — la roka lerpo de la komuna
      // paletro bezonas gxin ( la sama enigo kiel en scena.ts ).
      const [ , deklX, deklZ ] = deltoKunDerivajoj(x, z);
      const k = almetiBiomanNuancon(terenaKoloro255(h, x, z, Math.hypot(deklX, deklZ)), x, z, d);
      skrapaLinia.setRGB(k[0] / 255, k[1] / 255, k[2] / 255, THREE.SRGBColorSpace);
      kol.array[v] = skrapaLinia.r;
      kol.array[v + 1] = skrapaLinia.g;
      kol.array[v + 2] = skrapaLinia.b;
    }
  }
  poz.needsUpdate = true;
  kol.needsUpdate = true;
  gxisdatigi3DAkvon(g);
  teraMesh.geometry.computeVertexNormals();
  gxisdatigiFormanBazon3D();
}

// gxisdatigi3DAkvon — la akva nivelo por ĉiu vertico en la rektangulo.
// Senakvaj ĉeloj mergiĝas sub la terenon.
function gxisdatigi3DAkvon(g) {
  if ( !akvaMesh ) return;
  const N1 = N + 1;
  const poz = akvaMesh.geometry.attributes.position;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = ix0; i <= ix1; i++ ) {
      const x = X0 + i * PASO;
      const v = ( j * N1 + i ) * 3;
      const niv = akvaNiveloDe(i, j, x, z);
      if ( niv === null ) {
        const d = deltoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
        poz.array[v + 1] = ( bazaAlteco(x, z) + d - 0o20 ) * YTROIGO;
      } else {
        poz.array[v + 1] = niv * YTROIGO;
      }
    }
  }
  poz.needsUpdate = true;
}

// radiaTrafo — la radia trafo de la muso sur la tera meŝo ( aŭ nenio ).
const radiaRadio = new THREE.Raycaster();
const radiaMuso = new THREE.Vector2();
function radiaTrafo(e) {
  if ( !bildilo3d ) return null;   // la 3D-vido ankoraŭ ne pretas
  const rect = bildilo3d.domElement.getBoundingClientRect();
  radiaMuso.x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
  radiaMuso.y = -( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
  // La matrico de la fotilo komponigxas nur cxe la bildigo — gxisdatigu gxin
  // antaux la radia trafo, por ke la unua klako trafu precize.
  regiloj3d.update();
  fotilo3d.updateMatrixWorld();
  radiaRadio.setFromCamera(radiaMuso, fotilo3d);
  const trafoj = radiaRadio.intersectObject(teraMesh, false);
  return trafoj.length > 0 ? trafoj[0].point : null;
}

// gxisdatigiRingon — la penika ringo sekvas la terenon ĉe la radia punkto.
function gxisdatigiRingon(p) {
  if ( !ringaObjekto ) return;
  if ( !p ) { ringaObjekto.visible = false; return; }
  const r = objektaModo() ? 0o3/0o2 : radiuso();
  const poz = ringaObjekto.geometry.attributes.position.array;
  for ( let a = 0; a <= RINGA_PUNKTOJ; a++ ) {
    const ang = a / RINGA_PUNKTOJ * Math.PI * 2;
    const x = p.x + Math.cos(ang) * r;
    const z = p.z + Math.sin(ang) * r;
    const h = teraAlto(x, z);
    poz[a * 3] = x;
    poz[a * 3 + 1] = h * YTROIGO;
    poz[a * 3 + 2] = z;
  }
  ringaObjekto.geometry.attributes.position.needsUpdate = true;
  ringaObjekto.geometry.setDrawRange(0, RINGA_PUNKTOJ + 1);
  ringaObjekto.visible = true;
}

// gxisdatigi3DnIlon — la ilo ŝanĝis. En Movigi ✋ la maldekstra klako turnas
// la fotilon ( OrbitControls ) kaj la skulptado estas ŝlosita; en la penikoj
// la maldekstra restas por la skulptado ( LEFT. -1 malŝaltas la turnon ).
export function gxisdatigi3DnIlon(){
  if ( !regiloj3d ) return;
  // La objekta ilo kondutas kiel peniko — la maldekstra klako metas objektojn,
  // ne turnas la fotilon ( eĉ se la lasta peniko estis Movigi ✋ ).
  const moviga = cxuMovigi() && !objektaModo();
  regiloj3d.mouseButtons.LEFT = moviga ? THREE.MOUSE.ROTATE : -1;
  if ( moviga ){
    radiaTreno = null;
    agordiPlatiganCelon(null);
    gxisdatigiRingon(null);
  }
}

// La 3D-peniko — maldekstra klako kaj treno skulptas rekte sur la reliefo
// ( krom en la vido-ilo Movigi ✋, kiu turnas la fotilon ).
function peniko3dKomenci(e) {
  if ( e.button !== 0 || e.pointerType === "touch" ) return;
  // La objekta ilo — la sub-ilo decidas la klakon ( same kiel sur la 2D-mapo ).
  // Meti ➕ metas, Movu ✋ kaptas por treni, Forigi 🗑️ forigas.
  if ( objektaModo() ) {
    const p = radiaTrafo(e);
    if ( !p ) return;
    if ( objektaIlo() === "movigi" ) {
      const ind = objektoCxePunkto(p.x, p.z);
      if ( ind >= 0 ) komenciObjektanTrenon(ind, p.x, p.z);
    } else if ( objektaIlo() === "forigi" ) {
      const ind = objektoCxePunkto(p.x, p.z);
      if ( ind >= 0 ) forigiObjekton(ind);
    } else {
      metiObjekton(p.x, p.z);
    }
    return;
  }
  if ( cxuMovigi() ){ mapo3d.style.cursor = "grabbing"; return; }
  // La Krado-langeto redaktas nur sur la 2D-mapo — la 3D-vido ne skulptu.
  if ( aktivaTabo() === "krado" ) return;
  const p = radiaTrafo(e);
  if ( !p ) return;
  e.preventDefault();
  // La akva ilo ankaux en la 3D-vido metas kaj forigas fontojn ( la sama
  // konduto kiel sur la 2D-mapo ).
  if ( peniko() === "akvo" ) {
    const ind = fontoCxePunkto(p.x, p.z);
    if ( ind >= 0 ) komenciFontanTrenon(ind, p.x, p.z);
    else metiFonton(p.x, p.z);
    return;
  }
  if ( peniko() === "akvoforvisxi" ) {
    const ind = fontoCxePunkto(p.x, p.z);
    if ( ind >= 0 ) forigiFonton(ind);
    return;
  }
  momenti();
  agordiAkvoTrenantan(true);
  agordiPlatiganCelon(peniko() === "platigi" ? bazaAlteco(p.x, p.z) + deltoInterp(p.x, p.z) : null);
  radiaTreno = { lastX: p.x, lastZ: p.z, ix0: 1e9, ix1: -1e9, iz0: 1e9, iz1: -1e9, tuŝitaj: new Map()};
  peniko3dPasxo(p.x, p.z);
}
function peniko3dMovi(e) {
  if ( cxuMovigi() && !objektaModo() ) return;   // la orbito mem movas la fotilon
  const p = radiaTrafo(e);
  radiaPunkto = p;
  gxisdatigiRingon(p);
  if ( objektaModo() ) {
    gxisdatigiKoordinatojn(p ? p.x : null, p ? p.z : null);
    // Movu ✋ — la kaptita objekto sekvas la radian punkton.
    if ( objektaTrenata() >= 0 && p ) sxangiObjektanPozicion(objektaTrenata(), p.x, p.z);
  }
  if ( peniko() === "akvo" && fontoTrenata >= 0 && p ) {
    sxangiFontanPozicion(fontoTrenata, p.x, p.z);
    return;
  }
  if ( !radiaTreno || !p ) return;
  peniko3dPasxo(p.x, p.z);
}
function peniko3dFini(){
  radiaTreno = null;
  agordiPlatiganCelon(null);
  finiObjektanTrenon();
  finiFontanTrenon();
  agordiAkvoTrenantan(false);
  if ( cxuMovigi() )mapo3d.style.cursor = "grab";
}
function peniko3dPasxo(cx, cz) {
  const t = radiaTreno;
  const disto = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const pasoj = Math.max(1, Math.ceil(disto / 0.6));
  for ( let k = 1; k <= pasoj; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / pasoj;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / pasoj;
    const g = penikoApliki(px, pz, radiuso(), forto(), peniko(), t.tuŝitaj);
    t.ix0 = Math.min(t.ix0, g.ix0); t.ix1 = Math.max(t.ix1, g.ix1);
    t.iz0 = Math.min(t.iz0, g.iz0); t.iz1 = Math.max(t.iz1, g.iz1);
  }
  // La malnova punkto antaŭ la gxisdatigo — la 2D-pentrado kovru la tutan
  // vojon ( samkiel en penikoPasxo ).
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  markiSxangxitan();
  // La tereno sxangxigxis — la akvo ( la basenoj, la riveroj, la eltrancxoj )
  // dependas de gxi, do la akvo rekalkuligxos cxe la fino de la penikstreko.
  markiAkvonMalpuran();
  statuso("Nesavitaj ŝanĝoj");
  const r = radiuso();
  const px0 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.max(deX, cx) + r + 1)));
  const px1 = Math.max(0, Math.min(REZ - 1, mondoxAlPikselo(Math.min(deX, cx) - r - 1)));
  const py0 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.max(deZ, cz) + r + 1)));
  const py1 = Math.max(0, Math.min(REZ - 1, mondozAlPikselo(Math.min(deZ, cz) - r - 1)));
  rekalkuliDeklivojn(px0 - 2, py0 - 2, px1 + 2, py1 + 2);
  pentri(px0, py0, px1, py1);
  markiDesegnon();
  gxisdatigi3DMeshon({ ix0: t.ix0, ix1: t.ix1, iz0: t.iz0, iz1: t.iz1 });
}
mapo3d.addEventListener("pointerdown", peniko3dKomenci);
mapo3d.addEventListener("pointermove", peniko3dMovi);
mapo3d.addEventListener("pointerup", peniko3dFini);
mapo3d.addEventListener("pointercancel", peniko3dFini);
mapo3d.addEventListener("pointerleave", () => gxisdatigiRingon(null));

// gxisdatigi3DnPostPlena — plena 3D-gxisdatigo post malfari/refari aŭ ŝarĝo.
export function gxisdatigi3DnPostPlena(){
  if ( !triaDimensia ) return;
  gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  gxisdatigiRingon(radiaPunkto);
}

// sxaltiVidon — ŝaltu inter la 2D-mapo kaj la 3D-reliefo.
export function sxaltiVidon(tria) {
  triaDimensia = tria;
  document.getElementById("vido2d").setAttribute("aria-pressed", String(!tria));
  document.getElementById("vido3d").setAttribute("aria-pressed", String(tria));
  mapo.style.display = tria ? "none" : "";
  mapo3d.style.display = tria ? "" : "none";
  if ( tria ) {
    eniri3D();
    gxisdatigi3DnIlon();
    gxisdatigiKursoro();
    if ( bildilo3d ) {
      const rect = mapo3d.getBoundingClientRect();
      // updateStyle=false — la CSS-larĝo ( 100% ) restu, nur la bilda bufro
      // sekvas la ujon ( alie la fiksitaj pikseloj rompus la plenan larĝon ).
      bildilo3d.setSize(rect.width, rect.height, false);
      fotilo3d.aspect = rect.width / rect.height;
      fotilo3d.updateProjectionMatrix();
      gxisdatigi3DnPostPlena();
    }
  } else {
    gxisdatigiKursoro();
  }
}
document.getElementById("vido2d").addEventListener("click", () => sxaltiVidon(false));
document.getElementById("vido3d").addEventListener("click", () => sxaltiVidon(true));
window.addEventListener("resize", () => {
  if ( triaDimensia && bildilo3d ) {
    const rect = mapo3d.getBoundingClientRect();
    bildilo3d.setSize(rect.width, rect.height, false);
    fotilo3d.aspect = rect.width / rect.height;
    fotilo3d.updateProjectionMatrix();
  }
});
