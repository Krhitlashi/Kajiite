// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ j͑ʃͷ̗ᴜʞ 🌿 ⧽≻
import * as THREE from "three";

export function kf2HerbanKxa(sahakani: number, sefini: number, s2sabo: number,
  kekaf2: number, tordo: number, weh2: THREE.Color, has2nasce = 0o4,
  pintPotenco = 0o7/0o10, petitajHacel2nu = 0o5, psaz = true): THREE.BufferGeometry {
  // ⟨ ſɟᴜ ɭʃᴜ ʌ ſɭэ ʌ ꞙɭꞟ ʌ j͑ʃᴜꞇ ⟅ ꞙɭц ʌ ꞙɭɔ ʌ ꞙɭı ,
  //   ꞙɭɔ ʌ j͑ʃͷ̗ᴜʞ ʌ ſȷɔ ſᶘᴜʞ 📃 ⟩
  const HACEL2NU = Math.max(0o3, Math.min(0o5, Math.round(petitajHacel2nu)));
  const HAS2NASCE = has2nasce;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const haweh2: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i <= HAS2NASCE; i++ ) {
    const t = i / HAS2NASCE;
    const cx = s2sabo * t * t;
    const cz = kekaf2 * t * t;
    const s2qena = Math.pow(1 - t, pintPotenco) * ( 0o17/0o20 + t * 0o3/0o10 );
    const p2somaniSefini = sefini * 0o1/0o2 * s2qena;
    const kresto = p2somaniSefini * 0o35/0o40 + sefini * 0o1/0o10;
    const kof = p2somaniSefini * 0o3/0o4;
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const haqaroxema: [ number, number ][] = [
      [ -p2somaniSefini, 0 ], [ 0, kresto ], [ p2somaniSefini, 0 ],
      [ p2somaniSefini, -kof ], [ -p2somaniSefini, -kof ]];
    for ( let kol = 0; kol < HACEL2NU; kol++ ) {
      const dx = haqaroxema[kol][0], dz = haqaroxema[kol][1];
      haxekuxa.push(cx + dx * cos - dz * sin, sahakani * t, cz + dx * sin + dz * cos);
      qan2k.push(kol / ( HACEL2NU - 0o1 ), t);
      haweh2.push(weh2.r, weh2.g, weh2.b);
    }
  }
  for ( let i = 0; i < HAS2NASCE; i++ ) {
    for ( let kol = 0; kol < HACEL2NU; kol++ ) {
      const sek = ( kol + 0o1 ) % HACEL2NU;
      const a = i * HACEL2NU + kol, b = i * HACEL2NU + sek;
      const c = a + HACEL2NU, d = b + HACEL2NU;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  const tlakakani = HAS2NASCE * HACEL2NU;
  for ( let k = 0o1; k < HACEL2NU - 0o1; k++ ) {
    havecax2lani.push(0, k + 0o1, k);
    havecax2lani.push(tlakakani, tlakakani + k, tlakakani + k + 0o1);
  }
  const zace = new THREE.BufferGeometry();
  zace.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 3));
  zace.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 2));
  zace.setAttribute("color", new THREE.Float32BufferAttribute(haweh2, 3));
  zace.setIndex(havecax2lani);
  // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃͷ̗ᴜʞ ⟅ ꞙɭɔ ʌ j͑ʃᴜ jᷠᴜ 📃 ⟩
  zace.computeVertexNormals();
  if ( !psaz ) {
    // ⟨ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ꞙɭɔ ʌ ſɭɜ ſɭ,w ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const flankajHavecax2l = HAS2NASCE * HACEL2NU * 0o6;
    zace.setIndex(havecax2lani.filter(( _, i ) =>
      i < flankajHavecax2l || ( i - flankajHavecax2l ) % 0o6 >= 0o3));
  }
  return zace;
}
