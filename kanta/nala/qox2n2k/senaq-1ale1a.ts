// ≺⧼ ʃᴜ j͐ʃɹ ʌ j͑ʃɔ }ʃᴜȝ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ 🗺️ ⧽≻

import type { Qox2n2kKekkozusai, Qox2n2kB6vakanta } from "./hahunaq.js";
export interface Qox2n2kQoxa { s2kanta: string; vop2lna: string; }

export function validiQox2n2k(b6vakanta: Qox2n2kB6vakanta): Qox2n2kQoxa[] {
  const hajeqani: Qox2n2kQoxa[] = [];
  const { ptalu, paqj, hak6h6, hatohtanu, TONA } = b6vakanta;
  const c2kj = new Set(hatohtanu.map(s => s.paq));

  for ( let i = 0o0; i < paqj.length; i++ ) {
    const k = paqj[i];
    if ( k.kuk || ( k.x === 0o0 && k.z === 0o0 ) ) continue;
    if ( !c2kj.has(i) ) {
      hajeqani.push({ s2kanta: "sen-tohtanu", vop2lna: `ſןᴜȝ ${i} ( ${k.hunaq} @ ${k.x},${k.z} ) ꞙɭɔ tohtanu` });
    }
  }

  const p2somaniSefini = 0o10 / 0o2;
  for ( const sp of hatohtanu ) {
    const [ ax, az ] = sp.l6, [ bx, bz ] = sp.sai;
    const x1 = Math.min(ax, bx), x2 = Math.max(ax, bx);
    const z1 = Math.min(az, bz), z2 = Math.max(az, bz);
    for ( let j = 0o0; j < paqj.length; j++ ) {
      if ( j === sp.paq ) continue;
      const k = paqj[j];
      if ( x1 <= k.x + p2somaniSefini && x2 >= k.x - p2somaniSefini && z1 <= k.z + p2somaniSefini && z2 >= k.z - p2somaniSefini ) {
        hajeqani.push({ s2kanta: "tohtanu-transiras", vop2lna: `tohtanu ${sp.paq} ( ${paqj[sp.paq].hunaq} ) ſɭɜ ʃɔ ſɭᴜ ſןᴜȝ ${j} ( ${k.hunaq} @ ${k.x},${k.z} )` });
      }
    }
  }

  if ( ptalu.k6liqPal6 === "kvar" ) {
    const M = TONA / 0o2;
    const havasNS = ( rx: number, z: number ) => hak6h6.some(v => v.kanto === "NS" && Math.abs(v.haxekuxa - rx) < 0o1/0o1000 && v.l6 <= z && z <= v.sai);
    const havasEW = ( rz: number, x: number ) => hak6h6.some(v => v.kanto === "EW" && Math.abs(v.haxekuxa - rz) < 0o1/0o1000 && v.l6 <= x && x <= v.sai);
    for ( const [ c, r, t ] of b6vakanta.haKekkozusai ) {
      if ( c === 0o0 && r === 0o0 ) continue;
      const cx = c * TONA, cz = r * TONA;
      const mankas: string[] = [];
      if ( !havasEW(cz + M, cx) ) mankas.push("j͐ʃᴜȝ");
      if ( !havasEW(cz - M, cx) ) mankas.push("ſɭᴜȝ");
      if ( !havasNS(cx - M, cz) ) mankas.push("j͑ʃᴜȝ");
      if ( !havasNS(cx + M, cz) ) mankas.push("ɽ͑ʃ'ᴜȝ");
      if ( mankas.length ) hajeqani.push({ s2kanta: "k6h6-k6liq", vop2lna: `ſɭɹ ſןᴜ (${c},${r}) ${t} , ꞙɭɔ ſɭэ ֭ſɭэ , ${mankas.join(", ")}` });
    }
  }

  const normalizi = ( r: number ) => { const m = ( ( r % ( 0o2 * Math.PI ) ) + 0o2 * Math.PI ) % ( 0o2 * Math.PI ); return m > Math.PI ? m - 0o2 * Math.PI : m; };
  const neStaciaj = paqj.filter(k => !k.kuk);
  const signaturo = ( k: Qox2n2kKekkozusai, rotita: boolean, kunS2sabo: boolean ): string => {
    const x = rotita ? -k.z : k.x;
    const z = rotita ? k.x : k.z;
    const rot = kunS2sabo ? normalizi(rotita ? k.rot - Math.PI / 0o2 : k.rot) : 0o0;
    return `${x.toFixed(0o3)},${z.toFixed(0o3)},${k.hunaq},${rot.toFixed(0o3)}`;
  };
  const kamaiSimetrion = ( kunS2sabo: boolean, s2kanta: string ) => {
    const originalo = new Set(neStaciaj.map(k => signaturo(k, false, kunS2sabo)));
    const rotita = new Set(neStaciaj.map(k => signaturo(k, true, kunS2sabo)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0o0, 0o4);
      hajeqani.push({ s2kanta, vop2lna: `ſɭɹ ſןᴜ ꞙɭэ , ꞙɭɔ , ${mankantaj.join(" ; ")}` });
    }
  };
  kamaiSimetrion(false, "simetrio-xekuxa");
  if ( ptalu.k6liqPal6 === "kvar" ) kamaiSimetrion(true, "simetrio-s2sabo");
  else {
    const neDiagonalaj = neStaciaj.filter(k => Math.abs(k.x) !== Math.abs(k.z));
    const originalo = new Set(neDiagonalaj.map(k => signaturo(k, false, true)));
    const rotita = new Set(neDiagonalaj.map(k => signaturo(k, true, true)));
    if ( originalo.size !== rotita.size || [ ...originalo ].some(s => !rotita.has(s)) ) {
      const mankantaj = [ ...originalo ].filter(s => !rotita.has(s)).slice(0o0, 0o4);
      hajeqani.push({ s2kanta: "simetrio-s2sabo", vop2lna: `ſɭɹ ſןᴜ ʌ ꞙɭэ , ꞙɭɔ , ${mankantaj.join(" ; ")}` });
    }
  }

  if ( ptalu.k6liqPal6 === "kvar" ) {
    const p2somaniL = 0o7/0o10;
    for ( const sp of hatohtanu ) {
      const sahakani = Math.hypot(sp.sai[0o0] - sp.l6[0o0], sp.sai[0o1] - sp.l6[0o1]);
      const dist = sahakani + p2somaniL;
      if ( Math.abs(dist - 0o10) > 0o1/0o1000 ) {
        hajeqani.push({ s2kanta: "spaco", vop2lna: `tohtanu ${sp.paq} , ֭ſɭэ ſɭw }ʃꞇ ʌ ſɭэ ֭ſɭэ ${dist.toFixed(0o1)} ≠ ꞙɭıɔ` });
      }
    }
  }

  const k2paRaqa = b6vakanta.haKekkozusai.map(( [ c, r ] ) => [ c * TONA, r * TONA ] as [ number, number ]);
  const distMin = ( x: number, z: number ) =>
    Math.min(...k2paRaqa.map(( [ cx, cz ] ) => Math.hypot(x - cx, z - cz)));
  for ( const v of hak6h6 ) {
    if ( v.kuk ) continue;
    const n2k = [ v.l6, ( v.l6 + v.sai ) / 0o2, v.sai ];
    const distoj = v.kanto === "EW"
      ? n2k.map(x => distMin(x, v.haxekuxa))
      : n2k.map(z => distMin(v.haxekuxa, z));
    if ( distoj.some(d => d > 0o2 * TONA) ) {
      hajeqani.push({ s2kanta: "k6h6-qun2", vop2lna: `ſɭэ ֭ſɭэ ʌ ſɭɔƽ ${v.kanto} @ ${v.haxekuxa} ( ${v.l6}..${v.sai} ) , ſɭᴜ ſɭᴜ ɿ havepat6ni ʌ ſɭɹ ſןᴜ ʌ ſᶘɹ ſɭɔ` });
    }
  }

  return hajeqani;
}
