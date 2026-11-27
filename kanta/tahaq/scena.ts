// ≺⧼ ſ͕ɭɔ }ʃᴜ ʌ j͑ʃᴜ̭ɔ }ʃᴜ 🎬 ⧽≻
import * as THREE from "three";
import { l6da, tsasaVem2, tsasaVem2Tsiike } from "../nala/mut6qSoza.js";
import { glataTona } from "../k2fe/fkabe.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2Cah6k6Pukek, kf2KuhalPukek } from "../../skek2/p6kpu/pukek.js";
import { kf2GrundanCac2sex } from "../../skek2/p6kpu/cac2sex/kozu2.js";
import { kf2GrundanBumpanCac2sex } from "../../skek2/p6kpu/cac2sex/kozu2-bumpo.js";
import { kf2NebulTavolanCac2sex } from "../../skek2/p6kpu/cac2sex/f2m2sexazai-tanek.js";
import { kf2KozuanCac2sex } from "../../skek2/p6kpu/cac2sex/mut6qSoza.js";
import { xetoh2D, hagek2fhagasai, mut6qWeh2En,
  mut6qK6h6Weh2En } from "../../skek2/p6kpu/mut6qHaweh2.js";
import { surokQoxa, h6kuniQoxa, ka5ikH6kuni, kf2QoxaZace,
  NALAPSAZY } from "../../skek2/p6kpu/mapqoxa.js";
import { veb6qaiWeh2Skek, veb6qaiW2d2 } from "../../skek2/p6kpu/haweh2.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../skek2/p6kpu/tsije.js";
import { kxeBal2 } from "../mut6q-havop2/bal2S2kanta.js";
import { jaqoRuvaKozunu } from "../mut6q-havop2/tlohk2nikziisai.js";
import { tlak2SexieanVitron } from "../../skek2/hapaq/satalaj/fasw2d2.js";
import { laqaziTlohk2nik2p2 } from "./scena/tlohk2nik2p2.js";
import { PLOSTEQRATIO, KAK2PIKSLA, HUNANUBAL2, HUNANUKAK2 } from "./scena/cak2p2.js";
import { kf2Canan } from "./scena/cana.js";
import { MAHAVEM2, kf2Haweh2Cax2lojn } from "./scena/haweh2Cax2loj.js";
import { kf2Q21oBaskek2jn } from "./scena/q21oBaskek2.js";
import type { ScenaKanta, Vet6lima } from "./scena/hahunaq.js";

export function kf2Kagani(p2t6zo: HTMLCanvasElement, b6tem2Kuba: HTMLElement): ScenaKanta {

  let k2fcakuk: THREE.WebGLRenderer;
  try {

    k2fcakuk = new THREE.WebGLRenderer({ canvas: p2t6zo, antialias: KAK2PIKSLA, powerPreference: "default" });
  } catch {
    laqaziTlohk2nik2p2(b6tem2Kuba);
    throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) WebGL ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ");
  }
  catsaraTonan( k2fcakuk, { hahunanu: HUNANUKAK2, ombraHunaq: THREE.PCFShadowMap,
    pikslaRacio: Math.min( devicePixelRatio, PLOSTEQRATIO ) } );

  k2fcakuk.shadowMap.autoUpdate = false;
  k2fcakuk.shadowMap.needsUpdate = true;

  k2fcakuk.setSize(innerWidth, innerHeight);

  const qena = new THREE.Scene();

  qena.fog = new THREE.FogExp2(0xc8d8d8, MAHAVEM2);

  const catahaq = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  catahaq.position.set(0o40, 0o30, 0o100);
  catahaq.rotation.order = "YXZ";

  const catahaqTanP2sa = 0o2 * Math.tan(catahaq.fov * Math.PI / 0o550);

  const KOZUFADOSAXE = 0o14;
  const KOZUFADOPLOSTEQ = 0o72;

  const kf2FadoPukek = ( pukek: THREE.MeshStandardMaterial ): THREE.MeshStandardMaterial => {
    pukek.onBeforeCompile = ( s2k2p2ni ) => {

      s2k2p2ni.fragmentShader = s2k2p2ni.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        float grundFado = 1.0;`
      );
      s2k2p2ni.fragmentShader = s2k2p2ni.fragmentShader.replace(
        "#include <map_fragment>",
        `grundFado = 1.0 - smoothstep( ${KOZUFADOSAXE.toFixed(0o1)}, ${KOZUFADOPLOSTEQ.toFixed(0o1)}, length( vViewPosition ) );
        #ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          sampledDiffuseColor.rgb = mix( vec3( 1.0 ), sampledDiffuseColor.rgb, grundFado );
          diffuseColor *= sampledDiffuseColor;
        #endif`
      );

      s2k2p2ni.fragmentShader = s2k2p2ni.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        normal = normalize( mix( nonPerturbedNormal, normal, grundFado ) );`
      );
    };
    return pukek;
  };

  const q21oKanta = catsaraQatsiiken( qena, k2fcakuk );

  const { cana, canaajUnihaqoxa } = kf2Canan(qena);

  const hunastafC2ta = 0o2 * 0o100 / HUNANUBAL2;
  const { hemiTsije, sotsii } = kf2GelesTsijen( qena, {
    canaWeh2: 0xc8e0e8, kozuWeh2: 0x485848, canaVem2: 0o63/0o100,
    sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o45/0o40, sotsiiHaxekuxa: [ 0o110, 0o160, 0o40 ],
    hahunanu: HUNANUKAK2, ombraBal2: HUNANUBAL2, ombraP2somani: 0o100,
    ombraTsiike: 0o20, ombraMaltsiike: 0o520,

    ombraBiaso: -0o1 / ( 0o2 * HUNANUBAL2 ),
    ombraNormalBiaso: Math.max( 0o4/0o10, hunastafC2ta * 0o22/0o10 ),
  } );

  const so12Tahaq = new THREE.TextureLoader().load(new URL("./scena/sotsii.png", import.meta.url).href);
  so12Tahaq.colorSpace = THREE.SRGBColorSpace;
  so12Tahaq.magFilter = THREE.LinearFilter;
  so12Tahaq.minFilter = THREE.LinearMipmapLinearFilter;
  so12Tahaq.generateMipmaps = true;
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: so12Tahaq, color: 0xf8f0d8, transparent: true, opacity: 0o30/0o100,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  qena.add(sunaSprajto);

  const HAWEH2CAX2LOJ = kf2Haweh2Cax2lojn();

  let cutluVet6lima: Vet6lima = "nebula";
  let tlakakaiPukobestaf = 0o0;

  const hunastafC2taQox2n2k = ( sotsii.shadow.camera.right - sotsii.shadow.camera.left ) / sotsii.shadow.mapSize.x;

  const HUNANUKALTOK = hunastafC2taQox2n2k * Math.max( 0o1, Math.round( 0o1 / hunastafC2taQox2n2k ) );
  const SO12C2W2Q = new THREE.Vector3().copy(sotsii.position).normalize();
  let so12H6kuni = sotsii.position.length();
  const HUNANUC2W2Q = new THREE.Vector3();
  const HUNANUX2PA = new THREE.Vector3();
  const HUNANUX2PA2 = new THREE.Vector3();
  const HUNANUSOST2 = new THREE.Vector3();
  let ombraSost2X = 0o0, ombraSost2Z = 0o0;

  function k2reiHunanunSost2(): void {
    HUNANUC2W2Q.copy(SO12C2W2Q);
    const h6kuni = so12H6kuni;
    if ( h6kuni === 0o0 ) return;
    HUNANUX2PA2.set(0o0, 0o1, 0o0);
    if ( Math.abs(HUNANUC2W2Q.y) > 0o777/0o1000 ) HUNANUX2PA2.set(0o0, 0o0, 0o1);
    HUNANUX2PA.crossVectors(HUNANUX2PA2, HUNANUC2W2Q).normalize();
    HUNANUX2PA2.crossVectors(HUNANUC2W2Q, HUNANUX2PA).normalize();
    const x2paVem2 = Math.round(( ombraSost2X * HUNANUX2PA.x + ombraSost2Z * HUNANUX2PA.z ) / HUNANUKALTOK) * HUNANUKALTOK;
    const sakVem2 = Math.round(( ombraSost2X * HUNANUX2PA2.x + ombraSost2Z * HUNANUX2PA2.z ) / HUNANUKALTOK) * HUNANUKALTOK;
    HUNANUSOST2.set(0o0, 0o0, 0o0).addScaledVector(HUNANUX2PA, x2paVem2).addScaledVector(HUNANUX2PA2, sakVem2);
    sotsii.target.position.copy(HUNANUSOST2);
    sotsii.position.copy(HUNANUSOST2).addScaledVector(HUNANUC2W2Q, h6kuni);
  }

  function tlak2Ombron( x: number, z: number ): boolean {
    if ( x === ombraSost2X && z === ombraSost2Z ) return false;
    ombraSost2X = x; ombraSost2Z = z;
    const ne3ak2X = HUNANUSOST2.x, ne3ak2Z = HUNANUSOST2.z;
    k2reiHunanunSost2();
    return HUNANUSOST2.x !== ne3ak2X || HUNANUSOST2.z !== ne3ak2Z;
  }

  function k2reiPucanan(): void {
    const hunastaf = tlakakaiPukobestaf;
    const vet6Bal2 = HAWEH2CAX2LOJ[cutluVet6lima];
    const h2lVem2 = ( a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number ): any =>
      a instanceof THREE.Color ? veb6qaiWeh2Skek(( a as THREE.Color ).clone().lerp(b as THREE.Color, hunastaf)) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, hunastaf) :
      a + ( b as number - a ) * hunastaf;
    canaajUnihaqoxa.uTop.value = h2lVem2(vet6Bal2.h2hafaf2.soza, vet6Bal2.pukobestaf.soza);
    canaajUnihaqoxa.uMid.value = h2lVem2(vet6Bal2.h2hafaf2.sost2, vet6Bal2.pukobestaf.sost2);
    canaajUnihaqoxa.uBot.value = h2lVem2(vet6Bal2.h2hafaf2.psaz, vet6Bal2.pukobestaf.psaz);
    canaajUnihaqoxa.uSunCol.value = h2lVem2(vet6Bal2.h2hafaf2.sunaHaweh2, vet6Bal2.pukobestaf.sunaHaweh2);
    canaajUnihaqoxa.uHunastaf.value = hunastaf;
    const sunDir = new THREE.Vector3().copy(vet6Bal2.h2hafaf2.sunaHaxekuxa).lerp(vet6Bal2.pukobestaf.sunaHaxekuxa, hunastaf);
    canaajUnihaqoxa.uSunDir.value = sunDir.clone().normalize();

    veb6qaiWeh2Skek(qena.fog!.color.copy(vet6Bal2.h2hafaf2.maha).lerp(vet6Bal2.pukobestaf.maha, hunastaf));
    ( qena.fog as THREE.FogExp2 ).density = h2lVem2(vet6Bal2.h2hafaf2.mahaVem2, vet6Bal2.pukobestaf.mahaVem2);
    veb6qaiWeh2Skek(hemiTsije.color.copy(vet6Bal2.h2hafaf2.hemiCana).lerp(vet6Bal2.pukobestaf.hemiCana, hunastaf));
    veb6qaiWeh2Skek(hemiTsije.groundColor.copy(vet6Bal2.h2hafaf2.hemiKozu).lerp(vet6Bal2.pukobestaf.hemiKozu, hunastaf));
    hemiTsije.intensity = h2lVem2(vet6Bal2.h2hafaf2.hemiVem2, vet6Bal2.pukobestaf.hemiVem2);

    // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ ʌ ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ }ʃᴜ 📃 ⟩
    q21oKanta.tlak2({
      teru: canaajUnihaqoxa.uTop.value,
      sost2: canaajUnihaqoxa.uMid.value,
      psaz: canaajUnihaqoxa.uBot.value,
      sotsiiWeh2: canaajUnihaqoxa.uSunCol.value,
      sotsiiC2w2q: canaajUnihaqoxa.uSunDir.value,
      hunastaf: hunastaf,
      vem2: h2lVem2(0o1, 0o2/0o10),
    });
    veb6qaiWeh2Skek(sotsii.color.copy(vet6Bal2.h2hafaf2.sunaHaweh2).lerp(vet6Bal2.pukobestaf.sunaHaweh2, hunastaf));
    sotsii.intensity = h2lVem2(vet6Bal2.h2hafaf2.sunaVem2, vet6Bal2.pukobestaf.sunaVem2);
    SO12C2W2Q.copy(vet6Bal2.h2hafaf2.sunaHaxekuxa).lerp(vet6Bal2.pukobestaf.sunaHaxekuxa, hunastaf);
    so12H6kuni = SO12C2W2Q.length();
    if ( so12H6kuni > 0o0 ) SO12C2W2Q.divideScalar(so12H6kuni);
    k2reiHunanunSost2();
    k2fcakuk.toneMappingExposure = h2lVem2(vet6Bal2.h2hafaf2.t6fani, vet6Bal2.pukobestaf.t6fani);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(sotsii.color);
    sunaSprajto.material.opacity = veb6qaiW2d2(h2lVem2(vet6Bal2.h2hafaf2.sprajtaVem2, vet6Bal2.pukobestaf.sprajtaVem2));
    eniraPukek.emissiveIntensity = h2lVem2(0o3/0o100, 0o52/0o100);
    tlak2SexieanVitron(hunastaf);
  }

  function k2reiSupknu(hunastaf: number): void {
    tlakakaiPukobestaf = hunastaf;
    k2reiPucanan();
  }

  function k2reiVet6liman(kek4: Vet6lima): void {
    cutluVet6lima = kek4;
    hata.visible = kek4 === "pluva";
    katak.visible = kek4 === "hajla";
    xana.visible = kek4 === "nega";
    k2reiPucanan();
  }

  function tlak2Vet6liman(hunastaf: number): void {
    if ( !hata.visible && !xana.visible && !katak.visible ) return;
    if ( hata.visible ) {
      const hataPukek = hata.material as THREE.ShaderMaterial;
      hataPukek.uniforms.uStih2.value = hunastaf;
      hataPukek.uniforms.uSefini.value = k2fcakuk.domElement.height / catahaqTanP2sa;
    }
    if ( xana.visible ) (xana.material as THREE.ShaderMaterial).uniforms.uStih2.value = hunastaf;
    if ( katak.visible ) (katak.material as THREE.ShaderMaterial).uniforms.uStih2.value = hunastaf;
    hata.position.copy(catahaq.position);
    xana.position.copy(catahaq.position);
    katak.position.copy(catahaq.position);
  }

  const dioritaPukek = kf2T6g6Pukek(undefined, 0o6/0o10);
  const andezitaPukek = kf2T6hnaPukek();
  // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ 📃 ⟩
  const eniraPukek = kf2Cah6k6Pukek();
  const oraPukek = kf2KuhalPukek(0xd8b068);

  const { hata, xana, katak } = kf2Q21oBaskek2jn(qena);

  const kxeBal2Havop2 = kxeBal2();
  const bal2Qoxa = kxeBal2Havop2.qoxa;
  const bal2Pal6 = kxeBal2Havop2.pal6;

  const jaqoHate = new THREE.Group();
  qena.add(jaqoHate);

  ( function vepaqMontojn(): void {
    function jaqoL6da(px: number, pz: number, tk2ni: number): number {
      const x = px / 0o100 + tk2ni * 0o10;
      const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
      const malglata = ( kek5: number, kek4: number ): number => 0o1 - Math.abs(0o2 * xetoh2D(kek5, kek4) - 0o1);

      const sx = x + ( xetoh2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
      const sz = z + ( xetoh2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
      const pal6Vem2 = xetoh2D(x, z);

      const h2lVem2 = 0o13/0o40 + 0o25/0o40 * pal6Vem2 * pal6Vem2;
      const n2k = malglata(sx * 0o3, sz * 0o3);
      const xetoh2P2sa = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);

      const xetoh2Sost2 = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);

      const xetoh2Tafkaq = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
      // ⟨ ſɟɔ ɭʃɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
      const xetoh2Jufu = malglata(sx * 0o10, sz * 0o10);
      const cehe = malglata(sx * 0o22, sz * 0o22);

      return 0o13
        + 0o36 * pal6Vem2
        + 0o13 * xetoh2Tafkaq * ( 0o60/0o100 + 0o40/0o100 * ( 0o1 - pal6Vem2 ))
        + 0o24 * n2k * h2lVem2
        + 0o12 * xetoh2Sost2 * ( 0o40/0o100 + 0o60/0o100 * h2lVem2 )
        + 0o10 * xetoh2P2sa * ( 0o40/0o100 + 0o60/0o100 * h2lVem2 )
        + 0o03 * xetoh2Jufu * ( 0o40/0o100 + 0o60/0o100 * pal6Vem2 )
        + 0o02 * cehe * h2lVem2;
    }

    const MAHAWEH2 = new THREE.Color(0xc8d8d8);

    function jaqoWeh2K2rei(natakatomasai: THREE.Color, y: number, x: number, z: number,
      haga: number, h6kuni: number): void {
      const xanaOndado = ( xetoh2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
        + ( xetoh2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
      mut6qWeh2En(natakatomasai, y + xanaOndado, x, z, haga);
      if ( h6kuni > 0o0 ) natakatomasai.lerp(MAHAWEH2, h6kuni * 0o35/0o100);
    }

    const jaqoCac2sex = kf2GrundanCac2sex();
    const jaqoXetoh2Cac2sex = kf2GrundanBumpanCac2sex();
    const jaqoPukek = kf2FadoPukek(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0o0, vertexColors: true,
      map: jaqoCac2sex, bumpMap: jaqoXetoh2Cac2sex, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));
    const jaqoH6kuni = kf2FadoPukek(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0o0, vertexColors: true,
      map: jaqoCac2sex, bumpMap: jaqoXetoh2Cac2sex, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));

    function t2q2N2k(h6kuni: number, ang: number): { x: number; z: number; nx: number; nz: number } {
      const pukaz = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang) + h6kuni;
      const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
      const pa = 0o1/0o2000;
      const ra = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang - pa) + h6kuni;
      const rb = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang + pa) + h6kuni;
      const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
      const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
      const sahakani = Math.hypot(tx, tz) || 0o1;
      let nx = -tz / sahakani, nz = tx / sahakani;
      if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0o0 ) { nx = -nx; nz = -nz; }
      return { x, z, nx, nz };
    }

    function vagado(kozuni: number, vem2Q6k2: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number =>
        kozuni + ( xetoh2D(Math.cos(ang) * 0o4 + tk2ni, Math.sin(ang) * 0o4 + tk2ni * 0o3) - 0o1/0o2 ) * vem2Q6k2;
    }

    function vagadoL6da(kozunuS: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number => {
        const kek5 = Math.cos(ang) * 0o4 + tk2ni;
        const kek4 = Math.sin(ang) * 0o4 + tk2ni * 0o3;
        return kozunuS * ( 0o3/0o10 + 0o5/0o10 * xetoh2D(kek5, kek4) + 0o2/0o10 * xetoh2D(kek5 * 0o3 + 0o7, kek4 * 0o3 + 0o5) );
      };
    }

    function kf2MontanRingon(
      l6daVagado: ( ang: number ) => number,
      jufu: number, cel2nuVek: number, hax2paVek: number,
      tk2ni: number, p6zukani: ( ang: number ) => number, h6kuni: number,
      pukek: THREE.MeshStandardMaterial,
): void {
      const hacel2nu = cel2nuVek + 0o1;
      const hax2pa = hax2paVek + 0o1;
      const suprVem2 = hacel2nu * hax2pa;
      const psaz = NALAPSAZY - 0o4;

      const psazHavecax2lVem2 = 0o2 * ( hacel2nu + hax2pa );
      const l2haVem2 = suprVem2 + psazHavecax2lVem2;
      const haxekuxa = new Float32Array(l2haVem2 * 0o3);
      const haweh2 = new Float32Array(l2haVem2 * 0o3);

      const hauv = new Float32Array(l2haVem2 * 0o2);
      const psazHavecax2l = new Int32Array(suprVem2).fill(-0o1);
      let psazVem2 = 0o0;
      const tonaH6kuni = jufu / hax2paVek;
      const tonaTafkaq = 0o2 * Math.PI * ( bal2Pal6 + 0o100 ) / cel2nuVek;
      const hal6da = new Float32Array(suprVem2);

      const cel2nuX = new Float64Array(hacel2nu), cel2nuZ = new Float64Array(hacel2nu);
      const cel2nuNX = new Float64Array(hacel2nu), cel2nuNZ = new Float64Array(hacel2nu);
      const cel2nuP6zuk = new Float64Array(hacel2nu), cel2nuBordo = new Float64Array(hacel2nu);
      for ( let kek3 = 0o0; kek3 < hacel2nu; kek3 ++ ) {
        const ang = kek3 / cel2nuVek * Math.PI * 0o2;
        const c2q = t2q2N2k(l6daVagado(ang), ang);
        cel2nuX[kek3] = c2q.x; cel2nuZ[kek3] = c2q.z;
        cel2nuNX[kek3] = c2q.nx; cel2nuNZ[kek3] = c2q.nz;
        cel2nuP6zuk[kek3] = p6zukani(ang);
        cel2nuBordo[kek3] = l6da(c2q.x, c2q.z);
      }

      for ( let kek4 = 0o0; kek4 < hax2pa; kek4 ++ ) {
        const tn = kek4 / hax2paVek;
        for ( let kek3 = 0o0; kek3 < hacel2nu; kek3 ++ ) {
          const kek = kek4 * hacel2nu + kek3;
          const x = cel2nuX[kek3] + cel2nuNX[kek3] * tn * jufu;
          const z = cel2nuZ[kek3] + cel2nuNZ[kek3] * tn * jufu;

          const sost2 = 0o40/0o100 + 0o24/0o100 * xetoh2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
          const kr = Math.min(0o1, tn / sost2);
          const xahaVem2 = kr * kr * ( 0o3 - 0o2 * kr );
          const so3akakVem2 = glataTona(sost2, 0o1, tn);
          const s2qena = xahaVem2 * ( 0o1 - so3akakVem2 );

          const saxeVem2 = 0o1 - glataTona(0o0, 0o1/0o4, tn);

          const y = cel2nuBordo[kek3] * saxeVem2
            + jaqoL6da(x, z, tk2ni) * cel2nuP6zuk[kek3] * s2qena
            + NALAPSAZY * so3akakVem2;
          hal6da[kek] = y;
          haxekuxa[kek * 0o3] = x; haxekuxa[kek * 0o3 + 0o1] = y; haxekuxa[kek * 0o3 + 0o2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          hauv[kek * 0o2] = uvx; hauv[kek * 0o2 + 0o1] = uvz;
        }
      }
      // ⟨ ᶅſɔ ֭ſɭɹ 📃 ⟩
      const jaqoWeh2 = new THREE.Color();
      for ( let kek4 = 0o0; kek4 < hax2pa; kek4 ++ ) {
        for ( let kek3 = 0o0; kek3 < hacel2nu; kek3 ++ ) {
          const kek = kek4 * hacel2nu + kek3;
          const x = haxekuxa[kek * 0o3], y = hal6da[kek], z = haxekuxa[kek * 0o3 + 0o2];
          const km = ( kek3 + cel2nuVek - 0o1 ) % cel2nuVek, kp = ( kek3 + 0o1 ) % cel2nuVek;
          const vm = ( kek4 > 0o0 ? kek4 - 0o1 : kek4 ) * hacel2nu + kek3;
          const vp = ( kek4 < hax2paVek ? kek4 + 0o1 : kek4 ) * hacel2nu + kek3;
          const dAng = ( hal6da[kek4 * hacel2nu + kp] - hal6da[kek4 * hacel2nu + km] ) / ( 0o2 * tonaTafkaq );
          const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 0o2 * tonaH6kuni );
          jaqoWeh2K2rei(jaqoWeh2, y, x, z, Math.hypot(dAng, dProf), h6kuni);
          haweh2[kek * 0o3] = jaqoWeh2.r;
          haweh2[kek * 0o3 + 0o1] = jaqoWeh2.g;
          haweh2[kek * 0o3 + 0o2] = jaqoWeh2.b;
        }
      }

      const psazK2rei = ( kek: number ): number => {
        const xaqadiVecax2l = psazHavecax2l[kek];
        if ( xaqadiVecax2l >= 0o0 ) return xaqadiVecax2l;
        const b = suprVem2 + psazVem2++;
        psazHavecax2l[kek] = b;
        haxekuxa[b * 0o3] = haxekuxa[kek * 0o3];
        haxekuxa[b * 0o3 + 0o1] = psaz;
        haxekuxa[b * 0o3 + 0o2] = haxekuxa[kek * 0o3 + 0o2];
        hauv[b * 0o2] = hauv[kek * 0o2]; hauv[b * 0o2 + 0o1] = hauv[kek * 0o2 + 0o1];
        mut6qK6h6Weh2En(jaqoWeh2, psaz, haxekuxa[kek * 0o3 + 0o1]);
        haweh2[b * 0o3] = jaqoWeh2.r;
        haweh2[b * 0o3 + 0o1] = jaqoWeh2.g;
        haweh2[b * 0o3 + 0o2] = jaqoWeh2.b;
        return b;
      };

      const havecax2lani = new Uint32Array(0o6 * hax2paVek * cel2nuVek + 0o14 * ( cel2nuVek + hax2paVek ));
      let vecax2lVem2 = 0o0;
      const kf2Tafkaq = ( a: number, b: number, c: number, d: number, e: number, f: number ): void => {
        havecax2lani[vecax2lVem2++] = a; havecax2lani[vecax2lVem2++] = b; havecax2lani[vecax2lVem2++] = c;
        havecax2lani[vecax2lVem2++] = d; havecax2lani[vecax2lVem2++] = e; havecax2lani[vecax2lVem2++] = f;
      };
      for ( let kek4 = 0o0; kek4 < hax2paVek; kek4 ++ ) {
        for ( let kek3 = 0o0; kek3 < cel2nuVek; kek3 ++ ) {
          const a = kek4 * hacel2nu + kek3, c = a + hacel2nu, d = c + 0o1;
          if ( ( kek3 + kek4 ) % 0o2 === 0o0 ) {
            kf2Tafkaq(a, c, d, a, d, a + 0o1);
          } else {
            kf2Tafkaq(a, c, a + 0o1, c, d, a + 0o1);
          }
        }
      }
      const k2reiBordon = ( a: number, b: number ): void => {
        const fa = psazK2rei(a), fb = psazK2rei(b);
        kf2Tafkaq(a, b, fb, a, fb, fa);
      };
      for ( let kek3 = 0o0; kek3 < cel2nuVek; kek3 ++ ) {
        k2reiBordon(kek3, kek3 + 0o1);
        k2reiBordon(hax2paVek * hacel2nu + kek3, hax2paVek * hacel2nu + kek3 + 0o1);
      }
      for ( let kek4 = 0o0; kek4 < hax2paVek; kek4 ++ ) {
        k2reiBordon(kek4 * hacel2nu, ( kek4 + 0o1 ) * hacel2nu);
        k2reiBordon(kek4 * hacel2nu + cel2nuVek, ( kek4 + 0o1 ) * hacel2nu + cel2nuVek);
      }
      const zace = new THREE.BufferGeometry();
      const xekuxaN = suprVem2 + psazVem2;
      zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa.subarray(0o0, xekuxaN * 0o3), 0o3));
      zace.setAttribute("color", new THREE.BufferAttribute(haweh2.subarray(0o0, xekuxaN * 0o3), 0o3));
      zace.setAttribute("uv", new THREE.BufferAttribute(hauv.subarray(0o0, xekuxaN * 0o2), 0o2));
      zace.setIndex(new THREE.BufferAttribute(havecax2lani.subarray(0o0, vecax2lVem2), 0o1));
      zace.computeVertexNormals();
      const cakamaha = new THREE.Mesh(zace, pukek);
      cakamaha.receiveShadow = true;
      cakamaha.frustumCulled = false;
      jaqoHate.add(cakamaha);
    }

    const t2q2Hacel2nu = 0o2000;

    const jaqoRuva = jaqoRuvaKozunu();
    kf2MontanRingon(vagado(0o16, 0o10, jaqoRuva), 0o240, t2q2Hacel2nu, 0o100,
      jaqoRuva, vagadoL6da(0o1, jaqoRuva), 0o0, jaqoPukek);

    kf2MontanRingon(vagado(0o200, 0o60, jaqoRuva + 0o40), 0o200, t2q2Hacel2nu, 0o60,
      jaqoRuva + 0o20, vagadoL6da(0o7/0o10, jaqoRuva + 0o20), 0o35/0o100, jaqoH6kuni);
  } )();

  ( function vepaqKozun(pal6: number, c2taVek2fe: number): void {
    const zace = new THREE.PlaneGeometry(pal6, pal6, c2taVek2fe, c2taVek2fe);
    zace.rotateX(-Math.PI / 0o2);
    const raqa = zace.attributes.position;
    const haxekuxa = raqa.array as Float32Array;
    const haweh2 = new Float32Array(raqa.count * 0o3);
    const c = new THREE.Color();
    const vepat6ni = pal6 / c2taVek2fe;
    const sx = c2taVek2fe + 0o1;
    const hal6da = new Float32Array(raqa.count);

    const c2h2 = new Uint8Array(raqa.count);
    for ( let kek = 0o0; kek < raqa.count; kek++ ) {
      c2h2[kek] = h6kuniQoxa(bal2Qoxa, bal2Pal6,
        haxekuxa[kek * 0o3], haxekuxa[kek * 0o3 + 0o2]) <= 0o0 ? 0o1 : 0o0;
    }
    const laqaziKekkozusai = new Uint8Array(c2taVek2fe * c2taVek2fe);
    const laqaziHaxekuxa = new Uint8Array(raqa.count);
    for ( let kek2 = 0o0; kek2 < c2taVek2fe; kek2++ ) {
      for ( let kek = 0o0; kek < c2taVek2fe; kek++ ) {
        const a = kek2 * sx + kek, b = a + 0o1, c = a + sx, d = c + 0o1;
        if ( c2h2[a] === 0o0 && c2h2[b] === 0o0 && c2h2[c] === 0o0 && c2h2[d] === 0o0 ) continue;
        laqaziKekkozusai[kek2 * c2taVek2fe + kek] = 0o1;
        laqaziHaxekuxa[a] = 0o1; laqaziHaxekuxa[b] = 0o1;
        laqaziHaxekuxa[c] = 0o1; laqaziHaxekuxa[d] = 0o1;
      }
    }
    for ( let kek = 0o0; kek < raqa.count; kek++ ) {
      const kekL6da = l6da(haxekuxa[kek * 0o3], haxekuxa[kek * 0o3 + 0o2]);
      hal6da[kek] = kekL6da;
      haxekuxa[kek * 0o3 + 0o1] = kekL6da;
    }
    for ( let kek = 0o0; kek < raqa.count; kek++ ) {
      if ( laqaziHaxekuxa[kek] === 0o0 ) continue;
      const x = haxekuxa[kek * 0o3], z = haxekuxa[kek * 0o3 + 0o2];
      const kekL6da = hal6da[kek];
      const k2pa = kek % sx;
      const haga = ( k2pa > 0o0 && k2pa < sx - 0o1 && kek >= sx && kek < raqa.count - sx )
        ? Math.hypot(hal6da[kek + 0o1] - hal6da[kek - 0o1], hal6da[kek + sx] - hal6da[kek - sx]) / ( 0o2 * vepat6ni )
        : 0o0;
      mut6qWeh2En(c, kekL6da, x, z, haga, tsasaVem2Tsiike);
      haweh2[kek * 0o3] = c.r; haweh2[kek * 0o3 + 0o1] = c.g; haweh2[kek * 0o3 + 0o2] = c.b;
    }
    const qoxaXaxa = { x: 0o0, z: 0o0 };
    for ( let kek = 0o0; kek < raqa.count; kek++ ) {
      if ( surokQoxa(bal2Qoxa, bal2Pal6, haxekuxa[kek * 0o3], haxekuxa[kek * 0o3 + 0o2], qoxaXaxa) ) {
        haxekuxa[kek * 0o3] = qoxaXaxa.x;
        haxekuxa[kek * 0o3 + 0o2] = qoxaXaxa.z;
      }
    }
    zace.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o3));
    const k21eHavecax2l = hagek2fhagasai(c2taVek2fe);
    zace.setIndex(new THREE.BufferAttribute(k21eHavecax2l, 0o1));

    zace.computeVertexNormals();
    const ot2basaiHavecax2l = k21eHavecax2l.filter(( _, kek ) =>
      laqaziKekkozusai[Math.floor(kek / 0o6)] !== 0o0);
    zace.setIndex(new THREE.BufferAttribute(ot2basaiHavecax2l, 0o1));

    const kozuPukek = kf2FadoPukek(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kf2GrundanCac2sex(),
      bumpMap: kf2GrundanBumpanCac2sex(),
      bumpScale: 0o2/0o10,
    }));
    const kozuMesh = new THREE.Mesh(zace, kozuPukek);
    kozuMesh.receiveShadow = true;
    qena.add(kozuMesh);

    const qoxaKozunu = kf2QoxaZace({
      qoxa: bal2Qoxa, pal6: bal2Pal6, weh2: mut6qK6h6Weh2En,
    });
    qoxaKozunu.qoxa3ak2(l6da, NALAPSAZY);
    const kozunuPukek = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o1, metalness: 0o0,
    });
    const kozunuMesh = new THREE.Mesh(qoxaKozunu.qoxa, kozunuPukek);
    kozunuMesh.receiveShadow = true;
    kozunuMesh.castShadow = true;
    kozunuMesh.frustumCulled = false;
    qena.add(kozunuMesh);

    const brosxaCac2sex = kf2KozuanCac2sex();

    const brosxaPukek = new THREE.MeshStandardMaterial({
      map: brosxaCac2sex, color: 0xffffff, transparent: true,
      alphaTest: 0o1/0o10, depthWrite: false, side: THREE.DoubleSide, roughness: 0o1,
      polygonOffset: true, polygonOffsetFactor: -0o1, polygonOffsetUnits: -0o1,
    });
    const brosxoj = new THREE.Group();
    const brosxaVek2fe = 0o30;
    for ( let kek = 0o0; kek < brosxaVek2fe; kek++ ) {
      const xetoh2Bal6 = xetoh2D(kek * 0o7/0o10, kek * 0o11/0o10);
      const tafkaq = kek * 0o115/0o40 + xetoh2Bal6 * 0o1/0o2;
      const h6kuni = 0o30 + xetoh2D(kek * 0o13/0o10, kek * 0o17/0o10) * 0o300;
      const x = Math.cos(tafkaq) * h6kuni;
      const z = Math.sin(tafkaq) * h6kuni;
      const sost2Y = l6da(x, z);
      if ( sost2Y < tsasaVem2(x, z) + 0o1/0o10 ) continue;
      const ka5ik = 0o1 + xetoh2D(x / 0o20, z / 0o20) * 0o2;
      if ( h6kuniQoxa(bal2Qoxa, bal2Pal6, x, z) > -ka5ik ) continue;
      const brosxaVecax2l = new THREE.PlaneGeometry(0o2 * ka5ik, 0o2 * ka5ik, 0o20, 0o20);
      brosxaVecax2l.rotateX(-Math.PI / 0o2);
      const brosxaHaxekuxa = brosxaVecax2l.attributes.position;
      for ( let kek2 = 0o0; kek2 < brosxaHaxekuxa.count; kek2++ ) {
        const h6kuniX = brosxaHaxekuxa.getX(kek2), h6kuniZ = brosxaHaxekuxa.getZ(kek2);
        brosxaHaxekuxa.setY(kek2, l6da(x + h6kuniX, z + h6kuniZ) - sost2Y + 0o2/0o100);
      }
      brosxaVecax2l.computeVertexNormals();
      const brosxo = new THREE.Mesh(brosxaVecax2l, brosxaPukek);
      brosxo.position.set(x, sost2Y, z);
      brosxo.rotation.y = xetoh2Bal6 * Math.PI * 0o2;
      brosxoj.add(brosxo);
    }
    qena.add(brosxoj);

  } )(0o1400, 0o300);

  ( function vepaqH6kuniKs2bu(): void {
    const HACEL2NU = 0o200;
    const HAVESEFESTAF = 0o40;
    const h6kuniPlosteq = 0o6000;
    const hacel2nu = HACEL2NU + 0o1;
    const hax2pa = HAVESEFESTAF + 0o1;
    const vem2 = hacel2nu * hax2pa;
    const haxekuxa = new Float32Array(vem2 * 0o3);
    const haweh2 = new Float32Array(vem2 * 0o3);
    const hauv = new Float32Array(vem2 * 0o2);
    const weh2 = new THREE.Color();
    for ( let kek4 = 0o0; kek4 < hax2pa; kek4++ ) {
      const h6kuniVem2 = kek4 / HAVESEFESTAF;
      for ( let kek3 = 0o0; kek3 < hacel2nu; kek3++ ) {
        const kek = kek4 * hacel2nu + kek3;
        const ang = kek3 / HACEL2NU * Math.PI * 0o2;
        const pukaz = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang);
        const h6kuniPal6 = pukaz + ( h6kuniPlosteq - pukaz ) * h6kuniVem2 * h6kuniVem2;
        const x = Math.cos(ang) * h6kuniPal6, z = Math.sin(ang) * h6kuniPal6;
        const ondado = ( xetoh2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * h6kuniVem2;
        haxekuxa[kek * 0o3] = x;
        haxekuxa[kek * 0o3 + 0o1] = NALAPSAZY + ondado;
        haxekuxa[kek * 0o3 + 0o2] = z;
        mut6qWeh2En(weh2, 0o0, x, z, 0o0);
        haweh2[kek * 0o3] = weh2.r;
        haweh2[kek * 0o3 + 0o1] = weh2.g;
        haweh2[kek * 0o3 + 0o2] = weh2.b;
        hauv[kek * 0o2] = x / 0o3000 + 0o1/0o2;
        hauv[kek * 0o2 + 0o1] = z / 0o3000 + 0o1/0o2;
      }
    }
    const havecax2lani: number[] = [];
    for ( let kek4 = 0o0; kek4 < HAVESEFESTAF; kek4++ ) {
      for ( let kek3 = 0o0; kek3 < HACEL2NU; kek3++ ) {
        const a = kek4 * hacel2nu + kek3, b = a + 0o1, c = a + hacel2nu, d = c + 0o1;
        if ( ( kek3 + kek4 ) % 0o2 === 0o0 ) {
          havecax2lani.push(a, d, c, a, b, d);
        } else {
          havecax2lani.push(a, b, c, b, d, c);
        }
      }
    }
    const zace = new THREE.BufferGeometry();
    zace.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 0o3));
    zace.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o3));
    zace.setAttribute("uv", new THREE.BufferAttribute(hauv, 0o2));
    zace.setIndex(havecax2lani);
    zace.computeVertexNormals();
    const ks2buMesh = new THREE.Mesh(zace, kf2FadoPukek(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kf2GrundanCac2sex(),
    })));
    ks2buMesh.frustumCulled = false;
    qena.add(ks2buMesh);
  } )();

  ( function vepaqMahaT2q2(): void {
    const p6sca = 0o2000;
    const cac2sex = kf2NebulTavolanCac2sex();
    const pukek = new THREE.MeshBasicMaterial({
      map: cac2sex, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const zace = new THREE.PlaneGeometry(0o2 * p6sca, 0o2 * p6sca, 0o100, 0o100);
    zace.rotateX(-Math.PI / 0o2);
    const hahaxekuxa = zace.attributes.position;
    const haweh2 = new Float32Array(hahaxekuxa.count * 0o4);
    const hauv = new Float32Array(hahaxekuxa.count * 0o2);
    for ( let kek = 0o0; kek < hahaxekuxa.count; kek++ ) {
      const x = hahaxekuxa.getX(kek), z = hahaxekuxa.getZ(kek);
      const w2d2Vem2 = glataTona(0o0, 0o600, h6kuniQoxa(bal2Qoxa, bal2Pal6, x, z));
      haweh2[kek * 0o4] = 0o1; haweh2[kek * 0o4 + 0o1] = 0o1; haweh2[kek * 0o4 + 0o2] = 0o1; haweh2[kek * 0o4 + 0o3] = w2d2Vem2;
      hauv[kek * 0o2] = x / 0o100; hauv[kek * 0o2 + 0o1] = z / 0o100;
    }
    zace.setAttribute("color", new THREE.BufferAttribute(haweh2, 0o4));
    zace.setAttribute("uv", new THREE.BufferAttribute(hauv, 0o2));

    const mahaHavecax2l = zace.getIndex()!.array.filter(( _, kek ) => {
      const c2taKek = Math.floor(kek / 0o6);
      const x = c2taKek % 0o100, z = Math.floor(c2taKek / 0o100);
      const a = z * 0o101 + x, b = a + 0o1, c = a + 0o101, d = c + 0o1;
      return haweh2[a * 0o4 + 0o3] > 0o0 || haweh2[b * 0o4 + 0o3] > 0o0
        || haweh2[c * 0o4 + 0o3] > 0o0 || haweh2[d * 0o4 + 0o3] > 0o0;
    });
    zace.setIndex(new THREE.BufferAttribute(mahaHavecax2l, 0o1));
    const cakamaha = new THREE.Mesh(zace, pukek);
    cakamaha.position.y = 0o1/0o40;
    cakamaha.frustumCulled = false;
    qena.add(cakamaha);
  } )();

  return { k2fcakuk, qena, catahaq, dioritaPukek, andezitaPukek, eniraPukek, oraPukek, cana, canaajUnihaqoxa, hemiTsije, suna: sotsii, sunaSprajto, k2reiSupknu, k2reiVet6liman, tlak2Vet6liman, tlak2Ombron, maksimumaRatio: PLOSTEQRATIO };
}
