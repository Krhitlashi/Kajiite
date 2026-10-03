// ≺⧼ ស្បែកជើង 🥾 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn, aplikiSkatolajnUvojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kreiRinganSurfacon } from "./formoj.js";

// ⟪ ស្បែកជើង 🥾 ⟫

// ⟨ ផ្ទៃទាំងពីរ 📃 ⟩
export function kreiBotan(): { boto: THREE.BufferGeometry; akcentaj: THREE.BufferGeometry } {
  // ⟨ ដីមកពីជង្គង់ 📃 ⟩
  // ⟨ បាតជើងអណ្តែត 0.002 លើដី 📃 ⟩
  const GRUNDO = -0o1/0o2 + 0.002;
  const PLANDA_ALTO = 0o3/0o200;
  const PLANDA_SUPRO = GRUNDO + PLANDA_ALTO;
  // ⟨ ស្បែកបញ្ចប់ក្រោមបាតជើង 📃 ⟩
  const LEDA_FUNDO = PLANDA_SUPRO - 0o1/0o100;
  const K = 0o20;
  const r = ( i: number ) => i / K * Math.PI * 0o2;

  // ⟨ កំពូលរាង V 📃 ⟩
  // ⟨ កំពូលស៊ីមេទ្រី 📃 ⟩
  const KRESTA = 0o2/0o100;
  const kresto = (ang: number) => KRESTA * ( 0o1 - Math.sin(ang) ) / 0o2;
  // ⟨ ជ្រុងទាំងបួន 📃 ⟩
  const ANGULA_NOĈO = 0o1/0o100;
  const angulaNoĉo = (ang: number) =>
    ANGULA_NOĈO * Math.pow(Math.abs(Math.sin(ang * 0o2)), 0o10);
  // ⟨ ដើម 📃 ⟩
  // ⟨ ដើមមិនរីកដូចធុង 📃 ⟩
  // ⟨ គែមដើមធំជាង 📃 ⟩
  // ⟨ ជម្រៅរួមតូច 📃 ⟩
  // ⟨ ដើមខ្លីចុះទៀត 📃 ⟩
  const RANDO_Y = -0o3/0o16;
  const RANDO_A = 0o30/0o400;
  const RANDO_B = 0o33/0o400;
  const stipajRingoj: [ number, number, number, number ][] = [
    [ RANDO_Y,              RANDO_A,        RANDO_B,       0o1     ],
    [ RANDO_Y - 0o1/0o200,  RANDO_A,        RANDO_B,       0o1     ],
    [ RANDO_Y - 0o3/0o200,  0o27/0o400,     0o31/0o400,    0o2/0o3 ],
    [ -0o1/0o4,             0o31/0o400,     0o32/0o400,    0       ],
    [ -0o54/0o200,          0o31/0o400,     0o31/0o400,    0       ],
    [ -0o66/0o200,          0o31/0o400,     0o30/0o400,    0       ],
    [ -0o73/0o200,          0o27/0o400,     0o27/0o400,    0       ],
    [ -0o76/0o200,          0o16/0o400,     0o16/0o400,    0       ],
  ];
  // ⟨ ដើមហូរចូលជើង 📃 ⟩
  // ⟨ ដើមលិចតាមស្បែកដល់បាតជើង 📃 ⟩
  // ⟨ មួកបិទ 📃 ⟩
  const centro = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ] );
  // ⟨ កដៃមិនមានស្នាមជ្រុង 📃 ⟩
  const ringo = ( y: number, a: number, b: number, p = 0, noĉoj = true ) =>
    Array.from({ length: K }, ( _, i ) => {
      const ang = r(i);
      const [ x, z ] = superelipso(ang, a, b, 0o4);
      const ondo = kresto(ang) - ( noĉoj ? angulaNoĉo(ang) : 0 );
      return [ x, y + ondo * p, z ] as [ number, number, number ];
    });
  const ŝtipajRingoj = [ centro(stipajRingoj[0][0], 0),
    ...stipajRingoj.map(([ y, a, b, p ]) => ringo(y, a, b, p)),
    centro(stipajRingoj[stipajRingoj.length - 0o1][0], 0) ];
  const ŝtipo = kreiRinganSurfacon(ŝtipajRingoj);

  // ⟨ ជើងជារាងចតុកោណកែង 📃 ⟩
  // ⟨ ជើងខ្ពស់ជាង 📃 ⟩
  const piedajSekcoj: [ number, number, number ][] = [
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
  // ⟨ ចុងនៅលើបាតជើង 📃 ⟩
  // ⟨ ស្បែកបញ្ចប់ក្រោមបាតជើង 📃 ⟩
  const piedajRingoj = [ centro(piedajSekcoj[0][2] / 0o2 + PLANDA_SUPRO / 0o2, piedajSekcoj[0][0]),
    ...piedajSekcoj.map(([ z, a, supro ]) => {
      const hh = ( supro - LEDA_FUNDO ) / 0o2, yc = ( supro + LEDA_FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(r(i), a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }),
    centro(piedajSekcoj[piedajSekcoj.length - 0o1][2] / 0o2 + PLANDA_SUPRO / 0o2,
      piedajSekcoj[piedajSekcoj.length - 0o1][0]) ];
  const piedo = kreiRinganSurfacon(piedajRingoj);

  // ⟨ បាតជើង 📃 ⟩
  // ⟨ បាតជើងកម្រាស់ស្មើ 📃 ⟩
  // ⟨ បាតជើង និងគែមលេចចេញតាមបណ្តោយ 📃 ⟩
  const sekcojKunFinoj = ( etendo: number, largxo: number ): [ number, number, number ][] =>
    piedajSekcoj.map(( sect, i ) => [ i === 0 ? sect[0] - etendo
      : i === piedajSekcoj.length - 0o1 ? sect[0] + etendo : sect[0],
      sect[1] + largxo, sect[2] ] as [ number, number, number ] );
  const plandajSekcoj = sekcojKunFinoj(0o1/0o100, 0o3/0o400);
  const randajSekcoj = sekcojKunFinoj(0o3/0o400, 0o1/0o200);
  const plandaDuono = PLANDA_ALTO / 0o2;
  const plandaYc = ( PLANDA_SUPRO + GRUNDO ) / 0o2;
  const plando = kreiRinganSurfacon([
    centro(plandaYc, plandajSekcoj[0][0]),
    ...plandajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      const [ x, y ] = superelipso(r(j), a, plandaDuono, 0o4);
      return [ x, plandaYc + y, z ] as [ number, number, number ];
    })),
    centro(plandaYc, plandajSekcoj[plandajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ គែមនៅបាតជើង ( "welt" ) 📃 ⟩
  const plandaRando = kreiRinganSurfacon([
    centro(PLANDA_SUPRO, randajSekcoj[0][0]),
    ...randajSekcoj.map(([ z, a ]) => Array.from({ length: K }, ( _, j ) => {
      // ⟨ បបូរមិនលើកលើជើង 📃 ⟩
      const [ x, y ] = superelipso(r(j), a + 0o1/0o200, 0o1/0o200, 0o4);
      return [ x, PLANDA_SUPRO + y, z ] as [ number, number, number ];
    })),
    centro(PLANDA_SUPRO, randajSekcoj[randajSekcoj.length - 0o1][0]),
  ]);
  // ⟨ វណ្ឌវង្កផ្តេកសង្កត់លើជើង 📃 ⟩
  // ⟨ កន្លែងវណ្ឌវង្កនៅ 📃 ⟩
  const sekcoJe = ( z: number ): [ number, number ] => {
    for ( let i = 0; i + 0o1 < piedajSekcoj.length; i++ ) {
      const a = piedajSekcoj[i], b = piedajSekcoj[i + 0o1];
      if ( z >= a[0] && z <= b[0] ) {
        const t = ( z - a[0] ) / ( b[0] - a[0] );
        return [ a[1] + ( b[1] - a[1] ) * t, a[2] + ( b[2] - a[2] ) * t ];
      }
    }
    const lasta = piedajSekcoj[piedajSekcoj.length - 0o1];
    return [ lasta[1], lasta[2] ];
  };
  const suproJe = ( x: number, z: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ a, supro ] = sekcoJe(z);
    const hh = ( supro - PLANDA_SUPRO ) / 0o2, yc = ( supro + PLANDA_SUPRO ) / 0o2;
    const u = Math.min(Math.abs(x) / a, 0o1);
    const v = Math.pow(Math.max(0, 0o1 - Math.pow(u, 0o4)), 0o1/0o4);
    return [ new THREE.Vector3(x, yc + hh * v, z),
      new THREE.Vector3(Math.sign(x) * Math.pow(u, 0o3) / a, Math.pow(v, 0o3) / hh, 0)
        .normalize() ];
  };
  // ⟨ វណ្ឌវង្កពីចុងដល់កែងជើង 📃 ⟩
  const KONTURO_X = 0o13/0o400;
  const KONTURO_Z = 0o37/0o400;
  const KONTURO_CENTRO = 0o16/0o400;
  const KONTURO_DIKO = 0o3/0o400;
  // ⟨ ឆ្នូតលេចចេញជាង 📃 ⟩
  const KONTURO_ALTO = 0o1/0o200;
  const KONTURO_PUNKTOJ = 0o40;
  const konturaPunkto = ( ang: number ): [ THREE.Vector3, THREE.Vector3 ] => {
    const [ x, z ] = superelipso(ang, KONTURO_X, KONTURO_Z, 0o4);
    return suproJe(x, KONTURO_CENTRO + z);
  };
  const konturajRingoj: [ number, number, number ][][] = [];
  for ( let i = 0; i <= KONTURO_PUNKTOJ; i++ ) {
    const ang = i / KONTURO_PUNKTOJ * Math.PI * 0o2;
    const [ punkto, normalo ] = konturaPunkto(ang);
    // ⟨ ស៊ុមឆ្នូត 📃 ⟩
    const [ antauxa ] = konturaPunkto(ang - 0o1/0o20);
    const [ posta ] = konturaPunkto(ang + 0o1/0o20);
    const direkto = posta.clone().sub(antauxa).normalize();
    const flanko = normalo.clone().cross(direkto).normalize();
    const duono = flanko.clone().multiplyScalar(KONTURO_DIKO / 0o2);
    const supren = normalo.clone().multiplyScalar(KONTURO_ALTO);
    const interna = punkto.clone().sub(duono), ekstera = punkto.clone().add(duono);
    konturajRingoj.push([
      [ interna.x, interna.y, interna.z ],
      [ ekstera.x, ekstera.y, ekstera.z ],
      [ ekstera.x + supren.x, ekstera.y + supren.y, ekstera.z + supren.z ],
      [ interna.x + supren.x, interna.y + supren.y, interna.z + supren.z ],
    ]);
  }
  const piedaRando = kreiRinganSurfacon(konturajRingoj);
  // ⟨ កដៃសង្កត់នៅខាងលើ 📃 ⟩
  // ⟨ កដៃមិនបង្កើនផ្ទៃស្បែកពីរដង 📃 ⟩
  const KUF_SUB = RANDO_Y - 0o1/0o50;
  const KUF_SUPRO = RANDO_Y + 0o3/0o200;
  const KUF_ELSTARO = 0o3/0o400;
  const krestaRando = kreiRinganSurfacon([
    ringo(KUF_SUB, RANDO_A - 0o1/0o50, RANDO_B - 0o1/0o50, 0o1, false),
    ringo(KUF_SUB, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(KUF_SUPRO, RANDO_A + KUF_ELSTARO, RANDO_B + KUF_ELSTARO, 0o1, false),
    ringo(RANDO_Y - 0o1/0o200, RANDO_A - 0o1/0o100, RANDO_B - 0o1/0o100, 0o1, false),
    centro(RANDO_Y - 0o1/0o200, 0),
  ]);
  // ⟨ ផ្នែកសង្កត់បួនជាធរណីមាត្រមួយ 📃 ⟩
  const akcentaj = kunfandiGeometriojn([ plando, plandaRando, piedaRando, krestaRando ]);
  aplikiSkatolajnUvojn(akcentaj, 0o2);

  for ( const peco of [ ŝtipo, piedo ] ) aplikiSkatolajnUvojn(peco, 0o2);
  return { boto: kunfandiGeometriojn([ ŝtipo, piedo ]), akcentaj };
}
