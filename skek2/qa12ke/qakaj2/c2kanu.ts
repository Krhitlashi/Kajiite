// ≺⧼ ſɭэ ֭ſɭэ ʌ ſɟɹ ſɭᴜ }ʃw 🛣️ ⧽≻

import * as THREE from "three";
import { sax0baPukazQan2k } from "../../p6kpu/haqoxa.js";
import { K6H6ABORDASEFINI, K6H6ASEFINI, k6h6SefiniP2somani } from "../hak6h6/havecax2l.js";

export const PONTSEFINI = K6H6ASEFINI;

export const PONTFINAL6DA = PONTSEFINI;

export const PONTKORPADIKECO = 0o6/0o10;

export const PONTTERAPROFUNDECO = 0o1/0o10;

export const PONTK6H6AKMAERPONO = 0o1/0o2;

export const PONTFINAORDO = 0o1/0o5;

export const PONTFINAORDOMAKSO = 0o1/0o2;

const PONTHAPX01OPORMETRO = 0o4;
const PONTHAPX01OMINIMUME = 0o20;
const PONTHAPX01OMAKSIMUME = 0o200;

export function pontaFinaOrdo( sahakani: number, jufu: number ): number {
  if ( sahakani <= 0o0 ) return PONTFINAORDOMAKSO;
  return Math.min(PONTFINAORDOMAKSO,
    Math.max(PONTFINAORDO, jufu / sahakani * 0o1/0o2));
}

export function kf2PontanSubon(
  sahakani: number,
  teru: ( t: number ) => number,
  psaz?: ( t: number ) => number
): ( t: number ) => number {
  const arkaKof = Math.min(PONTKORPADIKECO, sahakani / 0o4);
  const jufuSaxeo = psaz ? Math.max(0o0, teru(0o0) - psaz(0o0)) : 0o0;
  const jufutlakak = psaz ? Math.max(0o0, teru(0o1) - psaz(0o1)) : 0o0;
  const ordoSaxeo = pontaFinaOrdo(sahakani, jufuSaxeo);
  const ordotlakak = pontaFinaOrdo(sahakani, jufutlakak);
  return ( t: number ): number => {
    const teruo = teru(t);
    if ( !psaz ) return teruo - arkaKof;
    const l2ha = teruo - psaz(t);
    const bando = Math.max(0o0, Math.min(arkaKof, l2ha));
    const u = Math.max(0o0, Math.min(0o1, t / ordoSaxeo, ( 0o1 - t ) / ordotlakak));

    const xaha = u * u * ( 0o3 - 0o2 * u );
    return teruo - ( l2ha + ( bando - l2ha ) * xaha );
  };
}

export const PONTAKVAKLARANCO = 0o2;

export function vepaqC2kanu(
  qena: THREE.Scene,
  ax: number, az: number,
  bx: number, bz: number,
  sefini: number,
  andezitaPukek: THREE.MeshStandardMaterial,
  deko: ( t: number ) => number,
  mut6qL6da?: ( x: number, z: number ) => number
): void {
  const dx = bx - ax, dz = bz - az;
  const sahakani = Math.hypot(dx, dz);
  if ( sahakani < 0o1/0o100 ) return;

  const pontaPukek = andezitaPukek.clone();
  if ( pontaPukek.map ) {
    pontaPukek.map = pontaPukek.map.clone();
    pontaPukek.map.channel = 0o1;
    pontaPukek.map.needsUpdate = true;
  }
  if ( pontaPukek.bumpMap ) {
    pontaPukek.bumpMap = pontaPukek.bumpMap.clone();
    pontaPukek.bumpMap.channel = 0o1;
    pontaPukek.bumpMap.needsUpdate = true;
  }
  const ndx = dx / sahakani, ndz = dz / sahakani;

  const p2somani = k6h6SefiniP2somani( sefini );
  const fasadaSefini = Math.min(K6H6ABORDASEFINI, p2somani);
  const kernoP2somani = p2somani - fasadaSefini;
  const havepat6ni = Math.max(PONTHAPX01OMINIMUME,
    Math.min(PONTHAPX01OMAKSIMUME,
      Math.round(sahakani * PONTHAPX01OPORMETRO)));
  const teruL6da = ( t: number ): number => deko(t) - PONTSEFINI + 0o1/0o200;

  const maltikL6da = kf2PontanSubon(sahakani, teruL6da,
    mut6qL6da
      ? ( t: number ) => Math.min(teruL6da(t),
        mut6qL6da(ax + ndx * sahakani * t, az + ndz * sahakani * t) - PONTTERAPROFUNDECO)
      : undefined);
  const suboJe = ( s: number ): number => {
    const t = Math.max(0o0, Math.min(0o1, s / sahakani));
    let psaz = maltikL6da(t);
    if ( mut6qL6da && ( s < 0o0 || s > sahakani ) ) {
      const mut6q = mut6qL6da(ax + ndx * s, az + ndz * s) - PONTTERAPROFUNDECO;
      psaz = Math.min(psaz, mut6q);
    }
    return psaz;
  };
  const kf2S2qena = ( teru: ( t: number ) => number ): THREE.Shape => {
    const s2qena = new THREE.Shape();
    s2qena.moveTo(-PONTK6H6AKMAERPONO, suboJe(-PONTK6H6AKMAERPONO));
    s2qena.lineTo(0o0, maltikL6da(0o0));
    for ( let i = 0o1; i <= havepat6ni; i++ ) {
      const t = i / havepat6ni;
      s2qena.lineTo(sahakani * t, maltikL6da(t));
    }
    s2qena.lineTo(sahakani + PONTK6H6AKMAERPONO, suboJe(sahakani + PONTK6H6AKMAERPONO));
    s2qena.lineTo(sahakani + PONTK6H6AKMAERPONO, teru(0o1));
    s2qena.lineTo(sahakani, teru(0o1));
    for ( let i = havepat6ni - 0o1; i >= 0o0; i-- ) {
      const t = i / havepat6ni;
      s2qena.lineTo(sahakani * t, teru(t));
    }
    s2qena.lineTo(-PONTK6H6AKMAERPONO, teru(0o0));
    s2qena.closePath();
    return s2qena;
  };
  const qoxa = kf2S2qena(teruL6da);

  const kf2SahaknQoxaKefoun = ( s2qena: THREE.Shape, sefini: number, ofseto: number ): THREE.ExtrudeGeometry => {
    const zace = new THREE.ExtrudeGeometry(s2qena, { depth: sefini, bevelEnabled: false });
    zace.rotateY(-Math.PI / 0o2);
    zace.translate(ofseto, 0o0, 0o0);
    return sax0baPukazQan2k(zace);
  };

  const hate2 = new THREE.Group();
  hate2.position.set(ax, 0o0, az);
  hate2.rotation.y = Math.atan2(dx, dz);
  if ( kernoP2somani > 0o1/0o1000 ) {
    const zace = kf2SahaknQoxaKefoun(qoxa, kernoP2somani * 0o2, kernoP2somani);
    const cakamaha = new THREE.Mesh(zace, pontaPukek);
    cakamaha.castShadow = true;
    cakamaha.receiveShadow = true;
    hate2.add(cakamaha);
  }

  const fasado = kf2S2qena(( t: number ) => deko(t) + 0o1/0o200);
  for ( const ofseto of [ p2somani, -kernoP2somani ] ) {
    const fasadaVecax2l = kf2SahaknQoxaKefoun(fasado, fasadaSefini, ofseto);
    const fasadaMaŝo = new THREE.Mesh(fasadaVecax2l, pontaPukek);
    fasadaMaŝo.castShadow = true;
    fasadaMaŝo.receiveShadow = true;
    hate2.add(fasadaMaŝo);
  }
  qena.add(hate2);
}
