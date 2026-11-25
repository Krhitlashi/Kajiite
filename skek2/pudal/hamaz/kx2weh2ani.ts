// ≺⧼ ſɟᴜ j͑ʃᴜ ɭʃɹ , j͑ʃɜȝ ɭʃɔ 🖌️ ⧽≻
import * as THREE from "three";
import { weh2Ruva, hunanu, tsije, hunanuWeh2 } from "../../x2x2q/haweh2.js";
import { k2fFluanStrekon, baz2SexiaK6h6 } from "../../x2x2q/cac2sex/mafezi.js";
import { ausexi, type Soqte } from "../../hasoqte/hasoqte.js";
import { volviX, sxtofon, faldo, stebo, bordiKkaxten, c2qRombo } from "./p2t6zo.js";
import { h6w6aP2somani } from "./h6w6.js";

const vestaCac2sexStoko = new Map<string, THREE.CanvasTexture>();
const vestaCac2sexCatlaq = ( o: Soqte, pudal: string ): string =>
  o.ksaka + "|" + o.soqteWeh2 + "|" + o.tokhaxesai + "|" + o.c2h2 + "|" + o.nascete + "|" + pudal;
// ⟪ ſɟᴜ j͑ʃᴜ ɭʃɹ , j͑ʃɜȝ ɭʃɔ 🖌️ ⟫

// ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
function pentriEksteran(k: CanvasRenderingContext2D, o: Soqte): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.soqteWeh2, A = o.tokhaxesai, I = o.c2h2;
  const Mx = weh2Ruva(M), Ax = weh2Ruva(A), Ix = weh2Ruva(I);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);

  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  faldo(k, 0o40, 0o24, M, 0o1, 0o3/0o10);
  faldo(k, 0o124, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o254, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, M, 0o1, 0o3/0o10);

  // ⟨ ſ͕ɭɜ ı],ᴜ , ſɭэ ɭʃᴜ , ⟅ ⟩
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ ſɭᴜ ʃןᴜ , ꞙɭı , ⟅ ⟩
  const flankajStrekoj: [ number, number, number ][] = [
    [ 0o0, hunanuWeh2(M, 0o1), 0o6 ],
    [ 0o10, hunanuWeh2(A, 0o1), 0o4 ],
    [ 0o20, hunanuWeh2(M, 0o2), 0o3 ],
  ];
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    for ( const [ woha, weh2, kof ] of flankajStrekoj ) {
      k2fFluanStrekon(k, [
        [ 0o200 + c2w2q * ( 0o60 + woha ), 0o134 + woha ],
        [ 0o200 + c2w2q * ( 0o114 + woha ), 0o170 ],
        [ 0o200 + c2w2q * ( 0o110 + woha ), 0o270 ],
        [ 0o200 + c2w2q * ( 0o70 + woha ), 0o334 - woha ],
      ], weh2, kof);
      k2fFluanStrekon(k, [
        [ 0o200 + c2w2q * ( 0o70 + woha ), 0o354 + woha ],
        [ 0o200 + c2w2q * ( 0o134 + woha / 0o2 ), 0o430 ],
        [ 0o200 + c2w2q * ( 0o130 + woha / 0o2 ), 0o620 ],
        [ 0o200 + c2w2q * ( 0o100 + woha ), 0o720 - woha ],
      ], weh2, kof);
    }
  }

  // ⟨ ɭʃᴜ , ⟅ ⟩
  const KOLUMOL6DA = 0o24;
  k.fillStyle = hunanu(M, 0o1);
  k.fillRect(0, 0, w, KOLUMOL6DA);
  k.fillStyle = tsije(M, 0o1);
  k.fillRect(0, 0o4, w, 0o12);
  stebo(k, [ [ 0, KOLUMOL6DA ], [ w, KOLUMOL6DA ] ], hunanu(M, 0o2), 0o1);

  // ⟨ ɭʃэ ſɭɔȝ , ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const hahunanu: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  const bordoj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  for ( let y = KOLUMOL6DA; y <= h; y += 0o4 ) {
    const p2somani = h6w6aP2somani(0o1 - y / h) * w;
    hahunanu[0].push([ 0o200 + p2somani + 0o6, y ]);
    hahunanu[1].push([ 0o200 - p2somani - 0o6, y ]);
    bordoj[0].push([ 0o200 + p2somani + 0o1, y ]);
    bordoj[1].push([ 0o200 - p2somani - 0o1, y ]);
  }
  bordiKkaxten(k, hahunanu[0], hunanu(M, 0o1, 0o5/0o10), 0o2);
  bordiKkaxten(k, hahunanu[1], hunanu(M, 0o1, 0o5/0o10), 0o2);
  // ⟨ ꞙɭı , ⟅ ⟩
  bordiKkaxten(k, bordoj[0], Ax, 0o4);
  bordiKkaxten(k, bordoj[1], Ax, 0o4);

  // ⟨ j͑ʃᴜ ʃɜ , ꞙɭɔ , ⟅ ⟩
  const cah6k6 = ( x: number, y: number, r: number ) => {
    ausexi(k, x, y, r + 0o11, Ax);
    ausexi(k, x, y, r + 0o5, Mx);
    ausexi(k, x, y, r + 0o4, Ax);
    ausexi(k, x, y, r, Ix);
  };
  cah6k6(0o200 - 0o50, 0o250, 0o16);
  cah6k6(0o200 + 0o50, 0o250, 0o16);
  cah6k6(0o200 - 0o50, 0o540, 0o13);
  cah6k6(0o200 + 0o50, 0o540, 0o13);

  // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ ⟩
  ausexi(k, 0o200, 0o120, 0o36, Ax);
  ausexi(k, 0o200, 0o120, 0o14, Ix);
  for ( const sx of [ -0o1, 0o1 ] ) for ( const sy of [ -0o1, 0o1 ] ) {
    const ax = 0o200 + sx * 0o30, ay = 0o120 + sy * 0o30;
    k.strokeStyle = hunanu(A, 0o1, 0o7/0o10);
    k.lineWidth = 0o3;
    k.beginPath();
    k.moveTo(ax, ay);
    k.quadraticCurveTo(0o200 + sx * 0o21, ay, 0o200 + sx * 0o17, 0o120 + sy * 0o36);
    k.moveTo(ax, ay);
    k.quadraticCurveTo(ax, 0o120 + sy * 0o21, 0o200 + sx * 0o32, 0o120 + sy * 0o17);
    k.stroke();
  }
  const eĥaj: [ number, number, number ][] = [
    [ 0o1,        0o3, hunanuWeh2(M, 0o2) ],
    [ 0o7/0o10,   0o4, hunanuWeh2(A, 0o1) ],
    [ 0o44/0o100, 0o2, hunanuWeh2(M, 0o3) ],
  ];
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    const kozunuY = 0o120 + c2w2q * 0o42;
    for ( const [ p6zukani, kof, weh2 ] of eĥaj ) {
      const p2somani = 0o34 * p6zukani, l6da = 0o24 * p6zukani;
      k2fFluanStrekon(k, [
        [ 0o200 - p2somani, kozunuY ],
        [ 0o200 - p2somani / 0o2, kozunuY + c2w2q * l6da * 0o13/0o10 ],
        [ 0o200 + p2somani / 0o2, kozunuY + c2w2q * l6da * 0o13/0o10 ],
        [ 0o200 + p2somani, kozunuY ],
      ], weh2, kof);
    }
  }

  // ⟨ ɭʃэ ſɭɔȝ , ꞙɭı , ⟅ ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ V , ɭʃᴜ , ⟅ ⟩
  volviX(k, () => {
    k2fFluanStrekon(k, [
      [ -0o37, 0o70 ], [ -0o34, 0o230 ], [ 0o34, 0o230 ], [ 0o37, 0o70 ],
    ], A, 0o6);
    k2fFluanStrekon(k, [
      [ -0o27, 0o64 ], [ -0o24, 0o174 ], [ 0o24, 0o174 ], [ 0o27, 0o64 ],
    ], hunanuWeh2(M, 0o2), 0o2);
  });
  // ⟨ j͑ʃᴜ ʃɜ , ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ c2w2q * 0o64, 0o70 ], [ c2w2q * 0o72, 0o142 ],
        [ c2w2q * 0o46, 0o142 ], [ c2w2q * 0o54, 0o70 ],
      ], hunanuWeh2(M, 0o2), 0o3);
    }
  });
  // ⟨ ſɭᶗ‹ɜ , ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ 0o0, 0o226 ], [ c2w2q * 0o34, 0o270 ],
        [ c2w2q * 0o50, 0o374 ], [ c2w2q * 0o50, 0o444 ],
      ], hunanuWeh2(M, 0o2), 0o3);
      k2fFluanStrekon(k, [
        [ c2w2q * 0o50, 0o444 ], [ c2w2q * 0o50, 0o510 ],
        [ c2w2q * 0o26, 0o544 ], [ c2w2q * 0o21, 0o570 ],
      ], A, 0o6);
      k2fFluanStrekon(k, [
        [ c2w2q * 0o14, 0o236 ], [ c2w2q * 0o52, 0o270 ],
        [ c2w2q * 0o64, 0o342 ], [ c2w2q * 0o60, 0o400 ],
      ], hunanuWeh2(M, 0o1), 0o2);
      k2fFluanStrekon(k, [
        [ c2w2q * 0o62, 0o474 ], [ c2w2q * 0o64, 0o540 ],
        [ c2w2q * 0o44, 0o604 ], [ c2w2q * 0o30, 0o624 ],
      ], hunanuWeh2(M, 0o2), 0o2);
    }
  });
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const y of [ 0o260, 0o520 ] ) {
        k.save();
        k.translate(c2w2q * 0o40, y);
        k.rotate(c2w2q * Math.PI / 0o10);
        const slaf = new Path2D();
        slaf.moveTo(0o0, -0o14);
        slaf.bezierCurveTo(0o6, -0o14, 0o14, 0o6, 0o0, 0o14);
        slaf.bezierCurveTo(-0o14, 0o6, -0o6, -0o14, 0o0, -0o14);
        slaf.closePath();
        k.strokeStyle = hunanu(A, 0o1);
        k.lineWidth = 0o3;
        k.stroke(slaf);
        k2fFluanStrekon(k, [
          [ 0o0, -0o6 ], [ 0o3, -0o2 ], [ 0o3, 0o2 ], [ 0o0, 0o6 ],
        ], hunanuWeh2(M, 0o1), 0o3);
        k.restore();
      }
    }
  });

  // ⟨ }ʃɹƽ , ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    k.fillStyle = Ax;
    k.fill(baz2SexiaK6h6(0o0, 0o370, 0o21, 0o100));
    k.fillStyle = Mx;
    k.fill(baz2SexiaK6h6(0o0, 0o370, 0o6, 0o30));
  });
  // ⟨ ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    k2fFluanStrekon(k, [
      [ -0o17, 0o660 ], [ -0o14, 0o560 ], [ 0o14, 0o560 ], [ 0o17, 0o660 ],
    ], A, 0o6);
    k2fFluanStrekon(k, [
      [ -0o10, 0o700 ], [ -0o6, 0o622 ], [ 0o6, 0o622 ], [ 0o10, 0o700 ],
    ], hunanuWeh2(M, 0o2), 0o2);
  });

  // ⟨ ɭʃэ ſɭɔȝ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , 🖌️ ⟩
  // ⟨ ſȷƽᴜ ʃɔ , ⟅ ⟩
  const dorsWohaj: [ number, number, number, number, number ][] = [
    [ 0o54, 0o70,  0o30, 0o2, hunanuWeh2(M, 0o2) ],
    [ 0o62, 0o104, 0o42, 0o3, hunanuWeh2(A, 0o1) ],
    [ 0o72, 0o114, 0o52, 0o2, hunanuWeh2(M, 0o1) ],
  ];
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const [ ena, p6sca, duonl6da, kof, weh2 ] of dorsWohaj ) {
        k2fFluanStrekon(k, [
          [ c2w2q * ena, 0o444 - duonl6da ],
          [ c2w2q * p6sca, 0o444 - duonl6da / 0o2 ],
          [ c2w2q * p6sca, 0o444 + duonl6da / 0o2 ],
          [ c2w2q * ena, 0o444 + duonl6da ],
        ], weh2, kof);
      }
    }
  });
  // ⟨ j͑ʃᴜ ʃɜ , ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ c2w2q * 0o46, 0o34 ], [ c2w2q * 0o60, 0o54 ],
        [ c2w2q * 0o44, 0o100 ], [ c2w2q * 0o42, 0o114 ],
      ], hunanuWeh2(A, 0o1), 0o3);
    }
  });
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const woha of [ 0o0, 0o12 ] ) {
        k2fFluanStrekon(k, [
          [ c2w2q * 0o24, h - 0o64 - woha ],
          [ c2w2q * 0o34, h - 0o34 - woha ],
          [ c2w2q * 0o46, h - 0o34 - woha ],
          [ c2w2q * 0o56, h - 0o66 - woha ],
        ], hunanuWeh2(M, 0o2), 0o2);
      }
    }
  });

  // ⟨ ꞙɭı , ⟅ ⟩

  // ⟨ ɭʃэ ſɭɔȝ , ꞙɭɿ , ⟅ ⟩
  k.fillStyle = Ax;
  k.fillRect(0, h - 0o14, w, 0o14);
  k.fillStyle = hunanu(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o17, w, 0o3);
  k.fillStyle = hunanu(A, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o14, w, 0o2);
}

// ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
function pentriInternan(k: CanvasRenderingContext2D, o: Soqte): void {
  const w = k.canvas.width, h = k.canvas.height;
  const I = o.c2h2, A = o.tokhaxesai;
  const Ix = weh2Ruva(I), Ax = weh2Ruva(A);
  k.fillStyle = Ix;
  k.fillRect(0, 0, w, h);
  sxtofon(k, I);
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɿ , ⟅ ⟩
  faldo(k, 0o120, 0o30, I, 0o1, 0o25/0o100);
  faldo(k, 0o260, 0o30, I, 0o1, 0o25/0o100);

  const MARGENO = 0o40;
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ ⟩
  for ( const h6kuni of [ 0o56, 0o126 ] ) {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ 0o200 + c2w2q * h6kuni, MARGENO + 0o20 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o22 ), 0o240 ],
        [ 0o200 + c2w2q * ( h6kuni - 0o20 ), 0o500 ],
        [ 0o200 + c2w2q * h6kuni, h - MARGENO ],
      ], hunanuWeh2(I, 0o2), 0o3);
      k2fFluanStrekon(k, [
        [ 0o200 + c2w2q * ( h6kuni + 0o10 ), 0o220 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o24 ), 0o330 ],
        [ 0o200 + c2w2q * ( h6kuni - 0o6 ), 0o504 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o10 ), 0o620 ],
      ], hunanuWeh2(I, 0o1), 0o2);
    }
  }

  // ⟨ ſȷƽᴜ ʃɔ , ɭʃᴜ , ⟅ ⟩
  k.strokeStyle = hunanu(I, 0o2);
  k.lineWidth = 0o2;
  k.beginPath();
  k.moveTo(0o200 - 0o54, MARGENO + 0o10);
  k.quadraticCurveTo(0o200, MARGENO + 0o50, 0o200 + 0o54, MARGENO + 0o10);
  k.stroke();

  // ⟨ }ʃɹƽ ꞙɭꞟ , ꞙɭı , ⟅ ⟩
  c2qRombo(k, 0o200, 0o166, 0o42, 0o44, null, hunanu(I, 0o2, 0o5/0o10), 0o2);
  ausexi(k, 0o200, 0o166, 0o24, Ax);
  ausexi(k, 0o200, 0o166, 0o11, Ix);

  // ⟨ j͑ʃᴜ ſɭᴜ ɭʃɹ , j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  // ⟨ ſɭэ ɭʃᴜ , ꞙɭı , ɭʃɹ ſ͕ɭɹ , ⟅ ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ ꞙɭı , j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ⟅ ⟩
  const sxevrono = ( yCet2: number, p2somani: number, weh2: number, kof: number ) => {
    const kamaY = yCet2 - ( 0o600 - yCet2 ) / 0o3;
    k2fFluanStrekon(k, [
      [ 0o200 - p2somani, 0o600 ],
      [ 0o200 - p2somani * 0o5/0o10, kamaY ],
      [ 0o200 + p2somani * 0o5/0o10, kamaY ],
      [ 0o200 + p2somani, 0o600 ],
    ], weh2, kof);
  };
  sxevrono(0o250, 0o52, hunanuWeh2(I, 0o2), 0o3);
  sxevrono(0o330, 0o40, hunanuWeh2(I, 0o3), 0o2);
  sxevrono(0o410, 0o30, hunanuWeh2(A, 0o1), 0o3);
  sxevrono(0o470, 0o20, A, 0o4);
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    k2fFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o6, 0o504 ],
      [ 0o200 + c2w2q * 0o16, 0o524 ],
      [ 0o200 + c2w2q * 0o22, 0o564 ],
      [ 0o200 + c2w2q * 0o12, 0o604 ],
    ], hunanuWeh2(I, 0o2), 0o3);
    k2fFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o4, 0o530 ],
      [ 0o200 + c2w2q * 0o10, 0o544 ],
      [ 0o200 + c2w2q * 0o14, 0o574 ],
      [ 0o200 + c2w2q * 0o6, 0o614 ],
    ], hunanuWeh2(A, 0o1), 0o2);
    k2fFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o16, 0o644 ],
      [ 0o200 + c2w2q * 0o22, 0o662 ],
      [ 0o200 + c2w2q * 0o14, 0o720 ],
      [ 0o200 + c2w2q * 0o4, 0o744 ],
    ], hunanuWeh2(I, 0o2), 0o3);
  }

  // ⟨ }ʃɹƽ ꞙɭꞟ , ꞙɭı , ꞙɭı , ⟅ ⟩
  for ( const dx of [ -0o102, 0o102 ] ) {
    ausexi(k, 0o200 + dx, 0o160, 0o12, hunanu(I, 0o3));
    ausexi(k, 0o200 + dx, 0o160, 0o7, Ax);
    ausexi(k, 0o200 + dx, 0o440, 0o11, hunanu(I, 0o2));
  }
  ausexi(k, 0o200, 0o360, 0o10, hunanu(A, 0o1));
  ausexi(k, 0o200, 0o640, 0o13, hunanu(A, 0o1));
  ausexi(k, 0o200, 0o640, 0o6, Ix);

  // ⟨ ɭʃэ ſɭɔȝ , ⟅ ⟩
  volviX(k, () => ausexi(k, 0, 0o166, 0o20, hunanu(I, 0o2)));
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ c2w2q * 0o4, MARGENO ], [ c2w2q * 0o34, 0o250 ],
        [ c2w2q * 0o24, 0o510 ], [ c2w2q * 0o4, h - MARGENO ],
      ], hunanuWeh2(I, 0o1), 0o3);
    }
  });

  // ⟨ ꞙɭı , ꞙɭɔ , ⟅ ⟩
}

// ⟨ ꞙɭɿ , ɭʃэ ſɭɔȝ , ⟅ ⟩
function pentriPantalonon(k: CanvasRenderingContext2D, o: Soqte): void {
  const w = k.canvas.width, h = k.canvas.height;
  const P = o.nascete, A = o.tokhaxesai;
  const Px = weh2Ruva(P), Ax = weh2Ruva(A);
  k.fillStyle = Px;
  k.fillRect(0, 0, w, h);
  sxtofon(k, P);
  faldo(k, 0o200, 0o40, P, 0o1, 0o3/0o10);
  faldo(k, 0o60, 0o24, P, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, P, 0o1, 0o25/0o100);
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ꞙɭэ , ⟅ ⟩
  const pantalonajPaneloj: [ number, number ][] = [
    [ 0o40, 0o1 ], [ 0o140, -0o1 ], [ 0o240, 0o1 ], [ 0o340, -0o1 ],
  ];
  for ( const [ x, c2w2q ] of pantalonajPaneloj ) {
    k2fFluanStrekon(k, [
      [ x, 0o10 ], [ x + c2w2q * 0o20, 0o240 ],
      [ x - c2w2q * 0o20, 0o540 ], [ x, h - 0o10 ],
    ], A, 0o6);
    k2fFluanStrekon(k, [
      [ x + c2w2q * 0o12, 0o110 ], [ x + c2w2q * 0o32, 0o274 ],
      [ x - c2w2q * 0o2, 0o524 ], [ x + c2w2q * 0o12, 0o720 ],
    ], hunanuWeh2(A, 0o1), 0o3);
    for ( const vek2fe of [ -0o1, 0o1 ] ) {
      k2fFluanStrekon(k, [
        [ x + vek2fe * 0o14, 0o304 ], [ x + vek2fe * 0o36, 0o370 ],
        [ x + vek2fe * 0o34, 0o520 ], [ x + vek2fe * 0o12, 0o610 ],
      ], hunanuWeh2(P, 0o1), 0o3);
      k2fFluanStrekon(k, [
        [ x + vek2fe * 0o20, 0o344 ], [ x + vek2fe * 0o30, 0o410 ],
        [ x + vek2fe * 0o26, 0o500 ], [ x + vek2fe * 0o16, 0o554 ],
      ], hunanuWeh2(P, 0o2), 0o2);
    }
  }
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o3);
  k.fillStyle = hunanu(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o3, w, 0o2);
  // ⟨ ꞙɭı , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ſןᴜ ɭʃэ ɭʃɔ , ⟅ ⟩
  k.fillStyle = hunanu(P, 0o1, 0o5/0o10);
  k.fillRect(0, 0o657, w, 0o3);
  // ⟨ ſ͕ɭɜ ı],ᴜ , }ʃɹƽ ꞙɭꞟ , ꞙɭɔ , ꞙɭı , ⟅ ⟩
  const sexij: [ number, number, number ][] = [
    [ 0o200, 0o564, 0o15 ],
    [ 0o200, 0o613, 0o12 ],
    [ 0o200, 0o645, 0o11 ],
    [ 0,     0o574, 0o11 ],
    [ 0,     0o625, 0o10 ],
  ];
  for ( const [ x, y, r ] of sexij ) {
    if ( x === 0 ) volviX(k, () => ausexi(k, 0, y, r, hunanu(P, 0o2)));
    else ausexi(k, x, y, r, hunanu(P, 0o2));
  }
  // ⟨ ꞙɭı , ⟅ ⟩
  k.fillStyle = hunanu(P, 0o2);
  k.fillRect(0, h - 0o6, w, 0o3);
}

// ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
function pentriManikon(k: CanvasRenderingContext2D, o: Soqte): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.soqteWeh2, A = o.tokhaxesai;
  const Mx = weh2Ruva(M), Ax = weh2Ruva(A);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o10);
  k.fillStyle = hunanu(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o10, w, 0o3);
  for ( const sost2 of [ 0o0, w / 0o2 ] ) {
    volviX(k, () => {
      for ( const c2w2q of [ -0o1, 0o1 ] ) {
        k2fFluanStrekon(k, [
          [ sost2 + c2w2q * 0o6, 0o42 ],
          [ sost2 + c2w2q * 0o34, 0o54 ],
          [ sost2 + c2w2q * 0o32, 0o114 ],
          [ sost2 + c2w2q * 0o10, 0o132 ],
        ], hunanuWeh2(A, 0o1), 0o4);
        k2fFluanStrekon(k, [
          [ sost2 + c2w2q * 0o14, 0o46 ],
          [ sost2 + c2w2q * 0o44, 0o66 ],
          [ sost2 + c2w2q * 0o40, 0o124 ],
          [ sost2 + c2w2q * 0o26, 0o144 ],
        ], hunanuWeh2(M, 0o2), 0o3);
        k2fFluanStrekon(k, [
          [ sost2 + c2w2q * 0o4, 0o56 ],
          [ sost2 + c2w2q * 0o20, 0o66 ],
          [ sost2 + c2w2q * 0o16, 0o106 ],
          [ sost2 + c2w2q * 0o4, 0o116 ],
        ], hunanuWeh2(M, 0o1), 0o2);
      }
    });
  }
  // ⟨ }ʃɹƽ ꞙɭэ , ꞙɭı , ⟅ ⟩
  for ( let i = 0; i < 0o10; i++ )
    ausexi(k, i * 0o20 + 0o10, 0o26, 0o6, hunanu(A, 0o1));
  ausexi(k, 0, h - 0o24, 0o22, Ax);
  ausexi(k, w, h - 0o24, 0o22, Ax);
  ausexi(k, w / 0o2, h - 0o24, 0o22, Ax);
  faldo(k, 0o40, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o100, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o140, 0o16, M, 0o1, 0o3/0o10);
  k.fillStyle = hunanu(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o10, w, 0o10);
}
const VESTAJKANVASOJ: Record<string, [ number, number ]> = {
  teru: [ 0o400, 0o1000 ],
  c2h2: [ 0o400, 0o1000 ],
  nascete: [ 0o400, 0o1000 ],
  tamasoqtesai: [ 0o200, 0o200 ],
};

export function vestaCac2sex(o: Soqte, pudal: string): THREE.CanvasTexture {
  const ca3aq = vestaCac2sexCatlaq(o, pudal);
  const cacheita = vestaCac2sexStoko.get(ca3aq);
  if ( cacheita ) return cacheita;
  const [ sefini, l6da ] = VESTAJKANVASOJ[pudal] ?? VESTAJKANVASOJ.teru;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = sefini; kanvasa.height = l6da;
  const kuns2bana = kanvasa.getContext("2d")!;
  if ( pudal === "soza" ) pentriEksteran(kuns2bana, o);
  else if ( pudal === "c2h2" ) pentriInternan(kuns2bana, o);
  else if ( pudal === "nascete" ) pentriPantalonon(kuns2bana, o);
  else pentriManikon(kuns2bana, o);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  if ( pudal !== "maniko" ) t.offset.x = 0o1/0o2;
  vestaCac2sexStoko.set(ca3aq, t);
  return t;
}
