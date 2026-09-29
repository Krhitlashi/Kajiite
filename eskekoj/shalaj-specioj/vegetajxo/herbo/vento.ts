// ≺⧼ La vento de la herbo 🌬 ⧽≻
// La komuna herba materialo ( kreiHerbanMaterialon ) kun la venta shadero, la
// paŝantoj ( la gazono cedas sub la piedoj ), la per-kadra ĝisdatigo
// ( gxisdatigiHerbon ) kaj la du registroj de la sistemo — la ventoj kaj la
// tabuloj de la kontinua gazono ( herbajTavoloj ). La tabuloj skribiĝas en
// gazono.ts, sed la sama per-kadra voko legas ilin, do la listo vivas ĉi tie.
import * as THREE from "three";
import { kreiHerbanKlinganTeksajxon } from "../../../komunajxoj/teksajxoj/klinga-herbo.js";

// ⟪ La paŝantoj de la gazono 📃 ⟫ — la herbo ne nur svingiĝas en la vento, ĝi
// ankaŭ CEDAS sub la piedoj. La figurantoj de la mondo ( la ludanto, la NPC-oj,
// la bestoj ) premas la klingojn for de si kaj malsupren, do la gazono
// malfermiĝas tie, kie oni iras, kaj fermiĝas poste — la sama herbo, kiu svingiĝas
// sola, fleksiĝas kiam iu trapasas ĝin.
// ⟨ Fiksa tabelo 📃 ⟩ — la uniforma tabelo de la shadero devas havi KONSTANTAN
// longon ( en GLSL ES 1.00 la indekso de tabelo povas esti nur la glito de
// buklo kun konstantaj limoj ), do nur la kvar plej proksimaj figuroj premas. La
// ceteraj glitoj havas forton 0 kaj la shadero preterlasas ilin sen kosto.
export const HERBA_PUSANTOJ = 0o4;    // 4 — la glitoj de la uniforma tabelo
const HERBA_PUSA_RADIO = 0o13/0o10;   // 1.375 — la radiuso de unu piedo ( mondunuoj )

// ⟪ La vento de la herbo 📃 ⟫ — La herbo svingiĝas, do la tereno vivas.
// Ĉiu herba materialo ( la herbo de la valo kaj de la ebenaĵo, la herbo ĉirkaŭ
// la lago, la herbotufoj de la miksaj makuloj kaj la herba kampo sube ) ricevas
// la saman venton kaj la saman distancan fadon. La vento sidas en la VERTICA
// SHADERO ( onBeforeCompile enŝovas ĝin en la ordinaran MeshStandardMaterial de
// three.js ), do la ombroj, la nebuloj kaj la lumoj restas la samaj, kaj la CPU
// nur skribas unu tempon kaj unu vidpunkton po kadro — nenia laboro po vertico
// sur la ĉeftrako.
interface HerbaVento {
  uTempo: THREE.IUniform;
  uFotilo: THREE.IUniform;
  uPusantoj: THREE.IUniform;
}
const herbajVentoj: HerbaVento[] = [];

// HerbaPusanto — Unu figuranto kiu premas la herbon per la piedoj ( la ludanto,
// unu NPC, unu besto ). La pozicio estas la grundo-punkto sub la figuro.
//     @param x, z ( number ) - La mondaj koordinatoj de la piedo.
//     @param radiuso ( number = HERBA_PUSA_RADIO , nedeviga ) - La radiuso de la
//         premo en mondunuoj.
//     @param forto ( number = 1 , nedeviga ) - Kiom forte la figuro premas
//         ( 0 aŭ malpli = la glito restas malplena kaj la shadero preterlasas ĝin ).
export interface HerbaPusanto {
  x: number;
  z: number;
  radiuso?: number;
  forto?: number;
}

// HerbaTavolo — unu tabulo de la kontinua gazono, kun la centro kaj la limo
// antaŭkalkulitaj, do la per-kadra vidlimo ( gxisdatigiHerbon ) nur komparas
// kvadratojn de distancoj kaj nenion mezuras.
export interface HerbaTavolo {
  mesho: THREE.InstancedMesh;
  cx: number;
  cz: number;
  limo: number;
}
// La tabuloj de la kontinua gazono — la listo pleniĝas en konstruiHerbanTavolon.
export const herbajTavoloj: HerbaTavolo[] = [];

// kreiHerbanMaterialon — La komuna herba materialo kun la vento kaj la
// distanca fado. La tufo svingiĝas laŭ sia propra mondo-pozicio ( ĉiu tufo havas
// sian propran fazon, do la herbejo ondiĝas kiel unu korpo anstataŭ moviĝi kiel
// grupo de samtempaj objektoj ) kaj laŭ la alto de la vertico ( la bazo restas
// en la tero kaj nur la klingoj moviĝas, kiel vera herbo ). Ĉe la limo la tufo
// malgrandiĝas al sia bazo, do la malproksima herbo solviĝas en la grundon
// anstataŭ aperi kaj malaperi kun dura rando.
//     @param limo ( number = 0o100 , nedeviga ) - La distanco kie la herbo plene
//         solviĝas. La fado komenciĝas je tri kvaronoj de ĝi.
//     @param teksajxo ( THREE.CanvasTexture = kreiHerbanKlinganTeksajxon() ,
//         nedeviga ) - La teksajxo de unu klingo. La ORIGINALA herbo ( la tufoj
//         de konstruiHerbon ) uzas la malnovan verdan klingon; la KONTINUA
//         tavolo ( konstruiHerbanTavolon ) donas la senkoloran teksajxon
//         ( kreiHerbanTavolanKlinganTeksajxon ), por ke la koloron alportu la
//         terena paletro de la per-makulaj verticaj koloroj.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La preta materialo.
export function kreiHerbanMaterialon(limo = 0o100,
  teksajxo: THREE.CanvasTexture = kreiHerbanKlinganTeksajxon()): THREE.MeshStandardMaterial {
  const uTempo = { value: 0 };
  const uFotilo = { value: new THREE.Vector2(0, 0) };
  const uLimo = { value: limo };
  // La glitoj de la paŝantoj — unu vec4 ( x, z, radiuso, forto ) po figuro. La
  // tabelo havas fiksan longon ( vidu HERBA_PUSANTOJ ); la malplenaj glitoj havas
  // forton 0 kaj la shadero preterlasas ilin.
  const uPusantoj = { value: Array.from({ length: HERBA_PUSANTOJ },
    () => new THREE.Vector4(0, 0, 0, 0)) };
  const materialo = new THREE.MeshStandardMaterial({
    map: teksajxo, side: THREE.DoubleSide,
    vertexColors: true, roughness: 1,
  });
  materialo.onBeforeCompile = ( shadero ) => {
    shadero.uniforms.uHerbaTempo = uTempo;
    shadero.uniforms.uHerbaFotilo = uFotilo;
    shadero.uniforms.uHerbaLimo = uLimo;
    shadero.uniforms.uHerbaPusantoj = uPusantoj;
    shadero.vertexShader = shadero.vertexShader.replace(
      "#include <common>",
      `#include <common>
      uniform float uHerbaTempo;
      uniform float uHerbaLimo;
      uniform vec2 uHerbaFotilo;
      uniform vec4 uHerbaPusantoj[ ${HERBA_PUSANTOJ} ];`
    ).replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      {
        vec3 herbaMondo = transformed;
        #ifdef USE_INSTANCING
        herbaMondo = ( instanceMatrix * vec4( transformed, 1.0 ) ).xyz;
        #endif
        float herbaDisto = distance( herbaMondo.xz, uHerbaFotilo );
        float herbaFado = 1.0 - smoothstep( uHerbaLimo * 0.75, uHerbaLimo, herbaDisto );
        float herbaMaske = clamp( transformed.y, 0.0, 1.0 );
        float herbaFazo = herbaMondo.x * 0.53125 + herbaMondo.z * 0.3125;
        float herbaOndo = sin( uHerbaTempo * 1.703125 + herbaFazo )
          + 0.5 * sin( uHerbaTempo * 3.09375 + herbaFazo * 1.90625 );
        transformed.x += herbaOndo * 0.109375 * herbaMaske * herbaMaske;
        transformed.z += herbaOndo * 0.0703125 * herbaMaske * herbaMaske;
        // ⟨ La paŝantoj 📃 ⟩ — la figurantoj ( la ludanto, la NPC-oj, la bestoj )
        // PREMAS la herbon per la piedoj. Ĉiu glito estas ( x, z, radiuso, forto )
        // kaj la klingo kliniĝas FOR de la piedo kaj malsupren — la pinto moviĝas
        // multe, la bazo restas en la tero.
        // ⟨ Kial tiel 📃 ⟩ — la delokigo estas MONDA ( la klingoj kliniĝas for de
        // la sama punkto, kiel veraj herboj sub ŝuo ), sed la verticoj sidas en la
        // loka spaco de la makulo. La konvertiĝo uzas la transponitan rotacion de
        // la instanca matrico — la sama ruzo kiel la normala matrico de three.js:
        // la kolonoj de mat3 ( nur rotacio kaj skalo ) dividiĝas per sia propra
        // longo, do la skalo ne malpurigas la direkton.
        #ifdef USE_INSTANCING
        vec3 pusxaSumo = vec3( 0.0 );
        for ( int pi = 0; pi < ${HERBA_PUSANTOJ}; pi ++ ) {
          vec4 pusxo = uHerbaPusantoj[ pi ];
          if ( pusxo.w <= 0.0 ) continue;
          vec2 pusxaFor = herbaMondo.xz - pusxo.xy;
          float pusxaDisto = length( pusxaFor );
          if ( pusxaDisto >= pusxo.z ) continue;
          vec2 pusxaDir = pusxaFor / max( pusxaDisto, 0.0001 );
          float pusxaPezo = 1.0 - pusxaDisto / pusxo.z;
          pusxaPezo *= pusxaPezo;
          // La klingoj svingiĝas iomete dum la piedo forpasas — la premo ne estas
          // rigida premilo, ĝi solviĝas ondetante.
          float pusxaOndo = 1.0 + 0.25 * sin( uHerbaTempo * 7.0 - pusxaDisto * 4.0 );
          pusxaSumo += vec3( pusxaDir.x, -0.6, pusxaDir.y )
            * ( pusxo.w * pusxaPezo * pusxaOndo );
        }
        mat3 pusxaM = mat3( instanceMatrix );
        vec3 pusxaLoka = vec3( dot( pusxaM[ 0 ], pusxaSumo ), dot( pusxaM[ 1 ], pusxaSumo ),
          dot( pusxaM[ 2 ], pusxaSumo ) )
          / vec3( dot( pusxaM[ 0 ], pusxaM[ 0 ] ), dot( pusxaM[ 1 ], pusxaM[ 1 ] ),
          dot( pusxaM[ 2 ], pusxaM[ 2 ] ) );
        // ⟨ Kiom profunde 📃 ⟩ — la pinto kliniĝas ĝis 0.75 unuojn ĉe la piedo
        // ( la klingo altas 0.56 ), do la gazono subpremiĝas rekte sub la figuro
        // kaj la najbaraj klingoj kliniĝas for de ĝi. Tio estas unu piedsigno, ne
        // kratero — la forto malpliiĝas kvadrate, do la premo sidas ene de unu
        // unuo kaj la kampo fermiĝas tuj post la paso.
        transformed += pusxaLoka * ( 0.75 * herbaMaske * herbaMaske );
        #endif
        transformed *= herbaFado;
      }`
    );
  };
  herbajVentoj.push({ uTempo, uFotilo, uPusantoj });
  return materialo;
}

// gxisdatigiHerbon — Pelu la venton, la vidpunkton kaj la PAŜANTOJN de ĉiuj
// herbaj materialoj. Voku ĝin unufoje po kadro, antaŭ la bildigo.
//     @param t ( number ) - La tempo ( la sama kiel la vetero kaj la akvo ).
//     @param x, z ( number ) - La vidpunkto. Ĝi estas la FOTILO — la herbo fadas
//         kaj malaperas ĉirkaŭ la okulo, ne ĉirkaŭ la orbita celo ( alie la
//         gazono sub la fotilo, kiu estas plej proksime, malaperus ĝuste kiam oni
//         alproksimiĝas ).
//     @param pusantoj ( HerbaPusanto[] = undefined , nedeviga ) - La figurantoj
//         kiuj premas la herbon per la piedoj, de la plej proksima al la plej
//         fora. Nur la unuaj HERBA_PUSANTOJ eniras la shaderon.
export function gxisdatigiHerbon(t: number, x: number, z: number,
  pusantoj?: readonly HerbaPusanto[]): void {
  const kiom = pusantoj === undefined ? 0 : Math.min(pusantoj.length, HERBA_PUSANTOJ);
  for ( let i = 0; i < herbajVentoj.length; i++ ) {
    const vento = herbajVentoj[i];
    vento.uTempo.value = t;
    ( vento.uFotilo.value as THREE.Vector2 ).set(x, z);
    // ⟨ La paŝantoj 📃 ⟩ — la glitoj malpleniĝas ( forto 0 ), do materialo kiu
    // ricevas malpli da figuroj ol antaŭe ne konservas malnovajn premojn.
    const glitoj = vento.uPusantoj.value as THREE.Vector4[];
    for ( let k = 0; k < HERBA_PUSANTOJ; k++ ) {
      const glito = glitoj[k];
      if ( k >= kiom ) { glito.set(0, 0, 0, 0); continue; }
      const pusanto = pusantoj![k];
      glito.set(pusanto.x, pusanto.z,
        pusanto.radiuso ?? HERBA_PUSA_RADIO, pusanto.forto ?? 1);
    }
  }
  // ⟨ La vidlimo de la tabuloj 📃 ⟩ — la gazono administras sian propran
  // forigon ( anstataŭ la komuna vidlimo de la sceno, kiu mezuras de la ludanto
  // aŭ de la orbita celo ). La fado de la shadero mezuriĝas de la FOTILO, do la
  // forigo devas mezuriĝi de la sama punkto — alie la gazono sub la fotilo
  // malaperus tute ĝuste tie, kie oni plej proksime rigardas ĝin.
  for ( let i = 0; i < herbajTavoloj.length; i++ ) {
    const tavolo = herbajTavoloj[i];
    const dx = tavolo.cx - x, dz = tavolo.cz - z;
    const limo = tavolo.limo;
    tavolo.mesho.visible = dx * dx + dz * dz <= limo * limo;
  }
}
