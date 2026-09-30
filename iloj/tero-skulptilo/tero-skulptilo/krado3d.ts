// ≺⧼ រូបរាង 3D 🏙️ ⧽≻
// រូបរាង 3D របស់សំណាញ់ទីក្រុង និងផ្លូវកម្រិតពិភពលោកក្នុងទិដ្ឋភាព 3D គឺ
// អគារ និងផ្លូវពិតរបស់ហ្គេម ( ឧបករណ៍សាងសង់ដូច
// urbo.ts និង vojoj.ts )។ អនុគមន៍ទាំងនេះសាងសង់រូបរាងឡើងវិញក្រោយរាល់ការផ្លាស់ប្តូរ
// សំណាញ់ ឬផ្លូវ រីឯក្រុមខ្លួនឯង ( និងឆាក ) ស្ថិតនៅក្នុង vido3d.js។
import * as THREE from "three";
import { bazaAlteco } from "../../../kantaoj/mondo/tereno.js";
import { konstruiSatalon } from "../../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { konstruiHxeuxfojn } from "../../../eskekoj/konstruajxoj/hxeuxfa/lampoj.js";
import { konstruiKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon } from "../../../eskekoj/komunajxoj/materialoj.js";
import { konstruiVojojn } from "../../../eskekoj/medio/vojoj.js";
import { VOJA_SUPRO_LEVIGXO } from "../../../eskekoj/medio/vojoj/mezuroj.js";
import { konstruiIntersekcajnPlatojn } from "../../../eskekoj/medio/vojoj/platoj.js";
import { troviVojaRetajnKunigojn } from "../../../eskekoj/medio/voj-reto.js";
// ទឹក គឺស្ពាន ( pontoVojo ) អានទឹកពីការគណនាដេរីវេ។
import { akvaRezulto, cxuAkvo } from "./akvo.js";
import { sceno3d, kradaGrupo3D, kradaStaciaGrupo3D, vojaGrupo3D, YTROIGO } from "./vido3d.js";
import type { KradaPlano } from "../../../kantaoj/mondo/krado/tipoj.js";
import type { SkulptaUrbo, SkulptaVojo, SkulptaPlatformo } from "../../../kantaoj/mondo/urbo/tipoj.js";
import type { VojaPunkto } from "../../../eskekoj/medio/voj-reto.js";
import type { VojDifino } from "../../../eskekoj/medio/vojoj/tipoj.js";
import type { HxeuxfaLoko } from "../../../eskekoj/konstruajxoj/hxeuxfa/tipoj.js";
import type { KeuxfhxesoLoko } from "../../../eskekoj/mebloj/keuxfhxeso.js";

// ⟪ សំណង់ដែលបានតាមដាន 📃 ⟫ គឺ konstruiSatalon បន្ថែមក្រុម ( និង
// ច្បាប់ចម្លងកញ្ចក់ ) ផ្ទាល់ទៅឆាក ដូច្នេះវត្ថុត្រូវបានតាមដាននៅទីនេះ
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
   វត្ថុរបស់ពួកវា។
    @param grupo ( THREE.Object3D ) - ក្រុមដែលត្រូវធ្វើឱ្យទទេ។ */
function malplenigiGrupon(grupo: THREE.Object3D): void {
  while ( grupo.children.length ) {
    const m = grupo.children.pop() as THREE.Mesh;
    if ( m.geometry ) m.geometry.dispose();
    if ( m.material ) {
      const matoj = Array.isArray(m.material) ? m.material : [ m.material ];
      for ( const mat of matoj ) mat.dispose();
    }
  }
}

// ⟪ ការភ្ជាប់ជាមួយកម្មវិធីកែសម្រួល 📃 ⟫ គឺការយោងរបស់ឯកសារមេ ដែលភ្ជាប់
// តែម្តងដោយ agordiKradon3D។ ស្ថានភាពសំណាញ់ ( ទីក្រុង ផ្លូវ កំពង់
// អុហ្វសិត ផ្ទាំងកំពុងប្រើ ) ផ្លាស់ប្តូរពេលប្រើ ដូច្នេះវាត្រូវបានអានដោយ
// អនុគមន៍។
// ⟨ ការយោងរបស់ឯកសារមេ 📃 ⟩ គឺអនុគមន៍ស្ថិតិ និង
// អ្នកអានស្ថានភាពសំណាញ់។
interface Krada3DLigo {
  deltoInterp: ( x: number, z: number ) => number;
  pontoDuonLargho: ( v: SkulptaVojo ) => number;
  kradoPlano: () => KradaPlano;
  dioritaMaterialo: () => THREE.MeshStandardMaterial;
  vojojAktiva: () => boolean;
  ORA_MATERIALO: THREE.MeshStandardMaterial;
  urboj: () => SkulptaUrbo[];
  elektitaUrbo: () => number;
  vojoj: () => SkulptaVojo[];
  dokoj: () => SkulptaPlatformo[];
  kradoOfsX: () => number;
  kradoOfsZ: () => number;
  aktivaTabo: () => string;
}
let deltoInterp: ( x: number, z: number ) => number;
let pontoDuonLargho: ( v: SkulptaVojo ) => number;
let kradoPlano: () => KradaPlano;
let dioritaMaterialo: () => THREE.MeshStandardMaterial;
let vojojAktiva: () => boolean;
let ORA_MATERIALO: THREE.MeshStandardMaterial;
let urboj: () => SkulptaUrbo[];
let elektitaUrbo: () => number;
let vojoj: () => SkulptaVojo[];
let dokoj: () => SkulptaPlatformo[];
let kradoOfsX: () => number;
let kradoOfsZ: () => number;
let aktivaTabo: () => string;

/* ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param k ( Krada3DLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiKradon3D(k: Krada3DLigo): void {
  deltoInterp = k.deltoInterp; pontoDuonLargho = k.pontoDuonLargho;
  kradoPlano = k.kradoPlano; dioritaMaterialo = k.dioritaMaterialo;
  vojojAktiva = k.vojojAktiva; ORA_MATERIALO = k.ORA_MATERIALO;
  urboj = k.urboj; elektitaUrbo = k.elektitaUrbo;
  vojoj = k.vojoj; dokoj = k.dokoj;
  kradoOfsX = k.kradoOfsX; kradoOfsZ = k.kradoOfsZ;
  aktivaTabo = k.aktivaTabo;
}

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

// rekonstruiVojojn3D គឺផ្លូវកម្រិតពិភពលោកជារូបរាង 3D ពិតនៅក្នុង
// ទិដ្ឋភាព 3D គឺផ្លូវដែលធ្វើពីឌីអូរីត និងអង់ដេស៊ីតដូចហ្គេម ( konstruiVojojn
// ពី eskekoj/medio/vojoj.ts ) ដែលដើរតាមដី ( ជាមួយការបំផ្លើសបញ្ឈរ
// ដូចសំណាញ់ដី )។ មើលឃើញតែពេលផ្ទាំងរង ផ្លូវ កំពុង
// សកម្ម ( vojojAktiva ព្រោះ sxaltiIlTabon និង sxaltiSubTabojn គ្រប់គ្រង
// ភាពមើលឃើញ )។ សាងសង់ឡើងវិញរាល់ការផ្លាស់ប្តូរផ្លូវ ( gxisdatigiVojajnRegilojn )
// ប៉ុន្តែមិនមែនពេលអូសទេ ព្រោះផែនទី 2D បង្ហាញការអូសផ្ទាល់ រីឯ 3D ធ្វើឱ្យស្រស់
// នៅចុងបញ្ចប់នៃការអូស។
export function rekonstruiVojojn3D(): void {
  if ( !vojaGrupo3D ) return;
  malplenigiGrupon(vojaGrupo3D);
  // ⟨ និយមន័យមួយក្នុងមួយផ្លូវ 📃 ⟩ ពីមុន ចម្រៀកនីមួយៗក្លាយជានិយមន័យដោយឡែក ដូច្នេះ
  // វេនមិនបានបង្គត់ ( ធ្នូត្រូវការបន្ទាត់ពហុកោណទាំងមូល ) ហើយការត្បាញ
  // ថ្មចាប់ផ្តើមឡើងវិញនៅចម្រៀកនីមួយៗ។ ហ្គេមប្រើបន្ទាត់ពហុកោណទាំងមូល ដូច្នេះឥឡូវនេះ
  // ការមើលជាមុននេះក៏ដូចគ្នាដែរ។
  const alteco = ( x: number, z: number ): number => ( bazaAlteco(x, z) + deltoInterp(x, z) ) * YTROIGO;
  const vojaSupro = ( p: VojaPunkto, v: SkulptaVojo ): number => {
    const duono = pontoDuonLargho(v);
    let maks = alteco(p[0], p[1]);
    for ( let i = 0; i < 0o10; i++ ) {
      const ang = i * Math.PI / 0o4;
      maks = Math.max(maks, alteco(p[0] + Math.cos(ang) * duono, p[1] + Math.sin(ang) * duono));
    }
    return maks + VOJA_SUPRO_LEVIGXO;
  };
  const difinoj: VojDifino[] = [];
  for ( const v of vojoj() ) {
    if ( !v.punktoj || v.punktoj.length < 2 ) continue;
    const difino: VojDifino = { pts: v.punktoj.map(p => [ p[0], p[1] ] as VojaPunkto),
      w: ( v.larĝo || 0o7/0o2 ) / 2, kapoj: true };
    const ponto = pontoVojo(v);
    if ( ponto ) {
      const ay = vojaSupro(ponto.a, v);
      const by = vojaSupro(ponto.b, v);
      const dx = ponto.b[0] - ponto.a[0], dz = ponto.b[1] - ponto.a[1];
      const kvadrato = dx * dx + dz * dz;
      difino.heightFn = ( x: number, z: number ) => {
        const t = Math.max(0, Math.min(1, ( ( x - ponto.a[0] ) * dx + ( z - ponto.a[1] ) * dz ) / kvadrato));
        return ay + ( by - ay ) * t - VOJA_SUPRO_LEVIGXO;
      };
    }
    difinoj.push(difino);
  }
  if ( !difinoj.length ) return;
  const vojaListo = difinoj.map(d => ( { punktoj: d.pts, larĝo: 2 * d.w } ));
  const kunigoj = troviVojaRetajnKunigojn(vojaListo, dokoj());
  const protektoj: VojaPunkto[] = kunigoj.map(k => [ k.x, k.z ]);
  const diorito = kreiDioritanMaterialon();
  const andezito = kreiAndezitanMaterialon();
  konstruiVojojn(kielSceno(vojaGrupo3D), difinoj, alteco, diorito, andezito, protektoj);
  const fermitaj = new Map<string, [ number, number ]>(kunigoj.map(k => [ k.x + "," + k.z, k.fermitaj ]));
  const rotacioj = new Map<string, number>(kunigoj.map(k => [ k.x + "," + k.z, k.rotacio ]));
  konstruiIntersekcajnPlatojn(kielSceno(vojaGrupo3D), protektoj, alteco, diorito, andezito, fermitaj, rotacioj);
  vojaGrupo3D.visible = vojojAktiva();
}

// rekonstruiKradon3D គឺការតំរង់សំណាញ់បច្ចុប្បន្នជារូបរាង 3D ពិតនៅក្នុង
// ទិដ្ឋភាព 3D។ អគារទាំងនោះជាអគារពិតរបស់ហ្គេម ( ដូច
// konstruiSatalon ក្នុង urbo.ts គឺសំណាញ់ វត្ថុ ទ្វារ និង
// កញ្ចក់ពេជ្រពិត ) ហើយផ្លូវជាឆ្នូតសំប៉ែតស្តើងលើដីនៅ
// អុហ្វសិតនោះ។ konstruiSatalon បន្ថែមក្រុម ( និងច្បាប់ចម្លងកញ្ចក់ )
// ផ្ទាល់ទៅឆាក ដូច្នេះវត្ថុត្រូវបានតាមដានក្នុង krada3DKonstruajxoj
// សម្រាប់ការលុបពេលសាងសង់ឡើងវិញ និងភាពមើលឃើញពេលប្តូរផ្ទាំង។
export function rekonstruiKradon3D(): void {
  if ( !kradaGrupo3D || !sceno3d ) return;
  // លុបអគារចាស់ ( ក្រុម និងកញ្ចក់ ដែលនៅផ្ទាល់ក្នុង
  // ឆាក ) និងផ្លូវចេញពីក្រុម។
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
  if ( kradaStaciaGrupo3D ) malplenigiGrupon(kradaStaciaGrupo3D);
  const plano = kradoPlano();
  const grundo = ( x: number, z: number ) => bazaAlteco(x, z) + deltoInterp(x, z);
  const vojaMaterialo = new THREE.MeshStandardMaterial({ color: 0xd8e0e8, roughness: 0.9 });
  const vojaAlto = 0o1/0o10 * 2;   // 0.25 ។ កម្ពស់ផ្ទៃផ្លូវស្ថានីយ
  for ( const v of plano.vojoj ) {
    // ផ្លូវស្ថានីយ ( ផ្នែកបន្ថែមនៃផ្លូវកម្រិតពិភពលោក ) ជាកម្មសិទ្ធិ
    // របស់ក្រុមដោយឡែក ដូច្នេះពួកវាបង្ហាញជាមួយសំណាញ់ ប៉ុន្តែលាក់ខ្លួនពេល
    // ផ្ទាំងរង ផ្លូវ កំពុងបង្ហាញ ( ផ្លូវពិតរបស់ពិភពលោកបង្ហាញនៅទីនោះ ហើយផ្លូវស្ថានីយ
    // នឹងធ្វើឱ្យផ្លូវដូចគ្នាទ្វេដង )។
    const grupo = v.stacia && kradaStaciaGrupo3D ? kradaStaciaGrupo3D : kradaGrupo3D;
    const longo = Math.abs(v.al - v.de);
    const mezo = ( v.de + v.al ) / 2;
    const x = v.orient === "EW" ? mezo : v.poz;
    const z = v.orient === "EW" ? v.poz : mezo;
    const geo = new THREE.BoxGeometry(v.orient === "EW" ? longo : 0o7/0o2, vojaAlto, v.orient === "EW" ? 0o7/0o2 : longo);
    const mesho = new THREE.Mesh(geo, vojaMaterialo);
    mesho.position.set(kradoOfsX() + x, grundo(kradoOfsX() + x, kradoOfsZ() + z) + vojaAlto / 2, kradoOfsZ() + z);
    grupo.add(mesho);
  }
  // អគារ គឺសាតាល់ពិតរបស់ហ្គេម ( ប្រភេទដូចក្នុង
  // urbo.ts គឺក្រឡាស្ថានីយរថភ្លើង ( មួយ ) និងមជ្ឈមណ្ឌលប្លុកបួនជា
  // យានអវកាស រីឯអ្វីផ្សេងទៀតតាមប្រភេទក្រឡា )។
  const selektajxoj: THREE.Mesh[] = [];
  for ( let i = 0; i < plano.konstruaĵoj.length; i++ ) {
    const b = plano.konstruaĵoj[i];
    // ស្ថានីយដែលគូរដោយដៃ ( និងស្វ័យប្រវត្តិ ) សាងសង់ជាយានអវកាស។
    const tipo = ( b.stacia || b.tipo === "stacio" ) ? "stacioxipo" : b.tipo;
    const wx = kradoOfsX() + b.x, wz = kradoOfsZ() + b.z;
    const niveloj = tipo === "stacioxipo" ? 3 : tipo === "turo" ? 0o10 : 4;
    const spec = {
      x: wx, z: wz, type: tipo, name: "krado" + i,
      niveloj, w: 0o10, d: 0o10,
      tieroAlto: tipo === "stacioxipo" ? 0o155/0o40 : tipo === "turo" ? 0o30/0o10 : tipo === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
      rot: b.rot, diamond: true,
      h0: grundo(wx, wz),
      sube: tipo === "stacioxipo" ? 0 : niveloj,
      tieroAltoSub: 0o123/0o40,
    };
    const antaŭ = sceno3d.children.length;
    konstruiSatalon(spec, sceno3d, selektajxoj);
    // konstruiSatalon បន្ថែមក្រុម ច្បាប់ចម្លងកញ្ចក់ និងចិញ្ចៀន
    // មាសផ្ទាល់ទៅឆាក ដូច្នេះតាមដានទាំងបីសម្រាប់ការលុប និងភាពមើលឃើញ។
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // ខេអ៊ូហ្វហេសូ គឺរចនាសម្ព័ន្ធកំពូលប្រាំមួយទាំងបួនជុំវិញចំណុចកណ្តាល ( ធរណីមាត្រ
  // ដូចហ្គេម គឺ R=10 មួយនៅក្រៅគ្រប់កំពូលនៃ
  // ប្រាសាទកណ្តាល នៅស្មើគុណនៃ 45 ដឺក្រេ )។ បង្ហាញតែពេលទីក្រុងដែលកំពុងកែ
  // មានពួកវា។ ក្រុមត្រូវបានបន្ថែមផ្ទាល់ទៅឆាក ហើយបានតាមដានក្នុង
  // krada3DKonstruajxoj សម្រាប់ការលុប និងភាពមើលឃើញ។
  if ( urboj()[elektitaUrbo()] && urboj()[elektitaUrbo()].keuxfhxeso ) {
    const KEUXFHXESO_R = 0o10;
    const lokoj: KeuxfhxesoLoko[] = [];
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      lokoj.push({ x: kradoOfsX() + Math.cos(a) * KEUXFHXESO_R, z: kradoOfsZ() + Math.sin(a) * KEUXFHXESO_R, rot: a });
    }
    const antaŭ = sceno3d.children.length;
    konstruiKeuxfhxeso(sceno3d, lokoj, grundo, ORA_MATERIALO);
    krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
  }
  // ចង្កៀងផ្លូវរបស់សំណាញ់ គឺគំរូបួនចង្កៀងជុំវិញថ្នាំងផ្សារ និង
  // ផ្លូវប្រសព្វ ( ធរណីមាត្រដូចហ្គេម ពីផែនការ )។ សំណាញ់ចង្កៀងពិត
  // របស់ហ្គេម ( konstruiHxeuxfojn គឺសសរ ចាន អណ្តាតភ្លើង )
  // ជាមួយវត្ថុឌីអូរីត និងមាសរួម។ អណ្តាតភ្លើងមិនមានចលនានៅទីនេះទេ ( ហ្គេម
  // ធ្វើដោយ animaciiFlammojn ) ដូច្នេះចំណុចផ្កាភ្លើងនៅ
  // ស្ងាត់ ប៉ុន្តែមើលឃើញ។
  if ( urboj()[elektitaUrbo()] && urboj()[elektitaUrbo()].lampoj !== false ) {
    const spots: HxeuxfaLoko[] = kradoPlano().lampoj.map(l => ( { x: kradoOfsX() + l.x, z: kradoOfsZ() + l.z, y: grundo(kradoOfsX() + l.x, kradoOfsZ() + l.z), rotacio: Math.PI / 4 } ));
    if ( spots.length ) {
      const antaŭ = sceno3d.children.length;
      konstruiHxeuxfojn(sceno3d, spots, dioritaMaterialo(), ORA_MATERIALO);
      krada3DKonstruajxoj.push(...sceno3d.children.slice(antaŭ));
    }
  }
  krada3DKonstruajxoj.forEach(o => { o.visible = aktivaTabo() === "krado"; });
  if ( kradaStaciaGrupo3D ) kradaStaciaGrupo3D.visible = aktivaTabo() === "krado" && !vojojAktiva();
}
