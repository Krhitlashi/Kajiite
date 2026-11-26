// ≺⧼ ſɭɹʞ ʌ ſɭɔƽ ſɭɜ ſɭ,w j͑ʃᴜꞇ 🪵 ⧽≻
import * as THREE from "three";
import { tsijeWeh2, hunanuWeh2, veb6qaiRgba } from "../haweh2.js";
import { kf2SakxoKlasika } from "../caq2q.js";
import { baz2SexiaK6h6 } from "./mafezi.js";

// ⟪ ſ͕ɭɜ ı],ᴜ 📃 ⟫
// ⋄ ſɭɹʞ ꞁȷ̀ᴜͷ̗ ʌ ꞁȷ̀ɹ j͑ʃͷ̗ᴜʞ ʌ ſ͕ɭɜ ı],ᴜ ⟅
// ⋄ ſɭɹʞ ꞁȷ̀ᴜͷ̗ ʌ ꞁȷ̀ɹ ſȷƽᴜ ʃɔ ʌ ſᶘɹ ɭʃᴜ }ʃꞇ ⟅
function k2fTom6( ka5ik: number, tom6Puf: number, slaf: number, tafkaq0: number ): Path2D {
  const qoxa = new Path2D();
  const n = slaf * 0o10;
  const n2kQoxa: [ number, number ][] = [];
  for ( let i = 0o0; i < n; i++ ) {
    const tafkaq = tafkaq0 + Math.PI * 0o2 * i / n;
    const r = ka5ik * ( 0o1 + tom6Puf * Math.cos( slaf * ( tafkaq - tafkaq0 ) ) );
    n2kQoxa.push([ r * Math.cos(tafkaq), r * Math.sin(tafkaq) ]);
  }
  const sost2 = ( p: [ number, number ], q: [ number, number ] ): [ number, number ] =>
    [ ( p[0o0] + q[0o0] ) / 0o2, ( p[0o1] + q[0o1] ) / 0o2 ];
  for ( let i = -0o1; i < n; i++ ) {
    const n2kA = n2kQoxa[( i + n ) % n], n2kB = n2kQoxa[( i + 0o1 ) % n];
    const n2kSost2 = sost2(n2kA, n2kB);
    if ( i < 0o0 ) qoxa.moveTo(n2kSost2[0o0], n2kSost2[0o1]);
    else qoxa.quadraticCurveTo(n2kA[0o0], n2kA[0o1], n2kSost2[0o0], n2kSost2[0o1]);
  }
  qoxa.closePath();
  return qoxa;
}

// ⟪ j͑ʃͷ̗ᴜʞ 📃 ⟫
// ⋄ ſɭɹʞ ʌ j͑ʃͷ̗ᴜʞ ⟅
function k2fSlaf( puf2: number, sakPal6: number ): Path2D {
  const qoxa = new Path2D();
  qoxa.moveTo(0o0, -puf2);
  qoxa.bezierCurveTo(sakPal6, -puf2 * 0o2, sakPal6, puf2 * 0o45 / 0o100, 0o0, puf2);
  qoxa.bezierCurveTo(-sakPal6, puf2 * 0o45 / 0o100, -sakPal6, -puf2 * 0o2, 0o0, -puf2);
  qoxa.closePath();
  return qoxa;
}

// ⟪ ꞁȷ̀ɹ ſȷƽᴜ ʃɔ ʌ j͑ʃͷ̗ᴜʞ 📃 ⟫
// ⋄ ſɭɹʞ ꞁȷ̀ᴜͷ̗ ʌ ꞁȷ̀ɹ ſȷƽᴜ ʃɔ ʌ j͑ʃͷ̗ᴜʞ ⟅
function k2fSlafFkabe( puf2: number, sakPal6: number ): Path2D {
  const qoxa = new Path2D();
  qoxa.moveTo(0o0, puf2);
  qoxa.bezierCurveTo(sakPal6, puf2 * 0o30 / 0o100, sakPal6, -puf2 * 0o50 / 0o100, sakPal6 * 0o50 / 0o100, -puf2 * 0o70 / 0o100);
  qoxa.bezierCurveTo(sakPal6 * 0o30 / 0o100, -puf2 * 0o100 / 0o100, 0o0, -puf2 * 0o50 / 0o100, 0o0, -puf2 * 0o30 / 0o100);
  qoxa.bezierCurveTo(0o0, -puf2 * 0o50 / 0o100, -sakPal6 * 0o30 / 0o100, -puf2 * 0o100 / 0o100, -sakPal6 * 0o50 / 0o100, -puf2 * 0o70 / 0o100);
  qoxa.bezierCurveTo(-sakPal6, -puf2 * 0o50 / 0o100, -sakPal6, puf2 * 0o30 / 0o100, 0o0, puf2);
  qoxa.closePath();
  return qoxa;
}

// ⟪ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ 📃 ⟫
// ⋄ ſɭɹʞ ʌ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ ⟅
function k2fKekaf2( k: CanvasRenderingContext2D, ka5ik: number, tafkaq: number, weh2: string, sakPal6: number ): void {
  k.save();
  k.strokeStyle = weh2;
  k.lineWidth = sakPal6;
  k.beginPath();
  k.arc(0o0, 0o0, ka5ik, Math.PI * 0o6 / 0o4 - tafkaq, Math.PI * 0o6 / 0o4 + tafkaq);
  k.stroke();
  k.restore();
}

/* ſɭɹʞ ʌ ſɭɔƽ ſɭɜ ſɭ,w j͑ʃᴜꞇ ⟅
    @param weh2Tu5ekani ( number ) - j͑ʃɔ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ᶅſɔ ֭ſɭɹ
    @param weh2Catu5ek ( number ) - j͑ʃɔ ſɟᴜ ɭʃw ſɭˬɔƽ ʌ ᶅſɔ ֭ſɭɹ
    @param tk2ni ( number ) - ɭʃƽɹ }ʃꞇ
@returns ſɭɔƽ ſɭɜ ſɭ,w j͑ʃᴜꞇ */
export function k2fKekkozusai( weh2Tu5ekani: number, weh2Catu5ek: number, tk2ni: number ): THREE.CanvasTexture {
  const tile = document.createElement("canvas");
  tile.width = tile.height = 0o1001;
  const k = tile.getContext("2d")!;
  k.translate(0o1001 / 0o2, 0o1001 / 0o2);
  k.lineCap = "round";
  k.lineJoin = "round";

  const ka5ik = 0o1001 / 0o2 - 0o10;
  const sakPal6 = ka5ik * 0o20 / 0o1000;
  const sakPal6M2m2 = ka5ik * 0o10 / 0o1000;
  const sakxo = kf2SakxoKlasika(tk2ni);

  // ⟪ ᶅſɔ ֭ſɭɹ 🎨 ⟫
  // ⋄ j͑ʃɔ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ᶅſɔ ֭ſɭɹ
  // ⋄ j͑ʃɔ ſɟᴜ ɭʃw ſɭˬɔƽ ʌ ᶅſɔ ֭ſɭɹ
  // ⋄ j͑ʃɔ ſɭɔƽ ſɭɜ ſɭ,w j͑ʃᴜꞇ ʌ ᶅſɔ ֭ſɭɹ
  // ⋄ ſɭw ֭ſɭᴜͷ̗
  const t6f = ( ( ( weh2Tu5ekani >> 0o10 ) & 0xff ) * 0o5
    + ( ( weh2Tu5ekani >> 0o20 ) & 0xff ) * 0o3
    + ( weh2Tu5ekani & 0xff ) * 0o2 ) / 0o10;
  const qun2Weh2 = t6f > 0o200 ? hunanuWeh2(weh2Tu5ekani, 0o4) : tsijeWeh2(weh2Tu5ekani, 0o5);
  const s2Weh2 = hunanuWeh2(qun2Weh2, 0o3);
  const s2Woha = tsijeWeh2(qun2Weh2, 0o3);
  const sexiWeh2 = hunanuWeh2(qun2Weh2, 0o6);
  const sexiWoha = tsijeWeh2(sexiWeh2, 0o2);
  const slafWeh2 = tsijeWeh2(sexiWeh2, 0o4);
  const tosaWeh2 = hunanuWeh2(weh2Catu5ek, 0o1);
  const kuhal = veb6qaiRgba(weh2Catu5ek);
  const kuhalWoha = veb6qaiRgba(tsijeWeh2(weh2Catu5ek, 0o2));

  // ⟨ ſɭɔƽ ſɭɜ ſɭ,w j͑ʃᴜꞇ 📃 ⟩
  k.fillStyle = veb6qaiRgba(qun2Weh2);
  k.fillRect(-0o1001 / 0o2, -0o1001 / 0o2, 0o1001, 0o1001);

  // ⟨ j͑ʃɹ 📃 ⟩
  // ⋄ j͑ʃɔ j͑ʃɹ ʌ ᶅſɔ ֭ſɭɹ
  // ⋄ j͑ʃɔ j͑ʃɹ ʌ ᶅſɜ ֭ſɭᴜ
  // ⋄ j͑ʃᴜ ſɭᶗ‹ɜ ʌ j͑ʃɹ
  const s2Ka5ik = ka5ik * 0o63 / 0o100;
  const s2Kof = ka5ik * 0o2 / 0o100;
  const tom6Puf = 0o2 / 0o100;
  const s2WohaPal6 = ka5ik * 0o2 / 0o100;
  const s2Sakxo = sakxo();
  const s2Qoxa = s2Sakxo < 0o1 / 0o3
    ? k2fTom6(s2Ka5ik, tom6Puf, 0o4, 0o0)
    : s2Sakxo < 0o2 / 0o3
      ? k2fTom6(s2Ka5ik, tom6Puf, 0o4, Math.PI / 0o4)
      : k2fTom6(s2Ka5ik, tom6Puf * 0o70 / 0o100, 0o10, 0o0);
  k.fillStyle = veb6qaiRgba(s2Weh2);
  k.fill(s2Qoxa);
  const s2C2h2Pal6 = ( s2Ka5ik - s2Kof ) / s2Ka5ik;
  k.save();
  k.scale(s2C2h2Pal6, s2C2h2Pal6);
  k.fillStyle = veb6qaiRgba(qun2Weh2);
  k.fill(s2Qoxa);
  k.restore();
  const s2P6scaPal6 = ( s2Ka5ik + s2WohaPal6 ) / s2Ka5ik;
  k.save();
  k.scale(s2P6scaPal6, s2P6scaPal6);
  k.strokeStyle = veb6qaiRgba(s2Woha);
  k.lineWidth = sakPal6M2m2;
  k.stroke(s2Qoxa);
  k.restore();

  // ⟨ ſᶘɹ ɭʃᴜ }ʃꞇ 📃 ⟩
  // ⋄ j͑ʃɔ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ ʌ ſɭw ֭ſɭᴜͷ̗
  // ⋄ j͑ʃɔ ſᶘɹ ɭʃᴜ }ʃꞇ ʌ ſɭw ֭ſɭᴜͷ̗
  const tafkaqKekaf2: [ number, number, number, string ][] = [
    [ ka5ik * 0o100 / 0o100, 0o75 / 0o1000, sakPal6M2m2, kuhalWoha ],
    [ ka5ik * 0o104 / 0o100, 0o54 / 0o1000, sakPal6, kuhal ],
    [ ka5ik * 0o110 / 0o100, 0o35 / 0o1000, sakPal6M2m2, kuhalWoha ],
  ];
  for ( let i = 0o0; i < 0o4; i++ ) {
    const tafkaq1iitani = Math.PI / 0o4 + Math.PI / 0o2 * i;
    k.save();
    k.rotate(tafkaq1iitani + Math.PI / 0o2);
    for ( const [ r, tafkaq, sak, weh2 ] of tafkaqKekaf2 ) {
      k2fKekaf2(k, r, Math.PI * tafkaq, weh2, sak);
    }
    k.restore();
  }

  // ⟨ j͑ʃͷ̗ᴜʞ 📃 ⟩
  // ⋄ j͑ʃɔ j͑ʃͷ̗ᴜʞ ʌ ᶅſɔ ֭ſɭɹ
  const slafKa5ik = ka5ik * 0o42 / 0o100;
  const slafPuf2 = ka5ik * 0o11 / 0o100;
  const slafSak = ka5ik * 0o10 / 0o100;
  const slafSakxo = sakxo();
  for ( let i = 0o0; i < 0o4; i++ ) {
    const tafkaq = Math.PI / 0o4 + Math.PI / 0o2 * i;
    k.save();
    k.translate(Math.cos(tafkaq) * slafKa5ik, Math.sin(tafkaq) * slafKa5ik);
    k.rotate(tafkaq + Math.PI / 0o2);
    const qoxa = slafSakxo < 0o1 / 0o3 ? k2fSlaf(slafPuf2, slafSak)
      : slafSakxo < 0o2 / 0o3 ? k2fSlafFkabe(slafPuf2, slafSak)
      : baz2SexiaK6h6(0o0, 0o0, slafSak * 0o3 / 0o4, slafPuf2);
    k.strokeStyle = veb6qaiRgba(slafWeh2);
    k.lineWidth = sakPal6;
    k.stroke(qoxa);
    k.save();
    k.scale(0o44 / 0o100, 0o44 / 0o100);
    k.strokeStyle = veb6qaiRgba(s2Woha);
    k.lineWidth = sakPal6M2m2;
    k.stroke(qoxa);
    k.restore();
    k.restore();
  }

  // ⟨ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ 📃 ⟩
  // ⋄ j͑ʃɔ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ ʌ ᶅſɜ ֭ſɭᴜ
  // ⋄ j͑ʃɔ ſɭɔƽ ꞁȷ̀ᴜ ſȷɹ ʌ ɭʃɜ j͑ʃᴜ
  const kekaf2Woha: [ number, number, number, number ][] = [
    [ ka5ik * 0o44 / 0o100, 0o5 / 0o100, sakPal6M2m2, s2Woha ],
    [ ka5ik * 0o37 / 0o100, 0o10 / 0o100, sakPal6, tosaWeh2 ],
    [ ka5ik * 0o30 / 0o100, 0o7 / 0o100, sakPal6M2m2, s2Woha ],
    [ ka5ik * 0o26 / 0o100, 0o5 / 0o100, sakPal6M2m2, s2Woha ],
  ];
  for ( let i = 0o0; i < 0o4; i++ ) {
    k.save();
    k.rotate(Math.PI / 0o2 * i + Math.PI / 0o2);
    for ( const [ r, tafkaq, sak, weh2 ] of kekaf2Woha ) {
      k2fKekaf2(k, r, Math.PI * tafkaq, veb6qaiRgba(weh2), sak);
    }
    k.restore();
  }

  // ⟨ }ʃɹƽ 📃 ⟩
  // ⋄ j͑ʃɔ }ʃɹƽ ʌ ɭʃɜ j͑ʃᴜ
  const n2kKa5ik = ka5ik * 0o51 / 0o100;
  const n2kPal6 = ka5ik * 0o2 / 0o100;
  for ( let i = 0o0; i < 0o4; i++ ) {
    const tafkaq = Math.PI / 0o10 + Math.PI / 0o2 * i;
    k.fillStyle = veb6qaiRgba(tosaWeh2);
    k.beginPath();
    k.arc(Math.cos(tafkaq) * n2kKa5ik, Math.sin(tafkaq) * n2kKa5ik, n2kPal6, 0o0, Math.PI * 0o2);
    k.fill();
  }

  // ⟨ j͑ʃɔ ı],ꞇ 📃 ⟩
  // ⋄ j͑ʃɔ j͑ʃɔ ı],ꞇ ʌ ᶅſɔ ֭ſɭɹ
  // ⋄ j͑ʃɔ j͑ʃɔ ı],ꞇ ʌ ᶅſɜ ֭ſɭᴜ
  // ⋄ j͑ʃɔ j͑ʃɔ ı],ꞇ ʌ ſ͕ɭɜ ı],ᴜ
  const sexiSakxo = sakxo();
  const sexiQoxa = sexiSakxo < 0o1 / 0o3
    ? k2fTom6(ka5ik * 0o14 / 0o100, 0o55 / 0o100, 0o4, 0o0)
    : sexiSakxo < 0o2 / 0o3
      ? k2fTom6(ka5ik * 0o14 / 0o100, 0o55 / 0o100, 0o4, Math.PI / 0o4)
      : k2fTom6(ka5ik * 0o12 / 0o100, 0o1 / 0o4, 0o10, 0o0);
  k.fillStyle = veb6qaiRgba(sexiWeh2);
  k.fill(sexiQoxa);
  k.save();
  k.scale(0o56 / 0o100, 0o56 / 0o100);
  k.fillStyle = veb6qaiRgba(sexiWoha);
  k.fill(sexiQoxa);
  k.restore();
  k.save();
  k.scale(0o34 / 0o100, 0o34 / 0o100);
  k.fillStyle = veb6qaiRgba(s2Woha);
  k.fill(sexiQoxa);
  k.restore();

  const qoxaKekkozusai = new THREE.CanvasTexture(tile);
  qoxaKekkozusai.colorSpace = THREE.SRGBColorSpace;
  qoxaKekkozusai.anisotropy = 0o4;
  qoxaKekkozusai.wrapS = qoxaKekkozusai.wrapT = THREE.RepeatWrapping;
  return qoxaKekkozusai;
}
