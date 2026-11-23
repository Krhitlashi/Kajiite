// ≺⧼ j͑ʃɔ j͑ʃɜȝ ʌ ſɟɔȝ 👕 ⧽≻
import * as THREE from "three";
import { kf2BuferanGeometrion } from "../../komunajxoj/kunfandajxoj.js";
import { MALFERMA_RONDO, malfermaDuono, robLevigho } from "./malfermo.js";
import { INTERNO_ALTO, INTERNO_Y_MALSUPRO, INTERNO_Y_SUPRO, ROB_ALTO, ROB_PROFUNDO, ROB_Y_MALSUPRO } from "./havecax2l.js";

export function kf2SlafTonditanTubon(suproR: number, malsuproR: number, suproY: number,
  bazoY: number, has2nasce: number, loboj: number, profundo: number, nocho: number,
  fermitaSupro = false): THREE.BufferGeometry {
  const q = 0o3/0o4;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i <= has2nasce; i++ ) {
    const ang = i / has2nasce * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    haxekuxa.push(kx * suproR, suproY, kz * suproR);
    qan2k.push(i / has2nasce, 0);
    const u = ( ang * loboj / ( Math.PI * 0o2 ) ) % 0o1;
    const v = Math.min(u, 0o1 - u) * 0o2;
    const slaf = 0o1 - Math.pow(v, q);
    const y = bazoY + nocho - ( nocho + profundo ) * slaf;
    haxekuxa.push(kx * malsuproR, y, kz * malsuproR);
    qan2k.push(i / has2nasce, 1);
  }
  for ( let i = 0; i < has2nasce; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    havecax2lani.push(a, b, c, b, d, c);
  }
  // ⟨ ចុងដៃអាវរាប ប៉ុន្តែបិទ 📃 ⟩
  // ⟨ ចានជាស្មាខ្លួនឯង 📃 ⟩
  // ⟨ ចុងដៃអាវជាពំនូកទាប 🫧 ⟩
  if ( !fermitaSupro ) return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
  const kupolAlto = suproR * 0o23/0o100;
  const etapoj: [ number, number ][] = [ [ 0o5/0o10, 0o43/0o100 ], [ 0o23/0o100, 0o67/0o100 ] ];
  const bazoj: number[] = [];
  for ( const [ rF, yF ] of etapoj ) {
    bazoj.push(haxekuxa.length / 0o3);
    for ( let i = 0; i <= has2nasce; i++ ) {
      const ang = i / has2nasce * Math.PI * 0o2;
      haxekuxa.push(Math.cos(ang) * suproR * rF, suproY + kupolAlto * yF,
        Math.sin(ang) * suproR * rF);
      qan2k.push(i / has2nasce, 0);
    }
  }
  const pinto = haxekuxa.length / 0o3;
  haxekuxa.push(0, suproY + kupolAlto, 0);
  qan2k.push(0o1/0o2, 0);
  // ⟨ កង្ហារបង្ហាញចេញក្រៅ 📃 ⟩
  for ( let i = 0; i < has2nasce; i++ ) {
    havecax2lani.push(bazoj[0] + i, bazoj[0] + i + 0o1, 0o2 * i,
      bazoj[0] + i + 0o1, 0o2 * i + 0o2, 0o2 * i);
    havecax2lani.push(bazoj[1] + i, bazoj[1] + i + 0o1, bazoj[0] + i,
      bazoj[1] + i + 0o1, bazoj[0] + i + 0o1, bazoj[0] + i);
    havecax2lani.push(bazoj[1] + i + 0o1, bazoj[1] + i, pinto);
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ ដៃអាវ 📃 ⟩

// ⟪ ជ្រុងនៃការបើក 🚪 ⟫
// ⟨ ហេតុអ្វីកំពូល មិនមែនប្រវែងកាត់ 📃 ⟩
function rondigiMalfermanAngulon(haxekuxa: number[], hacel2nu: number, kanto: number): void {
  const k = kanto > 0 ? hacel2nu : 0;
  const najbaro = kanto > 0 ? hacel2nu - 0o1 : 0o1;
  const vecax2lani = ( v: number, kk: number ) => ( v * ( hacel2nu + 0o1 ) + kk ) * 0o3;
  const legi = ( v: number, kk: number ) => new THREE.Vector3(haxekuxa[vecax2lani(v, kk)],
    haxekuxa[vecax2lani(v, kk) + 0o1], haxekuxa[vecax2lani(v, kk) + 0o2]);
  const skribi = ( v: number, kk: number, p: THREE.Vector3 ) => {
    haxekuxa[vecax2lani(v, kk)] = p.x;
    haxekuxa[vecax2lani(v, kk) + 0o1] = p.y;
    haxekuxa[vecax2lani(v, kk) + 0o2] = p.z;
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
export function kf2MalfermanRobonS2cel2n(): THREE.BufferGeometry {
  // ⟨ ប្រវែងកាត់ 📃 ⟩
  // ⟨ អាវធំមិនត្រូវលេបដៃ 📃 ⟩
  // ⟨ កអាវនៅក្រោមអាវ 📃 ⟩
  // ⟨ ការកាត់ជារាងពងក្រពើ 📃 ⟩
  // ⟨ អាវធំត្រូវព័ទ្ធជើងដែលយោល 📃 ⟩
  // ⟨ ពាក់កណ្តាលលើរួមតូច 📃 ⟩
  // ⟨ ស្រទាប់នៅតម្រង់ជួរ 📃 ⟩
  const haka5ik = [ 0o77/0o400, 0o77/0o400, 0o72/0o400, 0o71/0o400, 0o70/0o400,
    0o67/0o400, 0o66/0o400, 0o66/0o400, 0o65/0o400 ];
  const hax2pa = haka5ik.length;
  const hacel2nu = 0o40;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0; v < hax2pa; v++ ) {
    const t = v / ( hax2pa - 0o1 );
    const r = haka5ik[v];
    const p2somani = malfermaDuono(t);
    for ( let k = 0; k <= hacel2nu; k++ ) {
      const u = p2somani + ( 0o1 - 0o2 * p2somani ) * ( k / hacel2nu );
      const ang = u * Math.PI * 0o2;
      const y = ROB_Y_MALSUPRO + ROB_ALTO * t + robLevigho(ang, t);
      haxekuxa.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      qan2k.push(u, t);
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
    for ( let k = 0; k <= hacel2nu; k++ ) {
      const ang = k / hacel2nu * Math.PI * 0o2;
      haxekuxa.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROB_PROFUNDO);
      qan2k.push(k / hacel2nu, 0o1);
    }
  }
  const k21eHax2pa = hax2pa + kolumajRingoj.length;
  for ( let v = 0; v < k21eHax2pa - 0o1; v++ ) {
    for ( let k = 0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  // ⟨ ជ្រុងនៃការបើកមូល 📃 ⟩
  for ( const kanto of [ -0o1, 0o1 ] ) rondigiMalfermanAngulon(haxekuxa, hacel2nu, kanto);
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ អាវព័ទ្ធក 📃 ⟩
// ⟨ ការកាត់តាមរ៉ូប 📃 ⟩
export function kf2InternanS2cel2n(): THREE.BufferGeometry {
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
  const hacel2nu = 0o24;
  const hax2pa = hac2q.length;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0; v < hax2pa; v++ ) {
    const [ y, r, prof, p ] = hac2q[v];
    for ( let k = 0; k <= hacel2nu; k++ ) {
      const u = k / hacel2nu;
      const ang = u * Math.PI * 0o2;
      haxekuxa.push(Math.sin(ang) * r, y + tukaLevo(ang, p), Math.cos(ang) * r * prof);
      qan2k.push(u, ( y - INTERNO_Y_MALSUPRO ) / INTERNO_ALTO);
    }
  }
  for ( let v = 0; v + 0o1 < hax2pa; v++ ) {
    for ( let k = 0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  return kf2BuferanGeometrion(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ kf2C2qnKeston ត្រូវដកចេញ 📃 ⟩
