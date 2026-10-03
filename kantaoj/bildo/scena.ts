// ≺⧼ ឆាក 🎬 ⧽≻
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { alteco, akvaNivelo, akvaNiveloProksima, glataPaso } from "../mondo/tereno.js";
import { kreiDioritanMaterialon, kreiAndezitanMaterialon, kreiFenestranMaterialon, kreiOranMaterialon } from "../../eskekoj/komunajxoj/materialoj.js";
import { kreiGrundanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/grundo.js";
import { kreiGrundanBumpanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/grundo-bumpo.js";
import { kreiNebulTavolanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/nebula-tavolo.js";
import { kreiTerenanTeksajxon } from "../../eskekoj/komunajxoj/teksajxoj/tereno.js";
import { bruo2D, alternajDiagonalojn, terenaKoloroEn,
  terenaStrataKoloroEn } from "../../eskekoj/komunajxoj/terenkoloroj.js";
import { premuAlFormo, distancoDeFormo, radiusaDistanco, kreiFormanBazon,
  MONDO_BAZA_Y } from "../../eskekoj/komunajxoj/mapformo.js";
import { aktivaMapo } from "../tero-datumaro/mapregulo.js";
import { gxisdatigiSteleanVitron } from "../../eskekoj/konstruajxoj/satalaj/vitro.js";
import { montriEraronon } from "./scena/eraro.js";
import { MAKS_RATIO, MULT_SAMPLEA, OMBRA_MAPO, surPosxtelefono } from "./scena/aparato.js";
import { kreiCxielon } from "./scena/cxielo.js";
import { NEBULA_DENSO, kreiPaletrojn } from "./scena/paletroj.js";
import { kreiVeterajnPartiklojn } from "./scena/precipitajxo.js";
import type { ScenaSistemo, Vetero } from "./scena/tipoj.js";

export function kreiScenon(kanvaso: HTMLCanvasElement, sxargxaEl: HTMLElement): ScenaSistemo {
  let bildilo: THREE.WebGLRenderer;
  try {
    bildilo = new THREE.WebGLRenderer({ canvas: kanvaso, antialias: MULT_SAMPLEA, powerPreference: "high-performance" });
  } catch {
    montriEraronon(sxargxaEl);
    throw new Error("WebGL ne havebla");
  }
  bildilo.outputColorSpace = THREE.SRGBColorSpace;
  bildilo.toneMapping = THREE.ACESFilmicToneMapping;
  bildilo.shadowMap.enabled = true;
  bildilo.shadowMap.type = THREE.PCFShadowMap;
  // ⟪ ចង្វាក់ស្រមោល 📃 ⟫
  bildilo.shadowMap.autoUpdate = false;
  bildilo.shadowMap.needsUpdate = true;
  bildilo.setPixelRatio(Math.min(devicePixelRatio, MAKS_RATIO));
  // ⟪ ច្រកផ្លាស់ប្តូរ , បានលុប 📃 ⟫
  // ⟨ អ្វីដែលបានប្រែ 📃 ⟩
  bildilo.setSize(innerWidth, innerHeight);

  const sceno = new THREE.Scene();
  // ⟨ ហេតុអ្វីដង់ស៊ីតេបាលេត 📃 ⟩
  sceno.fog = new THREE.FogExp2(0xc8d8d8, NEBULA_DENSO);

  const fotilo = new THREE.PerspectiveCamera(0o60, innerWidth / innerHeight, 0o15/0o40, 0o1400);
  fotilo.position.set(0o40, 0o30, 0o100);
  fotilo.rotation.order = "YXZ";

  const fotilaDuTan = 2 * Math.tan(fotilo.fov * Math.PI / 360);

  const pmremGenerilo = new THREE.PMREMGenerator(bildilo);
  sceno.environment = pmremGenerilo.fromScene(new RoomEnvironment(bildilo), 0o1/0o40).texture;
  pmremGenerilo.dispose();

  const { cxielo, cxielajUniformoj } = kreiCxielon(sceno);

  // ⟪ ពន្លឺ 📃 ⟫
  const hemiLumo = new THREE.HemisphereLight(0xc8e0e8, 0x485848, 0o63/0o100);
  sceno.add(hemiLumo);
  const suno = new THREE.DirectionalLight(0xf8f0d8, 0o45/0o40);
  suno.position.set(0o110, 0o160, 0o40);
  suno.castShadow = true;
  suno.shadow.mapSize.set(OMBRA_MAPO, OMBRA_MAPO);
  suno.shadow.camera.left = -0o100; suno.shadow.camera.right = 0o100;
  suno.shadow.camera.top = 0o100; suno.shadow.camera.bottom = -0o100;
  suno.shadow.camera.near = 0o20; suno.shadow.camera.far = 0o520;
  suno.shadow.camera.updateProjectionMatrix();
  suno.shadow.bias = -0o1 / ( 0o2 * OMBRA_MAPO ); suno.shadow.normalBias = 0o4/0o10;
  sceno.add(suno, suno.target);

  // ⟪ ស្ព្រាយព្រះអាទិត្យ 📃 ⟫
  const molaTeksturo = ( () => {
    const cv = document.createElement("canvas"); cv.width = cv.height = 0o400;
    const ctx = cv.getContext("2d")!;
    const gr = ctx.createRadialGradient(0o200, 0o200, 0o10, 0o200, 0o200, 0o200);
    gr.addColorStop(0, "rgba(255,255,255,0.85)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.fillRect(0, 0, 0o400, 0o400);
    return new THREE.CanvasTexture(cv);
  } )();
  const sunaSprajto = new THREE.Sprite(new THREE.SpriteMaterial({
    map: molaTeksturo, color: 0xf8f0d8, transparent: true, opacity: 0o30/0o100,
    blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
  }));
  sunaSprajto.scale.setScalar(0o56);
  sceno.add(sunaSprajto);

  const PALETROJ = kreiPaletrojn();

  let nunaVetero: Vetero = "nebula";
  let lastaKrepusko = 0;

  // ⟪ ស្រមោលព្រះអាទិត្យ 📃 ⟫
  const ombraTekselo = ( suno.shadow.camera.right - suno.shadow.camera.left ) / suno.shadow.mapSize.x;
  const SUNA_DIREKTO = new THREE.Vector3().copy(suno.position).normalize();
  let sunaDistanco = suno.position.length();
  const OMBRA_DIR = new THREE.Vector3();
  const OMBRA_DEX = new THREE.Vector3();
  const OMBRA_SUP = new THREE.Vector3();
  const OMBRA_CENTRO = new THREE.Vector3();
  let ombraCentroX = 0, ombraCentroZ = 0;

  function aplikiOmbranCentron(): void {
    OMBRA_DIR.copy(SUNA_DIREKTO);
    const distanco = sunaDistanco;
    if ( distanco === 0 ) return;
    OMBRA_SUP.set(0, 1, 0);
    if ( Math.abs(OMBRA_DIR.y) > 0o777/0o1000 ) OMBRA_SUP.set(0, 0, 1);
    OMBRA_DEX.crossVectors(OMBRA_SUP, OMBRA_DIR).normalize();
    OMBRA_SUP.crossVectors(OMBRA_DIR, OMBRA_DEX).normalize();
    const dekstre = Math.round(( ombraCentroX * OMBRA_DEX.x + ombraCentroZ * OMBRA_DEX.z ) / ombraTekselo) * ombraTekselo;
    const supre = Math.round(( ombraCentroX * OMBRA_SUP.x + ombraCentroZ * OMBRA_SUP.z ) / ombraTekselo) * ombraTekselo;
    OMBRA_CENTRO.set(0, 0, 0).addScaledVector(OMBRA_DEX, dekstre).addScaledVector(OMBRA_SUP, supre);
    suno.target.position.copy(OMBRA_CENTRO);
    suno.position.copy(OMBRA_CENTRO).addScaledVector(OMBRA_DIR, distanco);
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
      a instanceof THREE.Color ? ( a as THREE.Color ).clone().lerp(b as THREE.Color, t) :
      a instanceof THREE.Vector3 ? ( a as THREE.Vector3 ).clone().lerp(b as THREE.Vector3, t) :
      a + ( b as number - a ) * t;
    cxielajUniformoj.uTop.value = l(d.tago.top, d.krepusko.top);
    cxielajUniformoj.uMid.value = l(d.tago.mid, d.krepusko.mid);
    cxielajUniformoj.uBot.value = l(d.tago.bot, d.krepusko.bot);
    cxielajUniformoj.uSunCol.value = l(d.tago.sunCol, d.krepusko.sunCol);
    const sunDir = new THREE.Vector3().copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    cxielajUniformoj.uSunDir.value = sunDir.clone().normalize();
    sceno.fog!.color.copy(d.tago.fog).lerp(d.krepusko.fog, t);
    ( sceno.fog as THREE.FogExp2 ).density = l(d.tago.nebulDenso, d.krepusko.nebulDenso);
    hemiLumo.color.copy(d.tago.hemiSky).lerp(d.krepusko.hemiSky, t);
    hemiLumo.groundColor.copy(d.tago.hemiGnd).lerp(d.krepusko.hemiGnd, t);
    hemiLumo.intensity = l(d.tago.hemiInt, d.krepusko.hemiInt);
    suno.color.copy(d.tago.sunCol).lerp(d.krepusko.sunCol, t);
    suno.intensity = l(d.tago.sunInt, d.krepusko.sunInt);
    SUNA_DIREKTO.copy(d.tago.sunPos).lerp(d.krepusko.sunPos, t);
    sunaDistanco = SUNA_DIREKTO.length();
    if ( sunaDistanco > 0 ) SUNA_DIREKTO.divideScalar(sunaDistanco);
    aplikiOmbranCentron();
    bildilo.toneMappingExposure = l(d.tago.ekspozicio, d.krepusko.ekspozicio);
    sunaSprajto.position.copy(sunDir).multiplyScalar(0o510);
    sunaSprajto.material.color.copy(suno.color);
    sunaSprajto.material.opacity = l(d.tago.sprajtaOp, d.krepusko.sprajtaOp);
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

  const { pluvo, nego, hajlo } = kreiVeterajnPartiklojn(sceno);

  // ⟪ រូបរាងពិភពលោក 📃 ⟫
  const aktivaMapoDatumoj = aktivaMapo();
  const mapoFormo = aktivaMapoDatumoj.formo;
  const mapoGrandeco = aktivaMapoDatumoj.grandeco;

  const montaGrupo = new THREE.Group();
  sceno.add(montaGrupo);

  // ⟨ ភ្នំតាមរូបរាងផែនទី 📃 ⟩
  ( function konstruiMontojn(): void {
    function montaAlto(px: number, pz: number, semo: number): number {
      const x = px / 0o100 + semo * 0o10;
      const z = pz / 0o100 + semo * 0o20 + 0o20;
      const malglata = ( u: number, v: number ): number => 1 - Math.abs(2 * bruo2D(u, v) - 1);
      const maso = bruo2D(x, z);
      // ⟨ ជ្រលង 📃 ⟩
      const valo = 0.35 + 0.65 * maso * maso;
      const pinto = malglata(x * 0o3, z * 0o3);
      const fajno = malglata(x * 0o4, z * 0o4);
      // ⟨ ឆ្អឹងខ្នង 📃 ⟩
      const spino = malglata(x * ( 0o3/0o2 ) + 0o13, z * ( 0o3/0o2 ) + 0o27);
      // ⟨ ធ្មេញ 📃 ⟩
      const dentoj = malglata(x * 0o10, z * 0o10);
      const grajno = malglata(x * 0o22, z * 0o22);
      // ⟨ មាត្រទាំងមូល 📃 ⟩
      return 0o13
        + 0o36 * maso
        + 0o10 * spino * ( 0o60/0o100 + 0o40/0o100 * ( 1 - maso ))
        + 0o24 * pinto * valo
        + 0o10 * fajno * ( 0o40/0o100 + 0o60/0o100 * valo )
        + 0o03 * dentoj * ( 0o40/0o100 + 0o60/0o100 * maso )
        + 0o02 * grajno * valo;
    }

    const NEBUL_TONO = new THREE.Color(0xc8d8d8);

    function montaKoloroEn(celo: THREE.Color, y: number, x: number, z: number,
      deklivo: number, malproksimo: number): void {
      const negxaOndo = ( bruo2D(x / 0o70, z / 0o70) - 0o1/0o2 ) * 0o16
        + ( bruo2D(x / 0o16, z / 0o16) - 0o1/0o2 ) * 0o7;
      terenaKoloroEn(celo, y + negxaOndo, x, z, deklivo);
      if ( malproksimo > 0 ) celo.lerp(NEBUL_TONO, malproksimo * 0o35/0o100);
    }

    // ⟨ វាយនភាពដូចដី 📃 ⟩
    const montaGrundo = kreiGrundanTeksajxon();
    const montaReliefo = kreiGrundanBumpanTeksajxon();
    const montaMaterialo = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o35/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    });
    const montaFona = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0o37/0o40, metalness: 0, vertexColors: true,
      map: montaGrundo, bumpMap: montaReliefo, bumpScale: 0o5/0o10,
      side: THREE.DoubleSide,
    });

    function ringaPunkto(disto: number, ang: number): { x: number; z: number; nx: number; nz: number } {
      const rando = radiusaDistanco(mapoFormo, mapoGrandeco, ang) + disto;
      const x = Math.cos(ang) * rando, z = Math.sin(ang) * rando;
      const pa = 0o1/0o2000;
      const ra = radiusaDistanco(mapoFormo, mapoGrandeco, ang - pa) + disto;
      const rb = radiusaDistanco(mapoFormo, mapoGrandeco, ang + pa) + disto;
      const tx = Math.cos(ang + pa) * rb - Math.cos(ang - pa) * ra;
      const tz = Math.sin(ang + pa) * rb - Math.sin(ang - pa) * ra;
      const longo = Math.hypot(tx, tz) || 1;
      let nx = -tz / longo, nz = tx / longo;
      if ( nx * Math.cos(ang) + nz * Math.sin(ang) < 0 ) { nx = -nx; nz = -nz; }
      return { x, z, nx, nz };
    }

    function krestaVagado(bazo: number, vario: number, semo: number): ( ang: number ) => number {
      return ( ang: number ): number =>
        bazo + ( bruo2D(Math.cos(ang) * 0o4 + semo, Math.sin(ang) * 0o4 + semo * 0o3) - 0o1/0o2 ) * vario;
    }

    function krestaAlto(bazoS: number, semo: number): ( ang: number ) => number {
      return ( ang: number ): number => {
        const u = Math.cos(ang) * 0o4 + semo;
        const v = Math.sin(ang) * 0o4 + semo * 0o3;
        return bazoS * ( 0o3/0o10 + 0o5/0o10 * bruo2D(u, v) + 0o2/0o10 * bruo2D(u * 0o3 + 0o7, v * 0o3 + 0o5) );
      };
    }

    function kreiMontanRingon(
      kresto: ( ang: number ) => number,
      profundo: number, sl: number, sd: number,
      semo: number, skalo: ( ang: number ) => number, malproksimo: number,
      materialo: THREE.MeshStandardMaterial,
): void {
      const kolonoj = sl + 1;
      const vicoj = sd + 1;
      const suprN = kolonoj * vicoj;
      const fundo = MONDO_BAZA_Y - 0o4;
      const pozicioj = new Float32Array(suprN * 2 * 3);
      const koloroj = new Float32Array(suprN * 2 * 3);
      // ⟨ UV ដី 📃 ⟩
      const uvaj = new Float32Array(suprN * 2 * 2);
      const pasxoProfundo = profundo / sd;
      const pasxoAngulo = 2 * Math.PI * ( mapoGrandeco + 0o100 ) / sl;
      const altoj = new Float32Array(suprN);
      // ⟪ ផ្ទៃលើ 📃 ⟫
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const tn = v / sd;
          const ang = k / sl * Math.PI * 0o2;
          const ringo = ringaPunkto(kresto(ang), ang);
          const x = ringo.x + ringo.nx * tn * profundo;
          const z = ringo.z + ringo.nz * tn * profundo;
          // ⟨ ប្រវែងកាត់ភ្នំ 📃 ⟩
          const centro = 0o40/0o100 + 0o24/0o100 * bruo2D(x / 0o40 + semo * 0o10, z / 0o40 + semo * 0o30);
          const kr = Math.min(1, tn / centro);
          const kresko = kr * kr * ( 3 - 2 * kr );
          const fal = glataPaso(centro, 1, tn);
          const profilo = kresko * ( 1 - fal );
          // ⟨ ការភ្ជាប់ទៅពិភពលោក 📃 ⟩
          const bordo = alteco(ringo.x, ringo.z);
          const aligo = 1 - glataPaso(0, 0o1/0o4, tn);
          // ⟨ កម្ពស់មកពីកំពូល មិនមែនពីកំពូលភ្នំ 📃 ⟩
          const y = bordo * aligo
            + montaAlto(x, z, semo) * skalo(ang) * profilo
            + MONDO_BAZA_Y * fal;
          altoj[i] = y;
          pozicioj[i * 3] = x; pozicioj[i * 3 + 1] = y; pozicioj[i * 3 + 2] = z;
          const uvx = x / 0o3000 + 0o1/0o2, uvz = z / 0o3000 + 0o1/0o2;
          uvaj[i * 2] = uvx; uvaj[i * 2 + 1] = uvz;
          const b = i + suprN;
          pozicioj[b * 3] = x; pozicioj[b * 3 + 1] = fundo; pozicioj[b * 3 + 2] = z;
          uvaj[b * 2] = uvx; uvaj[b * 2 + 1] = uvz;
        }
      }
      // ⟨ ពណ៌ 📃 ⟩
      const montaKoloro = new THREE.Color();
      for ( let v = 0; v < vicoj; v ++ ) {
        for ( let k = 0; k < kolonoj; k ++ ) {
          const i = v * kolonoj + k;
          const x = pozicioj[i * 3], y = altoj[i], z = pozicioj[i * 3 + 2];
          const km = ( k + sl - 1 ) % sl, kp = ( k + 1 ) % sl;
          const vm = ( v > 0 ? v - 1 : v ) * kolonoj + k;
          const vp = ( v < sd ? v + 1 : v ) * kolonoj + k;
          const dAng = ( altoj[v * kolonoj + kp] - altoj[v * kolonoj + km] ) / ( 2 * pasxoAngulo );
          const dProf = ( altoj[vp] - altoj[vm] ) / ( 2 * pasxoProfundo );
          montaKoloroEn(montaKoloro, y, x, z, Math.hypot(dAng, dProf), malproksimo);
          koloroj[i * 3] = montaKoloro.r;
          koloroj[i * 3 + 1] = montaKoloro.g;
          koloroj[i * 3 + 2] = montaKoloro.b;
          const b = i + suprN;
          terenaStrataKoloroEn(montaKoloro, fundo, y);
          koloroj[b * 3] = montaKoloro.r;
          koloroj[b * 3 + 1] = montaKoloro.g;
          koloroj[b * 3 + 2] = montaKoloro.b;
        }
      }
      const indeksoj: number[] = [];
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = v * kolonoj + k, c = a + kolonoj, d = c + 1;
          if ( ( k + v ) % 2 === 0 ) {
            indeksoj.push(a, c, d, a, d, a + 1);
          } else {
            indeksoj.push(a, c, a + 1, c, d, a + 1);
          }
        }
      }
      for ( let v = 0; v < sd; v ++ ) {
        for ( let k = 0; k < sl; k ++ ) {
          const a = suprN + v * kolonoj + k, c = a + kolonoj, d = c + 1;
          if ( ( k + v ) % 2 === 0 ) {
            indeksoj.push(a, d, c, a, a + 1, d);
          } else {
            indeksoj.push(a, a + 1, c, a + 1, d, c);
          }
        }
      }
      const muro = ( a: number, b: number ): void => {
        indeksoj.push(a, b, b + suprN, a, b + suprN, a + suprN);
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
      g.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
      g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
      g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
      g.setIndex(indeksoj);
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, materialo);
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      montaGrupo.add(mesh);
    }

    // ⟨ ដង់ស៊ីតេប៉ុន្មាន 📃 ⟩
    const ringajKolonoj = 0o2000;

    // ⟨ ស្រទាប់ភ្នំ 📃 ⟩
    kreiMontanRingon(krestaVagado(0o16, 0o10, 0o123/0o100), 0o240, ringajKolonoj, 0o40,
      0o123/0o100, krestaAlto(1, 0o123/0o100), 0, montaMaterialo);

    kreiMontanRingon(krestaVagado(0o200, 0o60, 0o123/0o100 + 0o40), 0o200, ringajKolonoj, 0o30,
      0o123/0o100 + 0o20, krestaAlto(0o7/0o10, 0o123/0o100 + 0o20), 0o35/0o100, montaFona);
  } )();

  // ⟪ ដី 📃 ⟫
  ( function konstruiTerenon(grandeco: number, segmentoj: number): void {
    const g = new THREE.PlaneGeometry(grandeco, grandeco, segmentoj, segmentoj);
    g.rotateX(-Math.PI / 2);
    g.setIndex(new THREE.BufferAttribute(alternajDiagonalojn(segmentoj), 1));
    const pozicio = g.attributes.position;
    // ⟨ តារាងដើម 📃 ⟩
    const pozicioj = pozicio.array as Float32Array;
    const koloroj = new Float32Array(pozicio.count * 3);
    const c = new THREE.Color();
    const pasxo = grandeco / segmentoj;
    const sx = segmentoj + 1;
    const hoj = new Float32Array(pozicio.count);
    for ( let i = 0; i < pozicio.count; i++ ) {
      const h = alteco(pozicioj[i * 3], pozicioj[i * 3 + 2]);
      hoj[i] = h;
      pozicioj[i * 3 + 1] = h;
    }
    for ( let i = 0; i < pozicio.count; i++ ) {
      const x = pozicioj[i * 3], z = pozicioj[i * 3 + 2];
      const h = hoj[i];
      const cxelo = i % sx;
      const deklivo = ( cxelo > 0 && cxelo < sx - 1 && i >= sx && i < pozicio.count - sx )
        ? Math.hypot(hoj[i + 1] - hoj[i - 1], hoj[i + sx] - hoj[i - sx]) / ( 2 * pasxo )
        : 0;
      terenaKoloroEn(c, h, x, z, deklivo, akvaNiveloProksima);
      koloroj[i * 3] = c.r; koloroj[i * 3 + 1] = c.g; koloroj[i * 3 + 2] = c.b;
    }
    const premita = { x: 0, z: 0 };
    for ( let i = 0; i < pozicio.count; i++ ) {
      if ( premuAlFormo(mapoFormo, mapoGrandeco, pozicioj[i * 3], pozicioj[i * 3 + 2], premita) ) {
        pozicioj[i * 3] = premita.x;
        pozicioj[i * 3 + 2] = premita.z;
      }
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.computeVertexNormals();
    // ⟨ វាយនភាពចម្លាក់ , តែលើឧបករណ៍ខ្លាំង 📃 ⟩
    const grundMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10,
      map: kreiGrundanTeksajxon(),
      bumpMap: surPosxtelefono ? undefined : kreiGrundanBumpanTeksajxon(),
      bumpScale: 0o5/0o10,
    });
    const ground = new THREE.Mesh(g, grundMaterialo);
    ground.receiveShadow = true;
    sceno.add(ground);

    // ⟪ គែមពិភពលោក 📃 ⟫
    const formoBazo = kreiFormanBazon({
      formo: mapoFormo, grandeco: mapoGrandeco, koloro: terenaStrataKoloroEn,
    });
    formoBazo.aktualigu(alteco, MONDO_BAZA_Y);
    const bazaMaterialo = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1, metalness: 0,
    });
    const bazaMesh = new THREE.Mesh(formoBazo.geometrio, bazaMaterialo);
    bazaMesh.receiveShadow = true;
    bazaMesh.castShadow = true;
    bazaMesh.frustumCulled = false;
    sceno.add(bazaMesh);

    const brosxaTeksajxo = kreiTerenanTeksajxon();
    // ⟨ ការរអិលជក់ 📃 ⟩
    const brosxaMaterialo = new THREE.MeshStandardMaterial({
      map: brosxaTeksajxo, color: 0xffffff, transparent: true,
      alphaTest: 0o1/0o10, depthWrite: false, side: THREE.DoubleSide, roughness: 1,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    const brosxoj = new THREE.Group();
    const brosxaNombro = 0o30;
    for ( let i = 0; i < brosxaNombro; i++ ) {
      const bruo = bruo2D(i * 0o7/0o10, i * 0o11/0o10);
      const angulo = i * 2.399963 + bruo * 0o1/0o2;
      const disto = 0o30 + bruo2D(i * 0o13/0o10, i * 0o17/0o10) * 0o300;
      const x = Math.cos(angulo) * disto;
      const z = Math.sin(angulo) * disto;
      const centroY = alteco(x, z);
      if ( centroY < akvaNivelo(x, z) + 0o1/0o10 ) continue;
      const radiuso = 0o2 + bruo2D(x / 0o20, z / 0o20) * 0o4;
      if ( distancoDeFormo(mapoFormo, mapoGrandeco, x, z) > -radiuso ) continue;
      const brosxaGeometrio = new THREE.CircleGeometry(radiuso, 0o10);
      brosxaGeometrio.rotateX(-Math.PI / 2);
      const pp = brosxaGeometrio.attributes.position;
      for ( let j = 0; j < pp.count; j++ ) {
        const dx = pp.getX(j), dz = pp.getZ(j);
        pp.setY(j, alteco(x + dx, z + dz) - centroY + 0o1/0o100);
      }
      brosxaGeometrio.computeVertexNormals();
      const brosxo = new THREE.Mesh(brosxaGeometrio, brosxaMaterialo);
      brosxo.position.set(x, centroY, z);
      brosxo.rotation.y = bruo * Math.PI * 2;
      brosxoj.add(brosxo);
    }
    sceno.add(brosxoj);
  } )(0o3000, 0o600);

  // ⟪ វាលរាបជុំវិញ 📃 ⟫
  ( function konstruiĈirkaŭanEbenon(): void {
    const KOLONOJ = 0o200;
    const VICOJ = 0o40;
    const fora = 0o6000;
    const kolonoj = KOLONOJ + 1;
    const vicoj = VICOJ + 1;
    const N = kolonoj * vicoj;
    const pozicioj = new Float32Array(N * 3);
    const koloroj = new Float32Array(N * 3);
    const uvaj = new Float32Array(N * 2);
    const koloro = new THREE.Color();
    for ( let v = 0; v < vicoj; v++ ) {
      const frac = v / VICOJ;
      for ( let k = 0; k < kolonoj; k++ ) {
        const i = v * kolonoj + k;
        const ang = k / KOLONOJ * Math.PI * 0o2;
        const rando = radiusaDistanco(mapoFormo, mapoGrandeco, ang);
        const r = rando + ( fora - rando ) * frac * frac;
        const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
        const ondado = ( bruo2D(x / 0o200, z / 0o200) - 0o1/0o2 ) * 0o20 * frac;
        pozicioj[i * 3] = x;
        pozicioj[i * 3 + 1] = MONDO_BAZA_Y + ondado;
        pozicioj[i * 3 + 2] = z;
        terenaKoloroEn(koloro, 0, x, z, 0);
        koloroj[i * 3] = koloro.r;
        koloroj[i * 3 + 1] = koloro.g;
        koloroj[i * 3 + 2] = koloro.b;
        uvaj[i * 2] = x / 0o3000 + 0o1/0o2;
        uvaj[i * 2 + 1] = z / 0o3000 + 0o1/0o2;
      }
    }
    const indeksoj: number[] = [];
    for ( let v = 0; v < VICOJ; v++ ) {
      for ( let k = 0; k < KOLONOJ; k++ ) {
        const a = v * kolonoj + k, b = a + 1, c = a + kolonoj, d = c + 1;
        if ( ( k + v ) % 2 === 0 ) {
          indeksoj.push(a, d, c, a, b, d);
        } else {
          indeksoj.push(a, b, c, b, d, c);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pozicioj, 3));
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    g.setIndex(indeksoj);
    g.computeVertexNormals();
    const ebeno = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0o7/0o10, map: kreiGrundanTeksajxon(),
    }));
    ebeno.frustumCulled = false;
    sceno.add(ebeno);
  } )();

  ( function konstruiNebulringon(): void {
    const ekstera = 0o2000;
    const teksajxo = kreiNebulTavolanTeksajxon();
    const materialo = new THREE.MeshBasicMaterial({
      map: teksajxo, transparent: true, vertexColors: true, depthWrite: false,
      side: THREE.DoubleSide, fog: false,
    });
    const g = new THREE.PlaneGeometry(2 * ekstera, 2 * ekstera, 0o100, 0o100);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    const koloroj = new Float32Array(pos.count * 4);
    const uvaj = new Float32Array(pos.count * 2);
    for ( let i = 0; i < pos.count; i++ ) {
      const x = pos.getX(i), z = pos.getZ(i);
      const alfa = glataPaso(0, 0o600, distancoDeFormo(mapoFormo, mapoGrandeco, x, z));
      koloroj[i * 4] = 1; koloroj[i * 4 + 1] = 1; koloroj[i * 4 + 2] = 1; koloroj[i * 4 + 3] = alfa;
      uvaj[i * 2] = x / 0o100; uvaj[i * 2 + 1] = z / 0o100;
    }
    g.setAttribute("color", new THREE.BufferAttribute(koloroj, 4));
    g.setAttribute("uv", new THREE.BufferAttribute(uvaj, 2));
    const mesh = new THREE.Mesh(g, materialo);
    mesh.position.y = 0o1/0o40;
    mesh.frustumCulled = false;
    sceno.add(mesh);
  } )();

  return { bildilo, sceno, fotilo, dioritaMaterialo, andezitaMaterialo, eniraMaterialo, oraMaterialo, cxielo, cxielajUniformoj, hemiLumo, suna: suno, sunaSprajto, aplikiRezimon, aplikiVeteron, gxisdatigiVeteron, gxisdatigiOmbron, maksimumaRatio: MAKS_RATIO };
}
