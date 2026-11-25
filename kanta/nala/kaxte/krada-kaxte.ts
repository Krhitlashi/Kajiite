// ≺⧼ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ꞁȷ̀ᴜꞇ ʌ ſɭᴜ ı],ƨɔ 📐 ⧽≻
import * as THREE from "three";
import { vakox2qMondajnHacakamaha } from "../../../skek2/x2x2q/hakox2q.js";
import { vepaqSatalon } from "../../../skek2/hapaq/satalaj-hapaq.js";
import { VepaqSpec, TIPAJNIVELOJ } from "../../../skek2/hapaq/satalaj/hahunaq.js";
import type { Kas2kantaDitlakak } from "../../../skek2/qatsiike/hak6h6/hahunaq.js";
import { kf2Qox2n2k, hunaqDeK6liq } from "../qox2n2k/kxawa.js";
import { qox2n2kDerivajoj } from "../qox2n2k/derivajoj.js";
import { skaniK6h6nCaxlefkakai } from "../qox2n2k/s2t2bakano.js";
import { aplikiHatik } from "../qox2n2k/teru.js";
import type { KradaArangxo, CellType, AldonaK6liq } from "../qox2n2k/hahunaq.js";
import { vepaqKekufxeso, KekufxesoRaqa } from "../../../skek2/w2ta/kubes.js";
import { k6siZ, l6da, tsasa } from "../t6limaSoza.js";
import { kf2KvarLampAldonilon, kf2LampAldonilon, type LampQar } from "./hahufwuk2.js";

export interface KradaUrbaTseuni {
  vepaqPudalj: VepaqSpec[];
  hasap2: { x: number; z: number; r: number }[];
  knasukf2qdalai: THREE.Mesh[];
  vepaqHahate: THREE.Group[];
  haqotawaHamaxema: [ number, number ][];
  // ⟨ ſɭэ ֭ſɭэ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ , ꞙɭɔ ʌ ſ͕ɭɜ ı],ᴜ 📃 ⟩
  kas2kantaHavop2ni: Kas2kantaDitlakak[];
  tamc2kHan2k: [ number, number ][];
  tamc2kHanece3e: Map<string, [ number, number ]>;
  lampHaqar: LampQar[];
  kekufxesoHaqar: KekufxesoRaqa[];
  staciaXekuxa: [ number, number ];
  t2q2X: number;
  sudaK6h6: number;
}

export function vepaqKradanKaxten(
  qena: THREE.Scene,
  ptalu: KradaArangxo,
  ofseto: [ number, number ],
  oraPukek: THREE.MeshStandardMaterial,
  tlunakHak6liq: AldonaK6liq[] = [],
  hateru?: Map<string, CellType>,
): KradaUrbaTseuni {
  const [ ofsX, ofsZ ] = ofseto;
  const haKekkozusai = kf2Qox2n2k(ptalu);
  aplikiHatik(haKekkozusai, hateru);
  const hasap2: { x: number; z: number; r: number }[] = [];
  const { TONA, nordaN2k, t2q2X, sudaK6h6, ka5asexazZ, BLOKO } = qox2n2kDerivajoj(ptalu);

  let bldgIdx = 0;
  const vepaqPudalj: VepaqSpec[] = [];
  const kf2Pudaln = ( x: number, z: number, type: CellType, rot: number, fiksita?: string ): void => {
    const estasKa5asexaz = type === "ka5asexaz";
    const specHunaq = estasKa5asexaz ? "ka5asexazxipo" : type;
    const havem2 = estasKa5asexaz ? TIPAJNIVELOJ.ka5asexazxipo : type === "qaman2" ? 7 : type === "turo" ? 0o10 : 4;
    const w = 0o10, d = w;
    const b6k61oL6da = estasKa5asexaz ? 0o155/0o40
      : type === "qaman2" ? 0o30/0o10 : type === "turo" ? 0o30/0o10 : type === "kasafeo" ? 0o155/0o40 : 0o315/0o100;
    const sube = estasKa5asexaz ? undefined : havem2;
    const b6k61oL6daSub = 0o123/0o40;
    vepaqPudalj.push({ x, z, type: specHunaq, name: "vepaqKsaka" + bldgIdx, havem2, w, d, b6k61oL6da, sube, b6k61oL6daSub, rot, diamond: true, fixed: fiksita });
    bldgIdx++;
  };
  for ( const [ col, row, type ] of haKekkozusai ) {
    const cx = ofsX + col * TONA, cz = ofsZ + row * TONA;
    if ( col === 0 && row === 0 ) {
      if ( ptalu.k6liqPal6 === "kvar" ) {
        vepaqPudalj.push({ x: ofsX, z: ofsZ, type: "ka5asexazxipo", name: "vepaqKsaka" + bldgIdx, havem2: TIPAJNIVELOJ.ka5asexazxipo, w: 0o10, d: 0o10, b6k61oL6da: 0o155/0o40, rot: 0, diamond: true, fixed: "kvar" });
        bldgIdx++;
      } else {
        kf2Pudaln(ofsX, ofsZ, type, 0);
      }
      continue;
    }
    if ( ptalu.k6liqPal6 === "kvar" ) {
      const suboj: [ number, number, number ][] = [
        [ BLOKO, BLOKO, 0 ],
        [ -BLOKO, BLOKO, -Math.PI/2 ],
        [ -BLOKO, -BLOKO, Math.PI ],
        [ BLOKO, -BLOKO, Math.PI/2 ],
      ];
      for ( const [ blx, blz, rot ] of suboj ) {
        const subKsaka = blx > 0 ? ( blz > 0 ? "NE" : "SE" ) : ( blz > 0 ? "NW" : "SW" );
        const subHunaq = hateru?.get(col + "," + row + "," + subKsaka);
        kf2Pudaln(cx + blx, cz + blz, subHunaq ?? hunaqDeK6liq(type, col, row, blx, blz), rot, "kvar");
      }
    } else {
      kf2Pudaln(cx, cz, type, 0);
    }
  }

  for ( const b of tlunakHak6liq ) {
    const fiksita = b.konektita ? "tlunak-konektita" : "tlunak";
    if ( b.stacia ) {
      vepaqPudalj.push({ x: ofsX + b.x, z: ofsZ + b.z, type: "ka5asexazxipo", name: "vepaqKsaka" + bldgIdx, havem2: TIPAJNIVELOJ.ka5asexazxipo, w: 0o10, d: 0o10, b6k61oL6da: 0o155/0o40, rot: b.rot ?? 0, diamond: true, fixed: fiksita });
      bldgIdx++;
    } else {
      kf2Pudaln(ofsX + b.x, ofsZ + b.z, b.hunaq, b.rot ?? 0, fiksita);
    }
  }
  for ( const b of tlunakHak6liq ) {
    if ( !b.konektita ) continue;
    const c = Math.round(b.x / TONA), r = Math.round(b.z / TONA);
    if ( !haKekkozusai.some(( [ lc, lr ] ) => lc === c && lr === r) ) haKekkozusai.push([ c, r, "qaman2" ]);
  }

  vepaqPudalj.forEach(s => {
    s.h0 = l6da(s.x, s.z);
    hasap2.push({ x: s.x, z: s.z, r: Math.hypot(s.w, s.d) / 2 + 0o4/0o10 });
  });

  const knasukf2qdalai: THREE.Mesh[] = [];

  // ⟪ ſɭэ ֭ſɭэ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 📃 ⟫
  const kas2kantaHavop2ni: Kas2kantaDitlakak[] = [];

  const colSet = new Set<number>(), rowSet = new Set<number>();
  for ( const [ c, r, t ] of haKekkozusai ) {
    if ( t !== null ) { colSet.add(c); rowSet.add(r); }
  }
  const KOLOJ = [ ...colSet ].sort(( a, b ) => a - b);
  const HAVESEFESTAF = [ ...rowSet ].sort(( a, b ) => a - b);

  const RETOX: number[] = [];
  for ( let ci = 0; ci < KOLOJ.length - 1; ci++ ) {
    if ( KOLOJ[ci + 1] - KOLOJ[ci] === 1 ) {
      RETOX.push(ofsX + ( KOLOJ[ci] + KOLOJ[ci + 1] ) / 2 * TONA);
    }
  }

  const RETOZ: number[] = [];
  for ( let ri = 0; ri < HAVESEFESTAF.length - 1; ri++ ) {
    if ( HAVESEFESTAF[ri + 1] - HAVESEFESTAF[ri] === 1 ) {
      RETOZ.push(ofsZ + ( HAVESEFESTAF[ri] + HAVESEFESTAF[ri + 1] ) / 2 * TONA);
    }
  }
  if ( ptalu.k6liqPal6 === "kvar" ) {
    const e = ( ptalu.ptaluPal6 + 0o1/0o2 ) * TONA;
    RETOX.push(ofsX + e, ofsX - e);
    RETOZ.push(ofsZ + e, ofsZ - e);
  }

  vepaqPudalj.forEach(s => {
    if ( s.fixed ) return;
    const rx = s.x - ofsX, rz = s.z - ofsZ;
    if ( rx !== 0 || rz !== 0 ) {
      if ( Math.abs(rx) > Math.abs(rz) ) {
        s.rot = rx > 0 ? -Math.PI / 2 : Math.PI / 2;
      } else {
        s.rot = rz > 0 ? Math.PI : 0;
      }
    }
  });

  const vepaqHahate: THREE.Group[] = [];
  const ne3ak2Gefhacaht2 = new Set<THREE.Object3D>(qena.children);
  vepaqPudalj.forEach(s => vepaqHahate.push(vepaqSatalon(s, qena, knasukf2qdalai, l6da)));
  // ⟪ ſɭᴜ ı],ƨɔ ʌ ſןᴜȝ ʌ j͐ʃᴜɔ˞ 📃 ⟫
  const vetlaqotaj = new Set<THREE.Object3D>(knasukf2qdalai);
  vakox2qMondajnHacakamaha(qena, qena.children.filter(o => !ne3ak2Gefhacaht2.has(o)), {
    natakatomasai: 0o100,
    ve3aq: ( m ) => vetlaqotaj.has(m),
  });

  const hasCellJe = ( c: number, r: number ) =>
    haKekkozusai.some(( [ lc, lr, lt ] ) => lc === c && lr === r && lt !== null);

  const haqotawaHamaxema: [ number, number ][] = [];
  const tsekeMaxemaValidas = ( x: number, z: number ): boolean => {
    if ( tsasa(x, z) ) return false;
    if ( Math.hypot(x - ofsX, z - ofsZ) > nordaN2k + 0o100 ) return false;
    for ( const s of vepaqPudalj ) {
      if ( Math.hypot(x - s.x, z - s.z) < Math.max(s.w, s.d) / 2 + 0o14/0o10 ) return false;
    }
    return true;
  };
  const tlunakPlacon = ( x: number, z: number ) => {
    if ( !tsekeMaxemaValidas(x, z) ) return;
    haqotawaHamaxema.push([ x, z ]);
  };

  const tlakakRegistro = new Map<string, { sx: number; sz: number }>();
  const tlunaktlakakn = ( x: number, z: number, sx: number, sz: number ) => {
    const k = x + "," + z;
    const e = tlakakRegistro.get(k) || { sx: 0, sz: 0 };
    if ( sx !== 0 ) e.sx = sx;
    if ( sz !== 0 ) e.sz = sz;
    tlakakRegistro.set(k, e);
    tlunakPlacon(x, z);
  };

  const realajHaxes2waz = new Set<string>();
  const NSekstentoj = new Map<number, [ number, number ]>();
  const EWekstentoj = new Map<number, [ number, number ]>();

  const { EW, NS } = skaniK6h6nCaxlefkakai(RETOX, RETOZ, TONA, ofsX, ofsZ,
    ptalu.k6liqPal6 === "vakox2qita" ? ( ptalu.ptaluPal6 + 1 ) * TONA : null, hasCellJe);
  for ( const [ roadZ, hakamekai ] of EW ) {
    for ( const rx of hakamekai ) realajHaxes2waz.add(rx + "," + roadZ);
    EWekstentoj.set(roadZ, [ hakamekai[0], hakamekai[hakamekai.length - 1] ]);
    tlunaktlakakn(hakamekai[0], roadZ, -1, 0);
    tlunaktlakakn(hakamekai[hakamekai.length - 1], roadZ, 1, 0);
    const w = 0o16/0o10;
    for ( let i = 0; i < hakamekai.length - 1; i++ ) {
      const x1 = hakamekai[i], x2 = hakamekai[i + 1];
      if ( Math.abs(x2 - x1) > 0o1/0o10 ) {
        kas2kantaHavop2ni.push({ pts: [ [ x1, roadZ ], [ x2, roadZ ] ], w });
      }
    }
  }

  for ( const [ roadX, hakamekai ] of NS ) {
    for ( const rz of hakamekai ) realajHaxes2waz.add(roadX + "," + rz);
    NSekstentoj.set(roadX, [ hakamekai[0], hakamekai[hakamekai.length - 1] ]);
    tlunaktlakakn(roadX, hakamekai[0], 0, -1);
    tlunaktlakakn(roadX, hakamekai[hakamekai.length - 1], 0, 1);
    const w = 0o16/0o10;
    for ( let i = 0; i < hakamekai.length - 1; i++ ) {
      const z1 = hakamekai[i], z2 = hakamekai[i + 1];
      if ( Math.abs(z2 - z1) > 0o1/0o10 ) {
        kas2kantaHavop2ni.push({ pts: [ [ roadX, z1 ], [ roadX, z2 ] ], w });
      }
    }
  }

  const arkajHamaxema: { x: number; z: number; sx: number; sz: number }[] = [];
  const arkajHacatlaq = new Set<string>();
  for ( const [ k, e ] of tlakakRegistro ) {
    if ( e.sx !== 0 && e.sz !== 0 ) {
      const [ x, z ] = k.split(",").map(Number);
      if ( tsekeMaxemaValidas(x, z) ) {
        arkajHamaxema.push({ x, z, sx: e.sx, sz: e.sz });
        arkajHacatlaq.add(k);
      }
    }
  }
  for ( let i = haqotawaHamaxema.length - 1; i >= 0; i-- ) {
    const [ x, z ] = haqotawaHamaxema[i];
    if ( arkajHacatlaq.has(x + "," + z) ) haqotawaHamaxema.splice(i, 1);
  }
  const tHamaxema = haqotawaHamaxema.filter(( [ px, pz ] ) => realajHaxes2waz.has(px + "," + pz));
  const traHamaxema = new Set<string>([ `${ofsX + t2q2X},${ofsZ + sudaK6h6}` ]);
  const tHanece3e = new Map<string, [ number, number ]>();
  const spronajHaveb6kek = new Map<string, [ number, number ]>();
  for ( const [ tx, tz ] of tHamaxema ) {
    const e = tlakakRegistro.get(tx + "," + tz);
    if ( e && !traHamaxema.has(tx + "," + tz) ) tHanece3e.set(tx + "," + tz, e.sx !== 0 ? [ e.sx, 0 ] : [ 0, e.sz ]);
  }
  for ( const [ px, pz ] of haqotawaHamaxema ) realajHaxes2waz.delete(px + "," + pz);
  for ( const ca3aq of arkajHacatlaq ) realajHaxes2waz.delete(ca3aq);

  // ⟪ ſɭэ ֭ſɭэ tohtanu 📃 ⟫
  // ⟨ tohtanu ⟅ ſɭэ ֭ſɭэ 📃 ⟩
  const spurXoj = RETOX;
  const spurZoj = RETOZ;
  if ( ptalu.k6liqPal6 === "vakox2qita" ) {
    const ekst = NSekstentoj.get(ofsX + t2q2X);
    if ( ekst ) ekst[0] = Math.min(ekst[0], ofsZ - 0o130);
  }
  for ( const s of vepaqPudalj ) {
    if ( s.x === ofsX && s.z === ofsZ ) continue;
    if ( s.fixed === "tlunak" ) continue;
    const rot = s.rot || 0;
    const kevOffset = s.d / 2 + 0o14/0o10;
    const kevX = s.x + Math.sin(rot) * kevOffset;
    const kevZ = s.z + Math.cos(rot) * kevOffset;
    const tohtanuX = s.x + Math.sin(rot) * ( s.d / 2 );
    const tohtanuZ = s.z + Math.cos(rot) * ( s.d / 2 );

    const fX = Math.sin(rot), fZ = Math.cos(rot);
    let kas2kantaX: number, kas2kantaZ: number;
    let spronaVeb6kek: [ number, number, number, number ] | null = null;

    if ( Math.abs(fX) > Math.abs(fZ) ) {
      const kaatse = fX > 0 ? 1 : -1;
      let celX = kaatse > 0 ? Math.max(...spurXoj) : Math.min(...spurXoj);
      for ( const rx of spurXoj ) {
        if ( kaatse > 0 && rx > kevX && rx < celX ) celX = rx;
        if ( kaatse < 0 && rx < kevX && rx > celX ) celX = rx;
      }
      if ( ( kaatse > 0 && celX <= tohtanuX ) || ( kaatse < 0 && celX >= tohtanuX ) ) continue;
      const p2somaniL = 0o7/0o10;
      const ekstX = NSekstentoj.get(celX);
      if ( !ekstX || tohtanuZ < ekstX[0] - p2somaniL || tohtanuZ > ekstX[1] + p2somaniL ) continue;
      // ⟨ }ʃɹƽ ʌ ſɭэ ֭ſɭэ 📃 ⟩
      kas2kantaX = celX;
      kas2kantaZ = tohtanuZ;
      spronaVeb6kek = [ celX, tohtanuZ, kaatse, 0 ];
    } else {
      const kaatse = fZ > 0 ? 1 : -1;
      let celZ = kaatse > 0 ? Math.max(...spurZoj) : Math.min(...spurZoj);
      for ( const rz of spurZoj ) {
        if ( kaatse > 0 && rz > kevZ && rz < celZ ) celZ = rz;
        if ( kaatse < 0 && rz < kevZ && rz > celZ ) celZ = rz;
      }
      if ( ( kaatse > 0 && celZ <= tohtanuZ ) || ( kaatse < 0 && celZ >= tohtanuZ ) ) continue;
      const p2somaniL = 0o7/0o10;
      const ekstZ = EWekstentoj.get(celZ);
      if ( !ekstZ || tohtanuX < ekstZ[0] - p2somaniL || tohtanuX > ekstZ[1] + p2somaniL ) continue;
      kas2kantaX = tohtanuX;
      kas2kantaZ = celZ;
      spronaVeb6kek = [ tohtanuX, celZ, 0, kaatse ];
    }

    if ( Math.hypot(tohtanuX - kas2kantaX, tohtanuZ - kas2kantaZ) > 0o4/0o10 ) {
      if ( spronaVeb6kek ) {
        const ca3aq = spronaVeb6kek[0] + "," + spronaVeb6kek[1];
        if ( !tHanece3e.has(ca3aq) && !realajHaxes2waz.has(ca3aq) && !arkajHacatlaq.has(ca3aq) )
          spronajHaveb6kek.set(ca3aq, [ spronaVeb6kek[2], spronaVeb6kek[3] ]);
      }
      kas2kantaHavop2ni.push({ pts: [ [ tohtanuX, tohtanuZ ], [ kas2kantaX, kas2kantaZ ] ], w: 0o16/0o10 });
    }
  }

  // ⟪ ſןᴜ ſᶘɹ 📃 ⟫
  const tamc2kHacatlaq = [ ...realajHaxes2waz, ...spronajHaveb6kek.keys(), ...arkajHacatlaq,
    ...tHamaxema.map(( [ px, pz ] ) => px + "," + pz ) ];
  const tamc2kHan2k = tamc2kHacatlaq.map(ca3aq => ca3aq.split(",").map(Number) as [ number, number ]);
  const hapukxe = new Map<string, [ number, number ]>([ ...tHanece3e, ...spronajHaveb6kek ]);
  for ( const a of arkajHamaxema ) hapukxe.set(a.x + "," + a.z, [ a.sx, a.sz ]);

  // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞙɭı , ſןᴜȝ ʌ ꞙɭı 📃 ⟩

  // ⟪ ſɟɔ j͐ʃɹ }ʃw ſᶘɔ ɭl̀ɹȝ ꞁȷ̀ᴜꞇ ( ſɭɹ ſןᴜ ʌ ſɭɔƽ ) 📃 ⟫
  const lampHaqar: LampQar[] = [];
  const addLamp = kf2LampAldonilon(vepaqPudalj, lampHaqar);
  const addLampGroup = kf2KvarLampAldonilon(addLamp, lampHaqar);
  if ( ptalu.hahufwuk2 !== false ) {
    for ( const [ aX, aZ ] of haqotawaHamaxema ) {
      addLampGroup(aX, aZ, 0o21/0o10);
    }
    for ( const gx of RETOX ) {
      for ( const gz of RETOZ ) {
        if ( Math.abs(gz - k6siZ(gx)) < 0o14 ) continue;
        if ( !realajHaxes2waz.has(gx + "," + gz) ) continue;
        addLampGroup(gx, gz, 0o23/0o10);
      }
    }
    for ( const a of arkajHamaxema ) {
      addLampGroup(a.x, a.z, 0o23/0o10);
    }
  }

  // ⟪ ſɭᴜ ı],ƨɔ ı],ᴜͷ̗ ꞁȷ̀ᴜꞇ 📃 ⟫
  const kekufxesoKa5ik = 0o10;
  const raqa: KekufxesoRaqa[] = [];
  if ( ptalu.kekufxeso ) {
    for ( let i = 0; i < 4; i++ ) {
      const a = Math.PI / 4 + i * Math.PI / 2;
      raqa.push({ x: ofsX + Math.cos(a) * kekufxesoKa5ik, z: ofsZ + Math.sin(a) * kekufxesoKa5ik, s2sabo: a });
    }
    vepaqKekufxeso(qena, raqa, l6da, oraPukek);
    for ( const l of raqa ) hasap2.push({ x: l.x, z: l.z, r: 0o16/0o10 });
  }

  const staciaK6liq = tlunakHak6liq.find(b => b.stacia) ?? tlunakHak6liq[0];
  return {
    vepaqPudalj, hasap2, knasukf2qdalai, vepaqHahate, haqotawaHamaxema,
    kas2kantaHavop2ni, tamc2kHan2k, tamc2kHanece3e: hapukxe,
    lampHaqar, kekufxesoHaqar: raqa,
    staciaXekuxa: staciaK6liq
      ? [ ofsX + staciaK6liq.x, ofsZ + staciaK6liq.z ]
      : [ ofsX, ofsZ + ( ptalu.k6liqPal6 === "kvar" ? 0 : ka5asexazZ ) ],
    t2q2X: ofsX + t2q2X,
    sudaK6h6: ofsZ + sudaK6h6,
  };
}
