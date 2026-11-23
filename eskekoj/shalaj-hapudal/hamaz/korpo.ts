// ≺⧼ j͑ʃɜȝ 🧍 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { superelipso, kf2RinganSurfacon, kf2ArtikanSferon } from "./haqoxa.js";

// ⟨ តួមានកាយវិភាគ 📃 ⟩
// ⟨ ត្រគាក និងក្រលៀន 📃 ⟩
// ⟨ ស្មាធ្វើដោយដៃ 📃 ⟩
// ⟨ ទ្រូងជាចំណុចមុខបំផុត 📃 ⟩
// ⟨ ការកាត់ជារាងពងក្រពើ 📃 ⟩
// ⟨ ឆ្អឹងខ្នង 📃 ⟩
export function kf2KorpanTorson(): THREE.BufferGeometry {
  const K = 0o20;
  const hac2q: [ number, number, number, number ][] = [
    [ 0o137/0o100, 0o20/0o400, 0o12/0o400,  0        ],
    [ 0o136/0o100, 0o22/0o400, 0o14/0o400,  0        ],
    [ 0o135/0o100, 0o24/0o400, 0o20/0o400,  0        ],
    [ 0o271/0o200, 0o26/0o400, 0o22/0o400,  0        ],
    [ 0o134/0o100, 0o32/0o400, 0o24/0o400,  0o2/0o400 ],
    [ 0o267/0o200, 0o41/0o400, 0o30/0o400,  0o3/0o400 ],
    [ 0o133/0o100, 0o51/0o400, 0o34/0o400,  0o4/0o400 ],
    [ 0o265/0o200, 0o51/0o400, 0o35/0o400,  0o3/0o400 ],
    [ 0o132/0o100, 0o47/0o400, 0o35/0o400,  0o3/0o400 ],
    [ 0o263/0o200, 0o44/0o400, 0o35/0o400,  0o2/0o400 ],
    [ 0o131/0o100, 0o43/0o400, 0o36/0o400,  0o2/0o400 ],
    // ⟨ តួក្រោមថយចុះ 📃 ⟩
    [ 0o256/0o200, 0o43/0o400, 0o36/0o400,  0o3/0o400 ],
    [ 0o241/0o200, 0o42/0o400, 0o35/0o400,  0o2/0o400 ],
    [ 0o225/0o200, 0o40/0o400, 0o33/0o400,  0o1/0o400 ],
    [ 0o212/0o200, 0o36/0o400, 0o32/0o400,  0        ],
    [ 0o204/0o200, 0o40/0o400, 0o33/0o400,  0        ],
    [ 0o175/0o200, 0o44/0o400, 0o35/0o400, -0o1/0o400 ],
    [ 0o167/0o200, 0o46/0o400, 0o37/0o400, -0o3/0o400 ],
    // ⟨ អាងចុះរលូន 📃 ⟩
    [ 0o161/0o200, 0o51/0o400, 0o37/0o400, -0o4/0o400 ],
    [ 0o155/0o200, 0o44/0o400, 0o34/0o400,  0        ],
    [ 0o153/0o200, 0o37/0o400, 0o27/0o400,  0        ],
    [ 0o151/0o200, 0o31/0o400, 0o21/0o400,  0        ],
    [ 0o150/0o200, 0o23/0o400, 0o16/0o400,  0        ],
    [ 0o147/0o200, 0o15/0o400, 0o11/0o400,  0        ],
  ];
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0, y, dz ] as [ number, number, number ]);
  return kf2RinganSurfacon([ sost2(hac2q[0][0], hac2q[0][3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0], hac2q[hac2q.length - 0o1][3]) ]);
}

// ⟨ ជើងមានរូបរាង 📃 ⟩
// ⟨ ជើងចាប់ផ្តើមក្នុងតួ 📃 ⟩
// ⟨ ជើងវែងជាង 📃 ⟩
// ⟨ ជើងបែកនៅជង្គង់ 📃 ⟩
export function kf2KorpanKruropon(): { teru: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  const GENUO = 0o4;
  // ⟨ ជើងមានជង្គង់ 📃 ⟩
  // ⟨ កំភួនជើងជាសាច់ដុំ 📃 ⟩
  // ⟨ ភ្លៅលើតាមខោ 📃 ⟩
  const hac2q: [ number, number, number, number ][] = [
    [  0o67/0o200, 0o21/0o400, 0o20/0o400,  0           ],
    [  0o51/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],
    [  0o30/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],
    [  0o14/0o200, 0o23/0o400, 0o23/0o400,  0           ],
    [  0,          0o21/0o400, 0o21/0o400,  0o2/0o400   ],
    [ -0o15/0o200, 0o20/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o27/0o200, 0o17/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o37/0o200, 0o16/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o52/0o200, 0o14/0o400, 0o16/0o400, -0o1/0o400   ],
    [ -0o64/0o200, 0o13/0o400, 0o14/0o400,  0           ],
  ];
  const sost2 = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  const z2hak = hac2q[hac2q.length - 0o1][0];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0][0], 0),
    ...hax2pa.slice(0, GENUO + 0o1) ]);
  const malsupra = kf2RinganSurfacon([ ...hax2pa.slice(GENUO), sost2(z2hak, 0) ]);
  // ⟨ ឆ្អឹងជង្គង់ 📃 ⟩
  const g = hac2q[GENUO];
  const artiko = kf2ArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  return { teru, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// ⟨ ដៃបាត់ 📃 ⟩
export function kf2KorpanBrakon(): { teru: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  // ⟨ ដៃមូល មិនប្រាំបីជ្រុង 📃 ⟩
  const K = 0o20;
  // ⟨ ដៃមានសន្លាក់ 📃 ⟩
  // ⟨ កំភួនដៃថយចុះ 📃 ⟩
  // ⟨ ដៃ 📃 ⟩
  // ⟨ ស្មានៅលើតួ 📃 ⟩
  // ⟨ កំពូលដៃតាមតួ 📃 ⟩
  const hac2q: [ number, number, number, number, number ][] = [
    [  0o14/0o1000,  0o4/0o1000,  0o4/0o1000,  0,          -0o112/0o1000 ],
    [  0o10/0o1000,  0o6/0o1000,  0o6/0o1000,  0,          -0o100/0o1000 ],
    [  0o4/0o1000,   0o11/0o1000, 0o10/0o1000, 0,          -0o66/0o1000  ],
    [  0,            0o17/0o1000, 0o16/0o1000, 0,          -0o54/0o1000  ],
    [ -0o12/0o1000,  0o25/0o1000, 0o22/0o1000, 0,          -0o40/0o1000  ],
    [ -0o15/0o1000,  0o33/0o1000, 0o30/0o1000, 0,          -0o17/0o1000  ],
    [ -0o26/0o1000,  0o40/0o1000, 0o34/0o1000, 0,          -0o5/0o1000   ],
    [ -0o42/0o1000,  0o37/0o1000, 0o33/0o1000, 0,          -0o2/0o1000   ],
    [ -0o103/0o1000, 0o37/0o1000, 0o35/0o1000, 0o2/0o1000,  0            ],
    [ -0o160/0o1000, 0o35/0o1000, 0o35/0o1000, 0o3/0o1000,  0           ],
    [ -0o227/0o1000, 0o34/0o1000, 0o34/0o1000, 0o1/0o1000,  0           ],
    [ -0o256/0o1000, 0o33/0o1000, 0o33/0o1000, -0o3/0o1000, 0           ],
    [ -0o277/0o1000, 0o32/0o1000, 0o32/0o1000, -0o2/0o1000, 0           ],
    [ -0o334/0o1000, 0o31/0o1000, 0o32/0o1000, 0o1/0o1000,  0           ],
    [ -0o400/0o1000, 0o30/0o1000, 0o31/0o1000, 0o2/0o1000,  0           ],
    [ -0o437/0o1000, 0o21/0o1000, 0o24/0o1000, 0o2/0o1000,  0           ],
    [ -0o473/0o1000, 0o10/0o1000, 0o12/0o1000, 0,           0           ],
  ];
  const sost2 = ( y: number, dz: number, cx: number ) => Array.from({ length: K },
    () => [ cx, y, dz ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz, cx ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ cx + x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ ដៃបែកនៅកែងដៃ 📃 ⟩
  const KUBUTO = 0o13;
  const z2hak = hac2q[hac2q.length - 0o1];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0][0], hac2q[0][3], hac2q[0][4]),
    ...hax2pa.slice(0, KUBUTO + 0o1) ]);
  const yKubuto = hac2q[KUBUTO][0];
  const malsupra = kf2RinganSurfacon([ ...hax2pa.slice(KUBUTO),
    sost2(z2hak[0], z2hak[3], z2hak[4]) ]);
  malsupra.translate(0, -yKubuto, 0);
  // ⟨ ឆ្អឹងកែងដៃ 📃 ⟩
  const kubuto = hac2q[KUBUTO];
  const artiko = kf2ArtikanSferon([ 0, 0, kubuto[3] ],
    kubuto[1] - 0o1/0o1000, 0o7/0o10);
  return { teru, malsupra: kunfandiGeometriojn([ malsupra, artiko ]) };
}

// ⟨ ប្រអប់ដៃ និងបំពង់ប្រាំ 📃 ⟩
// ⟨ សមាមាត្រ 📃 ⟩
// ⟨ ដៃពាក់ក្រចក 💅 ⟩
export function kf2KorpanManon(): { mano: THREE.BufferGeometry; ungoj: THREE.BufferGeometry } {
  const K = 0o20;
  const sost2 = ( y: number, x: number, z = 0 ) => Array.from({ length: K },
    () => [ x, y, z ] as [ number, number, number ]);
  const tubo = ( potenco: number,
    hac2q: [ number, number, number, number, number? ][] ) =>
    kf2RinganSurfacon([ sost2(hac2q[0][0], hac2q[0][1], hac2q[0][4]),
      ...hac2q.map(([ y, cx, a, b, cz ]) => Array.from({ length: K }, ( _, i ) => {
        const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, potenco);
        return [ cx + x, y, ( cz ?? 0 ) + z ] as [ number, number, number ];
      })),
      sost2(hac2q[hac2q.length - 0o1][0], hac2q[hac2q.length - 0o1][1],
        hac2q[hac2q.length - 0o1][4]) ]);
  const manpa12 = tubo(0o2, [
    [  0o54/0o1000, 0, 0o13/0o1000, 0o13/0o1000 ],
    [  0o34/0o1000, 0, 0o23/0o1000, 0o15/0o1000 ],
    [  0o20/0o1000, 0, 0o31/0o1000, 0o17/0o1000 ],
    [ -0o4/0o1000,  0, 0o33/0o1000, 0o17/0o1000 ],
    [ -0o20/0o1000, 0, 0o35/0o1000, 0o16/0o1000 ],
    [ -0o34/0o1000, 0, 0o35/0o1000, 0o15/0o1000 ],
    [ -0o42/0o1000, 0, 0o24/0o1000, 0o11/0o1000 ],
    [ -0o46/0o1000, 0, 0o11/0o1000, 0o6/0o1000  ],
    [ -0o50/0o1000, 0, 0o4/0o1000,  0o3/0o1000  ],
  ]);
  // ⟨ គន្លឹះអាចចុះក្រោម 📃 ⟩
  const interpolo = ( tabelo: number[][], k: number ): number[] => {
    const signo = tabelo[0][0] > tabelo[tabelo.length - 0o1][0] ? -0o1 : 0o1;
    if ( ( k - tabelo[0][0] ) * signo <= 0 ) return tabelo[0];
    for ( let i = 0; i + 0o1 < tabelo.length; i++ ) {
      const v0 = tabelo[i], v1 = tabelo[i + 0o1];
      if ( ( k - v1[0] ) * signo <= 0 ) {
        const t = ( k - v0[0] ) / ( v1[0] - v0[0] );
        return v0.map(( v, j ) => v + ( v1[j] - v ) * t );
      }
    }
    return tabelo[tabelo.length - 0o1];
  };
  // ⟨ ប្រវែងកាត់ម្រាម 📃 ⟩
  // ⟨ ម្រាមបញ្ចប់ដោយសាច់រាប 📃 ⟩
  const FINGRAJ_SEKCOJ: [ number, number, number ][] = [
    [ 0,           0o7/0o1000, 0o7/0o1000 ],
    [ 0o20/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o42/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o54/0o100,  0o6/0o1000, 0o5/0o1000 ],
    [ 0o64/0o100,  0o5/0o1000, 0o5/0o1000 ],
    [ 0o72/0o100,  0o5/0o1000, 0o4/0o1000 ],
    [ 0o74/0o100,  0o4/0o1000, 0o3/0o1000 ],
    [ 0o76/0o100,  0o3/0o1000, 0o3/0o1000 ],
    [ 0o1,         0o2/0o1000, 0o2/0o1000 ],
  ];
  const FINGRA_BAZO_Y = -0o30/0o1000;
  const fingraP = ( f: number, pinto: number ) =>
    FINGRA_BAZO_Y + ( pinto - FINGRA_BAZO_Y ) * f;
  const fingraC = ( f: number, bazoX: number, pintoX: number ) =>
    bazoX + ( pintoX - bazoX ) * f;
  // ⟨ ម្រាមកោងទៅមុខ 📃 ⟩
  const fingraZ = ( f: number ) => 0o16/0o1000 * f * f;
  const fingro = ( bazoX: number, pintoX: number, pinto: number ) => tubo(0o2,
    FINGRAJ_SEKCOJ.map(( [ f, a, b ] ) => [ fingraP(f, pinto),
      fingraC(f, bazoX, pintoX), a, b, fingraZ(f) ] as
        [ number, number, number, number, number ]));
  const FINGROJ: [ number, number, number ][] = [
    [ -0o25/0o1000, -0o27/0o1000, -0o124/0o1000 ],
    [ -0o7/0o1000,  -0o10/0o1000, -0o130/0o1000 ],
    [  0o7/0o1000,   0o10/0o1000, -0o125/0o1000 ],
    [  0o25/0o1000,  0o27/0o1000, -0o100/0o1000 ],
  ];
  const fingroj = FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => fingro(bazoX, pintoX, pinto));
  // ⟨ មេដៃជាសាច់ជាមួយសន្លាក់ 📃 ⟩
  const DIKFINGRAJ_SEKCOJ: [ number, number, number, number, number ][] = [
    [  0o16/0o1000, 0o14/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o4/0o1000,  0o25/0o1000, 0o10/0o1000, 0o10/0o1000, 0 ],
    [ -0o23/0o1000, 0o32/0o1000, 0o7/0o1000,  0o7/0o1000,  0 ],
    [ -0o31/0o1000, 0o36/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o41/0o1000, 0o42/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o46/0o1000, 0o44/0o1000, 0o6/0o1000,  0o5/0o1000,  0o2/0o1000 ],
    [ -0o52/0o1000, 0o46/0o1000, 0o5/0o1000,  0o4/0o1000,  0o3/0o1000 ],
    [ -0o56/0o1000, 0o47/0o1000, 0o3/0o1000,  0o3/0o1000,  0o4/0o1000 ],
  ];
  const dikfingro = tubo(0o2, DIKFINGRAJ_SEKCOJ);
  const DIKFINGRA_BAZO_Y = DIKFINGRAJ_SEKCOJ[0][0];
  const DIKFINGRA_PINTO_Y = DIKFINGRAJ_SEKCOJ[DIKFINGRAJ_SEKCOJ.length - 0o1][0];
  // ⟨ មេដៃមានប៉ារ៉ាម៉ែត្រផ្ទាល់ 📃 ⟩
  const dikfingraSekco = ( f: number ): number[] => interpolo(DIKFINGRAJ_SEKCOJ,
    DIKFINGRA_BAZO_Y + ( DIKFINGRA_PINTO_Y - DIKFINGRA_BAZO_Y ) * f);
  // ⟪ ក្រចក 💅 ⟫
  // ⟨ ហេតុអ្វីក្រចកជាកញ្ចក់ឆ្លុះ 📃 ⟩
  const UNGA_ELSTARO = 0o1/0o1000;
  // ⟨ វណ្ឌវង្កក្រចកពិត 📃 ⟩
  // ⟨ វណ្ឌវង្ករលូន 📃 ⟩
  const UNGAJ_PROFILO: [ number, number, number ][] = [
    [ 0,           0o6/0o7,   0o1/0o10  ],
    [ 0o1/0o10,    0o15/0o16, 0o3/0o10  ],
    [ 0o1/0o4,     0o1,       0o6/0o10  ],
    [ 0o1/0o2,     0o1,       0o10/0o10 ],
    [ 0o3/0o4,     0o1,       0o11/0o10 ],
    [ 0o7/0o10,    0o31/0o32, 0o12/0o10 ],
    [ 1,           0o31/0o32, 0o12/0o10 ],
  ];
  // ⟨ ក្រចកកោងតាមទទឹង 📃 ⟩
  const UNGA_KURBO = 0o3/0o10;
  // ⟨ ក្រចកដេកលើម្រាម 📃 ⟩
  const ungaAlto = ( b: number, sefini: number ) =>
    b * Math.sqrt(Math.max(0, 0o1 - sefini * sefini));
  const ungaDiko = ( b: number, sefini: number, elstaro: number ) =>
    b + UNGA_ELSTARO * elstaro - ungaAlto(b, sefini);
  const kf2Ungon = ( akso: ( f: number ) => [ number, number, number ],
    sekco: ( f: number ) => [ number, number ], de: number, al: number,
    dorsa: [ number, number ], sefiniF = 0o7/0o10 ) => {
    const U = 0o20;
    const [ dx, dz ] = dorsa;
    const lx = -dz, lz = dx;
    const kkaxte = ( sefini: number, t: number ) => UNGA_KURBO * sefini * ( 0o2 * t - 0o1 );
    const sost2 = ( f: number, konturoF: number, t: number ) => {
      const [ x, y, z ] = akso(f);
      const [ a, b ] = sekco(f);
      const s = ungaAlto(b, sefiniF * konturoF);
      const k = kkaxte(a * sefiniF * konturoF, t);
      return [ x + dx * s, y - k, z + dz * s ] as [ number, number, number ];
    };
    const hac2q = ( f: number, konturoF: number, elstaroF: number, t: number ) => {
      const [ cx, cy, cz ] = sost2(f, konturoF, t);
      const [ a, b ] = sekco(f);
      const sefini = a * sefiniF * konturoF;
      const diko = ungaDiko(b, sefiniF * konturoF, elstaroF);
      const k = kkaxte(sefini, t);
      return Array.from({ length: U }, ( _, i ) => {
        const ang = i / U * Math.PI * 0o2;
        const kos = Math.cos(ang), sin = Math.sin(ang);
        // ⟨ រង្វង់តាមម្រាម 📃 ⟩
        return [ cx + lx * sefini * kos - dx * diko * sin, cy + k * kos * kos,
          cz + lz * sefini * kos - dz * diko * sin ] as [ number, number, number ];
      });
    };
    const ventumilo = ( f: number, konturoF: number, t: number ):
      [ number, number, number ][] => Array.from({ length: U }, () => sost2(f, konturoF, t));
    // ⟨ កង្ហារស្បែករាបស្មើ 📃 ⟩
    const preter = ( al - de ) * 0o1/0o20;
    const z2hak = UNGAJ_PROFILO[UNGAJ_PROFILO.length - 0o1];
    const tlakakani = 0o1 + preter / ( al - de );
    return kf2RinganSurfacon([
      ventumilo(de, UNGAJ_PROFILO[0][1], 0),
      ...UNGAJ_PROFILO.map(( [ t, konturoF, elstaroF ] ) =>
        hac2q(de + ( al - de ) * t, konturoF, elstaroF, t)),
      ventumilo(al + preter, z2hak[1], tlakakani) ]);
  };
  // ⟨ ក្រចកម្រាម 📃 ⟩
  const UNGA_DE = 0o66/0o100, UNGA_AL = 0o76/0o100;
  const fingraSekco = ( f: number ): [ number, number ] => {
    const x2pa = interpolo(FINGRAJ_SEKCOJ, f);
    return [ x2pa[1], x2pa[2] ];
  };
  const ungoj = [
    ...FINGROJ.map(( [ bazoX, pintoX, pinto ] ) => kf2Ungon(
      ( f ) => [ fingraC(f, bazoX, pintoX), fingraP(f, pinto), fingraZ(f) ],
      fingraSekco, UNGA_DE, UNGA_AL, [ 0, -0o1 ] )),
    // ⟨ ក្រចកមេដៃ 📃 ⟩
    // ⟨ គែមទទេដល់ចុង ប៉ុន្តែក្រចកនៅខ្លី 📃 ⟩
    kf2Ungon(( f ) => {
      const x2pa = dikfingraSekco(f);
      return [ x2pa[1], x2pa[0], x2pa[4] ];
    }, ( f ) => {
      const x2pa = dikfingraSekco(f);
      return [ x2pa[2], x2pa[3] ];
    }, 0o27/0o32, 0o37/0o40, [ 0, -0o1 ], 0o5/0o10),
  ];
  return { mano: kunfandiGeometriojn([ manpa12, ...fingroj, dikfingro ]),
    ungoj: kunfandiGeometriojn(ungoj) };
}

// ⟨ ជើងរមៀលជាមួយស្បែកជើង 📃 ⟩
export function kf2KorpanPiedon(): THREE.BufferGeometry {
  const K = 0o20;
  const sost2 = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0, y, z ] as [ number, number, number ]);
  // ⟨ ជើង 📃 ⟩
  const FUNDO = -0o74/0o200;
  const sekcoj: [ number, number, number ][] = [
    [ -0o11/0o200, 0o6/0o200,  -0o72/0o200 ],
    [ -0o5/0o200,  0o7/0o200,  -0o71/0o200 ],
    [  0o1/0o200,  0o10/0o200, -0o70/0o200 ],
    [  0o16/0o200, 0o7/0o200,  -0o72/0o200 ],
    [  0o25/0o200, 0o5/0o200,  -0o73/0o200 ],
  ];
  const centroP = ( sekco: [ number, number, number ]) =>
    sost2(( sekco[2] + FUNDO ) / 0o2, sekco[0]);
  const piedo = kf2RinganSurfacon([ centroP(sekcoj[0]),
    ...sekcoj.map(([ z, a, teru ]) => {
      const hh = ( teru - FUNDO ) / 0o2, yc = ( teru + FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superelipso(i / K * Math.PI * 0o2, a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }), centroP(sekcoj[sekcoj.length - 0o1]) ]);
  return piedo;
}

// ⟨ ភ្លៅមិនត្រូវលេចចេញ 📃 ⟩
// ⟨ ក្រណាត់ចូលក្នុងស្បែកជើង 📃 ⟩
// ⟨ ខ្យល់លើគែមប៉ុន្មាន 📃 ⟩
export function kf2Pantalonan(): { teru: THREE.BufferGeometry; malsupra: THREE.BufferGeometry } {
  const K = 0o20;
  // ⟨ ខោតាមជង្គង់ 📃 ⟩
  // ⟨ ត្រគាកស្តើងចុះ 📃 ⟩
  const hac2q: [ number, number, number, number ][] = [
    [  0o67/0o200, 0o30/0o400, 0o30/0o400,  0        ],
    [  0o51/0o200, 0o30/0o400, 0o30/0o400,  0        ],
    [  0o32/0o200, 0o32/0o400, 0o30/0o400,  0        ],
    [  0o15/0o200, 0o31/0o400, 0o30/0o400,  0        ],
    [  0,          0o30/0o400, 0o31/0o400,  0o1/0o100 ],
    [ -0o15/0o200, 0o24/0o400, 0o24/0o400, -0o1/0o400 ],
    [ -0o34/0o200, 0o23/0o400, 0o23/0o400,  0        ],
    [ -0o27/0o100, 0o21/0o400, 0o21/0o400,  0        ],
  ];
  // ⟨ ខោចូលជ្រៅក្នុងស្បែកជើង 📃 ⟩
  const sost2 = ( y: number ) => Array.from({ length: K },
    () => [ 0, y, 0 ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    // ⟨ ការកាត់ជារាងពងក្រពើ មិនចតុកោណ 📃 ⟩
    const [ x, z ] = superelipso(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  // ⟨ ខោក៏បែកនៅជង្គង់ 📃 ⟩
  const GENUO = 0o4;
  const z2hak = hac2q[hac2q.length - 0o1][0];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0][0]),
    ...hax2pa.slice(0, GENUO + 0o1) ]);
  const malsupra = kf2RinganSurfacon([ ...hax2pa.slice(GENUO), sost2(z2hak) ]);
  // ⟨ ជង្គង់បត់ទៅមុខ 📃 ⟩
  // ⟨ ស្វ៊ែរវាស់តាមទទឹង មិនតាមជម្រៅ 📃 ⟩
  const g = hac2q[GENUO];
  const artiko = kf2ArtikanSferon([ 0, 0, g[3] ], g[1] - 0o1/0o1000, 0o7/0o10);
  // ⟨ UV 📃 ⟩
  // ⟨ UV ជាសកល 📃 ⟩
  const hax2paTutaj = hac2q.length + 0o2;
  const alUvoj = ( geometrio: THREE.BufferGeometry, havecax2lani: number[] ) => {
    const qan2k: number[] = [];
    for ( const v of havecax2lani ) {
      const vv = 0o1 - v / ( hax2paTutaj - 0o1 );
      for ( let i = 0; i < K; i++ ) qan2k.push(i / K, vv);
    }
    geometrio.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(qan2k), 0o2));
    return geometrio;
  };
  const suprajHax2pa = Array.from({ length: GENUO + 0o2 }, ( _, i ) => i );
  const malsuprajHax2pa = Array.from({ length: hax2paTutaj - GENUO - 0o1 },
    ( _, i ) => i + GENUO + 0o1 );
  return { teru: alUvoj(teru, suprajHax2pa),
    malsupra: kunfandiGeometriojn([ alUvoj(malsupra, malsuprajHax2pa), artiko ]) };
}
