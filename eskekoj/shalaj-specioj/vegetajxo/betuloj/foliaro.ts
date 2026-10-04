// ≺⧼ ស្លឹកប៊ឺច 🌳 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojnSenIndekson } from "../../../komunajxoj/kunfandajxoj.js";

// ⟨ លទ្ធផល 📃 ⟩
export function konstruiBetulanFoliaranGeometrion(): { maso: THREE.BufferGeometry; folioj: THREE.BufferGeometry } {
  const partoj: THREE.BufferGeometry[] = [];
  const foliajPartoj: THREE.BufferGeometry[] = [];
  // ⟨ ខ្នើយ 📃 ⟩
  // ⟨ ហេតុអ្វីស្នូលមួយ មិនមែនពំនូក 📃 ⟩
  // ⟨ ពណ៌លាំតាមកំពូល 📃 ⟩
  const kunTinto = ( g: THREE.BufferGeometry, r: number, gn: number, b: number ): THREE.BufferGeometry => {
    const n = g.getAttribute("position").count;
    const koloroj = new Float32Array(n * 3);
    for ( let i = 0; i < n; i++ ) {
      koloroj[i * 3] = r; koloroj[i * 3 + 1] = gn; koloroj[i * 3 + 2] = b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ ជម្រាលបញ្ឈរ 📃 ⟩
  const kunVertikalaTinto = ( g: THREE.BufferGeometry,
    mR: number, mG: number, mB: number,
    hR: number, hG: number, hB: number ): THREE.BufferGeometry => {
    g.computeBoundingBox();
    const bb = g.boundingBox ?? new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
    const yMin = bb.min.y, yMax = bb.max.y;
    const p = g.getAttribute("position");
    const koloroj = new Float32Array(p.count * 3);
    for ( let i = 0; i < p.count; i++ ) {
      const t = yMax > yMin ? ( p.getY(i) - yMin ) / ( yMax - yMin ) : 0o1/0o2;
      koloroj[i * 3] = mR + ( hR - mR ) * t;
      koloroj[i * 3 + 1] = mG + ( hG - mG ) * t;
      koloroj[i * 3 + 2] = mB + ( hB - mB ) * t;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return g;
  };
  // ⟨ ចំនួនមុខ 📃 ⟩
  const KERNELO_PLATIGO = 0o5/0o10;
  const kerno = new THREE.IcosahedronGeometry(0o17/0o100, 2);
  {
    const p = kerno.getAttribute("position");
    const n = kerno.getAttribute("normal");
    for ( let i = 0; i < p.count; i++ ) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const l = Math.hypot(x, y, z) || 1;
      const nx = x / l, ny = y / l, nz = z / l;
      // ⟨ ប្រេកង់ទាប 📃 ⟩
      const ondo = 1 + 0o13/0o100 * Math.sin(nx * 0o203/0o40 + 0o123/0o100) * Math.cos(ny * 0o323/0o100 - 0o55/0o100)
        + 0o1/0o10 * Math.sin(nz * 0o555/0o100 + 0o215/0o100) + 0o1/0o20 * Math.cos(nx * 0o723/0o100 + nz * 0o303/0o40);
      p.setXYZ(i, x * ondo, y * ondo * KERNELO_PLATIGO, z * ondo);
      // ⟨ ន័រម៉ាល់រលូន 📃 ⟩
      const vn = Math.hypot(nx, ny / KERNELO_PLATIGO, nz) || 1;
      n.setXYZ(i, nx / vn, ny / KERNELO_PLATIGO / vn, nz / vn);
    }
  }
  // ⟨ ស្នូលមិនត្រូវមួយសម្លេង 📃 ⟩
  partoj.push(kunVertikalaTinto(kerno, 0o43/0o100, 0o23/0o40, 0o33/0o100, 0o135/0o100, 0o14/0o10, 0o115/0o100));
  for ( let i = 0; i < 0o10; i++ ) {
    const z = Math.random() * 2 - 1;
    const ang = Math.random() * Math.PI * 2;
    const rFlanko = Math.sqrt(Math.max(0, 1 - z * z));
    const r = 0o15/0o100 + Math.random() * 0o3/0o40;
    const elstaro = new THREE.IcosahedronGeometry(0o1/0o40 + Math.random() * 0o3/0o100, 1);
    elstaro.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)));
    elstaro.applyMatrix4(new THREE.Matrix4().makeScale(
      0o63/0o100 + Math.random() * 0o15/0o40,
      0o23/0o40 + Math.random() * 0o15/0o40,
      0o63/0o100 + Math.random() * 0o15/0o40));
    elstaro.translate(rFlanko * Math.cos(ang) * r, z * r * 0o1/0o2, rFlanko * Math.sin(ang) * r);
    partoj.push(kunTinto(elstaro, 0o15/0o20 + Math.random() * 0o27/0o100, 0o33/0o40 + Math.random() * 0o27/0o100,
      0o61/0o100 + Math.random() * 0o13/0o40));
  }

  // ⟨ ហេតុអ្វីចតុកោណ 📃 ⟩
  const kreiFolianKarteton = ( longo: number, largho: number ): THREE.BufferGeometry => {
    // ⟨ ស្លឹកកោង 📃 ⟩
    const geometrio = new THREE.PlaneGeometry(longo, largho, 0o2, 0o2)
      .translate(longo / 2, 0, 0);
    const pozicioj = geometrio.attributes.position;
    const kurboLarĝe = largho * 0o27/0o100;
    const kurboLonge = largho * 0o11/0o40;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const trans = y / ( largho / 2 );
      const laux = x / longo;
      pozicioj.setZ(i, kurboLarĝe * trans * trans + kurboLonge * laux * laux);
    }
    geometrio.computeVertexNormals();
    // ⟨ ពណ៌ស្លឹកនីមួយៗ 📃 ⟩
    const helo = 0o63/0o100 + Math.random() * 0o35/0o100;
    const varmo = 0o67/0o100 + Math.random() * 0o11/0o100;
    const koloroj = new Float32Array(pozicioj.count * 3);
    for ( let i = 0; i < pozicioj.count; i++ ) {
      koloroj[i * 3] = helo * ( 0o75/0o100 + Math.random() * 0o5/0o100 );
      koloroj[i * 3 + 1] = helo * ( 0o37/0o40 + Math.random() * 0o1/0o20 );
      koloroj[i * 3 + 2] = helo * varmo * ( 0o17/0o20 + Math.random() * 0o1/0o10 );
    }
    geometrio.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    return geometrio;
  };

  // ⟨ ហេតុអ្វី 📃 ⟩
  const kreiFolitufon = ( longo: number, largho: number, kvanto: number ): THREE.BufferGeometry => {
    const folioj: THREE.BufferGeometry[] = [];
    const bazo = Math.random() * Math.PI * 2;
    for ( let j = 0; j < kvanto; j++ ) {
      const folio = kreiFolianKarteton(
        longo * ( 0o7/0o10 + Math.random() * 0o5/0o10 ),
        largho * ( 0o4/0o5 + Math.random() * 0o5/0o10 ));
      // ⟨ លំដាប់ការបង្វិល 📃 ⟩
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        ( Math.random() - 0o5/0o10 ) * 0o4/0o5,
        bazo + j / kvanto * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10,
        -0o15/0o100 - Math.random() * 0o5/0o10, "YXZ")));
      folioj.push(folio);
    }
    return kunfandiGeometriojnSenIndekson(folioj);
  };

  // ⟨ ទទឹងស្លឹកប៉ុន្មាន 📃 ⟩
  const LARĜA_PROPORCIO = 0o1/0o2;

  // ⟨ ស្លឹកធំពេក 📃 ⟩
  const FOLIA_SKALO = 0o63/0o100;

  const faskoj = 0o17;
  for ( let i = 0; i < faskoj; i++ ) {
    const a = i / faskoj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
    const tavolo = i % 0o3;
    const ekstera = tavolo / 0o2;
    // ⟨ ស្លឹកនៅលើខ្នើយ 📃 ⟩
    const r = 0o14/0o100 + tavolo * 0o10/0o100 + ( Math.random() - 0o5/0o10 ) * 0o1/0o40;
    // ⟨ មិនទាំងអស់ក្នុងប្លង់តែមួយ 📃 ⟩
    const y = ( Math.random() - 0o5/0o10 ) * 0o14/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    if ( celo.length() > 0o1/0o100 ) {
      const direkto = celo.clone().normalize();
      const branĉeto = new THREE.CylinderGeometry(0o10/0o1000, 0o20/0o1000, celo.length(), 4)
        .translate(0, celo.length() / 2, 0);
      branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direkto)));
      partoj.push(kunTinto(branĉeto, 0o5/0o10, 0o23/0o40, 0o43/0o100));
    }
    const folioj = 0o3 + ( ( Math.random() * 0o2 ) | 0 );
    for ( let j = 0; j < folioj; j++ ) {
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 )
        * ( 1 - ekstera * 0o1/0o4 ) * FOLIA_SKALO;
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o5/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      const klino = new THREE.Euler(
        -0o2/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o6/0o10);
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(klino));
      if ( j > 0 ) {
        folio.translate(
          celo.x + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.y + ( Math.random() - 0o5/0o10 ) * 0o3/0o20,
          celo.z + ( Math.random() - 0o5/0o10 ) * 0o3/0o20);
      } else {
        folio.translate(celo.x, celo.y, celo.z);
      }
      foliajPartoj.push(folio);
    }
  }
  // ⟨ កំពូលស្លឹក 📃 ⟩
  // ⟨ ការចែកផ្កាឈូករ័ត្ន 📃 ⟩
  const suprajFolioj = 0o66;
  const oraAngulo = Math.PI * ( 3 - Math.sqrt(5) );
  for ( let i = 0; i < suprajFolioj; i++ ) {
    const frakcio = Math.sqrt(( i + 0o1/0o2 ) / suprajFolioj );
    const spirala = i * oraAngulo;
    const rSupra = 0o30/0o100 * frakcio * Math.cos(spirala);
    const zSupra = 0o30/0o100 * frakcio * Math.sin(spirala);
    const rNun = Math.hypot(rSupra, zSupra);
    const ySupra = 0o15/0o100 * Math.sqrt(Math.max(0, 1 - Math.pow(rNun / ( 0o23/0o100 ), 2))) + 0o1/0o100;
    const celo = new THREE.Vector3(rSupra, ySupra, zSupra);
    const longo = ( 0o12/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO * 0o35/0o40, 0o3);
    const deklivo = Math.min(1, rNun / ( 0o23/0o100 )) * 0o33/0o40;
    const a = Math.atan2(zSupra, rSupra);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      0,
      -a + ( Math.random() - 0o1/0o2 ) * 0o35/0o40,
      -deklivo - Math.random() * 0o1/0o4, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  // ⟨ គែមស្លឹក 📃 ⟩
  const randaj = 0o34;
  for ( let i = 0; i < randaj; i++ ) {
    const a = i / randaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10;
    // ⟨ ត្រង់គែមដុំខ្នើយ 📃 ⟩
    const r = 0o33/0o100 + Math.random() * 0o7/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o4/0o100 + ( Math.random() - 0o5/0o10 ) * 0o26/0o100, Math.sin(a) * r);
    const branĉeto = new THREE.CylinderGeometry(0o6/0o1000, 0o16/0o1000, r, 4)
      .translate(0, r / 2, 0);
    branĉeto.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0),
        celo.clone().normalize())));
    partoj.push(kunTinto(branĉeto, 0o5/0o10, 0o23/0o40, 0o43/0o100));
    for ( let j = 0; j < 0o3; j++ ) {
      // ⟨ ស្លឹកតាមគែម 📃 ⟩
      const longo = ( 0o13/0o100 + Math.random() * 0o6/0o100 ) * FOLIA_SKALO;
      // ⟨ ទទឹង 📃 ⟩
      const largho = longo * LARĜA_PROPORCIO * ( 0o4/0o5 + Math.random() * 0o4/0o10 );
      const folio = kreiFolitufon(longo, largho, 0o3);
      folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
        -0o5/0o10 - Math.random() * 0o4/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o7/0o10,
        ( Math.random() - 0o5/0o10 ) * 0o5/0o10, "YXZ")));
      folio.translate(celo.x, celo.y, celo.z);
      foliajPartoj.push(folio);
    }
  }
  // ⟨ ស្លឹកក្រោមខ្នើយ 📃 ⟩
  const subaj = 0o12;
  for ( let i = 0; i < subaj; i++ ) {
    const a = i / subaj * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o4/0o10;
    const r = 0o14/0o100 + Math.random() * 0o16/0o100;
    const celo = new THREE.Vector3(Math.cos(a) * r,
      -0o1/0o12 - Math.random() * 0o10/0o100, Math.sin(a) * r);
    const longo = ( 0o10/0o100 + Math.random() * 0o5/0o100 ) * FOLIA_SKALO;
    const folio = kreiFolitufon(longo, longo * LARĜA_PROPORCIO, 0o2);
    folio.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(
      -0o2/0o10,
      a + ( Math.random() - 0o5/0o10 ) * 0o5/0o10,
      -0o4/0o5 - Math.random() * 0o4/0o10, "YXZ")));
    folio.translate(celo.x, celo.y, celo.z);
    foliajPartoj.push(folio);
  }
  return { maso: kunfandiGeometriojnSenIndekson(partoj),
    folioj: kunfandiGeometriojnSenIndekson(foliajPartoj) };
}
