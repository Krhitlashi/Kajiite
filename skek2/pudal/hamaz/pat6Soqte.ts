// ≺⧼ ſןᴜ ɭʃэ ɭʃɔ 🥾 ⧽≻
import * as THREE from "three";
import { vakox2qQoxaKefoujn, p6zukaSkatolajnUk6h6n } from "../../x2x2q/hakox2q.js";
import { superpuc2q, kf2RinganSurfacon } from "./haqoxa.js";

// ⟪ ſןᴜ ɭʃэ ɭʃɔ 🥾 ⟫

// ⟨ j͑ʃɜ ſɭ,ᴜ , ꞙɭɿ , ⟅ ⟩
export function kf2Botan(): { boto: THREE.BufferGeometry; akcentaj: THREE.BufferGeometry } {
  // ⟨ ſɭэ ſɭ,w , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  // ⟨ ſןᴜ ɭʃэ , ɔ.ɔɔɿ , ſɭэ ſɭ,w , ⟅ ⟩
  const GRUNDO = -0o1/0o2 + 0o0/0o10;
  const PLANDAL6DA = 0o3/0o200;
  const PLANDAKMARO = GRUNDO + PLANDAL6DA;
  // ⟨ ſɟɔȝ , ſןᴜ ɭʃэ , ⟅ ⟩
  const LEDAFUNDO = PLANDAKMARO - 0o1/0o100;
  const K = 0o20;
  const r = ( i: number ) => i / K * Math.PI * 0o2;

  // ⟨ ſɭэ ɭʃᴜ , V ⟅ ⟩
  // ⟨ ſɭэ ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const KRESTA = 0o2/0o100;
  const kresto = (ang: number) => KRESTA * ( 0o1 - Math.sin(ang) ) / 0o2;
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭэ , ⟅ ⟩
  const ANGULANOĈO = 0o1/0o100;
  const angulaNoĉo = (ang: number) =>
    ANGULANOĈO * Math.pow(Math.abs(Math.sin(ang * 0o2)), 0o10);
  // ⟨ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭɔ , ⟅ ⟩
  // ⟨ ɭʃɜ ſɭɹȝ , ꞙɭı , ⟅ ⟩
  // ⟨ j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ⟩
  // ⟨ ɭʃɜ ſɭɹȝ , ſɭɜ ſɭᴜƽ , ⟅ ⟩
  const RANDOY = -0o3/0o16;
  const RANDOA = 0o30/0o400;
  const RANDOB = 0o33/0o400;
  const stipajHat2q2: [ number, number, number, number ][] = [
    [ RANDOY,              RANDOA,        RANDOB,       0o1     ],
    [ RANDOY - 0o1/0o200,  RANDOA,        RANDOB,       0o1     ],
    [ RANDOY - 0o3/0o200,  0o27/0o400,     0o31/0o400,    0o2/0o3 ],
    [ -0o1/0o4,             0o31/0o400,     0o32/0o400,    0o0       ],
    [ -0o54/0o200,          0o31/0o400,     0o31/0o400,    0o0       ],
    [ -0o66/0o200,          0o31/0o400,     0o30/0o400,    0o0       ],
    [ -0o73/0o200,          0o27/0o400,     0o27/0o400,    0o0       ],
    [ -0o76/0o200,          0o16/0o400,     0o16/0o400,    0o0       ],
  ];
  // ⟨ ɭʃɜ ſɭɹȝ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ɭʃɜ ſɭɹȝ , ſɟɔȝ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ᶅſw ſןɜ ɭʃɔ , ꞙɭı , ⟅ ⟩
  const sost2 = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0o0, y, z ] as [ number, number, number ] );
  // ⟨ ɭʃᴜ , ꞙɭɔ , ɭʃᴜʞ , ⟅ ⟩
  const c2q = ( y: number, a: number, b: number, p = 0o0, noĉoj = true ) =>
    Array.from({ length: K }, ( _, i ) => {
      const ang = r(i);
      const [ x, z ] = superpuc2q(ang, a, b, 0o4);
      const x6mi = kresto(ang) - ( noĉoj ? angulaNoĉo(ang) : 0o0 );
      return [ x, y + x6mi * p, z ] as [ number, number, number ];
    });
  const ŝtipajHat2q2 = [ sost2(stipajHat2q2[0o0][0o0], 0o0),
    ...stipajHat2q2.map(([ y, a, b, p ]) => c2q(y, a, b, p)),
    sost2(stipajHat2q2[stipajHat2q2.length - 0o1][0o0], 0o0) ];
  const ŝhunaq = kf2RinganSurfacon(ŝtipajHat2q2);

  // ⟨ ſןᴜ ɭʃэ , ꞙɭэ , ⟅ ⟩
  // ⟨ ſןᴜ ɭʃэ , j͑ʃᴜ ʃɜ , ⟅ ⟩
  const hapat6Haqaroxema: [ number, number, number ][] = [
    [ -0o15/0o200, 0o10/0o200, -0o60/0o200 ],
    [ -0o11/0o200, 0o13/0o200, -0o56/0o200 ],
    [ -0o5/0o200,  0o14/0o200, -0o54/0o200 ],
    [  0o1/0o200,  0o15/0o200, -0o53/0o200 ],
    [  0o5/0o200,  0o15/0o200, -0o54/0o200 ],
    [  0o16/0o200, 0o14/0o200, -0o56/0o200 ],
    [  0o22/0o200, 0o13/0o200, -0o60/0o200 ],
    [  0o25/0o200, 0o12/0o200, -0o62/0o200 ],
    [  0o30/0o200, 0o7/0o200,  -0o63/0o200 ],
  ];
  // ⟨ j͑ʃɜ j͐ʃɹ , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ſɟɔȝ , ſןᴜ ɭʃэ , ⟅ ⟩
  const hapat6Hat2q2 = [ sost2(hapat6Haqaroxema[0o0][0o2] / 0o2 + PLANDAKMARO / 0o2, hapat6Haqaroxema[0o0][0o0]),
    ...hapat6Haqaroxema.map(([ z, a, teru ]) => {
      const hh = ( teru - LEDAFUNDO ) / 0o2, yc = ( teru + LEDAFUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superpuc2q(r(i), a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }),
    sost2(hapat6Haqaroxema[hapat6Haqaroxema.length - 0o1][0o2] / 0o2 + PLANDAKMARO / 0o2,
      hapat6Haqaroxema[hapat6Haqaroxema.length - 0o1][0o0]) ];
  const pat6 = kf2RinganSurfacon(hapat6Hat2q2);

  // ⟨ ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ſןᴜ ɭʃэ , j͑ʃᴜ ſɭ,w , ꞙɭı , ⟅ ⟩
  // ⟨ ſןᴜ ɭʃэ , ꞙɭı , ⟅ ⟩
  const haqaroxemaKuntlakakj = ( etendo: number, largxo: number ): [ number, number, number ][] =>
    hapat6Haqaroxema.map(( sect, i ) => [ i === 0o0 ? sect[0o0] - etendo
      : i === hapat6Haqaroxema.length - 0o1 ? sect[0o0] + etendo : sect[0o0],
      sect[0o1] + largxo, sect[0o2] ] as [ number, number, number ] );
  const plandajHaqaroxema = haqaroxemaKuntlakakj(0o1/0o100, 0o3/0o400);
  const pukazjHaqaroxema = haqaroxemaKuntlakakj(0o3/0o400, 0o1/0o200);
  const plandaP2somani = PLANDAL6DA / 0o2;
  const plandaYc = ( PLANDAKMARO + GRUNDO ) / 0o2;
  const plando = kf2RinganSurfacon([
    sost2(plandaYc, plandajHaqaroxema[0o0][0o0]),
    ...plandajHaqaroxema.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      const [ x, y ] = superpuc2q(r(j), a, plandaP2somani, 0o4);
      return [ x, plandaYc + y, z ] as [ number, number, number ];
    })),
    sost2(plandaYc, plandajHaqaroxema[plandajHaqaroxema.length - 0o1][0o0]),
  ]);
  // ⟨ ſןᴜ ɭʃэ , ꞙɭı ( "welt" ) ⟩
  const plandaRando = kf2RinganSurfacon([
    sost2(PLANDAKMARO, pukazjHaqaroxema[0o0][0o0]),
    ...pukazjHaqaroxema.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      // ⟨ j͑ʃᴜ ʃɜ , ꞙɭɔ , ⟅ ⟩
      const [ x, y ] = superpuc2q(r(j), a + 0o1/0o200, 0o1/0o200, 0o4);
      return [ x, PLANDAKMARO + y, z ] as [ number, number, number ];
    })),
    sost2(PLANDAKMARO, pukazjHaqaroxema[pukazjHaqaroxema.length - 0o1][0o0]),
  ]);
  // ⟨ ꞙɭı , ſןᴜ ɭʃэ , ⟅ ⟩
  // ⟨ ꞙɭı , ⟅ ⟩
  const qaroxemaJe = ( z: number ): [ number, number ] => {
    for ( let i = 0o0; i + 0o1 < hapat6Haqaroxema.length; i++ ) {
      const a = hapat6Haqaroxema[i], b = hapat6Haqaroxema[i + 0o1];
      if ( z >= a[0o0] && z <= b[0o0] ) {
        const t = ( z - a[0o0] ) / ( b[0o0] - a[0o0] );
        return [ a[0o1] + ( b[0o1] - a[0o1] ) * t, a[0o2] + ( b[0o2] - a[0o2] ) * t ];
      }
    }
    const z2hak = hapat6Haqaroxema[hapat6Haqaroxema.length - 0o1];
    return [ z2hak[0o1], z2hak[0o2] ];
  };
  const teruJe = ( x: number, z: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ a, teru ] = qaroxemaJe(z);
    const hh = ( teru - PLANDAKMARO ) / 0o2, yc = ( teru + PLANDAKMARO ) / 0o2;
    const u = Math.min(Math.abs(x) / a, 0o1);
    const v = Math.pow(Math.max(0o0, 0o1 - Math.pow(u, 0o4)), 0o1/0o4);
    return [ new THREE.Vector3(x, yc + hh * v, z),
      new THREE.Vector3(Math.sign(x) * Math.pow(u, 0o3) / a, Math.pow(v, 0o3) / hh, 0o0)
        .normalize() ];
  };
  // ⟨ j͑ʃɜ j͐ʃɹ , ɭʃꞇƽ ſןᴜ ɭʃэ j͑ʃᴜꞇ , ⟅ ⟩
  const KONTUROX = 0o13/0o400;
  const KONTUROZ = 0o37/0o400;
  const KONTUROCENTRO = 0o16/0o400;
  const KONTURODIKO = 0o3/0o400;
  // ⟨ ꞙɭı , ⟅ ⟩
  const KONTUROL6DA = 0o1/0o200;
  const KONTUROPUNKTOJ = 0o40;
  const konturaN2k = ( ang: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ x, z ] = superpuc2q(ang, KONTUROX, KONTUROZ, 0o4);
    return teruJe(x, KONTUROCENTRO + z);
  };
  const konturajHat2q2: [ number, number, number ][][] = [];
  for ( let i = 0o0; i <= KONTUROPUNKTOJ; i++ ) {
    const ang = i / KONTUROPUNKTOJ * Math.PI * 0o2;
    const [ n2k, x2x2q ] = konturaN2k(ang);
    // ⟨ ꞙɭı , ⟅ ⟩
    const [ ne3ak2 ] = konturaN2k(ang - 0o1/0o20);
    const [ posta ] = konturaN2k(ang + 0o1/0o20);
    const c2w2q = posta.clone().sub(ne3ak2).normalize();
    const vek2fe = x2x2q.clone().cross(c2w2q).normalize();
    const p2somani = vek2fe.clone().multiplyScalar(KONTURODIKO / 0o2);
    const sozasai = x2x2q.clone().multiplyScalar(KONTUROL6DA);
    const c2h2 = n2k.clone().sub(p2somani), p6sca = n2k.clone().add(p2somani);
    konturajHat2q2.push([
      [ c2h2.x, c2h2.y, c2h2.z ],
      [ p6sca.x, p6sca.y, p6sca.z ],
      [ p6sca.x + sozasai.x, p6sca.y + sozasai.y, p6sca.z + sozasai.z ],
      [ c2h2.x + sozasai.x, c2h2.y + sozasai.y, c2h2.z + sozasai.z ],
    ]);
  }
  const piedaRando = kf2RinganSurfacon(konturajHat2q2);
  // ⟨ ɭʃᴜ , j͑ʃᴜ ʃɜƽ , ⟅ ⟩
  // ⟨ ɭʃᴜ , ſɟɔȝ , ꞙɭɿ , ⟅ ⟩
  const KUFSUB = RANDOY - 0o1/0o50;
  const KUFKMARO = RANDOY + 0o3/0o200;
  const KUFELSTARO = 0o3/0o400;
  const krestaRando = kf2RinganSurfacon([
    c2q(KUFSUB, RANDOA - 0o1/0o50, RANDOB - 0o1/0o50, 0o1, false),
    c2q(KUFSUB, RANDOA + KUFELSTARO, RANDOB + KUFELSTARO, 0o1, false),
    c2q(KUFKMARO, RANDOA + KUFELSTARO, RANDOB + KUFELSTARO, 0o1, false),
    c2q(RANDOY - 0o1/0o200, RANDOA - 0o1/0o100, RANDOB - 0o1/0o100, 0o1, false),
    sost2(RANDOY - 0o1/0o200, 0o0),
  ]);
  // ⟨ ꞙɭэ , ſ͕ɭɜ ı],ᴜ , ꞙɭı , ⟅ ⟩
  const akcentaj = vakox2qQoxaKefoujn([ plando, plandaRando, piedaRando, krestaRando ]);
  p6zukaSkatolajnUk6h6n(akcentaj, 0o2);

  for ( const kek of [ ŝhunaq, pat6 ] ) p6zukaSkatolajnUk6h6n(kek, 0o2);
  return { boto: vakox2qQoxaKefoujn([ ŝhunaq, pat6 ]), akcentaj };
}
