// Ktenofora-komunajxoj — la komunaj iloj de la tri ktenoforoj ( kombuloj ).
//
// Ĉiuj tri ( Beroe, Mnemiopsis, Pleŭrobrakia ) estas ĝelatenaj bestoj kun ok
// kombovicoj, kiuj naĝas per pulsoj. La tri speco-dosieroj uzas la samajn
// konstruilojn — nur la profilo, la aldonaĵoj ( buŝa rando, loboj, ingoj ) kaj
// la pulsa ritmo diferenciĝas.
//
// ⟨ La ĝela teksajxo 📃 ⟩ — la korpo antaŭe havis NENIAN koloran teksajxon:
// nur la kombostriojn kiel iridescan/emisiivan mapon, do la besto aspektis kiel
// pura vitro. Nun la korpo portas proceduran ĝelan ŝtofon ( koloro KAJ reliefo
// el la sama desegno, kiel ĉe la petrelo ): la meridionalaj kanaloj sub la
// kombovicoj, la densiĝo ĉe la polusoj kaj la etaj grajnoj de la mesogleo.
import * as THREE from "three";
import { kreiKanvasanTeksajxon } from "../komunajxoj/teksajxoj.js";
import type { Besto } from "./speco-tipoj.js";

// kreiKombovicanTeksajxon — Procedura teksajxo kun vertikalaj strioj ĉirkaŭ
// la korpo ( la kombovicoj ). Malhela fono, blankecaj strioj kun molaj randoj.
// La sama teksajxo funkcias kiel irideseca kaj emisia mapo — la strioj brilas
// kaj refraktas lumon en ĉielarkajn kolorojn, dum la resto restas travidebla.
export function kreiKombovicanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400; // 256
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    // Malhela fono — nenia iridesco/emisio ekster la strioj.
    kunteksto.fillStyle = "rgb(6,10,16)";
    kunteksto.fillRect(0, 0, s, s);

    const strioLargho = s / 0o10;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) * strioLargho;
      const r = strioLargho * 0o23/0o100;
      const gradiento = kunteksto.createLinearGradient(cx - r, 0, cx + r, 0);
      // Alterna brilo — la ok vicoj ne estas tute identaj en naturo.
      const helo = 0o3/0o4 + ( k % 0o2 ) * 0o15/0o100;
      gradiento.addColorStop(0, "rgba(255,255,255,0)");
      gradiento.addColorStop(0o1/0o2, "rgba(235,245,255," + helo + ")");
      gradiento.addColorStop(1, "rgba(255,255,255,0)");
      kunteksto.fillStyle = gradiento;
      kunteksto.fillRect(cx - r, 0, r * 0o2, s);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// GelajOpcioj — la koloroj de la ĝela teksajxo de unu specio.
export interface GelajOpcioj {
  bazo: string;     // la ĝela korpo ( la bazo de la koloro )
  kanalo: string;   // la meridionalaj kanaloj ( pli densa histo sub la vicoj )
  poluso: string;   // la densiĝo ĉe la buŝa kaj la aborala polusoj
  polusaForto?: number;   // 0..1 — kiom forta estas tiu densiĝo
  grajnoj?: number;       // la nombro de la etaj grajnoj de la mesogleo
}

// kreiGelanTeksajxon — La korpa ĝelo: koloro kaj reliefo el la SAMA desegno
// ( vidu la petrelan teksajxon por la sama ideo ). La u-akso ĉirkaŭiras la
// korpon kaj la v-akso iras laŭ la profilo ( la lathe-a UV-mapo ), do la ok
// meridionalaj kanaloj estas vertikalaj linioj ĉe u = ( k + 0.5 ) / 8 — ĝuste
// sub la ok kombovicoj, kiujn aldoniKombovicojn konstruas ĉe la sama angulo.
//     @returns { koloro, reliefo } — du kanvasaj teksajxoj.
export function kreiGelanTeksajxon( opcioj: GelajOpcioj ):
  { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture } {
  const s = 0o400; // 256
  const denso = opcioj.polusaForto ?? 0o6/0o10;
  const desegnu = ( reliefo: boolean ) => kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = reliefo ? "rgb(128,128,128)" : opcioj.bazo;
    kunteksto.fillRect(0, 0, s, s);

    // La densiĝo ĉe la du polusoj — la ĝelo estas pli dika kaj pli malklara
    // ĉe la buŝo kaj ĉe la aborala organo ol en la mezo de la korpo.
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    if ( reliefo ) {
      gradiento.addColorStop(0, "rgba(90,90,90," + denso + ")");
      gradiento.addColorStop(0o1/0o5, "rgba(128,128,128,0)");
      gradiento.addColorStop(0o4/0o5, "rgba(128,128,128,0)");
      gradiento.addColorStop(1, "rgba(90,90,90," + denso + ")");
    } else {
      gradiento.addColorStop(0, opcioj.poluso);
      gradiento.addColorStop(0o1/0o5, "rgba(255,255,255,0)");
      gradiento.addColorStop(0o4/0o5, "rgba(255,255,255,0)");
      gradiento.addColorStop(1, opcioj.poluso);
    }
    kunteksto.globalAlpha = reliefo ? 0o7/0o10 : denso;
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);
    kunteksto.globalAlpha = 1;

    // La ok meridionalaj kanaloj — molaj linioj sub la kombovicoj. Ili ne
    // estas tute rektaj: la kanalo ondiĝas iomete, kiel vera histo.
    const kanalaLargho = s * 0o5/0o100;
    for ( let k = 0; k < 0o10; k++ ) {
      const cx = ( k + 0o1/0o2 ) / 0o10 * s;
      kunteksto.strokeStyle = reliefo ? "rgba(190,190,190,0.55)" : opcioj.kanalo;
      kunteksto.globalAlpha = reliefo ? 0o5/0o10 : 0o45/0o100;
      kunteksto.lineWidth = kanalaLargho;
      kunteksto.beginPath();
      for ( let i = 0; i <= 0o20; i++ ) {
        const v = i / 0o20;
        const x = cx + Math.sin(v * Math.PI * 0o2 + k) * kanalaLargho * 0o3;
        if ( i === 0 ) kunteksto.moveTo(x, v * s);
        else kunteksto.lineTo(x, v * s);
      }
      kunteksto.stroke();
      kunteksto.globalAlpha = 1;
    }

    // La grajnoj de la mesogleo — etaj, malhelaj kaj maldensaj. Ili donas al
    // la travidebla korpo iom da "korpo" sen pentri ĝin.
    const grajnoj = opcioj.grajnoj ?? 0o400;
    kunteksto.fillStyle = reliefo ? "rgba(200,200,200,0.35)" : opcioj.kanalo;
    for ( let i = 0; i < grajnoj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o1/0o2 + Math.random() * 1.2;
      kunteksto.globalAlpha = 0o1/0o10 + Math.random() * 0o2/0o10;
      kunteksto.beginPath();
      kunteksto.arc(x, y, r, 0, Math.PI * 2);
      kunteksto.fill();
    }
    kunteksto.globalAlpha = 1;
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  // La u-akso devas volviĝi ( la korpo estas ronda ), la v-akso ne.
  return { koloro: desegnu(false), reliefo: desegnu(true) };
}

// kreiKorpon — Lathe-korpo kun la ĝela teksajxo ( koloro kaj reliefo ) kaj la
// kombostrioj en la iridescaj/emisiaj mapoj ( la strioj ĉirkaŭvolvas la korpon
// laŭlonge — ok kombovicoj ĉe ĉiu speco ).
//     @param gelo ( { koloro, reliefo } ) - La korpa ĝela teksajxo.
//     @param teksajxo ( CanvasTexture ) - La kombostrioj ( kreiKombovicanTeksajxon ).
//     @param profilo ( [ number, number ][] ) - La korpa profilo ( r, y ).
//     @param koloro / emisio ( number ) - La koloro kaj la memlumo de la ĝelo.
export function kreiKorpon( gelo: { koloro: THREE.CanvasTexture; reliefo: THREE.CanvasTexture },
  teksajxo: THREE.CanvasTexture, profilo: [ number, number ][],
  koloro: number, emisio: number): THREE.Mesh {
  const punktoj = profilo.map(( [ r, y ] ) => new THREE.Vector2(r, y));
  const geometrio = new THREE.LatheGeometry(punktoj, 0o24);
  const materialo = new THREE.MeshPhysicalMaterial({
    color: koloro,
    map: gelo.koloro,
    bumpMap: gelo.reliefo,
    bumpScale: 0o1/0o50,
    transparent: true,
    opacity: 0o3/0o10,
    depthWrite: false,
    roughness: 0o1/0o10,
    metalness: 0,
    // Malpli da iridesco kaj emisio ol antaŭe — la korpo aspektu kiel klara
    // ĝelo, kaj la KOMBOVICOJ restu la brilaj partoj ( la antaŭa modelo brilis
    // tiel egale, ke la besto aspektis kiel blanka pilko ).
    iridescence: 0o1/0o2,
    iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio,
    emissiveMap: teksajxo,
    emissiveIntensity: 0o4/0o10,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometrio, materialo);
}

// profiloR — La korpa radiuso ĉe la alto y ( la profilo estas lineara inter
// siaj punktoj ). La aldonitaj partoj ( la buŝa rando, la loboj, la ingoj )
// sidas ĝuste sur la surfaco per ĉi tiu funkcio — antaŭe la buŝa ringo de
// Beroe havis la radiuson de la KORPA MEZO dum ĝi staris ĉe la pinto, do ĝi
// ŝvebis kiel hulo ĉirkaŭ la maldika kolono.
export function profiloR( profilo: [ number, number ][], y: number ): number {
  const ordigitaj = profilo.slice().sort(( a, b ) => a[1] - b[1]);
  if ( y <= ordigitaj[0][1] ) return ordigitaj[0][0];
  for ( let i = 1; i < ordigitaj.length; i++ ) {
    const [ r1, y1 ] = ordigitaj[i];
    const [ r0, y0 ] = ordigitaj[i - 1];
    if ( y <= y1 ) {
      const t = ( y - y0 ) / Math.max(1e-6, y1 - y0);
      return r0 + ( r1 - r0 ) * t;
    }
  }
  return ordigitaj[ordigitaj.length - 1][0];
}

// aldoniKombovicojn — La OK kombovicoj kiel REALA geometrio, kiel OK APARTAJ
// meshoj ( unu po vico, aldonitaj rekte al la korpa grupo ). Ĉiu vico estas
// vico da etaj komboplatoj ( la naĝilformaj platetoj el kunfanditaj cilioj ),
// kiuj staras sur la korpa surfaco laŭ la meridiano.
//
// ⟨ La formo de la plateto 📃 ⟩ — vera komboplato estas REMILO: ĝia longa akso
// montras FOR de la korpo, kaj la cilioj, kiuj ĝin kunmetas, staras unu apud
// la alia laŭ la vico. La plato do estas MALVASTA laŭ la vico kaj ALTA laŭ la
// surfaca normalo — la malnova versio estis inverse ( larĝa kaj plata ), do la
// vicoj aspektis kiel rubandoj, ne kiel kombiloj.
//
// ⟨ Kial apartaj meshoj 📃 ⟩ — la antaŭa versio kunfandis ĉiujn ok vicojn en unu
// meshon, do ili vibris ĉiuj SAMTEMPE kaj la besto brilis kiel unu lampo. La vera
// brilo de la kombuloj estas la METAKRONA ONDO — la platoj batas unu post la alia
// kaj la lumo vojaĝas laŭ la vicoj. Ĉiu vico nun havas sian propran objekton kun
// sia vicnumero ( userData.vico ), kaj la animacio malfruas ĝin laŭ tiu numero
// ( vidu aplikiKtenoforanPulson ).
//     @param grupo ( THREE.Group ) - La korpa grupo ( la vicoj aldoniĝas al ĝi ).
//     @param profilo ( [ number, number ][] ) - La lathe-profilo de la korpo
//         ( la sama listo kiel kreiKorpon ricevas ).
//     @param materialo ( THREE.Material ) - La kombila materialo.
export function aldoniKombovicojn(grupo: THREE.Group, profilo: [ number, number ][],
  materialo: THREE.Material): void {
  const vicoj = 0o10;    // 8 — ĉiuj ktenoforoj havas ok kombovicojn
  const platoj = 0o50;   // 40 — platetoj po vico
  const rMaks = Math.max(...profilo.map(( [ r ] ) => r));
  // ⟨ La platetoj 📃 ⟩ — la platoj preskaŭ TUŜAS unu la alian: la vico devas
  // legiĝi kiel unu DAŬRA kombila franĝo laŭ la korpo, ne kiel disaj punktoj
  // ( „konfetaĵo“ ). Tial la larĝo ne estas frakcio de la korpa radiuso — ĝi
  // venas de la MERIDIANA LONGECO de la profilo, dividita per la platnombro:
  // ĉiu plateto do estas iomete pli larĝa ol sia paŝo, sendepende de tio, ĉu
  // la specio estas longa melono ( Beroe ) aŭ mallonga globo ( Pleŭrobrakia ).
  //
  // ⟨ La egala disdono 📃 ⟩ — la platoj sidas laŭ la ARKOLONGO de la profilo,
  // ne laŭ la profila PUNKTO. La antaŭa versio rondigis la parametron al la
  // plej proksima profila punkto, do ĉe mallonga profilo ( dek du punktoj )
  // kvar platoj sidis sur la SAMA loko kaj la vico aspektis kiel disaj makuloj
  // anstataŭ kiel kombilo. Nun ĉiu plato trovas sian segmenton laŭ la arkolongo
  // kaj interkalkulas la punkton kaj la normalon interne de ĝi.
  const arkoj: number[] = [ 0 ];
  for ( let i = 1; i < profilo.length; i++ ) {
    arkoj.push(arkoj[i - 1] + Math.hypot(profilo[i][0] - profilo[i - 1][0],
      profilo[i][1] - profilo[i - 1][1]));
  }
  const meridiano = arkoj[arkoj.length - 1];
  const largho = meridiano / platoj * 0o11/0o10;  // la plateta larĝo ( laŭ la vico )
  const alto = rMaks * 0o6/0o100;                // kiom la plateto elstaras
  for ( let v = 0; v < vicoj; v++ ) {
    // La geometrio de UNU vico — la pozicioj kaj la indeksoj estas lokaj, do
    // ĉiu vico havas sian propran bufron ( ĝi moviĝas sendepende ).
    const pozicioj: number[] = [];
    const uvoj: number[] = [];
    const indeksoj: number[] = [];
    // La vicoj sidas inter la saggitalaj ebenoj ( ne sur ili ).
    const angulo = ( v + 0o1/0o2 ) / vicoj * Math.PI * 2;
    const cos = Math.cos(angulo), sin = Math.sin(angulo);
    for ( let p = 0; p < platoj; p++ ) {
      // La punkto sur la meridiano je la arkolongo s — la segmento, kiu entenas
      // ĝin, kaj la loka parametro t0 interne de tiu segmento.
      const s = ( p + 0o1/0o2 ) / platoj * meridiano;
      let i = 1;
      while ( i < profilo.length - 1 && arkoj[i] < s ) i++;
      const t0 = ( s - arkoj[i - 1] ) / Math.max(1e-6, arkoj[i] - arkoj[i - 1]);
      const r = profilo[i - 1][0] + ( profilo[i][0] - profilo[i - 1][0] ) * t0;
      const y = profilo[i - 1][1] + ( profilo[i][1] - profilo[i - 1][1] ) * t0;
      // La surfaca normalo de la segmento en la ( r, y )-ebeno — perpendikla
      // al la segmenta tanĝanto, direktita for de la akso.
      const dr = profilo[i][0] - profilo[i - 1][0];
      const dy = profilo[i][1] - profilo[i - 1][1];
      const longeco = Math.hypot(dr, dy) || 1;
      const nr = -dy / longeco, ny = dr / longeco;
      // La kvar anguloj de la plateto — ĝi staras sur la surfaco, mallarĝa laŭ
      // la vico ( la transversa direkto ) kaj alta laŭ la normalo. La UV-mapo
      // venas kun la anguloj: u iras laŭ la vico, v for de la korpo ( la
      // kombila teksajxo desegnas la ciliojn laŭ tiu direkto ).
      const htx = -sin, htz = cos;   // la transversa direkto ( laŭ la vico )
      const anguloj: [ number, number, number ][] = [
        [ 0, -0o1/0o2, 0 ], [ alto, -0o1/0o2, 1 ],
        [ alto, 0o1/0o2, 1 ], [ 0, 0o1/0o2, 0 ] ];
      for ( const [ dr0, trans, vUv ] of anguloj ) {
        const rr = r + nr * dr0, yy = y + ny * dr0;
        pozicioj.push(rr * cos + htx * trans * largho, yy, rr * sin + htz * trans * largho);
        uvoj.push(trans + 0o1/0o2, vUv);
      }
      const a = pozicioj.length / 3 - 0o4;
      indeksoj.push(a, a + 0o1, a + 0o2, a, a + 0o2, a + 0o3);
    }
    const geometrio = new THREE.BufferGeometry();
    geometrio.setAttribute("position", new THREE.Float32BufferAttribute(pozicioj, 3));
    geometrio.setAttribute("uv", new THREE.Float32BufferAttribute(uvoj, 2));
    geometrio.setIndex(indeksoj);
    geometrio.computeVertexNormals();
    const vico = new THREE.Mesh(geometrio, materialo);
    vico.name = "kombilo";
    // La vicnumero — la animacio malfruas la vibron laŭ ĝi ( la metakrona ondo ).
    vico.userData.vico = v;
    grupo.add(vico);
  }
}

// kreiKombilanTeksajxon — La teksajxo de UNU komboplato: malhela bazo kun
// fajnaj vertikalaj linioj — la cilioj, kiuj kunmetas la platon. La koloro de
// ĉiu linio ŝanĝiĝas iomete laŭ la lininombro, ĉar la kombovicoj DIFRAKTAS la
// lumon en ĉielarkajn kolorojn ( la plej bela trajto de la kombuloj ). La
// linioj estas malhelaj ĉe la bazo kaj ĉe la pinto, do la plateto aspektas
// travidebla ĝele.
export function kreiKombilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200; // 128
  const linioj = 0o14; // 12
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "rgb(8,12,18)";
    kunteksto.fillRect(0, 0, s, s);
    for ( let i = 0; i < linioj; i++ ) {
      const x = ( i + 0o1/0o2 ) / linioj * s;
      const largho = s / linioj * 0o45/0o100;
      // La ĉielarka nuanco — la difrakto de la cilioj.
      const nuanco = Math.round(i / linioj * 0o700/0o2 + 0o300/0o2) % 0o700;
      const gradiento = kunteksto.createLinearGradient(x - largho, 0, x + largho, 0);
      // ⟨ Ne finiĝu per nigro 📃 ⟩ — la travidebla HURO de la nuanco, ne
      // "rgba(0,0,0,0)": kanvasaj gradientoj interpoliaciiĝas en antaŭmultiplika
      // spaco, do travidebla nigro lasas malhelan reston ĉe la randoj de ĉiu
      // kombilo ( vidu senAlfa en teksajxoj.ts ).
      gradiento.addColorStop(0, "hsla(" + nuanco + ", 70%, 72%, 0)");
      gradiento.addColorStop(0o1/0o2, "hsla(" + nuanco + ", 70%, 72%, 0.95)");
      gradiento.addColorStop(1, "hsla(" + nuanco + ", 70%, 72%, 0)");
      kunteksto.fillStyle = gradiento;
      kunteksto.fillRect(x - largho, 0, largho * 0o2, s);
    }
    // La bazo kaj la pinto de la plateto estas pli travideblaj — la cilioj
    // nur meze de la plato havas sian plenan longon.
    const vertikala = kunteksto.createLinearGradient(0, 0, 0, s);
    vertikala.addColorStop(0, "rgba(8,12,18,1)");
    vertikala.addColorStop(0o1/0o5, "rgba(8,12,18,0)");
    vertikala.addColorStop(0o7/0o10, "rgba(8,12,18,0)");
    vertikala.addColorStop(1, "rgba(8,12,18,1)");
    kunteksto.fillStyle = vertikala;
    kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// kreiKombilanMaterialon — La materialo de la komboplatoj. Travidebla, sed pli
// brila ol la korpo — la platoj refraktas la lumon plej forte.
export function kreiKombilanMaterialon(emisio: number): THREE.MeshPhysicalMaterial {
  const teksajxo = kreiKombilanTeksajxon();
  return new THREE.MeshPhysicalMaterial({
    color: 0xe4f4ff, transparent: true, opacity: 0o13/0o20, depthWrite: false,
    roughness: 0o1/0o10, iridescence: 1, iridescenceIOR: 0o25/0o20,
    iridescenceMap: teksajxo,
    emissive: emisio, emissiveIntensity: 0o11/0o10, side: THREE.DoubleSide,
    emissiveMap: teksajxo,
  });
}

// surfacxaParto — Registru la parton kiel SIDANTA SUR LA KORPA SURFACO. La
// animacio legas ĉi tiun bazan pozicion kaj skalon kaj skalas ilin per la
// pulso ( vidu gluuSurfacxon ), do la membrano — la buŝa rando, la buŝaj
// loboj, la tentaklaj ingoj — restas gluita al la ĝelo anstataŭ malgluiĝi kaj
// ŝvebi for de ĝi kiam la korpo larĝiĝas kaj mallarĝiĝas.
//
// ⟨ Kial la apartigo okazas 📃 ⟩ — la korpa mesho pulsas RADIALE ( ĝia skalo
// x/z = pulso ), sed infano kun propra pozicio NE sekvas tiun skalon: la
// buŝa ringo de Beroe havis radiuson 0.33 dum la korpo pulsas ±12.5%, do ĉe
// ĉiu kunpremo la ringo apartiĝis de la korpa rando kaj videblis fendo inter
// la ĝelo kaj la membrano. La solvo estas skali la POZICION kaj la SKALON de
// la parto per la sama pulso.
//     @param parto ( Object3D ) - La parto sur la korpa surfaco.
export function surfacxaParto(parto: THREE.Object3D): void {
  parto.userData.surfaco = {
    x: parto.position.x, y: parto.position.y, z: parto.position.z,
    sx: parto.scale.x, sy: parto.scale.y, sz: parto.scale.z,
  };
}

// gluuSurfacxon — Gluu la registritan parton al la pulsanta surfaco: la pozicio
// kaj la skalo sekvas la pulson ( plus la laŭvolaj aldonaj faktoroj de la
// specio — ekz. la buŝmalfermo de Beroe ). Sen la registro la funkcio estas
// senefika.
export function gluuSurfacxon( parto: THREE.Object3D, pulso: number,
  aldonaj?: { x?: number; y?: number; z?: number } ): void {
  const s = parto.userData.surfaco as { x: number; y: number; z: number;
    sx: number; sy: number; sz: number } | undefined;
  if ( !s ) return;
  // La vertikala akso sekvas la pulson nur parte — la ĝelo estas preskaŭ
  // nekunpremebla, do ĝi larĝiĝas pli ol ĝi mallongiĝas.
  const vertikala = 1 + ( pulso - 1 ) * 0o1/0o4;
  parto.position.set(s.x * pulso, s.y, s.z * pulso);
  parto.scale.set(
    s.sx * pulso * ( aldonaj?.x ?? 1 ),
    s.sy * vertikala * ( aldonaj?.y ?? 1 ),
    s.sz * pulso * ( aldonaj?.z ?? 1 ));
}

// ktenoforaPulsaFazo — La fazo de la ktenofora pulso por unu besto ( ĉiu besto
// havas sian propran mason, b.phase, do la bestaro ne batas kune ).
export function ktenoforaPulsaFazo( b: Besto, t: number ): number {
  return t * b.pulsaRapido + b.phase * 0o2;
}

// aplikiKtenoforanPulson — La komunaĵo de ĉiuj tri ktenoforoj: la platigo de
// la grupo, la RADIALA pulso de la korpo kaj la metakrona ondo de la ok
// kombovicoj ( ĉiu vico malfruas la antaŭan laŭ la vicnumero, do la lumo
// vojaĝas ĉirkaŭ la korpo ).
//     @returns La pulsa multiplikilo ( 1 ± pulsaForto ) — la specio uzas ĝin
//         por glui siajn proprajn membranojn al la korpo.
export function aplikiKtenoforanPulson( b: Besto, t: number ): number {
  b.grupo.scale.set(b.bazaSkalo.x, b.bazaSkalo.y * b.plata, b.bazaSkalo.z);
  const pulsaFazo = ktenoforaPulsaFazo(b, t);
  const pulso = 0o1 + Math.sin(pulsaFazo) * b.pulsaForto;
  // La korpa mesho nur portas la RADIAN pulson — la vertikala platigo sidas
  // sur la grupo.
  b.korpo.scale.set(pulso, 0o1, pulso);
  for ( const parto of b.animajxoj ) {
    if ( parto.name !== "kombilo" ) continue;
    const vico = ( parto.userData.vico as number | undefined ) ?? 0;
    const vibro = 0o1 + Math.sin(pulsaFazo - vico * b.pulsaOndo) * 0o2/0o10;
    parto.scale.set(pulso * vibro, 0o1, pulso * vibro);
  }
  return pulso;
}
