// ≺⧼ La validigoj ✅ ⧽≻
// La kontroloj de la plano per la reguloj de la krada urbo — spronoj, blokaj
// spacoj, la kvar-obia simetrio kaj la vojoj en malplenaj regionoj
// ( KradaProblemo, validiKradon ).
import type { KradaKonstruajxo, KradaPlano } from "./tipoj.js";
export interface KradaProblemo { kodo: string; mesaĝo: string; }

// validiKradon — kontrolas la planon per la reguloj de la krada urbo.
//   · ĉiu ne-stacia konstruaĵo estas konektita per sprono ( neniu konstruaĵo
//     sen vojo, neniu pendanta sprono al malplena tero );
//   · neniu sprono transiras alian konstruaĵon;
//   · kvar-bloka. ĉiu bloko havas vojojn sur ĉiuj kvar flankoj ( la voja
//     bloko ), kaj la spaco inter la konstruaĵoj en la bloko egalas la
//     distancon de la konstruaĵo al la vojo;
//   · la TUTA krado estas simetria sub 90°-rotacio ( pozicioj kaj tipoj por
//     ĉiuj konstruaĵoj; rotacioj ankaŭ por la kvar-bloka krado kaj por la
//     ne-diagonalaj konstruaĵoj de la unu-bloka — la diagonalaj pordoj de la
//     unu-bloka frontas norden/suden, heredaĵo de la originala urbo );
//   · neniu vojo kuŝas en malplena regiono ( la korneroj de la diamanto ).
export function validiKradon(plano: KradaPlano): KradaProblemo[] {
  const problemoj: KradaProblemo[] = [];
  const { arangxo, konstruaĵoj, vojoj, spronoj, PASXO } = plano;
  const konektitaj = new Set(spronoj.map(s => s.konstruajxo));

  // 1. Ĉiu ne-stacia konstruaĵo havas spronon.
  for ( let i = 0; i < konstruaĵoj.length; i++ ) {
    const k = konstruaĵoj[i];
    if ( k.stacia || ( k.x === 0 && k.z === 0 ) ) continue;
    if ( !konektitaj.has(i) ) {
      problemoj.push({ kodo: "sen-sprono", mesaĝo: `konstruaĵo ${i} ( ${k.tipo} @ ${k.x},${k.z} ) havas neniun spronon` });
    }
  }

  // 2. Neniu sprono transiras alian konstruaĵon. La spronoj estas ĉiam
  //    aks-paralelaj ( la pordo frontas laŭ la domina akso, la celo kuŝas sur
  //    la sama linio ), do sufiĉas intervala interkovro sur ambaŭ aksoj.
  const duonLarĝo = 0o10 / 2;   // la konstruaĵoj estas kvadrataj ( w = d = 0o10 )
  for ( const sp of spronoj ) {
    const [ ax, az ] = sp.de, [ bx, bz ] = sp.al;
    const x1 = Math.min(ax, bx), x2 = Math.max(ax, bx);
    const z1 = Math.min(az, bz), z2 = Math.max(az, bz);
    for ( let j = 0; j < konstruaĵoj.length; j++ ) {
      if ( j === sp.konstruajxo ) continue;
      const k = konstruaĵoj[j];
      if ( x1 <= k.x + duonLarĝo && x2 >= k.x - duonLarĝo && z1 <= k.z + duonLarĝo && z2 >= k.z - duonLarĝo ) {
        problemoj.push({ kodo: "sprono-transiras", mesaĝo: `sprono ${sp.konstruajxo} ( ${konstruaĵoj[sp.konstruajxo].tipo} ) transiras konstruaĵon ${j} ( ${k.tipo} @ ${k.x},${k.z} )` });
      }
    }
  }

  // 3. Kvar-bloka. la voja bloko — ĉiu bloko havas vojojn sur ĉiuj kvar flankoj.
  if ( arangxo.blokaGrando === "kvar" ) {
    const M = PASXO / 2;
    const havasNS = ( rx: number, z: number ) => vojoj.some(v => v.orient === "NS" && Math.abs(v.poz - rx) < 0o1/0o1000 && v.de <= z && z <= v.al);
    const havasEW = ( rz: number, x: number ) => vojoj.some(v => v.orient === "EW" && Math.abs(v.poz - rz) < 0o1/0o1000 && v.de <= x && x <= v.al);
    for ( const [ c, r, t ] of plano.ĉeloj ) {
      if ( c === 0 && r === 0 ) continue;
      const cx = c * PASXO, cz = r * PASXO;
      const mankas: string[] = [];
      if ( !havasEW(cz + M, cx) ) mankas.push("nordo");
      if ( !havasEW(cz - M, cx) ) mankas.push("sudo");
      if ( !havasNS(cx - M, cz) ) mankas.push("okcidento");
      if ( !havasNS(cx + M, cz) ) mankas.push("oriento");
      if ( mankas.length ) problemoj.push({ kodo: "voja-bloko", mesaĝo: `bloko (${c},${r}) ${t} mankas vojojn: ${mankas.join(", ")}` });
    }
  }

  // 4. La TUTA krado simetria sub 90°-rotacio ( la stacio estas escepto — en
  //    la unu-bloka ĝi sidas sur la norda akso, en la kvar-bloka ĝi estas la
  //    rotacie-simetria centro ).
  const normalizi = ( r: number ) => { const m = ( ( r % ( 2 * Math.PI ) ) + 2 * Math.PI ) % ( 2 * Math.PI ); return m > Math.PI ? m - 2 * Math.PI : m; };
  const neStaciaj = konstruaĵoj.filter(k => !k.stacia);
  const signaturo = ( k: KradaKonstruajxo, rotita: boolean, kunRotacio: boolean ): string => {
    const x = rotita ? -k.z : k.x;
    const z = rotita ? k.x : k.z;
    const rot = kunRotacio ? normalizi(rotita ? k.rot - Math.PI / 2 : k.rot) : 0;
    return `${x.toFixed(3)},${z.toFixed(3)},${k.tipo},${rot.toFixed(3)}`;
  };
  const kontroliSimetrion = ( kunRotacio: boolean, kodo: string ) => {
    const originalo = new Set(neStaciaj.map(k => signaturo(k, false, kunRotacio)));
    const rotita = new Set(neStaciaj.map(k => signaturo(k, true, kunRotacio)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo, mesaĝo: `la krado ne estas 4-oble simetria — mankas: ${mankantaj.join(" ; ")}` });
    }
  };
  kontroliSimetrion(false, "simetrio-pozicia");
  // La rotaciaj simetrioj. la kvar-bloka tenas poziciojn KAJ rotaciojn
  // ekzakte; la unu-bloka tenas la rotaciojn de la ne-diagonalaj konstruaĵoj
  // ( la diagonalaj pordoj — |x| = |z| — frontas norden/suden, la hereda
  // fronta regulo de la originala urbo, kaj ne transformiĝas sub rotacio ).
  if ( arangxo.blokaGrando === "kvar" ) kontroliSimetrion(true, "simetrio-rotacia");
  else {
    const neDiagonalaj = neStaciaj.filter(k => Math.abs(k.x) !== Math.abs(k.z));
    const originalo = new Set(neDiagonalaj.map(k => signaturo(k, false, true)));
    const rotita = new Set(neDiagonalaj.map(k => signaturo(k, true, true)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo: "simetrio-rotacia", mesaĝo: `la ne-diagonalaj rotacioj ne estas 4-oble simetriaj — mankas: ${mankantaj.join(" ; ")}` });
    }
  }

  // 5. Kvar-bloka. la spaco inter la konstruaĵoj en la bloko ( 8 ) egalas la
  //    distancon de la konstruaĵo al la vojo ( muro → voja centro = spur-longeco
  //    + duonL ). La kvar konstruaĵoj de bloko sidas je ±BLOKO ( 8 ), duon-
  //    larĝo 4 → la gapo inter apudaj muroj en la bloko estas 8.
  if ( arangxo.blokaGrando === "kvar" ) {
    const duonL = 0o7/0o10;
    for ( const sp of spronoj ) {
      const longo = Math.hypot(sp.al[0] - sp.de[0], sp.al[1] - sp.de[1]);
      const dist = longo + duonL;
      if ( Math.abs(dist - 0o10) > 0o1/0o1000 ) {
        problemoj.push({ kodo: "spaco", mesaĝo: `sprono ${sp.konstruajxo}: distanco al vojo ${dist.toFixed(0o1)} ≠ 0o10 ( la spaco en la bloko )` });
      }
    }
  }

  // 6. Neniu vojo en malplena regiono — la vojoj restas apud la blokoj ( la
  //    korneroj de la diamanto kaj la regionoj preter la eksteraj blokoj
  //    ricevas nenian vojon ). Ĉiu segmento havas siajn du finojn kaj sian
  //    mezon ene de 2 pasxoj de la plej proksima ĉelo — la longaj "vostoj"
  //    laŭ la rando ( de la kornera ŝtuparo al la kolumnaj blokoj ) pasas je
  //    ~1.5 pasxoj, sed vojo tra la MEZO de malplena regiono ( pli ol 2
  //    pasxoj de ĉiu ĉelo ) estas problemo.
  const ĉelPozoj = plano.ĉeloj.map(( [ c, r ] ) => [ c * PASXO, r * PASXO ] as [ number, number ]);
  const distMin = ( x: number, z: number ) =>
    Math.min(...ĉelPozoj.map(( [ cx, cz ] ) => Math.hypot(x - cx, z - cz)));
  for ( const v of vojoj ) {
    if ( v.stacia ) continue;
    const punktoj = [ v.de, ( v.de + v.al ) / 2, v.al ];
    const distoj = v.orient === "EW"
      ? punktoj.map(x => distMin(x, v.poz))
      : punktoj.map(z => distMin(v.poz, z));
    if ( distoj.some(d => d > 2 * PASXO) ) {
      problemoj.push({ kodo: "vojo-malplena", mesaĝo: `segmento ${v.orient} @ ${v.poz} ( ${v.de}..${v.al} ) pasas pli ol 2 pasxojn de la plej proksima ĉelo` });
    }
  }

  return problemoj;
}
