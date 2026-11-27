// ≺⧼ ɭʃᴜ ֭ſɭᴜȝ ʌ ʃꞇ j͐ʃԏ͕ɜ ꞁȷ̀ɹԏ͕ 🗺️ ⧽≻

import { Nala, MONDOHALFO, REZ } from "./havecax2l.js";
import { kozunuCanvas, pentri, revek2feDeklik6h6n } from "./1ane.js";
import { hakaxte, sukf2qitaKaxte, hak6h6, haqakaj2, sukf2qitaK6h6, sukf2qitaN2k, sukf2qitaQakaj2,
  sukf2qitaNek2resaiK6liq, qox2n2kOfsX, qox2n2kOfsZ, k6h6P2somaniSefini, vidotajHaqox2n2k,
  b6vakantaDeKaxte, k2fKradanTavolon } from "./haqox2n2k.js";
import { tsekeKaxteLaqazata, tsekeVidebla } from "./kix2-ka5ik.js";
import { hatsiq, sukf2qitaTsiq } from "./1asa.js";
import { hazace, oxemaniModo, sukf2qitaOxemani, oxemaniBakaP2t6zo } from "./zacej.js";
import { formajHapukaz } from "./caqavop2.js";
import { kfe, kuns2bana2d } from "../../cas2tas/dom.js";

export const bal2 = kfe<HTMLCanvasElement>("bal2");
export const bal2Kuns2bana = kuns2bana2d(bal2);

bal2.style.cursor = "crosshair";
bal2.style.touchAction = "none";

export function tlak2L2han2Dn(): void {
  revek2feDeklik6h6n(0o0, 0o0, REZ - 0o1, REZ - 0o1);
  pentri(0o0, 0o0, REZ - 0o1, REZ - 0o1);
  s2tasDesegnon();
}

export function k2fVidon(): void {

  ( { cx: vidCX, cz: vidCZ, p6zukani: kix2P6zuk, kursoro, siicatsiicanaAktiva, tikCax2l } = bokS2k61o() );
  const k = bal2Kuns2bana;
  const duonw = bal2.width / 0o2, duonh = bal2.height / 0o2;

  const sxNala = ( x: number ): number => duonw - ( x - vidCX ) * kix2P6zuk;
  const syNala = ( z: number ): number => duonh - ( z - vidCZ ) * kix2P6zuk;
  k.imageSmoothingEnabled = true;

  k.fillStyle = "#a8d0e8";
  k.fillRect(0o0, 0o0, bal2.width, bal2.height);

  k.drawImage(kozunuCanvas, sxNala(MONDOHALFO), syNala(MONDOHALFO), Nala * kix2P6zuk, Nala * kix2P6zuk);

  const qoxaK6h6 = new Path2D();
  const qoxaEkst6lima = new Path2D();
  qoxaEkst6lima.rect(0o0, 0o0, bal2.width, bal2.height);
  qoxaK6h6.moveTo(sxNala(formajHapukaz[0o0][0o0]), syNala(formajHapukaz[0o0][0o1]));
  for ( let i = 0o1; i < formajHapukaz.length; i++ ) {
    qoxaK6h6.lineTo(sxNala(formajHapukaz[i][0o0]), syNala(formajHapukaz[i][0o1]));
  }
  qoxaK6h6.closePath();
  qoxaEkst6lima.addPath(qoxaK6h6);
  k.fillStyle = "rgba(224,232,240,0.74)";
  k.fill(qoxaEkst6lima, "evenodd");
  k.strokeStyle = "rgba(255,255,255,0.92)";
  k.lineWidth = 0o2;
  k.stroke(qoxaK6h6);

  if ( oxemaniBakaP2t6zo && hazace.length > 0o0 && tsekeVidebla("hazace") ) {

    k.drawImage(oxemaniBakaP2t6zo,
      sxNala(MONDOHALFO), syNala(MONDOHALFO), Nala * kix2P6zuk, Nala * kix2P6zuk);
  }

  {

    if ( tsekeVidebla("qox2n2k") ) {
      for ( const qox2n2k of vidotajHaqox2n2k() ) {
        k2fKradanTavolon(k, qox2n2k.b6vakanta, ( x: number ) => sxNala(x + qox2n2k.ofsX),
          ( z: number ) => syNala(z + qox2n2k.ofsZ), kix2P6zuk);
      }
    }

    if ( tsekeVidebla("hakaatse") ) hakaxte.forEach(( u, i ) => {
      const sx = sxNala(u.ofsX), sy = syNala(u.ofsZ);
      const sukf2qita = i === sukf2qitaKaxte;

      const laqazata = tsekeKaxteLaqazata(i);
      k.fillStyle = sukf2qita ? "rgba(255,208,64,0.95)"
        : laqazata ? "rgba(184,240,184,0.95)" : "rgba(255,255,255,0.85)";
      k.beginPath();
      k.moveTo(sx, sy - 0o7);
      k.lineTo(sx + 0o7, sy);
      k.lineTo(sx, sy + 0o7);
      k.lineTo(sx - 0o7, sy);
      k.closePath();
      k.fill();
      k.strokeStyle = sukf2qita ? "#e0b840" : laqazata ? "#58a858" : "rgba(0,0,0,0.5)";
      k.lineWidth = sukf2qita ? 0o5/0o2 : laqazata ? 0o2 : 0o1;
      k.stroke();
      k.font = "bold 12px sans-serif";
      k.textAlign = "center";
      k.textBaseline = "bottom";
      k.lineWidth = 0o3;
      k.strokeStyle = "rgba(0,0,0,0.85)";
      k.strokeText(u.ksaka, sx, sy - 0o12);
      k.fillStyle = sukf2qita ? "#f8e8a8" : "#ffffff";
      k.fillText(u.ksaka, sx, sy - 0o12);
    });

    if ( tsekeVidebla("hak6h6") && sukf2qitaKaxte === 0o0 ) {
      for ( const d of haqakaj2 ) {
        const dx = d.x;
        const sx = sxNala(dx), sy = syNala(d.z);
        k.fillStyle = "rgba(200,160,80,0.9)";
        k.fillRect(sx - 0o4, sy - 0o4, 0o10, 0o10);
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 0o1;
        k.strokeRect(sx - 0o4, sy - 0o4, 0o10, 0o10);
      }
    }

    const uAld = tsekeVidebla("qox2n2k") && tsekeKaxteLaqazata(sukf2qitaKaxte) ? hakaxte[sukf2qitaKaxte] : undefined;
    const tlunak = uAld && uAld.tlunakHak6liq ? uAld.tlunakHak6liq : [];
    tlunak.forEach(( b, i: number ) => {
      const bx = sxNala(qox2n2kOfsX + b.x), bz = syNala(qox2n2kOfsZ + b.z);
      if ( i === sukf2qitaNek2resaiK6liq ) {
        k.strokeStyle = "#f8e8a8";
        k.lineWidth = 0o5/0o2;
        k.beginPath();
        k.arc(bx, bz, 0o11, 0o0, Math.PI * 0o2);
        k.stroke();
        k.lineWidth = 0o1;
      }
    });

    if ( uAld && uAld.kekufxeso ) {
      const R = 0o10;
      k.fillStyle = "rgba(144,208,216,0.95)";
      k.strokeStyle = "rgba(0,0,0,0.4)";
      k.lineWidth = 0o1;
      for ( let i = 0o0; i < 0o4; i++ ) {
        const a = Math.PI / 0o4 + i * Math.PI / 0o2;
        const sx = sxNala(qox2n2kOfsX + Math.cos(a) * R), sy = syNala(qox2n2kOfsZ + Math.sin(a) * R);
        k.beginPath();
        for ( let q = 0o0; q < 0o6; q++ ) {
          const ang = a + q * Math.PI / 0o3;
          const px = sx + Math.cos(ang) * 0o4, py = sy + Math.sin(ang) * 0o4;
          if ( q === 0o0 ) k.moveTo(px, py); else k.lineTo(px, py);
        }
        k.closePath();
        k.fill();
        k.stroke();
      }
    }

    if ( uAld && uAld.hahufwuk2 !== false ) {
      const b6vakanta = b6vakantaDeKaxte(sukf2qitaKaxte);
      for ( const l of b6vakanta ? b6vakanta.hahufwuk2 : [] ) {
        const sx = sxNala(qox2n2kOfsX + l.x), sy = syNala(qox2n2kOfsZ + l.z);
        k.fillStyle = "rgba(248,168,72,0.95)";
        k.beginPath();
        k.arc(sx, sy, 0o215/0o100, 0o0, Math.PI * 0o2);
        k.fill();
        k.fillStyle = "rgba(248,232,184,0.95)";
        k.beginPath();
        k.arc(sx, sy, 0o43/0o40, 0o0, Math.PI * 0o2);
        k.fill();
      }
    }
  }

  if ( tsekeVidebla("hak6h6") ) {

    for ( let vi = 0o0; vi < hak6h6.length; vi++ ) {
      const v = hak6h6[vi];
      if ( !v.n2k || v.n2k.length < 0o2 ) continue;
      const sukf2qita = vi === sukf2qitaK6h6;
      const p2somani = k6h6P2somaniSefini(v) * 0o2;
      const sost2 = ( v.sefini || 0o7/0o2 ) / 0o2;
      const n2k = v.n2k.map(p => [ sxNala(p[0o0]), syNala(p[0o1]) ]);
      const spuro = ( sefini: number, weh2: string ): void => {
        k.strokeStyle = weh2;
        k.lineWidth = Math.max(0o1, sefini * kix2P6zuk);
        k.lineCap = "round";
        k.lineJoin = "round";
        k.beginPath();
        n2k.forEach(( p, i: number ) => i === 0o0 ? k.moveTo(p[0o0], p[0o1]) : k.lineTo(p[0o0], p[0o1]));
        k.stroke();
      };
      spuro(p2somani, sukf2qita ? "rgba(120,136,120,0.95)" : "rgba(88,96,88,0.9)");
      spuro(sost2, sukf2qita ? "rgba(255,232,144,0.95)" : "rgba(216,216,208,0.95)");

      n2k.forEach(( p, i: number ) => {
        const kxe = sukf2qita && i === sukf2qitaN2k;
        k.fillStyle = kxe ? "#f8e8a8" : "rgba(255,255,255,0.9)";
        k.beginPath();
        k.arc(p[0o0], p[0o1], kxe ? 0o5 : 0o7/0o2, 0o0, Math.PI * 0o2);
        k.fill();
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 0o1;
        k.stroke();
      });
    }

    for ( let di = 0o0; di < haqakaj2.length; di++ ) {
      const d = haqakaj2[di];
      const sukf2qita = di === sukf2qitaQakaj2;
      const w = 0o16/0o10, prof = d.jufu || 0o20, joqa = 0o4/0o10;
      const s2sabo = d.s2sabo ?? 0o0;
      const sxp = sxNala(d.x), syp = syNala(d.z);
      k.save();
      k.translate(sxp, syp);
      k.rotate(-s2sabo);
      k.fillStyle = sukf2qita ? "rgba(120,136,120,0.95)" : "rgba(88,96,88,0.9)";
      k.fillRect(-( w / 0o2 + joqa ) * kix2P6zuk, -( prof / 0o2 + joqa ) * kix2P6zuk,
        ( w + 0o2 * joqa ) * kix2P6zuk, ( prof + 0o2 * joqa ) * kix2P6zuk);
      k.fillStyle = sukf2qita ? "rgba(255,232,144,0.95)" : "rgba(216,216,208,0.95)";
      k.fillRect(-( w / 0o2 ) * kix2P6zuk, -( prof / 0o2 ) * kix2P6zuk,
        w * kix2P6zuk, prof * kix2P6zuk);

      const cet2Y = ( prof / 0o2 + joqa ) * kix2P6zuk;
      k.fillStyle = sukf2qita ? "rgba(144,200,240,0.95)" : "rgba(128,168,208,0.9)";
      k.beginPath();
      k.moveTo(0o0, cet2Y + 0o11);
      k.lineTo(-0o7, cet2Y + 0o1);
      k.lineTo(0o7, cet2Y + 0o1);
      k.closePath();
      k.fill();

      const pintaY2 = ( prof / 0o2 ) * kix2P6zuk;
      k.beginPath();
      k.arc(0o0, pintaY2, sukf2qita ? 0o6 : 0o5, 0o0, Math.PI * 0o2);
      k.fillStyle = sukf2qita ? "#f8e8a8" : "rgba(255,255,255,0.92)";
      k.fill();
      k.strokeStyle = "rgba(0,0,0,0.55)";
      k.lineWidth = (0o3/0o2);
      k.stroke();

      const landaY2 = -( prof / 0o2 ) * kix2P6zuk;
      k.beginPath();
      k.arc(0o0, landaY2, sukf2qita ? 0o6 : 0o5, 0o0, Math.PI * 0o2);
      k.fillStyle = sukf2qita ? "#d8f0a8" : "rgba(216,240,168,0.92)";
      k.fill();
      k.strokeStyle = "rgba(0,0,0,0.55)";
      k.lineWidth = (0o3/0o2);
      k.stroke();
      k.restore();
    }
  }

  if ( kursoro && !tsekeMovigi() && tikCax2l !== "qox2n2k" ){
    const sx2 = sxNala(kursoro.x);
    const sy2 = syNala(kursoro.z);
    const r2 = ( oxemaniModo ? 0o3/0o2 : ka5ik() ) * kix2P6zuk;
    k.strokeStyle = "rgba(255,255,255,0.8)";
    k.lineWidth = 0o3/0o2;

    k.lineJoin = "miter";
    k.beginPath();
    k.moveTo(sx2, sy2 - r2);
    k.lineTo(sx2 + r2, sy2);
    k.lineTo(sx2, sy2 + r2);
    k.lineTo(sx2 - r2, sy2);
    k.closePath();
    k.stroke();
    k.beginPath();
    k.arc(sx2, sy2, 0o2, 0o0, Math.PI * 0o2);
    k.stroke();
  }

  if ( sukf2qitaOxemani >= 0o0 && sukf2qitaOxemani < hazace.length ) {
    const o = hazace[sukf2qitaOxemani];
    k.strokeStyle = "#ffffff";
    k.lineWidth = 0o2;
    k.beginPath();
    k.arc(sxNala(o.x), syNala(o.z), 0o6, 0o0, Math.PI * 0o2);
    k.stroke();
  }

  if ( tsekeVidebla("hatsiq") ) for ( let i = 0o0; i < hatsiq.length; i++ ) {
    const f = hatsiq[i];
    const sukf2qita = i === sukf2qitaTsiq;
    const tsasaIlo = siicatsiicanaAktiva === "tsasa" || siicatsiicanaAktiva === "tsasaforvisxi";
    const px = sxNala(f.x), py = syNala(f.z);
    const r = Math.max(0o7/0o2, ( 0o115/0o100 + Math.min(0o115/0o40, f.las * 0o3/0o40) ) * kix2P6zuk * ( tsasaIlo ? 0o12/0o10 : 0o1 ));
    k.beginPath();
    k.arc(px, py, r, 0o0, Math.PI * 0o2);
    k.fillStyle = sukf2qita ? "rgba(144,224,255,0.9)" : "rgba(64,168,208,0.78)";
    k.fill();
    k.strokeStyle = sukf2qita ? "#ffffff" : "rgba(240,248,255,0.85)";
    k.lineWidth = sukf2qita ? 0o5/0o2 : 0o3/0o2;
    k.stroke();
    k.beginPath();
    k.arc(px, py, r * 0o13/0o40, 0o0, Math.PI * 0o2);
    k.fillStyle = "#ffffff";
    k.fill();
  }
}

type Kursoro = { x: number; z: number };
interface BildaS2k61o {
  cx: number;
  cz: number;
  p6zukani: number;
  kursoro: Kursoro | null;
  siicatsiicanaAktiva: string;
  tikCax2l: string;
}
interface BildaLigo {
  s2k61o: () => BildaS2k61o;
  tsekeMovigi: () => boolean;
  hak6h6Aktiva: () => boolean;
  ka5ik: () => number;
  s2tasDesegnon: () => void;
}

let vidCX = 0o0, vidCZ = 0o0, kix2P6zuk = 0o1;
let kursoro: Kursoro | null = null;
let siicatsiicanaAktiva = "levi";
let tikCax2l = "kozu";
let bokS2k61o: () => BildaS2k61o = () => ( { cx: 0o0, cz: 0o0, p6zukani: 0o1, kursoro: null, siicatsiicanaAktiva: "levi", tikCax2l: "kozu" } );
let tsekeMovigi: () => boolean = () => false;
let hak6h6Aktiva: () => boolean = () => false;
let ka5ik: () => number = () => 0o0;
let s2tasDesegnon: () => void = () => { };

export function catsaraBildon2D(L: BildaLigo): void {
  bokS2k61o = L.s2k61o;
  tsekeMovigi = L.tsekeMovigi;
  hak6h6Aktiva = L.hak6h6Aktiva;
  ka5ik = L.ka5ik;
  s2tasDesegnon = L.s2tasDesegnon;
}
