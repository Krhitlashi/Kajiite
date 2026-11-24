// ≺⧼ j͑ʃƽɔ ſɭɹ ı],ɔ ŋᷠᴜ j͑ʃᴜꞇ ʌ }ʃɔ ſ͕ɭɹȝ ꞁȷ̀ᴜ }ʃꞇ 📦 ⧽≻
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../../eskekoj/komunajxoj/kunfandajxoj.js";
import { vepaqSatalon } from "../../../eskekoj/hapaq/satalaj-hapaq.js";
import { TIPAJ_NIVELOJ } from "../../../eskekoj/hapaq/satalaj/hahunaq.js";
import { PagaSistemo, TemekSistemo,
  vepaqMetitanPagan, vepaqMetitanTemekn } from "../../../eskekoj/shalaj-hapudal/hapaga.js";
import { vepaqMetitanRokon } from "../../../eskekoj/shalaj-hapudal/vegetajxo/hat6keq.js";
import { vepaqMetitanXaben } from "../../../eskekoj/shalaj-hapudal/vegetajxo/haxabe.js";
import { vepaqTlexlefhxakaijn } from "../../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefhxakai.js";
import { vepaqTlexlefp2saijn } from "../../../eskekoj/shalaj-hapudal/vegetajxo/tlexlefp2sai.js";
import { vepaqArbaron } from "../../../eskekoj/shalaj-hapudal/vegetajxo/halam2v/arbaro.js";
import { vepaqLarikon } from "../../../eskekoj/shalaj-hapudal/vegetajxo/hataksal.js";
import { vepaqKeuxfhxeso } from "../../../eskekoj/mebloj/keuxfhxeso.js";
import { kf2Kanoton, Kanoto } from "../../../eskekoj/medio/transporto.js";
import { vepaqFiguron } from "../../../eskekoj/shalaj-hapudal/hamaz.js";
import type { Figuro } from "../../../eskekoj/shalaj-hapudal/hamaz.js";
import { vepaqKrasesxagxon } from "../../../eskekoj/hapaq/krasesxagxa-kosmosxipo.js";
import type { Krasesxagxo } from "../../../eskekoj/hapaq/krasesxagxa-kosmosxipo.js";
import { VESTOJ } from "../../../eskekoj/vestaro/vestoj.js";
import type { MetitaObjekto } from "./hahunaq.js";

export function vepaqMetitajnObjektojn(
  qena: THREE.Scene,
  objektoj: MetitaObjekto[],
  altecoFn: ( x: number, z: number ) => number,
  akvoFn: ( x: number, z: number ) => boolean,
  akvaVem2Fn: ( x: number, z: number ) => number,
  hapaga: PagaSistemo,
  hatemek: TemekSistemo,
  npcoj: Figuro[],
  kanuoj: Kanoto[],
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  selektajxoj: THREE.Mesh[],
): Krasesxagxo | null {
  const xipoj: Krasesxagxo[] = [];
  const ne3ak2Gefiloj = new Set<THREE.Object3D>(qena.children);
  for ( const o of objektoj ) {
    const s = o.p6zukani ?? 1;
    if ( o.pudal === "lam2v" ) vepaqArbaron(qena, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.pudal === "taksal" ) vepaqLarikon(qena, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.pudal === "tlexlefhxakai" ) vepaqTlexlefhxakaijn(qena, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.pudal === "tlexlefp2sai" ) vepaqTlexlefp2saijn(qena, [ { x: o.x, z: o.z, h: altecoFn(o.x, o.z), s } ]);
    else if ( o.pudal === "t6keq" ) vepaqMetitanRokon(qena, o.x, o.z, altecoFn, s, o.rotacio ?? -1);
    else if ( o.pudal === "xabe" ) vepaqMetitanXaben(qena, o.x, o.z, altecoFn, s, o.xabePudal ?? 0);
    else if ( o.pudal === "akvapaga" ) {
      if ( !akvoFn(o.x, o.z) ) continue;
      const b = vepaqMetitanPagan(qena, o.pagapudal ?? 0, o.x, o.z, akvaVem2Fn(o.x, o.z), s);
      if ( b ) hapaga.hapaga.push(b);
    } else if ( o.pudal === "temek" ) {
      const p = vepaqMetitanTemekn(qena, o.x, o.z, altecoFn, o.radio ?? 4, s);
      if ( p ) hatemek.hatemek.push(p);
    } else if ( o.pudal === "npco" ) {
      const v = VESTOJ[( o.vesto ?? 0 ) % VESTOJ.length];
      const fig = vepaqFiguron(v, ( o.harstilo ?? 0 ) === 1 ? "haroLonga" : "haroMalalta");
      const h = altecoFn(o.x, o.z);
      fig.group.position.set(o.x, h, o.z);
      fig.hejmo.set(o.x, h, o.z);
      fig.celo.set(o.x, h, o.z);
      fig.group.rotation.y = o.rotacio ?? 0;
      fig.atendo = Math.random() * 4;
      fig.rapido = 0o55/0o100 + Math.random() * 0o4/0o10;
      qena.add(fig.group);
      npcoj.push(fig);
    } else if ( o.pudal === "kanuo" ) {
      if ( !akvoFn(o.x, o.z) ) continue;
      kanuoj.push(kf2Kanoton(qena, o.x, o.z, o.rotacio ?? 0, oraMaterialo,
        akvaVem2Fn(o.x, o.z), o.stilo === "satala" ? "satala" : "baza"));
    } else if ( o.pudal === "hxeuxfo" || o.pudal === "hxeuxfoPa12" ) {
    } else if ( o.pudal === "keuxfhxeso" ) {
      vepaqKeuxfhxeso(qena, [ { x: o.x, z: o.z, s2sabo: o.rotacio ?? 0 } ], altecoFn, oraMaterialo);
    } else if ( o.pudal === "spacosxipo" ) {
      xipoj.push(vepaqKrasesxagxon(qena, o.x, 0o40, o.z, oraMaterialo, eniraMaterialo));
    } else if ( o.pudal === "sanktejo" || o.pudal === "turo" || o.pudal === "domo"
        || o.pudal === "mangxejo" || o.pudal === "kasafeo" || o.pudal === "stacio" ) {
      const hunaq = o.pudal === "stacio" ? "stacioxipo" : o.pudal;
      const havem2 = hunaq === "stacioxipo" ? TIPAJ_NIVELOJ.stacioxipo : hunaq === "sanktejo" ? 7 : hunaq === "turo" ? 0o10 : 4;
      const w = 0o10 * ( o.p6zukani ?? 1 ), d = w;
      vepaqSatalon({
        x: o.x, z: o.z, type: hunaq, name: "objekto",
        havem2, w, d,
        tieroAlto: hunaq === "stacioxipo" ? 0o155/0o40
          : hunaq === "turo" ? 0o30/0o10 : hunaq === "kasafeo" ? 0o155/0o40 : 0o315/0o100,
        rot: o.rotacio ?? 0, diamond: true, h0: altecoFn(o.x, o.z),
        sube: hunaq === "stacioxipo" ? 0 : havem2, tieroAltoSub: 0o123/0o40,
      }, qena, selektajxoj, altecoFn);
    }
  }
  // ⟨ ſɭɜ ı],ɹȝ ʌ j͑ʃᴜꞇ ʌ ſɟɔȝ 📃 ⟩
  const konservotaj = new Set<THREE.Object3D>(selektajxoj);
  const movaj = new Set<THREE.Object3D>();
  for ( const f of npcoj ) movaj.add(f.group);
  for ( const b of hapaga.hapaga ) movaj.add(b.hate);
  for ( const p of hatemek.hatemek ) movaj.add(p.hate);
  for ( const k of kanuoj ) movaj.add(k.group);
  for ( const x of xipoj ) movaj.add(x.group);
  kunfandiMondajnMeshojn(qena,
    qena.children.filter(o => !ne3ak2Gefiloj.has(o) && !movaj.has(o)), {
      celo: 0o100,
      konservu: ( m ) => konservotaj.has(m),
    });
  return xipoj.length ? xipoj[0] : null;
}
