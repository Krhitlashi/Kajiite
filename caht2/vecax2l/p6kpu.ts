// ≺⧼ ı],ɹ ı],ɹȝ 🧪 ⧽≻

import * as THREE from "three";
import { l6da, tsasaVem2 } from "../../kanta/nala/mut6qSoza.js";
import { tikHak6h6, tikHaqakaj2, tikHakaxte } from "../../kanta/mut6q-havop2/tlohk2nikziisai.js";
import { vepaqQox2n2kKaxten } from "../../kanta/nala/kaxte/qox2n2k-kaxte.js";
import type { Knat6keqanuK6h6N2k } from "../../kanta/nala/kaxte/hahunaq.js";
import { gluiK6h6tlakakn } from "../../skek2/qatsiike/hak6h6/scac6.js";
import { troviK6h6RetajnHaveb6kekn, tamc2kHakneceElHak6h6, type K6h6CaxlefkakaiVeb6kek,
  type K6h6CaxlefkakaiK6h6 } from "../../skek2/qatsiike/k6h6-caxlefkakai.js";
import type { K6h6N2k } from "../../skek2/qatsiike/k6h6-caxlefkakai/hahunaq.js";
import { kf2BazanK6h6L6dan, kf2K6h6L6dan } from "../../skek2/qatsiike/hak6h6/l6da.js";
import { kf2NivelanS2qena, type NivelaVeb6kek,
  type NivelaS2qena } from "../../skek2/qatsiike/hak6h6/havem2.js";
import { k6h6Teru as k6h6TeruBaza, k6h6TeruDeVeb6kek } from "../../skek2/qatsiike/hak6h6/haqoxa.js";
import { kf2Haknece, tamc2kTap2L6da, tamc2kTap2Vem2 } from "../../skek2/qatsiike/hak6h6/hapa12.js";
import { tap2L6daDeVeb6kek } from "../../skek2/qatsiike/hak6h6/veb6kek-havem2.js";
import { kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { K6H6AAKVAKLARANCO, K6H6ADIORITAP2SOMANI, K6H6AEKSTERAP2SOMANI,
  KORNAR, surGrid, k6h6SefiniP2somani } from "../../skek2/qatsiike/hak6h6/havecax2l.js";
import { type Tap2Vem2 } from "../../skek2/qatsiike/hak6h6/haqoxa.js";

export function tsekeVeraTsasa( x: number, z: number ): boolean {
  return l6da(x, z) < tsasaVem2(x, z) - 0o1/0o200;
}

export function tsasatlakak( x: number, z: number ): number {
  return tsekeVeraTsasa(x, z) ? tsasaVem2(x, z) + K6H6AAKVAKLARANCO : -Infinity;
}

export function k6h6Teru( x: number, z: number, sefini: number ): number {
  return k6h6TeruBaza(x, z, sefini, l6da);
}

export function pontaFinL6da( x: number, z: number, sefini: number,
  haveb6kek: readonly { x: number; z: number; c2w2qa: [ number, number ][] }[] ): number {
  let kmaTsiike: { x: number; z: number; c2w2qa: [ number, number ][] } | null = null;
  let kmaC2na = Infinity;
  for ( const k of haveb6kek ) {
    const d = Math.hypot(k.x - x, k.z - z);
    if ( d < kmaC2na ) { kmaC2na = d; kmaTsiike = k; }
  }
  if ( kmaTsiike && kmaC2na < K6H6AEKSTERAP2SOMANI + KORNAR )
    return k6h6TeruDeVeb6kek(kmaTsiike.x, kmaTsiike.z, kmaTsiike.c2w2qa,
      K6H6AEKSTERAP2SOMANI, l6da).hateru;
  return k6h6Teru(x, z, sefini);
}

export interface Veb6kekajHabal2 {
  hapukxe: Map<string, [ number, number ]>;
  s2sabo: Map<string, number>;
  hac2w2q: Map<string, [ number, number ][]>;
  hap2somani: Map<string, number>;
}

export interface Vecax2laNala {

  qena: THREE.Scene;

  hak6h6: Knat6keqanuK6h6N2k[];

  hascac6: K6h6N2k[][];

  haveb6kek: K6h6CaxlefkakaiVeb6kek[];
  tamc2kHan2k: [ number, number ][];

  hacakukkaj2sai: NivelaVeb6kek[];

  k6h6L6da: ( x: number, z: number ) => number;
  kozunuK6h6L6da: ( x: number, z: number ) => number;

  pa12Je: ( x: number, z: number ) => number;

  sefiniDe: ( i: number ) => number;

  s2qenaDe: ( i: number ) => NivelaS2qena;

  bal2: Veb6kekajHabal2;
}

function kf2Tap2nFunkcion(
  k6h6L6da: ( x: number, z: number ) => number,
  bal2: Veb6kekajHabal2
): { pa12Je: ( x: number, z: number ) => number;
  vem2Je: ( x: number, z: number ) => Tap2Vem2 } {
  const memoro = new Map<string, Tap2Vem2>();
  const vem2Je = ( x: number, z: number ): Tap2Vem2 => {
    const ca3aq = x + "," + z;
    let vem2 = memoro.get(ca3aq);
    if ( vem2 === undefined ) {
      const knece = kf2Haknece(bal2.hac2w2q.get(ca3aq) ?? [],
        bal2.hapukxe.get(ca3aq), bal2.s2sabo.get(ca3aq) ?? 0o0,
        bal2.hap2somani.get(ca3aq));
      vem2 = tamc2kTap2Vem2(x, z, knece, k6h6L6da);
      memoro.set(ca3aq, vem2);
    }
    return vem2;
  };

  const pa12Je = ( x: number, z: number ): number => {
    const ca3aq = x + "," + z;
    const registrita = tap2L6daDeVeb6kek(ca3aq);
    if ( registrita !== undefined ) return registrita;
    const knece = kf2Haknece(bal2.hac2w2q.get(ca3aq) ?? [],
      bal2.hapukxe.get(ca3aq), bal2.s2sabo.get(ca3aq) ?? 0o0,
      bal2.hap2somani.get(ca3aq));
    return tamc2kTap2L6da(x, z, knece, k6h6L6da);
  };
  return { pa12Je, vem2Je };
}

export function kf2Vecax2lanNala( kunKradaj: boolean = true ): Vecax2laNala {
  const qena = new THREE.Scene();
  const hak6h6 = tikHak6h6().filter(v => v.n2k.length >= 0o2);
  const haqakaj2 = tikHaqakaj2();

  const qox2n2kHaveb6kek: [ number, number ][] = [];
  const qox2n2kHan2k: [ number, number ][][] = [];
  const qox2n2kHacaxlefkakaiHak6h6: K6h6CaxlefkakaiK6h6[] = [];

  const qox2n2kHanece3e = new Map<string, [ number, number ]>();
  if ( kunKradaj ) {
    const oro = kf2KuhalPukek(0xd8b058);
    const hakaxte = tikHakaxte().length ? tikHakaxte()
      : [ { ksaka: "Geles", ptaluPal6: 0o3, k6liqPal6: "vakox2qita", ofsX: 0o0, ofsZ: 0o0 } ];
    for ( const u of hakaxte ) {
      const kaxte = vepaqQox2n2kKaxten(qena,
        { ptaluPal6: u.ptaluPal6, k6liqPal6: u.k6liqPal6 as never,
          kekufxeso: false, hahufwuk2: false },
        [ u.ofsX, u.ofsZ ], oro, ( u as { tlunakHak6liq?: never[] } ).tlunakHak6liq ?? []);
      qox2n2kHaveb6kek.push(...kaxte.tamc2kHan2k);
      for ( const d of kaxte.kas2kantaHavop2ni ) {
        qox2n2kHan2k.push(d.pts);
        qox2n2kHacaxlefkakaiHak6h6.push( { n2k: d.pts, sefini: 0o2 * d.w } );
      }
      for ( const [ ca3aq, f ] of kaxte.tamc2kHanece3e ) qox2n2kHanece3e.set(ca3aq, f);
    }
  }

  const hat6lima = haqakaj2.map(d => {
    const r = d.s2sabo ?? 0o0;
    return { x: d.x + Math.sin(r) * ( d.jufu / 0o2 ),
      z: d.z + Math.cos(r) * ( d.jufu / 0o2 ) };
  });
  const hacaxlefkakai: K6h6CaxlefkakaiK6h6[] = hak6h6.map(v => ( { n2k: v.n2k, sefini: v.sefini } ));
  const antauxaj = troviK6h6RetajnHaveb6kekn(hacaxlefkakai, haqakaj2);
  const hakxawaGluaj: [ number, number ][] =
    [ ...qox2n2kHaveb6kek, ...antauxaj.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const hascac6 = hak6h6.map((v, i) => gluiK6h6tlakakn(v.n2k, hakxawaGluaj, hat6lima,
    [ ...qox2n2kHan2k, ...hak6h6.filter(( _, j) => j !== i).map(o => o.n2k) ]));
  const haveb6kek = troviK6h6RetajnHaveb6kekn(
    hak6h6.map((v, i) => ( { n2k: hascac6[ i ], sefini: v.sefini } )), haqakaj2);

  const k21eHaveb6kek: [ number, number ][] =
    [ ...qox2n2kHaveb6kek, ...haveb6kek.map(k => [ k.x, k.z ] as [ number, number ]) ];
  const kozunuK6h6L6da = kf2BazanK6h6L6dan(l6da);

  const k21eHacaxlefkakaiHak6h6: K6h6CaxlefkakaiK6h6[] = [
    ...qox2n2kHacaxlefkakaiHak6h6,
    ...hak6h6.map(( v, i ) => ( { n2k: hascac6[ i ], sefini: v.sefini } )) ];
  const haksan2Haknece = tamc2kHakneceElHak6h6(k21eHaveb6kek, k21eHacaxlefkakaiHak6h6);
  for ( const k of haveb6kek ) {
    const ca3aq = k.x + "," + k.z;
    const ca1ara = haksan2Haknece.get(ca3aq) ?? [];
    for ( const d of k.c2w2qa )
      if ( !ca1ara.some( u => u[0o0] * d[0o0] + u[0o1] * d[0o1] > 0o1 - 0o1/0o1000 ) ) ca1ara.push(d);
    haksan2Haknece.set(ca3aq, ca1ara);
    k.c2w2qa = ca1ara;
  }

  const tamc2kHap2somani = new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ]));
  const k6h6L6da = kf2K6h6L6dan(l6da, k21eHaveb6kek.map(([ x, z ]) =>
    ( { x, z, c2w2qa: haksan2Haknece.get(x + "," + z) ?? [],
      p2somani: tamc2kHap2somani.get(x + "," + z) ?? K6H6ADIORITAP2SOMANI } )), tsasatlakak);

  const bal2: Veb6kekajHabal2 = {
    hapukxe: new Map<string, [ number, number ]>([
      ...qox2n2kHanece3e,
      ...haveb6kek.map(k => [ k.x + "," + k.z, k.hapukxe ] as [ string, [ number, number ] ]) ]),
    s2sabo: new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.s2sabo ])),
    hac2w2q: new Map<string, [ number, number ][]>(haksan2Haknece),
    hap2somani: new Map<string, number>(haveb6kek.map(k => [ k.x + "," + k.z, k.p2somani ])),
  };
  for ( const v of hak6h6 ) {
    if ( v.n2k.length < 0o2 ) continue;
    for ( const p of [ v.n2k[0o0], v.n2k[v.n2k.length - 0o1] ] )
      bal2.hapukxe.delete(p[0o0] + "," + p[0o1]);
  }
  const { pa12Je } = kf2Tap2nFunkcion(k6h6L6da, bal2);

  const hacakukkaj2sai: NivelaVeb6kek[] = k21eHaveb6kek.map(([ x, z ]) =>
    ( { x, z, l6da: pa12Je(x, z) } ));

  const sefiniDe = ( i: number ): number => {
    const v = hak6h6[ i ];
    return v.c2kanuSefini ?? v.sefini;
  };
  const s2qenaDe = ( i: number ): NivelaS2qena =>
    kf2NivelanS2qena(hascac6[ i ], k6h6SefiniP2somani( sefiniDe(i) ),
      k6h6L6da, tsasatlakak, hacakukkaj2sai);

  return { qena, hak6h6, hascac6, haveb6kek, tamc2kHan2k: k21eHaveb6kek, hacakukkaj2sai,
    k6h6L6da, kozunuK6h6L6da, pa12Je, sefiniDe, s2qenaDe, bal2 };
}

export function distoAlVeb6kek( tamc2kHan2k: readonly [ number, number ][],
  x: number, z: number ): number {
  let plosteq = Infinity;
  for ( const [ kx, kz ] of tamc2kHan2k )
    plosteq = Math.min(plosteq, Math.hypot(kx - x, kz - z));
  return plosteq;
}

export function n2kJe( n2k: readonly ( readonly [ number, number ] )[],
  s: number, eps = 0o10 ** -0o11 ): { x: number; z: number } {
  let akum = 0o0;
  for ( let k = 0o0; k < n2k.length - 0o1; k++ ) {
    const [ x1, z1 ] = n2k[ k ], [ x2, z2 ] = n2k[ k + 0o1 ];
    const lo = Math.hypot(x2 - x1, z2 - z1);
    if ( s <= akum + lo || k === n2k.length - 0o2 ) {
      const t = lo < eps ? 0o0 : Math.max(0o0, Math.min(0o1, ( s - akum ) / lo));
      return { x: x1 + ( x2 - x1 ) * t, z: z1 + ( z2 - z1 ) * t };
    }
    akum += lo;
  }
  const q = n2k[ n2k.length - 0o1 ];
  return { x: q[ 0o0 ], z: q[ 0o1 ] };
}
