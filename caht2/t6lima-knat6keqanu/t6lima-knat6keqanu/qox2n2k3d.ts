// ≺⧼ ſ͕ɭɜ ı],ᴜ 🏙️ ⧽≻
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
import * as THREE from "three";
import { vepaqSatalon } from "../../../skek2/hapaq/satalaj-hapaq.js";
import { TIPAJNIVELOJ } from "../../../skek2/hapaq/satalaj/hahunaq.js";
import { vepaqHxeuxfojn } from "../../../skek2/hapaq/hxeuxfa/hahufwuk2.js";
import { vepaqKekufxeso } from "../../../skek2/w2ta/kubes.js";
import { kf2T6g6Pukek, kf2T6hnaPukek } from "../../../skek2/x2x2q/pukek.js";
import { vepaqHak6h6n } from "../../../skek2/qatsiike/hak6h6.js";
import { K6H6AAKVAKLARANCO, K6H6AEKSTERAP2SOMANI, K6H6AKMARL6DA,
  K6H6ATRUAP2SOMANI, surGrid } from "../../../skek2/qatsiike/hak6h6/havecax2l.js";
import { k6h6Teru as k6h6TeruBaza } from "../../../skek2/qatsiike/hak6h6/haqoxa.js";
import { vepaqIntersekcajnHapa12n } from "../../../skek2/qatsiike/hak6h6/hapa12.js";
import { troviK6h6RetajnHaveb6kekn } from "../../../skek2/qatsiike/k6h6-caxlefkakai.js";
import { vepaqQakaj2n } from "../../../skek2/qatsiike/qakaj2.js";
import { gluiK6h6tlakakn } from "../../../skek2/qatsiike/hak6h6/scac6.js";
import { kf2Qakaj2nStuparon } from "../../../skek2/qatsiike/qakaj2/hatona.js";
// ꞙɭı ɭ(ꞇ ʌ ſᶘᴜ j͑ʃᴜ
import { tsasaTseuni, tsasaVem2En, tsekeTsasa, t6limaL6da } from "./tsasa.js";
import { kagani3d, qox2n2kGrupo3D, k6h6Grupo3D, YTROIGO } from "./vido3d.js";
import { tsekeVidebla } from "./kix2Ka5ik.js";
import type { KradaPlano } from "../../../kanta/nala/qox2n2k/hahunaq.js";
import type { Knat6keqanuKuba, Knat6keqanuK6h6N2k, Knat6keqanuTap2Qoxa } from "../../../kanta/nala/kaxte/hahunaq.js";
import type { K6h6N2k } from "../../../skek2/qatsiike/k6h6-caxlefkakai.js";
import type { Kas2kantaDitlakak } from "../../../skek2/qatsiike/hak6h6/hahunaq.js";
import type { HxeuxfaRaqa } from "../../../skek2/hapaq/hxeuxfa/hahunaq.js";
import type { KekufxesoRaqa } from "../../../skek2/w2ta/kubes.js";

// ⟪ ſɭᴜ ſןᴜ 📃 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
export let qox2n2k3DPaqj: THREE.Object3D[] = [];

/* ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
   Object3D ｡ ſɟᴜ ı],ɜ ｡ ſɟᴜᴜ̩ ɭʃɹ ｡
    @param g ( THREE.Object3D ) - ֭ſɭᴜ ɭʃɔ ｡
@returns ֭ſɭᴜ ɭʃɔ ｡ ſɭꞇ ı],ɹ ( THREE.Scene ) ｡ */
function kielKagani(g: THREE.Object3D): THREE.Scene {
  return g as THREE.Scene;
}

/* ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
   j͑ʃƽɔ ſɭɹ ｡ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ ｡ ֭ſɭᴜ ɭʃɔ ｡ ſןɔ˞ᴜƴ ｡
   ſɭɜ ſȷᴜ ｡ j͑ʃƽɔ ſɭɹ ｡ ſᶘɜ ŋᷠɹ ｡
    @param hate2 ( THREE.Object3D ) - ֭ſɭᴜ ɭʃɔ ｡ ſ͕ɭw }ʃɹ ｡ */
function malvetem2iHate(hate2: THREE.Object3D): void {
  while ( hate2.children.length ) {
    const m = hate2.children.pop() as THREE.Object3D;
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

// ⟪ ꞙɭэ ɭ(ꞇ ʌ ſɭэ ᶗ‹ 📃 ⟫
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭı ɭ(ꞇ ʌ ſɭэ ᶗ‹
// ⟨ ſɭэ ᶗ‹ 📃 ⟩
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
interface Krada3DLigo {
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
  vidotajHaqox2n2k: () => { vecax2lani: number; b6vakanta: KradaPlano; ofsX: number; ofsZ: number }[];
  dioritaPukek: () => THREE.MeshStandardMaterial;
  ORAPUKEK: THREE.MeshStandardMaterial;
  hakaxte: () => Knat6keqanuKuba[];
  hak6h6: () => Knat6keqanuK6h6N2k[];
  haqakaj2: () => Knat6keqanuTap2Qoxa[];
}
let vidotajHaqox2n2k: () => { vecax2lani: number; b6vakanta: KradaPlano; ofsX: number; ofsZ: number }[]
  = () => [];
let dioritaPukek: () => THREE.MeshStandardMaterial;
let ORAPUKEK: THREE.MeshStandardMaterial;
let hakaxte: () => Knat6keqanuKuba[];
let hak6h6: () => Knat6keqanuK6h6N2k[];
let haqakaj2: () => Knat6keqanuTap2Qoxa[];

/* ꞙɭɩ ɭ(ꞇ ʌ ſɭэ ᶗ‹
    @param k ( Krada3DLigo ) - j͑ʃᴜ j͐ʃɹ ｡ j͑ʃɜ ſןɹ ſɭɹ ſᶘɔ ｡ */
export function catsaraQox2n2kn3D(k: Krada3DLigo): void {
  dioritaPukek = k.dioritaPukek;
  vidotajHaqox2n2k = k.vidotajHaqox2n2k;
  ORAPUKEK = k.ORAPUKEK;
  hakaxte = k.hakaxte;
  hak6h6 = k.hak6h6; haqakaj2 = k.haqakaj2;
}

// ⟪ ſɭᴜ ſןᴜ 📏 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
/* ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns j͑ʃэ ɭ(ᴜ ( number ) ｡ */
function t6lima3D(x: number, z: number): number {
  return t6limaL6da(x, z) * YTROIGO;
}
/* ꞙɭɩ ɭ(ꞇ ʌ ſᶘᴜ j͑ʃᴜ
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns j͑ʃ'ɔ ŋᷠɹ ｡ -Infinity ( number ) ｡ */
function tsasaVem23D(x: number, z: number): number {
  const vem2 = tsasaVem2En(x, z);
  return vem2 === null ? -Infinity : vem2 * YTROIGO;
}
/* ꞙɭꞟ ɭ(ꞇ ʌ ſᶘᴜ j͑ʃᴜ
    @param x ( number ) - ʃᴜ j͐ʃɹ x ｡
    @param z ( number ) - ʃᴜ j͐ʃɹ z ｡
@returns j͑ʃ'ɔ ŋᷠɹ ｡ -Infinity ( number ) ｡ */
function tsasatlakak3D(x: number, z: number): number {
  const vem2 = tsasaVem23D(x, z);
  return vem2 === -Infinity ? -Infinity : vem2 + K6H6AAKVAKLARANCO * YTROIGO;
}

// ⟪ ſɭᴜ ſןᴜ 📏 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
const VEB6KEKAKLINO = 0o1/0o4;
const VEB6KEKARADIUSO = Math.hypot(K6H6ATRUAP2SOMANI, K6H6AEKSTERAP2SOMANI);
const VEB6KEKACELO = 0o20;

// ꞙɭэ ɭ(ꞇ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw
// ꞙɭɩ ɭ(ꞇ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw
function c2kanuK6h6(v: Knat6keqanuK6h6N2k): { a: K6h6N2k; b: K6h6N2k } | null {
  if ( !tsasaTseuni || v.n2k.length < 2 ) return null;
  const a = v.n2k[0], b = v.n2k[v.n2k.length - 1];
  const tsasa = tsekeTsasa;
  if ( tsasa(a[0], a[1]) || tsasa(b[0], b[1]) ) return null;
  const sahakani = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if ( sahakani < 0o10 ) return null;
  const hapxeutso = Math.max(0o10, Math.round(sahakani));
  let hatsasa = 0;
  for ( let i = 0; i <= hapxeutso; i++ ) {
    const t = i / hapxeutso;
    if ( tsasa(a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t) ) hatsasa++;
  }
  if ( hatsasa / ( hapxeutso + 1 ) < 0o2/0o5 ) return null;
  return { a, b };
}

// ꞙɭꞟ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭı ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
export function vepaqTom6Hak6h6n3D(): void {
  if ( !k6h6Grupo3D ) return;
  malvetem2iHate(k6h6Grupo3D);
  const t6limaL6da = ( x: number, z: number ): number => t6lima3D(x, z);
// ⟨ ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ 📃 ⟩
// ⟨ ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ 📃 ⟩
  const k6h6Teru = ( x: number, z: number, sefini: number ): number =>
    k6h6TeruBaza(x, z, sefini, t6limaL6da);
// ⟪ ſɭэ ֭ſɭэ 📃 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭц ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
  const havop2ni: Kas2kantaDitlakak[] = [];
  for ( const v of hak6h6() ) {
    if ( !v.n2k || v.n2k.length < 2 ) continue;
    const sefini = v.sefini || 0o7/0o2;
    const vop2ni: Kas2kantaDitlakak = { pts: v.n2k.map(p => [ p[0], p[1] ] as K6h6N2k),
      w: sefini / 2, hateruni: true };
    const c2kanu = c2kanuK6h6(v);
    if ( c2kanu ) {
      const ay = k6h6Teru(c2kanu.a[0], c2kanu.a[1], sefini);
      const by = k6h6Teru(c2kanu.b[0], c2kanu.b[1], sefini);
      const dx = c2kanu.b[0] - c2kanu.a[0], dz = c2kanu.b[1] - c2kanu.a[1];
      const ken2qk2h2 = dx * dx + dz * dz || 1;
      vop2ni.heightFn = ( x: number, z: number ) => {
        const t = Math.max(0, Math.min(1, ( ( x - c2kanu.a[0] ) * dx + ( z - c2kanu.a[1] ) * dz ) / ken2qk2h2));
        return ay + ( by - ay ) * t - K6H6AKMARL6DA;
      };
    }
    havop2ni.push(vop2ni);
  }
// ⟨ ꞙɭэ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ 📃 ⟩
  const nalaNombro = havop2ni.length;
// ⟪ ſɭэ ֭ſɭэ 🏙️ ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭц ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
  const KRADAK6H6ASEFINI = 0o16/0o10;
  for ( const qox2n2k of vidotajHaqox2n2k() ) {
    const ofsX = qox2n2k.ofsX, ofsZ = qox2n2k.ofsZ;
    for ( const r of qox2n2k.b6vakanta.hak6h6 ) {
      if ( r.stacia ) continue;
      const pts: K6h6N2k[] = r.orient === "EW"
        ? [ [ ofsX + r.de, ofsZ + r.haxekuxa ], [ ofsX + r.al, ofsZ + r.haxekuxa ] ]
        : [ [ ofsX + r.haxekuxa, ofsZ + r.de ], [ ofsX + r.haxekuxa, ofsZ + r.al ] ];
      havop2ni.push({ pts, w: KRADAK6H6ASEFINI, hateruni: false });
    }
    for ( const s of qox2n2k.b6vakanta.hatohtanu ) {
      havop2ni.push({ pts: [ [ ofsX + s.de[0], ofsZ + s.de[1] ],
        [ ofsX + s.al[0], ofsZ + s.al[1] ] ], w: KRADAK6H6ASEFINI, hateruni: false });
    }
  }
// ⟪ ſɭэ ֭ſɭэ 🧲 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
// ꞙɭц ɭ(ꞇ ʌ ſɭэ ֭ſɭэ
  const qakaj2Landaj: { x: number; z: number }[] = haqakaj2().map(d => {
    const s2sabo = d.s2sabo ?? 0;
    return { x: d.x + Math.sin(s2sabo) * ( d.jufu / 2 ),
      z: d.z + Math.cos(s2sabo) * ( d.jufu / 2 ) };
  });
  if ( nalaNombro > 0 ) {
    const ne3ak2 = troviK6h6RetajnHaveb6kekn(
      havop2ni.map(d => ( { n2k: d.pts, sefini: 2 * d.w } )), haqakaj2());
    const gluaHakxawa: K6h6N2k[] = ne3ak2.map(k => [ k.x, k.z ] as K6h6N2k);
    for ( let i = 0; i < nalaNombro; i++ ) {
      const has2tonome = havop2ni.filter(( _, j ) => j !== i).map(d => d.pts);
      havop2ni[i] = { ...havop2ni[i],
        pts: gluiK6h6tlakakn(havop2ni[i].pts, gluaHakxawa, qakaj2Landaj, has2tonome) };
    }
  }
// ⟪ ſɭᴜ ſןᴜ 📏 ⟫
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
  const k6h6Catsara = havop2ni.map(d => ( { n2k: d.pts, sefini: 2 * d.w } ));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(k6h6Catsara, haqakaj2());
  const hatsiq = new Map<string, { x: number; z: number; l6da: number }[]>();
  for ( const k of haveb6kek ) {
    const l6da = surGrid(k6h6Teru(k.x, k.z, 2 * K6H6AEKSTERAP2SOMANI)) - K6H6AKMARL6DA;
    const ca3aq = Math.floor(k.x / VEB6KEKACELO) + "," + Math.floor(k.z / VEB6KEKACELO);
    const ca1ara = hatsiq.get(ca3aq) ?? [];
    ca1ara.push({ x: k.x, z: k.z, l6da });
    hatsiq.set(ca3aq, ca1ara);
  }
  const harmoniigita = ( x: number, z: number ): number => {
    let l6da = t6limaL6da(x, z);
    const cx = Math.floor(x / VEB6KEKACELO), cz = Math.floor(z / VEB6KEKACELO);
    for ( let dx = -0o1; dx <= 0o1; dx++ ) {
      for ( let dz = -0o1; dz <= 0o1; dz++ ) {
        const ca1ara = hatsiq.get(( cx + dx ) + "," + ( cz + dz ));
        if ( !ca1ara ) continue;
        for ( const tsiq of ca1ara ) {
          const h6kuni = Math.hypot(x - tsiq.x, z - tsiq.z);
          if ( h6kuni > VEB6KEKARADIUSO + 0o10 ) continue;
          l6da = Math.max(l6da, tsiq.l6da
            - VEB6KEKAKLINO * Math.max(0, h6kuni - VEB6KEKARADIUSO));
        }
      }
    }
    return l6da;
  };
// ⟪ ſןɔ˞ᴜƴ ⚓ ⟫
// ꞙɭı ɭ(ꞇ ʌ ſןɔ˞ᴜƴ
// ꞙɭɿ ɭ(ꞇ ʌ ſןɔ˞ᴜƴ
// ꞙɭц ɭ(ꞇ ʌ ſןɔ˞ᴜƴ
// ꞙɭэ ɭ(ꞇ ʌ ſןɔ˞ᴜƴ
  for ( let i = 0; i < haqakaj2().length; i++ ) {
    const d = haqakaj2()[i];
    const s2sabo = d.s2sabo ?? 0;
    const qakaj2 = vepaqQakaj2n(kielKagani(k6h6Grupo3D), d.x, d.z, s2sabo,
      harmoniigita, tsasaVem23D, d.jufu, t6limaL6da);
    if ( qakaj2.capat6aN2kj.length < 2 ) continue;
    const sin = Math.sin(s2sabo), kos = Math.cos(s2sabo);
    const landaX = d.x + sin * ( d.jufu / 2 ), landaZ = d.z + kos * ( d.jufu / 2 );
// ⟨ ſןɔ˞ᴜƴ 📃 ⟩
    const saxeni = Math.max(surGrid(k6h6Teru(landaX, landaZ, qakaj2.kozunuSefini)),
      qakaj2.kozunuY);
    const capat6 = kf2Qakaj2nStuparon(qakaj2.capat6aN2kj[0], qakaj2.capat6aN2kj[1],
      saxeni, qakaj2.landejaY);
    if ( !capat6 ) continue;
    havop2ni.push({ pts: capat6.n2k, w: qakaj2.kozunuSefini, capat6: true, hateruni: false,
      heightFn: capat6.l6da, t6limaFn: t6limaL6da });
  }
  if ( !havop2ni.length ) return;
  const protektoj: K6h6N2k[] = haveb6kek.map(k => [ k.x, k.z ]);
  const t6g6 = kf2T6g6Pukek();
  const t6hna = kf2T6hnaPukek();
  vepaqHak6h6n(kielKagani(k6h6Grupo3D), havop2ni, harmoniigita, t6g6, t6hna, protektoj,
    { tsasaFn: tsasatlakak3D });
  const hapukxe = new Map<string, [ number, number ]>(haveb6kek.map(k => [ k.x + "," + k.z, k.hapukxe ]));
  const s2sabo = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.s2sabo ]));
// ⟨ ſןɔ˞ᴜƴ 📃 ⟩
// ꞙɭı ɭ(ꞇ ʌ ſןɔ˞ᴜƴ
  const hac2w2q = new Map<string, [ number, number ][]>(
    haveb6kek.map(k => [ k.x + "," + k.z, k.c2w2qa ]));
  vepaqIntersekcajnHapa12n(kielKagani(k6h6Grupo3D), protektoj, harmoniigita, t6g6, t6hna,
    hapukxe, s2sabo, hac2w2q, t6limaL6da);
  k6h6Grupo3D.visible = tsekeVidebla("hak6h6");
}

// ⟪ ſɭᴜ ſןᴜ 📐 ⟫
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
/* ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
    @param hunaq ( string ) - ſɭᴜ ſןɹ ｡ ( ka5asexazxipo ) ｡
    @param sx, sz ( number ) - ʃᴜ j͐ʃɹ ｡
    @param rot ( number ) - ʃᴜ j͑ʃᴜ ʃɜ ｡
    @param ksaka ( string ) - ſɭɔ˞ᴜ ſɭᴜ ｡
@returns spec ( VepaqSpec ) ｡ ſɭᴜ ı],ƨɔ ｡ */
function qox2n2kPudal(hunaq: string, sx: number, sz: number, rot: number, ksaka: string) {
  const estasKa5asexaz = hunaq === "ka5asexazxipo";
  const havem2 = estasKa5asexaz ? TIPAJNIVELOJ.ka5asexazxipo
    : hunaq === "qaman2" ? 7 : hunaq === "turo" ? 0o10 : 4;
  const b6k61oL6da = estasKa5asexaz ? 0o155/0o40
    : hunaq === "qaman2" ? 0o30/0o10
    : hunaq === "turo" ? 0o30/0o10
    : hunaq === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
  return {
    x: sx, z: sz, type: hunaq, name: ksaka, havem2, w: 0o10, d: 0o10, b6k61oL6da,
    rot, diamond: true,
    h0: t6lima3D(sx, sz),
    sube: estasKa5asexaz ? 0 : havem2,
    b6k61oL6daSub: 0o123/0o40,
  };
}

// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
export function vepaqTom6Qox2n2kn3D(): void {
  if ( !qox2n2kGrupo3D || !kagani3d ) return;
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
  for ( const o of qox2n2k3DPaqj ) {
    if ( o.parent ) o.parent.remove(o);
    const hane3unak = new Set<THREE.BufferGeometry | THREE.Material>();
    o.traverse(( m ) => {
      const mesa = m as THREE.Mesh;
      if ( mesa.isMesh ) {
        if ( mesa.geometry && !hane3unak.has(mesa.geometry) ) { mesa.geometry.dispose(); hane3unak.add(mesa.geometry); }
        const matoj = Array.isArray(mesa.material) ? mesa.material : [ mesa.material ];
        for ( const mat of matoj ) if ( mat && !hane3unak.has(mat) ) { mat.dispose(); hane3unak.add(mat); }
      }
    });
  }
  qox2n2k3DPaqj = [];
  malvetem2iHate(qox2n2kGrupo3D);
// ⟪ ſɭᴜ ſןᴜ 🏙️ ⟫
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
  for ( const qox2n2k of vidotajHaqox2n2k() ) {
    const b6vakanta = qox2n2k.b6vakanta;
    const ofsX = qox2n2k.ofsX, ofsZ = qox2n2k.ofsZ;
    const kaxte = hakaxte()[qox2n2k.vecax2lani];
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
    const knasukf2qdalai: THREE.Mesh[] = [];
    for ( let i = 0; i < b6vakanta.paqj.length; i++ ) {
      const b = b6vakanta.paqj[i];
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
      const hunaq = ( b.stacia || b.hunaq === "ka5asexaz" ) ? "ka5asexazxipo" : b.hunaq;
      const wx = ofsX + b.x, wz = ofsZ + b.z;
      const ne3ak2 = kagani3d.children.length;
      vepaqSatalon(qox2n2kPudal(hunaq, wx, wz, b.rot, "qox2n2k" + qox2n2k.vecax2lani + "" + i),
        kagani3d, knasukf2qdalai, t6lima3D);
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
      qox2n2k3DPaqj.push(...kagani3d.children.slice(ne3ak2));
    }
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
    if ( kaxte && kaxte.kekufxeso ) {
      const kekufxesoKa5ik = 0o10;
      const raqa: KekufxesoRaqa[] = [];
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        raqa.push({ x: ofsX + Math.cos(a) * kekufxesoKa5ik, z: ofsZ + Math.sin(a) * kekufxesoKa5ik, s2sabo: a });
      }
      const ne3ak2 = kagani3d.children.length;
      vepaqKekufxeso(kagani3d, raqa, t6lima3D, ORAPUKEK);
      qox2n2k3DPaqj.push(...kagani3d.children.slice(ne3ak2));
    }
// ꞙɭц ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭэ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɩ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭꞟ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭı ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
// ꞙɭɿ ɭ(ꞇ ʌ ſɭᴜ ſןᴜ
    if ( kaxte && kaxte.hahufwuk2 !== false ) {
      const spots: HxeuxfaRaqa[] = b6vakanta.hahufwuk2.map(l => ( {
        x: ofsX + l.x, z: ofsZ + l.z, y: t6lima3D(ofsX + l.x, ofsZ + l.z),
        s2sabo: Math.PI / 4 } ));
      if ( spots.length ) {
        const ne3ak2 = kagani3d.children.length;
        vepaqHxeuxfojn(kagani3d, spots, dioritaPukek(), ORAPUKEK);
        qox2n2k3DPaqj.push(...kagani3d.children.slice(ne3ak2));
      }
    }
  }
  const videbla = tsekeVidebla("qox2n2k");
  qox2n2k3DPaqj.forEach(o => { o.visible = videbla; });
}
