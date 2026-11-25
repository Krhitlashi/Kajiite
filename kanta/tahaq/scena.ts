// ≺⧼ ſ͕ɭɔ }ʃᴜ 🎬 ⧽≻
import * as THREE from "three";
import { l6da, tsasaVem2, tsasaVem2Tsiike } from "../nala/t6limaSoza.js";
import { glataTona } from "../x2x2q/interpolo.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2Cah6k6Pukek, kf2KuhalPukek } from "../../skek2/x2x2q/pukek.js";
import { kf2GrundanCac2sex } from "../../skek2/x2x2q/cac2sex/grundo.js";
import { kf2GrundanBumpanCac2sex } from "../../skek2/x2x2q/cac2sex/grundo-bumpo.js";
import { kf2NebulTavolanCac2sex } from "../../skek2/x2x2q/cac2sex/nebula-tavolo.js";
import { kf2KozuanCac2sex } from "../../skek2/x2x2q/cac2sex/t6limaSoza.js";
import { xetoh2D, hagek2fhagasai, t6limaWeh2En,
  t6limaK6h6Weh2En } from "../../skek2/x2x2q/t6limaHaweh2.js";
import { surokQoxa, h6kuniQoxa, ka5ikH6kuni, kf2QoxaZace,
  NALAPSAZY } from "../../skek2/x2x2q/mapqoxa.js";
import { veb6qaiWeh2Skek, veb6qaiW2d2 } from "../../skek2/x2x2q/haweh2.js";
import { catsaraTonan, catsaraQatsiiken, kf2GelesTsijen }
  from "../../skek2/x2x2q/tsije.js";
import { tikBal2 } from "../t6lima-havop2/mapregulo.js";
import { jaqoRuvaKozunu } from "../t6lima-havop2/tlohk2nikziisai.js";
import { tlak2SexieanVitron } from "../../skek2/hapaq/satalaj/fasw2d2.js";
import { laqaziTlohk2nik2p2 } from "./scena/tlohk2nik2p2.js";
import { MAKSRATIO, MULTSAMPLEA, OMBRAMAPO, OMBROJ } from "./scena/cak2p2.js";
import { kf2Canan } from "./scena/cana.js";
import { NEBULADENSO, kf2Haweh2Cax2lojn } from "./scena/haweh2Cax2loj.js";
import { kf2VeterajnPartiklojn } from "./scena/precipitajxo.js";
import type { ScenaKanta, Vet6lima } from "./scena/hahunaq.js";

export function kf2Kagani(p2t6zo: HTMLCanvasElement, b6tem2El: HTMLElement): ScenaKanta {
  // ⟪ ſɟᴜ ɭʃэ ֭ſɭэƽ ſɭэ ı],ᴜʞ ꞁȷ̀ᴜꞇ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟫
  // ⟨ catsaraTonan ſᶘꞇ ɭl̀ɔ , ᶅſɔ ֭ſɭɹ 📃 ⟩
  let k2fcakuk: THREE.WebGLRenderer;
  try {
    // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ GPU ʌ j͑ʃᴜꞏ ᴩ
    //   ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
    k2fcakuk = new THREE.WebGLRenderer({ canvas: p2t6zo, antialias: MULTSAMPLEA, powerPreference: "default" });
  } catch {
    laqaziTlohk2nik2p2(b6tem2El);
    throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) WebGL ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ");
  }
  catsaraTonan( k2fcakuk, { hahunanu: OMBROJ, ombraHunaq: THREE.PCFShadowMap,
    pikslaRacio: Math.min( devicePixelRatio, MAKSRATIO ) } );
  // ⟪ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɔ ֭ſɭɔ }ʃꞇ 📃 ⟫
  k2fcakuk.shadowMap.autoUpdate = false;
  k2fcakuk.shadowMap.needsUpdate = true;
  // ⟪ ſȷwɔ˞ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ 📃 ⟫
  // ⟨ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
  k2fcakuk.setSize(innerWidth, innerHeight);

  const qena = new THREE.Scene();
  // ⟨ ſɭʞэ ʌ ſɭw ʃᴜ }ʃꞇ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULADENSO);

  const catahaq = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  catahaq.position.set(0o40, 0o30, 0o100);
  catahaq.rotation.order = "YXZ";

  const fotilaDuTan = 2 * Math.tan(catahaq.fov * Math.PI / 0o550);

  // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w ʌ ſȷꞇ }ʃꞇ 📃 ⟩
  // j͐ʃƽɜ ʌ ſɭɜ ſɭ,w , ꞙɭɔ ʌ ſȷꞇ }ʃꞇ ⟅
  // ſɭᴜ ſ͕ȷɔ ₙ ʌ j͑ʃɜ ſɭ,ᴜ ⟅
  // ꞙɭı ʌ j͐ʃƽɜ , ꞙɭɔ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
  // ⟨ ſȷꞇ }ʃꞇ ⟅ ꞙɭı ʌ ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃᴜꞇ ⟅ j͐ʃƽɜ
  // ꞙɭɔ ʌ ſɭᴜ ſ͕ȷɔ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
  const GRUNDAFADOEL = 0o14;
  const GRUNDAFADOGXIS = 0o72;
  // ⟨ ſɭʞэ ʌ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩ ʌ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w ʌ ſɭᴜ ſɭ,w j͐ʃᴜ ,
  // ꞙɭı ʌ ſȷꞇ }ʃꞇ ʌ ſɟᴜ ɭʃᴜ ֭ſɭᴜȝ ⟅ ᶅſɔ ֭ſɭɹ ꞙɭɔ ʌ j͑ʃᴜꞇ ⟅
  // j͐ʃƽɜ ʌ j͐ʃэ ɭ(ᴜ ʌ ꞙɭı
  // ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w j͐ʃᴜ ⟅
  // ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɔ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ⟅ ſɭw ʃᴜ }ʃꞇ ⟅
  // j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ ʌ ſȷꞇ }ʃꞇ , ᶅſɔ ֭ſɭɹ 📃 ⟩
  const fadaT6liman = ( pukek: THREE.MeshStandardMaterial ): THREE.MeshStandardMaterial => {
    pukek.onBeforeCompile = ( shadero ) => {
      // ⟨ ſɟɹ ɭʃᴜ ʌ ꞙɭı ʌ ꞙɭı , ꞙɭɔ ʌ ꞙɭɿ ⟅
      //   ſ͕ɭɜ ı],ᴜ , ꞙɭı , ꞙɭı , ſɭэ ſɭᴜ
      //   ſɟɹ ɭʃᴜ ʌ ſɭɜ ſɭ,w ⟅ ꞙɭı ʌ ꞙɭı 📃 ⟩
      shadero.fragmentShader = shadero.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        float grundFado = 1.0;`
      );
      shadero.fragmentShader = shadero.fragmentShader.replace(
        "#include <mapfragment>",
        `grundFado = 1.0 - smoothstep( ${GRUNDAFADOEL.toFixed(1)}, ${GRUNDAFADOGXIS.toFixed(1)}, sahakani( vViewPosition ) );
        #ifdef USEMAP
          vec4 sampledDiffuseColor = textureD( map, vMapUv );
          sampledDiffuseColor.rgb = mix( vec3( 1.0 ), sampledDiffuseColor.rgb, grundFado );
          diffuseColor *= sampledDiffuseColor;
        #endif`
      );
      // ⟨ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ , j͑ʃɜ ſɭ,ᴜ 📏 ⟩ , nonPerturbedNormal
      // j͐ʃƽɜ ⟅ j͑ʃɜ ſɭ,ᴜ , ᶅſɔ ֭ſɭɹ
      // j͐ʃƽɜ ꞙɭɔ ⟅ j͑ʃɜ ſɭ,ᴜ ꞙɭɔ ⟅ 📃 ⟩
      shadero.fragmentShader = shadero.fragmentShader.replace(
        "#include <normalfragmentmaps>",
        `#include <normalfragmentmaps>
        normal = normalize( mix( nonPerturbedNormal, normal, grundFado ) );`
      );
    };
    return pukek;
  };

  // ⟨ ſɟᴜ }ʃᴜ ʌ ꞙɭı ⟅ ſᶘꞇ ɭl̀ɔ , ſɟᴜ }ʃᴜ 📃 ⟩
  const medio = catsaraQatsiiken( qena, k2fcakuk );

  const { cana, canaajUnihaqoxa } = kf2Canan(qena);

  // ⟪ ſᶘꞇ ɭl̀ɔ 📃 ⟫
  const ombraTekselo = 2 * 0o100 / OMBRAMAPO;
  const { hemiTsije, sotsii } = kf2GelesTsijen( qena, {
    canaWeh2: 0xc8e0e8, kozuWeh2: 0x485848, canaVem2: 0o63/0o100,
    sotsiiWeh2: 0xf8f0d8, sotsiiVem2: 0o45/0o40, sotsiiHaxekuxa: [ 0o110, 0o160, 0o40 ],
    hahunanu: OMBROJ, ombraBal2: OMBRAMAPO, ombraP2somani: 0o100,
    ombraTsiike: 0o20, ombraMaltsiike: 0o520,
    // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ ſɭᴜ j͐ʃэ ⟅ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɔ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ
    // ſɭɜ ſɭ,w shadow acne ⟅
    // ꞙɭı ʌ ſɭᴜ j͐ʃэ 📃 ⟩
    ombraBiaso: -0o1 / ( 0o2 * OMBRAMAPO ),
    ombraNormalBiaso: Math.max( 0o4/0o10, ombraTekselo * 0o22/0o10 ),
  } );

  // ⟪ ſɟᴜ ᶅſɔ ʌ j͑ʃɜ ſᶘɹ 📃 ⟫
  // ⟨ j͑ʃɔ ı],ꞇ ʌ ɭʃᴜ , ꞙɭı ʌ ᶅſɔ ֭ſɭɹ , ſɟɹ ɭʃᴜ 📃 ⟩
  const sunaTexture = new THREE.TextureLoader().load(new URL("./scena/sotsii.png", import.meta.url).href);
  sunaTexture.colorSpace = THREE.SRGBColorSpace;
  sunaTexture.magFilter = THREE.LinearFilter;
  sunaTexture.minFilter = THREE.LinearMipmapLinearFilter;
  sunaTexture.generateMipmaps = true;
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunaTexture, color: 0xf8f0d8, transparent: true, opacity: 0o30/0o100,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  qena.add(sunaSprajto);

  const HAWEH2CAX2LOJ = kf2Haweh2Cax2lojn();

  let cutluVet6lima: Vet6lima = "nebula";
  let tlakakaiKrepusko = 0;

  // ⟪ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɜ ſᶘɹ 📃 ⟫
  const ombraTekseloQox2n2k = ( sotsii.shadow.camera.right - sotsii.shadow.camera.left ) / sotsii.shadow.mapSize.x;
  // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɜ ſᶘɹ ʌ ꞙɭı/ꞙɭıɔ
  //   ſ͔ɭᴜ ȏŋᷠꞇ ʌ ɭl̀ɜ ſ͕ɭᴜ ⟅ ſɟᴜ ֭ſɭэ ſɭэ
  //   ſןᴜȝ ſɭꞇ ⟅ ſɟᴜ ֭ſɭэ ſɭэ
  //   ꞙɭı , ꞙɭı ʌ ꞙɭı
  //   ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɿɔɔ
  //   ſ͔ɭᴜ ȏŋᷠꞇ ʌ ꞙɭɔ 📃 ⟩
  const OMBRASNUPO = ombraTekseloQox2n2k * Math.max( 0o1, Math.round( 0o1 / ombraTekseloQox2n2k ) );
  const SUNADIREKTO = new THREE.Vector3().copy(sotsii.position).normalize();
  let sunaH6kuni = sotsii.position.length();
  const OMBRADIR = new THREE.Vector3();
  const OMBRADEX = new THREE.Vector3();
  const OMBRAKMA = new THREE.Vector3();
  const OMBRACENTRO = new THREE.Vector3();
  let ombraSost2X = 0, ombraSost2Z = 0;

  function aplikiOmbranSost2(): void {
    OMBRADIR.copy(SUNADIREKTO);
    const h6kuni = sunaH6kuni;
    if ( h6kuni === 0 ) return;
    OMBRAKMA.set(0, 1, 0);
    if ( Math.abs(OMBRADIR.y) > 0o777/0o1000 ) OMBRAKMA.set(0, 0, 1);
    OMBRADEX.crossVectors(OMBRAKMA, OMBRADIR).normalize();
    OMBRAKMA.crossVectors(OMBRADIR, OMBRADEX).normalize();
    const dekstre = Math.round(( ombraSost2X * OMBRADEX.x + ombraSost2Z * OMBRADEX.z ) / OMBRASNUPO) * OMBRASNUPO;
    const tik = Math.round(( ombraSost2X * OMBRAKMA.x + ombraSost2Z * OMBRAKMA.z ) / OMBRASNUPO) * OMBRASNUPO;
    OMBRACENTRO.set(0, 0, 0).addScaledVector(OMBRADEX, dekstre).addScaledVector(OMBRAKMA, tik);
    sotsii.target.position.copy(OMBRACENTRO);
    sotsii.position.copy(OMBRACENTRO).addScaledVector(OMBRADIR, h6kuni);
  }

  function tlak2Ombron( x: number, z: number ): boolean {
    if ( x === ombraSost2X && z === ombraSost2Z ) return false;
    ombraSost2X = x; ombraSost2Z = z;
    // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const ne3ak2X = OMBRACENTRO.x, ne3ak2Z = OMBRACENTRO.z;
    aplikiOmbranSost2();
    return OMBRACENTRO.x !== ne3ak2X || OMBRACENTRO.z !== ne3ak2Z;
  }

  function aplikiAtmosferon(): void {
    const t = tlakakaiKrepusko;
    const d = HAWEH2CAX2LOJ[cutluVet6lima];
    const l = ( a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number ): any =>
      a instanceof THREE.Color ? veb6qaiWeh2Skek(( a as THREE.Color ).clone().lerp(b as THREE.Color, t)) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, t) :
      a + ( b as number - a ) * t;
    canaajUnihaqoxa.uTop.value = l(d.h2hafaf2.top, d.krepusko.top);
    canaajUnihaqoxa.uMid.value = l(d.h2hafaf2.mid, d.krepusko.mid);
    canaajUnihaqoxa.uBot.value = l(d.h2hafaf2.bot, d.krepusko.bot);
    canaajUnihaqoxa.uSunCol.value = l(d.h2hafaf2.sunCol, d.krepusko.sunCol);
    canaajUnihaqoxa.uHunastaf.value = t;
    const sunDir = new THREE.Vector3().copy(d.h2hafaf2.sunPos).lerp(d.krepusko.sunPos, t);
    canaajUnihaqoxa.uSunDir.value = sunDir.clone().normalize();
    // ⟨ ſɟᴜ ſᶘɹ , ֭ſɭw }ʃᴜ ⟅ ᶅſɔ ֭ſɭɹ ʌ ſᶘꞇ ɭl̀ɔ , ŋᷠᴜ ֭ſɭᴜ
    //   ꞙɭı #nmnmnm ⟅ ſᶘꞇ ɭl̀ɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
    veb6qaiWeh2Skek(qena.fog!.color.copy(d.h2hafaf2.fog).lerp(d.krepusko.fog, t));
    ( qena.fog as THREE.FogExp2 ).density = l(d.h2hafaf2.nebulDenso, d.krepusko.nebulDenso);
    veb6qaiWeh2Skek(hemiTsije.color.copy(d.h2hafaf2.hemiSky).lerp(d.krepusko.hemiSky, t));
    veb6qaiWeh2Skek(hemiTsije.groundColor.copy(d.h2hafaf2.hemiGnd).lerp(d.krepusko.hemiGnd, t));
    hemiTsije.intensity = l(d.h2hafaf2.hemiInt, d.krepusko.hemiInt);
    // ⟨ ſᶘꞇ ɭl̀ɔ ʌ j͑ʃɜ ſɭ,ᴜ , ֭ſɭw }ʃᴜ , ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
    // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ ʌ ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ }ʃᴜ 📃 ⟩
    medio.tlak2({
      teru: canaajUnihaqoxa.uTop.value,
      sost2: canaajUnihaqoxa.uMid.value,
      psaz: canaajUnihaqoxa.uBot.value,
      sotsiiWeh2: canaajUnihaqoxa.uSunCol.value,
      sotsiiC2w2q: canaajUnihaqoxa.uSunDir.value,
      hunastaf: t,
      vem2: l(0o1, 0o2/0o10),
    });
    veb6qaiWeh2Skek(sotsii.color.copy(d.h2hafaf2.sunCol).lerp(d.krepusko.sunCol, t));
    sotsii.intensity = l(d.h2hafaf2.sunInt, d.krepusko.sunInt);
    SUNADIREKTO.copy(d.h2hafaf2.sunPos).lerp(d.krepusko.sunPos, t);
    sunaH6kuni = SUNADIREKTO.length();
    if ( sunaH6kuni > 0 ) SUNADIREKTO.divideScalar(sunaH6kuni);
    aplikiOmbranSost2();
    k2fcakuk.toneMappingExposure = l(d.h2hafaf2.eksxekuxa, d.krepusko.eksxekuxa);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(sotsii.color);
    sunaSprajto.material.opacity = veb6qaiW2d2(l(d.h2hafaf2.sprajtaOp, d.krepusko.sprajtaOp));
    eniraPukek.emissiveIntensity = l(0o3/0o100, 0o52/0o100);
    tlak2SexieanVitron(t);
  }

  function aplikiSupknu(t: number): void {
    tlakakaiKrepusko = t;
    aplikiAtmosferon();
  }

  function aplikiVet6liman(v: Vet6lima): void {
    cutluVet6lima = v;
    pluvo.visible = v === "pluva";
    hajlo.visible = v === "hajla";
    xana.visible = v === "nega";
    aplikiAtmosferon();
  }

  function tlak2Vet6liman(t: number): void {
    if ( !pluvo.visible && !xana.visible && !hajlo.visible ) return;
    if ( pluvo.visible ) {
      const mat = pluvo.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uScale.value = k2fcakuk.domElement.height / fotilaDuTan;
    }
    if ( xana.visible ) (xana.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    if ( hajlo.visible ) (hajlo.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    pluvo.position.copy(catahaq.position);
    xana.position.copy(catahaq.position);
    hajlo.position.copy(catahaq.position);
  }

  // ⟪ ſןw ſɭɔƽ ʌ j͑ʃᴜꞇ 📃 ⟫
  const dioritaPukek = kf2T6g6Pukek(undefined, 0o6/0o10);
  const andezitaPukek = kf2T6hnaPukek();
  // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ 📃 ⟩
  const eniraPukek = kf2Cah6k6Pukek();
  const oraPukek = kf2KuhalPukek(0xd8b068);

  const { pluvo, xana, hajlo } = kf2VeterajnPartiklojn(qena);

  // ⟪ ſןᴜ j͐ʃэ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟫
  const tikBal2Havop2 = tikBal2();
  const bal2Qoxa = tikBal2Havop2.qoxa;
  const bal2Pal6 = tikBal2Havop2.pal6;

  const jaqoHate = new THREE.Group();
  qena.add(jaqoHate);

  // ⟨ ɭl̀ᴜ ſ͕ɭɜ ʌ ſןᴜ j͐ʃэ 📃 ⟩
  ( function vepaqMontojn(): void {
    function jaqoL6da(px: number, pz: number, tk2ni: number): number {
      const x = px / 0o100 + tk2ni * 0o10;
      const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
      const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * xetoh2D(u, v) - 1);
      // ⟨ ſȷƽᴜ ʃɔ ʌ ɭl̀ᴜ ſ͕ɭɜ , ꞙɭɔ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
      const sx = x + ( xetoh2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
      const sz = z + ( xetoh2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
      const maso = xetoh2D(x, z);
      // ⟨ j͐ʃɜ ɭʃᴜ 📃 ⟩
      const lota = 0o13/0o40 + 0o25/0o40 * maso * maso;
      const n2k = malglata(sx * 0o3, sz * 0o3);
      const fajno = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);
      // ⟨ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭᴜ ſɭ,w ⟅ 📃 ⟩
      const mezajxo = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);
      // ⟨ ſɟɔ ɭʃɹ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
      const spino = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
      // ⟨ ſɟɔ ɭʃɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
      const dentoj = malglata(sx * 0o10, sz * 0o10);
      const cehe = malglata(sx * 0o22, sz * 0o22);
      // ⟨ ſȷꞇ }ʃꞇ ʌ j͑ʃᴜꞇ 📃 ⟩
      return 0o13
        + 0o36 * maso
        + 0o13 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 1 - maso ))
        + 0o24 * n2k * lota
        + 0o12 * mezajxo * ( 0o40/0o100 + 0o60/0o100 * lota )
        + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * lota )
        + 0o03 * dentoj * ( 0o40/0o100 + 0o60/0o100 * maso )
        + 0o02 * cehe * lota;
    }

    const NEBULTONO = new THREE.Color(0xc8d8d8);

    function jaqoWeh2En(natakatomasai: THREE.Color, y: number, x: number, z: number,
      haga: number, malproksimo: number): void {
      const negxaOndo = ( xetoh2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
        + ( xetoh2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
      t6limaWeh2En(natakatomasai, y + negxaOndo, x, z, haga);
      if ( malproksimo > 0 ) natakatomasai.lerp(NEBULTONO, malproksimo * 0o35/0o100);
    }

    // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w 📃 ⟩
    const jaqoT6lima = kf2GrundanCac2sex();
    const jaqoReliefo = kf2GrundanBumpanCac2sex();
    const jaqoPukek = fadaT6liman(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
      map: jaqoT6lima, bumpMap: jaqoReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));
    const jaqoFona = fadaT6liman(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
      map: jaqoT6lima, bumpMap: jaqoReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));

    function ringaN2k(h6kuni: number, ang: number): { x: number; z: number; nx: number; nz: number } {
      const pukaz = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang) + h6kuni;
      const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
      const pa = 0o1/0o2000;
      const ra = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang - pa) + h6kuni;
      const rb = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang + pa) + h6kuni;
      const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
      const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
      const sahakani = Math.hypot(tx, tz) || 1;
      let nx = -tz / sahakani, nz = tx / sahakani;
      if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0 ) { nx = -nx; nz = -nz; }
      return { x, z, nx, nz };
    }

    function krestaVagado(kozuni: number, vario: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number =>
        kozuni + ( xetoh2D(Math.cos(ang) * 0o4 + tk2ni, Math.sin(ang) * 0o4 + tk2ni * 0o3) - 0o1/0o2 ) * vario;
    }

    function krestaL6da(kozunuS: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number => {
        const u = Math.cos(ang) * 0o4 + tk2ni;
        const v = Math.sin(ang) * 0o4 + tk2ni * 0o3;
        return kozunuS * ( 0o3/0o10 + 0o5/0o10 * xetoh2D(u, v) + 0o2/0o10 * xetoh2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
      };
    }

    function kf2MontanRingon(
      kresto: ( ang: number ) => number,
      jufu: number, sl: number, sd: number,
      tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number,
      pukek: THREE.MeshStandardMaterial,
): void {
      const hacel2nu = sl + 1;
      const hax2pa = sd + 1;
      const suprN = hacel2nu * hax2pa;
      const psaz = NALAPSAZY - 0o4;
      // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭɔ ⟅ ſןw ſɭᴜƴ , ɭʃw ſɭˬɔƽ
      //   ɭʃw ſɭˬɔƽ ʌ ɭʃᴜ }ʃɔƽ 📃 ⟩
      const fundoKvanto = 0o2 * ( hacel2nu + hax2pa );
      const tutaN = suprN + fundoKvanto;
      const haxekuxa = new Float32Array(tutaN * 3);
      const haweh2 = new Float32Array(tutaN * 3);
      // ⟨ UV ʌ ſɭɜ ſɭ,w 📃 ⟩
      const hauv = new Float32Array(tutaN * 2);
      const fundoHavecax2l = new Int32Array(suprN).fill(-1);
      let fundoN = 0;
      const tonaProfundo = jufu / sd;
      const tonaTafkaq = 2 * Math.PI * ( bal2Pal6 + 0o100 ) / sl;
      const hal6da = new Float32Array(suprN);
      // ⟨ ſɭᴜ ſ͕ȷɔ ʌ ſɭᴜ ſ͕ȷɔ ⟅ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜꞇ 📃 ⟩
      // ɭl̀ᴜ ſ͕ɭɜ , ſןw ſɭᴜƴ ꞙɭɔ ʌ j͐ʃэ ɭ(ᴜ
      // ſɭɜ ſȷᴜ ʌ j͑ʃᴜꞇ ⟅ j͐ʃэ ɭ(ᴜ
      // ꞙɭɔ ʌ j͑ʃɜ j͑ʃƨɹ ⟅
      const cel2nujX = new Float64Array(hacel2nu), cel2nujZ = new Float64Array(hacel2nu);
      const cel2nujNX = new Float64Array(hacel2nu), cel2nujNZ = new Float64Array(hacel2nu);
      const cel2nujP6zuk = new Float64Array(hacel2nu), cel2nujBordo = new Float64Array(hacel2nu);
      for ( let k = 0; k < hacel2nu; k ++ ) {
        const ang = k / sl * Math.PI * 0o2;
        const c2q = ringaN2k(kresto(ang), ang);
        cel2nujX[k] = c2q.x; cel2nujZ[k] = c2q.z;
        cel2nujNX[k] = c2q.nx; cel2nujNZ[k] = c2q.nz;
        cel2nujP6zuk[k] = p6zukani(ang);
        cel2nujBordo[k] = l6da(c2q.x, c2q.z);
      }
      // ⟪ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟫
      for ( let v = 0; v < hax2pa; v ++ ) {
        const tn = v / sd;
        for ( let k = 0; k < hacel2nu; k ++ ) {
          const i = v * hacel2nu + k;
          const x = cel2nujX[k] + cel2nujNX[k] * tn * jufu;
          const z = cel2nujZ[k] + cel2nujNZ[k] * tn * jufu;
          // ⟨ ſɟᴜ ɭʃᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
          const sost2 = 0o40/0o100 + 0o24/0o100 * xetoh2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
          const kr = Math.min(1, tn / sost2);
          const kresko = kr * kr * ( 3 - 2 * kr );
          const fal = glataTona(sost2, 1, tn);
          const s2qena = kresko * ( 1 - fal );
          // ⟨ ſɟᴜ ɭʃᴜ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟩
          const aligo = 1 - glataTona(0, 0o1/0o4, tn);
          // ⟨ j͐ʃэ ɭ(ᴜ ʌ ſɟɔ ɭʃɹ 📃 ⟩
          const y = cel2nujBordo[k] * aligo
            + jaqoL6da(x, z, tk2ni) * cel2nujP6zuk[k] * s2qena
            + NALAPSAZY * fal;
          hal6da[i] = y;
          haxekuxa[i * 3] = x; haxekuxa[i * 3 + 1] = y; haxekuxa[i * 3 + 2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          hauv[i * 2] = uvx; hauv[i * 2 + 1] = uvz;
        }
      }
      // ⟨ ᶅſɔ ֭ſɭɹ 📃 ⟩
      const jaqoWeh2 = new THREE.Color();
      for ( let v = 0; v < hax2pa; v ++ ) {
        for ( let k = 0; k < hacel2nu; k ++ ) {
          const i = v * hacel2nu + k;
          const x = haxekuxa[i * 3], y = hal6da[i], z = haxekuxa[i * 3 + 2];
          const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
          const vm = ( v > 0 ? v - 1 : v ) * hacel2nu + k;
          const vp = ( v < sd ? v + 1 : v ) * hacel2nu + k;
          const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 2 * tonaTafkaq );
          const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 2 * tonaProfundo );
          jaqoWeh2En(jaqoWeh2, y, x, z, Math.hypot(dAng, dProf), malproksimo);
          haweh2[i * 3] = jaqoWeh2.r;
          haweh2[i * 3 + 1] = jaqoWeh2.g;
          haweh2[i * 3 + 2] = jaqoWeh2.b;
        }
      }
      // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭɔ ʌ ɭʃw ſɭˬɔƽ ⟅ ᶅſɔ ֭ſɭɹ , UV
      //   ꞙɭɔ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
      const fundoPor = ( i: number ): number => {
        const ekzista = fundoHavecax2l[i];
        if ( ekzista >= 0 ) return ekzista;
        const b = suprN + fundoN++;
        fundoHavecax2l[i] = b;
        haxekuxa[b * 3] = haxekuxa[i * 3];
        haxekuxa[b * 3 + 1] = psaz;
        haxekuxa[b * 3 + 2] = haxekuxa[i * 3 + 2];
        hauv[b * 2] = hauv[i * 2]; hauv[b * 2 + 1] = hauv[i * 2 + 1];
        t6limaK6h6Weh2En(jaqoWeh2, psaz, haxekuxa[i * 3 + 1]);
        haweh2[b * 3] = jaqoWeh2.r;
        haweh2[b * 3 + 1] = jaqoWeh2.g;
        haweh2[b * 3 + 2] = jaqoWeh2.b;
        return b;
      };
      // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭı ʌ ꞙɭı , ɭʃw ſɭˬɔƽ 📃 ⟩
      const havecax2lani = new Uint32Array(0o6 * sd * sl + 0o14 * ( sl + sd ));
      let ip = 0;
      const ses = ( a: number, b: number, c: number, d: number, e: number, f: number ): void => {
        havecax2lani[ip++] = a; havecax2lani[ip++] = b; havecax2lani[ip++] = c;
        havecax2lani[ip++] = d; havecax2lani[ip++] = e; havecax2lani[ip++] = f;
      };
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = v * hacel2nu + k, c = a + hacel2nu, d = c + 1;
          if ( ( k + v ) % 2 === 0 ) {
            ses(a, c, d, a, d, a + 1);
          } else {
            ses(a, c, a + 1, c, d, a + 1);
          }
        }
      }
      const tu5ekani1el2sai = ( a: number, b: number ): void => {
        const fa = fundoPor(a), fb = fundoPor(b);
        ses(a, b, fb, a, fb, fa);
      };
      for ( let k = 0; k < sl; k ++ ) {
        tu5ekani1el2sai(k, k + 1);
        tu5ekani1el2sai(sd * hacel2nu + k, sd * hacel2nu + k + 1);
      }
      for ( let v = 0; v < sd; v ++ ) {
        tu5ekani1el2sai(v * hacel2nu, ( v + 1 ) * hacel2nu);
        tu5ekani1el2sai(v * hacel2nu + sl, ( v + 1 ) * hacel2nu + sl);
      }
      const g = new THREE.BufferGeometry();
      const xekuxaN = suprN + fundoN;
      g.setAttribute("position", new THREE.BufferAttribute(haxekuxa.subarray(0, xekuxaN * 3), 3));
      g.setAttribute("color", new THREE.BufferAttribute(haweh2.subarray(0, xekuxaN * 3), 3));
      g.setAttribute("uv", new THREE.BufferAttribute(hauv.subarray(0, xekuxaN * 2), 2));
      g.setIndex(new THREE.BufferAttribute(havecax2lani.subarray(0, ip), 1));
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, pukek);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      jaqoHate.add(mesh);
    }

    // ⟨ ſɭw ʃᴜ }ʃꞇ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const ringajHacel2nu = 0o2000;

    // ⟨ ɭʃᴜ }ʃɔƽ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
    // ſɟwƽ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃᴜ j͐ʃᴜ ʌ ꞙɭɔ ʌ ſɟwƽ
    // ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ⟅
    const jaqoRuva = jaqoRuvaKozunu();
    kf2MontanRingon(krestaVagado(0o16, 0o10, jaqoRuva), 0o240, ringajHacel2nu, 0o100,
      jaqoRuva, krestaL6da(1, jaqoRuva), 0, jaqoPukek);

    kf2MontanRingon(krestaVagado(0o200, 0o60, jaqoRuva + 0o40), 0o200, ringajHacel2nu, 0o60,
      jaqoRuva + 0o20, krestaL6da(0o7/0o10, jaqoRuva + 0o20), 0o35/0o100, jaqoFona);
  } )();

  // ⟪ ſɭɜ ſɭ,w 📃 ⟫
  ( function vepaqKozun(pal6: number, has2nasce: number): void {
    const g = new THREE.PlaneGeometry(pal6, pal6, has2nasce, has2nasce);
    g.rotateX(-Math.PI / 2);
    const raqa = g.attributes.position;
    // ⟨ ſɭɜ ſȷᴜ ʌ ꞙɭı 📃 ⟩
    const haxekuxa = raqa.array as Float32Array;
    const haweh2 = new Float32Array(raqa.count * 3);
    const c = new THREE.Color();
    const vepat6ni = pal6 / has2nasce;
    const sx = has2nasce + 1;
    const hal6da = new Float32Array(raqa.count);
    // ⟨ ſɭɹ ſןᴜ ʌ ſןw ſɭᴜƴ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞
    //   ſɭɹ ſןᴜ ʌ ſןw ſɭᴜƴ 📃 ⟩
    const ene = new Uint8Array(raqa.count);
    for ( let i = 0; i < raqa.count; i++ ) {
      ene[i] = h6kuniQoxa(bal2Qoxa, bal2Pal6,
        haxekuxa[i * 3], haxekuxa[i * 3 + 2]) <= 0 ? 1 : 0;
    }
    const uzeblajHaKekkozusai = new Uint8Array(has2nasce * has2nasce);
    const uzeblajHakekuxa = new Uint8Array(raqa.count);
    for ( let j = 0; j < has2nasce; j++ ) {
      for ( let i = 0; i < has2nasce; i++ ) {
        const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
        if ( ene[a] === 0 && ene[b] === 0 && ene[c] === 0 && ene[d] === 0 ) continue;
        uzeblajHaKekkozusai[j * has2nasce + i] = 1;
        uzeblajHakekuxa[a] = 1; uzeblajHakekuxa[b] = 1;
        uzeblajHakekuxa[c] = 1; uzeblajHakekuxa[d] = 1;
      }
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      const h = l6da(haxekuxa[i * 3], haxekuxa[i * 3 + 2]);
      hal6da[i] = h;
      haxekuxa[i * 3 + 1] = h;
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( uzeblajHakekuxa[i] === 0 ) continue;
      const x = haxekuxa[i * 3], z = haxekuxa[i * 3 + 2];
      const h = hal6da[i];
      const k2pa = i % sx;
      const haga = ( k2pa > 0 && k2pa < sx - 1 && i >= sx && i < raqa.count - sx )
        ? Math.hypot(hal6da[i + 1] - hal6da[i - 1], hal6da[i + sx] - hal6da[i - sx]) / ( 2 * vepat6ni )
        : 0;
      t6limaWeh2En(c, h, x, z, haga, tsasaVem2Tsiike);
      haweh2[i * 3] = c.r; haweh2[i * 3 + 1] = c.g; haweh2[i * 3 + 2] = c.b;
    }
    const premita = { x: 0, z: 0 };
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( surokQoxa(bal2Qoxa, bal2Pal6, haxekuxa[i * 3], haxekuxa[i * 3 + 2], premita) ) {
        haxekuxa[i * 3] = premita.x;
        haxekuxa[i * 3 + 2] = premita.z;
      }
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
    const k21eHavecax2l = hagek2fhagasai(has2nasce);
    g.setIndex(new THREE.BufferAttribute(k21eHavecax2l, 1));
    // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ſןw ſɭᴜƴ , ſᶘꞇ ɭl̀ɔ 📃 ⟩
    g.computeVertexNormals();
    const videblajHavecax2l = k21eHavecax2l.filter(( _, i ) =>
      uzeblajHaKekkozusai[Math.floor(i / 0o6)] !== 0);
    g.setIndex(new THREE.BufferAttribute(videblajHavecax2l, 1));
    // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w 📃 ⟩
    // ⟨ ſȷɔ ſᶘᴜʞ ⟅ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ , ſɭɜ ſɭ,w 📃 ⟩
    const grundPukek = fadaT6liman(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kf2GrundanCac2sex(),
      bumpMap: kf2GrundanBumpanCac2sex(),
      bumpScale: 0o2/0o10,
    }));
    const ground = new THREE.Mesh(g, grundPukek);
    ground.receiveShadow = true;
    qena.add(ground);

    // ⟪ ſןw ſɭᴜƴ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟫
    const qoxaKozunu = kf2QoxaZace({
      qoxa: bal2Qoxa, pal6: bal2Pal6, weh2: t6limaK6h6Weh2En,
    });
    qoxaKozunu.qoxa3ak2(l6da, NALAPSAZY);
    const kozunuPukek = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    });
    const kozunuMesh = new THREE.Mesh(qoxaKozunu.qoxa, kozunuPukek);
    kozunuMesh.receiveShadow = true;
    kozunuMesh.castShadow = true;
    kozunuMesh.frustumCulled = false;
    qena.add(kozunuMesh);

    const brosxaCac2sex = kf2KozuanCac2sex();
    // ⟨ ſɭᴜ ſɭ,w j͐ʃᴜ ʌ ſןw ſɭᴜƴ 📃 ⟩
    const brosxaPukek = new THREE.MeshStandardMaterial({
      map: brosxaCac2sex, color: 0xffffff, transparent: true,
      alphaTest: 0o1/0o10, depthWrite: false, side: THREE.DoubleSide, roughness: 1,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    const brosxoj = new THREE.Group();
    const brosxaNombro = 0o30;
    for ( let i = 0o0; i < brosxaNombro; i++ ) {
      const famaf = xetoh2D(i * 0o7/0o10, i * 0o11/0o10);
      const tafkaq = i * 0o115/0o40 + famaf * 0o1/0o2;
      const h6kuni = 0o30 + xetoh2D(i * 0o13/0o10, i * 0o17/0o10) * 0o300;
      const x = Math.cos(tafkaq) * h6kuni;
      const z = Math.sin(tafkaq) * h6kuni;
      const sost2Y = l6da(x, z);
      if ( sost2Y < tsasaVem2(x, z) + 0o1/0o10 ) continue;
      const ka5ik = 0o1 + xetoh2D(x / 0o20, z / 0o20) * 0o2;
      if ( h6kuniQoxa(bal2Qoxa, bal2Pal6, x, z) > -ka5ik ) continue;
      const brosxaVecax2l = new THREE.PlaneGeometry(0o2 * ka5ik, 0o2 * ka5ik, 0o20, 0o20);
      brosxaVecax2l.rotateX(-Math.PI / 0o2);
      const pp = brosxaVecax2l.attributes.position;
      for ( let j = 0o0; j < pp.count; j++ ) {
        const dx = pp.getX(j), dz = pp.getZ(j);
        pp.setY(j, l6da(x + dx, z + dz) - sost2Y + 0o2/0o100);
      }
      brosxaVecax2l.computeVertexNormals();
      const brosxo = new THREE.Mesh(brosxaVecax2l, brosxaPukek);
      brosxo.position.set(x, sost2Y, z);
      brosxo.rotation.y = famaf * Math.PI * 0o2;
      brosxoj.add(brosxo);
    }
    qena.add(brosxoj);
    // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ }ʃᴜ j͐ʃᴜ ⟅ ꞙɭэ
    // j͐ʃэ ɭ(ᴜ , ᶅſɔ ֭ſɭɹ ʌ }ʃᴜ j͐ʃᴜ ⟅ j͑ʃɜ ſɭ,ᴜ
    // 80 ʌ ſןw ſɭᴜƴ ⟅
    // ſɭɜ ſɭ,w ʌ j͑ʃᴜꞇ 📃 ⟩
  } )(0o1400, 0o300);

  // ⟪ ᶅſɔ ɽ͑ʃ'ɔ ʌ j͑ʃᴜꞏ ᴩ ⺓ 📃 ⟫
  ( function vepaqĈirkaŭanEbenon(): void {
    const HACEL2NU = 0o200;
    const HAVESEFESTAF = 0o40;
    const fora = 0o6000;
    const hacel2nu = HACEL2NU + 1;
    const hax2pa = HAVESEFESTAF + 1;
    const N = hacel2nu * hax2pa;
    const haxekuxa = new Float32Array(N * 3);
    const haweh2 = new Float32Array(N * 3);
    const hauv = new Float32Array(N * 2);
    const weh2 = new THREE.Color();
    for ( let v = 0; v < hax2pa; v++ ) {
      const frac = v / HAVESEFESTAF;
      for ( let k = 0; k < hacel2nu; k++ ) {
        const i = v * hacel2nu + k;
        const ang = k / HACEL2NU * Math.PI * 0o2;
        const pukaz = ka5ikH6kuni(bal2Qoxa, bal2Pal6, ang);
        const r = pukaz + ( fora - pukaz ) * frac * frac;
        const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
        const ondado = ( xetoh2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * frac;
        haxekuxa[i * 3] = x;
        haxekuxa[i * 3 + 1] = NALAPSAZY + ondado;
        haxekuxa[i * 3 + 2] = z;
        t6limaWeh2En(weh2, 0, x, z, 0);
        haweh2[i * 3] = weh2.r;
        haweh2[i * 3 + 1] = weh2.g;
        haweh2[i * 3 + 2] = weh2.b;
        hauv[i * 2] = x / 0o3000 + 0o1/0o2;
        hauv[i * 2 + 1] = z / 0o3000 + 0o1/0o2;
      }
    }
    const havecax2lani: number[] = [];
    for ( let v = 0; v < HAVESEFESTAF; v++ ) {
      for ( let k = 0; k < HACEL2NU; k++ ) {
        const a = v * hacel2nu + k, b = a + 1, c = a + hacel2nu, d = c + 1;
        if ( ( k + v ) % 2 === 0 ) {
          havecax2lani.push(a, d, c, a, b, d);
        } else {
          havecax2lani.push(a, b, c, b, d, c);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(haxekuxa, 3));
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(hauv, 2));
    g.setIndex(havecax2lani);
    g.computeVertexNormals();
    const ebeno = new THREE.Mesh(g, fadaT6liman(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kf2GrundanCac2sex(),
    })));
    ebeno.frustumCulled = false;
    qena.add(ebeno);
  } )();

  ( function vepaqNebulringon(): void {
    const p6sca = 0o2000;
    const cac2sex = kf2NebulTavolanCac2sex();
    const pukek = new THREE.MeshBasicMaterial({
      map: cac2sex, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const g = new THREE.PlaneGeometry(2 * p6sca, 2 * p6sca, 0o100, 0o100);
    g.rotateX(-Math.PI / 2);
    const hahaxekuxa = g.attributes.position;
    const haweh2 = new Float32Array(hahaxekuxa.count * 4);
    const hauv = new Float32Array(hahaxekuxa.count * 2);
    for ( let i = 0; i < hahaxekuxa.count; i++ ) {
      const x = hahaxekuxa.getX(i), z = hahaxekuxa.getZ(i);
      const alfa = glataTona(0, 0o600, h6kuniQoxa(bal2Qoxa, bal2Pal6, x, z));
      haweh2[i * 4] = 1; haweh2[i * 4 + 1] = 1; haweh2[i * 4 + 2] = 1; haweh2[i * 4 + 3] = alfa;
      hauv[i * 2] = x / 0o100; hauv[i * 2 + 1] = z / 0o100;
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 4));
    g.setAttribute("uv", new THREE.BufferAttribute(hauv, 2));
    // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭɔ ʌ ᶅſɔ ֭ſɭɹ ʌ ſɭᴜ ᶅſᴜ ⟅ ſןw ſɭᴜƴ
    //   j͑ʃɜ ſɭ,ᴜ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
    const nebulajHavecax2l = g.getIndex()!.array.filter(( _, i ) => {
      const tile = Math.floor(i / 0o6);
      const x = tile % 0o100, z = Math.floor(tile / 0o100);
      const a = z * 0o101 + x, b = a + 1, c = a + 0o101, d = c + 1;
      return haweh2[a * 4 + 3] > 0 || haweh2[b * 4 + 3] > 0
        || haweh2[c * 4 + 3] > 0 || haweh2[d * 4 + 3] > 0;
    });
    g.setIndex(new THREE.BufferAttribute(nebulajHavecax2l, 1));
    const mesh = new THREE.Mesh(g, pukek);
    mesh.position.y = 0o1/0o40;
    mesh.frustumCulled = false;
    qena.add(mesh);
  } )();

  return { k2fcakuk, qena, catahaq, dioritaPukek, andezitaPukek, eniraPukek, oraPukek, cana, canaajUnihaqoxa, hemiTsije, suna: sotsii, sunaSprajto, aplikiSupknu, aplikiVet6liman, tlak2Vet6liman, tlak2Ombron, maksimumaRatio: MAKSRATIO };
}
