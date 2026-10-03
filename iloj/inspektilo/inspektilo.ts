// ≺⧼ ឧបករណ៍ពិនិត្យពិភពលោក 🔬 ⧽≻ គឺជាឧបករណ៍ការងារសម្រាប់គំរូរបស់ពិភពលោក គឺ
// សត្វ និងចលនារបស់ពួកវា រុក្ខជាតិ និងថ្ម ( ដៃគូរបស់ឧបករណ៍
// ឆ្លាក់ដី ) និងសំណង់ជាមួយផ្នែករបស់ពួកវា រួមទាំងយានអវកាស
// ដែលអណ្តែតលើស្ថានីយ។ គំរូនីមួយៗបង្ហាញតែឯង
// នៅកណ្តាល និងក្នុងស៊ុម ហើយអាចបង្វិល និងពង្រីកដោយកណ្ដុរ បញ្ឈប់ចលនា
// ដើម្បីសិក្សាឥរិយាបថមួយ បង្ហាញអ័ក្សបង្វិលរបស់សន្លាក់ និងខ្សែសំណាញ់នៃ
// ធរណីមាត្រ ហើយអានព័ត៌មានសំណង់របស់គំរូ ( ចំនួន
// សំណាញ់ ត្រីកោណ និងធាតុ សូមមើលការរួមបញ្ចូលក្នុង
// konstruiPetrelanMalneton )។
//
// ឧបករណ៍ប្រើឧបករណ៍សាងសង់របស់ហ្គេមដោយផ្ទាល់ ( អនុគមន៍ដូចទីក្រុង )
// ដូច្នេះវាមិនដែលបង្វែរពីហ្គេមទេ ព្រោះអ្វីដែលលេចឡើងនៅទីនេះ ក៏លេចឡើងក្នុងពិភពលោកដែរ។
// ប្រភេទទាំងពីរ ( ធម្មជាតិ និងសំណង់ ) បង្ហាញដោយអនុគមន៍ដូចគ្នា ហើយ
// សំណង់ប្រើលក្ខណៈដូចក្នុង kantaoj/mondo/urbo.ts ទៀតផង។
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { konstruiMetitanBeston, gxisdatigiBestojn, konstruiMetitanPetrelon, gxisdatigiPetrelojn } from "../../eskekoj/shalaj-specioj/bestoj.js";
import { animaciiKrasesxagxon } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";
import { centri, SPECOJ } from "./datumoj.js";
import { spacoSxipo, KONSTRUAJXOJ } from "./konstruajxoj.js";
import { elemento, elementoj } from "../komunajxoj/dom.js";
import type { ModelaSpecifo } from "./tipoj.js";
import type { Besto, BestoSistemo, Petrelo, PetreloSistemo } from "../../eskekoj/shalaj-specioj/bestoj.js";
import type { Krasesxagxo } from "../../eskekoj/konstruajxoj/krasesxagxa-kosmosxipo.js";

// ⟨ ស្ថានភាពចលនា 📃 ⟩ អនុគមន៍ធ្វើបច្ចុប្បន្នភាពរបស់ហ្គេមរង់ចាំប្រព័ន្ធ ( គឺ
// សត្វ ឬបក្សីព្រិលជាមួយឧបករណ៍ជំនួយរបស់ពួកវា ) រីឯយានអវកាសមានអនុគមន៍
// ចលនាផ្ទាល់ខ្លួន។ វាលទាំងនេះជាជម្រើស ព្រោះស្ថានភាពមួយកាន់តែ
// មួយក្នុងចំណោមទម្រង់ទាំងបី ហើយរង្វិលជុំជ្រើសតាមវាលដែលបានបំពេញ។
interface AnimacioStato {
  sxipo?: Krasesxagxo | null;
  petreloj?: Petrelo[];
  altecoFn?: ( x: number, z: number ) => number;
  bestoj?: Besto[];
  riverFn?: ( x: number ) => number;
  akvoYFn?: ( x: number ) => number;
}
// ⟨ ប្រភេទទាំងឡាយ 📃 ⟩ គឺបញ្ជីទាំងពីររបស់ឧបករណ៍ ( ធម្មជាតិ សំណង់ )។
interface Kategorio {
  kodo: string;
  nomo: string;
  titolo: string;
  listo: ModelaSpecifo[];
}

// ⟨ ឆាក 📃 ⟩ គឺបន្ទប់សិក្សាតូច។ មេឃជាពណ៌សាមញ្ញ រីឯ
// ដីជាផ្ទៃរាបតូចក្រោមសត្វ ហើយពន្លឺមានបី គឺពន្លឺមេឃ
// ពន្លឺព្រះអាទិត្យ ( ជាមួយស្រមោលដែលបង្ហាញរូបរាង ) និងពន្លឺបំពេញត្រជាក់ពីទិសផ្ទុយ។
const sceno = new THREE.Scene();
// ពណ៌ផ្ទៃខាងក្រោយនៅជាឯកសារយោង ព្រោះកុងតាក់ ផ្ទៃខាងក្រោយ សរសេរទៅវាដោយផ្ទាល់។
const fonoKoloro = new THREE.Color(0x2e3f4a);
sceno.background = fonoKoloro;

const kanvaso = elemento<HTMLCanvasElement>("bestoVido");
const bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: true });
bildilo.shadowMap.enabled = true;
bildilo.shadowMap.type = THREE.PCFShadowMap;

const fotilo = new THREE.PerspectiveCamera(0o50, 1, 0o1/0o20, 0o4000);
const regiloj = new OrbitControls(fotilo, kanvaso);
regiloj.enableDamping = true;
regiloj.autoRotate = true;
regiloj.autoRotateSpeed = 0o3/0o2;

const cxielaLumo = new THREE.HemisphereLight(0xe0f0f8, 0x50705a, 0o17/0o10);
sceno.add(cxielaLumo);
const sunlumo = new THREE.DirectionalLight(0xfff4e0, 0o16/0o10);
sunlumo.position.set(0o6, 0o11, 0o5);
sunlumo.castShadow = true;
sunlumo.shadow.mapSize.set(0o1000, 0o1000);
// ⟨ សម្លេងស្រមោល 📃 ⟩ ព្រោះជើងរបស់ពីងពាងសមុទ្រស្តើងខ្លាំង ដូច្នេះ
// ផែនទីស្រមោលពន្លឺប៉ះលើផ្ទៃរបស់វាផ្ទាល់ ហើយគូរត្រីកោណ
// ងងឹតនៅជង្គង់ ( shadow acne )។ តម្លៃសម្លេង និងសម្លេងណរម៉ាល់
// នាំការប្រៀបធៀបឱ្យជិតផ្ទៃខ្លួនឯង។
sunlumo.shadow.bias = -0o1/0o2000;
sunlumo.shadow.normalBias = 0o1/0o100;
const ombraDuono = 0o30;
sunlumo.shadow.camera.left = -ombraDuono;
sunlumo.shadow.camera.right = ombraDuono;
sunlumo.shadow.camera.top = ombraDuono;
sunlumo.shadow.camera.bottom = -ombraDuono;
sunlumo.shadow.camera.near = 0o1/0o2;
sunlumo.shadow.camera.far = 0o100;
sunlumo.shadow.camera.updateProjectionMatrix();
sceno.add(sunlumo);
sceno.add(sunlumo.target);
const kontrauxLumo = new THREE.DirectionalLight(0xa8c0d8, 0o7/0o10);
kontrauxLumo.position.set(-0o7, 0o4, -0o6);
sceno.add(kontrauxLumo);

// ផ្ទៃទឹក គឺផ្ទៃថ្លានៅ y = 0។ សត្វទឹកអណ្តែតនៅ
// ត្រង់នោះ ( កំពូលខ្លួននៅលើទឹក ) ដូច្នេះគេឃើញពួកវាពី
// ក្រោម និងពីលើក្នុងពេលតែមួយ ដូចក្នុងបឹង។
const akvaMaterialo = new THREE.MeshStandardMaterial({
  color: 0x30708c, transparent: true, opacity: 0o3/0o10, roughness: 0o1/0o4,
  metalness: 0, side: THREE.DoubleSide, depthWrite: false,
});
const akvaEbeno = new THREE.Mesh(new THREE.PlaneGeometry(0o400, 0o400), akvaMaterialo);
akvaEbeno.rotation.x = -Math.PI / 2;
akvaEbeno.renderOrder = 1;
sceno.add(akvaEbeno);

// ដី គឺផ្ទៃងងឹតក្រោមសត្វ ដែលទទួលស្រមោល។ វាផ្លាស់ទី
// ចុះតាមគំរូ ( សូមមើល kadrigi ) ដូច្នេះវានៅតាមបាតជើងជានិច្ច។
const grundoMaterialo = new THREE.MeshStandardMaterial({ color: 0x2a3a34, roughness: 1 });
const grundo = new THREE.Mesh(new THREE.PlaneGeometry(0o400, 0o400), grundoMaterialo);
grundo.rotation.x = -Math.PI / 2;
grundo.receiveShadow = true;
sceno.add(grundo);

// សំណាញ់ គឺទំហំដូចដី សម្រាប់វាស់គំរូ។
const krado = new THREE.GridHelper(0o100, 0o40, 0x587068, 0x384a44);
krado.position.y = 0o1/0o100;
sceno.add(krado);

// ⟨ ស្ថានភាព 📃 ⟩ គឺប្រភេទបច្ចុប្បន្ន គំរូ ប្រព័ន្ធចលនា និង
// ការរាប់ពេលវេលា។
let specio: ModelaSpecifo = SPECOJ[0];
let modelo: THREE.Object3D | null = null;
let animacio: AnimacioStato | null = null;   // វត្ថុ { bestoj } / { petreloj } របស់អនុគមន៍ធ្វើបច្ចុប្បន្នភាព
let tempo = 0;             // ពេលវេលាចលនា ( ជាឯកតារបស់កម្មវិធីកំណត់ពេល )
let pauxzita = false;
let rapido = 1;
let pivotojMontritaj = false;
let dratoMontrita = false;
// មុំកាមេរ៉ាបច្ចុប្បន្នជុំវិញគោលដៅ ដែលប៊ូតុងដែលមើលឃើញប្រើ ហើយការ
// បង្វិលស្វ័យប្រវត្តិតាមវា ( ការបង្វិលសរសេរទៅកាមេរ៉ាដោយផ្ទាល់ )។
let vidAngulo = Math.PI / 0o4;
let vidKlino = 0o3/0o10;
let kadraDistanco = 0o1;
let zomaFaktoro = 0o1;
// ទីតាំងចុងក្រោយរបស់បក្សីព្រិលដែលកំពុងហោះ ព្រោះការផ្លាស់ទីកើតឡើងតាម
// ភាពខុសគ្នា ( សូមមើលរង្វិលជុំ )។
const lastaBirdaPozicio = new THREE.Vector3();

/* សាងសង់ប្រភេទបច្ចុប្បន្នពីឧបករណ៍សាងសង់របស់ហ្គេម ហើយបន្ថែមវាទៅឆាក។
    @returns ក្រុមរបស់គំរូ ( ឬ null បើការសាងសង់បរាជ័យ )។ */
function kreiModelon(): THREE.Object3D | null {
  // ⟨ រុក្ខជាតិ និងថ្ម 📃 ⟩ ឧបករណ៍សាងសង់ទាំងនោះបន្ថែមសំណាញ់របស់ពួកវា
  // ផ្ទាល់ទៅឆាក ( ព្រោះពួកវាគ្មានក្រុមផ្ទាល់ខ្លួន ) ដូច្នេះឧបករណ៍ផ្តល់ឱ្យពួកវា
  // ក្រុមថ្មីជា ឆាក។ ដូច្នេះគំរូជាវត្ថុមួយ ដែលឧបករណ៍
  // អាចលុប វាស់ និងធ្វើស៊ុមដោយអនុគមន៍ដូចសត្វ ប៉ុន្តែ
  // ក្រុមខ្លួនឯងក៏ត្រូវចូលឆាកផងដែរ។
  if ( specio.konstruu ) {
    const grupo = new THREE.Group();
    // ឧបករណ៍សាងសង់ប្រកាសឆាក រីឯឧបករណ៍ផ្តល់ក្រុម ដូច្នេះទាំងពីរជា Object3D។
    specio.konstruu(grupo as THREE.Object3D as THREE.Scene);
    centri(grupo);
    sceno.add(grupo);
    // យានអវកាសអណ្តែត និងវិល ( ចលនាដូចក្នុងពិភពលោក ) រីឯ
    // សំណង់ និងផ្នែកឈរនៅស្ងាត់។
    animacio = specio.kosmosxipo ? { sxipo: spacoSxipo } : null;
    return grupo;
  }
  if ( specio.petrelo ) {
    const petrelo = konstruiMetitanPetrelon(sceno, 0, 0, () => 0, 0o4, specio.grandeco ?? 1);
    if ( !petrelo ) return null;
    // កម្ពស់ហោះចៃដន្យក្នុងហ្គេម ( ព្រោះបក្សីតាមដីក្រោមវា )
    // ប៉ុន្តែនៅទីនេះវាត្រូវបានកំណត់ថេរ ដើម្បីឱ្យបក្សីនៅក្នុងស៊ុមតែមួយរាល់ដង។
    // រង្វង់ហោះតូច ដូច្នេះបក្សីនៅធំក្នុងស៊ុម ហើយ
    // ការផ្អៀងក្នុងការវេនមើលឃើញច្បាស់។
    petrelo.bazaY = 0o6;
    petrelo.flugY = 0o6;
    petrelo.alto = 0o4;
    // ដំណាក់កាលចៃដន្យត្រូវបានកំណត់ថេរ ដូច្នេះបក្សីចាប់ផ្តើមហោះក្នុងទិសតែមួយរាល់ដង
    // ហើយទិដ្ឋភាព ខាងមុខ និង ខាងក្រោយ បង្ហាញខាងដូចគ្នារាល់ដង
    // ( ក្នុងហ្គេម បក្សីមានដំណាក់កាលចៃដន្យ )។
    petrelo.angulo = 0;
    petrelo.direkto = 1;
    petrelo.phase = 0;
    petrelo.batoFazo = 0;
    animacio = { petreloj: [ petrelo ], altecoFn: () => 0 };
    return petrelo.grupo;
  }
  const besto = konstruiMetitanBeston(sceno, specio.indekso, 0, 0, 0, specio.grandeco ?? 1);
  if ( !besto ) return null;
  animacio = { bestoj: [ besto ], riverFn: () => 0, akvoYFn: () => 0 };
  return besto.grupo;
}

/* វិសាលភាពរបស់គំរូ ( ប្រអប់ និងចំណុចកណ្តាលរបស់វា ) ដែលការធ្វើស៊ុម និង
   អ័ក្សបង្វិលត្រូវការ។
    @param grupo ( THREE.Object3D ) - គំរូ។
@returns { centro, radiuso } ជាមួយចំណុចកណ្តាល ( THREE.Vector3 ) និងកាំ ( number )។ */
function mezuriModelon(grupo: THREE.Object3D): { centro: THREE.Vector3; radiuso: number } {
  // ⟨ ហេតុអ្វីការវាស់បិទក្រុម 📃 ⟩ ព្រោះចលនាសរសេរទីតាំង
  // និងការបង្វិលរបស់ក្រុមរាល់ស៊ុម ដូច្នេះការវាស់ក្រុមផ្ទាល់នឹងតាម
  // សត្វដែលកំពុងហែល ហើយសត្វនឹងរាំឆ្លងកាត់ស៊ុម។ ដូច្នេះការវាស់កើតឡើងក្នុង
  // លំហផ្ទាល់ខ្លួនរបស់គំរូ ( ក្រុមត្រឡប់ទៅដើមកំណើតបណ្តោះអាសន្ន )
  // ហើយផ្លូវចលនាត្រូវបានបន្ថែមក្រោយមកពីទិន្នន័យប្រព័ន្ធចលនា។
  const sxparitaPozicio = grupo.position.clone();
  const sxparitaRotacio = grupo.rotation.clone();
  grupo.position.set(0, 0, 0);
  grupo.rotation.set(0, 0, 0);
  grupo.updateMatrixWorld(true);
  const skatolo = new THREE.Box3().setFromObject(grupo);
  const mezo = skatolo.getCenter(new THREE.Vector3());
  let radiuso = Math.max(0o1/0o2, skatolo.getSize(new THREE.Vector3()).length() * 0o1/0o2);
  grupo.position.copy(sxparitaPozicio);
  grupo.rotation.copy(sxparitaRotacio);
  grupo.updateMatrixWorld(true);
  const centro = mezo.clone();
  if ( specio.konstruu ) {
    // រុក្ខជាតិ ឬថ្មឈរលើដី ហើយក្រុមត្រូវបានដាក់កណ្តាល ដូច្នេះ
    // ដើមកំណើតរបស់ក្រុមជាផ្ទៃឫស ហើយកាំរួមបញ្ចូល
    // គំរូទាំងមូលរួចហើយ ( ព្រោះ InstancedMesh រាយការណ៍ស៊ុមរបស់វាទៅ
    // THREE.Box3 ដូច្នេះធាតុទាំងអស់ត្រូវបានរាប់បញ្ចូល )។
    return { centro, radiuso };
  }
  if ( specio.petrelo && animacio?.petreloj ) {
    // បក្សីដែលកំពុងហោះ គឺស៊ុមតាមជាប់វាផ្ទាល់ ( សូមមើលស៊ុមបន្ទាប់ក្នុង
    // រង្វិលជុំ ) មិនមែនតាមចំណុចកណ្តាលរង្វង់ហោះទេ។
    centro.copy(animacio.petreloj[0].grupo.position);
    radiuso += 0o1/0o2;
  } else if ( animacio?.bestoj ) {
    // សត្វហែលតាមទន្លេ ដូច្នេះស៊ុមត្រូវផ្តោតលើយុថ្កា ( ដើមកំណើត
    // របស់ក្រុម ដោយគ្មានការយោលនៃការហែល ) និងបញ្ចូលការយោលទាំងមូល។
    const b = animacio.bestoj[0];
    centro.y = ( b.nivelo ?? 0 ) + b.bazaY + mezo.y;
    radiuso += 0o1/0o4;
  }
  return { centro, radiuso };
}

/* ដាក់កាមេរ៉ាដើម្បីឱ្យគំរូទាំងមូលបំពេញស៊ុម និងដាក់
   ដីក្រោមគំរូ។
    @param grupo ( THREE.Object3D ) - គំរូ។ */
function kadrigi(grupo: THREE.Object3D): void {
  const { centro, radiuso } = mezuriModelon(grupo);
  // ⟨ ចម្ងាយស៊ុម 📃 ⟩ ចម្ងាយត្រូវគោរពមុំមើលទាំងពីរ។ បង្អួច
  // របស់ឧបករណ៍ចង្អៀត និងខ្ពស់ ដូច្នេះមុំមើលផ្តេក
  // តូចជាងមុំបញ្ឈរច្រើន ដូច្នេះពីមុនស៊ុមវាស់តែ
  // មុំបញ្ឈរ ហើយគំរូធំទូង ( ពីងពាងសមុទ្រដែលមានជើង 1.6 ឯកតា )
  // ចេញក្រៅស៊ុមពីចំហៀង។ ដូច្នេះគេយកមុំកន្លះដែលតូចជាង។
  const duonFov = THREE.MathUtils.degToRad(fotilo.fov * 0o1/0o2);
  const aspekto = ( kanvaso.clientWidth || 1 ) / ( kanvaso.clientHeight || 1 );
  const duonFovLargha = Math.atan(Math.tan(duonFov) * aspekto);
  const distanco = radiuso / Math.sin(Math.min(duonFov, duonFovLargha)) * 0o7/0o10;
  fotilo.aspect = aspekto;
  kadraDistanco = distanco;
  zomaFaktoro = 0o1;
  regiloj.target.copy(centro);
  fotilo.position.copy(centro).add(new THREE.Vector3(
    distanco * 0o3/0o10, distanco * 0o25/0o100, distanco));
  fotilo.near = Math.max(0o1/0o100, distanco / 0o100);
  fotilo.far = distanco * 0o10;
  fotilo.updateProjectionMatrix();
  regiloj.update();
  vidAngulo = Math.PI / 0o4;
  vidKlino = 0o3/0o10;
  // ដី និងសំណាញ់ គឺនៅក្រោមគំរូជាប់ ( បក្សីព្រិលដែលហោះនៅ
  // លើដី ដូចក្នុងពិភពលោក ហើយរុក្ខជាតិឈរលើ
  // ផ្ទៃដើមកំណើតរបស់ឧបករណ៍សាងសង់របស់ពួកវា )។
  const malsupro = ( specio.petrelo || specio.konstruu ) ? 0
    : centro.y - radiuso * 0o4/0o10 - 0o1/0o2;
  grundo.position.y = malsupro;
  krado.position.y = malsupro + 0o1/0o100;
  sunlumo.position.set(centro.x + ombraDuono * 0o3/0o10, malsupro + ombraDuono,
    centro.z + ombraDuono * 0o1/0o4);
  sunlumo.target.position.set(centro.x, malsupro, centro.z);
  sunlumo.target.updateMatrixWorld();
}

/* អ័ក្សបង្វិល គឺអ័ក្សនៅលើវត្ថុដែលបានដាក់ឈ្មោះនីមួយៗរបស់គំរូ (
   ក្រុម និងផ្នែក ស្លាប ដៃ កន្ទុយ ជង្គង់ ... )។
    @param grupo ( THREE.Object3D ) - គំរូ។
    @param radiuso ( number ) - វិសាលភាពរបស់គំរូ ( ទំហំអ័ក្ស )។ */
function montriPivotojn(grupo: THREE.Object3D, radiuso: number): void {
  const grando = Math.max(0o1/0o10, radiuso * 0o1/0o4);
  grupo.traverse((o) => {
    if ( !o.name || o.name === "__akso" ) return;
    const akso = new THREE.AxesHelper(grando);
    akso.name = "__akso";
    const materialo = akso.material as THREE.Material;
    materialo.depthTest = false;
    materialo.transparent = true;
    akso.renderOrder = 0o2;
    o.add(akso);
  });
}

/* ដកអ័ក្សចេញពីវត្ថុទាំងអស់។
    @param grupo ( THREE.Object3D ) - គំរូ។ */
function forigiPivotojn(grupo: THREE.Object3D): void {
  const forigitaj: THREE.Object3D[] = [];
  grupo.traverse((o) => { if ( o.name === "__akso" ) forigitaj.push(o); });
  for ( const o of forigitaj ) o.parent?.remove(o);
}

/* ដាក់កាមេរ៉ានៅទិដ្ឋភាពធម្មតាជុំវិញគោលដៅស៊ុម។
    @param angulo ( number ) - មុំជុំវិញអ័ក្សបញ្ឈរ ( រ៉ាដ្យង់ )។
    @param klino ( number ) - មុំលើកលើជើងមេឃ ( រ៉ាដ្យង់ )។ */
function metiVidon(angulo: number, klino: number): void {
  if ( !modelo ) return;
  vidAngulo = angulo;
  vidKlino = klino;
  regiloj.autoRotate = false;
  elemento<HTMLButtonElement>("turnu").setAttribute("aria-pressed", "false");
  metiKameraon();
}

// metiKameraon គឺដាក់កាមេរ៉ាតាមមុំមើលបច្ចុប្បន្ន និងកត្តាពង្រីក។
function metiKameraon() {
  const c = regiloj.target;
  const distanco = kadraDistanco * zomaFaktoro;
  const horiz = Math.cos(vidKlino) * distanco;
  fotilo.position.set(c.x + Math.sin(vidAngulo) * horiz,
    c.y + Math.sin(vidKlino) * distanco, c.z + Math.cos(vidAngulo) * horiz);
  fotilo.updateProjectionMatrix();
  regiloj.update();
}

/* ពង្រីកតាមកត្តាដែលផ្តល់។
    @param faktoro ( number ) - តូចជាង 1 ធ្វើឱ្យជិត ធំជាង 1 ធ្វើឱ្យឆ្ងាយ។ */
function zomo(faktoro: number): void {
  zomaFaktoro = Math.min(0o4, Math.max(0o1/0o4, zomaFaktoro * faktoro));
  metiKameraon();
}

/* បើកទិដ្ឋភាពខ្សែសំណាញ់នៃវត្ថុទាំងអស់របស់គំរូ។
    @param grupo ( THREE.Object3D ) - គំរូ។ */
function agordiDratojn(grupo: THREE.Object3D): void {
  grupo.traverse((o) => {
    const mesa = o as THREE.Mesh;
    if ( !mesa.isMesh || !mesa.material ) return;
    const materialoj = Array.isArray(mesa.material) ? mesa.material : [ mesa.material ];
    for ( const m of materialoj )(m as THREE.MeshStandardMaterial).wireframe = dratoMontrita;
  });
}

/* បំពេញបន្ទះព័ត៌មានសម្រាប់គំរូបច្ចុប្បន្ន។
    @param grupo ( THREE.Object3D ) - គំរូ។ */
function gxisdatigiInformon(grupo: THREE.Object3D): void {
  let meshoj = 0, trianguloj = 0, instancoj = 0;
  const materialoj = new Set<THREE.Material>();
  grupo.traverse((o) => {
    const mesa = o as THREE.Mesh;
    if ( !mesa.isMesh ) return;
    meshoj++;
    // សំណាញ់ដែលចម្លងជាធាតុ ( ដើមឈើ ស្លឹក និងចានសំបក
    // របស់រុក្ខជាតិ ) គូរធរណីមាត្ររបស់ពួកវាច្រើនដង ដូច្នេះចំនួនធាតុបង្ហាញ
    // តម្លៃពិត មិនមែនចំនួនសំណាញ់នីមួយៗទេ។
    const instancigita = mesa as THREE.InstancedMesh;
    if ( instancigita.isInstancedMesh ) instancoj += instancigita.count;
    const g = mesa.geometry;
    trianguloj += ( g.index ? g.index.count : g.attributes.position.count ) / 0o3;
    for ( const m of ( Array.isArray(mesa.material) ? mesa.material : [ mesa.material ] ) ) materialoj.add(m);
  });
  const nomo = elemento<HTMLElement>("specoNomo");
  nomo.textContent = specio.nomo;
  elemento<HTMLElement>("specoPriskribo").textContent = specio.priskribo;
  elemento<HTMLElement>("specoDatumoj").innerHTML =
    "⟨ ចលនា 📃 ⟩ " + specio.animacio + "<br>" +
    "⟨ គំរូ 📃 ⟩ " + meshoj + " សំណាញ់ · " + trianguloj +
      " ត្រីកោណ · " + materialoj.size + " សម្ភារៈ" +
      ( instancoj ? " · " + instancoj + " ឧទាហរណ៍" : "" ) +
      ( specio.konstruajxo ? " · អគារ ឬផ្នែក"
        : specio.konstruu ? " · រុក្ខជាតិ ឬថ្ម" : " · ខ្នាត " + ( specio.grandeco ?? 1 ) );
}

/* លុបគំរូមុន សាងសង់ថ្មី ហើយដាក់វាក្នុងស៊ុម។
    @param nova ( ModelaSpecifo ) - ប្រភេទពី SPECOJ ឬ KONSTRUAJXOJ។ */
function elektiSpecio(nova: ModelaSpecifo): void {
  if ( modelo ) {
    if ( pivotojMontritaj ) forigiPivotojn(modelo);
    sceno.remove(modelo);
    modelo = null;
  }
  specio = nova;
  pivotojMontritaj = false;
  elemento<HTMLButtonElement>("pivotoj").setAttribute("aria-pressed", "false");
  modelo = kreiModelon();
  if ( !modelo ) return;
  lastaBirdaPozicio.copy(modelo.position);
  akvaEbeno.visible = !!specio.akva && akvaMontrita;
  krado.visible = kradoMontrita;
  tempo = 0;
  bezonataGxisdatigo = true;
  kadrigi(modelo);
  if ( dratoMontrita ) agordiDratojn(modelo);
  gxisdatigiInformon(modelo);
  for ( const butono of elementoj<HTMLButtonElement>("#specaro button") ) {
    butono.setAttribute("aria-pressed", String(butono.dataset.kodo === specio.kodo));
  }
}

// ⟨ ប៊ូតុងទាំងឡាយ 📃 ⟩ គឺបញ្ជីប្រភេទ ផ្ទាំងប្រភេទ និងកុងតាក់មើល។
// ប៊ូតុងមួយក្នុងមួយគំរូនៃប្រភេទទាំងពីរត្រូវបានបង្កើតតែម្តង រីឯផ្ទាំងគ្រាន់តែ
// ជំនួសខ្លឹមសាររបស់ #specaro ដូច្នេះគំរូដែលបានជ្រើស និងរូបភាពមិន
// បាត់ពេលឆ្លាស់រវាងប្រភេទទេ។
const KATEGORIOJ: Kategorio[] = [
  { kodo: "naturo", nomo: "ធម្មជាតិ 🐾", titolo: "ប្រភេទ 🐾", listo: SPECOJ },
  { kodo: "konstruajxo", nomo: "អគារ 🏛️", titolo: "អគារ ឬផ្នែក 🏛️", listo: KONSTRUAJXOJ },
];
const specaro = elemento<HTMLElement>("specaro");
const tabaro = elemento<HTMLElement>("tabaro");
const grupoTitolo = elemento<HTMLElement>("grupoTitolo");
const butonoj = new Map<string, HTMLButtonElement>();
for ( const listo of [ SPECOJ, KONSTRUAJXOJ ] ) {
  for ( const s of listo ) {
    const butono = document.createElement("button");
    butono.textContent = s.nomo;
    butono.dataset.kodo = s.kodo;
    butono.setAttribute("aria-pressed", "false");
    butono.addEventListener("click", () => elektiSpecio(s));
    butonoj.set(s.kodo, butono);
  }
}
/* បង្ហាញប្រភេទមួយ។ បើគំរូបច្ចុប្បន្នជារបស់វា វានៅដដែល ( គ្រាន់តែ
   ស្ថានភាពចុចត្រូវបានធ្វើឱ្យស្រស់ ) បើមិនដូច្នេះគំរូទីមួយនៃប្រភេទនោះត្រូវបានសាងសង់។
    @param kategorio ( Kategorio ) - ប្រភេទដែលត្រូវបង្ហាញ។ */
function montruKategorion(kategorio: Kategorio): void {
  for ( const k of KATEGORIOJ ) {
    elemento<HTMLButtonElement>("tab" + k.kodo).setAttribute("aria-pressed", String(k === kategorio));
  }
  specaro.replaceChildren(...kategorio.listo.map(( s ) => butonoj.get(s.kodo) as HTMLButtonElement));
  grupoTitolo.textContent = kategorio.titolo;
  if ( !modelo || !kategorio.listo.includes(specio) ) elektiSpecio(kategorio.listo[0]);
  else for ( const b of butonoj.values() )
    b.setAttribute("aria-pressed", String(b.dataset.kodo === specio.kodo));
}
for ( const k of KATEGORIOJ ) {
  const tabo = document.createElement("button");
  tabo.id = "tab" + k.kodo;
  tabo.textContent = k.nomo;
  tabo.setAttribute("aria-pressed", "false");
  tabo.addEventListener("click", () => montruKategorion(k));
  tabaro.appendChild(tabo);
}

let akvaMontrita = true;
let kradoMontrita = true;

/* កម្មវិធីចាត់ចែងរួមនៃប៊ូតុងកុងតាក់ ( គំរូដូចក្នុងឧបករណ៍ឆ្លាក់
   ដី ដែល aria-pressed នៅជាស្ថានភាពតែមួយ )។
    @param id ( string ) - លេខសម្គាល់របស់ប៊ូតុង។
    @param ago ( funkcio ) - សកម្មភាព ជាមួយស្ថានភាពថ្មី។ */
function sxalti(id: string, ago: ( nova: boolean ) => void): void {
  const butono = elemento<HTMLButtonElement>(id);
  butono.addEventListener("click", () => {
    const nova = butono.getAttribute("aria-pressed") !== "true";
    butono.setAttribute("aria-pressed", String(nova));
    ago(nova);
  });
}

let bezonataGxisdatigo = true;
sxalti("pauxzu", ( n: boolean ) => { pauxzita = n; bezonataGxisdatigo = true; });
sxalti("turnu", ( n: boolean ) => { regiloj.autoRotate = n; });
sxalti("akvo", ( n: boolean ) => { akvaMontrita = n; akvaEbeno.visible = n && !!specio.akva; });
sxalti("krado", ( n: boolean ) => { kradoMontrita = n; krado.visible = n; });
sxalti("drato", ( n: boolean ) => { dratoMontrita = n; if ( modelo ) agordiDratojn(modelo); });
sxalti("fono", ( n: boolean ) => {
  // ផ្ទៃខាងក្រោយ គឺផ្ទៃសិក្សាងងឹត ឬផ្ទៃទឹកភ្លឺ។ ផ្ទៃខាងក្រោយភ្លឺ
  // បង្ហាញក្រុមតូចថ្លា ( ដែលខ្លួនជាឡាតាំងបាត់លើ
  // ផ្ទៃងងឹត ) និងរូបស្រមោលនៃផ្នែកងងឹត។
  fonoKoloro.set(n ? 0xdce6ec : 0x2e3f4a);
  grundoMaterialo.color.set(n ? 0x9fb0ab : 0x2a3a34);
  akvaMaterialo.color.set(n ? 0x88b4c8 : 0x30708c);
});
sxalti("pivotoj", ( n: boolean ) => {
  pivotojMontritaj = n;
  if ( !modelo ) return;
  const { radiuso } = mezuriModelon(modelo);
  if ( n ) montriPivotojn(modelo, radiuso); else forigiPivotojn(modelo);
});
elemento<HTMLButtonElement>("kadru").addEventListener("click", () => { if ( modelo ) kadrigi(modelo); });
// ទិដ្ឋភាពស្តង់ដារទាំងបួន គឺខាងមុខ ចំហៀង ខាងលើ ( ជាមួយការផ្អៀងបន្តិច ដើម្បី
// កុំឱ្យអ័ក្សបញ្ឈរលាក់ខ្លួន ) និងទិដ្ឋភាពមួយភាគបី។
elemento<HTMLButtonElement>("vidAntauxo").addEventListener("click", () => metiVidon(0, 0o1/0o10));
elemento<HTMLButtonElement>("vidFlanko").addEventListener("click", () => metiVidon(Math.PI / 0o2, 0o1/0o10));
elemento<HTMLButtonElement>("vidSupre").addEventListener("click", () => metiVidon(Math.PI / 0o4, Math.PI / 0o2 - 0o15/0o100));
elemento<HTMLButtonElement>("vidSube").addEventListener("click", () => metiVidon(Math.PI / 0o2, -Math.PI / 0o2 + 0o15/0o100));
elemento<HTMLButtonElement>("zomoEn").addEventListener("click", () => zomo(0o3/0o4));
elemento<HTMLButtonElement>("zomoEl").addEventListener("click", () => zomo(0o4/0o3));

// កម្មវិធីបញ្ជាពេលវេលា គឺអានទីតាំងមួយនៃចលនាដោយមិនរង់ចាំវា ( ការ
// បញ្ឈប់ និងកម្មវិធីបញ្ជារួមគ្នាផ្តល់ការសិក្សាត្រឹមត្រូវនៃស៊ុមមួយនៃវដ្ត )។
const momentoRegilo = elemento<HTMLInputElement>("momento");
const momentoValoro = elemento<HTMLElement>("momentoValoro");
momentoRegilo.addEventListener("input", () => {
  tempo = Number(momentoRegilo.value);
  momentoValoro.textContent = tempo.toFixed(0o1) + " s";
  bezonataGxisdatigo = true;
});

const rapidoRegilo = elemento<HTMLInputElement>("rapido");
const rapidoValoro = elemento<HTMLElement>("rapidoValoro");
// gxisdatigiRapidon គឺអានកម្មវិធីបញ្ជាល្បឿន ហើយសរសេរស្លាករបស់វាឡើងវិញ។
function gxisdatigiRapidon() {
  rapido = Number(rapidoRegilo.value);
  rapidoValoro.textContent = "× " + rapido;
}
rapidoRegilo.addEventListener("input", gxisdatigiRapidon);
gxisdatigiRapidon();

// ⟨ រង្វិលជុំ 📃 ⟩ ចលនាប្រើពេលវេលាដាច់ខាត ( អនុគមន៍ធ្វើបច្ចុប្បន្នភាព
// របស់ហ្គេមរង់ចាំវា ) ដូច្នេះការបញ្ឈប់គ្រាន់តែឈប់រុញវាទៅមុខ។
// ការកន្លងពេលមកពី performance.now ហើយដែនកំណត់ស៊ុមការពារប្រឆាំងនឹងតម្លៃ
// ធំនៃស៊ុមដំបូង និងនៃការបញ្ឈប់។
let lastaTempo = performance.now();
function animacii(): void {
  requestAnimationFrame(animacii);
  const nun = performance.now();
  const dt = Math.min(0o1/0o10, ( nun - lastaTempo ) / 0o1000);
  lastaTempo = nun;
  if ( !pauxzita ) {
    tempo += dt * rapido;
    momentoRegilo.value = String(tempo % 0o10);
    momentoValoro.textContent = momentoRegilo.value + " s";
  }
  // ⟨ ការបញ្ឈប់ 📃 ⟩ ចលនាបក្សីព្រិលប្រមូលមុំហោះ និងកម្ពស់
  // តាមការកន្លងពេលនៃស៊ុម ( ព្រោះការអណ្តែតត្រូវការវាចាំបាច់ ) ដូច្នេះវាផ្លាស់ទីផងដែរ
  // ពេលបញ្ឈប់។ ដូច្នេះការបញ្ឈប់ឈប់ការធ្វើបច្ចុប្បន្នភាពទាំងស្រុង ដូច្នេះគេឃើញ
  // ឥរិយាបថមួយ ហើយកម្មវិធីបញ្ជាពេលវេលាហៅការធ្វើបច្ចុប្បន្នភាពម្តងសម្រាប់ពេលវេលាថ្មី។
  if ( animacio && ( !pauxzita || bezonataGxisdatigo ) ) {
    bezonataGxisdatigo = false;
    if ( animacio.petreloj ) {
      gxisdatigiPetrelojn(animacio as PetreloSistemo, tempo);
      // ⟨ ស៊ុមបន្ទាប់ 📃 ⟩ បក្សីហោះជុំវិញរង្វង់របស់វា ដូច្នេះកាមេរ៉ា
      // តាមវា ព្រោះទិដ្ឋភាពបង្ហាញបក្សីព្រិល មិនមែនចំណុចកណ្តាលទទេនៃ
      // រង្វង់ទេ។ មានតែគោលដៅផ្លាស់ទី រីឯការបង្វិល និងការពង្រីកនៅតែដោយកណ្ដុរ។
      if ( modelo ) {
        const delto = modelo.position.clone().sub(lastaBirdaPozicio);
        lastaBirdaPozicio.copy(modelo.position);
        regiloj.target.add(delto);
        fotilo.position.add(delto);
      }
    } else if ( animacio.sxipo ) {
      animaciiKrasesxagxon(animacio.sxipo, tempo, false);
    } else {
      gxisdatigiBestojn(animacio as BestoSistemo, tempo);
      // ⟨ យុថ្កា 📃 ⟩ សត្វទឹកហែលតាមទន្លេ ( ±អំព្លីទុតតាម
      // x និង ±0.5 តាម z ) ដូច្នេះសត្វនឹងរត់ចេញពីស៊ុមពេលពង្រីក។ ឧបករណ៍
      // ទប់វានៅយុថ្កា ដូច្នេះការយោលបញ្ឈរនៅដដែល ហើយចង្វាក់
      // និងជំហានបង្ហាញពេញលេញ ប៉ុន្តែសត្វដែលកំពុងសិក្សានៅកណ្តាលជានិច្ច។
      if ( modelo ) { modelo.position.x = 0; modelo.position.z = 0; }
    }
  }
  if ( regiloj.autoRotate && !pauxzita ) {
    // ការបង្វិលស្វ័យប្រវត្តិសរសេរទៅកាមេរ៉ាដោយផ្ទាល់ ( ព្រោះ OrbitControls ធ្វើ
    // វាដោយខ្លួនឯង ប៉ុន្តែវាមិនដឹងថាយើងបង្ហាញមុំទៅអ្នកប្រើទេ )។
    vidAngulo = Math.atan2(fotilo.position.x - regiloj.target.x,
      fotilo.position.z - regiloj.target.z);
  }
  const w = kanvaso.clientWidth || 1, h = kanvaso.clientHeight || 1;
  if ( fotilo.aspect !== w / h ) { fotilo.aspect = w / h; fotilo.updateProjectionMatrix(); }
  bildilo.setSize(w, h, false);
  regiloj.update();
  bildilo.render(sceno, fotilo);
}

// ⟨ ហុកទាំងឡាយ 📃 ⟩ សម្រាប់កុងសូលរបស់កម្មវិធីរុករក។ ឧបករណ៍គ្មាន
// ចំណុចប្រទាក់ផ្សេងដើម្បីសួរគំរូបច្ចុប្បន្នទេ ដូច្នេះការយោងទាំងនេះអនុញ្ញាតឱ្យ
// ត្រួតពិនិត្យឆាក និងចលនាដោយផ្ទាល់ ( ហើយកែឥរិយាបថរបស់
// គំរូពេលសិក្សា )។ សូមមើលគំរូដូចក្នុង kantaoj/ludo/sperto.ts។
window.inspektilo = {
  THREE, sceno, fotilo, regiloj, bildilo,
  modelo: () => modelo, animacio: () => animacio, tempo: () => tempo,
  specio: () => specio, serchi: ( nomo: string ) => ( modelo ? modelo.getObjectByName(nomo) : null ),
  montruKategorion,
};

montruKategorion(KATEGORIOJ[0]);
animacii();
