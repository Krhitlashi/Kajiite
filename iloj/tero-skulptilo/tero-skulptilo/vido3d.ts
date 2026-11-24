// ≺⧼ ſɭꞇ ı],ɹ 🧊 ⧽≻
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { agordiBildilon, agordiMedion, kf2CxefajnLumojn }
  from "../../../eskekoj/komunajxoj/lumo.js";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { alternajDiagonalojn, terenaStrataKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { surokQoxa, kf2QoxaZace, NALA_PSAZ_Y } from "../../../eskekoj/komunajxoj/mapqoxa.js";
import type { QoxaZace, Bal2Qoxa } from "../../../eskekoj/komunajxoj/mapqoxa.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./havecax2l.js";
import type { KradaRektangulo } from "./havecax2l.js";
import { elemento } from "../../komunajxoj/dom.js";
import { tsekeVidebla } from "./videco.js";
import { terenaKoloro255, almetiBiomanNuancon, l6daKunDerivajoj,
  rekalkuliDeklivojn, pentri } from "./bako.js";
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
import { hatsiq, elektitaTsiq, tsiqTrenata, akvaRezulto, akvaVem2De,
  teraAlto, tsiqCxePunkto, metiTsiqn, forigiTsiqn, komenciFontanTrenon,
  sxangiFontanXekuxan, finiFontanTrenon, markiAkvonMalpuran,
  agordiAkvoTrenantan } from "./akvo.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export let triaDimensia = false;      // ſɭꞇ ı],ɹ 3D ſɭᴜ ſןᴜ
export let bildilo3d: THREE.WebGLRenderer | null = null;
export let sceno3d: THREE.Scene | null = null;
export let fotilo3d: THREE.PerspectiveCamera | null = null;
export let hakama3d: OrbitControls | null = null;
export let teraMesh: THREE.Mesh | null = null;
export let akvaMesh: THREE.Mesh | null = null;
export let ringaObjekto: THREE.Line | null = null;
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
export interface RadiaTreno {
  lastX: number;
  lastZ: number;
  ix0: number;
  ix1: number;
  iz0: number;
  iz1: number;
  t12na: Map<number, number>;
}
export let radiaTreno: RadiaTreno | null = null;
export let radiaPunkto: THREE.Vector3 | null = null;   // }ʃɹƽ ʌ ſɭэ }ʃᴜ
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export let objektaGrupo3D: THREE.Group | null = null;
export let kradaGrupo3D: THREE.Group | null = null;           // 3D ʌ ſɭᴜ ſןɹ ſɭᴜ ı],ƨɔ ( ſɭɹ ſןᴜ ｡ ſɭɹ ſןᴜ )
export let k6h6Grupo3D: THREE.Group | null = null;            // ſɭэ ֭ſɭэ ｡ ſɭᴜ ( ſɭɹ ſןᴜ ｡ ſɭэ ֭ſɭэ )
export const YTROIGO = 0o24/0o10;             // ɿ.ꞟ ｡ j͐ʃэ ɭ(ᴜ ʌ ſɭᴜ ſ͔ɭᴜ
const RINGA_PUNKTOJ = 0o100;                  // ɩэ ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ｡
export const mapo3d = elemento<HTMLCanvasElement>("mapo3d");
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
const mapo = elemento<HTMLCanvasElement>("mapo");
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
mapo3d.style.cursor = "crosshair";
mapo3d.style.touchAction = "none";
mapo3d.style.display = "none";

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
let qoxaBazo3D: QoxaZace | null = null;
let bazaMesh3D: THREE.Mesh | null = null;
let tsiqGrupo3D: THREE.Group | null = null;
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭэ ,
// ſ͕ɭɜ ı],ᴜ , ꞙɭɩ ,
const skrapaLinia = new THREE.Color();

// ⟪ ſɭэ ᶗ‹ , ꞙɭэ , 📃 ⟫ , ſɭэ ᶗ‹ ,
// ſɭэ ᶗ‹ , ꞙɭɩ ,
// ſɭэ ᶗ‹ , ꞙɭꞟ ,
// ſɭэ ᶗ‹ , ꞙɭı ,
interface Vido3DLigo {
  hal6da: Float32Array;
  l6daInterp: ( x: number, z: number ) => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  qoxa: () => [ Bal2Qoxa, number ];
  peniko: () => string;
  ka5ik: () => number;
  forto: () => number;
  penikoApliki: ( px: number, pz: number, ka5ik: number, forto: number,
    peniko: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
  agordiPlatiganCelon: ( v: number | null ) => void;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
  tsekeMovigi: () => boolean;
  gxisdatigiKursoro: () => void;
  gxisdatigiKoordinatojn: ( x: number | null, z: number | null ) => void;
  aktivaTabo: () => string;
  hak6h6Aktiva: () => boolean;
  objektaModo: () => boolean;
  objektaIlo: () => string;
  objektaTrenata: () => number;
  objektoCxePunkto: ( x: number, z: number ) => number;
  metiObjekton: ( x: number, z: number ) => void;
  forigiObjekton: ( i: number ) => void;
  komenciObjektanTrenon: ( ind: number, x: number, z: number ) => void;
  sxangiObjektanXekuxan: ( ind: number, x: number, z: number ) => void;
  finiObjektanTrenon: () => void;
  vepaqTom6Objektojn: () => void;
  vepaqTom6Kradon3D: () => void;
  vepaqTom6Hak6h6n3D: () => void;
}
let hal6da: Float32Array;
let l6daInterp: ( x: number, z: number ) => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let qoxa: () => [ Bal2Qoxa, number ];
let peniko: () => string;
let ka5ik: () => number;
let forto: () => number;
let penikoApliki: ( px: number, pz: number, ka5ik: number, forto: number,
  peniko: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
let agordiPlatiganCelon: ( v: number | null ) => void;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;
let tsekeMovigi: () => boolean;
let gxisdatigiKursoro: () => void;
let gxisdatigiKoordinatojn: ( x: number | null, z: number | null ) => void;
let aktivaTabo: () => string;
let hak6h6Aktiva: () => boolean;
let objektaModo: () => boolean;
let objektaIlo: () => string;
let objektaTrenata: () => number;
let objektoCxePunkto: ( x: number, z: number ) => number;
let metiObjekton: ( x: number, z: number ) => void;
let forigiObjekton: ( i: number ) => void;
let komenciObjektanTrenon: ( ind: number, x: number, z: number ) => void;
let sxangiObjektanXekuxan: ( ind: number, x: number, z: number ) => void;
let finiObjektanTrenon: () => void;
let vepaqTom6Objektojn: () => void;
let vepaqTom6Kradon3D: () => void;
let vepaqTom6Hak6h6n3D: () => void;

/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param k ( Vido3DLigo ) - ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ */
export function agordiVidon(k: Vido3DLigo): void {
  hal6da = k.hal6da; l6daInterp = k.l6daInterp;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  qoxa = k.qoxa;
  peniko = k.peniko; ka5ik = k.ka5ik; forto = k.forto;
  penikoApliki = k.penikoApliki; agordiPlatiganCelon = k.agordiPlatiganCelon;
  momenti = k.momenti; statuso = k.statuso;
  markiSxangxitan = k.markiSxangxitan; markiDesegnon = k.markiDesegnon;
  tsekeMovigi = k.tsekeMovigi; gxisdatigiKursoro = k.gxisdatigiKursoro;
  gxisdatigiKoordinatojn = k.gxisdatigiKoordinatojn;
  aktivaTabo = k.aktivaTabo; hak6h6Aktiva = k.hak6h6Aktiva;
  objektaModo = k.objektaModo; objektaIlo = k.objektaIlo;
  objektaTrenata = k.objektaTrenata;
  objektoCxePunkto = k.objektoCxePunkto; metiObjekton = k.metiObjekton;
  forigiObjekton = k.forigiObjekton;
  komenciObjektanTrenon = k.komenciObjektanTrenon;
  sxangiObjektanXekuxan = k.sxangiObjektanXekuxan;
  finiObjektanTrenon = k.finiObjektanTrenon;
  vepaqTom6Objektojn = k.vepaqTom6Objektojn;
  vepaqTom6Kradon3D = k.vepaqTom6Kradon3D;
  vepaqTom6Hak6h6n3D = k.vepaqTom6Hak6h6n3D;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , ꞙɭэ , 📃 ⟫
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
function vepaq3DIndeksojn(){
  return alternajDiagonalojn(N);
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
/* ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    @param geometrio ( THREE.BufferGeometry ) - ſɭэ }ʃᴜ ｡ ſ͕ɭɜ ı],ᴜ ｡
        ſᶘᴜ j͑ʃᴜ ⟅ */
function inicializi3DKradon(geometrio: THREE.BufferGeometry): void {
  const N1 = N + 1;
  const haxekuxa = geometrio.attributes.position;
  const premita = { x: 0, z: 0 };
  const [ fl, fg ] = qoxa();
  for ( let j = 0; j <= N; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = 0; i <= N; i++ ) {
      const v = ( j * N1 + i ) * 3;
      const x = X0 + i * PASO;
      if ( surokQoxa(fl, fg, x, z, premita) ) {
        haxekuxa.array[v] = premita.x;
        haxekuxa.array[v + 2] = premita.z;
      } else {
        haxekuxa.array[v] = x;
        haxekuxa.array[v + 2] = z;
      }
    }
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export function gxisdatigiQoxan3D(): void {
  if ( !teraMesh ) return;
  inicializi3DKradon(teraMesh.geometry);
  if ( akvaMesh ) inicializi3DKradon(akvaMesh.geometry);
  if ( bazaMesh3D ) {
    bazaMesh3D.geometry.dispose();
    const [ fl, fg ] = qoxa();
    qoxaBazo3D = kf2QoxaZace({
      qoxa: fl, pal6: fg, weh2: terenaStrataKoloroEn,
      n2kArko: 0o100,
    });
    bazaMesh3D.geometry = qoxaBazo3D.qoxa;
  }
  gxisdatigi3DMeshon({ ix0: 0, iz0: 0, ix1: N, iz1: N });
}

// ſɭᴜ ſןᴜ , ꞙɭэ ,
function grundo3D(x: number, z: number): number { return teraAlto(x, z) * YTROIGO; }

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
export function vepaqTom6Hatsiqn3D(): void {
  if ( !tsiqGrupo3D ) return;
  for ( const infano of tsiqGrupo3D.children.slice() ) {
    tsiqGrupo3D.remove(infano);
    if ( infano instanceof THREE.Mesh ) infano.geometry.dispose();
  }
  for ( let i = 0; i < hatsiq.length; i++ ) {
    const f = hatsiq[i];
    const r = 0o1/0o2 + Math.min(0o63/0o40, f.fluo * 0o1/0o20);
    const sfero = new THREE.Mesh(
      new THREE.SphereGeometry(r, 0o14, 0o10),
      new THREE.MeshStandardMaterial({
        color: i === elektitaTsiq ? 0xd8f4ff : 0x48a8d0,
        emissive: 0x206080, roughness: 0o23/0o100, metalness: 0o1/0o10,
      }));
    sfero.position.set(f.x, teraAlto(f.x, f.z) * YTROIGO + r, f.z);
    tsiqGrupo3D.add(sfero);
    const c2q = new THREE.Mesh(
      new THREE.TorusGeometry(r * 0o155/0o100, r * 0o5/0o40, 0o10, 0o24),
      new THREE.MeshStandardMaterial({ color: 0xe8f8ff, roughness: 0o1/0o2, metalness: 0 }));
    c2q.rotation.x = -Math.PI / 2;
    c2q.position.set(f.x, teraAlto(f.x, f.z) * YTROIGO + 0o1/0o4, f.z);
    tsiqGrupo3D.add(c2q);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
function gxisdatigiFormanBazon3D(): void {
  if ( !qoxaBazo3D ) return;
  qoxaBazo3D.qoxa3ak2(grundo3D, NALA_PSAZ_Y * YTROIGO);
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
function eniri3D(): void {
  if ( bildilo3d ) return;
  try {
    sceno3d = new THREE.Scene();
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    const cieloK = document.createElement("canvas");
    cieloK.width = 2; cieloK.height = 0o200;
    const ck = cieloK.getContext("2d");
    if ( !ck ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) 2D ｡ ſɭэ }ʃᴜ ｡");
    const cieloGradiento = ck.createLinearGradient(0, 0, 0, 0o200);
    cieloGradiento.addColorStop(0, "#70a8d8");
    cieloGradiento.addColorStop(0o5/0o10, "#a8d0e8");
    cieloGradiento.addColorStop(1, "#e0f0f0");
    ck.fillStyle = cieloGradiento;
    ck.fillRect(0, 0, 2, 0o200);
    const cieloCac2sex = new THREE.CanvasTexture(cieloK);
    cieloCac2sex.colorSpace = THREE.SRGBColorSpace;
    sceno3d.background = cieloCac2sex;
    sceno3d.fog = new THREE.Fog(0xe0f0f0, 0o1000, 0o3000);
    fotilo3d = new THREE.PerspectiveCamera(0o62, 1, 1, 0o4770);
    fotilo3d.position.set(0o400, 0o300, 0o400);   // ( ɿꞟɩ, 192, ɿꞟɩ ) ⟅ }ʃɹƽ ʌ ſɭᴜ ｡
    bildilo3d = new THREE.WebGLRenderer({ canvas: mapo3d, antialias: true });
    agordiBildilon( bildilo3d );
// ⟨ ſᶘɹ ſɭᴜ , 📃 ⟩
    kf2CxefajnLumojn( sceno3d, {
      cxielaKoloro: 0xb8d8e8, grundoKoloro: 0x384838, cxielaIntenso: 0o35/0o40,
      sunaKoloro: 0xf8f0d8, sunaIntenso: 0o43/0o40,
      sunaXekuxa: [ -0o400, 0o470, 0o300 ],
      plenigaKoloro: 0x404848, plenigaIntenso: 0o15/0o40,
    } );
// ⟨ ſɭɜ ı],ᴜ , 📃 ⟩
    agordiMedion( sceno3d, bildilo3d );
// ſɭᴜ ſןᴜ , ꞙɭı ,
    const N1 = N + 1;
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    geometrio.setIndex(new THREE.BufferAttribute(vepaq3DIndeksojn(), 1));
    inicializi3DKradon(geometrio);
    teraMesh = new THREE.Mesh(geometrio, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o73/0o100, metalness: 0,
    }));
    sceno3d.add(teraMesh);
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ( ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭɜ ſɭ,w , ꞙɭэ ,
    const [ fl, fg ] = qoxa();
    qoxaBazo3D = kf2QoxaZace({
      qoxa: fl, pal6: fg, weh2: terenaStrataKoloroEn,
      n2kArko: 0o100,
    });
    gxisdatigiFormanBazon3D();
    bazaMesh3D = new THREE.Mesh(qoxaBazo3D.qoxa, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    }));
    sceno3d.add(bazaMesh3D);
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
    const akvaGeometrio = new THREE.BufferGeometry();
    akvaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    akvaGeometrio.setIndex(new THREE.BufferAttribute(vepaq3DIndeksojn(), 1));
    inicializi3DKradon(akvaGeometrio);
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
    akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
      color: 0x287888, transparent: true, opacity: 0o43/0o100,
      roughness: 0o5/0o40, metalness: 0o1/0o10, side: THREE.DoubleSide,
    }));
    akvaMesh.renderOrder = 1;
    sceno3d.add(akvaMesh);
// ⟪ ſᶘᴜ j͑ʃᴜ , 📃 ⟫ , ſᶘᴜ j͑ʃᴜ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
    tsiqGrupo3D = new THREE.Group();
    sceno3d.add(tsiqGrupo3D);
    vepaqTom6Hatsiqn3D();
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
    geometrio.computeVertexNormals();
    akvaGeometrio.computeVertexNormals();
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    const ringaGeometrio = new THREE.BufferGeometry();
    ringaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(( RINGA_PUNKTOJ + 1 ) * 3), 3));
    ringaObjekto = new THREE.Line(ringaGeometrio, new THREE.LineBasicMaterial({ color: 0xffffff }));
    ringaObjekto.visible = false;
    sceno3d.add(ringaObjekto);
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    objektaGrupo3D = new THREE.Group();
    objektaGrupo3D.visible = tsekeVidebla("objektoj");
    sceno3d.add(objektaGrupo3D);
    vepaqTom6Objektojn();
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    kradaGrupo3D = new THREE.Group();
    kradaGrupo3D.visible = tsekeVidebla("krado");
    sceno3d.add(kradaGrupo3D);
    vepaqTom6Kradon3D();
// ſɭэ ֭ſɭэ , ꞙɭɩ ,
// ſɭэ ֭ſɭэ , ꞙɭꞟ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
    k6h6Grupo3D = new THREE.Group();
    k6h6Grupo3D.visible = tsekeVidebla("hak6h6");
    sceno3d.add(k6h6Grupo3D);
    vepaqTom6Hak6h6n3D();
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
    hakama3d = new OrbitControls(fotilo3d, bildilo3d.domElement);
    hakama3d.target.set(0, 0, 0);
    hakama3d.enableDamping = true;
    hakama3d.dampingFactor = 0o1/0o20;
    hakama3d.minDistance = 0o60;                    // 48 ⟅ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭꞇ ı],ɹ
    hakama3d.maxDistance = 0o1400;                  // 768 ⟅ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭꞇ ı],ɹ
    hakama3d.maxPolarAngle = Math.PI * 0o37/0o100;
    hakama3d.mouseButtons = { LEFT: -1, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    hakama3d.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  } catch ( eraro ) {
    console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) 3D ｡ ɭʃᴜ ｡" , eraro);
    statuso("3D ｡ ɭʃᴜ ｡");
    sxaltiVidon(false);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function gxisdatigi3DMeshon(g: KradaRektangulo): void {
  if ( !teraMesh ) return;
  const N1 = N + 1;
  const haxekuxa = teraMesh.geometry.attributes.position;
  const kol = teraMesh.geometry.attributes.color;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    for ( let i = ix0; i <= ix1; i++ ) {
      const v = ( j * N1 + i ) * 3;
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
      const x = haxekuxa.array[v], z = haxekuxa.array[v + 2];
      const d = hal6da[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
      const kav = akvaRezulto ? akvaRezulto.kavoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)] : 0;
      const h = bazaAlteco(x, z) + d + kav;
      haxekuxa.array[v + 1] = h * YTROIGO;
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
      const [ , deklX, deklZ ] = l6daKunDerivajoj(x, z);
      const k = almetiBiomanNuancon(terenaKoloro255(h, x, z, Math.hypot(deklX, deklZ)), x, z, d);
      skrapaLinia.setRGB(k[0] / 0o377, k[1] / 0o377, k[2] / 0o377, THREE.SRGBColorSpace);
      kol.array[v] = skrapaLinia.r;
      kol.array[v + 1] = skrapaLinia.g;
      kol.array[v + 2] = skrapaLinia.b;
    }
  }
  haxekuxa.needsUpdate = true;
  kol.needsUpdate = true;
  gxisdatigi3DAkvon(g);
  teraMesh.geometry.computeVertexNormals();
  gxisdatigiFormanBazon3D();
}

// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
function gxisdatigi3DAkvon(g: KradaRektangulo): void {
  if ( !akvaMesh ) return;
  const N1 = N + 1;
  const haxekuxa = akvaMesh.geometry.attributes.position;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    const z = Z0 + j * PASO;
    for ( let i = ix0; i <= ix1; i++ ) {
      const x = X0 + i * PASO;
      const v = ( j * N1 + i ) * 3;
      const niv = akvaVem2De(i, j, x, z);
      if ( niv === null ) {
        const d = hal6da[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
        haxekuxa.array[v + 1] = ( bazaAlteco(x, z) + d - 0o20 ) * YTROIGO;
      } else {
        haxekuxa.array[v + 1] = niv * YTROIGO;
      }
    }
  }
  haxekuxa.needsUpdate = true;
}

const radiaRadio = new THREE.Raycaster();
const radiaMuso = new THREE.Vector2();
/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param e ( PointerEvent ) - ſɭᴜ ｡
@returns }ʃɹƽ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ null ( THREE.Vector3 | null ) ⟅ */
function radiaTrafo(e: PointerEvent): THREE.Vector3 | null {
  if ( !bildilo3d || !hakama3d || !fotilo3d || !teraMesh ) return null;   // 3D ｡ ſɭꞇ ı],ɹ ｡
  const rect = bildilo3d.domElement.getBoundingClientRect();
  radiaMuso.x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
  radiaMuso.y = -( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  hakama3d.update();
  fotilo3d.updateMatrixWorld();
  radiaRadio.setFromCamera(radiaMuso, fotilo3d);
  const trafoj = radiaRadio.intersectObject(teraMesh, false);
  return trafoj.length > 0 ? trafoj[0].point : null;
}

/* ſɭᴜ ſןᴜ , ꞙɭꞟ ,
   ｡ ſɭᴜ ｡ ſɭᴜ ᶗ‹ ｡ ɭl̀ᴜȝ ｡ ɭl̀ᴜȝ ⟅
    @param p ( THREE.Vector3 | null ) - }ʃɹƽ ｡ null ( ſɭɜ j͐ʃɹ ) ⟅ */
function gxisdatigiRingon(p: THREE.Vector3 | null): void {
  if ( !ringaObjekto ) return;
  if ( !p ) { ringaObjekto.visible = false; return; }
  const r = objektaModo() ? 0o3/0o2 : ka5ik();
  const haxekuxa = ringaObjekto.geometry.attributes.position.array;
  for ( let a = 0; a <= RINGA_PUNKTOJ; a++ ) {
// ſɭᴜ ſןᴜ , ꞙɭı ,
    const t = a / RINGA_PUNKTOJ * 0o4;
    const kek = Math.floor(t) % 0o4;
    const f = t - Math.floor(t);
    const deX = [ 0, 1, 0, -1 ][ kek ], deZ = [ -1, 0, 1, 0 ][ kek ];
    const alX = [ 1, 0, -1, 0 ][ kek ], alZ = [ 0, 1, 0, -1 ][ kek ];
    const x = p.x + ( deX + ( alX - deX ) * f ) * r;
    const z = p.z + ( deZ + ( alZ - deZ ) * f ) * r;
    const h = teraAlto(x, z);
    haxekuxa[a * 3] = x;
    haxekuxa[a * 3 + 1] = h * YTROIGO;
    haxekuxa[a * 3 + 2] = z;
  }
  ringaObjekto.geometry.attributes.position.needsUpdate = true;
  ringaObjekto.geometry.setDrawRange(0, RINGA_PUNKTOJ + 1);
  ringaObjekto.visible = true;
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
export function gxisdatigi3DnIlon(): void {
  if ( !hakama3d ) return;
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
  const moviga = tsekeMovigi() && !objektaModo();
  hakama3d.mouseButtons.LEFT = moviga ? THREE.MOUSE.ROTATE : -1;
  if ( moviga ){
    radiaTreno = null;
    agordiPlatiganCelon(null);
    gxisdatigiRingon(null);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
function peniko3dKomenci(e: PointerEvent): void {
  if ( e.button !== 0 || e.pointerType === "touch" ) return;
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
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
  if ( tsekeMovigi() ){ mapo3d.style.cursor = "grabbing"; return; }
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  if ( aktivaTabo() === "krado" ) return;
  const p = radiaTrafo(e);
  if ( !p ) return;
  e.preventDefault();
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
  if ( peniko() === "akvo" ) {
    const ind = tsiqCxePunkto(p.x, p.z);
    if ( ind >= 0 ) komenciFontanTrenon(ind, p.x, p.z);
    else metiTsiqn(p.x, p.z);
    return;
  }
  if ( peniko() === "akvoforvisxi" ) {
    const ind = tsiqCxePunkto(p.x, p.z);
    if ( ind >= 0 ) forigiTsiqn(ind);
    return;
  }
  momenti();
  agordiAkvoTrenantan(true);
  agordiPlatiganCelon(peniko() === "platigi" ? bazaAlteco(p.x, p.z) + l6daInterp(p.x, p.z) : null);
  radiaTreno = { lastX: p.x, lastZ: p.z, ix0: 0o10 ** 0o12, ix1: -( 0o10 ** 0o12 ), iz0: 0o10 ** 0o12, iz1: -( 0o10 ** 0o12 ), t12na: new Map<number, number>() };
  peniko3dPasxo(p.x, p.z);
}
function peniko3dMovi(e: PointerEvent): void {
  if ( tsekeMovigi() && !objektaModo() ) return;   // j͑ʃɹ j͑ʃᴜ ʃɜ ｡ ſɭᴜ ｡
  const p = radiaTrafo(e);
  radiaPunkto = p;
  gxisdatigiRingon(p);
  if ( objektaModo() ) {
    gxisdatigiKoordinatojn(p ? p.x : null, p ? p.z : null);
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    if ( objektaTrenata() >= 0 && p ) sxangiObjektanXekuxan(objektaTrenata(), p.x, p.z);
  }
  if ( peniko() === "akvo" && tsiqTrenata >= 0 && p ) {
    sxangiFontanXekuxan(tsiqTrenata, p.x, p.z);
    return;
  }
  if ( !radiaTreno || !p ) return;
  peniko3dPasxo(p.x, p.z);
}
function peniko3dFini(): void {
  radiaTreno = null;
  agordiPlatiganCelon(null);
  finiObjektanTrenon();
  finiFontanTrenon();
  agordiAkvoTrenantan(false);
  if ( tsekeMovigi() )mapo3d.style.cursor = "grab";
}
/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param cx ( number ) - }ʃᴜ j͐ʃᴜ x ʌ j͑ʃɔ ſȷэⅎ ⟅
    @param cz ( number ) - }ʃᴜ j͐ʃᴜ z ʌ j͑ʃɔ ſȷэⅎ ⟅ */
function peniko3dPasxo(cx: number, cz: number): void {
  const t = radiaTreno;
  if ( !t ) return;
  const h6kuni = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const havepat6ni = Math.max(1, Math.ceil(h6kuni / ( 0o23/0o40 )));
  for ( let k = 1; k <= havepat6ni; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / havepat6ni;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / havepat6ni;
    const g = penikoApliki(px, pz, ka5ik(), forto(), peniko(), t.t12na);
    t.ix0 = Math.min(t.ix0, g.ix0); t.ix1 = Math.max(t.ix1, g.ix1);
    t.iz0 = Math.min(t.iz0, g.iz0); t.iz1 = Math.max(t.iz1, g.iz1);
  }
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  markiSxangxitan();
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  markiAkvonMalpuran();
  statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  const r = ka5ik();
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

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export function gxisdatigi3DnPostPlena(): void {
  if ( !triaDimensia ) return;
  gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  gxisdatigiRingon(radiaPunkto);
}

/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param tria ( boolean ) - ſɭꞇ ı],ɹ 3D ſɭᴜ ſןᴜ ⟅ */
export function sxaltiVidon(tria: boolean): void {
  triaDimensia = tria;
  elemento<HTMLButtonElement>("vido2d").setAttribute("aria-pressed", String(!tria));
  elemento<HTMLButtonElement>("vido3d").setAttribute("aria-pressed", String(tria));
  mapo.style.display = tria ? "none" : "";
  mapo3d.style.display = tria ? "" : "none";
  if ( tria ) {
    eniri3D();
    gxisdatigi3DnIlon();
    gxisdatigiKursoro();
    if ( bildilo3d && fotilo3d ) {
      const rect = mapo3d.getBoundingClientRect();
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
      bildilo3d.setSize(rect.width, rect.height, false);
      fotilo3d.aspect = rect.width / rect.height;
      fotilo3d.updateProjectionMatrix();
      gxisdatigi3DnPostPlena();
    }
  } else {
    gxisdatigiKursoro();
  }
}
elemento<HTMLButtonElement>("vido2d").addEventListener("click", () => sxaltiVidon(false));
elemento<HTMLButtonElement>("vido3d").addEventListener("click", () => sxaltiVidon(true));
window.addEventListener("resize", () => {
  if ( triaDimensia && bildilo3d && fotilo3d ) {
    const rect = mapo3d.getBoundingClientRect();
    bildilo3d.setSize(rect.width, rect.height, false);
    fotilo3d.aspect = rect.width / rect.height;
    fotilo3d.updateProjectionMatrix();
  }
});
