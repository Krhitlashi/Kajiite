// ≺⧼ j͑ʃɔ ɭʃɔƴ ʌ ſ͕ɭɜ ı],ᴜ 👁️ ⧽≻
import * as THREE from "three";
import { kf2Bufezacen, vakox2qQoxaKefoujn } from "../../x2x2q/hakox2q.js";
import { superpuc2q, kf2RinganSurfacon } from "./haqoxa.js";
import { KAPAY, KOLOY } from "./havecax2l.js";
import { T2BANUL6DA, T2BANUDX, T2BANUDY, T2BANUDZ, T2BANUSEFINI, BROVAP2SOMANI, BROVAL6DA, BROVAARko, BROVAKLINO, BROVASEFINI, BROVADIKECO, BROVALEVO, LAŜOSEFINI, LAŜODIKECO, LAŜOLEVO, BUŜOP2SOMANI, BUŜOANGULO, BUŜOMEZO, BUŜOSEFINI, BUŜODIKECO, BUŜOLEVO, BUŜOSTACIOJ, STRIOKA5ASEXAZ, T2BANUDIKO, PALPEBRAGRANDO, PALPEBZACE, T2BANUNORMALAY, PALPEBRASTRIO } from "./t2banu.js";

// ⟪ ſ͕ɭɜ ı],ᴜ , j͑ʃᴜ ʃɜƽ 👁️ ⟫

function vizaĝaBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const x2x2q = new THREE.Vector3(dx, dy, dz).normalize();
  const tapu = new THREE.Vector3(0, 0o1, 0).cross(x2x2q).normalize();
  return [ tapu, x2x2q.clone().cross(tapu).normalize(), x2x2q ];
}

export function kf2Okulon(dir: number, dx: number, dy: number, dz: number,
  sefini: number, l6da: number, s2sabo: number): THREE.BufferGeometry {
  const [ tapu, vertikala, x2x2q ] = vizaĝaBazaro(dir * dx, dy, dz);
  // ⟨ j͑ʃͷ̗ᴜʞ , }ʃɹƽ , ꞙɭı , ⟅ ⟩
  const N = 0o20;
  const DIKO = 0o1/0o200;
  const kozuni = new THREE.Vector3(dir * dx, KAPAY + dy, dz);
  const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
  const haxekuxa: number[] = [];
  // ⟨ UV , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  const qan2k: number[] = [];
  // ⟨ ɭʃɹ ſ͕ɭɹ , ꞙɭɿ , ɭʃэ ɭʃᴜ , ⟅ ⟩
  for ( const [ pal6, diko ] of [ [ 0o1, 0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {
    // ⟨ ɭʃꞇƽ , j͑ʃͷ̗ᴜʞ , ⟅ ⟩
    const lg = sefini * pal6, ag = l6da * pal6;
    const R = ( lg * lg + ag * ag ) / ( 0o2 * ag );
    const Rr = R * R, Rm = R - ag;
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const k = Math.cos(t), s = Math.sin(t);
      // ⟨ j͑ʃͷ̗ᴜʞ , ⟅ ⟩
      const fx = lg * k;
      const slaf = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * slaf;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      haxekuxa.push(
        kozuni.x + tapu.x * rx + vertikala.x * ry + x2x2q.x * diko,
        kozuni.y + tapu.y * rx + vertikala.y * ry + x2x2q.y * diko,
        kozuni.z + tapu.z * rx + vertikala.z * ry + x2x2q.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
  }
  haxekuxa.push(kozuni.x + x2x2q.x * DIKO, kozuni.y + x2x2q.y * DIKO, kozuni.z + x2x2q.z * DIKO);
  qan2k.push(0o1/0o2, 0o1/0o2);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ ſᶘɔ ʌ ꞙɭı , ꞙɭı , ⟅ ⟩
export function palpebraPivoto(): number {
  return KAPAY + T2BANUDY + PALPEBRASTRIO - KOLOY;
}

// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
// ⟨ j͐ʃэ ɭ(ᴜ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ ⟩
export function kf2Palpebrojn(): THREE.BufferGeometry {
  const N = 0o20;
  const sefini = T2BANUSEFINI * PALPEBRAGRANDO;
  const l6da = T2BANUL6DA * PALPEBRAGRANDO;
  const diko = T2BANUDIKO + PALPEBZACE;
  const levo = PALPEBRASTRIO + T2BANUNORMALAY * diko;
  const R = ( sefini * sefini + l6da * l6da ) / ( 0o2 * l6da ), Rr = R * R, Rm = R - l6da;
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ tapu, vertikala, x2x2q ] = vizaĝaBazaro(dir * T2BANUDX,
      T2BANUDY, T2BANUDZ);
    // ⟨ ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ⟅ ⟩
    const s2sabo = dir * 0o1/0o10;
    const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
    const haxekuxa: number[] = [], qan2k: number[] = [], havecax2lani: number[] = [];
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = sefini * k;
      const slaf = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * slaf;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      haxekuxa.push(dir * T2BANUDX + tapu.x * rx + vertikala.x * ry
        + x2x2q.x * diko, vertikala.y * ry + x2x2q.y * diko - levo,
        T2BANUDZ + tapu.z * rx + vertikala.z * ry + x2x2q.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
    haxekuxa.push(dir * T2BANUDX + x2x2q.x * diko, x2x2q.y * diko - levo,
      T2BANUDZ + x2x2q.z * diko);
    qan2k.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0; i < N; i++ ) havecax2lani.push(i, ( i + 0o1 ) % N, N);
    hakek.push(kf2Bufezacen(haxekuxa, havecax2lani, { qan2k }));
  }
  return vakox2qQoxaKefoujn(hakek);
}

function kapaSoza(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3 ] {
  let sube = KRANIAJRINGOJ[0], tik = KRANIAJRINGOJ[KRANIAJRINGOJ.length - 0o1];
  for ( let i = 0; i + 0o1 < KRANIAJRINGOJ.length; i++ ) {
    if ( dy <= KRANIAJRINGOJ[i][0] && dy >= KRANIAJRINGOJ[i + 0o1][0] ) {
      sube = KRANIAJRINGOJ[i]; tik = KRANIAJRINGOJ[i + 0o1];
      break;
    }
  }
  const t = ( sube[0] - dy ) / ( sube[0] - tik[0] || 0o1 );
  const a = sube[1] + ( tik[1] - sube[1] ) * t;
  const b = sube[2] + ( tik[2] - sube[2] ) * t;
  const ne3ak2 = sube[3] + ( tik[3] - sube[3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPAY + dy, dz * k + ne3ak2),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

function kf2VizaĝanStrikon(sost2: THREE.Vector3[], hax2x2q: THREE.Vector3[],
  sefini: number[], kof: number): THREE.BufferGeometry {
  const K = 0o4;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i < sost2.length; i++ ) {
    // ⟨ ꞙɭı , ſȷƽᴜ ʃɔ , ⟅ ⟩
    const ne3ak2 = sost2[Math.max(0, i - 0o1)];
    const post = sost2[Math.min(sost2.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(ne3ak2).normalize();
    const x2x2q = hax2x2q[i];
    const larĝa = new THREE.Vector3().crossVectors(x2x2q, tanĝanto).normalize();
    const p2somaniSefini = sefini[i] * 0o1/0o2, p2somaniKof = kof * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      haxekuxa.push(sost2[i].x + larĝa.x * sb * p2somaniSefini + x2x2q.x * sn * p2somaniKof,
        sost2[i].y + larĝa.y * sb * p2somaniSefini + x2x2q.y * sn * p2somaniKof,
        sost2[i].z + larĝa.z * sb * p2somaniSefini + x2x2q.z * sn * p2somaniKof);
      // ⟨ UV , ſᶘᴜȝ , j͑ʃɜ ſɭ,ᴜ , ⟅ ⟩
      qan2k.push(i / ( sost2.length - 0o1 ), 0o1/0o2 + sn * 0o1/0o2);
    }
  }
  for ( let i = 0; i + 0o1 < sost2.length; i++ ) {
    for ( let j = 0; j < K; j++ ) {
      const a = i * K + j, b = i * K + ( j + 0o1 ) % K;
      const c = ( i + 0o1 ) * K + j, d = ( i + 0o1 ) * K + ( j + 0o1 ) % K;
      havecax2lani.push(a, b, c, b, d, c);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

export function kf2VizaĝajnStrikojn(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const sost2 = new THREE.Vector3(0, KAPAY, 0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const s2sabo = dir * 0o1/0o10;
    const [ tapu, vertikala, x2x2q ] = vizaĝaBazaro(dir * T2BANUDX, T2BANUDY, T2BANUDZ);
    const kozuni = new THREE.Vector3(dir * T2BANUDX, KAPAY + T2BANUDY, T2BANUDZ);
    // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
    const brovHasost2: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovSefinij: number[] = [];
    for ( let i = 0; i <= STRIOKA5ASEXAZ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIOKA5ASEXAZ;
      const p = kozuni.clone()
        .addScaledVector(tapu, s * BROVAP2SOMANI)
        .addScaledVector(vertikala, BROVAL6DA + BROVAARko * ( 0o1 - s * s ) - BROVAKLINO * s * dir);
      const [ soza, n ] = kapaSoza(p.x - sost2.x, p.y - sost2.y, p.z - sost2.z);
      brovHasost2.push(soza.addScaledVector(n, BROVALEVO)); brovNormaloj.push(n);
      brovSefinij.push(BROVASEFINI * ( 0o1 - 0o3/0o4 * s * s ));
    }
    hakek.push(kf2VizaĝanStrikon(brovHasost2, brovNormaloj, brovSefinij, BROVADIKECO));
    // ⟨ ɭʃɹ ʃᴜ }ʃw , ſᶘᴜȝ , ⟅ ⟩
    const laŝHasost2: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝSefinij: number[] = [];
    const R = ( T2BANUSEFINI * T2BANUSEFINI + T2BANUL6DA * T2BANUL6DA ) / ( 0o2 * T2BANUL6DA );
    const kos = Math.cos(s2sabo), sin = Math.sin(s2sabo);
    for ( let i = 0; i <= STRIOKA5ASEXAZ; i++ ) {
      const fi = Math.PI * i / STRIOKA5ASEXAZ;
      const fx = T2BANUSEFINI * Math.cos(fi);
      const py = Math.sqrt(Math.max(0, R * R - fx * fx)) - (R - T2BANUL6DA);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝHasost2.push(kozuni.clone()
        .addScaledVector(tapu, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(x2x2q, LAŜOLEVO));
      laŝNormaloj.push(x2x2q.clone());
      const pukaz = Math.abs(i / STRIOKA5ASEXAZ * 0o2 - 0o1);
      laŝSefinij.push(LAŜOSEFINI * ( 0o1 - 0o3/0o4 * pukaz * pukaz ));
    }
    hakek.push(kf2VizaĝanStrikon(laŝHasost2, laŝNormaloj, laŝSefinij, LAŜODIKECO));
  }
  return vakox2qQoxaKefoujn(hakek);
}

// ⟨ UV , ꞙɭı , ⟅ ⟩
export function kf2Buŝon(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const sost2: THREE.Vector3[] = [];
    const hax2x2q: THREE.Vector3[] = [];
    const sefini: number[] = [];
    for ( let i = 0; i <= BUŜOSTACIOJ; i++ ) {
      const t = i / BUŜOSTACIOJ;
      // ⟨ ꞙɭı , ꞙɭɿ , ⟅ ⟩
      const [ soza, n ] = kapaSoza(dir * BUŜOP2SOMANI * ( 0o1 - t ),
        BUŜOANGULO + ( BUŜOMEZO - BUŜOANGULO ) * t, T2BANUDZ);
      sost2.push(soza.addScaledVector(n, BUŜOLEVO));
      hax2x2q.push(n);
      // ⟨ ꞙɭı , ⟅ ⟩
      sefini.push(BUŜOSEFINI * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    hakek.push(kf2VizaĝanStrikon(sost2, hax2x2q, sefini, BUŜODIKECO));
  }
  const zace = vakox2qQoxaKefoujn(hakek);
  const qan2k = zace.attributes.uv;
  for ( let i = 0; i < qan2k.count; i++ ) qan2k.setXY(i, 0o4/0o100, 0o4/0o100);
  return zace;
}

export function kf2Nazon(): THREE.BufferGeometry {
  // ⟨ }ʃᴜƴ ꞁȷ̀ᴜ }ʃw , ⟅ ⟩
  // ⟨ }ʃᴜƴ ꞁȷ̀ᴜ }ʃw , j͑ʃᴜ ʃɜƽ , ꞙɭı , ⟅ ⟩
  const dy = -0o44/0o1000, dz = 0o122/0o1000;
  const [ tapu, vertikala, x2x2q ] = vizaĝaBazaro(0, dy, dz);
  const kozuni = new THREE.Vector3(0, KAPAY + dy, dz);
  const L6DA = 0o13/0o1000;
  const hatafkaq: [ number, number ][] = [
    [ 0, L6DA ], [ -0o1/0o40, -L6DA ], [ 0o1/0o40, -L6DA ] ];
  // ⟨ ꞙɭı , ⟅ ⟩
  const ebenoj: [ number, number, number ][] = [];
  for ( let i = 0; i < 0o3; i++ ) {
    const a = hatafkaq[i], b = hatafkaq[( i + 0o1 ) % 0o3 ];
    const rx = b[0] - a[0], ry = b[1] - a[1];
    const sahakani = Math.hypot(rx, ry);
    let nx = ry / sahakani, ny = -rx / sahakani;
    let h6kuni = nx * a[0] + ny * a[1];
    if ( h6kuni < 0 ) { nx = -nx; ny = -ny; h6kuni = -h6kuni; }
    ebenoj.push([ nx, ny, h6kuni ]);
  }
  const N = 0o16;
  const haxekuxa: number[] = [];
  for ( const [ pal6, vap6zukani ] of [ [ 0o1, 0o4/0o1000 ], [ 0o11/0o20, 0o11/0o1000 ] ] as [ number, number ][] ) {
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const ux = Math.cos(t), uy = Math.sin(t);
      let tlunakani = 0;
      for ( const [ nx, ny, h6kuni ] of ebenoj ) {
        const skek2 = ( nx * ux + ny * uy ) / h6kuni;
        if ( skek2 > 0 ) tlunakani += skek2 ** 0o4;
      }
      const r = tlunakani > 0 ? Math.pow(tlunakani, -0o1/0o4) : 0;
      const px = r * ux, py = r * uy;
      // ⟨ j͑ʃɜ j͐ʃɹ , ⟅ ⟩
      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * L6DA ) + 0o1/0o2 ) );
      const diko = vap6zukani * f;
      haxekuxa.push(
        kozuni.x + tapu.x * px * pal6 + vertikala.x * py * pal6 + x2x2q.x * diko,
        kozuni.y + tapu.y * px * pal6 + vertikala.y * py * pal6 + x2x2q.y * diko,
        kozuni.z + tapu.z * px * pal6 + vertikala.z * py * pal6 + x2x2q.z * diko);
    }
  }
  const n2k = 0o12/0o1000;
  haxekuxa.push(kozuni.x + x2x2q.x * n2k, kozuni.y + x2x2q.y * n2k,
    kozuni.z + x2x2q.z * n2k);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2Bufezacen(haxekuxa, havecax2lani);
}
// ⟪ j͑ʃᴜ ʃɜ , ſ̀ȷᴜ ſןɹ ᶅſw ſןɜ j͑ʃᴜꞇ 🗿 ⟫
const KRANIAJRINGOJ: [ number, number, number, number ][] = [
  [  0o122/0o1000, 0o40/0o1000,  0o40/0o1000, 0           ],
  [  0o110/0o1000, 0o63/0o1000,  0o63/0o1000, 0           ],
  [  0o71/0o1000,  0o103/0o1000, 0o103/0o1000, 0          ],
  [  0o45/0o1000,  0o117/0o1000, 0o117/0o1000, 0          ],
  [  0o20/0o1000,  0o126/0o1000, 0o126/0o1000, 0          ],
  [ -0o4/0o1000,   0o127/0o1000, 0o127/0o1000, 0          ],
  [ -0o34/0o1000,  0o123/0o1000, 0o123/0o1000, 0          ],
  [ -0o50/0o1000,  0o116/0o1000, 0o121/0o1000, 0          ],
  [ -0o66/0o1000,  0o77/0o1000,  0o107/0o1000, 0          ],
  [ -0o102/0o1000, 0o56/0o1000,  0o74/0o1000,  0o2/0o1000 ],
  [ -0o114/0o1000, 0o36/0o1000,  0o57/0o1000,  0o5/0o1000 ],
  [ -0o124/0o1000, 0o20/0o1000,  0o41/0o1000,  0o11/0o1000 ],
  [ -0o130/0o1000, 0o6/0o1000,   0o22/0o1000,  0o13/0o1000 ],
];

// ⟨ ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ⟩
// ⟨ ſɭэ ɭʃᴜ , ꞙɭɔ , ⟅ ⟩
export function kf2KapanKranion(): THREE.BufferGeometry {
  const K = 0o20;
  const hac2q = KRANIAJRINGOJ;
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, KAPAY + y, dz ] as [ number, number, number ]);
  return kf2RinganSurfacon([ sost2(hac2q[0][0], hac2q[0][3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPAY + y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0], hac2q[hac2q.length - 0o1][3]) ]);
}

// ⟪ j͐ʃw ſɭʞɔ }ʃw 👂 ⟫
// ⟨ ſᶘɔ ʌ ꞙɭı , ⟅ ⟩
const ORELAJSEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],
];
// ⟨ j͐ʃw ſɭʞɔ }ʃw , ꞙɭц , j͑ʃᴜ ſɭ,w , ⟅ ⟩
const ORELAENIRO = 0o6/0o1000;
const ORELAKLINO = 0o15/0o1000;
const ORELADIKO = 0o4/0o1000;
const ORELAKONKO = 0o4/0o1000;

// ⟨ j͑ʃᴜ ʃɜ , ⟅ ⟩
// ⟨ ɭʃɜ ſɭɹȝ , ⟅ ⟩
export function kf2Orelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;
  // ⟨ ſɭэ ɭʃᴜ , ſɟɔȝ , ⟅ ⟩
  const h6k6 = (kos: number, sin: number) =>
    Math.max(0, kos) * ( 0o1 - sin * sin );
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
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭı , ⟅ ⟩
  const xaqadi = ORELAJSEKCOJ[0], z2hak = ORELAJSEKCOJ[ORELAJSEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;
  return kf2RinganSurfacon([
    n2k(xaqadi[0] + preter, xaqadi[1], xaqadi[2], xaqadi[3]),
    ...ORELAJSEKCOJ.map(([ dy, ne3ak2, neterue, santa ]) =>
      qaroxema(dy, ne3ak2, neterue, santa)),
    n2k(z2hak[0] - preter, z2hak[1], z2hak[2], z2hak[3]),
  ]);
}
