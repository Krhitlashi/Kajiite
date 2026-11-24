// ≺⧼ j͑ʃɔ ɭʃɔƴ ʌ ſ͕ɭɜ ı],ᴜ 👁️ ⧽≻
import * as THREE from "three";
import { kf2BuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kf2RinganSurfacon } from "./haqoxa.js";
import { KAPA_Y, KOLO_Y } from "./havecax2l.js";
import { T2BANU_ALTO, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI, BROVA_DUONO, BROVA_ALTO, BROVA_ARko, BROVA_KLINO, BROVA_SEFINI, BROVA_DIKECO, BROVA_LEVO, LAŜO_SEFINI, LAŜO_DIKECO, LAŜO_LEVO, BUŜO_DUONO, BUŜO_ANGULO, BUŜO_MEZO, BUŜO_SEFINI, BUŜO_DIKECO, BUŜO_LEVO, BUŜO_STACIOJ, STRIO_STACIOJ, T2BANU_DIKO, PALPEBRA_GRANDO, PALPEBRA_DIKO, T2BANU_NORMALA_Y, PALPEBRA_STRIO } from "./okuloj.js";

// ⟪ ſ͕ɭɜ ı],ᴜ , j͑ʃᴜ ʃɜƽ 👁️ ⟫

function vizaĝaBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const normalo = new THREE.Vector3(dx, dy, dz).normalize();
  const horizontala = new THREE.Vector3(0, 0o1, 0).cross(normalo).normalize();
  return [ horizontala, normalo.clone().cross(horizontala).normalize(), normalo ];
}

export function kf2Okulon(dir: number, dx: number, dy: number, dz: number,
  sefini: number, l6da: number, klino: number): THREE.BufferGeometry {
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * dx, dy, dz);
  // ⟨ j͑ʃͷ̗ᴜʞ , }ʃɹƽ , ꞙɭı , ⟅ ⟩
  const N = 0o20;
  const DIKO = 0o1/0o200;
  const kozuni = new THREE.Vector3(dir * dx, KAPA_Y + dy, dz);
  const kos = Math.cos(klino), sin = Math.sin(klino);
  const haxekuxa: number[] = [];
  // ⟨ UV , ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  const qan2k: number[] = [];
  // ⟨ ɭʃɹ ſ͕ɭɹ , ꞙɭɿ , ɭʃэ ɭʃᴜ , ⟅ ⟩
  for ( const [ grando, diko ] of [ [ 0o1, 0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {
    // ⟨ ɭʃꞇƽ , j͑ʃͷ̗ᴜʞ , ⟅ ⟩
    const lg = sefini * grando, ag = l6da * grando;
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
        kozuni.x + horizontala.x * rx + vertikala.x * ry + normalo.x * diko,
        kozuni.y + horizontala.y * rx + vertikala.y * ry + normalo.y * diko,
        kozuni.z + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
  }
  haxekuxa.push(kozuni.x + normalo.x * DIKO, kozuni.y + normalo.y * DIKO, kozuni.z + normalo.z * DIKO);
  qan2k.push(0o1/0o2, 0o1/0o2);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ ſᶘɔ ʌ ꞙɭı , ꞙɭı , ⟅ ⟩
export function palpebraPivoto(): number {
  return KAPA_Y + T2BANU_DY + PALPEBRA_STRIO - KOLO_Y;
}

// ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ꞙɭı , ⟅ ⟩
// ⟨ j͐ʃэ ɭ(ᴜ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ ⟩
export function kf2Palpebrojn(): THREE.BufferGeometry {
  const N = 0o20;
  const sefini = T2BANU_SEFINI * PALPEBRA_GRANDO;
  const l6da = T2BANU_ALTO * PALPEBRA_GRANDO;
  const diko = T2BANU_DIKO + PALPEBRA_DIKO;
  const levo = PALPEBRA_STRIO + T2BANU_NORMALA_Y * diko;
  const R = ( sefini * sefini + l6da * l6da ) / ( 0o2 * l6da ), Rr = R * R, Rm = R - l6da;
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * T2BANU_DX,
      T2BANU_DY, T2BANU_DZ);
    // ⟨ ɭʃɹ ʃᴜ }ʃw , ꞙɭı , ⟅ ⟩
    const klino = dir * 0o1/0o10;
    const kos = Math.cos(klino), sin = Math.sin(klino);
    const haxekuxa: number[] = [], qan2k: number[] = [], havecax2lani: number[] = [];
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = sefini * k;
      const slaf = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * slaf;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      haxekuxa.push(dir * T2BANU_DX + horizontala.x * rx + vertikala.x * ry
        + normalo.x * diko, vertikala.y * ry + normalo.y * diko - levo,
        T2BANU_DZ + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      qan2k.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
    haxekuxa.push(dir * T2BANU_DX + normalo.x * diko, normalo.y * diko - levo,
      T2BANU_DZ + normalo.z * diko);
    qan2k.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0; i < N; i++ ) havecax2lani.push(i, ( i + 0o1 ) % N, N);
    hakek.push(kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k }));
  }
  return kunfandiGeometriojn(hakek);
}

function kapaSurfaco(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3 ] {
  let sube = KRANIAJ_RINGOJ[0], supre = KRANIAJ_RINGOJ[KRANIAJ_RINGOJ.length - 0o1];
  for ( let i = 0; i + 0o1 < KRANIAJ_RINGOJ.length; i++ ) {
    if ( dy <= KRANIAJ_RINGOJ[i][0] && dy >= KRANIAJ_RINGOJ[i + 0o1][0] ) {
      sube = KRANIAJ_RINGOJ[i]; supre = KRANIAJ_RINGOJ[i + 0o1];
      break;
    }
  }
  const t = ( sube[0] - dy ) / ( sube[0] - supre[0] || 0o1 );
  const a = sube[1] + ( supre[1] - sube[1] ) * t;
  const b = sube[2] + ( supre[2] - sube[2] ) * t;
  const ne3ak2 = sube[3] + ( supre[3] - sube[3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPA_Y + dy, dz * k + ne3ak2),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

function kf2VizaĝanStrikon(sost2: THREE.Vector3[], normaloj: THREE.Vector3[],
  sefini: number[], dikeco: number): THREE.BufferGeometry {
  const K = 0o4;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i < sost2.length; i++ ) {
    // ⟨ ꞙɭı , ſȷƽᴜ ʃɔ , ⟅ ⟩
    const ne3ak2 = sost2[Math.max(0, i - 0o1)];
    const post = sost2[Math.min(sost2.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(ne3ak2).normalize();
    const normalo = normaloj[i];
    const larĝa = new THREE.Vector3().crossVectors(normalo, tanĝanto).normalize();
    const p2somaniSefini = sefini[i] * 0o1/0o2, duonDikeco = dikeco * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      haxekuxa.push(sost2[i].x + larĝa.x * sb * p2somaniSefini + normalo.x * sn * duonDikeco,
        sost2[i].y + larĝa.y * sb * p2somaniSefini + normalo.y * sn * duonDikeco,
        sost2[i].z + larĝa.z * sb * p2somaniSefini + normalo.z * sn * duonDikeco);
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
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

export function kf2VizaĝajnStrikojn(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const sost2 = new THREE.Vector3(0, KAPA_Y, 0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const klino = dir * 0o1/0o10;
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * T2BANU_DX, T2BANU_DY, T2BANU_DZ);
    const kozuni = new THREE.Vector3(dir * T2BANU_DX, KAPA_Y + T2BANU_DY, T2BANU_DZ);
    // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
    const brovCentroj: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovSefinij: number[] = [];
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIO_STACIOJ;
      const p = kozuni.clone()
        .addScaledVector(horizontala, s * BROVA_DUONO)
        .addScaledVector(vertikala, BROVA_ALTO + BROVA_ARko * ( 0o1 - s * s ) - BROVA_KLINO * s * dir);
      const [ soza, n ] = kapaSurfaco(p.x - sost2.x, p.y - sost2.y, p.z - sost2.z);
      brovCentroj.push(soza.addScaledVector(n, BROVA_LEVO)); brovNormaloj.push(n);
      brovSefinij.push(BROVA_SEFINI * ( 0o1 - 0o3/0o4 * s * s ));
    }
    hakek.push(kf2VizaĝanStrikon(brovCentroj, brovNormaloj, brovSefinij, BROVA_DIKECO));
    // ⟨ ɭʃɹ ʃᴜ }ʃw , ſᶘᴜȝ , ⟅ ⟩
    const laŝCentroj: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝSefinij: number[] = [];
    const R = ( T2BANU_SEFINI * T2BANU_SEFINI + T2BANU_ALTO * T2BANU_ALTO ) / ( 0o2 * T2BANU_ALTO );
    const kos = Math.cos(klino), sin = Math.sin(klino);
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const fi = Math.PI * i / STRIO_STACIOJ;
      const fx = T2BANU_SEFINI * Math.cos(fi);
      const py = Math.sqrt(Math.max(0, R * R - fx * fx)) - (R - T2BANU_ALTO);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝCentroj.push(kozuni.clone()
        .addScaledVector(horizontala, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(normalo, LAŜO_LEVO));
      laŝNormaloj.push(normalo.clone());
      const pukaz = Math.abs(i / STRIO_STACIOJ * 0o2 - 0o1);
      laŝSefinij.push(LAŜO_SEFINI * ( 0o1 - 0o3/0o4 * pukaz * pukaz ));
    }
    hakek.push(kf2VizaĝanStrikon(laŝCentroj, laŝNormaloj, laŝSefinij, LAŜO_DIKECO));
  }
  return kunfandiGeometriojn(hakek);
}

// ⟨ UV , ꞙɭı , ⟅ ⟩
export function kf2Buŝon(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const sost2: THREE.Vector3[] = [];
    const normaloj: THREE.Vector3[] = [];
    const sefini: number[] = [];
    for ( let i = 0; i <= BUŜO_STACIOJ; i++ ) {
      const t = i / BUŜO_STACIOJ;
      // ⟨ ꞙɭı , ꞙɭɿ , ⟅ ⟩
      const [ soza, n ] = kapaSurfaco(dir * BUŜO_DUONO * ( 0o1 - t ),
        BUŜO_ANGULO + ( BUŜO_MEZO - BUŜO_ANGULO ) * t, T2BANU_DZ);
      sost2.push(soza.addScaledVector(n, BUŜO_LEVO));
      normaloj.push(n);
      // ⟨ ꞙɭı , ⟅ ⟩
      sefini.push(BUŜO_SEFINI * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    hakek.push(kf2VizaĝanStrikon(sost2, normaloj, sefini, BUŜO_DIKECO));
  }
  const geometrio = kunfandiGeometriojn(hakek);
  const qan2k = geometrio.attributes.uv;
  for ( let i = 0; i < qan2k.count; i++ ) qan2k.setXY(i, 0o4/0o100, 0o4/0o100);
  return geometrio;
}

export function kf2Nazon(): THREE.BufferGeometry {
  // ⟨ }ʃᴜƴ ꞁȷ̀ᴜ }ʃw , ⟅ ⟩
  // ⟨ }ʃᴜƴ ꞁȷ̀ᴜ }ʃw , j͑ʃᴜ ʃɜƽ , ꞙɭı , ⟅ ⟩
  const dy = -0o44/0o1000, dz = 0o122/0o1000;
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(0, dy, dz);
  const kozuni = new THREE.Vector3(0, KAPA_Y + dy, dz);
  const ALTO = 0o13/0o1000;
  const hatafkaq: [ number, number ][] = [
    [ 0, ALTO ], [ -0o1/0o40, -ALTO ], [ 0o1/0o40, -ALTO ] ];
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
  for ( const [ grando, faktoro ] of [ [ 0o1, 0o4/0o1000 ], [ 0o11/0o20, 0o11/0o1000 ] ] as [ number, number ][] ) {
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
      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * ALTO ) + 0o1/0o2 ) );
      const diko = faktoro * f;
      haxekuxa.push(
        kozuni.x + horizontala.x * px * grando + vertikala.x * py * grando + normalo.x * diko,
        kozuni.y + horizontala.y * px * grando + vertikala.y * py * grando + normalo.y * diko,
        kozuni.z + horizontala.z * px * grando + vertikala.z * py * grando + normalo.z * diko);
    }
  }
  const pinto = 0o12/0o1000;
  haxekuxa.push(kozuni.x + normalo.x * pinto, kozuni.y + normalo.y * pinto,
    kozuni.z + normalo.z * pinto);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani);
}
// ⟪ j͑ʃᴜ ʃɜ , ſ̀ȷᴜ ſןɹ ᶅſw ſןɜ j͑ʃᴜꞇ 🗿 ⟫
const KRANIAJ_RINGOJ: [ number, number, number, number ][] = [
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
  const hac2q = KRANIAJ_RINGOJ;
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, KAPA_Y + y, dz ] as [ number, number, number ]);
  return kf2RinganSurfacon([ sost2(hac2q[0][0], hac2q[0][3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPA_Y + y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0], hac2q[hac2q.length - 0o1][3]) ]);
}

// ⟪ j͐ʃw ſɭʞɔ }ʃw 👂 ⟫
// ⟨ ſᶘɔ ʌ ꞙɭı , ⟅ ⟩
const ORELAJ_SEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],
];
// ⟨ j͐ʃw ſɭʞɔ }ʃw , ꞙɭц , j͑ʃᴜ ſɭ,w , ⟅ ⟩
const ORELA_ENIRO = 0o6/0o1000;
const ORELA_KLINO = 0o15/0o1000;
const ORELA_DIKO = 0o4/0o1000;
const ORELA_KONKO = 0o4/0o1000;

// ⟨ j͑ʃᴜ ʃɜ , ⟅ ⟩
// ⟨ ɭʃɜ ſɭɹȝ , ⟅ ⟩
export function kf2Orelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;
  // ⟨ ſɭэ ɭʃᴜ , ſɟɔȝ , ⟅ ⟩
  const kavo = (kos: number, sin: number) =>
    Math.max(0, kos) * ( 0o1 - sin * sin );
  const sekco = (dy: number, ne3ak2: number, neterue: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( ne3ak2 + neterue ) / 0o2, d = ( ne3ak2 - neterue ) / 0o2;
    const [ soza ] = kapaSurfaco(0o1, dy, zc);
    const xc = soza.x - ORELA_ENIRO;
    const klino = ORELA_KLINO * elstaro;
    return Array.from({ length: K }, ( _, i ) => {
      const t = i / K * Math.PI * 0o2;
      const kos = Math.cos(t), sin = Math.sin(t);
      const x = xc + klino * ( 0o1 - sin ) / 0o2
        + ORELA_DIKO * kos - ORELA_KONKO * kavo(kos, sin);
      return [ dir * x, KAPA_Y + dy, zc + d * sin ] as [ number, number, number ];
    });
  };
  const pinto = (dy: number, ne3ak2: number, neterue: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( ne3ak2 + neterue ) / 0o2;
    const [ soza ] = kapaSurfaco(0o1, dy, zc);
    const x = soza.x - ORELA_ENIRO + ORELA_KLINO * elstaro * 0o1/0o2;
    return Array.from({ length: K },
      () => [ dir * x, KAPA_Y + dy, zc ] as [ number, number, number ]);
  };
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭı , ⟅ ⟩
  const xaqadi = ORELAJ_SEKCOJ[0], z2hak = ORELAJ_SEKCOJ[ORELAJ_SEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;
  return kf2RinganSurfacon([
    pinto(xaqadi[0] + preter, xaqadi[1], xaqadi[2], xaqadi[3]),
    ...ORELAJ_SEKCOJ.map(([ dy, ne3ak2, neterue, elstaro ]) =>
      sekco(dy, ne3ak2, neterue, elstaro)),
    pinto(z2hak[0] - preter, z2hak[1], z2hak[2], z2hak[3]),
  ]);
}
