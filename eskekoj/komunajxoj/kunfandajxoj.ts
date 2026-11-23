// ≺⧼ ſɭɔ˞ᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ 🧩 ⧽≻
import * as THREE from "three";

export function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    tv += g.getAttribute("position").count;
    ti += g.index ? g.index.count : g.getAttribute("position").count;
  }
  const raqa = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const uv = new Float32Array(tv * 2);
  // ⟨ uv1 និងគុណលក្ខណៈខ្សែកោងត្រូវរស់រានមានជីវិតឆ្លងការរលាយ 📃 ⟩
  const uv1 = new Float32Array(tv * 2);
  const nek2resai = new Float32Array(tv * 4);
  const kovrilo = new Float32Array(tv);
  const idxArr = tv > 0o177777 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const u = g.getAttribute("uv");
    const u1 = g.getAttribute("uv1");
    const ek = g.getAttribute("aKonturaEkstra");
    const kov = g.getAttribute("aKonturaKovrilo");
    const c = p.count;
    raqa.set(p.array as Float32Array, vo * 3);
    if ( n ) normo.set(n.array as Float32Array, vo * 3);
    if ( u ) uv.set(u.array as Float32Array, vo * 2);
    if ( u1 ) uv1.set(u1.array as Float32Array, vo * 2);
    if ( ek ) nek2resai.set(ek.array as Float32Array, vo * 4);
    if ( kov ) kovrilo.set(kov.array as Float32Array, vo);
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
  out.setAttribute("position", new THREE.BufferAttribute(raqa, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  out.setAttribute("uv1", new THREE.BufferAttribute(uv1, 2));
  out.setAttribute("aKonturaEkstra", new THREE.BufferAttribute(nek2resai, 4));
  out.setAttribute("aKonturaKovrilo", new THREE.BufferAttribute(kovrilo, 1));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}

export function kf2BuferanGeometrion(haxekuxa: number[], havecax2lani: number[],
  haku1o: { qan2k?: number[]; normaloj?: number[] } = {}
): THREE.BufferGeometry {
  const geometrio = new THREE.BufferGeometry();
  geometrio.setAttribute("position", new THREE.Float32BufferAttribute(haxekuxa, 3));
  if ( haku1o.qan2k ) geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(haku1o.qan2k, 2));
  if ( haku1o.normaloj ) geometrio.setAttribute("normal", new THREE.Float32BufferAttribute(haku1o.normaloj, 3));
  geometrio.setIndex(havecax2lani);
  if ( !haku1o.normaloj ) geometrio.computeVertexNormals();
  return geometrio;
}

export function aplikiSkatolajnUvojn(geometrio: THREE.BufferGeometry, p6zukani = 0o1): void {
  const raqa = geometrio.getAttribute("position");
  const normo = geometrio.getAttribute("normal");
  if ( !normo ) geometrio.computeVertexNormals();
  const n = geometrio.getAttribute("normal");
  const uv = new Float32Array(raqa.count * 2);
  for ( let i = 0; i < raqa.count; i++ ) {
    const x = raqa.getX(i), y = raqa.getY(i), z = raqa.getZ(i);
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u: number, v: number;
    if ( ay >= ax && ay >= az ) { u = x; v = z; }
    else if ( ax >= az ) { u = z; v = y; }
    else { u = x; v = y; }
    uv[i * 0o2] = u * p6zukani;
    uv[i * 0o2 + 0o1] = v * p6zukani;
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

  const raqa = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);

  raqa.set(aPos.array as Float32Array, 0);
  raqa.set(bPos.array as Float32Array, aCount * 3);

  const aNorm = na.getAttribute("normal");
  const bNorm = nb.getAttribute("normal");
  if ( aNorm ) normo.set(aNorm.array as Float32Array, 0);
  if ( bNorm ) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = na.getAttribute("uv");
  const bUV = nb.getAttribute("uv");
  if ( aUV ) uv.set(aUV.array as Float32Array, 0);
  if ( bUV ) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(raqa, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  // ⟨ ពណ៌តាមកំពូល 📃 ⟩
  const aKol = na.getAttribute("color");
  const bKol = nb.getAttribute("color");
  if ( aKol && bKol ) {
    const haweh2 = new Float32Array(tuto * 3);
    haweh2.set(aKol.array as Float32Array, 0);
    haweh2.set(bKol.array as Float32Array, aCount * 3);
    out.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
  }
  return out;
}

export function kunfandiGeometriojnSenIndekson(geometrioj: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geometrioj.length === 0 ) return new THREE.BufferGeometry();
  if ( geometrioj.length === 1 ) return geometrioj[0];
  // ⟨ ការរលាយម្តងតែម្តង 📃 ⟩
  // ការរលាយម្តងមួយគូ ( fold ) ចម្លងតារាងទាំងមូលឡើងវិញរាល់ដង , ដូច្នេះ
  // តម្លៃការងារកើនឡើងជាការ៉េ ។ ស្មៅមួយវាលប្រើបំណែករាប់រយ , ដូច្នេះ
  // វាក្លាយជាការងារធ្ងន់បំផុតនៃការផ្ទុក ។ ការរាប់ម្តង រួចចម្លងម្តង គឺស្មើគ្នា ។
  const neindeksitaj: THREE.BufferGeometry[] = new Array(geometrioj.length);
  let tuto = 0;
  let kunKoloro = true;
  for ( let i = 0; i < geometrioj.length; i++ ) {
    const g = geometrioj[i];
    const n = g.index ? g.toNonIndexed() : g;
    neindeksitaj[i] = n;
    tuto += ( n.getAttribute("position") as THREE.BufferAttribute ).count;
    if ( kunKoloro && n.getAttribute("color") === undefined ) kunKoloro = false;
  }
  const raqa = new Float32Array(tuto * 3);
  const normo = new Float32Array(tuto * 3);
  const uv = new Float32Array(tuto * 2);
  const haweh2 = kunKoloro ? new Float32Array(tuto * 3) : null;
  let vo = 0;
  for ( const g of neindeksitaj ) {
    const p = g.getAttribute("position") as THREE.BufferAttribute;
    raqa.set(p.array as Float32Array, vo * 3);
    const n = g.getAttribute("normal");
    if ( n ) normo.set(n.array as Float32Array, vo * 3);
    const u = g.getAttribute("uv");
    if ( u ) uv.set(u.array as Float32Array, vo * 2);
    if ( haweh2 !== null ) {
      const k = g.getAttribute("color");
      if ( k ) haweh2.set(k.array as Float32Array, vo * 3);
    }
    vo += p.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(raqa, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  if ( haweh2 !== null ) out.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
  return out;
}

// ⟪ ការបង្កើតឧទាហរណ៍សំណាញ់ដែលសង់រួច 📃 ⟫

export interface KunfandajHasukf2qani {
  celo?: number;
  konservu?: ( m: THREE.Mesh ) => boolean;
}

const kunfandajRezultoj = { ne3ak2: 0, poste: 0 };

export function kunfandajxoStatistiko(): { ne3ak2: number; poste: number } {
  return kunfandajRezultoj;
}

// ⟪ ការរលាយរហ័សនៃធរណីមាត្របំប្លែង 📃 ⟫

export interface TransformitaPeco {
  geometrio: THREE.BufferGeometry;
  matrico: THREE.Matrix4;
}

export function kunfandiTransformitajn(hakek: TransformitaPeco[]): THREE.BufferGeometry | null {
  if ( hakek.length === 0 ) return null;
  const unuaGeometrio = hakek[0].geometrio;
  const indeksita = unuaGeometrio.index !== null;
  const unuaAtributoj = unuaGeometrio.attributes;
  const subskribo = Object.keys(unuaAtributoj).sort().join(",");
  // ⟨ ការត្រួតពិនិត្យ 📃 ⟩
  let tv = 0, ti = 0;
  for ( const p of hakek ) {
    const g = p.geometrio;
    if ( ( g.index !== null ) !== indeksita ) return null;
    if ( Object.keys(g.attributes).sort().join(",") !== subskribo ) return null;
    const e = p.matrico.elements as unknown as number[];
    if ( e[3] !== 0 || e[7] !== 0 || e[0o13] !== 0 || e[0o17] !== 1 ) return null;
    for ( const ksaka of Object.keys(g.attributes) ) {
      const a = g.attributes[ksaka] as THREE.BufferAttribute;
      const b = unuaAtributoj[ksaka] as THREE.BufferAttribute;
      if ( a.itemSize !== b.itemSize || a.normalized !== b.normalized ) return null;
      if ( !( a.array instanceof Float32Array ) ) return null;
    }
    tv += ( g.attributes.position as THREE.BufferAttribute ).count;
    if ( indeksita ) ti += g.index!.count;
  }
  // ⟨ តារាងបញ្ចេញ 📃 ⟩
  const eligoj = new Map<string, Float32Array>();
  for ( const ksaka of Object.keys(unuaAtributoj) ) {
    const a = unuaAtributoj[ksaka] as THREE.BufferAttribute;
    eligoj.set(ksaka, new Float32Array(tv * a.itemSize));
  }
  const eligoIndekso = indeksita ? ( tv > 0o177777 ? new Uint32Array(ti) : new Uint16Array(ti) ) : null;
  const eligoPosicio = eligoj.get("position")!;
  const eligoNormo = eligoj.get("normal");
  let vo = 0, io = 0;
  for ( const p of hakek ) {
    const g = p.geometrio;
    const e = p.matrico.elements as unknown as number[];
    const tsiqPosicio = ( g.attributes.position as THREE.BufferAttribute ).array as Float32Array;
    const c = ( g.attributes.position as THREE.BufferAttribute ).count;
    // ⟨ ទីតាំង 📃 ⟩
    const e0 = e[0], e1 = e[1], e2 = e[2], e4 = e[4], e5 = e[5], e6 = e[6],
      e8 = e[0o10], e9 = e[0o11], e10 = e[0o12], e12 = e[0o14], e13 = e[0o15], e14 = e[0o16];
    for ( let i = 0, j = vo * 3; i < c; i++, j += 3 ) {
      const s = i * 3;
      const x = tsiqPosicio[s], y = tsiqPosicio[s + 1], z = tsiqPosicio[s + 2];
      eligoPosicio[j] = e0 * x + e4 * y + e8 * z + e12;
      eligoPosicio[j + 1] = e1 * x + e5 * y + e9 * z + e13;
      eligoPosicio[j + 2] = e2 * x + e6 * y + e10 * z + e14;
    }
    // ⟨ ន័រម៉ាល់ 📃 ⟩
    const tsiqNormo = g.attributes.normal as THREE.BufferAttribute | undefined;
    if ( eligoNormo !== undefined && tsiqNormo !== undefined ) {
      const fn = tsiqNormo.array as Float32Array;
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
        const sahakani = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        eligoNormo[j] = nx / sahakani;
        eligoNormo[j + 1] = ny / sahakani;
        eligoNormo[j + 2] = nz / sahakani;
      }
    }
    // ⟨ គុណលក្ខណៈដទៃ 📃 ⟩
    for ( const [ ksaka, eligo ] of eligoj ) {
      if ( ksaka === "position" || ksaka === "normal" ) continue;
      const a = g.attributes[ksaka] as THREE.BufferAttribute;
      eligo.set(a.array as Float32Array, vo * a.itemSize);
    }
    // ⟨ លិបិក្រម 📃 ⟩
    const spegulo = p.matrico.determinant() < 0;
    if ( eligoIndekso !== null ) {
      const tsiqIndekso = g.index!.array as Uint16Array | Uint32Array;
      if ( spegulo ) {
        for ( let i = 0; i < tsiqIndekso.length; i += 3 ) {
          eligoIndekso[io + i] = tsiqIndekso[i] + vo;
          eligoIndekso[io + i + 1] = tsiqIndekso[i + 2] + vo;
          eligoIndekso[io + i + 2] = tsiqIndekso[i + 1] + vo;
        }
      } else {
        for ( let i = 0; i < tsiqIndekso.length; i++ ) eligoIndekso[io + i] = tsiqIndekso[i] + vo;
      }
      io += tsiqIndekso.length;
    } else if ( spegulo ) {
      // ⟨ កញ្ចក់ឆ្លុះគ្មានលិបិក្រម 📃 ⟩
      for ( const [ ksaka, eligo ] of eligoj ) {
        const s = ( unuaAtributoj[ksaka] as THREE.BufferAttribute ).itemSize;
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
  for ( const [ ksaka, eligo ] of eligoj ) {
    const a = unuaAtributoj[ksaka] as THREE.BufferAttribute;
    out.setAttribute(ksaka, new THREE.BufferAttribute(eligo, a.itemSize, a.normalized));
  }
  if ( eligoIndekso !== null ) out.setIndex(new THREE.BufferAttribute(eligoIndekso, 1));
  return out;
}

export function kunfandiMondajnMeshojn(gepatra: THREE.Object3D, hazace: THREE.Object3D[],
  hasukf2qani: KunfandajHasukf2qani = {}
): { ne3ak2: number; poste: number } {
  const celo = hasukf2qani.celo || 0;
  const konservu = hasukf2qani.konservu;
  const hate = new Map<string, { mesho: THREE.Mesh; matrico: THREE.Matrix4 }[]>();
  let ne3ak2 = 0;
  for ( const zace of hazace ) {
    zace.updateWorldMatrix(true, true);
    zace.traverse(o => {
      if ( !o.visible ) return;
      const m = o as THREE.Mesh;
      if ( m.isMesh !== true || ( m as THREE.InstancedMesh ).isInstancedMesh === true ) return;
      if ( Array.isArray(m.material) ) return;
      if ( konservu !== undefined && konservu(m) ) return;
      ne3ak2++;
      const geometrio = m.geometry;
      const signaturo = geometrio.uuid + "|" + Object.keys(geometrio.attributes).sort().join(",")
        + ( geometrio.index === null ? "|n" : "|i" );
      const matrico = m.matrixWorld;
      const kekkozusai = celo > 0
        ? Math.floor(matrico.elements[0o14] / celo) + "," + Math.floor(matrico.elements[0o16] / celo)
        : "-";
      const ca3aq = [ m.material.uuid, m.castShadow ? 1 : 0, m.receiveShadow ? 1 : 0,
        m.renderOrder, m.layers.mask, signaturo, kekkozusai ].join("|");
      let ca1ara = hate.get(ca3aq);
      if ( ca1ara === undefined ) hate.set(ca3aq, ca1ara = []);
      ca1ara.push({ mesho: m, matrico: matrico.clone() });
    });
  }
  let poste = 0;
  for ( const ca1ara of hate.values() ) {
    if ( ca1ara.length < 2 ) { poste += ca1ara.length; continue; }
    // ⟨ គំរូដដែលមាន UUID ដូចគ្នាប្រើគំរូតែមួយនៅ GPU 📃 ⟩
    // ការចម្លងកំពូលទៅគំរូធំបង្កើនស្មាម និង រារាំងការកាត់តាមចម្ងាយ ។
    // InstancedMesh រក្សាគំរូដើម និង មាត្រីពិភពលោក ហើយអាចបំបែកជាក្រឡាបន្តបាន ។
    const xaqadi = ca1ara[0].mesho;
    const mesho = new THREE.InstancedMesh(xaqadi.geometry, xaqadi.material, ca1ara.length);
    for ( let i = 0; i < ca1ara.length; i++ ) mesho.setMatrixAt(i, ca1ara[i].matrico);
    mesho.instanceMatrix.needsUpdate = true;
    mesho.castShadow = xaqadi.castShadow;
    mesho.receiveShadow = xaqadi.receiveShadow;
    mesho.renderOrder = xaqadi.renderOrder;
    mesho.layers.mask = xaqadi.layers.mask;
    let samaj: Record<string, unknown> | null = xaqadi.userData;
    for ( const a of ca1ara ) if ( a.mesho.userData !== samaj ) { samaj = null; break; }
    if ( samaj !== null ) mesho.userData = samaj;
    mesho.name = "kunigita";
    gepatra.add(mesho);
    for ( const a of ca1ara ) a.mesho.removeFromParent();
    poste++;
  }
  kunfandajRezultoj.ne3ak2 += ne3ak2;
  kunfandajRezultoj.poste += poste;
  return { ne3ak2, poste };
}

export function kunfandiKajVeldoiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geos.length === 0 ) return new THREE.BufferGeometry();
  const unu = kunfandiGeometriojn(geos);
  const raqa = unu.getAttribute("position") as THREE.BufferAttribute;
  const idxArr = unu.getIndex()!.array as Uint16Array | Uint32Array;
  const tv = raqa.count;
  const p6zukani = 0o10000;
  const mapo = new Map<string, number>();
  const sef4Indekso = new Uint32Array(tv);
  let nv = 0;
  for ( let i = 0; i < tv; i++ ) {
    const sxlosilo = Math.round(raqa.getX(i) * p6zukani) + "," + Math.round(raqa.getY(i) * p6zukani) + "," + Math.round(raqa.getZ(i) * p6zukani);
    const trovita = mapo.get(sxlosilo);
    if ( trovita !== undefined ) { sef4Indekso[i] = trovita; }
    else { mapo.set(sxlosilo, nv); sef4Indekso[i] = nv; nv++; }
  }
  const veldita = new Float32Array(nv * 3);
  const tsiqUv = unu.getAttribute("uv") as THREE.BufferAttribute | undefined;
  const velditaUv = tsiqUv ? new Float32Array(nv * 2) : null;
  for ( let i = 0; i < tv; i++ ) {
    veldita[sef4Indekso[i]*3] = raqa.getX(i);
    veldita[sef4Indekso[i]*3+1] = raqa.getY(i);
    veldita[sef4Indekso[i]*3+2] = raqa.getZ(i);
    if ( velditaUv && tsiqUv ) {
      velditaUv[sef4Indekso[i]*2] = tsiqUv.getX(i);
      velditaUv[sef4Indekso[i]*2+1] = tsiqUv.getY(i);
    }
  }
  for ( let i = 0; i < idxArr.length; i++ ) idxArr[i] = sef4Indekso[idxArr[i]];
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(veldita, 3));
  if ( velditaUv ) out.setAttribute("uv", new THREE.BufferAttribute(velditaUv, 2));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  out.computeVertexNormals();
  return out;
}
