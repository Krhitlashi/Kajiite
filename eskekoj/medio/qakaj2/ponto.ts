// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw 🌉 ⧽≻
import * as THREE from "three";
import { sax0baPukazQan2k } from "../../komunajxoj/haqoxa.js";
import { VOJA_BORDA_SEFINI, VOJA_DIKECO, k6h6LarghoDuono } from "../hak6h6/havecax2l.js";

// ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ 📏 ⟫
// ⟨ ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
export const PONT_DEKA_DIKECO = VOJA_DIKECO;

export const PONT_FINA_LEVIGXO = PONT_DEKA_DIKECO;

// ⟨ ſɭᴜ ſɭ,w , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ⟅ 📃 ⟩
// ⟨ ꞙɭɔ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭɿ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɿ , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ⟅ 📃 ⟩
export const PONT_KORPA_DIKECO = 0o6/0o10;

// ⟨ ſɭɜ ſɭ,w , ꞙɭı ⟅ ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
export const PONT_TERA_PROFUNDECO = 0o1/0o10;

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɿ 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭɔ
//   ꞙɭɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
export const PONT_VOJA_SUPERPONO = 0o1/0o2;

// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ſ͕ɭɜ ı],ᴜ , ⟅ 📃 ⟩
export const PONT_FINA_ORDO = 0o1/0o5;

// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
export const PONT_FINA_ORDO_MAKSO = 0o1/0o2;

// ⟨ ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const PONT_SPECIMENOJ_POR_METRO = 0o4;
const PONT_SPECIMENOJ_MINIMUME = 0o20;
const PONT_SPECIMENOJ_MAKSIMUME = 0o200;

/* ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſןɔ˞ᴜƴ , ſɭɜ ſɭ,w , ꞙɭı ,
    @param sahakani ( number ) - ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param profundo ( number ) - ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı ,
@returns ca1ara ( number ) - ꞙɭı , ꞙɭɿ ,
    ꞙɭı , ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭᴜ ſɭ,w ,
    ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩ */
export function pontaFinaOrdo( sahakani: number, profundo: number ): number {
  if ( sahakani <= 0 ) return PONT_FINA_ORDO_MAKSO;
  return Math.min(PONT_FINA_ORDO_MAKSO,
    Math.max(PONT_FINA_ORDO, profundo / sahakani * 0o1/0o2));
}

/* ꞙɭı , ſɭэ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param sahakani ( number ) - ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param teru ( function ) - ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , t ( ɔ..ı )
    @param fundo ( function , optional ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , t
@returns malsupra ( function ) - ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , t
    ꞙɭɿ , ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſɭ,w , ⟅ 📃 ⟩ */
export function kf2PontanSubon(
  sahakani: number,
  teru: ( t: number ) => number,
  fundo?: ( t: number ) => number
): ( t: number ) => number {
  const arkaDikeco = Math.min(PONT_KORPA_DIKECO, sahakani / 0o4);
  const profundaKomenco = fundo ? Math.max(0, teru(0) - fundo(0)) : 0;
  const profundaFino = fundo ? Math.max(0, teru(1) - fundo(1)) : 0;
  const ordoKomenco = pontaFinaOrdo(sahakani, profundaKomenco);
  const ordoFino = pontaFinaOrdo(sahakani, profundaFino);
  return ( t: number ): number => {
    const teruo = teru(t);
    if ( !fundo ) return teruo - arkaDikeco;
    const l2ha = teruo - fundo(t);
    const bando = Math.max(0, Math.min(arkaDikeco, l2ha));
    const u = Math.max(0, Math.min(1, t / ordoKomenco, ( 1 - t ) / ordoFino));
    // ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭɿ ⟅ ꞙɭı , ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const glata = u * u * ( 0o3 - 0o2 * u );
    return teruo - ( l2ha + ( bando - l2ha ) * glata );
  };
}


// ⟪ ſᶘᴜ j͑ʃᴜ , ꞙɭı 📏 ⟫
// ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ⟅ ꞙɭı , ꞙɭэ , ꞙɭı , ꞙɭɿ ,
//   ɭʃᴜ , ſᶘᴜ j͑ʃᴜ , ⟅ ꞙɭɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ⟅ 📃 ⟩
export const PONT_AKVA_KLARANCO = 0o2;

/* ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ ,
    @param qena ( Scene ) - ɭʃɹ ʃᴜ }ʃw , ꞙɭı ,
    @param ax, az ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param bx, bz ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param andezitaMaterialo ( MeshStandardMaterial ) - ſןw ſɭɔƽ ,
    @param deko ( function ) - ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ ,
    @param teraAlto ( function , optional ) - ꞙɭı , ſɭэ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , */
export function vepaqPonton(
  qena: THREE.Scene,
  ax: number, az: number,
  bx: number, bz: number,
  sefini: number,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  deko: ( t: number ) => number,
  teraAlto?: ( x: number, z: number ) => number
): void {
  const dx = bx - ax, dz = bz - az;
  const sahakani = Math.hypot(dx, dz);
  if ( sahakani < 0o1/0o100 ) return;
  // ⟨ ſןw ſɭɔƽ , ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , 📏 ⟩ , j͐ʃƽɜ , ꞙɭı , ꞙɭı ,
  //   j͐ʃƽɜ , ꞙɭı , ⟅ j͐ʃƽɜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
  const pontaMaterialo = andezitaMaterialo.clone();
  if ( pontaMaterialo.map ) {
    pontaMaterialo.map = pontaMaterialo.map.clone();
    pontaMaterialo.map.channel = 1;
    pontaMaterialo.map.needsUpdate = true;
  }
  if ( pontaMaterialo.bumpMap ) {
    pontaMaterialo.bumpMap = pontaMaterialo.bumpMap.clone();
    pontaMaterialo.bumpMap.channel = 1;
    pontaMaterialo.bumpMap.needsUpdate = true;
  }
  const ndx = dx / sahakani, ndz = dz / sahakani;

  const p2somani = k6h6LarghoDuono( sefini );
  const fasadaSefini = Math.min(VOJA_BORDA_SEFINI, p2somani);
  const kernoDuono = p2somani - fasadaSefini;
  const havepat6ni = Math.max(PONT_SPECIMENOJ_MINIMUME,
    Math.min(PONT_SPECIMENOJ_MAKSIMUME,
      Math.round(sahakani * PONT_SPECIMENOJ_POR_METRO)));
  const supraAlto = ( t: number ): number => deko(t) - PONT_DEKA_DIKECO + 0o1/0o200;
  // ⟨ ſןw ſɭɔƽ , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const malsupraAlto = kf2PontanSubon(sahakani, supraAlto,
    teraAlto
      ? ( t: number ) => Math.min(supraAlto(t),
        teraAlto(ax + ndx * sahakani * t, az + ndz * sahakani * t) - PONT_TERA_PROFUNDECO)
      : undefined);
  const suboJe = ( s: number ): number => {
    const t = Math.max(0, Math.min(1, s / sahakani));
    let subo = malsupraAlto(t);
    if ( teraAlto && ( s < 0 || s > sahakani ) ) {
      const grundo = teraAlto(ax + ndx * s, az + ndz * s) - PONT_TERA_PROFUNDECO;
      subo = Math.min(subo, grundo);
    }
    return subo;
  };
  const kf2Profilon = ( teru: ( t: number ) => number ): THREE.Shape => {
    const s2qena = new THREE.Shape();
    s2qena.moveTo(-PONT_VOJA_SUPERPONO, suboJe(-PONT_VOJA_SUPERPONO));
    s2qena.lineTo(0, malsupraAlto(0));
    for ( let i = 1; i <= havepat6ni; i++ ) {
      const t = i / havepat6ni;
      s2qena.lineTo(sahakani * t, malsupraAlto(t));
    }
    s2qena.lineTo(sahakani + PONT_VOJA_SUPERPONO, suboJe(sahakani + PONT_VOJA_SUPERPONO));
    s2qena.lineTo(sahakani + PONT_VOJA_SUPERPONO, teru(1));
    s2qena.lineTo(sahakani, teru(1));
    for ( let i = havepat6ni - 1; i >= 0; i-- ) {
      const t = i / havepat6ni;
      s2qena.lineTo(sahakani * t, teru(t));
    }
    s2qena.lineTo(-PONT_VOJA_SUPERPONO, teru(0));
    s2qena.closePath();
    return s2qena;
  };
  const qoxa = kf2Profilon(supraAlto);

  const kf2LonganGeometrion = ( s2qena: THREE.Shape, sefini: number, ofseto: number ): THREE.ExtrudeGeometry => {
    const geometrio = new THREE.ExtrudeGeometry(s2qena, { depth: sefini, bevelEnabled: false });
    geometrio.rotateY(-Math.PI / 2);
    geometrio.translate(ofseto, 0, 0);
    return sax0baPukazQan2k(geometrio);
  };

  const hate = new THREE.Group();
  hate.position.set(ax, 0, az);
  hate.rotation.y = Math.atan2(dx, dz);
  if ( kernoDuono > 0o1/0o1000 ) {
    const geometrio = kf2LonganGeometrion(qoxa, kernoDuono * 2, kernoDuono);
    const maŝo = new THREE.Mesh(geometrio, pontaMaterialo);
    maŝo.castShadow = true;
    maŝo.receiveShadow = true;
    hate.add(maŝo);
  }

  // ⟨ ſןw ſɭɔƽ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
  const fasado = kf2Profilon(( t: number ) => deko(t) + 0o1/0o200);
  for ( const ofseto of [ p2somani, -kernoDuono ] ) {
    const fasadaGeometrio = kf2LonganGeometrion(fasado, fasadaSefini, ofseto);
    const fasadaMaŝo = new THREE.Mesh(fasadaGeometrio, pontaMaterialo);
    fasadaMaŝo.castShadow = true;
    fasadaMaŝo.receiveShadow = true;
    hate.add(fasadaMaŝo);
  }
  qena.add(hate);
}
