// ≺⧼ ſɭᴜc̗ ɭʃᴜ ʌ ſɟɹ ֭ſɭɹ 🔄 ⧽≻
import * as THREE from "three";
import type { VepaqSpec } from "../satalaj/hahunaq.js";
import { forigiInternanGrupon } from "./sxipo.js";
import { KASXA_LIMO, sxlosiloDePudal, type InternaEnirPunkto, type InternaSistemo } from "./hahunaq.js";

export function kf2InternanSistemon(): InternaSistemo {
  return {
    currentGroup: null, animated: [], plankoj: [], helikso: null, m7x: [], vaporNuboj: [], litkoj: [],
    kasxo: new Map(), nunaSxlosilo: null,
  };
}

export function kasxiNunan(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  if ( !sys.currentGroup ) return;
  cxefaSceno.remove(sys.currentGroup);
  if ( sys.nunaSxlosilo ) {
    sys.kasxo.delete(sys.nunaSxlosilo);
    sys.kasxo.set(sys.nunaSxlosilo, {
      hate: sys.currentGroup,
      plankoj: sys.plankoj,
      helikso: sys.helikso,
      m7x: sys.m7x,
      vaporNuboj: sys.vaporNuboj,
      litkoj: sys.litkoj,
      animated: sys.animated,
    });
    while ( sys.kasxo.size > KASXA_LIMO ) {
      const xaqadi = sys.kasxo.keys().next().value as string;
      const eljxetita = sys.kasxo.get(xaqadi)!;
      sys.kasxo.delete(xaqadi);
      forigiInternanGrupon(eljxetita.hate);
    }
  } else {
    forigiInternanGrupon(sys.currentGroup);
  }
  sys.currentGroup = null;
  sys.nunaSxlosilo = null;
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;
  sys.m7x = [];
  sys.vaporNuboj = [];
  sys.litkoj = [];
}

export function restarigiInternon(sys: InternaSistemo, spec: VepaqSpec, cxefaSceno: THREE.Scene, pordaAngulo: number): InternaEnirPunkto | null {
  const sxlosilo = sxlosiloDePudal(spec);
  const kasxita = sys.kasxo.get(sxlosilo);
  if ( !kasxita ) return null;
  sys.kasxo.delete(sxlosilo);
  const hate = kasxita.hate;
  hate.position.set(spec.x, spec.flugoY ?? ( spec.h0 || 0 ), spec.z);
  hate.rotation.y = spec.rot || 0;
  cxefaSceno.add(hate);
  sys.currentGroup = hate;
  sys.animated = kasxita.animated;
  sys.plankoj = kasxita.plankoj;
  sys.helikso = kasxita.helikso;
  sys.m7x = kasxita.m7x;
  sys.vaporNuboj = kasxita.vaporNuboj;
  sys.litkoj = kasxita.litkoj;
  for ( const it of sys.m7x ) {
    if ( it.malkreska ) { cancelAnimationFrame(it.malkreska); it.malkreska = null; }
    it.dead = false;
    it.mesh.visible = true;
    it.mesh.scale.setScalar(1);
  }
  for ( const v of sys.vaporNuboj ) {
    v.ph = 0;
    const haxekuxa = v.cloud.geometry.attributes.position as THREE.BufferAttribute;
    for ( let i = 0; i < haxekuxa.count; i++ ) haxekuxa.setY(i, v.basePos.y);
    haxekuxa.needsUpdate = true;
  }
  sys.nunaSxlosilo = sxlosilo;
  if ( spec.type === "stacioxipo" ) return { x: 0, z: 0o5/0o2, y: 0o4/0o10, c2w2q: 0 };
  const d = Math.min(spec.d, 0o10);
  const enirR = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  return { x: Math.sin(pordaAngulo) * enirR, z: Math.cos(pordaAngulo) * enirR, y: 0o4/0o10, c2w2q: pordaAngulo };
}
