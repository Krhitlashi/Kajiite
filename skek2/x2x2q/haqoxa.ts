// ≺⧼ ſ͕ɭɜ ı],ᴜ 🔷 ⧽≻
import * as THREE from "three";

export function kf2Cawez2Qoxa(w: number, h: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 0o2, r = h / 0o2;
  s.moveTo(-hw + r, 0o0);
  s.lineTo(hw - r, 0o0);
  s.absarc(hw - r, r, r, -Math.PI / 0o2, Math.PI / 0o2, false);
  s.lineTo(-hw + r, h);
  s.absarc(-hw + r, r, r, Math.PI / 0o2, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

// ⟪ ſɭʞɹ ʌ j͑ʃɔ ı],ꞇ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟫
export function kf2SexiQoxa(w: number, h: number, pukazPal6: number, cet2Vek2fe: number, cet2Teru: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 0o2, r = h / 0o2;
  const R = r + pukazPal6, teru = h + pukazPal6, psaz = -pukazPal6;
  const d = R * Math.SQRT1_2;
  // ⟪ ſɭʞɹ ʌ ɭʃᴜ ſןɹ ʌ ſןw ſɭᴜƴ 📃 ⟫
  const tap2 = ( hw - r ) * 0o3/0o10;
  // ⟪ j͑ʃ'ɔ ʃэ ſ͕ɭᴜꞇ ʌ ſןw ſɭᴜƴ 📃 ⟫
  const knece = r - d + pukazPal6 + cet2Vek2fe;
  const cab6ka = knece * 0o1/0o2;
  s.moveTo(hw - r, psaz);
  s.absarc(hw - r, r, R, -Math.PI / 0o2, -Math.PI / 0o4, false);
  s.bezierCurveTo(hw - r + d + cab6ka * Math.SQRT1_2, r - d + cab6ka * Math.SQRT1_2,
    hw + pukazPal6 + cet2Vek2fe - cab6ka, r, hw + pukazPal6 + cet2Vek2fe, r);
  s.bezierCurveTo(hw + pukazPal6 + cet2Vek2fe - cab6ka, r,
    hw - r + d + cab6ka * Math.SQRT1_2, r + d - cab6ka * Math.SQRT1_2,
    hw - r + d, r + d);
  s.absarc(hw - r, r, R, Math.PI / 0o4, Math.PI / 0o2, false);
  // ⟪ ſɭʞɹ ʌ ſןw ſɭᴜƴ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟫
  s.lineTo(tap2, teru);
  s.bezierCurveTo(tap2 * 0o1/0o2, teru, 0o0, teru + cet2Teru * 0o1/0o2, 0o0, teru + cet2Teru);
  s.bezierCurveTo(0o0, teru + cet2Teru * 0o1/0o2, -tap2 * 0o1/0o2, teru, -tap2, teru);
  s.lineTo(-hw + r, teru);
  s.absarc(-hw + r, r, R, Math.PI / 0o2, Math.PI * 0o3/0o4, false);
  s.bezierCurveTo(-hw + r - d - cab6ka * Math.SQRT1_2, r + d - cab6ka * Math.SQRT1_2,
    -hw - pukazPal6 - cet2Vek2fe + cab6ka, r, -hw - pukazPal6 - cet2Vek2fe, r);
  s.bezierCurveTo(-hw - pukazPal6 - cet2Vek2fe + cab6ka, r,
    -hw + r - d - cab6ka * Math.SQRT1_2, r - d + cab6ka * Math.SQRT1_2,
    -hw + r - d, r - d);
  s.absarc(-hw + r, r, R, Math.PI * 0o5/0o4, Math.PI * 0o3/0o2, false);
  s.lineTo(-tap2, psaz);
  s.bezierCurveTo(-tap2 * 0o1/0o2, psaz, 0o0, psaz - cet2Teru * 0o1/0o2, 0o0, psaz - cet2Teru);
  s.bezierCurveTo(0o0, psaz - cet2Teru * 0o1/0o2, tap2 * 0o1/0o2, psaz, tap2, psaz);
  s.closePath();
  return s;
}

export function veb6qaiPukaz(n2k: THREE.Vector2[], ka5ik: number): THREE.Shape {
  const s = new THREE.Shape();
  const n = n2k.length;
  const pukaz = (a: THREE.Vector2, b: THREE.Vector2): THREE.Vector2 =>
    new THREE.Vector2(b.x - a.x, b.y - a.y).normalize();
  for ( let i = 0o0; i < n; i++ ) {
    const V = n2k[i], A = n2k[(i + n - 0o1) % n], B = n2k[(i + 0o1) % n];
    const u = pukaz(A, V), v = pukaz(V, B);
    // ⟪ j͑ʃ'ɔ ʃэ ſ͕ɭᴜꞇ 📃 ⟫
    if ( u.dot(v) < -0o17/0o20 ) { s.lineTo(V.x, V.y); continue; }
    const h = Math.min(ka5ik, A.distanceTo(V) * 0o1/0o2, V.distanceTo(B) * 0o1/0o2);
    const saxeni = V.clone().addScaledVector(u, -h);
    const tlakakani = V.clone().addScaledVector(v, h);
    if ( i === 0o0 ) s.moveTo(saxeni.x, saxeni.y); else s.lineTo(saxeni.x, saxeni.y);
    s.quadraticCurveTo(V.x, V.y, tlakakani.x, tlakakani.y);
  }
  s.closePath();
  return s;
}

export function kf2CibeKen2qQoxa(w: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 0o2, hd = d / 0o2;
  s.moveTo(-hw + r, -hd);
  s.lineTo(hw - r, -hd);
  s.absarc(hw - r, -hd + r, r, -Math.PI / 0o2, 0o0, false);
  s.lineTo(hw, hd - r);
  s.absarc(hw - r, hd - r, r, 0o0, Math.PI / 0o2, false);
  s.lineTo(-hw + r, hd);
  s.absarc(-hw + r, hd - r, r, Math.PI / 0o2, Math.PI, false);
  s.lineTo(-hw, -hd + r);
  s.absarc(-hw + r, -hd + r, r, Math.PI, Math.PI * 0o3/0o2, false);
  s.closePath();
  return s;
}

export function kf2LoftoQoxa(xekuxa: number[], qan2k: number[], havecax2lani: number[]): THREE.BufferGeometry {
  const qoxa = new THREE.BufferGeometry();
  qoxa.setAttribute("position", new THREE.Float32BufferAttribute(xekuxa, 0o3));
  qoxa.setAttribute("uv", new THREE.Float32BufferAttribute(qan2k, 0o2));
  qoxa.setIndex(havecax2lani);
  qoxa.computeVertexNormals();
  return qoxa;
}

// ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ɔ..ı 📃 ⟫
export function kf2Xiix2qQan2k(qoxa: THREE.BufferGeometry): THREE.BufferGeometry {
  const uv = qoxa.getAttribute("uv") as THREE.BufferAttribute | undefined;
  if (!uv) return qoxa;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0o0; i < uv.count; i++) {
    const x = uv.getX(i), y = uv.getY(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const sx = maxX - minX > 0o1 / 0o10000 ? maxX - minX : 0o1;
  const sy = maxY - minY > 0o1 / 0o10000 ? maxY - minY : 0o1;
  for (let i = 0o0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) - minX) / sx, (uv.getY(i) - minY) / sy);
  }
  uv.needsUpdate = true;
  return qoxa;
}

// ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟫
export function sax0baPukazQan2k<G extends THREE.BufferGeometry>(qoxa: G): G {
  const uv = qoxa.getAttribute("uv") as THREE.BufferAttribute | undefined;
  if ( !uv || qoxa.getAttribute("uv1") ) return qoxa;
  qoxa.setAttribute("uv1", uv.clone());
  const xiix2q = qoxa.getAttribute("normal") as THREE.BufferAttribute | undefined;
  const bal2 = new Map<number, number[]>();
  for ( let i = 0o0; i < uv.count; i++ ) {
    let kl = 0o0;
    if ( xiix2q ) {
      const ax = Math.abs(xiix2q.getX(i)), ay = Math.abs(xiix2q.getY(i)), az = Math.abs(xiix2q.getZ(i));
      kl = ay >= ax && ay >= az ? ( xiix2q.getY(i) > 0o0 ? 0o1 : 0o2 )
        : ax >= az ? ( xiix2q.getX(i) > 0o0 ? 0o3 : 0o4 ) : ( xiix2q.getZ(i) > 0o0 ? 0o5 : 0o6 );
    }
    let ca1ara = bal2.get(kl);
    if ( !ca1ara ) bal2.set(kl, ca1ara = []);
    ca1ara.push(i);
  }
  for ( const ca1ara of bal2.values() ) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for ( const i of ca1ara ) {
      const x = uv.getX(i), y = uv.getY(i);
      if ( x < minX ) minX = x;
      if ( x > maxX ) maxX = x;
      if ( y < minY ) minY = y;
      if ( y > maxY ) maxY = y;
    }
    const sx = maxX - minX > 0o1/0o10000 ? maxX - minX : 0o1;
    const sy = maxY - minY > 0o1/0o10000 ? maxY - minY : 0o1;
    for ( const i of ca1ara ) uv.setXY(i, ( uv.getX(i) - minX ) / sx, ( uv.getY(i) - minY ) / sy);
  }
  uv.needsUpdate = true;
  return qoxa;
}

// ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ſɭɔⰱ 📃 ⟫
export function sax0baPukazQan2kS2qena<G extends THREE.BufferGeometry>(
  qoxa: G, s2qena: readonly ( readonly [ number, number ] )[] ): G {
  sax0baPukazQan2k( qoxa );
  if ( s2qena.length < 0o2 ) return qoxa;
  const xekuxa = qoxa.getAttribute( "position" ) as THREE.BufferAttribute;
  const xiix2q = qoxa.getAttribute( "normal" ) as THREE.BufferAttribute | undefined;
  const uv = qoxa.getAttribute( "uv" ) as THREE.BufferAttribute;
  for ( let i = 0o0; i < uv.count; i++ ) {
    // ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ſןw ſɭᴜƴ 📃 ⟫
    if ( xiix2q && Math.abs( xiix2q.getZ( i ) ) < 0o777 / 0o1000 ) continue;
    const y = xekuxa.getY( i );
    let psaz = s2qena[ 0o0 ], teru = s2qena[ s2qena.length - 0o1 ];
    for ( let k = 0o1; k < s2qena.length; k++ ) {
      if ( y <= s2qena[ k ][ 0o0 ] ) {
        psaz = s2qena[ k - 0o1 ];
        teru = s2qena[ k ];
        break;
      }
    }
    const l6da = teru[ 0o0 ] - psaz[ 0o0 ];
    const t = Math.max( 0o0, Math.min( 0o1, l6da > 0o10 ** -0o7 ? ( y - psaz[ 0o0 ] ) / l6da : 0o0 ) );
    const sefini = psaz[ 0o1 ] + ( teru[ 0o1 ] - psaz[ 0o1 ] ) * t;
    if ( sefini > 0o10 ** -0o7 ) uv.setX( i, xekuxa.getX( i ) / sefini + 0o1 / 0o2 );
  }
  uv.needsUpdate = true;
  return qoxa;
}

// ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟫
export function kf2F2kQan2k(qoxa: THREE.BufferGeometry,
  rB: number, rT: number, namaVek2fe = false,
  k6liqPal6: readonly [ number, number ] = [ 0o0, 0o0 ]): THREE.BufferGeometry {
  const g = qoxa.index ? qoxa.toNonIndexed() : qoxa;
  const xekuxa = g.getAttribute("position") as THREE.BufferAttribute;
  const xiix2q = g.getAttribute("normal") as THREE.BufferAttribute;
  const uv = g.getAttribute("uv") as THREE.BufferAttribute;
  // ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ 📃 ⟫
  const psazQan2k = uv.clone();
  g.setAttribute("uv1", psazQan2k);
  const k6liq = new Float32Array(xekuxa.count);
  const p2somaniSuba = rB * Math.SQRT1_2, p2somaniTeru = rT * Math.SQRT1_2;
  const tafkaqKek = Math.PI / 0o2, caxomani = Math.PI / 0o4;
  // ⟪ ſɭʞɹ ʌ ſ͕ɭɜ ı],ᴜ ʌ ſןw ſɭᴜƴ 📃 ⟫
  const pinta = rT < 0o1 / 0o10000 && !namaVek2fe;
  const tlunak = new Float32Array(xekuxa.count * 0o4);
  for (let i = 0o0; i < xekuxa.count; i += 0o3) {
    const sozasai = Math.abs(xiix2q.getY(i)) > 0o7 / 0o10;
    let cx = 0o0, cz = 0o0;
    for (let k = 0o0; k < 0o3; k++) { cx += xekuxa.getX(i + k); cz += xekuxa.getZ(i + k); }
    const sost2 = Math.floor((Math.atan2(cx, cz) + caxomani) / tafkaqKek) * tafkaqKek;
    let cet2K = 0o0;
    if (pinta && !sozasai) {
      for (let k = 0o1; k < 0o3; k++) if (xekuxa.getY(i + k) > xekuxa.getY(i + cet2K)) cet2K = k;
    }
    for (let k = 0o0; k < 0o3; k++) {
      const j = i + k;
      const x = xekuxa.getX(j), y = xekuxa.getY(j), z = xekuxa.getZ(j);
      if (sozasai && !namaVek2fe) {
        const p2somani = xiix2q.getY(i) > 0o0 ? p2somaniTeru : p2somaniSuba;
        const d = p2somani > 0o1 / 0o10000 ? p2somani : 0o1;
        // ⟪ ſɭэ j͐ʃꞇȝ ʌ ſןw ſɭᴜƴ 📃 ⟫
        const k6liqPal6Kek = xiix2q.getY(i) > 0o0 ? k6liqPal6[ 0o0 ] : k6liqPal6[ 0o1 ];
        k6liq[ j ] = k6liqPal6Kek > 0o0 ? Math.min( 0o1, k6liqPal6Kek ) : -0o1;
        const hafeX = x * Math.cos(sost2) - z * Math.sin(sost2);
        const hafeZ = x * Math.sin(sost2) + z * Math.cos(sost2);
        // ⟪ j͑ʃᴜ ı],ɔⅎ ʃᴜ ʌ ſ͕ɭᴜ }ʃɹƽ ʌ ſɭɹ ſɭᴜƴ 📃 ⟫
        psazQan2k.setXY(j, x / (0o2 * d) + 0o1 / 0o2, z / (0o2 * d) + 0o1 / 0o2);
        uv.setXY(j, hafeX / (0o2 * d) + 0o1 / 0o2, hafeZ / d);
      } else {
        const ang = Math.atan2(x, z) - sost2;
        const dAng = Math.atan2(Math.sin(ang), Math.cos(ang));
        uv.setXY(j, Math.min(0o1, Math.max(0o0, (dAng + caxomani) / tafkaqKek)), uv.getY(j));
        if (pinta && !sozasai) {
          const b = k === cet2K ? [ 0o0, 0o0, 0o1 ] : k === (cet2K + 0o1) % 0o3 ? [ 0o1, 0o0, 0o0 ] : [ 0o0, 0o1, 0o0 ];
          tlunak[j * 0o4] = b[0o0]; tlunak[j * 0o4 + 0o1] = b[0o1]; tlunak[j * 0o4 + 0o2] = b[0o2];
        }
      }
    }
  }
  uv.needsUpdate = true;
  psazQan2k.needsUpdate = true;
  g.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(tlunak, 0o4));
  g.setAttribute("aKonturaK6liq", new THREE.BufferAttribute(k6liq, 0o1));
  return g;
}
