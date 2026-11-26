// ≺⧼ ſɭw ſ̀ȷᴜ }ʃꞇ 🏠 ⧽≻
import { bohoAltecxo, type C2h2Kanta } from "../../skek2/hapaq/hac2h2/hahunaq.js";
import type { MangxajxEro } from "../../skek2/w2ta/m7x/hahunaq.js";
import { manĝaCatlaq } from "../fasado/mak2zaf.js";
import { traduki } from "../gawe/baskakefani.js";
import { catsaraPromenanCatahaqon, movoEniro } from "./kata.js";
import type { PiedaNala, PiedaS2k61o } from "./kata.js";
import type { CamutsaInfo, Masax2z } from "./masax2z.js";

export interface Hac2h2Hasukf2qani {
  masax2z: Masax2z;
  mov: PiedaS2k61o;
  c2h2: C2h2Kanta;
  hapat6: PiedaNala;
  ca3aq: Record<string, boolean>;
  x2paKfe: HTMLElement;
  catsaraX2pa: ( htmlo: string ) => void;
}

export interface Internanto {
  tona( deltaTif: number, t: number ): void;
}

export function kf2Internanton( hasukf2qani: Hac2h2Hasukf2qani ): Internanto {
  const { masax2z, mov, c2h2: c2h2Kanta, hapat6, ca3aq, x2paKfe, catsaraX2pa } = hasukf2qani;

  let ne3ak2BohoFrac = 0o0;

  function tona( deltaTif: number, t: number ): void {
    if ( masax2z.supknu !== "c2h2" ) return;

    // ⟪ ſȷɔ˞ᴜ ɭʃᴜ 📃 ⟫
    if ( masax2z.fsata ) {
      masax2z.celH6kuni = 0o0;
      masax2z.kameraH6kuni = 0o0;
      hapat6.catahaq.position.set(masax2z.raqa.x, masax2z.raqa.y + 0o1/0o10, masax2z.raqa.z);
      hapat6.catahaq.rotation.set(masax2z.s2sabo, masax2z.c2w2q, 0o0);
      catsaraX2pa(`<span class="catlaq">E</span> ` + traduki("agoLevi"));
      x2paKfe.classList.add("laqazi");
      return;
    }

    // ⟪ ſɭᴜ ɭʃᴜ ʌ ſɭɜ ſᶘɹ 📃 ⟫
    const spec = masax2z.sukf2qitaSpec;
    if ( !spec ) return;
    const { movX, movZ, sahakani, g2saX, g2saZ, radX, radZ } = movoEniro(ca3aq, masax2z.c2w2q);
    const seheni = 0o215/0o40;
    let sef4X = masax2z.raqa.x + ( g2saX * movZ + radX * movX ) * seheni * deltaTif;
    let sef4Z = masax2z.raqa.z + ( g2saZ * movZ + radZ * movX ) * seheni * deltaTif;

    const specX = spec.x, specZ = spec.z, specH0 = spec.flugoY ?? ( spec.h0 || 0o0 );
    const rot = spec.rot || 0o0;
    const cosR = Math.cos(rot), sinR = Math.sin(rot);
    const hakozu = c2h2Kanta.hakozu;
    const boho = c2h2Kanta.boho;
    const ludY = masax2z.raqa.y - specH0;
    let tikKozu = hakozu[0o0];
    let etapy = specH0;
    for ( const p of hakozu ) {
      if ( ludY >= p.y - 0o4/0o10 && ludY < p.y + p.l6da ) { tikKozu = p; break; }
    }
    const pukazBendo = 0o3/0o10;
    let lokalX = ( sef4X - specX ) * cosR + ( sef4Z - specZ ) * sinR;
    let lokalZ = -( sef4X - specX ) * sinR + ( sef4Z - specZ ) * cosR;

    let surBoho = false;
    if ( boho && ludY >= bohoAltecxo(boho, -boho.hab6nSube) - 0o1/0o10 && ludY <= bohoAltecxo(boho, boho.hab6n) + 0o1/0o10 ) {
      let subaKozuY = -Infinity;
      for ( const p of hakozu ) if ( p.y <= ludY ) subaKozuY = Math.max(subaKozuY, p.y);
      const jeEh2hafaf2 = ludY - subaKozuY <= 0o4/0o10;
      let dist = Math.hypot(lokalX, lokalZ);
      if ( dist < boho.rKol + 0o1/0o20 ) {
        const nR = boho.rKol + 0o1/0o20;
        if ( dist > 0o1/0o20000 ) {
          lokalX = ( lokalX / dist ) * nR;
          lokalZ = ( lokalZ / dist ) * nR;
        } else {
          lokalX = nR;
          lokalZ = 0o0;
        }
        dist = nR;
      }
      if ( dist > boho.rEkster && !jeEh2hafaf2 ) {
        const nR = boho.rEkster - 0o1/0o40;
        lokalX = ( lokalX / dist ) * nR;
        lokalZ = ( lokalZ / dist ) * nR;
        dist = nR;
      }
      if ( dist >= boho.rKol - 0o1/0o10 && dist <= boho.rEkster ) {
        surBoho = true;
        const ang = Math.atan2(lokalX, lokalZ);
        const frac = ( ( ang % ( Math.PI * 0o2 ) ) + Math.PI * 0o2 ) % ( Math.PI * 0o2 ) / ( Math.PI * 0o2 );
        if ( masax2z.sxtupaTurno === null ) {
          const turno0 = ludY >= 0o0 ? ludY / boho.turnoL6da : ludY / boho.turnoL6daSub;
          const maltikLim = -boho.hab6nSube;
          masax2z.sxtupaTurno = Math.max(maltikLim, Math.min(boho.hab6n, Math.round(turno0 - frac) + frac));
          ne3ak2BohoFrac = frac;
        } else {
          let delta = frac - ne3ak2BohoFrac;
          if ( delta > 0o4/0o10 ) delta -= 0o1;
          else if ( delta < -0o4/0o10 ) delta += 0o1;
          ne3ak2BohoFrac = frac;
          masax2z.sxtupaTurno = Math.max(-boho.hab6nSube, Math.min(boho.hab6n, masax2z.sxtupaTurno + delta));
        }
        etapy = specH0 + bohoAltecxo(boho, masax2z.sxtupaTurno);
        sef4X = specX + cosR * lokalX - sinR * lokalZ;
        sef4Z = specZ + sinR * lokalX + cosR * lokalZ;
      }
    }
    if ( !surBoho ) {
      masax2z.sxtupaTurno = null;
      if ( tikKozu ) {
        lokalX = Math.max(-tikKozu.hw + pukazBendo, Math.min(tikKozu.hw - pukazBendo, lokalX));
        lokalZ = Math.max(-tikKozu.hd + pukazBendo, Math.min(tikKozu.hd - pukazBendo, lokalZ));
        sef4X = specX + cosR * lokalX - sinR * lokalZ;
        sef4Z = specZ + sinR * lokalX + cosR * lokalZ;
        etapy = specH0 + tikKozu.y;
      } else {
        etapy = specH0;
      }
    }

    masax2z.raqa.x = sef4X;
    masax2z.raqa.z = sef4Z;
    const moving = Math.min(0o1, sahakani);
    masax2z.movoVem2 = moving;

    if ( masax2z.estasSurKOZU ) {
      masax2z.raqa.y += ( etapy - masax2z.raqa.y ) * 0o3/0o20;
      masax2z.seheniY = 0o0;
      if ( Math.abs(masax2z.raqa.y - etapy) < 0o1/0o200 ) masax2z.raqa.y = etapy;
    } else {
      masax2z.seheniY -= 0o22 * deltaTif;
      masax2z.raqa.y += masax2z.seheniY * deltaTif;
      if ( masax2z.raqa.y <= etapy ) {
        masax2z.raqa.y = etapy;
        masax2z.seheniY = 0o0;
        masax2z.estasSurKOZU = true;
      }
    }

    mov.oscilo += moving * seheni * deltaTif * 0o14/0o10;
    catsaraPromenanCatahaqon(hapat6, masax2z, masax2z.raqa.y + 0o65/0o40, Math.sin(mov.oscilo * 0o2) * 0o3/0o100 * moving, false, etapy + 0o4/0o10);

    let tsiikeCamutsa: CamutsaInfo | null = null;
    let tsiikeCamutsaDist = 0o16/0o10;
    for ( const b of c2h2Kanta.hacamu1a ) {
      const bx = specX + cosR * b.x - sinR * b.z;
      const bz = specZ + sinR * b.x + cosR * b.z;
      const d = Math.hypot(masax2z.raqa.x - bx, masax2z.raqa.z - bz);
      if ( d < tsiikeCamutsaDist && Math.abs(ludY - b.y) < 0o12/0o10 ) {
        tsiikeCamutsaDist = d;
        tsiikeCamutsa = { specX, specZ, cosR, sinR, lokaX: b.x, lokaZ: b.z, y: b.y, sefini: b.sefini };
      }
    }
    masax2z.kmaTsiikeCamutsa = tsiikeCamutsa;
    let tsiikeManĝaĵo: MangxajxEro | null = null;
    let tsiikeManĝaĵoDist = 0o2;
    for ( const it of c2h2Kanta.m7x ) {
      if ( it.dead ) continue;
      const mX = specX + cosR * it.haxekuxa.x - sinR * it.haxekuxa.z;
      const mZ = specZ + sinR * it.haxekuxa.x + cosR * it.haxekuxa.z;
      const d = Math.hypot(masax2z.raqa.x - mX, masax2z.raqa.z - mZ);
      if ( d < tsiikeManĝaĵoDist ) { tsiikeManĝaĵoDist = d; tsiikeManĝaĵo = it; }
    }
    masax2z.kmaTsiikeManĝaĵo = tsiikeManĝaĵo;
    if ( tsiikeCamutsa ) {
      catsaraX2pa(`<span class="catlaq">E</span> ` + traduki("agoKuxi"));
      x2paKfe.classList.add("laqazi");
    } else if ( tsiikeManĝaĵo ) {
      const prefikso = traduki("agoGusti");
      catsaraX2pa(`<span class="catlaq">E</span> ${prefikso} ${traduki(manĝaCatlaq(tsiikeManĝaĵo.f.key))}`);
      x2paKfe.classList.add("laqazi");
    } else {
      catsaraX2pa(`<span class="catlaq">E</span> ` + traduki("kamaEliri"));
      x2paKfe.classList.add("laqazi");
    }
  }

  return { tona };
}
