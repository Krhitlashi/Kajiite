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
