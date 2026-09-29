// ≺⧼ Pussxlefoj 🪴 ⧽≻
// La etaj purpuraj laktukaj plantoj — mallonga purpura trunko, 1–2 tavoloj de la
// samaj kurbiĝintaj folioj kaj unu ŝela taso ĉe la unua tavolo. La travideblaj
// manĝeblaj beroj kreiĝas aparte ( mebloj/mangxajxoj.ts ). La folio, la taso kaj
// la trunkopinto venas el la komuna ŝela ilo ( vegetajxo/sxeloj.js ).
import * as THREE from "three";
import { kreiPurpuranFolianTeksajxon } from "../../komunajxoj/teksajxoj/purpura-folio.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, kreiVegetajxanHazardon, hazardaKoloro } from "./hazardoj.js";
import { type ArboMetado } from "./metado.js";
import { konstruiKurbanLaktukanFolion, konstruiSxelanRingon, kreiSxelanRinganMaterialon, trunkopintaProfilon } from "./sxeloj.js";

// konstruiPussxlefojn — Konstruu instancigitajn Pussxlefojn
// ( ſ̀ȷɔ ı],ͷ̗ɔʞ ſןɹɔ˞ ꞁȷ̀ᴜꞇ / Pussxlefo ) — fern-grandaj purpuraj laktukaj
// plantoj, etaj Ĥŝakŝlefoj. mallonga purpura trunko, 1–2 tavoloj de la samaj
// kurbiĝintaj laktukaj folioj kaj unu ŝela taso ĉe la unua tavolo. La
// travideblaj manĝeblaj beroj kreiĝas aparte ( mangxajxoj.ts ).
//     @param plantoj ( ArboMetado[] ) - La metitaj plantoj.
export function konstruiPussxlefojn(sceno: THREE.Scene,
  plantoj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o62450);
  const MAX_TAVOLOJ = 2;
  // Purpura trunko — kiel la Ĥŝakŝlefo, nur pli maldika por la eta planto.
  const trunkaGeometrio = new THREE.CylinderGeometry(0o3/0o40, 0o5/0o40, 1, 0o30, 0o20);
  // ⟨ La trunkopinto 📃 ⟩ — la sama rondigita pinto kiel ĉe la granda
  // Ĥŝakŝlefo: la plata supra kovrilo de la cilindro malaperas.
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const f = trunkopintaProfilon(pozicioj.getY(i) + 0o1/0o2);
      pozicioj.setXYZ(i, pozicioj.getX(i) * f, pozicioj.getY(i), pozicioj.getZ(i) * f);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  const trunkaMaterialo = kreiSxelanRinganMaterialon(0o1/0o20, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, plantoj.length);
  if ( plantoj.length === 0 ) return trunkoj;

  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  // Kapacito: la folioj de la tavoloj PLUS la tri pinta krono-tavoloj ( vidu
  // malsupre ) — 2 tavoloj × 4 flankoj + 3 × 4 = 20.
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, plantoj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));
  const sxelaGeometrio = konstruiSxelanRingon();
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0.015, true);
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, plantoj.length);

  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  let fi = 0;
  let si = 0;

  plantoj.forEach(( t, i ) => {
    // Fern-granda — la planto estas eta Ĥŝakŝlefo, ~0.65–1.2 unuojn alta.
    const h = ( 0o5/0o10 + t.s * 0o3/0o10 ) * ( 0o6/0o10 + hazardaGenerilo() * 0o3/0o10 );
    // Skribu la realan plant-alton reen sur la metadon — la ber-klastroj
    // ( mangxajxoj.ts ) bezonas gxin por sidi en la ŝela taso.
    t.plantAlto = h;
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    // La trunka radiuso je la alto y — la sama profilo kiel la trunka geometrio
    // ( inkluzive de la rondigita pinto ), do la folioj kaj la taso ĉiam sidas
    // sur la ŝelo kaj la pinta krono kongruas kun la pinto.
    const trunkaR = ( y: number ): number =>
      ( 0o5/0o40 - ( y / h ) * 0o2/0o40 ) * trunkopintaProfilon(y / h);

    // 1–2 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 1 + ( ( hazardaGenerilo() * 2 ) | 0 );
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavoloj === 1 ? 0 : tavolo / ( tavoloj - 1 );
      // La foliaj tavoloj sidas ĉe 0o3/0o10 ( 0.375 ) kaj 0o6/0o10 ( 0.75 )
      // de la alto, por ke la trunkopinto videblu super la foliaro.
      const y = h * ( 0o3/0o10 + 0o3/0o10 * tFrakcio );
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o10 );
      // La trunka radiuso ĉe tiu alto — la folia bazo kreskas el la ŝelo
      // mem ( iomete interne ), kiel ĉe la granda Ĥŝakŝlefo. Antaŭe ĝi
      // staris 0.0625 ekster la trunko — videbla truo ĉe tiel maldika ŝelo.
      const trunkaRadiuso = trunkaR(y);
      const ellagxo = trunkaRadiuso * 0o7/0o10;
      // ⟨ Simetrio 📃 ⟩ — la kvar flankoj de ĉiu folia tavolo turniĝas per la
      // SAMA grandeco kaj la SAMA klino, do la planto estas kvar-obla simetria.
      // Antaŭe ĉiu el la kvar folioj ricevis sian propran hazardan skalon, do la
      // planto aspektis dise ĵetita anstataŭ kiel malgranda laktuka rozo.
      const skalo = tavolaSkalo * ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(0o2/0o10, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * ellagxo, y, Math.cos(angulo) * ellagxo)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // Unu ŝela taso ĉe la unua folia tavolo — nur por plantoj sufiĉe altaj,
    // por ke la taso ne enfalu en la teron.
    //
    // ⟨ La tasalta proporcio 📃 ⟩ — antaŭe la taso estis FIKSaj 0.375 unuoj
    // altaj, sed la tuta planto altas nur 0.5–0.7! La taso do kovris la plej
    // grandan parton de la planto kaj KAŜIS la foliojn. La taso nun estas
    // 20% de la planto, kun la sama proporcio kiel ĉe la granda Ĥŝakŝlefo.
    const unuaTavolaY = h * 0o3/0o10;
    const sxelaAlto = h * 0o2/0o10;
    if ( unuaTavolaY <= h - sxelaAlto ) {
      // ⟨ La mezuro venas el la tas-MALSUPRO 📃 ⟩ — la sama regulo kiel ĉe la
      // granda Ĥŝakŝlefo: la taso brakumas la trunkon ĉe sia malsupro, kie la
      // trunko estas la plej dika.
      const tasMalsupro = unuaTavolaY - sxelaAlto * 0o14/0o40;
      const trunkaRadiuso = trunkaR(tasMalsupro);
      const ringaSkalo = Math.max(0o3/0o40, trunkaRadiuso / ( 0o13/0o40 ) * 0o11/0o10);
      // La taso malfermiĝas supren; ĝia malsupro staras sub la foliaj bazoj,
      // do la folioj leviĝas el la interno de la taso ( la sama aranĝo kiel
      // ĉe la granda Ĥŝakŝlefo ).
      M.compose(pozicio(new THREE.Vector3(0, unuaTavolaY - sxelaAlto * 0o14/0o40, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      si++;
    }

    // ⟨ La pinta krono 📃 ⟩ — same kiel ĉe la granda Ĥŝakŝlefo: la planto ne
    // finiĝu per nuda trunkopinto, sed la supro ankaŭ ne estu plata telero.
    // Tri malgrandaj tavoloj da folioj KIEL LA CETERAJ, kiuj MALGRANDIĜAS
    // supren: la plej malsupra malfermiĝas eksteren super la foliaron, kaj la
    // plej supra sidas ĝuste sur la pinto kiel fermita burĝono ( antaŭe la du
    // pintaj tavoloj finiĝis ĉe 0.856 h, do la supra 14% de la trunko restis
    // nuda stango kun ĝia plata kovrilo ).
    const PINTAJ_TAVOLOJ = 0o3;
    const pintaBazo = h * 0o7/0o10;
    const pintaAlto = h;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      const elklino = 0.35 - tFrakcio * 0.30;
      const trunkaRadiuso = trunkaR(pintaY);
      // ⟨ La pinta krono estas simetria 📃 ⟩ — la pinto ne plu turniĝas per
      // hazarda fazo kaj la tavoloj ne plu ŝoviĝas unu kontraŭ la alia, do ĉiuj
      // kvar flankoj de ĉiu tavolo staras samloke kaj la pinto legiĝas kiel
      // kvar-obla simetria konuso.
      const skalo = ( 0o12/0o100 + hazardaGenerilo() * 0o13/0o100 )
        * ( 0o3/0o4 - tFrakcio * 0.45 );
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        E.set(elklino, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaRadiuso * 0o7/0o10, pintaY,
            Math.cos(angulo) * trunkaRadiuso * 0o7/0o10)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }
  });

  trunkoj.instanceMatrix.needsUpdate = true;
  folioj.count = fi;
  folioj.instanceMatrix.needsUpdate = true;
  if ( folioj.instanceColor ) folioj.instanceColor.needsUpdate = true;
  sxeloj.count = si;
  sxeloj.instanceMatrix.needsUpdate = true;
  if ( sxeloj.instanceColor ) sxeloj.instanceColor.needsUpdate = true;
  trunkoj.castShadow = folioj.castShadow = sxeloj.castShadow = true;
  sceno.add(trunkoj, folioj, sxeloj);
  return trunkoj;
}
