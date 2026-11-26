// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ɭʃɔƴ 📃 ⧽≻

import * as THREE from "three";
import { kf2Bufezacen, vakox2qQoxaKefoujn } from "../../p6kpu/hakox2q.js";
import { superpuc2q, kf2RinganSurfacon } from "./haqoxa.js";
import { KAPAY, KOLOY } from "./havecax2l.js";
import { T2BANUL6DA, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, BROVAP2SOMANI, BROVAL6DA, BROVAARko, BROVAKLINO, BROVASEFINI, BROVADIKECO, BROVALEVO, LAŜOSEFINI, LAŜODIKECO, LAŜOLEVO, BUŜOP2SOMANI, BUŜOANGULO, BUŜOMEZO, BUŜOSEFINI, BUŜODIKECO, BUŜOLEVO, BUŜOSTACIOJ, STRIOKA5ASEXAZ, T2BANUDIKO, PALPEBRAGRANDO, PALPEBZACE, T2BANUNORMALAY, PALPEBRASTRIO } from "./t2banu.js";

function tezBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const p6kpu = new THREE.Vector3(dx, dy, dz).normalize();
  const tapu = new THREE.Vector3(0o0, 0o1, 0o0).cross(p6kpu).normalize();
  return [ tapu, p6kpu.clone().cross(tapu).normalize(), p6kpu ];
}

export function kf2T2banun(dir: number, dx: number, dy: number, dz: number,
  sefini: number, l6da: number, s2sabo: number): THREE.BufferGeometry {
  const [ tapu, vertikala, p6kpu ] = tezBazaro(dir * dx, dy, dz);

  const N = 0o20;
  const DIKO = 0o1/0o200;
  const kozuni = new THREE.Vector3(dir * dx, KAPAY + dy, dz);
  const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
  const haxekuxa: number[] = [];

  const qan2k: number[] = [];

  for ( const [ pal6, diko ] of [ [ 0o1, 0o0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {

    const lg = sefini * pal6, ag = l6da * pal6;
    const R = ( lg * lg + ag * ag ) / ( 0o2 * ag );
    const Rr = R * R, Rm = R - ag;
    for ( let i = 0o0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const k = Math.cos(t), s = Math.sin(t);

      const fx = lg * k;
      const slaf = Math.sqrt(Math.max(0o0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * slaf;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      haxekuxa.push(
        kozuni.x + tapu.x * rx + vertikala.x * ry + p6kpu.x * diko,
        kozuni.y + tapu.y * rx + vertikala.y * ry + p6kpu.y * diko,
        kozuni.z + tapu.z * rx + vertikala.z * ry + p6kpu.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
  }
  haxekuxa.push(kozuni.x + p6kpu.x * DIKO, kozuni.y + p6kpu.y * DIKO, kozuni.z + p6kpu.z * DIKO);
  qan2k.push(0o1/0o2, 0o1/0o2);
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

export function palpebraPivoto(): number {
  return KAPAY + T2BANUDY + PALPEBRASTRIO - KOLOY;
}

export function kf2Tu5ekanit2banusaijn(): THREE.BufferGeometry {
  const N = 0o20;
  const sefini = T2BANUSEFINI * PALPEBRAGRANDO;
  const l6da = T2BANUL6DA * PALPEBRAGRANDO;
  const diko = T2BANUDIKO + PALPEBZACE;
  const levo = PALPEBRASTRIO + T2BANUNORMALAY * diko;
  const R = ( sefini * sefini + l6da * l6da ) / ( 0o2 * l6da ), Rr = R * R, Rm = R - l6da;
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ tapu, vertikala, p6kpu ] = tezBazaro(dir * T2BANUDX,
      T2BANUDY, T2BANUDZ);

    const s2sabo = dir * 0o1/0o10;
    const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
    const haxekuxa: number[] = [], qan2k: number[] = [], havecax2lani: number[] = [];
    for ( let i = 0o0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = sefini * k;
      const slaf = Math.sqrt(Math.max(0o0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * slaf;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      haxekuxa.push(dir * T2BANUDX + tapu.x * rx + vertikala.x * ry
        + p6kpu.x * diko, vertikala.y * ry + p6kpu.y * diko - levo,
        T2BANUDZ + tapu.z * rx + vertikala.z * ry + p6kpu.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
    haxekuxa.push(dir * T2BANUDX + p6kpu.x * diko, p6kpu.y * diko - levo,
      T2BANUDZ + p6kpu.z * diko);
    qan2k.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0o0; i < N; i++ ) havecax2lani.push(i, ( i + 0o1 ) % N, N);
    hakek.push(kf2Bufezacen(haxekuxa, havecax2lani, { qan2k }));
  }
  return vakox2qQoxaKefoujn(hakek);
}

function kapaSoza(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3 ] {
  let sube = KRANIAJRINGOJ[0o0], kxe = KRANIAJRINGOJ[KRANIAJRINGOJ.length - 0o1];
  for ( let i = 0o0; i + 0o1 < KRANIAJRINGOJ.length; i++ ) {
    if ( dy <= KRANIAJRINGOJ[i][0o0] && dy >= KRANIAJRINGOJ[i + 0o1][0o0] ) {
      sube = KRANIAJRINGOJ[i]; kxe = KRANIAJRINGOJ[i + 0o1];
      break;
    }
  }
  const t = ( sube[0o0] - dy ) / ( sube[0o0] - kxe[0o0] || 0o1 );
  const a = sube[0o1] + ( kxe[0o1] - sube[0o1] ) * t;
  const b = sube[0o2] + ( kxe[0o2] - sube[0o2] ) * t;
  const ne3ak2 = sube[0o3] + ( kxe[0o3] - sube[0o3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPAY + dy, dz * k + ne3ak2),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

function kf2TeznStrikon(sost2: THREE.Vector3[], tom6nu: THREE.Vector3[],
  sefini: number[], kof: number): THREE.BufferGeometry {
  const K = 0o4;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < sost2.length; i++ ) {

    const ne3ak2 = sost2[Math.max(0o0, i - 0o1)];
    const post = sost2[Math.min(sost2.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(ne3ak2).normalize();
    const p6kpu = tom6nu[i];
    const larĝa = new THREE.Vector3().crossVectors(p6kpu, tanĝanto).normalize();
    const p2somaniSefini = sefini[i] * 0o1/0o2, p2somaniKof = kof * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      haxekuxa.push(sost2[i].x + larĝa.x * sb * p2somaniSefini + p6kpu.x * sn * p2somaniKof,
        sost2[i].y + larĝa.y * sb * p2somaniSefini + p6kpu.y * sn * p2somaniKof,
        sost2[i].z + larĝa.z * sb * p2somaniSefini + p6kpu.z * sn * p2somaniKof);

      qan2k.push(i / ( sost2.length - 0o1 ), 0o1/0o2 + sn * 0o1/0o2);
    }
  }
  for ( let i = 0o0; i + 0o1 < sost2.length; i++ ) {
    for ( let j = 0o0; j < K; j++ ) {
      const a = i * K + j, b = i * K + ( j + 0o1 ) % K;
      const c = ( i + 0o1 ) * K + j, d = ( i + 0o1 ) * K + ( j + 0o1 ) % K;
      havecax2lani.push(a, b, c, b, d, c);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

export function kf2TezjnStrikojn(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const sost2 = new THREE.Vector3(0o0, KAPAY, 0o0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const s2sabo = dir * 0o1/0o10;
    const [ tapu, vertikala, p6kpu ] = tezBazaro(dir * T2BANUDX, T2BANUDY, T2BANUDZ);
    const kozuni = new THREE.Vector3(dir * T2BANUDX, KAPAY + T2BANUDY, T2BANUDZ);

    const brovHasost2: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovSefinij: number[] = [];
    for ( let i = 0o0; i <= STRIOKA5ASEXAZ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIOKA5ASEXAZ;
      const p = kozuni.clone()
        .addScaledVector(tapu, s * BROVAP2SOMANI)
        .addScaledVector(vertikala, BROVAL6DA + BROVAARko * ( 0o1 - s * s ) - BROVAKLINO * s * dir);
      const [ soza, n ] = kapaSoza(p.x - sost2.x, p.y - sost2.y, p.z - sost2.z);
      brovHasost2.push(soza.addScaledVector(n, BROVALEVO)); brovNormaloj.push(n);
      brovSefinij.push(BROVASEFINI * ( 0o1 - 0o3/0o4 * s * s ));
    }
    hakek.push(kf2TeznStrikon(brovHasost2, brovNormaloj, brovSefinij, BROVADIKECO));

    const laŝHasost2: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝSefinij: number[] = [];
    const R = ( T2BANUSEFINI * T2BANUSEFINI + T2BANUL6DA * T2BANUL6DA ) / ( 0o2 * T2BANUL6DA );
    const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
    for ( let i = 0o0; i <= STRIOKA5ASEXAZ; i++ ) {
      const fi = Math.PI * i / STRIOKA5ASEXAZ;
      const fx = T2BANUSEFINI * Math.cos(fi);
      const py = Math.sqrt(Math.max(0o0, R * R - fx * fx)) - (R - T2BANUL6DA);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝHasost2.push(kozuni.clone()
        .addScaledVector(tapu, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(p6kpu, LAŜOLEVO));
      laŝNormaloj.push(p6kpu.clone());
      const pukaz = Math.abs(i / STRIOKA5ASEXAZ * 0o2 - 0o1);
      laŝSefinij.push(LAŜOSEFINI * ( 0o1 - 0o3/0o4 * pukaz * pukaz ));
    }
    hakek.push(kf2TeznStrikon(laŝHasost2, laŝNormaloj, laŝSefinij, LAŜODIKECO));
  }
  return vakox2qQoxaKefoujn(hakek);
}

export function kf2Buŝon(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const sost2: THREE.Vector3[] = [];
    const tom6nu: THREE.Vector3[] = [];
    const sefini: number[] = [];
    for ( let i = 0o0; i <= BUŜOSTACIOJ; i++ ) {
      const t = i / BUŜOSTACIOJ;

      const [ soza, n ] = kapaSoza(dir * BUŜOP2SOMANI * ( 0o1 - t ),
        BUŜOANGULO + ( BUŜOMEZO - BUŜOANGULO ) * t, T2BANUDZ);
      sost2.push(soza.addScaledVector(n, BUŜOLEVO));
      tom6nu.push(n);

      sefini.push(BUŜOSEFINI * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    hakek.push(kf2TeznStrikon(sost2, tom6nu, sefini, BUŜODIKECO));
  }
  const zace = vakox2qQoxaKefoujn(hakek);
  const qan2k = zace.attributes.uv;
  for ( let i = 0o0; i < qan2k.count; i++ ) qan2k.setXY(i, 0o4/0o100, 0o4/0o100);
  return zace;
}

export function kf2Nazon(): THREE.BufferGeometry {

  const dy = -0o44/0o1000, dz = 0o122/0o1000;
  const [ tapu, vertikala, p6kpu ] = tezBazaro(0o0, dy, dz);
  const kozuni = new THREE.Vector3(0o0, KAPAY + dy, dz);
  const L6DA = 0o13/0o1000;
  const hatafkaq: [ number, number ][] = [
    [ 0o0, L6DA ], [ -0o1/0o40, -L6DA ], [ 0o1/0o40, -L6DA ] ];

  const ebenoj: [ number, number, number ][] = [];
  for ( let i = 0o0; i < 0o3; i++ ) {
    const a = hatafkaq[i], b = hatafkaq[( i + 0o1 ) % 0o3 ];
    const rx = b[0o0] - a[0o0], ry = b[0o1] - a[0o1];
    const sahakani = Math.hypot(rx, ry);
    let nx = ry / sahakani, ny = -rx / sahakani;
    let h6kuni = nx * a[0o0] + ny * a[0o1];
    if ( h6kuni < 0o0 ) { nx = -nx; ny = -ny; h6kuni = -h6kuni; }
    ebenoj.push([ nx, ny, h6kuni ]);
  }
  const N = 0o16;
  const haxekuxa: number[] = [];
  for ( const [ pal6, vap6zukani ] of [ [ 0o1, 0o4/0o1000 ], [ 0o11/0o20, 0o11/0o1000 ] ] as [ number, number ][] ) {
    for ( let i = 0o0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const ux = Math.cos(t), uy = Math.sin(t);
      let tlunakani = 0o0;
      for ( const [ nx, ny, h6kuni ] of ebenoj ) {
        const skek2 = ( nx * ux + ny * uy ) / h6kuni;
        if ( skek2 > 0o0 ) tlunakani += skek2 ** 0o4;
      }
      const r = tlunakani > 0o0 ? Math.pow(tlunakani, -0o1/0o4) : 0o0;
      const px = r * ux, py = r * uy;

      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * L6DA ) + 0o1/0o2 ) );
      const diko = vap6zukani * f;
      haxekuxa.push(
        kozuni.x + tapu.x * px * pal6 + vertikala.x * py * pal6 + p6kpu.x * diko,
        kozuni.y + tapu.y * px * pal6 + vertikala.y * py * pal6 + p6kpu.y * diko,
        kozuni.z + tapu.z * px * pal6 + vertikala.z * py * pal6 + p6kpu.z * diko);
    }
  }
  const n2k = 0o12/0o1000;
  haxekuxa.push(kozuni.x + p6kpu.x * n2k, kozuni.y + p6kpu.y * n2k,
    kozuni.z + p6kpu.z * n2k);
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2Bufezacen(haxekuxa, havecax2lani);
}

const KRANIAJRINGOJ: [ number, number, number, number ][] = [
  [  0o122/0o1000, 0o40/0o1000,  0o40/0o1000, 0o0           ],
  [  0o110/0o1000, 0o63/0o1000,  0o63/0o1000, 0o0           ],
  [  0o71/0o1000,  0o103/0o1000, 0o103/0o1000, 0o0          ],
  [  0o45/0o1000,  0o117/0o1000, 0o117/0o1000, 0o0          ],
  [  0o20/0o1000,  0o126/0o1000, 0o126/0o1000, 0o0          ],
  [ -0o4/0o1000,   0o127/0o1000, 0o127/0o1000, 0o0          ],
  [ -0o34/0o1000,  0o123/0o1000, 0o123/0o1000, 0o0          ],
  [ -0o50/0o1000,  0o116/0o1000, 0o121/0o1000, 0o0          ],
  [ -0o66/0o1000,  0o77/0o1000,  0o107/0o1000, 0o0          ],
  [ -0o102/0o1000, 0o56/0o1000,  0o74/0o1000,  0o2/0o1000 ],
  [ -0o114/0o1000, 0o36/0o1000,  0o57/0o1000,  0o5/0o1000 ],
  [ -0o124/0o1000, 0o20/0o1000,  0o41/0o1000,  0o11/0o1000 ],
  [ -0o130/0o1000, 0o6/0o1000,   0o22/0o1000,  0o13/0o1000 ],
];

export function kf2KapanKranion(): THREE.BufferGeometry {
  const K = 0o20;
  const hac2q = KRANIAJRINGOJ;
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0o0, KAPAY + y, dz ] as [ number, number, number ]);
  return kf2RinganSurfacon([ sost2(hac2q[0o0][0o0], hac2q[0o0][0o3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPAY + y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0o0], hac2q[hac2q.length - 0o1][0o3]) ]);
}

const ORELAJSEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],
];

const ORELAENIRO = 0o6/0o1000;
const ORELAKLINO = 0o15/0o1000;
const ORELADIKO = 0o4/0o1000;
const ORELAKONKO = 0o4/0o1000;

export function kf2Orelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;

  const h6k6 = (kos: number, sin: number) =>
    Math.max(0o0, kos) * ( 0o1 - sin * sin );
  const qaroxema = (dy: number, ne3ak2: number, neterue: number, santa: number)
    : [ number, number, number ][] => {
    const zc = ( ne3ak2 + neterue ) / 0o2, d = ( ne3ak2 - neterue ) / 0o2;
    const [ soza ] = kapaSoza(0o1, dy, zc);
    const xc = soza.x - ORELAENIRO;
    const s2sabo = ORELAKLINO * santa;
    return Array.from({ length: K }, ( _, i ) => {
      const t = i / K * Math.PI * 0o2;
      const kos = Math.cos(t), sin = Math.sin(t);
      const x = xc + s2sabo * ( 0o1 - sin ) / 0o2
        + ORELADIKO * kos - ORELAKONKO * h6k6(kos, sin);
      return [ dir * x, KAPAY + dy, zc + d * sin ] as [ number, number, number ];
    });
  };
  const n2k = (dy: number, ne3ak2: number, neterue: number, santa: number)
    : [ number, number, number ][] => {
    const zc = ( ne3ak2 + neterue ) / 0o2;
    const [ soza ] = kapaSoza(0o1, dy, zc);
    const x = soza.x - ORELAENIRO + ORELAKLINO * santa * 0o1/0o2;
    return Array.from({ length: K },
      () => [ dir * x, KAPAY + dy, zc ] as [ number, number, number ]);
  };

  const xaqadi = ORELAJSEKCOJ[0o0], z2hak = ORELAJSEKCOJ[ORELAJSEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;
  return kf2RinganSurfacon([
    n2k(xaqadi[0o0] + preter, xaqadi[0o1], xaqadi[0o2], xaqadi[0o3]),
    ...ORELAJSEKCOJ.map(([ dy, ne3ak2, neterue, santa ]) =>
      qaroxema(dy, ne3ak2, neterue, santa)),
    n2k(z2hak[0o0] - preter, z2hak[0o1], z2hak[0o2], z2hak[0o3]),
  ]);
}
