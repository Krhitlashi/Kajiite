// ≺⧼ ſ͕ɭɔ }ʃᴜ 🎬 ⧽≻
import * as THREE from "three";
import { alteco, akvaVem2, akvaVem2Proksima } from "../mondo/tereno.js";
import { glataPaso } from "../komunajxoj/interpolo.js";
import { kf2T6g6Pukek, kf2T6hnaPukek, kf2Cah6k6Pukek, kf2KuhalPukek } from "../../eskekoj/komunajxoj/materialoj.js";
import { kf2GrundanCac2sex } from "../../eskekoj/komunajxoj/cac2sex/grundo.js";
import { kf2GrundanBumpanCac2sex } from "../../eskekoj/komunajxoj/cac2sex/grundo-bumpo.js";
import { kf2NebulTavolanCac2sex } from "../../eskekoj/komunajxoj/cac2sex/nebula-tavolo.js";
import { kf2TerenanCac2sex } from "../../eskekoj/komunajxoj/cac2sex/tereno.js";
import { bruo2D, alternajDiagonalojn, terenaKoloroEn,
  terenaStrataKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { surokQoxa, h6kuniQoxa, ka5ikH6kuni, kf2QoxaZace,
  NALA_PSAZ_Y } from "../../eskekoj/komunajxoj/mapqoxa.js";
import { veb6qaiWeh2Skek, veb6qaiW2d2 } from "../../eskekoj/komunajxoj/koloroj.js";
import { agordiBildilon, agordiMedion, kf2CxefajnLumojn }
  from "../../eskekoj/komunajxoj/lumo.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { montaraSemoBazo } from "../tero-datumaro/rultempo.js";
import { gxisdatigiSteleanVitron } from "../../eskekoj/hapaq/satalaj/vitro.js";
import { montriEraronon } from "./scena/eraro.js";
import { MAKS_RATIO, MULT_SAMPLEA, OMBRA_MAPO, OMBROJ } from "./scena/aparato.js";
import { kf2Cxielon } from "./scena/cxielo.js";
import { NEBULA_DENSO, kf2Paletrojn } from "./scena/paletroj.js";
import { kf2VeterajnPartiklojn } from "./scena/precipitajxo.js";
import type { ScenaSistemo, Vetero } from "./scena/hahunaq.js";

export function kf2Scenon(kanvaso: HTMLCanvasElement, sxargxaEl: HTMLElement): ScenaSistemo {
  // ⟪ ſɟᴜ ɭʃэ ֭ſɭэƽ ſɭэ ı],ᴜʞ ꞁȷ̀ᴜꞇ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟫
  // ⟨ agordiBildilon ſᶘꞇ ɭl̀ɔ , ᶅſɔ ֭ſɭɹ 📃 ⟩
  let bildilo: THREE.WebGLRenderer;
  try {
    // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ GPU ʌ j͑ʃᴜꞏ ᴩ
    //   ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
    bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: MULT_SAMPLEA, powerPreference: "default" });
  } catch {
    montriEraronon(sxargxaEl);
    throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) WebGL ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ");
  }
  agordiBildilon( bildilo, { ombroj: OMBROJ, ombraHunaq: THREE.PCFShadowMap,
    pikslaRacio: Math.min( devicePixelRatio, MAKS_RATIO ) } );
  // ⟪ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɔ ֭ſɭɔ }ʃꞇ 📃 ⟫
  bildilo.shadowMap.autoUpdate = false;
  bildilo.shadowMap.needsUpdate = true;
  // ⟪ ſȷwɔ˞ ʌ j͑ʃ'ᴜ ı],ᴜ ſȷᴜ 📃 ⟫
  // ⟨ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
  bildilo.setSize(innerWidth, innerHeight);

  const qena = new THREE.Scene();
  // ⟨ ſɭʞэ ʌ ſɭw ʃᴜ }ʃꞇ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULA_DENSO);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  fotilo.position.set(0o40, 0o30, 0o100);
  fotilo.rotation.order = "YXZ";

  const fotilaDuTan = 2 * Math.tan(fotilo.fov * Math.PI / 0o550);

  // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w ʌ ſȷꞇ }ʃꞇ 📃 ⟩
  // j͐ʃƽɜ ʌ ſɭɜ ſɭ,w , ꞙɭɔ ʌ ſȷꞇ }ʃꞇ ⟅
  // ſɭᴜ ſ͕ȷɔ ₙ ʌ j͑ʃɜ ſɭ,ᴜ ⟅
  // ꞙɭı ʌ j͐ʃƽɜ , ꞙɭɔ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
  // ⟨ ſȷꞇ }ʃꞇ ⟅ ꞙɭı ʌ ſɟᴜᴜ̩ ɭʃɹ ʌ j͑ʃᴜꞇ ⟅ j͐ʃƽɜ
  // ꞙɭɔ ʌ ſɭᴜ ſ͕ȷɔ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
  const GRUNDA_FADO_EL = 0o14;
  const GRUNDA_FADO_GXIS = 0o72;
  // ⟨ ſɭʞэ ʌ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩ ʌ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w ʌ ſɭᴜ ſɭ,w j͐ʃᴜ ,
  // ꞙɭı ʌ ſȷꞇ }ʃꞇ ʌ ſɟᴜ ɭʃᴜ ֭ſɭᴜȝ ⟅ ᶅſɔ ֭ſɭɹ ꞙɭɔ ʌ j͑ʃᴜꞇ ⟅
  // j͐ʃƽɜ ʌ j͐ʃэ ɭ(ᴜ ʌ ꞙɭı
  // ſɭɜ ſɭ,w ʌ ſɭɜ ſɭ,w j͐ʃᴜ ⟅
  // ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɔ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ⟅ ſɭw ʃᴜ }ʃꞇ ⟅
  // j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ ʌ ſȷꞇ }ʃꞇ , ᶅſɔ ֭ſɭɹ 📃 ⟩
  const fadaGrundon = ( pukek: THREE.MeshStandardMaterial ): THREE.MeshStandardMaterial => {
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
        "#include <map_fragment>",
        `grundFado = 1.0 - smoothstep( ${GRUNDA_FADO_EL.toFixed(1)}, ${GRUNDA_FADO_GXIS.toFixed(1)}, length( vViewPosition ) );
        #ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          sampledDiffuseColor.rgb = mix( vec3( 1.0 ), sampledDiffuseColor.rgb, grundFado );
          diffuseColor *= sampledDiffuseColor;
        #endif`
      );
      // ⟨ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ , j͑ʃɜ ſɭ,ᴜ 📏 ⟩ , nonPerturbedNormal
      // j͐ʃƽɜ ⟅ j͑ʃɜ ſɭ,ᴜ , ᶅſɔ ֭ſɭɹ
      // j͐ʃƽɜ ꞙɭɔ ⟅ j͑ʃɜ ſɭ,ᴜ ꞙɭɔ ⟅ 📃 ⟩
      shadero.fragmentShader = shadero.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        normal = normalize( mix( nonPerturbedNormal, normal, grundFado ) );`
      );
    };
    return pukek;
  };

  // ⟨ ſɟᴜ }ʃᴜ ʌ ꞙɭı ⟅ ſᶘꞇ ɭl̀ɔ , ſɟᴜ }ʃᴜ 📃 ⟩
  const medio = agordiMedion( qena, bildilo );

  const { cxielo, cxielajUnihaqoxa } = kf2Cxielon(qena);

  // ⟪ ſᶘꞇ ɭl̀ɔ 📃 ⟫
  const ombraTekselo = 2 * 0o100 / OMBRA_MAPO;
  const { hemiLumo, suno } = kf2CxefajnLumojn( qena, {
    cxielaKoloro: 0xc8e0e8, grundoKoloro: 0x485848, cxielaIntenso: 0o63/0o100,
    sunaKoloro: 0xf8f0d8, sunaIntenso: 0o45/0o40, sunaXekuxa: [ 0o110, 0o160, 0o40 ],
    ombroj: OMBROJ, ombraMapo: OMBRA_MAPO, ombraDuono: 0o100,
    ombraProksima: 0o20, ombraMalproksima: 0o520,
    // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ ſɭᴜ j͐ʃэ ⟅ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɔ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ
    // ſɭɜ ſɭ,w shadow acne ⟅
    // ꞙɭı ʌ ſɭᴜ j͐ʃэ 📃 ⟩
    ombraBiaso: -0o1 / ( 0o2 * OMBRA_MAPO ),
    ombraNormalBiaso: Math.max( 0o4/0o10, ombraTekselo * 0o22/0o10 ),
  } );

  // ⟪ ſɟᴜ ᶅſɔ ʌ j͑ʃɜ ſᶘɹ 📃 ⟫
  // ⟨ j͑ʃɔ ı],ꞇ ʌ ɭʃᴜ , ꞙɭı ʌ ᶅſɔ ֭ſɭɹ , ſɟɹ ɭʃᴜ 📃 ⟩
  const sunaTeksturo = new THREE.TextureLoader().load(new URL("./scena/suno.png", import.meta.url).href);
  sunaTeksturo.colorSpace = THREE.SRGBColorSpace;
  sunaTeksturo.magFilter = THREE.LinearFilter;
  sunaTeksturo.minFilter = THREE.LinearMipmapLinearFilter;
  sunaTeksturo.generateMipmaps = true;
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunaTeksturo, color: 0xf8f0d8, transparent: true, opacity: 0o30/0o100,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  qena.add(sunaSprajto);

  const PALETROJ = kf2Paletrojn();

  let nunaVetero: Vetero = "nebula";
  let lastaKrepusko = 0;

  // ⟪ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɜ ſᶘɹ 📃 ⟫
  const ombraTekseloKrado = ( suno.shadow.camera.right - suno.shadow.camera.left ) / suno.shadow.mapSize.x;
  // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃɜ ſᶘɹ ʌ ꞙɭı/ꞙɭıɔ
  //   ſ͔ɭᴜ ȏŋᷠꞇ ʌ ɭl̀ɜ ſ͕ɭᴜ ⟅ ſɟᴜ ֭ſɭэ ſɭэ
  //   ſןᴜȝ ſɭꞇ ⟅ ſɟᴜ ֭ſɭэ ſɭэ
  //   ꞙɭı , ꞙɭı ʌ ꞙɭı
  //   ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭɿɔɔ
  //   ſ͔ɭᴜ ȏŋᷠꞇ ʌ ꞙɭɔ 📃 ⟩
  const OMBRA_SNUPO = ombraTekseloKrado * Math.max( 0o1, Math.round( 0o1 / ombraTekseloKrado ) );
  const SUNA_DIREKTO = new THREE.Vector3().copy(suno.position).normalize();
  let sunaDistanco = suno.position.length();
  const OMBRA_DIR = new THREE.Vector3();
  const OMBRA_DEX = new THREE.Vector3();
  const OMBRA_SUP = new THREE.Vector3();
  const OMBRA_CENTRO = new THREE.Vector3();
  let ombraCentroX = 0, ombraCentroZ = 0;

  function aplikiOmbranCentron(): void {
    OMBRA_DIR.copy(SUNA_DIREKTO);
    const h6kuni = sunaDistanco;
    if ( h6kuni === 0 ) return;
    OMBRA_SUP.set(0, 1, 0);
    if ( Math.abs(OMBRA_DIR.y) > 0o777/0o1000 ) OMBRA_SUP.set(0, 0, 1);
    OMBRA_DEX.crossVectors(OMBRA_SUP, OMBRA_DIR).normalize();
    OMBRA_SUP.crossVectors(OMBRA_DIR, OMBRA_DEX).normalize();
    const dekstre = Math.round(( ombraCentroX * OMBRA_DEX.x + ombraCentroZ * OMBRA_DEX.z ) / OMBRA_SNUPO) * OMBRA_SNUPO;
    const supre = Math.round(( ombraCentroX * OMBRA_SUP.x + ombraCentroZ * OMBRA_SUP.z ) / OMBRA_SNUPO) * OMBRA_SNUPO;
    OMBRA_CENTRO.set(0, 0, 0).addScaledVector(OMBRA_DEX, dekstre).addScaledVector(OMBRA_SUP, supre);
    suno.target.position.copy(OMBRA_CENTRO);
    suno.position.copy(OMBRA_CENTRO).addScaledVector(OMBRA_DIR, h6kuni);
  }

  function gxisdatigiOmbron( x: number, z: number ): boolean {
    if ( x === ombraCentroX && z === ombraCentroZ ) return false;
    ombraCentroX = x; ombraCentroZ = z;
    // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const ne3ak2X = OMBRA_CENTRO.x, ne3ak2Z = OMBRA_CENTRO.z;
    aplikiOmbranCentron();
    return OMBRA_CENTRO.x !== ne3ak2X || OMBRA_CENTRO.z !== ne3ak2Z;
  }

  function aplikiAtmosferon(): void {
    const t = lastaKrepusko;
    const d = PALETROJ[nunaVetero];
    const l = ( a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number ): any =>
      a instanceof THREE.Color ? veb6qaiWeh2Skek(( a as THREE.Color ).clone().lerp(b as THREE.Color, t)) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, t) :
      a + ( b as number - a ) * t;
    cxielajUnihaqoxa.uTop.value = l(d.tago.top, d.krepusko.top);
    cxielajUnihaqoxa.uMid.value = l(d.tago.mid, d.krepusko.mid);
    cxielajUnihaqoxa.uBot.value = l(d.tago.bot, d.krepusko.bot);
    cxielajUnihaqoxa.uSunCol.value = l(d.tago.sunCol, d.krepusko.sunCol);
    cxielajUnihaqoxa.uNokto.value = t;
    const sunDir = new THREE.Vector3().copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    cxielajUnihaqoxa.uSunDir.value = sunDir.clone().normalize();
    // ⟨ ſɟᴜ ſᶘɹ , ֭ſɭw }ʃᴜ ⟅ ᶅſɔ ֭ſɭɹ ʌ ſᶘꞇ ɭl̀ɔ , ŋᷠᴜ ֭ſɭᴜ
    //   ꞙɭı #nmnmnm ⟅ ſᶘꞇ ɭl̀ɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
    veb6qaiWeh2Skek(qena.fog!.color.copy(d.tago.fog).lerp(d.krepusko.fog, t));
    ( qena.fog as THREE.FogExp2 ).density = l(d.tago.nebulDenso, d.krepusko.nebulDenso);
    veb6qaiWeh2Skek(hemiLumo.color.copy(d.tago.hemiSky).lerp(d.krepusko.hemiSky, t));
    veb6qaiWeh2Skek(hemiLumo.groundColor.copy(d.tago.hemiGnd).lerp(d.krepusko.hemiGnd, t));
    hemiLumo.intensity = l(d.tago.hemiInt, d.krepusko.hemiInt);
    // ⟨ ſᶘꞇ ɭl̀ɔ ʌ j͑ʃɜ ſɭ,ᴜ , ֭ſɭw }ʃᴜ , ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
    // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ ʌ ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ }ʃᴜ 📃 ⟩
    medio.gxisdatigi({
      teru: cxielajUnihaqoxa.uTop.value,
      sost2: cxielajUnihaqoxa.uMid.value,
      subo: cxielajUnihaqoxa.uBot.value,
      sunaKoloro: cxielajUnihaqoxa.uSunCol.value,
      sunaDirekto: cxielajUnihaqoxa.uSunDir.value,
      nokto: t,
      intenso: l(0o1, 0o2/0o10),
    });
    veb6qaiWeh2Skek(suno.color.copy(d.tago.sunCol).lerp(d.krepusko.sunCol, t));
    suno.intensity = l(d.tago.sunInt, d.krepusko.sunInt);
    SUNA_DIREKTO.copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    sunaDistanco = SUNA_DIREKTO.length();
    if ( sunaDistanco > 0 ) SUNA_DIREKTO.divideScalar(sunaDistanco);
    aplikiOmbranCentron();
    bildilo.toneMappingExposure = l(d.tago.eksxekuxa, d.krepusko.eksxekuxa);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = veb6qaiW2d2(l(d.tago.sprajtaOp, d.krepusko.sprajtaOp));
    eniraMaterialo.emissiveIntensity = l(0o3/0o100, 0o52/0o100);
    gxisdatigiSteleanVitron(t);
  }

  function aplikiRezimon(t: number): void {
    lastaKrepusko = t;
    aplikiAtmosferon();
  }

  function aplikiVeteron(v: Vetero): void {
    nunaVetero = v;
    pluvo.visible = v === "pluva";
    hajlo.visible = v === "hajla";
    nego.visible = v === "nega";
    aplikiAtmosferon();
  }

  function gxisdatigiVeteron(t: number): void {
    if ( !pluvo.visible && !nego.visible && !hajlo.visible ) return;
    if ( pluvo.visible ) {
      const mat = pluvo.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      mat.uniforms.uScale.value = bildilo.domElement.height / fotilaDuTan;
    }
    if ( nego.visible ) (nego.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    if ( hajlo.visible ) (hajlo.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
    pluvo.position.copy(fotilo.position);
    nego.position.copy(fotilo.position);
    hajlo.position.copy(fotilo.position);
  }

  // ⟪ ſןw ſɭɔƽ ʌ j͑ʃᴜꞇ 📃 ⟫
  const dioritaMaterialo = kf2T6g6Pukek(undefined, 0o6/0o10);
  const andezitaMaterialo = kf2T6hnaPukek();
  // ⟨ ſȷᴜɔ˞ ᶅſɹ ɭ(ɹ 📃 ⟩
  const eniraMaterialo = kf2Cah6k6Pukek();
  const oraMaterialo = kf2KuhalPukek(0xd8b068);

  const { pluvo, nego, hajlo } = kf2VeterajnPartiklojn(qena);

  // ⟪ ſןᴜ j͐ʃэ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟫
  const aktivaMapoDatumoj = aktivaMapo();
  const mapoQoxa = aktivaMapoDatumoj.qoxa;
  const mapoGrandeco = aktivaMapoDatumoj.grandeco;

  const montaGrupo = new THREE.Group();
  qena.add(montaGrupo);

  // ⟨ ɭl̀ᴜ ſ͕ɭɜ ʌ ſןᴜ j͐ʃэ 📃 ⟩
  ( function vepaqMontojn(): void {
    function montaAlto(px: number, pz: number, tk2ni: number): number {
      const x = px / 0o100 + tk2ni * 0o10;
      const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
      const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
      // ⟨ ſȷƽᴜ ʃɔ ʌ ɭl̀ᴜ ſ͕ɭɜ , ꞙɭɔ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
      const sx = x + ( bruo2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
      const sz = z + ( bruo2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
      const maso = bruo2D(x, z);
      // ⟨ j͐ʃɜ ɭʃᴜ 📃 ⟩
      const valo = 0o13/0o40 + 0o25/0o40 * maso * maso;
      const pinto = malglata(sx * 0o3, sz * 0o3);
      const fajno = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);
      // ⟨ ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭᴜ ſɭ,w ⟅ 📃 ⟩
      const mezajxo = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);
      // ⟨ ſɟɔ ɭʃɹ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
      const spino = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
      // ⟨ ſɟɔ ɭʃɹ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ 📃 ⟩
      const dentoj = malglata(sx * 0o10, sz * 0o10);
      const grajno = malglata(sx * 0o22, sz * 0o22);
      // ⟨ ſȷꞇ }ʃꞇ ʌ j͑ʃᴜꞇ 📃 ⟩
      return 0o13
        + 0o36 * maso
        + 0o13 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 1 - maso ))
        + 0o24 * pinto * valo
        + 0o12 * mezajxo * ( 0o40/0o100 + 0o60/0o100 * valo )
        + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * valo )
        + 0o03 * dentoj * ( 0o40/0o100 + 0o60/0o100 * maso )
        + 0o02 * grajno * valo;
    }

    const NEBUL_TONO = new THREE.Color(0xc8d8d8);

    function montaKoloroEn(celo: THREE.Color, y: number, x: number, z: number,
      haga: number, malproksimo: number): void {
      const negxaOndo = ( bruo2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
        + ( bruo2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
      terenaKoloroEn(celo, y + negxaOndo, x, z, haga);
      if ( malproksimo > 0 ) celo.lerp(NEBUL_TONO, malproksimo * 0o35/0o100);
    }

    // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w 📃 ⟩
    const montaGrundo = kf2GrundanCac2sex();
    const montaReliefo = kf2GrundanBumpanCac2sex();
    const montaMaterialo = fadaGrundon(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));
    const montaFona = fadaGrundon(new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    }));

    function ringaPunkto(h6kuni: number, ang: number): { x: number; z: number; nx: number; nz: number } {
      const pukaz = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang) + h6kuni;
      const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
      const pa = 0o1/0o2000;
      const ra = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang - pa) + h6kuni;
      const rb = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang + pa) + h6kuni;
      const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
      const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
      const sahakani = Math.hypot(tx, tz) || 1;
      let nx = -tz / sahakani, nz = tx / sahakani;
      if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0 ) { nx = -nx; nz = -nz; }
      return { x, z, nx, nz };
    }

    function krestaVagado(kozuni: number, vario: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number =>
        kozuni + ( bruo2D(Math.cos(ang) * 0o4 + tk2ni, Math.sin(ang) * 0o4 + tk2ni * 0o3) - 0o1/0o2 ) * vario;
    }

    function krestaAlto(bazoS: number, tk2ni: number): ( ang: number ) => number {
      return ( ang: number ): number => {
        const u = Math.cos(ang) * 0o4 + tk2ni;
        const v = Math.sin(ang) * 0o4 + tk2ni * 0o3;
        return bazoS * ( 0o3/0o10 + 0o5/0o10 * bruo2D(u, v) + 0o2/0o10 * bruo2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
      };
    }

    function kf2MontanRingon(
      kresto: ( ang: number ) => number,
      profundo: number, sl: number, sd: number,
      tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number,
      pukek: THREE.MeshStandardMaterial,
): void {
      const hacel2nu = sl + 1;
      const hax2pa = sd + 1;
      const suprN = hacel2nu * hax2pa;
      const fundo = NALA_PSAZ_Y - 0o4;
      // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭɔ ⟅ ſןw ſɭᴜƴ , ɭʃw ſɭˬɔƽ
      //   ɭʃw ſɭˬɔƽ ʌ ɭʃᴜ }ʃɔƽ 📃 ⟩
      const fundoKvanto = 0o2 * ( hacel2nu + hax2pa );
      const tutaN = suprN + fundoKvanto;
      const haxekuxa = new Float32Array(tutaN * 3);
      const haweh2 = new Float32Array(tutaN * 3);
      // ⟨ UV ʌ ſɭɜ ſɭ,w 📃 ⟩
      const uvaj = new Float32Array(tutaN * 2);
      const fundoIndeksoj = new Int32Array(suprN).fill(-1);
      let fundoN = 0;
      const pasxoProfundo = profundo / sd;
      const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
      const hal6da = new Float32Array(suprN);
      // ⟨ ſɭᴜ ſ͕ȷɔ ʌ ſɭᴜ ſ͕ȷɔ ⟅ ꞙɭı ʌ ꞙɭı ʌ j͑ʃᴜꞇ 📃 ⟩
      // ɭl̀ᴜ ſ͕ɭɜ , ſןw ſɭᴜƴ ꞙɭɔ ʌ j͐ʃэ ɭ(ᴜ
      // ſɭɜ ſȷᴜ ʌ j͑ʃᴜꞇ ⟅ j͐ʃэ ɭ(ᴜ
      // ꞙɭɔ ʌ j͑ʃɜ j͑ʃƨɹ ⟅
      const cel2nujX = new Float64Array(hacel2nu), cel2nujZ = new Float64Array(hacel2nu);
      const cel2nujNX = new Float64Array(hacel2nu), cel2nujNZ = new Float64Array(hacel2nu);
      const cel2nujSkalo = new Float64Array(hacel2nu), cel2nujBordo = new Float64Array(hacel2nu);
      for ( let k = 0; k < hacel2nu; k ++ ) {
        const ang = k / sl * Math.PI * 0o2;
        const c2q = ringaPunkto(kresto(ang), ang);
        cel2nujX[k] = c2q.x; cel2nujZ[k] = c2q.z;
        cel2nujNX[k] = c2q.nx; cel2nujNZ[k] = c2q.nz;
        cel2nujSkalo[k] = p6zukani(ang);
        cel2nujBordo[k] = alteco(c2q.x, c2q.z);
      }
      // ⟪ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟫
      for ( let v = 0; v < hax2pa; v ++ ) {
        const tn = v / sd;
        for ( let k = 0; k < hacel2nu; k ++ ) {
          const i = v * hacel2nu + k;
          const x = cel2nujX[k] + cel2nujNX[k] * tn * profundo;
          const z = cel2nujZ[k] + cel2nujNZ[k] * tn * profundo;
          // ⟨ ſɟᴜ ɭʃᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
          const sost2 = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
          const kr = Math.min(1, tn / sost2);
          const kresko = kr * kr * ( 3 - 2 * kr );
          const fal = glataPaso(sost2, 1, tn);
          const s2qena = kresko * ( 1 - fal );
          // ⟨ ſɟᴜ ɭʃᴜ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟩
          const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
          // ⟨ j͐ʃэ ɭ(ᴜ ʌ ſɟɔ ɭʃɹ 📃 ⟩
          const y = cel2nujBordo[k] * aligo
            + montaAlto(x, z, tk2ni) * cel2nujSkalo[k] * s2qena
            + NALA_PSAZ_Y * fal;
          hal6da[i] = y;
          haxekuxa[i * 3] = x; haxekuxa[i * 3 + 1] = y; haxekuxa[i * 3 + 2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
        }
      }
      // ⟨ ᶅſɔ ֭ſɭɹ 📃 ⟩
      const montaKoloro = new THREE.Color();
      for ( let v = 0; v < hax2pa; v ++ ) {
        for ( let k = 0; k < hacel2nu; k ++ ) {
          const i = v * hacel2nu + k;
          const x = haxekuxa[i * 3], y = hal6da[i], z = haxekuxa[i * 3 + 2];
          const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
          const vm = ( v > 0 ? v - 1 : v ) * hacel2nu + k;
          const vp = ( v < sd ? v + 1 : v ) * hacel2nu + k;
          const dAng = ( hal6da[v * hacel2nu + kp] - hal6da[v * hacel2nu + km] ) / ( 2 * pasxoAngulo );
          const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 2 * pasxoProfundo );
          montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
          haweh2[i * 3] = montaKoloro.r;
          haweh2[i * 3 + 1] = montaKoloro.g;
          haweh2[i * 3 + 2] = montaKoloro.b;
        }
      }
      // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ꞙɭɔ ʌ ɭʃw ſɭˬɔƽ ⟅ ᶅſɔ ֭ſɭɹ , UV
      //   ꞙɭɔ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
      const fundoPor = ( i: number ): number => {
        const ekzista = fundoIndeksoj[i];
        if ( ekzista >= 0 ) return ekzista;
        const b = suprN + fundoN++;
        fundoIndeksoj[i] = b;
        haxekuxa[b * 3] = haxekuxa[i * 3];
        haxekuxa[b * 3 + 1] = fundo;
        haxekuxa[b * 3 + 2] = haxekuxa[i * 3 + 2];
        uvaj[b * 2] = uvaj[i * 2]; uvaj[b * 2 + 1] = uvaj[i * 2 + 1];
        terenaStrataKoloroEn(montaKoloro, fundo, haxekuxa[i * 3 + 1]);
        haweh2[b * 3] = montaKoloro.r;
        haweh2[b * 3 + 1] = montaKoloro.g;
        haweh2[b * 3 + 2] = montaKoloro.b;
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
      const muro = ( a: number, b: number ): void => {
        const fa = fundoPor(a), fb = fundoPor(b);
        ses(a, b, fb, a, fb, fa);
      };
      for ( let k = 0; k < sl; k ++ ) {
        muro(k, k + 1);
        muro(sd * hacel2nu + k, sd * hacel2nu + k + 1);
      }
      for ( let v = 0; v < sd; v ++ ) {
        muro(v * hacel2nu, ( v + 1 ) * hacel2nu);
        muro(v * hacel2nu + sl, ( v + 1 ) * hacel2nu + sl);
      }
      const g = new THREE.BufferGeometry();
      const verticoN = suprN + fundoN;
      g.setAttribute("position", new THREE.BufferAttribute(haxekuxa.subarray(0, verticoN * 3), 3));
      g.setAttribute("color", new THREE.BufferAttribute(haweh2.subarray(0, verticoN * 3), 3));
      g.setAttribute("uv", new THREE.BufferAttribute(uvaj.subarray(0, verticoN * 2), 2));
      g.setIndex(new THREE.BufferAttribute(havecax2lani.subarray(0, ip), 1));
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, pukek);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      montaGrupo.add(mesh);
    }

    // ⟨ ſɭw ʃᴜ }ʃꞇ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const ringajHacel2nu = 0o2000;

    // ⟨ ɭʃᴜ }ʃɔƽ ʌ ɭl̀ᴜ ſ͕ɭɜ 📃 ⟩
    // ſɟwƽ ʌ }ʃᴜ j͐ʃᴜ ⟅ }ʃᴜ j͐ʃᴜ ʌ ꞙɭɔ ʌ ſɟwƽ
    // ɭl̀ᴜ ſ͕ɭɜ ʌ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ⟅
    const montaSemo = montaraSemoBazo();
    kf2MontanRingon(krestaVagado(0o16, 0o10, montaSemo), 0o240, ringajHacel2nu, 0o100,
      montaSemo, krestaAlto(1, montaSemo), 0, montaMaterialo);

    kf2MontanRingon(krestaVagado(0o200, 0o60, montaSemo + 0o40), 0o200, ringajHacel2nu, 0o60,
      montaSemo + 0o20, krestaAlto(0o7/0o10, montaSemo + 0o20), 0o35/0o100, montaFona);
  } )();

  // ⟪ ſɭɜ ſɭ,w 📃 ⟫
  ( function vepaqTerenon(grandeco: number, has2nasce: number): void {
    const g = new THREE.PlaneGeometry(grandeco, grandeco, has2nasce, has2nasce);
    g.rotateX(-Math.PI / 2);
    const raqa = g.attributes.position;
    // ⟨ ſɭɜ ſȷᴜ ʌ ꞙɭı 📃 ⟩
    const haxekuxa = raqa.array as Float32Array;
    const haweh2 = new Float32Array(raqa.count * 3);
    const c = new THREE.Color();
    const vepat6ni = grandeco / has2nasce;
    const sx = has2nasce + 1;
    const hoj = new Float32Array(raqa.count);
    // ⟨ ſɭɹ ſןᴜ ʌ ſןw ſɭᴜƴ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞
    //   ſɭɹ ſןᴜ ʌ ſןw ſɭᴜƴ 📃 ⟩
    const ene = new Uint8Array(raqa.count);
    for ( let i = 0; i < raqa.count; i++ ) {
      ene[i] = h6kuniQoxa(mapoQoxa, mapoGrandeco,
        haxekuxa[i * 3], haxekuxa[i * 3 + 2]) <= 0 ? 1 : 0;
    }
    const uzeblajHaKekkozusai = new Uint8Array(has2nasce * has2nasce);
    const uzeblajVerticoj = new Uint8Array(raqa.count);
    for ( let j = 0; j < has2nasce; j++ ) {
      for ( let i = 0; i < has2nasce; i++ ) {
        const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
        if ( ene[a] === 0 && ene[b] === 0 && ene[c] === 0 && ene[d] === 0 ) continue;
        uzeblajHaKekkozusai[j * has2nasce + i] = 1;
        uzeblajVerticoj[a] = 1; uzeblajVerticoj[b] = 1;
        uzeblajVerticoj[c] = 1; uzeblajVerticoj[d] = 1;
      }
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      const h = alteco(haxekuxa[i * 3], haxekuxa[i * 3 + 2]);
      hoj[i] = h;
      haxekuxa[i * 3 + 1] = h;
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( uzeblajVerticoj[i] === 0 ) continue;
      const x = haxekuxa[i * 3], z = haxekuxa[i * 3 + 2];
      const h = hoj[i];
      const cxelo = i % sx;
      const haga = ( cxelo > 0 && cxelo < sx - 1 && i >= sx && i < raqa.count - sx )
        ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + sx] - hoj[i - sx]) / ( 2 * vepat6ni )
        : 0;
      terenaKoloroEn(c, h, x, z, haga, akvaVem2Proksima);
      haweh2[i * 3] = c.r; haweh2[i * 3 + 1] = c.g; haweh2[i * 3 + 2] = c.b;
    }
    const premita = { x: 0, z: 0 };
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( surokQoxa(mapoQoxa, mapoGrandeco, haxekuxa[i * 3], haxekuxa[i * 3 + 2], premita) ) {
        haxekuxa[i * 3] = premita.x;
        haxekuxa[i * 3 + 2] = premita.z;
      }
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
    const k21eIndeksoj = alternajDiagonalojn(has2nasce);
    g.setIndex(new THREE.BufferAttribute(k21eIndeksoj, 1));
    // ⟨ j͑ʃɜ ſɭ,ᴜ ʌ ſןw ſɭᴜƴ , ſᶘꞇ ɭl̀ɔ 📃 ⟩
    g.computeVertexNormals();
    const videblajIndeksoj = k21eIndeksoj.filter(( _, i ) =>
      uzeblajHaKekkozusai[Math.floor(i / 0o6)] !== 0);
    g.setIndex(new THREE.BufferAttribute(videblajIndeksoj, 1));
    // ⟨ j͐ʃƽɜ ʌ ſɭɜ ſɭ,w 📃 ⟩
    // ⟨ ſȷɔ ſᶘᴜʞ ⟅ j͐ʃэ ɭ(ᴜ , ſɟᴜ ֭ſɭэ ſɭэ , ſɭɜ ſɭ,w 📃 ⟩
    const grundMaterialo = fadaGrundon(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kf2GrundanCac2sex(),
      bumpMap: kf2GrundanBumpanCac2sex(),
      bumpScale: 0o2/0o10,
    }));
    const ground = new THREE.Mesh(g, grundMaterialo);
    ground.receiveShadow = true;
    qena.add(ground);

    // ⟪ ſןw ſɭᴜƴ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟫
    const qoxaBazo = kf2QoxaZace({
      qoxa: mapoQoxa, pal6: mapoGrandeco, weh2: terenaStrataKoloroEn,
    });
    qoxaBazo.qoxa3ak2(alteco, NALA_PSAZ_Y);
    const bazaMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    });
    const bazaMesh = new THREE.Mesh(qoxaBazo.qoxa, bazaMaterialo);
    bazaMesh.receiveShadow = true;
    bazaMesh.castShadow = true;
    bazaMesh.frustumCulled = false;
    qena.add(bazaMesh);

    const brosxaCac2sex = kf2TerenanCac2sex();
    // ⟨ ſɭᴜ ſɭ,w j͐ʃᴜ ʌ ſןw ſɭᴜƴ 📃 ⟩
    const brosxaMaterialo = new THREE.MeshStandardMaterial({
      map: brosxaCac2sex, color: 0xffffff, transparent: true,
      alphaTest: 0o1/0o10, depthWrite: false, side: THREE.DoubleSide, roughness: 1,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    const brosxoj = new THREE.Group();
    const brosxaNombro = 0o30;
    for ( let i = 0o0; i < brosxaNombro; i++ ) {
      const famaf = bruo2D(i * 0o7/0o10, i * 0o11/0o10);
      const tafkaq = i * 0o115/0o40 + famaf * 0o1/0o2;
      const h6kuni = 0o30 + bruo2D(i * 0o13/0o10, i * 0o17/0o10) * 0o300;
      const x = Math.cos(tafkaq) * h6kuni;
      const z = Math.sin(tafkaq) * h6kuni;
      const centroY = alteco(x, z);
      if ( centroY < akvaVem2(x, z) + 0o1/0o10 ) continue;
      const ka5ik = 0o1 + bruo2D(x / 0o20, z / 0o20) * 0o2;
      if ( h6kuniQoxa(mapoQoxa, mapoGrandeco, x, z) > -ka5ik ) continue;
      const brosxaGeometrio = new THREE.PlaneGeometry(0o2 * ka5ik, 0o2 * ka5ik, 0o20, 0o20);
      brosxaGeometrio.rotateX(-Math.PI / 0o2);
      const pp = brosxaGeometrio.attributes.position;
      for ( let j = 0o0; j < pp.count; j++ ) {
        const dx = pp.getX(j), dz = pp.getZ(j);
        pp.setY(j, alteco(x + dx, z + dz) - centroY + 0o2/0o100);
      }
      brosxaGeometrio.computeVertexNormals();
      const brosxo = new THREE.Mesh(brosxaGeometrio, brosxaMaterialo);
      brosxo.position.set(x, centroY, z);
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
    const KOLONOJ = 0o200;
    const VICOJ = 0o40;
    const fora = 0o6000;
    const hacel2nu = KOLONOJ + 1;
    const hax2pa = VICOJ + 1;
    const N = hacel2nu * hax2pa;
    const haxekuxa = new Float32Array(N * 3);
    const haweh2 = new Float32Array(N * 3);
    const uvaj = new Float32Array(N * 2);
    const weh2 = new THREE.Color();
    for ( let v = 0; v < hax2pa; v++ ) {
      const frac = v / VICOJ;
      for ( let k = 0; k < hacel2nu; k++ ) {
        const i = v * hacel2nu + k;
        const ang = k / KOLONOJ * Math.PI * 0o2;
        const pukaz = ka5ikH6kuni(mapoQoxa, mapoGrandeco, ang);
        const r = pukaz + ( fora - pukaz ) * frac * frac;
        const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
        const ondado = ( bruo2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * frac;
        haxekuxa[i * 3] = x;
        haxekuxa[i * 3 + 1] = NALA_PSAZ_Y + ondado;
        haxekuxa[i * 3 + 2] = z;
        terenaKoloroEn(weh2, 0, x, z, 0);
        haweh2[i * 3] = weh2.r;
        haweh2[i * 3 + 1] = weh2.g;
        haweh2[i * 3 + 2] = weh2.b;
        uvaj[i * 2] = x / 0o3000 + 0o1/0o2;
        uvaj[i * 2 + 1] = z / 0o3000 + 0o1/0o2;
      }
    }
    const havecax2lani: number[] = [];
    for ( let v = 0; v < VICOJ; v++ ) {
      for ( let k = 0; k < KOLONOJ; k++ ) {
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
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    g.setIndex(havecax2lani);
    g.computeVertexNormals();
    const ebeno = new THREE.Mesh(g, fadaGrundon(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kf2GrundanCac2sex(),
    })));
    ebeno.frustumCulled = false;
    qena.add(ebeno);
  } )();

  ( function vepaqNebulringon(): void {
    const ekstera = 0o2000;
    const cac2sex = kf2NebulTavolanCac2sex();
    const pukek = new THREE.MeshBasicMaterial({
      map: cac2sex, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const g = new THREE.PlaneGeometry(2 * ekstera, 2 * ekstera, 0o100, 0o100);
    g.rotateX(-Math.PI / 2);
    const haxekuxaJ = g.attributes.position;
    const haweh2 = new Float32Array(haxekuxaJ.count * 4);
    const uvaj = new Float32Array(haxekuxaJ.count * 2);
    for ( let i = 0; i < haxekuxaJ.count; i++ ) {
      const x = haxekuxaJ.getX(i), z = haxekuxaJ.getZ(i);
      const alfa = glataPaso(0, 0o600, h6kuniQoxa(mapoQoxa, mapoGrandeco, x, z));
      haweh2[i * 4] = 1; haweh2[i * 4 + 1] = 1; haweh2[i * 4 + 2] = 1; haweh2[i * 4 + 3] = alfa;
      uvaj[i * 2] = x / 0o100; uvaj[i * 2 + 1] = z / 0o100;
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 4));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭɔ ʌ ᶅſɔ ֭ſɭɹ ʌ ſɭᴜ ᶅſᴜ ⟅ ſןw ſɭᴜƴ
    //   j͑ʃɜ ſɭ,ᴜ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
    const nebulajIndeksoj = g.getIndex()!.array.filter(( _, i ) => {
      const kekkozusai = Math.floor(i / 0o6);
      const x = kekkozusai % 0o100, z = Math.floor(kekkozusai / 0o100);
      const a = z * 0o101 + x, b = a + 1, c = a + 0o101, d = c + 1;
      return haweh2[a * 4 + 3] > 0 || haweh2[b * 4 + 3] > 0
        || haweh2[c * 4 + 3] > 0 || haweh2[d * 4 + 3] > 0;
    });
    g.setIndex(new THREE.BufferAttribute(nebulajIndeksoj, 1));
    const mesh = new THREE.Mesh(g, pukek);
    mesh.position.y = 0o1/0o40;
    mesh.frustumCulled = false;
    qena.add(mesh);
  } )();

  return { bildilo, qena, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUnihaqoxa, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio: MAKS_RATIO };
}
