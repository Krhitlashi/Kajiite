// Tekstura modulo — proceduraj kanvasaj teksturoj por la urba sperto
import * as THREE from "three";

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
      g.addColorStop(1, "rgba(0,0,0,0)");
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
const sxelaW = 0o400, sxelaH = 0o1000;

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
  const aroj = 0o32; // 26 horizontalaj aroj da lenticeloj
  for ( let a = 0; a < aroj; a++ ) {
    const ax = Math.random() * sxelaW, ay = Math.random() * sxelaH;
    const kresko = 0o7/0o10 + ( ay / sxelaH ) * 0o6/0o10;
    const nombro = 0o4 + ( ( Math.random() * 0o7 ) | 0 ); // 4–10 po aro
    for ( let i = 0; i < nombro; i++ ) {
      const y = Math.min(Math.max(ay + ( Math.random() - 0o4/0o10 ) * 0o40, 0), sxelaH);
      lenticeloj.push({
        x: ax + ( Math.random() - 0o4/0o10 ) * 0o20,
        y,
        longo: ( 0o4 + Math.random() * 0o40 ) * kresko,
        dikeco: 0o1 + Math.random() * 0o1 + y / sxelaH,
        kurbo: ( Math.random() - 0o4/0o10 ) * 0o3,
        angulo: ( Math.random() - 0o4/0o10 ) * 0o2/0o10,
      });
    }
  }
  const strioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o20; i++ ) {
    strioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o100 + Math.random() * 0o300,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o6,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  const helajStrioj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o10; i++ ) {
    helajStrioj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o300 + Math.random() * 0o470,
      ondo: ( Math.random() - 0o5/0o10 ) * 0o10,
      dikeco: 1 + Math.random() * 0o2,
    });
  }
  // Fajnaj horizontalaj ondoj — la transversaj sulkoj de la sxoelo.
  const horizontajoj: BetulaStrio[] = [];
  for ( let i = 0; i < 0o110; i++ ) {
    horizontajoj.push({
      x: Math.random() * sxelaW,
      y: Math.random() * sxelaH,
      longo: 0o40 + Math.random() * 0o110,
      ondo: ( Math.random() - 0o4/0o10 ) * 0o3,
      dikeco: 1,
    });
  }
  // Senŝeliĝaj bendoj — pli multaj kaj pli grandaj al la malsupro, kie la
  // malnova sxoelo estas pli disŝirita ( √ de la hazardo klinas ilin suben ).
  // Malmultaj kaj maldikaj. la blanko restu la domina koloro de la trunko.
  // La y estas alklampita por ke neniu bendo transiru la malsupran randon kaj
  // ĉirkaŭvolvu al la supro de la trunko.
  const sxelighoj: BetulaSxeligho[] = [];
  for ( let i = 0; i < 0o3; i++ ) {
    const y0 = sxelaH * ( 1 - Math.pow(Math.random(), 0o3/0o2) );
    const maljuneco = y0 / sxelaH;
    const alto = ( 0o10 + Math.random() * 0o16 ) * ( 0o7/0o10 + maljuneco * 0o5/0o10 );
    sxelighoj.push({
      y: Math.min(y0, sxelaH - alto - 0o10),
      alto,
      sago: 0o3 + Math.random() * 0o4,
      kurbaAlto: 0o4 + Math.random() * 0o3,
      cikloj: [ 0o3 + ( ( Math.random() * 0o3 ) | 0 ), 0o4 + ( ( Math.random() * 0o4 ) | 0 ) ],
      fazo: Math.random() * Math.PI * 2,
      malhelo: 0o35/0o100 + maljuneco * 0o25/0o100,
    });
  }
  // Cikatroj — malgrandaj neregulaj vundoj, pli oftaj al la malsupro.
  const cikatroj: BetulaCikatro[] = [];
  for ( let i = 0; i < 0o14; i++ ) {
    const radiaj: number[] = [];
    for ( let v = 0; v < 0o6; v++ ) radiaj.push(0o7/0o10 + Math.random() * 0o6/0o10);
    cikatroj.push({
      x: Math.random() * sxelaW,
      y: sxelaH * ( 0o6/0o10 + Math.random() * 0o4/0o10 ),
      r: 0o2 + Math.random() * 0o4,
      angulo: Math.random() * Math.PI,
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
    const x = Math.cos(t) * r, y = Math.sin(t) * r * 0o6/0o10;
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
    for ( const lent of skizo.lenticeloj ) {
      const maljuneco = lent.y / sxelaH;
      const koloro = `rgba(26,23,19,${0o45/0o100 + maljuneco * 0o35/0o100})`;
      desegniWrapan(k, sxelaW, () => { desegniLenticelon(k, lent, koloro); });
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
    // Malsupra vetera lavo — la trunka bazo estas pli griza kaj ombrita.
    const lavo = k.createLinearGradient(0, sxelaH * 0o6/0o10, 0, sxelaH);
    lavo.addColorStop(0, "rgba(168,164,152,0)");
    lavo.addColorStop(1, "rgba(150,146,136,0.16)");
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

interface LarikaMakulo {
  x: number; y: number; r: number; hela: boolean;
}

interface LarikaSkizo {
  fendoj: LarikaFendo[];
  platoj: LarikaPlato[];
  makuloj: LarikaMakulo[];
  kolonoj: number[];
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
  const kolonoj: number[] = [];
  for ( let i = 0; i < 0o14; i++ ) kolonoj.push(Math.random() * w);
  larikaSkizo = { fendoj, platoj, makuloj, kolonoj };
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
    // Leviĝantaj plato-kolonoj — la helaj kaj malhelaj krestoj inter la fendoj.
    for ( const cx of skizo.kolonoj ) {
      const wd = 0o2 + Math.random() * 0o4;
      const koloro = Math.random() < 0o5/0o10
        ? `rgba(168,158,144,${0o15/0o100 + Math.random() * 0o1/0o10})`
        : `rgba(64,56,48,${0o15/0o100 + Math.random() * 0o1/0o10})`;
      desegniWrapan(k, w, () => {
        k.fillStyle = koloro;
        k.fillRect(cx, 0, wd, h);
      });
    }
    // Profundaj vertikalaj fendoj — ruĝbrunaj sulkoj kun malhela kerno.
    for ( const fendo of skizo.fendoj ) {
      const korpo = fendo.tono < 0o5/0o10 ? "rgba(128,82,56,0.45)" : "rgba(70,50,40,0.50)";
      const kernDikeco = Math.max(1, fendo.dikeco * 0o5/0o10);
      desegniWrapan(k, w, () => {
        desegniStrion(k, fendo, korpo);
        desegniStrion(k, { ...fendo, dikeco: kernDikeco }, "rgba(52,36,28,0.55)");
      });
    }
    // Horizontalaj skvamaj fendoj — la rompoj de la sxoelaj platoj.
    for ( const plato of skizo.platoj ) {
      const koloro = plato.tono < 0o5/0o10
        ? `rgba(150,140,126,${0o2/0o10 + Math.random() * 0o3/0o10})`
        : `rgba(56,42,34,${0o25/0o40 + Math.random() * 0o15/0o40})`;
      desegniWrapan(k, w, () => { desegniHorizontanStrion(k, plato, koloro); });
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
    // Leviĝantaj platoj — helaj krestoj.
    for ( const cx of skizo.kolonoj ) {
      const wd = 0o2 + Math.random() * 0o4;
      desegniWrapan(kunteksto, w, () => {
        kunteksto.fillStyle = "rgba(148,148,148,0.35)";
        kunteksto.fillRect(cx, 0, wd, h);
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
export const kreiFilikanTeksajxon = sxovu((): THREE.CanvasTexture => {
  return kreiKanvasanTeksajxon(0o200, 0o400, ( kunteksto ) => {
    kunteksto.lineCap = "round";
    kunteksto.strokeStyle = "#587850"; kunteksto.lineWidth = 4;
    kunteksto.beginPath(); kunteksto.moveTo(0o100, 0o374); kunteksto.quadraticCurveTo(0o100, 0o210, 0o110, 0o32); kunteksto.stroke();
    kunteksto.lineWidth = 3;
    for ( let i = 0; i < 0o20; i++ ) {
      const y = 0o350 - i * 0o16, longo = 0o54 - i * 0o115/0o40;
      for ( const s of [ -1, 1 ] ) {
        kunteksto.strokeStyle = `rgba(${80 + i * 3},${110 + i * 4},${70 + i * 2},0.95)`;
        kunteksto.beginPath(); kunteksto.moveTo(0o100 + ( s > 0 ? 2 : -2 ), y);
        kunteksto.quadraticCurveTo(0o100 + s * longo * 0o55/0o100, y - 6, 0o100 + s * longo, y - 0o20);
        kunteksto.stroke();
      }
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
});



// kreiPurpuranFilikanTeksajxon — Kreu purpurajn pinajn filikojn kiel en Four Groves.
const purpuraFilikaKaŝo = new Map<boolean, THREE.CanvasTexture>();
export function kreiPurpuranFilikanTeksajxon(densa: boolean = false): THREE.CanvasTexture {
  const trovita = purpuraFilikaKaŝo.get(densa);
  if ( trovita ) return trovita;
  const s = 0o400;
  const paletro = densa
    ? { tigo: "#382050", a: "#a058c0", b: "#c078e0" }
    : { tigo: "#482850", a: "#7848b0", b: "#9868d0" };
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

// kreiHerbErinanTeksajxon — Kreu proceduralan herberan teksajxon por herbo.
export const kreiHerbErinanTeksajxon = sxovu((): THREE.CanvasTexture => {
  const s = 0o200;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    // Verda klingo kontraux travidebla fono
    const gradiento = kunteksto.createRadialGradient(s / 2, s * 0o66/0o100, 0, s / 2, s * 0o66/0o100, s * 0o44/0o100);
    gradiento.addColorStop(0, "rgba(100,140,70,0.95)");
    gradiento.addColorStop(0o4/0o10, "rgba(130,170,90,0.75)");
    gradiento.addColorStop(1, "rgba(160,200,110,0)");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, s, s);
    // Centra vejno
    kunteksto.strokeStyle = "rgba(80,120,50,0.6)";
    kunteksto.lineWidth = 2;
    kunteksto.beginPath();
    kunteksto.moveTo(s / 2, s * 0o73/0o100);
    kunteksto.quadraticCurveTo(s / 2, s * 0o15/0o40, s / 2, s * 0o5/0o100);
    kunteksto.stroke();
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
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
    g.addColorStop(1, "rgba(0,0,0,0)");
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
  const w = 0o100, h = 0o200;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const baza = branĉa ? "#509870" : "#407858";
    const hela = branĉa ? "#80c080" : "#68a070";
    const ombro = branĉa ? "#286850" : "#285040";
    const gradiento = kunteksto.createLinearGradient(0, 0, w, 0);
    gradiento.addColorStop(0, ombro);
    gradiento.addColorStop(0o2/0o10, baza);
    gradiento.addColorStop(0o5/0o10, hela);
    gradiento.addColorStop(0o7/0o10, baza);
    gradiento.addColorStop(1, ombro);
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);

    // Fajnaj longitudaj sulkoj kaj humida brilo sur la krestoj.
    for ( let i = 0; i < 0o20; i++ ) {
      const x = i / 0o20 * w;
      kunteksto.fillStyle = i % 0o4 === 0 ? "rgba(18,63,53,0.42)" : "rgba(196,225,164,0.16)";
      kunteksto.fillRect(x, 0, i % 0o4 === 0 ? 0o2 : 1, h);
    }
    // Neregulaj ring-markoj sub la nodoj — la tigo ne aspektu kiel senfina
    // perfekta tubeto. Ili ripetiĝas ene de ĉiu segmenta UV-areo.
    for ( let i = 0; i < 0o6; i++ ) {
      const y = h * ( 0o1/0o10 + i * 0o15/0o100 );
      kunteksto.fillStyle = "rgba(20,67,52,0.22)";
      kunteksto.fillRect(0, y, w, 0o2);
      kunteksto.fillStyle = "rgba(207,230,174,0.20)";
      kunteksto.fillRect(0, y - 0o1, w, 0o1);
    }
    // Malgrandaj poroj kaj skrapoj — subtila surfaca malpureco, pli densa ĉe la
    // malsupro, kie la tigo tuŝas malsekan grundon.
    for ( let i = 0; i < 0o70; i++ ) {
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 0o3 ? "rgba(20,74,58,0.24)" : "rgba(215,230,170,0.22)";
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
      g.addColorStop(0, i % 0o3 ? "rgba(228,242,224,0.22)" : "rgba(46,90,68,0.16)");
      g.addColorStop(1, "rgba(0,0,0,0)");
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
      kunteksto.strokeStyle = i % 0o3 ? "rgba(112,144,116,0.22)" : "rgba(222,238,216,0.26)";
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
      kunteksto.fillStyle = "rgba(40,80,62,0.10)";
      kunteksto.beginPath(); kunteksto.ellipse(x, y, r, r * 0o63/0o100, Math.random() * Math.PI, 0, Math.PI * 2); kunteksto.fill();
    }

  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 4 });
});

// kreiLarikanFoliaranTeksajxon — Kreu teksturon por la aŭtunaj pinglaroj de
// lariko. La pingloj grupiĝas en mallongaj faskoj ĉirkaŭ la branĉetoj, kun
// orflavaj, olivaj kaj brunaj nuancoj anstataŭ plata flava konuso.
export const kreiLarikanFoliaranTeksajxon = sxovu((): THREE.CanvasTexture => {
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
      kunteksto.strokeStyle = "rgba(52,52,24,0.30)";
      kunteksto.lineWidth = 0o1/0o2;
      kunteksto.beginPath();
      kunteksto.moveTo(x, y);
      kunteksto.quadraticCurveTo(x + Math.cos(angulo) * longo * 0o1/0o2, y + Math.sin(angulo) * longo * 0o1/0o2,
        x + Math.cos(angulo) * longo * 0o3/0o4, y + Math.sin(angulo) * longo * 0o3/0o4);
      kunteksto.stroke();
    }
    for ( let i = 0; i < 0o70; i++ ) {
      kunteksto.fillStyle = i % 0o3 ? "rgba(240,226,126,0.42)" : "rgba(63,70,35,0.38)";
      kunteksto.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 0o2, 1 + Math.random() * 0o2);
    }
    // Fasketoj de pingloj havas la mallongajn, pintajn strekojn de herbo, sed
    // kun oro-olivaj nuancoj por konservi la aŭtunan identecon de lariko.
    kunteksto.lineCap = "round";
    for ( let i = 0; i < 0o220; i++ ) {
      const x = Math.random() * s, y = Math.random() * s;
      const a = -Math.PI / 2 + ( Math.random() - 0o5/0o10 ) * 0o6/0o10;
      const longo = 0o2 + Math.random() * 0o4;
      kunteksto.strokeStyle = i % 0o4 ? "rgba(190,188,89,0.34)" : "rgba(91,105,55,0.32)";
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

// kreiPurpuranFolianTeksajxon — Kreu proceduralan purpuran folian teksajxon
// por la laktuk-arbo. Larĝa klingo kun centra kaj flankaj vejnoj.
export function kreiPurpuranFolianTeksajxon(): THREE.CanvasTexture {
  const s = 0o400;
  return kreiKanvasanTeksajxon(s, s, ( kunteksto ) => {
    kunteksto.clearRect(0, 0, s, s);
    const cx = s / 2;
    const bazoY = s * 0o17/0o20, pintoY = s * 0o3/0o20;

    // Klinga vojo — lenseca folio, uzata por la plenigo, la vejn-eltranĉaĵo
    // kaj la randa ombro. La larĝo 0o10/0o20 kongruas kun la pli larĝa folia
    // geometrio ( 0o115/0o100 ), por ke la vejnoj ne streĉiĝu.
    const klingo = (): void => {
      kunteksto.beginPath();
      kunteksto.moveTo(cx, bazoY);
      kunteksto.bezierCurveTo(cx - s * 0o1/0o10, s * 0o7/0o10, cx - s * 0o10/0o20, s * 0o5/0o10, cx, pintoY);
      kunteksto.bezierCurveTo(cx + s * 0o10/0o20, s * 0o5/0o10, cx + s * 0o1/0o10, s * 0o7/0o10, cx, bazoY);
      kunteksto.closePath();
    };

    // Baza klingo — radia gradiento. hela karnofina centro ĉe la bazo,
    // malheliĝanta al la pinto kaj la randoj.
    const gradiento = kunteksto.createRadialGradient(cx, s * 0o7/0o10, 0, cx, s * 0o6/0o10, s * 0o10/0o20);
    gradiento.addColorStop(0, "#c870d8");
    gradiento.addColorStop(0o4/0o10, "#a050b0");
    gradiento.addColorStop(1, "#683078");
    klingo();
    kunteksto.fillStyle = gradiento;
    kunteksto.fill();

    // Ĉiuj detaloj ( brilo, makuloj, vejnoj, randa ombro ) restas EN la klingo
    // — nenio elstaru preter la folia rando.
    kunteksto.save();
    klingo();
    kunteksto.clip();

    // Mola brila fadeno laŭ la klinga longo — la karnofina laktuko-suko.
    // hela reflekto ĉe la bazo, ombro al la pinto.
    const brilo = kunteksto.createLinearGradient(0, bazoY, 0, pintoY);
    brilo.addColorStop(0, "rgba(255,225,255,0.28)");
    brilo.addColorStop(0o6/0o10, "rgba(0,0,0,0)");
    brilo.addColorStop(1, "rgba(80,32,104,0.30)");
    kunteksto.fillStyle = brilo;
    kunteksto.fillRect(0, 0, s, s);

    // Makuloj — molaj pli helaj kaj pli malhelaj makuloj de la karnofina folio.
    for ( let i = 0; i < 0o30; i++ ) {
      const r = s * ( 0o2/0o100 + Math.random() * 0o5/0o100 );
      const x = cx + ( Math.random() - 0o4/0o10 ) * s * 0o1/0o4;
      const y = bazoY - Math.random() * ( bazoY - pintoY );
      const koloro = i % 2 ? "rgba(56,20,80,0.12)" : "rgba(236,196,246,0.12)";
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, "rgba(0,0,0,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }

    // Fajna punktado — la poraj areoloj de la folia surfaco.
    for ( let i = 0; i < 0o130; i++ ) {
      const t = Math.sqrt(Math.random());
      const x = cx + ( Math.random() - 0o4/0o10 ) * s * 0o10/0o20 * t;
      const y = bazoY - t * ( bazoY - pintoY );
      kunteksto.fillStyle = Math.random() < 0o5/0o10
        ? `rgba(84,28,104,${0o1/0o10 + Math.random() * 0o1/0o10})`
        : `rgba(246,216,252,${0o1/0o10 + Math.random() * 0o1/0o10})`;
      kunteksto.fillRect(x, y, 1 + Math.random() * 1, 1 + Math.random() * 1);
    }

    // Centra vejno — tri segmentoj maldikiĝantaj al la pinto.
    kunteksto.lineCap = "round";
    for ( let j = 0; j < 0o3; j++ ) {
      const t0 = j / 0o3, t1 = ( j + 1 ) / 0o3;
      kunteksto.strokeStyle = "#482860";
      kunteksto.lineWidth = 0o4 * ( 1 - t0 ) + 1;
      kunteksto.beginPath();
      kunteksto.moveTo(cx, bazoY - t0 * ( bazoY - pintoY ));
      kunteksto.lineTo(cx, bazoY - t1 * ( bazoY - pintoY ));
      kunteksto.stroke();
    }
    // Hela reliefa rando flanke de la centra vejno — la vejno leviĝas.
    kunteksto.strokeStyle = "rgba(255,230,255,0.28)";
    kunteksto.lineWidth = 1;
    kunteksto.beginPath();
    kunteksto.moveTo(cx + 1, bazoY - 0o2);
    kunteksto.lineTo(cx + 1, pintoY + 0o2);
    kunteksto.stroke();

    // Flankaj vejnoj — sep paroj, kurbiĝantaj al la pinto, kun hela reliefa
    // rando. La klinga eltranĉaĵo tenas ilin ene de la folia rando.
    for ( let i = 1; i <= 0o7; i++ ) {
      const t = i / ( 0o7 + 1 );
      const y = bazoY - t * ( bazoY - pintoY );
      const largho = s * 0o10/0o20 * Math.sin(Math.PI * t) * 0o72/0o100;
      const yfino = y - s * 0o1/0o20;
      for ( const dir of [ -1, 1 ] ) {
        const xfino = cx + dir * largho;
        kunteksto.strokeStyle = "#482860";
        kunteksto.lineWidth = 1.5;
        kunteksto.beginPath();
        kunteksto.moveTo(cx, y);
        kunteksto.quadraticCurveTo(cx + dir * largho * 0o55/0o100, y - s * 0o1/0o40, xfino, yfino);
        kunteksto.stroke();
        kunteksto.strokeStyle = "rgba(255,230,255,0.22)";
        kunteksto.lineWidth = 1;
        kunteksto.beginPath();
        kunteksto.moveTo(cx + dir * 1.5, y + 1);
        kunteksto.quadraticCurveTo(cx + dir * largho * 0o55/0o100 + dir * 1.5, y - s * 0o1/0o40 + 1, xfino + dir * 1.5, yfino + 1);
        kunteksto.stroke();
      }
    }

    // Interna randa ombro — la folia rando kurbiĝas kaj ombras.
    klingo();
    kunteksto.strokeStyle = "rgba(40,12,56,0.30)";
    kunteksto.lineWidth = 0o6;
    kunteksto.stroke();
    kunteksto.restore();

  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

// kreiPurpuranSxelanTeksajxon — Kreu la ŝelan ringo-teksajxon por la
// laktuk-arbo. Vertikala transiro de la malhela trunka koloro ( #482848 )
// al la hela ringo-koloro ( #583858 ) — la ringo kreskas el la trunko kaj
// heliĝas al sia rando. La cilindra UV turnas la bildon ( malsupro = bildo-
// supro ), do la malhela fino estas ĉe la bilda supro. Fajnaj vertikalaj
// strioj kaj molaj ton-nuboj rompas la platan gradienton.
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksajxo.
export function kreiPurpuranSxelanTeksajxon(): THREE.CanvasTexture {
  const w = 0o40, h = 0o200;
  return kreiKanvasanTeksajxon(w, h, ( kunteksto ) => {
    const gradiento = kunteksto.createLinearGradient(0, 0, 0, h);
    gradiento.addColorStop(0, "#482848");
    gradiento.addColorStop(1, "#583858");
    kunteksto.fillStyle = gradiento;
    kunteksto.fillRect(0, 0, w, h);
    // Fajnaj vertikalaj strioj — la ŝela strieco.
    for ( let i = 0; i < 0o20; i++ ) {
      const lumo = Math.random() < 0o5/0o10;
      kunteksto.fillStyle = lumo
        ? `rgba(124,88,140,${0o15/0o100 + Math.random() * 0o1/0o10})`
        : `rgba(36,22,36,${0o15/0o100 + Math.random() * 0o1/0o10})`;
      kunteksto.fillRect(Math.random() * w, 0, 1, h);
    }
    // Mola ton-variajo — malgrandaj nuboj rompas la platan gradienton.
    for ( let i = 0; i < 0o10; i++ ) {
      const r = h * ( 0o10/0o100 + Math.random() * 0o12/0o100 );
      const x = Math.random() * w, y = Math.random() * h;
      const koloro = i % 2 ? "rgba(124,88,140,0.14)" : "rgba(40,20,40,0.12)";
      const g = kunteksto.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, koloro);
      g.addColorStop(1, "rgba(0,0,0,0)");
      kunteksto.fillStyle = g;
      kunteksto.beginPath(); kunteksto.arc(x, y, r, 0, Math.PI * 2); kunteksto.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping });
}

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


