// ≺⧼ La ekvizetoj 🌾 ⧽≻
// La kavalerboj — la du specioj de Equisetum. La komuna kana geometrio
// ( konstruiKanGeometrion el ribaj segmentoj, ingoj, dentoj, branĉet-kirloj
// kaj strobiloj ) kun la du specioj, la alta senbranĉa cetkuo
// ( konstruiCetkuojn ) kaj la granda branĉa cakeo ( konstruiCakeojn ).
import * as THREE from "three";
import { kreiCakeanTeksajxon } from "../../komunajxoj/teksajxoj/bakeo.js";
import { kreiCetkuanTeksajxon } from "../../komunajxoj/teksajxoj/cetkuo.js";
import { kreiBuferanGeometrion, kunfandiGeometriojnSenIndekson } from "../../komunajxoj/kunfandajxoj.js";
import { biomo, type Biomo } from "../../../kantaoj/mondo/tereno.js";
import { kreiVegetajxanHazardon } from "./hazardoj.js";

// kreiRibitanSegmenton — Unu riba kan-segmento kun stel-forma transversa sekco.
// La alterna radiuso ( kresto, valo, kresto ... ) donas la profundajn vertikalajn
// ripojn de vera ĉevalvosto — ne nura platsurfaca cilindro. Fermitaj ĉapoj
// supre kaj malsupre ( la malsupra kaŝiĝas en la grundo, la supra sub la
// sekva segmento aŭ la strobilo ).
//     @param rMalsupra ( number ) - Radiuso de la malsupra ringo.
//     @param rSupra ( number ) - Radiuso de la supra ringo.
//     @param alto ( number ) - Segmenta alto.
//     @param flankoj ( number ) - Kiom da ripoj ( krestoj ).
//     @param kresta ( number ) - Kiom profunde la valoj falas ( 0 = cilindro ).
function kreiRibitanSegmenton(rMalsupra: number, rSupra: number, alto: number,
  flankoj: number, kresta: number): THREE.BufferGeometry {
  const ringo = flankoj * 2;   // krestoj kaj valoj alternas
  const pozicioj: number[] = [];
  const uvoj: number[] = [];
  const indeksoj: number[] = [];
  for ( let k = 0; k < ringo; k++ ) {
    const ang = k / ringo * Math.PI * 2;
    const faktoro = ( k % 2 === 0 ) ? 1 : ( 1 - kresta );
    pozicioj.push(Math.cos(ang) * rMalsupra * faktoro, 0, Math.sin(ang) * rMalsupra * faktoro);
    uvoj.push(k / ringo, 0);
    pozicioj.push(Math.cos(ang) * rSupra * faktoro, alto, Math.sin(ang) * rSupra * faktoro);
    uvoj.push(k / ringo, 1);
  }
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = k * 2 + 1;
    const c = ( ( k + 1 ) % ringo ) * 2, d = c + 1;
    indeksoj.push(a, b, c, b, d, c);
  }
  const cM = ringo * 2, cS = cM + 1;
  pozicioj.push(0, 0, 0); uvoj.push(0o1/0o2, 0);
  pozicioj.push(0, alto, 0); uvoj.push(0o1/0o2, 1);
  for ( let k = 0; k < ringo; k++ ) {
    const a = k * 2, b = ( ( k + 1 ) % ringo ) * 2;
    indeksoj.push(a, b, cM);          // malsupra ĉapo, normalo −y
    indeksoj.push(a + 1, cS, b + 1);  // supra ĉapo, normalo +y
  }
  return kreiBuferanGeometrion(pozicioj, indeksoj, { uvoj });
}

// konstruiKanGeometrion — Komuna kan-geometrio por la du kavalerbaj specioj.
// Riba kana tigo ( stel-forma sekco ) kun ŝirmaj kolumetoj kaj dentetoj ĉe la
// nodoj, kaj laŭ la elekto. Kirloj da pendantaj branĉetoj ( la botelpura
// silueto de la granda ĉevalvosto ) kaj/aŭ skvama strobilo ( konusa sporujo )
// ĉe la pinto. Konstruita je unu unuo alta, por ke la instancoj skalu ĝin
// laŭ sia alto.
//     @param nodoj ( number ) - Kiom da kanaj segmentoj.
//     @param kunBrancetoj ( boolean ) - Ĉu aldoni branĉet-kirlojn ĉe la nodoj.
//     @param kunStrobilo ( boolean ) - Ĉu aldoni la skvaman sporujon.
function konstruiKanGeometrion(nodoj: number, kunBrancetoj: boolean, kunStrobilo: boolean): THREE.BufferGeometry {
  const partoj: THREE.BufferGeometry[] = [];
  const segmentaAlto = 1 / nodoj;
  const rBazo = 0o3/0o40;              // 3/32 — maldika, kana
  const rSupro = 0o1/0o40;             // 1/32 — la kano pintiĝas
  // 8 ripoj donas pli glatan riban silueton; la skuraj kanoj portas pli
  // profundajn ripojn ol la branĉaj ĉevalvostoj.
  // ⟨ Pli profundaj ripoj 📃 ⟩ — ĉe kresta 0.10 la ripoj preskaŭ ne videblis:
  // la tigo montriĝis kiel glata verda cilindro kaj la karakteriza EKVIVIZETA
  // kanelo perdiĝis ( la ripoj kaj la nodoj estas la tuta identeco de la
  // planto ). Nun la krestoj leviĝas 16–22% super la valojn kaj la silueto de
  // la tigo havas videblajn dentojn.
  const flankoj = 8;
  const kresta = kunBrancetoj ? 0o16/0o100 : 0o22/0o100;
  for ( let i = 0; i < nodoj; i++ ) {
    const y0 = i * segmentaAlto;
    const r0 = rBazo - ( rBazo - rSupro ) * ( i / nodoj );
    const r1 = rBazo - ( rBazo - rSupro ) * ( ( i + 1 ) / nodoj );
    // Kana segmento — la stel-forma sekco montras la ripojn de la tigo.
    partoj.push(kreiRibitanSegmenton(r0, r1, segmentaAlto, flankoj, kresta).translate(0, y0, 0));
    // Ŝirma ingo ĉe la nodo — la karakteriza kana artiklo.
    // ⟨ La formo de la ingo 📃 ⟩ — vera ekvizeta ingo ne estas egallarĝa
    // cilindro ( tio aspektis kiel ringo ŝovita sur vergon ): ĝi estas mallonga
    // TASO, pli mallarĝa ĉe la malsupro kie ĝi brakumas la tigon sub la nodo,
    // kaj MALFERMIĜANTA supren. El ĝia rando leviĝas la dentoj.
    if ( i > 0 ) {
      const ingaAlto = segmentaAlto * 0o35/0o100;
      const kolumeto = new THREE.CylinderGeometry(r0 * 0o14/0o10, r0 * 0o11/0o10,
        ingaAlto, flankoj, 1).translate(0, y0, 0);
      partoj.push(kolumeto);
      if ( kunBrancetoj ) {
        // Kirlo da pendantaj branĉetoj — la botelpura silueto de la granda
        // ĉevalvosto. La longo sekvamas sinus-profilon laŭ la tigo ( la
        // mezaj kirloj plej longaj, la pinta kaj la baza pli mallongaj — la
        // natura formo de Equisetum telmateia ), kaj ĉiu kirlo iomete
        // suprenleviĝas anstataŭ pendi sub la horizonto.
        const brancetoj = 0o12;
        const profilo = Math.sin(Math.PI * Math.min(1, ( i + 1 ) / nodoj));
        const longeco = segmentaAlto * ( 1.1 + 2.1 * profilo );
        const eliro = 0.10 + 0.45 * ( i / nodoj );
        for ( let b = 0; b < brancetoj; b++ ) {
          const ang = b / brancetoj * Math.PI * 2 + i * 0o3/0o10;
          // ⟨ La branĉeto Arkas 📃 ⟩ — antaŭe ĉiu branĉeto estis UNU mallonga
          // konuso klinita 29° supren: la kirloj aspektis kiel rigidaj
          // pingloj kaj la planto kiel bambuo. Vera branĉeto de Equisetum
          // telmateia estas DU- ĝis TRI-segmenta vergo, kun propra nodo, kiu
          // eliras preskaŭ horizontale kaj LEVIĝAS ĉe sia pinto. La du
          // segmentoj do havas malsamajn angulojn, kaj malgranda ingo sidu
          // ĉe la artiko.
          const unua = longeco * 0.55, dua = longeco * 0.55;
          const anguloj = [ eliro, eliro + 0.55 ];
          const longoj = [ unua, dua ];
          let bazo = new THREE.Vector3(Math.sin(ang) * r0, y0, Math.cos(ang) * r0);
          for ( let s = 0; s < 2; s++ ) {
            const a = anguloj[s], L = longoj[s];
            const peco = new THREE.ConeGeometry(
              r0 * ( s === 0 ? 0.34 : 0.24 ), L, 4).translate(0, L / 2, 0);
            const Mb = new THREE.Matrix4().makeRotationY(ang);
            Mb.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
            peco.applyMatrix4(Mb);
            peco.translate(bazo.x, bazo.y, bazo.z);
            partoj.push(peco);
            // La sekva segmento eliras el la pinto de ĉi tiu.
            const direkto = new THREE.Vector3(
              Math.sin(ang) * Math.cos(a), Math.sin(a), Math.cos(ang) * Math.cos(a));
            bazo = bazo.clone().add(direkto.multiplyScalar(L));
            if ( s === 0 ) {
              const artiko = new THREE.CylinderGeometry(r0 * 0.30, r0 * 0.30,
                r0 * 0o1/0o2, 4).translate(0, r0 * 0o1/0o4, 0);
              const Ma = new THREE.Matrix4().makeRotationY(ang);
              Ma.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2 - a));
              artiko.applyMatrix4(Ma);
              artiko.translate(bazo.x, bazo.y, bazo.z);
              partoj.push(artiko);
            }
          }
        }
      } else {
        // Dentoj — la malgrandaj triangulaj pintoj de la ingo, kiuj ĉirkaŭas
        // ĉiun nodon de la skura kano.
        // ⟨ Kial ili aspektis kiel klingoj 📃 ⟩ — la dento estis konuso
        // KUŜANTA: ĝi estis rotaciita preskaŭ horizontale ( π/2 − 0.3 ) kaj
        // metita je la duono de la konusa alto for de la tigo, do ĝi elstaris
        // kiel aparta triangula klingo. Ankaŭ ĝia direkto kaj ĝia pozicio
        // estis turnitaj je 90° unu de la alia ( la pozicio uzis cos/sin, la
        // turno sin/cos ), do la dentoj montris TANGENTE anstataŭ RADIALE.
        // Nun la dento staras sur la rando de la ingo kaj klinas nur iomete
        // eksteren — ĝi estas la pinto de la ingo, ne spino.
        // ⟨ Unu dento po ripo 📃 ⟩ — vera ekvizeto havas same multajn dentojn
        // kiel ripojn, kaj la dentoj SINSEKVAS la ripojn ( ili estas la
        // daŭrigo de la ripoj trans la nodo ). La antaŭaj ses maldikaj pingloj
        // ( alto 1.15 × la tigo-radiuso, larĝo 0.3 ) estis pli longaj ol tuta
        // segmento kaj aspektis kiel dornoj; nun ĉiu dento estas triangulo
        // larĝa ĉe la bazo kaj nur duonan segmenton alta, kaj ili sidas ĝuste
        // super la ok ripoj.
        const dentoj = flankoj;
        const dentoAlto = segmentaAlto * 0o55/0o100;
        for ( let d = 0; d < dentoj; d++ ) {
          const ang = d / dentoj * Math.PI * 2;
          const dento = new THREE.ConeGeometry(r0 * 0o1/0o2, dentoAlto, 3);
          const M = new THREE.Matrix4().makeRotationY(ang);
          M.multiply(new THREE.Matrix4().makeRotationX(0.22));
          dento.applyMatrix4(M);
          dento.translate(Math.sin(ang) * r0 * 0o12/0o10,
            y0 + dentoAlto * 0o35/0o100, Math.cos(ang) * r0 * 0o12/0o10);
          partoj.push(dento);
        }
      }
    }
  }
  if ( kunStrobilo ) {
    // Strobilo — mallonga pedunklo kaj skvama konusa sporujo kun ŝtupetaj
    // skvam-ringoj kaj pinto. La larĝo estas RELATIVA al la tigo-pinto
    // ( rSupro ) — la malnovaj fiksa-larĝaj ringoj ( 0o1/0o10 ) estis kvar
    //oble larĝaj ol la tigo mem kaj aspektis kiel tro grandaj buloj.
    const strobilaLargho = rSupro * 0o3/0o2;
    const pedunklo = new THREE.CylinderGeometry(rSupro * 0o6/0o10, rSupro * 0o6/0o10,
      0o4/0o100, 6).translate(0, 1 + 0o2/0o100, 0);
    partoj.push(pedunklo);
    const skvamoj = 5;
    for ( let s = 0; s < skvamoj; s++ ) {
      const t = s / skvamoj;
      const rS = strobilaLargho * ( 1 - t * 0o6/0o10 );
      const ringo = new THREE.CylinderGeometry(rS * 0o7/0o10, rS, 0o3/0o100, 8)
        .translate(0, 1 + 0o4/0o100 + s * 0o3/0o100, 0);
      partoj.push(ringo);
    }
    const pinto = new THREE.ConeGeometry(strobilaLargho * 0o3/0o10, 0o3/0o100, 6)
      .translate(0, 1 + 0o4/0o100 + skvamoj * 0o3/0o100 + 0o15/0o1000, 0);
    partoj.push(pinto);
  } else {
    // Mallonga pinto — la branĉa ĉevalvosto finiĝas per eta pinto anstataŭ
    // plata ĉapo ĉe la pinto de la lasta segmento.
    const pinto = new THREE.ConeGeometry(0o1/0o100, 0o3/0o100, 6)
      .translate(0, 1 + 0o1/0o100, 0);
    partoj.push(pinto);
  }
  // ⟨ La proporcio de la tigo 📃 ⟩ — la geometrio estas unu unuo alta kun
  // radiuso 0.094, t.e. 1:10.6 — vera ekvizeto estas 1:20 ĝis 1:40. Oni ne
  // povas simple maldikigi la geometrion per la instanca skalo ( vidu
  // instanciiKavalerbojn: la skalo nun estas uniforma ), do la tuta geometrio
  // estas mallarĝigita laŭ la horizontala ebeno je 0.42 — la radiоj, la ingoj,
  // la dentoj kaj la branĉetoj ĉiuj samtempe, kaj la vertikalaj proporcioj
  // restas ĝustaj.
  const geometrio = kunfandiGeometriojnSenIndekson(partoj);
  geometrio.scale(0.42, 1, 0.42);
  return geometrio;
}

// konstruiCetkuanGeometrion — Konstruu la geometrion de unu cetkuo
// ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ). La alta senbranĉa "skura kano" —
// multaj nodoj kun profundaj ripoj, ŝirmaj kolumetoj, dentetoj kaj skvama
// strobilo ĉe la pinto.
function konstruiCetkuanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(0o13, false, true);
}

// konstruiCakeanGeometrion — Konstruu la geometrion de unu cakeo
// ( Equisetum telmateia / ſᶘᴜ ſɭɔ ). La granda ĉevalvosto — kana tigo kun
// kirloj da pendantaj branĉetoj ĉe ĉiu nodo, sen strobilo.
function konstruiCakeanGeometrion(): THREE.BufferGeometry {
  return konstruiKanGeometrion(6, true, false);
}

// instanciiKavalerbojn — Komuna instancigilo por la du kavalerbaj specioj
// ( cetkuo kaj cakeo ). Unu geometrio kaj unu koloro po specio, kaj la loka
// proponilo decidas kie kreski.
//     @param geometrio ( THREE.BufferGeometry ) - La specia geometrio.
//     @param koloro ( number ) - La specia koloro.
//     @param minAlto, maxAlto ( number ) - La specia alta intervalo.
//     @param proponu ( funkcio ) - Proponas kandidatan lokon aŭ null por retry.
function instanciiKavalerbojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  semo: number,
  geometrio: THREE.BufferGeometry,
  teksajxo: THREE.CanvasTexture,
  koloro: number,
  minAlto: number,
  maxAlto: number,
  proponu: ( h: () => number ) => { x: number; z: number } | null
): void {
  const hazardaGenerilo = kreiVegetajxanHazardon(semo);
  const materialo = new THREE.MeshStandardMaterial({ map: teksajxo, roughness: 0o7/0o10, color: 0xffffff });
  const kavalerboj = new THREE.InstancedMesh(geometrio, materialo, kvanto);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  let ki = 0;
  let gardilo = 0;

  while ( ki < kvanto && gardilo++ < 0o10000 ) {
    const loko = proponu(hazardaGenerilo);
    if ( !loko ) continue;
    const x = loko.x, z = loko.z;
    const alto = minAlto + hazardaGenerilo() * ( maxAlto - minAlto );
    // Hazarda turno kaj eta klino — la ribaj tigoj ne ĉiuj rigardu samdirekte.
    E.set(0, hazardaGenerilo() * Math.PI * 2, ( hazardaGenerilo() - 0o4/0o10 ) * 0o4/0o10);
    Q.setFromEuler(E);
    // ⟨ La bazo sur la tero 📃 ⟩ — la geometrio staras sur sia propra origino
    // ( y = 0 estas la tigo-bazo ), do la instanco metiĝas ĜUSTE sur la teron.
    // Antaŭe la pozicio estis y + alto/2 ( la centro de la skatolo ), kaj la
    // tuta planto ŝvebis duonon de sia alto super la grundo.
    // ⟨ Uniforma skalo 📃 ⟩ — la antaŭa skalo ( 1, alto, 1 ) streĉis NUR la
    // vertikalon: la tigo restis samlarĝa dum la tuta planto altiĝis, la
    // ingoj kaj la dentoj streĉiĝis en longajn pinglojn ( trioble ĉe alta
    // planto ), kaj la kano aspektis kiel pingloarbo. Kun uniforma skalo ĉio
    // kreskas kune, kiel vera planto.
    const y = heightFn(x, z);
    M.compose(new THREE.Vector3(x, y, z), Q, new THREE.Vector3(alto, alto, alto));
    kavalerboj.setMatrixAt(ki, M);
    // Nuanco — ĉiu planto ricevas etan helan/malhelan varianton de la specia
    // koloro, por ke la stando ne aspektu unuforma.
    kavalerboj.setColorAt(ki, C.setHex(koloro).multiplyScalar(0o111/0o100 + hazardaGenerilo() * 0o15/0o100));
    ki++;
  }

  kavalerboj.count = ki;
  kavalerboj.instanceMatrix.needsUpdate = true;
  if ( kavalerboj.instanceColor ) kavalerboj.instanceColor.needsUpdate = true;
  sceno.add(kavalerboj);
}

// konstruiCetkuojn — Metu cetkuojn ( Equisetum praealtum / ſᶘɔ ɭʃƽɹ ), la
// altajn senbranĉajn skurajn kanojn kun strobiloj, proksime al la rivero.
export function konstruiCetkuojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  riverZFn: ( x: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, 11593, konstruiCetkuanGeometrion(),
    kreiCetkuanTeksajxon(), 0xf0f8e8, 0o14/0o10, 0o30/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      const radiuso = 0o20 + 0o177 * Math.sqrt(h());
      const x = Math.sin(angulo) * radiuso;
      const z = Math.cos(angulo) * radiuso;
      if ( Math.abs(x) > 0o200 || Math.abs(z) > 0o200 ) return null;
      // La biomo — la riveraj kanoj restas en la vala biomo.
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      // Nur proksime al rivero
      if ( Math.abs(z - riverZFn(x)) > 0o10 ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      if ( Math.hypot(x, z) < 0o16 ) return null;
      return { x, z };
    });
}

// konstruiCakeojn — Metu cakeojn ( Equisetum telmateia / ſᶘᴜ ſɭɔ ), la
// grandajn branĉet-kirlajn ĉevalvostojn, en maldika ringo ĉe la lagrando —
// kareksa rando ĝuste ĉe la akvo, kie la bordo estas malseka ( ne pli ol
// ~2 unuojn super la akvonivelo ).
export function konstruiCakeojn(sceno: THREE.Scene,
  kvanto: number,
  heightFn: ( x: number, z: number ) => number,
  cx: number, cz: number,
  radioFn: ( ang: number ) => number,
  akvoNiveloFn: ( x: number, z: number ) => number,
  excludeBuildings: ( x: number, z: number, minDistanco: number ) => boolean,
  excludePaths: ( x: number, z: number, minDistanco: number ) => boolean,
  semo = 11605,
  biomojFiltro?: readonly Biomo[]
): void {
  instanciiKavalerbojn(sceno, kvanto, heightFn, semo, konstruiCakeanGeometrion(),
    kreiCakeanTeksajxon(), 0xe8f8e0, 0o12/0o10, 0o24/0o10, ( h ) => {
      const angulo = h() * Math.PI * 2;
      // Maldika bendo ĝis ~10 unuojn ekster la lagrando.
      const radiuso = radioFn(angulo) + h() * 0o10;
      const x = cx + Math.cos(angulo) * radiuso;
      const z = cz + Math.sin(angulo) * radiuso;
      if ( Math.abs(x) > 0o450 || Math.abs(z) > 0o450 ) return null;
      // La biomo — la lag-kareksoj restas en la vala biomo.
      if ( biomojFiltro && !biomojFiltro.includes(biomo(x, z)) ) return null;
      if ( excludeBuildings(x, z, 3) || excludePaths(x, z, 0o2) ) return null;
      // Kareksoj kreskas sur la malseka bordo, ne sur la alta seka tero.
      if ( heightFn(x, z) > akvoNiveloFn(x, z) + 2 ) return null;
      return { x, z };
    });
}
