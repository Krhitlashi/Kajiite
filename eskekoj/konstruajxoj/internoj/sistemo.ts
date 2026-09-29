// ≺⧼ La interna sistemo 🔄 ⧽≻
// La interna sistemo mem — la kreo ( kreiInternanSistemon ), la kaŝado de la nuna
// interno ( kasxiNunan ) kaj la revivigo el la kaŝo ( restarigiInternon ).
import * as THREE from "three";
import type { KonstruSpec } from "../satalaj/tipoj.js";
import { forigiInternanGrupon } from "./sxipo.js";
import { KASXA_LIMO, sxlosiloDeSpeco, type InternaEnirPunkto, type InternaSistemo } from "./tipoj.js";

// kreiInternanSistemon — La interna sistemo por la eniraj spacoj.
export function kreiInternanSistemon(): InternaSistemo {
  return {
    currentGroup: null, animated: [], plankoj: [], helikso: null, manĝaĵoj: [], vaporNuboj: [], litkoj: [],
    kasxo: new Map(), nunaSxlosilo: null,
  };
}

// kasxiNunan — Konservu la NUNAN internon en la kasxo sub la nuna ŝlosilo ( aŭ
// forjxetu gxin, se gxi havas neniun ŝlosilon ). La LRU-limo eljxetas la plej
// malnovan internon kiam la kasxo plenigxas, por ke la memor-kresko restu
// barita.
export function kasxiNunan(sys: InternaSistemo, cxefaSceno: THREE.Scene): void {
  if ( !sys.currentGroup ) return;
  cxefaSceno.remove(sys.currentGroup);
  if ( sys.nunaSxlosilo ) {
    // Defenda forigo — la aktiva interno ne estu jam en la kasxo ( la
    // restarigo forigas gxin ), sed se gxi estas, la set ne movus la
    // enmetan ordon en Mapo. Forigu antaŭ la set, por ke la ordo restu LRU.
    sys.kasxo.delete(sys.nunaSxlosilo);
    sys.kasxo.set(sys.nunaSxlosilo, {
      grupo: sys.currentGroup,
      plankoj: sys.plankoj,
      helikso: sys.helikso,
      manĝaĵoj: sys.manĝaĵoj,
      vaporNuboj: sys.vaporNuboj,
      litkoj: sys.litkoj,
      animated: sys.animated,
    });
    // LRU-eljeto — la unua en la enmeta ordo estas la plej malnova.
    while ( sys.kasxo.size > KASXA_LIMO ) {
      const unua = sys.kasxo.keys().next().value as string;
      const eljxetita = sys.kasxo.get(unua)!;
      sys.kasxo.delete(unua);
      forigiInternanGrupon(eljxetita.grupo);
    }
  } else {
    forigiInternanGrupon(sys.currentGroup);
  }
  sys.currentGroup = null;
  sys.nunaSxlosilo = null;
  sys.animated = [];
  sys.plankoj = [];
  sys.helikso = null;
  sys.manĝaĵoj = [];
  sys.vaporNuboj = [];
  sys.litkoj = [];
}

// restarigiInternon — Se la interno de la speco jam estas konstruita kaj
// kasxita, re-aldonu gxin al la sceno kaj redonu la eniran punkton; alie
// redonu null ( kaj la vokanto konstruu novan ).
export function restarigiInternon(sys: InternaSistemo, spec: KonstruSpec, cxefaSceno: THREE.Scene, pordaAngulo: number): InternaEnirPunkto | null {
  const sxlosilo = sxlosiloDeSpeco(spec);
  const kasxita = sys.kasxo.get(sxlosilo);
  if ( !kasxita ) return null;
  sys.kasxo.delete(sxlosilo);
  const grupo = kasxita.grupo;
  grupo.position.set(spec.x, spec.flugoY ?? ( spec.h0 || 0 ), spec.z);
  grupo.rotation.y = spec.rot || 0;
  cxefaSceno.add(grupo);
  sys.currentGroup = grupo;
  sys.animated = kasxita.animated;
  sys.plankoj = kasxita.plankoj;
  sys.helikso = kasxita.helikso;
  sys.manĝaĵoj = kasxita.manĝaĵoj;
  sys.vaporNuboj = kasxita.vaporNuboj;
  sys.litkoj = kasxita.litkoj;
  // Freŝaj manĝaĵoj cxiu eniro — rekomencigu la mangxitan staton. Nuligu
  // ankaŭ la pendan malkreskan animacion, por ke gxi ne plu tuŝu la reaperintan
  // mangxajxon post la restarigo.
  for ( const it of sys.manĝaĵoj ) {
    if ( it.malkreska ) { cancelAnimationFrame(it.malkreska); it.malkreska = null; }
    it.dead = false;
    it.mesh.visible = true;
    it.mesh.scale.setScalar(1);
  }
  // Vaporaj nuboj rekomencu de sia bazo ( ne de la meza drivo ) — la sama
  // komenca stato kiel cxe nova konstruo.
  for ( const v of sys.vaporNuboj ) {
    v.ph = 0;
    const pos = v.cloud.geometry.attributes.position as THREE.BufferAttribute;
    for ( let i = 0; i < pos.count; i++ ) pos.setY(i, v.basePos.y);
    pos.needsUpdate = true;
  }
  // La aktiva interno NE restas en la kasxo — gxi re-kasxigxas cxe la eliro
  // ( kasxiNunan ). Tiel la kasxo tenas nur NE-aktivajn internojn, kaj la
  // LRU-ordigo restas simpla ( cxiu set = plej freŝa ).
  sys.nunaSxlosilo = sxlosilo;
  // Enira punkto — la sama kiel cxe nova konstruo.
  if ( spec.type === "stacioxipo" ) return { x: 0, z: 0o5/0o2, y: 0o4/0o10, direkto: 0 };
  const d = Math.min(spec.d, 0o10);
  const enirR = Math.max(0o3/0o2, d / 2) - 0o4/0o10;
  return { x: Math.sin(pordaAngulo) * enirR, z: Math.cos(pordaAngulo) * enirR, y: 0o4/0o10, direkto: pordaAngulo };
}
