// ≺⧼ La lampoj 🏮 ⧽≻
// Trapezaj dioritaj kolonoj kun fajraj kronoj kaj brilaj sprajtoj. La lampo
// nomigxas huf ( ֭ſɭwʞ ) en Iikrhia. noma formo. hxeuxfo.
// La konstruo — la kolonoj, la bovloj, la oraj randoj, la flamaj manteloj kaj
// la brilaj punktoj ( konstruiHxeuxfojn ).
import * as THREE from "three";
import { kreiDioritanTeksajxon } from "../../komunajxoj/teksajxoj/diorito.js";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { BOVLA_ALTO, kreiFlamanGeometrion, LANGA_ALTO } from "./flamo.js";
import { kreiFalekon } from "./faleko.js";
import type { HxeuxfaLoko, HxeuxfaSistemo } from "./tipoj.js";
// konstruiHxeuxfojn — Konstruu trapezajn lampojn (hxeuxfojn) el bazoj, bovloj, flamoj kaj briletoj.
//     @param dioritaMaterialo ( THREE.MeshStandardMaterial ) - La komuna monda
//     diorita ŝtonmaterialo ( kreiDioritanMaterialon ), kiun la lampoj reuzas
//     por siaj kolonoj kaj bovloj. La lampo prenas PROPRIAN klonon kun pli
//     fajngrajna teksturo ( 4×4 anstataŭ 2×2 ), por ke la kristaloj konvenu
//     al la malgranda skalo de la kolono kaj bovlo.
export function konstruiHxeuxfojn(sceno: THREE.Scene,
  spots: HxeuxfaLoko[],
  dioritaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): HxeuxfaSistemo {
  const kolonajGeometrioj: THREE.BufferGeometry[] = [];
  const bovlajGeometrioj: THREE.BufferGeometry[] = [];
  const orajGeometrioj: THREE.BufferGeometry[] = [];
  const flamajLokoj: THREE.Vector3[] = [];

  // Lampa diorita materialo — klono kun pli fajngrajna teksturo. La komuna
  // voja ripeto ( 2×2 ) montras tro grandajn kristalojn sur la malgranda
  // kolono kaj bovlo; la 4×4 ripeto duonigas la grajnojn kaj konvenas al la
  // lampa skalo. La teksturo-klonoj kunhavigas la bildon, do ili kostas nenion
  // plian en memoro.
  const lampaMaterialo = dioritaMaterialo.clone();
  const lampaMap = ( dioritaMaterialo.map ?? kreiDioritanTeksajxon() ).clone();
  lampaMap.repeat.set(0o4, 0o4); lampaMap.needsUpdate = true;
  lampaMaterialo.map = lampaMap;
  if ( dioritaMaterialo.bumpMap ) {
    const lampaBump = dioritaMaterialo.bumpMap.clone();
    lampaBump.repeat.set(0o4, 0o4); lampaBump.needsUpdate = true;
    lampaMaterialo.bumpMap = lampaBump;
  }

  for ( const p of spots ) {
    // Trapeza kolono ( pli largxa cxe bazo )
    const rotacio = p.rotacio ?? Math.PI / 4;
    const pillar = new THREE.CylinderGeometry(0o5/0o40, 0o13/0o40, 0o155/0o40, 4, 1);
    pillar.rotateY(rotacio);
    pillar.translate(p.x, p.y + 0o155/0o100, p.z);
    kolonajGeometrioj.push(pillar);

    // Diorita bovlo — fermita profilo. ekstera kurbo, rando, interna muro kaj fundo.
    // La fermo forigas la tra-videblon (la interna flanko nun estas vera surfaco).
    // La plata bazo havas la SAMAN radiuson kiel la kolona supro ( 0o5/0o40 =
    // 0.156 ), do la bovlo sidas tute glate sur la kolono sen videbla paŝo aŭ
    // superpendanta lipo — unu kontinua silueto. La interno estas MALKOLONGA,
    // do la bovlo aspektas kiel malprofunda pelvo kaj la malhela ena kavo ne
    // dominiĝas. Ĉiuj vertikalaj mezuroj estas FRAKCIOJ de BOVLA_ALTO, do la
    // horizontala profilo ( la kurbo de la muro ) restas identa kiam la bovlo
    // malaltiĝas.
    const profilo: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      ...new THREE.SplineCurve([
        new THREE.Vector2(0o5/0o40, 0),
        new THREE.Vector2(0o2/0o10, BOVLA_ALTO * 0.42),
        new THREE.Vector2(0o3/0o10, BOVLA_ALTO * 0.83),
        new THREE.Vector2(0o35/0o100, BOVLA_ALTO),
      ]).getPoints(0o10),
      new THREE.Vector2(0o31/0o100, BOVLA_ALTO),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.67),
      new THREE.Vector2(0o3/0o20, BOVLA_ALTO * 0.42),
      new THREE.Vector2(0, BOVLA_ALTO * 0.42),
    ];
    const bowl = new THREE.LatheGeometry(profilo, 4);
    bowl.rotateY(rotacio);
    // La kolono estas 0o155/0o40 alta, do gia supro estas p.y + 0o155/0o40 ( ne 0o155/0o100 = centro ).
    bowl.translate(p.x, p.y + 0o155/0o40, p.z);
    bovlajGeometrioj.push(bowl);

    // Ora rando cxe la MALUPRA flanko de la bovlo — la SAMA ora materialo
    // kiel la konstruajxoj. MALdika bendo pli proksime al la bovla supro,
    // kun marĝeno — gxi ne tusxas la bovlan lipon kaj la ekstera radiuso
    // restas ene de la bovla rando. Gxi sekvas la bovlan deklivon kaj estas
    // levita iomete ( 0o1/0o200 ) por legigxi kiel rando.
    const rando = new THREE.CylinderGeometry(0o70/0o200, 0o57/0o200, 0o1/0o20, 4, 1);
    rando.rotateY(rotacio);
    rando.translate(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 0.875, p.z);
    orajGeometrioj.push(rando);

    // Kvar APARTAJ falekoj — unu po faco. Cxiu faleko estas ferma buklo kun
    // rondaj DUONCIRKLAJ kurboj cxe ambaux finoj ( la malsupra suben, la
    // supra supren ) kaj brakoj kiuj sekvigas la kolonan konusigon kun
    // KONSTANTA horizontala margxeno al la facaj randoj. La falekoj NE
    // konektigxas unu al la alia — horizontala margxeno restas cxe la anguloj.
    // La vertikalaj margxenoj estas malgrandaj.
    const falekaPinto = 0o32/0o10, falekaSubo = 0o1/0o4, falekaMargxeno = 0o1/0o20;
    for ( let k = 0; k < 4; k++ ) {
      const faleko = kreiFalekon(Math.PI / 4 + k * Math.PI / 2, falekaPinto, falekaSubo, falekaMargxeno, 0o1/0o40, 0o13/0o40, 0o5/0o40, 0o155/0o40);
      faleko.rotateY(rotacio);
      faleko.translate(p.x, p.y + 0o155/0o100, p.z);
      orajGeometrioj.push(faleko);
    }

    // Flamo levita. gia bazo sidas super la bovla rando ( ne sube en la bovlo ),
    // kaj restas super la rando ecx cxe la plej alta flam-skalo. La deŝovo
    // sekvas BOVLA_ALTO, do malaltiĝinta bovlo ankaŭ mallevas la flamon — la
    // flamo restas la sama distanco super la rando.
    flamajLokoj.push(new THREE.Vector3(p.x, p.y + 0o155/0o40 + BOVLA_ALTO * 2, p.z));
  }

  const kolonoj = new THREE.Mesh(kunfandiGeometriojn(kolonajGeometrioj), lampaMaterialo);
  kolonoj.castShadow = true;
  sceno.add(kolonoj);

  const bovloj = new THREE.Mesh(kunfandiGeometriojn(bovlajGeometrioj), lampaMaterialo);
  sceno.add(bovloj);

  // Oraj randoj kaj bendoj — la sama ora materialo kiel la konstruajxoj.
  const orajRandoj = new THREE.Mesh(kunfandiGeometriojn(orajGeometrioj), oraMaterialo);
  sceno.add(orajRandoj);

  // ⟨ La flamo — tri tavoloj 📃 ⟩ — la antaŭa flamo estis DU opakaj konusoj
  // ( unu oranĝa, unu flaveca ). Nun ĝi estas tri ALDONAJ tavoloj de la sama
  // teardropo: la ekstera oranĝa koverto, la flava mezo kaj la blanka varma
  // kerno ĉe la bazo. Ĉar la tavoloj aldonas sin ( AdditiveBlending ), la
  // centro de la flamo brilas plej forte kaj la randoj glate malaperas — la
  // flamo legiĝas kiel lumo, ne kiel oranĝa plasta konuso.
  const N = flamajLokoj.length;
  const flamaMaterialo = ( koloro: number, opaco: number ) => new THREE.MeshBasicMaterial({
    color: koloro, toneMapped: false, transparent: true, opacity: opaco,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const flamaEkstero = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o35/0o100, 0o21/0o100, 1, 0.7),
    flamaMaterialo(0xff6a1e, 0o35/0o40), N);
  const flamaInterno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o23/0o100, 0o14/0o100, 0o3/0o4, 2.3),
    flamaMaterialo(0xffb545, 0o33/0o40), N);
  const flamaKerno = new THREE.InstancedMesh(
    kreiFlamanGeometrion(0o10/0o100, 0o4/0o100, 0o1/0o2, 5.1),
    flamaMaterialo(0xfff4d0, 0o5/0o10), N);
  flamaEkstero.frustumCulled = false;
  flamaInterno.frustumCulled = false;
  flamaKerno.frustumCulled = false;
  sceno.add(flamaEkstero, flamaInterno, flamaKerno);

  // ⟨ La langoj 📃 ⟩ — la tri tavoloj supre estas SAMAKSIAJ lathe-korpoj, do
  // la flamo havas unu glatan teardropan silueton kiu nur grimpas supren kaj
  // malsupren. Vera flamo estas PLURAJ langoj: malgrandaj teardropoj, kiuj
  // sidas sur la meĉo ĉirkaŭ la ĉefa lango, lekas supren unu post la alia kaj
  // kliniĝas eksteren. Ĉiu lango havas sian propran bazan deŝovon, larĝon kaj
  // fazon, do la flamo neniam aspektas kiel unu solida formo.
  const LANGOJ = 0o3;
  const flamaLangoj = new THREE.InstancedMesh(
    kreiFlamanGeometrion(LANGA_ALTO, 0o11/0o100, 0o6/0o10, 3.7),
    flamaMaterialo(0xff8a2c, 0o17/0o40), N * LANGOJ);
  flamaLangoj.frustumCulled = false;
  sceno.add(flamaLangoj);
  const langajBazoj: THREE.Vector3[] = [];
  const langajFazoj: number[] = [];
  flamajLokoj.forEach(() => {
    // La langoj sidas ĉirkaŭ la meĉo ( radiuso ~0.07 ), ne centre — la ĉefa
    // lango restas inter ili.
    const turno = Math.random() * Math.PI * 2;
    for ( let j = 0; j < LANGOJ; j++ ) {
      const a = turno + j / LANGOJ * Math.PI * 2 + ( Math.random() - 0o5/0o10 ) * 0o5/0o10;
      const r = 0o5/0o100 + Math.random() * 0o4/0o100;
      langajBazoj.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r,
        0o7/0o10 + Math.random() * 0o5/0o10));
      langajFazoj.push(Math.random() * Math.PI * 2);
    }
  });

  // brilaj sprajtoj
  const gPozicio = new Float32Array(N * 3);
  const gSemo = new Float32Array(N);
  const gGrando = new Float32Array(N);
  const phases: number[] = [];

  flamajLokoj.forEach(( p, i ) => {
    gPozicio.set([ p.x, p.y + 0o15/0o100, p.z ], i * 3);
    gSemo[i] = Math.random() * 0o140;
    gGrando[i] = 0o20 + Math.random() * 0o10;
    phases.push(Math.random() * Math.PI * 2);
  });

  const gg = new THREE.BufferGeometry();
  gg.setAttribute("position", new THREE.BufferAttribute(gPozicio, 3));
  gg.setAttribute("semo", new THREE.BufferAttribute(gSemo, 1));
  gg.setAttribute("aSize", new THREE.BufferAttribute(gGrando, 1));

  const brilaMaterialo = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOp: { value: 0o15/0o40 },
      uCol: { value: new THREE.Color(0xf8b058) },
      uPR: { value: 1 },
    },
    vertexShader: `
      attribute float semo; attribute float aSize;
      uniform float uTime, uPR;
      varying float vA;
      void main() {
        vA = 0.75 + 0.25 * sin(uTime * 9.0 + semo * 7.0);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPR * (160.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uCol; uniform float uOp;
      varying float vA;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        gl_FragColor = vec4(uCol, smoothstep(0.5, 0.0, d) * uOp * vA);
      }
    `,
  });

  const brilajPunktoj = new THREE.Points(gg, brilaMaterialo);
  brilajPunktoj.frustumCulled = false;
  sceno.add(brilajPunktoj);  // ⟪ La kvar punktlumoj 📃 ⟫ — la plej proksimaj flamoj al la vidpunkto.
  // Antaŭe la kvar lumoj elektiĝis UNUFOJE laŭ la distanco al la mond-origino
  // kaj restis tie por ĉiam ( la lampo apud la ludanto restis malluma se li
  // malproksimiĝis de la centro ). Nun ili sekvas la vidpunkton — la sama ideo
  // kiel la suna ombro-volumeno. La NOMBRO restas konstanta, do la
  // shader-programoj ne rekompiliĝas kiam la lumoj transloĝiĝas.
  const LUMOJ = Math.min(0o4, flamajLokoj.length);
  const punktajLumoj: THREE.PointLight[] = [];
  const lumajIndeksoj: number[] = [];        // la flama indico de ĉiu lumo
  const lumajDistancoj = new Float32Array(LUMOJ);   // la kvadrataj distancoj
  for ( let k = 0; k < LUMOJ; k++ ) {
    const L = new THREE.PointLight(0xf89838, 0o15/0o40, 0o32, 2);
    sceno.add(L);
    punktajLumoj.push(L);
    lumajIndeksoj.push(k);
  }

  let lumCentroX = NaN, lumCentroZ = NaN;
  // sekviLumojn — Aligu la kvar lumojn al la kvar plej proksimaj flamoj de la
  // vidpunkto. La elekto estas unu trairo sen asigno — la tabeloj jam ekzistas.
  //     @param x ( number ) - La mond-x de la vidpunkto.
  //     @param z ( number ) - La mond-z de la vidpunkto.
  function sekviLumojn( x: number, z: number ): void {
    if ( LUMOJ === 0 ) return;
    // Nur kiam la vidpunkto iris sufiĉe for — la flamoj mem ne moviĝas, do
    // senmovaj lumoj ne bezonas reelekton ĉiukadre.
    if ( Math.abs(x - lumCentroX) < 0o2 && Math.abs(z - lumCentroZ) < 0o2 ) return;
    lumCentroX = x; lumCentroZ = z;
    for ( let k = 0; k < LUMOJ; k++ ) lumajDistancoj[k] = Infinity;
    for ( let i = 0; i < flamajLokoj.length; i++ ) {
      const p = flamajLokoj[i];
      const sxovX = p.x - x, sxovZ = p.z - z;
      const d = sxovX * sxovX + sxovZ * sxovZ;
      // La plej malproksima el la tenataj — anstataŭigu ĝin se ĉi tiu flamo
      // estas pli proksima.
      let plejMalproksima = 0;
      for ( let k = 1; k < LUMOJ; k++ ) if ( lumajDistancoj[k] > lumajDistancoj[plejMalproksima] ) plejMalproksima = k;
      if ( d < lumajDistancoj[plejMalproksima] ) {
        lumajDistancoj[plejMalproksima] = d;
        lumajIndeksoj[plejMalproksima] = i;
      }
    }
    // La lumo sidas iomete super la lampo — en la flamo mem.
    for ( let k = 0; k < LUMOJ; k++ ) {
      const p = flamajLokoj[lumajIndeksoj[k]];
      punktajLumoj[k].position.set(p.x, p.y + 0o23/0o100, p.z);
    }
  }
  // La komenca elekto — la kvar plej proksimaj al la mond-origino, kiel antaŭe.
  sekviLumojn(0, 0);

  const M = new THREE.Matrix4();
  flamajLokoj.forEach(( p, i ) => {
    M.makeTranslation(p.x, p.y, p.z);
    flamaEkstero.setMatrixAt(i, M);
    flamaInterno.setMatrixAt(i, M);
    flamaKerno.setMatrixAt(i, M);
    for ( let j = 0; j < LANGOJ; j++ ) flamaLangoj.setMatrixAt(i * LANGOJ + j, M);
  });
  flamaEkstero.instanceMatrix.needsUpdate = true;
  flamaInterno.instanceMatrix.needsUpdate = true;
  flamaKerno.instanceMatrix.needsUpdate = true;
  flamaLangoj.instanceMatrix.needsUpdate = true;

  return { flamaEkstero, flamaInterno, flamaKerno, flamaLangoj, langojPoLampo: LANGOJ,
    langajBazoj, langajFazoj, brilajPunktoj, brilaMaterialo, punktajLumoj,
    lumajIndeksoj, spots: flamajLokoj, phases, sekviLumojn };
}
