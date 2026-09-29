// ≺⧼ Vojoj 🛣️ ⧽≻
// Poluritaj dioritaj vojoj kun andezitaj bordoj
// Uzas rektangulajn Shape + ExtrudeGeometry por puraj longaj flankoj ( intersekcoj interkovras )
import * as THREE from "three";
import { kreiGeometriajnBufrojn, kreiVojajnBendojn, kreiVojojnMaterialojn, specimeniAngulojn } from "./vojoj/bufroj.js";
import { konstruiRondajnKapojn } from "./vojoj/kapoj.js";
import { VOJA_DIKECO, VOJA_EKSTERA_DUONO, VOJA_SUPRO_LEVIGXO, VOJA_TRUA_DUONO } from "./vojoj/mezuroj.js";
import { konstruiSegmentonEnBufrojn, kreiSegmentajnPartojn } from "./vojoj/segmentoj.js";
import { vojSuprajxoj, type VojDifino } from "./vojoj/tipoj.js";

// konstruiVojojn — Konstruu cxiujn vojsegmentojn kun dioritaj suprajoj kaj andezitaj randoj.
// La kunigaj punktoj ( la nodoj kiuj ricevas platon ) malplenigas la vojan
// geometrion en la kuniga kvadrato — vidu kreiSegmentajnPartojn.
//     @param kunigoj ( [ number, number ][] ) - La punktoj de la kunigaj platoj.
//     @returns samples ( Vector3[] ) - La specimenoj por la lampoj kaj la vegetajxo.
export function konstruiVojojn(sceno: THREE.Scene,
  defs: VojDifino[],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  kunigoj: [ number, number ][] = []
): THREE.Vector3[] {
  const samples: THREE.Vector3[] = [];
  // La bendoj ne plu intertavoligas. PolygonOffset restas por ke la voja
  // CENTRO gajnu super la perpendikularaj bordoj ( la samloke kuŝantaj bendoj
  // de la alia vojo ). Kun egalaj unuoj ( -1/-1 ) la desegna ordo decidis kaj
  // la andezita bordo de la alia vojo fendetis sur la diorita centro ĉe la
  // L-korneroj. La centro nun havas -4 unuojn — tri pli ol la bordoj ( -1 ).
  // Unu-du unuoj da diferenco restis ĉe la precizec-rando ( la gajnanto
  // ŝanceliĝis laŭ la fotila distanco ). Tri unuoj apartigas glate, do la
  // centroj kunfandiĝas pure kaj la bordoj finiĝas ĉe la perpendikulara centro.
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -2, -4, -1, -1);

  // La tuta reto konstruiĝas en DU bufroj — unu po materialo — kaj kunigas
  // unufoje ĉe la fino. La miloj da etaj per-ŝtupaj meshoj fariĝas DU
  // desegnajn alvokojn por la tuta voja reto.
  const bufroj = kreiGeometriajnBufrojn();
  for ( const def of defs ) {
    // Unuopaj difinoj povas doni propran altan funkcion ( ekz. la arbarvojo
    // malsupreniras al la aprona nivelo cxe la kosmoporda stacio ).
    const defAlt = def.heightFn || heightFn;
    for ( let i = 0; i < def.pts.length - 1; i++ ) {
      const [ aX, aZ ] = def.pts[i];
      const [ bX, bZ ] = def.pts[i + 1];
      // Voja surfaco. Diorita centro kun andezitaj flankoj APUD gxi — ne plu
      // randa strio tavolita sub la centro. La malnova intertavolo z-fightingis
      // kiam la fotilo rigardis preskaux rekte malsupren ( la minimapo ), kaj
      // la tuta vojo aperis nigra. La tri bendoj nun sidas flank-al-flanke.
      //
      // ⟨ La kunigaj truoj 📃 ⟩ — la segmento konstruiĝas en partoj; ĉe ĉiu
      // kunigo la geometrio haltas ( la plato posedas tiun kvadraton ) kaj la
      // truo ricevas piedeblan strion, por ke la promenanto ne faletu al la
      // tereno trapasante kunigon.
      const longo = Math.hypot(bX - aX, bZ - aZ);
      const bendoj = kreiVojajnBendojn(def.w, supraMaterialo, bordaMaterialo);
      const ndx = ( bX - aX ) / longo, ndz = ( bZ - aZ ) / longo;
      for ( const [ t0, t1, konstruu ] of kreiSegmentajnPartojn(aX, aZ, bX, bZ, longo, kunigoj) ) {
        const px1 = aX + ndx * t0, pz1 = aZ + ndz * t0;
        const px2 = aX + ndx * t1, pz2 = aZ + ndz * t1;
        if ( konstruu ) {
          konstruiSegmentonEnBufrojn(px1, pz1, px2, pz2, bendoj, VOJA_DIKECO, defAlt, bufroj, def.glata === true);
          continue;
        }
        const mX = ( px1 + px2 ) / 2, mZ = ( pz1 + pz2 ) / 2;
        const kunigaSupro = specimeniAngulojn(mX, mZ, VOJA_EKSTERA_DUONO, VOJA_EKSTERA_DUONO, defAlt).maksimumo
          + VOJA_SUPRO_LEVIGXO;
        vojSuprajxoj.push({ x1: px1, z1: pz1, x2: px2, z2: pz2, duono: VOJA_EKSTERA_DUONO,
          y0: kunigaSupro, y1: kunigaSupro });
      }
      // Specimenoj por lampoj — kaj por la vegetajxo-ekskludo. Unu specimeno
      // cxiun ~2 unuojn, por ke neniu planto povu sidi inter maldensajn
      // specimenojn kaj aperi sur la vojo.
      const nombro = Math.max(1, Math.round(longo / 2));
      for ( let k = 0; k <= nombro; k++ ) {
        const t = k / nombro;
        const sx = aX + ( bX - aX ) * t;
        const sz = aZ + ( bZ - aZ ) * t;
        samples.push(new THREE.Vector3(sx, defAlt(sx, sz), sz));
      }
    }
  }
  bufroj.kunigi(sceno);
  // ⟨ Aŭtomataj rondigitaj finoj 📃 ⟩ — la unua kaj la lasta punktoj de ĉiu
  // difino kun `kapoj: true` estas liberaj voj-finoj. Ĉiu fino ekster ĉiu kuniga
  // truo ( do ne kovrita de plato ) ricevas rondigitan ĉapon aux­tomate, kun la
  // elira direkto de la vojo. Kradaj segmentoj, doka ŝtuparoj kaj aliaj
  // internaj difinoj sen `kapoj: true` ne ricevas ĉapojn. Liberaj finoj ( kajaj
  // finajxoj, pontaj surterigxoj, T-kunigoj al skulptitaj vojoj ) rondigxas mem.
  const kapoj = new Map<( x: number, z: number ) => number, { nodoj: [ number, number ][]; direktoj: [ number, number ][] }>();
  const kapoVidita: [ number, number ][] = [];
  // Kunigitaj finoj ( la sama punkto kiel fino de pluraj difinoj ) estas
  // internaj kubutoj, ne voj-finoj — ili ricevas nenian ĉapon.
  const finokalkulo = new Map<string, number>();
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    for ( const pto of [ def.pts[0], def.pts[def.pts.length - 1] ] ) {
      const klavo = pto[0] + "," + pto[1];
      finokalkulo.set(klavo, ( finokalkulo.get(klavo) ?? 0 ) + 1);
    }
  }
  for ( const def of defs ) {
    if ( def.pts.length < 2 || def.kapoj !== true ) continue;
    // La dokaj ŝtuparoj jam havas sian finon ( la rondigita platforma pinto ),
    // do ili ricevas nenian ĉapon.
    if ( def.stuparo === true ) continue;
    const finoj: [ [ number, number ], [ number, number ] ][] = [
      [ def.pts[0], def.pts[1] ],
      [ def.pts[def.pts.length - 1], def.pts[def.pts.length - 2] ],
    ];
    for ( const [ fino, najbaro ] of finoj ) {
      const dx = fino[0] - najbaro[0], dz = fino[1] - najbaro[1];
      const direktaLongo = Math.hypot(dx, dz);
      if ( direktaLongo < 0o1/0o100 ) continue;
      // Kunigita fino ( interna kubuto ) ricevas nenian ĉapon.
      if ( ( finokalkulo.get(fino[0] + "," + fino[1]) ?? 0 ) > 1 ) continue;
      // Jam kovrita fino ( du vojoj kunigas kap-al-kape, aux fermita buklo )
      // ricevas unu solan ĉapon — neniu duobla geometrio samloke.
      if ( kapoVidita.some(([ vx, vz ]) => Math.hypot(fino[0] - vx, fino[1] - vz) < 0o1/0o100) ) continue;
      let enTruo = false;
      for ( const [ kX, kZ ] of kunigoj ) {
        if ( Math.hypot(fino[0] - kX, fino[1] - kZ) < VOJA_TRUA_DUONO + 0o1/0o100 ) { enTruo = true; break; }
      }
      if ( enTruo ) continue;
      kapoVidita.push([ fino[0], fino[1] ]);
      const defAlt = def.heightFn || heightFn;
      let grupo = kapoj.get(defAlt);
      if ( !grupo ) { grupo = { nodoj: [], direktoj: [] }; kapoj.set(defAlt, grupo); }
      grupo.nodoj.push([ fino[0], fino[1] ]);
      grupo.direktoj.push([ dx / direktaLongo, dz / direktaLongo ]);
    }
  }
  for ( const [ altFn, grupo ] of kapoj ) {
    konstruiRondajnKapojn(sceno, grupo.nodoj, grupo.direktoj, altFn, dioritaMaterialo, andezitaMaterialo);
  }
  return samples;
}
