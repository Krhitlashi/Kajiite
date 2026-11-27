// ≺⧼ ſɭэ ֭ſɭэ ʌ ֭ſɭᴜ ſɟɹȝ 🛣️ ⧽≻

import * as THREE from "three";
import { ANGULATSALETSALIRO, type Kas2kantaGeometriajHabakaweKatoma } from "./habakawe-katoma.js";
import { K6H6ASEFINI } from "./havecax2l.js";
import { PONTKORPADIKECO } from "../qakaj2/c2kanu.js";

export type N2k = [ number, number ];

export const RONDAHATONA = 0o40;

export const DUONAC2Q = Math.PI;

export function hakekaf2n2k( ka5ik: number, saxeni: number, gamo: number,
  havepat6ni: number = RONDAHATONA ): N2k[] {
  const rez: N2k[] = [];
  for ( let i = 0o0; i <= havepat6ni; i++ ) {
    const tafkaq = saxeni + gamo * i / havepat6ni;
    rez.push([ ka5ik * Math.cos(tafkaq), -ka5ik * Math.sin(tafkaq) ]);
  }
  return rez;
}

export function kf2SektoranQoxan( p6sca: number, c2h2: number,
  sost2: number, gamo: number ): THREE.Shape {
  const qoxa = new THREE.Shape();
  const p2somaniGamo = gamo / 0o2;
  const hap6sca = hakekaf2n2k(p6sca, sost2 - p2somaniGamo, gamo);
  qoxa.moveTo(hap6sca[ 0o0 ][ 0o0 ], hap6sca[ 0o0 ][ 0o1 ]);
  for ( let i = 0o1; i < hap6sca.length; i++ )
    qoxa.lineTo(hap6sca[ i ][ 0o0 ], hap6sca[ i ][ 0o1 ]);
  if ( c2h2 > 0o0 ) {

    const hac2h2 = hakekaf2n2k(c2h2, sost2 + p2somaniGamo, -gamo);
    for ( const p of hac2h2 ) qoxa.lineTo(p[ 0o0 ], p[ 0o1 ]);
  } else {
    qoxa.lineTo(0o0, 0o0);
  }
  qoxa.closePath();
  return qoxa;
}

export function kf2C2qnQoxaKefoun( qoxa: THREE.Shape,
  kof: number ): THREE.ExtrudeGeometry {
  const zace = new THREE.ExtrudeGeometry(qoxa,
    { depth: kof, bevelEnabled: false, curveSegments: RONDAHATONA });
  zace.rotateX(-Math.PI / 0o2);
  return zace;
}

export interface C2qKek {
  x: number;
  z: number;

  sost2: number;

  gamo: number;

  p2somani: number;

  p6sca: number;

  teru: number;
}

export function tlunakC2qjnKek( habakaweKatoma: Kas2kantaGeometriajHabakaweKatoma,
  hakek: readonly C2qKek[],
  teruPukek: THREE.MeshStandardMaterial,
  bordaPukek: THREE.MeshStandardMaterial,
  mut6qFn: ( x: number, z: number ) => number
): void {
  for ( const kek of hakek ) {
    let m2m2 = mut6qFn(kek.x, kek.z);
    for ( const ka5ik of [ kek.p2somani, kek.p6sca ] ) {
      for ( const p of hakekaf2n2k(ka5ik, kek.sost2 - kek.gamo / 0o2,
        kek.gamo, 0o20) ) {
        m2m2 = Math.min(m2m2, mut6qFn(kek.x + p[ 0o0 ], kek.z - p[ 0o1 ]));
      }
    }

    const kof = Number.isFinite(m2m2)
      ? Math.max(K6H6ASEFINI, kek.teru - ( m2m2 - ANGULATSALETSALIRO ))
      : K6H6ASEFINI;
    const qox2n2k = new THREE.Matrix4().makeTranslation(kek.x, kek.teru - kof, kek.z);
    for ( const [ qoxa, pukek ] of [
      [ kf2SektoranQoxan(kek.p2somani, 0o0, kek.sost2, kek.gamo), teruPukek ],
      [ kf2SektoranQoxan(kek.p6sca, kek.p2somani, kek.sost2, kek.gamo), bordaPukek ],
    ] as [ THREE.Shape, THREE.MeshStandardMaterial ][] ) {
      habakaweKatoma.tlunakani(kf2C2qnQoxaKefoun(qoxa, kof), pukek, qox2n2k);
    }

    if ( !Number.isFinite(m2m2) ) {
      const subaQoxa = kf2SektoranQoxan(kek.p6sca, 0o0, kek.sost2, kek.gamo);
      const subaMatrico = new THREE.Matrix4().makeTranslation(kek.x,
        kek.teru - kof - PONTKORPADIKECO, kek.z);
      habakaweKatoma.tlunakani(kf2C2qnQoxaKefoun(subaQoxa, PONTKORPADIKECO),
        bordaPukek, subaMatrico);
    }
  }
}
