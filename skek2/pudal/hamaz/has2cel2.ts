// ≺⧼ j͑ʃɔ j͑ʃɜȝ ʌ ſɟɔȝ 👕 ⧽≻
import * as THREE from "three";
import { kf2Bufezacen } from "../../x2x2q/hakox2q.js";
import { H6W6AC2Q, h6w6aP2somani, robLevigho } from "./h6w6.js";
import { C2H2L6DA, C2H2YMALKMARO, C2H2YKMARO, ROBL6DA, ROBPROFUNDO, ROBYMALKMARO } from "./havecax2l.js";

export function kf2SlafTonditanTubon(teruR: number, psazR: number, teruY: number,
  kozunuY: number, has2nasce: number, hal6ksabosai: number, jufu: number, nocho: number,
  pukxeitaTeru = false): THREE.BufferGeometry {
  const q = 0o3/0o4;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0o0; i <= has2nasce; i++ ) {
    const ang = i / has2nasce * Math.PI * 0o2;
    const kx = Math.cos(ang), kz = Math.sin(ang);
    haxekuxa.push(kx * teruR, teruY, kz * teruR);
    qan2k.push(i / has2nasce, 0o0);
    const u = ( ang * hal6ksabosai / ( Math.PI * 0o2 ) ) % 0o1;
    const v = Math.min(u, 0o1 - u) * 0o2;
    const slaf = 0o1 - Math.pow(v, q);
    const y = kozunuY + nocho - ( nocho + jufu ) * slaf;
    haxekuxa.push(kx * psazR, y, kz * psazR);
    qan2k.push(i / has2nasce, 0o1);
  }
  for ( let i = 0o0; i < has2nasce; i++ ) {
    const a = 0o2 * i, b = 0o2 * i + 0o2, c = 0o2 * i + 0o1, d = 0o2 * i + 0o3;
    havecax2lani.push(a, b, c, b, d, c);
  }
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ꞙɭɔ , ꞙɭı , ⟅ ⟩
  // ⟨ ſɭᴜ ſ͕ȷɔ , ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ⟩
  // ⟨ j͑ʃɜȝ ɭʃɔ , ſɭэ ɭʃᴜ , ſɭɜ ſɭᴜƽ , 🫧 ⟩
  if ( !pukxeitaTeru ) return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
  const kupolL6da = teruR * 0o23/0o100;
  const etapoj: [ number, number ][] = [ [ 0o5/0o10, 0o43/0o100 ], [ 0o23/0o100, 0o67/0o100 ] ];
  const hakozonu: number[] = [];
  for ( const [ rF, yF ] of etapoj ) {
    hakozonu.push(haxekuxa.length / 0o3);
    for ( let i = 0o0; i <= has2nasce; i++ ) {
      const ang = i / has2nasce * Math.PI * 0o2;
      haxekuxa.push(Math.cos(ang) * teruR * rF, teruY + kupolL6da * yF,
        Math.sin(ang) * teruR * rF);
      qan2k.push(i / has2nasce, 0o0);
    }
  }
  const n2k = haxekuxa.length / 0o3;
  haxekuxa.push(0o0, teruY + kupolL6da, 0o0);
  qan2k.push(0o1/0o2, 0o0);
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭı , ⟅ ⟩
  for ( let i = 0o0; i < has2nasce; i++ ) {
    havecax2lani.push(hakozonu[0o0] + i, hakozonu[0o0] + i + 0o1, 0o2 * i,
      hakozonu[0o0] + i + 0o1, 0o2 * i + 0o2, 0o2 * i);
    havecax2lani.push(hakozonu[0o1] + i, hakozonu[0o1] + i + 0o1, hakozonu[0o0] + i,
      hakozonu[0o1] + i + 0o1, hakozonu[0o0] + i + 0o1, hakozonu[0o0] + i);
    havecax2lani.push(hakozonu[0o1] + i + 0o1, hakozonu[0o1] + i, n2k);
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ j͑ʃɜȝ ɭʃɔ , ⟅ ⟩

// ⟪ ſɭэ ɭʃᴜ , ֭ſɭэ ᶅſэ 🚪 ⟫
// ⟨ ſᶘɔ ʌ j͑ʃᴜ ʃɜƽ , ꞙɭɔ , j͑ʃᴜ ʃɜ , ⟅ ⟩
function rondigiH6w6anAngulon(haxekuxa: number[], hacel2nu: number, vek2fe: number): void {
  const k = vek2fe > 0o0 ? hacel2nu : 0o0;
  const tsiike = vek2fe > 0o0 ? hacel2nu - 0o1 : 0o1;
  const vecax2lani = ( v: number, kk: number ) => ( v * ( hacel2nu + 0o1 ) + kk ) * 0o3;
  const vefal = ( v: number, kk: number ) => new THREE.Vector3(haxekuxa[vecax2lani(v, kk)],
    haxekuxa[vecax2lani(v, kk) + 0o1], haxekuxa[vecax2lani(v, kk) + 0o2]);
  const skribi = ( v: number, kk: number, p: THREE.Vector3 ) => {
    haxekuxa[vecax2lani(v, kk)] = p.x;
    haxekuxa[vecax2lani(v, kk) + 0o1] = p.y;
    haxekuxa[vecax2lani(v, kk) + 0o2] = p.z;
  };
  const tafkaq = vefal(0o0, k), tuko = vefal(0o0, tsiike), pukaz = vefal(0o1, k);
  const lauTuko = tuko.clone().sub(tafkaq).normalize();
  const lauRando = pukaz.clone().sub(tafkaq).normalize();
  const b6n = Math.acos(Math.max(-0o1, Math.min(0o1, lauTuko.dot(lauRando))));
  const p2somani = ( Math.PI - b6n ) * 0o1/0o2;
  const h6kuni = H6W6AC2Q / Math.tan(p2somani);
  const enen = H6W6AC2Q / Math.sin(p2somani) - H6W6AC2Q;
  const sost2 = lauTuko.clone().add(lauRando).normalize();
  skribi(0o0, k, tafkaq.clone().addScaledVector(sost2, enen));
  skribi(0o0, tsiike, tafkaq.clone().addScaledVector(lauTuko, h6kuni));
  skribi(0o1, k, tafkaq.clone().addScaledVector(lauRando, h6kuni));
}

// ⟨ UV 📃 ⟩
// ⟨ ſᶘɔ ʌ LOFT , ⟅ ⟩
export function kf2H6w6anRobonS2cel2n(): THREE.BufferGeometry {
  // ⟨ j͑ʃᴜ ʃɜ , ⟅ ⟩
  // ⟨ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭɔ , ɭʃꞇƽ , ⟅ ⟩
  // ⟨ ɭʃᴜ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭı , ⟅ ⟩
  // ⟨ ſȷƽᴜ ʃɔ , ⟅ ⟩
  // ⟨ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ꞙɭı , ꞙɭı , ⟅ ⟩
  // ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  const haka5ik = [ 0o77/0o400, 0o77/0o400, 0o72/0o400, 0o71/0o400, 0o70/0o400,
    0o67/0o400, 0o66/0o400, 0o66/0o400, 0o65/0o400 ];
  const hax2pa = haka5ik.length;
  const hacel2nu = 0o40;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0o0; v < hax2pa; v++ ) {
    const t = v / ( hax2pa - 0o1 );
    const r = haka5ik[v];
    const p2somani = h6w6aP2somani(t);
    for ( let k = 0o0; k <= hacel2nu; k++ ) {
      const u = p2somani + ( 0o1 - 0o2 * p2somani ) * ( k / hacel2nu );
      const ang = u * Math.PI * 0o2;
      const y = ROBYMALKMARO + ROBL6DA * t + robLevigho(ang, t);
      haxekuxa.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROBPROFUNDO);
      qan2k.push(u, t);
    }
  }
  // ⟨ j͑ʃɜ ſɭ,ᴜ , ɭʃᴜ , ꞙɭı , ⟅ ⟩
  // ⟨ ɭʃᴜ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭɔ , ⟅ ⟩
  // ⟨ ɭʃᴜ , j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  // ⟨ UV , ɭʃᴜ , ⟅ ⟩
  const kolumajHat2q2: [ number, number ][] = [
    [ 0o133/0o100, 0o65/0o400 ],
    [ 0o134/0o100, 0o64/0o400 ],
    [ 0o271/0o200, 0o60/0o400 ],
    [ 0o135/0o100, 0o51/0o400 ],
    [ 0o273/0o200, 0o47/0o400 ],
    [ 0o274/0o200, 0o45/0o400 ],
    [ 0o273/0o200, 0o51/0o400 ],
  ];
  for ( const [ y, r ] of kolumajHat2q2 ) {
    for ( let k = 0o0; k <= hacel2nu; k++ ) {
      const ang = k / hacel2nu * Math.PI * 0o2;
      haxekuxa.push(Math.sin(ang) * r, y, Math.cos(ang) * r * ROBPROFUNDO);
      qan2k.push(k / hacel2nu, 0o1);
    }
  }
  const k21eHax2pa = hax2pa + kolumajHat2q2.length;
  for ( let v = 0o0; v < k21eHax2pa - 0o1; v++ ) {
    for ( let k = 0o0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  // ⟨ ſɭэ ɭʃᴜ , ֭ſɭэ ᶅſэ , ɭʃɹ ſ͕ɭɹ , ⟅ ⟩
  for ( const vek2fe of [ -0o1, 0o1 ] ) rondigiH6w6anAngulon(haxekuxa, hacel2nu, vek2fe);
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ꞙɭı , ⟅ ⟩
// ⟨ j͑ʃᴜ ʃɜ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ⟅ ⟩
export function kf2InternanS2cel2n(): THREE.BufferGeometry {
  // ⟨ ɭʃɹ ʃ͕ɭɹ , ſɭɜ ſɭᴜƽ , ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
  // ⟨ ſɭэ ɭʃᴜ , ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩
  // ⟨ j͑ʃɜȝ ɭʃɔ , j͑ʃɜ ſ̀ȷᴜ ſɭᴜƽ , ⟅ ⟩
  // ⟨ ſɭᴜ ſ͕ȷɔ , j͑ʃɜȝ ɭʃɔ , ꞙɭı , ⟅ ⟩
  const hac2q: [ number, number, number, number ][] = [
    [ C2H2YMALKMARO, 0o70/0o400, ROBPROFUNDO, 0o1 ],
    [ 0o3/0o4,            0o66/0o400, ROBPROFUNDO, 0o1/0o2 ],
    [ 0o167/0o200,        0o64/0o400, ROBPROFUNDO, 0o0 ],
    [ 0o212/0o200,        0o60/0o400, ROBPROFUNDO, 0o0 ],
    [ 0o241/0o200,        0o60/0o400, ROBPROFUNDO, 0o0 ],
    [ 0o131/0o100,        0o60/0o400, ROBPROFUNDO, 0o0 ],
    [ 0o132/0o100,        0o60/0o400, 0o33/0o40, 0o0 ],
    [ 0o133/0o100,        0o60/0o400, 0o33/0o40, 0o0 ],
    [ 0o134/0o100,        0o55/0o400, 0o33/0o40, 0o0 ],
    [ 0o271/0o200,        0o50/0o400, 0o34/0o40, 0o0 ],
    [ 0o135/0o100,        0o22/0o200, 0o1, 0o0 ],
    [ 0o273/0o200,        0o22/0o200, 0o1, 0o0 ],
    [ C2H2YKMARO,    0o23/0o200, 0o1, 0o0 ],
  ];
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭı , ɭʃэ ſɭɔȝ , ⟅ ⟩
  const TUKALEVO = 0o1/0o10;
  const tukaLevo = (ang: number, p: number) => TUKALEVO * p * ( Math.cos(ang) + 0o1 ) / 0o2;
  const hacel2nu = 0o24;
  const hax2pa = hac2q.length;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const havecax2lani: number[] = [];
  for ( let v = 0o0; v < hax2pa; v++ ) {
    const [ y, r, prof, p ] = hac2q[v];
    for ( let k = 0o0; k <= hacel2nu; k++ ) {
      const u = k / hacel2nu;
      const ang = u * Math.PI * 0o2;
      haxekuxa.push(Math.sin(ang) * r, y + tukaLevo(ang, p), Math.cos(ang) * r * prof);
      qan2k.push(u, ( y - C2H2YMALKMARO ) / C2H2L6DA);
    }
  }
  for ( let v = 0o0; v + 0o1 < hax2pa; v++ ) {
    for ( let k = 0o0; k < hacel2nu; k++ ) {
      const a = v * ( hacel2nu + 0o1 ) + k, b = a + 0o1;
      const c = a + hacel2nu + 0o1, d = c + 0o1;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  return kf2Bufezacen(haxekuxa, havecax2lani, { qan2k });
}

// ⟨ kf2C2qnKeston , ꞙɭı , ⟅ ⟩
