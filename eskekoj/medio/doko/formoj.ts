// ≺⧼ La dokaj formoj 📐 ⧽≻
// La Shape-oj de la doka platformo — la ronda antaŭa formo ( kreiDokanFormon ),
// la andezita kadro kun la platforma truo ( kreiDokanEksteranFormon ) kaj la
// ekstrudita kadro ( kreiDokanKadron ).
import * as THREE from "three";

// La dokan formon. Rektangulo kun rondigitaj antaŭaj anguloj ( la akva pinto ).
// La bordo-flanko restas rekta. Kontraŭhorloĝa volvaĵo tenas la supran facon
// supren post la -90° X-rotacio ( sama konvencio kiel la vojoj ).
export function kreiDokanFormon(w: number, l: number, r: number): THREE.Shape {
  const formo = new THREE.Shape();
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r, duonW, duonL / 2));
  // Antaŭa flanko (Y = +duonL) estas la akva pinto — nur ĝiaj anguloj rondiĝas.
  formo.moveTo(-duonW, -duonL);
  formo.lineTo(duonW, -duonL);
  formo.lineTo(duonW, duonL - rad);
  formo.absarc(duonW - rad, duonL - rad, rad, 0, Math.PI / 2, false);
  formo.lineTo(-duonW + rad, duonL);
  formo.absarc(-duonW + rad, duonL - rad, rad, Math.PI / 2, Math.PI, false);
  formo.lineTo(-duonW, -duonL);
  formo.closePath();
  return formo;
}

// kreiDokanEksteranFormon — La EKSTERA konturo de la doka plano: la platforma
// formo ( w × l, kun la rondigita akva pinto ) plus la kadra strio ĉirkaŭe. La
// landa rando restas ĉe -duonL, do la kadro ne strias super la vojo kiu alvenas
// al la doko. La formo havas la saman larĝon kaj la saman rondigitan pinton kiel
// la interna ( samcentraj arkoj kun konstanta strio ), sed ĝia landa rando kuŝas
// je la INTERNA pozicio — la du konturoj tuŝiĝas precize tie, kaj Earcut tranĉas
// la nulan bendon pura ( neniu triangulo kun nul areo ).
// ⟨ Unu konturo, du uzoj 📃 ⟩ — la andezita kadro ( kun truo por la platformo )
// kaj la PLENA subkonstruo sub la platformo uzas ĝin ambaŭ, do la du ne povas
// disiriĝi: la flankaj facoj de la plenaĵo kuŝas en la ebeno de la ekstera rando
// de la kadro.
export function kreiDokanEksteranFormon(w: number, l: number, r: number, strio: number): THREE.Shape {
  const duonW = w / 2, duonL = l / 2;
  const rad = Math.max(0, Math.min(r + strio, duonW + strio, ( duonL + strio ) / 2));
  const landa = -duonL;
  const ekstera = new THREE.Shape();
  ekstera.moveTo(-duonW - strio, landa);
  ekstera.lineTo(duonW + strio, landa);
  ekstera.lineTo(duonW + strio, duonL + strio - rad);
  ekstera.absarc(duonW + strio - rad, duonL + strio - rad, rad, 0, Math.PI / 2, false);
  ekstera.lineTo(-duonW - strio + rad, duonL + strio);
  ekstera.absarc(-duonW - strio + rad, duonL + strio - rad, rad, Math.PI / 2, Math.PI, false);
  ekstera.lineTo(-duonW - strio, landa);
  ekstera.closePath();
  return ekstera;
}

// Andezita kadro kroĉita al la platforma rando — U-forma, MALFERMA sur la landa
// flanko ( la konturo de kreiDokanEksteranFormon kun truo por la platformo ).
export function kreiDokanKadron(w: number, l: number, r: number, strio: number, dikeco: number): THREE.BufferGeometry {
  const ekstera = kreiDokanEksteranFormon(w, l, r, strio);
  const truo = new THREE.Path();
  // Truo kontraŭhorloĝa — kontraŭa volvaĵo al la ekstera formo.
  truo.setFromPoints(kreiDokanFormon(w, l, r).getPoints().reverse());
  ekstera.holes.push(truo);
  const geometrio = new THREE.ExtrudeGeometry(ekstera, { depth: dikeco, bevelEnabled: false });
  geometrio.rotateX(-Math.PI / 2);
  return geometrio;
}
