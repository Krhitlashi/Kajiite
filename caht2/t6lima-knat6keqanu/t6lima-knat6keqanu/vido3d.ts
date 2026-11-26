// ≺⧼ ſɭꞇ ı],ɹ 🧊 ⧽≻
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../../skek2/x2x2q/tsije.js";
import { kozonuL6da } from "../../../kanta/nala/t6limaSoza.js";
import { hagek2fhagasai, t6limaK6h6Weh2En } from "../../../skek2/x2x2q/t6limaHaweh2.js";
import { surokQoxa, kf2QoxaZace, NALAPSAZY } from "../../../skek2/x2x2q/mapqoxa.js";
import type { QoxaZace, Bal2Qoxa } from "../../../skek2/x2x2q/mapqoxa.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./havecax2l.js";
import type { KradaRektangulo } from "./havecax2l.js";
import { kfe } from "../../x2x2q/dom.js";
import { tsekeVidebla } from "./kix2Ka5ik.js";
import { kozuaWeh2, alneq2qBiomanNuancon, l6daKunDerivajoj,
  revek2feDeklik6h6n, pentri } from "./tsane.js";
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
import { hatsiq, sukf2qitaTsiq, tsiqTrenata, tsasaTseuni, tsasaVem2De,
  t6limaL6da, tsiqJeN2k, neq2qTsiqn, h2liTsiqn, saxeiFontanTrenon,
  sxangiFontanXekuxan, finiFontanTrenon, s2tasTsasaS23ohk2sain,
  catsaraTsasaTrenantan } from "./tsasa.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export let triaDimensia = false;      // ſɭꞇ ı],ɹ 3D ſɭᴜ ſןᴜ
export let tona3d: THREE.WebGLRenderer | null = null;
export let kagani3d: THREE.Scene | null = null;
export let catahaq3d: THREE.PerspectiveCamera | null = null;
export let hakama3d: OrbitControls | null = null;
export let t6limaMesh: THREE.Mesh | null = null;
export let tsasaMesh: THREE.Mesh | null = null;
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
export let radiaN2k: THREE.Vector3 | null = null;   // }ʃɹƽ ʌ ſɭэ }ʃᴜ
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export let oxemaniGrupo3D: THREE.Group | null = null;
export let qox2n2kGrupo3D: THREE.Group | null = null;           // 3D ʌ ſɭᴜ ſןɹ ſɭᴜ ı],ƨɔ ( ſɭɹ ſןᴜ ｡ ſɭɹ ſןᴜ )
export let k6h6Grupo3D: THREE.Group | null = null;            // ſɭэ ֭ſɭэ ｡ ſɭᴜ ( ſɭɹ ſןᴜ ｡ ſɭэ ֭ſɭэ )
export const YTROIGO = 0o24/0o10;             // ɿ.ꞟ ｡ j͐ʃэ ɭ(ᴜ ʌ ſɭᴜ ſ͔ɭᴜ
const RINGAPUNKTOJ = 0o100;                  // ɩэ ｡ j͑ʃɹ j͑ʃᴜ ʃɜ ｡
export const bal23d = kfe<HTMLCanvasElement>("bal23d");
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
const bal2 = kfe<HTMLCanvasElement>("bal2");
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
bal23d.style.cursor = "crosshair";
bal23d.style.touchAction = "none";
bal23d.style.display = "none";

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
let qoxaBazo3D: QoxaZace | null = null;
let kozunuMesh3D: THREE.Mesh | null = null;
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
  Tona: number;
  X0: number;
  Z0: number;
  qoxa: () => [ Bal2Qoxa, number ];
  siicatsiicana: () => string;
  ka5ik: () => number;
  g2sa: () => number;
  siicatsiicanaApliki: ( px: number, pz: number, ka5ik: number, g2sa: number,
    siicatsiicana: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
  catsaraPlatiganCelon: ( v: number | null ) => void;
  momenti: () => void;
  statuso: ( s2banani: string ) => void;
  s2tasVeq6k2itan: () => void;
  s2tasDesegnon: () => void;
  tsekeMovigi: () => boolean;
  tlak2Kursoro: () => void;
  tlak2Haqan2k: ( x: number | null, z: number | null ) => void;
  tikCax2l: () => string;
  hak6h6Aktiva: () => boolean;
  oxemaniModo: () => boolean;
  oxemaniIlo: () => string;
  oxemaniTrenata: () => number;
  oxemaniJeN2k: ( x: number, z: number ) => number;
  neq2qObjekton: ( x: number, z: number ) => void;
  h2liObjekton: ( i: number ) => void;
  saxeiObjektanTrenon: ( ind: number, x: number, z: number ) => void;
  sxangiObjektanXekuxan: ( ind: number, x: number, z: number ) => void;
  finiObjektanTrenon: () => void;
  vepaqTom6Hatoxemani: () => void;
  vepaqTom6Qox2n2kn3D: () => void;
  vepaqTom6Hak6h6n3D: () => void;
}
let hal6da: Float32Array;
let l6daInterp: ( x: number, z: number ) => number;
let N: number;
let Tona: number;
let X0: number;
let Z0: number;
let qoxa: () => [ Bal2Qoxa, number ];
let siicatsiicana: () => string;
let ka5ik: () => number;
let g2sa: () => number;
let siicatsiicanaApliki: ( px: number, pz: number, ka5ik: number, g2sa: number,
  siicatsiicana: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
let catsaraPlatiganCelon: ( v: number | null ) => void;
let momenti: () => void;
let statuso: ( s2banani: string ) => void;
let s2tasVeq6k2itan: () => void;
let s2tasDesegnon: () => void;
let tsekeMovigi: () => boolean;
let tlak2Kursoro: () => void;
let tlak2Haqan2k: ( x: number | null, z: number | null ) => void;
let tikCax2l: () => string;
let hak6h6Aktiva: () => boolean;
let oxemaniModo: () => boolean;
let oxemaniIlo: () => string;
let oxemaniTrenata: () => number;
let oxemaniJeN2k: ( x: number, z: number ) => number;
let neq2qObjekton: ( x: number, z: number ) => void;
let h2liObjekton: ( i: number ) => void;
let saxeiObjektanTrenon: ( ind: number, x: number, z: number ) => void;
let sxangiObjektanXekuxan: ( ind: number, x: number, z: number ) => void;
let finiObjektanTrenon: () => void;
let vepaqTom6Hatoxemani: () => void;
let vepaqTom6Qox2n2kn3D: () => void;
let vepaqTom6Hak6h6n3D: () => void;

/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param k ( Vido3DLigo ) - ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ｡ */
export function catsaraVidon(k: Vido3DLigo): void {
  hal6da = k.hal6da; l6daInterp = k.l6daInterp;
  N = k.N; Tona = k.Tona; X0 = k.X0; Z0 = k.Z0;
  qoxa = k.qoxa;
  siicatsiicana = k.siicatsiicana; ka5ik = k.ka5ik; g2sa = k.g2sa;
  siicatsiicanaApliki = k.siicatsiicanaApliki; catsaraPlatiganCelon = k.catsaraPlatiganCelon;
  momenti = k.momenti; statuso = k.statuso;
  s2tasVeq6k2itan = k.s2tasVeq6k2itan; s2tasDesegnon = k.s2tasDesegnon;
  tsekeMovigi = k.tsekeMovigi; tlak2Kursoro = k.tlak2Kursoro;
  tlak2Haqan2k = k.tlak2Haqan2k;
  tikCax2l = k.tikCax2l; hak6h6Aktiva = k.hak6h6Aktiva;
  oxemaniModo = k.oxemaniModo; oxemaniIlo = k.oxemaniIlo;
  oxemaniTrenata = k.oxemaniTrenata;
  oxemaniJeN2k = k.oxemaniJeN2k; neq2qObjekton = k.neq2qObjekton;
  h2liObjekton = k.h2liObjekton;
  saxeiObjektanTrenon = k.saxeiObjektanTrenon;
  sxangiObjektanXekuxan = k.sxangiObjektanXekuxan;
  finiObjektanTrenon = k.finiObjektanTrenon;
  vepaqTom6Hatoxemani = k.vepaqTom6Hatoxemani;
  vepaqTom6Qox2n2kn3D = k.vepaqTom6Qox2n2kn3D;
  vepaqTom6Hak6h6n3D = k.vepaqTom6Hak6h6n3D;
}

// ⟪ ſɭᴜ ſןᴜ , ꞙɭц , ꞙɭэ , 📃 ⟫
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
function vepaq3DIndeksojn(){
  return hagek2fhagasai(N);
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
/* ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    @param zace ( THREE.BufferGeometry ) - ſɭэ }ʃᴜ ｡ ſ͕ɭɜ ı],ᴜ ｡
        ſᶘᴜ j͑ʃᴜ ⟅ */
function inicializi3DQox2n2kn(zace: THREE.BufferGeometry): void {
  const N1 = N + 0o1;
  const haxekuxa = zace.attributes.position;
  const premita = { x: 0o0, z: 0o0 };
  const [ fl, fg ] = qoxa();
  for ( let j = 0o0; j <= N; j++ ) {
    const z = Z0 + j * Tona;
    for ( let i = 0o0; i <= N; i++ ) {
      const v = ( j * N1 + i ) * 0o3;
      const x = X0 + i * Tona;
      if ( surokQoxa(fl, fg, x, z, premita) ) {
        haxekuxa.array[v] = premita.x;
        haxekuxa.array[v + 0o2] = premita.z;
      } else {
        haxekuxa.array[v] = x;
        haxekuxa.array[v + 0o2] = z;
      }
    }
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export function tlak2Qoxan3D(): void {
  if ( !t6limaMesh ) return;
  inicializi3DQox2n2kn(t6limaMesh.geometry);
  if ( tsasaMesh ) inicializi3DQox2n2kn(tsasaMesh.geometry);
  if ( kozunuMesh3D ) {
    kozunuMesh3D.geometry.dispose();
    const [ fl, fg ] = qoxa();
    qoxaBazo3D = kf2QoxaZace({
      qoxa: fl, pal6: fg, weh2: t6limaK6h6Weh2En,
      n2kArko: 0o100,
    });
    kozunuMesh3D.geometry = qoxaBazo3D.qoxa;
  }
  tlak23DCakamahan({ ix0: 0o0, iz0: 0o0, ix1: N, iz1: N });
}

// ſɭᴜ ſןᴜ , ꞙɭэ ,
function t6lima3D(x: number, z: number): number { return t6limaL6da(x, z) * YTROIGO; }

// ⟨ ſɭᴜ ſןᴜ , 📃 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
export function vepaqTom6Hatsiqn3D(): void {
  if ( !tsiqGrupo3D ) return;
  for ( const m2rap2 of tsiqGrupo3D.children.slice() ) {
    tsiqGrupo3D.remove(m2rap2);
    if ( m2rap2 instanceof THREE.Mesh ) m2rap2.geometry.dispose();
  }
  for ( let i = 0o0; i < hatsiq.length; i++ ) {
    const f = hatsiq[i];
    const r = 0o1/0o2 + Math.min(0o63/0o40, f.las * 0o1/0o20);
    const sfero = new THREE.Mesh(
      new THREE.SphereGeometry(r, 0o14, 0o10),
      new THREE.MeshStandardMaterial({
        color: i === sukf2qitaTsiq ? 0xd8f0f8 : 0x48a8d0,
        emissive: 0x206080, roughness: 0o23/0o100, metalness: 0o1/0o10,
      }));
    sfero.position.set(f.x, t6limaL6da(f.x, f.z) * YTROIGO + r, f.z);
    tsiqGrupo3D.add(sfero);
    const c2q = new THREE.Mesh(
      new THREE.TorusGeometry(r * 0o155/0o100, r * 0o5/0o40, 0o10, 0o24),
      new THREE.MeshStandardMaterial({ color: 0xe8f8f8, roughness: 0o1/0o2, metalness: 0o0 }));
    c2q.rotation.x = -Math.PI / 0o2;
    c2q.position.set(f.x, t6limaL6da(f.x, f.z) * YTROIGO + 0o1/0o4, f.z);
    tsiqGrupo3D.add(c2q);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
function tlak2FormanBazon3D(): void {
  if ( !qoxaBazo3D ) return;
  qoxaBazo3D.qoxa3ak2(t6lima3D, NALAPSAZY * YTROIGO);
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
function eniri3D(): void {
  if ( tona3d ) return;
  try {
    kagani3d = new THREE.Scene();
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    const cieloK = document.createElement("canvas");
    cieloK.width = 0o2; cieloK.height = 0o200;
    const ck = cieloK.getContext("2d");
    if ( !ck ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) 2D ｡ ſɭэ }ʃᴜ ｡");
    const cieloGradiento = ck.createLinearGradient(0o0, 0o0, 0o0, 0o200);
    cieloGradiento.addColorStop(0o0, "#70a8d8");
    cieloGradiento.addColorStop(0o5/0o10, "#a8d0e8");
    cieloGradiento.addColorStop(0o1, "#e0f0f0");
    ck.fillStyle = cieloGradiento;
    ck.fillRect(0o0, 0o0, 0o2, 0o200);
    const cieloCac2sex = new THREE.CanvasTexture(cieloK);
    cieloCac2sex.colorSpace = THREE.SRGBColorSpace;
    kagani3d.background = cieloCac2sex;
    kagani3d.fog = new THREE.Fog(0xe0f0f0, 0o1000, 0o3000);
    catahaq3d = new THREE.PerspectiveCamera(0o62, 0o1, 0o1, 0o4770);
    catahaq3d.position.set(0o400, 0o300, 0o400);   // ( ɿꞟɩ, 192, ɿꞟɩ ) ⟅ }ʃɹƽ ʌ ſɭᴜ ｡
    tona3d = new THREE.WebGLRenderer({ canvas: bal23d, antialias: true });
    catsaraTonan( tona3d );
// ⟨ ſᶘɹ ſɭᴜ , 📃 ⟩
    kf2GelesTsijen( kagani3d, {
      canaWeh2: 0xb8d8e8, kozuWeh2: 0x384838, canaVem2: 0o35/0o40,
      sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o43/0o40,
      sotsiiHaxekuxa: [ -0o400, 0o470, 0o300 ],
      vetem2Weh2: 0x404848, vetem2Vem2: 0o15/0o40,
    } );
// ⟨ ſɭɜ ı],ᴜ , 📃 ⟩
    catsaraQatsiiken( kagani3d, tona3d );
// ſɭᴜ ſןᴜ , ꞙɭı ,
    const N1 = N + 0o1;
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 0o3), 0o3));
    zace.setAttribute("color", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 0o3), 0o3));
    zace.setIndex(new THREE.BufferAttribute(vepaq3DIndeksojn(), 0o1));
    inicializi3DQox2n2kn(zace);
    t6limaMesh = new THREE.Mesh(zace, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o73/0o100, metalness: 0o0,
    }));
    kagani3d.add(t6limaMesh);
// ſɭɜ ſɭ,w , ꞙɭɿ ,
// ( ſɭɜ ſɭ,w , ꞙɭц ,
// ſɭɜ ſɭ,w , ꞙɭэ ,
    const [ fl, fg ] = qoxa();
    qoxaBazo3D = kf2QoxaZace({
      qoxa: fl, pal6: fg, weh2: t6limaK6h6Weh2En,
      n2kArko: 0o100,
    });
    tlak2FormanBazon3D();
    kozunuMesh3D = new THREE.Mesh(qoxaBazo3D.qoxa, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o1, metalness: 0o0,
    }));
    kagani3d.add(kozunuMesh3D);
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
    const tsasaVecax2l = new THREE.BufferGeometry();
    tsasaVecax2l.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 0o3), 0o3));
    tsasaVecax2l.setIndex(new THREE.BufferAttribute(vepaq3DIndeksojn(), 0o1));
    inicializi3DQox2n2kn(tsasaVecax2l);
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
    tsasaMesh = new THREE.Mesh(tsasaVecax2l, new THREE.MeshStandardMaterial({
      color: 0x287888, transparent: true, opacity: 0o43/0o100,
      roughness: 0o5/0o40, metalness: 0o1/0o10, side: THREE.DoubleSide,
    }));
    tsasaMesh.renderOrder = 0o1;
    kagani3d.add(tsasaMesh);
// ⟪ ſᶘᴜ j͑ʃᴜ , 📃 ⟫ , ſᶘᴜ j͑ʃᴜ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
    tsiqGrupo3D = new THREE.Group();
    kagani3d.add(tsiqGrupo3D);
    vepaqTom6Hatsiqn3D();
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
    zace.computeVertexNormals();
    tsasaVecax2l.computeVertexNormals();
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    const ringaVecax2l = new THREE.BufferGeometry();
    ringaVecax2l.setAttribute("position", new THREE.BufferAttribute(new Float32Array(( RINGAPUNKTOJ + 0o1 ) * 0o3), 0o3));
    ringaObjekto = new THREE.Line(ringaVecax2l, new THREE.LineBasicMaterial({ color: 0xffffff }));
    ringaObjekto.visible = false;
    kagani3d.add(ringaObjekto);
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    oxemaniGrupo3D = new THREE.Group();
    oxemaniGrupo3D.visible = tsekeVidebla("hazace");
    kagani3d.add(oxemaniGrupo3D);
    vepaqTom6Hatoxemani();
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    qox2n2kGrupo3D = new THREE.Group();
    qox2n2kGrupo3D.visible = tsekeVidebla("qox2n2k");
    kagani3d.add(qox2n2kGrupo3D);
    vepaqTom6Qox2n2kn3D();
// ſɭэ ֭ſɭэ , ꞙɭɩ ,
// ſɭэ ֭ſɭэ , ꞙɭꞟ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
    k6h6Grupo3D = new THREE.Group();
    k6h6Grupo3D.visible = tsekeVidebla("hak6h6");
    kagani3d.add(k6h6Grupo3D);
    vepaqTom6Hak6h6n3D();
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
    hakama3d = new OrbitControls(catahaq3d, tona3d.domElement);
    hakama3d.target.set(0o0, 0o0, 0o0);
    hakama3d.enableDamping = true;
    hakama3d.dampingFactor = 0o1/0o20;
    hakama3d.minDistance = 0o60;                    // 48 ⟅ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭꞇ ı],ɹ
    hakama3d.maxDistance = 0o1400;                  // 768 ⟅ ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭꞇ ı],ɹ
    hakama3d.maxPolarAngle = Math.PI * 0o37/0o100;
    hakama3d.mouseButtons = { LEFT: -0o1, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    hakama3d.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    tlak23DCakamahan({ ix0: 0o0, ix1: N - 0o1, iz0: 0o0, iz1: N - 0o1 });
  } catch ( tlohk2nik2p2 ) {
    console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) 3D ｡ ɭʃᴜ ｡" , tlohk2nik2p2);
    statuso("3D ｡ ɭʃᴜ ｡");
    tsiinanusabosaiVidon(false);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function tlak23DCakamahan(g: KradaRektangulo): void {
  if ( !t6limaMesh ) return;
  const N1 = N + 0o1;
  const haxekuxa = t6limaMesh.geometry.attributes.position;
  const kol = t6limaMesh.geometry.attributes.color;
  const ix0 = Math.max(0o0, g.ix0), ix1 = Math.min(N, g.ix1 + 0o1);
  const iz0 = Math.max(0o0, g.iz0), iz1 = Math.min(N, g.iz1 + 0o1);
  for ( let j = iz0; j <= iz1; j++ ) {
    for ( let i = ix0; i <= ix1; i++ ) {
      const v = ( j * N1 + i ) * 0o3;
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
      const x = haxekuxa.array[v], z = haxekuxa.array[v + 0o2];
      const d = hal6da[Math.min(j, N - 0o1) * N + Math.min(i, N - 0o1)];
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭэ ,
      const kav = tsasaTseuni ? tsasaTseuni.hah6k6[Math.min(j, N - 0o1) * N + Math.min(i, N - 0o1)] : 0o0;
      const h = kozonuL6da(x, z) + d + kav;
      haxekuxa.array[v + 0o1] = h * YTROIGO;
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
      const [ , deklX, deklZ ] = l6daKunDerivajoj(x, z);
      const k = alneq2qBiomanNuancon(kozuaWeh2(h, x, z, Math.hypot(deklX, deklZ)), x, z, d);
      skrapaLinia.setRGB(k[0o0] / 0o377, k[0o1] / 0o377, k[0o2] / 0o377, THREE.SRGBColorSpace);
      kol.array[v] = skrapaLinia.r;
      kol.array[v + 0o1] = skrapaLinia.g;
      kol.array[v + 0o2] = skrapaLinia.b;
    }
  }
  haxekuxa.needsUpdate = true;
  kol.needsUpdate = true;
  tlak23DTsasan(g);
  t6limaMesh.geometry.computeVertexNormals();
  tlak2FormanBazon3D();
}

// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
function tlak23DTsasan(g: KradaRektangulo): void {
  if ( !tsasaMesh ) return;
  const N1 = N + 0o1;
  const haxekuxa = tsasaMesh.geometry.attributes.position;
  const ix0 = Math.max(0o0, g.ix0), ix1 = Math.min(N, g.ix1 + 0o1);
  const iz0 = Math.max(0o0, g.iz0), iz1 = Math.min(N, g.iz1 + 0o1);
  for ( let j = iz0; j <= iz1; j++ ) {
    const z = Z0 + j * Tona;
    for ( let i = ix0; i <= ix1; i++ ) {
      const x = X0 + i * Tona;
      const v = ( j * N1 + i ) * 0o3;
      const niv = tsasaVem2De(i, j, x, z);
      if ( niv === null ) {
        const d = hal6da[Math.min(j, N - 0o1) * N + Math.min(i, N - 0o1)];
        haxekuxa.array[v + 0o1] = ( kozonuL6da(x, z) + d - 0o20 ) * YTROIGO;
      } else {
        haxekuxa.array[v + 0o1] = niv * YTROIGO;
      }
    }
  }
  haxekuxa.needsUpdate = true;
}

const radiaCabole = new THREE.Raycaster();
const radiaMuso = new THREE.Vector2();
/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param e ( PointerEvent ) - ſɭᴜ ｡
@returns }ʃɹƽ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ ｡ null ( THREE.Vector3 | null ) ⟅ */
function radiaXes2waz(e: PointerEvent): THREE.Vector3 | null {
  if ( !tona3d || !hakama3d || !catahaq3d || !t6limaMesh ) return null;   // 3D ｡ ſɭꞇ ı],ɹ ｡
  const rect = tona3d.domElement.getBoundingClientRect();
  radiaMuso.x = ( ( e.clientX - rect.left ) / rect.width ) * 0o2 - 0o1;
  radiaMuso.y = -( ( e.clientY - rect.top ) / rect.height ) * 0o2 + 0o1;
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  hakama3d.update();
  catahaq3d.updateMatrixWorld();
  radiaCabole.setFromCamera(radiaMuso, catahaq3d);
  const haxes2waz = radiaCabole.intersectObject(t6limaMesh, false);
  return haxes2waz.length > 0o0 ? haxes2waz[0o0].point : null;
}

/* ſɭᴜ ſןᴜ , ꞙɭꞟ ,
   ｡ ſɭᴜ ｡ ſɭᴜ ᶗ‹ ｡ ɭl̀ᴜȝ ｡ ɭl̀ᴜȝ ⟅
    @param p ( THREE.Vector3 | null ) - }ʃɹƽ ｡ null ( ſɭɜ j͐ʃɹ ) ⟅ */
function tlak2Ringon(p: THREE.Vector3 | null): void {
  if ( !ringaObjekto ) return;
  if ( !p ) { ringaObjekto.visible = false; return; }
  const r = oxemaniModo() ? 0o3/0o2 : ka5ik();
  const haxekuxa = ringaObjekto.geometry.attributes.position.array;
  for ( let a = 0o0; a <= RINGAPUNKTOJ; a++ ) {
// ſɭᴜ ſןᴜ , ꞙɭı ,
    const t = a / RINGAPUNKTOJ * 0o4;
    const kek = Math.floor(t) % 0o4;
    const f = t - Math.floor(t);
    const deX = [ 0o0, 0o1, 0o0, -0o1 ][ kek ], deZ = [ -0o1, 0o0, 0o1, 0o0 ][ kek ];
    const alX = [ 0o1, 0o0, -0o1, 0o0 ][ kek ], alZ = [ 0o0, 0o1, 0o0, -0o1 ][ kek ];
    const x = p.x + ( deX + ( alX - deX ) * f ) * r;
    const z = p.z + ( deZ + ( alZ - deZ ) * f ) * r;
    const h = t6limaL6da(x, z);
    haxekuxa[a * 0o3] = x;
    haxekuxa[a * 0o3 + 0o1] = h * YTROIGO;
    haxekuxa[a * 0o3 + 0o2] = z;
  }
  ringaObjekto.geometry.attributes.position.needsUpdate = true;
  ringaObjekto.geometry.setDrawRange(0o0, RINGAPUNKTOJ + 0o1);
  ringaObjekto.visible = true;
}

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
export function tlak23DnIlon(): void {
  if ( !hakama3d ) return;
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
  const moviga = tsekeMovigi() && !oxemaniModo();
  hakama3d.mouseButtons.LEFT = moviga ? THREE.MOUSE.ROTATE : -0o1;
  if ( moviga ){
    radiaTreno = null;
    catsaraPlatiganCelon(null);
    tlak2Ringon(null);
  }
}

// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
function peniko3dSaxei(e: PointerEvent): void {
  if ( e.button !== 0o0 || e.pointerType === "touch" ) return;
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
  if ( oxemaniModo() ) {
    const p = radiaXes2waz(e);
    if ( !p ) return;
    if ( oxemaniIlo() === "movigi" ) {
      const ind = oxemaniJeN2k(p.x, p.z);
      if ( ind >= 0o0 ) saxeiObjektanTrenon(ind, p.x, p.z);
    } else if ( oxemaniIlo() === "h2li" ) {
      const ind = oxemaniJeN2k(p.x, p.z);
      if ( ind >= 0o0 ) h2liObjekton(ind);
    } else {
      neq2qObjekton(p.x, p.z);
    }
    return;
  }
  if ( tsekeMovigi() ){ bal23d.style.cursor = "grabbing"; return; }
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  if ( tikCax2l() === "qox2n2k" ) return;
  const p = radiaXes2waz(e);
  if ( !p ) return;
  e.preventDefault();
// ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
  if ( siicatsiicana() === "tsasa" ) {
    const ind = tsiqJeN2k(p.x, p.z);
    if ( ind >= 0o0 ) saxeiFontanTrenon(ind, p.x, p.z);
    else neq2qTsiqn(p.x, p.z);
    return;
  }
  if ( siicatsiicana() === "tsasaforvisxi" ) {
    const ind = tsiqJeN2k(p.x, p.z);
    if ( ind >= 0o0 ) h2liTsiqn(ind);
    return;
  }
  momenti();
  catsaraTsasaTrenantan(true);
  catsaraPlatiganCelon(siicatsiicana() === "platigi" ? kozonuL6da(p.x, p.z) + l6daInterp(p.x, p.z) : null);
  radiaTreno = { lastX: p.x, lastZ: p.z, ix0: 0o10 ** 0o12, ix1: -( 0o10 ** 0o12 ), iz0: 0o10 ** 0o12, iz1: -( 0o10 ** 0o12 ), t12na: new Map<number, number>() };
  peniko3dTona(p.x, p.z);
}
function peniko3dMovi(e: PointerEvent): void {
  if ( tsekeMovigi() && !oxemaniModo() ) return;   // j͑ʃɹ j͑ʃᴜ ʃɜ ｡ ſɭᴜ ｡
  const p = radiaXes2waz(e);
  radiaN2k = p;
  tlak2Ringon(p);
  if ( oxemaniModo() ) {
    tlak2Haqan2k(p ? p.x : null, p ? p.z : null);
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    if ( oxemaniTrenata() >= 0o0 && p ) sxangiObjektanXekuxan(oxemaniTrenata(), p.x, p.z);
  }
  if ( siicatsiicana() === "tsasa" && tsiqTrenata >= 0o0 && p ) {
    sxangiFontanXekuxan(tsiqTrenata, p.x, p.z);
    return;
  }
  if ( !radiaTreno || !p ) return;
  peniko3dTona(p.x, p.z);
}
function peniko3dFini(): void {
  radiaTreno = null;
  catsaraPlatiganCelon(null);
  finiObjektanTrenon();
  finiFontanTrenon();
  catsaraTsasaTrenantan(false);
  if ( tsekeMovigi() )bal23d.style.cursor = "grab";
}
/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param cx ( number ) - }ʃᴜ j͐ʃᴜ x ʌ j͑ʃɔ ſȷэⅎ ⟅
    @param cz ( number ) - }ʃᴜ j͐ʃᴜ z ʌ j͑ʃɔ ſȷэⅎ ⟅ */
function peniko3dTona(cx: number, cz: number): void {
  const t = radiaTreno;
  if ( !t ) return;
  const h6kuni = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const havepat6ni = Math.max(0o1, Math.ceil(h6kuni / ( 0o23/0o40 )));
  for ( let k = 0o1; k <= havepat6ni; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / havepat6ni;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / havepat6ni;
    const g = siicatsiicanaApliki(px, pz, ka5ik(), g2sa(), siicatsiicana(), t.t12na);
    t.ix0 = Math.min(t.ix0, g.ix0); t.ix1 = Math.max(t.ix1, g.ix1);
    t.iz0 = Math.min(t.iz0, g.iz0); t.iz1 = Math.max(t.iz1, g.iz1);
  }
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  s2tasVeq6k2itan();
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  s2tasTsasaS23ohk2sain();
  statuso("ſɭэ j͐ʃꞇ ｡ ɭʃᴜ");
  const r = ka5ik();
  const px0 = Math.max(0o0, Math.min(REZ - 0o1, mondoxAlPikselo(Math.max(deX, cx) + r + 0o1)));
  const px1 = Math.max(0o0, Math.min(REZ - 0o1, mondoxAlPikselo(Math.min(deX, cx) - r - 0o1)));
  const py0 = Math.max(0o0, Math.min(REZ - 0o1, mondozAlPikselo(Math.max(deZ, cz) + r + 0o1)));
  const py1 = Math.max(0o0, Math.min(REZ - 0o1, mondozAlPikselo(Math.min(deZ, cz) - r - 0o1)));
  revek2feDeklik6h6n(px0 - 0o2, py0 - 0o2, px1 + 0o2, py1 + 0o2);
  pentri(px0, py0, px1, py1);
  s2tasDesegnon();
  tlak23DCakamahan({ ix0: t.ix0, ix1: t.ix1, iz0: t.iz0, iz1: t.iz1 });
}
bal23d.addEventListener("pointerdown", peniko3dSaxei);
bal23d.addEventListener("pointermove", peniko3dMovi);
bal23d.addEventListener("pointerup", peniko3dFini);
bal23d.addEventListener("pointercancel", peniko3dFini);
bal23d.addEventListener("pointerleave", () => tlak2Ringon(null));

// ſɭᴜ ſןᴜ , ꞙɭɿ ,
export function tlak23DnPostL2ha(): void {
  if ( !triaDimensia ) return;
  tlak23DCakamahan({ ix0: 0o0, ix1: N - 0o1, iz0: 0o0, iz1: N - 0o1 });
  tlak2Ringon(radiaN2k);
}

/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param tria ( boolean ) - ſɭꞇ ı],ɹ 3D ſɭᴜ ſןᴜ ⟅ */
export function tsiinanusabosaiVidon(tria: boolean): void {
  triaDimensia = tria;
  kfe<HTMLButtonElement>("kix22d").setAttribute("aria-pressed", String(!tria));
  kfe<HTMLButtonElement>("kix23d").setAttribute("aria-pressed", String(tria));
  bal2.style.display = tria ? "none" : "";
  bal23d.style.display = tria ? "" : "none";
  if ( tria ) {
    eniri3D();
    tlak23DnIlon();
    tlak2Kursoro();
    if ( tona3d && catahaq3d ) {
      const rect = bal23d.getBoundingClientRect();
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
      tona3d.setSize(rect.width, rect.height, false);
      catahaq3d.aspect = rect.width / rect.height;
      catahaq3d.updateProjectionMatrix();
      tlak23DnPostL2ha();
    }
  } else {
    tlak2Kursoro();
  }
}
kfe<HTMLButtonElement>("kix22d").addEventListener("click", () => tsiinanusabosaiVidon(false));
kfe<HTMLButtonElement>("kix23d").addEventListener("click", () => tsiinanusabosaiVidon(true));
window.addEventListener("resize", () => {
  if ( triaDimensia && tona3d && catahaq3d ) {
    const rect = bal23d.getBoundingClientRect();
    tona3d.setSize(rect.width, rect.height, false);
    catahaq3d.aspect = rect.width / rect.height;
    catahaq3d.updateProjectionMatrix();
  }
});
