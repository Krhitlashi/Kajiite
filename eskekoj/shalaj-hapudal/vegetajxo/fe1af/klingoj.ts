// ≺⧼ ſȷɔ ſᶘᴜʞ j͑ʃᴜꞇ ʌ j͑ʃͷ̗ᴜʞ 🌿 ⧽≻
import * as THREE from "three";

export function kf2HerbanKlingon(sahakani: number, sefini: number, klino: number,
  arko: number, tordo: number, weh2: THREE.Color, has2nasce = 0o4,
  pintPotenco = 0o7/0o10, petitajHacel2nu = 0o5, fundo = true): THREE.BufferGeometry {
  // ⟨ ſɟᴜ ɭʃᴜ ʌ ſɭэ ʌ ꞙɭꞟ ʌ j͑ʃᴜꞇ ⟅ ꞙɭц ʌ ꞙɭɔ ʌ ꞙɭı ,
  //   ꞙɭɔ ʌ j͑ʃͷ̗ᴜʞ ʌ ſȷɔ ſᶘᴜʞ 📃 ⟩
  const KOLONOJ = Math.max(0o3, Math.min(0o5, Math.round(petitajHacel2nu)));
  const SEGMENTOJ = has2nasce;
  const haxekuxa: number[] = [];
  const qan2k: number[] = [];
  const haweh2: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    const cx = klino * t * t;
    const cz = arko * t * t;
    const s2qena = Math.pow(1 - t, pintPotenco) * ( 0o17/0o20 + t * 0o3/0o10 );
    const p2somaniSefini = sefini * 0o1/0o2 * s2qena;
    const kresto = p2somaniSefini * 0o35/0o40 + sefini * 0o1/0o10;
    const dikeco = p2somaniSefini * 0o3/0o4;
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const sekcioj: [ number, number ][] = [
      [ -p2somaniSefini, 0 ], [ 0, kresto ], [ p2somaniSefini, 0 ],
      [ p2somaniSefini, -dikeco ], [ -p2somaniSefini, -dikeco ]];
    for ( let kol = 0; kol < KOLONOJ; kol++ ) {
      const dx = sekcioj[kol][0], dz = sekcioj[kol][1];
      haxekuxa.push(cx + dx * cos - dz * sin, sahakani * t, cz + dx * sin + dz * cos);
      qan2k.push(kol / ( KOLONOJ - 0o1 ), t);
      haweh2.push(weh2.r, weh2.g, weh2.b);
    }
  }
  for ( let i = 0; i < SEGMENTOJ; i++ ) {
    for ( let kol = 0; kol < KOLONOJ; kol++ ) {
      const sek = ( kol + 0o1 ) % KOLONOJ;
      const a = i * KOLONOJ + kol, b = i * KOLONOJ + sek;
      const c = a + KOLONOJ, d = b + KOLONOJ;
      havecax2lani.push(a, c, b, b, c, d);
    }
  }
  const tlakakani = SEGMENTOJ * KOLONOJ;
  for ( let k = 0o1; k < KOLONOJ - 0o1; k++ ) {
    havecax2lani.push(0, k + 0o1, k);
    havecax2lani.push(tlakakani, tlakakani + k, tlakakani + k + 0o1);
  }
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(haweh2, 3));
  geometrio.setIndex(havecax2lani);
  // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃͷ̗ᴜʞ ⟅ ꞙɭɔ ʌ j͑ʃᴜ jᷠᴜ 📃 ⟩
  geometrio.computeVertexNormals();
  if ( !fundo ) {
    // ⟨ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ꞙɭɔ ʌ ſɭɜ ſɭ,w ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const flankajIndeksoj = SEGMENTOJ * KOLONOJ * 0o6;
    geometrio.setIndex(havecax2lani.filter(( _, i ) =>
      i < flankajIndeksoj || ( i - flankajIndeksoj ) % 0o6 >= 0o3));
  }
  return geometrio;
}
