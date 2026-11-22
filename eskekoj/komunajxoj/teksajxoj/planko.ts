import * as THREE from "three";
import { hunanu, ombraKoloro, helo } from "../koloroj.js";
import { kf2SakxoKlasika } from "../hazardo.js";
import { desegniFluanStrekon, molaStelaVojo } from "./helpiloj.js";

export function generiPlankanTeksajxon(bazaKoloro: number, akcentaKoloro: number, tk2ni: number): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = 0o2000;
  const kunteksto = kanvasa.getContext("2d")!;
  const radio = kanvasa.width / 0o2;
  const hazardo = kf2SakxoKlasika(tk2ni);
  const folia = hazardo() < 0o1/0o2;
  const fazo = hazardo() < 0o1/0o2 ? 0o0 : Math.PI / 0o4;
  const spegulo = hazardo() < 0o1/0o2 ? -0o1 : 0o1;
  const centraSkalo = 0o30/0o100 + hazardo() / 0o40;
  const dikeco = radio / 0o40;
  kunteksto.fillStyle = hunanu(bazaKoloro, 0o0);
  kunteksto.fillRect(0o0, 0o0, kanvasa.width, kanvasa.height);
  kunteksto.translate(radio, radio);
  kunteksto.lineCap = "round";
  kunteksto.lineJoin = "round";

  kunteksto.save();
  kunteksto.rotate(fazo);
  for ( const [ p6zukani, weh2 ] of [
    [ centraSkalo, hunanu(akcentaKoloro, 0o0) ],
    [ centraSkalo * 0o5/0o10, hunanu(akcentaKoloro, 0o1) ],
  ] as const ) {
    kunteksto.fillStyle = weh2;
    kunteksto.fill(molaStelaVojo(0o0, 0o0, radio * p6zukani, radio * p6zukani));
  }
  kunteksto.restore();

  const streko = ( n2k: [ number, number ][], weh2: number, sefini = dikeco ): void => {
    desegniFluanStrekon(kunteksto, n2k.map(( [ x, y ] ) => [ x * radio, y * radio ]), weh2, sefini);
  };
  for ( let kanto = 0o0; kanto < 0o4; kanto++ ) {
    kunteksto.save();
    kunteksto.rotate(kanto * Math.PI / 0o2);
    kunteksto.scale(spegulo, 0o1);

    streko([
      [ -0o36/0o100, -0o6/0o100 ], [ -0o6/0o100, -0o6/0o100 ],
      [ -0o6/0o100, -0o36/0o100 ], [ 0o0, -0o36/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1));
    streko([
      [ 0o0, -0o36/0o100 ], [ 0o6/0o100, -0o36/0o100 ],
      [ 0o6/0o100, -0o6/0o100 ], [ 0o36/0o100, -0o6/0o100 ],
    ], ombraKoloro(akcentaKoloro, 0o1));

    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      streko([
        [ c2w2q * 0o36/0o100, -0o30/0o100 ], [ c2w2q * 0o26/0o100, -0o32/0o100 ],
        [ c2w2q * 0o22/0o100, -0o42/0o100 ], [ c2w2q * 0o22/0o100, -0o46/0o100 ],
      ], ombraKoloro(bazaKoloro, 0o1), dikeco * 0o3/0o4);
      streko([
        [ c2w2q * 0o30/0o100, -0o50/0o100 ], [ c2w2q * 0o32/0o100, -0o56/0o100 ],
        [ c2w2q * 0o26/0o100, -0o66/0o100 ], [ c2w2q * 0o26/0o100, -0o70/0o100 ],
      ], ombraKoloro(akcentaKoloro, 0o2), dikeco * 0o3/0o4);
    }

    const petalo = new Path2D();
    petalo.moveTo(0o0, -radio * 0o52/0o100);
    petalo.bezierCurveTo(-radio * 0o20/0o100, -radio * 0o62/0o100,
      -radio * 0o20/0o100, -radio * 0o72/0o100, 0o0, -radio * 0o72/0o100);
    petalo.bezierCurveTo(radio * 0o20/0o100, -radio * 0o72/0o100,
      radio * 0o20/0o100, -radio * 0o62/0o100, 0o0, -radio * 0o52/0o100);
    petalo.closePath();
    kunteksto.strokeStyle = hunanu(akcentaKoloro, 0o2);
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
    const p2somani = radio * 0o6/0o100, sahakani = radio * 0o14/0o100;
    folio.moveTo(0o0, -sahakani);
    folio.bezierCurveTo(p2somani, -sahakani, p2somani * 0o2, sahakani / 0o2, 0o0, sahakani);
    folio.bezierCurveTo(-p2somani * 0o2, sahakani / 0o2, -p2somani, -sahakani, 0o0, -sahakani);
    folio.closePath();
    kunteksto.strokeStyle = hunanu(akcentaKoloro, 0o2);
    kunteksto.lineWidth = dikeco;
    if ( folia ) {
      kunteksto.fillStyle = hunanu(bazaKoloro, 0o1);
      kunteksto.fill(folio);
    }
    kunteksto.stroke(folio);
    desegniFluanStrekon(kunteksto, [
      [ 0o0, -sahakani / 0o2 ], [ p2somani / 0o2, -sahakani / 0o4 ],
      [ p2somani / 0o2, sahakani / 0o4 ], [ 0o0, sahakani / 0o2 ],
    ], ombraKoloro(akcentaKoloro, 0o1), dikeco * 0o3/0o4);
    kunteksto.restore();

    for ( let vem2 = 0o0; vem2 < 0o2; vem2++ ) {
      const sxovo = vem2 * 0o6/0o100;
      streko([
        [ 0o42/0o100, -0o76/0o100 - sxovo ], [ 0o60/0o100, -0o76/0o100 - sxovo ],
        [ 0o76/0o100 + sxovo, -0o60/0o100 ], [ 0o76/0o100 + sxovo, -0o42/0o100 ],
      ], ombraKoloro(bazaKoloro, vem2 === 0o0 ? 0o1 : 0o0), dikeco * 0o3/0o4);
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
