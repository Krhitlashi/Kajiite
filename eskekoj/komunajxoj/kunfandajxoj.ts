// ≺⧼ ការរលាយបញ្ចូល 🧩 ⧽≻
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    tv += g.getAttribute("position").count;
    ti += g.index ? g.index.count : g.getAttribute("position").count;
  }
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const uv = new Float32Array(tv * 2);
  const idxArr = tv > 0o177777 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const u = g.getAttribute("uv");
    const c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if ( n ) normo.set(n.array as Float32Array, vo * 3);
    if ( u ) uv.set(u.array as Float32Array, vo * 2);
    const indico = g.index;
    if ( indico ) {
      for ( let i = 0; i < indico.array.length; i++ ) idxArr[io + i] = indico.array[i] + vo;
      io += indico.array.length;
    } else {
      for ( let i = 0; i < c; i++ ) idxArr[io + i] = i + vo;
      io += c;
    }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}

export function kreiBuferanGeometrion(pozicioj: number[], indeksoj: number[],
  agordoj: { uvoj?: number[]; normaloj?: number[] } = {}
): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
  if ( agordoj.uvoj ) geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(agordoj.uvoj, 2));
  if ( agordoj.normaloj ) geometrio.setAttribute("normal", new THREE.Float32BufferAttribute(agordoj.normaloj, 3));
  geometrio.setIndex(indeksoj);
  if ( !agordoj.normaloj ) geometrio.computeVertexNormals();
  return geometrio;
}

export function aplikiSkatolajnUvojn(geometrio: THREE.BufferGeometry, skalo = 0o1): void {
  const pozicio = geometrio.getAttribute("position");
  const normo = geometrio.getAttribute("normal");
  if ( !normo ) geometrio.computeVertexNormals();
  const n = geometrio.getAttribute("normal");
  const uv = new Float32Array(pozicio.count * 2);
  for ( let i = 0; i < pozicio.count; i++ ) {
    const x = pozicio.getX(i), y = pozicio.getY(i), z = pozicio.getZ(i);
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u: number, v: number;
    if ( ay >= ax && ay >= az ) { u = x; v = z; }
    else if ( ax >= az ) { u = z; v = y; }
    else { u = x; v = y; }
    uv[i * 0o2] = u * skalo;
    uv[i * 0o2 + 0o1] = v * skalo;
  }
  geometrio.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

export function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  const na = a.index ? a.toNonIndexed() : a;
  const nb = b.index ? b.toNonIndexed() : b;
  const aPos = na.getAttribute("position");
  const bPos = nb.getAttribute("position");
  const aCount = aPos.count;
  const bCount = bPos.count;
  const tuto = aCount + bCount;

  const pozicio = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  pozicio.set(aPos.array as Float32Array, 0);
  pozicio.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = na.getAttribute("normal");
  const bNorm = nb.getAttribute("normal");
  if ( aNorm ) normo.set(aNorm.array as Float32Array, 0);
  if ( bNorm ) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = na.getAttribute("uv");
  const bUV = nb.getAttribute("uv");
  if ( aUV ) uv.set(aUV.array as Float32Array, 0);
  if ( bUV ) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  // ⟨ ពណ៌តាមកំពូល 📃 ⟩
  const aKol = na.getAttribute("color");
  const bKol = nb.getAttribute("color");
  if ( aKol && bKol ) {
    const koloroj = new Float32Array(tuto * 3);
    koloroj.set(aKol.array as Float32Array, 0);
    koloroj.set(bKol.array as Float32Array, aCount * 3);
    out.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
  }
  return out;
}

export function kunfandiGeometriojnSenIndekson(geometrioj: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geometrioj.length === 0 ) return new THREE.BufferGeometry();
  return geometrioj.slice(1).reduce(( rezulto, geometrio ) => kunfandiDuGeometriojn(rezulto, geometrio), geometrioj[0]);
}

// ⟪ ការរលាយសំណាញ់ដែលសង់រួច 📃 ⟫

export interface KunfandajOpcioj {
  celo?: number;
  konservu?: ( m: THREE.Mesh ) => boolean;
}

const kunfandajRezultoj = { antaŭe: 0, poste: 0 };

export function kunfandajxoStatistiko(): { antaŭe: number; poste: number } {
  return kunfandajRezultoj;
}

function renversiVolvon(g: THREE.BufferGeometry): void {
  if ( g.index !== null ) {
    const arr = g.index.array;
    for ( let i = 0; i < arr.length; i += 3 ) {
      const t = arr[i + 1]; arr[i + 1] = arr[i + 2]; arr[i + 2] = t;
    }
    g.index.needsUpdate = true;
    return;
  }
  for ( const nomo of Object.keys(g.attributes) ) {
    const at = g.attributes[nomo], s = at.itemSize, arr = at.array as Float32Array;
    for ( let i = 0; i + 2 < at.count; i += 3 ) {
      for ( let k = 0; k < s; k++ ) {
        const a = ( i + 1 ) * s + k, b = ( i + 2 ) * s + k, t = arr[a];
        arr[a] = arr[b]; arr[b] = t;
      }
    }
    at.needsUpdate = true;
  }
}

// ⟪ ការរលាយរហ័សនៃធរណីមាត្របំប្លែង 📃 ⟫

export interface TransformitaPeco {
  geometrio: THREE.BufferGeometry;
  matrico: THREE.Matrix4;
}

export function kunfandiTransformitajn(pecoj: TransformitaPeco[]): THREE.BufferGeometry | null {
  if ( pecoj.length === 0 ) return null;
  const unuaGeometrio = pecoj[0].geometrio;
  const indeksita = unuaGeometrio.index !== null;
  const unuaAtributoj = unuaGeometrio.attributes;
  const subskribo = Object.keys(unuaAtributoj).sort().join(",");
  // ⟨ ការត្រួតពិនិត្យ 📃 ⟩
  let tv = 0, ti = 0;
  for ( const p of pecoj ) {
    const g = p.geometrio;
    if ( ( g.index !== null ) !== indeksita ) return null;
    if ( Object.keys(g.attributes).sort().join(",") !== subskribo ) return null;
    const e = p.matrico.elements as unknown as number[];
    if ( e[3] !== 0 || e[7] !== 0 || e[0o13] !== 0 || e[0o17] !== 1 ) return null;
    for ( const nomo of Object.keys(g.attributes) ) {
      const a = g.attributes[nomo] as THREE.BufferAttribute;
      const b = unuaAtributoj[nomo] as THREE.BufferAttribute;
      if ( a.itemSize !== b.itemSize || a.normalized !== b.normalized ) return null;
      if ( !( a.array instanceof Float32Array ) ) return null;
    }
    tv += ( g.attributes.position as THREE.BufferAttribute ).count;
    if ( indeksita ) ti += g.index!.count;
  }
  // ⟨ តារាងបញ្ចេញ 📃 ⟩
  const eligoj = new Map<string, Float32Array>();
  for ( const nomo of Object.keys(unuaAtributoj) ) {
    const a = unuaAtributoj[nomo] as THREE.BufferAttribute;
    eligoj.set(nomo, new Float32Array(tv * a.itemSize));
  }
  const eligoIndekso = indeksita ? ( tv > 0o177777 ? new Uint32Array(ti) : new Uint16Array(ti) ) : null;
  const eligoPosicio = eligoj.get("position")!;
  const eligoNormo = eligoj.get("normal");
  let vo = 0, io = 0;
  for ( const p of pecoj ) {
    const g = p.geometrio;
    const e = p.matrico.elements as unknown as number[];
    const fontaPosicio = ( g.attributes.position as THREE.BufferAttribute ).array as Float32Array;
    const c = ( g.attributes.position as THREE.BufferAttribute ).count;
    // ⟨ ទីតាំង 📃 ⟩
    const e0 = e[0], e1 = e[1], e2 = e[2], e4 = e[4], e5 = e[5], e6 = e[6],
      e8 = e[0o10], e9 = e[0o11], e10 = e[0o12], e12 = e[0o14], e13 = e[0o15], e14 = e[0o16];
    for ( let i = 0, j = vo * 3; i < c; i++, j += 3 ) {
      const s = i * 3;
      const x = fontaPosicio[s], y = fontaPosicio[s + 1], z = fontaPosicio[s + 2];
      eligoPosicio[j] = e0 * x + e4 * y + e8 * z + e12;
      eligoPosicio[j + 1] = e1 * x + e5 * y + e9 * z + e13;
      eligoPosicio[j + 2] = e2 * x + e6 * y + e10 * z + e14;
    }
    // ⟨ ន័រម៉ាល់ 📃 ⟩
    const fontaNormo = g.attributes.normal as THREE.BufferAttribute | undefined;
    if ( eligoNormo !== undefined && fontaNormo !== undefined ) {
      const fn = fontaNormo.array as Float32Array;
      const nm = new THREE.Matrix3().getNormalMatrix(p.matrico);
      const m = nm.elements as unknown as number[];
      const m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4],
        m5 = m[5], m6 = m[6], m7 = m[7], m8 = m[0o10];
      for ( let i = 0, j = vo * 3; i < c; i++, j += 3 ) {
        const s = i * 3;
        const x = fn[s], y = fn[s + 1], z = fn[s + 2];
        const nx = m0 * x + m3 * y + m6 * z;
        const ny = m1 * x + m4 * y + m7 * z;
        const nz = m2 * x + m5 * y + m8 * z;
        const longo = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        eligoNormo[j] = nx / longo;
        eligoNormo[j + 1] = ny / longo;
        eligoNormo[j + 2] = nz / longo;
      }
    }
    // ⟨ គុណលក្ខណៈដទៃ 📃 ⟩
    for ( const [ nomo, eligo ] of eligoj ) {
      if ( nomo === "position" || nomo === "normal" ) continue;
      const a = g.attributes[nomo] as THREE.BufferAttribute;
      eligo.set(a.array as Float32Array, vo * a.itemSize);
    }
    // ⟨ លិបិក្រម 📃 ⟩
    const spegulo = p.matrico.determinant() < 0;
    if ( eligoIndekso !== null ) {
      const fontaIndekso = g.index!.array as Uint16Array | Uint32Array;
      if ( spegulo ) {
        for ( let i = 0; i < fontaIndekso.length; i += 3 ) {
          eligoIndekso[io + i] = fontaIndekso[i] + vo;
          eligoIndekso[io + i + 1] = fontaIndekso[i + 2] + vo;
          eligoIndekso[io + i + 2] = fontaIndekso[i + 1] + vo;
        }
      } else {
        for ( let i = 0; i < fontaIndekso.length; i++ ) eligoIndekso[io + i] = fontaIndekso[i] + vo;
      }
      io += fontaIndekso.length;
    } else if ( spegulo ) {
      // ⟨ កញ្ចក់ឆ្លុះគ្មានលិបិក្រម 📃 ⟩
      for ( const [ nomo, eligo ] of eligoj ) {
        const s = ( unuaAtributoj[nomo] as THREE.BufferAttribute ).itemSize;
        for ( let t = 0; t < c; t += 3 ) {
          const a = ( vo + t + 1 ) * s, b = ( vo + t + 2 ) * s;
          for ( let k = 0; k < s; k++ ) {
            const provizora = eligo[a + k];
            eligo[a + k] = eligo[b + k];
            eligo[b + k] = provizora;
          }
        }
      }
    }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  for ( const [ nomo, eligo ] of eligoj ) {
    const a = unuaAtributoj[nomo] as THREE.BufferAttribute;
    out.setAttribute(nomo, new THREE.BufferAttribute(eligo, a.itemSize, a.normalized));
  }
  if ( eligoIndekso !== null ) out.setIndex(new THREE.BufferAttribute(eligoIndekso, 1));
  return out;
}

export function kunfandiMondajnMeshojn(gepatra: THREE.Object3D, radikoj: THREE.Object3D[],
  opcioj: KunfandajOpcioj = {}
): { antaŭe: number; poste: number } {
  const celo = opcioj.celo || 0;
  const konservu = opcioj.konservu;
  const grupoj = new Map<string, { mesho: THREE.Mesh; matrico: THREE.Matrix4 }[]>();
  let antaŭe = 0;
  for ( const radiko of radikoj ) {
    radiko.updateWorldMatrix(true, true);
    radiko.traverse(o => {
      if ( !o.visible ) return;
      const m = o as THREE.Mesh;
      if ( m.isMesh !== true || ( m as THREE.InstancedMesh ).isInstancedMesh === true ) return;
      if ( Array.isArray(m.material) ) return;
      if ( konservu !== undefined && konservu(m) ) return;
      antaŭe++;
      const geometrio = m.geometry;
      const signaturo = Object.keys(geometrio.attributes).sort().join(",")
        + ( geometrio.index === null ? "|n" : "|i" );
      const matrico = m.matrixWorld;
      const ĉelo = celo > 0
        ? Math.floor(matrico.elements[0o14] / celo) + "," + Math.floor(matrico.elements[0o16] / celo)
        : "-";
      const ŝlosilo = [ m.material.uuid, m.castShadow ? 1 : 0, m.receiveShadow ? 1 : 0,
        m.renderOrder, m.layers.mask, signaturo, ĉelo ].join("|");
      let listo = grupoj.get(ŝlosilo);
      if ( listo === undefined ) grupoj.set(ŝlosilo, listo = []);
      listo.push({ mesho: m, matrico: matrico.clone() });
    });
  }
  let poste = 0;
  for ( const listo of grupoj.values() ) {
    if ( listo.length < 2 ) { poste += listo.length; continue; }
    // ⟨ ផ្លូវលឿន 📃 ⟩
    let kunigita = kunfandiTransformitajn(listo.map(a => ({ geometrio: a.mesho.geometry, matrico: a.matrico })));
    if ( kunigita === null ) {
      const geometrioj = listo.map(a => {
        const g = a.mesho.geometry.clone();
        g.applyMatrix4(a.matrico);
        // ⟨ ធរណីមាត្រឆ្លុះ 📃 ⟩
        if ( a.matrico.determinant() < 0 ) renversiVolvon(g);
        return g;
      });
      kunigita = mergeGeometries(geometrioj, false);
      for ( const g of geometrioj ) g.dispose();
    }
    if ( kunigita === null ) { poste += listo.length; continue; }
    const unua = listo[0].mesho;
    const mesho = new THREE.Mesh(kunigita, unua.material);
    mesho.castShadow = unua.castShadow;
    mesho.receiveShadow = unua.receiveShadow;
    mesho.renderOrder = unua.renderOrder;
    mesho.layers.mask = unua.layers.mask;
    let samaj: Record<string, unknown> | null = unua.userData;
    for ( const a of listo ) if ( a.mesho.userData !== samaj ) { samaj = null; break; }
    if ( samaj !== null ) mesho.userData = samaj;
    mesho.name = "kunigita";
    gepatra.add(mesho);
    for ( const a of listo ) a.mesho.removeFromParent();
    poste++;
  }
  kunfandajRezultoj.antaŭe += antaŭe;
  kunfandajRezultoj.poste += poste;
  return { antaŭe, poste };
}

export function kunfandiKajVeldoiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  const unu = kunfandiGeometriojn(geos);
  const pozicio = unu.getAttribute("position") as THREE.BufferAttribute;
  const idxArr = unu.getIndex()!.array as Uint16Array | Uint32Array;
  const tv = pozicio.count;
  const skalo = 0o10000;
  const mapo = new Map<string, number>();
  const novaIndekso = new Uint32Array(tv);
  let nv = 0;
  for ( let i = 0; i < tv; i++ ) {
    const sxlosilo = Math.round(pozicio.getX(i) * skalo) + "," + Math.round(pozicio.getY(i) * skalo) + "," + Math.round(pozicio.getZ(i) * skalo);
    const trovita = mapo.get(sxlosilo);
    if ( trovita !== undefined ) { novaIndekso[i] = trovita; }
    else { mapo.set(sxlosilo, nv); novaIndekso[i] = nv; nv++; }
  }
  const veldita = new Float32Array(nv * 3);
  for ( let i = 0; i < tv; i++ ) {
    veldita[novaIndekso[i]*3] = pozicio.getX(i);
    veldita[novaIndekso[i]*3+1] = pozicio.getY(i);
    veldita[novaIndekso[i]*3+2] = pozicio.getZ(i);
  }
  for ( let i = 0; i < idxArr.length; i++ ) idxArr[i] = novaIndekso[idxArr[i]];
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(veldita, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  out.computeVertexNormals();
  return out;
}
