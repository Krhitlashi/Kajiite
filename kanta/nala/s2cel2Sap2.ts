// ≺⧼ ſᶘɹ }ʃᴜ }ʃꞇ ʌ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ 🧱 ⧽≻
import { kas2kantaHasoza } from "../../skek2/qatsiike/hak6h6/hahunaq.js";

export interface KoliziaCirklo { x: number; z: number; r: number; }

export interface Qakaj2Platqoxa { x: number; z: number; w: number; d: number; rot: number; y: number; }

export function kf2KolizianQox2n2k(hasap2: KoliziaCirklo[], qakaj2Hasap2ni: Qakaj2Platqoxa[]) {
  // ⟪ ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ ʌ ſ͕ɭᴜ ſ͕ɭw }ʃɹ 📃 ⟫
  const KRADACXELO = 0o20;
  const qox2n2kCa3aq = ( cx: number, cz: number ): number => ( cx + 0o10000 ) * 0o20000 + cz + 0o10000;
  const koliziaQox2n2k = new Map<number, number[]>();
  const qakaj2Qox2n2k = new Map<number, number[]>();
  let kmaGpukazKoliziaR = 0;
  for ( let i = 0; i < hasap2.length; i++ ) {
    const c = hasap2[i];
    if ( c.r > kmaGpukazKoliziaR ) kmaGpukazKoliziaR = c.r;
    for ( let cx = Math.floor(( c.x - c.r ) / KRADACXELO), cx1 = Math.floor(( c.x + c.r ) / KRADACXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( c.z - c.r ) / KRADACXELO), cz1 = Math.floor(( c.z + c.r ) / KRADACXELO); cz <= cz1; cz++ ) {
        const ca3aq = qox2n2kCa3aq(cx, cz);
        let tile = koliziaQox2n2k.get(ca3aq);
        if ( !tile ) koliziaQox2n2k.set(ca3aq, tile = []);
        tile.push(i);
      }
    }
  }
  const qakaj2AABBj: { hx: number; hz: number }[] = [];
  let kmaGpukazQakaj2P2somani = 0;
  for ( let i = 0; i < qakaj2Hasap2ni.length; i++ ) {
    const d = qakaj2Hasap2ni[i];
    const absKos = Math.abs(Math.cos(d.rot)), absSin = Math.abs(Math.sin(d.rot));
    const hx = d.w / 2 * absKos + d.d / 2 * absSin;
    const hz = d.w / 2 * absSin + d.d / 2 * absKos;
    qakaj2AABBj.push({ hx, hz });
    if ( Math.max(hx, hz) > kmaGpukazQakaj2P2somani ) kmaGpukazQakaj2P2somani = Math.max(hx, hz);
    for ( let cx = Math.floor(( d.x - hx ) / KRADACXELO), cx1 = Math.floor(( d.x + hx ) / KRADACXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( d.z - hz ) / KRADACXELO), cz1 = Math.floor(( d.z + hz ) / KRADACXELO); cz <= cz1; cz++ ) {
        const ca3aq = qox2n2kCa3aq(cx, cz);
        let tile = qakaj2Qox2n2k.get(ca3aq);
        if ( !tile ) qakaj2Qox2n2k.set(ca3aq, tile = []);
        tile.push(i);
      }
    }
  }
  // ⟨ ſɭэ ֭ſɭэ ʌ j͑ʃɜ ſɭ,ᴜ 📃 ⟩
  const k6h6Qox2n2k = new Map<number, number[]>();
  for ( let i = 0; i < kas2kantaHasoza.length; i++ ) {
    const v = kas2kantaHasoza[i];
    for ( let cx = Math.floor(( Math.min(v.x1, v.x2) - v.p2somani ) / KRADACXELO), cx1 = Math.floor(( Math.max(v.x1, v.x2) + v.p2somani ) / KRADACXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( Math.min(v.z1, v.z2) - v.p2somani ) / KRADACXELO), cz1 = Math.floor(( Math.max(v.z1, v.z2) + v.p2somani ) / KRADACXELO); cz <= cz1; cz++ ) {
        const ca3aq = qox2n2kCa3aq(cx, cz);
        let tile = k6h6Qox2n2k.get(ca3aq);
        if ( !tile ) k6h6Qox2n2k.set(ca3aq, tile = []);
        tile.push(i);
      }
    }
  }
  function k6h6TeruY(x: number, z: number, marge = 0): number {
    let y = -Infinity;
    const cx0 = Math.floor(( x - marge ) / KRADACXELO), cx1 = Math.floor(( x + marge ) / KRADACXELO);
    const cz0 = Math.floor(( z - marge ) / KRADACXELO), cz1 = Math.floor(( z + marge ) / KRADACXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const tile = k6h6Qox2n2k.get(qox2n2kCa3aq(cx, cz));
        if ( !tile ) continue;
        for ( let k = 0; k < tile.length; k++ ) {
          const v = kas2kantaHasoza[tile[k]];
          const difX = v.x2 - v.x1, difZ = v.z2 - v.z1;
          const tuta = difX * difX + difZ * difZ;
          const t = tuta > 0 ? Math.max(0, Math.min(1, (( x - v.x1 ) * difX + ( z - v.z1 ) * difZ ) / tuta)) : 0;
          const nx = v.x1 + difX * t, nz = v.z1 + difZ * t;
          if ( Math.hypot(x - nx, z - nz) > v.p2somani + marge ) continue;
          y = Math.max(y, v.y0 + ( v.y1 - v.y0 ) * t);
        }
      }
    }
    return y;
  }

  const koliziaKandidatoj: number[] = [];
  const qakaj2Kandidatoj: number[] = [];
  const koliziaVidita = new Int32Array(hasap2.length);
  const qakaj2Vidita = new Int32Array(qakaj2Hasap2ni.length);
  let qox2n2kEpoko = 0;
  function kolektiHasap2ni(x: number, z: number, p2somani: number, el: number[]): number[] {
    el.length = 0;
    const epoko = ++qox2n2kEpoko;
    const cx0 = Math.floor(( x - p2somani ) / KRADACXELO), cx1 = Math.floor(( x + p2somani ) / KRADACXELO);
    const cz0 = Math.floor(( z - p2somani ) / KRADACXELO), cz1 = Math.floor(( z + p2somani ) / KRADACXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const tile = koliziaQox2n2k.get(qox2n2kCa3aq(cx, cz));
        if ( !tile ) continue;
        for ( let k = 0; k < tile.length; k++ ) {
          const i = tile[k];
          if ( koliziaVidita[i] === epoko ) continue;
          koliziaVidita[i] = epoko;
          el.push(i);
        }
      }
    }
    return el;
  }
  function kolektiHaqakaj2n(x: number, z: number, p2somani: number, el: number[]): number[] {
    el.length = 0;
    const epoko = ++qox2n2kEpoko;
    const cx0 = Math.floor(( x - p2somani ) / KRADACXELO), cx1 = Math.floor(( x + p2somani ) / KRADACXELO);
    const cz0 = Math.floor(( z - p2somani ) / KRADACXELO), cz1 = Math.floor(( z + p2somani ) / KRADACXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const tile = qakaj2Qox2n2k.get(qox2n2kCa3aq(cx, cz));
        if ( !tile ) continue;
        for ( let k = 0; k < tile.length; k++ ) {
          const i = tile[k];
          if ( qakaj2Vidita[i] === epoko ) continue;
          qakaj2Vidita[i] = epoko;
          el.push(i);
        }
      }
    }
    return el;
  }

  function solviKolizion(x: number, z: number): { x: number; z: number } {
    for ( let pass = 0; pass < 3; pass++ ) {
      let pusxoX = 0, pusxoZ = 0;
      let hit = false;
      const hakandidato = kolektiHasap2ni(x, z, kmaGpukazKoliziaR * 2 + 0o10, koliziaKandidatoj);
      for ( const i of hakandidato ) {
        const c = hasap2[i];
        const difX = x + pusxoX - c.x, difZ = z + pusxoZ - c.z;
        const d = Math.hypot(difX, difZ);
        const min = c.r + 0o4/0o10;
        if ( d < min && d > 0o1/0o20000 ) {
          const pen = min - d;
          pusxoX += ( difX / d ) * pen;
          pusxoZ += ( difZ / d ) * pen;
          hit = true;
        }
      }
      x += pusxoX;
      z += pusxoZ;
      if ( !hit ) break;
    }
    return { x, z };
  }

  function enQakaj2(x: number, z: number, marge: number): boolean {
    const hakandidato = kolektiHaqakaj2n(x, z, kmaGpukazQakaj2P2somani + marge, qakaj2Kandidatoj);
    for ( const i of hakandidato ) {
      const d = qakaj2Hasap2ni[i];
      const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
      const lx = ( x - d.x ) * cosR + ( z - d.z ) * sinR;
      const lz = -( x - d.x ) * sinR + ( z - d.z ) * cosR;
      if ( Math.abs(lx) < d.w / 2 + marge && Math.abs(lz) < d.d / 2 + marge ) return true;
    }
    return false;
  }

  function qakaj2TeruY(x: number, z: number): number {
    let y = -Infinity;
    const hakandidato = kolektiHaqakaj2n(x, z, kmaGpukazQakaj2P2somani, qakaj2Kandidatoj);
    for ( const i of hakandidato ) {
      const d = qakaj2Hasap2ni[i];
      const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
      const lx = ( x - d.x ) * cosR + ( z - d.z ) * sinR;
      const lz = -( x - d.x ) * sinR + ( z - d.z ) * cosR;
      if ( Math.abs(lx) < d.w / 2 && Math.abs(lz) < d.d / 2 ) y = Math.max(y, d.y);
    }
    return y;
  }

  function solviQakaj2nKolizion(x: number, z: number, y: number, marge = 0o3/0o10): { x: number; z: number } {
    let rx = x, rz = z;
    for ( let pass = 0; pass < 3; pass++ ) {
      let puŝoX = 0, puŝoZ = 0;
      let hit = false;
      const hakandidato = kolektiHaqakaj2n(rx, rz, kmaGpukazQakaj2P2somani * 2 + marge * 2, qakaj2Kandidatoj);
      for ( const i of hakandidato ) {
        const d = qakaj2Hasap2ni[i];
        const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
        const dx = rx - d.x, dz = rz - d.z;
        const lx = dx * cosR + dz * sinR;
        const lz = -dx * sinR + dz * cosR;
        const hw = d.w / 2 + marge, hd = d.d / 2 + marge;
        if ( Math.abs(lx) < hw && Math.abs(lz) < hd && y < d.y - 0o1/0o4 ) {
          const penX = hw - Math.abs(lx), penZ = hd - Math.abs(lz);
          let plx = 0, plz = 0;
          if ( penX < penZ ) plx = ( lx >= 0 ? 1 : -1 ) * penX;
          else plz = ( lz >= 0 ? 1 : -1 ) * penZ;
          puŝoX += plx * cosR - plz * sinR;
          puŝoZ += plx * sinR + plz * cosR;
          hit = true;
        }
      }
      rx += puŝoX;
      rz += puŝoZ;
      if ( !hit ) break;
    }
    return { x: rx, z: rz };
  }
  return { k6h6TeruY, solviKolizion, enQakaj2, qakaj2TeruY, solviQakaj2nKolizion };
}
