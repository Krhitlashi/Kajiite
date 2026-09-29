// ≺⧼ Ĥŝakŝlefoj 🌴 ⧽≻
// La grandaj purpuraj laktuk-arboj — alta purpura trunko kun 3–5 tavoloj de
// kvar kurbiĝintaj folioj kaj ŝelaj tasoj laŭ la tuta trunko, finiĝantaj per
// pinta krono de junaj folioj. La folio, la taso kaj la trunkopinto venas el la
// komuna ŝela ilo ( vegetajxo/sxeloj.js ).
import * as THREE from "three";
import { kreiPurpuranFolianTeksajxon } from "../../komunajxoj/teksajxoj/purpura-folio.js";
import { sxelaKolumKoloro, sxelaTrunkaKoloro } from "../../komunajxoj/teksajxoj/purpura-sxelo.js";
import { kreiKlinoQuaternionon, kreiPoziciilon, kreiVegetajxanHazardon, hazardaKoloro } from "./hazardoj.js";
import { type ArboMetado } from "./metado.js";
import { konstruiKurbanLaktukanFolion, konstruiSxelanRingon, kreiSxelanRinganMaterialon, trunkopintaProfilon } from "./sxeloj.js";

// konstruiHxsxaksxlefojn — Konstruu instancigitajn purpurajn laktuk-arbojn
// ( ı],ͷ̗ɔʞ ֭ſɭᶗ‹ᴜƽ ꞁȷ̀ᴜꞇ / Ĥŝakŝlefo ) en la sceno. Ĉiu arbo havas altan
// purpuran trunkon kaj 3–5 tavolojn, ĉiu kun kvar grandaj kurbiĝintaj folioj
// ( kvar flankoj × pluraj fojoj vertikale — la tri-tavola regulo estis nur
// ekzemplo, do pli povas okazi ). De la unua folia tavolo supren la trunko
// estas kovrita de rigidaj senkrustiĝantaj ringoj — simetriaj tasoj kies
// supraj randoj disiĝas foliforme, el kiuj la folioj etendiĝas senjunte.
//     @param arboj ( ArboMetado[] ) - La metitaj arboj.
export function konstruiHxsxaksxlefojn(sceno: THREE.Scene,
  arboj: ArboMetado[]
): THREE.InstancedMesh {
  const hazardaGenerilo = kreiVegetajxanHazardon(0o62445);
  const MAX_TAVOLOJ = 5;
  // Purpura trunko — kiel la aliaj purpuraj plantoj, ne betula ŝelo.
  // La segmentoj de la alto ( 0o24 = 20 ) estas tiom multaj, ke la pinta
  // profilo havas tri ringojn super TRUNKOPINTA_KOMENCO — per malmultaj
  // segmentoj la "rondigita" pinto estus nur unu kruta konuso.
  // ⟨ La flankoj de la trunko 📃 ⟩ — la antaŭaj 0o12 ( 10 ) flankoj faris la
  // folio-cikatriĉajn ringojn de la nova ŝela teksajxo ONDAJ: ĉiu ringo estas
  // plurlatero, ne cirklo, do dekduo da flankoj legiĝas kiel zigzaga linio. Kun
  // 0o30 ( 24 ) flankoj la ringoj legiĝas kiel veraj horizontalaj cikatroj — sed
  // la silueto ankoraŭ montris la rektajn facojn kiel krispajn angulojn, ĉar la
  // trunko estas maldika kaj tre proksima al la okuloj. Nun 0o50 ( 40 ) flankoj
  // faras la silueton kaj la lumon preskaŭ tute glataj.
  const trunkaGeometrio = new THREE.CylinderGeometry(0o7/0o40, 0o3/0o10, 1, 0o50, 0o24);
  // ⟨ La nodoj de la tigo 📃 ⟩ — kie la kolumo renkontas la trunkon, la tigo
  // estas iomete pli dika, kiel la nodo de vera tigo sub folio. Sen ĝi la
  // kolumoj aspektis kiel glasoj ŝovitaj sur glatan bastonon. La nodoj sidas
  // ĉe 0.28 kaj 0.78 de la alto — la ekstremaj foliaj tavoloj de ĉiu arbo.
  {
    const pozicioj = trunkaGeometrio.attributes.position;
    const nodo = ( t: number, mezo: number ): number =>
      Math.exp(-Math.pow(( t - mezo ) / 0o1/0o20, 2));
    for ( let i = 0; i < pozicioj.count; i++ ) {
      const x = pozicioj.getX(i);
      const y = pozicioj.getY(i);
      const z = pozicioj.getZ(i);
      const t = y + 0o1/0o2;
      const faktoro = ( 1 + 0.09 * nodo(t, 0.28) + 0.09 * nodo(t, 0.78) )
        * trunkopintaProfilon(t);
      pozicioj.setXYZ(i, x * faktoro, y, z * faktoro);
    }
    trunkaGeometrio.computeVertexNormals();
  }
  // La trunko havas la SAMAN teksturon kiel la ŝelaj ringoj — malhela ĉe la
  // bazo, heliĝanta al la supro, kun la fajnaj ŝelaj strioj.
  const trunkaMaterialo = kreiSxelanRinganMaterialon(1, false);
  const trunkoj = new THREE.InstancedMesh(trunkaGeometrio, trunkaMaterialo, arboj.length);
  if ( arboj.length === 0 ) return trunkoj;

  // Pli dika, plena folio — pli larĝa klingo, pli profunda kurbeco kaj
  // reala diko, kiel laktuko aŭ brasiko.
  const foliaGeometrio = konstruiKurbanLaktukanFolion();
  const foliaMaterialo = new THREE.MeshStandardMaterial({
    map: kreiPurpuranFolianTeksajxon(), alphaTest: 0o15/0o40, side: THREE.DoubleSide, roughness: 0o63/0o100,
  });
  // Kapacito: la folioj de la tavoloj PLUS la kvar pinta krono-tavoloj ( vidu
  // malsupre ) — 5 tavoloj × 4 flankoj + 4 × 4 = 36.
  const folioj = new THREE.InstancedMesh(foliaGeometrio, foliaMaterialo, arboj.length * ( MAX_TAVOLOJ * 4 + 0o24 ));

  // Rigidaj ŝelaj ringoj — simetriaj tasoj ĉirkaŭ la trunko, pli larĝaj ĉe la
  // supro kaj kurbiĝantaj eksteren ( trumpeto-formo ), kies supraj randoj
  // disiĝas en kvar foliformajn lobojn ( ĉe la kvar flankoj de la folioj ).
  // La folioj etendiĝas el la loboj senjunte.
  const sxelaGeometrio = konstruiSxelanRingon();
  // La ringo kreskas el la trunko: la koluma bando ( la supra, plej hela parto
  // de la ŝela bildo, kun la foli-formaj skvamoj ) — do la taso havas la saman
  // lumon kiel la trunko, kaj ĝiaj skvamoj finiĝas ĉe ĝia rando.
  const sxelaMaterialo = kreiSxelanRinganMaterialon(0o1/0o20, true, 1 - 0o1/0o20);
  // Kapacito 12 ringoj po arbo — kun la grandeco-multiplikilo la maksimuma
  // alto estas 18.75 ( 15 × 0o5/0o4 ), kiu donas 5 foliajn tavolojn plus 4
  // suprajn tasojn ( la pli mallonga ringa spaco aldonis unu ).
  const sxeloj = new THREE.InstancedMesh(sxelaGeometrio, sxelaMaterialo, arboj.length * 0o14);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const C = new THREE.Color();
  const paletro = [ 0x8848a8, 0x9858b8, 0xa868c0, 0x7840a0, 0x9050b0 ];
  const yUp = new THREE.Vector3(0, 1, 0);
  // La tono, kiun la kolumaj tasoj MEM montras ( la mezo de la koluma bando en
  // la linia spaco ) — la referenco, kontraŭ kiu ĉiu taso kompensiĝas al la
  // trunka tono ĉe sia propra alto ( vidu la per-instancajn kolorojn sube ).
  const kolumaTono = sxelaKolumKoloro();
  let fi = 0;
  let si = 0;

  arboj.forEach(( t, i ) => {
    // Malsamaj grandecoj — la arba faktoro donas la bazan alton kaj la
    // multiplikilo ( 0o3/0o4 ĝis 0o5/0o4 ) faras kelkajn arbojn rimarkeble pli
    // mallongaj kaj aliajn pli altaj.
    const h = ( 0o110/0o10 + t.s * 0o40/0o10 ) * ( 0o3/0o4 + hazardaGenerilo() * 0o1/0o2 );
    const Qtrunko = kreiKlinoQuaternionon(hazardaGenerilo, 0o1/0o10, hazardaGenerilo() * Math.PI * 2);
    const bazo = new THREE.Vector3(t.x, t.h, t.z);
    const pozicio = kreiPoziciilon(bazo, Qtrunko);

    M.compose(pozicio(new THREE.Vector3(0, h / 2, 0)), Qtrunko,
      new THREE.Vector3(1, h, 1));
    trunkoj.setMatrixAt(i, M);

    // La trunka radiuso je la alto y — la trunkocilindro havas la radiusojn
    // 0o3/0o10 ( 0.375 ) malsupre kaj 0o7/0o40 ( 0.219 ) supre, do la profilo
    // estas rekta. Ĉi tiu unu formulo donas la saman radiuson al la folioj
    // kaj al la ŝelaj tasoj — ili do ĉiam sidas sur la ŝelo.

    const trunkoR = ( y: number ): number =>
      ( 0o3/0o10 - ( y / h ) * ( 0o3/0o10 - 0o7/0o40 ) ) * trunkopintaProfilon(y / h);

    // 3–5 tavoloj × kvar flankoj — la folioj ĉirkaŭas la trunkon egale.
    const tavoloj = 3 + ( ( hazardaGenerilo() * 3 ) | 0 );
    // La tavolaj altoj — la ŝelaj tasoj sidas SUR ĉi tiuj, do konservu ilin.
    const tavolajY: number[] = [];
    for ( let tavolo = 0; tavolo < tavoloj; tavolo++ ) {
      const tFrakcio = tavolo / ( tavoloj - 1 );
      // Inter 0o11/0o40 ( 0.28 ) kaj 0o25/0o40 ( 0.78 ) de la alto — la
      // antaŭa gamo komenciĝis je 0.44, do preskaŭ duono de la trunko restis
      // nuda stango sub la foliaro.
      const y = h * ( 0o11/0o40 + 0o1/0o2 * tFrakcio );
      tavolajY.push(y);
      const tavolaSkalo = ( 1 - tavolo * 0o1/0o20 ) * ( 1 + t.s * 0o1/0o4 );
      const trunkaR = trunkoR(y);
      // ⟨ Kiom malfermita estas la tavolo 📃 ⟩ — la plej malsupraj folioj de
      // ĉiu tavolo restas pli mallongaj kaj pli proksime al la trunko, kaj la
      // supraj tavoloj malfermiĝas pli ( kiel vera laktuka rozo ). 0 malsupre,
      // 1 supre.
      const malfermo = 0o1/0o2 + 0o1/0o2 * tFrakcio;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        const angulo = flanko / 4 * Math.PI * 2;
        // La folio KRESKAS EL LA TRUNKO: la bazo sidas sur la trunka surfaco
        // ( iomete interne, por ke neniu interspaco videblu ) INTERNE de la
        // ŝela taso, kaj la klingo LEVIĝAS supren el la taso antaŭ ol kliniĝi
        // eksteren. Antaŭe la bazo staris je trunkoR + 0.1, tute en la aero,
        // kaj la folioj aspektis kiel ŝvebantaj plumoj apud la trunko.
        E.set(0o1/0o20 + 0o3/0o20 * malfermo, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        const skalo = tavolaSkalo
          * ( 0o13/0o20 + 0o3/0o20 * malfermo + hazardaGenerilo() * 0o1/0o20 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * trunkaR * 0o7/0o10, y, Math.cos(angulo) * trunkaR * 0o7/0o10)),
          Q, new THREE.Vector3(skalo, skalo, skalo));
        folioj.setMatrixAt(fi, M);
        folioj.setColorAt(fi, hazardaKoloro(hazardaGenerilo, C, paletro));
        fi++;
      }
    }

    // Ŝelaj tasoj — unu ĉe ĉiu folia tavolo. La taso malfermiĝas SUPren kaj
    // eksteren ( trumpeto ), kaj ĝia mallarĝa malsupro staras iomete sub la
    // foliaj bazoj, do la folioj leviĝas el la INTERNO de la taso kaj etendiĝas
    // eksteren super ĝia rando. Poste pluaj tasoj supren sur la nudan
    // trunkopinton, por ke la pinto aspektu kiel stako de tasoj, kiel en la
    // skulptaĵo.
    const sxelaAlto = 0o15/0o20;
    // ⟨ La konusoj estas KONTINUA stako 📃 ⟩ — la spaco inter la supraj tasoj
    // estis 0o11/0o10 ( 1.125 ) dum la taso mem altas nur 0.8125. Inter ĉiu paro
    // de supraj tasoj restis videbla truo, do la supraĵo aspektis kiel konusoj
    // ŜVEBANTAJ ĉirkaŭ la maldika trunkopinto ( tie la trunko mallarĝiĝas al
    // nulo per trunkopintaProfilon ). Nun la spaco estas 60% de la tasa alto, do
    // ĉiu taso eniras la sekvan kaj la tuta supraĵo legiĝas kiel unu kono.
    const ringaSpaco = sxelaAlto * 0o6/0o10;
    const lastaTavolaY = tavolajY[tavolajY.length - 1];
    const suprajRingoj = Math.max(1, Math.ceil(( h - sxelaAlto - lastaTavolaY ) / ringaSpaco));
    for ( let ringo = 0; ringo < tavoloj + suprajRingoj; ringo++ ) {
      const sxelaY = ringo < tavoloj
        ? tavolajY[ringo]
        : lastaTavolaY + ( ringo - tavoloj + 1 ) * ringaSpaco;
      if ( sxelaY > h - sxelaAlto ) break;
      // La taso sidas ĝuste sur la trunko — iomete pli larĝa ol la ŝelo,
      // por ke la rando videblu, sed ne tiom ke ĝi aspektu kiel funelo.
      // La malsupro de la taso iras 0o14/0o40 da tasalto SUB la foliaj bazoj.
      // ⟨ La konoj supren 📃 ⟩ — la supraj tasoj ( super la lasta folia tavolo )
      // NE estas egallarĝaj kiel antaŭe, kiam la trunkopinto aspektis kiel
      // kolono de identaj teleroj. Ili sekvas la trunkan profilon kaj malfermiĝas
      // nur iomete, do la tuta supraĵo legiĝas kiel unu kono.
      const superaj = ringo < tavoloj ? 0 : ( ringo - tavoloj + 1 ) / suprajRingoj;
      // ⟨ Etendiĝi EKSTEREN 📃 ⟩ — antaŭe la ringoj super la lasta folia
      // tavolo MALlarĝiĝis supren ( faktoro 1 − 0.62 ), do la tuta supro estis
      // pinto kaj la planto aspektis kiel lanco. Nun ili MALFERMIĝas iomete —
      // ĉiu pli alta ringo estas iomete pli larĝa ol la antaŭa, kiel laktuka
      // kapo malfermiĝanta.
      // ⟨ Malfermo 📃 ⟩ — la malfermo estis 0.30, kiu kun la pinta kono faris
      // funelon super la foliaro. Nun la suprajn tasojn kovras la tri pinta
      // TAVOLOJ de folioj ( vidu malsupre ), do la tasoj povas resti preskaŭ
      // laŭ la trunka profilo kaj la supro legiĝas kiel foliaro, ne kiel taso.
      // ⟨ Nur malmulte 📃 ⟩ — la antaŭa faktoro 1.18 larĝigis la suprajn tasojn
      // dum la trunko mallarĝiĝis supren, do la pinto aspektis kiel teleroj sur
      // bastono. 6% sufiĉas por legiĝi kiel malfermiĝanta laktuka kapo, sed la
      // tasoj restas brakitaj al la trunko.
      const konaFaktoro = 1 + 0.06 * superaj;
      // ⟨ La mezuro venas el la tas-MALSUPRO 📃 ⟩ — la taso brakumas la trunkon
      // ĉe sia malsupro, kaj tie la trunko estas la plej DIKA ( ĝi mallarĝiĝas
      // supren ). Mezuri ĉe la centro de la taso donis tro malgrandan radiuson,
      // do la subaj tasoj povis flosi ĉirkaŭ la ŝelo. La alto de tiu malsupro
      // samtempe estas la pozicio de la taso, do ambaŭ uzas la saman nombron.
      const sxelaBazo = sxelaY - sxelaAlto * 0o14/0o40 + sxelaAlto * 0o3/0o10 * superaj;
      const ringaSkalo = Math.max(0o1/0o20,
        trunkoR(Math.max(0, sxelaBazo)) / ( 0o13/0o40 ) * 0o11/0o10) * konaFaktoro;
      M.compose(pozicio(new THREE.Vector3(0, sxelaBazo, 0)), Qtrunko,
        new THREE.Vector3(ringaSkalo, sxelaAlto, ringaSkalo));
      sxeloj.setMatrixAt(si, M);
      // ⟨ Ĉiu taso sekvas la trunkan tonon 📃 ⟩ — la koluma materialo ĉiam legas
      // la SAMAN bandon de la ŝela bildo ( la plej helan, kie sidas la koluma
      // foli-desegno ), do sen ĝi ĉiu taso havus la plej supran tonon de la
      // trunko — ankaŭ la tasoj malalte sur la ŝelo, kiuj tiam aspektis multe pli
      // helaj ol la trunko apud ili. Nun ĉiu taso ricevas la tonon, kiun la
      // trunko mem havas ĉe la sama alto, do la tasoj transiras senkude en la
      // trunkon ĉe ĉiu nivelo — la kono kaj la trunko estas unu objekto.
      const trunkaTono = sxelaTrunkaKoloro(sxelaBazo / h);
      C.setRGB(
        Math.min(1, trunkaTono[0] / kolumaTono[0]),
        Math.min(1, trunkaTono[1] / kolumaTono[1]),
        Math.min(1, trunkaTono[2] / kolumaTono[2]));
      sxeloj.setColorAt(si, C);
      si++;
    }

    // ⟨ La pinta krono 📃 ⟩ — la ŝlefo NE finiĝas per pinto, sed ankaŭ NE per
    // plata telero. La supro estas kvar TAVOLOJ kiel la ceteraj, sed ili
    // MALGRANDIĜAS supren: la plej malsupra malfermiĝas eksteren super la
    // randon de la lasta taso, kaj ĉiu sekva stariĝas kaj mallongiĝas, ĝis la
    // plej supra estas malgranda burĝono de junaj folioj, kiu fermas la
    // trunkopinton. Antaŭe la supraj folioj estis la PLEJ GRANDAJ ( skalo
    // 0.83–0.95 kontraŭ 0.55 malsupre ), do la kapo larĝiĝis supren kaj la
    // krono de supre aspektis kiel plata folia stelo kun la trunka disko en la
    // mezo. Nun la plej supra tavolo sidas ĝuste sur la pinto ( pintaR = 0, la
    // profilo de trunkopintaProfilon ), do ĝiaj folioj eliras el la pinto mem.
    const PINTAJ_TAVOLOJ = 0o4;
    const pintaAlto = Math.min(h, lastaTavolaY + suprajRingoj * ringaSpaco);
    const pintaBazo = Math.min(lastaTavolaY + ringaSpaco * 0o2/0o10, pintaAlto);
    const pintaFazo = hazardaGenerilo() * Math.PI * 2;
    for ( let tavolo = 0; tavolo < PINTAJ_TAVOLOJ; tavolo++ ) {
      const tFrakcio = tavolo / ( PINTAJ_TAVOLOJ - 1 );
      const pintaY = pintaBazo + ( pintaAlto - pintaBazo ) * tFrakcio;
      // Ju pli supre, des pli la folio stariĝas: 20° malsupre, 3° supre — la
      // sama klino kiel la tavolaj folioj, sed finiĝanta en fermita burĝono.
      const elklino = 0.35 - tFrakcio * 0.30;
      const pintaR = trunkoR(pintaY) * 0o7/0o10;
      for ( let flanko = 0; flanko < 4; flanko++ ) {
        // La tavoloj ŝoviĝas unu kontraŭ la alia — la folioj ne formas radiuson.
        const angulo = pintaFazo + tavolo * 0o1/0o2 + flanko / 4 * Math.PI * 2;
        E.set(elklino + ( hazardaGenerilo() - 0o5/0o10 ) * 0o2/0o20, 0, 0);
        Q.setFromEuler(E);
        Q.premultiply(new THREE.Quaternion().setFromAxisAngle(yUp, angulo));
        Q.premultiply(Qtrunko);
        // La supraj folioj estas la SAMaj folioj kiel la tavolaj — nur pli
        // junaj, do pli mallongaj kaj pli mallarĝaj.
        const skalo = ( 1 + t.s * 0o1/0o4 )
          * ( 0.92 - tFrakcio * 0.60 + hazardaGenerilo() * 0o1/0o10 );
        M.compose(pozicio(new THREE.Vector3(
            Math.sin(angulo) * pintaR, pintaY, Math.cos(angulo) * pintaR)),
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
