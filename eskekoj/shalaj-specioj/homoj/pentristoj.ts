// ≺⧼ ជាងគូរផ្ទាំង 🖌️ ⧽≻
import * as THREE from "three";
import { deksesuma, ombro, helo } from "../../komunajxoj/koloroj.js";
import { kvarStelo, type Vesto } from "../../vestaro/vestoj.js";
import { volviX, sxtofon, faldo, stebo, bordiKurbon, rondaRombo } from "./kanvaso.js";
import { malfermaDuono } from "./malfermo.js";

const vestaTeksajxaStoko = new Map<string, THREE.CanvasTexture>();
const vestaTeksajxaKlavo = ( o: Vesto, speco: string ): string =>
  o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono + "|" + speco;
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
  k.strokeStyle = ombro(M, 0o2, 0o4/0o10);
  k.lineWidth = 0o2;
  for ( const dir of [ -0o1, 0o1 ] ) {
    k.beginPath();
    k.moveTo(0o200 + dir * 0o50, 0o62);
    k.quadraticCurveTo(0o200 + dir * 0o46, 0o160, 0o200 + dir * 0o40, 0o200);
    k.stroke();
    k.beginPath();
    k.moveTo(0o200 + dir * 0o40, 0o340);
    k.quadraticCurveTo(0o200 + dir * 0o64, 0o420, 0o200 + dir * 0o64, 0o470);
    k.stroke();
  }

  // ⟨ កអាវ 📃 ⟩
  const KOLUMO_ALTO = 0o24;
  k.fillStyle = ombro(M, 0o1);
  k.fillRect(0, 0, w, KOLUMO_ALTO);
  k.fillStyle = helo(M, 0o1);
  k.fillRect(0, 0o4, w, 0o12);
  stebo(k, [ [ 0, KOLUMO_ALTO ], [ w, KOLUMO_ALTO ] ], ombro(M, 0o2), 0o1);

  // ⟨ គែមមុខ 📃 ⟩
  const ombroj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  const bordoj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  for ( let y = KOLUMO_ALTO; y <= h; y += 0o4 ) {
    const duono = malfermaDuono(0o1 - y / h) * w;
    ombroj[0].push([ 0o200 + duono + 0o6, y ]);
    ombroj[1].push([ 0o200 - duono - 0o6, y ]);
    bordoj[0].push([ 0o200 + duono + 0o1, y ]);
    bordoj[1].push([ 0o200 - duono - 0o1, y ]);
  }
  bordiKurbon(k, ombroj[0], ombro(M, 0o1, 0o5/0o10), 0o2);
  bordiKurbon(k, ombroj[1], ombro(M, 0o1, 0o5/0o10), 0o2);
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
    k.strokeStyle = ombro(A, 0o1, 0o7/0o10);
    k.lineWidth = 0o3;
    k.beginPath();
    k.moveTo(ax, ay);
    k.quadraticCurveTo(0o200 + sx * 0o21, ay, 0o200 + sx * 0o17, 0o120 + sy * 0o36);
    k.moveTo(ax, ay);
    k.quadraticCurveTo(ax, 0o120 + sy * 0o21, 0o200 + sx * 0o32, 0o120 + sy * 0o17);
    k.stroke();
  }
  const eĥaj: [ number, number, string ][] = [
    [ 0o1,        0o2, ombro(M, 0o2, 0o5/0o10) ],
    [ 0o7/0o10,   0o3, ombro(A, 0o1, 0o45/0o100) ],
    [ 0o44/0o100, 0o2, ombro(M, 0o3, 0o5/0o10) ],
  ];
  for ( const sy of [ -0o1, 0o1 ] ) {
    const bazoY = 0o120 + sy * 0o42;
    for ( const [ s, dik, kol ] of eĥaj ) {
      const du = 0o34 * s, al = 0o24 * s;
      k.strokeStyle = kol;
      k.lineWidth = dik;
      k.beginPath();
      k.moveTo(0o200 - du, bazoY);
      k.quadraticCurveTo(0o200, bazoY + sy * al * 0o2, 0o200 + du, bazoY);
      k.stroke();
    }
  }

  // ⟨ ខ្នង 📃 ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ V កអាវ 📃 ⟩
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o37, 0o70);
    k.lineTo(0, 0o200);
    k.lineTo(0o37, 0o70);
    k.stroke();
  });
  // ⟨ ជើងស្មា 📃 ⟩
  k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o64, 0o70);
      k.lineTo(dir * 0o60, 0o130);
      k.lineTo(dir * 0o54, 0o70);
      k.stroke();
    }
  });
  // ⟨ ពេជ្រធំ 📃 ⟩
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
      k.lineWidth = 0o2;
      k.beginPath();
      k.moveTo(0, 0o226);
      k.quadraticCurveTo(dir * 0o32, 0o340, dir * 0o50, 0o444);
      k.stroke();
      k.strokeStyle = Ax;
      k.lineWidth = 0o3;
      k.beginPath();
      k.moveTo(dir * 0o50, 0o444);
      k.quadraticCurveTo(dir * 0o36, 0o516, dir * 0o21, 0o570);
      k.stroke();
    }
  });
  // ⟨ ត្បូងកណ្តាល 📃 ⟩
  const juvelo = (duono: number, alto: number, koloro: string) => {
    k.fillStyle = koloro;
    k.beginPath();
    k.moveTo(0, 0o370 - alto);
    k.lineTo(duono, 0o370);
    k.lineTo(0, 0o370 + alto);
    k.lineTo(-duono, 0o370);
    k.closePath();
    k.fill();
  };
  volviX(k, () => {
    juvelo(0o21, 0o100, Ax);
    juvelo(0o6, 0o30, Mx);
  });
  // ⟨ ជើងក្រោម 📃 ⟩
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o17, 0o660);
    k.lineTo(0, 0o600);
    k.lineTo(0o17, 0o660);
    k.stroke();
  });

  // ⟨ ខ្នងទទួលលំនាំច្រើនជាង 🖌️ ⟩
  // ⟨ ធ្នូចំហៀង 📃 ⟩
  const dorsEĥoj: [ number, number, number, number, string ][] = [
    [ 0o54, 0o70,  0o30, 0o2, ombro(M, 0o2, 0o45/0o100) ],
    [ 0o62, 0o104, 0o42, 0o3, ombro(A, 0o1, 0o5/0o10) ],
  ];
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      for ( const [ ena, ekstera, duonalto, dikeco, koloro ] of dorsEĥoj ) {
        k.strokeStyle = koloro;
        k.lineWidth = dikeco;
        k.beginPath();
        k.moveTo(dir * ena, 0o444 - duonalto);
        k.quadraticCurveTo(dir * ekstera, 0o444, dir * ena, 0o444 + duonalto);
        k.stroke();
      }
    }
  });
  // ⟨ ឆ្នូតស្មា 📃 ⟩
  k.strokeStyle = ombro(A, 0o1, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o46, 0o34);
      k.lineTo(dir * 0o42, 0o114);
      k.stroke();
    }
  });
  // ⟨ ជ្រុងនៅក្រណាត់ 📃 ⟩
  k.strokeStyle = ombro(M, 0o2, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o24, h - 0o64);
      k.lineTo(dir * 0o40, h - 0o44);
      k.lineTo(dir * 0o56, h - 0o66);
      k.stroke();
    }
  });

  // ⟨ គ្មានខ្សែផ្តេក 📃 ⟩

  // ⟨ គែមក្រោមជាខ្សែពីរជាន់ 📃 ⟩
  k.fillStyle = Ax;
  k.fillRect(0, h - 0o14, w, 0o14);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o17, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
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
  for ( const dx of [ -0o126, -0o56, 0o56, 0o126 ] ) {
    k.strokeStyle = ombro(I, 0o3, 0o6/0o10);
    k.lineWidth = 0o2;
    k.beginPath();
    k.moveTo(0o200 + dx, MARGENO + 0o20);
    k.lineTo(0o200 + dx, h - MARGENO);
    k.stroke();
  }

  // ⟨ ធ្នូកអាវ 📃 ⟩
  k.strokeStyle = ombro(I, 0o2);
  k.lineWidth = 0o2;
  k.beginPath();
  k.moveTo(0o200 - 0o54, MARGENO + 0o10);
  k.quadraticCurveTo(0o200, MARGENO + 0o50, 0o200 + 0o54, MARGENO + 0o10);
  k.stroke();

  // ⟨ ផ្កាយទ្រូង 📃 ⟩
  rondaRombo(k, 0o200, 0o166, 0o42, 0o44, null, ombro(I, 0o2, 0o5/0o10), 0o2);
  kvarStelo(k, 0o200, 0o166, 0o24, Ax);
  kvarStelo(k, 0o200, 0o166, 0o11, Ix);

  // ⟨ បង្អួចមើលឃើញនៃអាវក្នុង 📃 ⟩
  // ⟨ កណ្តាលជាជើងរង្វង់បន្ទរ 📃 ⟩
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ ជើងចុះក្រោម 📃 ⟩
  const sxevrono = ( yPinto: number, duono: number, koloro: string, dikeco: number ) => {
    k.strokeStyle = koloro;
    k.lineWidth = dikeco;
    k.beginPath();
    k.moveTo(0o200 - duono, 0o600);
    k.lineTo(0o200 - duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.quadraticCurveTo(0o200 - duono * 0o1/0o5, yPinto, 0o200, yPinto);
    k.quadraticCurveTo(0o200 + duono * 0o1/0o5, yPinto, 0o200 + duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.lineTo(0o200 + duono, 0o600);
    k.stroke();
  };
  sxevrono(0o250, 0o52, ombro(I, 0o2, 0o5/0o10), 0o2);
  sxevrono(0o330, 0o40, ombro(I, 0o3, 0o6/0o10), 0o2);
  sxevrono(0o410, 0o30, ombro(A, 0o1), 0o2);
  sxevrono(0o470, 0o20, Ax, 0o2);

  // ⟨ ផ្កាយចំហៀងទ្រូង និងក្រោមចង្កេះ 📃 ⟩
  for ( const dx of [ -0o102, 0o102 ] ) {
    kvarStelo(k, 0o200 + dx, 0o160, 0o12, ombro(I, 0o3));
    kvarStelo(k, 0o200 + dx, 0o160, 0o7, Ax);
    kvarStelo(k, 0o200 + dx, 0o440, 0o11, ombro(I, 0o2));
  }
  kvarStelo(k, 0o200, 0o360, 0o10, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o13, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o6, Ix);

  // ⟨ ខ្នង 📃 ⟩
  volviX(k, () => kvarStelo(k, 0, 0o166, 0o20, ombro(I, 0o2)));
  volviX(k, () => {
    k.fillStyle = ombro(I, 0o1, 0o4/0o10);
    k.fillRect(-0o2, MARGENO, 0o4, h - MARGENO * 0o2);
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
  for ( const x of [ 0o40, 0o140, 0o240, 0o340 ] ) {
    k.fillStyle = ombro(A, 0o1, 0o5/0o10);
    k.fillRect(x - 0o2, 0, 0o5, h);
    k.fillStyle = Ax;
    k.fillRect(x - 0o1, 0, 0o3, h);
  }
  // ⟨ ខ្សែសង្កត់នៅចង្កេះ 📃 ⟩
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o3, w, 0o2);
  // ⟨ ខ្សែមើលឃើញនៃផ្ទាំងគំនូរ 📃 ⟩
  // ⟨ ក្រណាត់នៅស្ងៀមនៅស្បែកជើង 📃 ⟩
  k.fillStyle = ombro(P, 0o1, 0o5/0o10);
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
    if ( x === 0 ) volviX(k, () => kvarStelo(k, 0, y, r, ombro(P, 0o2)));
    else kvarStelo(k, x, y, r, ombro(P, 0o2));
  }
  // ⟨ ខ្សែផ្តេកខាងក្រោមត្រូវដកចេញ 📃 ⟩
  k.fillStyle = ombro(P, 0o2);
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
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o10, w, 0o3);
  // ⟨ ផ្កាយបួនចុងលើខ្សែ 📃 ⟩
  for ( let i = 0; i < 0o10; i++ )
    kvarStelo(k, i * 0o20 + 0o10, 0o26, 0o6, ombro(A, 0o1));
  kvarStelo(k, 0, h - 0o24, 0o22, Ax);
  kvarStelo(k, w, h - 0o24, 0o22, Ax);
  kvarStelo(k, w / 0o2, h - 0o24, 0o22, Ax);
  faldo(k, 0o40, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o100, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o140, 0o16, M, 0o1, 0o3/0o10);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o10, w, 0o10);
}
const VESTAJ_KANVASOJ: Record<string, [ number, number ]> = {
  supra: [ 0o400, 0o1000 ],
  interno: [ 0o400, 0o1000 ],
  pantalono: [ 0o400, 0o1000 ],
  maniko: [ 0o200, 0o200 ],
};

export function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const klavo = vestaTeksajxaKlavo(o, speco);
  const cacheita = vestaTeksajxaStoko.get(klavo);
  if ( cacheita ) return cacheita;
  const [ largho, alto ] = VESTAJ_KANVASOJ[speco] ?? VESTAJ_KANVASOJ.supra;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = largho; kanvasa.height = alto;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( speco === "supra" ) pentriEksteran(kunteksto, o);
  else if ( speco === "interno" ) pentriInternan(kunteksto, o);
  else if ( speco === "pantalono" ) pentriPantalonon(kunteksto, o);
  else pentriManikon(kunteksto, o);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  if ( speco !== "maniko" ) t.offset.x = 0o1/0o2;
  vestaTeksajxaStoko.set(klavo, t);
  return t;
}
