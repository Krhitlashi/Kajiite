// ≺⧼ j͑ʃ'ᴜ ſɭɹ ֭ſɭɹ }ʃꞇ ✅ ⧽≻
import type { KradaPaq, KradaPlano } from "./hahunaq.js";
export interface KradaProblemo { kodo: string; vop2lna: string; }

export function validiKradon(plano: KradaPlano): KradaProblemo[] {
  const problemoj: KradaProblemo[] = [];
  const { arangxo, paqj, hak6h6, spronoj, PASXO } = plano;
  const konektitaj = new Set(spronoj.map(s => s.paq));

  for ( let i = 0; i < paqj.length; i++ ) {
    const k = paqj[i];
    if ( k.stacia || ( k.x === 0 && k.z === 0 ) ) continue;
    if ( !konektitaj.has(i) ) {
      problemoj.push({ kodo: "sen-sprono", vop2lna: `ſןᴜȝ ${i} ( ${k.hunaq} @ ${k.x},${k.z} ) ꞙɭɔ sprono` });
    }
  }

  const p2somaniSefini = 0o10 / 2;
  for ( const sp of spronoj ) {
    const [ ax, az ] = sp.de, [ bx, bz ] = sp.al;
    const x1 = Math.min(ax, bx), x2 = Math.max(ax, bx);
    const z1 = Math.min(az, bz), z2 = Math.max(az, bz);
    for ( let j = 0; j < paqj.length; j++ ) {
      if ( j === sp.paq ) continue;
      const k = paqj[j];
      if ( x1 <= k.x + p2somaniSefini && x2 >= k.x - p2somaniSefini && z1 <= k.z + p2somaniSefini && z2 >= k.z - p2somaniSefini ) {
        problemoj.push({ kodo: "sprono-transiras", vop2lna: `sprono ${sp.paq} ( ${paqj[sp.paq].hunaq} ) ſɭɜ ʃɔ ſɭᴜ ſןᴜȝ ${j} ( ${k.hunaq} @ ${k.x},${k.z} )` });
      }
    }
  }

  if ( arangxo.blokaGrando === "kvar" ) {
    const M = PASXO / 2;
    const havasNS = ( rx: number, z: number ) => hak6h6.some(v => v.orient === "NS" && Math.abs(v.haxekuxa - rx) < 0o1/0o1000 && v.de <= z && z <= v.al);
    const havasEW = ( rz: number, x: number ) => hak6h6.some(v => v.orient === "EW" && Math.abs(v.haxekuxa - rz) < 0o1/0o1000 && v.de <= x && x <= v.al);
    for ( const [ c, r, t ] of plano.haKekkozusai ) {
      if ( c === 0 && r === 0 ) continue;
      const cx = c * PASXO, cz = r * PASXO;
      const mankas: string[] = [];
      if ( !havasEW(cz + M, cx) ) mankas.push("j͐ʃᴜȝ");
      if ( !havasEW(cz - M, cx) ) mankas.push("ſɭᴜȝ");
      if ( !havasNS(cx - M, cz) ) mankas.push("j͑ʃᴜȝ");
      if ( !havasNS(cx + M, cz) ) mankas.push("ɽ͑ʃ'ᴜȝ");
      if ( mankas.length ) problemoj.push({ kodo: "k6h6-bloko", vop2lna: `ſɭɹ ſןᴜ (${c},${r}) ${t} , ꞙɭɔ ſɭэ ֭ſɭэ , ${mankas.join(", ")}` });
    }
  }

  const normalizi = ( r: number ) => { const m = ( ( r % ( 2 * Math.PI ) ) + 2 * Math.PI ) % ( 2 * Math.PI ); return m > Math.PI ? m - 2 * Math.PI : m; };
  const neStaciaj = paqj.filter(k => !k.stacia);
  const signaturo = ( k: KradaPaq, rotita: boolean, kunRotacio: boolean ): string => {
    const x = rotita ? -k.z : k.x;
    const z = rotita ? k.x : k.z;
    const rot = kunRotacio ? normalizi(rotita ? k.rot - Math.PI / 2 : k.rot) : 0;
    return `${x.toFixed(3)},${z.toFixed(3)},${k.hunaq},${rot.toFixed(3)}`;
  };
  const kontroliSimetrion = ( kunRotacio: boolean, kodo: string ) => {
    const originalo = new Set(neStaciaj.map(k => signaturo(k, false, kunRotacio)));
    const rotita = new Set(neStaciaj.map(k => signaturo(k, true, kunRotacio)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo, vop2lna: `ſɭɹ ſןᴜ ꞙɭэ , ꞙɭɔ , ${mankantaj.join(" ; ")}` });
    }
  };
  kontroliSimetrion(false, "simetrio-xekuxa");
  if ( arangxo.blokaGrando === "kvar" ) kontroliSimetrion(true, "simetrio-rotacia");
  else {
    const neDiagonalaj = neStaciaj.filter(k => Math.abs(k.x) !== Math.abs(k.z));
    const originalo = new Set(neDiagonalaj.map(k => signaturo(k, false, true)));
    const rotita = new Set(neDiagonalaj.map(k => signaturo(k, true, true)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0, 4);
      problemoj.push({ kodo: "simetrio-rotacia", vop2lna: `ſɭɹ ſןᴜ ʌ ꞙɭэ , ꞙɭɔ , ${mankantaj.join(" ; ")}` });
    }
  }

  if ( arangxo.blokaGrando === "kvar" ) {
    const duonL = 0o7/0o10;
    for ( const sp of spronoj ) {
      const sahakani = Math.hypot(sp.al[0] - sp.de[0], sp.al[1] - sp.de[1]);
      const dist = sahakani + duonL;
      if ( Math.abs(dist - 0o10) > 0o1/0o1000 ) {
        problemoj.push({ kodo: "spaco", vop2lna: `sprono ${sp.paq} , ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ ${dist.toFixed(0o1)} ≠ ꞙɭıɔ` });
      }
    }
  }

  const ĉelPozoj = plano.haKekkozusai.map(( [ c, r ] ) => [ c * PASXO, r * PASXO ] as [ number, number ]);
  const distMin = ( x: number, z: number ) =>
    Math.min(...ĉelPozoj.map(( [ cx, cz ] ) => Math.hypot(x - cx, z - cz)));
  for ( const v of hak6h6 ) {
    if ( v.stacia ) continue;
    const n2k = [ v.de, ( v.de + v.al ) / 2, v.al ];
    const distoj = v.orient === "EW"
      ? n2k.map(x => distMin(x, v.haxekuxa))
      : n2k.map(z => distMin(v.haxekuxa, z));
    if ( distoj.some(d => d > 2 * PASXO) ) {
      problemoj.push({ kodo: "k6h6-malplena", vop2lna: `ſɭэ ֭ſɭэ ʌ ſɭɔƽ ${v.orient} @ ${v.haxekuxa} ( ${v.de}..${v.al} ) , ſɭᴜ ſɭᴜ ɿ havepat6ni ʌ ſɭɹ ſןᴜ ʌ ſᶘɹ ſɭɔ` });
    }
  }

  return problemoj;
}
