// ≺⧼ ការដុត 🎨 ⧽≻
// ការដុត 2D របស់ដី គឺពណ៌ដី និងពណ៌ទឹក សម្លេងតំបន់ជីវៈ និងសត្វ
// ស្រមោលភ្នំតូច និងការគូរលើផ្ទាំងគំនូរពិភពលោក។ ម៉ូឌុលនេះមិន
// កាន់កាប់ស្ថានភាពឆ្លាក់ទេ ព្រោះ agordiBakon ទទួលការយោងពីឯកសារ
// មេ ( ដេលតា ស្រទាប់ និងឧបករណ៍ជំនួយគំរូ ) ដូច្នេះរង្វិលជុំ
// ស្ថិតនៅទីនេះ ហើយស្ថានភាពនៅទីនោះ។
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { katmullRom } from "../../../kantaoj/komunajxoj/interpolo.js";
import { terenaKoloroEn } from "../../../eskekoj/komunajxoj/terenkoloroj.js";
import { MONDO, MONDO_HALFO, REZ } from "./mezuroj.js";
import { kunteksto2d } from "../../komunajxoj/dom.js";

// ⟪ ស្ថានភាពឆ្លាក់ 📃 ⟫ គឺការយោងមកពី agordiBakon តែម្តង ពេល
// ផ្ទុក។ តារាង ( ដេលតា ម៉ាស តំបន់ជីវៈ សត្វ ) មិនដែលចាត់ចែងឡើងវិញទេ
// ព្រោះម៉ូឌុលអានតំបន់ដូចគ្នា ដូច្នេះការយោងនៅតែត្រឹមត្រូវពេញ
// វគ្គ។
// ⟨ ការភ្ជាប់ការដុត 📃 ⟩ គឺតារាង និងឧបករណ៍ជំនួយគំរូរបស់ឯកសារ
// មេ។ ជក់កំពុងប្រើ និងសត្វកំពុងប្រើជាអនុគមន៍ ព្រោះពួកវា
// ផ្លាស់ប្តូរពេលប្រើ។
interface BakaLigo {
  deltoj: Float32Array;
  biomoj: Uint8Array;
  bestoj: Uint8Array;
  N: number;
  PASO: number;
  X0: number;
  Z0: number;
  deltoInterp: ( x: number, z: number ) => number;
  maskoInterp: ( x: number, z: number ) => number;
  akvaKavoInterp: ( x: number, z: number ) => number;
  akvaNiveloEn: ( x: number, z: number ) => number | null;
  cxuAkvo: ( x: number, z: number ) => boolean;
  akvaNiveloProksima: ( x: number, z: number ) => number;
  peniko: () => string;
  besto: () => number;
}
let deltoj: Float32Array;
let biomoj: Uint8Array;
let bestoj: Uint8Array;
let N: number;
let PASO: number;
let X0: number;
let Z0: number;
let deltoInterp: ( x: number, z: number ) => number;
let maskoInterp: ( x: number, z: number ) => number;
let akvaKavoInterp: ( x: number, z: number ) => number;
let akvaNiveloEn: ( x: number, z: number ) => number | null;
let cxuAkvo: ( x: number, z: number ) => boolean;
let akvaNiveloProksima: ( x: number, z: number ) => number;
let penikoAktiva: () => string;
let bestoAktiva: () => number;

/* ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។ ពីរចុងក្រោយ ( ជក់ សត្វ ) ជា
   អនុគមន៍ មិនមែនតម្លៃទេ ព្រោះជក់កំពុងប្រើផ្លាស់ប្តូរពេលប្រើ ដូច្នេះការដុត
   អានវាទាន់ពេល ( សម្លេងលេចឡើង និងបាត់តាមឧបករណ៍ )។
    @param k ( BakaLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiBakon(k: BakaLigo): void {
  deltoj = k.deltoj; biomoj = k.biomoj; bestoj = k.bestoj;
  N = k.N; PASO = k.PASO; X0 = k.X0; Z0 = k.Z0;
  deltoInterp = k.deltoInterp; maskoInterp = k.maskoInterp; akvaKavoInterp = k.akvaKavoInterp;
  akvaNiveloEn = k.akvaNiveloEn; cxuAkvo = k.cxuAkvo; akvaNiveloProksima = k.akvaNiveloProksima;
  penikoAktiva = k.peniko; bestoAktiva = k.besto;
}

// ⟪ ផ្ទាំងគំនូរពិភពលោក 📃 ⟫ គឺរូបភាព 768² ថេររបស់ដី និងតារាង
// បីដែលអមជាមួយ គឺកម្ពស់ប្រូសេឌូរ៉ាល់ កត្តាស្រមោលភ្នំតូច និង
// ជម្រាលជម្រាល ( ជម្រាលថ្មសម្រាប់បន្ទះពណ៌រួម )។
export const bazaCanvas = document.createElement("canvas");
bazaCanvas.width = bazaCanvas.height = REZ;
const bazaKunteksto = kunteksto2d(bazaCanvas);
const bazaBildo = bazaKunteksto.createImageData(REZ, REZ);
const bazoj = new Float32Array(REZ * REZ);            // កម្ពស់ប្រូសេឌូរ៉ាល់
const deklivoj = new Float32Array(REZ * REZ);         // កត្តាស្រមោលភ្នំតូច
const deklivoGradientoj = new Float32Array(REZ * REZ); // |∇h| គឺជម្រាលថ្មសម្រាប់បន្ទះពណ៌រួម

// prerenderiBazon គឺកម្ពស់ប្រូសេឌូរ៉ាល់ ( មូលដ្ឋានដោយគ្មានដេលតា ) សម្រាប់ផ្ទាំង
// គំនូរទាំងមូល។ កម្ពស់មូលដ្ឋានមកពីដីរួម ( bazaAlteco ) ដូច្នេះ
// ឧបករណ៍ឆ្លាក់ និងហ្គេមត្រូវគ្នា។
export function prerenderiBazon(): void {
  for ( let py = 0; py < REZ; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = 0; px < REZ; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      bazoj[i] = bazaAlteco(x, z);
    }
  }
}

// បន្ទះពណ៌ដីមកពីម៉ូឌុលរួម ( ដូចក្នុងហ្គេម ) ព្រោះពីមុនវា
// ត្រូវបានចម្លងនៅទីនេះ ហើយបានបង្វែរពីបន្ទះពណ៌របស់ហ្គេម។ terenaKoloro255
// គឺពណ៌ដីជាបៃ sRGB ( 0 ដល់ 255 ) សម្រាប់ផែនទី 2D និងស្រទាប់សម្លេង
// គឺពណ៌លីនេអ៊ែររួមរបស់ហ្គេម ដែលបានបំប្លែងទៅ sRGB។ តំបន់ដែលឆ្លាក់
// បង្ហាញដោយការធ្វើឱ្យដីស្រស់ងងឹតបន្តិច ( delta ≠ 0 ) ដែលមានតែក្នុងឧបករណ៍ មិនមែន
// ក្នុងហ្គេមទេ។
const skrapaKoloro = new THREE.Color();
export function terenaKoloro255(h: number, x: number, z: number, deklivo: number): number[] {
  // ស្រទាប់ច្រាំងទន្លេអានកម្រិតទឹកពិត ( akvaNiveloProksima ) ព្រោះ
  // ទន្លេហូរចុះ ដូច្នេះប្លង់ថេរមួយនឹងធ្វើឱ្យច្រាំងពណ៌ខុស។
  terenaKoloroEn(skrapaKoloro, h, x, z, deklivo, akvaNiveloProksima);
  skrapaKoloro.convertLinearToSRGB();
  return [
    Math.max(0, Math.min(0o377, skrapaKoloro.r * 0o377)),
    Math.max(0, Math.min(0o377, skrapaKoloro.g * 0o377)),
    Math.max(0, Math.min(0o377, skrapaKoloro.b * 0o377)),
  ];
}

// ⟨ ការបង្ហាញតំបន់ជីវៈ ( តំបន់ជីវៈរបស់ដីឆ្លាក់ ) 📃 ⟩
// តំបន់ជីវៈ ( tereno.ts ) មកទាំងស្រុងពីស្រទាប់ដែលគូរដោយជក់ គឺ akvo ( ម៉ាស )
// និងភ្នំ ជ្រលង វាលរាប រុក្ខជាតិទឹក និង ekvizeto ដែលគូរ
// ( SKULPTA_BIOMOJ )។ គ្មានតំបន់ជីវៈដេរីវេទេ ដូច្នេះទទេ ( 0 = ស្វ័យប្រវត្តិ
// ឬគ្មានទិន្នន័យ ) គឺគ្មានអ្វីទេ។ ឧបករណ៍ឆ្លាក់បង្ហាញតំបន់ជីវៈតែពេល
// ឧបករណ៍តំបន់ជីវៈ ( Biomo 🎨 ) បើក គឺពណ៌ស្វាយលើតំបន់ជីវៈភ្នំ
// ពណ៌បៃតងខៀវលើជ្រលង ពណ៌បៃតងស្រាលលើវាលរាប ហើយតំបន់ជីវៈទឹក
// ( រុក្ខជាតិទឹក ekvizeto ) ផ្តល់ពណ៌ឱ្យក្រឡាទឹកតាមសម្លេងរៀងៗ
// ខ្លួន។ ពេលបិទឧបករណ៍ ដីបង្ហាញពណ៌ធម្មជាតិរបស់វា។ សម្លេង
// តាមក្រឡាដែលគូរផ្ទាល់ ដូច្នេះវាផ្លាស់ប្តូរពេល
// គូរផ្ទាល់។
const MONTA_NUANCO = [ 0o230, 0o60, 0o300 ];    // ពណ៌ស្វាយ គឺតំបន់ជីវៈភ្នំ
const VALA_NUANCO = [ 0o40, 0o230, 0o260 ];     // បៃតងខៀវ គឺតំបន់ជីវៈជ្រលង
const EBENAJA_NUANCO = [ 0o220, 0o300, 0o110 ]; // បៃតងស្រាល គឺតំបន់ជីវៈវាលរាប
const AKVAJ_PLANTOJ_NUANCO = [ 0o40, 0o200, 0o260 ]; // ខៀវបៃតងជ្រៅ គឺរុក្ខជាតិទឹក
const EKVIZETO_NUANCO = [ 0o100, 0o260, 0o140 ];     // បៃតងស្រាល គឺ ekvizeto
const BIOMA_NUANCO: Record<string, [ number[], number ]> = {
  montaro: [ MONTA_NUANCO, 0o23/0o100 ],
  valo: [ VALA_NUANCO, 0o23/0o100 ],
  ebenaĵo: [ EBENAJA_NUANCO, 0o23/0o100 ],
  "akvaj-plantoj": [ AKVAJ_PLANTOJ_NUANCO, 0o35/0o100 ],
  ekvizeto: [ EKVIZETO_NUANCO, 0o35/0o100 ],
};
// ស្រទាប់សត្វបង្ហាញតែពេលឧបករណ៍សត្វ ( Animaloj 🐾 )
// បើក។ ចំណុចខៀវស្រាលលើក្រឡាសត្វទឹក ចំណុចភ្លឺលើ
// ក្រឡាបក្សីព្រិល ចំណុចលឿងស្រាលលើក្រឡា NPC។ ទិដ្ឋភាពបង្ហាញ
// តែប្រភេទដែលបានជ្រើស ហើយការលុបបង្ហាញក្រឡាដូចគ្នា ដើម្បី
// ឱ្យគេឃើញអ្វីដែលកំពុងលុប។
const AKVAJ_BESTOJ_NUANCO = [ 0o110, 0o220, 0o300 ];
const PETRELA_NUANCO = [ 0o320, 0o320, 0o320 ];
const NPCA_NUANCO = [ 0o320, 0o260, 0o110 ];
const BESTO_NUANCO: Record<number, [ number[], number ]> = {
  1: [ AKVAJ_BESTOJ_NUANCO, 0o13/0o40 ],
  2: [ PETRELA_NUANCO, 0o13/0o40 ],
  4: [ NPCA_NUANCO, 0o13/0o40 ],
};

// biomoInterp គឺតំបន់ជីវៈដែលគូរនៅចំណុច ( ក្រឡាជិតបំផុតនៃ
// ស្រទាប់តំបន់ជីវៈ )។ 0=ស្វ័យប្រវត្តិ, 1=ភ្នំ, 2=ជ្រលង, 3=វាលរាប, 4=រុក្ខជាតិទឹក,
// 5=ekvizeto។ គំរូដូច skulptitaBiomo ក្នុង tero-datumo.ts។
function biomoInterp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return biomoj[j * N + i];
}
const BIOMA_NOMOJ: ( string | null )[] = [ null, "montaro", "valo", "ebenaĵo", "akvaj-plantoj", "ekvizeto" ];

// bestoInterp គឺតំបន់សត្វដែលគូរនៅចំណុច ( ក្រឡាជិតបំផុត
// នៃស្រទាប់សត្វ )។ ប៊ីត 1=សត្វទឹក, 2=បក្សីព្រិល, 4=NPC។ គំរូដូច
// skulptitaBesto ក្នុង tero-datumo.ts។
function bestoInterp(x: number, z: number): number {
  const i = Math.max(0, Math.min(N - 1, Math.floor(( x - X0 ) / PASO)));
  const j = Math.max(0, Math.min(N - 1, Math.floor(( z - Z0 ) / PASO)));
  return bestoj[j * N + i];
}

// biomoDe គឺតំបន់ជីវៈរបស់ចំណុចក្នុងឧបករណ៍ឆ្លាក់ ( ការសម្រេចដូច
// ហ្គេម )។ តំបន់ជីវៈទឹកមានសុពលភាពតែលើទឹក ហើយម៉ាសតែងតែគ្របដណ្តប់
// តំបន់ជីវៈលើដី រីឯទទេ ( 0 = ស្វ័យប្រវត្តិ ឬគ្មានទិន្នន័យ ) គឺ
// គ្មានអ្វី គ្មានសម្លេង។ មានតែម៉ាស ( មិនមែនកម្ពស់ដី ) សម្រេចទឹក។
function biomoDe(x: number, z: number): string {
  const pentrita = biomoInterp(x, z);
  const akva = maskoInterp(x, z) >= 0o1/0o2;
  if ( pentrita === 4 && akva ) return "akvaj-plantoj";
  if ( pentrita === 5 && akva ) return "ekvizeto";
  if ( akva ) return "akvo";
  if ( pentrita !== 0 ) return BIOMA_NOMOJ[pentrita] ?? "nenio";
  return "nenio";
}
// almetiBiomanNuancon គឺសម្លេងតំបន់ជីវៈ ឬសត្វលើពណ៌ k។ មានតែពេល
// ឧបករណ៍ពាក់ព័ន្ធបើក ( ជក់កំពុងប្រើ ) ប៉ុណ្ណោះ បើមិនដូច្នេះពណ៌នៅតែ
// ដដែល។
export function almetiBiomanNuancon(k: number[], x: number, z: number, _d: number): number[] {
  // មានតែពេលឧបករណ៍តំបន់ជីវៈបើក។ ទឹកទទេមិនទទួល
  // សម្លេងទេ ព្រោះតំបន់ជីវៈទឹក ( រុក្ខជាតិទឹក ekvizeto ) ផ្តល់ពណ៌ឱ្យក្រឡា
  // ដែលគូររបស់ពួកវា ហើយទឹកបង្ហាញពណ៌ផ្ទាល់ខ្លួននៅកន្លែងផ្សេង។
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
  }  // មានតែពេលឧបករណ៍សត្វបើក ហើយទិដ្ឋភាពបង្ហាញតែ
  // ប្រភេទដែលបានជ្រើស ( សត្វទឹកខៀវស្រាល បក្សីព្រិលភ្លឺ រីឯ NPC
  // លឿងស្រាល )។
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

// kolorigiAkvon គឺពណ៌ទឹកតាមជម្រៅ ដែលមានស្រមោលដូចដី។ នៅក្នុង
// ក្រឡាដែលឆ្លាក់ ( delta ≠ 0 ) ទឹកក្លាយពណ៌ខ្វាក់ ( ដូចភក់កូរ ) ដើម្បី
// ឱ្យជក់បង្ហាញឥទ្ធិពលរបស់វាផងដែរក្នុងទន្លេ និងបឹង ព្រោះដី
// ដែលលើកឡើងនឹងមើលមិនឃើញក្រោមទឹកស្រអាប់។
function kolorigiAkvon(datumoj: Uint8ClampedArray, o: number, h: number, nivelo: number,
  ombro: number, delta: number, x: number, z: number): void {
  const prof = Math.min(6, nivelo - h);
  const t = prof / 6;
  let r = 0o40 + ( 0o10 - 0o40 ) * t;
  let g = 0o150 - 0o110 * t;
  let b = 0o150 - 0o110 * t;
  if ( delta !== 0 ) {
    const s = 0o5/0o40 + Math.min(0o1/0o2, Math.abs(delta) / 4);
    r += 0o30 * s; g -= 0o14 * s; b -= 0o20 * s;
  }
  // សម្លេងតំបន់ជីវៈ និងសត្វគ្របដណ្តប់ទឹកផងដែរ គឺតំបន់ជីវៈទឹក
  // ( រុក្ខជាតិទឹក ekvizeto ) និងសត្វទឹកត្រូវបានគូរលើទឹកផ្ទាល់។
  const k = almetiBiomanNuancon([ r, g, b ], x, z, delta);
  r = k[0]; g = k[1]; b = k[2];
  datumoj[o] = Math.min(0o377, r * ombro);
  datumoj[o + 1] = Math.min(0o377, g * ombro);
  datumoj[o + 2] = Math.min(0o377, b * ombro);
  datumoj[o + 3] = 0o377;
}

// bicubaDerivata គឺដេរីវេនៃខ្សែកោង Katmull-Rom តាម t។
function bicubaDerivata(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  return 0o1/0o2 * ( ( -p0 + p2 ) + 2 * ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t
    + 3 * ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t2 );
}
// deltoKunDerivajoj គឺកម្ពស់ទ្វេកោង និងដេរីវេភាគទាំងពីរនៅ ( x, z )។
// ការអាន 4×4 មួយផ្តល់តម្លៃទាំងបី គឺលឿនជាង 5 ដងបើធៀបនឹងភាពខុសគ្នា
// កណ្តាលនៃការគំរូទ្វេលីនេអ៊ែរប្រាំ ហើយណរម៉ាល់រលូន ( ដេរីវេ
// នៃផ្ទៃរលូន គ្មានសំណល់សំណាញ់ )។
export function deltoKunDerivajoj(x: number, z: number): [ number, number, number ] {
  const fx = ( x - X0 ) / PASO, fz = ( z - Z0 ) / PASO;
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  const cxelo = ( i: number, j: number ) => deltoj[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  // ជួរទាំងបួន គឺកម្ពស់ និងដេរីវេ u ក្នុងមួយជួរ។
  const r: number[] = [], rd: number[] = [];
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
// rekalkuliDeklivojn គឺស្រមោលភ្នំ ( hillshade ) សម្រាប់ចតុកោណកែង។
// ណរម៉ាល់នៃវាលកម្ពស់ប្រឈមនឹងពន្លឺពីទិសពាយ័ព្យ ហើយកត្តាស្រមោល
// 0.7 ដល់ 1.2 គុណនឹងពណ៌ដី។ ដេរីវេមកពី
// ផ្ទៃទ្វេកោងវិភាគ ( មូលដ្ឋានរាបស្មើ ដូច្នេះដេលតាគ្រប់គ្រាន់ )។
export function rekalkuliDeklivojn(px0: number, py0: number, px1: number, py1: number): void {
  const lumoX = -0o43/0o100, lumoY = 0o25/0o40, lumoZ = 0o41/0o100;
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
      const nx = -deklX * 0o215/0o100, nz = -deklZ * 0o215/0o100, ny = 1;
      const len = Math.hypot(nx, ny, nz);
      const lumo = ( nx * lumoX + ny * lumoY + nz * lumoZ ) / len / lumoLen;
      deklivoj[i] = 0o55/0o100 + 0o1/0o2 * Math.max(0, lumo);
    }
  }
}

// pentri គឺការគូរពណ៌នៃចតុកោណកែងលើផ្ទាំងគំនូរពិភពលោក។ ដី
// រួមបញ្ចូលព្រែកកាត់ទឹក ( គ្រែទន្លេ ) គឺផលបូកដូច alteco()
// ក្នុងហ្គេម។ ទឹកមកពីការគណនា ( ប្រភព និងអាង ) មិនមែនពី
// ម៉ាសដែលគូរទេ ហើយកម្រិតជាកម្រិតផ្ទាល់ខ្លួនរបស់ចំណុច ( ទន្លេ
// ហូរចុះ អាងនៅរាបស្មើ )។
//     @param px0, py0, px1, py1 ( number ) - ចតុកោណកែងជាភិចសែលរបស់ផ្ទាំងគំនូរ។
export function pentri(px0: number, py0: number, px1: number, py1: number): void {
  const datumoj = bazaBildo.data;
  for ( let py = py0; py <= py1; py++ ) {
    const z = MONDO_HALFO - ( py + 0o1/0o2 ) * MONDO / REZ;
    for ( let px = px0; px <= px1; px++ ) {
      const x = MONDO_HALFO - ( px + 0o1/0o2 ) * MONDO / REZ;
      const i = py * REZ + px;
      const bazo = bazoj[i];
      const delta = deltoInterp(x, z);
      // ដីរួមបញ្ចូលព្រែកកាត់ទឹក ( គ្រែទន្លេ ) គឺផលបូកដូច
      // alteco() ក្នុងហ្គេម។
      const h = bazo + delta - akvaKavoInterp(x, z);
      const o = i * 4;
      const ombro = deklivoj[i] || 1;
      // ទឹកមកពីការគណនា ( ប្រភព និងអាង ) មិនមែនពី
      // ម៉ាសដែលគូរទេ។ កម្រិតជាកម្រិតផ្ទាល់ខ្លួនរបស់ចំណុច ព្រោះ
      // ទន្លេហូរចុះ អាងនៅរាបស្មើ។
      const nivelo = akvaNiveloEn(x, z);
      if ( nivelo !== null && cxuAkvo(x, z) && h < nivelo - 0o1/0o100 ) {
        kolorigiAkvon(datumoj, o, h, nivelo, ombro, delta, x, z);
      } else {
        const k = almetiBiomanNuancon(terenaKoloro255(h, x, z, deklivoGradientoj[i] || 0), x, z, delta);
        datumoj[o] = Math.min(0o377, k[0] * ombro);
        datumoj[o + 1] = Math.min(0o377, k[1] * ombro);
        datumoj[o + 2] = Math.min(0o377, k[2] * ombro);
        datumoj[o + 3] = 0o377;
      }
    }
  }
  bazaKunteksto.putImageData(bazaBildo, 0, 0);
}
