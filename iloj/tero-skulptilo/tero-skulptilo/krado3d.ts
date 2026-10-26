// ≺⧼ រូបរាង 3D 🏙️ ⧽≻
// រូបរាង 3D របស់សំណាញ់ទីក្រុង និងផ្លូវកម្រិតពិភពលោកក្នុងទិដ្ឋភាព 3D គឺ
// អគារ និងផ្លូវពិតរបស់ហ្គេម ( ឧបករណ៍សាងសង់ដូច
// urbo.ts និង vojoj.ts )។ អនុគមន៍ទាំងនេះសាងសង់រូបរាងឡើងវិញក្រោយរាល់ការផ្លាស់ប្តូរ
// សំណាញ់ ឬផ្លូវ រីឯក្រុមខ្លួនឯង ( និងឆាក ) ស្ថិតនៅក្នុង vido3d.js។
import * as THREE from "three";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { TIPAJ_NIVELOJ } from "../../../eskekoj/konstruajxoj/satalaj/tipoj.js";
import { konstruiHxeuxfojn } from "../../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../../../eskekoj/komunajxoj/materialoj.js";
import { konstruiVojojn } from "../../../eskekoj/medio/vojoj.js";
import { VOJA_AKVA_KLARANCO, VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO, STUPA_RISERO, surGrid } from "../../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiIntersekcajnPlatojn } from "../../../eskekoj/medio/vojoj/platoj.js";
import { troviVojaRetajnKunigojn } from "../../../eskekoj/medio/voj-reto.js";
import { konstruiDokon } from "../../../eskekoj/medio/doko.js";
import { gluiVojaFinon } from "../../../kantaoj/mondo/urbo/gluado.js";
import { kreiStuparanAlton, kreiStuparajnPunktojn } from "../../../eskekoj/medio/doko/stuparo.js";
// ទឹក គឺស្ពាន ( pontoVojo ) អានទឹកពីការគណនាដេរីវេ។
import { akvaRezulto, akvaNiveloEn, cxuAkvo, teraAlto } from "./akvo.js";
import { sceno3d, kradaGrupo3D, vojaGrupo3D, YTROIGO } from "./vido3d.js";
import { cxuVidebla } from "./videco.js";
import type { KradaPlano } from "../../../kantaoj/mondo/krado/tipoj.js";
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo } from "../../../kantaoj/mondo/urbo/tipoj.js";
import type { VojaPunkto } from "../../../eskekoj/medio/voj-reto.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import type { HxeuxfaLoko } from "../../../eskekoj/konstruajxoj/hxeuxfa/tipoj.js";
import type { KeuxfhxesoLoko } from "../../../eskekoj/mebloj/keuxfhxeso.js";

// ⟪ សំណង់ដែលបានតាមដាន 📃 ⟫ គឺ konstruiSatalon បន្ថែមក្រុម ( និង
// ច្បាប់ចម្លងកញ្ចកែ ) ផ្ទាល់ទៅឆាក ដូច្នេះវត្ថុត្រូវបានតាមដាននៅទីនេះ
// សម្រាប់ការលុបពេលសាងសង់ឡើងវិញ និងសម្រាប់ភាពមើលឃើញពេលប្តូរផ្ទាំង ( ឯកសារមេ
// អានតារាងដើម្បីបើកបិទភាពមើលឃើញ )។
export let krada3DKonstruajxoj: THREE.Object3D[] = [];

/* ឧបករណ៍សាងសង់របស់ហ្គេមប្រកាសឆាក រីឯឧបករណ៍ផ្តល់ក្រុម ដូច្នេះទាំងពីរជា
   Object3D។ ឧបករណ៍ជំនួយបង្ហាញការបំប្លែងនៅកន្លែងតែមួយ។
    @param g ( THREE.Object3D ) - ធុង។
@returns ធុងដូចគ្នាជាឆាក ( THREE.Scene )។ */
function kielSceno(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

/* ដកកូនទាំងអស់ចេញពីក្រុម ហើយដោះលែងធរណីមាត្រ និង
   វត្ថុរបស់ពួកវា ។ កំពង់ ( និងជណ្តើរ ) ជាក្រុមកូន ដូច្នេះការដើរឆ្លង
   ត្រូវចុះដល់ក្រោម បើមិនដូច្នេះធរណីមាត្រនៅសល់ក្នុងអង្គចងចាំ ។
    @param grupo ( THREE.Object3D ) - ក្រុមដែលត្រូវធ្វើឱ្យទទេ។ */
function malplenigiGrupon(grupo: THREE.Object3D): void {
  while ( grupo.children.length ) {
    const m = grupo.children.pop() as THREE.Object3D;
    m.traverse(( o ) => {
      const mesa = o as THREE.Mesh;
      if ( mesa.geometry ) mesa.geometry.dispose();
      if ( mesa.material ) {
        const matoj = Array.isArray(mesa.material) ? mesa.material : [ mesa.material ];
        for ( const mat of matoj ) mat.dispose();
      }
    });
    if ( m.parent ) m.parent.remove(m);
  }
}

// ⟪ ការភ្ជាប់ជាមួយកម្មវិធីកែសម្រួល 📃 ⟫ គឺការយោងរបស់ឯកសារមេ ដែលភ្ជាប់
// តែម្តងដោយ agordiKradon3D។ ស្ថានភាពសំណាញ់ ( ទីក្រុង ផ្លូវ កំពង់
// អុហ្វសិត ផ្ទាំងកំពុងប្រើ ) ផ្លាស់ប្តូរពេលប្រើ ដូច្នេះវាត្រូវបានអានដោយ
// អនុគមន៍។
// ⟨ ការយោងរបស់ឯកសារមេ 📃 ⟩ គឺអនុគមន៍ស្ថិតិ និង
// អ្នកអានស្ថានភាពសំណាញ់។
interface Krada3DLigo {
  // ទីក្រុងដែលកំពុងបង្ហាញ ( ជាមួយផែនការ និងអុហ្វសិតរបស់ពួកវា ) ។ ជាធម្មតា
  // មួយ ，ប៉ុន្តែផ្ទាំង មើលឃើញ 👁️ អាចបើកច្រើន ។
  vidotajKradoj: () => { indekso: number; plano: KradaPlano; ofsX: number; ofsZ: number }[];
  dioritaMaterialo: () => THREE.MeshStandardMaterial;
  ORA_MATERIALO: THREE.MeshStandardMaterial;
  urboj: () => SkulptaUrbo[];
  vojoj: () => SkulptaVojo[];
  dokoj: () => SkulptaPlatformo[];
}
let vidotajKradoj: () => { indekso: number; plano: KradaPlano; ofsX: number; ofsZ: number }[]
  = () => [];
let dioritaMaterialo: () => THREE.MeshStandardMaterial;
let ORA_MATERIALO: THREE.MeshStandardMaterial;
let urboj: () => SkulptaUrbo[];
let vojoj: () => SkulptaVojo[];
let dokoj: () => SkulptaPlatformo[];

/* ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( Krada3DLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiKradon3D(k: Krada3DLigo): void {
  dioritaMaterialo = k.dioritaMaterialo;
  vidotajKradoj = k.vidotajKradoj;
  ORA_MATERIALO = k.ORA_MATERIALO;
  urboj = k.urboj;
  vojoj = k.vojoj; dokoj = k.dokoj;
}

// ⟪ កម្ពស់ដែលមើលឃើញ 📏 ⟫ គឺដីសំណាញ់ 3D ត្រូវបានបំផ្លើសបញ្ឈរ
// ( YTROIGO ) ដូច្នេះរាល់កម្ពស់ដែលឆ្លងទៅឧបករណ៍សាងសង់របស់ហ្គេមត្រូវ
// បំផ្លើសដូចគ្នា ។ បើមិនដូច្នេះ អគារ និងផ្លូវលិចក្នុងដី ២.៥ ដង ។
// ដីមកពី teraAlto ( ដី + ការឆ្លាក់ − ព្រែកទឹក ) គឺដីដូចសំណាញ់ដែលមើលឃើញ ។
/* កម្ពស់ដីក្នុងខ្នាត 3D
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្ពស់ ( number )។ */
function grundo3D(x: number, z: number): number {
  return teraAlto(x, z) * YTROIGO;
}
/* កម្រិតទឹកក្នុងខ្នាត 3D （ បូកចន្លោះបើស្ពាន ）។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្រិត ឬ -Infinity ( number )។ */
function akvaNivelo3D(x: number, z: number): number {
  const nivelo = akvaNiveloEn(x, z);
  return nivelo === null ? -Infinity : nivelo * YTROIGO;
}
/* កម្រិតទឹកបូកចន្លោះសម្រាប់ផ្ទៃផ្លូវ ។
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្រិត ឬ -Infinity ( number )។ */
function akvaFino3D(x: number, z: number): number {
  const nivelo = akvaNivelo3D(x, z);
  return nivelo === -Infinity ? -Infinity : nivelo + VOJA_AKVA_KLARANCO * YTROIGO;
}

// ⟪ កម្រិតរួមនៅចំណុចភ្ជាប់ 📏 ⟫ គឺផ្លូវពីរដែលជួបគ្នា ឬផ្លូវដែលចូល
// ទីក្រុង/កំពង់ ត្រូវឈរនៅកម្រិតតែមួយ ។ បើមិនដូច្នេះ ចុងផ្លូវមួយ
// លិចក្រោមដី ឯមួយទៀតអណ្តែត ។ ចំណុចភ្ជាប់នីមួយៗទទួលកម្រិតមួយ ( ដូច
// kantaoj/mondo/urbo.ts ) ហើយផ្លូវឡើងទៅរកវាដោយជម្រាលស្មើ ។
const KUNIGA_KLINO = 0o1/0o4;
const KUNIGA_RADIUSO = Math.hypot(VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO);
const KUNIGA_CELO = 0o20;

// pontoVojo គឺចំណុចចុងទាំងពីរនៃផ្លូវ បើវាឆ្លងកាត់ទឹក ( គឺស្ពាន )។
// បើមិនដូច្នេះ null។ ទឹកមកពីការគណនាដេរីវេ ( akvo.js )។
function pontoVojo(v: SkulptaVojo): { a: VojaPunkto; b: VojaPunkto } | null {
  if ( !akvaRezulto || v.punktoj.length < 2 ) return null;
  const a = v.punktoj[0], b = v.punktoj[v.punktoj.length - 1];
  const akvas = cxuAkvo;
  if ( akvas(a[0], a[1]) || akvas(b[0], b[1]) ) return null;
  const longo = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if ( longo < 0o10 ) return null;
  const specimenoj = Math.max(0o10, Math.round(longo));
  let akvaj = 0;
  for ( let i = 0; i <= specimenoj; i++ ) {
    const t = i / specimenoj;
    if ( akvas(a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t) ) akvaj++;
  }
  if ( akvaj / ( specimenoj + 1 ) < 0o2/0o5 ) return null;
  return { a, b };
}

// rekonstruiVojojn3D គឺផ្លូវទាំងអស់ក្នុងទិដ្ឋភាព 3D ៖ ផ្លូវកម្រិតពិភពលោក ំ
// ផ្លូវសំណាញ់របស់ទីក្រុងនីមួយៗ ( ដែលកំពុងបង្ហាញ ) ំ ជណ្តើរកំពង់ ំ និង
// កំពង់ខ្លួនឯង ។ ទាំងអស់សាងសង់ដោយឧបករណ៍របស់ហ្គេម ( konstruiVojojn ,
// konstruiDokon , konstruiIntersekcajnPlatojn ) ដូច្នេះការមើលជាមុន
// ត្រូវនឹងអ្វីដែលហ្គេមសាងសង់ ។ ផ្លូវរបស់សំណាញ់ជាផ្លូវពិត ( មិនមែនប្រអប់ )
// ដូច្នេះផ្ទៃរបស់វាត្រូវនឹងផ្លូវពិភពលោកនៅចំណុចភ្ជាប់ ។
export function rekonstruiVojojn3D(): void {
  if ( !vojaGrupo3D ) return;
  malplenigiGrupon(vojaGrupo3D);
  const alteco = ( x: number, z: number ): number => grundo3D(x, z);
  // ⟨ កម្ពស់ផ្ទៃផ្លូវនៅចំណុចមួយ ៖ ខ្ពស់ជាងដីជុំវិញមួយកម្រិត 📃 ⟩
  const vojaSupro = ( x: number, z: number, largho: number ): number => {
    const duono = largho / 4 + VOJA_BORDA_LARĜO;
    let maks = alteco(x, z);
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i * Math.PI / 0o4;
      maks = Math.max(maks, alteco(x + Math.cos(ang) * duono, z + Math.sin(ang) * duono));
    }
    return maks + VOJA_SUPRO_LEVIGXO;
  };
  // ⟪ និយមន័យផ្លូវ 📃 ⟫ ។ ផ្លូវកម្រិតពិភពលោកមួយនិយមន័យ , ដូច្នេះវេន
  // មិនបង្គត់ ( ធ្នូត្រូវការបន្ទាត់ពហុកោណទាំងមូល ) ហើយការត្បាញថ្មចាប់ផ្តើម
  // ឡើងវិញនៅចម្រៀកនីមួយៗ ។ ហ្គេមប្រើបន្ទាត់ពហុកោណទាំងមូល ដូច្នេះ
  // ការមើលជាមុននេះក៏ដូចគ្នាដែរ ។
  const difinoj: VojDifino[] = [];
  for ( const v of vojoj() ) {
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    const largho = v.larĝo || 0o7/0o2;
    const difino: VojDifino = { pts: v.punktoj.map(p => [ p[0], p[1] ] as VojaPunkto),
      w: largho / 2, kapoj: true };
    const ponto = pontoVojo(v);
    if ( ponto ) {
      const ay = vojaSupro(ponto.a[0], ponto.a[1], largho);
      const by = vojaSupro(ponto.b[0], ponto.b[1], largho);
      const dx = ponto.b[0] - ponto.a[0], dz = ponto.b[1] - ponto.a[1];
      const kvadrato = dx * dx + dz * dz || 1;
      difino.heightFn = ( x: number, z: number ) => {
        const t = Math.max(0, Math.min(1, ( ( x - ponto.a[0] ) * dx + ( z - ponto.a[1] ) * dz ) / kvadrato));
        return ay + ( by - ay ) * t - VOJA_SUPRO_LEVIGXO;
      };
    }
    difinoj.push(difino);
  }
  // ⟨ ចុងផ្លូវពិភពលោក ៖ ចំនួននិយមន័យមុនផ្លូវសំណាញ់ ( សម្រាប់ការទាញចុងផ្លូវ ) 📃 ⟩
  const mondoNombro = difinoj.length;
  // ⟪ ផ្លូវសំណាញ់ 🏙️ ⟫ ។ ផ្លូវរបស់ផែនការ ( និងស្ពរ ) ដាក់ក្នុងពិភពលោកដោយ
  // អុហ្វសិតរបស់ទីក្រុងនីមួយៗ ។ ផ្នែកដែលបានបញ្ចូលពីផ្លូវពិភពលោក
  // ( stacia ) មិនត្រូវសាងសង់ម្តងទៀតទេ ព្រោះផ្លូវពិភពលោកខាងលើ
  // មានវារួចហើយ ។
  const KRADA_VOJA_LARĜO = 0o16/0o10;
  for ( const krado of vidotajKradoj() ) {
    const ofsX = krado.ofsX, ofsZ = krado.ofsZ;
    for ( const r of krado.plano.vojoj ) {
      if ( r.stacia ) continue;
      const pts: VojaPunkto[] = r.orient === "EW"
        ? [ [ ofsX + r.de, ofsZ + r.poz ], [ ofsX + r.al, ofsZ + r.poz ] ]
        : [ [ ofsX + r.poz, ofsZ + r.de ], [ ofsX + r.poz, ofsZ + r.al ] ];
      difinoj.push({ pts, w: KRADA_VOJA_LARĜO, kapoj: false });
    }
    for ( const s of krado.plano.spronoj ) {
      difinoj.push({ pts: [ [ ofsX + s.de[0], ofsZ + s.de[1] ],
        [ ofsX + s.al[0], ofsZ + s.al[1] ] ], w: KRADA_VOJA_LARĜO, kapoj: false });
    }
  }
  // ⟪ ការទាញចុងផ្លូវ 🧲 ⟫ ។ ចុងផ្លូវដែលឈប់ខ្លីពីចំណុចភ្ជាប់ ( ឬពីផ្លូវផ្សេង )
  // ទាញទៅចំណុចនោះ ។ បើមិនទាញ , ចុងផ្លូវបង្កើតចំណុចភ្ជាប់ផ្ទាល់ខ្លួន
  // ហើយចានភ្ជាប់ពីរជាប់គ្នា -> ស្នាមប្រេះនិងជំហាន ។ ( ដូច
  // kantaoj/mondo/urbo.ts : gluiVojaFinon )
  const dokoLandaj: { x: number; z: number }[] = dokoj().map(d => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * ( d.profundo / 2 ),
      z: d.z + Math.cos(rotacio) * ( d.profundo / 2 ) };
  });
  if ( mondoNombro > 0 ) {
    const antaŭaj = troviVojaRetajnKunigojn(
      difinoj.map(d => ( { punktoj: d.pts, larĝo: 2 * d.w } )), dokoj());
    const gluaCeloj: VojaPunkto[] = antaŭaj.map(k => [ k.x, k.z ] as VojaPunkto);
    for ( let i = 0; i < mondoNombro; i++ ) {
      const aliaj = difinoj.filter(( _, j ) => j !== i).map(d => d.pts);
      difinoj[i] = { ...difinoj[i],
        pts: gluiVojaFinon(difinoj[i].pts, gluaCeloj, dokoLandaj, aliaj) };
    }
  }
  // ⟪ កម្រិតរួមនៅចំណុចភ្ជាប់ 📏 ⟫ គឺគណនាម្តងសម្រាប់ចំណុចភ្ជាប់ទាំងអស់
  // ( ផ្លូវជួបផ្លូវ , ផ្លូវចូលទីក្រុង , ចុងផ្លូវនៅមាត់កំពង់ ) ហើយ
  // បន្ទាប់មកផ្លូវឡើងទៅរកកម្រិតនោះ ។
  const vojaListo = difinoj.map(d => ( { punktoj: d.pts, larĝo: 2 * d.w } ));
  const kunigoj = troviVojaRetajnKunigojn(vojaListo, dokoj());
  const fontoj = new Map<string, { x: number; z: number; alto: number }[]>();
  for ( const k of kunigoj ) {
    const alto = surGrid(vojaSupro(k.x, k.z, 2 * VOJA_EKSTERA_DUONO)) - VOJA_SUPRO_LEVIGXO;
    const klavo = Math.floor(k.x / KUNIGA_CELO) + "," + Math.floor(k.z / KUNIGA_CELO);
    const listo = fontoj.get(klavo) ?? [];
    listo.push({ x: k.x, z: k.z, alto });
    fontoj.set(klavo, listo);
  }
  const harmoniigita = ( x: number, z: number ): number => {
    let alto = alteco(x, z);
    const cx = Math.floor(x / KUNIGA_CELO), cz = Math.floor(z / KUNIGA_CELO);
    for ( let dx = -0o1; dx <= 0o1; dx++ ) {
      for ( let dz = -0o1; dz <= 0o1; dz++ ) {
        const listo = fontoj.get(( cx + dx ) + "," + ( cz + dz ));
        if ( !listo ) continue;
        for ( const fonto of listo ) {
          const disto = Math.hypot(x - fonto.x, z - fonto.z);
          if ( disto > KUNIGA_RADIUSO + 0o10 ) continue;
          alto = Math.max(alto, fonto.alto
            - KUNIGA_KLINO * Math.max(0, disto - KUNIGA_RADIUSO));
        }
      }
    }
    return alto;
  };
  // ⟪ កំពង់ និងជណ្តើរកំពង់ ⚓ ⟫ ។ កំពង់សាងសង់ដោយ konstruiDokon ( វេទិកា ,
  // ស៊ុម , គ្រឹះ ) ហើយជណ្តើររបស់វាជាផ្លូវជំហាន ( stuparo ) ដូច
  // kantaoj/mondo/urbo.ts ។ ដោយសារផ្លូវដែលចូលមកកំពង់ឈរនៅកម្រិតរួម
  // ( harmoniigita ) ចុងផ្លូវត្រូវនឹងកម្ពស់កំពុងលើកម្ពស់វេទិកា ំ ដូច្នេះជណ្តើរ
  // ចុះពីផ្លូវទៅវេទិកាដោយគ្មានជំហានបាត់ ឬចុងផ្លូវទាប ។
  for ( let i = 0; i < dokoj().length; i++ ) {
    const d = dokoj()[i];
    const rotacio = d.rotacio ?? 0;
    const doko = konstruiDokon(kielSceno(vojaGrupo3D), d.x, d.z, rotacio,
      harmoniigita, akvaNivelo3D, d.profundo, alteco);
    if ( doko.stuparajPunktoj.length < 2 ) continue;
    const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
    const landaX = d.x + sin * ( d.profundo / 2 ), landaZ = d.z + kos * ( d.profundo / 2 );
    // ⟨ កម្រាលលើគេ ៖ ផ្លូវចូលមក ឬវេទិកាខ្លួនឯង 📃 ⟩
    const starto = Math.max(surGrid(vojaSupro(landaX, landaZ, doko.platformWidth)),
      doko.platformY);
    const falto = starto - doko.landejaY;
    if ( falto <= STUPA_RISERO * 0o1/0o2 ) continue;
    const nombro = Math.max(1, Math.round(falto / STUPA_RISERO));
    const punktoj = kreiStuparajnPunktojn(doko.stuparajPunktoj[0], doko.stuparajPunktoj[1], nombro);
    difinoj.push({ pts: punktoj, w: doko.platformWidth, stuparo: true, kapoj: false,
      heightFn: kreiStuparanAlton(punktoj, starto - STUPA_RISERO - VOJA_SUPRO_LEVIGXO),
      grundoFn: alteco });
  }
  if ( !difinoj.length ) return;
  const protektoj: VojaPunkto[] = kunigoj.map(k => [ k.x, k.z ]);
  const diorito = kreiDioritanMaterialon();
  const andezito = kreiAndezitanMaterialon();
  konstruiVojojn(kielSceno(vojaGrupo3D), difinoj, harmoniigita, diorito, andezito, protektoj,
    { akvaFn: akvaFino3D });
  const fermitaj = new Map<string, [ number, number ]>(kunigoj.map(k => [ k.x + "," + k.z, k.fermitaj ]));
  const rotacioj = new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.rotacio ]));
  // ⟨ ដៃរបស់ចានភ្ជាប់ 📃 ⟩ ។ បើគ្មានទិសដៃ , ចានភ្ជាប់មិនដឹងថាផ្លូវណាចូលមក ,
  // ដូច្នេះវាសាងសង់ការ៉េបួនជ្រុងពេញ ( ជ្រុងមិនកាត់ , មានស្នាមសន្លាក់ ) ។
  const direktoj = new Map<string, [ number, number ][]>(
    kunigoj.map(k => [ k.x + "," + k.z, k.direktaj ]));
  konstruiIntersekcajnPlatojn(kielSceno(vojaGrupo3D), protektoj, harmoniigita, diorito, andezito,
    fermitaj, rotacioj, direktoj, alteco);
  vojaGrupo3D.visible = cxuVidebla("vojoj");
}

// ⟪ ប្រភេទសំណង់ 📐 ⟫ ។ លេខទាំងនេះត្រូវនឹង kantaoj/mondo/urbo/krada-urbo.ts
// ( kreiSpecon ) ដូច្នេះការមើលជាមុនបង្ហាញសំណង់ដូចហ្គេម ៖ ស្ថានីយយានអវកាស ,
// ប្រាសាទ ៧ ជាន់ , ប៉ម ៨ ជាន់ , និងប្លុកធម្មតា ៤ ជាន់ ។
/* spec របស់សំណង់មួយពីផែនការ
    @param tipo ( string ) - ប្រភេទអគារ ( រួមទាំង stacioxipo ) ។
    @param sx, sz ( number ) - ទីតាំងក្នុងពិភពលោក ។
    @param rot ( number ) - ការបង្វិល ។
    @param nomo ( string ) - ឈ្មោះខាងក្នុង ។
@returns spec ( KonstruSpec ) ដែលឧបករណ៍សាងសង់ទទួល */
function kradaSpeco(tipo: string, sx: number, sz: number, rot: number, nomo: string) {
  const estasStacio = tipo === "stacioxipo";
  const niveloj = estasStacio ? TIPAJ_NIVELOJ.stacioxipo
    : tipo === "sanktejo" ? 7 : tipo === "turo" ? 0o10 : 4;
  const tieroAlto = estasStacio ? 0o155/0o40
    : tipo === "sanktejo" ? 0o30/0o10
    : tipo === "turo" ? 0o30/0o10
    : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
  return {
    x: sx, z: sz, type: tipo, name: nomo, niveloj, w: 0o10, d: 0o10, tieroAlto,
    rot, diamond: true,
    h0: grundo3D(sx, sz),
    sube: estasStacio ? 0 : niveloj,
    tieroAltoSub: 0o123/0o40,
  };
}

// rekonstruiKradon3D គឺការតំរង់សំណាញ់បច្ចុប្បន្នជារូបរាង 3D ពិតនៅក្នុង
// ទិដ្ឋភាព 3D។ អគារទាំងនោះជាអគារពិតរបស់ហ្គេម ( ដូច
// konstruiSatalon ក្នុង urbo.ts គឺសំណាញ់ វត្ថុ ទ្វារ និង
// កញ្ចក់ពេជ្រពិត )។ ផ្លូវ និងកំពង់របស់ទីក្រុងសាងសង់ដោយ
// rekonstruiVojojn3D ( ក្រុមផ្លូវ ) ដូច្នេះផ្នែកនេះមានតែអគារ ចង្កៀង
// និងគីហ្វហេសូ ។ konstruiSatalon បន្ថែមក្រុម ( និងច្បាប់ចម្លងកញ្ចកែ )
// ផ្ទាល់ទៅឆាក ដូច្នេះវត្ថុត្រូវបានតាមដានក្នុង krada3DKonstruajxoj
// សម្រាប់ការលុបពេលសាងសង់ឡើងវិញ និងភាពមើលឃើញពេលប្តូរផ្ទាំង។
export function rekonstruiKradon3D(): void {
  if ( !kradaGrupo3D || !sceno3d ) return;
  // លុបអគារចាស់ ( ក្រុម និងកញ្ចក់ ដែលនៅផ្ទាល់ក្នុង
  // ឆាក ) ចេញ ។
  for ( const o of krada3DKonstruajxoj ) {
    if ( o.parent ) o.parent.remove(o);
    const forigitaj = new Set<THREE.BufferGeometry | THREE.Material>();
    o.traverse(( m ) => {
      const mesa = m as THREE.Mesh;
      if ( mesa.isMesh ) {
        if ( mesa.geometry && !forigitaj.has(mesa.geometry) ) { mesa.geometry.dispose(); forigitaj.add(mesa.geometry); }
        const matoj = Array.isArray(mesa.material) ? mesa.material : [ mesa.material ];
        for ( const mat of matoj ) if ( mat && !forigitaj.has(mat) ) { mat.dispose(); forigitaj.add(mat); }
      }
    });
  }
  krada3DKonstruajxoj = [];
  malplenigiGrupon(kradaGrupo3D);
  // ⟪ ទីក្រុងដែលកំពុងបង្ហាញ 🏙️ ⟫ ។ ផ្ទាំង មើលឃើញ 👁️ អាចបើកទីក្រុង
  // ច្រើនក្នុងពេលតែមួយ ដូច្នេះសំណង់ត្រូវបានសាងសង់សម្រាប់ទីក្រុងនីមួយៗ
  // ជាមួយអុហ្វសិតរបស់ខ្លួន ។
  for ( const krado of vidotajKradoj() ) {
    const plano = krado.plano;
    const ofsX = krado.ofsX, ofsZ = krado.ofsZ;
    const urbo = urboj()[krado.indekso];
    // អគារ គឺសាតាល់ពិតរបស់ហ្គេម ( ប្រភេទដូចក្នុង
    // urbo.ts គឺក្រឡាស្ថានីយរថភ្លើង ប្រាសាទ ( ៧ ជាន់ ) ប៉ម ( ៨ ជាន់ ) ,
    // មជ្ឈមណ្ឌលប្លុកបួនជាយានអវកាស រីឯអ្វីផ្សេងទៀតតាមប្រភេទក្រឡា )។
    const selektajxoj: THREE.Mesh[] = [];
    for ( let i = 0; i < plano.konstruaĵoj.length; i++ ) {
      const b = plano.konstruaĵoj[i];
      // ស្ថានីយដែលគូរដោយដៃ ( និងស្វ័យប្រវត្តិ ) សាងសង់ជាយានអវកាស។
      const tipo = ( b.stacia || b.tipo === "stacio" ) ? "stacioxipo" : b.tipo;
      const wx = ofsX + b.x, wz = ofsZ + b.z;
      const antaŭ = sceno3d.children.length;
      konstruiSatalon(kradaSpeco(tipo, wx, wz, b.rot, "krado" + krado.indekso + "_" + i),
        sceno3d, selektajxoj);
      // konstruiSatalon បន្ថែមក្រុម ច្បាប់ចម្លងកញ្ចក់ និងចិញ្ចៀន
      // មាសផ្ទាល់ទៅឆាក ដូច្នេះតាមដានទាំងអស់សម្រាប់ការលុប និងភាពមើលឃើញ។
      krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
    }
    // ខេអ៊ូហ្វហេសូ គឺរចនាសម្ព័ន្ធកំពូលប្រាំមួយទាំងបួនជុំវិញចំណុចកណ្តាល ( ធរណីមាត្រ
    // ដូចហ្គេម គឺ R=10 មួយនៅក្រៅគ្រប់កំពូលនៃ
    // ប្រាសាទកណ្តាល នៅស្មើគុណនៃ 45 ដឺក្រេ )។ បង្ហាញតែពេលទីក្រុងដែលកំពុងកែ
    // មានពួកវា។ ក្រុមត្រូវបានបន្ថែមផ្ទាល់ទៅឆាក ហើយបានតាមដានក្នុង
    // krada3DKonstruajxoj សម្រាប់ការលុប និងភាពមើលឃើញ។
    if ( urbo && urbo.keuxfhxeso ) {
      const KEUXFHXESO_R = 0o10;
      const lokoj: KeuxfhxesoLoko[] = [];
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        lokoj.push({ x: ofsX + Math.cos(a) * KEUXFHXESO_R, z: ofsZ + Math.sin(a) * KEUXFHXESO_R, rot: a });
      }
      const antaŭ = sceno3d.children.length;
      konstruiKeuxfhxeso(sceno3d, lokoj, grundo3D, ORA_MATERIALO);
      krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
    }
    // ចង្កៀងផ្លូវរបស់សំណាញ់ គឺគំរូបួនចង្កៀងជុំវិញថ្នាំងផ្សារ និង
    // ផ្លូវប្រសព្វ ( ធរណីមាត្រដូចហ្គេម ពីផែនការ )។ សំណាញ់ចង្កៀងពិត
    // របស់ហ្គេម ( konstruiHxeuxfojn គឺសសរ ចាន អណ្តាតភ្លើង )
    // ជាមួយវត្ថុឌីអូរីត និងមាសរួម។ អណ្តាតភ្លើងមិនមានចលនានៅទីនេះទេ ( ហ្គេម
    // ធ្វើដោយ animaciiFlammojn ) ដូច្នេះចំណុចផ្កាភ្លើងនៅ
    // ស្ងាត់ ប៉ុន្តែមើលឃើញ។
    if ( urbo && urbo.lampoj !== false ) {
      const spots: HxeuxfaLoko[] = plano.lampoj.map(l => ( {
        x: ofsX + l.x, z: ofsZ + l.z, y: grundo3D(ofsX + l.x, ofsZ + l.z),
        rotacio: Math.PI / 4 } ));
      if ( spots.length ) {
        const antaŭ = sceno3d.children.length;
        konstruiHxeuxfojn(sceno3d, spots, dioritaMaterialo(), ORA_MATERIALO);
        krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
      }
    }
  }
  const videbla = cxuVidebla("krado");
  krada3DKonstruajxoj.forEach(o => { o.visible = videbla; });
}
