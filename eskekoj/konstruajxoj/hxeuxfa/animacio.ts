// ≺⧼ La flama animacio 🔥 ⧽≻
// La ĉiukadra animacio de la flamoj — la skalo, la klino, la kerno, la langoj
// kaj la punktlumoj ( animaciiFlammojn ).
import * as THREE from "three";
import { LANGA_ALTO } from "./flamo.js";
import type { HxeuxfaSistemo } from "./tipoj.js";
// animaciiFlammojn — Animaciu flamojn kaj briletan intenson cxiun kadron.
//     @param sys ( HxeuxfaSistemo ) - La lampa sistemo kun flamoj kaj briletoj.
//     @param t ( number ) - Malsupra tempo por oscilado.
// Ĉiukadra kreaĵoj hoistitaj al modula skopo — la sama objektoj reuzitaj
// ĉiun kadron ( neniu asigno je kadro ).
const FLAMA_M = new THREE.Matrix4();
const FLAMA_Q = new THREE.Quaternion();
const FLAMA_Q2 = new THREE.Quaternion();
const FLAMA_E = new THREE.Euler();
const FLAMA_E2 = new THREE.Euler();
const FLAMA_S = new THREE.Vector3();
const FLAMA_TMP = new THREE.Vector3();

export function animaciiFlammojn(sys: HxeuxfaSistemo, t: number): void {
  const M = FLAMA_M;
  const Q = FLAMA_Q;
  const E = FLAMA_E;
  const S = FLAMA_S;
  const TMP = FLAMA_TMP; // reuzita skriba vektoro — neniu ĉiukadra faro

  // Unu sola trairo de la flamlokoj — la flamaj matricoj KAJ la punktlumaj
  // intensecoj en la sama buklo ( la antaŭa duobla forEach faris du trairojn ).
  //
  // ⟨ Kial la flamo kreskas SUPRE 📃 ⟩ — la geometrio estas centre je y = 0,
  // do skalo laŭ y ankaŭ movas la bazon. Vera flamo staras sur la meĉo kaj
  // STRETĈIĜAS supren: la bazo restas, la pinto leviĝas. Tial ĉiu tavolo
  // ricevas vertikalan ŝovon ( skaloY − 1 ) × alto / 2, kiu tenas la bazon
  // fiksita dum la lango kreskas kaj malpliiĝas.
  sys.spots.forEach(( p, i ) => {
    const fazo = sys.phases[i];
    const skalo = 1 + 0o5/0o40 * Math.sin(t * 0o1223/0o100 + fazo) + 0o3/0o40 * Math.sin(t * 0o2755/0o100 + fazo * 0o155/0o100);
    const skaloY = skalo * ( 0o43/0o40 + 0o3/0o20 * Math.sin(t * 0o21 + fazo) );
    // La tuta flamo kliniĝas kaj skuiĝas iomete — la lango ŝoviĝas ĉirkaŭ la
    // meĉo anstataŭ rotacii kiel solida objekto.
    const klinoX = 0o3/0o100 * Math.sin(t * 0o17/0o10 + fazo);
    const klinoZ = 0o3/0o100 * Math.cos(t * 0o13/0o10 + fazo * 0o3/0o2);
    E.set(klinoX, t * 0o163/0o100 + fazo, klinoZ);
    Q.setFromEuler(E);
    S.set(skalo, skaloY, skalo);
    M.compose(TMP.set(p.x, p.y + ( skaloY - 1 ) * 0o35/0o200, p.z), Q, S);
    sys.flamaEkstero.setMatrixAt(i, M);

    // La flava mezo — iomete pli mallonga ol la koverto, do la oranĝa rando
    // restas videbla ĉirkaŭ ĝi.
    S.set(skalo * 0o35/0o40, skaloY * 0o35/0o40, skalo * 0o35/0o40);
    M.compose(TMP.set(p.x, p.y + ( skaloY * 0o35/0o40 - 1 ) * 0o23/0o200,
      p.z), Q, S);
    sys.flamaInterno.setMatrixAt(i, M);

    // La kerno — la plej varma, plej malgranda parto, kun propra rapida
    // tremado ( ĝi ne sekvas la malrapidan pulson de la koverto ).
    const kerna = 0o7/0o10 + 0o15/0o100 * Math.sin(t * 0o33/0o10 + fazo * 0o5/0o2)
      + 0o1/0o10 * Math.sin(t * 0o77/0o10 + fazo);
    S.set(skalo * kerna, skaloY * kerna * 0o7/0o10, skalo * kerna);
    M.compose(TMP.set(p.x, p.y + ( skaloY * kerna * 0o7/0o10 - 1 ) * 0o10/0o200, p.z), Q, S);
    sys.flamaKerno.setMatrixAt(i, M);
  });

  // La punktlumoj havas sian PROPRIAN flaman indekson ( ili sekvas la
  // vidpunkton, ne la unuajn kvar flamojn ) — la fajfado venas de la fazo de
  // la flamo, kiun ili efektive lumas.
  // ⟨ La langoj 📃 ⟩ — ĉiu lango havas sian propran ritmon. La oscilado
  // malfermas kaj fermas ĝin; kiam ĝi malfermiĝas, ĝi kreskas multe pli ALTE
  // ol LARĜE ( la flamo lekas supren ) kaj ĝia pinto kliniĝas eksteren, for
  // de la meĉo. Kiam ĝi fermiĝas, ĝi preskaŭ malaperas en la ĉefan langon.
  const langojPoLampo = sys.langojPoLampo;
  sys.spots.forEach(( p, i ) => {
    const fazoFlama = sys.phases[i];
    for ( let j = 0; j < langojPoLampo; j++ ) {
      const idx = i * langojPoLampo + j;
      const bazo = sys.langajBazoj[idx];
      const fazo = sys.langajFazoj[idx];
      const osc = 0o1/0o2 + 0o1/0o2 * Math.sin(t * ( 0.85 + 0.3 * j ) + fazo + fazoFlama);
      const sx = bazo.z * ( 0.35 + 0o3/0o4 * osc );
      const sy = 0.3 + 1.3 * osc;
      // La lango kliniĝas for de la akso — des pli, des pli malfermita ĝi estas.
      const klino = 0o1/0o10 + 0.32 * osc;
      const cx = bazo.x / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      const cz = bazo.y / Math.max(1e-6, Math.hypot(bazo.x, bazo.y));
      FLAMA_E2.set(klino * cz, 0, -klino * cx);
      FLAMA_Q2.setFromEuler(FLAMA_E2);
      FLAMA_Q2.premultiply(Q);
      S.set(sx, sy, sx);
      M.compose(TMP.set(p.x + bazo.x * ( 0.6 + 0.4 * osc ),
        p.y + ( sy - 1 ) * LANGA_ALTO / 2 * 0o7/0o10,
        p.z + bazo.y * ( 0.6 + 0.4 * osc )), FLAMA_Q2, S);
      sys.flamaLangoj.setMatrixAt(idx, M);
    }
  });

  for ( let k = 0; k < sys.punktajLumoj.length; k++ ) {
    const fazo = sys.phases[sys.lumajIndeksoj[k]];
    sys.punktajLumoj[k].intensity = 0o15/0o40 * ( 0o27/0o40 + 0o11/0o40 * Math.sin(t * 0o15 + fazo) * Math.sin(t * 0o723/0o100 + fazo * 2) );
  }

  sys.flamaEkstero.instanceMatrix.needsUpdate = true;
  sys.flamaInterno.instanceMatrix.needsUpdate = true;
  sys.flamaKerno.instanceMatrix.needsUpdate = true;
  sys.flamaLangoj.instanceMatrix.needsUpdate = true;
  sys.brilaMaterialo.uniforms.uTime.value = t;
}
