// ≺⧼ ſ͕ɭɜ ı],ᴜ 🏙️ ⧽≻
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
import * as THREE from "three";
import { vepaqSatalon } from "../../../eskekoj/hapaq/satalaj-hapaq.js";
import { TIPAJ_NIVELOJ } from "../../../eskekoj/hapaq/satalaj/hahunaq.js";
import { vepaqHxeuxfojn } from "../../../eskekoj/hapaq/hxeuxfa/lampoj.js";
import { vepaqKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../../../eskekoj/komunajxoj/materialoj.js";
import { vepaqHak6h6n } from "../../../eskekoj/medio/hak6h6.js";
import { VOJA_AKVA_KLARANCO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO,
  VOJA_TRUA_DUONO, surGrid } from "../../../eskekoj/medio/hak6h6/havecax2l.js";
import { k6h6Supro as k6h6SuproBaza } from "../../../eskekoj/medio/hak6h6/haqoxa.js";
import { vepaqIntersekcajnHapa12n } from "../../../eskekoj/medio/hak6h6/hapa12.js";
import { troviK6h6RetajnHaveb6kekn } from "../../../eskekoj/medio/voj-reto.js";
import { vepaqQakaj2n } from "../../../eskekoj/medio/qakaj2.js";
import { gluiK6h6Finon } from "../../../eskekoj/medio/hak6h6/gluado.js";
import { kf2DokanStuparon } from "../../../eskekoj/medio/qakaj2/stuparo.js";
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
import { akvaRezulto, akvaVem2En, tsekeAkvo, teraAlto } from "./akvo.js";
import { sceno3d, kradaGrupo3D, k6h6Grupo3D, YTROIGO } from "./vido3d.js";
import { tsekeVidebla } from "./videco.js";
import type { KradaPlano } from "../../../kantaoj/mondo/krado/hahunaq.js";
import type { SkulptaKaxte, SkulptaK6h6, SkulptaPlatqoxa } from "../../../kantaoj/mondo/kaxte/hahunaq.js";
import type { K6h6Punkto } from "../../../eskekoj/medio/voj-reto.js";
import type { VojDifino } from "../../../eskekoj/medio/hak6h6/hahunaq.js";
import type { HxeuxfaLoko } from "../../../eskekoj/hapaq/hxeuxfa/hahunaq.js";
import type { KeuxfhxesoRaqa } from "../../../eskekoj/mebloj/keuxfhxeso.js";

// ⟪ ſɭᴜ ſןᴜ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export let krada3DPaqj: THREE.Object3D[] = [];

/* ſɭᴜ ſןᴜ , ꞙɭэ ,
   ObjectцD។ ឧបករណ៍ជំនួយបង្ហាញការបំប្លែងនៅកន្លែងតែមួយ។
    @param g ( THREE.Object3D ) - ធុង។
@returns ធុងដូចគ្នាជាឆាក ( THREE.Scene )។ */
function kielSceno(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

/* ſɭᴜ ſןᴜ , ꞙɭɩ ,
   វត្ថុរបស់ពួកវា ។ កំពង់ ( និងជណ្តើរ ) ជាក្រុមកូន ដូច្នេះការដើរឆ្លង
   ត្រូវចុះដល់ក្រោម បើមិនដូច្នេះធរណីមាត្រនៅសល់ក្នុងអង្គចងចាំ ។
    @param hate ( THREE.Object3D ) - ក្រុមដែលត្រូវធ្វើឱ្យទទេ។ */
function malplenigiGrupon(hate: THREE.Object3D): void {
  while ( hate.children.length ) {
    const m = hate.children.pop() as THREE.Object3D;
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

// ⟪ ſɭэ ᶗ‹ , ꞙɭэ , 📃 ⟫ , ſɭэ ᶗ‹ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭэ ᶗ‹ , ꞙɭı ,
// ⟨ ſɭэ ᶗ‹ , 📃 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
interface Krada3DLigo {
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
  vidotajKradoj: () => { vecax2lani: number; plano: KradaPlano; ofsX: number; ofsZ: number }[];
  dioritaMaterialo: () => THREE.MeshStandardMaterial;
  ORA_MATERIALO: THREE.MeshStandardMaterial;
  hakaxte: () => SkulptaKaxte[];
  hak6h6: () => SkulptaK6h6[];
  haqakaj2: () => SkulptaPlatqoxa[];
}
let vidotajKradoj: () => { vecax2lani: number; plano: KradaPlano; ofsX: number; ofsZ: number }[]
  = () => [];
let dioritaMaterialo: () => THREE.MeshStandardMaterial;
let ORA_MATERIALO: THREE.MeshStandardMaterial;
let hakaxte: () => SkulptaKaxte[];
let hak6h6: () => SkulptaK6h6[];
let haqakaj2: () => SkulptaPlatqoxa[];

/* ſɭэ ᶗ‹ , ꞙɭɩ ,
    @param k ( Krada3DLigo ) - ការយោងរបស់ឯកសារមេ។ */
export function agordiKradon3D(k: Krada3DLigo): void {
  dioritaMaterialo = k.dioritaMaterialo;
  vidotajKradoj = k.vidotajKradoj;
  ORA_MATERIALO = k.ORA_MATERIALO;
  hakaxte = k.hakaxte;
  hak6h6 = k.hak6h6; haqakaj2 = k.haqakaj2;
}

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫ , ſɭᴜ ſןᴜ ,
// ( ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
/* ſɭᴜ ſןᴜ , ꞙɭэ ,
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្ពស់ ( number )។ */
function grundo3D(x: number, z: number): number {
  return teraAlto(x, z) * YTROIGO;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្រិត ឬ -Infinity ( number )។ */
function akvaVem23D(x: number, z: number): number {
  const vem2 = akvaVem2En(x, z);
  return vem2 === null ? -Infinity : vem2 * YTROIGO;
}
/* ſᶘᴜ j͑ʃᴜ , ꞙɭꞟ ,
    @param x ( number ) - ពិភពលោក x ។
    @param z ( number ) - ពិភពលោក z ។
@returns កម្រិត ឬ -Infinity ( number )។ */
function akvaFino3D(x: number, z: number): number {
  const vem2 = akvaVem23D(x, z);
  return vem2 === -Infinity ? -Infinity : vem2 + VOJA_AKVA_KLARANCO * YTROIGO;
}

// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
const KUNIGA_KLINO = 0o1/0o4;
const KUNIGA_RADIUSO = Math.hypot(VOJA_TRUA_DUONO, VOJA_EKSTERA_DUONO);
const KUNIGA_CELO = 0o20;

// ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭэ ,
// ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɩ ,
function pontoK6h6(v: SkulptaK6h6): { a: K6h6Punkto; b: K6h6Punkto } | null {
  if ( !akvaRezulto || v.n2k.length < 2 ) return null;
  const a = v.n2k[0], b = v.n2k[v.n2k.length - 1];
  const akvas = tsekeAkvo;
  if ( akvas(a[0], a[1]) || akvas(b[0], b[1]) ) return null;
  const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if ( sahakani < 0o10 ) return null;
  const specimenoj = Math.max(0o10, Math.round(sahakani));
  let akvaj = 0;
  for ( let i = 0; i <= specimenoj; i++ ) {
    const t = i / specimenoj;
    if ( akvas(a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t) ) akvaj++;
  }
  if ( akvaj / ( specimenoj + 1 ) < 0o2/0o5 ) return null;
  return { a, b };
}

// ſɭэ ֭ſɭэ , ꞙɭꞟ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function vepaqTom6Hak6h6n3D(): void {
  if ( !k6h6Grupo3D ) return;
  malplenigiGrupon(k6h6Grupo3D);
  const alteco = ( x: number, z: number ): number => grundo3D(x, z);
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
  const k6h6Supro = ( x: number, z: number, sefini: number ): number =>
    k6h6SuproBaza(x, z, sefini, alteco);
// ⟪ ſɭэ ֭ſɭэ , 📃 ⟫ , ſɭэ ֭ſɭэ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц ,
  const difinoj: VojDifino[] = [];
  for ( const v of hak6h6() ) {
    if ( !v.n2k || v.n2k.length < 2 ) continue;
    const sefini = v.sefini || 0o7/0o2;
    const difino: VojDifino = { pts: v.n2k.map(p => [ p[0], p[1] ] as K6h6Punkto),
      w: sefini / 2, hateruni: true };
    const ponto = pontoK6h6(v);
    if ( ponto ) {
      const ay = k6h6Supro(ponto.a[0], ponto.a[1], sefini);
      const by = k6h6Supro(ponto.b[0], ponto.b[1], sefini);
      const dx = ponto.b[0] - ponto.a[0], dz = ponto.b[1] - ponto.a[1];
      const kvadrato = dx * dx + dz * dz || 1;
      difino.heightFn = ( x: number, z: number ) => {
        const t = Math.max(0, Math.min(1, ( ( x - ponto.a[0] ) * dx + ( z - ponto.a[1] ) * dz ) / kvadrato));
        return ay + ( by - ay ) * t - VOJA_SUPRO_LEVIGXO;
      };
    }
    difinoj.push(difino);
  }
// ⟨ ſɭэ ֭ſɭэ , ꞙɭэ , 📃 ⟩
  const mondoNombro = difinoj.length;
// ⟪ ſɭэ ֭ſɭэ , 🏙️ ⟫ , ſɭэ ֭ſɭэ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц ,
  const KRADA_VOJA_SEFINI = 0o16/0o10;
  for ( const krado of vidotajKradoj() ) {
    const ofsX = krado.ofsX, ofsZ = krado.ofsZ;
    for ( const r of krado.plano.hak6h6 ) {
      if ( r.stacia ) continue;
      const pts: K6h6Punkto[] = r.orient === "EW"
        ? [ [ ofsX + r.de, ofsZ + r.haxekuxa ], [ ofsX + r.al, ofsZ + r.haxekuxa ] ]
        : [ [ ofsX + r.haxekuxa, ofsZ + r.de ], [ ofsX + r.haxekuxa, ofsZ + r.al ] ];
      difinoj.push({ pts, w: KRADA_VOJA_SEFINI, hateruni: false });
    }
    for ( const s of krado.plano.spronoj ) {
      difinoj.push({ pts: [ [ ofsX + s.de[0], ofsZ + s.de[1] ],
        [ ofsX + s.al[0], ofsZ + s.al[1] ] ], w: KRADA_VOJA_SEFINI, hateruni: false });
    }
  }
// ⟪ ſɭэ ֭ſɭэ , 🧲 ⟫ , ſɭэ ֭ſɭэ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭэ ֭ſɭэ , ꞙɭц ,
  const qakaj2Landaj: { x: number; z: number }[] = haqakaj2().map(d => {
    const rotacio = d.rotacio ?? 0;
    return { x: d.x + Math.sin(rotacio) * ( d.profundo / 2 ),
      z: d.z + Math.cos(rotacio) * ( d.profundo / 2 ) };
  });
  if ( mondoNombro > 0 ) {
    const ne3ak2 = troviK6h6RetajnHaveb6kekn(
      difinoj.map(d => ( { n2k: d.pts, sefini: 2 * d.w } )), haqakaj2());
    const gluaCeloj: K6h6Punkto[] = ne3ak2.map(k => [ k.x, k.z ] as K6h6Punkto);
    for ( let i = 0; i < mondoNombro; i++ ) {
      const aliaj = difinoj.filter(( _, j ) => j !== i).map(d => d.pts);
      difinoj[i] = { ...difinoj[i],
        pts: gluiK6h6Finon(difinoj[i].pts, gluaCeloj, qakaj2Landaj, aliaj) };
    }
  }
// ⟪ ſɭᴜ ſןᴜ , 📏 ⟫ , ſɭᴜ ſןᴜ ,
// ( ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  const k6h6Listo = difinoj.map(d => ( { n2k: d.pts, sefini: 2 * d.w } ));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(k6h6Listo, haqakaj2());
  const hatsiq = new Map<string, { x: number; z: number; l6da: number }[]>();
  for ( const k of haveb6kek ) {
    const l6da = surGrid(k6h6Supro(k.x, k.z, 2 * VOJA_EKSTERA_DUONO)) - VOJA_SUPRO_LEVIGXO;
    const ca3aq = Math.floor(k.x / KUNIGA_CELO) + "," + Math.floor(k.z / KUNIGA_CELO);
    const ca1ara = hatsiq.get(ca3aq) ?? [];
    ca1ara.push({ x: k.x, z: k.z, l6da });
    hatsiq.set(ca3aq, ca1ara);
  }
  const harmoniigita = ( x: number, z: number ): number => {
    let l6da = alteco(x, z);
    const cx = Math.floor(x / KUNIGA_CELO), cz = Math.floor(z / KUNIGA_CELO);
    for ( let dx = -0o1; dx <= 0o1; dx++ ) {
      for ( let dz = -0o1; dz <= 0o1; dz++ ) {
        const ca1ara = hatsiq.get(( cx + dx ) + "," + ( cz + dz ));
        if ( !ca1ara ) continue;
        for ( const tsiq of ca1ara ) {
          const h6kuni = Math.hypot(x - tsiq.x, z - tsiq.z);
          if ( h6kuni > KUNIGA_RADIUSO + 0o10 ) continue;
          l6da = Math.max(l6da, tsiq.l6da
            - KUNIGA_KLINO * Math.max(0, h6kuni - KUNIGA_RADIUSO));
        }
      }
    }
    return l6da;
  };
// ⟪ ſןɔ˞ᴜƴ , ⚓ ⟫ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭɿ ,
// ſןɔ˞ᴜƴ , ꞙɭц ,
// ſןɔ˞ᴜƴ , ꞙɭэ ,
  for ( let i = 0; i < haqakaj2().length; i++ ) {
    const d = haqakaj2()[i];
    const rotacio = d.rotacio ?? 0;
    const qakaj2 = vepaqQakaj2n(kielSceno(k6h6Grupo3D), d.x, d.z, rotacio,
      harmoniigita, akvaVem23D, d.profundo, alteco);
    if ( qakaj2.stuparajPunktoj.length < 2 ) continue;
    const sin = Math.sin(rotacio), kos = Math.cos(rotacio);
    const landaX = d.x + sin * ( d.profundo / 2 ), landaZ = d.z + kos * ( d.profundo / 2 );
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩
    const saxeni = Math.max(surGrid(k6h6Supro(landaX, landaZ, qakaj2.platformWidth)),
      qakaj2.platformY);
    const stuparo = kf2DokanStuparon(qakaj2.stuparajPunktoj[0], qakaj2.stuparajPunktoj[1],
      saxeni, qakaj2.landejaY);
    if ( !stuparo ) continue;
    difinoj.push({ pts: stuparo.n2k, w: qakaj2.platformWidth, stuparo: true, hateruni: false,
      heightFn: stuparo.l6da, grundoFn: alteco });
  }
  if ( !difinoj.length ) return;
  const protektoj: K6h6Punkto[] = haveb6kek.map(k => [ k.x, k.z ]);
  const t6g6 = kf2T6g6Pukek();
  const t6hna = kf2T6hnaPukek();
  vepaqHak6h6n(kielSceno(k6h6Grupo3D), difinoj, harmoniigita, t6g6, t6hna, protektoj,
    { akvaFn: akvaFino3D });
  const fermitaj = new Map<string, [ number, number ]>(haveb6kek.map(k => [ k.x + "," + k.z, k.fermitaj ]));
  const rotacioj = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.rotacio ]));
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭı ,
  const hac2w2q = new Map<string, [ number, number ][]>(
    haveb6kek.map(k => [ k.x + "," + k.z, k.direktaj ]));
  vepaqIntersekcajnHapa12n(kielSceno(k6h6Grupo3D), protektoj, harmoniigita, t6g6, t6hna,
    fermitaj, rotacioj, hac2w2q, alteco);
  k6h6Grupo3D.visible = tsekeVidebla("hak6h6");
}

// ⟪ ſɭᴜ ſןᴜ , 📐 ⟫ , ſɭᴜ ſןᴜ ,
// ( ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
/* ſɭᴜ ſןᴜ , ꞙɭц ,
    @param hunaq ( string ) - ប្រភេទអគារ ( រួមទាំង stacioxipo ) ។
    @param sx, sz ( number ) - ទីតាំងក្នុងពិភពលោក ។
    @param rot ( number ) - ការបង្វិល ។
    @param ksaka ( string ) - ឈ្មោះខាងក្នុង ។
@returns spec ( VepaqSpec ) ដែលឧបករណ៍សាងសង់ទទួល */
function kradaPudal(hunaq: string, sx: number, sz: number, rot: number, ksaka: string) {
  const estasStacio = hunaq === "stacioxipo";
  const havem2 = estasStacio ? TIPAJ_NIVELOJ.stacioxipo
    : hunaq === "sanktejo" ? 7 : hunaq === "turo" ? 0o10 : 4;
  const tieroAlto = estasStacio ? 0o155/0o40
    : hunaq === "sanktejo" ? 0o30/0o10
    : hunaq === "turo" ? 0o30/0o10
    : hunaq === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
  return {
    x: sx, z: sz, type: hunaq, name: ksaka, havem2, w: 0o10, d: 0o10, tieroAlto,
    rot, diamond: true,
    h0: grundo3D(sx, sz),
    sube: estasStacio ? 0 : havem2,
    tieroAltoSub: 0o123/0o40,
  };
}

// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
export function vepaqTom6Kradon3D(): void {
  if ( !kradaGrupo3D || !sceno3d ) return;
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  for ( const o of krada3DPaqj ) {
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
  krada3DPaqj = [];
  malplenigiGrupon(kradaGrupo3D);
// ⟪ ſɭᴜ ſןᴜ , 🏙️ ⟫ , ſɭᴜ ſןᴜ , 👁️ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
  for ( const krado of vidotajKradoj() ) {
    const plano = krado.plano;
    const ofsX = krado.ofsX, ofsZ = krado.ofsZ;
    const kaxte = hakaxte()[krado.vecax2lani];
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    const selektajxoj: THREE.Mesh[] = [];
    for ( let i = 0; i < plano.paqj.length; i++ ) {
      const b = plano.paqj[i];
// ſɭᴜ ſןᴜ , ꞙɭı ,
      const hunaq = ( b.stacia || b.hunaq === "stacio" ) ? "stacioxipo" : b.hunaq;
      const wx = ofsX + b.x, wz = ofsZ + b.z;
      const ne3ak2 = sceno3d.children.length;
      vepaqSatalon(kradaPudal(hunaq, wx, wz, b.rot, "krado" + krado.vecax2lani + "_" + i),
        sceno3d, selektajxoj, grundo3D);
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
      krada3DPaqj.push(...sceno3d.children.slice(ne3ak2));
    }
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    if ( kaxte && kaxte.keuxfhxeso ) {
      const keuxfhxesoKa5ik = 0o10;
      const raqa: KeuxfhxesoRaqa[] = [];
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        raqa.push({ x: ofsX + Math.cos(a) * keuxfhxesoKa5ik, z: ofsZ + Math.sin(a) * keuxfhxesoKa5ik, s2sabo: a });
      }
      const ne3ak2 = sceno3d.children.length;
      vepaqKeuxfhxeso(sceno3d, raqa, grundo3D, ORA_MATERIALO);
      krada3DPaqj.push(...sceno3d.children.slice(ne3ak2));
    }
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    if ( kaxte && kaxte.lampoj !== false ) {
      const spots: HxeuxfaLoko[] = plano.lampoj.map(l => ( {
        x: ofsX + l.x, z: ofsZ + l.z, y: grundo3D(ofsX + l.x, ofsZ + l.z),
        rotacio: Math.PI / 4 } ));
      if ( spots.length ) {
        const ne3ak2 = sceno3d.children.length;
        vepaqHxeuxfojn(sceno3d, spots, dioritaMaterialo(), ORA_MATERIALO);
        krada3DPaqj.push(...sceno3d.children.slice(ne3ak2));
      }
    }
  }
  const videbla = tsekeVidebla("krado");
  krada3DPaqj.forEach(o => { o.visible = videbla; });
}
