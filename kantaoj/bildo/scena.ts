// ≺⧼ ឆាក 🎬 ⧽≻
import * as THREE from "three";
import { alteco, akvaNivelo, akvaNiveloProksima } from "../mondo/tereno.js";
import { glataPaso } from "../komunajxoj/interpolo.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiFenestranMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { kreiGrundanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/grundo.js";
import { kreiGrundanBumpanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/grundo-bumpo.js";
import { kreiNebulTavolanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/nebula-tavolo.js";
import { kreiTerenanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/tereno.js";
import { bruo2D, alternajDiagonalojn, terenaKoloroEn,
  terenaStrataKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { premuAlFormo, distancoDeFormo, radiusaDistanco, kreiFormanBazon,
  MONDO_BAZA_Y } from "../../eskekoj/komunajxoj/mapformo.js";
import { kanakaWeh2Color, kanakaAlfo } from "../../eskekoj/komunajxoj/koloroj.js";
import { agordiBildilon, agordiMedion, kreiCxefajnLumojn }
  from "../../eskekoj/komunajxoj/lumo.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { montaraSemoBazo } from "../tero-datumaro/rultempo.js";
import { gxisdatigiSteleanVitron } from "../../eskekoj/konstruajxoj/satalaj/vitro.js";
import { montriEraronon } from "./scena/eraro.js";
import { MAKS_RATIO, MULT_SAMPLEA, OMBRA_MAPO, OMBROJ } from "./scena/aparato.js";
import { kreiCxielon } from "./scena/cxielo.js";
import { NEBULA_DENSO, kreiPaletrojn } from "./scena/paletroj.js";
import { kreiVeterajnPartiklojn } from "./scena/precipitajxo.js";
import type { ScenaSistemo, Vetero } from "./scena/tipoj.js";

export function kreiScenon(kanvaso: HTMLCanvasElement, sxargxaEl: HTMLElement): ScenaSistemo {
  // ⟪ ពន្លឺចង្កៀងកោងលើផ្ទៃ 📃 ⟫
  // ⟨ agordiBildilon បញ្ចូលទាំងការធ្លាក់ពន្លឺកោង និងជំហានពណ៌រួម 📃 ⟩
  let bildilo: THREE.WebGLRenderer;
  try {
    // ⟨ ឱ្យប្រព័ន្ធជ្រើសកាតក្រាហ្វិក ដើម្បីកុំបង្ខំកាតដែលចំណាយថាមពល
    //   ពេលកម្មវិធីផ្សេងក៏ត្រូវការវា ។ 📃 ⟩
    bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: MULT_SAMPLEA, powerPreference: "default" });
  } catch {
    montriEraronon(sxargxaEl);
    throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) WebGL មិនអាចប្រើបាន");
  }
  agordiBildilon( bildilo, { ombroj: OMBROJ, ombraTipo: THREE.PCFShadowMap,
    pikslaRacio: Math.min( devicePixelRatio, MAKS_RATIO ) } );
  // ⟪ ចង្វាក់ស្រមោល 📃 ⟫
  bildilo.shadowMap.autoUpdate = false;
  bildilo.shadowMap.needsUpdate = true;
  // ⟪ ច្រកផ្លាស់ប្តូរ , បានលុប 📃 ⟫
  // ⟨ អ្វីដែលបានប្រែ 📃 ⟩
  bildilo.setSize(innerWidth, innerHeight);

  const qena = new THREE.Scene();
  // ⟨ ហេតុអ្វីដង់ស៊ីតេបាលេត 📃 ⟩
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULA_DENSO);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  fotilo.position.set(0o40, 0o30, 0o100);
  fotilo.rotation.order = "YXZ";

  const fotilaDuTan = 2 * Math.tan(fotilo.fov * Math.PI / 0o550);

  // ⟨ វាយនភាពដីតាមចម្ងាយ 📃 ⟩
  // វាយនភាពដីញឹកញាប់ណាស់ ( ក្បឿងតូច ) ។ នៅចម្ងាយ , mip ត្រូវជ្រើសខុសៗគ្នាតាមជួរ
  // អេក្រង់ , ហើយវាបង្ហាញជាខ្សែផ្តេក ។ ទូរស័ព្ទឃើញវាច្បាស់ជាង ។
  // ដូច្នេះបន្ថយវាយនភាពតាមចម្ងាយ ៖ ជិតមានវាយនភាព , ឆ្ងាយប្រើពណ៌កំពូល ។ 📃 ⟩
  // ⟨ ចម្ងាយផ្លាស់ប្តូរ ៖ តម្លៃតែមួយសម្រាប់គ្រប់ឧបករណ៍ ។ នៅចម្ងាយ , mip
  // ត្រូវជ្រើសខុសៗគ្នាតាមជួរអេក្រង់ , ហើយវាបង្ហាញជាខ្សែផ្តេក ។ 📃 ⟩
  const GRUNDA_FADO_EL = 0o14;
  const GRUNDA_FADO_GXIS = 0o72;
  // ⟨ ហេតុអ្វីត្រូវបន្ថយទាំងកម្ពស់ស្រមោល 📃 ⟩ ៖ វាយនភាពដីលាតរាប់រយដង ,
  // ដូច្នេះនៅចម្ងាយ mip ធំខ្លាំង ។ ការបន្ថយពណ៌តែម្នាក់ឯងមិនគ្រប់ទេ ៖
  // វាយនភាពកម្ពស់ ( bump ) នៅតែអាននៅចម្ងាយទាំងមូល , ហើយដេរីវេរបស់វា
  // លោតនៅគ្រប់ព្រំដែនក្បឿង ។ ដូច្នេះដីបង្ហាញជាខ្សែត្រង់ស្របគ្នា ។
  // ទូរស័ព្ទឃើញច្បាស់ជាង ៖ ផែនទីស្រមោលតូចជាង ហើយដង់ស៊ីតេអេក្រង់ខុស ។
  // ដូច្នេះកម្ពស់ស្រមោលត្រូវបន្ថយដោយចម្ងាយដូចពណ៌ ។ 📃 ⟩
  const fadaGrundon = ( pukek: THREE.MeshStandardMaterial ): THREE.MeshStandardMaterial => {
    pukek.onBeforeCompile = ( shadero ) => {
      // ⟨ ការរសាត់គណនាម្តងក្នុងមួយភីកសែល មិនមែនពីរដង ។ ពីមុន
      //   map_fragment និង normal_fragment_maps យក length ផ្ទួនគ្នាលើគ្រប់
      //   ភីកសែលនៃដីដែលគ្របដណ្តប់អេក្រង់ ។ លទ្ធផលដដែល ។ 📃 ⟩
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
      // ⟨ កម្ពស់ស្រមោលតាមចម្ងាយ 📏 ⟩ ៖ `nonPerturbedNormal` ជានរម៉ាល់ដើមដែល
      // បានរក្សាទុកមុន bump ។ លាយនរម៉ាល់ដែលបានប្រែត្រឡប់ទៅវាតាមកម្រិតដូចពណ៌ ។
      // បើគ្មាន bump , នរម៉ាល់មិនប្រែ , ដូច្នេះការលាយនេះមិនធ្វើអ្វី ។ 📃 ⟩
      shadero.fragmentShader = shadero.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        normal = normalize( mix( nonPerturbedNormal, normal, grundFado ) );`
      );
    };
    return pukek;
  };

  // ⟨ បរិស្ថានឆ្លុះរួម ៖ មេឃតែមួយដែលបំភ្លឺឆាក ក៏បង្កើតការឆ្លុះដែរ ។ 📃 ⟩
  const medio = agordiMedion( qena, bildilo );

  const { cxielo, cxielajUniformoj } = kreiCxielon(qena);

  // ⟪ ពន្លឺ 📃 ⟫
  const ombraTekselo = 2 * 0o100 / OMBRA_MAPO;
  const { hemiLumo, suno } = kreiCxefajnLumojn( qena, {
    cxielaKoloro: 0xc8e0e8, grundoKoloro: 0x485848, cxielaIntenso: 0o63/0o100,
    sunaKoloro: 0xf8f0d8, sunaIntenso: 0o45/0o40, sunaPozicio: [ 0o110, 0o160, 0o40 ],
    ombroj: OMBROJ, ombraMapo: OMBRA_MAPO, ombraDuono: 0o100,
    ombraProksima: 0o20, ombraMalproksima: 0o520,
    // ⟨ ទំហំដុំស្រមោល ៖ ផែនទីស្រមោលតូច ( ទូរស័ព្ទ ) មានដុំធំជាង ។ បើសម្លេងណរម៉ាល់
    // តូចពេក , ដីបង្កើតឆ្នូតខ្មៅៗជាសំណាញ់ ( shadow acne ) ។ ដូច្នេះសម្លេង
    // ត្រូវតាមទំហំដុំ ៖ ដុំធំ , សម្លេងធំ ។ 📃 ⟩
    ombraBiaso: -0o1 / ( 0o2 * OMBRA_MAPO ),
    ombraNormalBiaso: Math.max( 0o4/0o10, ombraTekselo * 0o22/0o10 ),
  } );

  // ⟪ ស្ព្រាយព្រះអាទិត្យ 📃 ⟫
  // ⟨ ផ្កាយបួនកាំរាវរលូន ពណ៌ KNAKEHE និងស៊ុមតូចដើម្បីគែមមិនជាភីកសែល 📃 ⟩
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

  const PALETROJ = kreiPaletrojn();

  let nunaVetero: Vetero = "nebula";
  let lastaKrepusko = 0;

  // ⟪ ស្រមោលព្រះអាទិត្យ 📃 ⟫
  const ombraTekseloKrado = ( suno.shadow.camera.right - suno.shadow.camera.left ) / suno.shadow.mapSize.x;
  // ⟨ ពីមុនចំណុចកណ្តាលផែនទីស្រមោលចាប់រាល់តេកសែល ប្រហែល 0o1/0o10 ឯកតា ។
  //   អ្នកលេងដើរលើសនោះរាល់ហ្វ្រេម ដូច្នេះផែនទីស្រមោលត្រូវគូរធរណីមាត្រ
  //   ទាំងមូលឡើងវិញរាល់ហ្វ្រេម ទោះបីស្រមោលវត្ថុស្ងៀមមិនប្រែក៏ដោយ ។
  //   ឥឡូវចាប់ឱ្យជាប់នឹងជំហានប្រហែល 0o1 ឯកតា តែនៅតែជាពហុគុណពិត
  //   នៃតេកសែល ដូច្នេះស្រមោលមិនរអិល ។ កាមេរ៉ាស្រមោលគ្របដណ្តប់ 0o200
  //   ឯកតា ហើយស្រមោលគណនាពីធរណីមាត្រ មិនមែនពីភ្នែកអ្នកលេង ។ 📃 ⟩
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
    // ⟨ តើផែនទីស្រមោលពិតជាត្រូវគូរឡើងវិញ 📃 ⟩
    const antaŭaX = OMBRA_CENTRO.x, antaŭaZ = OMBRA_CENTRO.z;
    aplikiOmbranCentron();
    return OMBRA_CENTRO.x !== antaŭaX || OMBRA_CENTRO.z !== antaŭaZ;
  }

  function aplikiAtmosferon(): void {
    const t = lastaKrepusko;
    const d = PALETROJ[nunaVetero];
    const l = ( a: THREE.Color | THREE.Vector3 | number, b: THREE.Color | THREE.Vector3 | number ): any =>
      a instanceof THREE.Color ? kanakaWeh2Color(( a as THREE.Color ).clone().lerp(b as THREE.Color, t)) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, t) :
      a + ( b as number - a ) * t;
    cxielajUniformoj.uTop.value = l(d.tago.top, d.krepusko.top);
    cxielajUniformoj.uMid.value = l(d.tago.mid, d.krepusko.mid);
    cxielajUniformoj.uBot.value = l(d.tago.bot, d.krepusko.bot);
    cxielajUniformoj.uSunCol.value = l(d.tago.sunCol, d.krepusko.sunCol);
    cxielajUniformoj.uNokto.value = t;
    const sunDir = new THREE.Vector3().copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    cxielajUniformoj.uSunDir.value = sunDir.clone().normalize();
    // ⟨ ការលាយថ្ងៃ-ព្រលប់បង្កើតតម្លៃកណ្តាល ។ បង្គត់គ្រប់ពណ៌ពន្លឺ និងអ័ព្ទ
    //   ត្រឡប់ទៅ #nmnmnm ដើម្បីកុំឱ្យពន្លឺរំលងច្បាប់ពណ៌ ។ 📃 ⟩
    kanakaWeh2Color(qena.fog!.color.copy(d.tago.fog).lerp(d.krepusko.fog, t));
    ( qena.fog as THREE.FogExp2 ).density = l(d.tago.nebulDenso, d.krepusko.nebulDenso);
    kanakaWeh2Color(hemiLumo.color.copy(d.tago.hemiSky).lerp(d.krepusko.hemiSky, t));
    kanakaWeh2Color(hemiLumo.groundColor.copy(d.tago.hemiGnd).lerp(d.krepusko.hemiGnd, t));
    hemiLumo.intensity = l(d.tago.hemiInt, d.krepusko.hemiInt);
    // ⟨ ពន្លឺបរិស្ថានលិចតាមព្រលប់ ដើម្បីកុំឱ្យវាលុបជំហានស្រមោលចង្កៀង 📃 ⟩
    // ⟨ កញ្ចក់ឆ្លុះអានពណ៌ដូចមេឃ ៖ ដែក និងកញ្ចក់ឆ្លុះមេឃដែលបំភ្លឺឆាក ។ 📃 ⟩
    medio.gxisdatigi({
      teru: cxielajUniformoj.uTop.value,
      sost2: cxielajUniformoj.uMid.value,
      subo: cxielajUniformoj.uBot.value,
      sunaKoloro: cxielajUniformoj.uSunCol.value,
      sunaDirekto: cxielajUniformoj.uSunDir.value,
      nokto: t,
      intenso: l(0o1, 0o2/0o10),
    });
    kanakaWeh2Color(suno.color.copy(d.tago.sunCol).lerp(d.krepusko.sunCol, t));
    suno.intensity = l(d.tago.sunInt, d.krepusko.sunInt);
    SUNA_DIREKTO.copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    sunaDistanco = SUNA_DIREKTO.length();
    if ( sunaDistanco > 0 ) SUNA_DIREKTO.divideScalar(sunaDistanco);
    aplikiOmbranCentron();
    bildilo.toneMappingExposure = l(d.tago.ekspozicio, d.krepusko.ekspozicio);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = kanakaAlfo(l(d.tago.sprajtaOp, d.krepusko.sprajtaOp));
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

  // ⟪ វត្ថុធាតុ 📃 ⟫
  const dioritaMaterialo = kreiDioritanMaterialon(undefined, 0o6/0o10);
  const andezitaMaterialo = kreiAndezitanMaterialon();
  // ⟨ ទ្វារយានអវកាសជាកញ្ចក់ 📃 ⟩
  const eniraMaterialo = kreiFenestranMaterialon();
  const oraMaterialo = kreiOranMaterialon(0xd8b068);

  const { pluvo, nego, hajlo } = kreiVeterajnPartiklojn(qena);

  // ⟪ រូបរាងពិភពលោក 📃 ⟫
  const aktivaMapoDatumoj = aktivaMapo();
  const mapoFormo = aktivaMapoDatumoj.formo;
  const mapoGrandeco = aktivaMapoDatumoj.grandeco;

  const montaGrupo = new THREE.Group();
  qena.add(montaGrupo);

  // ⟨ ភ្នំតាមរូបរាងផែនទី 📃 ⟩
  ( function konstruiMontojn(): void {
    function montaAlto(px: number, pz: number, tk2ni: number): number {
      const x = px / 0o100 + tk2ni * 0o10;
      const z = pz / 0o100 + tk2ni * 0o20 + 0o20;
      const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
      // ⟨ បំប្លែងទីតាំង ៖ ជួរភ្នំកោងវៀចវេរជាធម្មជាតិ មិនត្រង់ 📃 ⟩
      const sx = x + ( bruo2D(x * 0o2 + 0o31, z * 0o2 + 0o7) - 0o1/0o2 ) * 0o4/0o10;
      const sz = z + ( bruo2D(x * 0o2 - 0o13, z * 0o2 + 0o41) - 0o1/0o2 ) * 0o4/0o10;
      const maso = bruo2D(x, z);
      // ⟨ ជ្រលង 📃 ⟩
      const valo = 0o13/0o40 + 0o25/0o40 * maso * maso;
      const pinto = malglata(sx * 0o3, sz * 0o3);
      const fajno = malglata(sx * 0o4 + 0o11, sz * 0o4 - 0o5);
      // ⟨ ជួរកណ្ដាល ៖ បំពេញចន្លោះរវាងកំពូលធំ និងធ្មេញតូច 📃 ⟩
      const mezajxo = malglata(sx * 0o6 + 0o23, sz * 0o6 + 0o3);
      // ⟨ ឆ្អឹងខ្នង 📃 ⟩
      const spino = malglata(sx * ( 0o3/0o2 ) + 0o13, sz * ( 0o3/0o2 ) + 0o27);
      // ⟨ ធ្មេញ 📃 ⟩
      const dentoj = malglata(sx * 0o10, sz * 0o10);
      const grajno = malglata(sx * 0o22, sz * 0o22);
      // ⟨ មាត្រទាំងមូល 📃 ⟩
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

    // ⟨ វាយនភាពដូចដី 📃 ⟩
    const montaGrundo = kreiGrundanTeksajxon();
    const montaReliefo = kreiGrundanBumpanTeksajxon();
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
      const pukaz = radiusaDistanco(mapoFormo, mapoGrandeco, ang) + h6kuni;
      const x = Math.cos(ang) * pukaz, z = Math.sin(ang) * pukaz;
      const pa = 0o1/0o2000;
      const ra = radiusaDistanco(mapoFormo, mapoGrandeco, ang - pa) + h6kuni;
      const rb = radiusaDistanco(mapoFormo, mapoGrandeco, ang + pa) + h6kuni;
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

    function kreiMontanRingon(
      kresto: ( ang: number ) => number,
      profundo: number, sl: number, sd: number,
      tk2ni: number, p6zukani: ( ang: number ) => number, malproksimo: number,
      pukek: THREE.MeshStandardMaterial,
): void {
      const kolonoj = sl + 1;
      const vicoj = sd + 1;
      const suprN = kolonoj * vicoj;
      const fundo = MONDO_BAZA_Y - 0o4;
      // ⟨ ផ្ទៃក្រោមមិនអាចមើលឃើញទេ ។ រក្សាតែកំពូលក្រោមលើគែម សម្រាប់ជញ្ជាំង
      //   ចំហៀង ជំនួសឱ្យកំពូលក្រោមពេញមួយស្រទាប់ទៀត ។ 📃 ⟩
      const fundoKvanto = 0o2 * ( kolonoj + vicoj );
      const tutaN = suprN + fundoKvanto;
      const pozicioj = new Float32Array(tutaN * 3);
      const haweh2 = new Float32Array(tutaN * 3);
      // ⟨ UV ដី 📃 ⟩
      const uvaj = new Float32Array(tutaN * 2);
      const fundoIndeksoj = new Int32Array(suprN).fill(-1);
      let fundoN = 0;
      const pasxoProfundo = profundo / sd;
      const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
      const hal6da = new Float32Array(suprN);
      // ⟨ តម្លៃអាស្រ័យលើជួរឈរ ៖ គណនាម្តង ប្រើគ្រប់ជួរដេក 📃 ⟩
      // កំពូលភ្នំ និងគែមមិនប្រែតាមជម្រៅទេ ។ ការគណនាម្តងទៀតរាល់ជួរដេក
      // គឺជាការខាតបង់ធំ ព្រោះមានជួរដេកច្រើន ។ តារាងទាំងនេះត្រូវជាលេខទ្វេ
      // ដើម្បីកុំឱ្យបាត់ភាពជាក់លាក់ ។
      const kolonajX = new Float64Array(kolonoj), kolonajZ = new Float64Array(kolonoj);
      const kolonajNX = new Float64Array(kolonoj), kolonajNZ = new Float64Array(kolonoj);
      const kolonajSkalo = new Float64Array(kolonoj), kolonajBordo = new Float64Array(kolonoj);
      for ( let k = 0; k < kolonoj; k ++ ) {
        const ang = k / sl * Math.PI * 0o2;
        const c2q = ringaPunkto(kresto(ang), ang);
        kolonajX[k] = c2q.x; kolonajZ[k] = c2q.z;
        kolonajNX[k] = c2q.nx; kolonajNZ[k] = c2q.nz;
        kolonajSkalo[k] = p6zukani(ang);
        kolonajBordo[k] = alteco(c2q.x, c2q.z);
      }
      // ⟪ ផ្ទៃលើ 📃 ⟫
      for ( let v = 0; v < vicoj; v ++ ) {
        const tn = v / sd;
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const x = kolonajX[k] + kolonajNX[k] * tn * profundo;
          const z = kolonajZ[k] + kolonajNZ[k] * tn * profundo;
          // ⟨ ប្រវែងកាត់ភ្នំ 📃 ⟩
          const sost2 = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + tk2ni * 0o10, z / 0o40 + tk2ni * 0o30);
          const kr = Math.min(1, tn / sost2);
          const kresko = kr * kr * ( 3 - 2 * kr );
          const fal = glataPaso(sost2, 1, tn);
          const s2qena = kresko * ( 1 - fal );
          // ⟨ ការភ្ជាប់ទៅពិភពលោក 📃 ⟩
          const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
          // ⟨ កម្ពស់មកពីកំពូល មិនមែនពីកំពូលភ្នំ 📃 ⟩
          const y = kolonajBordo[k] * aligo
            + montaAlto(x, z, tk2ni) * kolonajSkalo[k] * s2qena
            + MONDO_BAZA_Y * fal;
          hal6da[i] = y;
          pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
        }
      }
      // ⟨ ពណ៌ 📃 ⟩
      const montaKoloro = new THREE.Color();
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const x = pozicioj[i * 3], y = hal6da[i], z = pozicioj[i * 3 + 2];
          const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
          const vm = ( v > 0 ? v - 1 : v ) * kolonoj + k;
          const vp = ( v < sd ? v + 1 : v ) * kolonoj + k;
          const dAng = ( hal6da[v * kolonoj + kp] - hal6da[v * kolonoj + km] ) / ( 2 * pasxoAngulo );
          const dProf = ( hal6da[vp] - hal6da[vm] ) / ( 2 * pasxoProfundo );
          montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
          haweh2[i * 3] = montaKoloro.r;
          haweh2[i * 3 + 1] = montaKoloro.g;
          haweh2[i * 3 + 2] = montaKoloro.b;
        }
      }
      // ⟨ កំពូលក្រោមត្រូវបង្កើតតែនៅពេលជញ្ជាំងចំហៀងត្រូវការ ។ ពណ៌ និង UV
      //   នៅដដែលទាំងស្រុង ប៉ុន្តែគ្មានការគណនាសម្រាប់ផ្ទៃក្រោមដែលលាក់ទេ ។ 📃 ⟩
      const fundoPor = ( i: number ): number => {
        const ekzista = fundoIndeksoj[i];
        if ( ekzista >= 0 ) return ekzista;
        const b = suprN + fundoN++;
        fundoIndeksoj[i] = b;
        pozicioj[b * 3] = pozicioj[i * 3];
        pozicioj[b * 3 + 1] = fundo;
        pozicioj[b * 3 + 2] = pozicioj[i * 3 + 2];
        uvaj[b * 2] = uvaj[i * 2]; uvaj[b * 2 + 1] = uvaj[i * 2 + 1];
        terenaStrataKoloroEn(montaKoloro, fundo, pozicioj[i * 3 + 1]);
        haweh2[b * 3] = montaKoloro.r;
        haweh2[b * 3 + 1] = montaKoloro.g;
        haweh2[b * 3 + 2] = montaKoloro.b;
        return b;
      };
      // ⟨ សន្ទស្សន៍ផ្ទៃលើ និង ជញ្ជាំងចំហៀងតែប៉ុណ្ណោះ 📃 ⟩
      const havecax2lani = new Uint32Array(0o6 * sd * sl + 0o14 * ( sl + sd ));
      let ip = 0;
      const ses = ( a: number, b: number, c: number, d: number, e: number, f: number ): void => {
        havecax2lani[ip++] = a; havecax2lani[ip++] = b; havecax2lani[ip++] = c;
        havecax2lani[ip++] = d; havecax2lani[ip++] = e; havecax2lani[ip++] = f;
      };
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = v * kolonoj + k, c = a + kolonoj, d = c + 1;
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
        muro(sd * kolonoj + k, sd * kolonoj + k + 1);
      }
      for ( let v = 0; v < sd; v ++ ) {
        muro(v * kolonoj, ( v + 1 ) * kolonoj);
        muro(v * kolonoj + sl, ( v + 1 ) * kolonoj + sl);
      }
      const g = new THREE.BufferGeometry();
      const verticoN = suprN + fundoN;
      g.setAttribute("position", new THREE.BufferAttribute(pozicioj.subarray(0, verticoN * 3), 3));
      g.setAttribute("color", new THREE.BufferAttribute(haweh2.subarray(0, verticoN * 3), 3));
      g.setAttribute("uv", new THREE.BufferAttribute(uvaj.subarray(0, verticoN * 2), 2));
      g.setIndex(new THREE.BufferAttribute(havecax2lani.subarray(0, ip), 1));
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, pukek);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      montaGrupo.add(mesh);
    }

    // ⟨ ដង់ស៊ីតេប៉ុន្មាន 📃 ⟩
    const ringajKolonoj = 0o2000;

    // ⟨ ស្រទាប់ភ្នំ 📃 ⟩
    // គ្រាប់ពូជមកពីពិភពលោកសកម្ម ។ ពិភពលោកដែលគ្មានគ្រាប់ពូជរក្សា
    // ជួរភ្នំដើមរបស់ដីដែលឆ្លាក់ដោយដៃ ។
    const montaSemo = montaraSemoBazo();
    kreiMontanRingon(krestaVagado(0o16, 0o10, montaSemo), 0o240, ringajKolonoj, 0o100,
      montaSemo, krestaAlto(1, montaSemo), 0, montaMaterialo);

    kreiMontanRingon(krestaVagado(0o200, 0o60, montaSemo + 0o40), 0o200, ringajKolonoj, 0o60,
      montaSemo + 0o20, krestaAlto(0o7/0o10, montaSemo + 0o20), 0o35/0o100, montaFona);
  } )();

  // ⟪ ដី 📃 ⟫
  ( function konstruiTerenon(grandeco: number, segmentoj: number): void {
    const g = new THREE.PlaneGeometry(grandeco, grandeco, segmentoj, segmentoj);
    g.rotateX(-Math.PI / 2);
    const raqa = g.attributes.position;
    // ⟨ តារាងដើម 📃 ⟩
    const pozicioj = raqa.array as Float32Array;
    const haweh2 = new Float32Array(raqa.count * 3);
    const c = new THREE.Color();
    const vepat6ni = grandeco / segmentoj;
    const sx = segmentoj + 1;
    const hoj = new Float32Array(raqa.count);
    // ⟨ ក្រឡាទាំងស្រុងខាងក្រៅទម្រង់មិនចាំបាច់គូរទេ ។ គែមទម្រង់មានគ្រឹះដាច់ដោយឡែក
    //   ហើយក្រឡាប៉ះគែមនៅដដែលទាំងស្រុង ។ សញ្ញាក្រឡាគណនាមុនចុចទីតាំង 📃 ⟩
    const ene = new Uint8Array(raqa.count);
    for ( let i = 0; i < raqa.count; i++ ) {
      ene[i] = distancoDeFormo(mapoFormo, mapoGrandeco,
        pozicioj[i * 3], pozicioj[i * 3 + 2]) <= 0 ? 1 : 0;
    }
    const uzeblajĈeloj = new Uint8Array(segmentoj * segmentoj);
    const uzeblajVerticoj = new Uint8Array(raqa.count);
    for ( let j = 0; j < segmentoj; j++ ) {
      for ( let i = 0; i < segmentoj; i++ ) {
        const a = j * sx + i, b = a + 1, c = a + sx, d = c + 1;
        if ( ene[a] === 0 && ene[b] === 0 && ene[c] === 0 && ene[d] === 0 ) continue;
        uzeblajĈeloj[j * segmentoj + i] = 1;
        uzeblajVerticoj[a] = 1; uzeblajVerticoj[b] = 1;
        uzeblajVerticoj[c] = 1; uzeblajVerticoj[d] = 1;
      }
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      const h = alteco(pozicioj[i * 3], pozicioj[i * 3 + 2]);
      hoj[i] = h;
      pozicioj[i * 3 + 1] = h;
    }
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( uzeblajVerticoj[i] === 0 ) continue;
      const x = pozicioj[i * 3], z = pozicioj[i * 3 + 2];
      const h = hoj[i];
      const cxelo = i % sx;
      const haga = ( cxelo > 0 && cxelo < sx - 1 && i >= sx && i < raqa.count - sx )
        ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + sx] - hoj[i - sx]) / ( 2 * vepat6ni )
        : 0;
      terenaKoloroEn(c, h, x, z, haga, akvaNiveloProksima);
      haweh2[i * 3] = c.r; haweh2[i * 3 + 1] = c.g; haweh2[i * 3 + 2] = c.b;
    }
    const premita = { x: 0, z: 0 };
    for ( let i = 0; i < raqa.count; i++ ) {
      if ( premuAlFormo(mapoFormo, mapoGrandeco, pozicioj[i * 3], pozicioj[i * 3 + 2], premita) ) {
        pozicioj[i * 3] = premita.x;
        pozicioj[i * 3 + 2] = premita.z;
      }
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
    const ĉiujIndeksoj = alternajDiagonalojn(segmentoj);
    g.setIndex(new THREE.BufferAttribute(ĉiujIndeksoj, 1));
    // ⟨ គណនានរម៉ាល់ពីធរណីមាត្រពេញ ដើម្បីឱ្យគែមដែលនៅសល់មានពន្លឺដូចដើម 📃 ⟩
    g.computeVertexNormals();
    const videblajIndeksoj = ĉiujIndeksoj.filter(( _, i ) =>
      uzeblajĈeloj[Math.floor(i / 0o6)] !== 0);
    g.setIndex(new THREE.BufferAttribute(videblajIndeksoj, 1));
    // ⟨ វាយនភាពចម្លាក់ , តែលើឧបករណ៍ខ្លាំង 📃 ⟩
    // ⟨ ស្មៅរាបស្មើ ៖ កម្ពស់ស្រមោលតិចជាងមុន , ដូច្នេះដីមិនមានរណ្តៅស្រួច 📃 ⟩
    const grundMaterialo = fadaGrundon(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kreiGrundanTeksajxon(),
      bumpMap: kreiGrundanBumpanTeksajxon(),
      bumpScale: 0o2/0o10,
    }));
    const ground = new THREE.Mesh(g, grundMaterialo);
    ground.receiveShadow = true;
    qena.add(ground);

    // ⟪ គែមពិភពលោក 📃 ⟫
    const formoBazo = kreiFormanBazon({
      formo: mapoFormo, grandeco: mapoGrandeco, weh2: terenaStrataKoloroEn,
    });
    formoBazo.aktualigu(alteco, MONDO_BAZA_Y);
    const bazaMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    });
    const bazaMesh = new THREE.Mesh(formoBazo.geometrio, bazaMaterialo);
    bazaMesh.receiveShadow = true;
    bazaMesh.castShadow = true;
    bazaMesh.frustumCulled = false;
    qena.add(bazaMesh);

    const brosxaTeksajxo = kreiTerenanTeksajxon();
    // ⟨ ការរអិលជក់ 📃 ⟩
    const brosxaMaterialo = new THREE.MeshStandardMaterial({
      map: brosxaTeksajxo, color: 0xffffff, transparent: true,
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
      if ( centroY < akvaNivelo(x, z) + 0o1/0o10 ) continue;
      const ka5ik = 0o1 + bruo2D(x / 0o20, z / 0o20) * 0o2;
      if ( distancoDeFormo(mapoFormo, mapoGrandeco, x, z) > -ka5ik ) continue;
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
    // ⟨ យន្តហោះស្មើអង្កត់ផ្ចិតពិភពលោក ៖ ជំហាន 0o4 ដូចគ្នា
    // ដូច្នេះកម្ពស់ និងពណ៌ក្នុងពិភពលោកមិនប្រែប្រួល ។ យន្តហោះធំពីមុនបង្កើត
    // កំពូលជាង 80 ភាគ 100 នៅក្រៅទម្រង់ ហើយចុចវាត្រឡប់មកគែមវិញ ។
    // តំបន់នោះមានគម្របរួចហើយ ។ 📃 ⟩
  } )(0o1400, 0o300);

  // ⟪ វាលរាបជុំវិញ 📃 ⟫
  ( function konstruiĈirkaŭanEbenon(): void {
    const KOLONOJ = 0o200;
    const VICOJ = 0o40;
    const fora = 0o6000;
    const kolonoj = KOLONOJ + 1;
    const vicoj = VICOJ + 1;
    const N = kolonoj * vicoj;
    const pozicioj = new Float32Array(N * 3);
    const haweh2 = new Float32Array(N * 3);
    const uvaj = new Float32Array(N * 2);
    const weh2 = new THREE.Color();
    for ( let v = 0; v < vicoj; v++ ) {
      const frac = v / VICOJ;
      for ( let k = 0; k < kolonoj; k++ ) {
        const i = v * kolonoj + k;
        const ang = k / KOLONOJ * Math.PI * 0o2;
        const pukaz = radiusaDistanco(mapoFormo, mapoGrandeco, ang);
        const r = pukaz + ( fora - pukaz ) * frac * frac;
        const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
        const ondado = ( bruo2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * frac;
        pozicioj[i * 3] = x;
        pozicioj[i * 3 + 1] = MONDO_BAZA_Y + ondado;
        pozicioj[i * 3 + 2] = z;
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
        const a = v * kolonoj + k, b = a + 1, c = a + kolonoj, d = c + 1;
        if ( ( k + v ) % 2 === 0 ) {
          havecax2lani.push(a, d, c, a, b, d);
        } else {
          havecax2lani.push(a, b, c, b, d, c);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    g.setIndex(havecax2lani);
    g.computeVertexNormals();
    const ebeno = new THREE.Mesh(g, fadaGrundon(new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kreiGrundanTeksajxon(),
    })));
    ebeno.frustumCulled = false;
    qena.add(ebeno);
  } )();

  ( function konstruiNebulringon(): void {
    const ekstera = 0o2000;
    const teksajxo = kreiNebulTavolanTeksajxon();
    const pukek = new THREE.MeshBasicMaterial({
      map: teksajxo, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const g = new THREE.PlaneGeometry(2 * ekstera, 2 * ekstera, 0o100, 0o100);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    const haweh2 = new Float32Array(pos.count * 4);
    const uvaj = new Float32Array(pos.count * 2);
    for ( let i = 0; i < pos.count; i++ ) {
      const x = pos.getX(i), z = pos.getZ(i);
      const alfa = glataPaso(0, 0o600, distancoDeFormo(mapoFormo, mapoGrandeco, x, z));
      haweh2[i * 4] = 1; haweh2[i * 4 + 1] = 1; haweh2[i * 4 + 2] = 1; haweh2[i * 4 + 3] = alfa;
      uvaj[i * 2] = x / 0o100; uvaj[i * 2 + 1] = z / 0o100;
    }
    g.setAttribute("color", new THREE.BufferAttribute(haweh2, 4));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    // ⟨ ក្រឡាដែលមានអាល់ហ្វាសូន្យនៅទាំងបួនជ្រុងមិនបង្ហាញអ្វីទេ ។ ដកវាចេញ
    //   ដើម្បីកុំគូរផ្ទៃថ្លាទទេ ខណៈក្រឡារសាត់នៅដដែលទាំងស្រុង 📃 ⟩
    const nebulajIndeksoj = g.getIndex()!.array.filter(( _, i ) => {
      const ĉelo = Math.floor(i / 0o6);
      const x = ĉelo % 0o100, z = Math.floor(ĉelo / 0o100);
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

  return { bildilo, qena, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio: MAKS_RATIO };
}
