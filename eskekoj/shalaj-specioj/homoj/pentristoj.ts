// ≺⧼ ជាងគូរផ្ទាំង 🖌️ ⧽≻
import * as THREE from "three";
import { deksesuma, hunanu, helo, ombraKoloro } from "../../komunajxoj/koloroj.js";
import { desegniFluanStrekon, molaStelaVojo } from "../../komunajxoj/teksajxoj/helpiloj.js";
import { kvarStelo, type Vesto } from "../../vestaro/vestoj.js";
import { volviX, sxtofon, faldo, stebo, bordiKurbon, rondaRombo } from "./kanvaso.js";
import { malfermaDuono } from "./malfermo.js";

const vestaTeksajxaStoko = new Map<string, THREE.CanvasTexture>();
const vestaTeksajxaKlavo = ( o: Vesto, speco: string ): string =>
  o.ksaka + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono + "|" + speco;
// ⟪ ជាងគូរផ្ទាំង 🖌️ ⟫

// ⟨ អាវខាងក្រៅ 📃 ⟩
function pentriEksteran(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta, I = o.interno;
  const Mx = deksesuma(M), Ax = deksesuma(A), Ix = deksesuma(I);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);

  // ⟨ ផ្នត់ 📃 ⟩
  faldo(k, 0o40, 0o24, M, 0o1, 0o3/0o10);
  faldo(k, 0o124, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o254, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, M, 0o1, 0o3/0o10);

  // ⟨ គំនូរនៅត្រង់កណ្តាល 📃 ⟩
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ អង្កត់ទ្រូង 📃 ⟩
  const flankajStrekoj: [ number, number, number ][] = [
    [ 0o0, ombraKoloro(M, 0o1), 0o6 ],
    [ 0o10, ombraKoloro(A, 0o1), 0o4 ],
    [ 0o20, ombraKoloro(M, 0o2), 0o3 ],
  ];
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    for ( const [ eĥo, weh2, dikeco ] of flankajStrekoj ) {
      desegniFluanStrekon(k, [
        [ 0o200 + c2w2q * ( 0o60 + eĥo ), 0o134 + eĥo ],
        [ 0o200 + c2w2q * ( 0o114 + eĥo ), 0o170 ],
        [ 0o200 + c2w2q * ( 0o110 + eĥo ), 0o270 ],
        [ 0o200 + c2w2q * ( 0o70 + eĥo ), 0o334 - eĥo ],
      ], weh2, dikeco);
      desegniFluanStrekon(k, [
        [ 0o200 + c2w2q * ( 0o70 + eĥo ), 0o354 + eĥo ],
        [ 0o200 + c2w2q * ( 0o134 + eĥo / 0o2 ), 0o430 ],
        [ 0o200 + c2w2q * ( 0o130 + eĥo / 0o2 ), 0o620 ],
        [ 0o200 + c2w2q * ( 0o100 + eĥo ), 0o720 - eĥo ],
      ], weh2, dikeco);
    }
  }

  // ⟨ កអាវ 📃 ⟩
  const KOLUMO_ALTO = 0o24;
  k.fillStyle = hunanu(M, 0o1);
  k.fillRect(0, 0, w, KOLUMO_ALTO);
  k.fillStyle = helo(M, 0o1);
  k.fillRect(0, 0o4, w, 0o12);
  stebo(k, [ [ 0, KOLUMO_ALTO ], [ w, KOLUMO_ALTO ] ], hunanu(M, 0o2), 0o1);

  // ⟨ គែមមុខ 📃 ⟩
  const ombroj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  const bordoj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  for ( let y = KOLUMO_ALTO; y <= h; y += 0o4 ) {
    const p2somani = malfermaDuono(0o1 - y / h) * w;
    ombroj[0].push([ 0o200 + p2somani + 0o6, y ]);
    ombroj[1].push([ 0o200 - p2somani - 0o6, y ]);
    bordoj[0].push([ 0o200 + p2somani + 0o1, y ]);
    bordoj[1].push([ 0o200 - p2somani - 0o1, y ]);
  }
  bordiKurbon(k, ombroj[0], hunanu(M, 0o1, 0o5/0o10), 0o2);
  bordiKurbon(k, ombroj[1], hunanu(M, 0o1, 0o5/0o10), 0o2);
  // ⟨ ខ្សែសង្កត់ 📃 ⟩
  bordiKurbon(k, bordoj[0], Ax, 0o4);
  bordiKurbon(k, bordoj[1], Ax, 0o4);

  // ⟨ ការកាត់ចេញ 📃 ⟩
  const fenestro = ( x: number, y: number, r: number ) => {
    kvarStelo(k, x, y, r + 0o11, Ax);
    kvarStelo(k, x, y, r + 0o5, Mx);
    kvarStelo(k, x, y, r + 0o4, Ax);
    kvarStelo(k, x, y, r, Ix);
  };
  fenestro(0o200 - 0o50, 0o250, 0o16);
  fenestro(0o200 + 0o50, 0o250, 0o16);
  fenestro(0o200 - 0o50, 0o540, 0o13);
  fenestro(0o200 + 0o50, 0o540, 0o13);

  // ⟨ លំនាំទ្រូង 📃 ⟩
  kvarStelo(k, 0o200, 0o120, 0o36, Ax);
  kvarStelo(k, 0o200, 0o120, 0o14, Ix);
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
    [ 0o1,        0o3, ombraKoloro(M, 0o2) ],
    [ 0o7/0o10,   0o4, ombraKoloro(A, 0o1) ],
    [ 0o44/0o100, 0o2, ombraKoloro(M, 0o3) ],
  ];
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    const bazoY = 0o120 + c2w2q * 0o42;
    for ( const [ p6zukani, dikeco, weh2 ] of eĥaj ) {
      const p2somani = 0o34 * p6zukani, l6da = 0o24 * p6zukani;
      desegniFluanStrekon(k, [
        [ 0o200 - p2somani, bazoY ],
        [ 0o200 - p2somani / 0o2, bazoY + c2w2q * l6da * 0o13/0o10 ],
        [ 0o200 + p2somani / 0o2, bazoY + c2w2q * l6da * 0o13/0o10 ],
        [ 0o200 + p2somani, bazoY ],
      ], weh2, dikeco);
    }
  }

  // ⟨ ខ្នង 📃 ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ V កអាវ 📃 ⟩
  volviX(k, () => {
    desegniFluanStrekon(k, [
      [ -0o37, 0o70 ], [ -0o34, 0o230 ], [ 0o34, 0o230 ], [ 0o37, 0o70 ],
    ], A, 0o6);
    desegniFluanStrekon(k, [
      [ -0o27, 0o64 ], [ -0o24, 0o174 ], [ 0o24, 0o174 ], [ 0o27, 0o64 ],
    ], ombraKoloro(M, 0o2), 0o2);
  });
  // ⟨ ជើងស្មា 📃 ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ c2w2q * 0o64, 0o70 ], [ c2w2q * 0o72, 0o142 ],
        [ c2w2q * 0o46, 0o142 ], [ c2w2q * 0o54, 0o70 ],
      ], ombraKoloro(M, 0o2), 0o3);
    }
  });
  // ⟨ ពេជ្រធំ 📃 ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ 0o0, 0o226 ], [ c2w2q * 0o34, 0o270 ],
        [ c2w2q * 0o50, 0o374 ], [ c2w2q * 0o50, 0o444 ],
      ], ombraKoloro(M, 0o2), 0o3);
      desegniFluanStrekon(k, [
        [ c2w2q * 0o50, 0o444 ], [ c2w2q * 0o50, 0o510 ],
        [ c2w2q * 0o26, 0o544 ], [ c2w2q * 0o21, 0o570 ],
      ], A, 0o6);
      desegniFluanStrekon(k, [
        [ c2w2q * 0o14, 0o236 ], [ c2w2q * 0o52, 0o270 ],
        [ c2w2q * 0o64, 0o342 ], [ c2w2q * 0o60, 0o400 ],
      ], ombraKoloro(M, 0o1), 0o2);
      desegniFluanStrekon(k, [
        [ c2w2q * 0o62, 0o474 ], [ c2w2q * 0o64, 0o540 ],
        [ c2w2q * 0o44, 0o604 ], [ c2w2q * 0o30, 0o624 ],
      ], ombraKoloro(M, 0o2), 0o2);
    }
  });
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const y of [ 0o260, 0o520 ] ) {
        k.save();
        k.translate(c2w2q * 0o40, y);
        k.rotate(c2w2q * Math.PI / 0o10);
        const folio = new Path2D();
        folio.moveTo(0o0, -0o14);
        folio.bezierCurveTo(0o6, -0o14, 0o14, 0o6, 0o0, 0o14);
        folio.bezierCurveTo(-0o14, 0o6, -0o6, -0o14, 0o0, -0o14);
        folio.closePath();
        k.strokeStyle = hunanu(A, 0o1);
        k.lineWidth = 0o3;
        k.stroke(folio);
        desegniFluanStrekon(k, [
          [ 0o0, -0o6 ], [ 0o3, -0o2 ], [ 0o3, 0o2 ], [ 0o0, 0o6 ],
        ], ombraKoloro(M, 0o1), 0o3);
        k.restore();
      }
    }
  });

  // ⟨ ត្បូងកណ្តាល 📃 ⟩
  volviX(k, () => {
    k.fillStyle = Ax;
    k.fill(molaStelaVojo(0o0, 0o370, 0o21, 0o100));
    k.fillStyle = Mx;
    k.fill(molaStelaVojo(0o0, 0o370, 0o6, 0o30));
  });
  // ⟨ ជើងក្រោម 📃 ⟩
  volviX(k, () => {
    desegniFluanStrekon(k, [
      [ -0o17, 0o660 ], [ -0o14, 0o560 ], [ 0o14, 0o560 ], [ 0o17, 0o660 ],
    ], A, 0o6);
    desegniFluanStrekon(k, [
      [ -0o10, 0o700 ], [ -0o6, 0o622 ], [ 0o6, 0o622 ], [ 0o10, 0o700 ],
    ], ombraKoloro(M, 0o2), 0o2);
  });

  // ⟨ ខ្នងទទួលលំនាំច្រើនជាង 🖌️ ⟩
  // ⟨ ធ្នូចំហៀង 📃 ⟩
  const dorsEĥoj: [ number, number, number, number, number ][] = [
    [ 0o54, 0o70,  0o30, 0o2, ombraKoloro(M, 0o2) ],
    [ 0o62, 0o104, 0o42, 0o3, ombraKoloro(A, 0o1) ],
    [ 0o72, 0o114, 0o52, 0o2, ombraKoloro(M, 0o1) ],
  ];
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const [ ena, ekstera, duonalto, dikeco, weh2 ] of dorsEĥoj ) {
        desegniFluanStrekon(k, [
          [ c2w2q * ena, 0o444 - duonalto ],
          [ c2w2q * ekstera, 0o444 - duonalto / 0o2 ],
          [ c2w2q * ekstera, 0o444 + duonalto / 0o2 ],
          [ c2w2q * ena, 0o444 + duonalto ],
        ], weh2, dikeco);
      }
    }
  });
  // ⟨ ឆ្នូតស្មា 📃 ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ c2w2q * 0o46, 0o34 ], [ c2w2q * 0o60, 0o54 ],
        [ c2w2q * 0o44, 0o100 ], [ c2w2q * 0o42, 0o114 ],
      ], ombraKoloro(A, 0o1), 0o3);
    }
  });
  // ⟨ ជ្រុងនៅក្រណាត់ 📃 ⟩
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      for ( const eĥo of [ 0o0, 0o12 ] ) {
        desegniFluanStrekon(k, [
          [ c2w2q * 0o24, h - 0o64 - eĥo ],
          [ c2w2q * 0o34, h - 0o34 - eĥo ],
          [ c2w2q * 0o46, h - 0o34 - eĥo ],
          [ c2w2q * 0o56, h - 0o66 - eĥo ],
        ], ombraKoloro(M, 0o2), 0o2);
      }
    }
  });

  // ⟨ គ្មានខ្សែផ្តេក 📃 ⟩

  // ⟨ គែមក្រោមជាខ្សែពីរជាន់ 📃 ⟩
  k.fillStyle = Ax;
  k.fillRect(0, h - 0o14, w, 0o14);
  k.fillStyle = hunanu(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o17, w, 0o3);
  k.fillStyle = hunanu(A, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o14, w, 0o2);
}

// ⟨ អាវក្នុង 📃 ⟩
function pentriInternan(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const I = o.interno, A = o.akcenta;
  const Ix = deksesuma(I), Ax = deksesuma(A);
  k.fillStyle = Ix;
  k.fillRect(0, 0, w, h);
  sxtofon(k, I);
  // ⟨ ផ្នត់ទន់ពីរ 📃 ⟩
  faldo(k, 0o120, 0o30, I, 0o1, 0o25/0o100);
  faldo(k, 0o260, 0o30, I, 0o1, 0o25/0o100);

  const MARGENO = 0o40;
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ គំនូរមានខ្សែបញ្ឈរ 📃 ⟩
  for ( const h6kuni of [ 0o56, 0o126 ] ) {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ 0o200 + c2w2q * h6kuni, MARGENO + 0o20 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o22 ), 0o240 ],
        [ 0o200 + c2w2q * ( h6kuni - 0o20 ), 0o500 ],
        [ 0o200 + c2w2q * h6kuni, h - MARGENO ],
      ], ombraKoloro(I, 0o2), 0o3);
      desegniFluanStrekon(k, [
        [ 0o200 + c2w2q * ( h6kuni + 0o10 ), 0o220 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o24 ), 0o330 ],
        [ 0o200 + c2w2q * ( h6kuni - 0o6 ), 0o504 ],
        [ 0o200 + c2w2q * ( h6kuni + 0o10 ), 0o620 ],
      ], ombraKoloro(I, 0o1), 0o2);
    }
  }

  // ⟨ ធ្នូកអាវ 📃 ⟩
  k.strokeStyle = hunanu(I, 0o2);
  k.lineWidth = 0o2;
  k.beginPath();
  k.moveTo(0o200 - 0o54, MARGENO + 0o10);
  k.quadraticCurveTo(0o200, MARGENO + 0o50, 0o200 + 0o54, MARGENO + 0o10);
  k.stroke();

  // ⟨ ផ្កាយទ្រូង 📃 ⟩
  rondaRombo(k, 0o200, 0o166, 0o42, 0o44, null, hunanu(I, 0o2, 0o5/0o10), 0o2);
  kvarStelo(k, 0o200, 0o166, 0o24, Ax);
  kvarStelo(k, 0o200, 0o166, 0o11, Ix);

  // ⟨ បង្អួចមើលឃើញនៃអាវក្នុង 📃 ⟩
  // ⟨ កណ្តាលជាជើងរង្វង់បន្ទរ 📃 ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ ជើងចុះក្រោម 📃 ⟩
  const sxevrono = ( yPinto: number, p2somani: number, weh2: number, dikeco: number ) => {
    const regiloY = yPinto - ( 0o600 - yPinto ) / 0o3;
    desegniFluanStrekon(k, [
      [ 0o200 - p2somani, 0o600 ],
      [ 0o200 - p2somani * 0o5/0o10, regiloY ],
      [ 0o200 + p2somani * 0o5/0o10, regiloY ],
      [ 0o200 + p2somani, 0o600 ],
    ], weh2, dikeco);
  };
  sxevrono(0o250, 0o52, ombraKoloro(I, 0o2), 0o3);
  sxevrono(0o330, 0o40, ombraKoloro(I, 0o3), 0o2);
  sxevrono(0o410, 0o30, ombraKoloro(A, 0o1), 0o3);
  sxevrono(0o470, 0o20, A, 0o4);
  for ( const c2w2q of [ -0o1, 0o1 ] ) {
    desegniFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o6, 0o504 ],
      [ 0o200 + c2w2q * 0o16, 0o524 ],
      [ 0o200 + c2w2q * 0o22, 0o564 ],
      [ 0o200 + c2w2q * 0o12, 0o604 ],
    ], ombraKoloro(I, 0o2), 0o3);
    desegniFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o4, 0o530 ],
      [ 0o200 + c2w2q * 0o10, 0o544 ],
      [ 0o200 + c2w2q * 0o14, 0o574 ],
      [ 0o200 + c2w2q * 0o6, 0o614 ],
    ], ombraKoloro(A, 0o1), 0o2);
    desegniFluanStrekon(k, [
      [ 0o200 + c2w2q * 0o16, 0o644 ],
      [ 0o200 + c2w2q * 0o22, 0o662 ],
      [ 0o200 + c2w2q * 0o14, 0o720 ],
      [ 0o200 + c2w2q * 0o4, 0o744 ],
    ], ombraKoloro(I, 0o2), 0o3);
  }

  // ⟨ ផ្កាយចំហៀងទ្រូង និងក្រោមចង្កេះ 📃 ⟩
  for ( const dx of [ -0o102, 0o102 ] ) {
    kvarStelo(k, 0o200 + dx, 0o160, 0o12, hunanu(I, 0o3));
    kvarStelo(k, 0o200 + dx, 0o160, 0o7, Ax);
    kvarStelo(k, 0o200 + dx, 0o440, 0o11, hunanu(I, 0o2));
  }
  kvarStelo(k, 0o200, 0o360, 0o10, hunanu(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o13, hunanu(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o6, Ix);

  // ⟨ ខ្នង 📃 ⟩
  volviX(k, () => kvarStelo(k, 0, 0o166, 0o20, hunanu(I, 0o2)));
  volviX(k, () => {
    for ( const c2w2q of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ c2w2q * 0o4, MARGENO ], [ c2w2q * 0o34, 0o250 ],
        [ c2w2q * 0o24, 0o510 ], [ c2w2q * 0o4, h - MARGENO ],
      ], ombraKoloro(I, 0o1), 0o3);
    }
  });

  // ⟨ ចង្កេះទទេទាំងស្រុង 📃 ⟩
}

// ⟨ ខោ 📃 ⟩
function pentriPantalonon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const P = o.pantalono, A = o.akcenta;
  const Px = deksesuma(P), Ax = deksesuma(A);
  k.fillStyle = Px;
  k.fillRect(0, 0, w, h);
  sxtofon(k, P);
  faldo(k, 0o200, 0o40, P, 0o1, 0o3/0o10);
  faldo(k, 0o60, 0o24, P, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, P, 0o1, 0o25/0o100);
  // ⟨ ខ្សែសង្កត់ជាបញ្ឈរ 📃 ⟩
  // ⟨ ខ្សែស្តើង និងនៅជ្រុងទាំងបួន 📃 ⟩
  const pantalonajPaneloj: [ number, number ][] = [
    [ 0o40, 0o1 ], [ 0o140, -0o1 ], [ 0o240, 0o1 ], [ 0o340, -0o1 ],
  ];
  for ( const [ x, c2w2q ] of pantalonajPaneloj ) {
    desegniFluanStrekon(k, [
      [ x, 0o10 ], [ x + c2w2q * 0o20, 0o240 ],
      [ x - c2w2q * 0o20, 0o540 ], [ x, h - 0o10 ],
    ], A, 0o6);
    desegniFluanStrekon(k, [
      [ x + c2w2q * 0o12, 0o110 ], [ x + c2w2q * 0o32, 0o274 ],
      [ x - c2w2q * 0o2, 0o524 ], [ x + c2w2q * 0o12, 0o720 ],
    ], ombraKoloro(A, 0o1), 0o3);
    for ( const kanto of [ -0o1, 0o1 ] ) {
      desegniFluanStrekon(k, [
        [ x + kanto * 0o14, 0o304 ], [ x + kanto * 0o36, 0o370 ],
        [ x + kanto * 0o34, 0o520 ], [ x + kanto * 0o12, 0o610 ],
      ], ombraKoloro(P, 0o1), 0o3);
      desegniFluanStrekon(k, [
        [ x + kanto * 0o20, 0o344 ], [ x + kanto * 0o30, 0o410 ],
        [ x + kanto * 0o26, 0o500 ], [ x + kanto * 0o16, 0o554 ],
      ], ombraKoloro(P, 0o2), 0o2);
    }
  }
  // ⟨ ខ្សែសង្កត់នៅចង្កេះ 📃 ⟩
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o3);
  k.fillStyle = hunanu(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o3, w, 0o2);
  // ⟨ ខ្សែមើលឃើញនៃផ្ទាំងគំនូរ 📃 ⟩
  // ⟨ ក្រណាត់នៅស្ងៀមនៅស្បែកជើង 📃 ⟩
  k.fillStyle = hunanu(P, 0o1, 0o5/0o10);
  k.fillRect(0, 0o657, w, 0o3);
  // ⟨ លំនាំជាផ្កាយ និងងងឹត 📃 ⟩
  const steloj: [ number, number, number ][] = [
    [ 0o200, 0o564, 0o15 ],
    [ 0o200, 0o613, 0o12 ],
    [ 0o200, 0o645, 0o11 ],
    [ 0,     0o574, 0o11 ],
    [ 0,     0o625, 0o10 ],
  ];
  for ( const [ x, y, r ] of steloj ) {
    if ( x === 0 ) volviX(k, () => kvarStelo(k, 0, y, r, hunanu(P, 0o2)));
    else kvarStelo(k, x, y, r, hunanu(P, 0o2));
  }
  // ⟨ ខ្សែផ្តេកខាងក្រោមត្រូវដកចេញ 📃 ⟩
  k.fillStyle = hunanu(P, 0o2);
  k.fillRect(0, h - 0o6, w, 0o3);
}

// ⟨ ដៃអាវ 📃 ⟩
function pentriManikon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta;
  const Mx = deksesuma(M), Ax = deksesuma(A);
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
        desegniFluanStrekon(k, [
          [ sost2 + c2w2q * 0o6, 0o42 ],
          [ sost2 + c2w2q * 0o34, 0o54 ],
          [ sost2 + c2w2q * 0o32, 0o114 ],
          [ sost2 + c2w2q * 0o10, 0o132 ],
        ], ombraKoloro(A, 0o1), 0o4);
        desegniFluanStrekon(k, [
          [ sost2 + c2w2q * 0o14, 0o46 ],
          [ sost2 + c2w2q * 0o44, 0o66 ],
          [ sost2 + c2w2q * 0o40, 0o124 ],
          [ sost2 + c2w2q * 0o26, 0o144 ],
        ], ombraKoloro(M, 0o2), 0o3);
        desegniFluanStrekon(k, [
          [ sost2 + c2w2q * 0o4, 0o56 ],
          [ sost2 + c2w2q * 0o20, 0o66 ],
          [ sost2 + c2w2q * 0o16, 0o106 ],
          [ sost2 + c2w2q * 0o4, 0o116 ],
        ], ombraKoloro(M, 0o1), 0o2);
      }
    });
  }
  // ⟨ ផ្កាយបួនចុងលើខ្សែ 📃 ⟩
  for ( let i = 0; i < 0o10; i++ )
    kvarStelo(k, i * 0o20 + 0o10, 0o26, 0o6, hunanu(A, 0o1));
  kvarStelo(k, 0, h - 0o24, 0o22, Ax);
  kvarStelo(k, w, h - 0o24, 0o22, Ax);
  kvarStelo(k, w / 0o2, h - 0o24, 0o22, Ax);
  faldo(k, 0o40, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o100, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o140, 0o16, M, 0o1, 0o3/0o10);
  k.fillStyle = hunanu(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o10, w, 0o10);
}
const VESTAJ_KANVASOJ: Record<string, [ number, number ]> = {
  teru: [ 0o400, 0o1000 ],
  interno: [ 0o400, 0o1000 ],
  pantalono: [ 0o400, 0o1000 ],
  maniko: [ 0o200, 0o200 ],
};

export function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const ca3aq = vestaTeksajxaKlavo(o, speco);
  const cacheita = vestaTeksajxaStoko.get(ca3aq);
  if ( cacheita ) return cacheita;
  const [ sefini, l6da ] = VESTAJ_KANVASOJ[speco] ?? VESTAJ_KANVASOJ.teru;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = sefini; kanvasa.height = l6da;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( speco === "supra" ) pentriEksteran(kunteksto, o);
  else if ( speco === "interno" ) pentriInternan(kunteksto, o);
  else if ( speco === "pantalono" ) pentriPantalonon(kunteksto, o);
  else pentriManikon(kunteksto, o);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  if ( speco !== "maniko" ) t.offset.x = 0o1/0o2;
  vestaTeksajxaStoko.set(ca3aq, t);
  return t;
}
