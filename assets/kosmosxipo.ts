// Kosmosxipa modulo — ciel-rombo ciela transporto de ornaveth-v2
// 5 tieroj supren, 5 malsupren (spegulitaj), LONGAs horizontalaj RONDIGITAJ fenestroj
// sur cxiu nivelo krom la centra (kie la pordoj estas); flosas libere sen soklo aŭ signo
import * as THREE from "three";
import { aldoniKadranTubon, kreiKlinoTavolon } from "./zigurato-konstruilo.js";
import { kreiPilolFenestranFormon } from "./internoj.js";

// Rondigita rombo-formo (uzata por enirejoj)
function rondigitaRomboFormo(w: number, h: number, n: number = 99/64, seg: number = 0o100): THREE.Shape {
  const hw = w / 2, hh = h / 2;
  const s = new THREE.Shape();
  const e = 2 / n;
  for ( let i = 0; i <= seg; i++ ) {
    const a = i / seg * Math.PI * 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const x = Math.sign(ca) * Math.pow(Math.abs(ca), e) * hw;
    const y = Math.sign(sa) * Math.pow(Math.abs(sa), e) * hh;
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  return s;
}

export interface CielDiamanto {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaPozicio: THREE.Vector3;
  doorDir: THREE.Vector3;
}

// konstruiCielDiamanton — Konstruu la spacosxipon kun diamant-formaj enirejoj kaj LONGAs horizontalaj rondigitaj fenestroj.
export function konstruiCielDiamanton( sceno: THREE.Scene,
  x: number, y: number, z: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial
): CielDiamanto {
  const group = new THREE.Group();
  const tieroAlto = 115/32, up = 5, down = up, hw0 = 4;
  const ins = (4 - 83/64) / 4;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 27/64, metalness: 5/64, envMapIntensity: 19/32,
  });
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x082828, emissive: 0x103838, emissiveIntensity: 13/32, roughness: 5/32, metalness: 13/64,
  });

  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  // La sxipo reuzas la KONSTRUAJX-tavolojn (klinitaj trapezoidoj) por la supraj
  // kaj subaj partoj — ambaŭ finoj kurbigas. La meza sekcio restas plata.
  // La klinitaj tavoloj ricevas klinitajn pilierojn (klino), kaj la flipped subaj
  // pilieroj montras siajn foliojn pinton-malsupren (folio defaŭlte = true).
  const klino = 5/16;
  // Suprenaj tieroj — samaj diamantaj angul-pilieroj kiel la konstruajxoj
  for ( let i = 0; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const yB = i * tieroAlto, yT = yB + tieroAlto;
    const klinita = i >= up - 2;   // la supraj du tavoloj klinigxas
    if ( klinita ) {
      murajGeometrioj.push(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, tieroAlto).translate(0, yB + tieroAlto / 2, 0));
    } else {
      murajGeometrioj.push(new THREE.BoxGeometry(hw * 2, tieroAlto, hw * 2).translate(0, yB + tieroAlto / 2, 0));
    }
    for (const a of [ -1, 1 ]) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yB, yT, a, b, true, klinita ? klino : 0);
    }
  }
  // Malsuprenaj tieroj — la PRECIZA vertikala spegulo de la supraj (samaj larĝoj,
  // samaj klinoj, inverse): la suba duono spegulas la supran, do la sxipo aspektas
  // spegulita ambaŭflanke de la centro. La klinitaj tavoloj klinigxas inverse
  // (pli larĝaj supre, pinton suben).
  for ( let j = 1; j <= down; j++ ) {
    const hw = hw0 - (j - 1) * ins;
    const yTop = -(j - 1) * tieroAlto, yBot = -j * tieroAlto;
    const klinita = (j - 1) >= up - 2;
    if ( klinita ) {
      murajGeometrioj.push(kreiKlinoTavolon(hw - klino, hw - klino, hw, hw, tieroAlto).translate(0, (yTop + yBot) / 2, 0));
    } else {
      murajGeometrioj.push(new THREE.BoxGeometry(hw * 2, tieroAlto, hw * 2).translate(0, (yTop + yBot) / 2, 0));
    }
    for (const a of [ -1, 1 ]) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yBot, yTop, a, b, false, klinita ? klino : 0);
    }
  }

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), oraMaterialo));

  // Rondigitaj rombo-pordoj sur ĈIUJ 4 flankoj, CENTRITAJ je y=0 (la spegula
  // centro de la sxipo): la pordoj speguligxas supren kaj suben, kaj la centraj
  // tavoloj (kie la pordoj estas) ricevas neniun fenestron.
  const rombaFormo = rondigitaRomboFormo(147/64, 24/8);
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(rombaFormo, {
      depth: 4/8, bevelEnabled: true, bevelSize: 1/16, bevelThickness: 1/16,
      bevelSegments: 2, curveSegments: 0o14,
    });
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set( Math.sin(f * Math.PI / 2) * (hw0 - 1/64), 0,
      Math.cos(f * Math.PI / 2) * (hw0 - 1/64) );
    group.add(enirejaMreto);

    // Ora ornama konturo
    const konturo = rombaFormo.getPoints(0o30).map(p => new THREE.Vector3(p.x, p.y, 0));
    const ornamo = new THREE.Mesh( new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "catmullrom", 19/32), 0o60, 1/16, 6, true),
      oraMaterialo );
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set( Math.sin(f * Math.PI / 2) * (hw0 + 4/8), 0,
      Math.cos(f * Math.PI / 2) * (hw0 + 4/8) );
    group.add(ornamo);
  }

  // Fenestroj sur cxiu nivelo krom la centraj — sur klinitaj tavoloj la fenestro
  // estas TURNITA je la klin-angulo, por ke gxi kusxu plate sur la klinita muro
  // (la malnova vertikala fenestro enigxis aŭ elstaris ce la randoj de klinitaj
  // muroj). La faco estas la mur-radiuso CE LA FENESTRA CENTRO (hw − klino/2).
  const fenAlto = Math.min(5/8, tieroAlto * 3/10);
  const klinaAngulo = Math.atan(klino / tieroAlto);
  // Fenestroj sur ĈIUJ tavoloj KROM la centraj (i=0 kaj j=1), kie la pordoj estas.
  const niveloj: { y: number; faco: number; klinita: boolean; suba: boolean }[] = [];
  for (let i = 1; i < up; i++) {
    const hw = hw0 - i * ins;
    const klinita = i >= up - 2;
    niveloj.push({ y: i * tieroAlto + tieroAlto / 2, faco: klinita ? hw - klino / 2 : hw, klinita, suba: false });
  }
  // Subaj fenestroj — precizaj speguloj de la supraj (samaj facoj, INVERSA klino).
  for (let j = 2; j <= down; j++) {
    const hw = hw0 - (j - 1) * ins;
    const klinita = (j - 1) >= up - 2;
    niveloj.push({ y: -j * tieroAlto + tieroAlto / 2, faco: klinita ? hw - klino / 2 : hw, klinita, suba: true });
  }

  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( const lv of niveloj ) {
    // LONGAs horizontala RONDIGITA (pilola) fenestro, plata kontraŭ la muro-faco.
    // Larĝo laŭ la tavolflanko: pli longa sur pli longaj tavoloj.
    const ww = Math.min(lv.faco * 2 - 3/8, lv.faco * 4/3 + 1/4);
    for ( let f = 0; f < 4; f++ ) {
      // Unu grupo po faco: turnita al la muro; sur klinitaj tavoloj la fenestro
      // sidas en loka sub-grupo klinita per la mur-deklivo (rotacio ĉirkaŭ la
      // larĝa akso de la fenestro, do gxi kusxas plate sur la muro). La SUBAJ
      // muroj klinigxas inverse, do ilia fenestro-tilo havas la OPPOSAN signon —
      // alie la fenestro flosus eksteren de la muro.
      const faco = new THREE.Group();
      faco.rotation.y = f * Math.PI / 2;
      const monto = lv.klinita ? new THREE.Group() : faco;
      if (lv.klinita) { monto.rotation.x = lv.suba ? klinaAngulo : -klinaAngulo; faco.add(monto); }
      // Densa sampado de la pilolo — la arkoj aspektas RONDIĜITAJ (la malnova
      // 0o24 lasis la duoncirklajn finojn facete poligonaj).
      const w = new THREE.Mesh( new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, fenAlto), 0o100),
        fenestraMaterialo );
      w.position.set( 0, lv.y - fenAlto / 2, lv.faco + 1/64 );
      monto.add(w);
      fenestrajMretoj.push(w);
      // Ora pilola rando — CENTRIPETA kurbo kun Densa sampado: la finoj estas
      // glate rondaj, ne facetaj.
      const konturo = kreiPilolFenestranFormon(ww, fenAlto).getPoints(0o200)
        .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0));
      const rimo = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "centripetal"), 0o100, 1/16, 6, true),
        oraMaterialo
      );
      rimo.position.set( 0, lv.y - fenAlto / 2, lv.faco + 1/64 );
      monto.add(rimo);
      group.add(faco);
    }
  }

  // Neniu soklo, bazplato aŭ brila ringo — sxipo flosas libere
  // (la surflanka signo estas forigita laux peto)

  // Porda pozicio — centrita je la pordo (y=0)
  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaPozicio = new THREE.Vector3( dir.x * (hw0 + 16/8), 0,
    dir.z * (hw0 + 16/8) );

  group.position.set(x, y, z);
  sceno.add(group);

  return { group, windows: fenestrajMretoj, pordaPozicio, doorDir: dir.clone() };
}

// animaciiCielDiamanton — Animaciu la sxipon. oscilado, rotacio, fenestra pulsado.
export function animaciiCielDiamanton( ship: CielDiamanto,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    // Absoluta bazo, ne kumulado — alie la sinusa oscilo drivus la sxipon
    // supren/malsupren je dekoj da unuoj dum longaj sesioj.
    if ( ship.group.userData.bazaY === undefined ) {
      ship.group.userData.bazaY = ship.group.position.y;
    }
    ship.group.position.y = (ship.group.userData.bazaY as number) + Math.sin(t * 19/64) * 1/16;
  }
  ship.group.rotation.y += 0/8;
  ship.group.rotation.z = Math.sin(t * 2/8) * 1/32;

  // Pulso de fenestroj dum flugo
  if ( isFlying ) {
    const pulso = 19/64 + 13/64 * Math.sin(t * 3);
    const fenestraMaterialo = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraMaterialo ) {
      fenestraMaterialo.emissiveIntensity = 13/32 + pulso;
    }
  }
}

// komenciFlugon — Komencu la flugan animacion de la sxipo supren.
export function komenciFlugon( ship: CielDiamanto,
  onProgress: (pct: number) => void,
  onComplete: () => void
): () => void {
  const daŭro = 32/8;
  const komencaTempo = performance.now() / 0o1750;
  const komencaY = ship.group.position.y;
  const celaY = komencaY + 0o120;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = komencaY; return; }
    const pasinta = performance.now() / 0o1750 - komencaTempo;
    const t = Math.min(1, pasinta / daŭro);
    const mildigita = t < 4/8 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = komencaY + (celaY - komencaY) * mildigita;
    ship.group.rotation.y += 3/64;
    onProgress(mildigita);

    if ( t < 1 ) {
      requestAnimationFrame(tiktako);
    } else {
      onComplete();
      ship.group.position.y = komencaY;
    }
  }

  requestAnimationFrame(tiktako);
  return () => { nuligita = true; };
}

function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
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
