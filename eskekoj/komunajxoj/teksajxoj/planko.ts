import * as THREE from "three";
import { ombro, ombraKoloro, helo } from "../koloroj.js";
import { kf2SakxoKlasika } from "../hazardo.js";
import { desegniFluanStrekon, molaStelaVojo } from "./helpiloj.js";

export function generiPlankanTeksajxon(bazaKoloro: number, akcentaKoloro: number, semo: number): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = 0o2000;
  const kunteksto = kanvasa.getContext("2d")!;
  const radio = kanvasa.width / 0o2;
  const hazardo = kf2SakxoKlasika(semo);
  const folia = hazardo() < 0o1/0o2;
  const fazo = hazardo() < 0o1/0o2 ? 0o0 : Math.PI / 0o4;
  const spegulo = hazardo() < 0o1/0o2 ? -0o1 : 0o1;
  const centraSkalo = 0o30/0o100 + hazardo() / 0o40;
  const dikeco = radio / 0o40;
  kunteksto.fillStyle = ombro(bazaKoloro, 0o0);
  kunteksto.fillRect(0o0, 0o0, kanvasa.width, kanvasa.height);
  kunteksto.translate(radio, radio);
  kunteksto.lineCap = "round";
  kunteksto.lineJoin = "round";

  kunteksto.save();
  kunteksto.rotate(fazo);
  for ( const [ skalo, koloro ] of [
    [ centraSkalo, ombro(akcentaKoloro, 0o0) ],
    [ centraSkalo * 0o5/0o10, ombro(akcentaKoloro, 0o1) ],
  ] as const ) {
    kunteksto.fillStyle = koloro;
    kunteksto.fill(molaStelaVojo(0o0, 0o0, radio * skalo, radio * skalo));
  }
  kunteksto.restore();

  const streko = ( punktoj: [ number, number ][], koloro: number, largho = dikeco ): void => {
    desegniFluanStrekon(kunteksto, punktoj.map(( [ x, y ] ) => [ x * radio, y * radio ]), koloro, largho);
  };
  for ( let flanko = 0o0; flanko < 0o4; flanko++ ) {
    kunteksto.save();
    kunteksto.rotate(flanko * Math.PI / 0o2);
    kunteksto.scale(spegulo, 0o1);

    streko([
      [ -0o36/0o100, -0o6/0o100 ], [ -0o6/0o100, -0o6/0o100 ],
      [ -0o6/0o100, -0o36/0o100 ], [ 0o0, -0o36/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1));
    streko([
      [ 0o0, -0o36/0o100 ], [ 0o6/0o100, -0o36/0o100 ],
      [ 0o6/0o100, -0o6/0o100 ], [ 0o36/0o100, -0o6/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1));

    for ( const direkto of [ -0o1, 0o1 ] ) {
      streko([
        [ direkto * 0o36/0o100, -0o30/0o100 ], [ direkto * 0o26/0o100, -0o32/0o100 ],
        [ direkto * 0o22/0o100, -0o42/0o100 ], [ direkto * 0o22/0o100, -0o46/0o100 ],
      ], ombraKoloro(bazaKoloro, 0o1), dikeco * 0o3/0o4);
      streko([
        [ direkto * 0o30/0o100, -0o50/0o100 ], [ direkto * 0o32/0o100, -0o56/0o100 ],
        [ direkto * 0o26/0o100, -0o66/0o100 ], [ direkto * 0o26/0o100, -0o70/0o100 ],
      ], ombraKoloro(akcentaKoloro, 0o2), dikeco * 0o3/0o4);
    }

    const petalo = new Path2D();
    petalo.moveTo(0o0, -radio * 0o52/0o100);
    petalo.bezierCurveTo(-radio * 0o20/0o100, -radio * 0o62/0o100,
      -radio * 0o20/0o100, -radio * 0o72/0o100, 0o0, -radio * 0o72/0o100);
    petalo.bezierCurveTo(radio * 0o20/0o100, -radio * 0o72/0o100,
      radio * 0o20/0o100, -radio * 0o62/0o100, 0o0, -radio * 0o52/0o100);
    petalo.closePath();
    kunteksto.strokeStyle = ombro(akcentaKoloro, 0o2);
    kunteksto.lineWidth = dikeco;
    kunteksto.stroke(petalo);
    streko([
      [ -0o4/0o100, -0o64/0o100 ], [ -0o4/0o100, -0o62/0o100 ],
      [ -0o2/0o100, -0o60/0o100 ], [ 0o0, -0o60/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1), dikeco * 0o3/0o4);
    streko([
      [ 0o0, -0o60/0o100 ], [ 0o2/0o100, -0o60/0o100 ],
      [ 0o4/0o100, -0o62/0o100 ], [ 0o4/0o100, -0o64/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1), dikeco * 0o3/0o4);

    kunteksto.save();
    kunteksto.translate(radio * 0o42/0o100, -radio * 0o42/0o100);
    kunteksto.rotate(-Math.PI / 0o4);
    const folio = new Path2D();
    const duono = radio * 0o6/0o100, longo = radio * 0o14/0o100;
    folio.moveTo(0o0, -longo);
    folio.bezierCurveTo(duono, -longo, duono * 0o2, longo / 0o2, 0o0, longo);
    folio.bezierCurveTo(-duono * 0o2, longo / 0o2, -duono, -longo, 0o0, -longo);
    folio.closePath();
    kunteksto.strokeStyle = ombro(akcentaKoloro, 0o2);
    kunteksto.lineWidth = dikeco;
    if ( folia ) {
      kunteksto.fillStyle = ombro(bazaKoloro, 0o1);
      kunteksto.fill(folio);
    }
    kunteksto.stroke(folio);
    desegniFluanStrekon(kunteksto, [
      [ 0o0, -longo / 0o2 ], [ duono / 0o2, -longo / 0o4 ],
      [ duono / 0o2, longo / 0o4 ], [ 0o0, longo / 0o2 ],
    ], ombraKoloro(akcentaKoloro, 0o1), dikeco * 0o3/0o4);
    kunteksto.restore();

    for ( let nivelo = 0o0; nivelo < 0o2; nivelo++ ) {
      const sxovo = nivelo * 0o6/0o100;
      streko([
        [ 0o42/0o100, -0o76/0o100 - sxovo ], [ 0o60/0o100, -0o76/0o100 - sxovo ],
        [ 0o76/0o100 + sxovo, -0o60/0o100 ], [ 0o76/0o100 + sxovo, -0o42/0o100 ],
      ], ombraKoloro(bazaKoloro, nivelo === 0o0 ? 0o1 : 0o0), dikeco * 0o3/0o4);
    }
    kunteksto.strokeStyle = helo(bazaKoloro, 0o1);
    kunteksto.lineWidth = dikeco * 0o3/0o4;
    kunteksto.beginPath();
    kunteksto.moveTo(radio * 0o60/0o100, -radio * 0o76/0o100);
    kunteksto.quadraticCurveTo(radio * 0o74/0o100, -radio * 0o74/0o100, radio * 0o76/0o100, -radio * 0o60/0o100);
    kunteksto.stroke();
    kunteksto.restore();
  }

  const teksajxo = new THREE.CanvasTexture(kanvasa);
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.anisotropy = 0o10;
  return teksajxo;
}
