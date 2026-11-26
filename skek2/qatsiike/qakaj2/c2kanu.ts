// ≺⧼ ſɟɹƽ ꞁȷ̀ᴜ }ʃw 🌉 ⧽≻
import * as THREE from "three";
import { sax0baPukazQan2k } from "../../x2x2q/haqoxa.js";
import { K6H6ABORDASEFINI, K6H6ASEFINI, k6h6SefiniP2somani } from "../hak6h6/havecax2l.js";

// ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ 📏 ⟫
// ⟨ ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
export const PONTSEFINI = K6H6ASEFINI;

export const PONTFINAL6DA = PONTSEFINI;

// ⟨ ſɭᴜ ſɭ,w , ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ſᶘᴜ j͑ʃᴜ , ꞙɭı ⟅ 📃 ⟩
// ⟨ ꞙɭɔ , ꞙɭı 📏 ⟩ , ꞙɭı , ꞙɭɿ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɿ , ꞙɭı ,
//   ꞙɭı , ſɭᴜ ſɭ,w , ſɭэ ֭ſɭэ , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ⟅ 📃 ⟩
export const PONTKORPADIKECO = 0o6/0o10;

// ⟨ ſɭɜ ſɭ,w , ꞙɭı ⟅ ſɭᴜc̗ ɭʃɜ ſןᴜȝ ꞁȷ̀ᴜꞇ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
export const PONTTERAPROFUNDECO = 0o1/0o10;

// ⟨ ſɭэ ֭ſɭэ , ꞙɭı , ꞙɭɿ 📏 ⟩ , ſɭᴜ ſןᴜ , ꞙɭı , ꞙɭı , ꞙɭɔ
//   ꞙɭɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ , ꞙɭı , ⟅ 📃 ⟩
export const PONTK6H6AKMAERPONO = 0o1/0o2;

// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ſ͕ɭɜ ı],ᴜ , ⟅ 📃 ⟩
export const PONTFINAORDO = 0o1/0o5;

// ⟨ ꞙɭı , j͑ʃᴜ ſɭ,w ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
export const PONTFINAORDOMAKSO = 0o1/0o2;

// ⟨ ꞙɭı , ꞙɭı , ſןɔ˞ᴜƴ ⟅ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
const PONTHAPX01OPORMETRO = 0o4;
const PONTHAPX01OMINIMUME = 0o20;
const PONTHAPX01OMAKSIMUME = 0o200;

/* ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſןɔ˞ᴜƴ , ſɭɜ ſɭ,w , ꞙɭı ,
    @param sahakani ( number ) - ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param jufu ( number ) - ſɭɜ ſɭ,w , ꞙɭı , ꞙɭı ,
@returns ca1ara ( number ) - ꞙɭı , ꞙɭɿ ,
    ꞙɭı , ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭᴜ ſɭ,w ,
    ꞙɭı , ꞙɭɔ , ꞙɭı , ⟅ 📃 ⟩ */
export function pontaFinaOrdo( sahakani: number, jufu: number ): number {
  if ( sahakani <= 0o0 ) return PONTFINAORDOMAKSO;
  return Math.min(PONTFINAORDOMAKSO,
    Math.max(PONTFINAORDO, jufu / sahakani * 0o1/0o2));
}

/* ꞙɭı , ſɭэ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param sahakani ( number ) - ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı ,
    @param teru ( function ) - ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , t ( ɔ..ı )
    @param psaz ( function , optional ) - ꞙɭı , ſɭэ ſɭ,w , ꞙɭı , t
@returns maltik ( function ) - ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , t
    ꞙɭɿ , ꞙɭı , ꞙɭı , ꞙɭı , ſɭᴜ ſɭ,w , ⟅ 📃 ⟩ */
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
    // ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭɿ ⟅ ꞙɭı , ſȷƽᴜ ʃɔ , ſɭэ ֭ſɭэ , ⟅ 📃 ⟩
    const xaha = u * u * ( 0o3 - 0o2 * u );
    return teruo - ( l2ha + ( bando - l2ha ) * xaha );
  };
}


// ⟪ ſᶘᴜ j͑ʃᴜ , ꞙɭı 📏 ⟫
// ⟨ ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı ⟅ ꞙɭı , ꞙɭэ , ꞙɭı , ꞙɭɿ ,
//   ɭʃᴜ , ſᶘᴜ j͑ʃᴜ , ⟅ ꞙɭɔ , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭɔ , ſᶘᴜ j͑ʃᴜ , ⟅ 📃 ⟩
export const PONTAKVAKLARANCO = 0o2;

/* ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſɭэ ֭ſɭэ ,
    @param qena ( Scene ) - ɭʃɹ ʃᴜ }ʃw , ꞙɭı ,
    @param ax, az ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param bx, bz ( number ) - ꞙɭı , ſȷƽᴜ ʃɔ ,
    @param sefini ( number ) - ſɭэ ֭ſɭэ , ꞙɭı ,
    @param andezitaPukek ( MeshStandardMaterial ) - ſןw ſɭɔƽ ,
    @param deko ( function ) - ſɭɜ ſɭ,w , ſɭэ ֭ſɭэ ,
    @param t6limaL6da ( function , optional ) - ꞙɭı , ſɭэ ſɭ,w , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ꞙɭı , */
export function vepaqC2kanu(
  qena: THREE.Scene,
  ax: number, az: number,
  bx: number, bz: number,
  sefini: number,
  andezitaPukek: THREE.MeshStandardMaterial,
  deko: ( t: number ) => number,
  t6limaL6da?: ( x: number, z: number ) => number
): void {
  const dx = bx - ax, dz = bz - az;
  const sahakani = Math.hypot(dx, dz);
  if ( sahakani < 0o1/0o100 ) return;
  // ⟨ ſןw ſɭɔƽ , ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , 📏 ⟩ , j͐ʃƽɜ , ꞙɭı , ꞙɭı ,
  //   j͐ʃƽɜ , ꞙɭı , ⟅ j͐ʃƽɜ , ꞙɭı , ꞙɭı ,
  //   ꞙɭı , ꞙɭı , ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ⟅ 📃 ⟩
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
  // ⟨ ſןw ſɭɔƽ , ſȷƽᴜ ʃɔ , ꞙɭı , ꞙɭı , ⟅ 📃 ⟩
  const maltikL6da = kf2PontanSubon(sahakani, teruL6da,
    t6limaL6da
      ? ( t: number ) => Math.min(teruL6da(t),
        t6limaL6da(ax + ndx * sahakani * t, az + ndz * sahakani * t) - PONTTERAPROFUNDECO)
      : undefined);
  const suboJe = ( s: number ): number => {
    const t = Math.max(0o0, Math.min(0o1, s / sahakani));
    let psaz = maltikL6da(t);
    if ( t6limaL6da && ( s < 0o0 || s > sahakani ) ) {
      const t6lima = t6limaL6da(ax + ndx * s, az + ndz * s) - PONTTERAPROFUNDECO;
      psaz = Math.min(psaz, t6lima);
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
    const maŝo = new THREE.Mesh(zace, pontaPukek);
    maŝo.castShadow = true;
    maŝo.receiveShadow = true;
    hate2.add(maŝo);
  }

  // ⟨ ſןw ſɭɔƽ , ꞙɭı , ſɭэ ֭ſɭэ , ꞙɭı , ſȷƽᴜ ʃɔ , ꞙɭı , ⟅ 📃 ⟩
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
