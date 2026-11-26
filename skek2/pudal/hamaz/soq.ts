// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ j͑ʃɜȝ 📃 ⧽≻

import * as THREE from "three";
import { vakox2qQoxaKefoujn } from "../../p6kpu/hakox2q.js";
import { superpuc2q, kf2RinganSurfacon, kf2ArtikanSferon } from "./haqoxa.js";

export function kf2KorpanTorson(): THREE.BufferGeometry {
  const K = 0o20;
  const hac2q: [ number, number, number, number ][] = [
    [ 0o137/0o100, 0o20/0o400, 0o12/0o400,  0o0        ],
    [ 0o136/0o100, 0o22/0o400, 0o14/0o400,  0o0        ],
    [ 0o135/0o100, 0o24/0o400, 0o20/0o400,  0o0        ],
    [ 0o271/0o200, 0o26/0o400, 0o22/0o400,  0o0        ],
    [ 0o134/0o100, 0o32/0o400, 0o24/0o400,  0o2/0o400 ],
    [ 0o267/0o200, 0o41/0o400, 0o30/0o400,  0o3/0o400 ],
    [ 0o133/0o100, 0o51/0o400, 0o34/0o400,  0o4/0o400 ],
    [ 0o265/0o200, 0o51/0o400, 0o35/0o400,  0o3/0o400 ],
    [ 0o132/0o100, 0o47/0o400, 0o35/0o400,  0o3/0o400 ],
    [ 0o263/0o200, 0o44/0o400, 0o35/0o400,  0o2/0o400 ],
    [ 0o131/0o100, 0o43/0o400, 0o36/0o400,  0o2/0o400 ],

    [ 0o256/0o200, 0o43/0o400, 0o36/0o400,  0o3/0o400 ],
    [ 0o241/0o200, 0o42/0o400, 0o35/0o400,  0o2/0o400 ],
    [ 0o225/0o200, 0o40/0o400, 0o33/0o400,  0o1/0o400 ],
    [ 0o212/0o200, 0o36/0o400, 0o32/0o400,  0o0        ],
    [ 0o204/0o200, 0o40/0o400, 0o33/0o400,  0o0        ],
    [ 0o175/0o200, 0o44/0o400, 0o35/0o400, -0o1/0o400 ],
    [ 0o167/0o200, 0o46/0o400, 0o37/0o400, -0o3/0o400 ],

    [ 0o161/0o200, 0o51/0o400, 0o37/0o400, -0o4/0o400 ],
    [ 0o155/0o200, 0o44/0o400, 0o34/0o400,  0o0        ],
    [ 0o153/0o200, 0o37/0o400, 0o27/0o400,  0o0        ],
    [ 0o151/0o200, 0o31/0o400, 0o21/0o400,  0o0        ],
    [ 0o150/0o200, 0o23/0o400, 0o16/0o400,  0o0        ],
    [ 0o147/0o200, 0o15/0o400, 0o11/0o400,  0o0        ],
  ];
  const sost2 = ( y: number, dz: number ) => Array.from({ length: K },
    () => [ 0o0, y, dz ] as [ number, number, number ]);
  return kf2RinganSurfacon([ sost2(hac2q[0o0][0o0], hac2q[0o0][0o3]),
    ...hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
      const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
      return [ x, y, z + dz ] as [ number, number, number ];
    })), sost2(hac2q[hac2q.length - 0o1][0o0], hac2q[hac2q.length - 0o1][0o3]) ]);
}

export function kf2KorpanKruropon(): { teru: THREE.BufferGeometry; maltik: THREE.BufferGeometry } {
  const K = 0o20;
  const GENUO = 0o4;

  const hac2q: [ number, number, number, number ][] = [
    [  0o67/0o200, 0o21/0o400, 0o20/0o400,  0o0           ],
    [  0o51/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],
    [  0o30/0o200, 0o26/0o400, 0o25/0o400,  0o1/0o400   ],
    [  0o14/0o200, 0o23/0o400, 0o23/0o400,  0o0           ],
    [  0o0,          0o21/0o400, 0o21/0o400,  0o2/0o400   ],
    [ -0o15/0o200, 0o20/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o27/0o200, 0o17/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o37/0o200, 0o16/0o400, 0o21/0o400, -0o1/0o400   ],
    [ -0o52/0o200, 0o14/0o400, 0o16/0o400, -0o1/0o400   ],
    [ -0o64/0o200, 0o13/0o400, 0o14/0o400,  0o0           ],
  ];
  const sost2 = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0o0, y, z ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));
  const z2hak = hac2q[hac2q.length - 0o1][0o0];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0o0][0o0], 0o0),
    ...hax2pa.slice(0o0, GENUO + 0o1) ]);
  const maltik = kf2RinganSurfacon([ ...hax2pa.slice(GENUO), sost2(z2hak, 0o0) ]);

  const g = hac2q[GENUO];
  const artiko = kf2ArtikanSferon([ 0o0, 0o0, g[0o3] ], g[0o1] - 0o1/0o1000, 0o7/0o10);
  return { teru, maltik: vakox2qQoxaKefoujn([ maltik, artiko ]) };
}

export function kf2KorpanBrakon(): { teru: THREE.BufferGeometry; maltik: THREE.BufferGeometry } {

  const K = 0o20;

  const hac2q: [ number, number, number, number, number ][] = [
    [  0o14/0o1000,  0o4/0o1000,  0o4/0o1000,  0o0,          -0o112/0o1000 ],
    [  0o10/0o1000,  0o6/0o1000,  0o6/0o1000,  0o0,          -0o100/0o1000 ],
    [  0o4/0o1000,   0o11/0o1000, 0o10/0o1000, 0o0,          -0o66/0o1000  ],
    [  0o0,            0o17/0o1000, 0o16/0o1000, 0o0,          -0o54/0o1000  ],
    [ -0o12/0o1000,  0o25/0o1000, 0o22/0o1000, 0o0,          -0o40/0o1000  ],
    [ -0o15/0o1000,  0o33/0o1000, 0o30/0o1000, 0o0,          -0o17/0o1000  ],
    [ -0o26/0o1000,  0o40/0o1000, 0o34/0o1000, 0o0,          -0o5/0o1000   ],
    [ -0o42/0o1000,  0o37/0o1000, 0o33/0o1000, 0o0,          -0o2/0o1000   ],
    [ -0o103/0o1000, 0o37/0o1000, 0o35/0o1000, 0o2/0o1000,  0o0            ],
    [ -0o160/0o1000, 0o35/0o1000, 0o35/0o1000, 0o3/0o1000,  0o0           ],
    [ -0o227/0o1000, 0o34/0o1000, 0o34/0o1000, 0o1/0o1000,  0o0           ],
    [ -0o256/0o1000, 0o33/0o1000, 0o33/0o1000, -0o3/0o1000, 0o0           ],
    [ -0o277/0o1000, 0o32/0o1000, 0o32/0o1000, -0o2/0o1000, 0o0           ],
    [ -0o334/0o1000, 0o31/0o1000, 0o32/0o1000, 0o1/0o1000,  0o0           ],
    [ -0o400/0o1000, 0o30/0o1000, 0o31/0o1000, 0o2/0o1000,  0o0           ],
    [ -0o437/0o1000, 0o21/0o1000, 0o24/0o1000, 0o2/0o1000,  0o0           ],
    [ -0o473/0o1000, 0o10/0o1000, 0o12/0o1000, 0o0,           0o0           ],
  ];
  const sost2 = ( y: number, dz: number, cx: number ) => Array.from({ length: K },
    () => [ cx, y, dz ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz, cx ]) => Array.from({ length: K }, ( _, i ) => {
    const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ cx + x, y, z + dz ] as [ number, number, number ];
  }));

  const KUBUTO = 0o13;
  const z2hak = hac2q[hac2q.length - 0o1];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0o0][0o0], hac2q[0o0][0o3], hac2q[0o0][0o4]),
    ...hax2pa.slice(0o0, KUBUTO + 0o1) ]);
  const yKubuto = hac2q[KUBUTO][0o0];
  const maltik = kf2RinganSurfacon([ ...hax2pa.slice(KUBUTO),
    sost2(z2hak[0o0], z2hak[0o3], z2hak[0o4]) ]);
  maltik.translate(0o0, -yKubuto, 0o0);

  const tafanitamcesai = hac2q[KUBUTO];
  const artiko = kf2ArtikanSferon([ 0o0, 0o0, tafanitamcesai[0o3] ],
    tafanitamcesai[0o1] - 0o1/0o1000, 0o7/0o10);
  return { teru, maltik: vakox2qQoxaKefoujn([ maltik, artiko ]) };
}

export function kf2KorpanManon(): { tama: THREE.BufferGeometry; hacavaxaha: THREE.BufferGeometry } {
  const K = 0o20;
  const sost2 = ( y: number, x: number, z = 0o0 ) => Array.from({ length: K },
    () => [ x, y, z ] as [ number, number, number ]);
  const tubo = ( potenco: number,
    hac2q: [ number, number, number, number, number? ][] ) =>
    kf2RinganSurfacon([ sost2(hac2q[0o0][0o0], hac2q[0o0][0o1], hac2q[0o0][0o4]),
      ...hac2q.map(([ y, cx, a, b, cz ]) => Array.from({ length: K }, ( _, i ) => {
        const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, potenco);
        return [ cx + x, y, ( cz ?? 0o0 ) + z ] as [ number, number, number ];
      })),
      sost2(hac2q[hac2q.length - 0o1][0o0], hac2q[hac2q.length - 0o1][0o1],
        hac2q[hac2q.length - 0o1][0o4]) ]);
  const manpa12 = tubo(0o2, [
    [  0o54/0o1000, 0o0, 0o13/0o1000, 0o13/0o1000 ],
    [  0o34/0o1000, 0o0, 0o23/0o1000, 0o15/0o1000 ],
    [  0o20/0o1000, 0o0, 0o31/0o1000, 0o17/0o1000 ],
    [ -0o4/0o1000,  0o0, 0o33/0o1000, 0o17/0o1000 ],
    [ -0o20/0o1000, 0o0, 0o35/0o1000, 0o16/0o1000 ],
    [ -0o34/0o1000, 0o0, 0o35/0o1000, 0o15/0o1000 ],
    [ -0o42/0o1000, 0o0, 0o24/0o1000, 0o11/0o1000 ],
    [ -0o46/0o1000, 0o0, 0o11/0o1000, 0o6/0o1000  ],
    [ -0o50/0o1000, 0o0, 0o4/0o1000,  0o3/0o1000  ],
  ]);

  const interpolo = ( tabelo: number[][], k: number ): number[] => {
    const kaatse = tabelo[0o0][0o0] > tabelo[tabelo.length - 0o1][0o0] ? -0o1 : 0o1;
    if ( ( k - tabelo[0o0][0o0] ) * kaatse <= 0o0 ) return tabelo[0o0];
    for ( let i = 0o0; i + 0o1 < tabelo.length; i++ ) {
      const v0 = tabelo[i], v1 = tabelo[i + 0o1];
      if ( ( k - v1[0o0] ) * kaatse <= 0o0 ) {
        const t = ( k - v0[0o0] ) / ( v1[0o0] - v0[0o0] );
        return v0.map(( v, j ) => v + ( v1[j] - v ) * t );
      }
    }
    return tabelo[tabelo.length - 0o1];
  };

  const FINGRAJSEKCOJ: [ number, number, number ][] = [
    [ 0o0,           0o7/0o1000, 0o7/0o1000 ],
    [ 0o20/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o42/0o100,  0o6/0o1000, 0o6/0o1000 ],
    [ 0o54/0o100,  0o6/0o1000, 0o5/0o1000 ],
    [ 0o64/0o100,  0o5/0o1000, 0o5/0o1000 ],
    [ 0o72/0o100,  0o5/0o1000, 0o4/0o1000 ],
    [ 0o74/0o100,  0o4/0o1000, 0o3/0o1000 ],
    [ 0o76/0o100,  0o3/0o1000, 0o3/0o1000 ],
    [ 0o1,         0o2/0o1000, 0o2/0o1000 ],
  ];
  const FINGRABAZOY = -0o30/0o1000;
  const fingraP = ( f: number, n2k: number ) =>
    FINGRABAZOY + ( n2k - FINGRABAZOY ) * f;
  const fingraC = ( f: number, kozunuX: number, cet2X: number ) =>
    kozunuX + ( cet2X - kozunuX ) * f;

  const fingraZ = ( f: number ) => 0o16/0o1000 * f * f;
  const kxe = ( kozunuX: number, cet2X: number, n2k: number ) => tubo(0o2,
    FINGRAJSEKCOJ.map(( [ f, a, b ] ) => [ fingraP(f, n2k),
      fingraC(f, kozunuX, cet2X), a, b, fingraZ(f) ] as
        [ number, number, number, number, number ]));
  const FINGROJ: [ number, number, number ][] = [
    [ -0o25/0o1000, -0o27/0o1000, -0o124/0o1000 ],
    [ -0o7/0o1000,  -0o10/0o1000, -0o130/0o1000 ],
    [  0o7/0o1000,   0o10/0o1000, -0o125/0o1000 ],
    [  0o25/0o1000,  0o27/0o1000, -0o100/0o1000 ],
  ];
  const hatik = FINGROJ.map(( [ kozunuX, cet2X, n2k ] ) => kxe(kozunuX, cet2X, n2k));

  const DIKFINGRAJSEKCOJ: [ number, number, number, number, number ][] = [
    [  0o16/0o1000, 0o14/0o1000, 0o10/0o1000, 0o10/0o1000, 0o0 ],
    [ -0o4/0o1000,  0o25/0o1000, 0o10/0o1000, 0o10/0o1000, 0o0 ],
    [ -0o23/0o1000, 0o32/0o1000, 0o7/0o1000,  0o7/0o1000,  0o0 ],
    [ -0o31/0o1000, 0o36/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o41/0o1000, 0o42/0o1000, 0o6/0o1000,  0o6/0o1000,  0o1/0o1000 ],
    [ -0o46/0o1000, 0o44/0o1000, 0o6/0o1000,  0o5/0o1000,  0o2/0o1000 ],
    [ -0o52/0o1000, 0o46/0o1000, 0o5/0o1000,  0o4/0o1000,  0o3/0o1000 ],
    [ -0o56/0o1000, 0o47/0o1000, 0o3/0o1000,  0o3/0o1000,  0o4/0o1000 ],
  ];
  const dikfingro = tubo(0o2, DIKFINGRAJSEKCOJ);
  const DIKFINGRABAZOY = DIKFINGRAJSEKCOJ[0o0][0o0];
  const DIKFINGRAPINTOY = DIKFINGRAJSEKCOJ[DIKFINGRAJSEKCOJ.length - 0o1][0o0];

  const dikfingraQaroxema = ( f: number ): number[] => interpolo(DIKFINGRAJSEKCOJ,
    DIKFINGRABAZOY + ( DIKFINGRAPINTOY - DIKFINGRABAZOY ) * f);

  const UNGASANTA = 0o1/0o1000;

  const UNGAJPROFILO: [ number, number, number ][] = [
    [ 0o0,           0o6/0o7,   0o1/0o10  ],
    [ 0o1/0o10,    0o15/0o16, 0o3/0o10  ],
    [ 0o1/0o4,     0o1,       0o6/0o10  ],
    [ 0o1/0o2,     0o1,       0o10/0o10 ],
    [ 0o3/0o4,     0o1,       0o11/0o10 ],
    [ 0o7/0o10,    0o31/0o32, 0o12/0o10 ],
    [ 0o1,           0o31/0o32, 0o12/0o10 ],
  ];

  const UNGAKURBO = 0o3/0o10;

  const ungaL6da = ( b: number, sefini: number ) =>
    b * Math.sqrt(Math.max(0o0, 0o1 - sefini * sefini));
  const ungaDiko = ( b: number, sefini: number, santa: number ) =>
    b + UNGASANTA * santa - ungaL6da(b, sefini);
  const kf2Ungon = ( vek2fe: ( f: number ) => [ number, number, number ],
    qaroxema: ( f: number ) => [ number, number ], de: number, al: number,
    ksokosaini: [ number, number ], sefiniF = 0o7/0o10 ) => {
    const U = 0o20;
    const [ dx, dz ] = ksokosaini;
    const lx = -dz, lz = dx;
    const kkaxte = ( sefini: number, t: number ) => UNGAKURBO * sefini * ( 0o2 * t - 0o1 );
    const sost2 = ( f: number, konturoF: number, t: number ) => {
      const [ x, y, z ] = vek2fe(f);
      const [ a, b ] = qaroxema(f);
      const s = ungaL6da(b, sefiniF * konturoF);
      const k = kkaxte(a * sefiniF * konturoF, t);
      return [ x + dx * s, y - k, z + dz * s ] as [ number, number, number ];
    };
    const hac2q = ( f: number, konturoF: number, santaF: number, t: number ) => {
      const [ cx, cy, cz ] = sost2(f, konturoF, t);
      const [ a, b ] = qaroxema(f);
      const sefini = a * sefiniF * konturoF;
      const diko = ungaDiko(b, sefiniF * konturoF, santaF);
      const k = kkaxte(sefini, t);
      return Array.from({ length: U }, ( _, i ) => {
        const ang = i / U * Math.PI * 0o2;
        const kos = Math.cos(ang), sin = Math.sin(ang);

        return [ cx + lx * sefini * kos - dx * diko * sin, cy + k * kos * kos,
          cz + lz * sefini * kos - dz * diko * sin ] as [ number, number, number ];
      });
    };
    const ventumilo = ( f: number, konturoF: number, t: number ):
      [ number, number, number ][] => Array.from({ length: U }, () => sost2(f, konturoF, t));

    const preter = ( al - de ) * 0o1/0o20;
    const z2hak = UNGAJPROFILO[UNGAJPROFILO.length - 0o1];
    const tlakakani = 0o1 + preter / ( al - de );
    return kf2RinganSurfacon([
      ventumilo(de, UNGAJPROFILO[0o0][0o1], 0o0),
      ...UNGAJPROFILO.map(( [ t, konturoF, santaF ] ) =>
        hac2q(de + ( al - de ) * t, konturoF, santaF, t)),
      ventumilo(al + preter, z2hak[0o1], tlakakani) ]);
  };

  const UNGADE = 0o66/0o100, UNGAAL = 0o76/0o100;
  const fingraQaroxema = ( f: number ): [ number, number ] => {
    const x2pa = interpolo(FINGRAJSEKCOJ, f);
    return [ x2pa[0o1], x2pa[0o2] ];
  };
  const hacavaxaha = [
    ...FINGROJ.map(( [ kozunuX, cet2X, n2k ] ) => kf2Ungon(
      ( f ) => [ fingraC(f, kozunuX, cet2X), fingraP(f, n2k), fingraZ(f) ],
      fingraQaroxema, UNGADE, UNGAAL, [ 0o0, -0o1 ] )),

    kf2Ungon(( f ) => {
      const x2pa = dikfingraQaroxema(f);
      return [ x2pa[0o1], x2pa[0o0], x2pa[0o4] ];
    }, ( f ) => {
      const x2pa = dikfingraQaroxema(f);
      return [ x2pa[0o2], x2pa[0o3] ];
    }, 0o27/0o32, 0o37/0o40, [ 0o0, -0o1 ], 0o5/0o10),
  ];
  return { tama: vakox2qQoxaKefoujn([ manpa12, ...hatik, dikfingro ]),
    hacavaxaha: vakox2qQoxaKefoujn(hacavaxaha) };
}

export function kf2KorpanPiedon(): THREE.BufferGeometry {
  const K = 0o20;
  const sost2 = ( y: number, z: number ) => Array.from({ length: K },
    () => [ 0o0, y, z ] as [ number, number, number ]);

  const FUNDO = -0o74/0o200;
  const haqaroxema: [ number, number, number ][] = [
    [ -0o11/0o200, 0o6/0o200,  -0o72/0o200 ],
    [ -0o5/0o200,  0o7/0o200,  -0o71/0o200 ],
    [  0o1/0o200,  0o10/0o200, -0o70/0o200 ],
    [  0o16/0o200, 0o7/0o200,  -0o72/0o200 ],
    [  0o25/0o200, 0o5/0o200,  -0o73/0o200 ],
  ];
  const sost2P = ( qaroxema: [ number, number, number ]) =>
    sost2(( qaroxema[0o2] + FUNDO ) / 0o2, qaroxema[0o0]);
  const pat6 = kf2RinganSurfacon([ sost2P(haqaroxema[0o0]),
    ...haqaroxema.map(([ z, a, teru ]) => {
      const hh = ( teru - FUNDO ) / 0o2, yc = ( teru + FUNDO ) / 0o2;
      return Array.from({ length: K }, ( _, i ) => {
        const [ x, y ] = superpuc2q(i / K * Math.PI * 0o2, a, hh, 0o4);
        return [ x, yc + y, z ] as [ number, number, number ];
      });
    }), sost2P(haqaroxema[haqaroxema.length - 0o1]) ]);
  return pat6;
}

export function kf2Pantalonan(): { teru: THREE.BufferGeometry; maltik: THREE.BufferGeometry } {
  const K = 0o20;

  const hac2q: [ number, number, number, number ][] = [
    [  0o67/0o200, 0o30/0o400, 0o30/0o400,  0o0        ],
    [  0o51/0o200, 0o30/0o400, 0o30/0o400,  0o0        ],
    [  0o32/0o200, 0o32/0o400, 0o30/0o400,  0o0        ],
    [  0o15/0o200, 0o31/0o400, 0o30/0o400,  0o0        ],
    [  0o0,          0o30/0o400, 0o31/0o400,  0o1/0o100 ],
    [ -0o15/0o200, 0o24/0o400, 0o24/0o400, -0o1/0o400 ],
    [ -0o34/0o200, 0o23/0o400, 0o23/0o400,  0o0        ],
    [ -0o27/0o100, 0o21/0o400, 0o21/0o400,  0o0        ],
  ];

  const sost2 = ( y: number ) => Array.from({ length: K },
    () => [ 0o0, y, 0o0 ] as [ number, number, number ]);
  const hax2pa = hac2q.map(([ y, a, b, dz ]) => Array.from({ length: K }, ( _, i ) => {

    const [ x, z ] = superpuc2q(i / K * Math.PI * 0o2, a, b, 0o2);
    return [ x, y, z + dz ] as [ number, number, number ];
  }));

  const GENUO = 0o4;
  const z2hak = hac2q[hac2q.length - 0o1][0o0];
  const teru = kf2RinganSurfacon([ sost2(hac2q[0o0][0o0]),
    ...hax2pa.slice(0o0, GENUO + 0o1) ]);
  const maltik = kf2RinganSurfacon([ ...hax2pa.slice(GENUO), sost2(z2hak) ]);

  const g = hac2q[GENUO];
  const artiko = kf2ArtikanSferon([ 0o0, 0o0, g[0o3] ], g[0o1] - 0o1/0o1000, 0o7/0o10);
  // ⟨ ſ͕ɭᴜ }ʃɹƽ 📃 ⟩

  const hax2paTutaj = hac2q.length + 0o2;
  const alUk6h6 = ( zace: THREE.BufferGeometry, havecax2lani: number[] ) => {
    const qan2k: number[] = [];
    for ( const v of havecax2lani ) {
      const vv = 0o1 - v / ( hax2paTutaj - 0o1 );
      for ( let i = 0o0; i < K; i++ ) qan2k.push(i / K, vv);
    }
    zace.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(qan2k), 0o2));
    return zace;
  };
  const teruHax2pa = Array.from({ length: GENUO + 0o2 }, ( _, i ) => i );
  const maltikHax2pa = Array.from({ length: hax2paTutaj - GENUO - 0o1 },
    ( _, i ) => i + GENUO + 0o1 );
  return { teru: alUk6h6(teru, teruHax2pa),
    maltik: vakox2qQoxaKefoujn([ alUk6h6(maltik, maltikHax2pa), artiko ]) };
}
