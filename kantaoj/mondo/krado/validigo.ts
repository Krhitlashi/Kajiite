// ≺⧼ ការផ្ទៀងផ្ទាត់ ✅ ⧽≻
import type { KradaKonstruajxo, KradaPlano } from "./tipoj.js";
export interface KradaProblemo { kodo: string; mesaĝo: string; }

export function validiKradon(plano: KradaPlano): KradaProblemo[] {
  const problemoj: KradaProblemo[] = [];
  const { arangxo, konstruaĵoj, vojoj, spronoj, PASXO } = plano;
  const konektitaj = new Set(spronoj.map(s => s.konstruajxo));

  for ( let i = 0; i < konstruaĵoj.length; i++ ) {
    const k = konstruaĵoj[i];
    if ( k.stacia || ( k.x === 0 && k.z === 0 ) ) continue;
    if ( !konektitaj.has(i) ) {
      problemoj.push({ kodo: "sen-sprono", mesaĝo: `konstruaĵo ${i} ( ${k.tipo} @ ${k.x},${k.z} ) havas neniun spronon` });
    }
  }

  const duonLarĝo = 0o10 / 2;
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
