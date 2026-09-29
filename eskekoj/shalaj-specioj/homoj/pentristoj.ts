// ≺⧼ La kanvasaj pentristoj 🖌️ ⧽≻
// La pentristoj de la vestaj teksturoj — la ekstera ĉemizo ( pentriEksteran ),
// la interna tuko ( pentriInternan ), la pantalono ( pentriPantalonon ) kaj la
// maniko ( pentriManikon ), plus la kanvasaj mezuroj ( VESTAJ_KANVASOJ ) kaj la
// kaŝmemoro de la teksturoj ( vestaTeksajxo ). La kanvasaj helpiloj venas el
// kanvaso.ts, la malfermaĵo el malfermo.ts kaj la mezuroj el mezuroj.ts.
// ( deksesuma kaj kvarStelo venas el vestaro/vestoj.ts — la komuna vesta modulo )
import * as THREE from "three";
import { deksesuma, ombro, helo } from "../../komunajxoj/koloroj.js";
import { kvarStelo, type Vesto } from "../../vestaro/vestoj.js";
import { volviX, sxtofon, faldo, stebo, bordiKurbon, rondaRombo } from "./kanvaso.js";
import { malfermaDuono } from "./malfermo.js";

// --- Vesta tekstura generatoro ---
// vestaTeksajxaStoko — La vestaj teksturoj estas KOMUNAJOJ ( la ekstero dependas
// nur de la vestaj koloroj kaj la parto ), do ili cacheiĝas po ( koloroj, parto ).
// La NPC-aro antaŭe pentris ĝis tri freŝajn 256×256 kanvasojn po figuro — ĝis
// preskaŭ 500 kanvasoj kaj GPU-alŝutoj por la sama malgranda aro da vestoj.
// Kun la cache la aro limiĝas al ( vestoj × partoj ) — ĉiuj figuroj kun la sama
// vesto dividas la saman teksturon, kaj agordiVeston iĝas nur serĉo.
const vestaTeksajxaStoko = new Map<string, THREE.CanvasTexture>();
const vestaTeksajxaKlavo = ( o: Vesto, speco: string ): string =>
  o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono + "|" + speco;
// ⟪ La kanvasaj pentristoj 🖌️ ⟫

// ⟨ La ekstera ĉemizo 📃 ⟩ — la plej videbla tavolo de la figuro. La kanvaso
// estas 0o400 × 0o1000 ( 256 × 512 ) kaj ĝia MEZO ( x = 0o200 ) estas la fronto
// de la figuro — la tekstura ŝovo 0o1/0o2 alportas ĝin tien. La du randoj
// ( x = 0 kaj x = 0o400 ) renkontiĝas ĉe la dorso. La vertikalo estas la alto de
// la robo — la vico 0 estas la kolumo ( ROB_Y_SUPRO = 1.390625 ), la vico 0o1000
// la suba rando ( ROB_Y_MALSUPRO = 0.4375 ).
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriEksteran(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta, I = o.interno;
  const Mx = deksesuma(M), Ax = deksesuma(A), Ix = deksesuma(I);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);

  // ⟨ La faldoj 📃 ⟩ — molaj vertikalaj ombroj flanke de la fronta panelo. La
  // fronto mem restas plata ( tie sidas la motivoj ), do la faldoj tenas sin
  // flanke kaj ĉe la dorso.
  faldo(k, 0o40, 0o24, M, 0o1, 0o3/0o10);
  faldo(k, 0o124, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o254, 0o34, M, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, M, 0o1, 0o3/0o10);

  // ⟨ La desegno restas EĈE LA CENTRO 📃 ⟩ — la motivoj staras sur la fronta
  // centro kaj la supra parto neniam superas ± 0o50 ( 40 el 64 ), do la fronta
  // desegno ne etendiĝas ĝis la flankoj de la kanvaso. La rondaj finoj de la
  // strekoj validas por ĉiuj motivoj sube.
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ La diagonaloj 📃 ⟩ — du paroj da RONDAJ kvadrataj kurboj. La unua
  // malsupreniras laŭ la ŝultro, la dua disiĝas al la tuko; ambaŭ restas for de
  // la flankaj randoj de la panelo.
  k.strokeStyle = ombro(M, 0o2, 0o4/0o10);
  k.lineWidth = 0o2;
  for ( const dir of [ -0o1, 0o1 ] ) {
    k.beginPath();
    k.moveTo(0o200 + dir * 0o50, 0o62);
    k.quadraticCurveTo(0o200 + dir * 0o46, 0o160, 0o200 + dir * 0o40, 0o200);
    k.stroke();
    k.beginPath();
    k.moveTo(0o200 + dir * 0o40, 0o340);
    k.quadraticCurveTo(0o200 + dir * 0o64, 0o420, 0o200 + dir * 0o64, 0o470);
    k.stroke();
  }

  // ⟨ La kolumo 📃 ⟩ — la vico 0 estas la kolumo ( la mondo 1.390625 ). Bendo pli
  // hela ol la ŝtofo, kun ombro sub ĝi kaj kudro laŭ la malsupra rando.
  const KOLUMO_ALTO = 0o24;   // 20 — la koluma bendo
  k.fillStyle = ombro(M, 0o1);
  k.fillRect(0, 0, w, KOLUMO_ALTO);
  k.fillStyle = helo(M, 0o1);
  k.fillRect(0, 0o4, w, 0o12);
  stebo(k, [ [ 0, KOLUMO_ALTO ], [ w, KOLUMO_ALTO ] ], ombro(M, 0o2), 0o1);

  // ⟨ La antaŭaj bordoj 📃 ⟩ — la randoj de la malfermaĵo, kun ombro interne kaj
  // akcenta tubeto sur la rando mem. La kurbo venas el malfermaDuono, la SAMA
  // funkcio kiun la geometrio uzas, kaj ĝi komenciĝas ĉe la kolumo, ĉar la
  // malfermaĵo mem iras ĝis tie.
  const ombroj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  const bordoj: [ [ number, number ][], [ number, number ][] ] = [ [], [] ];
  for ( let y = KOLUMO_ALTO; y <= h; y += 0o4 ) {
    const duono = malfermaDuono(0o1 - y / h) * w;
    ombroj[0].push([ 0o200 + duono + 0o6, y ]);
    ombroj[1].push([ 0o200 - duono - 0o6, y ]);
    bordoj[0].push([ 0o200 + duono + 0o1, y ]);
    bordoj[1].push([ 0o200 - duono - 0o1, y ]);
  }
  bordiKurbon(k, ombroj[0], ombro(M, 0o1, 0o5/0o10), 0o2);
  bordiKurbon(k, ombroj[1], ombro(M, 0o1, 0o5/0o10), 0o2);
  // ⟨ La akcenta linio 📃 ⟩ — ĝi kuŝas unu rastumeron de la rando; kun la plena
  // dikeco 0o4 la tuta streko falas sur la ŝtofon kaj legiĝas kiel tubetita rando.
  bordiKurbon(k, bordoj[0], Ax, 0o4);
  bordiKurbon(k, bordoj[1], Ax, 0o4);

  // ⟨ La eltranĉoj 📃 ⟩ — kvar stelaj fenestroj. Ĉiu havas la truon en la INTERNA
  // koloro kaj akcentan konturon, do ili legiĝas kiel eltranĉoj. Ili sidas je
  // ± 0o50, do ili ne atingas la flankojn.
  const fenestro = ( x: number, y: number, r: number ) => {
    kvarStelo(k, x, y, r + 0o11, Ax);
    kvarStelo(k, x, y, r + 0o5, Mx);
    kvarStelo(k, x, y, r + 0o4, Ax);
    kvarStelo(k, x, y, r, Ix);
  };
  fenestro(0o200 - 0o50, 0o250, 0o16);
  fenestro(0o200 + 0o50, 0o250, 0o16);
  fenestro(0o200 - 0o50, 0o540, 0o13);
  fenestro(0o200 + 0o50, 0o540, 0o13);

  // ⟨ La brusta motivo 📃 ⟩ — la keuxfhxeso. Solida kvarpinta stelo kun kvar
  // « > »-krampoj kaj du paroj da MALFERMAJ eĥaj arkoj, ĉiuj nur strekoj.
  kvarStelo(k, 0o200, 0o120, 0o36, Ax);
  kvarStelo(k, 0o200, 0o120, 0o14, Ix);
  for ( const sx of [ -0o1, 0o1 ] ) for ( const sy of [ -0o1, 0o1 ] ) {
    const ax = 0o200 + sx * 0o30, ay = 0o120 + sy * 0o30;
    k.strokeStyle = ombro(A, 0o1, 0o7/0o10);
    k.lineWidth = 0o3;
    k.beginPath();
    k.moveTo(ax, ay);
    k.quadraticCurveTo(0o200 + sx * 0o21, ay, 0o200 + sx * 0o17, 0o120 + sy * 0o36);
    k.moveTo(ax, ay);
    k.quadraticCurveTo(ax, 0o120 + sy * 0o21, 0o200 + sx * 0o32, 0o120 + sy * 0o17);
    k.stroke();
  }
  const eĥaj: [ number, number, string ][] = [
    [ 0o1,        0o2, ombro(M, 0o2, 0o5/0o10) ],
    [ 0o7/0o10,   0o3, ombro(A, 0o1, 0o45/0o100) ],
    [ 0o44/0o100, 0o2, ombro(M, 0o3, 0o5/0o10) ],
  ];
  for ( const sy of [ -0o1, 0o1 ] ) {
    const bazoY = 0o120 + sy * 0o42;
    for ( const [ s, dik, kol ] of eĥaj ) {
      const du = 0o34 * s, al = 0o24 * s;
      k.strokeStyle = kol;
      k.lineWidth = dik;
      k.beginPath();
      k.moveTo(0o200 - du, bazoY);
      k.quadraticCurveTo(0o200, bazoY + sy * al * 0o2, 0o200 + du, bazoY);
      k.stroke();
    }
  }

  // ⟨ La dorso 📃 ⟩ — la kudro ( x = 0 kaj x = 0o400 ) estas la SAMA punkto, do
  // la desegno desegniĝas unufoje kaj volviX ĝin spegulas trans la kudron. La
  // tuta motivo staras sur la mezo de la dorso — la koluma V supre, du malgrandaj
  // sxeŭronoj ĉe la ŝultroj, unu granda rombo kaj ĝia centra juvelo — kaj ĉiu
  // streko restas for de ĉiuj aliaj.
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ La koluma V 📃 ⟩ — unu malferma V ĝuste sub la kolumo. La brakoj estas
  // REKTAJ ( nur la kunigaĵo rondiĝas per lineJoin ), do ĝi legiĝas kiel V kaj ne
  // kiel U. Ĝi sidas sola supre, do la supra dorso restas trankvila.
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o37, 0o70);
    k.lineTo(0, 0o200);
    k.lineTo(0o37, 0o70);
    k.stroke();
  });
  // ⟨ La ŝultraj sxeŭronoj 📃 ⟩ — po unu MALGRANDA malferma V ekster la brakoj
  // de la koluma V, kaj nur tiuj du, do la ŝultroj ne ripetas kradon.
  k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o64, 0o70);
      k.lineTo(dir * 0o60, 0o130);
      k.lineTo(dir * 0o54, 0o70);
      k.stroke();
    }
  });
  // ⟨ La granda rombo 📃 ⟩ — ĝiaj flankoj estas PRESKAŬ REKTAJ, do la motivo
  // legiĝas kiel rombo kaj neniam kiel lenso aŭ okulo. La supraj flankoj estas
  // strekoj de la ĉefa koloro kaj la malsupraj flankoj estas akcentaj; la du
  // paroj RENKONTIĜAS ĉe la plej larĝaj punktoj, do la rombo havas kvar verajn
  // angulojn, kaj la finoj supre kaj malsupre restas malfermaj.
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.strokeStyle = ombro(M, 0o2, 0o5/0o10);
      k.lineWidth = 0o2;
      k.beginPath();
      k.moveTo(0, 0o226);
      k.quadraticCurveTo(dir * 0o32, 0o340, dir * 0o50, 0o444);
      k.stroke();
      k.strokeStyle = Ax;
      k.lineWidth = 0o3;
      k.beginPath();
      k.moveTo(dir * 0o50, 0o444);
      k.quadraticCurveTo(dir * 0o36, 0o516, dir * 0o21, 0o570);
      k.stroke();
    }
  });
  // ⟨ La centra juvelo 📃 ⟩ — solida rombo kun romba truo en la mezo, do la
  // okulo legiĝas kiel ŝtono anstataŭ kiel truo. La plej granda motivo de la
  // dorso staras ĝuste sur la kudro.
  const juvelo = (duono: number, alto: number, koloro: string) => {
    k.fillStyle = koloro;
    k.beginPath();
    k.moveTo(0, 0o370 - alto);
    k.lineTo(duono, 0o370);
    k.lineTo(0, 0o370 + alto);
    k.lineTo(-duono, 0o370);
    k.closePath();
    k.fill();
  };
  volviX(k, () => {
    juvelo(0o21, 0o100, Ax);
    juvelo(0o6, 0o30, Mx);
  });
  // ⟨ La malsupra sxeŭrono 📃 ⟩ — akcenta V sub la juvelo, kiu fermas la
  // malsupran pinton de la rombo sen tuŝi la flankojn supre.
  k.strokeStyle = Ax;
  k.lineWidth = 0o3;
  volviX(k, () => {
    k.beginPath();
    k.moveTo(-0o17, 0o660);
    k.lineTo(0, 0o600);
    k.lineTo(0o17, 0o660);
    k.stroke();
  });

  // ⟨ La dorso ricevas PLI da motivoj 🖌️ ⟩ — antaŭe la dorso havis nur la koluman
  // V-on, la du ŝultrajn sxeŭronojn, la rombon kaj la malsupran sxeŭronon, do la
  // malantaŭo de la ĉemizo legiĝis pli malplena ol la fronto. La desegno nun portas
  // la saman ritmon kiel la fronto — parojn da MALFERMAJ arkoj flanke de la rombo
  // ( la sama ilo kiel la eĥaj arkoj de la fronto ), streketojn ĉe la ŝultroj kaj
  // angulojn ĉe la tuko — ĉiuj spegulitaj trans la kudron per volviX, do la dorso
  // restas simetria kaj la motivoj restas for de la flankaj randoj de la panelo.
  // ⟨ La flankaj arkoj 📃 ⟩ — du paroj da ARKOJ kiuj sekvas la rombon ekstere, ĉe
  // ĝiaj plej larĝaj punktoj ( y = 0o444 ). Ĉiu arko iras de punkto supre de tiu
  // alto, kondukiĝas tra la plej malproksima punkto kaj revenas malsupren — kiel
  // parentezo. La rombo mem atingas 0o50 tie, do la arkoj staras ekster ĝi kaj la
  // pli granda paro enfermas la pli malgrandan. La kolumnoj estas la ena x, la
  // ekstera x, la duonalto, la dikeco kaj la koloro.
  const dorsEĥoj: [ number, number, number, number, string ][] = [
    [ 0o54, 0o70,  0o30, 0o2, ombro(M, 0o2, 0o45/0o100) ],
    [ 0o62, 0o104, 0o42, 0o3, ombro(A, 0o1, 0o5/0o10) ],
  ];
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      for ( const [ ena, ekstera, duonalto, dikeco, koloro ] of dorsEĥoj ) {
        k.strokeStyle = koloro;
        k.lineWidth = dikeco;
        k.beginPath();
        k.moveTo(dir * ena, 0o444 - duonalto);
        k.quadraticCurveTo(dir * ekstera, 0o444, dir * ena, 0o444 + duonalto);
        k.stroke();
      }
    }
  });
  // ⟨ La ŝultraj streketoj 📃 ⟩ — po unu mallonga akcenta streketo super ĉiu
  // sxeŭrono, iomete klinita, same kiel la strekoj flanke de la koluma V. Ili
  // sidas inter la brako de la V kaj la sxeŭrono, do ili plenigas tiun malplenan
  // angulon sen tuŝi la randon de la ŝultro.
  k.strokeStyle = ombro(A, 0o1, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o46, 0o34);
      k.lineTo(dir * 0o42, 0o114);
      k.stroke();
    }
  });
  // ⟨ La anguloj ĉe la tuko 📃 ⟩ — paro da mallongaj anguloj super la malsupra
  // rimeno. Ili fermas la dorsan desegnon malsupre same kiel la malsupra sxeŭrono
  // fermas la rombon supre, kaj ili staras spegule ĉe la du flankoj de la kudro.
  k.strokeStyle = ombro(M, 0o2, 0o45/0o100);
  k.lineWidth = 0o2;
  volviX(k, () => {
    for ( const dir of [ -0o1, 0o1 ] ) {
      k.beginPath();
      k.moveTo(dir * 0o24, h - 0o64);
      k.lineTo(dir * 0o40, h - 0o44);
      k.lineTo(dir * 0o56, h - 0o66);
      k.stroke();
    }
  });

  // ⟨ Nenia horizontala linio 📃 ⟩ — nek talio nek zono tranĉas la ĉemizon.

  // ⟨ La malsupra rando estas DUOBLA rimeno 📃 ⟩ — la desegno de la dorso montras
  // DIKAN flavan randon ĉe la tuko, do la maldika streko ( 0o7 ) fariĝis vera bendo
  // kun ombra linio super ĝi kaj malhela streko ene de ĝia supra parto. La tuko de
  // la ĉemizo do legiĝas kiel aparta parto de la vesto anstataŭ kiel la fino de la
  // kanvaso.
  k.fillStyle = Ax;
  k.fillRect(0, h - 0o14, w, 0o14);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o17, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o14, w, 0o2);
}

// ⟨ La interna ĉemizo 📃 ⟩ — la dua tavolo. Ĝi estas videbla tra la antaŭa
// malfermaĵo de la robo kaj tra la eltranĉoj, do ĝia fronta centro ( x = 0o200 )
// portas sian propran motivon — la sama stilo, sed pli malgranda, por ke la du  // tavoloj ne konkuru. La zono kaj la nodo sidas sur ĉi tiu tavolo, ĉar la nodo
// kuŝas en la malfermaĵo, kie la robo ne kovras ĝin.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriInternan(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const I = o.interno, A = o.akcenta;
  const Ix = deksesuma(I), Ax = deksesuma(A);
  k.fillStyle = Ix;
  k.fillRect(0, 0, w, h);
  sxtofon(k, I);
  // ⟨ Du molaj faldoj 📃 ⟩ — antaŭe kvar, sed kune kun la motivoj ili plenigis
  // la kanvason. Nun ili tenas sin flanke de la centro kaj lasas la mezon al la
  // desegno.
  faldo(k, 0o120, 0o30, I, 0o1, 0o25/0o100);
  faldo(k, 0o260, 0o30, I, 0o1, 0o25/0o100);

  // ⟨ La motivoj estas RONDAJ, maldensaj, kun MALPLENOJ inter ili kaj margenoj
  // de la randoj 📃 ⟩ — la antaŭa desegno estis krado: kvarpinta stelo sur AKRA
  // romba kadro, poste kvin vicoj da romboj ( tri po vico ), kaj la malsupra
  // rando de la zono pendis kiel rektangulaj blokoj ĝis la tuko. Nun la motivoj
  // estas nur RONDAJ strekoj kaj STELOJ, ili restas for de la koluma rando
  // ( y = 0 ) kaj de la tuka rando ( y = h ), kaj inter ili restas multe da
  // malplena ŝtofo — la desegno maldensiĝis anstataŭ pleniĝi.
  const MARGENO = 0o40;          // 32 — la malplena rando supre kaj malsupre
  k.lineCap = "round";
  k.lineJoin = "round";

  // ⟨ La desegno portas VERTIKALAJN liniojn 📃 ⟩ — du longaj, rondaj kudroj
  // malsupreniras de sub la kolumo ĝis la tuko, unu sur ĉiu flanko de la centra
  // kolono. La motivoj de la dua tavolo do sidas inter du vertikalaj strekoj,
  // kaj la horizontalaj elementoj malpliiĝis ( la stilo preferas la vertikalon ).
  for ( const dx of [ -0o126, -0o56, 0o56, 0o126 ] ) {
    k.strokeStyle = ombro(I, 0o3, 0o6/0o10);
    k.lineWidth = 0o2;
    k.beginPath();
    k.moveTo(0o200 + dx, MARGENO + 0o20);
    k.lineTo(0o200 + dx, h - MARGENO);
    k.stroke();
  }

  // ⟨ La koluma arko 📃 ⟩ — unu maldika, ronda streko sub la kolumo.
  k.strokeStyle = ombro(I, 0o2);
  k.lineWidth = 0o2;
  k.beginPath();
  k.moveTo(0o200 - 0o54, MARGENO + 0o10);
  k.quadraticCurveTo(0o200, MARGENO + 0o50, 0o200 + 0o54, MARGENO + 0o10);
  k.stroke();

  // ⟨ La brusta stelo 📃 ⟩ — kvarpinta stelo kun eĥa rombo malantaŭ ĝi. La
  // malfermita CIRKLA kadro malaperis, ĉar la interna ĉemizo nun havas neniajn
  // cirklojn. La eĥa rombo ankaŭ mallarĝiĝis de 0o62 al 0o42, do ĝi restas klare
  // for de la kvar vertikalaj kudroj ( ± 0o56 ) kaj de la koluma arko supre.
  rondaRombo(k, 0o200, 0o166, 0o42, 0o44, null, ombro(I, 0o2, 0o5/0o10), 0o2);
  kvarStelo(k, 0o200, 0o166, 0o24, Ax);
  kvarStelo(k, 0o200, 0o166, 0o11, Ix);

  // ⟨ La videbla fenestro de la interna ĉemizo 📃 ⟩ — la malfermaĵo de la robo
  // montras nur MALVARGA vertikala strio de la fronto: ĉe la brusto ĝi estas ± 6
  // rastrumeroj, ĉe la tuko ± 27. La motivoj de la supra parto ( la koluma arko,
  // la brusta stelo, la buko ĉe la zono ) do sidas KOMENCE MALANTAŬ la ŝtofo.
  // La centro nun portas sian propran desegnon, kaj ĝi sidas en la fenestro mem —
  // inter la kanvasaj vicoj 0o260 kaj 0o770, kie la malfermaĵo vere montriĝas.
  // ⟨ La centro estas EĤAJ RONDAJ SXEVRONOJ 📃 ⟩ — la antaŭa centro havis
  // cirklojn ( kvin butonojn kaj rondan bukon ) kaj la motivoj preskaŭ tuŝis unu
  // la alian. Nun la centro portas KVAR koncentrajn sxevronojn, do V-formojn kun
  // RONDAJ anguloj. Ĉiuj havas la saman supran alton kaj malsamajn pintojn, kaj
  // inter ili restas egala malplena spaco, do la formoj neniam tuŝas.
  k.lineCap = "round";
  k.lineJoin = "round";
  // ⟨ La sxevronoj MALSUPRENIRAS 📃 ⟩ — la pinto sidas SUPRE kaj la brakoj
  // malsupreniras, do la sxevronoj MALFERMIĜAS malsupren kaj sekvas la formon de
  // la malfermaĵo mem ( kiu ankaŭ mallarĝiĝas supren ). Antaŭe la pinto estis
  // malsupre kaj la brakoj supreniris, do en la mallarĝa fenestro videblis nur la
  // fundo de ĉiu sxevrono kaj la desegno legiĝis kiel tasoj MALSUPRENIGITAJ.
  const sxevrono = ( yPinto: number, duono: number, koloro: string, dikeco: number ) => {
    k.strokeStyle = koloro;
    k.lineWidth = dikeco;
    k.beginPath();
    k.moveTo(0o200 - duono, 0o600);
    k.lineTo(0o200 - duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.quadraticCurveTo(0o200 - duono * 0o1/0o5, yPinto, 0o200, yPinto);
    k.quadraticCurveTo(0o200 + duono * 0o1/0o5, yPinto, 0o200 + duono * 0o3/0o10, yPinto + duono * 0o3/0o10);
    k.lineTo(0o200 + duono, 0o600);
    k.stroke();
  };
  sxevrono(0o250, 0o52, ombro(I, 0o2, 0o5/0o10), 0o2);
  sxevrono(0o330, 0o40, ombro(I, 0o3, 0o6/0o10), 0o2);
  sxevrono(0o410, 0o30, ombro(A, 0o1), 0o2);
  sxevrono(0o470, 0o20, Ax, 0o2);

  // ⟨ La steloj flanke de la brusto kaj sub la zono 📃 ⟩ — malgrandaj kaj
  // DISE, kun malplena ŝtofo inter ili ( neniu vico, nenia krado ).
  for ( const dx of [ -0o102, 0o102 ] ) {
    kvarStelo(k, 0o200 + dx, 0o160, 0o12, ombro(I, 0o3));
    kvarStelo(k, 0o200 + dx, 0o160, 0o7, Ax);
    kvarStelo(k, 0o200 + dx, 0o440, 0o11, ombro(I, 0o2));
  }
  kvarStelo(k, 0o200, 0o360, 0o10, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o13, ombro(A, 0o1));
  kvarStelo(k, 0o200, 0o640, 0o6, Ix);

  // ⟨ La dorso 📃 ⟩ — la sama stelo ĉe la kudro ( x = 0 kaj x = 0o400 ), kaj la
  // spina kudro mem kiel mola vertikala streko.
  volviX(k, () => kvarStelo(k, 0, 0o166, 0o20, ombro(I, 0o2)));
  volviX(k, () => {
    k.fillStyle = ombro(I, 0o1, 0o4/0o10);
    k.fillRect(-0o2, MARGENO, 0o4, h - MARGENO * 0o2);
  });

  // ⟨ La talio estas TUTE SENA 📃 ⟩ — ĝi antaŭe havis horizontalan kudron, rondan
  // bukon ( tri cirklojn ) kaj du pendantajn rubandojn. Ĉio malaperis, ĉar la
  // stilo volas neniajn cirklojn kaj neniajn horizontalajn strekojn. La sxevronoj
  // supre restas la solaj motivoj de la fronta centro.
}

// ⟨ La pantalono 📃 ⟩ — du mallongaj tuboj sub la robo. La videbla parto estas
// nur la supra parto de la tubo ( la robo kovras de supre, la botoj de malsupre ),
// do la motivoj koncentriĝas ĉe la supro kaj la malsupro restas trankvila ŝtofo.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriPantalonon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const P = o.pantalono, A = o.akcenta;
  const Px = deksesuma(P), Ax = deksesuma(A);
  k.fillStyle = Px;
  k.fillRect(0, 0, w, h);
  sxtofon(k, P);
  faldo(k, 0o200, 0o40, P, 0o1, 0o3/0o10);   // la antaŭa gladlinio
  faldo(k, 0o60, 0o24, P, 0o1, 0o25/0o100);
  faldo(k, 0o340, 0o24, P, 0o1, 0o25/0o100);
  // ⟨ La akcenta RIMENO estas VERTIKALA 📃 ⟩ — la antaŭa versio metis la akcenton
  // kiel HORIZONTALAN bendon ĉirkaŭ la tibio, do ĝi legiĝis kiel dua manumo. Nun
  // la akcento estas VERTIKALA rimeno laŭ ĉiu flanka kudro — la sama strio, kiun
  // la stilo preferas ( vidu la ĉemizojn ) — kaj ĝi iras de la zono ĝis la boto,
  // do ĝi sekvas la kruron dum la tuta paŝo.
  // ⟨ La rimenoj estas MALDIKAJ kaj sur la KVAR ANGULOJ 📃 ⟩ — la antaŭa versio
  // metis du larĝajn rimenojn ( 0o12 rastrumerojn ) sur la ANTAŬAN kaj la
  // MALANTAŬAN mezlinion de la kruro ( u = 0.25 kaj 0.75 ), tie kie la sekco
  // estas plej plata — la akcento do legiĝis kiel du larĝaj strioj trans la
  // femurojn. Nun ĝi iras laŭ la KVAR ANGULOJ de la superelipsa sekco ( la
  // diagonaloj, ang = 45° · k → u = 0.125, 0.375, 0.625, 0.875 → la kanvasaj
  // kolumnoj 0o40, 0o140, 0o240, 0o340 ) kaj ĝi estas MALDIKA ( tri rastrumeroj
  // plus mallarĝa ombro ). Du maldikaj strioj videblas de antaŭe kaj du de
  // malantaŭe, kaj ili sekvas la kruron dum la tuta paŝo — ili estas vertikalaj.
  for ( const x of [ 0o40, 0o140, 0o240, 0o340 ] ) {
    k.fillStyle = ombro(A, 0o1, 0o5/0o10);
    k.fillRect(x - 0o2, 0, 0o5, h);
    k.fillStyle = Ax;
    k.fillRect(x - 0o1, 0, 0o3, h);
  }
  // ⟨ La AKCENTA rimeno ĉe la zono 📃 ⟩ — la supra rando de la tubo estas la zono
  // de la pantalono, do ĝi ricevas akcentan rimenon ( la sama lingvo kiel la apudaj
  // randoj de la ŝuo — la rimeno kaj la bota manumo vicigas sin en la mondo ).
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o3);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o3, w, 0o2);
  // ⟨ La videbla bendo de la kanvaso 📃 ⟩ — la robo kovras de supre, la boto de
  // malsupre, do nur mallonga bendo de la tubo videblas. Mezurite sur la reala
  // geometrio ( la mondaj altoj de la ringoj kontraŭ la kanvasaj vicoj ): la vico
  // 0.365 · 0o1000 = 0o555 estas la roba rando ( 0.4375 ) kaj la vico
  // 0.431 · 0o1000 = 0o657 estas la bota rando ( 0.3125 ) — la motivoj de ĉi tiu
  // pantalono do devas sidi INTER 0o555 kaj 0o657. Ĉio supre sidas sub la robo,
  // ĉio malsupre sidas en la boto.
  // ⟨ La tuko restas trankvila ĉe la boto 📃 ⟩ — la rimenoj ne ĉirkaŭiras la
  // tibion, do la bendo super la bota rando ( la vico 0o634 … 0o657 ) restas blua
  // kaj nur la kvar vertikalaj rimenoj eniras la ŝuon.
  k.fillStyle = ombro(P, 0o1, 0o5/0o10);
  k.fillRect(0, 0o657, w, 0o3);
  // ⟨ La motivoj estas STELOJ kaj MALHELAJ 📃 ⟩ — antaŭe ĉi tie estis vicoj de
  // HELAJ romboj ( la akcenta koloro ), do la pantalono legiĝis kiel helaj strioj
  // en blua ŝtofo. Nun la motivoj estas kvarpintaj STELOJ en la MALHELA nuanco de
  // la ĉefa koloro ( ombro(P, 0o2) ) — ili legiĝas kiel teksitaj motivoj — kaj ili
  // malpliiĝis kaj DISIGIS ( multe da malplena ŝtofo inter ili ). La lasta stelo
  // sidas SUR la akcenta rimeno, do la du motivoj apartenas unu al la alia.
  const steloj: [ number, number, number ][] = [
    [ 0o200, 0o564, 0o15 ],   // 372 — ĵus sub la roba rando
    [ 0o200, 0o613, 0o12 ],   // 395 — meze
    [ 0o200, 0o645, 0o11 ],   // 421 — sur la rimeno
    [ 0,     0o574, 0o11 ],   // 380 — ĉe la kudro ( volviX spegulas ĝin )
    [ 0,     0o625, 0o10 ],   // 405
  ];
  for ( const [ x, y, r ] of steloj ) {
    if ( x === 0 ) volviX(k, () => kvarStelo(k, 0, y, r, ombro(P, 0o2)));
    else kvarStelo(k, x, y, r, ombro(P, 0o2));
  }
  // ⟨ La malsupra horizontala bendo foriĝis 📃 ⟩ — ĝi estis la lasta horizontala
  // desegno de la pantalono ( kaj ĝi sidas ene de la boto, do oni neniam vidis
  // ĝin ). La akcento nun portas sin per la kvar vertikalaj rimenoj.
  k.fillStyle = ombro(P, 0o2);
  k.fillRect(0, h - 0o6, w, 0o3);
}

// ⟨ La maniko 📃 ⟩ — la foli-tondita tubo. ATENTU la direkton de la vertikalo.
// La unua ringo de la tubo ( la ŝultro ) havas uv.y = 0, do ĝi troviĝas ĉe la
// SUBA vico de la kanvaso ( y = 0o200 ); la tondita rando ( uv.y = 1 ) sidas ĉe
// la SUPRA vico ( y = 0 ). La motivoj sekvas tiun ordon.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
function pentriManikon(k: CanvasRenderingContext2D, o: Vesto): void {
  const w = k.canvas.width, h = k.canvas.height;
  const M = o.ĉefa, A = o.akcenta;
  const Mx = deksesuma(M), Ax = deksesuma(A);
  k.fillStyle = Mx;
  k.fillRect(0, 0, w, h);
  sxtofon(k, M);
  // la akcenta rimeno laŭ la tondita rando ( la kanvasa SUPRA vico ) — la
  // geometrio tondas la tubon en foliojn, do la rimeno sekvas la foli-siluetojn.
  k.fillStyle = Ax;
  k.fillRect(0, 0, w, 0o10);
  k.fillStyle = ombro(A, 0o1, 0o5/0o10);
  k.fillRect(0, 0o10, w, 0o3);
  // ⟨ Kvarpintaj steloj super la rimeno 📃 ⟩ — la sama motivo kiel la brusta stelo
  // ( kvarStelo ), sed malpli granda. Antaŭe ĉi tie estis etaj romboj, sed kvar
  // akraj romboj tiel proksime al la tondita rando legiĝis kiel ortanguloj; la
  // stelo havas la saman kvar-pintan silueton kiel la cetero de la vesto kaj
  // malfermiĝas malsupren, do la rimeno kaj la stelo apartenas al la sama familia
  // motivo. Ĉiu stelo estas 12 rastrumeroj larĝa ( r = 6 ), do la ok steloj
  // disiĝas egale ĉirkaŭ la tubo ( 16 rastrumeroj po stelo ).
  for ( let i = 0; i < 0o10; i++ )
    kvarStelo(k, i * 0o20 + 0o10, 0o26, 0o6, ombro(A, 0o1));
  // la ŝultra motivo — kvarpinta stelo ĉe la kudro ( x = 0 kaj x = w estas la
  // sama punkto, do la stelo desegniĝas ĉe ambaŭ kaj unu plia frontas ).
  kvarStelo(k, 0, h - 0o24, 0o22, Ax);
  kvarStelo(k, w, h - 0o24, 0o22, Ax);
  kvarStelo(k, w / 0o2, h - 0o24, 0o22, Ax);
  // la faldoj laŭ la tubo, kaj la ombro de la ŝultro supre.
  faldo(k, 0o40, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o100, 0o16, M, 0o1, 0o3/0o10);
  faldo(k, 0o140, 0o16, M, 0o1, 0o3/0o10);
  k.fillStyle = ombro(M, 0o1, 0o5/0o10);
  k.fillRect(0, h - 0o10, w, 0o10);
}
// VESTAJ_KANVASOJ — La kanvasa grando de ĉiu vestparto. La robo kaj la interna
// ĉemizo portas siajn motivojn sur 0o400 × 0o1000 ( la robo estas 0o1 mondunuon
// alta, do la kanvaso havas sufiĉe da rastrumeroj por la kudroj kaj
// la motivoj ); la maniko sidas sur 0o200 × 0o200 — ĝi estas mallonga tubo kaj
// 0o400 × 0o1000 estus malŝparo de tekstura memoro por ĉiu vesto.
const VESTAJ_KANVASOJ: Record<string, [ number, number ]> = {
  supra: [ 0o400, 0o1000 ],
  interno: [ 0o400, 0o1000 ],
  pantalono: [ 0o400, 0o1000 ],
  maniko: [ 0o200, 0o200 ],
};

// vestaTeksajxo — La kanvasa teksturo de unu vestparto ( kaŝmemorita po vesto kaj
// parto ). La kvar specoj estas la TUTA vesta teksturaro — la sama vesto ĉiam
// donas la samajn kanvasojn, do ĉiuj figuroj kun tiu vesto dividas ilin.
//     @param o ( Vesto ) - La vesto ( la koloroj ).
//     @param speco ( string ) - La parto ( supra · interno · pantalono · maniko ).
//     @returns teksajxo ( THREE.CanvasTexture ) - La preta teksturo.
export function vestaTeksajxo(o: Vesto, speco: string): THREE.CanvasTexture {
  const klavo = vestaTeksajxaKlavo(o, speco);
  const cacheita = vestaTeksajxaStoko.get(klavo);
  if ( cacheita ) return cacheita;
  const [ largho, alto ] = VESTAJ_KANVASOJ[speco] ?? VESTAJ_KANVASOJ.supra;
  const kanvasa = document.createElement("canvas");
  kanvasa.width = largho; kanvasa.height = alto;
  const kunteksto = kanvasa.getContext("2d")!;
  if ( speco === "supra" ) pentriEksteran(kunteksto, o);
  else if ( speco === "interno" ) pentriInternan(kunteksto, o);
  else if ( speco === "pantalono" ) pentriPantalonon(kunteksto, o);
  else pentriManikon(kunteksto, o);
  const t = new THREE.CanvasTexture(kanvasa);
  t.colorSpace = THREE.SRGBColorSpace;
  // La motivoj aperu ĉe la fronto. La ŝovo ( 0o1/0o2 ) alportas la teksturcentron
  // ( kie la steloj, la romboj kaj la butona plateto estas ) al la fronto ( +z ).
  // La maniko ricevas NENIAN ŝovon — ĝiaj motivoj estas spegulaj ĉe la kudro de la
  // tubo, do la kudro restas meze de la motivo.
  t.wrapS = THREE.RepeatWrapping;
  if ( speco !== "maniko" ) t.offset.x = 0o1/0o2;
  vestaTeksajxaStoko.set(klavo, t);
  return t;
}
