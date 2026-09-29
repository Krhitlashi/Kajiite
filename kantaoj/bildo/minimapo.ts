// ≺⧼ Minimapo 🧭 ⧽≻
// La radara mapo de la kompaso kaj la plena mapo ( fenestro sur la tuta valo ).
// La mondo bakigas unufoje en 2D-kanvason post la konstruado; la ĉiukadra
// kosto estas kelkaj drawImage — nenia dua bildilo, nenia sceno-submeto.
//
// La modulo tenas sian propran staton ( la bakitan bildon, la panon, la zomon )
// kaj nur ricevas la vidpunkton de la buklo ( gxisdatigi ). La sama sago
// ( desegniSaganFormon ) estas desegnata sur la plena mapo kaj sendata al la
// radara nadlo kiel bildo, do ambaŭ mapoj montras unu markilon.
import * as THREE from "three";
import { HERBA_TAVOLA_NOMO } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { tuŝaGesto } from "../fasado/gestoj.js";
import { vidlimojnMalŝalti, vidlimojnŜalti } from "./vidlimo.js";

// MinimapajOpcioj — kion la minimapo bezonas de la orkestrilo: la bildilon kaj
// la scenon ( por la bakado ), la elementojn de la fasado kaj la datumojn de la
// moviĝantoj ( ili kaŝiĝas dum la bake kaj desegniĝas kiel punktoj poste ).
export interface MinimapajOpcioj {
  sceno: THREE.Scene;
  bildilo: THREE.WebGLRenderer;
  miniKanvaso: HTMLCanvasElement;
  kompaso: HTMLElement;
  nadlo: HTMLElement;
  supermeta: HTMLElement;
  vestaVico: HTMLElement;
  mapoGrandeco: number;
  movantoj: {
    npcoj: { group: THREE.Object3D }[];
    kanuoj: { x: number; z: number; group: THREE.Object3D }[];
    bestoj: { bestoj: { grupo: THREE.Object3D }[] };
    petreloj: { petreloj: { grupo: THREE.Object3D }[] };
  };
  traduki: ( klavo: string ) => string;
  aplikiVacepu: () => void;
}

export interface Minimapo {
  gxisdatigi(vidX: number, vidZ: number, centroX: number, centroZ: number): void;
  cxuBakita(): boolean;
  cxuMalfermita(): boolean;
  malfermi(): void;
  fermi(): void;
  desegniRadaron(): void;
  desegniPlenanMapon(): void;
}

export function kreiMinimapon(opcioj: MinimapajOpcioj): Minimapo {
  const { sceno, bildilo, miniKanvaso, kompaso, nadlo, supermeta, vestaVico,
    mapoGrandeco, traduki, aplikiVacepu } = opcioj;
  const { npcoj, kanuoj, bestoj, petreloj } = opcioj.movantoj;

  // ⟪ Minimapo — la kompaso fariĝas radara mapo; klako malfermas la plenan vidon 📃 ⟫
  // La mapo estas BAKITA unufoje en 2D-kanvason ( post la konstruado ), do la
  // ĉiukadra kosto estas nur kelkaj drawImage — nenia dua WebGL-bildilo, nenia
  // ĉiukadra sceno-submeto, neniaj shader-rekompiloj. La markilo, kanuoj kaj
  // NPC-oj desegniĝas super la bakita tavolo ĉiukadre.
  let mapoMalfermita = false;
  let plenaKanvaso: HTMLCanvasElement | null = null;
  let plenaKunteksto: CanvasRenderingContext2D | null = null;
  let bakitaMapo: HTMLCanvasElement | null = null;
  // La map-centro ( ludanto aŭ fotila celo ) — ĝisdatigita ĉiukadre en animacii.
  let mapX = 0, mapZ = 0;
  let vidX = 0, vidZ = 0;   // la rigarda direkto ( por la markilo )

  const RADARA_DUONO = 0o30;   // duon-larĝo de la radara mapo ( mondaj unuoj )
  // La kadro de la plena mapo sekvas la formon de la mondo, anstataŭ fiksaj
  // nombroj de la malnova kvadrata mapo — la defaŭlta zomo montras la TUTAN
  // formon ( la cirklon, la kvadraton aŭ la triangulon ) kaj la komencon de la
  // ĉirkaŭa ebeno, do la mondo plenigas la vidon anstataŭ aperi kiel malgranda
  // disko meze de malpleno.
  const PLENA_DUONO = Math.round(mapoGrandeco * 0o13/0o10);
  const MINA_DUONO = 0o10;     // plej proksima zomo de la plena mapo
  const MAXA_DUONO = Math.round(PLENA_DUONO * 0o15/0o10);   // la fora zomo
  const MAPA_BAKA_DUONO = 0o1270; // 700 — kovras la tutan promeneblan mondon ( pan + zomo )
  const MAPA_BAKA_REZ = 0o4770;   // 2560² — kompromiso inter akreco kaj memoro
  // La mola rando de la bakado. La plej eksteraj 0o400 ( 256 ) pikseloj de la
  // bakita bildo fadas al travideblo, do la KVADRATA rando de la bake ne videblas
  // sur la plena mapo — la fono sube portas la saman randon-koloron ( vidu
  // desegniMapanFonon ) kaj la transiro malaperas. La radaro legas nur la centron
  // de la bake ( RADARA_DUONO = 0o30 mondunuoj ≈ 0o70 pikseloj ), do la fado
  // neniam tuŝas la radar-vidon.
  const MAPA_BAKA_FADO = 0o400;
  // La randa koloro de la bakita mapo kaj la nebula koloro de la ĉielo —
  // mezuritaj dum la bakado ( mezuriRandanKoloron ). La fono de la plena mapo
  // komenciĝas per la randa koloro kaj fadas al la nebulo, do la mapo daŭriĝas
  // preter la bake kiel la sama senfina pejzaĝo anstataŭ kiel bildo sur nigra
  // fono.
  let mapaRandaKoloro = "#585848";
  let mapaNebulaKoloro = "#c8d8d8";
  let plenaDuono = PLENA_DUONO; // nuna duon-larĝo ( zomo ) de la plena mapo
  let mapaPanX = 0;            // tirado. Horizontala forpreno de la sekv-punkto
  let mapaPanZ = 0;            // tirado. Vertikala forpreno de la sekv-punkto

  // Baki la scenon de supre en 2D-kanvason — unufoje, post la konstruado. La
  // moviĝantaj objektoj ( kanuoj, NPC-oj, bestoj ) estas kaŝitaj dum la bake kaj
  // desegnitas poste kiel 2D-supertavoloj.
  function bakiMapon(): HTMLCanvasElement | null {
    try {
      const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
      const rt = new THREE.WebGLRenderTarget(rez, rez, {
        minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      });
      const mapFotilo = new THREE.OrthographicCamera(-duono, duono, duono, -duono, 1, 0o230);
      mapFotilo.up.set(0, 0, 1); // mapo-supro = nordo ( +z )
      mapFotilo.position.set(0, 0o130, 0);
      mapFotilo.lookAt(0, 0, 0);
      // ⟨ La montaro sur la mapo 📃 ⟩ — la montarringo RESTAS en la bake. Ĝi
      // apartenas al la mondo ( ĝi sekvas la formon de la mapo kaj staras ĝuste
      // ĉe ĝia rando ), do la mapo montras la tutan insulon — la terenon, la
      // montarringon kaj la nebulon — anstataŭ nuda disko de tereno.
      const nebulo = sceno.fog;
      sceno.fog = null;
      const ombroj = bildilo.shadowMap.enabled;
      bildilo.shadowMap.enabled = false;
      const kaŝitaj: THREE.Object3D[] = [];
      try {
        // ⟨ La vidlimo malŝaltiĝas 📃 ⟩ — la bakado bezonas la TUTAN mondon, ne
        // nur tion, kion la ludanto vidas: sen ĉi tio la foraj arbaroj kaj figuroj
        // ( kaŝitaj de la distanca limo ) mankus en la bakita mapo. Atentu pri la
        // ordo — malŝalti REVIVIGAS ĉion registritan, do ĝi devas okazi ANTAŬ la
        // kaŝado de la moviĝantoj ( alie la NPC-oj aperus sur la mapo ). La tuto
        // staras ene de la try, do la ŜALTO okazas ankaŭ se io ĵetas.
        vidlimojnMalŝalti();
        // ⟨ La herbo ne bakigxas 📃 ⟩ — la malalta herbo estas preskaŭ unu pikselo
        // sur la mapo ( 0o3/0o10 unuoj en mondo de 0o1400 ), sed gxi estas cent mil
        // instancoj — la bakado de la tuta mondo kun la herbo kostus dekmilojn da
        // trianguloj por preskaŭ nenia bildo. La koloron de la grundo jam portas
        // la terena teksajxo, do la mapo ne sxangxigxas.
        for ( const o of sceno.children ) {
          if ( o.name !== HERBA_TAVOLA_NOMO ) continue;
          kaŝitaj.push(o);
          o.visible = false;
        }
        for ( const n of npcoj ) { kaŝitaj.push(n.group); n.group.visible = false; }
        for ( const c of kanuoj ) { kaŝitaj.push(c.group); c.group.visible = false; }
        for ( const b of bestoj.bestoj ) { kaŝitaj.push(b.grupo); b.grupo.visible = false; }
        for ( const p of petreloj.petreloj ) { kaŝitaj.push(p.grupo); p.grupo.visible = false; }
        bildilo.setRenderTarget(rt);
        bildilo.render(sceno, mapFotilo);
        bildilo.setRenderTarget(null);
      } finally {
        sceno.fog = nebulo;
        bildilo.shadowMap.enabled = ombroj;
        for ( const o of kaŝitaj ) o.visible = true;
        vidlimojnŜalti();
      }
      // La nebula koloro de la ĉielo — la fora tono de la plena mapo. Legu ĝin
      // antaŭ ol la nebulo de la sceno malŝaltiĝas por la bake.
      if ( nebulo ) mapaNebulaKoloro = "#" + nebulo.color.getHexString();
      // ⟨ Unu bufero 📃 ⟩ — antaŭe estis TRI plenaj kopioj de la bildo ( 0o4770² × 4
      // = 0o143300400 bitokoj ĉiu ): la lega bufero, dua tabelo por la ImageData,
      // kaj la kopio kiun putImageData faras interne. Nun unu tabelo plenumas
      // ĉiujn rolojn — oni legas en ĝin, oni renversas ĝin SURLARE, kaj la
      // ImageData VOLVAS la saman tabelon sen kopii. Du buferoj malpli da
      // momentmemoro ( gravas sur telefono ) kaj unu plena trapaso de la datenoj
      // malpli.
      const buf = new Uint8Array(rez * rez * 4);
      bildilo.readRenderTargetPixels(rt, 0, 0, rez, rez, buf);
      rt.dispose();
      // WebGL legas de la malsupro — renversu la vicojn por ke nordo estu supre.
      // Surloke, per unu tempovico ( duono de la antaŭa laboro ).
      const tempVico = new Uint8Array(rez * 4);
      for ( let y = 0; y < ( rez >> 1 ); y++ ) {
        const supra = y * rez * 4, malsupra = ( rez - 1 - y ) * rez * 4;
        tempVico.set(buf.subarray(supra, supra + rez * 4));
        buf.copyWithin(supra, malsupra, malsupra + rez * 4);
        buf.set(tempVico, malsupra);
      }
      const bildo = new ImageData(new Uint8ClampedArray(buf.buffer), rez, rez);
      const kanvasa = document.createElement("canvas");
      kanvasa.width = kanvasa.height = rez;
      // ⟨ willReadFrequently 📃 ⟩ — la bakita mapo LEGIĜAS post la bake ( la randa
      // mezuro de mezuriRandanKoloron ) kaj NENIAM re-desegniĝas, do ni diras al
      // la retumilo teni ĝin en la ĉefmemoro. Sen tio ĉiu getImageData devigas
      // sinkronan legadon el la GPU kaj Chrome avertas pri tio en la konzolo.
      kanvasa.getContext("2d", { willReadFrequently: true })!.putImageData(bildo, 0, 0);
      // La randon-koloro estas mezurita ANTAŬ la fado — la fono de la plena mapo
      // devas daŭrigi la veran bildon, ne la travideblan randon.
      mapaRandaKoloro = mezuriRandanKoloron(kanvasa);
      molaRandon(kanvasa, MAPA_BAKA_FADO);
      return kanvasa;
    } catch ( e ) {
      console.warn("Mapa bakado ne havebla:", e);
      return null;
    }
  }

  // mezuriRandanKoloron — La meza koloro de la eksteraj randoj de la bakita
  // bildo. La fono de la plena mapo ( vidu desegniMapanFonon ) komenciĝas per ĉi
  // tiu koloro, do la transiro de la bake al la fono ne videblas.
  //     @param kanvasa ( HTMLCanvasElement ) - La bakita mapo.
  //     @returns La koloro, kiel CSS-tono.
  function mezuriRandanKoloron(kanvasa: HTMLCanvasElement): string {
    const k = kanvasa.getContext("2d");
    if ( !k ) return "#585848";
    const r = kanvasa.width;
    const bendo = 0o10;   // la mezurata rando ( 8 pikseloj )
    // ⟨ Nur la randoj 📃 ⟩ — la mezuro bezonas ok liniojn de la bildo ( kvar
    // vicojn kaj kvar kolumnojn ), sed la malnova versio LEGIS LA TUTAN bildon por
    // atingi ilin — 0o4770² = 0o30660100 rastrumeroj, 0o143300400 bitokoj, el kaj
    // reen tra la GPU ĉiun lanĉon. Nun oni legas nur tiujn ok liniojn ( 0o47700
    // rastrumerojn, 0o500-oble malpli ) kaj la SAMAJ rastrumeroj sumiĝas en la
    // sama ordo, do la rezulto estas bit-idente la sama.
    const vicoj = [ 0, bendo - 1, r - 1, r - bendo ];
    const vicoDatumoj = vicoj.map(y => k.getImageData(0, y, r, 1).data);
    const kolumnoj = [ 0, bendo - 1, r - 1, r - bendo ];
    const kolDatumoj = kolumnoj.map(x => k.getImageData(x, 0, 1, r).data);
    let sr = 0, sg = 0, sb = 0, n = 0;
    // aldoniEl — unu rastrumero de linio al la sumo ( i = la pozicio EN LA LINIO ).
    const aldoniEl = ( linio: Uint8ClampedArray, i: number ): void => {
      sr += linio[i * 4]; sg += linio[i * 4 + 1]; sb += linio[i * 4 + 2]; n++;
    };
    for ( let k2 = 0; k2 < r; k2 += 0o4 ) {
      for ( const v of vicoDatumoj ) aldoniEl(v, k2);
      for ( const v of kolDatumoj ) aldoniEl(v, k2);
    }
    if ( !n ) return "#585848";
    return "rgb(" + Math.round(sr / n) + "," + Math.round(sg / n) + "," + Math.round(sb / n) + ")";
  }

  // molaRandon — La rando de la bakita bildo fadas al travideblo. La bake estas
  // kvadrato, sed la mondo estas la formo de la mapo; sen la fado la kvadrata
  // rando de la bildo desegniĝus sur la plena mapo. La fado multiplikiĝas en la
  // anguloj ( du bendoj trafas ilin ), do la anguloj fadas pli frue kaj pli mole.
  // Atentu — la operacio estas DESTINATION-OUT, ne destination-in. Ĉe
  // destination-in la ekstero de la desegnata formo malpleniĝas, do la kvar bendoj
  // forviŝus la tutan bakitan bildon ( la unua versio faris ĝuste tion — la mapo
  // montriĝis tute malplena ). Ĉe destination-out nur la desegnata bendo efikas.
  //     @param kanvasa ( HTMLCanvasElement ) - La bakita mapo ( reskribita surloke ).
  //     @param fado ( number ) - Kiom larĝe la rando fadas, en pikseloj.
  function molaRandon(kanvasa: HTMLCanvasElement, fado: number): void {
    const k = kanvasa.getContext("2d");
    if ( !k ) return;
    const r = kanvasa.width;
    k.globalCompositeOperation = "destination-out";
    // gradientaBendo — unu rando, de plena forviŝo ( ekstere ) ĝis nenio ( ĉe fado ).
    const gradientaBendo = ( x0: number, y0: number, x1: number, y1: number,
      rekt: [ number, number, number, number ] ): void => {
      const g = k.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      k.fillStyle = g;
      k.fillRect(rekt[0], rekt[1], rekt[2], rekt[3]);
    };
    gradientaBendo(0, 0, 0, fado, [ 0, 0, r, fado ]);              // supre
    gradientaBendo(0, r, 0, r - fado, [ 0, r - fado, r, fado ]);   // malsupre
    gradientaBendo(0, 0, fado, 0, [ 0, 0, fado, r ]);              // maldekstre
    gradientaBendo(r, 0, r - fado, 0, [ r - fado, 0, fado, r ]);   // dekstre
    k.globalCompositeOperation = "source-over";
  }

  // desegniMapanFonon — La fono de la plena mapo. La mondo estas RONDA — la
  // malnova kvadrata mapo plenigis ĝian tutan kadron, sed cirklo sur nigra fono
  // aspektis kiel disko ŝvebanta en malpleno. La fono komenciĝas per la randa
  // koloro de la bakita mapo ( mezurita dum la bakado ) kaj fadas al la nebula
  // koloro de la ĉielo direkte al la horizonto, do la mapo daŭriĝas preter la
  // rando de la bake kiel la sama senfina pejzaĝo, kiun la ludanto vidas.
  //     @param cx, cz ( number ) - La vidcentro ( mondaj koordinatoj ).
  //     @param hw, hh ( number ) - La duon-larĝoj de la vido ( mondaj unuoj ).
  function desegniMapanFonon(ctx: CanvasRenderingContext2D, w: number, h: number,
    cx: number, cz: number, hw: number, hh: number): void {
    // La mapo estas sendistorĉa ( la sama skvamo en ambaŭ aksoj ), do unu faktoro
    // konvertas mondajn unuojn al pikseloj.
    const unuo = w / ( 2 * hw );
    const [ mx, my ] = mondoAlEkrano(0, 0, cx, cz, hw, hh, w, h);
    const rando = MAPA_BAKA_DUONO * unuo;      // la duono de la bakita mapo, en pikseloj
    // La horizonto — trioble la bake, sed almenaŭ la tuta kanvaso. La nebulo ne
    // estas muro. ĝi venas malrapide.
    const horizonto = Math.max(rando * 0o3, Math.hypot(w, h) * 0o1/0o2);
    const gradiento = ctx.createRadialGradient(mx, my, 0, mx, my, horizonto);
    gradiento.addColorStop(0, mapaRandaKoloro);
    gradiento.addColorStop(Math.min(0o3/0o4, rando / horizonto), mapaRandaKoloro);
    gradiento.addColorStop(1, mapaNebulaKoloro);
    ctx.fillStyle = gradiento;
    ctx.fillRect(0, 0, w, h);
  }

  // Desegnu la bakitan tavolon por vido centrita je ( cx, cz ) kun duon-larĝoj ( hw, hh ).
  function desegniMapanTavolon(ctx: CanvasRenderingContext2D, fonto: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, w: number, h: number): void {
    const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
    // La fonto havas nordon supre ( +z → malgranda y ) kaj orienton dekstren ( -x );
    // la okcidento ( +x ) estas maldekstre. Do la fonta x kreskas orienten — la
    // okcidenta rando de la vido ( cx + hw ) estas la plej malgranda fonta x.
    const sx = ( duono - ( cx + hw ) ) / ( 2 * duono ) * rez;
    const sy = ( duono - ( cz + hh ) ) / ( 2 * duono ) * rez;
    const sw = ( 2 * hw ) / ( 2 * duono ) * rez;
    const sh = ( 2 * hh ) / ( 2 * duono ) * rez;
    ctx.drawImage(fonto, sx, sy, sw, sh, 0, 0, w, h);
  }

  // mondoAlEkrano — La komuna mondo→mapa-piksela konverto, kun la mapo
  // orientiĝo ( okcidento +x maldekstren, nordo +z supren ). La vido estas
  // ( cx ± hw, cz ± hh ) en la mondo kaj ( 0..w, 0..h ) sur la ekrano.
  function mondoAlEkrano(x: number, z: number, cx: number, cz: number, hw: number, hh: number, w: number, h: number): [ number, number ] {
    return [ ( ( cx + hw ) - x ) / ( 2 * hw ) * w, ( ( cz + hh ) - z ) / ( 2 * hh ) * h ];
  }

  // ⟨ LA SAGO DE LA MAPOJ — unu formo por ambaŭ 📃 ⟩ — egallatera triangulo, blanka
  // kun nigra bordo kaj milde rondigitaj anguloj. GXi staras en UNU loko
  // ( desegniSaganFormon ) kaj uziĝas duoble: la PLENA mapo desegnas ĝin rekte ĉe
  // la ludanto ( desegniMarkilon ), kaj la minimapa nadlo ricevas la saman formon
  // kiel bildon ( kreiSaganBildon ), ĉar la nadlo estas DOM-elemento, kiu turniĝas
  // ĉiukadre per CSS. Antaŭe la radaro havis propran triangulon faritan per la
  // borda artifiko en la stilfolio — du malsamaj sagoj por la sama celo.
  const SAGO_R = 0o12/0o2;         // 5 — la cirklo-radiuso de la triangulo
  const SAGO_RONDIGO = 0o12/0o10;  // 1.25 — la radiuso de ĉiu angul-rondigo
  const SAGO_BORDO = 0o2;          // 2 — la nigra borda streko
  // La tri verticoj sur la cirklo R je −90°, 30° kaj 150° — la pinto supren je
  // angulo 0. La pezcentro de egallatera triangulo estas GXUSTE la centro de la
  // cirklo, do la pinto ne sxajnas sxovita de la ludanta punkto.
  const SAGO_VERTICOJ = [
    { x: 0, y: -SAGO_R },
    { x: SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
    { x: -SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
  ];
  const SAGO_GRANDO = SAGO_R * 0o2 + SAGO_BORDO + 0o2;   // la tuta sago ( 12 ) plus marĝeno

  // desegniSaganFormon — La sago mem, sen pozicio nek rotacio: la kunteksto estu
  // jam movita al la centro de la sago ( la pinto montras supren je angulo 0 ).
  //     @param ctx ( CanvasRenderingContext2D ) - La kunteksto.
  function desegniSaganFormon(ctx: CanvasRenderingContext2D): void {
    const [ A, B, C ] = SAGO_VERTICOJ;
    // Komencu sur la mezo de la lasta eĝo, do la tri arcTo-turnoj fermas la
    // triangulon sen supra streko ( la verticoj estas la kontrolpunktoj de la
    // turnoj, do ĉiu angulo rondiĝas same ).
    ctx.beginPath();
    ctx.moveTo(( C.x + A.x ) / 0o2, ( C.y + A.y ) / 0o2);
    ctx.arcTo(A.x, A.y, B.x, B.y, SAGO_RONDIGO);
    ctx.arcTo(B.x, B.y, C.x, C.y, SAGO_RONDIGO);
    ctx.arcTo(C.x, C.y, A.x, A.y, SAGO_RONDIGO);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    // La nigra bordo — la streko kovras la randon duone interne kaj duone
    // ekstere, do ĝi ĉirkaŭas la blankan formon kaj montriĝas super ajna fono.
    ctx.strokeStyle = "#000";
    ctx.lineWidth = SAGO_BORDO;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  // kreiSaganBildon — La sama sago kiel PNG-data-URL, por la minimapa nadlo. La
  // bildo devenas de la SAMA desegniSaganFormon, do la du sagoj ne povas
  // disiriĝi. La bildo desegniĝas laŭ la ekrana denso ( 2× sur retina ekrano ), do
  // la nadlo restas akra; la formo desegniĝas per la sama SAGO_GRANDO-skalo kaj
  // nur la kadro de la bildo estas pli granda aux pli malgranda.
  //     @param grandeco ( number = SAGO_GRANDO ) - La kadro de la sago, en CSS-
  //              pikseloj ( SAGO_GRANDO = la markilo de la plena mapo ).
  //     @returns ( string ) - La sago kiel data-URL ( "" se la kanvaso mankas ).
  function kreiSaganBildon(grandeco = SAGO_GRANDO): string {
    const denso = Math.min(0o2, Math.max(1, devicePixelRatio || 1));
    const kanvasa = document.createElement("canvas");
    kanvasa.width = kanvasa.height = Math.ceil(grandeco * denso);
    const k = kanvasa.getContext("2d");
    if ( !k ) return "";
    const skalo = ( grandeco / SAGO_GRANDO ) * denso;
    k.scale(skalo, skalo);
    k.translate(SAGO_GRANDO / 0o2, SAGO_GRANDO / 0o2);
    desegniSaganFormon(k);
    return kanvasa.toDataURL();
  }

  // desegniMarkilon — La sago ĉe la ludanto sur la PLENA mapo ( la minimapo uzas
  // la saman formon kiel bildon, vidu kreiSaganBildon ).
  function desegniMarkilon(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    // La mapo havas orienton dekstren ( -x ) kaj nordon supren ( +z ), do la
    // okcidenta rando de la vido ( cx + hw ) estas la maldekstra ekrano.
    const [ px, py ] = mondoAlEkrano(mapX, mapZ, cx, cz, hw, hh, w, h);
    const fx = vidX, fz = vidZ;
    // La sago indiku la rigardan direkton sur la norda mapo. oriento ( -x ) estas
    // dekstren kaj nordo ( +z ) supren, do la ekrana direkto estas ( -fx, -fz ).
    // La sago mem montras supren je angulo 0 ( la canvas-rotacio turnas ĝin
    // horloĝdirekte ), do la rotacio estas atan2( -fx, fz ).
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(-fx, fz));
    desegniSaganFormon(ctx);
    ctx.restore();
  }

  // Kanuoj kaj NPC-oj kiel malgrandaj punktoj sur la mapo.
  function desegniMovantajnPunktojn(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const punkto = ( x: number, z: number, koloro: string ) => {
      // La sama orientiĝo kiel la markilo. oriento dekstren, nordo supren.
      const [ px, py ] = mondoAlEkrano(x, z, cx, cz, hw, hh, w, h);
      if ( px < -3 || px > w + 3 || py < -3 || py > h + 3 ) return;
      ctx.fillStyle = koloro;
      ctx.beginPath(); ctx.arc(px, py, 0o14/0o10, 0, Math.PI * 2); ctx.fill();
    };
    for ( const c of kanuoj ) punkto(c.x, c.z, "#e8d8b0");
    for ( const n of npcoj ) punkto(n.group.position.x, n.group.position.z, "#b8b0a0");
  }

  // La radara mapo ( 0o200 × 0o200 ) — la bakita tavolo ĉirkaŭ la ludanto.
  //
  // ⟨ La nadlo portas la markilon sur la radaro 📃 ⟩ — la radaro estas centrita je
  // la ludanto, do la 2D-markilo ( desegniMarkilon ) sidus ĜUSTE meze. Sur la
  // 0o200-piksela radaro ĝi estus kelkaj ekranpikseloj larĝa — punkto, ne triangulo
  // — kaj ĝi atendus la radar-desegnon ( 0o7 fojojn en He ) dum la nadlo turnigxas
  // ĉiukadre.
  // La radaro do montras nur la mapon, la moviĝantojn kaj la nadlon — kaj la nadlo
  // portas la SAMAN sagon kiel la plena mapo ( vidu kreiSaganBildon ), do ambaŭ
  // mapoj montras unu markilon. La PLENA mapo ( desegniPlenanMapon ) tenas la
  // kanvasan markilon, ĉar tie la ludanto ne estas ĉiam centre ( pan/zoom ).
  const radaraKunteksto = miniKanvaso.getContext("2d");
  function desegniRadaron(): void {
    const ctx = radaraKunteksto;
    if ( !ctx || !bakitaMapo ) return;
    desegniMapanTavolon(ctx, bakitaMapo, mapX, mapZ, RADARA_DUONO, RADARA_DUONO, 0o200, 0o200);
    desegniMovantajnPunktojn(ctx, 0o200, 0o200, mapX, mapZ, RADARA_DUONO, RADARA_DUONO);
  }

  // La plena mapo — plenekrana 2D-kanvaso kun pan/zoom.
  function desegniPlenanMapon(): void {
    if ( !plenaKanvaso || !plenaKunteksto || !bakitaMapo ) return;
    const kanvasa = plenaKanvaso;
    const ctx = plenaKunteksto;
    const w = kanvasa.clientWidth || innerWidth;
    const h = kanvasa.clientHeight || innerHeight;
    if ( kanvasa.width !== w || kanvasa.height !== h ) { kanvasa.width = w; kanvasa.height = h; }
    const aspekto = w / h;
    const hw = plenaDuono * aspekto, hh = plenaDuono;
    desegniMapanFonon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    desegniMapanTavolon(ctx, bakitaMapo, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh, w, h);
    desegniMarkilon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    desegniMovantajnPunktojn(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
  }

  // La kompaso malfermas la plenan vidon. Plenekrana kanvaso rekte en #supermeta.
  function malfermiMapon(): void {
    if ( mapoMalfermita ) return;
    if ( !bakitaMapo ) { console.warn("Plena mapo ne havebla ( bakado malsukcesis )"); return; }
    if ( !plenaKanvaso ) {
      const kanvasa = document.createElement("canvas");
      kanvasa.id = "plenaKanvaso";
      // Plenekrana 2D-kanvaso. La CSS plenigas la tutan #supermeta ( inset 0 ).
      // la grandeco sekvas la vidon ĉiukadre ( desegniPlenanMapon ).
      kanvasa.width = innerWidth;
      kanvasa.height = innerHeight;
      plenaKanvaso = kanvasa;
      plenaKunteksto = kanvasa.getContext("2d");
      if ( !plenaKunteksto ) { console.warn("Plena mapo ne havebla ( 2D-kunteksto )"); plenaKanvaso = null; return; }
      // Zomo. Rado ( labortablo ) kaj pinĉo ( tuŝo ). La duon-larĝo de la vido
      // ŝanĝiĝas; la ludanta markilo restas centrita dum la zomo.
      kanvasa.addEventListener("wheel", ( e ) => {
        e.preventDefault();
        // Normaligu la radan unuon. Liniaj deltoj ( iuj kusenetoj ) ≈ 0o20 pikseloj.
        const delt = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
        plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * Math.exp(delt * 0o1/0o2000)));
      }, { passive: false });
      // Pinĉa zomo. Zorgu ankaŭ se tria fingro aliĝas aŭ forlasas meze. Tiri ( unu
      // fingro/muso ) movas la vidcentron; post pinĉo la restanta fingro daŭre tiras.
      // Pikseloj → mondaj unuoj. La mapo estas nedistorĉita ( samaj skvamoj en ambaŭ
      // aksoj ), do unu konverta faktoro sufiĉas. Limigu la tiradon al la maksimuma
      // zomo, por ke la mapo ne perdiĝu tute.
      // Tiri la mapon kiel paperon. Tiri orienten ( +dx ) movu la vidon okcidenten,
      // por ke la enhavo sekvu la fingron ( la Z-akso jam sekvas la fingron ).
      // La vido restas EN la bakita mapo. la randoj de la vido ( cx ± hw ) ne
      // transiru la mapajn randojn ( ±MAPA_BAKA_DUONO ). Kiam la vido estas pli
      // larĝa ol la mapo ( malproksima zomo sur larĝa ekrano ), la vido simple
      // restas centrita — ne eblas forgliti la mapon de la ekrano.
      const tiriPans = ( dx: number, dy: number ) => {
        const pp = ( 2 * plenaDuono ) / ( kanvasa.clientHeight || innerHeight );
        const aspekto = ( kanvasa.clientWidth || innerWidth ) / ( kanvasa.clientHeight || innerHeight );
        const hw = plenaDuono * aspekto, hh = plenaDuono;
        const lim = ( centro: number, duono: number ) => {
          const min = -MAPA_BAKA_DUONO + duono, max = MAPA_BAKA_DUONO - duono;
          return min > max ? 0 : Math.max(min, Math.min(max, centro));
        };
        mapaPanX = lim(mapX + mapaPanX + dx * pp, hw) - mapX;
        mapaPanZ = lim(mapZ + mapaPanZ + dy * pp, hh) - mapZ;
      };
      tuŝaGesto(kanvasa, {
        jeTiro: tiriPans,
        jePinĉo: ( pinĉaDistanco, nova ) => {
          plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * pinĉaDistanco / nova));
        },
      });
      // Duobla klako revenigas la mapon al la ludanto.
      kanvasa.addEventListener("dblclick", () => { mapaPanX = 0; mapaPanZ = 0; });
    }
    plenaDuono = PLENA_DUONO; // ĉiu malfermo rekomencas de la tuta valo
    mapaPanX = 0; mapaPanZ = 0; // ...kaj sen tirado
    document.getElementById("supermetaTitolo")!.textContent = traduki("titoloMapo");
    document.getElementById("supermetaSupra")!.textContent = traduki("subtitoloMapo");
    vestaVico.innerHTML = "";
    supermeta.appendChild(plenaKanvaso);
    supermeta.classList.add("mapo");
    mapoMalfermita = true;
    kompaso.setAttribute("aria-pressed", "true");
    supermeta.classList.add("montri");
    aplikiVacepu();
  }
  function fermiMapon(): void {
    mapoMalfermita = false;
    kompaso.setAttribute("aria-pressed", "false");
    supermeta.classList.remove("mapo");
    supermeta.classList.remove("montri");
    plenaKanvaso?.remove();
    plenaKanvaso = null;
    plenaKunteksto = null;
  }
  kompaso.addEventListener("click", malfermiMapon);
  kompaso.addEventListener("keydown", ( e ) => {
    if ( e.code === "Enter" || e.code === "Space" ) { e.preventDefault(); malfermiMapon(); }
  });


  // La radara mapo ekde lanĉo — baku la statikan scenon unufoje ( la urbo kaj
  // arbaro jam estas konstruitaj ). La 2D-tavoloj desegniĝas ĉiukadre.
  miniKanvaso.width = miniKanvaso.height = 0o200;
    bakitaMapo = bakiMapon();
  // La minimapa nadlo ricevas la SAMAN sagon kiel la plena mapo ( vidu
  // kreiSaganBildon ), sed PLI GRANDAN: la kompaso estas nur 0o70 pikseloj larĝa,
  // do la markilo de la plena mapo ( SAGO_GRANDO = 14 ) legigxus malgranda tie.
  // La formo restas en la ludkodo — la stilfolio nur tenas la grandecon kaj la
  // bildon en du propraĵoj ( --sagoGrando, --sago ).
  const SAGO_NADLA_GRANDO = 0o24;   // 20 — la kadro de la minimapa sago
  const sagoBildo = kreiSaganBildon(SAGO_NADLA_GRANDO);
  if ( sagoBildo ) {
    nadlo.style.setProperty("--sagoGrando", SAGO_NADLA_GRANDO + "px");
    nadlo.style.setProperty("--sago", `url("${sagoBildo}")`);
  }

  // gxisdatigi — la buklo donas la vidpunkton kaj la rigardan direkton. La
  // nadlo turniĝas per la sama konvertaĵo kiel la markila sago: atan2( -fx, fz )
  // ( oriento dekstren, nordo supren ).
  function gxisdatigi(vx: number, vz: number, cx: number, cz: number): void {
    vidX = vx; vidZ = vz;
    mapX = cx; mapZ = cz;
    nadlo.style.transform = `rotate(${Math.atan2(-vidX, vidZ)}rad)`;
  }

  return {
    gxisdatigi, malfermi: malfermiMapon, fermi: fermiMapon,
    cxuMalfermita: () => mapoMalfermita, cxuBakita: () => bakitaMapo !== null,
    desegniRadaron, desegniPlenanMapon,
  };
}
