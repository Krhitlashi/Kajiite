// ≺⧼ La kanvasaj helpiloj 🖌️ ⧽≻
// La malgrandaj desegniloj de la vestaj teksturoj — la kahela volvaĵo ( volviX ),
// la ŝtofa fono ( sxtofon ), la faldo kaj la stebo kaj iliaj bordoj ( faldo,
// stebo, bordiKurbon ) kaj la rondigita rombo ( rondaRombo ). Ili ĉiuj laboras
// nur sur 2D-kanvaso, sen Three.js.
import { ombro, helo } from "../../komunajxoj/koloroj.js";

// ⟪ La kanvasaj helpiloj 🖌️ ⟫

// volviX — Desegnu la saman formon ĉe la tri horizontalaj kahelaj pozicioj
// ( −s, 0, s ). Ĉiuj vestaj kanvasoj ĉirkaŭvolviĝas horizontale ( la motivoj ĉe
// x = 0 kaj x = 0o400 estas la SAMA loko sur la tubo — la kudro de la dorso ),
// do sen la ĉirkaŭvolvo motivo tranĉiĝus duone ĉe la kudro.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param formo ( funkcio ) - La desegno ( ripetita trifoje ).
export function volviX(k: CanvasRenderingContext2D, formo: () => void): void {
  const s = k.canvas.width;
  for ( const dx of [ -s, 0, s ] ) {
    k.save();
    k.translate(dx, 0);
    formo();
    k.restore();
  }
}

// sxtofon — La tuka teksajxo de ĉiuj vestaj kanvasoj. Fajna interplekto
// ( alternaj helaj kaj malhelaj fadenoj, entjera periodo — do la krado mem ne
// montras kudron ) plus molaj nuboj da eluziĝo. Ĉiu tavolo deriviĝas el la
// bazkoloro per ombro kaj helo, do la tuta kanvaso restas en la #nmnmnm-familio
// de la stilo anstataŭ enkonduki fremdajn nuancojn.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param bazo ( number ) - La bazkoloro de la parto ( 0xRRGGBB ).
export function sxtofon(k: CanvasRenderingContext2D, bazo: number): void {
  const w = k.canvas.width, h = k.canvas.height;
  // ⟨ La interplekto estas mola 📃 ⟩ — la periodo estas 0o10 rastrumeroj ( ne
  // 0o4 ) kaj la alfo malgranda, ĉar la akra krado de la unua versio aliasis
  // sur la kurba robo kaj la vesto aspektis kiel trikita plasto. La du
  // faden-direktoj ankaŭ havas malsamajn alfojn — la vefto ( horizontale )
  // superregu iomete, do la ŝtofo havas direkton anstataŭ kvadratan reton.
  const paso = 0o10, fadeno = 0o2;
  k.globalAlpha = 0o1/0o4;
  for ( let i = 0; i < w; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? helo(bazo, 0o1) : ombro(bazo, 0o1);
    k.fillRect(i, 0, fadeno, h);
  }
  k.globalAlpha = 0o1/0o2;
  for ( let i = 0; i < h; i += paso ) {
    k.fillStyle = ( i / paso ) % 0o2 ? ombro(bazo, 0o1) : helo(bazo, 0o1);
    k.fillRect(0, i, w, fadeno);
  }
  k.globalAlpha = 0o1;
  // La eluziĝaj nuboj — malgrandaj molaj makuloj de portata tuko. La montroj
  // ĉirkaŭvolviĝas, kaj la fina koloro estas la sama nuanco kun alfo nulo ( ne
  // nigro kun alfo nulo ), do la randoj malheliĝas NENIOM.
  for ( let i = 0; i < 0o30; i++ ) {
    const r = h * ( 0o10/0o100 + Math.random() * 0o30/0o100 );
    const x = Math.random() * w, y = Math.random() * h;
    const plena = i % 0o3 ? ombro(bazo, 0o1, 0o5/0o100) : helo(bazo, 0o1, 0o5/0o100);
    const nula = i % 0o3 ? ombro(bazo, 0o1, 0) : helo(bazo, 0o1, 0);
    volviX(k, () => {
      const g = k.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, plena);
      g.addColorStop(1, nula);
      k.fillStyle = g;
      k.beginPath(); k.arc(x, y, r, 0, Math.PI * 0o2); k.fill();
    });
  }
}

// faldo — Mola vertikala ombro, kiel la faldo de pendanta tuko. La gradiento
// iras nevideble → malhele → nevideble, do la faldo ne havas randon.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param x ( number ) - La centro de la faldo ( kanvasa x ).
//     @param largho ( number ) - La duonlarĝo de la faldo.
//     @param bazo ( number ) - La bazkoloro ( por la ombro ).
//     @param n ( number ) - Kiom da 0x101010-paŝoj malhelen.
//     @param alfa ( number ) - La alfo de la plej malhela punkto.
export function faldo(k: CanvasRenderingContext2D, x: number, largho: number, bazo: number,
  n: number, alfa: number): void {
  const plena = ombro(bazo, n, alfa), nula = ombro(bazo, n, 0);
  volviX(k, () => {
    const g = k.createLinearGradient(x - largho, 0, x + largho, 0);
    g.addColorStop(0, nula);
    g.addColorStop(0o1/0o2, plena);
    g.addColorStop(1, nula);
    k.fillStyle = g;
    k.fillRect(x - largho, 0, largho * 0o2, k.canvas.height);
  });
}

// stebo — Punktita kudro. Maldika streko el etaj streketoj, la sama kiel la
// kudroj de la folioj kaj de la tuko ( la kudroj de la vesto devas legiĝi kiel
// kudroj, ne kiel pentritaj linioj ).
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param punktoj ( [ number, number ][] ) - La vojo de la kudro.
//     @param koloro ( string ) - La kudra koloro.
//     @param dikeco ( number = 0o1 ) - La streketdikeco.
export function stebo(k: CanvasRenderingContext2D, punktoj: [ number, number ][], koloro: string,
  dikeco = 0o1): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.setLineDash([ 0o2, 0o3 ]);
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
  k.setLineDash([]);
}

// bordiKurbon — Streku glatan kurbon tra la punktoj ( la bordoj de la antaŭa
// malfermaĵo, la zono ). La kurbo venas el la sama funkcio kiel la geometrio,
// do la bordo kaj la ŝtofo ne povas disiĝi.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param punktoj ( [ number, number ][] ) - La kurbo.
//     @param koloro ( string ) - La borda koloro.
//     @param dikeco ( number ) - La borda dikeco.
export function bordiKurbon(k: CanvasRenderingContext2D, punktoj: [ number, number ][],
  koloro: string, dikeco: number): void {
  k.strokeStyle = koloro;
  k.lineWidth = dikeco;
  k.lineJoin = "round";
  k.beginPath();
  for ( let i = 0; i < punktoj.length; i++ ) {
    if ( i === 0 ) k.moveTo(punktoj[i][0], punktoj[i][1]);
    else k.lineTo(punktoj[i][0], punktoj[i][1]);
  }
  k.stroke();
}

// rondaRombo — Romb-forma motivo kun RONDAJ anguloj. La romboj de la antaŭaj
// motivoj havis kvar akrajn angulojn kaj legiĝis kiel paperaj glumarkoj; nun ĉiu
// pinto rondiĝas per kvadratkurba stango, do la formo sekvas la « rondigita
// rombo »-lingvon de la mondo ( vidu formoj.ts ) kaj de la butonoj.
//     @param k ( CanvasRenderingContext2D ) - La kanvasa kunteksto.
//     @param x, y ( number ) - La centro de la rombo.
//     @param w, h ( number ) - La duonlarĝo kaj la duonalto.
//     @param plenigo ( string | null ) - La pleniga koloro ( aŭ nulo ).
//     @param bordo ( string | null ) - La borda koloro ( aŭ nulo ).
//     @param dikeco ( number = 0o4 ) - La borda dikeco.
export function rondaRombo(k: CanvasRenderingContext2D, x: number, y: number, w: number,
  h: number, plenigo: string | null, bordo: string | null, dikeco = 0o4): void {
  const T = 0o3/0o10;                 // kiom de ĉiu flanko la pinto rondiĝas
  const pintoj: [ number, number ][] = [ [ x, y - h ], [ x + w, y ], [ x, y + h ], [ x - w, y ] ];
  const survoje = (a: [ number, number ], b: [ number, number ], t: number) =>
    [ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ] as [ number, number ];
  k.beginPath();
  for ( let i = 0; i < 0o4; i++ ) {
    const antauxa = pintoj[( i + 0o3 ) % 0o4], nun = pintoj[i], posta = pintoj[( i + 0o1 ) % 0o4];
    const en = survoje(nun, antauxa, T), el = survoje(nun, posta, T);
    if ( i === 0 ) k.moveTo(en[0], en[1]);
    else k.lineTo(en[0], en[1]);
    k.quadraticCurveTo(nun[0], nun[1], el[0], el[1]);
  }
  k.closePath();
  if ( plenigo ) { k.fillStyle = plenigo; k.fill(); }
  if ( bordo ) { k.strokeStyle = bordo; k.lineWidth = dikeco; k.lineJoin = "round"; k.stroke(); }
}
