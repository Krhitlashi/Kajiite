// Kunfanda modulo — komunaj geometriaj kunfand-helpiloj por la tuta mondo
import * as THREE from "three";

// kunfandiGeometriojn — Kunfandas plurajn BufferGeometriojn en unu indeksitan
// geometrion, konservante poziciojn, normalojn kaj la indekson ( 16/32-bita laŭ
// la vertokvanto ). Ne-indeksaj enigoj ricevas sintezitajn sinsekvajn indeksojn.
export function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    tv += g.getAttribute("position").count;
    ti += g.index ? g.index.count : g.getAttribute("position").count;
  }
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) {
      for (let i = 0; i < indico.array.length; i++) idxArr[io + i] = indico.array[i] + vo;
      io += indico.array.length;
    } else {
      for (let i = 0; i < c; i++) idxArr[io + i] = i + vo;
      io += c;
    }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}

// kunfandiDuGeometriojn — Kunfandas du geometriojn SEN indekso, konservante la
// triangulan ordon kaj la UV-ojn. Ideala por plantoj kun alfa-testataj teksturoj.
export function kunfandiDuGeometriojn(a: THREE.BufferGeometry, b: THREE.BufferGeometry): THREE.BufferGeometry {
  // Ne-indeksaj geometrioj konservas la triangulan ordon dum kunfando;
  // alie la indekso perdiĝas kaj duono de ĉiu ebeno neniam bildiĝas.
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
  if (aNorm) normo.set(aNorm.array as Float32Array, 0);
  if (bNorm) normo.set(bNorm.array as Float32Array, aCount * 3);

  const aUV = na.getAttribute("uv");
  const bUV = nb.getAttribute("uv");
  if (aUV) uv.set(aUV.array as Float32Array, 0);
  if (bUV) uv.set(bUV.array as Float32Array, aCount * 2);

  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return out;
}

// kunfandiGeometriojnSenIndekson — Redukta kunfando de pluraj geometrioj per
// kunfandiDuGeometriojn ( sen indekso, kun UV-oj ).
export function kunfandiGeometriojnSenIndekson(geometrioj: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if ( geometrioj.length === 0 ) return new THREE.BufferGeometry();
  return geometrioj.slice( 1 ).reduce( ( rezulto, geometrio ) => kunfandiDuGeometriojn( rezulto, geometrio ), geometrioj[0] );
}

// kunfandiKajVeldoiGeometriojn — Kunfandas la partojn en UNU geometrion kaj
// VELDAS la koincidajn vertojn ( la ferma-kapo-rando kun la unua/lasta ringo
// de la svingo ) kaj REKOMPUTAS la normalojn. la kapoj ombrigxas seninterrompe
// — NENIA videbla kudro cxe la supro aux la malsupro; la supro estas unu glata
// strukturo ( la hoka pinto kreskas el la sxafto, ne kusxas kiel kovrilo ).
export function kunfandiKajVeldoiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  const unu = kunfandiGeometriojn(geos);
  const pozicio = unu.getAttribute("position") as THREE.BufferAttribute;
  const idxArr = unu.getIndex()!.array as Uint16Array | Uint32Array;
  const tv = pozicio.count;
  // Veldi. koincidaj vertoj (en 0o1/0o10000) dividas la saman indekson. La pli fajna
  // krado gravas cxe la eta fina ringo. je 0o1/0o1000 pluraj najbaraj rondangulaj
  // punktoj kunfalis en la saman verton kaj kreis la videblan krucan cxapon.
  const skalo = 4096;
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
