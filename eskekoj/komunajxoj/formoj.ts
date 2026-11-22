// ≺⧼ ទម្រង់ 🔷 ⧽≻
import * as THREE from "three";

export function kreiPilolFenestranFormon(w: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  s.moveTo(-hw + r, 0);
  s.lineTo(hw - r, 0);
  s.absarc(hw - r, r, r, -Math.PI / 2, Math.PI / 2, false);
  s.lineTo(-hw + r, h);
  s.absarc(-hw + r, r, r, Math.PI / 2, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

// ⟨ របៀបវាត្រូវប្រើ 📃 ⟩
// ⟨ ហេតុអ្វីចុងលេចចេញក្រៅកញ្ចក់ 📃 ⟩
// ⟨ មាត្រខាងក្នុង និងខ្សែ 📃 ⟩
export function kreiStelanFenestranFormon(w: number, h: number, bendo: number, pintoFlanko: number, pintoSupre: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, r = h / 2;
  const R = r + bendo, teru = h + bendo, psaz = -bendo;
  const d = R * Math.SQRT1_2;
  // ⟨ ផ្នែករាប 📃 ⟩
  const plata = ( hw - r ) * 0o3/0o10;
  // ⟨ ចុងចំហៀងជាកញ្ចក់រលូន 📃 ⟩
  const knece = r - d + bendo + pintoFlanko;
  const svingo = knece * 0o1/0o2;
  s.moveTo(hw - r, psaz);
  s.absarc(hw - r, r, R, -Math.PI / 2, -Math.PI / 4, false);
  s.bezierCurveTo(hw - r + d + svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    hw + bendo + pintoFlanko - svingo, r, hw + bendo + pintoFlanko, r);
  s.bezierCurveTo(hw + bendo + pintoFlanko - svingo, r,
    hw - r + d + svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    hw - r + d, r + d);
  s.absarc(hw - r, r, R, Math.PI / 4, Math.PI / 2, false);
  // ⟨ គែមស្របនឹងកញ្ចក់ បន្ទាប់មកកោងទៅចុង 📃 ⟩
  s.lineTo(plata, teru);
  s.bezierCurveTo(plata * 0o1/0o2, teru, 0, teru + pintoSupre * 0o1/0o2, 0, teru + pintoSupre);
  s.bezierCurveTo(0, teru + pintoSupre * 0o1/0o2, -plata * 0o1/0o2, teru, -plata, teru);
  s.lineTo(-hw + r, teru);
  s.absarc(-hw + r, r, R, Math.PI / 2, Math.PI * 0o3/0o4, false);
  s.bezierCurveTo(-hw + r - d - svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    -hw - bendo - pintoFlanko + svingo, r, -hw - bendo - pintoFlanko, r);
  s.bezierCurveTo(-hw - bendo - pintoFlanko + svingo, r,
    -hw + r - d - svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    -hw + r - d, r - d);
  s.absarc(-hw + r, r, R, Math.PI * 0o5/0o4, Math.PI * 0o3/0o2, false);
  s.lineTo(-plata, psaz);
  s.bezierCurveTo(-plata * 0o1/0o2, psaz, 0, psaz - pintoSupre * 0o1/0o2, 0, psaz - pintoSupre);
  s.bezierCurveTo(0, psaz - pintoSupre * 0o1/0o2, plata * 0o1/0o2, psaz, plata, psaz);
  s.closePath();
  return s;
}

export function rondigiKonturon(n2k: THREE.Vector2[], radio: number): THREE.Shape {
  const s = new THREE.Shape();
  const n = n2k.length;
  const direktu = (a: THREE.Vector2, b: THREE.Vector2): THREE.Vector2 =>
    new THREE.Vector2(b.x - a.x, b.y - a.y).normalize();
  for ( let i = 0; i < n; i++ ) {
    const V = n2k[i], A = n2k[(i + n - 1) % n], B = n2k[(i + 1) % n];
    const u = direktu(A, V), v = direktu(V, B);
    // ⟨ គ្មានការមូលនៅចុងពិត 📃 ⟩
    if ( u.dot(v) < -0o17/0o20 ) { s.lineTo(V.x, V.y); continue; }
    const h = Math.min(radio, A.distanceTo(V) * 0o1/0o2, V.distanceTo(B) * 0o1/0o2);
    const saxeni = V.clone().addScaledVector(u, -h);
    const tlakakani = V.clone().addScaledVector(v, h);
    if ( i === 0 ) s.moveTo(saxeni.x, saxeni.y); else s.lineTo(saxeni.x, saxeni.y);
    s.quadraticCurveTo(V.x, V.y, tlakakani.x, tlakakani.y);
  }
  s.closePath();
  return s;
}

export function kreiRondigitanRektangulanFormon(w: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, hd = d / 2;
  s.moveTo(-hw + r, -hd);
  s.lineTo(hw - r, -hd);
  s.absarc(hw - r, -hd + r, r, -Math.PI / 2, 0, false);
  s.lineTo(hw, hd - r);
  s.absarc(hw - r, hd - r, r, 0, Math.PI / 2, false);
  s.lineTo(-hw + r, hd);
  s.absarc(-hw + r, hd - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-hw, -hd + r);
  s.absarc(-hw + r, -hd + r, r, Math.PI, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

export function kreiLoftanGeometrion(pozicioj: number[], uvoj: number[], havecax2lani: number[]): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setIndex(havecax2lani);
  geometrio.computeVertexNormals();
  return geometrio;
}

// ⟨ បង្រួម uv ដែលមានស្រាប់ទៅ 0..1 តាមប្រអប់របស់វា ៖ មុខឯកត្តមួយក្នុងវាលកោង 📃 ⟩
export function normaligiUvojn(geometrio: THREE.BufferGeometry): THREE.BufferGeometry {
  const uv = geometrio.getAttribute("uv") as THREE.BufferAttribute | undefined;
  if (!uv) return geometrio;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < uv.count; i++) {
    const x = uv.getX(i), y = uv.getY(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const sx = maxX - minX > 0o1 / 0o10000 ? maxX - minX : 1;
  const sy = maxY - minY > 0o1 / 0o10000 ? maxY - minY : 1;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) - minX) / sx, (uv.getY(i) - minY) / sy);
  }
  uv.needsUpdate = true;
  return geometrio;
}

// ⟨ uv1 រក្សាវាយនភាពតាមពិភពលោក , uv រាប 0..1 តាមក្រុមមុខ ៖
//   ខ្សែកោងរុំពីគែមក្រៅរបស់មុខចូលក្នុង គ្មានការ៉េកើតឡើងវិញ 📃 ⟩
export function pretigiKonturajnUvojn<G extends THREE.BufferGeometry>(geometrio: G): G {
  const uv = geometrio.getAttribute("uv") as THREE.BufferAttribute | undefined;
  if ( !uv || geometrio.getAttribute("uv1") ) return geometrio;
  geometrio.setAttribute("uv1", uv.clone());
  const nor = geometrio.getAttribute("normal") as THREE.BufferAttribute | undefined;
  const hate = new Map<number, number[]>();
  for ( let i = 0; i < uv.count; i++ ) {
    let kl = 0;
    if ( nor ) {
      const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
      kl = ay >= ax && ay >= az ? ( nor.getY(i) > 0 ? 1 : 2 )
        : ax >= az ? ( nor.getX(i) > 0 ? 3 : 4 ) : ( nor.getZ(i) > 0 ? 5 : 6 );
    }
    let ca1ara = hate.get(kl);
    if ( !ca1ara ) hate.set(kl, ca1ara = []);
    ca1ara.push(i);
  }
  for ( const ca1ara of hate.values() ) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for ( const i of ca1ara ) {
      const x = uv.getX(i), y = uv.getY(i);
      if ( x < minX ) minX = x;
      if ( x > maxX ) maxX = x;
      if ( y < minY ) minY = y;
      if ( y > maxY ) maxY = y;
    }
    const sx = maxX - minX > 0o1/0o10000 ? maxX - minX : 1;
    const sy = maxY - minY > 0o1/0o10000 ? maxY - minY : 1;
    for ( const i of ca1ara ) uv.setXY(i, ( uv.getX(i) - minX ) / sx, ( uv.getY(i) - minY ) / sy);
  }
  uv.needsUpdate = true;
  return geometrio;
}

// ⟨ uv តាមផ្ទៃពិតសម្រាប់ទ្វារ ៖ ទទឹងផ្លាស់ប្តូរតាមកម្ពស់ ដូច្នេះខ្សែកោង
//   មិនកាត់នៅជ្រុងទ្វារទេ ។ គូរនីមួយៗក្នុង s2qena គឺ [ y, ទទឹងពេញ ] 📃 ⟩
export function pretigiKonturajnUvojnLaŭProfilo<G extends THREE.BufferGeometry>(
  geometrio: G, s2qena: readonly ( readonly [ number, number ] )[] ): G {
  pretigiKonturajnUvojn( geometrio );
  if ( s2qena.length < 0o2 ) return geometrio;
  const poz = geometrio.getAttribute( "position" ) as THREE.BufferAttribute;
  const nor = geometrio.getAttribute( "normal" ) as THREE.BufferAttribute | undefined;
  const uv = geometrio.getAttribute( "uv" ) as THREE.BufferAttribute;
  for ( let i = 0; i < uv.count; i++ ) {
    // ⟨ មុខមុខ និងមុខក្រោយប៉ុណ្ណោះ ៖ គែម និង bevel រក្សា uv របស់ផ្ទៃខ្លួន 📃 ⟩
    if ( nor && Math.abs( nor.getZ( i ) ) < 0o777 / 0o1000 ) continue;
    const y = poz.getY( i );
    let suba = s2qena[ 0 ], teru = s2qena[ s2qena.length - 0o1 ];
    for ( let k = 0o1; k < s2qena.length; k++ ) {
      if ( y <= s2qena[ k ][ 0o0 ] ) {
        suba = s2qena[ k - 0o1 ];
        teru = s2qena[ k ];
        break;
      }
    }
    const l6da = teru[ 0o0 ] - suba[ 0o0 ];
    const t = Math.max( 0, Math.min( 0o1, l6da > 0o10 ** -0o7 ? ( y - suba[ 0o0 ] ) / l6da : 0 ) );
    const sefini = suba[ 0o1 ] + ( teru[ 0o1 ] - suba[ 0o1 ] ) * t;
    if ( sefini > 0o10 ** -0o7 ) uv.setX( i, poz.getX( i ) / sefini + 0o1 / 0o2 );
  }
  uv.needsUpdate = true;
  return geometrio;
}

// ⟨ uv តាមមុខសម្រាប់ស៊ីឡាំង/កោណ/ឡាត់ ៤ ជ្រុង ៖
//   ចំហៀង u តាមមុខនីមួយៗ ( មិនរុំជុំវិញ ), គម្រប u,v រាបតាមការ៉េមុខ ។
//   ត្រូវហៅមុន translate ព្រោះ atan2 ជុំវិញគោលក្នុងតំបន់ ។ 📃 ⟩
export function aplikoKlinajnUvojn(geometrio: THREE.BufferGeometry,
  rB: number, rT: number, nurFlankoj = false,
  kovrajSkaloj: readonly [ number, number ] = [ 0, 0 ]): THREE.BufferGeometry {
  const g = geometrio.index ? geometrio.toNonIndexed() : geometrio;
  const poz = g.getAttribute("position") as THREE.BufferAttribute;
  const norm = g.getAttribute("normal") as THREE.BufferAttribute;
  const uv = g.getAttribute("uv") as THREE.BufferAttribute;
  // ⟨ uv1 រក្សាផ្ទៃពេញ ។ aKonturaKovrilo បញ្ជាក់ផ្នែកដែលស្រទាប់ផ្សេងគ្រប 📃 ⟩
  const bazaUv = uv.clone();
  g.setAttribute("uv1", bazaUv);
  const kovrilo = new Float32Array(poz.count);
  const duonoB = rB * Math.SQRT1_2, duonoT = rT * Math.SQRT1_2;
  const kvarono = Math.PI / 2, caxomani = Math.PI / 4;
  // ⟨ កោណចុងស្រួច ៖ មុខចំហៀងជាត្រីកោណ ដូច្នេះផ្ញើ bary ឱ្យខ្សែកោងស្របគែមទាំងបី 📃 ⟩
  const pinta = rT < 0o1 / 0o10000 && !nurFlankoj;
  const ekstra = new Float32Array(poz.count * 4);
  for (let i = 0; i < poz.count; i += 3) {
    const sozasai = Math.abs(norm.getY(i)) > 0o7 / 0o10;
    let cx = 0, cz = 0;
    for (let k = 0; k < 3; k++) { cx += poz.getX(i + k); cz += poz.getZ(i + k); }
    const sost2 = Math.floor((Math.atan2(cx, cz) + caxomani) / kvarono) * kvarono;
    let pintoK = 0;
    if (pinta && !sozasai) {
      for (let k = 1; k < 3; k++) if (poz.getY(i + k) > poz.getY(i + pintoK)) pintoK = k;
    }
    for (let k = 0; k < 3; k++) {
      const j = i + k;
      const x = poz.getX(j), y = poz.getY(j), z = poz.getZ(j);
      if (sozasai && !nurFlankoj) {
        const p2somani = norm.getY(i) > 0 ? duonoT : duonoB;
        const d = p2somani > 0o1 / 0o10000 ? p2somani : 1;
        // ⟨ គម្របមានបួនផ្ទៃដាច់ដោយឡែក ៖ uv1 រក្សាគម្របពេញសម្រាប់ផ្ទៃដែលគ្មានអ្វីគ្រប 📃 ⟩
        const kovraSkalo = norm.getY(i) > 0 ? kovrajSkaloj[ 0 ] : kovrajSkaloj[ 1 ];
        kovrilo[ j ] = kovraSkalo > 0 ? Math.min( 1, kovraSkalo ) : -1;
        const lokaX = x * Math.cos(sost2) - z * Math.sin(sost2);
        const lokaZ = x * Math.sin(sost2) + z * Math.cos(sost2);
        // ⟨ uv1 ប្រើកូអរដោនេផ្ទៃក្រោយបង្វិល ដូច្នេះជំហានស្របនឹងគែម មិនមែនគម្របដើមរបស់ CylinderGeometry 📃 ⟩
        bazaUv.setXY(j, x / (2 * d) + 0o1 / 0o2, z / (2 * d) + 0o1 / 0o2);
        uv.setXY(j, lokaX / (2 * d) + 0o1 / 0o2, lokaZ / d);
      } else {
        const ang = Math.atan2(x, z) - sost2;
        const dAng = Math.atan2(Math.sin(ang), Math.cos(ang));
        uv.setXY(j, Math.min(1, Math.max(0, (dAng + caxomani) / kvarono)), uv.getY(j));
        if (pinta && !sozasai) {
          const b = k === pintoK ? [ 0, 0, 1 ] : k === (pintoK + 1) % 3 ? [ 1, 0, 0 ] : [ 0, 1, 0 ];
          ekstra[j * 4] = b[0]; ekstra[j * 4 + 1] = b[1]; ekstra[j * 4 + 2] = b[2];
        }
      }
    }
  }
  uv.needsUpdate = true;
  bazaUv.needsUpdate = true;
  g.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(ekstra, 4));
  g.setAttribute("aKonturaKovrilo", new THREE.BufferAttribute(kovrilo, 1));
  return g;
}
