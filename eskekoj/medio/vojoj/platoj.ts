// ≺⧼ ចានភ្ជាប់ 🔲 ⧽≻
import * as THREE from "three";
import { ANGULA_PROVOLIRO, kreiGeometriajnBufrojn, kreiVojojnMaterialojn } from "./bufroj.js";
import { kreiArkPunktojn, kreiEksteranKurbanArkon, kreiEnanKornanArkon, kreiFormonElPunktoj, kreiKvaronanRingon, plataAltoj } from "./formoj.js";
import { KORNA_ENA_R, KORNA_R, VOJA_DIORITA_DUONO, VOJA_EKSTERA_DUONO } from "./mezuroj.js";

export function konstruiIntersekcajnPlatojn(sceno: THREE.Scene,
  punktoj: [ number, number ][],
  heightFn: ( x: number, z: number ) => number,
  dioritaMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  fermitaj: Map<string, [ number, number ]> = new Map(),
  rotacioj: Map<string, number> = new Map(),
  direktoj: Map<string, [ number, number ][]> = new Map()
): void {
  if ( punktoj.length === 0 ) return;
  const { supraMaterialo, bordaMaterialo } = kreiVojojnMaterialojn(dioritaMaterialo, andezitaMaterialo, -3, -2, -4, -5);
  const bufroj = kreiGeometriajnBufrojn();
  for ( const [ x, z ] of punktoj ) {
    const ferma = fermitaj.get(x + "," + z);
    const fx = ferma ? ferma[0] : 0, fz = ferma ? ferma[1] : 0;
    const rotacio = rotacioj.get(x + "," + z) ?? 0;
    const rotKos = Math.cos( rotacio ), rotSin = Math.sin( rotacio );
    // ⟨ ការគំរូជ្រុង 📃 ⟩
    const altoj = plataAltoj(x, z, rotacio, heightFn);
    const supro = altoj.supro;
    const platoDikeco = supro - ( altoj.minimumo - ANGULA_PROVOLIRO );
    const bazo = supro - platoDikeco;
    // ⟨ ការ៉េបួន 📃 ⟩
    const aldoni = ( punktoj2: [ number, number ][], materialo: THREE.MeshStandardMaterial ): void => {
      // ⟨ គ្មានចានហួសចុងដៃ 📃 ⟩
      let randaj = punktoj2;
      for ( const d of lokajBrakoj ) {
        randaj = tranĉi(randaj, d);
        if ( randaj.length < 3 ) return;
      }
      const rotaciitaj = randaj.map( p => [
        rotKos * p[0] - rotSin * p[1],
        rotSin * p[0] + rotKos * p[1],
      ] as [ number, number ] );
      const geometrio = new THREE.ExtrudeGeometry(kreiFormonElPunktoj(rotaciitaj), { depth: platoDikeco, bevelEnabled: false });
      geometrio.rotateX(-Math.PI / 2);
      bufroj.aldoni(geometrio, materialo, new THREE.Matrix4().makeTranslation(x, bazo, z));
    };
    // ⟨ ស៊ុមការ៉េ 📃 ⟩
    const diorita = VOJA_DIORITA_DUONO, ekstera = VOJA_EKSTERA_DUONO;
    const stumpofino = ekstera + KORNA_R;
    // ⟨ ដៃពិត 📃 ⟩
    // ⟨ ហេតុអ្វីដៃសំខាន់ 📃 ⟩
    const lokajBrakoj: [ number, number ][] = ( direktoj.get(x + "," + z) ?? [] )
      .map( d => [ rotKos * d[0] + rotSin * d[1], -rotSin * d[0] + rotKos * d[1] ] as [ number, number ] )
      .filter( d => Math.hypot(d[0], d[1]) > 0o1/0o1000 );
    const unuo = ( d: [ number, number ] ): [ number, number ] => {
      const longo2 = Math.hypot(d[0], d[1]);
      return [ d[0] / longo2, d[1] / longo2 ];
    };
    const normalo = ( d: [ number, number ], celo: [ number, number ] ): [ number, number ] => {
      const n: [ number, number ] = [ -d[1], d[0] ];
      return n[0] * celo[0] + n[1] * celo[1] < 0 ? [ d[1], -d[0] ] : n;
    };
    // ⟨ ការកាត់តាមចុងដៃ 📃 ⟩
    const tranĉi = ( punktoj2: [ number, number ][], direkto: [ number, number ] ): [ number, number ][] => {
      const ena: [ number, number ][] = [];
      for ( let i = 0; i < punktoj2.length; i++ ) {
        const a = punktoj2[i], b = punktoj2[( i + 1 ) % punktoj2.length];
        const da = a[0] * direkto[0] + a[1] * direkto[1] - stumpofino;
        const db = b[0] * direkto[0] + b[1] * direkto[1] - stumpofino;
        if ( da <= 0 ) ena.push(a);
        if (( da < 0 && db > 0 ) || ( da > 0 && db < 0 )) {
          const t = da / ( da - db );
          ena.push([ a[0] + ( b[0] - a[0] ) * t, a[1] + ( b[1] - a[1] ) * t ]);
        }
      }
      return ena;
    };
    const arko = ( c: [ number, number ], r: number, a: [ number, number ], b: [ number, number ] ): [ number, number ][] => {
      const a0 = Math.atan2(a[1] - c[1], a[0] - c[0]);
      let a1 = Math.atan2(b[1] - c[1], b[0] - c[0]);
      while ( a1 - a0 > Math.PI ) a1 -= 2 * Math.PI;
      while ( a0 - a1 > Math.PI ) a1 += 2 * Math.PI;
      const punktoj2: [ number, number ][] = [];
      for ( let i = 1; i < 0o10; i++ ) {
        const ang = a0 + ( a1 - a0 ) * i / 0o10;
        punktoj2.push([ c[0] + Math.cos(ang) * r, c[1] + Math.sin(ang) * r ]);
      }
      return punktoj2;
    };
    for ( const sx of [ -1, 1 ] ) {
      for ( const sz of [ -1, 1 ] ) {
        const lauxX = ( trans: number, lauv: number ): [ number, number ] => [ sx * lauv, sz * trans ];
        const lauxZ = ( trans: number, lauv: number ): [ number, number ] => [ sx * trans, sz * lauv ];
        const brakoX = sx !== fx, brakoZ = sz !== fz;
        const kvadrantaj = lokajBrakoj.filter( d => sx * d[0] >= -0o1/0o1000 && sz * d[1] >= -0o1/0o1000 );
        if ( brakoX && brakoZ && kvadrantaj.length === 2 ) {
          // ⟨ ដៃពីរ តាមទិសពិតរបស់វា 📃 ⟩
          const unuaAksa = Math.abs(kvadrantaj[0][0]) >= Math.abs(kvadrantaj[1][0]);
          const u = unuo(unuaAksa ? kvadrantaj[0] : kvadrantaj[1]);
          const w = unuo(unuaAksa ? kvadrantaj[1] : kvadrantaj[0]);
          const nu = normalo(u, w), nw = normalo(w, u);
          const det = u[1] * w[0] - u[0] * w[1];
          if ( Math.abs(det) > 0o1/0o1000 ) {
            const b0 = stumpofino * ( nw[0] - nu[0] ), b1 = stumpofino * ( nw[1] - nu[1] );
            const alfa = ( -b0 * w[1] + w[0] * b1 ) / det;
            const c: [ number, number ] = [ stumpofino * nu[0] + alfa * u[0], stumpofino * nu[1] + alfa * u[1] ];
            const rEna = KORNA_ENA_R, rEkstera = KORNA_R;
            const enaU: [ number, number ] = [ c[0] - rEna * nu[0], c[1] - rEna * nu[1] ];
            const enaW: [ number, number ] = [ c[0] - rEna * nw[0], c[1] - rEna * nw[1] ];
            const ekU: [ number, number ] = [ c[0] - rEkstera * nu[0], c[1] - rEkstera * nu[1] ];
            const ekW: [ number, number ] = [ c[0] - rEkstera * nw[0], c[1] - rEkstera * nw[1] ];
            const punkto = ( t: number, lauv: number ): [ number, number ] =>
              [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
            const punktoW = ( t: number, lauv: number ): [ number, number ] =>
              [ w[0] * lauv + nw[0] * t, w[1] * lauv + nw[1] * t ];
            const diorito = tranĉi([ [ 0, 0 ], punkto(0, stumpofino), punkto(diorita, stumpofino), enaU,
              ...arko(c, rEna, enaU, enaW), enaW, punktoW(diorita, stumpofino), punktoW(0, stumpofino) ], u);
            const diorito2 = tranĉi(diorito, w);
            if ( diorito2.length >= 3 ) aldoni(diorito2, supraMaterialo);
            const bordo = tranĉi([ punkto(diorita, stumpofino), punkto(ekstera, stumpofino), ekU,
              ...arko(c, rEkstera, ekU, ekW), ekW, punktoW(ekstera, stumpofino), punktoW(diorita, stumpofino),
              enaW, ...arko(c, rEna, enaW, enaU), enaU ], u);
            const bordo2 = tranĉi(bordo, w);
            if ( bordo2.length >= 3 ) aldoni(bordo2, bordaMaterialo);
            continue;
          }
        }
        if ( brakoX && brakoZ ) {
          const enaArko = kreiEnanKornanArkon(sx, sz, ekstera);
          const eksteraArko = kreiEksteranKurbanArkon(sx, sz, ekstera);
          aldoni([ [ 0, 0 ], lauxX(0, stumpofino), ...enaArko, lauxZ(0, stumpofino) ], supraMaterialo);
          aldoni([ lauxX(diorita, stumpofino), [ sx * stumpofino, sz * ekstera ],
            ...eksteraArko.slice().reverse().slice(1, -1),
            [ sx * ekstera, sz * stumpofino ], lauxZ(diorita, stumpofino),
            ...enaArko.slice().reverse().slice(1, -1) ], bordaMaterialo);
        } else if ( ( brakoX || brakoZ ) && kvadrantaj.length === 1 ) {
          const u = unuo(kvadrantaj[0]);
          const nu = normalo(u, brakoX ? [ 0, sz ] : [ sx, 0 ]);
          const p = ( t: number, lauv: number ): [ number, number ] =>
            [ u[0] * lauv + nu[0] * t, u[1] * lauv + nu[1] * t ];
          aldoni([ p(0, 0), p(0, stumpofino), p(diorita, stumpofino), p(diorita, 0) ], supraMaterialo);
          aldoni([ p(diorita, 0), p(diorita, stumpofino), p(ekstera, stumpofino), p(ekstera, 0) ], bordaMaterialo);
        } else if ( brakoX || brakoZ ) {
          const l = brakoX ? lauxX : lauxZ;
          aldoni([ l(0, 0), l(0, stumpofino), l(diorita, stumpofino), l(diorita, 0) ], supraMaterialo);
          aldoni([ l(diorita, 0), l(diorita, stumpofino), l(ekstera, stumpofino), l(ekstera, 0) ], bordaMaterialo);
        } else {
          aldoni([ [ 0, 0 ], ...kreiArkPunktojn(0, 0, diorita, sx, sz) ], supraMaterialo);
          aldoni(kreiKvaronanRingon(0, 0, diorita, ekstera, sx, sz), bordaMaterialo);
        }
      }
    }
  }
  bufroj.kunigi(sceno);
}

// ⟨ ប្រភេទភ្ជាប់បួន 📃 ⟩

// ⟨ ស្ពរ៉ុនជាផ្លូវធម្មតា 📃 ⟩
