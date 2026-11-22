// ≺⧼ សំបកតួ 👕 ⧽≻
import * as THREE from "three";
import { kreiBuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";
import { MALFERMA_RONDO, malfermaDuono, robLevigho } from "./malfermo.js";
import { INTERNO_ALTO, INTERNO_Y_MALSUPRO, INTERNO_Y_SUPRO, ROB_ALTO, ROB_PROFUNDO, ROB_Y_MALSUPRO } from "./mezuroj.js";

export function kreiFoliaTonditanTubon(suproR: number, malsuproR: number, suproY: number,
  bazoY: number, segmentoj: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false): THREE.BufferGeometry {
  const q = 0o3/0o4;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i <= segmentoj; i++ ) {
    const ang = i / segmentoj * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    pozicioj.push(kx * suproR, suproY, kz * suproR);
    uvoj.push(i / segmentoj, 0);
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1;
    const v = Math.min(u, 0o1 - u) * 0o2;
    const folio = 0o1 - Math.pow(v, q);
    const y = bazoY + nocho - ( nocho + profundo ) * folio;
    pozicioj.push(kx * malsuproR, y, kz * malsuproR);
    uvoj.push(i / segmentoj, 1);
  }
  for ( let i = 0; i < segmentoj; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    havecax2lani.push(a, b, c, b, d, c);
  }
  // ⟨ ចុងដៃអាវរាប ប៉ុន្តែបិទ 📃 ⟩
  // ⟨ ចានជាស្មាខ្លួនឯង 📃 ⟩
  // ⟨ ចុងដៃអាវជាពំនូកទាប 🫧 ⟩
  if ( !fermitaSupro ) return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
  const kupolAlto = suproR * 0o23/0o100;
  const etapoj: [ number, number ][] = [ [ 0o5/0o10, 0o43/0o100 ], [ 0o23/0o100, 0o67/0o100 ] ];
  const bazoj: number[] = [];
  for ( const [ rF, yF ] of etapoj ) {
    bazoj.push(pozicioj.length / 0o3);
    for ( let i = 0; i <= segmentoj; i++ ) {
      const ang = i / segmentoj * Math.PI * 0o2;
      pozicioj.push(Math.cos(ang) * suproR * rF, suproY + kupolAlto * yF,
        Math.sin(ang) * suproR * rF);
      uvoj.push(i / segmentoj, 0);
    }
  }
  const pinto = pozicioj.length / 0o3;
  pozicioj.push(0, suproY + kupolAlto, 0);
  uvoj.push(0o1/0o2, 0);
  // ⟨ កង្ហារបង្ហាញចេញក្រៅ 📃 ⟩
  for ( let i = 0; i < segmentoj; i++ ) {
    havecax2lani.push(bazoj[0] + i, bazoj[0] + i + 0o1, 0o2 * i,
      bazoj[0] + i + 0o1, 0o2 * i + 0o2, 0o2 * i);
    havecax2lani.push(bazoj[1] + i, bazoj[1] + i + 0o1, bazoj[0] + i,
      bazoj[1] + i + 0o1, bazoj[0] + i + 0o1, bazoj[0] + i);
    havecax2lani.push(bazoj[1] + i + 0o1, bazoj[1] + i, pinto);
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
}

// ⟨ ដៃអាវ 📃 ⟩

// ⟪ ជ្រុងនៃការបើក 🚪 ⟫
// ⟨ ហេតុអ្វីកំពូល មិនមែនប្រវែងកាត់ 📃 ⟩
function rondigiMalfermanAngulon(pozicioj: number[], kolonoj: number, kanto: number): void {
  const k = kanto > 0 ? kolonoj : 0;
  const najbaro = kanto > 0 ? kolonoj - 0o1 : 0o1;
  const vecax2lani = ( v: number, kk: number ) => ( v * ( kolonoj + 0o1 ) + kk ) * 0o3;
  const legi = ( v: number, kk: number ) => new THREE.Vector3(pozicioj[vecax2lani(v, kk)],
    pozicioj[vecax2lani(v, kk) + 0o1], pozicioj[vecax2lani(v, kk) + 0o2]);
  const skribi = ( v: number, kk: number, p: THREE.Vector3 ) => {
    pozicioj[vecax2lani(v, kk)] = p.x;
    pozicioj[vecax2lani(v, kk) + 0o1] = p.y;
    pozicioj[vecax2lani(v, kk) + 0o2] = p.z;
  };
  const tafkaq = legi(0, k), tuko = legi(0, najbaro), pukaz = legi(0o1, k);
  const lauTuko = tuko.clone().sub(tafkaq).normalize();
  const lauRando = pukaz.clone().sub(tafkaq).normalize();
  const turno = Math.acos(Math.max(-0o1, Math.min(0o1, lauTuko.dot(lauRando))));
  const p2somani = ( Math.PI - turno ) * 0o1/0o2;
  const h6kuni = MALFERMA_RONDO / Math.tan(p2somani);
  const enen = MALFERMA_RONDO / Math.sin(p2somani) - MALFERMA_RONDO;
  const sost2 = lauTuko.clone().add(lauRando).normalize();
  skribi(0, k, tafkaq.clone().addScaledVector(sost2, enen));
  skribi(0, najbaro, tafkaq.clone().addScaledVector(lauTuko, h6kuni));
  skribi(0o1, k, tafkaq.clone().addScaledVector(lauRando, h6kuni));
}

// ⟨ UV 📃 ⟩
// ⟨ ហេតុអ្វីឡូហ្វ 📃 ⟩
export function kreiMalfermanRobonSxelon(): THREE.BufferGeometry {
  // ⟨ ប្រវែងកាត់ 📃 ⟩
  // ⟨ អាវធំមិនត្រូវលេបដៃ 📃 ⟩
  // ⟨ កអាវនៅក្រោមអាវ 📃 ⟩
  // ⟨ ការកាត់ជារាងពងក្រពើ 📃 ⟩
  // ⟨ អាវធំត្រូវព័ទ្ធជើងដែលយោល 📃 ⟩
  // ⟨ ពាក់កណ្តាលលើរួមតូច 📃 ⟩
  // ⟨ ស្រទាប់នៅតម្រង់ជួរ 📃 ⟩
  const haka5ik = [ 0o77/0o400, 0o77/0o400, 0o72/0o400, 0o71/0o400, 0o70/0o400,
    0o67/0o400, 0o66/0o400, 0o66/0o400, 0o65/0o400 ];
  const vicoj = haka5ik.length;
  const kolonoj = 0o40;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const t = v / ( vicoj - 0o1 );
    const r = haka5ik[v];
    const p2somani = malfermaDuono(t);
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = p2somani + ( 0o1 - 0o2 * p2somani ) * ( k / kolonoj );
      const ang = u * Math.PI * 0o2;
      const y = ROB_Y_MALSUPRO + ROB_ALTO * t + robLevigho(ang, t);
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(u, t);
    }
  }
  // ⟨ ផ្ទៃលើបិទដោយនឹម និងកអាវ 📃 ⟩
  // ⟨ នឹមនៅខាងក្រៅអាវ 📃 ⟩
  // ⟨ នឹមក៏តាមដៃអាវដែរ 📃 ⟩
  // ⟨ UV នៃកអាវ 📃 ⟩
  const kolumajRingoj: [ number, number ][] = [
    [ 0o133/0o100, 0o65/0o400 ],
    [ 0o134/0o100, 0o64/0o400 ],
    [ 0o271/0o200, 0o60/0o400 ],
    [ 0o135/0o100, 0o51/0o400 ],
    [ 0o273/0o200, 0o47/0o400 ],
    [ 0o274/0o200, 0o45/0o400 ],
    [ 0o273/0o200, 0o51/0o400 ],
  ];
  for ( const [ y, r ] of kolumajRingoj ) {
    for ( let k = 0; k <= kolonoj; k++ ) {
      const ang = k / kolonoj * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      uvoj.push(k / kolonoj, 0o1);
    }
  }
  const ĉiujVicoj = vicoj + kolumajRingoj.length;
  for ( let v = 0; v < ĉiujVicoj - 0o1; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  // ⟨ ជ្រុងនៃការបើកមូល 📃 ⟩
  for ( const kanto of [ -0o1, 0o1 ] ) rondigiMalfermanAngulon(pozicioj, kolonoj, kanto);
  return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
}

// ⟨ អាវព័ទ្ធក 📃 ⟩
// ⟨ ការកាត់តាមរ៉ូប 📃 ⟩
export function kreiInternanSxelon(): THREE.BufferGeometry {
  // ⟨ រង្វង់ក្រោមតាមតួថ្មី 📃 ⟩
  // ⟨ គម្របស្មាតូច 📃 ⟩
  // ⟨ អាវក៏ថយចុះ 📃 ⟩
  // ⟨ ត្រគាក និងក្រណាត់ធំជាង 📃 ⟩
  const hac2q: [ number, number, number, number ][] = [
    [ INTERNO_Y_MALSUPRO, 0o70/0o400, ROB_PROFUNDO, 0o1 ],
    [ 0o3/0o4,            0o66/0o400, ROB_PROFUNDO, 0o1/0o2 ],
    [ 0o167/0o200,        0o64/0o400, ROB_PROFUNDO, 0 ],
    [ 0o212/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],
    [ 0o241/0o200,        0o60/0o400, ROB_PROFUNDO, 0 ],
    [ 0o131/0o100,        0o60/0o400, ROB_PROFUNDO, 0 ],
    [ 0o132/0o100,        0o60/0o400, 0o33/0o40, 0 ],
    [ 0o133/0o100,        0o60/0o400, 0o33/0o40, 0 ],
    [ 0o134/0o100,        0o55/0o400, 0o33/0o40, 0 ],
    [ 0o271/0o200,        0o50/0o400, 0o34/0o40, 0 ],
    [ 0o135/0o100,        0o22/0o200, 0o1, 0 ],
    [ 0o273/0o200,        0o22/0o200, 0o1, 0 ],
    [ INTERNO_Y_SUPRO,    0o23/0o200, 0o1, 0 ],
  ];
  // ⟨ ក្រណាត់ទាបជាងខាងមុខជាងខាងក្រោយ 📃 ⟩
  const TUKA_LEVO = 0o1/0o10;
  const tukaLevo = (ang: number, p: number) => TUKA_LEVO * p * ( Math.cos(ang) + 0o1 ) / 0o2;
  const kolonoj = 0o24;
  const vicoj = hac2q.length;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0; v < vicoj; v++ ) {
    const [ y, r, prof, p ] = hac2q[v];
    for ( let k = 0; k <= kolonoj; k++ ) {
      const u = k / kolonoj;
      const ang = u * Math.PI * 0o2;
      pozicioj.push(Math.sin(ang) * r, y + tukaLevo(ang, p), Math.cos(ang) * r * prof);
      uvoj.push(u, ( y - INTERNO_Y_MALSUPRO ) / INTERNO_ALTO);
    }
  }
  for ( let v = 0; v + 0o1 < vicoj; v++ ) {
    for ( let k = 0; k < kolonoj; k++ ) {
      const a = v * ( kolonoj + 0o1 ) + k, b = a + 0o1;
      const c = a + kolonoj + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  return kreiBuferanGeometrion(pozicioj, havecax2lani, { uvoj });
}

// ⟨ kreiRondanKeston ត្រូវដកចេញ 📃 ⟩
