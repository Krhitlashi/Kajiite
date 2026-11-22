// ≺⧼ ស្លឹកស្មៅ 🌿 ⧽≻
import * as THREE from "three";

export function kreiHerbanKlingon(sahakani: number, sefini: number, klino: number,
  arko: number, tordo: number, weh2: THREE.Color, segmentoj = 0o4,
  pintPotenco = 0o7/0o10, petitajKolonoj = 0o5, fundo = true): THREE.BufferGeometry {
  // ⟨ កំណាត់ឆ្លងកាត់មាន 0o5 ចំណុច ។ ជួរឈរតិចជាង 0o3 បង្កើតត្រីកោណគ្មានផ្ទៃ ,
  //   ហើយច្រើនជាង 0o5 អានចំណុចដែលគ្មាន ។ ទាំងពីរធ្វើឱ្យស្មៅបាត់ភ្លឹក ។ 📃 ⟩
  const KOLONOJ = Math.max(0o3, Math.min(0o5, Math.round(petitajKolonoj)));
  const SEGMENTOJ = segmentoj;
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const haweh2: number[] = [];
  const havecax2lani: number[] = [];
  for ( let i = 0; i <= SEGMENTOJ; i++ ) {
    const t = i / SEGMENTOJ;
    const cx = klino * t * t;
    const cz = arko * t * t;
    const s2qena = Math.pow(1 - t, pintPotenco) * ( 0o17/0o20 + t * 0o3/0o10 );
    const duonLarĝo = sefini * 0o1/0o2 * s2qena;
    const kresto = duonLarĝo * 0o35/0o40 + sefini * 0o1/0o10;
    const dikeco = duonLarĝo * 0o3/0o4;
    const ang = tordo * t;
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const sekcioj: [ number, number ][] = [
      [ -duonLarĝo, 0 ], [ 0, kresto ], [ duonLarĝo, 0 ],
      [ duonLarĝo, -dikeco ], [ -duonLarĝo, -dikeco ]];
    for ( let kol = 0; kol < KOLONOJ; kol++ ) {
      const dx = sekcioj[kol][0], dz = sekcioj[kol][1];
      pozicioj.push(cx + dx * cos - dz * sin, sahakani * t, cz + dx * sin + dz * cos);
      uvoj.push(kol / ( KOLONOJ - 0o1 ), t);
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
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setAttribute("color", new THREE.Float32BufferAttribute(haweh2, 3));
  geometrio.setIndex(havecax2lani);
  // ⟨ គណនានរម៉ាល់ពីស្លឹកពេញ ដើម្បីឱ្យចំហៀងមិនប្រែពន្លឺ 📃 ⟩
  geometrio.computeVertexNormals();
  if ( !fundo ) {
    // ⟨ ដកតែមូលដែលកប់ក្រោមដី ។ គ្រប់គូបមូលមានសន្ទស្សន៍បី ហើយគ្រប់គូបកំពូលនៅដដែល 📃 ⟩
    const flankajIndeksoj = SEGMENTOJ * KOLONOJ * 0o6;
    geometrio.setIndex(havecax2lani.filter(( _, i ) =>
      i < flankajIndeksoj || ( i - flankajIndeksoj ) % 0o6 >= 0o3));
  }
  return geometrio;
}
