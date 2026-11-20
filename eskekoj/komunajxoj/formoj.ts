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
  const R = r + bendo, supro = h + bendo, malsupro = -bendo;
  const d = R * Math.SQRT1_2;
  // ⟨ ផ្នែករាប 📃 ⟩
  const plata = ( hw - r ) * 0o3/0o10;
  // ⟨ ចុងចំហៀងជាកញ្ចក់រលូន 📃 ⟩
  const brako = r - d + bendo + pintoFlanko;
  const svingo = brako * 0o1/0o2;
  s.moveTo(hw - r, malsupro);
  s.absarc(hw - r, r, R, -Math.PI / 2, -Math.PI / 4, false);
  s.bezierCurveTo(hw - r + d + svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    hw + bendo + pintoFlanko - svingo, r, hw + bendo + pintoFlanko, r);
  s.bezierCurveTo(hw + bendo + pintoFlanko - svingo, r,
    hw - r + d + svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    hw - r + d, r + d);
  s.absarc(hw - r, r, R, Math.PI / 4, Math.PI / 2, false);
  // ⟨ គែមស្របនឹងកញ្ចក់ បន្ទាប់មកកោងទៅចុង 📃 ⟩
  s.lineTo(plata, supro);
  s.bezierCurveTo(plata * 0o1/0o2, supro, 0, supro + pintoSupre * 0o1/0o2, 0, supro + pintoSupre);
  s.bezierCurveTo(0, supro + pintoSupre * 0o1/0o2, -plata * 0o1/0o2, supro, -plata, supro);
  s.lineTo(-hw + r, supro);
  s.absarc(-hw + r, r, R, Math.PI / 2, Math.PI * 0o3/0o4, false);
  s.bezierCurveTo(-hw + r - d - svingo * Math.SQRT1_2, r + d - svingo * Math.SQRT1_2,
    -hw - bendo - pintoFlanko + svingo, r, -hw - bendo - pintoFlanko, r);
  s.bezierCurveTo(-hw - bendo - pintoFlanko + svingo, r,
    -hw + r - d - svingo * Math.SQRT1_2, r - d + svingo * Math.SQRT1_2,
    -hw + r - d, r - d);
  s.absarc(-hw + r, r, R, Math.PI * 0o5/0o4, Math.PI * 0o3/0o2, false);
  s.lineTo(-plata, malsupro);
  s.bezierCurveTo(-plata * 0o1/0o2, malsupro, 0, malsupro - pintoSupre * 0o1/0o2, 0, malsupro - pintoSupre);
  s.bezierCurveTo(0, malsupro - pintoSupre * 0o1/0o2, plata * 0o1/0o2, malsupro, plata, malsupro);
  s.closePath();
  return s;
}

export function rondigiKonturon(punktoj: THREE.Vector2[], radio: number): THREE.Shape {
  const s = new THREE.Shape();
  const n = punktoj.length;
  const direktu = (a: THREE.Vector2, b: THREE.Vector2): THREE.Vector2 =>
    new THREE.Vector2(b.x - a.x, b.y - a.y).normalize();
  for ( let i = 0; i < n; i++ ) {
    const V = punktoj[i], A = punktoj[(i + n - 1) % n], B = punktoj[(i + 1) % n];
    const u = direktu(A, V), v = direktu(V, B);
    // ⟨ គ្មានការមូលនៅចុងពិត 📃 ⟩
    if ( u.dot(v) < -0o17/0o20 ) { s.lineTo(V.x, V.y); continue; }
    const h = Math.min(radio, A.distanceTo(V) * 0o1/0o2, V.distanceTo(B) * 0o1/0o2);
    const komenco = V.clone().addScaledVector(u, -h);
    const fino = V.clone().addScaledVector(v, h);
    if ( i === 0 ) s.moveTo(komenco.x, komenco.y); else s.lineTo(komenco.x, komenco.y);
    s.quadraticCurveTo(V.x, V.y, fino.x, fino.y);
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

export function kreiLoftanGeometrion(pozicioj: number[], uvoj: number[], indeksoj: number[]): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
  geometrio.setIndex(indeksoj);
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
  const grupoj = new Map<number, number[]>();
  for ( let i = 0; i < uv.count; i++ ) {
    let kl = 0;
    if ( nor ) {
      const ax = Math.abs(nor.getX(i)), ay = Math.abs(nor.getY(i)), az = Math.abs(nor.getZ(i));
      kl = ay >= ax && ay >= az ? ( nor.getY(i) > 0 ? 1 : 2 )
        : ax >= az ? ( nor.getX(i) > 0 ? 3 : 4 ) : ( nor.getZ(i) > 0 ? 5 : 6 );
    }
    let listo = grupoj.get(kl);
    if ( !listo ) grupoj.set(kl, listo = []);
    listo.push(i);
  }
  for ( const listo of grupoj.values() ) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for ( const i of listo ) {
      const x = uv.getX(i), y = uv.getY(i);
      if ( x < minX ) minX = x;
      if ( x > maxX ) maxX = x;
      if ( y < minY ) minY = y;
      if ( y > maxY ) maxY = y;
    }
    const sx = maxX - minX > 0o1/0o10000 ? maxX - minX : 1;
    const sy = maxY - minY > 0o1/0o10000 ? maxY - minY : 1;
    for ( const i of listo ) uv.setXY(i, ( uv.getX(i) - minX ) / sx, ( uv.getY(i) - minY ) / sy);
  }
  uv.needsUpdate = true;
  return geometrio;
}

// ⟨ uv តាមមុខសម្រាប់ស៊ីឡាំង/កោណ/ឡាត់ ៤ ជ្រុង ៖
//   ចំហៀង u តាមមុខនីមួយៗ ( មិនរុំជុំវិញ ), គម្រប u,v រាបតាមការ៉េមុខ ។
//   ត្រូវហៅមុន translate ព្រោះ atan2 ជុំវិញគោលក្នុងតំបន់ ។ 📃 ⟩
export function aplikoKlinajnUvojn(geometrio: THREE.BufferGeometry,
  rB: number, rT: number, nurFlankoj = false): THREE.BufferGeometry {
  const g = geometrio.index ? geometrio.toNonIndexed() : geometrio;
  const poz = g.getAttribute("position") as THREE.BufferAttribute;
  const norm = g.getAttribute("normal") as THREE.BufferAttribute;
  const uv = g.getAttribute("uv") as THREE.BufferAttribute;
  const duonoB = rB * Math.SQRT1_2, duonoT = rT * Math.SQRT1_2;
  const kvarono = Math.PI / 2, okono = Math.PI / 4;
  // ⟨ កោណចុងស្រួច ៖ មុខចំហៀងជាត្រីកោណ ដូច្នេះផ្ញើ bary ឱ្យខ្សែកោងស្របគែមទាំងបី 📃 ⟩
  const pinta = rT < 0o1 / 0o10000 && !nurFlankoj;
  const ekstra = new Float32Array(poz.count * 4);
  for (let i = 0; i < poz.count; i += 3) {
    const supren = Math.abs(norm.getY(i)) > 0o7 / 0o10;
    let cx = 0, cz = 0;
    for (let k = 0; k < 3; k++) { cx += poz.getX(i + k); cz += poz.getZ(i + k); }
    const centro = Math.floor((Math.atan2(cx, cz) + okono) / kvarono) * kvarono;
    let pintoK = 0;
    if (pinta && !supren) {
      for (let k = 1; k < 3; k++) if (poz.getY(i + k) > poz.getY(i + pintoK)) pintoK = k;
    }
    for (let k = 0; k < 3; k++) {
      const j = i + k;
      const x = poz.getX(j), y = poz.getY(j), z = poz.getZ(j);
      if (supren && !nurFlankoj) {
        const duono = norm.getY(i) > 0 ? duonoT : duonoB;
        const d = duono > 0o1 / 0o10000 ? duono : 1;
        uv.setXY(j, x / (2 * d) + 0o1 / 0o2, z / (2 * d) + 0o1 / 0o2);
      } else {
        const ang = Math.atan2(x, z) - centro;
        const dAng = Math.atan2(Math.sin(ang), Math.cos(ang));
        uv.setXY(j, Math.min(1, Math.max(0, (dAng + okono) / kvarono)), uv.getY(j));
        if (pinta && !supren) {
          const b = k === pintoK ? [ 0, 0, 1 ] : k === (pintoK + 1) % 3 ? [ 1, 0, 0 ] : [ 0, 1, 0 ];
          ekstra[j * 4] = b[0]; ekstra[j * 4 + 1] = b[1]; ekstra[j * 4 + 2] = b[2];
        }
      }
    }
  }
  uv.needsUpdate = true;
  g.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(ekstra, 4));
  return g;
}
