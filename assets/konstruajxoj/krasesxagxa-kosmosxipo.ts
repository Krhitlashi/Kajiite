// Krasesxagxa kosmosxipo — ciel-rombo ciela transporto de ornaveth-v2
// La kosmosxipo nomigxas kzasexaz ( ſɭˬᴜ j͑ʃɔ ı],ᴜƴ ) en Iikrhia. noma formo. krasesxagxo.
// 5 tieroj supren, 5 malsupren (spegulitaj), LONGAs horizontalaj RONDIGITAJ fenestroj
// sur cxiu nivelo krom la centra ( kie la pordoj estas ); flosas libere sen soklo aux signo
import * as THREE from "three";
import { aldoniKadranTubon, kreiKlinoTavolon } from "./satalaj-konstruajxoj.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiPilolFenestranFormon } from "../komunajxoj/formoj.js";

// Rondigita rombo-formo ( uzata por enirejoj )
function rondigitaRomboFormo(w: number, h: number, n: number = 0o143/0o100, seg: number = 0o100): THREE.Shape {
  const hw = w / 2, hh = h / 2;
  const s = new THREE.Shape();
  const e = 2 / n;
  for ( let i = 0; i <= seg; i++ ) {
    const a = i / seg * Math.PI * 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const x = Math.sign(ca) * Math.pow(Math.abs(ca), e) * hw;
    const y = Math.sign(sa) * Math.pow(Math.abs(sa), e) * hh;
    if ( i === 0 ) s.moveTo(x, y); else s.lineTo(x, y);
  }
  return s;
}

export interface Krasesxagxo {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaPozicio: THREE.Vector3;
  doorDir: THREE.Vector3;
}

// konstruiKrasesxagxon — Konstruu la kosmosxipon kun diamant-formaj enirejoj kaj LONGAs horizontalaj rondigitaj fenestroj.
export function konstruiKrasesxagxon(sceno: THREE.Scene,
  x: number, y: number, z: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial
): Krasesxagxo {
  const group = new THREE.Group();
  const tieroAlto = 0o163/0o40, up = 5, down = up, hw0 = 4;
  const ins = ( 4 - 0o123/0o100 ) / 4;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 0o33/0o100, metalness: 0o5/0o100, envMapIntensity: 0o23/0o40,
  });
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x082828, emissive: 0x103838, emissiveIntensity: 0o15/0o40, roughness: 0o5/0o40, metalness: 0o15/0o100,
  });

  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  // La sxipo reuzas la KONSTRUAJX-tavolojn ( klinitaj trapezoidoj ) — CXiUJ tavoloj
  // klinigxas kiel la konstruajxoj (la uzanto petis saman tavol-tipon kiel la
  // konstruajxoj). La klinitaj tavoloj ricevas klinitajn pilierojn (klino), kaj la
  // renversitaj subaj pilieroj montras siajn foliojn pinton-malsupren ( folio defaŭlte = true ).
  const klino = 0o5/0o20;
  // Suprenaj tieroj — samaj diamantaj angul-pilieroj kiel la konstruajxoj.
  // Cxiuj tavoloj klinigxas (trapezoidoj) kiel la konstruajxoj — la uzanto petis
  // la saman tavol-tipon por la tuta sxipo.
  for ( let i = 0; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const yB = i * tieroAlto, yT = yB + tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, tieroAlto).translate(0, yB + tieroAlto / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yB, yT, a, b, true, klino);
    }
  }
  // Malsuprenaj tieroj — la PRECIZA vertikala spegulo de la supraj ( samaj largxoj,
  // samaj klinoj, inverse ). La suba duono spegulas la supran, do la sxipo aspektas
  // spegulita ambauxflanke de la centro. La klinitaj tavoloj klinigxas inverse
  // (pli largxaj supre, pinton suben).
  for ( let j = 1; j <= down; j++ ) {
    const hw = hw0 - (j - 1) * ins;
    const yTop = -(j - 1) * tieroAlto, yBot = -j * tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw - klino, hw - klino, hw, hw, tieroAlto).translate(0, (yTop + yBot) / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yBot, yTop, a, b, false, klino);
    }
  }

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), oraMaterialo));

  // Rondigitaj rombo-pordoj sur CxIUJ 4 flankoj, CENTRITAJ je y=0 ( la spegula
  // centro de la sxipo ). La pordoj speguligxas supren kaj suben, kaj la centraj
  // tavoloj (kie la pordoj estas) ricevas neniun fenestron.
  const rombaFormo = rondigitaRomboFormo(0o223/0o100, 0o30/0o10);
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(rombaFormo, {
      depth: 0o4/0o10, bevelEnabled: true, bevelSize: 0o1/0o20, bevelThickness: 0o1/0o20,
      bevelSegments: 2, curveSegments: 0o14,
    });
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set(Math.sin(f * Math.PI / 2) * ( hw0 - 0o1/0o100 ), 0,
      Math.cos(f * Math.PI / 2) * ( hw0 - 0o1/0o100 ));
    group.add(enirejaMreto);

    // Ora ornama konturo
    const konturo = rombaFormo.getPoints(0o30).map(p => new THREE.Vector3(p.x, p.y, 0));
    const ornamo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "catmullrom", 0o23/0o40), 0o60, 0o1/0o20, 6, true),
      oraMaterialo);
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set(Math.sin(f * Math.PI / 2) * ( hw0 + 0o4/0o10 ), 0,
      Math.cos(f * Math.PI / 2) * ( hw0 + 0o4/0o10 ));
    group.add(ornamo);
  }

  // Fenestroj sur cxiu nivelo krom la centraj — sur klinitaj tavoloj la fenestro
  // estas TURNITA je la klin-angulo, por ke gxi kusxu plate sur la klinita muro
  // ( la malnova vertikala fenestro enigxis aux elstaris ce la randoj de klinitaj
  // muroj ). La faco estas la mur-radiuso CE LA FENESTRA CENTRO ( hw − klino/2 ).
  const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o3/0o12);
  const klinaAngulo = Math.atan(klino / tieroAlto);
  // Fenestroj sur CxIUJ tavoloj KROM la centraj (i=0 kaj j=1), kie la pordoj estas.
  // Cxiuj tavoloj nun klinigxas (kiel la konstruajxoj), do cxiuj fenestroj estas klinitaj.
  const niveloj: { y: number; faco: number; klinita: boolean; suba: boolean }[] = [];
  for ( let i = 1; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const klinita = true;
    niveloj.push({ y: i * tieroAlto + tieroAlto / 2, faco: klinita ? hw - klino / 2 : hw, klinita, suba: false });
  }
  // Subaj fenestroj — precizaj speguloj de la supraj (samaj facoj, INVERSA klino).
  for ( let j = 2; j <= down; j++ ) {
    const hw = hw0 - (j - 1) * ins;
    const klinita = true;
    niveloj.push({ y: -j * tieroAlto + tieroAlto / 2, faco: klinita ? hw - klino / 2 : hw, klinita, suba: true });
  }

  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( const lv of niveloj ) {
    // LONGAs horizontala RONDIGITA ( pilola ) fenestro, plata kontraux la muro-faco.
    // Largxo laux la tavolflanko. pli longa sur pli longaj tavoloj.
    const ww = Math.min(lv.faco * 2 - 0o3/0o10, lv.faco * 4/3 + 0o1/0o4);
    for ( let f = 0; f < 4; f++ ) {
      // Unu grupo po faco. turnita al la muro; sur klinitaj tavoloj la fenestro
      // sidas en loka sub-grupo KLINITA CxIRKAUx LA FENESTRA CENTRO (la sub-grupo
      // estas unue POZICIIGITA cxe la fenestra loko kaj poste klinita per la
      // mur-deklivo, do gxi kusxas plate sur la muro ). La malnova kodo klinis
      // la sub-grupon cxe la SxIPA ORIGINO, do la rotacio svingis la fenestron je
      // y·sin(klin-angulo) — cxe la supraj/subaj klinitaj tavoloj (granda |y|)
      // tio entombigis la fenestron en la muro aux elstarigis gxin eksteren, kaj
      // la fenestroj tute ne montrigxis. La SUBAJ muroj klinigxas inverse, do
      // ilia fenestro-tilo havas la OPPOSAN signon — alie la fenestro flosus
      // eksteren de la muro.
      const faco = new THREE.Group();
      faco.rotation.y = f * Math.PI / 2;
      const monto = new THREE.Group();
      monto.position.set(0, lv.y - fenAlto / 2, lv.faco + 0o1/0o100);
      if ( lv.klinita ) monto.rotation.x = lv.suba ? klinaAngulo : -klinaAngulo;
      faco.add(monto);
      // Densa sampado de la pilolo — la arkoj aspektas RONDIGxITAJ (la malnova
      // 0o24 lasis la duoncirklajn finojn facete poligonaj).
      const w = new THREE.Mesh(new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, fenAlto), 0o100),
        fenestraMaterialo);
      monto.add(w);
      fenestrajMretoj.push(w);
      // Ora pilola rando — CENTRIPETA kurbo kun Densa sampado. la finoj estas
      // glate rondaj, ne facetaj.
      const konturo = kreiPilolFenestranFormon(ww, fenAlto).getPoints(0o200)
        .map((p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0));
      const rimo = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "centripetal"), 0o100, 0o1/0o20, 6, true),
        oraMaterialo
      );
      monto.add(rimo);
      group.add(faco);
    }
  }

  // Neniu soklo, bazplato aux brila ringo — sxipo flosas libere
  // ( la surflanka signo estas forigita laux peto )

  // Porda pozicio — centrita je la pordo ( y=0 )
  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaPozicio = new THREE.Vector3(dir.x * ( hw0 + 0o20/0o10 ), 0,
    dir.z * ( hw0 + 0o20/0o10 ));

  group.position.set(x, y, z);
  sceno.add(group);

  return { group, windows: fenestrajMretoj, pordaPozicio, doorDir: dir.clone() };
}

// animaciiKrasesxagxon — Animaciu la kosmosxipon. oscilado, rotacio, fenestra pulsado.
export function animaciiKrasesxagxon(ship: Krasesxagxo,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    // Absoluta bazo, ne kumulado — alie la sinusa oscilo drivus la sxipon
    // supren/malsupren je dekoj da unuoj dum longaj sesioj.
    if ( ship.group.userData.bazaY === undefined ) {
      ship.group.userData.bazaY = ship.group.position.y;
    }
    ship.group.position.y = (ship.group.userData.bazaY as number) + Math.sin(t * 0o23/0o100) * 0o1/0o20;
  }
  ship.group.rotation.y += 0o0/0o10;
  ship.group.rotation.z = Math.sin(t * 0o2/0o10) * 0o1/0o40;

  // Pulso de fenestroj dum flugo
  if ( isFlying ) {
    const pulso = 0o23/0o100 + 0o15/0o100 * Math.sin(t * 3);
    const fenestraMaterialo = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraMaterialo ) {
      fenestraMaterialo.emissiveIntensity = 0o15/0o40 + pulso;
    }
  }
}

// komenciFlugon — Komencu la flugan animacion de la sxipo supren.
export function komenciFlugon(ship: Krasesxagxo,
  onProgress: (pct: number) => void,
  onComplete: () => void
): () => void {
  const dauxro = 0o40/0o10;
  const komencaTempo = performance.now() / 0o1750;
  const komencaY = ship.group.position.y;
  const celaY = komencaY + 0o120;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = komencaY; return; }
    const pasinta = performance.now() / 0o1750 - komencaTempo;
    const t = Math.min(1, pasinta / dauxro);
    const mildigita = t < 0o4/0o10 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = komencaY + (celaY - komencaY) * mildigita;
    ship.group.rotation.y += 0o3/0o100;
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
