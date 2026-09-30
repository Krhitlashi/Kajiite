// ≺⧼ ទិដ្ឋភាព 3D 🧊 ⧽≻
// ទិដ្ឋភាព 3D និងការកែសម្រួល 3D របស់ឧបករណ៍ឆ្លាក់ គឺឆាក កាមេរ៉ា សំណាញ់
// ដី និងទឹក ចំណោត ចិញ្ចៀនជក់ ការបាញ់កាំរស្មី និង
// ជក់លើចំណោត។ ស្ថានភាពទិដ្ឋភាពស្ថិតនៅទីនេះ ព្រោះឯកសារមេ
// អានវាដោយផ្ទាល់ ( ការភ្ជាប់ផ្ទាល់របស់ម៉ូឌុល ES ) ហើយអនុគមន៍កំណត់
// ខាងក្រោមគឺជាផ្លូវតែមួយដើម្បីផ្លាស់ប្តូរស្ថានភាពកម្មវិធីកែសម្រួល ( ជក់
// ប្រវត្តិ វត្ថុ ) ដែលស្ថិតនៅក្នុងឯកសារមេ។
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { alternajDiagonalojn, terenaStrataKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { premuAlFormo, kreiFormanBazon, MONDO_BAZA_Y } from "../../../eskekoj/komunajxoj/mapformo.js";
import type { FormaBazo, MapFormo } from "../../../eskekoj/komunajxoj/mapformo.js";
import { REZ, mondoxAlPikselo, mondozAlPikselo } from "./mezuroj.js";
import type { KradaRektangulo } from "./mezuroj.js";
import { elemento } from "../../komunajxoj/dom.js";
import { terenaKoloro255, almetiBiomanNuancon, deltoKunDerivajoj,
  rekalkuliDeklivojn, pentri } from "./bako.js";
// ទឹក គឺសំណាញ់ទឹកតាមកម្រិតនៃការគណនា ( មិនមែន
// ម៉ាសដែលគូរទេ ) ហើយសញ្ញាប្រភពបង្ហាញប្រភពទាំងនោះ។
import { fontoj, elektitaFonto, fontoTrenata, akvaRezulto, akvaNiveloDe,
  teraAlto, fontoCxePunkto, metiFonton, forigiFonton, komenciFontanTrenon,
  sxangiFontanPozicion, finiFontanTrenon, markiAkvonMalpuran,
  agordiAkvoTrenantan } from "./akvo.js";

// ⟪ ស្ថានភាពទិដ្ឋភាព 📃 ⟫ គឺឆាក និងសំណាញ់របស់វា កាមេរ៉ា
// ចិញ្ចៀនជក់ និងរទេះកាំរស្មី។ ឯកសារមេអានពួកវាដោយផ្ទាល់ រីឯ
// អនុគមន៍កំណត់ ( agordiVidon ) ភ្ជាប់កម្មវិធីកែសម្រួល។
export let triaDimensia = false;      // តើទិដ្ឋភាព 3D បង្ហាញ
export let bildilo3d: THREE.WebGLRenderer | null = null;
export let sceno3d: THREE.Scene | null = null;
export let fotilo3d: THREE.PerspectiveCamera | null = null;
export let regiloj3d: OrbitControls | null = null;
export let teraMesh: THREE.Mesh | null = null;
export let akvaMesh: THREE.Mesh | null = null;
export let ringaObjekto: THREE.Line | null = null;
// RadiaTreno គឺស្ថានភាពនៃការអូសជក់ 3D ( កូអរដោនេពិភពលោកចុងក្រោយ
// និងចតុកោណកែងសំណាញ់ដែលការអូសបានប៉ះ )។
export interface RadiaTreno {
  lastX: number;
  lastZ: number;
  ix0: number;
  ix1: number;
  iz0: number;
  iz1: number;
  tuŝitaj: Map<number, number>;
}
export let radiaTreno: RadiaTreno | null = null;
export let radiaPunkto: THREE.Vector3 | null = null;   // ការបាញ់កាំរស្មីចុងក្រោយលើដី
// ក្រុមរបស់ឆាក គឺវត្ថុដែលបានដាក់ ( រូបរាង 3D ពិត ) ទីក្រុងសំណាញ់
// ផ្លូវសំណាញ់របស់ស្ថានីយ និងផ្លូវកម្រិតពិភពលោក។ ឯកសារមេ
// បំពេញពួកវា ( rekonstruiObjektojn, rekonstruiKradon3D, rekonstruiVojojn3D )
// ហើយបើកបិទភាពមើលឃើញរបស់ពួកវា រីឯក្រុមខ្លួនឯងកើតឡើងនៅទីនេះ ( eniri3D )។
export let objektaGrupo3D: THREE.Group | null = null;
export let kradaGrupo3D: THREE.Group | null = null;           // រូបរាង 3D របស់ទីក្រុងសំណាញ់ ( តែក្នុងផ្ទាំង សំណាញ់ )
export let kradaStaciaGrupo3D: THREE.Group | null = null;     // ផ្លូវសំណាញ់របស់ស្ថានីយ ដែលលាក់ខ្លួនពេលផ្ទាំងរង ផ្លូវ
export let vojaGrupo3D: THREE.Group | null = null;            // រូបរាង 3D របស់ផ្លូវកម្រិតពិភពលោក ( តែក្នុងផ្ទាំងរង ផ្លូវ )
export const YTROIGO = 0o24/0o10;             // 2.5 គឺការបំផ្លើសបញ្ឈរសម្រាប់ចំណោត
const RINGA_PUNKTOJ = 0o100;                  // 64 គឺចម្រៀកនៃចិញ្ចៀនជក់
export const mapo3d = elemento<HTMLCanvasElement>("mapo3d");
// ផ្ទាំងគំនូរ 2D គឺធាតុដូចគ្នានឹងឯកសារមេ ហើយ sxaltiVidon
// បិទវាជាមួយផ្ទាំងគំនូរ 3D ( ទិដ្ឋភាពទាំងពីរឆ្លាស់គ្នា )។
const mapo = elemento<HTMLCanvasElement>("mapo");
// សន្លឹកស្ទីលក្នុងតំបន់ ( stiloj.css ) បំពេញទទឹង ហើយកាត់
// រូបភាព WebGL ឱ្យមានជ្រុងមូល។
mapo3d.style.cursor = "crosshair";
mapo3d.style.touchAction = "none";
mapo3d.style.display = "none";

// ចំណោត និងបាតពិភពលោក សញ្ញាប្រភព និងពណ៌ខូចនៃ
// សំណាញ់ដី ដែលមានតែទិដ្ឋភាព 3D ប្រើ។
let formoBazo3D: FormaBazo | null = null;
let bazaMesh3D: THREE.Mesh | null = null;
let fontaGrupo3D: THREE.Group | null = null;
// skrapaLinia គឺពណ៌ THREE.Color សម្រាប់សំណាញ់ 3D ( បៃ sRGB នៃ
// ស្រទាប់សម្លេងដែលបំប្លែងត្រឡប់ទៅកន្លែងធ្វើការលីនេអ៊ែរ ព្រោះហ្គេមសរសេរ
// ពណ៌កំពូលជាលីនេអ៊ែរ ដូច្នេះទិដ្ឋភាព 3D របស់ឧបករណ៍ឥឡូវត្រូវគ្នា )។
const skrapaLinia = new THREE.Color();

// ⟪ ការភ្ជាប់ជាមួយកម្មវិធីកែសម្រួល 📃 ⟫ គឺការយោងរបស់ឯកសារមេ ដែល
// ភ្ជាប់តែម្តងដោយ agordiVidon។ តារាង និងអនុគមន៍របស់កម្មវិធីកែសម្រួល ( ជក់
// ស្ថានភាព ប្រវត្តិ វត្ថុ សំណាញ់ ) ស្ថិតនៅទីនោះ រីឯ
// តម្លៃដែលផ្លាស់ប្តូរពេលប្រើត្រូវបានអានដោយអនុគមន៍។
interface Vido3DLigo {
  deltoj: Float32Array;
  deltoInterp: ( x: number, z: number ) => number;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  formo: () => [ MapFormo, number ];
  peniko: () => string;
  radiuso: () => number;
  forto: () => number;
  penikoApliki: ( px: number, pz: number, radiuso: number, forto: number,
    peniko: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
  agordiPlatiganCelon: ( v: number | null ) => void;
  momenti: () => void;
  statuso: ( teksto: string ) => void;
  markiSxangxitan: () => void;
  markiDesegnon: () => void;
  cxuMovigi: () => boolean;
  gxisdatigiKursoro: () => void;
  gxisdatigiKoordinatojn: ( x: number | null, z: number | null ) => void;
  aktivaTabo: () => string;
  vojojAktiva: () => boolean;
  objektaModo: () => boolean;
  objektaIlo: () => string;
  objektaTrenata: () => number;
  objektoCxePunkto: ( x: number, z: number ) => number;
  metiObjekton: ( x: number, z: number ) => void;
  forigiObjekton: ( i: number ) => void;
  komenciObjektanTrenon: ( ind: number, x: number, z: number ) => void;
  sxangiObjektanPozicion: ( ind: number, x: number, z: number ) => void;
  finiObjektanTrenon: () => void;
  rekonstruiObjektojn: () => void;
  rekonstruiKradon3D: () => void;
  rekonstruiVojojn3D: () => void;
}
let deltoj: Float32Array;
let deltoInterp: ( x: number, z: number ) => number;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let formo: () => [ MapFormo, number ];
let peniko: () => string;
let radiuso: () => number;
let forto: () => number;
let penikoApliki: ( px: number, pz: number, radiuso: number, forto: number,
  peniko: string, tusxitaj: Map<number, number> ) => KradaRektangulo;
let agordiPlatiganCelon: ( v: number | null ) => void;
let momenti: () => void;
let statuso: ( teksto: string ) => void;
let markiSxangxitan: () => void;
let markiDesegnon: () => void;
let cxuMovigi: () => boolean;
let gxisdatigiKursoro: () => void;
let gxisdatigiKoordinatojn: ( x: number | null, z: number | null ) => void;
let aktivaTabo: () => string;
let vojojAktiva: () => boolean;
let objektaModo: () => boolean;
let objektaIlo: () => string;
let objektaTrenata: () => number;
let objektoCxePunkto: ( x: number, z: number ) => number;
let metiObjekton: ( x: number, z: number ) => void;
let forigiObjekton: ( i: number ) => void;
let komenciObjektanTrenon: ( ind: number, x: number, z: number ) => void;
let sxangiObjektanPozicion: ( ind: number, x: number, z: number ) => void;
let finiObjektanTrenon: () => void;
let rekonstruiObjektojn: () => void;
let rekonstruiKradon3D: () => void;
let rekonstruiVojojn3D: () => void;

/* agordiVidon គឺការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( Vido3DLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiVidon(k: Vido3DLigo): void {
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

// ⟪ ទិដ្ឋភាព 3D និងការកែសម្រួល 📃 ⟫
// konstrui3DIndeksojn គឺសំណាញ់ត្រីកោណសម្រាប់កំពូល ( N + 1 )² ពី
// ឧបករណ៍សាងសង់រួម ( ការឆ្លាស់អង្កត់ទ្រូងដូចក្តារអុក ដូចដី
// របស់ហ្គេមក្នុង scena.ts ដែលពីមុនចម្លងនៅទីនេះ )។
function konstrui3DIndeksojn(){
  return alternajDiagonalojn(N);
}

// inicializi3DKradon គឺសំណាញ់ផ្តេក ( x, z ) របស់កំពូល។ សំណាញ់
// ជាការ៉េ ( សំណាញ់ទិន្នន័យជាការ៉េ ) ប៉ុន្តែពិភពលោកជា
// រូបរាងផែនទី ដូច្នេះកំពូលខាងក្រៅត្រូវបានច្របាច់ទៅគែម ដូច្នេះទិដ្ឋភាព 3D
// បង្ហាញរូបរាងដូចហ្គេម ( ហើយចំណោតតាមគែមនោះ )។
/* ច្របាច់កំពូលខាងក្រៅនៃសំណាញ់ទៅគែមនៃរូបរាងពិភពលោក។
    @param geometrio ( THREE.BufferGeometry ) - ធរណីមាត្ររបស់ដី ឬ
        ទឹក។ */
function inicializi3DKradon(geometrio: THREE.BufferGeometry): void {
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

// gxisdatigiFormon3D គឺរូបរាង ឬទំហំពិភពលោកបានផ្លាស់ប្តូរ ដូច្នេះច្របាច់
// កំពូលគែមម្តងទៀតទៅគែមថ្មី ផ្ទុកចំណោតឡើងវិញ និង
// គូរដីឡើងវិញ។
export function gxisdatigiFormon3D(): void {
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

// grundo3D គឺអនុគមន៍កម្ពស់ដីនៃទិដ្ឋភាព 3D ( ជាមួយការបំផ្លើសកម្ពស់ )។
function grundo3D(x: number, z: number): number { return teraAlto(x, z) * YTROIGO; }

// ⟨ សញ្ញាប្រភព ( ក្នុងទិដ្ឋភាព 3D ) 📃 ⟩ គឺក្រុមមួយសម្រាប់ប្រភពទាំងអស់ ជាមួយ
// ស្វ៊ែរ ( រង្វាស់តាមលំហូរ ) និងចិញ្ចៀននៅដី។ ក្រុម
// ត្រូវបានសាងសង់ឡើងវិញពេលប្រភព ឬដីផ្លាស់ប្តូរ។
export function rekonstruiFontojn3D(): void {
  if ( !fontaGrupo3D ) return;
  for ( const infano of fontaGrupo3D.children.slice() ) {
    fontaGrupo3D.remove(infano);
    if ( infano instanceof THREE.Mesh ) infano.geometry.dispose();
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

// gxisdatigiFormanBazon3D គឺធ្វើឱ្យចំណោតតាមដីនៃទិដ្ឋភាព 3D។
function gxisdatigiFormanBazon3D(): void {
  if ( !formoBazo3D ) return;
  formoBazo3D.aktualigu(grundo3D, MONDO_BAZA_Y * YTROIGO);
}

// eniri3D គឺសាងសង់ឆាក 3D ទាំងមូលតែម្តង ( ការបើកទិដ្ឋភាព 3D លើកដំបូង )។
function eniri3D(): void {
  if ( bildilo3d ) return;
  try {
    sceno3d = new THREE.Scene();
    // មេឃ គឺជម្រាលបញ្ឈរ ( សម្លេងដូចហ្គេម ) និងអ័ព្ទ
    // ដែលបញ្ចូលដីឆ្ងាយទៅនឹងជើងមេឃ។
    const cieloK = document.createElement("canvas");
    cieloK.width = 2; cieloK.height = 0o200;
    const ck = cieloK.getContext("2d");
    if ( !ck ) throw new Error("La 2D-kunteksto de la ciela gradiento ne haveblas");
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
    fotilo3d.position.set(0o400, 0o300, 0o400);   // ( 256, 192, 256 ) ។ ទីតាំងដំបូងរបស់កាមេរ៉ា
    bildilo3d = new THREE.WebGLRenderer({ canvas: mapo3d, antialias: true });
    // ពន្លឺ គឺពន្លឺមេឃក្នុងផ្ទះ និងព្រះអាទិត្យពីទិសពាយ័ព្យ។
    const hemo = new THREE.HemisphereLight(0xb8d8e8, 0x384838, 0.9);
    sceno3d.add(hemo);
    const suno = new THREE.DirectionalLight(0xf8f0d8, 1.1);
    suno.position.set(-0o400, 0o470, 0o300);      // ( -256, 312, 192 ) ។ ទីតាំងរបស់ព្រះអាទិត្យ
    sceno3d.add(suno);
    sceno3d.add(new THREE.AmbientLight(0x404848, 0.4));
    // សំណាញ់ដី គឺសំណាញ់ដូចការឆ្លាក់ ជាមួយពណ៌បញ្ឈរ។
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
    // ចំណោត និងបាតពិភពលោក គឺរូបរាង និងបន្ទះពណ៌ដូចគ្នា
    // ដូចក្នុងហ្គេម ( scena.ts ) ដើម្បីឱ្យទិដ្ឋភាព 3D បង្ហាញរូបរាងពិត
    // នៃគែមពិភពលោក។
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
    // ទឹក គឺផ្ទៃថ្លាតាមកម្រិត ហើយក្រឡាគ្មានទឹក
    // ត្រូវបានលិចក្រោមដីដើម្បីមិនឱ្យមើលឃើញ។
    const akvaGeometrio = new THREE.BufferGeometry();
    akvaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N1 * N1 * 3), 3));
    akvaGeometrio.setIndex(new THREE.BufferAttribute(konstrui3DIndeksojn(), 1));
    inicializi3DKradon(akvaGeometrio);
    // ទឹកថ្លាពាក់កណ្តាល ដើម្បីឱ្យបាតដែលមានពណ៌ ( និង
    // ការឆ្លាក់ក្រោមផ្ទៃ ) មើលឃើញពេលកែសម្រួល។
    akvaMesh = new THREE.Mesh(akvaGeometrio, new THREE.MeshStandardMaterial({
      color: 0x287888, transparent: true, opacity: 0.55,
      roughness: 0.15, metalness: 0o1/0o10, side: THREE.DoubleSide,
    }));
    akvaMesh.renderOrder = 1;
    sceno3d.add(akvaMesh);
    // ⟪ ប្រភពទឹក 📃 ⟫ គឺសញ្ញាតូចៗនៅប្រភពទឹក ដើម្បី
    // ឱ្យគេឃើញកន្លែងដែលទន្លេហូរចេញ ( ព្រោះប្រភពជាការបញ្ចូល )។
    fontaGrupo3D = new THREE.Group();
    sceno3d.add(fontaGrupo3D);
    rekonstruiFontojn3D();
    // ណរម៉ាល់សម្រាប់សំណាញ់ទាំងពីរ ព្រោះ MeshStandardMaterial ត្រូវការគុណលក្ខណៈនៅ
    // ការបង្ហាញដំបូង ( gxisdatigi3DMeshon គណនាដីឡើងវិញរាល់ដង )។
    geometrio.computeVertexNormals();
    akvaGeometrio.computeVertexNormals();
    // ចិញ្ចៀនជក់ គឺតាមដីនៅទ្រនិច។
    const ringaGeometrio = new THREE.BufferGeometry();
    ringaGeometrio.setAttribute("position", new THREE.BufferAttribute(new Float32Array(( RINGA_PUNKTOJ + 1 ) * 3), 3));
    ringaObjekto = new THREE.Line(ringaGeometrio, new THREE.LineBasicMaterial({ color: 0xffffff }));
    ringaObjekto.visible = false;
    sceno3d.add(ringaObjekto);
    // វត្ថុដែលបានដាក់ គឺសំណាញ់ 3D ពិត ( ឧបករណ៍សាងសង់ដូច
    // ហ្គេម ) ដែលសាងសង់ឡើងវិញរាល់ការផ្លាស់ប្តូរ។
    objektaGrupo3D = new THREE.Group();
    sceno3d.add(objektaGrupo3D);
    rekonstruiObjektojn();
    // ទីក្រុងសំណាញ់ គឺរូបរាង 3D របស់ការតំរង់បច្ចុប្បន្ន។ មើលឃើញតែពេល
    // ផ្ទាំង សំណាញ់ សកម្ម ( sxaltiIlTabon គ្រប់គ្រងភាពមើលឃើញ )។
    kradaGrupo3D = new THREE.Group();
    kradaGrupo3D.visible = aktivaTabo() === "krado";
    sceno3d.add(kradaGrupo3D);
    // ផ្លូវសំណាញ់របស់ស្ថានីយ គឺផ្នែកបន្ថែមនៃផ្លូវកម្រិតពិភពលោក (
    // មហាវិថីកំពង់ )។ ពួកវាបង្ហាញជាមួយសំណាញ់ក្នុងផ្ទាំងរង
    // កែក្រឡា ប៉ុន្តែលាក់ខ្លួនពេលផ្ទាំងរង ផ្លូវ ព្រោះនៅទីនោះ
    // ផ្លូវពិតរបស់ពិភពលោកបង្ហាញ ហើយផ្លូវស្ថានីយនឹងស្ទួនលើផ្លូវដូចគ្នា។
    kradaStaciaGrupo3D = new THREE.Group();
    kradaStaciaGrupo3D.visible = aktivaTabo() === "krado" && !vojojAktiva();
    sceno3d.add(kradaStaciaGrupo3D);
    rekonstruiKradon3D();
    // ផ្លូវកម្រិតពិភពលោក គឺផ្លូវពិតរបស់ហ្គេម ( ឆ្នូតឌីអូរីត
    // និងអង់ដេស៊ីត ) ដែលមើលឃើញតែពេលផ្ទាំងរង ផ្លូវ ( vojojAktiva )។
    vojaGrupo3D = new THREE.Group();
    vojaGrupo3D.visible = vojojAktiva();
    sceno3d.add(vojaGrupo3D);
    rekonstruiVojojn3D();
    // ការវិលជុំ។ ការចុចស្តាំបង្វិល ការចុចកណ្តាលផ្លាស់ទី កង់ពង្រីក រីឯ
    // ការចុចឆ្វេងនៅសល់សម្រាប់ជក់។
    regiloj3d = new OrbitControls(fotilo3d, bildilo3d.domElement);
    regiloj3d.target.set(0, 0, 0);
    regiloj3d.enableDamping = true;
    regiloj3d.dampingFactor = 0o1/0o20;
    regiloj3d.minDistance = 0o60;                    // 48 ។ ចម្ងាយជិតបំផុតនៃការពង្រីក
    regiloj3d.maxDistance = 0o1400;                  // 768 ។ ចម្ងាយឆ្ងាយបំផុតនៃការពង្រីក
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

// gxisdatigi3DMeshon គឺគណនាកម្ពស់ និងពណ៌របស់សំណាញ់ដីក្នុង
// ចតុកោណកែងសំណាញ់ g ( ix0..ix1, iz0..iz1, ក្រឡាសំណាញ់ )។ ទឹកតាម។
export function gxisdatigi3DMeshon(g: KradaRektangulo): void {
  if ( !teraMesh ) return;
  const N1 = N + 1;
  const poz = teraMesh.geometry.attributes.position;
  const kol = teraMesh.geometry.attributes.color;
  const ix0 = Math.max(0, g.ix0), ix1 = Math.min(N, g.ix1 + 1);
  const iz0 = Math.max(0, g.iz0), iz1 = Math.min(N, g.iz1 + 1);
  for ( let j = iz0; j <= iz1; j++ ) {
    for ( let i = ix0; i <= ix1; i++ ) {
      const v = ( j * N1 + i ) * 3;
      // កម្ពស់មកពីទីតាំងដែលបានច្របាច់ ព្រោះកំពូលដែលច្របាច់ទៅគែម
      // ទទួលកម្ពស់របស់គែម ដូច្នេះគែមដី និងចំណោត
      // ជាប់គ្នាដោយគ្មានជណ្តើរ។
      const x = poz.array[v], z = poz.array[v + 2];
      const d = deltoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)];
      // ជាមួយព្រែកកាត់ទឹក គឺគ្រែទន្លេមើលឃើញក្នុងទិដ្ឋភាព 3D ដូច
      // ក្នុងហ្គេម ( alteco() = bazaAlteco + skulptaDelta + akvaEltrancxo )។
      const kav = akvaRezulto ? akvaRezulto.kavoj[Math.min(j, N - 1) * N + Math.min(i, N - 1)] : 0;
      const h = bazaAlteco(x, z) + d + kav;
      poz.array[v + 1] = h * YTROIGO;
      // ជម្រាលពីផ្ទៃទ្វេកោងវិភាគ ព្រោះការលោតថ្មនៃបន្ទះពណ៌រួម
      // ត្រូវការវា ( ការបញ្ចូលដូចក្នុង scena.ts )។
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

// gxisdatigi3DAkvon គឺកម្រិតទឹកសម្រាប់កំពូលនីមួយៗក្នុងចតុកោណកែង។
// ក្រឡាគ្មានទឹកលិចក្រោមដី។
function gxisdatigi3DAkvon(g: KradaRektangulo): void {
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

const radiaRadio = new THREE.Raycaster();
const radiaMuso = new THREE.Vector2();
/* ការបាញ់កាំរស្មីរបស់កណ្ដុរលើសំណាញ់ដី ( ឬគ្មានចំណុច )។
    @param e ( PointerEvent ) - ព្រឹត្តិការណ៍កណ្ដុរ។
@returns ចំណុចដែលបាញ់ត្រូវ ឬ null ( THREE.Vector3 | null )។ */
function radiaTrafo(e: PointerEvent): THREE.Vector3 | null {
  if ( !bildilo3d || !regiloj3d || !fotilo3d || !teraMesh ) return null;   // ទិដ្ឋភាព 3D មិនទាន់រួចរាល់
  const rect = bildilo3d.domElement.getBoundingClientRect();
  radiaMuso.x = ( ( e.clientX - rect.left ) / rect.width ) * 2 - 1;
  radiaMuso.y = -( ( e.clientY - rect.top ) / rect.height ) * 2 + 1;
  // ម៉ាទ្រីសកាមេរ៉ាត្រូវបានបង្កើតតែពេលបង្ហាញរូប ដូច្នេះធ្វើឱ្យវាស្រស់
  // មុនការបាញ់កាំរស្មី ដើម្បីឱ្យការចុចដំបូងបាញ់ត្រូវច្បាស់។
  regiloj3d.update();
  fotilo3d.updateMatrixWorld();
  radiaRadio.setFromCamera(radiaMuso, fotilo3d);
  const trafoj = radiaRadio.intersectObject(teraMesh, false);
  return trafoj.length > 0 ? trafoj[0].point : null;
}

/* ចិញ្ចៀនជក់តាមដីនៅចំណុចកាំរស្មី។
    @param p ( THREE.Vector3 | null ) - ចំណុចកាំរស្មី ឬ null ( លាក់វា )។ */
function gxisdatigiRingon(p: THREE.Vector3 | null): void {
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

// gxisdatigi3DnIlon គឺឧបករណ៍បានផ្លាស់ប្តូរ។ ក្នុង Movigi ✋ ការចុចឆ្វេងបង្វិល
// កាមេរ៉ា ( OrbitControls ) ហើយការឆ្លាក់ត្រូវបានចាក់សោ រីឯក្នុងជក់
// ការចុចឆ្វេងនៅសល់សម្រាប់ការឆ្លាក់ ( LEFT. -1 បិទការបង្វិល )។
export function gxisdatigi3DnIlon(): void {
  if ( !regiloj3d ) return;
  // ឧបករណ៍វត្ថុប្រព្រឹត្តដូចជក់ ព្រោះការចុចឆ្វេងដាក់វត្ថុ
  // មិនបង្វិលកាមេរ៉ា ( ទោះបីជក់ចុងក្រោយជា Movigi ✋ )។
  const moviga = cxuMovigi() && !objektaModo();
  regiloj3d.mouseButtons.LEFT = moviga ? THREE.MOUSE.ROTATE : -1;
  if ( moviga ){
    radiaTreno = null;
    agordiPlatiganCelon(null);
    gxisdatigiRingon(null);
  }
}

// ជក់ 3D គឺការចុចឆ្វេង និងការអូសឆ្លាក់ផ្ទាល់លើចំណោត
// ( លើកលែងក្នុងឧបករណ៍មើល Movigi ✋ ដែលបង្វិលកាមេរ៉ា )។
function peniko3dKomenci(e: PointerEvent): void {
  if ( e.button !== 0 || e.pointerType === "touch" ) return;
  // ឧបករណ៍វត្ថុ គឺឧបករណ៍រងសម្រេចការចុច ( ដូចលើផែនទី 2D )។
  // Meti ➕ ដាក់ Movu ✋ ចាប់ដើម្បីអូស Forigi 🗑️ លុប។
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
  // ផ្ទាំង សំណាញ់ កែតែលើផែនទី 2D ដូច្នេះទិដ្ឋភាព 3D មិនឆ្លាក់ទេ។
  if ( aktivaTabo() === "krado" ) return;
  const p = radiaTrafo(e);
  if ( !p ) return;
  e.preventDefault();
  // ឧបករណ៍ទឹកដាក់ និងលុបប្រភពនៅក្នុងទិដ្ឋភាព 3D ផងដែរ ( ឥរិយាបថ
  // ដូចលើផែនទី 2D )។
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
  radiaTreno = { lastX: p.x, lastZ: p.z, ix0: 1e9, ix1: -1e9, iz0: 1e9, iz1: -1e9, tuŝitaj: new Map<number, number>() };
  peniko3dPasxo(p.x, p.z);
}
function peniko3dMovi(e: PointerEvent): void {
  if ( cxuMovigi() && !objektaModo() ) return;   // ការវិលជុំខ្លួនឯងផ្លាស់ទីកាមេរ៉ា
  const p = radiaTrafo(e);
  radiaPunkto = p;
  gxisdatigiRingon(p);
  if ( objektaModo() ) {
    gxisdatigiKoordinatojn(p ? p.x : null, p ? p.z : null);
    // Movu ✋ គឺវត្ថុដែលបានចាប់តាមចំណុចកាំរស្មី។
    if ( objektaTrenata() >= 0 && p ) sxangiObjektanPozicion(objektaTrenata(), p.x, p.z);
  }
  if ( peniko() === "akvo" && fontoTrenata >= 0 && p ) {
    sxangiFontanPozicion(fontoTrenata, p.x, p.z);
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
  if ( cxuMovigi() )mapo3d.style.cursor = "grab";
}
/* ជក់កាំរស្មី គឺអនុវត្តជក់តាមផ្លូវរវាងចំណុចពីរ។
    @param cx ( number ) - ពិភពលោក x ថ្មី។
    @param cz ( number ) - ពិភពលោក z ថ្មី។ */
function peniko3dPasxo(cx: number, cz: number): void {
  const t = radiaTreno;
  if ( !t ) return;
  const disto = Math.hypot(cx - t.lastX, cz - t.lastZ);
  const pasoj = Math.max(1, Math.ceil(disto / 0.6));
  for ( let k = 1; k <= pasoj; k++ ) {
    const px = t.lastX + ( cx - t.lastX ) * k / pasoj;
    const pz = t.lastZ + ( cz - t.lastZ ) * k / pasoj;
    const g = penikoApliki(px, pz, radiuso(), forto(), peniko(), t.tuŝitaj);
    t.ix0 = Math.min(t.ix0, g.ix0); t.ix1 = Math.max(t.ix1, g.ix1);
    t.iz0 = Math.min(t.iz0, g.iz0); t.iz1 = Math.max(t.iz1, g.iz1);
  }
  // ចំណុចចាស់មុនការធ្វើបច្ចុប្បន្នភាព ដើម្បីឱ្យការគូរ 2D គ្របដណ្តប់ផ្លូវ
  // ទាំងមូល ( ដូចក្នុង penikoPasxo )។
  const deX = t.lastX, deZ = t.lastZ;
  t.lastX = cx; t.lastZ = cz;
  markiSxangxitan();
  // ដីបានផ្លាស់ប្តូរ ដូច្នេះទឹក ( អាង ទន្លេ ព្រែកកាត់ )
  // អាស្រ័យលើវា ដូច្នេះទឹកនឹងត្រូវគណនាឡើងវិញនៅចុងបញ្ចប់នៃជំហានជក់។
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

// gxisdatigi3DnPostPlena គឺការធ្វើបច្ចុប្បន្នភាព 3D ពេញលេញក្រោយការត្រឡប់វិញ ការធ្វើឡើងវិញ ឬការផ្ទុក។
export function gxisdatigi3DnPostPlena(): void {
  if ( !triaDimensia ) return;
  gxisdatigi3DMeshon({ ix0: 0, ix1: N - 1, iz0: 0, iz1: N - 1 });
  gxisdatigiRingon(radiaPunkto);
}

/* បើកបិទរវាងផែនទី 2D និងចំណោត 3D។
    @param tria ( boolean ) - តើទិដ្ឋភាព 3D បង្ហាញ។ */
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
      // updateStyle=false ដើម្បីឱ្យទទឹង CSS ( 100% ) នៅដដែល ហើយមានតែបូហ្វឺរូបភាព
      // តាមធុង ( បើមិនដូច្នេះភិចសែលថេរនឹងធ្វើឱ្យទទឹងពេញខូច )។
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
