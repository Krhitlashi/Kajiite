// ≺⧼ La satalaj formoj 📐 ⧽≻
// La bazaj formoj de la satala stilo — la murklino ( MURA_KLINO ), la rondigita
// trapeza formo, la klinaj tavoloj ( kreiKlinoTavolon ), la ŝtala formo
// ( kreiSteleanFormon ) kaj la diamantaj duonoj ( diamantajDuonoj ).
import * as THREE from "three";

// La klino de la tieraj muroj — kiom la muroj malleviĝas INTERNEN dum unu tiera
// alto. La pordo sur la teretaĝa muro kliniĝas laŭ la SAMA valoro ( vidu
// aldoniEnirejon ), do ĝi restas paralela al la muro.
export const MURA_KLINO = 0o5/0o20;

// La rondigita kvadrata formo ( kreiRondigitanRektangulanFormon ) venas el la
// komuna forma modulo — la sama formo kiel la vojoj, dividita inter ili.
export function rondigitaTrapezaFormo(blokoLargho: number, tw: number, h: number, rb: number, rt: number): THREE.Shape {
  const s = new THREE.Shape(), sl = ( blokoLargho / 2 - tw / 2 ) / h;
  s.moveTo(-blokoLargho / 2 + rb, 0); s.lineTo(blokoLargho / 2 - rb, 0);
  s.quadraticCurveTo(blokoLargho / 2, 0, blokoLargho / 2 - sl * rt, rt);
  s.lineTo(tw / 2 + sl * rt, h - rt); s.quadraticCurveTo(tw / 2, h, tw / 2 - rt, h);
  s.lineTo(-tw / 2 + rt, h); s.quadraticCurveTo(-tw / 2, h, -tw / 2 - sl * rt, h - rt);
  s.lineTo(-blokoLargho / 2 + sl * rb, rb); s.quadraticCurveTo(-blokoLargho / 2, 0, -blokoLargho / 2 + rb, 0);
  return s;
}

// kreiKlinoTavolon — Kvadrata tavolo kun klinitaj muroj. la supro estas pli
// mallargxa ol la bazo, do cxiu tavolo aspektas kiel trapezoido.
// 4-segmenta cilindro donas precize kvadratan frustumon (cxiuj konstruajxoj estas kvadrataj).
// Eksportita por ke la spacosxipo reuzu la samajn tavolojn.
export function kreiKlinoTavolon(hwB: number, hdB: number, hwT: number, hdT: number, alto: number): THREE.BufferGeometry {
  const rB = Math.max(0o1/0o20, Math.hypot(hwB, hdB));
  const rT = Math.max(0o1/0o20, Math.hypot(hwT, hdT));
  const g = new THREE.CylinderGeometry(rT, rB, alto, 4, 1);
  g.rotateY(Math.PI / 4);
  return g;
}

// kreiSteleanFormon — Vertikala signa plato kun nesimetriaj rondigitaj supraj
// anguloj (r1 ≠ r2) kaj rektaj malsupraj anguloj. Uzata por la steloj.
// ⟨ Kiu angulo rondigxas 📃 ⟩ — la GRANDA rondo ( r1 ) sidas cxe la maldekstra
// supra angulo vidate de la fronto ( +z ), la malgranda ( r2 ) cxe la dekstra;
// la plato do kliniĝas maldekstren. Speguli la signon signifas nur interŝanĝi la
// du radiusojn cxe la alvokoj — la formo mem restas nesimetria.
// La pilola fenestra formo ( kreiPilolFenestranFormon ) venas el formoj.js —
// la komuna modulo, por ke interno kaj la konstruajxoj uzu la saman formon.
export function kreiSteleanFormon(w: number, h: number, r1: number, r2: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2;
  s.moveTo(-hw, 0);
  s.lineTo(hw, 0);
  s.lineTo(hw, h - r2);
  s.absarc(hw - r2, h - r2, r2, 0, Math.PI / 2, false);
  s.lineTo(-hw + r1, h);
  s.absarc(-hw + r1, h - r1, r1, Math.PI / 2, Math.PI, false);
  s.closePath();
  return s;
}// ⟨ La sekco de la pilieroj 📃 ⟩ — diamantajDuonoj. Kvar pintoj je 45° alfrontas la
// murojn, sed la ORAJ anguloj estas rondigitaj per veraj cirklaj arkoj, do la kvar
// flankoj restas PLENE EBENAJ kaj la sekco estas konveksa cxie —
// neniu konkaveco. La konturo komencas cxe la fronta akso ( 0° ) kaj iras horlogxe.
//
// ⟨ Kial ne CatmullRom-tondado 📃 ⟩ — la antaŭa funkcio rondigis la angulojn per
// centripeta CatmullRom-kurbo tra la angulaj punktoj. Tiu kurbo tamen trafas
// precize la SAMajn punktojn ( la punktoj estas egale disigitaj laŭ la perimetro ),
// do ĝi efektive NENION rondigis — ĝi nur trenis la kvar angulojn akraj kaj lasis
// la flankojn iom svingiĝi. La sekco do aspektis faceta, kaj la velditaj normaloj
// ĉe la bazo kavigis la baz-facon. Nun la anguloj estas veraj arkoj ( radiuso rc )
// kaj la flankoj restas ebenaj.
//     @param s ( number ) - La duon-diagonalo de la diamanto ( la anguloj ).
//     @param rc ( number ) - La radiuso de la rondigitaj anguloj.
//     @returns punktoj - La 0o24 konturaj punktoj, en ordo ( horlogxe ).
export function diamantajDuonoj(s: number, rc = 0o1/0o20): [ number, number ][] {
  const d = s * Math.SQRT1_2;
  const kvar: [ number, number ][] = [ [ d, -d ], [ -d, -d ], [ -d, d ], [ d, d ] ];
  // Tri paŝoj sur ĉiu angula arko ( do kvar punktoj ) kaj unu punkto meze de ĉiu
  // ebena flanko. La anguloj kaj la flankoj do havas po la saman konturon ĉe la
  // tubo, ĉe la baza kapo kaj ĉe la pinta kapo — ili kongruas precize.
  const ARKOJ = 3, FLATAJ = 1;
  const punktoj: [ number, number ][] = [];
  for ( let j = 0; j < kvar.length; j++ ) {
    const a = kvar[j];
    const antauxa = kvar[( j + kvar.length - 1 ) % kvar.length];
    const sekva = kvar[( j + 1 ) % kvar.length];
    // u — la direkto de la alvenanta rando, v — de la foriranta.
    const u = new THREE.Vector2(a[0] - antauxa[0], a[1] - antauxa[1]).normalize();
    const v = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]).normalize();
    // La arka centro sidas rc for de AMBAŬ randoj, do la arko tanĝas ilin sen
    // angulo. La arko iras de la tanĝa punkto ĉe la alvenanta rando al la tanĝa
    // punkto ĉe la foriranta, kaj la angulo malpliiĝas ( la konturo iras horlogxe ).
    const centro = [ a[0] + rc * ( v.x - u.x ), a[1] + rc * ( v.y - u.y) ];
    const komencaAngulo = Math.atan2(-v.y, -v.x);
    for ( let k = 0; k <= ARKOJ; k++ ) {
      const angulo = komencaAngulo - k / ARKOJ * Math.PI / 2;
      punktoj.push([ centro[0] + rc * Math.cos(angulo), centro[1] + rc * Math.sin(angulo) ]);
    }
    // La ebena flanko inter ĉi tiu arko kaj la sekva.
    const rando = new THREE.Vector2(sekva[0] - a[0], sekva[1] - a[1]);
    const longeco = rando.length() - 2 * rc;
    for ( let k = 1; k <= FLATAJ; k++ ) {
      punktoj.push([
        a[0] + v.x * rc + v.x * longeco * k / ( FLATAJ + 1 ),
        a[1] + v.y * rc + v.y * longeco * k / ( FLATAJ + 1 ),
      ]);
    }
  }
  return punktoj;
}
