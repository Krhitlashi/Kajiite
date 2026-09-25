// ≺⧼ Tekstura modulo 🖌️ ⧽≻
// Proceduraj kanvasaj teksturoj por la urba sperto.
import * as THREE from "three";
import { kreiHazardanGenerilon } from "./hazardo.js";

const hazard = ( a: number, b: number ): number => a + Math.random() * ( b - a );

// desegniWrapan — Desegnu la saman formon ĉe ĉiuj naŭ kahelaj pozicioj
// ( −s, 0, s horizontale; −h, 0, h vertikale ), per traduko de la kunteksto
// — la gradientoj sekvas la tradukon, do la formo daŭriĝas senkudre trans
// ĉiun randon. La vertikala paŝo venas el la kanvasa alto, ĉar la kaheloj
// ne estas kvadrataj ( betulo 256×512, lariko 128×256 ). la ĉirkaŭvolvo
// sekvu ĉiun akson laŭ sia propra dimensio, alie ĉiu marko duobliĝus en la
// alia duono de la kahelo.
function desegniWrapan(kunteksto: CanvasRenderingContext2D, s: number, formo: () => void): void {
  const sy = kunteksto.canvas.height;
  for ( const dx of [ -s, 0, s ] ) {
    for ( const dy of [ -sy, 0, sy ] ) {
      kunteksto.save();
      kunteksto.translate(dx, dy);
      formo();
      kunteksto.restore();
    }
  }
}

// senAlfa — La sama koloro kun alfo 0.
//
// ⟨ Kial 📃 ⟩ —gradiento kiu finiĝas per travidebla NIGRO lasas MALHELAN
// RESTON en la kanvaso: la koloroj interpoliaciiĝas en antaŭmultiplika spaco,
// do la nigro de la travidebla fino restas en la rezulto. La mezuro estas klara:
// dek du "helaj" nuboj de alfo 0.10–0.35 super blanka bazo mallumigis la
// kanvason de 248 gxis 182 ( kaj gxis 158 en la plej malhelaj lokoj ) — ĉiu
// nubo do MALLUMIGIS la teksaĵon anstataŭ heligi ĝin. Tiel la betula ŝelo
// montriĝis griza anstataŭ paperblanka, kaj la sama griza veilo kuŝis sur la
// likenoj, la rokoj kaj la purpuraj trunketoj. Finu per la SAMA koloro kun
// alfo 0 kaj la nuboj nur delikate tonas.
//     @param koloro ( string ) - "rgba(r,g,b,a)", "rgb(...)" aŭ "#rrggbb".
//     @returns koloro ( string ) - La sama koloro, travidebla.
function senAlfa(koloro: string): string {
  const m = /rgba?\(([^)]+)\)/.exec(koloro);
  if ( m ) {
    const [ r, g, b ] = m[1].split(",");
    return `rgba(${r.trim()},${g.trim()},${b.trim()},0)`;
  }
  const h = /^#([0-9a-f]{6})$/i.exec(koloro.trim());
  if ( h ) {
    const n = parseInt(h[1], 16);
    return `rgba(${( n >> 16 ) & 255},${( n >> 8 ) & 255},${n & 255},0)`;
  }
  return "transparent";
}

// ombro — La ombro kaj la konturo de folio laŭ la stila regulo
// MainColor − n · 0x101010. Ĉiu malhela tavolo de folia teksajxo ( la foliombroj,
// la vejnaj sulkoj kaj la konturo de la klingo ) deriviĝas el la bazkoloro de la
// folio — neniu aparta hazarda nuanco. Ĉar la bazo estas de la formo #nmnmnm
// ( la neparaj ciferoj 0 aux 8 ), ĉiu ombro restas en tiu sama familio.
//     @param koloro ( number ) - La bazkoloro de la folio ( 0xRRGGBB ).
//     @param n ( number = 0o1 ) - Kiom da 0x101010-paŝoj malhelen.
//     @param alfa ( number = 1 ) - La alfo de la rezulto.
//     @returns ombro ( string ) - La koloro kiel "rgba(r,g,b,a)".
function ombro(koloro: number, n = 0o1, alfa = 1): string {
  const kanalo = ( sovo: number ): number =>
    Math.max(0, ( ( koloro >> sovo ) & 0xff ) - n * 0x10);
  return `rgba(${kanalo(0o20)},${kanalo(0o10)},${kanalo(0)},${alfa})`;
}

// desegniWrapajnNubojn — Komuna nub-tavolo de la ŝelaj teksaĵoj. Desegnas
// n molajn radialajn nubojn el la paletro, ĉirkaŭvolvitajn senkudre per
// desegniWrapan. La radiuso venas el minimumo plus hazarda amplekso,
// relatie al alto ( la vertikala kahela dimensio ), kaj hazardo ( Math.random
// aŭ la semita hazard(a, b) ) donas la nubajn centrojn.
function desegniWrapajnNubojn(kunteksto: CanvasRenderingContext2D, s: number, alto: number,
  n: number, paletro: string[], minimumo: number, amplekso: number,
  hazardo?: ( a: number, b: number ) => number): void {
  const elekti = hazardo ?? Math.random;
  for ( let i = 0; i < n; i++ ) {
    const r = alto * ( minimumo + Math.random() * amplekso );
    const x = elekti(0, s), y = elekti(0, alto);
    const koloro = paletro[i % paletro.length];
    desegniWrapan(kunteksto, s, () => {
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    });
  }
}

// sxovu — Kaŝmemoru la rezulton de senargumenta tekstura kreado, por ke la
// multaj alvokoj ( vojoj ×3 + doko, vegetajxo ×2 ) konstruu ĉiun nur unufoje.
function sxovu(fn: () => THREE.CanvasTexture): () => THREE.CanvasTexture {
  let kaŝita: THREE.CanvasTexture | null = null;
  return () => ( kaŝita ??= fn() );
}

// kreiKanvasanTeksajxon — Komuna fino de la kanvasaj teksajxoj. krei la
// kanvason, doni ĝin al la pentra funkcio, kaj paki ĝin kiel kanvasan
// teksajxon. SRGB-koloro kaj ripetanta volvaĵo estas la defaŭltoj ( la plej
// oftaj por la mondaj teksturoj ); bump-teksajxoj restas en lineara koloro
// ( sRGB malŝaltita ) kaj sen-ĉirkaŭvolvaj teksturoj pasas ClampToEdge.
//     @param w, h ( number ) - Kanvasaj dimensioj.
//     @param pentri ( funkcio ) - Desegni sur la 2D-kunteksto.
//     @param ripeto ( [number, number] = [1, 1] ) - Tekstura ripeto.
//     @param agordoj ( object = {} ) - Laŭvolaj agordoj.
//         volvado ( THREE.Wrapping = RepeatWrapping ) - La tekstura volvaĵo.
//         sRGB ( boolean = true ) - Ĉu la teksajxo uzu SRGB-koloron
//             ( bump-teksajxoj restas lineara — do sRGB malŝaltita ).
//         anisotropio ( number = 0 ) - La tekstura anizotropio.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export function kreiKanvasanTeksajxon(w: number, h: number,
  pentri: ( k: CanvasRenderingContext2D ) => void,
  ripeto: [ number, number ] = [ 1, 1 ],
  agordoj: { volvado?: THREE.Wrapping; sRGB?: boolean; anisotropio?: number } = {}
): THREE.CanvasTexture {
  const kanvasa = document.createElement("canvas");
  kanvasa.width = w; kanvasa.height = h;
  const kunteksto = kanvasa.getContext("2d")!;
  pentri(kunteksto);
  const teksajxo = new THREE.CanvasTexture(kanvasa);
  if ( agordoj.sRGB !== false ) teksajxo.colorSpace = THREE.SRGBColorSpace;
  teksajxo.wrapS = teksajxo.wrapT = agordoj.volvado ?? THREE.RepeatWrapping;
  teksajxo.repeat.set(ripeto[0], ripeto[1]);
  if ( agordoj.anisotropio ) teksajxo.anisotropy = agordoj.anisotropio;
  return teksajxo;
}

// Betula sxoela skizo — la kolor- kaj bump-teksajxoj dividas la SAMAN skizon,
// por ke la reliefo akurate sekvu la koloron. La skizo generiĝas unufoje —
// ĉiuj hazardaj valoroj ( pozicio, grandeco, flekso, angulo ) estas fiksitaj
// ĉe la generado, do la naŭ ĉirkaŭvolvaj kopioj desegnas la IDENTAN markon
// kaj la bump-teksajxo kongruas kun la koloro.
// ⟨ La proporcio de la kanvaso 📃 ⟩ — la kanvaso ne estas arbitre alta: la
// betula trunko estas ~1.4 unuojn CIRKAUFE kaj ~9.5 unuojn ALTE ( la meza
// trunko de la mondo ), kaj la UV-oj de la lathe-o metas la cirkonferencon sur
// la horizontala akso kaj la alton sur la vertikala. Kun 256 × 512 la sama
// nombro da rastrumeroj kovris 0o1/0o3 Peu horizontale sed 0o11/0o10 Peu
// vertikale — la kanvaso estis STREĈITA 0o7/0o2-foje kaj ĉiu marko ( ronda
// lenticelo, ondo, cikatro ) montriĝis kiel longa vertikala makulo. Kun
// 0o400 × 0o3000 la du aksoj havas preskaŭ Egalan rastrumeran densecon ( 0o1/0o3
// Peu kontraŭ 0o3/0o10 Peu ), do unu
// rastrumero signifas unu longon en ĉiu direkto kaj la markoj desegniĝas per
// sia vera proporcio. Pro tio la vertikalaj longoj ĉi-sube estas proksimume
// trifoje pli grandaj ol antaŭe — ili estas la SAMaj fizikaj longoj.
const sxelaW = 0o400, sxelaH = 0o3000;

interface BetulaLenticelo {
  x: number; y: number; longo: number; dikeco: number; kurbo: number; angulo: number;
}

interface BetulaStrio {
  x: number; y: number; longo: number; ondo: number; dikeco: number;
}

// BetulaSxeligho — Unu horizontala senŝeliĝa bendo. la malhela interna sxoelo
// kun ĉifonaj supraj/malsupraj randoj kaj hela bukla papera rando supre. La
// bendoj etendiĝas tra la tuta kahela larĝo — vera betula sxoelo senŝeliĝas
// en horizontaj bendoj ĉirkaŭ la tuta trunko. La randa neregulaĵo estas
// sinus-ondoj kun entjeraj cikloj, do la randoj kongruas ĉe la kahelaj randoj.
interface BetulaSxeligho {
  y: number; alto: number; sago: number; kurbaAlto: number;
  cikloj: [ number, number ]; fazo: number; malhelo: number;
}

// BetulaCikatro — Malgranda malhela vundo de la sxoelo kun hela leviĝanta
// rando, kie la papera tavolo rompiĝis. La radiaj valoroj estas fiksitaj en
// la skizo, por ke la kolor- kaj bump-teksajxoj desegnu la IDENTAN formon.
interface BetulaCikatro {
  x: number; y: number; r: number; angulo: number; radiaj: number[];
}

interface BetulaSkizo {
  lenticeloj: BetulaLenticelo[];
  strioj: BetulaStrio[];
  helajStrioj: BetulaStrio[];
  horizontajoj: BetulaStrio[];
  sxelighoj: BetulaSxeligho[];
  cikatroj: BetulaCikatro[];
}

let betulaSkizo: BetulaSkizo | null = null;

// generiBetulanSkizon — Kreu unufoje la komunan betulan skizon. La lenticeloj
// ( la horizontalaj nigraj markoj ) aperas en horizontalaj aroj kiel ĉe vera
// betulo, kaj kreskas kaj malheliĝas al la malsupro — la malnova sxoelo de la
// trunka bazo. Aldone. fajnaj horizontalaj ondoj, senŝeliĝaj bendoj ( pli
// multaj kaj pli grandaj malsupre ) kaj malgrandaj cikatroj.
//     @returns skizo ( BetulaSkizo ) - La fiksita skizo.
function generiBetulanSkizon(): BetulaSkizo {
  if ( betulaSkizo ) return betulaSkizo;
  const lenticeloj: BetulaLenticelo[] = [];
  const aroj = 0o70; // 56 horizontalaj aroj da lenticeloj
  for ( let a = 0; a < aroj; a++ ) {
    const ax = Math.random() * sxelaW, ay = Math.random() * sxelaH;
    const kresko = 0o7/0o10 + ( ay / sxelaH ) * 0o6/0o10;
    const nombro = 0o4 + ( ( Math.random() * 0o7 ) | 0 ); // 4–10 po aro
    for ( let i = 0; i < nombro; i++ ) {
      const y = Math.min(Math.max(ay + ( Math.random() - 0o4/0o10 ) * 0o24, 0), sxelaH);
      // ⟨ La longo de la lenticelo 📃 ⟩ — antaŭe 0o4–0o44 rastrumeroj, kio kun la
      // malnova streĉita kanvaso estis 0o1–0o26 Peu longa marko: la trunko
      // aspektis kiel pentrita per broŝo. Veraj betulaj lenticeloj estas
      // 0o1–0o4 Peu longaj kaj kelkajn 0o1/0o20-Peuojn dikaj, do la markoj
      // estas nun malgrandaj
      // horizontalaj streketoj, densaj, kiel vera papera betulo.
      lenticeloj.push({
        x: ax + ( Math.random() - 0o4/0o10 ) * 0o24,
        y,
        longo: ( 0o2 + Math.random() * 0o5 ) * kresko,
        dikeco: 0o1 + Math.random() * 0o1 + y / sxelaH * 0o1/0o2,
        kurbo: ( Math.random() - 0o4/0o10 ) * 0o2,
        angulo: ( Math.random() - 0o4/0o10 ) * 0o2/0o10,
      });
    }
  }
  const strioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    strioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o300 + Math.random() * 0o600,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o10,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  const helajStrioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o14; i++ ) {
    helajStrioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o400 + Math.random() * 0o1000,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o20,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  // Fajnaj horizontalaj ondoj — la transversaj sulkoj de la sxoelo.
  const horizontajoj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o200; i++ ) {
    horizontajoj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o40 + Math.random() * 0o110,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o5,
      dikeco: 1,
    });
  }
  // Senŝeliĝaj bendoj — pli multaj kaj pli grandaj al la malsupro, kie la
  // malnova sxoelo estas pli disŝirita ( √ de la hazardo klinas ilin suben ).
  // Malmultaj kaj maldikaj. la blanko restu la domina koloro de la trunko.
  // La y estas alklampita por ke neniu bendo transiru la malsupran randon kaj
  // ĉirkaŭvolvu al la supro de la trunko.
  const sxelighoj: BetulaSxeligho[] = [];
  for ( let i = 0; i < 0o4; i++ ) {
    const y0 = sxelaH * ( 1 - Math.pow(Math.random(), 0o3/0o2) );
    const maljuneco = y0 / sxelaH;
    const alto = ( 0o20 + Math.random() * 0o40 ) * ( 0o7/0o10 + maljuneco * 0o5/0o10 );
    sxelighoj.push({
      y: Math.min(y0, sxelaH - alto - 0o30),
      alto,
      sago: 0o11 + Math.random() * 0o14,
      kurbaAlto: 0o14 + Math.random() * 0o10,
      cikloj: [ 0o3 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o4 ) | 0 ) ],
      fazo: Math.random() * Math.PI * 2,
      malhelo: 0o35/0o100 + maljuneco * 0o25/0o100,
    });
  }
  // Cikatroj — malgrandaj horizontalaj vundoj, pli oftaj al la malsupro. Ili
  // estas pli larĝaj ol altaj ( la desegnilo kunpremas ilin vertikale ), kiel
  // la karakterizaj "brovaj" cikatroj de la papera betulo, kie branĉo aŭ
  // peco de ŝelo deŝiriĝis.
  const cikatroj: BetulaCikatro[] = [];
  for ( let i = 0; i < 0o24; i++ ) {
    const radiaj: number[] = [];
    for ( let v = 0; v < 0o6; v++ ) radiaj.push(0o7/0o10 + Math.random() * 0o6/0o10);
    cikatroj.push({
      x: Math.random() * sxelaW,
      y: sxelaH * ( 0o6/0o10 + Math.random() * 0o4/0o10 ),
      r: 0o3 + Math.random() * 0o6,
      angulo: ( Math.random() - 0o5/0o10 ) * 0o4/0o10,
      radiaj,
    });
  }
  betulaSkizo = { lenticeloj, strioj, helajStrioj, horizontajoj, sxelighoj, cikatroj };
  return betulaSkizo;
}

// desegniLenticelon — Desegnu unu lenticelon kiel pintigitan spinelon kun
// milda flekso — la tipa nigra horizontala marko de la betula sxoelo.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param lent ( BetulaLenticelo ) - La lenticela skizo.
//     @param koloro ( string ) - La pleniga koloro.
function desegniLenticelon(k: CanvasRenderingContext2D, lent: BetulaLenticelo, koloro: string): void {
  k.save();
  k.translate(lent.x, lent.y);
  k.rotate(lent.angulo);
  const duono = lent.longo / 2;
  const d = lent.dikeco, kurb = lent.kurbo;
  k.beginPath();
  k.moveTo(-duono, 0);
  k.quadraticCurveTo(-duono * 0o1/0o4, kurb - d * 0o63/0o100, 0, kurb - d);
  k.quadraticCurveTo(duono * 0o1/0o4, kurb - d * 0o63/0o100, duono, 0);
  k.quadraticCurveTo(duono * 0o1/0o4, kurb + d * 0o63/0o100, 0, kurb + d);
  k.quadraticCurveTo(-duono * 0o1/0o4, kurb + d * 0o63/0o100, -duono, 0);
  k.closePath();
  k.fillStyle = koloro;
  k.fill();
  // La korka kresto leviĝas. mola ombro sub la marko kaj maldensa hela rando
  // supre — la sama subtila reliefo en la kolor- kaj bump-teksajxoj.
  k.lineCap = "round";
  k.strokeStyle = "rgba(20,16,12,0.22)";
  k.lineWidth = d * 0o63/0o100;
  k.beginPath();
  k.moveTo(-duono * 0o72/0o100, kurb + d * 0o11/0o10);
  k.quadraticCurveTo(0, kurb + d * 0o6/0o10, duono * 0o72/0o100, kurb + d * 0o11/0o10);
  k.stroke();
  k.strokeStyle = "rgba(255,255,250,0.30)";
  k.lineWidth = d * 0o5/0o10;
  k.beginPath();
  k.moveTo(-duono * 0o72/0o100, kurb - d * 0o11/0o10);
  k.quadraticCurveTo(0, kurb - d * 0o7/0o10, duono * 0o72/0o100, kurb - d * 0o11/0o10);
  k.stroke();
  k.restore();
}

// desegniStrion — Desegnu unu fajnan vertikalan strion kun milda s-kurbo.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param strio ( BetulaStrio ) - La stria skizo.
//     @param koloro ( string ) - La streka koloro.
function desegniStrion(k: CanvasRenderingContext2D, strio: BetulaStrio, koloro: string): void {
  k.save();
  k.strokeStyle = koloro;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.ondo, strio.y + strio.longo * 0o4/0o10, strio.x - strio.ondo * 0o6/0o10, strio.y + strio.longo);
  k.stroke();
  k.restore();
}

// desegniHorizontanStrion — Desegnu unu fajnan horizontalan ondon — la
// transversaj sulkoj kiujn montras la betula sxoelo.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param strio ( BetulaStrio ) - La stria skizo.
//     @param koloro ( string ) - La streka koloro.
function desegniHorizontanStrion(k: CanvasRenderingContext2D, strio: BetulaStrio, koloro: string): void {
  k.save();
  k.strokeStyle = koloro;
  k.lineWidth = strio.dikeco;
  k.lineCap = "round";
  k.beginPath();
  k.moveTo(strio.x, strio.y);
  k.quadraticCurveTo(strio.x + strio.longo * 0o4/0o10, strio.y + strio.ondo, strio.x + strio.longo, strio.y - strio.ondo * 0o6/0o10);
  k.stroke();
  k.restore();
}

// desegniSxelighon — Desegnu unu horizontan senŝeliĝan bendon. la malhela
// interna sxoelo kun ĉifonaj supraj/malsupraj randoj, malhela ombro sub la
// bukla rando, kaj hela papera rando supre. La randa neregulaĵo estas
// sinus-ondoj kun entjeraj cikloj, do la randoj kongruas ĉe la kahelaj
// randoj kaj la bendo ĉirkaŭvolvas la trunkon senkudre.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param sxel ( BetulaSxeligho ) - La senŝeliĝa skizo.
//     @param malhela ( string ) - La interna sxoela koloro.
//     @param ombro ( string ) - La ombro sub la bukla rando.
//     @param hela ( string ) - La bukla papera randa koloro.
function desegniSxelighon(k: CanvasRenderingContext2D, sxel: BetulaSxeligho, malhela: string, ombro: string, hela: string): void {
  const pasoj = 0o100, paso = sxelaW / pasoj;
  const punktoj: number[] = [];
  const [ n1, n2 ] = sxel.cikloj;
  for ( let i = 0; i <= pasoj; i++ ) {
    const t = ( i * paso ) / sxelaW * Math.PI * 2;
    punktoj.push(sxel.sago * ( Math.sin(t * n1 + sxel.fazo) * 0o6/0o10 + Math.sin(t * n2 + sxel.fazo * 0o17/0o10) * 0o4/0o10 ));
  }
  const bendo = ( de: number, dikeco: number, koloro: string ): void => {
    k.beginPath();
    k.moveTo(0, sxel.y + de + punktoj[0]);
    for ( let i = 1; i <= pasoj; i++ ) k.lineTo(i * paso, sxel.y + de + punktoj[i]);
    for ( let i = pasoj; i >= 0; i-- ) k.lineTo(i * paso, sxel.y + de + dikeco + punktoj[i]);
    k.closePath();
    k.fillStyle = koloro;
    k.fill();
  };
  // La malhela interna sxoelo.
  bendo(0, sxel.alto, malhela);
  // ⟨ La tavoloj de la papero 📃 ⟩ — maldika pli malhela strio meze de la
  // interna sxoelo, kie dua folio de ŝelo ankoraŭ kuŝas. Sen ĝi la senŝeliĝa
  // bendo estas ebeno de unu koloro; kun ĝi ĝi montras siajn tavolojn, kiel la
  // veraj betulaj bendoj.
  bendo(sxel.alto * 0o4/0o10, 0o2, malhela);
  // La ombro sub la bukla rando.
  bendo(sxel.kurbaAlto, 0o6, ombro);
  // La hela bukla papera rando — la senŝeliĝanta tavolo kiu kaptas la lumon.
  bendo(0, sxel.kurbaAlto, hela);
}

// desegniCikatron — Desegnu unu malgrandan malhelan vundon de la sxoelo kun
// hela leviĝanta rando. La radiaj valoroj venas de la skizo, por ke la
// kolor- kaj bump-teksajxoj desegnu la IDENTAN formon.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param cik ( BetulaCikatro ) - La cikatra skizo.
//     @param malhela ( string ) - La vunda koloro.
//     @param hela ( string ) - La randa koloro.
function desegniCikatron(k: CanvasRenderingContext2D, cik: BetulaCikatro, malhela: string, hela: string): void {
  k.save();
  k.translate(cik.x, cik.y);
  k.rotate(cik.angulo);
  k.beginPath();
  for ( let i = 0; i <= cik.radiaj.length; i++ ) {
    const t = i / cik.radiaj.length * Math.PI * 2;
    const r = cik.r * cik.radiaj[i % cik.radiaj.length];
    const x = Math.cos(t) * r, y = Math.sin(t) * r * 0o35/0o100;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  k.closePath();
  k.fillStyle = malhela;
  k.fill();
  k.strokeStyle = hela;
  k.lineWidth = 1;
  k.stroke();
  k.restore();
}

// kreiSxelanTeksajxon — Kreu proceduralan betulan sxelan teksajxon por la
// arbtrunkoj. Blankeca sxoelo kun horizontalaj nigraj lenticeloj, fajnaj
// vertikalaj strioj, molaj ton-nuboj kaj longaj helaj senŝeliĝaj tavoloj —
// pli vetera al la trunka bazo. Ĉiu marko ĉirkaŭvolvas la kahelan randon
// ( naŭ kopioj per tranĉaĵo ), do la teksajxo estas senkudra ĉirkaŭ la trunko.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( k ) => {
    // Bazo — papera blanko, pli hela kaj pli malvarmeta ol la malnova varma
    // flaveto. la blanka betulo vere estas preskaŭ neĝa.
    k.fillStyle = "#f8f8f0"; k.fillRect(0, 0, sxelaW, sxelaH);
    // Mola ton-variajo — HELAJ nuboj rompas la platan blankon kaj kaŝas la
    // kahelan kudron sen grizigi la trunkon. Nur unu tre malforta malhela nubo.
    desegniWrapajnNubojn(k, sxelaW, sxelaH, 0o14,
      [ "rgba(255,255,252,0.35)", "rgba(248,247,242,0.25)", "rgba(232,230,222,0.10)" ],
      0o10/0o100, 0o12/0o100);
    const skizo = generiBetulanSkizon();
    // Fajnaj horizontalaj sulkoj — la transversa teksturo de la sxoelo.
    for ( const strio of skizo.horizontajoj ) {
      const koloro = `rgba(158,154,142,${0o1/0o20 + Math.random() * 0o1/0o20})`;
      desegniWrapan(k, sxelaW, () => { desegniHorizontanStrion(k, strio, koloro); });
    }
    // Fajnaj vertikalaj strioj — la strieca teksturo de la sxoelo.
    for ( const strio of skizo.strioj ) {
      const koloro = `rgba(176,172,158,${0o1/0o10 + Math.random() * 0o12/0o100})`;
      desegniWrapan(k, sxelaW, () => { desegniStrion(k, strio, koloro); });
    }
    // Helaj senŝeliĝaj tavoloj — longaj lumaj strioj de la junaj tavoloj.
    for ( const strio of skizo.helajStrioj ) {
      const koloro = `rgba(253,253,247,${0o3/0o20 + Math.random() * 0o3/0o20})`;
      desegniWrapan(k, sxelaW, () => { desegniStrion(k, strio, koloro); });
    }
    // Lenticeloj — la horizontalaj nigraj markoj en aroj. Pli malhelaj kaj
    // pli grandaj malsupre, kie la sxoelo estas pli malnova.
    // ⟨ Mola varma halo sub ĉiu lenticelo 📃 ⟩ — la marko mem estas preskaŭ
    // nigra kaj akra, do sen transiro ĝi legiĝis kiel gluita sur la blanka
    // sxoelo. Nun ĉiu lenticelo ricevas unue pli grandan, duontravideblan varman
    // makulon ( la sxoelo ĉirkaŭ vera lenticelo bruniĝas ), kaj nur poste la
    // malhelan markon — la du samas en la kolor- kaj la reliefa teksajxo.
    for ( const lent of skizo.lenticeloj ) {
      const maljuneco = lent.y / sxelaH;
      const koloro = `rgba(26,23,19,${0o55/0o100 + maljuneco * 0o30/0o100})`;
      desegniWrapan(k, sxelaW, () => {
        desegniLenticelon(k, { ...lent, longo: lent.longo + 0o4, dikeco: lent.dikeco + 1 },
          `rgba(152,134,104,${0o10/0o100 + maljuneco * 0o6/0o100})`);
        desegniLenticelon(k, lent, koloro);
      });
    }
    // Senŝeliĝaj bendoj — la malhela interna sxoelo kun hela bukla rando,
    // la plej karakteriza marko de la papera betulo. Pli malhelaj kaj pli
    // grandaj malsupre.
    for ( const sxel of skizo.sxelighoj ) {
      desegniWrapan(k, sxelaW, () => {
        desegniSxelighon(k, sxel,
          `rgba(104,94,80,${sxel.malhelo})`,
          "rgba(24,18,12,0.25)",
          "rgba(252,251,245,0.85)");
      });
    }
    // Cikatroj — malgrandaj malhelaj vundoj kun helaj randoj.
    for ( const cik of skizo.cikatroj ) {
      desegniWrapan(k, sxelaW, () => {
        desegniCikatron(k, cik, "rgba(96,88,74,0.50)", "rgba(250,250,242,0.55)");
      });
    }
    // ⟨ La papera grajno 📃 ⟩ — fajna malregula grajno super ĉio: la betula
    // ŝelo ne estas glata papero, ĝi havas etajn malhelajn kaj helajn fibrojn.
    // ⟨ La fibroj kuŝas HORIZONTALE 📃 ⟩ — la antaŭaj izotropaj punktoj ( samaj
    // laŭ larĝo kaj alto ) legiĝis kiel televida bruo sur la blanka ŝelo. La
    // fibroj de betula papero sekvas la trunkon, do la grajno nun konsistas el
    // mallongaj horizontalaj streketoj — 1 gxis 9 rastrumeroj longaj, 1 alta.
    // La starto estas limigita al sxelaW − l, do neniu streketo transiras la
    // kahelan randon kaj neniu ĉirkaŭvolva kopio necesas.
    for ( let i = 0; i < 0o4000; i++ ) {
      const l = 0o1 + Math.random() * 0o10;
      k.fillStyle = Math.random() < 0o3/0o5
        ? `rgba(120,116,104,${0o3/0o100 + Math.random() * 0o10/0o100})`
        : `rgba(255,255,250,${0o5/0o100 + Math.random() * 0o10/0o100})`;
      k.fillRect(Math.random() * ( sxelaW - l ), Math.random() * sxelaH, l, 1);
    }
    // Malsupra vetera lavo — la trunka bazo estas pli griza kaj ombrita. La
    // betula ŝelo malheliĝas vere nur ĉe la grundo, kaj tiu griza kolumo estas
    // unu el la plej rekonaj signoj de la blanka betulo.
    const lavo = k.createLinearGradient(0, sxelaH * 0o5/0o10, 0, sxelaH);
    lavo.addColorStop(0, "rgba(168,164,152,0)");
    lavo.addColorStop(0.55, "rgba(156,152,142,0.10)");
    lavo.addColorStop(1, "rgba(120,116,108,0.34)");
    k.fillStyle = lavo;
    k.fillRect(0, 0, sxelaW, sxelaH);
  }, [ 1, 1 ], { anisotropio: 4 });
});

// kreiSxelanBumpanTeksajxon — Griznivela reliefa teksajxo por la betula
// sxoelo. La SAMA skizo kiel la kolor-teksajxo, do la reliefo akurate sekvas
// la markojn. la lenticeloj estas malprofundaj sulkoj ( pli profundaj al la
// bazo ), la strioj leviĝas kiel fajnaj krestoj, kaj la senŝeliĝaj tavoloj
// elstaras pli helaj. Bump-teksajxoj restas en lineara koloro.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(sxelaW, sxelaH, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, sxelaW, sxelaH);
    const skizo = generiBetulanSkizon();
    // Mola grand-skala reliefo — la malebena sxoelo ne estas plata.
    for ( let i = 0; i < 0o14; i++ ) {
      const r = sxelaH * ( 0o10/0o100 + Math.random() * 0o10/0o100 );
      const x = Math.random() * sxelaW, y = Math.random() * sxelaH;
      const koloro = i % 2 ? "rgba(142,142,138,0.16)" : "rgba(74,74,74,0.14)";
      desegniWrapan(kunteksto, sxelaW, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    // Fajnaj horizontalaj sulkoj — malprofundaj transversaj sulketoj.
    for ( const strio of skizo.horizontajoj ) {
      const koloro = "rgba(140,140,140,0.20)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniHorizontanStrion(kunteksto, strio, koloro); });
    }
    // Fajnaj strioj — leviĝantaj krestoj.
    for ( const strio of skizo.strioj ) {
      const koloro = "rgba(146,146,146,0.35)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniStrion(kunteksto, strio, koloro); });
    }
    // Senŝeliĝaj tavoloj — pli elstaraj krestoj.
    for ( const strio of skizo.helajStrioj ) {
      const koloro = "rgba(162,162,162,0.45)";
      desegniWrapan(kunteksto, sxelaW, () => { desegniStrion(kunteksto, strio, koloro); });
    }
    // Lenticeloj — malprofundaj sulkoj, pli profundaj al la bazo.
    for ( const lent of skizo.lenticeloj ) {
      const griz = Math.round(0o200 - 0o40 * ( lent.y / sxelaH ));
      const koloro = `rgb(${griz},${griz},${griz})`;
      desegniWrapan(kunteksto, sxelaW, () => { desegniLenticelon(kunteksto, lent, koloro); });
    }
    // Senŝeliĝaj bendoj — profundaj sulkoj kun elstaraj buklaj randoj, pli
    // profundaj al la bazo.
    for ( const sxel of skizo.sxelighoj ) {
      desegniWrapan(kunteksto, sxelaW, () => {
        const griz = Math.round(0o110 - 0o40 * ( sxel.y / sxelaH ));
        desegniSxelighon(kunteksto, sxel,
          `rgb(${griz},${griz},${griz})`,
          "rgba(56,56,56,0.6)",
          "rgb(184,184,184)");
      });
    }
    // Cikatroj — malprofundaj sulkoj kun helaj randoj.
    for ( const cik of skizo.cikatroj ) {
      desegniWrapan(kunteksto, sxelaW, () => {
        desegniCikatron(kunteksto, cik, "rgba(104,104,104,0.55)", "rgba(150,150,150,0.5)");
      });
    }
    // Fajna fibra grajno — la sama papera malglateco ankaŭ en la reliefo, do
    // la ŝelo ne legiĝas kiel glata plasto de proksime. La sama HORIZONTALA
    // streketo kiel en la koloro, do la reliefo montras la paperajn fibrojn.
    for ( let i = 0; i < 0o4000; i++ ) {
      const l = 0o1 + Math.random() * 0o10;
      const griz = ( Math.random() < 0o1/0o2
        ? 0o200 + ( ( Math.random() * 0o26 ) | 0 )
        : 0o140 + ( ( Math.random() * 0o20 ) | 0 ) );
      kunteksto.fillStyle = `rgba(${griz},${griz},${griz},0.5)`;
      kunteksto.fillRect(Math.random() * ( sxelaW - l ), Math.random() * sxelaH, l, 1);
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});

// Larika sxoela skizo — la kolor- kaj bump-teksajxoj dividas la SAMAN
// skizon, por ke la reliefo akurate sekvu la koloron. profundaj vertikalaj
// fendoj, leviĝantaj plato-kolonoj, horizontalaj skvamaj fendoj kaj
// malglataj makuloj — la malnova, skvama sxoelo de la alpina lariko.
interface LarikaFendo {
  x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number;
}

interface LarikaPlato {
  x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number;
}

// LarikaKresto — Unu levita vertikala ŝel-plato inter la fendoj. La larĝo kaj la
// lumo apartenas al la skizo, ĉar la kolor- kaj la bump-teksajxo devas levi la
// SAMAN platon — kun la antaŭa Math.random() en la desegnilo la reliefo levis
// platojn, kiuj ne ekzistis en la koloro.
interface LarikaKresto { x: number; largho: number; hela: boolean; }

interface LarikaMakulo {
  x: number; y: number; r: number; hela: boolean;
}

interface LarikaSkizo {
  fendoj: LarikaFendo[];
  platoj: LarikaPlato[];
  makuloj: LarikaMakulo[];
  krestoj: LarikaKresto[];
}

let larikaSkizo: LarikaSkizo | null = null;

// generiLarikanSkizon — Kreu unufoje la komunan larikan skizon.
function generiLarikanSkizon(): LarikaSkizo {
  if ( larikaSkizo ) return larikaSkizo;
  const w = 0o200, h = 0o400;
  const fendoj: LarikaFendo[] = [];
  for ( let i = 0; i < 0o20; i++ ) {
    fendoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o60 + Math.random() * 0o220,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o4,
      dikeco: 1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  const platoj: LarikaPlato[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    platoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o6 + Math.random() * 0o20,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1 + Math.random() * 0o2,
      tono: Math.random(),
    });
  }
  const makuloj: LarikaMakulo[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    makuloj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 0o3,
      hela: Math.random() < 0o5/0o10,
    });
  }
  // ⟨ La vertikalaj krestoj estas malsamlarĝaj 📃 ⟩ — antaŭe 0o14 platoj de
  // preskaŭ egala larĝo ( 2–6 rastrumeroj ) faris ritman striadon; vera ŝelo havas
  // kelkajn larĝajn platojn kaj multajn mallarĝajn. Nun 0o26 platoj kun larĝo de
  // 2 gxis 0o10 rastrumeroj, kaj ĉiu portas sian propran lumon.
  const krestoj: LarikaKresto[] = [];
  for ( let i = 0; i < 0o26; i++ ) {
    krestoj.push({
      x: Math.random() * w,
      largho: 0o2 + Math.random() * Math.random() * 0o10,
      hela: Math.random() < 0o6/0o10,
    });
  }
  larikaSkizo = { fendoj, platoj, makuloj, krestoj };
  return larikaSkizo;
}

// kreiLarikanSxelanTeksajxon — Kreu proceduralan larikan sxelan teksajxon.
// Grizbruna sxoelo kun profundaj ruĝbrunaj vertikalaj fendoj, leviĝantaj
// helaj platoj, horizontalaj skvamaj rompoj kaj malglataj makuloj — la
// malnova skvama sxoelo de la alpina lariko. Ĉiu marko ĉirkaŭvolvas la
// kahelan randon ( naŭ kopioj per tranĉaĵo ), do la teksajxo estas senkudra.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiLarikanSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o200, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( k ) => {
    // Bazo — grizbruna malnova lariko.
    k.fillStyle = "#989080"; k.fillRect(0, 0, w, h);
    // Mola ton-variajo — helaj kaj malhelaj nuboj rompas la platan bazon
    // kaj kaŝas la kahelan kudron.
    desegniWrapajnNubojn(k, w, h, 0o16,
      [ "rgba(160,150,136,0.20)", "rgba(70,62,54,0.18)", "rgba(112,104,92,0.22)" ],
      0o10/0o100, 0o14/0o100);
    const skizo = generiLarikanSkizon();
    // ⟨ La krestoj havas molan lumon 📃 ⟩ — antaŭe ĉiu plato estis egala
    // rektangulo kun akraj randoj, do la ŝelo legiĝis kiel pentritaj strioj. Nun
    // horizontala gradiento mallumigas la randojn kaj lumigas la centron de la
    // plato, do la bendo legiĝas kiel ronda kresto.
    for ( const kresto of skizo.krestoj ) {
      const pinto = kresto.hela
        ? `rgba(176,164,146,${0o17/0o100 + Math.random() * 0o10/0o100})`
        : `rgba(56,46,38,${0o20/0o100 + Math.random() * 0o10/0o100})`;
      desegniWrapan(k, w, () => {
        const g = k.createLinearGradient(kresto.x, 0, kresto.x + kresto.largho, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        k.fillStyle = g;
        k.fillRect(kresto.x, 0, kresto.largho, h);
      });
    }
    // Profundaj vertikalaj fendoj — ruĝbrunaj sulkoj kun malhela kerno.
    // ⟨ Hela rimo sur unu flanko 📃 ⟩ — post la malhela kerno venas maldika hela
    // linio tuj apud la sulko: la lumo kaptiĝas sur la rando de la najbara plato.
    // Sen ĝi la fendo legiĝas kiel simple desegnita streko anstataŭ kiel truo.
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o5/0o10 ? "rgba(128,82,56,0.45)" : "rgba(70,50,40,0.50)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(k, w, () => {
        desegniStrion(k, fendo, korpo);
        desegniStrion(k, { ...fendo, dikeco: kernDikeco }, "rgba(52,36,28,0.55)");
        desegniStrion(k, { ...fendo, x: fendo.x + kernDikeco * 0o6/0o10, dikeco: 1 },
          "rgba(186,174,158,0.22)");
      });
    }
    // Horizontalaj skvamaj fendoj — la rompoj de la sxoelaj platoj. La malhela
    // rompo portas helan suban randon ( la skvamo leviĝas sub la fendo ).
    for ( const plato of skizo.platoj ) {
      const koloro = plato.tono < 0o5/0o10
        ? `rgba(150,140,126,${0o2/0o10 + Math.random() * 0o3/0o10})`
        : `rgba(56,42,34,${0o25/0o40 + Math.random() * 0o15/0o40})`;
      desegniWrapan(k, w, () => {
        desegniHorizontanStrion(k, plato, koloro);
        if ( plato.tono >= 0o5/0o10 ) {
          desegniHorizontanStrion(k, { ...plato, y: plato.y + 1, dikeco: 1 },
            "rgba(188,176,160,0.20)");
        }
      });
    }
    // Skvamaj makuloj — malgrandaj malhelaj kaj helaj punktoj de la malglata sxoelo.
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(176,166,152,0.25)" : "rgba(52,42,36,0.30)";
      desegniWrapan(k, w, () => {
        k.fillStyle = koloro;
        k.beginPath(); k.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); k.fill();
      });
    }
  }, [ 1, 2 ]);
});

// kreiLarikanSxelanBumpanTeksajxon — Griznivela reliefa teksajxo por la
// larika sxoelo. La SAMA skizo kiel la kolor-teksajxo, do la reliefo akurate
// sekvas la koloron. la fendoj estas profundaj sulkoj kun eĉ pli profundaj
// kernoj, la platoj leviĝas kiel krestoj, la skvamaj fendoj kaj makuloj
// donas malglatan reliefon. Bump-teksajxoj restas en lineara koloro.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiLarikanSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o200, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, w, h);
    const skizo = generiLarikanSkizon();
    // Mola grand-skala reliefo — la malglata sxoelo ne estas plata.
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 2 ? "rgba(142,142,138,0.16)" : "rgba(70,70,70,0.16)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    // Profundaj fendoj — sulkoj kun eĉ pli malhela kerno.
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, "rgba(120,120,120,0.50)");
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(86,86,86,0.70)");
      });
    }
    // Leviĝantaj platoj — helaj krestoj kun la sama mola lumo kiel en la
    // kolor-teksajxo ( la sama skizo, do la du kongruas precize ).
    for ( const kresto of skizo.krestoj ) {
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(kresto.x, 0, kresto.x + kresto.largho, 0);
        g.addColorStop(0, "rgba(128,128,128,0)");
        g.addColorStop(0o1/0o2, kresto.hela ? "rgba(162,162,162,0.48)" : "rgba(112,112,112,0.38)");
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.fillRect(kresto.x, 0, kresto.largho, h);
      });
    }
    // La hela rimo de ĉiu fendo ankaŭ reliefas.
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, { ...fendo, x: fendo.x + kernDikeco * 0o6/0o10, dikeco: 1 },
          "rgba(158,158,158,0.35)");
      });
    }
    // Horizontalaj skvamaj fendoj.
    for ( const plato of skizo.platoj ) {
      const koloro = plato.tono < 0o5/0o10 ? "rgba(152,152,152,0.40)" : "rgba(98,98,98,0.45)";
      desegniWrapan(kunteksto, w, () => { desegniHorizontanStrion(kunteksto, plato, koloro); });
    }
    // Malglataj makuloj.
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(152,152,152,0.35)" : "rgba(94,94,94,0.40)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
  }, [ 1, 2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});

// Diorita kristala skizo — la kolor- kaj bump-teksajxoj dividas la SAMAN
// skizon, por ke la reliefo akurate sekvu la koloron. La skizo generiĝas
// unufoje — ĉiuj hazardaj valoroj ( pozicio, grandeco, angulo, verticoj kaj
// tono ) estas fiksitaj ĉe la generado, do la naŭ ĉirkaŭvolvaj kopioj
// desegnas la IDENTAN kristalon kaj la bump-teksajxo kongruas kun la koloro.
interface DioritaKristalo {
  x: number; y: number; rx: number; ry: number; angulo: number;
  indekso: number;
  verticoj: number[];
}

// Diorita paletro — tri nuancoj por ĉiu faceto ( hela angulo, bazo, malhela
// angulo ) kaj la bump-reliefo. reliefo 0o4/0o10 estas plata; pli alta
// signifas pli elstara faceto. La koloroj sekvas la #nmnmnm formaton.
const dioritaPaletro = [
  // Lumaj feldspataj facetoj — la salo de la salo-pipro mikso.
  { hela: "#f8f8f0", bazo: "#f0f0e8", malhela: "#d8d8d0", reliefo: 0o54/0o100 },
  { hela: "#f0f0e8", bazo: "#e8e8e0", malhela: "#d0d0c8", reliefo: 0o52/0o100 },
  { hela: "#e8e8e0", bazo: "#e0e0d8", malhela: "#c8c8c0", reliefo: 0o50/0o100 },
  { hela: "#e0e0d8", bazo: "#d8d8d0", malhela: "#c0c0b8", reliefo: 0o46/0o100 },
  { hela: "#d8d8d0", bazo: "#d0d0c8", malhela: "#b8b8b0", reliefo: 0o44/0o100 },
  // Mezaj kvarco-facetoj.
  { hela: "#d0d0c8", bazo: "#c8c8c0", malhela: "#b0b0a8", reliefo: 0o42/0o100 },
  { hela: "#c0c0b8", bazo: "#b8b8b0", malhela: "#a0a098", reliefo: 0o40/0o100 },
  { hela: "#b0b0a8", bazo: "#a8a8a0", malhela: "#909088", reliefo: 0o36/0o100 },
  { hela: "#a0a098", bazo: "#989890", malhela: "#808078", reliefo: 0o34/0o100 },
  { hela: "#909088", bazo: "#888880", malhela: "#787870", reliefo: 0o32/0o100 },
  // Malhelaj biotito/hornblendo-facetoj — la pipro de la salo-pipro mikso.
  { hela: "#707068", bazo: "#686860", malhela: "#505048", reliefo: 0o26/0o100 },
  { hela: "#606058", bazo: "#585850", malhela: "#484840", reliefo: 0o24/0o100 },
  { hela: "#505048", bazo: "#484840", malhela: "#383830", reliefo: 0o22/0o100 },
  { hela: "#404038", bazo: "#383830", malhela: "#282820", reliefo: 0o20/0o100 },
  { hela: "#303028", bazo: "#282820", malhela: "#181810", reliefo: 0o16/0o100 },
];

// elektiDioritanIndekson — Pezita elekto de la paletro. La plej multaj
// kristaloj estas lumaj feldspataj facetoj kaj la malplimulto estas malhelaj
// biotitoj — la karakteriza salo-pipro ekvilibro de polurita diorito.
//     @returns indekso ( number ) - Indekso en la diorita paletro.
function elektiDioritanIndekson(): number {
  const r = Math.random();
  if ( r < 0o32/0o100 ) return ( Math.random() * 0o4 ) | 0;
  if ( r < 0o54/0o100 ) return 0o4 + ( ( Math.random() * 0o4 ) | 0 );
  return 0o10 + ( ( Math.random() * 0o4 ) | 0 );
}

// generiDioritajnKristalojn — Kreu unufoje la komunan kristalan skizon por
// la dioritaj teksajxoj. La kristaloj estas angulaj neregulaj poligonoj ( ne
// la malnovaj molaj gradienaj elipsoj ), kun la salo-pipro paletro de la
// polurita ŝtono.
//     @returns kristaloj ( DioritaKristalo[] ) - La fiksita skizo.
let dioritajKristaloj: DioritaKristalo[] | null = null;
function generiDioritajnKristalojn(): DioritaKristalo[] {
  if ( dioritajKristaloj ) return dioritajKristaloj;
  const listo: DioritaKristalo[] = [];
  for ( let i = 0; i < 0o340; i++ ) {
    const n = 5 + ( ( Math.random() * 3 ) | 0 );
    const verticoj: number[] = [];
    for ( let v = 0; v < n; v++ ) verticoj.push(0o7/0o10 + Math.random() * 0o3/0o10);
    listo.push({
      x: hazard(0, 0o400), y: hazard(0, 0o400),
      rx: hazard(0o4, 0o14), ry: hazard(0o3, 0o11),
      angulo: hazard(0, Math.PI),
      indekso: elektiDioritanIndekson(),
      verticoj,
    });
  }
  dioritajKristaloj = listo;
  return listo;
}

// kreiDioritanTeksajxon — Kreu proceduralan dioritan teksajxon por vojoj,
// dokoj kaj lampoj. Diorito estas helgriza intrusiva ŝtono kun interplektitaj
// kristaloj — la polurita faco montras angulajn facetojn de lumaj feldspatoj,
// mezaj kvarcoj kaj malhelaj biotitoj, la klasika salo-pipro mikso. La
// teksajxo estas granda ( 256px, ripeto 2×2 ) kun grand-skala mottlado kaj
// angulaj interplektitaj kristaloj kun maldikaj grajnrandoj. Ĉiu makulo kaj
// kristalo ĉirkaŭvolvas la kahelajn randojn ( naŭ kopioj per tranĉaĵo ), do
// la teksajxo estas PERFEKTE senkudra kaj ne montras bendojn kiam ĝi ripetiĝas.
export const kreiDioritanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    // Bazo — helgriza feldspata maso.
    kunteksto.fillStyle = "#d8d8d0"; kunteksto.fillRect(0, 0, s, s);
    // Grand-skala mottlado — molaj helaj kaj malhelaj nuboj, pli grandaj ol la
    // kristaloj, kiuj rompas la kahelan ripeton. La nuboj ĉirkaŭvolvas la randojn.
    // La malhelaj nuboj estas MOLAJ ( malalta alpha ) kaj iom pli helaj ol antaŭe,
    // por ke la ŝtono ne montru grandajn malhelajn makulojn kaj la koloro restu
    // pli egala.
    desegniWrapajnNubojn(kunteksto, s, s, 0o20,
      [ "rgba(248,248,240,0.3)", "rgba(104,104,96,0.18)", "rgba(168,168,160,0.26)", "rgba(136,136,128,0.16)" ],
      0o14/0o100, 0o16/0o100, hazard);
    // Kristalaj facetoj — angulaj neregulaj poligonoj ( 5-7 verticoj ) kun
    // faceta gradiento ( hela supro-maldekstra, malhela malsupro-dekstra ) kaj
    // maldika grajnrando. La interplektitaj plenigitaj poligonoj kunhavas la
    // saman skizon kiel la bump-teksajxo, do la reliefo sekvas la koloron.
    const kristaloj = generiDioritajnKristalojn();
    const grajnRandoj = [ "rgba(48,48,40,0.4)", "rgba(40,40,32,0.4)", "rgba(16,16,8,0.45)" ];
    for ( let i = 0; i < kristaloj.length; i++ ) {
      const kris = kristaloj[i];
      const pal = dioritaPaletro[kris.indekso];
      const rando = grajnRandoj[kris.indekso < 0o4 ? 0 : ( kris.indekso < 0o10 ? 1 : 2 )];
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        const g = kunteksto.createLinearGradient(-kris.rx, -kris.ry, kris.rx, kris.ry);
        g.addColorStop(0, pal.hela);
        g.addColorStop(0o7/0o10, pal.bazo);
        g.addColorStop(1, pal.malhela);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r;
          const py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = g;
        kunteksto.fill();
        kunteksto.strokeStyle = rando;
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    // Fajna piklo — subtilaj mikrokristaloj inter la facetoj. Ankaŭ la piklo
    // ĉirkaŭvolvas la kahelajn randojn, por ke eĉ la plej eta detalo ne tranĉiĝu
    // ĉe la kudro.
    for ( let i = 0; i < 0o640; i++ ) {
      const wd = hazard(0o1, 0o3), hd = hazard(0o1, 0o3);
      const x = hazard(0, s), y = hazard(0, s);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = i % 2 ? "rgba(80,80,72,0.45)" : "rgba(168,168,160,0.5)";
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
    // Helaj feldspataj briletoj — la lumbriloj de la polurita ŝtono.
    for ( let i = 0; i < 0o110; i++ ) {
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const x = hazard(0, s), y = hazard(0, s);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = "rgba(248,248,240,0.85)";
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});

// kreiDioritanBumpanTeksajxon — Griznivela reliefa teksajxo por diorito.
// La SAMA kristala skizo kiel la kolor-teksajxo, do la reliefo akurate sekvas
// la facetojn. lumaj feldspatoj leviĝas, malhelaj biotitoj sinkas, kaj la
// grajnrandoj ricevas malhelan konturon. La fajna piklo donas mikro-reliefon,
// do la polurita ŝtono ne aspektas plata. Bump-teksajxoj restas en lineara
// koloro.
export const kreiDioritanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    // Kristalaj facetoj — la sama skizo kiel la kolor-teksajxo.
    const kristaloj = generiDioritajnKristalojn();
    for ( let i = 0; i < kristaloj.length; i++ ) {
      const kris = kristaloj[i];
      const pal = dioritaPaletro[kris.indekso];
      const griz = Math.round(0o400 * pal.reliefo);
      const rando = Math.max(0o40, Math.round(0o400 * ( pal.reliefo - 0o1/0o20 )));
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r;
          const py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = `rgb(${griz},${griz},${griz})`;
        kunteksto.fill();
        kunteksto.strokeStyle = `rgb(${rando},${rando},${rando})`;
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    // Mikrokristaloj — malgrandaj helaj kaj malhelaj punktoj. Ankaŭ la piklo
    // ĉirkaŭvolvas la kahelajn randojn, por ke la reliefo ne montru kudrojn.
    for ( let i = 0; i < 0o640; i++ ) {
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const x = hazard(0, s), y = hazard(0, s);
      const koloro = Math.random() > 0o4/0o10 ? "rgba(216,216,216,0.6)" : "rgba(88,88,88,0.6)";  // egala por ĉiuj 9 kopioj
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o2, 0o2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});

// Roka skizo — la kolor- kaj bump-teksajxoj de la rokoj dividas la SAMAN
// skizon, por ke la reliefo akurate sekvu la koloron. La skizo generiĝas unufoje
// per semita generatoro, do ĉiuj markoj estas fiksitaj kaj la koloro kaj la
// reliefo kongruas tra ĉiuj ripetoj de la kahelo.
interface RokaKristalo {
  x: number; y: number; angulo: number; rx: number; ry: number;
  verticoj: number[]; tono: number;
}
interface RokaFendo {
  punktoj: [ number, number ][]; dikeco: number;
}
interface RokaSkizo {
  kristaloj: RokaKristalo[]; fendoj: RokaFendo[]; makuloj: [ number, number, number, number ][];
}

function generiRokanSkizon(): RokaSkizo {
  const hazardo = kreiHazardanGenerilon(0o2731);
  const s = 0o400;
  // ⟨ La kristaloj 📃 ⟩ — pli GRANDAJ ol ĉe la diorito de la vojoj: natura
  // ŝtonego montras siajn erojn, dum la polurita pavimo estas fajngrajna.
  // Ankaŭ la kontrasto estas malalta — la antaŭa ŝtono havis preskaŭ blankajn
  // kaj preskaŭ nigrajn makulojn kaj aspektis kiel punktita papero.
  // ⟨ Pli multaj, pli egalaj eroj 📃 ⟩ — antaŭe estis 31 eroj de radio 8–28,
  // do la kahelo montris kelkajn grandegajn platojn kaj multajn etajn; sur la
  // roko tio legiĝas kiel kamufla makulo. Nun estas 38 eroj de pli mallarĝa
  // amplekso ( 7–23 ): la ŝtono montras sian grajnon egale tra la tuta surfaco.
  const kristaloj: RokaKristalo[] = [];
  for ( let i = 0; i < 0o46; i++ ) {
    const n = 0o5 + ( ( hazardo() * 0o3 ) | 0 );
    const verticoj: number[] = [];
    for ( let v = 0; v < n; v++ ) verticoj.push(0o76/0o100 + hazardo() * 0o3/0o10);
    kristaloj.push({
      x: hazardo() * s, y: hazardo() * s, angulo: hazardo() * Math.PI,
      rx: 0o7 + hazardo() * 0o20, ry: 0o7 + hazardo() * 0o16,
      verticoj, tono: hazardo(),
    });
  }
  // ⟨ La fendoj 📃 ⟩ — maldikaj rompiĝlinioj kiuj trairas la ŝtonon. Ili estas
  // la plej klara signo de "rompita ŝtono" kaj ili mankis tute.
  const fendoj: RokaFendo[] = [];
  for ( let i = 0; i < 0o7; i++ ) {
    const punktoj: [ number, number ][] = [];
    let x = hazardo() * s, y = hazardo() * s;
    let ang = hazardo() * Math.PI * 2;
    punktoj.push([ x, y ]);
    for ( let j = 0; j < 0o7; j++ ) {
      ang += ( hazardo() - 0o5/0o10 ) * 0o7/0o10;
      x += Math.cos(ang) * ( 0o10 + hazardo() * 0o24 );
      y += Math.sin(ang) * ( 0o10 + hazardo() * 0o24 );
      punktoj.push([ x, y ]);
    }
    // ⟨ Maldikaj rompiĝlinioj 📃 ⟩ — antaŭe 1–2.5 rastrumeroj larĝaj, kaj kun
    // la 3×3 ripeto ili fariĝis larĝaj nigraj strioj trans la ŝtonegon. Nun ili
    // estas 0.7–1.6 — rompiĝlinioj, ne kanaloj.
    fendoj.push({ punktoj, dikeco: 0.7 + hazardo() * 0.9 });
  }
  // ⟨ La erodaj makuloj 📃 ⟩ — molaj rondaj makuloj: iuj pli helaj ( elfrotitaj
  // sablaj areoj ), iuj pli malhelaj aŭ verdaj ( musko en la fendoj ).
  const makuloj: [ number, number, number, number ][] = [];
  for ( let i = 0; i < 0o12; i++ ) {
    makuloj.push([ hazardo() * s, hazardo() * s, 0o12 + hazardo() * 0o34, hazardo() ]);
  }
  return { kristaloj, fendoj, makuloj };
}

// kreiRokenTeksajxon — La kolor-teksajxo de la naturaj ŝtonegoj. Ĝi anstataŭas
// la poluritan dioriton ( kiu restas por la vojoj kaj la lampoj ): malalta
// kontrasto, grandaj eroj, fendoj kaj erodaj makuloj. La ripeto estas 3×3, ĉar
// unu ŝtonego estas nur 1–3 unuojn larĝa — sen la pli densa ripeto la eroj
// estus grandaj teleroj sur la tuta roko.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiRokenTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    // Bazo — muta meza grizo.
    kunteksto.fillStyle = "#85857e"; kunteksto.fillRect(0, 0, s, s);
    // Grand-skala mottlado — molaj tonalaj nuboj. Iliaj alfoj malleviĝis: kun
    // 0.20–0.28 la kahelo montris grandajn helajn kaj malhelajn nubojn, kiujn
    // la 3×3 ripeto ripetis kiel kamuflaĵon. Nun ili nur modulas la tonon.
    desegniWrapajnNubojn(kunteksto, s, s, 0o24,
      [ "rgba(158,158,150,0.17)", "rgba(96,96,90,0.14)", "rgba(132,132,124,0.15)",
        "rgba(112,112,106,0.13)" ],
      0o14/0o100, 0o22/0o100, hazard);
    const skizo = generiRokanSkizon();
    // Kristaloj — malgranda kontrastaro de grizaj eroj kun maldika rando.
    // ⟨ Mallarĝa ton-amplekso 📃 ⟩ — la eroj de natura ŝtonego estas preskaŭ
    // samkoloraj ( la strukturo venas de la reliefo, ne de la koloro ); la
    // antaŭa paletro iris de 0x6f ĝis 0xa1 kaj faris la surfacon makula.
    const paletro = [ "#8a8a83", "#82827b", "#908f88", "#7d7d76", "#969690", "#87877f",
      "#8d8d86", "#7f7f78" ];
    for ( const kris of skizo.kristaloj ) {
      const bazo = paletro[( kris.tono * paletro.length ) | 0];
      const hela = kris.tono > 0.72 ? "rgba(206,206,196,0.40)" : "rgba(178,178,168,0.30)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r, py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = bazo;
        kunteksto.fill();
        // Iomete de la glata faceta brilo de la ero.
        const g = kunteksto.createLinearGradient(-kris.rx, -kris.ry, kris.rx, kris.ry);
        g.addColorStop(0, hela);
        g.addColorStop(0o6/0o10, senAlfa(hela));
        kunteksto.fillStyle = g;
        kunteksto.fill();
        // ⟨ Mola er-limo 📃 ⟩ — la eroj ne estas desegnitaj unu sur la alia:
        // mallarĝa malhela limo sufiĉas, kaj ĝi devas resti malforta, ĉar la
        // fendoj portas la strukturon.
        kunteksto.strokeStyle = "rgba(56,56,52,0.16)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    // Erodaj makuloj — molaj, ĉirkaŭvolvitaj.
    for ( const m of skizo.makuloj ) {
      const koloro = m[3] < 0o35/0o100 ? "rgba(180,180,170,0.20)"
        : ( m[3] < 0o7/0o10 ? "rgba(92,92,86,0.22)" : "rgba(104,120,92,0.20)" );
      desegniWrapan(kunteksto, s, () => {
        const g = kunteksto.createRadialGradient(m[0], m[1], 0, m[0], m[1], m[2]);
        g.addColorStop(0, koloro);
        g.addColorStop(1, senAlfa(koloro));
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(m[0], m[1], m[2], 0, Math.PI * 2); kunteksto.fill();
      });
    }
    // Fendoj — malhela linio kun hela eĝo apud si ( la štono rompiĝis kaj unu
    // flanko kaptas la lumon ).
    for ( const fendo of skizo.fendoj ) {
      desegniWrapan(kunteksto, s, () => {
        kunteksto.lineCap = "round";
        kunteksto.strokeStyle = "rgba(148,148,140,0.24)";
        kunteksto.lineWidth = fendo.dikeco + 1.6;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(48,48,44,0.46)";
        kunteksto.lineWidth = fendo.dikeco;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
      });
    }
    // ⟨ La kvarco-vejnoj 📃 ⟩ — maldikaj helaj vejnoj, kiuj trapasas plurajn
    // kristalojn. Ili estas la plej forta signo de "vera ŝtono": ŝtonego sen
    // ili montras nur hazardajn makulojn, ĉar la okulo ne havas ion por legi
    // kiel mineralan strukturon.
    for ( let i = 0; i < 0o3; i++ ) {
      let x = hazard(0, s), y = hazard(0, s);
      let ang = hazard(0, Math.PI * 2);
      kunteksto.save();
      kunteksto.lineCap = "round";
      kunteksto.strokeStyle = "rgba(232,232,222,0.55)";
      kunteksto.lineWidth = 1.4 + Math.random() * 1.4;
      kunteksto.beginPath(); kunteksto.moveTo(x, y);
      for ( let j = 0; j < 0o14; j++ ) {
        ang += ( Math.random() - 0o1/0o2 ) * 0.8;
        x += Math.cos(ang) * 14; y += Math.sin(ang) * 14;
        kunteksto.lineTo(x, y);
      }
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(120,120,112,0.30)";
      kunteksto.lineWidth = 3;
      kunteksto.stroke();
      kunteksto.restore();
    }
    // Grajno — fajna piklo, ĉirkaŭvolvita. Kelkaj eroj estas preskaŭ blankaj
    // ( kvarco ) kaj kelkaj preskaŭ nigraj ( mikao ), kiel en vera granito.
    for ( let i = 0; i < 0o600; i++ ) {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = i % 0o7 === 0 ? "rgba(226,226,218,0.60)"
          : ( i % 2 ? "rgba(96,96,90,0.30)" : "rgba(178,178,168,0.34)" );
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});

// kreiRokenBumpanTeksajxon — Griznivela reliefo por la naturaj ŝtonegoj. La
// SAMA skizo kiel la koloro, do la eroj leviĝas, la fendoj sinkas kaj la
// erodaj makuloj restas preskaŭ ebenaj. Bump-teksajxoj restas en lineara koloro.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiRokenBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    const skizo = generiRokanSkizon();
    // ⟨ La eroj LEVIĜAS 📃 ⟩ — ĉi tie estis `0o100 + tono * 0o100`, t.e. 64–109
    // sur fonon de 128: ĉiu kristalo estis MALHELA, do la reliefo montris ilin
    // kiel TRUOJN kaj la ŝtonego aspektis kiel koto kun truetoj, ne kiel roko.
    // Nun la eroj sidas super la fono ( 138–206 ) kaj la fendoj inter ili restas
    // profundaj sulkoj — la surfaco legiĝas kiel rompita ŝtono.
    for ( const kris of skizo.kristaloj ) {
      const griz = Math.round(0o212 + kris.tono * 0o104);
      desegniWrapan(kunteksto, s, () => {
        kunteksto.save();
        kunteksto.translate(kris.x, kris.y);
        kunteksto.rotate(kris.angulo);
        kunteksto.beginPath();
        for ( let v = 0; v < kris.verticoj.length; v++ ) {
          const a = ( v / kris.verticoj.length ) * Math.PI * 2;
          const r = kris.verticoj[v];
          const px = Math.cos(a) * kris.rx * r, py = Math.sin(a) * kris.ry * r;
          if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
        }
        kunteksto.closePath();
        kunteksto.fillStyle = `rgb(${griz},${griz},${griz})`;
        kunteksto.fill();
        kunteksto.strokeStyle = "rgb(58,58,58)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
        kunteksto.restore();
      });
    }
    // La fendoj — profundaj sulkoj.
    for ( const fendo of skizo.fendoj ) {
      desegniWrapan(kunteksto, s, () => {
        kunteksto.lineCap = "round";
        kunteksto.strokeStyle = "rgb(40,40,40)";
        kunteksto.lineWidth = fendo.dikeco + 1;
        kunteksto.beginPath();
        kunteksto.moveTo(fendo.punktoj[0][0], fendo.punktoj[0][1]);
        for ( let i = 1; i < fendo.punktoj.length; i++ ) {
          kunteksto.lineTo(fendo.punktoj[i][0], fendo.punktoj[i][1]);
        }
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgb(148,148,148)";
        kunteksto.lineWidth = 1;
        kunteksto.stroke();
      });
    }
    // La grajno — mikro-reliefo.
    for ( let i = 0; i < 0o600; i++ ) {
      const x = hazard(0, s), y = hazard(0, s);
      const wd = 1 + Math.random() * 2, hd = 1 + Math.random() * 2;
      const koloro = Math.random() > 0o5/0o10 ? "rgba(170,170,170,0.5)" : "rgba(92,92,92,0.5)";
      desegniWrapan(kunteksto, s, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.fillRect(x, y, wd, hd);
      });
    }
  }, [ 0o3, 0o3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});

// kreiAndezitanTeksajxon — Kreu proceduralan andezitan teksajxon por
// vojrandoj. Andezito estas malhela fajngrajna vulkana ŝtono — densa
// egaleta miksaĵo kun tre malgrandaj helaj fenokristoj kaj subtilaj fluaj
// bendoj, ne la malnova malpura punktaro.
export const kreiAndezitanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    // Bazo — malhela verdgriza maso.
    kunteksto.fillStyle = "#686858"; kunteksto.fillRect(0, 0, s, s);
    // Fajna mottlado — egaletaj makuloj de hela al malhela, la densa afanita maso.
    const tonoj = [ "#787868", "#888878", "#585850", "#989888", "#484840" ];
    for ( let i = 0; i < 0o1170; i++ ) {
      kunteksto.fillStyle = tonoj[i % tonoj.length];
      kunteksto.fillRect(hazard(0, s), hazard(0, s), hazard(0o1, 0o4), hazard(0o1, 0o3));
    }
    // Subtilaj fluaj bendoj — horizontalaj strekoj de la vulkana fluo.
    kunteksto.strokeStyle = "rgba(120,120,112,0.28)";
    kunteksto.lineWidth = 3;
    for ( let i = 0; i < 0o40; i++ ) {
      const y = hazard(0, s);
      kunteksto.beginPath();
      kunteksto.moveTo(0, y);
      kunteksto.lineTo(s, y + hazard(-0o3, 0o3));
      kunteksto.stroke();
    }
    // Malgrandaj helaj fenokristoj — la palaj kristaletoj de andezito.
    for ( let i = 0; i < 0o60; i++ ) {
      kunteksto.fillStyle = "rgba(184,184,176,0.75)";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 3 + Math.random() * 3, 2 + Math.random() * 2);
    }
    // Malhelaj mineralaj pikloj.
    for ( let i = 0; i < 0o140; i++ ) {
      kunteksto.fillStyle = "rgba(32,32,32,0.6)";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  }, [ 3, 3 ], { volvado: THREE.RepeatWrapping, anisotropio: 4 });
});

// kreiAndezitanBumpanTeksajxon — Griznivela reliefa teksajxo por andezito.
// Fajna malebena surfaco kun maloftaj fenokristoj. Bump-teksajxoj restas en
// lineara koloro.
export const kreiAndezitanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#787878"; kunteksto.fillRect(0, 0, s, s);
    // Fajna malebena piklo.
    for ( let i = 0; i < 0o1170; i++ ) {
      kunteksto.fillStyle = Math.random() > 0o4/0o10 ? "#a8a8a8" : "#484848";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
    // Fenokristoj — malgrandaj helaj elstaraĵoj.
    for ( let i = 0; i < 0o60; i++ ) {
      kunteksto.fillStyle = "#d0d0d0";
      kunteksto.fillRect(hazard(0, s), hazard(0, s), 3 + Math.random() * 3, 2 + Math.random() * 2);
    }
  }, [ 3, 3 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});



// kreiNebulanTeksajxon — Kreu procedurale nebulozan radian gradienton.
export function kreiNebulanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, "rgba(240,244,238,0.6)");
    r.addColorStop(0o4/0o10, "rgba(240,244,238,0.22)");
    r.addColorStop(1, "rgba(240,244,238,0)");
    kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// kreiNebulTavolanTeksajxon — Kreu proceduralan teksturitan nebul-tavolon por
// la senfina nebul-ringo ( scena.ts ). Multaj molaj, interkovritaj nebulmakuloj
// — reala nebul-teksturo, ne plata blanko. La makuloj volvas trans la randoj,
// por ke la kahelado estu senkudra.
export function kreiNebulTavolanTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const makuloj = 0o40;
    for ( let i = 0; i < makuloj; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o1/0o4 + Math.random() * 0o1/0o2 );
      const denso = 0o7/0o40 + Math.random() * 0o13/0o40;
      const koloro = `rgba(204,220,220,${denso.toFixed(2)})`;
      // Ĉiuj naŭ ofsetoj — la makuloj volvas trans la kahelaj randoj.
      for ( const dx of [ -s, 0, s ] ) {
        for ( const dy of [ -s, 0, s ] ) {
          const g = kunteksto.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
          g.addColorStop(0, koloro);
          g.addColorStop(1, "rgba(204,220,220,0)");
          kunteksto.fillStyle = g;
          kunteksto.beginPath();
          kunteksto.arc(x + dx, y + dy, r, 0, Math.PI * 2);
          kunteksto.fill();
        }
      }
    }
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
}

// kreiBrilanTeksajxon — Kreu procedurale brilan gradienton por lampoj.
export function kreiBrilanTeksajxon(): THREE.CanvasTexture {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const r = kunteksto.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, "rgba(255,205,120,0.95)");
    r.addColorStop(0o13/0o40, "rgba(255,165,70,0.4)");
    r.addColorStop(1, "rgba(255,150,60,0)");
    kunteksto.fillStyle = r; kunteksto.fillRect(0, 0, s, s);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// kreiFilikanTeksajxon — Kreu proceduralan filikan teksajxon por subkreskajxo.
// Kaŝmemorita — la tri alvokoj ( urbo ×2, laga subkreskajxo ) konstruu ĝin nur unufoje.
//
// ⟨ UNU frondo 📃 ⟩ — la bildo estas unu filika frondo ( la raĥiso malsupre,
// la pinto supre ), ĉar la frondoj nun estas tri-dimensiaj rubandoj kaj ĉiu
// rubando ricevas ĝin per UV-oj ( u trans la frondo, v laŭ la longo ). La
// antaŭa versio desegnis la pinnojn per maldikaj STREKOJ — tri rastrumeroj sur
// 128 — do la frondo legiĝis kiel kombilo: paralelaj vergoj ambaŭflanke de la
// mezo. Nun ĉiu pinno estas PLENIGITA folieto ( lanceta, plej larĝa je ~35%
// de sia longo, kun la pinto kurba antaŭen al la frondopinto ), kaj la pinnoj
// mallongiĝas kaj densiĝas al la pinto, kiel ĉe vera filiko.
// ⟨ Komuna desegnilo 📃 ⟩ — la verdaj filikoj kaj la purpuraj uzas la SAMAN
// frondon ( unu pinata frondo, la raĥiso malsupre, la pinto supre ), nur kun
// malsamaj koloroj kaj pinnoj. Tial la desegnado estas unu funkcio kun paletro
// — antaŭe la purpuraj frondoj uzis la MALNOVAN kvadratan teksajxon ( la tuta
// planto pentrita centre ), kaj sur la nova rubanda geometrio la pinnoj
// premiĝis en la meza triono de la rubando kaj la frondoj aspektis kiel glataj
// klingoj. Nun ambaŭ filikoj havas pinnojn kiuj plenigas la rubandon.
type FrondaPaletro = {
  // ⟨ La kanvasa proporcio 📃 ⟩ — la frondaj rubandoj havas malsamajn
  // proporciojn ( la surteraj filikoj ~1:3, la kronoj de la arboformaj
  // purpuraj filikoj ~1:4.5 ), kaj la tuta kanvaso mapiĝas sur la rubandon.
  // Do la kanvaso devas havi la SAMAN proporcion kiel la rubando: sur kvadrata
  // kanvaso la pinnoj premiĝas laŭlarĝe ĝis maldikaj dratoj.
  kanvasaLargho: number;
  paroj: number;
  // Kiom de la duona kanvasa larĝo atingas la pinnoj ( 0…1 ).
  pinnaKovro: number;
  // ⟨ La pinna angulo 📃 ⟩ — kiom la pinnoj kliniĝas SUPren al la frondopinto.
  // 0 rad estas tute horizontale ( perpendikulara al la raĥiso, kiel ĉe vera
  // filiko: la pinnoj tuŝas unu la alian kaj la frondo legiĝas kiel PLUMO ),
  // kaj granda valoro igas la pinnojn longaj kaj oblikvaj, do ili kovras unu la
  // alian kaj la frondo legiĝas kiel unu solida klingo kun dentita rando.
  pinnaAngulo: number;
  // Kiom la pinno kurbiĝas antaŭen ( al la frondopinto ) laŭ sia longo.
  pinnaSvelto: number;
  pinnaLargho: number;
  lobaAmplitudo: number;
  lobaNombro: number;
  folio: ( t: number, flanko: number ) => string;
  rando: string;
  vejno: string;
  raĥiso: string;
  raĥisoLargho: number;
};
function kreiPinatanFrondon( p: FrondaPaletro ): THREE.CanvasTexture {
  const w = p.kanvasaLargho, h = 0o1000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const mezo = w / 2;
    const bazoY = h - 0o20/0o10;      // la malsupro de la frondo ( ĉe la grundo )
    const pintoY = 0o30/0o10;         // la pinto de la frondo
    // La raĥiso kurbiĝas iomete — frondo ne estas rekta vergo.
    const raĥiso = ( t: number ): number => mezo + 0.11 * w * t * t;
    // ⟨ Kiom da pinnoj 📃 ⟩ — la pinnoj devas resti APARTAJ. Ĉe 52 paroj la
    // interspaco laŭ la raĥiso estis 9 rastrumeroj, dum ĉiu pinno larĝis ~70 —
    // ili kunfandiĝis en unu solidan klingon kaj la frondo legiĝis kiel
    // agava folio. Nun estas 28 paroj ( interspaco ~17 ) kaj la pinnoj estas
    // pli mallarĝaj, do la malplenoj inter ili videblas.
    // La pinna longo estas derivita: ĝi devas atingi `pinnaKovro` de la duona
    // kanvasa larĝo post la klinado.
    const maksLongo = ( w / 2 - 2 ) * p.pinnaKovro / Math.cos(p.pinnaAngulo);
    const PAROJ = p.paroj;
    for ( let i = 0; i < PAROJ; i++ ) {
      const t = ( i + 0o5/0o10 ) / PAROJ;      // 0 = bazo, 1 = pinto
      const y = bazoY - t * ( bazoY - pintoY );
      const x = raĥiso(t);
      // La pinnoj: plej longaj ĉe ~35% de la frondo, mallongaj ĉe la bazo, kaj
      // finiĝantaj en pinto ĉe la frondopinto. Kun eta hazarda variado — sen
      // ĝi ĉiuj pintoj sekvas unu glatan elipson kaj la frondo aspektas
      // fabrikita.
      const vario = 0.86 + 0.28 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
      const longo = maksLongo
        * ( 0.70 + 0.30 * Math.sin(Math.PI * Math.min(1, t * 1.15)) )
        * Math.pow(1 - t, 0.55) * vario;
      for ( const s of [ -1, 1 ] ) {
        // La direkto: eksteren kaj ANTAŬEN ( al la frondopinto ).
        const ang = s > 0 ? -p.pinnaAngulo : Math.PI + p.pinnaAngulo;
        const cos = Math.cos(ang), sin = Math.sin(ang);
        // ⟨ La pinno 📃 ⟩ — pinno estas KUNMETITAĵO: ĝi mem havas ONDAN,
        // lobetan randon. Sen ĝi ĉiu pinno estas simpla triangulo, la frondo
        // legiĝas kiel unu plata klingo, kaj la tuta filiko aspektas kiel
        // agavo. La meza linio de la pinno kurbiĝas ankaŭ antaŭen ( falĉileca ).
        const pintoX = x + cos * longo;
        const pintoY = y + sin * longo - p.pinnaSvelto * longo;
        const ctrlX = x + cos * longo * 0o1/0o2;
        const ctrlY = y + sin * longo * 0o1/0o2 - 0o1/0o20 * longo;
        const flar = longo * p.pinnaLargho;
        const N = 0o10;
        const randoA: number[][] = [];
        const randoB: number[][] = [];
        for ( let k = 0; k <= N; k++ ) {
          const u = k / N;
          const m = 1 - u;
          const cx = m * m * x + 2 * m * u * ctrlX + u * u * pintoX;
          const cy = m * m * y + 2 * m * u * ctrlY + u * u * pintoY;
          // La duon-larĝo: pinta ĉe ambaŭ finoj, kun tri lobetoj sur la rando.
          const hw = flar * Math.sin(Math.PI * u)
            * ( 1 + p.lobaAmplitudo * Math.sin(Math.PI * u * p.lobaNombro) );
          randoA.push([ cx - sin * hw, cy + cos * hw ]);
          randoB.push([ cx + sin * hw, cy - cos * hw ]);
        }
        kunteksto.fillStyle = p.folio(t, s);
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        for ( const p of randoA ) kunteksto.lineTo(p[0], p[1]);
        for ( let k = randoB.length - 1; k >= 0; k-- ) kunteksto.lineTo(randoB[k][0], randoB[k][1]);
        kunteksto.closePath();
        kunteksto.fill();
        // Malhela rando — la pinnoj legiĝu unu super la alia kaj la randoj
        // de la lobetoj videblu, ne kiel unu pentrita folio.
        kunteksto.strokeStyle = p.rando;
        kunteksto.lineWidth = 1.3;
        kunteksto.stroke();
        // La mezvejneto de la pinno.
        kunteksto.strokeStyle = p.vejno;
        kunteksto.lineWidth = 1;
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        kunteksto.quadraticCurveTo(ctrlX, ctrlY, pintoX, pintoY);
        kunteksto.stroke();
      }
    }
    // La raĥiso — konuso de la bazo al la pinto, desegnita SUPRE la pinnoj.
    kunteksto.fillStyle = p.raĥiso;
    kunteksto.beginPath();
    kunteksto.moveTo(mezo - p.raĥisoLargho, bazoY + 0o20/0o10);
    kunteksto.lineTo(mezo + p.raĥisoLargho, bazoY + 0o20/0o10);
    kunteksto.lineTo(raĥiso(1) + 1.1, pintoY);
    kunteksto.lineTo(raĥiso(1) - 1.1, pintoY);
    kunteksto.closePath();
    kunteksto.fill();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// La VERDA filika frondo — la speco de la valaj kaj lagaj filikoj.
export const kreiFilikanTeksajxon = sxovu((): THREE.CanvasTexture => kreiPinatanFrondon({
  // ⟨ Pli filika, malpli agava 📃 ⟩ — la pinnoj antaŭe eliris 50° supren kaj
  // longaj ( 0.88 rad, 175 rastrumeroj ), do ili kovris unu la alian sepfoje
  // kaj la frondo legiĝis kiel unu larĝa klingo kun dentita rando — la filiko
  // de proksime aspektis kiel agavo. Nun ili staras preskaŭ perpendikulare al
  // la raĥiso kaj ili situas unu apud la alia, kiel ĉe vera filika frondo.
  kanvasaLargho: 0o400,
  paroj: 0o24,
  pinnaKovro: 0.88,
  pinnaAngulo: 0.50,
  pinnaSvelto: 0.12,
  pinnaLargho: 0.19,
  lobaAmplitudo: 0.26,
  lobaNombro: 2.6,
  folio: ( t, flanko ) =>
    `rgb(${Math.round(62 + t * 26)},${Math.round(108 + t * 46 + ( flanko > 0 ? 5 : 0 ))},${Math.round(50 + t * 20)})`,
  rando: ombro(0x386830, 0o2, 0.42),
  vejno: "rgba(150,180,110,0.30)",
  raĥiso: "#65854e",
  raĥisoLargho: 4,
}));

// kreiPurpuranFrondanTeksajxon — La PURPURA frondo por la tri-dimensiaj
// purpuraj filikoj: pli larĝaj, pli rondaj pinnoj ol la verdaj ( purpura filiko
// havas preskaŭ lobajn folietojn ), kun la sama rubanda aranĝo. La densa
// varianto ( la malaltaj plantoj ĉe la arbarrando ) portas pli da pli mallongaj
// pinnoj, do la frondo legiĝas pli solida.
const purpuraFrondaKaŝo = new Map<boolean, THREE.CanvasTexture>();
export function kreiPurpuranFrondanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraFrondaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const teksajxo = kreiPinatanFrondon({
    kanvasaLargho: 0o400,
    paroj: densa ? 0o26 : 0o22,
    pinnaKovro: densa ? 0.86 : 0.99,
    // ⟨ Preskaŭ perpendikulara 📃 ⟩ — la purpuraj pinnoj eliras preskaŭ
    // horizontale, do ili situas unu apud la alia ( plumo ) anstataŭ kovri unu
    // la alian en unu klingon, kiel ĉe vera filiko.
    pinnaAngulo: 0.42,
    pinnaSvelto: 0.10,
    pinnaLargho: densa ? 0.19 : 0.24,
    lobaAmplitudo: densa ? 0.20 : 0.26,
    lobaNombro: 2.4,
    // ⟨ Helo 📃 ⟩ — la bazo de la frondo estas malhela ( ombro inter la pinnoj ),
    // sed ne preskaŭ nigra: la antaŭa bazo ( 78,44,132 ) aspektis kiel nigra
    // klingo sub la vala lumo, do la koloroj leviĝis iomete.
    folio: ( t, flanko ) =>
      `rgb(${Math.round(96 + t * 88 + ( flanko > 0 ? 16 : 0 ))},${Math.round(56 + t * 62)},${Math.round(150 + t * 84)})`,
    rando: ombro(0x603890, 0o3, 0.45),
    vejno: "rgba(214,178,244,0.30)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 4,
  });
  purpuraFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}

// kreiPurpuranTronkofilikanTeksajxon — La PURPURA frondo de la ARBOFORMAJ
// purpuraj filikoj ( alta trunko + fronda krono ). Ilia frondo estas multe pli
// longa ol larĝa — la krono larĝas 0o16/0o10 kaj altas 0o73/0o10, do la
// rubando estas ~1:4.5 — kaj tial la kanvaso estas PLI MALVARĜA ol la
// surteraj ( 0o340 anstataŭ 0o400 ): la pinnoj estas desegnitaj en kanvaso de
// la sama proporcio kiel la rubando, do ili ne premiĝas. Antaŭe ĉi tiuj kronoj
// uzis la malnovan kvadratan teksajxon kaj la frondoj aspektis kiel dratoj kun
// apenaŭ videblaj pinnoj.
const purpuraTronkaFrondaKaŝo = new Map<boolean, THREE.CanvasTexture>();
export function kreiPurpuranTronkofilikanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraTronkaFrondaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const teksajxo = kreiPinatanFrondon({
    kanvasaLargho: 0o340,
    paroj: densa ? 0o36 : 0o42,
    pinnaKovro: 0.95,
    pinnaAngulo: 0.45,
    pinnaSvelto: 0.12,
    pinnaLargho: densa ? 0.19 : 0.22,
    lobaAmplitudo: densa ? 0.20 : 0.24,
    lobaNombro: 2.6,
    // La krono estas alta super la grundo kaj kaptas pli da lumo — la koloroj
    // estas iomete pli helaj ol tiuj de la surteraj purpuraj filikoj.
    folio: ( t, flanko ) =>
      `rgb(${Math.round(104 + t * 86 + ( flanko > 0 ? 16 : 0 ))},${Math.round(60 + t * 62)},${Math.round(158 + t * 82)})`,
    rando: ombro(0x683898, 0o3, 0.45),
    vejno: "rgba(214,178,244,0.28)",
    raĥiso: "#4a2a68",
    raĥisoLargho: 3,
  });
  purpuraTronkaFrondaKaŝo.set(densa, teksajxo);
  return teksajxo;
}



// kreiPurpuranFilikanTeksajxon — Kreu purpurajn pinajn filikojn kiel en Four Groves.
const purpuraFilikaKaŝo = new Map<boolean, THREE.CanvasTexture>();
export function kreiPurpuranFilikanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraFilikaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const s = 0o400;
  // ⟨ La tigo 📃 ⟩ — la malhela ŝela strio deriviĝas el la folia koloro `a`
  // laŭ la stila regulo ( MainColor − n · 0x101010 ).
  const paletro = densa
    ? { tigo: ombro(0xa058c0, 0o6), a: "#a058c0", b: "#c078e0" }
    : { tigo: ombro(0x7848b0, 0o3), a: "#7848b0", b: "#9868d0" };
  const teksajxo = kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.strokeStyle = paletro.tigo;
    kunteksto.lineWidth = densa ? 0o4 : 0o4;
    kunteksto.lineCap = "round";
    kunteksto.beginPath();
    kunteksto.moveTo(s / 2, s - 0o4/0o10);
    kunteksto.quadraticCurveTo(s / 2 + ( densa ? 0o14 : 0 ), s * 0o4/0o10, s / 2 + ( densa ? 0o20 : 0 ), 0o4/0o10);
    kunteksto.stroke();

    const nombro = densa ? 0o42 : 0o32;
    const maksimumaLongo = densa ? 0o112 : 0o130;
    for ( let i = 0; i < nombro; i++ ) {
      const t = i / ( nombro - 1 );
      const y = s - 0o10/0o10 - t * 0o340;
      const x = s / 2 + ( densa ? 0o20 : 0 ) * t * t;
      const envolva = ( 0o26/0o100 + 0o52/0o100 * Math.min(0o1, t * 0o4/0o10) ) * Math.pow(1 - t, 0o66/0o100);
      const longo = maksimumaLongo * envolva + 0o6;
      const largho = longo * 0o12/0o100 + 0o2;
      const kurbo = 0o33/0o100 + t * 0o6/0o10;
      const koloro = i % 2 ? paletro.a : paletro.b;

      for ( const flanko of [ -1, 1 ] ) {
        const angulo = flanko > 0 ? -kurbo : Math.PI + kurbo;
        const finoX = x + Math.cos(angulo) * longo;
        const finoY = y + Math.sin(angulo) * longo;
        const cos = Math.cos(angulo), sin = Math.sin(angulo);
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath();
        kunteksto.moveTo(x, y);
        kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 - sin * largho, y + sin * longo * 0o4/0o10 + cos * largho, finoX, finoY);
        kunteksto.quadraticCurveTo(x + cos * longo * 0o4/0o10 + sin * largho, y + sin * longo * 0o4/0o10 - cos * largho, x, y);
        kunteksto.fill();
      }
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
  purpuraFilikaKaŝo.set(densa, teksajxo);
  return teksajxo;
}

// kreiHerbErinanTeksajxon — La MALNOVA teksajxo de herbotufo ( la tuta tufo
// desegnita sur unu kanvaso, por krucitaj kartoj ). La herbo nun estas
// konstruata el veraj tri-dimensiaj klingoj kaj uzas kreiHerbanKlinganTeksajxon
// ( unu klingo ); ĉi tiu funkcio restas por la historiaj kartoj kaj por
// komparo en la iloj.
//
// ⟨ Kial la herbo aspektis kiel verda makulo 📃 ⟩ — la malnova teksaĵo estis
// UNU mola radiala verdo kun unu vertikala vejno, do ĉiu herbotufo ( du
// krucitaj kartoj 0.5 × 1.0, tede ripetitaj milojn da fojoj tra la mapo )
// montriĝis kiel verda ŝmiraĵo kun streko meze. Nun la kanvaso portas veran
// tufon: kvardek klingoj kun malsamaj altoj, klinoj, larĝoj kaj koloroj —
// malhela bazo, helverda pinto, kaj kelkaj sekaj flavaj klingoj inter ili.
// La klingoj estas desegnitaj kiel FERMITAJ taperaj formoj ( ne strekoj ),
// do ili havas veran larĝon ĉe la bazo kaj pintan finon.
export const kreiHerbErinanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const hazardo = kreiHazardanGenerilon(0o2715);
    // Unu klingo — de la radikoj supren, iomete klinita, maldikiĝanta al pinto.
    const desegniKlingon = ( x0: number, y0: number, alto: number, klino: number,
      largho: number, koloroj: [ string, string ] ): void => {
      const paŝoj = 0o10;
      const maldekstra: [ number, number ][] = [];
      const dekstra: [ number, number ][] = [];
      for ( let i = 0; i <= paŝoj; i++ ) {
        const t = i / paŝoj;
        // La klingo kurbiĝas — la pinto kliniĝas foren kaj la bazo restas
        // vertikala, kiel vera herba folio sub sia propra pezo.
        const x = x0 + klino * t * t;
        const y = y0 - alto * t;
        const duonLarĝo = largho * 0o5/0o10 * Math.pow(1 - t, 0o7/0o10);
        maldekstra.push([ x - duonLarĝo, y ]);
        dekstra.push([ x + duonLarĝo, y ]);
      }
      const gradiento = kunteksto.createLinearGradient(x0, y0, x0 + klino, y0 - alto);
      gradiento.addColorStop(0, koloroj[0]);
      gradiento.addColorStop(0o6/0o10, koloroj[0]);
      gradiento.addColorStop(1, koloroj[1]);
      kunteksto.fillStyle = gradiento;
      kunteksto.beginPath();
      kunteksto.moveTo(maldekstra[0][0], maldekstra[0][1]);
      for ( let i = 1; i < maldekstra.length; i++ ) {
        kunteksto.lineTo(maldekstra[i][0], maldekstra[i][1]);
      }
      for ( let i = dekstra.length - 1; i >= 0; i-- ) {
        kunteksto.lineTo(dekstra[i][0], dekstra[i][1]);
      }
      kunteksto.closePath();
      kunteksto.fill();
    };
    // La paletro — de malhela freŝa verdo ĝis hela pinto, kun kvar flavaj
    // ( pli sekaj ) tonoj por la malplimulto.
    const paletro: [ string, string ][] = [
      [ "#2e5622", "#7cb648" ],
      [ "#336026", "#8cc451" ],
      [ "#29501e", "#6fae42" ],
      [ "#3a6a2b", "#9ad05c" ],
      [ "#436428", "#bcc24a" ],
      [ "#4e5f2a", "#d2c052" ],
    ];
    const bazoY = s * 0.97;
    // ⟨ Klingoj malantaŭe 📃 ⟩ — la plej longaj kaj plej malhelaj; ili donas la
    // profundon de la tufo. Ili ankaŭ kovras la TUTAN larĝon de la kartono:
    // antaŭe la klingoj okupis nur la mezan 44% ( x 0.28–0.72 ), do la tufo en
    // la mondo estis duone pli mallarĝa ol la kartono kaj la randoj de la
    // kartono restis malplenaj.
    for ( let i = 0; i < 0o34; i++ ) {
      desegniKlingon(s * ( 0.06 + hazardo() * 0.88 ), bazoY,
        s * ( 0.44 + hazardo() * 0.40 ),
        s * ( hazardo() - 0o1/0o2 ) * 0.62,
        s * ( 0.013 + hazardo() * 0.013 ),
        paletro[( hazardo() * 0o4 ) | 0]);
    }
    // ⟨ Sekaj flavaj klingoj 📃 ⟩ — malmultaj, maldikaj kaj altaj; ili staras
    // inter la verdaj, kiel la velkintaj folioj de vera tufo.
    for ( let i = 0; i < 0o10; i++ ) {
      desegniKlingon(s * ( 0.10 + hazardo() * 0.80 ), bazoY,
        s * ( 0.30 + hazardo() * 0.38 ),
        s * ( hazardo() - 0o1/0o2 ) * 0o1/0o2,
        s * ( 0.010 + hazardo() * 0.010 ),
        paletro[0o4 + ( ( hazardo() * 0o2 ) | 0)]);
    }
    // ⟨ Klingoj antaŭe 📃 ⟩ — pli mallongaj, pli helaj kaj iomete pli dikaj;
    // ilin la okulo vidas unue, do ili portas la silueton de la tufo.
    for ( let i = 0; i < 0o26; i++ ) {
      const koloro = paletro[0o3 + ( ( hazardo() * 0o3 ) | 0 )];
      desegniKlingon(s * ( 0.08 + hazardo() * 0.84 ), bazoY,
        s * ( 0.20 + hazardo() * 0.30 ),
        s * ( hazardo() - 0o1/0o2 ) * 0.36,
        s * ( 0.017 + hazardo() * 0.016 ), koloro);
    }
    // ⟨ La radika ombro 📃 ⟩ — mola ovala makulo ĉe la radikoj, por ke la tufo
    // staru sur la grundo anstataŭ ŝvebi super ĝi. Anstataŭ `fillRect` ( kiu
    // lasis videblan malhelan BENDON kun rektaj flankoj sub la tufo ) la ombro
    // estas elipso, kies gradiento plene droniĝas antaŭ la rando de la kanvaso.
    const ombroR = s * 0.30;
    const ombroY = bazoY - s * 0.03;
    const ombro = kunteksto.createRadialGradient(s / 2, ombroY, 0, s / 2, ombroY, ombroR);
    ombro.addColorStop(0, "rgba(30,44,22,0.62)");
    ombro.addColorStop(0.55, "rgba(34,50,26,0.28)");
    ombro.addColorStop(1, "rgba(34,50,26,0)");
    kunteksto.fillStyle = ombro;
    kunteksto.beginPath();
    kunteksto.ellipse(s / 2, ombroY, ombroR, ombroR * 0.62, 0, 0, Math.PI * 2);
    kunteksto.fill();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// kreiHerbanKlinganTeksajxon — La teksajxo de UNU herba klingo, por la
// TRI-DIMENSIAJ klingoj de la herbo ( vidu kreiHerbanKlingon ).
//
// ⟨ Kial aparta teksajxo 📃 ⟩ — la malnova herbo estis krucitaj kartoj kun la
// teksajxo de TUTA tufo, do la tufo estis plata kaj la kartoj vidigis siajn
// rektaĵojn. La novaj klingoj estas veraj rubandoj ( tri kolonoj kaj kvin
// segmentoj ), kaj rubando bezonas alian teksajxon: la U-akso trapasas la
// LARĜON de unu klingo ( 0 = maldekstra rando, 0.5 = la mezvejno, 1 = dekstra
// rando ) kaj la V-akso iras de la bazo ( 0 ) al la pinto ( 1 ). Ĝi do portas
// la koloron kaj la vejnetaron de unu klingo — kaj neniu alfa-kanalo, ĉar la
// formon portas la geometrio mem.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiHerbanKlinganTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = 0o100, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // La koloro laŭ la longo — malhela freŝa bazo, meza verdo, hela pinto kun
    // varma nuanco ( la pinto de herba folio ofte flaviĝas ).
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    gradiento.addColorStop(0, "#23481a");
    gradiento.addColorStop(0o1/0o4, "#3d7529");
    gradiento.addColorStop(0.55, "#5d9c37");
    gradiento.addColorStop(0.82, "#8cbb4d");
    gradiento.addColorStop(1, "#c0c25e");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    // La mezvejno — la meza kolono de la rubando estas levita, do laŭ ĝi iras
    // hela kresto kun malhela sulko ambaŭflanke. La randoj malheliĝas iomete,
    // kiel ĉe klingo, kiu kurbiĝas for de la lumo.
    const meza = w / 2;
    const kresto = kunteksto.createLinearGradient(meza - 6, 0, meza + 6, 0);
    kresto.addColorStop(0, "rgba(18,44,12,0.30)");
    kresto.addColorStop(0.35, "rgba(216,240,170,0.28)");
    kresto.addColorStop(0o1/0o2, "rgba(228,248,186,0.34)");
    kresto.addColorStop(0.65, "rgba(216,240,170,0.28)");
    kresto.addColorStop(1, "rgba(18,44,12,0.30)");
    kunteksto.fillStyle = kresto;
    kunteksto.fillRect(meza - 6, 0, 12, h);
    // La vejnetoj — fajnaj laŭlongaj linioj, pli densaj ĉe la mezo.
    const hazardo = kreiHazardanGenerilon(0o2717);
    for ( let i = 0; i < 0o22; i++ ) {
      const x = hazardo() * w;
      const disto = Math.abs(x - meza) / meza;
      kunteksto.fillStyle = hazardo() < 0o1/0o2
        ? `rgba(28,58,18,${0.10 + disto * 0.12})`
        : `rgba(190,224,140,${0.07 + ( 1 - disto ) * 0.10})`;
      kunteksto.fillRect(x, 0, 1, h);
    }
    // La randoj — mallarĝa malhela linio, do la klingo havas silueton ankaŭ
    // kontraŭ hela ĉielo.
    kunteksto.fillStyle = "rgba(20,44,14,0.34)";
    kunteksto.fillRect(0, 0, 0o3/0o2, h);
    kunteksto.fillRect(w - 0o3/0o2, 0, 0o3/0o2, h);
    // La baza ombro — la malsupro de la tufo estas malhela kaj humida.
    const baza = kunteksto.createLinearGradient(0, h, 0, h * 0o3/0o4);
    baza.addColorStop(0, "rgba(14,30,10,0.55)");
    baza.addColorStop(1, "rgba(14,30,10,0)");
    kunteksto.fillStyle = baza;
    kunteksto.fillRect(0, h * 0o3/0o4, w, h * 0o1/0o4);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});

// neregulaFormo — Fermita vojo kun ondigita radiuso. la distanco de la
// centro varias laŭ la angulo per du sinusaj ondoj — la formo estas kava,
// longigita kaj neniam vere cirkla. La sama vojo donas kaj la formon kaj la
// molan randon ( la radiala gradiento finiĝas apud la vojo ).
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param fx, fy ( number ) - La centro de la formo.
//     @param r0 ( number ) - La baza radiuso.
//     @param ondoj ( number ) - La nombro da lobaj ondoj ĉirkaŭ la formo.
//     @param sago ( number ) - La onda forto ( 0 = cirklo ).
//     @param fazo ( number ) - La onda fazo.
function neregulaFormo(k: CanvasRenderingContext2D, fx: number, fy: number, r0: number, ondoj: number, sago: number, fazo: number): void {
  k.beginPath();
  for ( let i = 0; i <= 0o40; i++ ) {
    const a = i / 0o40 * Math.PI * 2;
    const r = r0 * ( 1 + sago * Math.sin(a * ondoj + fazo) + sago * 0o5/0o10 * Math.sin(a * ondoj * 2 + fazo * 3 + 1) );
    const x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
    if ( i === 0 ) k.moveTo(x, y); else k.lineTo(x, y);
  }
  k.closePath();
}

// pentriLikenanMakulon — Desegnu la krustan likenan makulon sur la kanvason.
// Loba krusto kun neregula ( amoeboida ) korpo, hela marĝena bendo kaj
// malhela randa linio, neregulaj kolor-zonoj, areola fendetado, soradiaj
// pulvoroj kaj apotecioj — tasoj kun levita malhela rando kaj hela spora
// disko. La tono ne estas plata, sed zonita per multaj nuboj. La sama
// desegno nutras kaj la kolor-teksajxon kaj la bump-teksajxon ( kiu konvertas
// la lumecon al reliefo ), do la malhelaj fendetoj ĉiam sinkas kaj la helaj
// loboj ĉiam leviĝas.
//     @param kunteksto ( CanvasRenderingContext2D ) - La kunteksto.
//     @param s ( number ) - La kanvasa dimensio ( kvadrata ).
function pentriLikenanMakulon(kunteksto: CanvasRenderingContext2D, s: number): void {
  kunteksto.clearRect(0, 0, s, s);

  const cx = s / 2, cy = s / 2;

  // Ton-makuloj — flavecverdaj, grizverdaj kaj malhelverdaj nuboj sub la
  // korpo donas al la krusto neplatan, zonitan koloron. La nuboj estas
  // neregulaj formoj, neniam cirkloj.
  const nuboj = [ "rgba(224,232,200,0.4)", "rgba(136,152,120,0.35)", "rgba(88,104,72,0.3)", "rgba(196,208,150,0.4)", "rgba(152,164,140,0.35)" ];
  for ( let i = 0; i < 0o20; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const d = s * ( Math.random() * 0o1/0o10 );
    const r = s * ( 0o1/0o10 + Math.random() * 0o1/0o10 );
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    neregulaFormo(kunteksto, x, y, r, 0o3 + ( ( Math.random() * 0o3 ) | 0 ), 0o3/0o10, Math.random() * Math.PI * 2);
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, r * 0o15/0o10);
    g.addColorStop(0, nuboj[i % nuboj.length]);
    g.addColorStop(1, senAlfa(nuboj[i % nuboj.length]));
    kunteksto.fillStyle = g;
    kunteksto.fill();
  }

  // Krusta korpo — interkovrantaj neregulaj paleverdaj makuloj kun molaj
  // gradienaj randoj. La makuloj klasteriĝas en longigita, ameboida formo
  // ( neniam cirkla ) kaj ne atingas la randon de la teksajxo — la loboj kaj
  // la malantaŭa krusto donas la neregulan silueton.
  const koloroj = [ "#c8d8c0", "#b8c8a8", "#d8e8c8", "#a8c8a0" ];
  const elong = 0o11/0o10 + Math.random() * 0o4/0o10;
  const nombro = 0o16 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < nombro; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o1/0o40 + Math.random() * 0o3/0o100 );
    const d = s * ( 0o1/0o40 + Math.random() * 0o1/0o20 );
    const x = cx + Math.cos(a) * d * elong;
    const y = cy + Math.sin(a) * d;
    neregulaFormo(kunteksto, x, y, r, 0o4 + ( ( Math.random() * 0o4 ) | 0 ), 0o3/0o10 + Math.random() * 0o25/0o100, Math.random() * Math.PI * 2);
    const gradiento = kunteksto.createRadialGradient(x, y, 0, x, y, r * 0o17/0o10);
    gradiento.addColorStop(0, koloroj[i % koloroj.length]);
    gradiento.addColorStop(0o6/0o10, koloroj[i % koloroj.length]);
    gradiento.addColorStop(1, "rgba(160,176,144,0)");
    kunteksto.fillStyle = gradiento;
    kunteksto.fill();
  }

  // Centra oliv-nuanco — la malnova centro de la krusto malheliĝas, kiel ĉe
  // multaj areolaj krustoj. La nuanco estas neregula kaj forigita de la
  // centro, ne koncentra.
  const ox = cx + s * ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
  const oy = cy + s * ( Math.random() - 0o5/0o10 ) * 0o1/0o10;
  const or = s * 0o22/0o100;
  neregulaFormo(kunteksto, ox, oy, or, 0o4, 0o3/0o10, Math.random() * Math.PI * 2);
  const centro = kunteksto.createRadialGradient(ox, oy, 0, ox, oy, or * 0o15/0o10);
  centro.addColorStop(0, "rgba(96,112,80,0.40)");
  centro.addColorStop(1, "rgba(96,112,80,0)");
  kunteksto.fillStyle = centro;
  kunteksto.fill();

  // Kolor-zonoj — la krusto kreskas en neregulaj ondoj, ne en koncentraj
  // ringoj. Ĉiu zono havas sian propran forigitan centron kaj ondigitan
  // radiuson, do la krusto ne aspektas kiel celo.
  const zono = ( zx: number, zy: number, r0: number, koloro: string, lineWidth: number, sago: number ): void => {
    kunteksto.strokeStyle = koloro;
    kunteksto.lineWidth = lineWidth;
    neregulaFormo(kunteksto, zx, zy, r0, 0o4, sago, Math.random() * Math.PI * 2);
    kunteksto.stroke();
  };
  const f1 = Math.random() * Math.PI * 2, f2 = Math.random() * Math.PI * 2;
  zono(cx + Math.cos(f1) * s * 0o6/0o100, cy + Math.sin(f1) * s * 0o6/0o100, s * 0o15/0o100, "rgba(88,104,72,0.14)", 1, 0o3/0o10);
  zono(cx + Math.cos(f2) * s * 0o4/0o100, cy + Math.sin(f2) * s * 0o4/0o100, s * 0o17/0o100, "rgba(88,104,72,0.18)", 2, 0o3/0o10);
  // Hela marĝena bendo — la pala kreskanta rando de la krusto.
  zono(cx, cy, s * 0o17/0o100, "rgba(232,240,216,0.50)", 3, 0o25/0o10);
  // Malhela randa linio — la hipotalo. La mallarĝa malhela rando kie la
  // krusto renkontas la substraton.
  zono(cx, cy, s * 0o2/0o10, "rgba(88,104,72,0.55)", 1, 0o22/0o100);

  // Loba periferio — fingroformaj loboj ĉirkaŭ la rando, neregule spacigitaj.
  // Ĉiu leviĝas de la substrato, kun hela supra rando kaj malhela ombro malsupre.
  const loboj = 0o13 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < loboj; i++ ) {
    const a = ( i / loboj + Math.random() * 0o3/0o10 ) * Math.PI * 2;
    const bazo = s * ( 0o11/0o100 + Math.random() * 0o3/0o100 );
    const longo = s * ( 0o3/0o100 + Math.random() * 0o2/0o100 );
    const largho = s * ( 0o2/0o100 + Math.random() * 0o2/0o100 );
    const lx = cx + Math.cos(a) * bazo;
    const ly = cy + Math.sin(a) * bazo;
    kunteksto.save();
    kunteksto.translate(lx + Math.cos(a) * longo / 2, ly + Math.sin(a) * longo / 2);
    kunteksto.rotate(a);
    const g = kunteksto.createRadialGradient(0, 0, 0, 0, 0, longo / 2 + largho);
    g.addColorStop(0, "#b8d0a8");
    g.addColorStop(1, "rgba(160,176,144,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath();
    kunteksto.ellipse(0, 0, longo / 2 + largho, largho, 0, 0, Math.PI * 2);
    kunteksto.fill();
    // Hela supra rando — la loba rando kaptas la lumon.
    kunteksto.strokeStyle = "rgba(232,242,216,0.5)";
    kunteksto.lineWidth = 2;
    kunteksto.beginPath();
    kunteksto.ellipse(0, -1, longo / 2 + largho, largho, 0, Math.PI, Math.PI * 2);
    kunteksto.stroke();
    // Malhela ombro sub la lobo.
    kunteksto.strokeStyle = "rgba(88,104,72,0.35)";
    kunteksto.lineWidth = 3;
    kunteksto.beginPath();
    kunteksto.ellipse(0, 2, longo / 2 + largho, largho, 0, 0, Math.PI);
    kunteksto.stroke();
    kunteksto.restore();
  }

  // Areola ĉelreto — la krusta centro rompiĝas en pluredraj ĉeloj, la plej
  // realisma marko de la areola krusta likeno. Ringoj da neregulaj ĉeloj
  // ĉirkaŭ la centro, ĉiu kun malhela fendo ĉirkaŭ si. La ĉeloj restas ene
  // de la teksajxo — neniu tranĉo ĉe la rando.
  const areola = ( ax: number, ay: number, ar: number, aKvanto: number, aKoloro: string ): void => {
    kunteksto.beginPath();
    for ( let v = 0; v < aKvanto; v++ ) {
      const aa = v / aKvanto * Math.PI * 2 + Math.random() * 0o1/0o10;
      const rv = ar * ( 0o7/0o10 + Math.random() * 0o6/0o10 );
      const px = ax + Math.cos(aa) * rv, py = ay + Math.sin(aa) * rv;
      if ( v === 0 ) kunteksto.moveTo(px, py); else kunteksto.lineTo(px, py);
    }
    kunteksto.closePath();
    // La areolo estas iomete pli hela ol la fendo ĉirkaŭ ĝi — apartaj plataj
    // ĉeloj de krusta likeno, ne nur desegnitaj konturoj.
    kunteksto.fillStyle = "rgba(210,220,190,0.46)";
    kunteksto.fill();
    kunteksto.strokeStyle = aKoloro;
    kunteksto.lineWidth = 1;
    kunteksto.stroke();
  };
  for ( let ringoI = 0; ringoI < 0o3; ringoI++ ) {
    const ĉeloj = ringoI === 0 ? 1 : 0o10;
    const r0 = ringoI === 0 ? 0 : s * ( 0o5/0o100 + ringoI * 0o5/0o100 );
    for ( let ĉ = 0; ĉ < ĉeloj; ĉ++ ) {
      const aa = ( ĉ / ĉeloj + ( Math.random() - 0o5/0o10 ) * 0o15/0o100 ) * Math.PI * 2;
      const rr = r0 + ( Math.random() - 0o5/0o10 ) * s * 0o2/0o100;
      const x = cx + Math.cos(aa) * rr, y = cy + Math.sin(aa) * rr;
      areola(x, y, s * ( 0o3/0o100 + Math.random() * 0o2/0o100 ), 0o6 + ( ( Math.random() * 0o3 ) | 0 ), `rgba(72,88,56,${0o5/0o10 + Math.random() * 0o2/0o10})`);
    }
  }

  // Plia fendetado — mallongaj, pli malhelaj fendetoj formas la areolan
  // ĉelreton ĉe la centro ( la krusto rompiĝas en pluredraj ĉeloj ).
  for ( let i = 0; i < 0o54; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o15/0o100 * Math.sqrt(Math.random());
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const ang = Math.random() * Math.PI;
    const long = s * ( 0o1/0o100 + Math.random() * 0o2/0o100 );
    kunteksto.strokeStyle = `rgba(72,88,56,${0o5/0o10 + Math.random() * 0o2/0o10})`;
    kunteksto.lineWidth = 1;
    kunteksto.beginPath();
    kunteksto.moveTo(x - Math.cos(ang) * long, y - Math.sin(ang) * long);
    kunteksto.lineTo(x + Math.cos(ang) * long, y + Math.sin(ang) * long);
    kunteksto.stroke();
  }

  // Krusta punktado — malhelverdaj flokoj tra la tuta makulo.
  for ( let i = 0; i < 0o160; i++ ) {
    const t = Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o5/0o20 * t;
    kunteksto.fillStyle = `rgba(88,104,72,${0o4/0o10 + Math.random() * 0o26/0o100})`;
    kunteksto.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  // Helaj granuletoj — la soradia pulvoro kaj la helaj areoloj.
  for ( let i = 0; i < 0o100; i++ ) {
    const t = Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    const r = s * 0o5/0o20 * t;
    kunteksto.fillStyle = `rgba(232,240,216,${0o4/0o10 + Math.random() * 0o2/0o10})`;
    kunteksto.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  // Soradiaj pulvoroj — malklaraj palaj makuloj de la polva reprodukta
  // tavolo, ofte ĉe la marĝeno kaj en la centro.
  const soradioj = 0o10 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < soradioj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o4/0o100 + Math.random() * 0o1/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o3/0o100 + Math.random() * 0o1/0o100 );
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(240,246,228,0.5)");
    g.addColorStop(1, "rgba(240,246,228,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath(); kunteksto.arc(x, y, rad, 0, Math.PI * 2); kunteksto.fill();
  }

  // Soradiaj amasoj — polvaj, diserigitaj makuloj kie la krusto eksfoliiĝas.
  // Palverdaj nuboj kun malhelaj granuletoj, pli oftaj ĉe la centro.
  const amasoj = 0o2 + ( ( Math.random() * 0o2 ) | 0 );
  for ( let i = 0; i < amasoj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( Math.random() * 0o2/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o4/0o100 + Math.random() * 0o1/0o100 );
    const g = kunteksto.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(216,228,200,0.5)");
    g.addColorStop(1, "rgba(216,228,200,0)");
    kunteksto.fillStyle = g;
    kunteksto.beginPath(); kunteksto.arc(x, y, rad, 0, Math.PI * 2); kunteksto.fill();
    for ( let p = 0; p < 0o6; p++ ) {
      const pa = Math.random() * Math.PI * 2;
      const pr = Math.random() * rad;
      kunteksto.fillStyle = "rgba(88,104,72,0.5)";
      kunteksto.fillRect(x + Math.cos(pa) * pr, y + Math.sin(pa) * pr, 1 + Math.random() * 1, 1 + Math.random() * 1);
    }
  }

  // Apotecioj — fruktkorpoj. Tasoj kun levita malhela rando, hela spora
  // disko kaj malhela centro, kun hela lum-arko sur la rando. La grandoj
  // varias de grandaj tasoj ĝis malgrandaj punktoj.
  const apotecioj = 0o10 + ( ( Math.random() * 0o4 ) | 0 );
  for ( let i = 0; i < apotecioj; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( 0o4/0o100 + Math.random() * 0o11/0o100 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    const rad = s * ( 0o10/0o1000 + Math.random() * 0o14/0o1000 );
    // Levita malhela rando.
    kunteksto.fillStyle = "rgba(64,72,48,0.9)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad, 0, Math.PI * 2);
    kunteksto.fill();
    // Hela spora disko.
    kunteksto.fillStyle = "rgba(224,232,208,0.95)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o7/0o10, 0, Math.PI * 2);
    kunteksto.fill();
    // Malhela centro — la spor-truo.
    kunteksto.fillStyle = "rgba(56,64,48,0.95)";
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o3/0o10, 0, Math.PI * 2);
    kunteksto.fill();
    // Hela lum-arko — la rando de la taso kaptas lumon.
    kunteksto.strokeStyle = "rgba(255,255,250,0.55)";
    kunteksto.lineWidth = 1;
    kunteksto.beginPath();
    kunteksto.arc(x, y, rad * 0o66/0o100, -Math.PI * 0o3/0o4, -Math.PI * 0o1/0o4);
    kunteksto.stroke();
  }
  // Piknidioj — multaj malgrandaj malhelaj punktetoj, pli densaj centre.
  for ( let i = 0; i < 0o30; i++ ) {
    const a = Math.random() * Math.PI * 2;
    const r = s * ( Math.random() * 0o2/0o10 );
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    kunteksto.fillStyle = "rgba(64,72,48,0.7)";
    kunteksto.fillRect(x, y, 1 + Math.random() * 1, 1 + Math.random() * 1);
  }

  // Pruino — tre mola pala brilo super la tuta krusto. la polva blankeca
  // surfaco de multaj krustaj likenoj.
  const pruino = kunteksto.createRadialGradient(cx, cy, 0, cx, cy, s * 0o22/0o100);
  pruino.addColorStop(0, "rgba(240,246,228,0.45)");
  pruino.addColorStop(1, "rgba(240,246,228,0.12)");
  kunteksto.fillStyle = pruino;
  kunteksto.fillRect(0, 0, s, s);
}

// kreiLikenanKanvason — Kreu unufoje la komunan likenan kanvason, dividitan
// de la kolor- kaj bump-teksajxoj, por ke la reliefo akurate sekvu la koloron
// ( la SAMA hazardo kaj la SAMAJ makuloj ).
//     @returns kanvasa ( HTMLCanvasElement ) - La pentrita kanvaso.
let likenaKanvaso: HTMLCanvasElement | null = null;
function kreiLikenanKanvason(): HTMLCanvasElement {
  if ( likenaKanvaso ) return likenaKanvaso;
  const s = 0o200;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  pentriLikenanMakulon(kanvasa.getContext("2d")!, s);
  likenaKanvaso = kanvasa;
  return kanvasa;
}

// kreiLikenanTeksajxon — Kreu proceduralan krustan likenan teksajxon por la
// trunkaj likenoj. Loba krusto kun neregula ( amoeboida ) korpo, hela
// marĝena bendo kaj malhela randa linio, koncentraj kolor-zonoj, areola
// fendetado, soradiaj pulvoroj kaj apotecioj — tasoj kun levita malhela
// rando kaj hela spora disko. La tono ne estas plata, sed zonita per multaj
// nuboj.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const teksajxo = new THREE.CanvasTexture(kreiLikenanKanvason());
  teksajxo.colorSpace = THREE.SRGBColorSpace;
  return teksajxo;
});

// kreiLikenanBumpanTeksajxon — Griznivela reliefa teksajxo por la krustaj
// likenoj. La SAMA kanvaso kiel la kolor-teksajxo, konvertita al luma
// griznivelo — la malhelaj fendetoj sinkas, la helaj loboj kaj apotecioj
// leviĝas. La travideblaj randoj restas plataj ( meza grizeco ). Bump-
// teksajxoj restas en lineara koloro.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiLikenanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiLikenanKanvason(), 0, 0);
    const bildo = k.getImageData(0, 0, s, s);
    const d = bildo.data;
    // Luma griznivelo — pezitaj kanaloj ( 0o115, 0o226 kaj 0o35 sumas 0o400 ).
    for ( let i = 0; i < d.length; i += 4 ) {
      const griz = d[i + 3] < 0o200
        ? 0o200
        : ( 0o115 * d[i] + 0o230 * d[i + 1] + 0o35 * d[i + 2] ) >> 8;
      d[i] = d[i + 1] = d[i + 2] = griz;
      d[i + 3] = 0o377;
    }
    k.putImageData(bildo, 0, 0);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false });
});

// kreiTerenanTeksajxon — Kreu malgrandan, travideblan grundan brosxon.
// La teksturo havas travideblan fonon kaj estas uzata nur sur elektitaj
// malgrandaj grundaj makuloj; ĝi ne estas ripetata sur la tuta tereno. La
// maldikaj herberoj kaj malhelaj grundaj markoj konservas la ekzistantan
// verdan paletron.
export const kreiTerenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    kunteksto.lineCap = "round";
    // Milda makuleco de la grundo — sufiĉe malforta por lasi la vertexajn
    // kolorojn decidi ĉu la loko estas herba, seka aŭ roka.
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o4 + Math.random() * 0o10;
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, i % 0o3 ? "rgba(84,116,66,0.10)" : "rgba(138,150,87,0.08)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    // Mallongaj herberoj kaj falintaj klingoj — la samo maldika marklingvo kiel
    // ĉe la herba kaj muska teksturoj, sed kun tre malalta kontrasto.
    for ( let i = 0; i < 0o300; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o2 + Math.random() * 0o10;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o7/0o10;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(72,112,60,0.16)" : "rgba(166,170,93,0.14)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, y - longo * 0o1/0o2,
        x + Math.cos(a) * longo, y + Math.sin(a) * longo);
      kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// ⟪ Grunda teksajxo 📃 ⟫ — la ripeta teksajxo de la ĝenerala tereno.
// kreiGrundanKanvason — La kuna markaro de la grundo. Griznivela reliefo — la
// herberaj tufoj kaj la ŝtonetoj leviĝas, la malsekaj kavoj kaj la fendetoj
// sinkas. La markoj desegniĝas senkudre ( desegniWrapan ), do la teksajxo
// ripetiĝas sen videblaj kudroj tra la tuta valo. Du konsumantoj uzas ĝin —
// la kolor-teksajxo ( preskaŭ blanka versio, do la verticaj koloroj restas la
// fonto de la herba koloro ) kaj la reliefa teksajxo ( la grizo mem ).
//     @param koloro ( boolean ) - Cxu la presaĵo estas la kolor-versio.
//     @returns bildo ( HTMLCanvasElement ) - La preta kanvaso.
const GRUNDA_S = 0o1000;   // 512 — sufiĉe densa por unuopa herbero

function kreiGrundanKanvason(koloro: boolean): HTMLCanvasElement {
  const s = GRUNDA_S;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = kanvasa.height = s;
  const k = kanvasa.getContext("2d")!;
  // La sama semo por ambaŭ versioj — la sama markaro, do la malhela makulo
  // de la koloro kaj la leviĝo de la reliefo kongruas.
  const semo = kreiHazardanGenerilon(0o2710);
  const hazardo = ( a: number, b: number ): number => a + semo() * ( b - a );

  // La baza grundo. La reliefo restas meza grizo ( nek levita nek sinkita ),
  // la koloro restas preskaŭ blanka — la verticaj koloroj portas la koloron.
  k.fillStyle = koloro ? "#FFFFFF" : "#d8d8d8";
  k.fillRect(0, 0, s, s);
  k.lineCap = "round";

  // Molaj tufoj — musko kaj grundaj montetoj. Duono leviĝas, duono sinkas al
  // malsekaj kavoj, do la grundo ondiĝas anstataŭ resti plata.
  for ( let i = 0; i < 0o140; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const r = s * ( 0o6/0o100 + hazardo(0, 1) * 0o16/0o100 );
    const levo = hazardo(0, 1) < 0o5/0o10;
    const fazo = hazardo(0, 1);
    desegniWrapan(k, s, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      if ( koloro ) {
        g.addColorStop(0, levo ? "rgba(232,246,216,0.10)" : "rgba(88,102,72,0.10)");
      } else {
        g.addColorStop(0, levo ? "rgba(255,255,255,0.62)" : "rgba(24,32,20,0.46)");
      }
      g.addColorStop(0o1, "rgba(255,255,255,0)");
      k.fillStyle = g;
      k.beginPath();
      k.ellipse(x, y, r, r * ( 0o5/0o10 + fazo * 0o4/0o10 ), fazo * Math.PI, 0, Math.PI * 2);
      k.fill();
    });
  }

  // Herberoj kaj falintaj klingoj — la mallongaj kurbitaj strekoj, kiuj donas
  // la herban strukturon de proksime. La plimulto leviĝas kiel verdaj
  // tufetoj, kaj iuj kuŝas kiel sekaj klingoj.
  for ( let i = 0; i < 0o1000; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const longo = s * ( 0o2/0o100 + hazardo(0, 1) * 0o6/0o100 );
    const angulo = -Math.PI / 0o2 + ( hazardo(0, 1) - 0o4/0o10 ) * 0o14/0o10;
    const kurbo = ( hazardo(0, 1) - 0o4/0o10 ) * longo * 0o6/0o10;
    const seka = hazardo(0, 1) < 0o2/0o10;
    const dikeco = 0o1/0o2 + hazardo(0, 1) * 0o1;
    const alfa = 0o12/0o100 + hazardo(0, 1) * 0o14/0o100;
    if ( koloro ) {
      k.strokeStyle = seka ? "rgba(150,158,98," + alfa + ")" : "rgba(72,104,56," + alfa + ")";
    } else {
      k.strokeStyle = seka ? "rgba(228,232,220,0.42)" : "rgba(255,255,255,0.46)";
    }
    k.lineWidth = dikeco;
    desegniWrapan(k, s, () => {
      k.beginPath();
      k.moveTo(x, y);
      k.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2 - Math.sin(angulo) * kurbo,
        y + Math.sin(angulo) * longo * 0o1/0o2 + Math.cos(angulo) * kurbo,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      k.stroke();
    });
  }

  // Eta ŝtonetoj kun ombro sub ili — la malgrandaj elstarajoj de la grundo.
  for ( let i = 0; i < 0o100; i++ ) {
    const x = hazardo(0, s), y = hazardo(0, s);
    const r = 1 + hazardo(0, 1) * 0o6/0o10;
    const angulo = hazardo(0, 1) * Math.PI;
    desegniWrapan(k, s, () => {
      k.save();
      k.translate(x, y);
      k.rotate(angulo);
      k.fillStyle = "rgba(20,24,18,0.30)";
      k.beginPath();
      k.ellipse(0, r * 0o5/0o10, r * 0o12/0o10, r * 0o7/0o10, 0, 0, Math.PI * 2);
      k.fill();
      k.fillStyle = koloro ? "rgba(196,204,190,0.66)" : "rgba(255,255,255,0.66)";
      k.beginPath();
      k.ellipse(0, 0, r, r * 0o7/0o10, 0, 0, Math.PI * 2);
      k.fill();
      k.restore();
    });
  }

  // Fajna grajno — la piksla bruo, kiu forigas la plastan egalecon. Ĝi estas
  // simetria, do ĝi ne ŝanĝas la mezan helecon de la teksajxo.
  const bildo = k.getImageData(0, 0, s, s);
  const d = bildo.data;
  const grajnaForto = koloro ? 0o7 : 0o24;
  for ( let i = 0; i < d.length; i += 4 ) {
    const g = ( Math.random() - 0o4/0o10 ) * grajnaForto;
    d[i] += g; d[i + 1] += g; d[i + 2] += g;
  }
  k.putImageData(bildo, 0, 0);
  return kanvasa;
}

// GRUNDA_RIPETO — kiom da fojoj la teksajxo ripetiĝas trans la tereno ( 1536
// unuoj ). La kahelo kovras ~0o44/0o10 = 4.6 unuojn — herbero de ~0.15
// unuoj, do la grundo havas kredindan skalon ĉe la okuloj de la ludanto. La
// nombro NE dividas la terenan reton ( 4 unuoj ), por ke la kaheloj ne
// kongruu kun la retaj diagonaloj.
const GRUNDA_RIPETO: [ number, number ] = [ 0o520, 0o520 ];

// kreiGrundanTeksajxon — La kolor-teksajxo de la tereno. Preskaŭ blanka — la
// verticaj koloroj restas la fonto de la herba koloro — kaj la markoj mem
// ( mallumaj klingoj, oliv-verdaj tufoj, grizaj ŝtonetoj ) portas la
// videblan herban strukturon. Ĝi MULTIPLIKIĜAS kun la verticaj koloroj, do la
// herbo restas la sama tono. La markoj estas maldikaj kaj malalt-alfaj, do la
// MEZA heleco restas proksima al blanko — la tereno ne malheliĝas videble,
// kaj la foraj kaheloj solviĝas reen en la verticajn kolorojn.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiGrundanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = GRUNDA_S;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiGrundanKanvason(true), 0, 0);
  }, GRUNDA_RIPETO, { anisotropio: 0o10 } );
});

// kreiGrundanBumpanTeksajxon — La reliefa teksajxo de la tereno. La sama
// markaro kiel la koloro ( la sama semo ), sed la grizo mem — la herberoj kaj
// la ŝtonetoj leviĝas, la malsekaj kavoj kaj la fendetoj sinkas. La reliefo
// donas la proksiman herban strukturon sen ŝanĝi la koloron, kaj ĝi restas en
// lineara koloro ( kiel la ceteraj reliefaj teksajxoj ).
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiGrundanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = GRUNDA_S;
  return kreiKanvasanTeksajxon(s, s, ( k ) => {
    k.drawImage(kreiGrundanKanvason(false), 0, 0);
  }, GRUNDA_RIPETO, { sRGB: false, anisotropio: 0o10 });
});

// kreiMuskanTeksajxon — Kreu mildan cyan-verdan teksturon por la molaj
// musko-montetoj. La densa baza tono, malklaraj humidaj tufoj kaj delikataj
// fibroj faras la surfacon mola anstataŭ aspekti kiel simpla kolora sfero.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta muska teksturo.
// Kaŝmemorita — la du alvokoj ( valo, montaro ) konstruu ĝin nur unufoje.
export const kreiMuskanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    // La supro restas cyan-malseka, sed la malsupro transiras al la sama
    // herba oliv-verdo kiel la grundo, por ke la musko ne aspektu gluita sur ĝi.
    const bazaGradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    bazaGradiento.addColorStop(0, "#489088");
    bazaGradiento.addColorStop(0o5/0o10, "#387870");
    bazaGradiento.addColorStop(0o3/0o4, "#507850");
    bazaGradiento.addColorStop(1, "#607848");
    kunteksto.fillStyle = bazaGradiento;
    kunteksto.fillRect(0, 0, s, s);

    // Malklaraj tufoj — la malgrandaj humidaj kusenoj kun cyan-verda brilo.
    const tufoKoloroj = [ "rgba(103,188,174,0.44)", "rgba(67,151,143,0.42)", "rgba(145,211,190,0.30)", "rgba(37,112,111,0.34)" ];
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o3/0o100 + Math.random() * 0o6/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, tufoKoloroj[i % tufoKoloroj.length]);
      g.addColorStop(0o5/0o10, "rgba(67,151,143,0.18)");
      g.addColorStop(1, "rgba(31,86,83,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath();
      kunteksto.ellipse(x, y, r, r * ( 0o6/0o10 + Math.random() * 0o4/0o10 ), Math.random() * Math.PI, 0, Math.PI * 2);
      kunteksto.fill();
    }

    // Fajnaj fibroj rompas la gradientojn sen perdi la lanecan, malalt-kontrastan
    // impreson. La strekoj estas mallongaj kaj malforte kurbaj.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o140; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = s * ( 0o1/0o100 + Math.random() * 0o2/0o100 );
      const kurbo = ( Math.random() - 0o5/0o10 ) * 0o3;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(139,211,193,0.28)" : "rgba(25,92,91,0.34)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2 - Math.sin(angulo) * kurbo,
        y + Math.sin(angulo) * longo * 0o1/0o2 + Math.cos(angulo) * kurbo,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      kunteksto.stroke();
    }

    // Herba rando ĉe la bazo — mallongaj molaj klingoj miksiĝas kun la herba
    // teksturo de la tero, anstataŭ finiĝi per klara cyan-verda linio.
    for ( let i = 0; i < 0o230; i++ ) {
      const x = Math.random() * s;
      const bazoY = s * ( 0o3/0o4 + Math.random() * 0o1/0o4 );
      const alto = s * ( 0o1/0o100 + Math.random() * 0o3/0o100 )
        * ( bazoY < s * 0o75/0o100 ? 0o7/0o10 : 1 );
      kunteksto.strokeStyle = i % 0o4 ? "rgba(104,158,78,0.46)" : "rgba(43,103,62,0.44)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, bazoY);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, bazoY - alto * 0o1/0o2,
        x + ( Math.random() - 0o5/0o10 ) * 0o2, bazoY - alto);
      kunteksto.stroke();
    }

  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// kreiKavalErbanTeksajxon — Kreu ripetan teksturon por la kanelitaj tigoj de
// la ĉevalvostaj specioj. La vertikalaj mallumaj strioj sekvas la ripojn de la
// geometrio, dum la pli helaj flankoj donas mildan cilindran brilon. La branĉa
// specio ricevas pli freŝan, pli helan verdon ol la alta skura kano.
function kreiKavalErbanTeksajxon(branĉa: boolean): THREE.CanvasTexture {
  const w = 0o200, h = 0o100;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const baza = branĉa ? "#58a070" : "#488860";
    const hela = branĉa ? "#88c088" : "#70a878";
    const ombro = branĉa ? "#2c6448" : "#244c38";
    // Fono — la sama kromataj strioj kiel antaŭe ( la ripoj ), sed kun la
    // hela brilo pli larĝa kaj pli kontinua, do la tigo legiĝas kiel vaksa
    // kano anstataŭ kiel malluma vergo.
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, ombro);
    gradiento.addColorStop(0o17/0o100, baza);
    gradiento.addColorStop(0o5/0o10, hela);
    gradiento.addColorStop(0o61/0o100, baza);
    gradiento.addColorStop(1, ombro);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);

    // La ripoj — la teksturo havas UNU strianaron por ĉiu geometria kolumno
    // ( la riba sekco havas 16 kolumnojn: 8 krestojn kaj 8 valojn ). La eĉaj
    // strioj estas la krestoj ( hela brilo ), la malparaj la valoj ( ombro ) —
    // tiel la tekstura ribaro kaj la geometria ribaro KUNFALAS anstataŭ batali.
    for ( let i = 0; i < 0o20; i++ ) {
      const x = i / 0o20 * w;
      kunteksto.fillStyle = i % 2 === 0 ? "rgba(214,240,186,0.30)" : "rgba(18,58,42,0.34)";
      kunteksto.fillRect(x, 0, w / 0o20 * 0o1/0o2, h);
    }
    // ⟨ La nodaj markoj 📃 ⟩ — la segmento havas v = 0 ĉe sia bazo kaj v = 1 ĉe
    // sia supro ( tie sidas la ingo ), do la mallarĝa malhela bando iras al la
    // SUPRO de la kanvaso. La antaŭaj ses disaj ringoj meze de ĉiu segmento
    // aspektis kiel hazardaj strioj — la nodo estas nur unu, supre.
    kunteksto.fillStyle = "rgba(20,60,44,0.32)";
    kunteksto.fillRect(0, 0, w, h * 0.12);
    kunteksto.fillStyle = "rgba(222,242,190,0.26)";
    kunteksto.fillRect(0, h * 0.12, w, 2);
    // Malgrandaj poroj kaj skrapoj — subtila surfaca malpureco, pli densa ĉe
    // la malsupro, kie la tigo tuŝas malsekan grundon.
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 0o3 ? "rgba(24,78,58,0.20)" : "rgba(220,238,176,0.24)";
      kunteksto.fillStyle = koloro;
      kunteksto.fillRect(x, y, 1 + Math.random(), 1 + Math.random() * 0o2);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

export function kreiCetkuanTeksajxon(): THREE.CanvasTexture {
  return kreiKavalErbanTeksajxon(false);
}

export function kreiCakeanTeksajxon(): THREE.CanvasTexture {
  return kreiKavalErbanTeksajxon(true);
}

// kreiBetulanFoliaranTeksajxon — Kreu teksturon por la malgrandaj folioj de
// betulo. Miksitaj molaj foliaraj nuboj, apartaj ovalaj folioj kaj fajnaj
// mezvejnoj rompas la malplenan unuforman kronon.
export const kreiBetulanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture => {
  // ⟨ La bazkoloro de la foliaro 📃 ⟩ — ĉiu ombro kaj konturo de ĉi tiu teksajxo
  // deriviĝas el ĉi tiu verdo laŭ la stila regulo ( MainColor − n · 0x101010 ).
  const BAZO = 0xc8d8c0;
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    // Helblankeca menteca paletro — pli hela kaj pli blankeca ol la grunda
    // herbo, tiel ke la krono legiĝas kiel pala menteca nubo super la herbejo.
    gradiento.addColorStop(0, "#e8f0e0");
    gradiento.addColorStop(0o4/0o10, "#c8d8c0");
    gradiento.addColorStop(1, "#a8c0a8");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);

    // La malgrandaj lum- kaj ombro-makuloj donas profundon al la globforma krono.
    for ( let i = 0; i < 0o60; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      const koloro = i % 0o3 ? "rgba(228,242,224,0.22)" : ombro(BAZO, 0o10, 0.16);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o7/0o10, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }

    // Betulaj folioj — malgrandaj pintigitaj ovaloj kun hela centra vejno kaj
    // flankaj vejnetoj, ne grandaj rondaj makuloj. La folioj grupiĝas en etaj
    // faskoj kun malsamaj direktoj, kiel ĉe vera betula krono.
    // Helblankecaj mentecaj tonoj — multe da blanka en la miksado por ke la
    // krono aspektu pala kaj nuba, ne malhelverda.
    const foliajKoloroj = [ "rgba(150,178,152,0.55)", "rgba(188,208,184,0.50)", "rgba(130,160,134,0.58)", "rgba(214,230,210,0.46)", "rgba(238,246,234,0.38)" ];
    const desegniFolion = ( x: number, y: number, longo: number, largho: number, angulo: number, koloro: string ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(angulo);
      // Pintigitaj pintoj — moviĝu laŭ du kvadrataj kurboj anstataŭ unu ovalo.
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo, 0);
      kunteksto.quadraticCurveTo(0, -largho, longo, 0);
      kunteksto.quadraticCurveTo(0, largho, -longo, 0);
      kunteksto.fill();
      // Helverda mezvejno kaj du flankaj vejnetoj — la folio ne estas plata makulo.
      kunteksto.strokeStyle = "rgba(242,250,238,0.55)";
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o3/0o4, 0); kunteksto.lineTo(longo * 0o3/0o4, 0); kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(242,250,238,0.30)";
      kunteksto.lineWidth = 0o1/0o4;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo * 0o2/0o10, 0); kunteksto.lineTo(0, -largho * 0o63/0o100);
      kunteksto.moveTo(longo * 0o2/0o10, 0); kunteksto.lineTo(0, largho * 0o63/0o100);
      kunteksto.stroke();
      kunteksto.restore();
    };
    for ( let i = 0; i < 0o160; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const longo = 0o2 + Math.random() * 0o3;
      const largho = 0o1 + Math.random() * 0o1;
      desegniFolion(x, y, longo, largho, Math.random() * Math.PI, foliajKoloroj[i % foliajKoloroj.length]);
    }
    // Etaj faskoj — 3–5 folioj el komuna punkto, kiel folioj sur unu branĉeto.
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const bazoAngulo = Math.random() * Math.PI;
      const fasko = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < fasko; j++ ) {
        const longo = 0o2 + Math.random() * 0o3;
        const largho = 0o1 + Math.random() * 0o1;
        desegniFolion(x + ( Math.random() - 0o5/0o10 ) * 0o1, y + ( Math.random() - 0o5/0o10 ) * 0o1,
          longo, largho, bazoAngulo + ( j - fasko / 2 ) * 0o5/0o10 + ( Math.random() - 0o5/0o10 ) * 0o2/0o10,
          foliajKoloroj[( i + j ) % foliajKoloroj.length]);
      }
    }

    // Malgrandaj apartaj foliaj markoj anstataŭ longaj vertikalaj strioj;
    // la malplenaj ombroj inter ili forigas la kukum-similan surfacon.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o140; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = 0o1 + Math.random() * 0o3;
      kunteksto.strokeStyle = i % 0o3 ? ombro(BAZO, 0o5, 0.22) : "rgba(222,238,216,0.26)";
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2,
        y + Math.sin(angulo) * longo * 0o1/0o2 - 1,
        x + Math.cos(angulo) * longo, y + Math.sin(angulo) * longo);
      kunteksto.stroke();
    }
    // Malgrandaj internaj ombroj sugestas foliarajn faskojn kaj branĉajn truojn.
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o2 + Math.random() * 0o4;
      kunteksto.fillStyle = ombro(BAZO, 0o12, 0.10);
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o63/0o100, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }

  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});

// kreiBetulanFoliaranBumpanTeksajxon — Griznivela reliefa teksaĵo por la
// betula foliaro. La sama ideo kiel ĉe la larika foliaro, sed por la krono de
// betulo — glata aro da sferoj sen reliefo aspektas kiel verdaj balonoj, kaj
// la bump-teksaĵo portas la foliojn, kiujn la geometrio ne povas porti.
// La folioj LEVIĜAS ( hele ), iliaj mezvejnoj kaj la interspacoj inter la
// tufojn malleviĝas ( malhele ). Linearaj koloroj — bump-teksajxoj ne uzas sRGB.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiBetulanFoliaranBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, s, s);
    // Mola grand-skala reliefo — folimaso ne estas plata.
    for ( let i = 0; i < 0o20; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = s * ( 0o2/0o25 + Math.random() * 0o14/0o100 );
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, i % 2 ? "rgba(150,150,150,0.22)" : "rgba(64,64,64,0.22)");
      g.addColorStop(1, "rgba(128,128,128,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
    // Unu folio — levita klingo kun malleviĝinta mezvejno.
    const desegniFolion = ( x: number, y: number, longo: number, largho: number, angulo: number ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(angulo);
      kunteksto.fillStyle = "rgba(158,158,158,0.34)";
      kunteksto.beginPath();
      kunteksto.moveTo(-longo, 0);
      kunteksto.quadraticCurveTo(0, -largho, longo, 0);
      kunteksto.quadraticCurveTo(0, largho, -longo, 0);
      kunteksto.fill();
      kunteksto.strokeStyle = "rgba(96,96,96,0.30)";
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o3/0o4, 0); kunteksto.lineTo(longo * 0o3/0o4, 0); kunteksto.stroke();
      kunteksto.restore();
    };
    // Folioj kaj fasketoj — la samaj proporcioj kaj denseco kiel la koloro.
    for ( let i = 0; i < 0o120; i++ ) {
      desegniFolion(Math.random() * s, Math.random() * s,
        0o2 + Math.random() * 0o3, 0o1 + Math.random() * 0o1, Math.random() * Math.PI);
    }
    for ( let i = 0; i < 0o30; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const bazoAngulo = Math.random() * Math.PI;
      const fasko = 0o3 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < fasko; j++ ) {
        desegniFolion(x, y, 0o2 + Math.random() * 0o3, 0o1 + Math.random() * 0o1,
          bazoAngulo + ( j - fasko / 2 ) * 0o5/0o10);
      }
    }
    // Ombroj inter la tufoj — la truoj de la krono.
    for ( let i = 0; i < 0o40; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const r = 0o2 + Math.random() * 0o4;
      kunteksto.fillStyle = "rgba(58,58,58,0.28)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o63/0o100, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 4 });
});

// kreiBetulanFolianTeksajxon — UNU betula folio por la folikartoj de la
// krono. La alia folia teksaĵo ( kreiBetulanFoliaranTeksajxon ) estas la
// MASO de la krono: ĝi montras centon da malgrandaj folioj, do kiam oni
// ŝmiras ĝin sur unuopan folikarton, la karto ricevas makulojn de cent folioj
// kaj aspektas kiel verda peco, ne kiel folio. Ĉi tiu teksaĵo montras nur
// UNU folion: la kanvaso mem estas la klingo ( la malplena fono restas
// travidebla, do la materialo uzas alphaTest kaj la folio vere havas la
// segildentan betulan randon ).
//
// ⟨ La orientiĝo 📃 ⟩ — la kartoj mapas u-ojn laŭ la LONGO ( 0 = bazo, 1 =
// pinto ) kaj v-ojn trans la LARĜO, do la folio estas desegnita KUSANTE: x
// estas la longo, y la larĝo. La folio restas simetria ĉirkaŭ la mezo de la
// kanvaso, do la vertikala renverso de la teksaĵoj ne gravas.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiBetulanFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  // ⟨ Duobla distingivo 📃 ⟩ — la folikarto montriĝas granda sur la ekrano
  // ( pluraj centoj da rastrumeroj en la ilo ), do ĉe 256×128 la segildenta
  // rando kaj la vejnetaro legiĝis kiel ŝtuparo de rastrumeroj. Duobla kanvaso
  // kostas preskaŭ nenion ( unu teksaĵo por la tuta Betularo ) kaj la rando de
  // ĉiu folio estas nun tranĉa.
  // ⟨ La bazkoloro de la folio 📃 ⟩ — la ombroj kaj la konturoj ( MainColor − n · 0x101010 ).
  const BAZO = 0x98b078;
  const w = 0o1000, h = 0o400;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const mezo = h / 2;
    const MARGENO = 0.04;           // la folio ne tuŝu la randon de la kanvaso
    const longo = w * ( 1 - 2 * MARGENO );
    // ⟨ La folio DEVAS eniri la kanvason 📃 ⟩ — la antaŭa valoro estis
    // `h * 0o46/0o100`, kiu laŭ la okuma skribo estas 0.594 ( ne 0.46 ), do la
    // folio estis 168 rastrumerojn alta en 128-rasteruma kanvaso: la pinto kaj
    // la bazo estis TONDITAJ kaj ĉiu folikarto montris sentranĉan folion. Nun
    // la duon-alto estas vera duono de la disponebla alto ( 2:1 proporcio ).
    const hwMax = h * 0.46;
    // ⟨ La klinga profilo 📃 ⟩ — vera paperbetula folio: mallarĝa baza fino,
    // la plej larĝa punkto je ~38% de la longo, kaj LONGA akra pinto. La rando
    // portas DUOBLAN segildenton — grandajn dentojn kun pli etaj inter ili —
    // do la silueto ne estas glata ovalo. La du duonoj ankaŭ ne estas egale
    // larĝaj: la suba flanko estas iomete pli larĝa, kiel ĉe vera folio.
    const segilo = ( t: number, nombro: number ): number =>
      Math.abs((( t * nombro ) % 1 ) - 0o1/0o2) * 2;
    // ⟨ Duobla segildento 📃 ⟩ — grandaj dentoj ( ~24 ) kun pli etaj inter ili
    // ( ~56 ). La antaŭaj dentoj estis tro grandaj: sur la folio ili legiĝis kiel
    // ŝtuparo de 5-rasterumaj blokoj, kaj la rando de la folio aspektis
    // dentaĵo de segilo anstataŭ vivanta folirando. Nun la dentoj estas duone
    // pli malgrandaj kaj pli multaj, kaj la dua ondaro ankaŭ ricevas malgrandan
    // FAZAN ŝovon, do la dentoj ne estas perfekte regule ripetitaj.
    // ⟨ La profilo ne estas ovalo 📃 ⟩ — `sin(π t)` donas ronde ambaŭfinan
    // formon, kaj tio estas ĝuste kion oni vidis: la folio aspektis kiel grasa
    // ovo, ĉar je 90% de la longo ĝi ankoraŭ larĝis 41% de sia maksimumo. Vera
    // betula folio havas RONDAN BAZON kaj LONGAN AKRAN PINTON — la pinto estas
    // pli ol kvarono de la tuta longo. La profilo estas do dupeca: de la bazo
    // ĝis la plej larĝa punkto ( 42% ) ĝi leviĝas kiel potenco, poste ĝi
    // MALGRANDIĜAS lineare al akra pinto ( je 90% restas nur ~13% de la larĝo ).
    const PLEJ_LARĜA = 0.42;
    const duonLarĝo = ( t: number, flanko: number ): number => {
      const profilo = t < PLEJ_LARĜA
        ? Math.pow(t / PLEJ_LARĜA, 0.52)
        : Math.pow(( 1 - t ) / ( 1 - PLEJ_LARĜA ), 1.05);
      const dentoj = 1 + 0.055 * segilo(t, 24) + 0.026 * segilo(t + 0.021, 56);
      return hwMax * profilo * dentoj * ( 1 + 0o1/0o20 * flanko );
    };
    const xDe = ( t: number ): number => w * MARGENO + t * longo;
    // La klingo — unu vojo supre, unu malsupre.
    // La klinga konturo — Path2D, ĉar la sama vojo estas uzata tri fojojn
    // ( plenigo, tondilo kaj la malhela randa streko ).
    const klingo = new Path2D();
    const PAŜOJ = 720;
    for ( let i = 0; i <= PAŜOJ; i++ ) {
      const t = i / PAŜOJ;
      const y = mezo - duonLarĝo(t, -1);
      if ( i === 0 ) klingo.moveTo(xDe(t), y); else klingo.lineTo(xDe(t), y);
    }
    for ( let i = PAŜOJ; i >= 0; i-- ) {
      const t = i / PAŜOJ;
      klingo.lineTo(xDe(t), mezo + duonLarĝo(t, 1));
    }
    klingo.closePath();
    // La koloro — freŝa betula verdo, pli profunda ĉe la bazo kaj pli hela ĉe
    // la pinto, kiel ĉe folio kontraŭ la ĉielo.
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, "#7ba55e");
    gradiento.addColorStop(0.35, "#8fb471");
    gradiento.addColorStop(0o3/0o4, "#a2c182");
    gradiento.addColorStop(1, "#aecb8e");
    kunteksto.fillStyle = gradiento;
    kunteksto.fill(klingo);
    kunteksto.save();
    kunteksto.clip(klingo);
    // ⟨ La lumo trans la larĝo 📃 ⟩ — la folio kuŝas en unu ebeno, do sen ĉi tiu
    // tavolo ĝi montriĝus egale lumigita de ĉiu flanko. La supra duono ricevas
    // helan tavolon ( la lumo venas de supre ) kaj la malsupra ombran — ĝuste
    // tio faras la klingon sentebla kiel FOLION anstataŭ kiel verdan platon.
    const transLarĝo = kunteksto.createLinearGradient(0, mezo - hwMax, 0, mezo + hwMax);
    transLarĝo.addColorStop(0, "rgba(255,255,240,0.16)");
    transLarĝo.addColorStop(0o45/0o100, "rgba(255,255,240,0.02)");
    transLarĝo.addColorStop(1, ombro(BAZO, 0o10, 0.18));
    kunteksto.fillStyle = transLarĝo;
    kunteksto.fillRect(0, 0, w, h);
    // ⟨ La foliaĵo 📃 ⟩ — etaj makuletoj, delikataj vejnoj kaj la grajno de la
    // histo. La antaŭaj makuloj estis grandaj molaj elipsoj ( radiuso ĝis 17
    // rastrumeroj ), kiuj sur la folikarto legiĝis kiel pentritaj nuboj; nun ili
    // estas malgrandaj kaj malfortaj, kaj la superreganta sento venas de la
    // vejnetaro kaj de fajna hista grajno.
    const makuloHazardo = kreiHazardanGenerilon(0o2716);
    for ( let i = 0; i < 0o440; i++ ) {
      const t = makuloHazardo();
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax * makuloHazardo();
      const r = 2.2 + makuloHazardo() * 9;
      kunteksto.fillStyle = i % 0o3 ? "rgba(206,224,178,0.13)" : ombro(BAZO, 0o3, 0.11);
      kunteksto.beginPath(); kunteksto.ellipse(xDe(t), y, r, r * 0.55, makuloHazardo() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }
    // La hista grajno — punktoj de la folikarno, videblaj nur ĉe tre proksima
    // vido, sed ili senigas la folion de la aspekto de plata farbo.
    for ( let i = 0; i < 0o3000; i++ ) {
      const x = w * MARGENO + makuloHazardo() * longo;
      const y = mezo + ( makuloHazardo() - 0o1/0o2 ) * 2 * hwMax;
      kunteksto.fillStyle = i % 0o2 ? "rgba(136,164,108,0.16)" : "rgba(214,232,190,0.14)";
      kunteksto.fillRect(x, y, 1.6, 1.6);
    }
    // La mezvejno kaj la flankaj vejnetoj — unu el la plej malmultekostaj
    // signoj, kiuj diras al la okulo "ĉi tio estas FOLIO". Ĉiu vejno ricevas
    // ombran linion apud si, do la vejnetaro ne aspektas kiel desegnaĵo.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o13; i++ ) {
      const t = 0.075 + i * 0.078;
      const flanko = i % 2 ? 1 : -1;
      const fino = xDe(t + 0.26);
      const pinto = mezo + flanko * hwMax * 0.88;
      kunteksto.strokeStyle = ombro(BAZO, 0o5, 0.26);
      kunteksto.lineWidth = 2.8;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo + flanko * 2.6);
      kunteksto.quadraticCurveTo(xDe(t + 0.06), mezo + flanko * hwMax * 0.45, fino, pinto);
      kunteksto.stroke();
      kunteksto.strokeStyle = "rgba(226,240,204,0.42)";
      kunteksto.lineWidth = 0o3/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(xDe(t), mezo);
      kunteksto.quadraticCurveTo(xDe(t + 0.06), mezo + flanko * hwMax * 0.44, fino,
        pinto - flanko * 2.6);
      kunteksto.stroke();
    }
    // ⟨ La mezvejno 📃 ⟩ — konusforma, dika ĉe la tigo kaj malaperanta antaŭ la
    // pinto. Anstataŭ unu egallarĝa streko ( kiu aspektis kiel krajono-tiro tra
    // la folio ) ĝi estas plenigita klingo kun propra profilo.
    kunteksto.fillStyle = "rgba(228,242,204,0.34)";
    kunteksto.beginPath();
    kunteksto.moveTo(xDe(0), mezo - 4.2);
    kunteksto.lineTo(xDe(0.97), mezo - 0.7);
    kunteksto.lineTo(xDe(0.97), mezo + 0.7);
    kunteksto.lineTo(xDe(0), mezo + 4.2);
    kunteksto.closePath(); kunteksto.fill();
    kunteksto.restore();
    // La rando — unue mola ombro interne, poste mallarĝa malhela linio, do la
    // folio havas silueton ankaŭ kontraŭ la hela ĉielo kaj iom da dikeco.
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0.12);
    kunteksto.lineWidth = 8;
    kunteksto.stroke(klingo);
    // ⟨ Mola rando 📃 ⟩ — la rando estis 0.34-alfa malhela linio, kaj la
    // multaj folikartoj de la krono legiĝis kiel malmolaj poligonoj. La ombro
    // internen restas, sed la malhela streko preskaŭ malaperas.
    kunteksto.strokeStyle = ombro(BAZO, 0o6, 0.16);
    kunteksto.lineWidth = 2;
    kunteksto.stroke(klingo);
    // La tigo ĉe la bazo — dika kaj pli bruna ol la klingo.
    kunteksto.strokeStyle = "#9aa878";
    kunteksto.lineWidth = 3.2;
    kunteksto.lineCap = "butt";
    kunteksto.beginPath();
    kunteksto.moveTo(0, mezo); kunteksto.lineTo(xDe(0.022), mezo);
    kunteksto.stroke();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});

// kreiLarikanFoliaranTeksajxon — Kreu teksturon por la aŭtunaj pinglaroj de
// lariko. La pingloj grupiĝas en mallongaj faskoj ĉirkaŭ la branĉetoj, kun
// orflavaj, olivaj kaj brunaj nuancoj anstataŭ plata flava konuso.
export const kreiLarikanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture => {
  // ⟨ La bazkoloro de la pinglaroj 📃 ⟩ — la ombroj kaj la konturoj de la
  // aŭtunaj pingloj ( MainColor − n · 0x101010 ).
  const BAZO = 0xa8a850;
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, s);
    gradiento.addColorStop(0, "#d0c868");
    gradiento.addColorStop(0o5/0o10, "#a8a050");
    gradiento.addColorStop(1, "#687048");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);

    // Pinglaj ventumiloj — faskoj de fajnaj pingloj radiaj el komuna branĉa
    // punkto, kiel ĉe vera lariko. La pingloj kliniĝas iomete supren kaj havas
    // aŭtunajn orflavajn, olivajn kaj verdflavajn nuancojn.
    const pinglajKoloroj = [ "rgba(239,216,105,0.62)", "rgba(204,190,84,0.60)", "rgba(168,168,84,0.58)", "rgba(88,102,52,0.56)", "rgba(224,168,64,0.60)" ];
    const desegniVentumilon = ( x: number, y: number, bazoAngulo: number, longo: number, koloroj: string[] ): void => {
      kunteksto.save();
      kunteksto.translate(x, y);
      kunteksto.rotate(bazoAngulo);
      const pingloj = 0o6 + ( ( Math.random() * 0o3 ) | 0 );
      for ( let j = 0; j < pingloj; j++ ) {
        const t = j / ( pingloj - 1 ) - 0o5/0o10;
        const a = t * 0o6/0o10;
        const pl = longo * ( 0o6/0o10 + Math.random() * 0o4/0o10 );
        kunteksto.strokeStyle = koloroj[( j + ( ( Math.random() * koloroj.length ) | 0 ) ) % koloroj.length];
        kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
        kunteksto.lineCap = "round";
        // Kurba, iomete pendant pinglo — kvadrata kurbo anstataŭ rekta streko.
        kunteksto.beginPath();
        kunteksto.moveTo(0, 0);
        kunteksto.quadraticCurveTo(Math.cos(a) * pl * 0o46/0o100, -Math.sin(a) * pl * 0o46/0o100 - pl * 0o2/0o10,
          Math.cos(a) * pl, -Math.sin(a) * pl);
        kunteksto.stroke();
      }
      kunteksto.restore();
    };
    for ( let i = 0; i < 0o54; i++ ) {
      desegniVentumilon(Math.random() * s, Math.random() * s,
        Math.random() * Math.PI * 2, 0o4 + Math.random() * 0o6, pinglajKoloroj);
    }
    // Malhelaj branĉetaj ombroj inter la ventumiloj — la foliaro ne estas unu
    // solida flava maso, sed faskoj kun profundaj interspacoj.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o40; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const angulo = Math.random() * Math.PI * 2;
      const longo = 0o3 + Math.random() * 0o4;
      kunteksto.strokeStyle = ombro(BAZO, 0o7, 0.30);
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2, y + Math.sin(angulo) * longo * 0o1/0o2,
        x + Math.cos(angulo) * longo * 0o3/0o4, y + Math.sin(angulo) * longo * 0o3/0o4);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o70; i++ ) {
      kunteksto.fillStyle = i % 0o3 ? "rgba(240,226,126,0.42)" : ombro(BAZO, 0o7, 0.38);
      kunteksto.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 0o2, 1 + Math.random() * 0o2);
    }
    // Fasketoj de pingloj havas la mallongajn, pintajn strekojn de herbo, sed
    // kun oro-olivaj nuancoj por konservi la aŭtunan identecon de lariko.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o220; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10;
      const longo = 0o2 + Math.random() * 0o4;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(190,188,89,0.34)" : ombro(BAZO, 0o5, 0.32);
      kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o2, y - longo * 0o1/0o2,
        x + Math.cos(a) * longo, y + Math.sin(a) * longo);
      kunteksto.stroke();
    }

  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});

// desegniFrutikosanTrunketon — Desegnu unu branĉiĝantan likenan trunketon.
// La ĉefa tigo havas malhelan randon kaj helan korpon, tri segmentojn
// maldikiĝantajn al la pinto, flankajn branĉojn kaj malhelajn pintojn ( la
// apoteciaj tasoj ).
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param x ( number ) - La radika x.
//     @param bazo ( number ) - La radika y ( la fundo de la kanvaso ).
//     @param alto ( number ) - La trunketa alto.
//     @param kurbo ( number ) - La horizontala flekso de la pinto.
function desegniFrutikosanTrunketon(k: CanvasRenderingContext2D, x: number, bazo: number, alto: number, kurbo: number): void {
  const pintoX = x + kurbo, pintoY = bazo - alto;
  // La branĉoj de frutikoza likeno estas cilindraj kaj iomete diafanaj. malhela
  // kerno, pala kortekso kaj pli hela lumflanko. Tio diferencigas ilin de la
  // plataj folioj de foliozaj likenoj.
  const segmento = ( de: number, gxis: number, dikeco: number ): void => {
    const mx = x + kurbo * de, my = bazo - alto * de;
    const nx = x + kurbo * gxis, ny = bazo - alto * gxis;
    k.lineCap = "round";
    k.strokeStyle = "rgba(70,82,68,0.82)";
    k.lineWidth = dikeco + 0o2;
    k.beginPath();
    k.moveTo(mx, my);
    k.quadraticCurveTo(( mx + nx ) / 2 + kurbo * 0o3/0o10, ( my + ny ) / 2, nx, ny);
    k.stroke();
    k.strokeStyle = dikeco > 0o3 ? "#b0c0a0" : "#c8d0b8";
    k.lineWidth = dikeco;
    k.beginPath();
    k.moveTo(mx, my - dikeco * 0o1/0o4);
    k.quadraticCurveTo(( mx + nx ) / 2 + kurbo * 0o3/0o10, ( my + ny ) / 2 - dikeco * 0o1/0o4, nx, ny - dikeco * 0o1/0o4);
    k.stroke();
  };
  for ( let i = 0; i < 0o3; i++ ) segmento(i / 0o3, ( i + 1 ) / 0o3, 0o6 - i * 0o1);

  // Branĉetoj disiĝas alterne, kiel ĉe Cladonia kaj boaclikeno, anstataŭ esti
  // nur hazarda punktaro. Ĉiu pinto ricevas malgrandan tasforman apotecion.
  const desegniTason = ( tx: number, ty: number, rad: number ): void => {
    k.fillStyle = "rgba(72,72,56,0.9)";
    k.beginPath(); k.ellipse(tx, ty + 1, rad * 0o12/0o10, rad * 0o7/0o10, 0, 0, Math.PI * 2); k.fill();
    k.fillStyle = "#988068";
    k.beginPath(); k.ellipse(tx, ty, rad, rad * 0o5/0o10, 0, 0, Math.PI * 2); k.fill();
    k.fillStyle = "#b8a080";
    k.beginPath(); k.ellipse(tx, ty - 1, rad * 0o7/0o10, rad * 0o3/0o10, 0, 0, Math.PI * 2); k.fill();
    k.strokeStyle = "rgba(224,214,178,0.75)";
    k.lineWidth = 1;
    k.beginPath(); k.arc(tx, ty - 1, rad * 0o7/0o10, Math.PI, Math.PI * 2); k.stroke();
  };
  const branĉoj = 0o2 + ( ( Math.random() * 0o3 ) | 0 );
  for ( let b = 0; b < branĉoj; b++ ) {
    const t = 0o3/0o10 + b * 0o2/0o10 + Math.random() * 0o1/0o10;
    const bx = x + kurbo * t + ( b % 2 ? 0o6 : -0o6 );
    const by = bazo - alto * t;
    const balto = alto * ( 0o2/0o10 + Math.random() * 0o2/0o10 );
    const bk = ( b % 2 ? 1 : -1 ) * ( 0o4 + Math.random() * 0o10 );
    const bx2 = bx + bk, by2 = by - balto;
    k.strokeStyle = "rgba(70,82,68,0.82)"; k.lineWidth = 0o4; k.lineCap = "round";
    k.beginPath(); k.moveTo(bx, by);
    k.quadraticCurveTo(( bx + bx2 ) / 2, ( by + by2 ) / 2 - 0o2, bx2, by2); k.stroke();
    k.strokeStyle = "#c8d0b0"; k.lineWidth = 0o3; k.stroke();
    desegniTason(bx2, by2, 0o3 + Math.random() * 0o2);
    // Dua, pli maldika forko donas al la frutikoza tufo naturajn Y-formajn
    // branĉojn anstataŭ nur izolitajn flankajn liniojn.
    const ft = 0o6/0o10;
    const fx = bx + ( bx2 - bx ) * ft, fy = by + ( by2 - by ) * ft;
    const fa = ( b % 2 ? 1 : -1 ) * ( 0o4 + Math.random() * 0o4 );
    const fy2 = fy - balto * ( 0o3/0o10 + Math.random() * 0o2/0o10 );
    k.strokeStyle = "rgba(70,82,68,0.76)"; k.lineWidth = 0o3; k.lineCap = "round";
    k.beginPath(); k.moveTo(fx, fy);
    k.quadraticCurveTo(fx + fa * 0o4/0o10, ( fy + fy2 ) / 2 - 0o1, fx + fa, fy2); k.stroke();
    k.strokeStyle = "#d0d8c0"; k.lineWidth = 0o2; k.stroke();
    desegniTason(fx + fa, fy2, 0o2 + Math.random() * 0o1);
  }
  desegniTason(pintoX, pintoY, 0o3 + Math.random() * 0o2);

  // Soradioj — la pulvora grizverda surfaco de la branĉoj.
  for ( let i = 0; i < 0o20; i++ ) {
    const t = Math.random();
    const px = x + kurbo * t + ( Math.random() - 0o5/0o10 ) * 0o4;
    const py = bazo - alto * t + ( Math.random() - 0o5/0o10 ) * 0o4;
    k.fillStyle = Math.random() < 0o6/0o10 ? "rgba(224,230,202,0.8)" : "rgba(78,94,72,0.55)";
    k.beginPath(); k.arc(px, py, 1 + Math.random() * 1, 0, Math.PI * 2); k.fill();
  }
}

// kreiFrutikosanLikenanTeksajxon — Kreu proceduralan frutikosan likenan
// teksajxon por la arbustformaj likenoj. Pluraj branĉiĝantaj trunketoj,
// pala salviverda kun malhela rando kaj malhelaj pintoj — la formo de
// Cladonia kaj boaclikeno. La alphaTest tranĉas la eksteron.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiFrutikosanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const trunketoj = 0o10;
    for ( let i = 0; i < trunketoj; i++ ) {
      const x = s * ( 0o2/0o10 + Math.random() * 0o4/0o10 );
      const alto = s * ( 0o3/0o10 + Math.random() * 0o16/0o100 );
      const kurbo = ( Math.random() - 0o5/0o10 ) * s * 0o1/0o20;
      desegniFrutikosanTrunketon(kunteksto, x, s * 0o17/0o20, alto, kurbo);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// kreiFolisanLikenanTeksajxon — Kreu proceduralan foliosan likenan teksajxon.
// Plata krusto el larĝaj disradiantaj folietoj kun malhela konturo, hela
// supra rando kaj suba ombro — la folia formo, kiu kuŝas plate sur la tero.
// Hela marĝena bendo, malhela hipotalo kaj plataj apotecioj kompletigas ĝin.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiFolisanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const cx = s / 2, cy = s / 2;

    // Folioza likeno estas folia rozetaro, ne rado da samformaj ovaloj. La baza
    // hipotalo restas malhela kaj iomete videbla inter la disaj folietoj.
    neregulaFormo(kunteksto, cx, cy, s * 0o22/0o100, 0o7, 0o25/0o100, Math.random() * Math.PI * 2);
    kunteksto.fillStyle = "rgba(66,78,58,0.72)";
    kunteksto.fill();

    const desegniFolieton = ( a: number, bazoR: number, longo: number, largho: number, koloro: string ): void => {
      const lx = cx + Math.cos(a) * bazoR, ly = cy + Math.sin(a) * bazoR;
      kunteksto.save();
      kunteksto.translate(lx + Math.cos(a) * longo / 2, ly + Math.sin(a) * longo / 2);
      kunteksto.rotate(a);
      // La folieto estas pintigita kaj iomete krenelita ĉe la rando, kiel vera
      // folia likena lobo, kun pli dika mezo ol la pinto.
      kunteksto.beginPath();
      kunteksto.moveTo(-longo / 2, 0);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, -largho * 0o63/0o100, -longo * 0o1/0o20, -largho);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, -largho * 0o63/0o100, longo / 2, 0);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, largho * 0o72/0o100, 0, largho);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, largho * 0o63/0o100, -longo / 2, 0);
      kunteksto.closePath();
      kunteksto.fillStyle = "rgba(54,66,48,0.72)";
      kunteksto.fill();
      kunteksto.translate(0, -1);
      kunteksto.fillStyle = koloro;
      kunteksto.beginPath();
      kunteksto.moveTo(-longo / 2 + 1, 0);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, -largho * 0o7/0o10, -longo * 0o1/0o20, -largho * 0o66/0o100);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, -largho * 0o7/0o10, longo / 2 - 1, 0);
      kunteksto.quadraticCurveTo(longo * 0o1/0o4, largho * 0o63/0o100, 0, largho * 0o63/0o100);
      kunteksto.quadraticCurveTo(-longo * 0o1/0o4, largho * 0o7/0o10, -longo / 2 + 1, 0);
      kunteksto.closePath(); kunteksto.fill();
      // Meza vejno kaj flankaj vejnoj estas la karakteriza folia reliefo.
      kunteksto.strokeStyle = "rgba(224,232,202,0.62)";
      kunteksto.lineWidth = 1;
      kunteksto.lineCap = "round";
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o32/0o100, 0); kunteksto.lineTo(longo * 0o32/0o100, 0); kunteksto.stroke();
      for ( let v = -1; v <= 1; v += 2 ) {
        kunteksto.beginPath();
        kunteksto.moveTo(v * longo * 0o1/0o10, 0);
        kunteksto.quadraticCurveTo(v * longo * 0o1/0o4, v * largho * 0o2/0o10, v * longo * 0o3/0o10, v * largho * 0o5/0o10);
        kunteksto.stroke();
      }
      kunteksto.strokeStyle = "rgba(50,66,44,0.45)";
      kunteksto.lineWidth = 1;
      kunteksto.beginPath(); kunteksto.moveTo(-longo * 0o32/0o100, largho * 0o5/0o10); kunteksto.lineTo(longo * 0o32/0o100, largho * 0o5/0o10); kunteksto.stroke();
      kunteksto.restore();
    };

    const koloroj = [ "#b0c098", "#b8c8a8", "#c8d0b0", "#98b088" ];
    const loboj = 0o16 + ( ( Math.random() * 0o4 ) | 0 );
    for ( let i = 0; i < loboj; i++ ) {
      const a = ( i / loboj + ( Math.random() - 0o5/0o10 ) * 0o1/0o10 ) * Math.PI * 2;
      desegniFolieton(a, s * ( 0o4/0o100 + Math.random() * 0o4/0o100 ), s * ( 0o5/0o100 + Math.random() * 0o4/0o100 ), s * ( 0o4/0o100 + Math.random() * 0o3/0o100 ), koloroj[i % koloroj.length]);
    }

    // Foliozaj apotecioj estas sur la supraĵoj kaj randoj de la folietoj. oranĝbrunaj
    // tasoj kun hela disko, ne nigraj punktoj enfositaj en la talo.
    const apotecioj = 0o10 + ( ( Math.random() * 0o6 ) | 0 );
    for ( let i = 0; i < apotecioj; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o5/0o100 + Math.random() * 0o11/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const rad = s * ( 0o10/0o2000 + Math.random() * 0o12/0o2000 );
      kunteksto.fillStyle = "rgba(82,56,38,0.8)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y + 1, rad * 0o12/0o10, rad * 0o7/0o10, 0, 0, Math.PI * 2); kunteksto.fill();
      kunteksto.fillStyle = i % 3 ? "#b87858" : "#a06848";
      kunteksto.beginPath(); kunteksto.ellipse(x, y, rad, rad * 0o6/0o10, 0, 0, Math.PI * 2); kunteksto.fill();
      kunteksto.fillStyle = "rgba(224,178,126,0.85)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y - 1, rad * 0o65/0o100, rad * 0o25/0o100, 0, 0, Math.PI * 2); kunteksto.fill();
    }
    // Soraliaj fendoj — palaj pulvoraj makuloj sur la foliaj loboj. Ili estas
    // neregulaj kaj ne regule distribuitaj kiel ornamaj punktoj.
    for ( let i = 0; i < 0o16; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o6/0o100 + Math.random() * 0o10/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const rad = s * ( 0o2/0o100 + Math.random() * 0o2/0o100 );
      neregulaFormo(kunteksto, x, y, rad, 0o4 + ( ( Math.random() * 0o3 ) | 0 ), 0o3/0o10, Math.random() * Math.PI * 2);
      kunteksto.fillStyle = "rgba(226,232,204,0.62)";
      kunteksto.fill();
      for ( let j = 0; j < 0o4; j++ ) {
        kunteksto.fillStyle = j % 2 ? "rgba(104,120,86,0.58)" : "rgba(246,244,220,0.72)";
        kunteksto.fillRect(x + ( Math.random() - 0o5/0o10 ) * rad, y + ( Math.random() - 0o5/0o10 ) * rad, 0o1 + Math.random() * 0o1, 0o1 + Math.random() * 0o1);
      }
    }

    // Rizinoj — maldikaj brunaj fadenoj sub la folia talo.
    kunteksto.strokeStyle = "rgba(74,70,52,0.48)"; kunteksto.lineWidth = 1;
    for ( let i = 0; i < 0o20; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * ( 0o14/0o100 + Math.random() * 0o10/0o100 );
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      kunteksto.beginPath(); kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + ( Math.random() - 0o5/0o10 ) * 0o6, y + 0o4, x + ( Math.random() - 0o5/0o10 ) * 0o10, y + 0o10); kunteksto.stroke();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// kreiByssoidanLikenanTeksajxon — Kreu proceduralan bisoidan likenan
// teksajxon. Mola lana nubo el interkovrantaj palaj kusenoj kun fajna fibra
// reto kaj malhelaj sporoj — la kotoneca, lana likeno. La alphaTest tranĉas
// la molajn randojn.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiByssoidanLikenanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const cx = s / 2, cy = s / 2;
    // Byssoida likeno estas maldensa, kotoneca reto de hifoj — ne aro da
    // rondaj kusenoj. Malhelaj bazoj lasas la substraton videbla inter la tufoj.
    const bazajKoloroj = [ "rgba(72,82,68,0.70)", "rgba(92,96,78,0.68)", "rgba(110,108,88,0.64)" ];
    const fibrajKoloroj = [ "rgba(220,220,198,0.82)", "rgba(194,198,174,0.78)", "rgba(154,164,136,0.72)", "rgba(238,232,204,0.76)" ];
    const tufoj: { x: number; y: number; r: number }[] = [];
    const tufojNombro = 0o10 + ( ( Math.random() * 0o6 ) | 0 );
    for ( let i = 0; i < tufojNombro; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const d = s * Math.random() * 0o3/0o100;
      const r = s * ( 0o4/0o100 + Math.random() * 0o3/0o100 );
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      tufoj.push({ x, y, r });
      // La bazaj areoloj estas iomete neregulaj kaj pli malhelaj ol la elstaraj
      // fibroj — la ombro interne de vera laneca tufo.
      neregulaFormo(kunteksto, x, y, r, 0o4 + ( ( Math.random() * 0o3 ) | 0 ), 0o2/0o10, Math.random() * Math.PI * 2);
      kunteksto.fillStyle = bazajKoloroj[i % bazajKoloroj.length];
      kunteksto.fill();
    }

    // Hifaj fadenoj — kurbaj, iomete branĉiĝantaj kaj diversdirektaj. La
    // malsamaj longoj kaj malhelaj bazoj faras la surfacon laneca anstataŭ plata.
    for ( const tufo of tufoj ) {
      const fibroj = 0o14 + ( ( Math.random() * 0o10 ) | 0 );
      for ( let i = 0; i < fibroj; i++ ) {
        const a = Math.random() * Math.PI * 2;
        const komencaR = tufo.r * ( 0o15/0o100 + Math.random() * 0o32/0o100 );
        const longo = tufo.r * ( 0o10/0o10 + Math.random() * 0o10/0o10 );
        const sx = tufo.x + Math.cos(a) * komencaR;
        const sy = tufo.y + Math.sin(a) * komencaR;
        const ex = tufo.x + Math.cos(a) * longo;
        const ey = tufo.y + Math.sin(a) * longo;
        const kurbo = ( Math.random() - 0o5/0o10 ) * tufo.r;
        const perpx = -Math.sin(a) * kurbo, perpy = Math.cos(a) * kurbo;
        kunteksto.strokeStyle = fibrajKoloroj[( i + tufoj.indexOf(tufo) ) % fibrajKoloroj.length];
        kunteksto.lineWidth = 0o1/0o2 + Math.random() * 0o1;
        kunteksto.lineCap = "round";
        kunteksto.beginPath();
        kunteksto.moveTo(sx, sy);
        kunteksto.quadraticCurveTo(( sx + ex ) / 2 + perpx, ( sy + ey ) / 2 + perpy, ex, ey);
        kunteksto.stroke();
        // Kelkaj fadenoj disforkiĝas ĉe la pinto — karakteriza por byssoida
        // talo, kie la hifoj ne finiĝas je samlongaj paralelaj strekoj.
        if ( i % 0o4 === 0 ) {
          const forkA = a + ( Math.random() - 0o5/0o10 ) * 0o3/0o10;
          const forkL = tufo.r * ( 0o4/0o10 + Math.random() * 0o5/0o10 );
          kunteksto.strokeStyle = fibrajKoloroj[( i + 1 ) % fibrajKoloroj.length];
          kunteksto.beginPath();
          kunteksto.moveTo(ex, ey);
          kunteksto.quadraticCurveTo(ex + Math.cos(forkA) * forkL * 0o4/0o10, ey + Math.sin(forkA) * forkL * 0o4/0o10,
            ex + Math.cos(forkA) * forkL, ey + Math.sin(forkA) * forkL);
          kunteksto.stroke();
        }
      }
    }

    // Soradioj kaj sporoj — etaj palaj pulvoregionoj kaj malhelaj punktoj, ne
    // grandaj rondaj makuloj. Ili aperas inter la fadenoj, kie la talo diseriĝas.
    for ( let i = 0; i < 0o100; i++ ) {
      const a = Math.random() * Math.PI * 2;
      const r = s * 0o15/0o100 * Math.sqrt(Math.random());
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      kunteksto.fillStyle = i % 0o3 ? "rgba(232,230,204,0.62)" : "rgba(72,76,64,0.58)";
      kunteksto.fillRect(x, y, 0o1 + Math.random() * 0o2, 0o1 + Math.random() * 0o2);
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// kreiPurpuranFolianTeksajxon — La folia teksajxo de la purpuraj laktukoj
// ( Ĥŝakŝlefo kaj Pussxlefo ).
//
// ⟨ La kanvasa proporcio 📃 ⟩ — la folia geometrio ( konstruiKurbanLaktukan-
// Folion ) estas 0o115/0o100 unuojn larĝa kaj 0o5/0o2 unuojn longa, do ~1:2.
// La antaŭa kanvaso estis KVADRATA ( 0o400 × 0o400 ), do la bildo estis
// streĉita duoble laŭ la longo kaj ĉiu makulo, vejno kaj poro montriĝis kiel
// longa vertikala streko. Nun la kanvaso estas 0o1000 × 0o2000 ( 512 × 1024 ):
// ~400 rastrumeroj po mondunuo en AMBAŬ direktoj, do la markoj estas ronaj.
//
// ⟨ La klinga profilo 📃 ⟩ — la UV-oj de la folia ebeno ne ŝanĝiĝas kiam la
// geometrio kurbiĝas, do la tekstura v-akso egalas la parametran t-on de la
// geometrio ( de la bazo ĝis la pinto ). La geometrio mallarĝigas la ebonon
// laŭ sin( π t ), do ĝia vera silueto estas tiu lenso. La antaŭa pentrita
// klingo estis nur ~68% de la geometria larĝo kaj havis sian propran
// bezier-formon, do la alfa-testo tranĉis la folion laŭ linio, kiu ne sekvis
// la geometrion — la vejnoj eliris tra la rando kaj la rando-resto de la
// geometrio estis tute senuzata. Nun la pentrita klingo estas ĜUSTE la
// geometria lenso ( duona larĝo 0.5 · w · sin( π y / h ) ), do la rando de la
// bildo kaj la rando de la geometrio koincidas.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiPurpuranFolianTeksajxon = sxovu((): THREE.CanvasTexture => {
  // ⟨ La bazkoloro de la folio 📃 ⟩ — la ombroj, la vejnaj sulkoj kaj la konturo
  // deriviĝas el ĉi tiu purpuro laŭ la stila regulo ( MainColor − n · 0x101010 ).
  const BAZO = 0xb868d0;
  const w = 0o1000, h = 0o2000;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, w, h);
    const cx = w / 2;
    // La duon-larĝo de la geometria silueto ĉe la bilda vico y. La kanvaso
    // estas renversita ( flipY ), do la folia bazo ( t = 0 ) estas ĉe la
    // MALSUpra rando kaj la pinto ( t = 1 ) ĉe la supra.
    const duono = ( y: number ): number => 0o1/0o2 * w * Math.sin(Math.PI * y / h);
    // klingo — la vojo de la folia silueto ( por la plenigo kaj la tondilo ).
    const klingo = (): void => {
      kunteksto.beginPath();
      for ( let y = 0; y <= h; y += 4 ) {
        if ( y === 0 ) kunteksto.moveTo(cx - duono(y), y);
        else kunteksto.lineTo(cx - duono(y), y);
      }
      for ( let y = h; y >= 0; y -= 4 ) kunteksto.lineTo(cx + duono(y), y);
      kunteksto.closePath();
    };

    // ⟨ Kiom grandaj estas la detaloj 📃 ⟩ — la KANVASO estas 0o1000 × 0o2000
    // por folio 0o11/0o10 × 0o5/0o2 mondunuoj, do unu rastrumero ≈ 0o5/0o40
    // Peu. La antaŭaj markoj ( vejnoj 2 rastrumeroj, areoloj 1, poroj 1 ) estis
    // do ~0o1/0o3 Peu en la mondo: ĝustaj por vera folio, sed sur ekrano ili
    // estas SUB-pikselaj kaj tute malaperas — la karno montriĝis GLATA,
    // unukolora klingo kun ripo. Nun ĉiu strukturo estas desegnita je 0o3–0o6%
    // de la folia larĝo ( 0o17–0o36 rastrumeroj
    // ), la skalo, kiun la okulo vere vidas sur la modelo. La koloroj ankaŭ
    // leviĝis iomete — laktuka folio estas suka kaj hela, ne malhela.
    //
    // 1. La karno — gradiento laŭ la longo: suka, hela bazo kaj profunde
    //    purpura pinto.
    const karno = kunteksto.createLinearGradient(0, h, 0, 0);
    karno.addColorStop(0, "#f0bcf4");
    karno.addColorStop(0.14, "#dc96e6");
    karno.addColorStop(0o1/0o2, "#bf6fd4");
    karno.addColorStop(0.82, "#9a4eae");
    karno.addColorStop(1, "#763486");
    klingo();
    kunteksto.fillStyle = karno;
    kunteksto.fill();

    // Ĉiuj detaloj restas EN la klingo — nenio elstaru preter la folia rando.
    kunteksto.save();
    klingo();
    kunteksto.clip();

    // 2. La faldoj — la folio ONDIĜAS: la centro de ĉiu longituda strio leviĝas
    //    kaj la sulkoj inter ili malleviĝas. Kvar molaj larĝaj bendoj laŭ la
    //    longo. Sen ili la klingo estas unu plata ebeno kun makuloj; kun ili ĝi
    //    legiĝas kiel karnofina folio eĉ kiam la makuloj ne videblas.
    for ( const f of [ { t: 0.20, l: 0.24, d: -1 }, { t: 0.42, l: 0.20, d: 1 },
      { t: 0.64, l: 0.20, d: -1 }, { t: 0.85, l: 0.18, d: 1 } ] ) {
      const sx = cx + ( f.t - 0o1/0o2 ) * w;
      const grad = kunteksto.createLinearGradient(sx - f.l * w, 0, sx + f.l * w, 0);
      const koloro = f.d > 0 ? "rgba(255,238,255,0.10)" : ombro(BAZO, 0o11, 0.16);
      grad.addColorStop(0, senAlfa(koloro));
      grad.addColorStop(0o1/0o2, koloro);
      grad.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = grad;
      kunteksto.fillRect(sx - f.l * w, 0, f.l * 2 * w, h);
    }

    // 3. La savoja vezikaro — la levitaj kaj mallevitaj areoloj de la krispa
    //    laktuka folio. Malpli multaj ol antaŭe, sed trioble pli grandaj kaj
    //    duoble pli fortaj: la krispa karno devas videbligi je la skalo de la
    //    modelo, ne de la botaniko.
    for ( let i = 0; i < 0o300; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const r = h * ( 0.008 + Math.random() * 0.022 );
      const hela = Math.random() < 0o1/0o2;
      const koloro = hela ? "rgba(255,238,255,0.10)" : ombro(BAZO, 0o11, 0.17);
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, senAlfa(koloro));
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }

    // 4. La meza ripo — levita, hela ripo kun malhelaj sulkoj ĉe la flankoj.
    //    Ĝi mallarĝiĝas de la bazo al la pinto, kiel la karnofina ripo de
    //    laktuko, kaj ĝi donas al la folio direkton.
    const ripo = ( y: number ): number => w * ( 0.030 - 0.022 * ( 1 - y / h ) );
    kunteksto.beginPath();
    kunteksto.moveTo(cx - ripo(h), h);
    kunteksto.quadraticCurveTo(cx - ripo(h * 0.45), h * 0.45, cx - ripo(0), 0);
    kunteksto.lineTo(cx + ripo(0), 0);
    kunteksto.quadraticCurveTo(cx + ripo(h * 0.45), h * 0.45, cx + ripo(h), h);
    kunteksto.closePath();
    const ripoGradiento = kunteksto.createLinearGradient(cx - w * 0o1/0o20, 0, cx + w * 0o1/0o20, 0);
    ripoGradiento.addColorStop(0, ombro(BAZO, 0o12, 0.52));
    ripoGradiento.addColorStop(0.32, ombro(BAZO, 0o10, 0.10));
    ripoGradiento.addColorStop(0o1/0o2, "rgba(255,244,255,0.46)");
    ripoGradiento.addColorStop(0.68, ombro(BAZO, 0o10, 0.10));
    ripoGradiento.addColorStop(1, ombro(BAZO, 0o12, 0.52));
    kunteksto.fillStyle = ripoGradiento;
    kunteksto.fill();

    // 5. La flankaj vejnoj — dek du paroj, kiuj eliras la mezan ripon,
    //    kurbiĝas eksteren kaj antaŭen kaj finiĝas antaŭ la folia rando.
    // ⟨ Kiom dikaj 📃 ⟩ — la antaŭaj vejnoj estis DU rastrumerojn dikaj sur
    //    512-unua kanvaso: ~0.5% de la folia larĝo, do nulo sur la ekrano. Nun
    //    ili estas dek duone pli dikaj ( 5–8 rastrumeroj ) kaj kun multe pli
    //    forta paro ( malhela vejno kaj hela reliefa rando super ĝi ), do la
    //    folio montras sian ripan skeleton — la plej klara folia signo.
    kunteksto.lineCap = "round";
    const VENOPAROJ = 0o14;
    const dikoV = h * 0.0075;
    for ( let i = 1; i <= VENOPAROJ; i++ ) {
      const t = i / ( VENOPAROJ + 1 );
      const y = h * ( 1 - t );
      const antauxen = h * ( 0.055 + 0.045 * t );
      const rando = duono(y - antauxen) * 0.86;
      for ( const dir of [ -1, 1 ] ) {
        kunteksto.strokeStyle = ombro(BAZO, 0o11, 0.52);
        kunteksto.lineWidth = dikoV;
        kunteksto.beginPath();
        kunteksto.moveTo(cx + dir * w * 0.014, y);
        kunteksto.quadraticCurveTo(cx + dir * rando * 0.55, y - antauxen * 0.35, cx + dir * rando, y - antauxen);
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(255,240,255,0.36)";
        kunteksto.lineWidth = dikoV * 0.55;
        kunteksto.beginPath();
        kunteksto.moveTo(cx + dir * w * 0.014, y - dikoV * 0.6);
        kunteksto.quadraticCurveTo(cx + dir * rando * 0.55, y - antauxen * 0.35 - dikoV * 0.6,
          cx + dir * rando, y - antauxen - dikoV * 0.6);
        kunteksto.stroke();
      }
    }

    // 6. La areola reto — mallongaj helaj kaj malhelaj streketoj inter la
    //    flankaj vejnoj: la pora, iomete sulka surfaco de la karnofina folio.
    //    Malpli multaj kaj pli longaj ol antaŭe ( la antaŭaj estis 3–10
    //    rastrumeroj ), kaj kun propraspeca diko, do ili legiĝas kiel la
    //    etaj retoj inter la vejnoj anstataŭ kiel bruo.
    kunteksto.lineWidth = h * 0.0035;
    for ( let i = 0; i < 0o500; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const l = h * ( 0.025 + Math.random() * 0.055 );
      kunteksto.strokeStyle = Math.random() < 0o1/0o2
        ? `rgba(255,240,255,${0.10 + Math.random() * 0.13})`
        : ombro(BAZO, 0o11, 0.11 + Math.random() * 0.14);
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.lineTo(x + ( Math.random() * 2 - 1 ) * l, y - l * ( 0.4 + Math.random() * 0.8 ));
      kunteksto.stroke();
    }
    // La poroj mem — malgrandaj kvadratoj, sed nun trioble pli grandaj.
    for ( let i = 0; i < 0o400; i++ ) {
      const y = Math.random() * h;
      const x = cx + ( Math.random() * 2 - 1 ) * duono(y);
      const l = h * 0.004 * ( 0.6 + Math.random() );
      kunteksto.fillStyle = Math.random() < 0o1/0o2
        ? ombro(BAZO, 0o6, 0.16 + Math.random() * 0.22)
        : `rgba(248,228,254,${0.16 + Math.random() * 0.22})`;
      kunteksto.fillRect(x, y, l, l);
    }

    // 7. La mola brilo laŭ la longo — la suka reflekto de la karnofina folio.
    const brilo = kunteksto.createLinearGradient(0, h, 0, 0);
    brilo.addColorStop(0, "rgba(255,240,255,0.16)");
    brilo.addColorStop(0o1/0o2, senAlfa("rgba(255,240,255,0.12)"));
    brilo.addColorStop(1, ombro(BAZO, 0o11, 0.20));
    kunteksto.fillStyle = brilo;
    kunteksto.fillRect(0, 0, w, h);

    // 8. La rando — mola malhela ombro internen ( la karno faldiĝas sub la
    //    rando ), kaj SUR ĝi hela marĝeno: la pala rando de brasiko. La rando
    //    estas la sola parto de la folio, kiu ĉiam videblas — ĝi estas la
    //    silueto — do ĝi portas la plej fortan kontraston de la bildo.
    kunteksto.strokeStyle = ombro(BAZO, 0o12, 0.52);
    kunteksto.lineWidth = h * 0.022;
    klingo();
    kunteksto.stroke();
    kunteksto.strokeStyle = "rgba(246,226,252,0.42)";
    kunteksto.lineWidth = h * 0.006;
    klingo();
    kunteksto.stroke();

    kunteksto.restore();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});

// ⟨ La ŝela skizo 📃 ⟩ — la kolor- kaj bump-teksajxoj de la ŝlefa trunko
// dividas la SAMAN skizon, do la reliefo akurate sekvas la koloron. La skizo
// generiĝas unufoje kaj ĉiuj hazardaj valoroj ( fendoj, platoj, makuloj )
// estas fiksitaj tiam.
//
// ⟨ Vertikala kiel la lariko 📃 ⟩ — la ŝlefa ŝelo portas la SAMAN vertikalan
// strukturon kiel la larika ( vidu generiLarikanSkizon ): profundaj vertikalaj
// fendoj kaj levitaj plato-kolonoj inter ili. La malnovaj horizontalaj
// folio-cikatroj kaj la 0o177 fajnaj REGULAJ vertikalaj fibroj forfalis — kune
// ili legiĝis kiel maŝine gravurita ondigita tubo, ne kiel ŝelo.
interface PuraSxelaFendo { x: number; y: number; longo: number; ondo: number; dikeco: number; tono: number; }

// PuraSxelaPlato — Unu levita ŝel-plato inter la fendoj. La larĝo KAJ la
// heleco apartenas al la skizo ( ne al la desegnilo ), ĉar la kolor- kaj la
// bump-teksajxo devas levi la SAMAN platon en la sama loko — kun la antaŭa
// Math.random() ene de la desegnilo la du bildoj ricevis malsamajn larĝojn.
interface PuraSxelaPlato { x: number; largho: number; hela: boolean; }
interface PuraSxelaMakulo { x: number; y: number; r: number; hela: boolean; }
interface PuraSxelaSkizo {
  fendoj: PuraSxelaFendo[]; platoj: PuraSxelaPlato[]; makuloj: PuraSxelaMakulo[];
}

// ⟨ La kanvasa proporcio 📃 ⟩ — la ŝlefa trunko mezuras ~1.5 unuojn ĉirkaŭe
// ( 2π × 0.24 ) kaj 8–19 unuojn alte, do la bildo devas esti multe pli alta ol
// larĝa por ke unu rastrumero signifu la saman longon en ambaŭ direktoj. La
// antaŭa kanvaso estis 32 × 128 — 0o100 × 0o2000 ( 128 × 1024 ) estas 16-oble
// pli densa kaj havas la ĝustan proporcion por la MEZA trunko ( ~85 rastrumeroj
// po mondunuo ĉirkaŭe kaj alta ). Kun 32 × 128 la bildo estis streĉita kaj ĉiu
// detalo smiriĝis en unuonan gradienton.
const puraSxelaW = 0o200, puraSxelaH = 0o2000;
let puraSxelaSkizo: PuraSxelaSkizo | null = null;

function generiPuranSxelanSkizon(): PuraSxelaSkizo {
  if ( puraSxelaSkizo ) return puraSxelaSkizo;
  const w = puraSxelaW, h = puraSxelaH;
  // ⟨ La profundaj fendoj 📃 ⟩ — klasikaj larik-stilaj vertikalaj sulkoj,
  // neregulaj laŭ la alto: iuj profundaj kaj malhelaj, iuj preskaŭ resaniĝintaj.
  // La sama skemo kiel la larika ŝelo, nur en la purpura paletro.
  const fendoj: PuraSxelaFendo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    fendoj.push({
      x: Math.random() * w,
      y: Math.random() * h,
      longo: 0o60 + Math.random() * 0o240,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1 + Math.random() * 0o3,
      tono: Math.random(),
    });
  }
  // ⟨ La levitaj platoj 📃 ⟩ — la helaj kaj malhelaj vertikalaj krestoj inter
  // la fendoj. Ili iras la TUTAN alton, do iu ajn vertikala tranĉaĵo ( ankaŭ la
  // mallonga de la kolumaj tasoj ) portas la saman vertikalan strukturon.
  // ⟨ Larĝo kaj tono en la skizo 📃 ⟩ — ambaŭ apartenas al la skizo, do la
  // reliefa teksajxo levas precize la samajn platojn kiel la koloro.
  const platoj: PuraSxelaPlato[] = [];
  for ( let i = 0; i < 0o24; i++ ) {
    platoj.push({
      x: Math.random() * w,
      largho: 0o2 + Math.random() * 0o6,
      hela: Math.random() < 0o1/0o2,
    });
  }
  // ⟨ La ton-nuboj sur REGULA krado 📃 ⟩ — anstataŭ 0o140 ( 96 ) hazarde
  // dismetitaj makuloj ( la dua fonto de la "kudrita" aspekto ) ili nun staras
  // sur krado de 0o4 kolumnoj × 0o30 vicoj; la kolumnoj de ĉiu dua vico estas
  // duonpaŝe ŝovitaj ( brika skemo ) kaj hela/malhela alternas, do la tonoj
  // ordiĝas sen legiĝi kiel tabelo.
  const makuloj: PuraSxelaMakulo[] = [];
  const kolumnoj = 0o4, vicoj = 0o30;
  for ( let j = 0; j < vicoj; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    makuloj.push({
      x: w * ( i + 0o1/0o2 + ( j % 2 === 0 ? 0o1/0o4 : -0o1/0o4 ) ) / kolumnoj,
      y: h * ( j + 0o1/0o2 ) / vicoj,
      r: h * 0.014,
      hela: ( i + j ) % 2 === 0,
    });
  }
  puraSxelaSkizo = { fendoj, platoj, makuloj };
  return puraSxelaSkizo;
}

// desegniSxelajnPorojn — La etaj poroj de la ŝela teksajxo, sur REGULA krado.
// La kolor-teksajxo kaj la reliefo vokas la saman helpilon, do la punktoj
// reliefas ĝuste tie, kie ili koloras. La krado estas centrita en la bildo kaj
// alternas hela/malhela kiel ŝak-tabulo — la antaŭaj hazarde disĵetitaj punktoj
// estis la plej videbla bruo de la teksajxo.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param r ( number ) - La radiuso de ĉiu poro.
//     @param malhela, hela ( string ) - La koloroj de la du alternaj poroj.
function desegniSxelajnPorojn(k: CanvasRenderingContext2D, r: number,
  malhela: string, hela: string): void {
  const w = puraSxelaW, h = puraSxelaH, PASO = 0o50;
  const kolumnoj = Math.floor(w / PASO), vicoj = Math.floor(h / PASO);
  const deX = ( w - kolumnoj * PASO ) / 2, deY = ( h - vicoj * PASO ) / 2;
  for ( let j = 0; j < vicoj; j++ ) for ( let i = 0; i < kolumnoj; i++ ) {
    const x = ( i + 0o1/0o2 ) * PASO + deX, y = ( j + 0o1/0o2 ) * PASO + deY;
    k.fillStyle = ( i + j ) % 2 === 0 ? malhela : hela;
    desegniWrapan(k, w, () => {
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 2); k.fill();
    });
  }
}

// ⟨ La koluma bando 📃 ⟩ — la SUPRA parto de la ŝela bildo ( de v =
// SXELA_KOLUMO_SUPRO ĝis la pinta rando v = 1 ), kie sidas la desegno de la
// kolumaj tasoj. La koluma materialo legas ĜUSTE ĉi tiun bandon ( vivu
// kreiSxelanRinganMaterialon: la klono ricevas offset.y = 1 − ripeto ), ĉar la
// tasoj sidas alte sur la trunko — do ĉio, kion oni vidas sur la konusoj de la
// laktukaj plantoj, estas desegnita ĉi-supre.
const SXELA_KOLUMO_SUPRO = 0o73/0o100;   // 59/64 ≈ 0.92 — la bando ekde ĉi tie
// ⟨ Ok skvamoj 📃 ⟩ — la sama nombro ĉirkaŭ la trunko kiel la loboj de la taso
// ( kvar ) multiplikita per du, por ke la desegno legiĝu kiel rondo da folioj
// kaj restu spegule simetria ĉirkaŭ la mezo de la bildo ( 8 estas para ).
// ⟨ Kial ok kaj ne kvar 📃 ⟩ — la kvar loboj de la taso sidas ĉe la anguloj
// u = 0, 0.25, 0.5 kaj 0.75 ( vidu konstruiSxelanRingon: la loboj venas el
// cos(4·ang) kaj la cilindra UV-kunordano estas ang/2π ). La skvamoj do SIDAS
// SUR tiuj anguloj — ĉiu loba angulo ricevas skvamon, kaj la kvar ceteraj
// plenigas la spacon inter ili, do la ŝkamo-rondo kaj la loboj legiĝas kiel
// unu simetria desegno.
const SXELA_KOLUMO_NOMBRO = 0o10;

// desegniLaSxelanKolumon — La desegno ĉe la supra rando de la ŝela bildo: la
// bando mem ( vertikala gradiento ) kaj vico da IDENTAJ, ALTaj foli-formaj
// skvamoj, kies pintoj finiĝas ĉe la pinta rando — tio estas ĉe la RANDO de la
// koluma taso. La kolor- kaj la relief-teksajxo vokas la saman helpilon, do la
// skvamoj reliefas ĝuste tie, kie ili koloras.
// ⟨ Rondaj finoj 📃 ⟩ — ĉiu skvamo portas centran vejnon desegnitan per
// lineCap "round", kaj la vejno estas malinsetita de ambaŭ finoj, do ĝi
// finiĝas per duoncirklo anstataŭ per tranĉitaj akraj anguloj. La skvamoj mem
// estas perfekte simetriaj: ĉiuj ok havas la saman grandecon kaj la samajn
// kurbojn, kaj la formo speguliĝas ĉirkaŭ sia propra mezo.
// ⟨ La tonalto de la bando 📃 ⟩ — la bando mem NE ŝanĝas la tonon de la ŝelo:
// ĝi portas nur la DESEGNON ( la foli-formajn skvamojn ) kaj preskaŭ NEŬTRALAN
// ombraron — iomete malhela ĉe la bazo de la taso kaj iomete hela ĉe ĝia rando,
// do la du partoj preskaŭ nuligas unu la alian kaj la bando legiĝas kiel la
// trunko mem plus desegno.
// ⟨ Kial ne plu lavo 📃 ⟩ — oni unue provis igi la bandon pli malhela per unu
// MALLUMIGA lavo ( la kolumoj estis tro helaj ), sed neniu unuopa lavo povas
// egali la trunkon ĉe ĉiu alto: la trunko mallumiĝas malsupren ( vidu la
// gradienton de kreiPurpuranSxelanTeksajxon ), dum la koluma materialo ĉiam
// legas la SAMAN bando ( la plej helan ). La tonalton nun egaligas la per-instanca
// koloro de ĉiu taso — vidu sxelaTrunkaKoloro kaj konstruiHxsxaksxlefojn.
// ⟨ Kie la ombraro sidas 📃 ⟩ — la koluma materialo ripetas la bildon 0.05
// vertikale ( vidu kreiSxelanRinganMaterialon: ripetoY = 0.05 ), do la MALSUPRO
// de la taso legas v = 0.95. La malhela fino mola finiĝas ĉe la rando de la
// bando ( v = 0.92, SUR LA TRUNKO ), por ke ĝi ne desegnu videblan horizontalan
// strion trans la ŝelon.
const SXELA_KOLUMO_BAZO = 0o1/0o20;   // = la vertikala ripeto de la koluma materialo
// ⟨ Kien la koluma bando legas 📃 ⟩ — la mezo de la bando kiel frakcio de la
// bilda alto. La per-instanca tonalto ( sxelaTrunkaKoloro ) mezuras ĉi tie, ĉar
// la bando estas tio, kion la kolumaj tasoj montras.
const SXELA_KOLUMO_MEZO = 0.96;
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param bando ( [ string, string ] ) - La ombraro ĉe la tasa bazo kaj ĉe la rando.
//     @param skvamo, vejno ( string ) - La koloroj de la skvamo kaj de ĝia vejno.
function desegniLaSxelanKolumon(k: CanvasRenderingContext2D,
  bando: [ string, string ], skvamo: string, vejno: string): void {
  const w = puraSxelaW, h = puraSxelaH;
  const pintoY = 0;
  const bazoY = h * ( 1 - SXELA_KOLUMO_SUPRO );
  const longo = bazoY - pintoY;
  // La gradiento kuras de la bando-malsupro ( y = bazoY ) supren al la rando
  // ( y = 0 ). La plej forta lavo staras ĉe la tasa bazo, do ni trovu, kiom de
  // la bando kuŝas sub ĝi: ( bazoY − h·0.05 ) / bazoY.
  const tasaBazo = 1 - h * SXELA_KOLUMO_BAZO / bazoY;
  const gradiento = k.createLinearGradient(0, bazoY, 0, pintoY);
  gradiento.addColorStop(0, senAlfa(bando[0]));   // la mola fino sur la trunko
  gradiento.addColorStop(tasaBazo, bando[0]);     // la malsupro de la taso
  gradiento.addColorStop(1, bando[1]);            // la rando de la taso
  k.fillStyle = gradiento;
  k.fillRect(0, pintoY, w, longo);
  const pasxo = w / SXELA_KOLUMO_NOMBRO;
  const duono = pasxo * 0o7/0o10;   // la skvamo okupas ~70% de la spaco
  for ( let i = 0; i < SXELA_KOLUMO_NOMBRO; i++ ) {
    // La centroj sidas ĜUSTE sur la lobaj anguloj ( 0, 0.25, 0.5, 0.75 … ),
    // do la unua skvamo estas tratranĉita de la rando de la bildo. Ĝi estas
    // desegnita tra la randa kunigilo ( desegniWrapan ), kiu kopias ĝin je ±w —
    // la du duonoj kuniĝas senkudre sur la taso.
    const cx = i * pasxo;
    desegniWrapan(k, w, () => {
      // La skvamo — ALTA folio: akra pinto ĉe la rando de la taso, larĝiĝanta
      // malsupren kaj finiĝanta per RONDA bazo.
      k.beginPath();
      k.moveTo(cx, pintoY);
      k.quadraticCurveTo(cx - duono, pintoY + longo * 0o4/0o10,
        cx - duono * 0o6/0o10, bazoY - longo * 0o1/0o10);
      k.quadraticCurveTo(cx - duono * 0o2/0o10, bazoY, cx, bazoY);
      k.quadraticCurveTo(cx + duono * 0o2/0o10, bazoY,
        cx + duono * 0o6/0o10, bazoY - longo * 0o1/0o10);
      k.quadraticCurveTo(cx + duono, pintoY + longo * 0o4/0o10, cx, pintoY);
      k.closePath();
      k.fillStyle = skvamo;
      k.fill();
      // La vejno — vertikala linio kun RONDAJ finoj, malinsetita de la pinto kaj
      // de la bazo, do ĝiaj finaj duoncirkloj videblas.
      k.lineCap = "round";
      k.lineWidth = Math.max(1, duono * 0o3/0o10);
      k.strokeStyle = vejno;
      k.beginPath();
      k.moveTo(cx, bazoY - k.lineWidth * 2);
      k.lineTo(cx, pintoY + k.lineWidth * 3);
      k.stroke();
    });
  }
}

// ⟨ La trunka baza gradiento kiel datumoj 📃 ⟩ — la kvar haltoj de la vertikala
// gradiento, kiun la ŝela kolor-teksajxo pentras. Ili vivas ĉi tie kiel nombroj,
// ĉar la KOLUMAJ TASOJ bezonas la samajn valorojn: taso devas havi la saman tonon
// kiel la trunko ĉe sia propra alto, kaj tiu tono dependas de la alto ( vidu
// sxelaTrunkaKoloro ). Se vi ŝanĝas la gradienton, ŝanĝu ĝin ĉi tie — la pentrado
// kaj la tasoj legas ambaŭ ĉi tiun tabelon.
const SXELA_BAZAJ_HALTOJ: [ number, [ number, number, number ] ][] = [
  [ 0, [ 0x38, 0x20, 0x3e ] ],
  [ 0.35, [ 0x4c, 0x2c, 0x54 ] ],
  [ 0.72, [ 0x5e, 0x3a, 0x60 ] ],
  [ 1, [ 0x6e, 0x46, 0x6a ] ],
];
// liniejo — Unu sRGB-kanalo ( 0–255 ) kiel linia valoro ( 0–1 ). Three.js
// multiplikas la teksturon per la instanca koloro en la LINIA spaco, do ĉiu
// rilatumo devas esti kalkulita linie — alie la malhelaj tonoj malhelas tro.
function liniejo(kanalo: number): number {
  const c = kanalo / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow(( c + 0.055 ) / 1.055, 2.4);
}
// sxelaTrunkaKoloro — La tono de la ŝela trunko ĉe la frakcio t de sia alto
// ( 0 = la bazo, 1 = la pinto ), en la LINIA spaco — uzebla rekte kiel per-instanca
// koloro por la kolumaj tasoj.
// ⟨ Kial la tasoj bezonas ĝin 📃 ⟩ — la koluma materialo ĉiam legas la SAMAN
// bandon de la bildo ( la plej helan, en kiu sidas la koluma desegno ), do ĉiu
// taso havus la plej supran tonon de la trunko — ankaŭ la tasoj malalte sur la
// ŝelo. Kun ĉi tiu funkcio ĉiu taso ricevas la tonon de la trunko ĉe sia propra
// alto, do la tasoj kaj la trunko transiras senkude ĉe ĉiu nivelo.
//     @param t ( number ) - La frakcio de la trunka alto ( 0 malsupre, 1 supre ).
//     @returns koloro ( [ number, number, number ] ) - La linia RGB.
function sxelaBazaKoloro(t: number): [ number, number, number ] {
  const f = Math.min(1, Math.max(0, t));
  for ( let i = 1; i < SXELA_BAZAJ_HALTOJ.length; i++ ) {
    const [ t1, k1 ] = SXELA_BAZAJ_HALTOJ[i];
    if ( f <= t1 ) {
      const [ t0, k0 ] = SXELA_BAZAJ_HALTOJ[i - 1];
      const u = ( f - t0 ) / ( t1 - t0 );
      return [ k0[0] + ( k1[0] - k0[0] ) * u,
        k0[1] + ( k1[1] - k0[1] ) * u,
        k0[2] + ( k1[2] - k0[2] ) * u ];
    }
  }
  const lasta = SXELA_BAZAJ_HALTOJ[SXELA_BAZAJ_HALTOJ.length - 1][1];
  return [ lasta[0], lasta[1], lasta[2] ];
}
export function sxelaTrunkaKoloro(t: number): [ number, number, number ] {
  const s = sxelaBazaKoloro(t);
  return [ liniejo(s[0]), liniejo(s[1]), liniejo(s[2]) ];
}
// sxelaKolumKoloro — La tono, kiun la kolumaj tasoj mem montras, en la linia
// spaco: la mezo de la koluma bando. La rilatumo inter la du donas la per-instancan
// koloron de unu taso ( vidu konstruiHxsxaksxlefojn ).
//     @returns koloro ( [ number, number, number ] ) - La linia RGB de la bando.
export function sxelaKolumKoloro(): [ number, number, number ] {
  const s = sxelaBazaKoloro(SXELA_KOLUMO_MEZO);
  return [ liniejo(s[0]), liniejo(s[1]), liniejo(s[2]) ];
}

// kreiPurpuranSxelanTeksajxon — La ŝela teksajxo de la ŝlefa trunko KAJ de la
// ŝelaj kolumoj ( konstruiSxelanRingon ). Vertikala transiro de la malhela
// trunka koloro ĉe la bazo al la pli hela supro.
//
// ⟨ La direkto de la bildo 📃 ⟩ — la UV-oj de la cilindro ne renversiĝas
// ( flipY ) — la kanvasa SUpro mapiĝas al la v = 1, tio estas al la trunka
// supro kaj al la rando de la koluma taso. La antaŭa komento diris la
// malon kaj la gradiento kuris dorsdirekte: la trunko estis plej hela ĉe la
// bazo kaj la kolumo havis malhelan RANDON anstataŭ malhelan bazon. Nun la
// kanvasa malsupro ( v = 0 ) estas la plej malhela — la trunka bazo kaj la
// fundo de la kolumo estas malhelaj kaj ili heliĝas supren.
//
// La horizontalaj randaj kolumnoj TILAS ( la cilindro fermas sin ), do ĉiu
// marko desegniĝas tra la randa kunigilo ( desegniWrapan ) — sen ĝi la
// vertikala kudro de la trunko videblus.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiPurpuranSxelanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = puraSxelaW, h = puraSxelaH;
  const teksajxo = kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    // 1. La baza tonalto — malhela ĉe la malsupro ( la trunka bazo ), pli hela
    //    supren. Unu rastrumero estas ~0.014 mondunuoj, do la gradiento restas
    //    mola tra la tuta trunko.
    // ⟨ La tonalto plialtiĝis 📃 ⟩ — la antaŭa gradiento iris de #321c38 al
    // #5e395c, do ĝi kovris nur 44 nivelojn da heleco: la trunko montriĝis
    // preskaŭ nigra, kaj la fendoj kaj la platoj — kiuj estas desegnitaj per
    // alfoj sub 0.3 — tute perdiĝis en ĝi. La bazo restas malhela ( ĝi estas la
    // ombro sub la folioj ), sed la supraĵo leviĝas, kaj ĉiuj markoj sube
    // ricevis pli fortan kontraston.
    // ⟨ La haltoj vivas en tabelo 📃 ⟩ — la sama gradiento estas DATUMO
    // ( SXELA_BAZAJ_HALTOJ ), ĉar la kolumaj tasoj bezonas la samajn valorojn por
    // kongrui al la trunko ĉe ĉiu alto ( vidu sxelaTrunkaKoloro ).
    const gradiento = kunteksto.createLinearGradient(0, h, 0, 0);
    for ( const [ frakcio, koloro ] of SXELA_BAZAJ_HALTOJ )
      gradiento.addColorStop(frakcio, `rgb(${koloro[0]},${koloro[1]},${koloro[2]})`);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);

    const skizo = generiPuranSxelanSkizon();

    // 2. La molaj ton-nuboj — la ŝelo ne estas plata.
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(178,128,186,0.13)" : "rgba(24,10,30,0.12)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, senAlfa(koloro));
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }

    // 3. La levitaj ŝelaj platoj — la vertikalaj krestoj inter la fendoj. Ili
    //    alternas hela kaj malhela, do la ŝelo legiĝas kiel larika platoŝelo
    //    anstataŭ kiel ebena tubo de ringoj.
    // ⟨ Vertikala, sed ne striita 📃 ⟩ — la platoj estas NEREGULAJ laŭ larĝo kaj
    // tono; la antaŭaj 0o177 egalaj fibroj legiĝis kiel maŝine gravuritaj strioj,
    // dum vera ŝelo havas platojn de malsamaj grandoj kun fendoj inter ili.
    // ⟨ Mola lumo trans ĉiu plato 📃 ⟩ — antaŭe ĉiu plato estis egala rektangulo
    // kun akraj randoj, do la ŝelo legiĝis kiel pentritaj strioj. Nun horizontala
    // gradiento mallumigas ambaŭ randojn de la plato kaj lumigas ĝian centron,
    // do la bendo legiĝas kiel RONDA kresto.
    for ( const plato of skizo.platoj ) {
      const pinto = plato.hela
        ? `rgba(158,110,166,${0o13/0o100 + Math.random() * 0o7/0o100})`
        : `rgba(20,8,28,${0o15/0o100 + Math.random() * 0o7/0o100})`;
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(plato.x, 0, plato.x + plato.largho, 0);
        g.addColorStop(0, senAlfa(pinto));
        g.addColorStop(0o1/0o2, pinto);
        g.addColorStop(1, senAlfa(pinto));
        kunteksto.fillStyle = g;
        kunteksto.fillRect(plato.x, 0, plato.largho, h);
      });
    }

    // 4. La profundaj vertikalaj fendoj — larik-stilaj sulkoj kun pli malhela
    //    kerno. Ĉiu fendo svingiĝas mola s-kurbo ( desegniStrion ), do la ŝelo
    //    legiĝas kiel FENDITA ŝelo, ne kiel vertikale striita tubo.
    kunteksto.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o1/0o2 ? "rgba(92,48,106,0.42)" : "rgba(26,10,34,0.48)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o1/0o2);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, korpo);
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(14,4,20,0.55)");
      });
    }

    // 5. La etaj poroj — la ŝela punktaĵo, kiu rompas la grandajn ebenojn.
    desegniSxelajnPorojn(kunteksto, 0o3/0o2, "rgba(20,8,24,0.11)", "rgba(176,138,180,0.10)");

    // 6. La KOLUMA BANDO — la desegno de la konusoj ( vidu
    //    desegniLaSxelanKolumon ). Ĝi venas LASTe, do ĝi kovras la fendojn kaj la
    //    platojn en sia bando: la konusoj montras la foli-forman skvamaron, ne
    //    tranĉitajn striojn de la trunka ŝelo.
    //    ⟨ Preskaŭ neŭtrala 📃 ⟩ — la ombraro malsupre malheligas 9%, la heliĝo
    //    ĉe la rando 7%, do la bando averaĝe kongruas la trunkon, kaj la skvamoj
    //    kaj la vejnoj estas MALLUMIGAJ ( ili markas la sulkojn inter la folioj )
    //    anstataŭ heligi la tutan bandon. Antaŭe la skvamoj kaj la vejnoj estis
    //    helaj ( 32% kaj 22% da hela purpuro ), do ili HELigis la bandon kaj la
    //    konusoj aspektis kiel lumaj tasoj sur malhela trunko.
    desegniLaSxelanKolumon(kunteksto,
      [ "rgba(14,6,20,0.09)", "rgba(255,248,255,0.07)" ],
      "rgba(18,8,24,0.12)", "rgba(30,14,38,0.20)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping });
  // La bildo TILAS horizontale ( la cilindro fermas sin ) sed NE vertikale: la
  // vertikala gradiento devas resti unu, kaj la kolumaj tasoj legas nur
  // malgrandan parton de la malsupro ( vidu la ripeton en la koluma materialo ).
  teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  return teksajxo;
});

// kreiPurpuranSxelanBumpanTeksajxon — Griznivela reliefo por la sama ŝelo. La
// SAMA skizo kiel la kolor-teksajxo, do la fendoj, la platoj kaj la makuloj
// reliefas ĝuste tie, kie ili koloras. La fendoj estas profundaj sulkoj kun eĉ
// pli malhela kerno kaj la platoj estas la levitaj krestoj inter ili — la sama
// vertikala reliefo kiel la larika ŝelo.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta reliefo.
export const kreiPurpuranSxelanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = puraSxelaW, h = puraSxelaH;
  const teksajxo = kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080";
    kunteksto.fillRect(0, 0, w, h);
    const skizo = generiPuranSxelanSkizon();
    // Mola grand-skala reliefo — la ŝelo ne estas plata.
    for ( const makulo of skizo.makuloj ) {
      const koloro = makulo.hela ? "rgba(158,158,158,0.12)" : "rgba(74,74,74,0.12)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(makulo.x, makulo.y, 0, makulo.x, makulo.y, makulo.r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(makulo.x, makulo.y, makulo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    // La levitaj platoj — helaj vertikalaj krestoj, kun la sama mola lumo trans
    // la plato kiel en la kolor-teksajxo, do la reliefo ne havas akrajn randojn.
    for ( const plato of skizo.platoj ) {
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createLinearGradient(plato.x, 0, plato.x + plato.largho, 0);
        g.addColorStop(0, "rgba(128,128,128,0)");
        g.addColorStop(0o1/0o2, plato.hela ? "rgba(158,158,158,0.45)" : "rgba(116,116,116,0.35)");
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.fillRect(plato.x, 0, plato.largho, h);
      });
    }
    // La profundaj fendoj — sulkoj kun eĉ pli malhela kerno.
    kunteksto.lineCap = "round";
    for ( const fendo of skizo.fendoj ) {
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(kunteksto, w, () => {
        desegniStrion(kunteksto, fendo, "rgba(120,120,120,0.50)");
        desegniStrion(kunteksto, { ...fendo, dikeco: kernDikeco }, "rgba(86,86,86,0.70)");
      });
    }
    desegniSxelajnPorojn(kunteksto, 0o3/0o2, "rgba(72,72,72,0.16)", "rgba(168,168,168,0.15)");
    // La koluma bando ankaŭ reliefas — la skvamoj leviĝas kaj iliaj vejnoj
    // sinkas, do la konusoj havas la saman skvamaron en la reliefo.
    desegniLaSxelanKolumon(kunteksto,
      [ "rgba(112,112,112,0.14)", "rgba(128,128,128,0)" ],
      "rgba(152,152,152,0.38)", "rgba(100,100,100,0.50)");
  }, [ 1, 1 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
  teksajxo.wrapT = THREE.ClampToEdgeWrapping;
  return teksajxo;
});

// Purpura filika trunka skizo — la kolor- kaj bump-teksajxoj dividas la
// SAMAN skizon, por ke la reliefo akurate sekvu la koloron. La skizo
// generiĝas unufoje — la frond-cikatriĉoj, fibraj strioj kaj skvamoj estas
// fiksitaj ĉe la generado, do ambaŭ teksajxoj kongruas.
//     @returns skizo ( PurpuraTrunkaSkizo ) - La komuna skizo.
interface PurpuraTrunkaBendo {
  y: number; alto: number; sago: number; fazo: number; cikloj: [ number, number ];
}

interface PurpuraTrunkaFibro {
  x: number; tono: number;
}

interface PurpuraTrunkaSkvamo {
  x: number; y: number; r: number; hela: boolean;
}

interface PurpuraTrunkaSkizo {
  bendoj: PurpuraTrunkaBendo[];
  fibroj: PurpuraTrunkaFibro[];
  skvamoj: PurpuraTrunkaSkvamo[];
}

const purpuraTrunkaW = 0o200, purpuraTrunkaH = 0o400;
let purpuraTrunkaSkizo: PurpuraTrunkaSkizo | null = null;

function generiPurpuranTrunkanSkizon(): PurpuraTrunkaSkizo {
  if ( purpuraTrunkaSkizo ) return purpuraTrunkaSkizo;
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  // Frond-cikatriĉoj — la horizontalaj ringoj kie frondoj forfalis. Ili
  // restas en la meza zono de la kahelo, por ke la vertikala kudro ( la
  // kahelo ripetas 2× ) restu sen interrompo.
  const bendoj: PurpuraTrunkaBendo[] = [];
  for ( let i = 0; i < 0o6; i++ ) {
    bendoj.push({
      y: h * ( 0o14/0o100 + i * 0o11/0o100 + Math.random() * 0o3/0o100 ),
      alto: 0o4 + Math.random() * 0o4,
      sago: 1 + Math.random() * 0o2,
      fazo: Math.random() * Math.PI * 2,
      cikloj: [ 0o2 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o3 ) | 0 ) ],
    });
  }
  const fibroj: PurpuraTrunkaFibro[] = [];
  for ( let i = 0; i < 0o20; i++ ) fibroj.push({ x: Math.random() * w, tono: Math.random() });
  const skvamoj: PurpuraTrunkaSkvamo[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    skvamoj.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 0o2, hela: Math.random() < 0o5/0o10 });
  }
  purpuraTrunkaSkizo = { bendoj, fibroj, skvamoj };
  return purpuraTrunkaSkizo;
}

// desegniPurpuranBendon — Desegnu unu horizontalan frond-cikatriĉan bendon
// kun ondigitaj randoj. La cikloj estas entjeraj, do la randoj kongruas ĉe
// la kahelaj randoj kaj la bendo ĉirkaŭvolvas la trunkon senkudre.
//     @param k ( CanvasRenderingContext2D ) - La kunteksto.
//     @param bendo ( PurpuraTrunkaBendo ) - La bendo-skizo.
//     @param koloro ( string ) - La pleniga koloro.
function desegniPurpuranBendon(k: CanvasRenderingContext2D, bendo: PurpuraTrunkaBendo, koloro: string): void {
  const pasoj = 0o100, paso = purpuraTrunkaW / pasoj;
  const punktoj: number[] = [];
  const [ n1, n2 ] = bendo.cikloj;
  for ( let i = 0; i <= pasoj; i++ ) {
    const t = i / pasoj * Math.PI * 2;
    punktoj.push(bendo.sago * ( Math.sin(t * n1 + bendo.fazo) * 0o6/0o10 + Math.sin(t * n2 + bendo.fazo * 0o17/0o10) * 0o4/0o10 ));
  }
  k.beginPath();
  k.moveTo(0, bendo.y + punktoj[0]);
  for ( let i = 1; i <= pasoj; i++ ) k.lineTo(i * paso, bendo.y + punktoj[i]);
  for ( let i = pasoj; i >= 0; i-- ) k.lineTo(i * paso, bendo.y + bendo.alto + punktoj[i]);
  k.closePath();
  k.fillStyle = koloro;
  k.fill();
}

// kreiPurpuranTrunkanTeksajxon — Kreu la trunk-teksajxon por la arboforma
// purpura filiko. Malhelpurpura ŝelo kun vertikalaj fibraj strioj,
// horizontalaj frond-cikatriĉoj ( malhelaj sulkoj kun helaj krestoj ) kaj
// fajna skvama kruciĝo — la trunketo de arba filiko. La kahelo ripetas 2×
// vertikale, do la ringoj aperas dufoje laŭ la trunka alto.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiPurpuranTrunkanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  return kreiKanvasanTeksajxon(w, h, ( k ) => {
    // Bazo — malhela purpura ŝelo.
    k.fillStyle = "#282038"; k.fillRect(0, 0, w, h);
    // Mola ton-variajo — helaj kaj malhelaj nuboj rompas la platan bazon.
    desegniWrapajnNubojn(k, w, h, 0o14,
      [ "rgba(72,64,88,0.20)", "rgba(16,12,24,0.18)", "rgba(88,80,104,0.14)" ],
      0o10/0o100, 0o14/0o100);
    const skizo = generiPurpuranTrunkanSkizon();
    // Vertikalaj fibraj strioj — la ŝelaj fibroj, lume kaj malhelume.
    for ( const fibro of skizo.fibroj ) {
      const koloro = fibro.tono < 0o5/0o10
        ? `rgba(96,88,112,${0o1/0o10 + Math.random() * 0o1/0o10})`
        : `rgba(16,12,24,${0o1/0o10 + Math.random() * 0o1/0o10})`;
      desegniWrapan(k, w, () => {
        k.strokeStyle = koloro;
        k.lineWidth = 1;
        k.lineCap = "round";
        k.beginPath();
        k.moveTo(fibro.x, 0);
        k.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        k.stroke();
      });
    }
    // Frond-cikatriĉoj — malhelaj sulkoj kun hela kresto sube.
    for ( const bendo of skizo.bendoj ) {
      desegniPurpuranBendon(k, bendo, "#181018");
      desegniPurpuranBendon(k, { ...bendo, y: bendo.y + bendo.alto }, "rgba(88,80,104,0.30)");
    }
    // Skvama kruciĝo — fajna reto de diagonalaj linioj, kiel la stipo-bazoj
    // de la falintaj frondoj.
    for ( const skvamo of skizo.skvamoj ) {
      const koloro = skvamo.hela ? "rgba(104,96,128,0.16)" : "rgba(8,8,16,0.18)";
      desegniWrapan(k, w, () => {
        const l = skvamo.r * 0o6;
        k.strokeStyle = koloro;
        k.lineWidth = 1;
        k.beginPath();
        k.moveTo(skvamo.x - l, skvamo.y - l * 0o3/0o10);
        k.lineTo(skvamo.x + l, skvamo.y + l * 0o3/0o10);
        k.moveTo(skvamo.x - l, skvamo.y + l * 0o3/0o10);
        k.lineTo(skvamo.x + l, skvamo.y - l * 0o3/0o10);
        k.stroke();
      });
    }
    // Malgrandaj malhelaj poroj — la ŝela punktado.
    for ( const skvamo of skizo.skvamoj ) {
      desegniWrapan(k, w, () => {
        k.fillStyle = "rgba(16,12,24,0.4)";
        k.beginPath(); k.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); k.fill();
      });
    }
  }, [ 1, 2 ]);
});

// kreiPurpuranTrunkanBumpanTeksajxon — Griznivela reliefa teksajxo por la
// purpura filika trunko. La SAMA skizo kiel la kolor-teksajxo, do la
// reliefo akurate sekvas la koloron. La frond-cikatriĉoj estas sulkoj kun
// helaj krestoj, la fibraj strioj kaj skvamoj donas malglatan reliefon.
// Bump-teksajxoj restas en lineara koloro.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export const kreiPurpuranTrunkanBumpanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const w = purpuraTrunkaW, h = purpuraTrunkaH;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    kunteksto.fillStyle = "#808080"; kunteksto.fillRect(0, 0, w, h);
    const skizo = generiPurpuranTrunkanSkizon();
    // Mola grand-skala reliefo — la ŝelo ne estas plata.
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 2 ? "rgba(144,144,144,0.16)" : "rgba(72,72,72,0.16)";
      desegniWrapan(kunteksto, w, () => {
        const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, koloro);
        g.addColorStop(1, "rgba(128,128,128,0)");
        kunteksto.fillStyle = g;
        kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
    // Frond-cikatriĉoj — malhelaj sulkoj kun helaj krestoj.
    for ( const bendo of skizo.bendoj ) {
      desegniPurpuranBendon(kunteksto, bendo, "rgba(86,86,86,0.6)");
      desegniPurpuranBendon(kunteksto, { ...bendo, y: bendo.y + bendo.alto }, "rgba(152,152,152,0.45)");
    }
    // Vertikalaj fibraj strioj.
    for ( const fibro of skizo.fibroj ) {
      const koloro = fibro.tono < 0o5/0o10 ? "rgba(152,152,152,0.25)" : "rgba(96,96,96,0.25)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.strokeStyle = koloro;
        kunteksto.lineWidth = 1;
        kunteksto.lineCap = "round";
        kunteksto.beginPath();
        kunteksto.moveTo(fibro.x, 0);
        kunteksto.quadraticCurveTo(fibro.x + 0o2, h * 0o4/0o10, fibro.x - 0o2, h);
        kunteksto.stroke();
      });
    }
    // Skvamoj — malgrandaj krestetoj.
    for ( const skvamo of skizo.skvamoj ) {
      const koloro = skvamo.hela ? "rgba(152,152,152,0.35)" : "rgba(94,94,94,0.40)";
      desegniWrapan(kunteksto, w, () => {
        kunteksto.fillStyle = koloro;
        kunteksto.beginPath(); kunteksto.arc(skvamo.x, skvamo.y, skvamo.r, 0, Math.PI * 2); kunteksto.fill();
      });
    }
  }, [ 1, 2 ], { volvado: THREE.RepeatWrapping, sRGB: false, anisotropio: 4 });
});


