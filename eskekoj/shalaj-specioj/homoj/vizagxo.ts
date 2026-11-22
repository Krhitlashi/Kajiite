// ≺⧼ ទម្រង់មុខ 👁️ ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion, kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kreiRinganSurfacon } from "./formoj.js";
import { KAPA_Y, KOLO_Y } from "./mezuroj.js";
import { OKULA_ALTO, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, BROVA_DUONO, BROVA_ALTO, BROVA_ARko, BROVA_KLINO, BROVA_LARĜO, BROVA_DIKECO, BROVA_LEVO, LAŜO_LARĜO, LAŜO_DIKECO, LAŜO_LEVO, BUŜO_DUONO, BUŜO_ANGULO, BUŜO_MEZO, BUŜO_LARĜO, BUŜO_DIKECO, BUŜO_LEVO, BUŜO_STACIOJ, STRIO_STACIOJ, OKULA_DIKO, PALPEBRA_GRANDO, PALPEBRA_DIKO, OKULA_NORMALA_Y, PALPEBRA_STRIO } from "./okuloj.js";

// ⟪ ទម្រង់មុខ 👁️ ⟫

function vizaĝaBazaro(dx: number, dy: number, dz: number)
  : [ THREE.Vector3, THREE.Vector3, THREE.Vector3 ] {
  const normalo = new THREE.Vector3(dx, dy, dz).normalize();
  const horizontala = new THREE.Vector3(0, 0o1, 0).cross(normalo).normalize();
  return [ horizontala, normalo.clone().cross(horizontala).normalize(), normalo ];
}

export function kreiOkulon(dir: number, dx: number, dy: number, dz: number,
  sefini: number, l6da: number, klino: number): THREE.BufferGeometry {
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * dx, dy, dz);
  // ⟨ ស្លឹកត្រូវការចំណុចច្រើន 📃 ⟩
  const N = 0o20;
  const DIKO = 0o1/0o200;
  const kozuni = new THREE.Vector3(dir * dx, KAPA_Y + dy, dz);
  const kos = Math.cos(klino), sin = Math.sin(klino);
  const pozicioj: number[] = [];
  // ⟨ UV បង្ហាញរង្វង់ភ្នែក 📃 ⟩
  const uvoj: number[] = [];
  // ⟨ រង្វង់ពីរ និងកណ្តាល 📃 ⟩
  for ( const [ grando, diko ] of [ [ 0o1, 0 ], [ 0o11/0o20, DIKO * 0o7/0o10 ] ] as [ number, number ][] ) {
    // ⟨ កាំធ្នូស្លឹក 📃 ⟩
    const lg = sefini * grando, ag = l6da * grando;
    const R = ( lg * lg + ag * ag ) / ( 0o2 * ag );
    const Rr = R * R, Rm = R - ag;
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2;
      const k = Math.cos(t), s = Math.sin(t);
      // ⟨ ស្លឹក 📃 ⟩
      const fx = lg * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(
        kozuni.x + horizontala.x * rx + vertikala.x * ry + normalo.x * diko,
        kozuni.y + horizontala.y * rx + vertikala.y * ry + normalo.y * diko,
        kozuni.z + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
  }
  pozicioj.push(kozuni.x + normalo.x * DIKO, kozuni.y + normalo.y * DIKO, kozuni.z + normalo.z * DIKO);
  uvoj.push(0o1/0o2, 0o1/0o2);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
}

// ⟨ ហេតុអ្វីអ័ក្សស្មើនឹងឆ្នូត 📃 ⟩
export function palpebraPivoto(): number {
  return KAPA_Y + OKULA_DY + PALPEBRA_STRIO - KOLO_Y;
}

// ⟨ ត្របកភ្នែកស្របនឹងភ្នែក 📃 ⟩
// ⟨ កម្ពស់ធរណីមាត្រត្រូវផ្លាស់ 📃 ⟩
export function kreiPalpebrojn(): THREE.BufferGeometry {
  const N = 0o20;
  const sefini = OKULA_LARĜO * PALPEBRA_GRANDO;
  const l6da = OKULA_ALTO * PALPEBRA_GRANDO;
  const diko = OKULA_DIKO + PALPEBRA_DIKO;
  const levo = PALPEBRA_STRIO + OKULA_NORMALA_Y * diko;
  const R = ( sefini * sefini + l6da * l6da ) / ( 0o2 * l6da ), Rr = R * R, Rm = R - l6da;
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX,
      OKULA_DY, OKULA_DZ);
    // ⟨ ការផ្អៀងភ្នែកនៅដដែល 📃 ⟩
    const klino = dir * 0o1/0o10;
    const kos = Math.cos(klino), sin = Math.sin(klino);
    const pozicioj: number[] = [], uvoj: number[] = [], havecax2lani: number[] = [];
    for ( let i = 0; i < N; i++ ) {
      const t = i / N * Math.PI * 0o2, k = Math.cos(t), s = Math.sin(t);
      const fx = sefini * k;
      const folio = Math.sqrt(Math.max(0, Rr - fx * fx)) - Rm;
      const py = Math.sign(s) * folio;
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      pozicioj.push(dir * OKULA_DX + horizontala.x * rx + vertikala.x * ry
        + normalo.x * diko, vertikala.y * ry + normalo.y * diko - levo,
        OKULA_DZ + horizontala.z * rx + vertikala.z * ry + normalo.z * diko);
      uvoj.push(0o1/0o2 + rx / ( 0o2 * sefini ), 0o1/0o2 + ry / ( 0o2 * l6da ));
    }
    pozicioj.push(dir * OKULA_DX + normalo.x * diko, normalo.y * diko - levo,
      OKULA_DZ + normalo.z * diko);
    uvoj.push(0o1/0o2, 0o1/0o2);
    for ( let i = 0; i < N; i++ ) havecax2lani.push(i, ( i + 0o1 ) % N, N);
    hakek.push(kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj }));
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
  const antaŭen = sube[3] + ( supre[3] - sube[3] ) * t;
  const k = 0o1 / Math.hypot(dx / a, dz / b);
  return [ new THREE.Vector3(dx * k, KAPA_Y + dy, dz * k + antaŭen),
    new THREE.Vector3(dx, dy, dz).normalize() ];
}

function kreiVizaĝanStrikon(sost2: THREE.Vector3[], normaloj: THREE.Vector3[],
  sefini: number[], dikeco: number): THREE.BufferGeometry {
  const K = 0o4;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i < sost2.length; i++ ) {
    // ⟨ អ័ក្សធំមកពីខ្សែកោង 📃 ⟩
    const antaŭ = sost2[Math.max(0, i - 0o1)];
    const post = sost2[Math.min(sost2.length - 0o1, i + 0o1)];
    const tanĝanto = post.clone().sub(antaŭ).normalize();
    const normalo = normaloj[i];
    const larĝa = new THREE.Vector3().crossVectors(normalo, tanĝanto).normalize();
    const duonLarĝo = sefini[i] * 0o1/0o2, duonDikeco = dikeco * 0o1/0o2;
    for ( const [ sb, sn ] of [ [ 0o1, 0o1 ], [ -0o1, 0o1 ], [ -0o1, -0o1 ], [ 0o1, -0o1 ] ] ) {
      pozicioj.push(sost2[i].x + larĝa.x * sb * duonLarĝo + normalo.x * sn * duonDikeco,
        sost2[i].y + larĝa.y * sb * duonLarĝo + normalo.y * sn * duonDikeco,
        sost2[i].z + larĝa.z * sb * duonLarĝo + normalo.z * sn * duonDikeco);
      // ⟨ UV បង្ហាញវាយនភាពសក់ 📃 ⟩
      uvoj.push(i / ( sost2.length - 0o1 ), 0o1/0o2 + sn * 0o1/0o2);
    }
  }
  for ( let i = 0; i + 0o1 < sost2.length; i++ ) {
    for ( let j = 0; j < K; j++ ) {
      const a = i * K + j, b = i * K + ( j + 0o1 ) % K;
      const c = ( i + 0o1 ) * K + j, d = ( i + 0o1 ) * K + ( j + 0o1 ) % K;
      havecax2lani.push(a, b, c, b, d, c);
    }
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
}

export function kreiVizaĝajnStrikojn(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  const sost2 = new THREE.Vector3(0, KAPA_Y, 0);
  for ( const dir of [ -0o1, 0o1 ] ) {
    const klino = dir * 0o1/0o10;
    const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(dir * OKULA_DX, OKULA_DY, OKULA_DZ);
    const kozuni = new THREE.Vector3(dir * OKULA_DX, KAPA_Y + OKULA_DY, OKULA_DZ);
    // ⟨ ចិញ្ចើម 📃 ⟩
    const brovCentroj: THREE.Vector3[] = [];
    const brovNormaloj: THREE.Vector3[] = [];
    const brovLarĝoj: number[] = [];
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const s = -0o1 + 0o2 * i / STRIO_STACIOJ;
      const p = kozuni.clone()
        .addScaledVector(horizontala, s * BROVA_DUONO)
        .addScaledVector(vertikala, BROVA_ALTO + BROVA_ARko * ( 0o1 - s * s ) - BROVA_KLINO * s * dir);
      const [ soza, n ] = kapaSurfaco(p.x - sost2.x, p.y - sost2.y, p.z - sost2.z);
      brovCentroj.push(soza.addScaledVector(n, BROVA_LEVO)); brovNormaloj.push(n);
      brovLarĝoj.push(BROVA_LARĜO * ( 0o1 - 0o3/0o4 * s * s ));
    }
    hakek.push(kreiVizaĝanStrikon(brovCentroj, brovNormaloj, brovLarĝoj, BROVA_DIKECO));
    // ⟨ រោមភ្នែក 📃 ⟩
    const laŝCentroj: THREE.Vector3[] = [];
    const laŝNormaloj: THREE.Vector3[] = [];
    const laŝLarĝoj: number[] = [];
    const R = ( OKULA_LARĜO * OKULA_LARĜO + OKULA_ALTO * OKULA_ALTO ) / ( 0o2 * OKULA_ALTO );
    const kos = Math.cos(klino), sin = Math.sin(klino);
    for ( let i = 0; i <= STRIO_STACIOJ; i++ ) {
      const fi = Math.PI * i / STRIO_STACIOJ;
      const fx = OKULA_LARĜO * Math.cos(fi);
      const py = Math.sqrt(Math.max(0, R * R - fx * fx)) - (R - OKULA_ALTO);
      const rx = fx * kos - py * sin, ry = fx * sin + py * kos;
      laŝCentroj.push(kozuni.clone()
        .addScaledVector(horizontala, rx)
        .addScaledVector(vertikala, ry)
        .addScaledVector(normalo, LAŜO_LEVO));
      laŝNormaloj.push(normalo.clone());
      const pukaz = Math.abs(i / STRIO_STACIOJ * 0o2 - 0o1);
      laŝLarĝoj.push(LAŜO_LARĜO * ( 0o1 - 0o3/0o4 * pukaz * pukaz ));
    }
    hakek.push(kreiVizaĝanStrikon(laŝCentroj, laŝNormaloj, laŝLarĝoj, LAŜO_DIKECO));
  }
  return kunfandiGeometriojn(hakek);
}

// ⟨ UV បង្ហាញជ្រុងងងឹត 📃 ⟩
export function kreiBuŝon(): THREE.BufferGeometry {
  const hakek: THREE.BufferGeometry[] = [];
  for ( const dir of [ -0o1, 0o1 ] ) {
    const sost2: THREE.Vector3[] = [];
    const normaloj: THREE.Vector3[] = [];
    const sefini: number[] = [];
    for ( let i = 0; i <= BUŜO_STACIOJ; i++ ) {
      const t = i / BUŜO_STACIOJ;
      // ⟨ ជ្រុងឡើងលើ និងកណ្តាលចុះក្រោម 📃 ⟩
      const [ soza, n ] = kapaSurfaco(dir * BUŜO_DUONO * ( 0o1 - t ),
        BUŜO_ANGULO + ( BUŜO_MEZO - BUŜO_ANGULO ) * t, OKULA_DZ);
      sost2.push(soza.addScaledVector(n, BUŜO_LEVO));
      normaloj.push(n);
      // ⟨ ឆ្នូតស្រួចទៅជ្រុង 📃 ⟩
      sefini.push(BUŜO_LARĜO * ( 0o1/0o4 + 0o3/0o4 * t ));
    }
    hakek.push(kreiVizaĝanStrikon(sost2, normaloj, sefini, BUŜO_DIKECO));
  }
  const geometrio = kunfandiGeometriojn(hakek);
  const uvoj = geometrio.attributes.uv;
  for ( let i = 0; i < uvoj.count; i++ ) uvoj.setXY(i, 0o4/0o100, 0o4/0o100);
  return geometrio;
}

export function kreiNazon(): THREE.BufferGeometry {
  // ⟨ ច្រមុះនៅលើមុខ 📃 ⟩
  // ⟨ ច្រមុះឡើងលើ និងថយចុះ 📃 ⟩
  const dy = -0o44/0o1000, dz = 0o122/0o1000;
  const [ horizontala, vertikala, normalo ] = vizaĝaBazaro(0, dy, dz);
  const kozuni = new THREE.Vector3(0, KAPA_Y + dy, dz);
  const ALTO = 0o13/0o1000;
  const hatafkaq: [ number, number ][] = [
    [ 0, ALTO ], [ -0o1/0o40, -ALTO ], [ 0o1/0o40, -ALTO ] ];
  // ⟨ ប្លង់ទ្រទ្រង់ 📃 ⟩
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
  const pozicioj: number[] = [];
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
      // ⟨ ចុងលេចចេញជាង 📃 ⟩
      const f = 0o55/0o100 + 0o45/0o100 * ( 0o1 - ( py / ( 0o2 * ALTO ) + 0o1/0o2 ) );
      const diko = faktoro * f;
      pozicioj.push(
        kozuni.x + horizontala.x * px * grando + vertikala.x * py * grando + normalo.x * diko,
        kozuni.y + horizontala.y * px * grando + vertikala.y * py * grando + normalo.y * diko,
        kozuni.z + horizontala.z * px * grando + vertikala.z * py * grando + normalo.z * diko);
    }
  }
  const pinto = 0o12/0o1000;
  pozicioj.push(kozuni.x + normalo.x * pinto, kozuni.y + normalo.y * pinto,
    kozuni.z + normalo.z * pinto);
  const havecax2lani: number[] = [];
  for ( let i = 0; i < N; i++ ) {
    const a = i, b = ( i + 0o1 ) % N, c = N + i, d = N + ( i + 0o1 ) % N;
    havecax2lani.push(a, b, c, b, d, c);
    havecax2lani.push(c, d, N * 0o2);
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani);
}
// ⟪ ប្រវែងកាត់លលាដ៍ 🗿 ⟫
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

// ⟨ ក្បាលមានរាងអានីមេ 📃 ⟩
// ⟨ ក្បាលលែងជាស្វ៊ែរ 📃 ⟩
export function kreiKapanKranion(): THREE.BufferGeometry {
  const K = 0o20;
  const hac2q = KRANIAJ_RINGOJ;
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, KAPA_Y + y, dz ] as [ number, number, number ]);
  return kreiRinganSurfacon([ sost2(hac2q[0][0], hac2q[0][3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, KAPA_Y + y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0], hac2q[hac2q.length - 0o1][3]) ]);
}

// ⟪ ត្រចៀក 👂 ⟫
// ⟨ ហេតុអ្វីតារាងផ្ទាល់ 📃 ⟩
const ORELAJ_SEKCOJ: [ number, number, number, number ][] = [
  [ -0o4/0o1000,  -0o3/0o1000,  -0o10/0o1000, 0o5/0o10  ],
  [ -0o10/0o1000,  0o1/0o1000,  -0o22/0o1000, 0o7/0o10  ],
  [ -0o17/0o1000,  0o3/0o1000,  -0o27/0o1000, 0o1       ],
  [ -0o26/0o1000,  0o4/0o1000,  -0o30/0o1000, 0o1       ],
  [ -0o36/0o1000,  0o3/0o1000,  -0o26/0o1000, 0o6/0o10  ],
  [ -0o43/0o1000,  0o2/0o1000,  -0o20/0o1000, 0o5/0o10  ],
  [ -0o47/0o1000,  0o1/0o1000,  -0o10/0o1000, 0o4/0o10  ],
];
// ⟨ ជម្រៅបីនៃត្រចៀក 📃 ⟩
const ORELA_ENIRO = 0o6/0o1000;
const ORELA_KLINO = 0o15/0o1000;
const ORELA_DIKO = 0o4/0o1000;
const ORELA_KONKO = 0o4/0o1000;

// ⟨ ការកាត់ 📃 ⟩
// ⟨ កង្ហារ 📃 ⟩
export function kreiOrelon(dir: number): THREE.BufferGeometry {
  const K = 0o16;
  // ⟨ ប្រហោង ( សំបក ) 📃 ⟩
  const kavo = (kos: number, sin: number) =>
    Math.max(0, kos) * ( 0o1 - sin * sin );
  const sekco = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2, d = ( antaŭe - malantaŭe ) / 0o2;
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
  const pinto = (dy: number, antaŭe: number, malantaŭe: number, elstaro: number)
    : [ number, number, number ][] => {
    const zc = ( antaŭe + malantaŭe ) / 0o2;
    const [ soza ] = kapaSurfaco(0o1, dy, zc);
    const x = soza.x - ORELA_ENIRO + ORELA_KLINO * elstaro * 0o1/0o2;
    return Array.from({ length: K },
      () => [ dir * x, KAPA_Y + dy, zc ] as [ number, number, number ]);
  };
  // ⟨ កង្ហារនៅក្រៅតារាង 📃 ⟩
  const xaqadi = ORELAJ_SEKCOJ[0], z2hak = ORELAJ_SEKCOJ[ORELAJ_SEKCOJ.length - 0o1];
  const preter = 0o2/0o1000;
  return kreiRinganSurfacon([
    pinto(xaqadi[0] + preter, xaqadi[1], xaqadi[2], xaqadi[3]),
    ...ORELAJ_SEKCOJ.map(([ dy, antaŭe, malantaŭe, elstaro ]) =>
      sekco(dy, antaŭe, malantaŭe, elstaro)),
    pinto(z2hak[0] - preter, z2hak[1], z2hak[2], z2hak[3]),
  ]);
}
