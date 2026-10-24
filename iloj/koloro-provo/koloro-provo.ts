// ≺⧼ សាកល្បងពណ៌ស្មៅ និងដី 🎨 ⧽≻
// ⟨ បណ្តោះអាសន្ន ៖ ឆាកបង្ហាញពណ៌ទាំងអស់នៃតារាងដី ។ ដីសាងឡើងដើម្បីឱ្យទឹកជ្រៅ ,
// ច្រាំង , វាលស្មៅ , ថ្ម , ព្រិល និងទឹកកក លេចឡើងទាំងអស់ក្នុងឆាកតែមួយ ។
// គែមដីបង្ហាញស្រទាប់ក្រោមដី ។ ស្មៅជាស្មៅពិតរបស់ហ្គេម ។ ផ្ទះសាតាឡាឈរនៅកណ្តាល ។
// ដើរដោយ W A S D , បង្វិលដោយកណ្តុរ ។ បើក `iloj/koloro-provo/koloro-provo.html` ។ លុបបាន ។ 📃 ⟩
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  KLINGAJ_KOLOROJ, SEKA_KLINGO, TERENA_KOLOROJ,
  bruo2D, herbaKlingaKoloro, sekaHerbaKlingaKoloro,
  terenaKoloroEn, terenaStrataKoloroEn,
  type TerenajKoloroj,
} from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { kreiGrundanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/grundo.js";
import { kreiGrundanBumpanTeksajxon }
  from "../../eskekoj/komunajxoj/teksajxoj/grundo-bumpo.js";
import {
  HERBA_AKSOJ, HERBA_CXELO, HERBA_LARGO, HERBA_SEMO, HERBA_SEMA_PASO,
  HERBA_VARIANTOJ, herbaTufaKoloroEn, kalkuliHerbanTufon, kreiBiomajnKolorojn,
  kreiHerbanTavolanKopion, kreiHerbanTavolanMaterialon,
  konstruiHerbanTavolanGeometrion,
  type HerbaTufaOpcioj, type HerbaTufo,
} from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { gxisdatigiHerbon }
  from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/vento.js";
import { konstruiSatalon }
  from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { TIPAJ_NIVELOJ, type KonstruSpec }
  from "../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import type { Biomo } from "../../kantaoj/mondo/tereno.js";
import { kreiCxielon } from "../../kantaoj/bildo/scena/cxielo.js";
import { kreiPaletrojn } from "../../kantaoj/bildo/scena/paletroj.js";

// ⟪ ទំហំឆាក 📏 ⟫
const GRANDO = 0o70;           // 56 m ជ្រុង
const SEGMENTOJ = 0o160;       // 112 ចែក
// ⟨ វាលស្មៅ ៖ តូចជាងដីបន្តិច ដើម្បីកុំឱ្យដុំស្មៅហូរចេញពីគែមដី ។ 📃 ⟩
const HERBA_KAMPO = GRANDO - 0o10;

// ⟪ ខ្សែកាត់ដី 📐 ⟫
// ⟨ ដីរាបនៅកណ្តាល ដើម្បីដាក់ផ្ទះ ។ ទឹកនៅខាងមុខឆាក , ភ្នំនៅខាងក្រោយ ,
// ដូច្នេះកាមេរ៉ាដំបូងឃើញពណ៌ទាំងអស់ក្នុងរូបតែមួយ ។ 📃 ⟩
const AKVA_NIVELO = 0;
const PLATEAU_Y = 0o4;
const BAZA_Y = -0o24;
const DOMO_X = 0;
const DOMO_Z = 0o4;

// ⟨ ការលាយរលូន 0 ដល់ 1 រវាង a និង b ។ 📃 ⟩
function glata( a: number, b: number, t: number ): number {
  const x = Math.max(0, Math.min(1, ( t - a ) / ( b - a )));
  return x * x * ( 3 - 2 * x );
}

// ⟨ កម្ពស់ដីសាកល្បង ៖ បាតទឹក , ច្រាំង , វាលស្មៅ , ចំណោតថ្ម និងកំពូលព្រិល ។
//   ខ្សែកាត់ដើរតាមអ័ក្ស z ដោយបន្ថែមសំឡេងរំខានតូច ដើម្បីកុំឱ្យដូចជណ្តើរ ។ 📃 ⟩
function altecoProva( x: number, z: number ): number {
  const bruo = ( bruo2D(x / 0o23, z / 0o23) - 0o1/0o2 ) * 0o6
    + ( bruo2D(x / 0o7, z / 0o7) - 0o1/0o2 ) * 0o2;
  const t = -z + bruo;
  let y = -0o12;
  y += 0o12 * glata(-0o26, -0o20, t);
  y += 0o2 * glata(-0o22, -0o14, t);
  y += 0o2 * glata(-0o14, -0o2, t);
  y += 0o20 * glata(-0o2, 0o14, t);
  y += 0o20 * glata(0o14, 0o22, t);
  return y;
}

// ⟨ កម្ពស់ដីទាំងមូល ៖ រាបស្មើជុំវិញផ្ទះ រួចលាយចូលខ្សែកាត់ធម្មជាតិ ។ 📃 ⟩
function altecoTera( x: number, z: number ): number {
  const ebena = 1 - glata(0o10, 0o16, Math.hypot(x - DOMO_X, z - DOMO_Z));
  return altecoProva(x, z) * ( 1 - ebena ) + PLATEAU_Y * ebena;
}

// ⟨ កម្រិតទឹកសម្រាប់ការគូរពណ៌ ៖ ថេរ , ដូច្នេះច្រាំងស្ថិតនៅកម្រិត 0 ជានិច្ច ។ 📃 ⟩
const niveloAkva = (): number => AKVA_NIVELO;

// ⟪ ពណ៌ឆាក 🎨 ⟫
// ⟨ មេឃ , អ័ព្ទ , ពន្លឺ និងការបញ្ចេញពន្លឺមកពីបាលេតរបស់ឆាកផ្លាស់ ។
//   អ័ព្ទស្តើងជាងហ្គេម ព្រោះឆាកតូច ហើយការមើលពណ៌ត្រូវច្បាស់ ។ 📃 ⟩
const PALETRO = kreiPaletrojn().nebula.tago;

// ⟪ ការកែពណ៌ 🎨 ⟫
// ⟨ ការកែទូទៅលើគ្រប់ពណ៌ ៖ ពណ៌ , តិត្ថិភាព និងពន្លឺ ។ តម្លៃនីមួយៗជាការបន្ថែម ,
// ដូច្នេះ 0 មិនប្តូរអ្វីទេ ។ 📃 ⟩
interface Korekto {
  h: number;
  s: number;
  l: number;
}
const koloro = new THREE.Color();
const agordo = {
  herbo: { h: 0, s: 0, l: 0 } as Korekto,
  tero: { h: 0, s: 0, l: 0 } as Korekto,
};

// ⟪ ឆាក 📷 ⟫
const kanvaso = document.getElementById("koloraVido") as HTMLCanvasElement;
const bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true });
// ⟨ សន្ទះគូរមានទំហំបង្អួចពិត ៖ គ្មានស្ទីលក្នុងចំណាំ ។ 📃 ⟩
bildilo.setPixelRatio(1);
bildilo.outputColorSpace = THREE.SRGBColorSpace;
bildilo.toneMapping = THREE.ACESFilmicToneMapping;
bildilo.toneMappingExposure = PALETRO.ekspozicio;
const sceno = new THREE.Scene();
sceno.fog = new THREE.FogExp2(PALETRO.fog.getHex(), PALETRO.nebulDenso * 0o1/0o4);

const fotilo = new THREE.PerspectiveCamera(0o46, 1, 0o1/0o10, 0o4000);
fotilo.position.set(0o50, 0o40, 0o66);
const regiloj = new OrbitControls(fotilo, kanvaso);
regiloj.target.set(0, 0o10, -0o2);
regiloj.enableDamping = true;
regiloj.maxPolarAngle = Math.PI * 0o55/0o100;

// ⟨ មេឃ ៖ ដូមពណ៌ដូចហ្គេម , តម្លៃមកពីបាលេត ។ 📃 ⟩
const { cxielajUniformoj } = kreiCxielon(sceno);
cxielajUniformoj.uTop.value.copy(PALETRO.top);
cxielajUniformoj.uMid.value.copy(PALETRO.mid);
cxielajUniformoj.uBot.value.copy(PALETRO.bot);
cxielajUniformoj.uSunCol.value.copy(PALETRO.sunCol);
cxielajUniformoj.uSunDir.value.copy(PALETRO.sunPos).normalize();

// ⟨ ពន្លឺ ៖ ដូចហ្គេម , ពីបាលេត ។ 📃 ⟩
const hemiLumo = new THREE.HemisphereLight(PALETRO.hemiSky, PALETRO.hemiGnd,
  PALETRO.hemiInt);
sceno.add(hemiLumo);
const suno = new THREE.DirectionalLight(PALETRO.sunCol, PALETRO.sunInt);
suno.position.copy(PALETRO.sunPos);
suno.target.position.set(0, 0, 0);
sceno.add(suno, suno.target);

// ⟨ ពន្លឺបរិយាកាស ៖ ដូចហ្គេម ។ 📃 ⟩
const pmremGenerilo = new THREE.PMREMGenerator(bildilo);
sceno.environment = pmremGenerilo.fromScene(new RoomEnvironment(bildilo),
  0o1/0o40).texture;
pmremGenerilo.dispose();

// ⟪ ដី : ក្រឡាតូចៗតាមកម្ពស់សាកល្បង 📃 ⟫
const geometrioTero = new THREE.PlaneGeometry(GRANDO, GRANDO, SEGMENTOJ, SEGMENTOJ);
geometrioTero.rotateX(-Math.PI / 2);
const pozicioj = geometrioTero.getAttribute("position") as THREE.BufferAttribute;
for ( let i = 0; i < pozicioj.count; i++ )
  pozicioj.setY(i, altecoTera(pozicioj.getX(i), pozicioj.getZ(i)));
geometrioTero.setAttribute("color",
  new THREE.BufferAttribute(new Float32Array(pozicioj.count * 3), 3));
geometrioTero.computeVertexNormals();
// ⟨ វត្ថុធាតុដី ៖ ដូចហ្គេម , ជាមួយវាយនភាព និងរណ្តៅលើផ្ទៃ ។ 📃 ⟩
const tero = new THREE.Mesh(geometrioTero, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0o7/0o10, metalness: 0,
  map: kreiGrundanTeksajxon(),
  bumpMap: kreiGrundanBumpanTeksajxon(),
  bumpScale: 0o5/0o10,
}));
sceno.add(tero);

// ⟪ គែមដី ៖ ស្រទាប់ក្រោមដីនៅជុំវិញ 📃 ⟫
// ⟨ ដីជាប្លុកបើកមើលចំហៀង ៖ ជ្រុងទាំងបួនបង្ហាញស្រទាប់ដី ដីម៉ដ្ឋ , ថ្ម និងបាត ។
//   ជម្រៅគំរូជ្រើសតាមកម្រិតលាយរបស់ terenaStrataKoloroEn ។ 📃 ⟩
const STRAT_DEPTHS = [ 0, 0o3, 0o5, 0o10, 0o14, 0o20, 0o30 ];
const PERIMETRO: [ number, number ][] = [];
{
  const u = GRANDO / 2, paso = GRANDO / SEGMENTOJ;
  for ( let i = 0; i < SEGMENTOJ; i++ ) PERIMETRO.push([ -u + i * paso, -u ]);
  for ( let i = 0; i < SEGMENTOJ; i++ ) PERIMETRO.push([ u, -u + i * paso ]);
  for ( let i = 0; i < SEGMENTOJ; i++ ) PERIMETRO.push([ u - i * paso, u ]);
  for ( let i = 0; i < SEGMENTOJ; i++ ) PERIMETRO.push([ -u, u - i * paso ]);
}
const RANDOJ = PERIMETRO.length;
const NOMBRO_STRATOJ = STRAT_DEPTHS.length;
const stratPozicioj = new Float32Array(RANDOJ * NOMBRO_STRATOJ * 3);
const stratKoloroj = new Float32Array(RANDOJ * NOMBRO_STRATOJ * 3);
const stratIndeksoj: number[] = [];
for ( let i = 0; i < RANDOJ; i++ ) {
  const [ x, z ] = PERIMETRO[i];
  const surfY = altecoTera(x, z);
  for ( let r = 0; r < NOMBRO_STRATOJ; r++ ) {
    const k = ( i * NOMBRO_STRATOJ + r ) * 3;
    stratPozicioj[k] = x;
    stratPozicioj[k + 1] = Math.max(BAZA_Y, surfY - STRAT_DEPTHS[r]);
    stratPozicioj[k + 2] = z;
  }
  const sekva = ( i + 1 ) % RANDOJ;
  for ( let r = 0; r < NOMBRO_STRATOJ - 1; r++ ) {
    const a = i * NOMBRO_STRATOJ + r, b = sekva * NOMBRO_STRATOJ + r;
    const c = a + 1, d = b + 1;
    stratIndeksoj.push(a, b, c, b, d, c);
  }
}
const geometrioStrat = new THREE.BufferGeometry();
geometrioStrat.setAttribute("position", new THREE.BufferAttribute(stratPozicioj, 3));
geometrioStrat.setAttribute("color", new THREE.BufferAttribute(stratKoloroj, 3));
geometrioStrat.setIndex(stratIndeksoj);
geometrioStrat.computeVertexNormals();
const stratMuro = new THREE.Mesh(geometrioStrat, new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide,
}));
sceno.add(stratMuro);

// ⟪ ការកែពណ៌តាម HSL 🎨 ⟫
function tinti( celo: THREE.Color, korekto: Korekto ): void {
  if ( korekto.h === 0 && korekto.s === 0 && korekto.l === 0 ) return;
  const hsl = { h: 0, s: 0, l: 0 };
  celo.getHSL(hsl);
  celo.setHSL(
    ( hsl.h + korekto.h / 360 + 1 ) % 1,
    Math.max(0, Math.min(1, hsl.s * ( 1 + korekto.s / 100 ))),
    Math.max(0, Math.min(1, hsl.l * ( 1 + korekto.l / 100 ))));
}

// ⟪ ស្មៅ : វាលស្មៅពិតរបស់ឆាក 🌾 ⟫
// ⟨ ដុំស្មៅដូចឆាកពិត ៖ ក្រឡា HERBA_CXELO , ដុំមួយក្នុងក្រឡា , ស្លឹក HERBA_AKSOJ ក្នុងដុំ ,
// រូបរាង HERBA_VARIANTOJ ។ ចម្ងាយបិទធំជាងឆាក ដើម្បីឱ្យវាលទាំងមូលឃើញ ។ 📃 ⟩
const klingaMaterialo = kreiHerbanTavolanMaterialon(HERBA_KAMPO * 0o4);

// ⟨ ពណ៌ស្លឹក ៖ ការគូរពិតរបស់ហ្គេម ( ស្លឹកស្រស់ និងស្លឹកស្ងួត ) ,
// បន្ថែមការកែពណ៌ទូទៅ ។ ពណ៌ឋិតក្នុងកំណត់ត្រាស្លឹក , ដូច្នេះស្លឹកត្រូវសាងឡើងវិញ
// រាល់ពេលពណ៌ប្តូរ ។ 📃 ⟩
function koloroDeKlingo( celo: THREE.Color, seka: boolean, hazardo: () => number ): void {
  if ( seka ) sekaHerbaKlingaKoloro(celo, hazardo);
  else herbaKlingaKoloro(celo, hazardo);
  tinti(celo, agordo.herbo);
}

// ⟪ ការដាក់ដុំស្មៅ 🏗 ⟫
// ⟨ គណនាដុំស្មៅតាមក្រឡាដូចឆាកពិត , តែលើដីសាកល្បង ហើយគ្មានការដកចេញតាមទន្លេ
// ឬផ្លូវ ។ ដុំស្មៅក្រោមផ្ទះត្រូវដកចេញ ។ 📃 ⟩
const tufoj: HerbaTufo[][] = Array.from({ length: HERBA_VARIANTOJ }, () => []);
{
  const unuaCxelo = Math.round(( 0 - HERBA_KAMPO / 2 ) / HERBA_CXELO);
  const unuaCxeloZ = Math.round(( 0 - HERBA_KAMPO / 2 ) / HERBA_CXELO);
  const kvanto = Math.ceil(HERBA_KAMPO / HERBA_CXELO);
  const opcioj: HerbaTufaOpcioj = {
    heightFn: altecoTera,
    excludeRivers: () => false,
    excludePaths: () => false,
    excludeBuildings: ( x, z ) => Math.abs(x - DOMO_X) < 0o12 && Math.abs(z - DOMO_Z) < 0o12,
    biomoFn: (): Biomo => "valo",
    akvaNiveloFn: niveloAkva,
  };
  for ( let iz = 0; iz < kvanto; iz++ ) {
    for ( let ix = 0; ix < kvanto; ix++ ) {
      const tufo = kalkuliHerbanTufon(unuaCxelo + ix, unuaCxeloZ + iz, opcioj);
      if ( tufo !== null ) tufoj[tufo.varianto].push(tufo);
    }
  }
}

const biomaKoloro = kreiBiomajnKolorojn();
const teraKoloro = new THREE.Color();
const koloroDeTufo = new THREE.Color();
const herbajMeshoj: { varianto: number; mesho: THREE.InstancedMesh }[] = [];

// ⟨ សាងរូបរាងដុំស្មៅមួយសម្រាប់វ៉ារ្យ៉ង់មួយ ។ ចម្លងដើម្បីដាក់ទិន្នន័យជម្រាល ។ 📃 ⟩
function kreiTavolanGeometrion( varianto: number, kvanto: number,
  koloroFn: ( celo: THREE.Color, seka: boolean, hazardo: () => number ) => void
): THREE.BufferGeometry {
  const bazo = konstruiHerbanTavolanGeometrion(HERBA_LARGO, HERBA_AKSOJ,
    HERBA_SEMO + varianto * HERBA_SEMA_PASO, 1, koloroFn);
  return kreiHerbanTavolanKopion(bazo, kvanto);
}

{
  const M = new THREE.Matrix4();
  const P = new THREE.Vector3();
  const S = new THREE.Vector3();
  for ( let v = 0; v < HERBA_VARIANTOJ; v++ ) {
    const tufojDeVarianto = tufoj[v];
    if ( tufojDeVarianto.length === 0 ) continue;
    const geometrio = kreiTavolanGeometrion(v, tufojDeVarianto.length, koloroDeKlingo);
    const mesho = new THREE.InstancedMesh(geometrio, klingaMaterialo,
      tufojDeVarianto.length);
    for ( let i = 0; i < tufojDeVarianto.length; i++ ) {
      const tufo = tufojDeVarianto[i];
      M.compose(P.set(tufo.x, tufo.y, tufo.z), tufo.q, S.set(tufo.sx, tufo.sy, tufo.sz));
      mesho.setMatrixAt(i, M);
    }
    mesho.instanceMatrix.needsUpdate = true;
    // ⟨ ជម្រាល និងពណ៌ដុំស្មៅបំពេញនៅ desegnu ដំបូង ។ 📃 ⟩
    herbajMeshoj.push({ varianto: v, mesho });
    sceno.add(mesho);
  }
}

// ⟨ សាងស្លឹក និងពណ៌ដុំស្មៅឡើងវិញតាមពណ៌បច្ចុប្បន្ន ៖ ពណ៌ឋិតក្នុងស្លឹក
// និងក្នុងពណ៌ដុំ ។ 📃 ⟩
function rekonstruiHerbon(): void {
  for ( const ero of herbajMeshoj ) {
    const tufojDeVarianto = tufoj[ero.varianto];
    const geometrio = kreiTavolanGeometrion(ero.varianto, tufojDeVarianto.length,
      koloroDeKlingo);
    const deklivoj = geometrio.getAttribute("herbaDoklivo") as THREE.InstancedBufferAttribute;
    for ( let i = 0; i < tufojDeVarianto.length; i++ ) {
      const tufo = tufojDeVarianto[i];
      deklivoj.setXY(i, tufo.gx, tufo.gz);
      herbaTufaKoloroEn(koloroDeTufo, teraKoloro, tufo, biomaKoloro, niveloAkva);
      tinti(koloroDeTufo, agordo.herbo);
      ero.mesho.setColorAt(i, koloroDeTufo);
    }
    deklivoj.needsUpdate = true;
    if ( ero.mesho.instanceColor ) ero.mesho.instanceColor.needsUpdate = true;
    const malnova = ero.mesho.geometry;
    ero.mesho.geometry = geometrio;
    malnova.dispose();
  }
}

// ⟪ ផ្ទះសាតាឡា ៖ សំណង់ពិតរបស់ហ្គេមនៅកណ្តាល 🏠 ⟫
const DOMO: KonstruSpec = {
  x: DOMO_X, z: DOMO_Z, type: "domo", name: "koloro-provo",
  niveloj: TIPAJ_NIVELOJ.domo, w: 0o10, d: 0o10, tieroAlto: 0o315/0o100,
  rot: 0, h0: PLATEAU_Y, sube: TIPAJ_NIVELOJ.domo, tieroAltoSub: 0o123/0o40,
  diamond: false,
};
konstruiSatalon(DOMO, sceno, []);

// ⟪ ការគូរពណ៌ : ពណ៌ហ្គេម , បន្ទាប់មកការកែរបស់អ្នក 📃 ⟫
function desegnu(): void {
  // ⟨ ដី ៖ ពណ៌តាមកម្ពស់ , ជម្រាល , និងទឹក ។ 📃 ⟩
  const kolorojTero = geometrioTero.getAttribute("color") as THREE.BufferAttribute;
  const nd = 0o2;
  for ( let i = 0; i < pozicioj.count; i++ ) {
    const x = pozicioj.getX(i), z = pozicioj.getZ(i);
    const y = pozicioj.getY(i);
    const deklivo = Math.hypot(
      altecoTera(x + nd, z) - altecoTera(x - nd, z),
      altecoTera(x, z + nd) - altecoTera(x, z - nd)) / ( nd * 2 );
    terenaKoloroEn(koloro, y, x, z, deklivo, niveloAkva);
    tinti(koloro, agordo.tero);
    kolorojTero.setXYZ(i, koloro.r, koloro.g, koloro.b);
  }
  kolorojTero.needsUpdate = true;
  // ⟨ គែមដី ៖ ស្រទាប់តាមជម្រៅក្រោមផ្ទៃ ។ 📃 ⟩
  for ( let i = 0; i < RANDOJ; i++ ) {
    const [ x, z ] = PERIMETRO[i];
    const surfY = altecoTera(x, z);
    for ( let r = 0; r < NOMBRO_STRATOJ; r++ ) {
      const y = Math.max(BAZA_Y, surfY - STRAT_DEPTHS[r]);
      terenaStrataKoloroEn(koloro, y, surfY);
      const k = ( i * NOMBRO_STRATOJ + r ) * 3;
      stratKoloroj[k] = koloro.r;
      stratKoloroj[k + 1] = koloro.g;
      stratKoloroj[k + 2] = koloro.b;
    }
  }
  ( geometrioStrat.getAttribute("color") as THREE.BufferAttribute ).needsUpdate = true;
  // ⟨ ស្មៅ ៖ ស្លឹក និងពណ៌ដុំត្រូវសាងឡើងវិញតាមពណ៌ថ្មី ។ 📃 ⟩
  rekonstruiHerbon();
  montriValorojn();
}

// ⟪ តម្លៃសម្រាប់ចម្លង 📄 ⟫
function montriValorojn(): void {
  const valoroj: string[] = [];
  koloroDeKlingo(koloro, false, () => 0o1/0o2);
  valoroj.push(`ស្មៅ        #${koloro.getHexString()}`);
  koloroDeKlingo(koloro, true, () => 0o1/0o2);
  valoroj.push(`ស្មៅស្ងួត   #${koloro.getHexString()}`);
  for ( const ero of herbajMeshoj ) {
    const tufo = tufoj[ero.varianto][0];
    herbaTufaKoloroEn(koloro, teraKoloro, tufo, biomaKoloro, niveloAkva);
    tinti(koloro, agordo.herbo);
    valoroj.push(`ដុំស្មៅ     #${koloro.getHexString()}`);
    break;
  }
  terenaKoloroEn(koloro, PLATEAU_Y, DOMO_X, DOMO_Z, 0, niveloAkva);
  tinti(koloro, agordo.tero);
  valoroj.push(`ដីក្រោមផ្ទះ #${koloro.getHexString()}`);
  document.getElementById("valoroj")!.textContent = valoroj.join("\n");
}

// ⟪ វាលពណ៌ ៖ វាលនីមួយៗក្នុងតារាងពណ៌របស់ដី 📃 ⟫
// ⟨ ឈ្មោះបង្ហាញសម្រាប់វាលនីមួយៗ ។ ចំនួនវាលតាមតារាងពិត ,
// ដូច្នេះវាលថ្មីលេចឡើងដោយស្វ័យប្រវត្តិ ។ 📃 ⟩
const TERENAJ_NOMOJ: Record<keyof TerenajKoloroj, string> = {
  herboA: "ស្មៅស្រស់ ក",
  herboB: "ស្មៅស្រស់ ខ",
  sekaHerbo: "ស្មៅស្ងួត",
  roko: "ថ្ម",
  rokoOmbro: "ស្រមោលថ្ម",
  profunda: "ទឹកជ្រៅ",
  malherbo: "ស្មៅងងឹត",
  marco: "ភក់",
  silto: "ល្បាប់ល្អិត",
  gruzo: "គ្រួស",
  sablo: "ខ្សាច់",
  lito: "ថ្មក្រោមទឹក",
  nego: "ព្រិល",
  glacio: "ទឹកកក",
  stratoTero: "ស្រទាប់ដី",
  stratoMalmola: "ស្រទាប់ម៉ដ្ឋ",
  stratoRoko: "ស្រទាប់ថ្ម",
  stratoBazo: "ស្រទាប់បាត",
};

const KHMAJAJ_CIFEROJ = [ "១", "២", "៣", "៤", "៥", "៦", "៧", "៨" ];

interface KolorKampo {
  celo: THREE.Color;
  defauxla: string;
  enigo: HTMLInputElement;
}
const kampoj: KolorKampo[] = [];

/*បន្ថែមវាលលេខពណ៌មួយ រួមទាំងការត្រួតពិនិត្យ និងការគូរឡើងវិញ
    @param gastiganto ( HTMLElement ) - ធុងដាក់វាល
    @param etikedo ( string ) - ឈ្មោះបង្ហាញ
    @param celo ( THREE.Color ) - ពណ៌ដែលវាលនេះកែ */
function aldoniKampon( gastiganto: HTMLElement, etikedo: string,
  celo: THREE.Color ): void {
  const vico = document.createElement("label");
  vico.textContent = etikedo;
  const enigo = document.createElement("input");
  enigo.type = "text";
  enigo.size = 9;
  enigo.autocomplete = "off";
  enigo.spellcheck = false;
  enigo.setAttribute("aria-label", etikedo);
  const defauxla = "#" + celo.getHexString();
  enigo.value = defauxla;
  vico.append(enigo);
  gastiganto.append(vico);
  kampoj.push({ celo, defauxla, enigo });
  const apliki = (): void => {
    const teksto = enigo.value.trim();
    const normo = teksto.startsWith("#") ? teksto : "#" + teksto;
    if ( !/^#[0-9a-f]{6}$/i.test(normo) ) {
      enigo.setCustomValidity("លេខពណ៌ត្រូវជា #rrggbb");
      return;
    }
    enigo.setCustomValidity("");
    celo.setStyle(normo);
    desegnu();
  };
  enigo.addEventListener("input", apliki);
  enigo.addEventListener("change", apliki);
}

const klingaro = document.getElementById("klingaro")!;
for ( let i = 0; i < KLINGAJ_KOLOROJ.length; i++ )
  aldoniKampon(klingaro, `ស្លឹក ${KHMAJAJ_CIFEROJ[i] ?? i + 0o1}`, KLINGAJ_KOLOROJ[i]);
aldoniKampon(klingaro, "ស្លឹកស្ងួត", SEKA_KLINGO);

const terenaro = document.getElementById("terenaro")!;
for ( const klavo of Object.keys(TERENAJ_NOMOJ) as ( keyof TerenajKoloroj )[] )
  aldoniKampon(terenaro, TERENAJ_NOMOJ[klavo], TERENA_KOLOROJ[klavo]);

// ⟪ ស្លាយ ៖ កែពណ៌ , គូរឡើងវិញភ្លាម 📃 ⟫
const SLIDERAJ = [ "hHerbo", "sHerbo", "lHerbo", "hTero", "sTero", "lTero" ] as const;

function konektiSxlajon( nomo: typeof SLIDERAJ[number] ): void {
  const enigo = document.getElementById(nomo + "En") as HTMLInputElement;
  const eligo = document.getElementById(nomo) as HTMLOutputElement;
  const grupo = nomo.endsWith("Herbo") ? agordo.herbo : agordo.tero;
  const kampo = nomo[0] === "h" ? "h" : nomo[0] === "s" ? "s" : "l";
  const montri = (): void => { eligo.textContent = enigo.value; };
  montri();
  enigo.addEventListener("input", () => {
    grupo[kampo] = Number(enigo.value);
    montri();
    desegnu();
  });
}
for ( const nomo of SLIDERAJ ) konektiSxlajon(nomo);

// ⟨ ដាក់វាលពណ៌ទាំងអស់ត្រឡប់ទៅតម្លៃដើម ។ 📃 ⟩
document.getElementById("restarigi")!.addEventListener("click", () => {
  for ( const grupo of [ agordo.herbo, agordo.tero ] )
    grupo.h = grupo.s = grupo.l = 0;
  for ( const nomo of SLIDERAJ ) {
    const enigo = document.getElementById(nomo + "En") as HTMLInputElement;
    enigo.value = "0";
    ( document.getElementById(nomo) as HTMLOutputElement ).textContent = "0";
  }
  for ( const kampo of kampoj ) {
    kampo.celo.setStyle(kampo.defauxla);
    kampo.enigo.value = kampo.defauxla;
    kampo.enigo.setCustomValidity("");
  }
  desegnu();
});

// ⟪ ការដើរដោយ W A S D 🚶 ⟫
// ⟨ ចុចគ្រាប់ចុចដើរតាមទិសកាមេរ៉ា ។ ការបង្វិលនៅជារបស់កណ្តុរ ។
//   ខណៈវាយលេខពណ៌ក្នុងវាល គ្រាប់ចុចមិនរំកិលកាមេរ៉ាទេ ។ 📃 ⟩
const RAPIDO = 0o14;
const klavoj = new Set<string>();
const supren = new THREE.Vector3(0, 1, 0);
const antauxen = new THREE.Vector3();
const dekstren = new THREE.Vector3();
const delto = new THREE.Vector3();

function tajpanta(): boolean {
  const elementoj = document.activeElement;
  return elementoj instanceof HTMLInputElement && elementoj.type !== "button";
}

addEventListener("keydown", ( e ) => {
  if ( tajpanta() ) return;
  klavoj.add(e.code);
});
addEventListener("keyup", ( e ) => { klavoj.delete(e.code); });
addEventListener("blur", () => klavoj.clear());

function marsxi( dt: number ): void {
  if ( klavoj.size === 0 ) return;
  let antauxo = 0, flanko = 0;
  if ( klavoj.has("KeyW") || klavoj.has("ArrowUp") ) antauxo += 1;
  if ( klavoj.has("KeyS") || klavoj.has("ArrowDown") ) antauxo -= 1;
  if ( klavoj.has("KeyD") || klavoj.has("ArrowRight") ) flanko += 1;
  if ( klavoj.has("KeyA") || klavoj.has("ArrowLeft") ) flanko -= 1;
  if ( antauxo === 0 && flanko === 0 ) return;
  fotilo.getWorldDirection(antauxen);
  antauxen.y = 0;
  if ( antauxen.lengthSq() < 0o1/0o100 ) return;
  antauxen.normalize();
  dekstren.crossVectors(antauxen, supren).normalize();
  delto.set(0, 0, 0)
    .addScaledVector(antauxen, antauxo)
    .addScaledVector(dekstren, flanko);
  const rapido = klavoj.has("ShiftLeft") || klavoj.has("ShiftRight")
    ? RAPIDO * 0o4 : RAPIDO;
  delto.normalize().multiplyScalar(rapido * dt);
  fotilo.position.add(delto);
  regiloj.target.add(delto);
}

// ⟪ រង្វិលជុំ 🎞️ ⟫
// ⟨ ឆាកបំពេញបង្អួច ៖ សន្ទះគូរគ្មានស្ទីលខាងក្រៅ , ដូច្នេះទំហំគឺជាទំហំបង្អួច ។
// បន្ទះបញ្ជាអណ្តែតលើវា ។ 📃 ⟩
function lauxGrandeco(): void {
  bildilo.setSize(innerWidth, innerHeight, false);
  fotilo.aspect = innerWidth / innerHeight;
  fotilo.updateProjectionMatrix();
}

addEventListener("resize", lauxGrandeco);
lauxGrandeco();
desegnu();

let antaŭaTempo = 0;
bildilo.setAnimationLoop(( t ) => {
  const dt = Math.min(0o1/0o10, Math.max(0, ( t - antaŭaTempo ) / 0o1000));
  antaŭaTempo = t;
  marsxi(dt);
  regiloj.update();
  gxisdatigiHerbon(t / 0o1000, fotilo.position.x, fotilo.position.z);
  bildilo.render(sceno, fotilo);
});
