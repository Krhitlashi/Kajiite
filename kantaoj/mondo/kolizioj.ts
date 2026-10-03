// ≺⧼ ការប៉ះទង្គិចក្រឡា 🧱 ⧽≻
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";

export interface KoliziaCirklo { x: number; z: number; r: number; }

export interface DokaPlatformo { x: number; z: number; w: number; d: number; rot: number; y: number; }

export function kreiKolizianKradon(kolizioj: KoliziaCirklo[], dokoKolizioj: DokaPlatformo[]) {
  // ⟪ ក្រឡាលំហ 📃 ⟫
  const KRADA_CXELO = 0o20;
  const kradaSxlosilo = ( cx: number, cz: number ): number => ( cx + 0o10000 ) * 0o20000 + cz + 0o10000;
  const koliziaKrado = new Map<number, number[]>();
  const dokaKrado = new Map<number, number[]>();
  let plejGrandaKoliziaR = 0;
  for ( let i = 0; i < kolizioj.length; i++ ) {
    const c = kolizioj[i];
    if ( c.r > plejGrandaKoliziaR ) plejGrandaKoliziaR = c.r;
    for ( let cx = Math.floor(( c.x - c.r ) / KRADA_CXELO), cx1 = Math.floor(( c.x + c.r ) / KRADA_CXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( c.z - c.r ) / KRADA_CXELO), cz1 = Math.floor(( c.z + c.r ) / KRADA_CXELO); cz <= cz1; cz++ ) {
        const ŝlosilo = kradaSxlosilo(cx, cz);
        let ĉelo = koliziaKrado.get(ŝlosilo);
        if ( !ĉelo ) koliziaKrado.set(ŝlosilo, ĉelo = []);
        ĉelo.push(i);
      }
    }
  }
  const dokaAABBj: { hx: number; hz: number }[] = [];
  let plejGrandaDokaDuono = 0;
  for ( let i = 0; i < dokoKolizioj.length; i++ ) {
    const d = dokoKolizioj[i];
    const absKos = Math.abs(Math.cos(d.rot)), absSin = Math.abs(Math.sin(d.rot));
    const hx = d.w / 2 * absKos + d.d / 2 * absSin;
    const hz = d.w / 2 * absSin + d.d / 2 * absKos;
    dokaAABBj.push({ hx, hz });
    if ( Math.max(hx, hz) > plejGrandaDokaDuono ) plejGrandaDokaDuono = Math.max(hx, hz);
    for ( let cx = Math.floor(( d.x - hx ) / KRADA_CXELO), cx1 = Math.floor(( d.x + hx ) / KRADA_CXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( d.z - hz ) / KRADA_CXELO), cz1 = Math.floor(( d.z + hz ) / KRADA_CXELO); cz <= cz1; cz++ ) {
        const ŝlosilo = kradaSxlosilo(cx, cz);
        let ĉelo = dokaKrado.get(ŝlosilo);
        if ( !ĉelo ) dokaKrado.set(ŝlosilo, ĉelo = []);
        ĉelo.push(i);
      }
    }
  }
  // ⟨ ផ្ទៃផ្លូវ 📃 ⟩
  const vojaKrado = new Map<number, number[]>();
  for ( let i = 0; i < vojSuprajxoj.length; i++ ) {
    const v = vojSuprajxoj[i];
    for ( let cx = Math.floor(( Math.min(v.x1, v.x2) - v.duono ) / KRADA_CXELO), cx1 = Math.floor(( Math.max(v.x1, v.x2) + v.duono ) / KRADA_CXELO); cx <= cx1; cx++ ) {
      for ( let cz = Math.floor(( Math.min(v.z1, v.z2) - v.duono ) / KRADA_CXELO), cz1 = Math.floor(( Math.max(v.z1, v.z2) + v.duono ) / KRADA_CXELO); cz <= cz1; cz++ ) {
        const ŝlosilo = kradaSxlosilo(cx, cz);
        let ĉelo = vojaKrado.get(ŝlosilo);
        if ( !ĉelo ) vojaKrado.set(ŝlosilo, ĉelo = []);
        ĉelo.push(i);
      }
    }
  }
  function vojaSuproY(x: number, z: number, marge = 0): number {
    let y = -Infinity;
    const cx0 = Math.floor(( x - marge ) / KRADA_CXELO), cx1 = Math.floor(( x + marge ) / KRADA_CXELO);
    const cz0 = Math.floor(( z - marge ) / KRADA_CXELO), cz1 = Math.floor(( z + marge ) / KRADA_CXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉelo = vojaKrado.get(kradaSxlosilo(cx, cz));
        if ( !ĉelo ) continue;
        for ( let k = 0; k < ĉelo.length; k++ ) {
          const v = vojSuprajxoj[ĉelo[k]];
          const difX = v.x2 - v.x1, difZ = v.z2 - v.z1;
          const tuta = difX * difX + difZ * difZ;
          const t = tuta > 0 ? Math.max(0, Math.min(1, (( x - v.x1 ) * difX + ( z - v.z1 ) * difZ ) / tuta)) : 0;
          const nx = v.x1 + difX * t, nz = v.z1 + difZ * t;
          if ( Math.hypot(x - nx, z - nz) > v.duono + marge ) continue;
          y = Math.max(y, v.y0 + ( v.y1 - v.y0 ) * t);
        }
      }
    }
    return y;
  }

  const koliziaKandidatoj: number[] = [];
  const dokaKandidatoj: number[] = [];
  const koliziaVidita = new Int32Array(kolizioj.length);
  const dokaVidita = new Int32Array(dokoKolizioj.length);
  let kradaEpoko = 0;
  function kolektiKoliziojn(x: number, z: number, duono: number, el: number[]): number[] {
    el.length = 0;
    const epoko = ++kradaEpoko;
    const cx0 = Math.floor(( x - duono ) / KRADA_CXELO), cx1 = Math.floor(( x + duono ) / KRADA_CXELO);
    const cz0 = Math.floor(( z - duono ) / KRADA_CXELO), cz1 = Math.floor(( z + duono ) / KRADA_CXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉelo = koliziaKrado.get(kradaSxlosilo(cx, cz));
        if ( !ĉelo ) continue;
        for ( let k = 0; k < ĉelo.length; k++ ) {
          const i = ĉelo[k];
          if ( koliziaVidita[i] === epoko ) continue;
          koliziaVidita[i] = epoko;
          el.push(i);
        }
      }
    }
    return el;
  }
  function kolektiDokojn(x: number, z: number, duono: number, el: number[]): number[] {
    el.length = 0;
    const epoko = ++kradaEpoko;
    const cx0 = Math.floor(( x - duono ) / KRADA_CXELO), cx1 = Math.floor(( x + duono ) / KRADA_CXELO);
    const cz0 = Math.floor(( z - duono ) / KRADA_CXELO), cz1 = Math.floor(( z + duono ) / KRADA_CXELO);
    for ( let cx = cx0; cx <= cx1; cx++ ) {
      for ( let cz = cz0; cz <= cz1; cz++ ) {
        const ĉelo = dokaKrado.get(kradaSxlosilo(cx, cz));
        if ( !ĉelo ) continue;
        for ( let k = 0; k < ĉelo.length; k++ ) {
          const i = ĉelo[k];
          if ( dokaVidita[i] === epoko ) continue;
          dokaVidita[i] = epoko;
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
      const kandidatoj = kolektiKoliziojn(x, z, plejGrandaKoliziaR * 2 + 0o10, koliziaKandidatoj);
      for ( const i of kandidatoj ) {
        const c = kolizioj[i];
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

  function enDoko(x: number, z: number, marge: number): boolean {
    const kandidatoj = kolektiDokojn(x, z, plejGrandaDokaDuono + marge, dokaKandidatoj);
    for ( const i of kandidatoj ) {
      const d = dokoKolizioj[i];
      const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
      const lx = ( x - d.x ) * cosR + ( z - d.z ) * sinR;
      const lz = -( x - d.x ) * sinR + ( z - d.z ) * cosR;
      if ( Math.abs(lx) < d.w / 2 + marge && Math.abs(lz) < d.d / 2 + marge ) return true;
    }
    return false;
  }

  function dokaSuproY(x: number, z: number): number {
    let y = -Infinity;
    const kandidatoj = kolektiDokojn(x, z, plejGrandaDokaDuono, dokaKandidatoj);
    for ( const i of kandidatoj ) {
      const d = dokoKolizioj[i];
      const cosR = Math.cos(d.rot), sinR = Math.sin(d.rot);
      const lx = ( x - d.x ) * cosR + ( z - d.z ) * sinR;
      const lz = -( x - d.x ) * sinR + ( z - d.z ) * cosR;
      if ( Math.abs(lx) < d.w / 2 && Math.abs(lz) < d.d / 2 ) y = Math.max(y, d.y);
    }
    return y;
  }

  function solviDokanKolizion(x: number, z: number, y: number, marge = 0o3/0o10): { x: number; z: number } {
    let rx = x, rz = z;
    for ( let pass = 0; pass < 3; pass++ ) {
      let puŝoX = 0, puŝoZ = 0;
      let hit = false;
      const kandidatoj = kolektiDokojn(rx, rz, plejGrandaDokaDuono * 2 + marge * 2, dokaKandidatoj);
      for ( const i of kandidatoj ) {
        const d = dokoKolizioj[i];
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
  return { vojaSuproY, solviKolizion, enDoko, dokaSuproY, solviDokanKolizion };
}
