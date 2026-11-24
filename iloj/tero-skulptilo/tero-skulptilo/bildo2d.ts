// ≺⧼ ɭʃᴜ ֭ſɭᴜȝ 🗺️ ⧽≻
// ſɭᴜ ſןᴜ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭэ ᶗ‹ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
import { MONDO, MONDO_HALFO, REZ } from "./havecax2l.js";
import { bazaCanvas, pentri, rekalkuliDeklivojn } from "./bako.js";
import { hakaxte, elektitaKaxte, hak6h6, haqakaj2, elektitaK6h6, elektitaPunkto, elektitaQakaj2,
  elektitaAldonaBloko, kradoOfsX, kradoOfsZ, k6h6DuonLargho, vidotajKradoj,
  planoDeKaxte, k2fKradanTavolon } from "./kradaro.js";
import { tsekeKaxteMontrata, tsekeVidebla } from "./videco.js";
import { hatsiq, elektitaTsiq } from "./akvo.js";
import { objektoj, objektaModo, elektitaObjekto, objektaBakaKanvaso } from "./objektoj.js";
import { formajRandaj } from "./dosieroj.js";
import { elemento, kuns2bana2d } from "../../komunajxoj/dom.js";

export const mapo = elemento<HTMLCanvasElement>("mapo");
export const mapoKuns2bana = kuns2bana2d(mapo);
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
mapo.style.cursor = "crosshair";
mapo.style.touchAction = "none";
// ſɭэ ſɭw , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
export function gxisdatigiPlenan2Dn(): void {
  rekalkuliDeklivojn(0, 0, REZ - 1, REZ - 1);
  pentri(0, 0, REZ - 1, REZ - 1);
  markiDesegnon();
}

export function k2fVidon(): void {
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  ( { cx: vidCX, cz: vidCZ, p6zukani: vidSkalo, kursoro, penikoAktiva, aktivaTabo } = preniStaton() );
  const k = mapoKuns2bana;
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
  const sxMondo = ( x: number ): number => duonw - ( x - vidCX ) * vidSkalo;
  const syMondo = ( z: number ): number => duonh - ( z - vidCZ ) * vidSkalo;
  k.imageSmoothingEnabled = true;
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
  k.fillStyle = "#a8d0e8";
  k.fillRect(0, 0, mapo.width, mapo.height);
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  k.drawImage(bazaCanvas, sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
// ⟪ ſɭэ ſɭw , 📃 ⟫ , ſɭэ ſɭw ,
// ſɭэ ſɭw , ꞙɭı ,
// ſɭэ ſɭw , ꞙɭɿ ,
// ſɭэ ſɭw , ꞙɭц ,
  const qoxaK6h6 = new Path2D();
  const qoxaEkstero = new Path2D();
  qoxaEkstero.rect(0, 0, mapo.width, mapo.height);
  qoxaK6h6.moveTo(sxMondo(formajRandaj[0][0]), syMondo(formajRandaj[0][1]));
  for ( let i = 1; i < formajRandaj.length; i++ ) {
    qoxaK6h6.lineTo(sxMondo(formajRandaj[i][0]), syMondo(formajRandaj[i][1]));
  }
  qoxaK6h6.closePath();
  qoxaEkstero.addPath(qoxaK6h6);
  k.fillStyle = "rgba(224,232,240,0.74)";
  k.fill(qoxaEkstero, "evenodd");
  k.strokeStyle = "rgba(255,255,255,0.92)";
  k.lineWidth = 2;
  k.stroke(qoxaK6h6);
// ſɭɜ ſɭᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
  if ( objektaBakaKanvaso && objektoj.length > 0 && tsekeVidebla("objektoj") ) {
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    k.drawImage(objektaBakaKanvaso,
      sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  }
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ⟨ ſɭᴜ ſןᴜ , 🏙️ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ⟪ ſɭᴜ ſןᴜ , 🏙️ ⟫ , ſɭᴜ ſןᴜ ,
// ſɭэ ſɭw , ꞙɭı ,
  {
// ſɭᴜ ſןᴜ , 👁️ ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    if ( tsekeVidebla("krado") ) {
      for ( const krado of vidotajKradoj() ) {
        k2fKradanTavolon(k, krado.plano, ( x: number ) => sxMondo(x + krado.ofsX),
          ( z: number ) => syMondo(z + krado.ofsZ), vidSkalo);
      }
    }
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ( ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
    if ( tsekeVidebla("signoj") ) hakaxte.forEach(( u, i ) => {
      const sx = sxMondo(u.ofsX), sy = syMondo(u.ofsZ);
      const elektita = i === elektitaKaxte;
// ſɭᴜ ſןᴜ , ꞙɭı ,
      const montrata = tsekeKaxteMontrata(i);
      k.fillStyle = elektita ? "rgba(255,208,64,0.95)"
        : montrata ? "rgba(184,240,184,0.95)" : "rgba(255,255,255,0.85)";
      k.beginPath();
      k.moveTo(sx, sy - 7);
      k.lineTo(sx + 7, sy);
      k.lineTo(sx, sy + 7);
      k.lineTo(sx - 7, sy);
      k.closePath();
      k.fill();
      k.strokeStyle = elektita ? "#e0b840" : montrata ? "#58a858" : "rgba(0,0,0,0.5)";
      k.lineWidth = elektita ? 0o5/0o2 : montrata ? 2 : 1;
      k.stroke();
      k.font = "bold 12px sans-serif";
      k.textAlign = "center";
      k.textBaseline = "bottom";
      k.lineWidth = 3;
      k.strokeStyle = "rgba(0,0,0,0.85)";
      k.strokeText(u.ksaka, sx, sy - 0o12);
      k.fillStyle = elektita ? "#f8e8a8" : "#ffffff";
      k.fillText(u.ksaka, sx, sy - 0o12);
    });
// ſןɔ˞ᴜƴ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
    if ( tsekeVidebla("hak6h6") && elektitaKaxte === 0 ) {
      for ( const d of haqakaj2 ) {
        const dx = d.x;
        const sx = sxMondo(dx), sy = syMondo(d.z);
        k.fillStyle = "rgba(200,160,80,0.9)";
        k.fillRect(sx - 4, sy - 4, 0o10, 0o10);
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.strokeRect(sx - 4, sy - 4, 0o10, 0o10);
      }
    }
// ſɭᴜ ſןᴜ , ꞙɭэ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
    const uAld = tsekeVidebla("krado") && tsekeKaxteMontrata(elektitaKaxte) ? hakaxte[elektitaKaxte] : undefined;
    const aldonaj = uAld && uAld.aldonajBlokoj ? uAld.aldonajBlokoj : [];
    aldonaj.forEach(( b, i: number ) => {
      const bx = sxMondo(kradoOfsX + b.x), bz = syMondo(kradoOfsZ + b.z);
      if ( i === elektitaAldonaBloko ) {
        k.strokeStyle = "#f8e8a8";
        k.lineWidth = 0o5/0o2;
        k.beginPath();
        k.arc(bx, bz, 0o11, 0, Math.PI * 2);
        k.stroke();
        k.lineWidth = 1;
      }
    });
// ſ͕ɭɜ ı],ᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
    if ( uAld && uAld.keuxfhxeso ) {
      const R = 0o10;
      k.fillStyle = "rgba(144,208,216,0.95)";
      k.strokeStyle = "rgba(0,0,0,0.4)";
      k.lineWidth = 1;
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const sx = sxMondo(kradoOfsX + Math.cos(a) * R), sy = syMondo(kradoOfsZ + Math.sin(a) * R);
        k.beginPath();
        for ( let q = 0; q < 6; q++ ) {
          const ang = a + q * Math.PI / 3;
          const px = sx + Math.cos(ang) * 4, py = sy + Math.sin(ang) * 4;
          if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
        }
        k.closePath();
        k.fill();
        k.stroke();
      }
    }
// ſᶘᴜ j͑ʃᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
    if ( uAld && uAld.lampoj !== false ) {
      const plano = planoDeKaxte(elektitaKaxte);
      for ( const l of plano ? plano.lampoj : [] ) {
        const sx = sxMondo(kradoOfsX + l.x), sy = syMondo(kradoOfsZ + l.z);
        k.fillStyle = "rgba(248,168,72,0.95)";
        k.beginPath();
        k.arc(sx, sy, 0o215/0o100, 0, Math.PI * 2);
        k.fill();
        k.fillStyle = "rgba(248,232,184,0.95)";
        k.beginPath();
        k.arc(sx, sy, 0o43/0o40, 0, Math.PI * 2);
        k.fill();
      }
    }
  }
// ſɭэ ֭ſɭэ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭэ ֭ſɭэ , ꞙɭэ ,
  if ( tsekeVidebla("hak6h6") ) {
// ſɭэ ֭ſɭэ , ꞙɭɩ ,
// ſɭэ ֭ſɭэ , ꞙɭꞟ ,
// ſɭэ ֭ſɭэ , ꞙɭı ,
    for ( let vi = 0; vi < hak6h6.length; vi++ ) {
      const v = hak6h6[vi];
      if ( !v.n2k || v.n2k.length < 2 ) continue;
      const elektita = vi === elektitaK6h6;
      const p2somani = k6h6DuonLargho(v) * 2;
      const sost2 = ( v.sefini || 0o7/0o2 ) / 2;
      const n2k = v.n2k.map(p => [ sxMondo(p[0]), syMondo(p[1]) ]);
      const spuro = ( sefini: number, weh2: string ): void => {
        k.strokeStyle = weh2;
        k.lineWidth = Math.max(1, sefini * vidSkalo);
        k.lineCap = "round";
        k.lineJoin = "round";
        k.beginPath();
        n2k.forEach(( p, i: number ) => i === 0 ? k.moveTo(p[0], p[1]) : k.lineTo(p[0], p[1]));
        k.stroke();
      };
      spuro(p2somani, elektita ? "rgba(120,136,120,0.95)" : "rgba(88,96,88,0.9)");
      spuro(sost2, elektita ? "rgba(255,232,144,0.95)" : "rgba(216,216,208,0.95)");
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
      n2k.forEach(( p, i: number ) => {
        const aktiva = elektita && i === elektitaPunkto;
        k.fillStyle = aktiva ? "#f8e8a8" : "rgba(255,255,255,0.9)";
        k.beginPath();
        k.arc(p[0], p[1], aktiva ? 5 : 0o7/0o2, 0, Math.PI * 2);
        k.fill();
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
// ſןɔ˞ᴜƴ , ꞙɭц ,
// ſןɔ˞ᴜƴ , ꞙɭэ , ꞙɭıɩ , ꞙɭıɔ ,
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭɩ ,
// ſןɔ˞ᴜƴ , ꞙɭꞟ ,
// ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ( ſןɔ˞ᴜƴ , ꞙɭэ ,
    for ( let di = 0; di < haqakaj2.length; di++ ) {
      const d = haqakaj2[di];
      const elektita = di === elektitaQakaj2;
      const w = 0o16/0o10, prof = d.profundo || 0o20, joqa = 0o4/0o10;
      const rotacio = d.rotacio ?? 0;
      const sxp = sxMondo(d.x), syp = syMondo(d.z);
      k.save();
      k.translate(sxp, syp);
      k.rotate(-rotacio);
      k.fillStyle = elektita ? "rgba(120,136,120,0.95)" : "rgba(88,96,88,0.9)";
      k.fillRect(-( w / 2 + joqa ) * vidSkalo, -( prof / 2 + joqa ) * vidSkalo,
        ( w + 2 * joqa ) * vidSkalo, ( prof + 2 * joqa ) * vidSkalo);
      k.fillStyle = elektita ? "rgba(255,232,144,0.95)" : "rgba(216,216,208,0.95)";
      k.fillRect(-( w / 2 ) * vidSkalo, -( prof / 2 ) * vidSkalo,
        w * vidSkalo, prof * vidSkalo);
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭɩ ,
// ſןɔ˞ᴜƴ , ꞙɭꞟ ,
// ſןɔ˞ᴜƴ , ꞙɭı ,
// ſןɔ˞ᴜƴ , ꞙɭɿ ,
      const pintoY = ( prof / 2 + joqa ) * vidSkalo;
      k.fillStyle = elektita ? "rgba(144,200,240,0.95)" : "rgba(128,168,208,0.9)";
      k.beginPath();
      k.moveTo(0, pintoY + 0o11);
      k.lineTo(-7, pintoY + 1);
      k.lineTo(7, pintoY + 1);
      k.closePath();
      k.fill();
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭц ,
// ſןɔ˞ᴜƴ , ꞙɭэ ,
      const pintaY2 = ( prof / 2 ) * vidSkalo;
      k.beginPath();
      k.arc(0, pintaY2, elektita ? 6 : 5, 0, Math.PI * 2);
      k.fillStyle = elektita ? "#f8e8a8" : "rgba(255,255,255,0.92)";
      k.fill();
      k.strokeStyle = "rgba(0,0,0,0.55)";
      k.lineWidth = 1.5;
      k.stroke();
// ⟨ ſןɔ˞ᴜƴ , 📃 ⟩ , ſןɔ˞ᴜƴ ,
// ſןɔ˞ᴜƴ , ꞙɭɩ ,
// ſןɔ˞ᴜƴ , ꞙɭꞟ ,
      const landaY2 = -( prof / 2 ) * vidSkalo;
      k.beginPath();
      k.arc(0, landaY2, elektita ? 6 : 5, 0, Math.PI * 2);
      k.fillStyle = elektita ? "#d8f0a8" : "rgba(216,240,168,0.92)";
      k.fill();
      k.strokeStyle = "rgba(0,0,0,0.55)";
      k.lineWidth = 1.5;
      k.stroke();
      k.restore();
    }
  }
// ſɭᴜ ſןᴜ , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
// ſɭᴜ ſןᴜ , ꞙɭц ,
// ſɭᴜ ſןᴜ , ꞙɭэ ,
  if ( kursoro && !tsekeMovigi() && aktivaTabo !== "krado" ){
    const sx2 = sxMondo(kursoro.x);
    const sy2 = syMondo(kursoro.z);
    const r2 = ( objektaModo ? 0o3/0o2 : ka5ik() ) * vidSkalo;
    k.strokeStyle = "rgba(255,255,255,0.8)";
    k.lineWidth = 0o3/0o2;
// ⟨ ſɭᴜ ſןᴜ , 📏 ⟩ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭı ,
    k.lineJoin = "miter";
    k.beginPath();
    k.moveTo(sx2, sy2 - r2);
    k.lineTo(sx2 + r2, sy2);
    k.lineTo(sx2, sy2 + r2);
    k.lineTo(sx2 - r2, sy2);
    k.closePath();
    k.stroke();
    k.beginPath();
    k.arc(sx2, sy2, 2, 0, Math.PI * 2);
    k.stroke();
  }
// ſɭᴜ ſןᴜ , ꞙɭɿ ,
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    k.strokeStyle = "#ffffff";
    k.lineWidth = 2;
    k.beginPath();
    k.arc(sxMondo(o.x), syMondo(o.z), 6, 0, Math.PI * 2);
    k.stroke();
  }
// ⟪ ſᶘᴜ j͑ʃᴜ , 📃 ⟫ , ſᶘᴜ j͑ʃᴜ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭı ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭɿ ,
// ſᶘᴜ j͑ʃᴜ , ꞙɭц ,
  if ( tsekeVidebla("hatsiq") ) for ( let i = 0; i < hatsiq.length; i++ ) {
    const f = hatsiq[i];
    const elektita = i === elektitaTsiq;
    const akvaIlo = penikoAktiva === "akvo" || penikoAktiva === "akvoforvisxi";
    const px = sxMondo(f.x), py = syMondo(f.z);
    const r = Math.max(0o7/0o2, ( 0o115/0o100 + Math.min(0o115/0o40, f.fluo * 0o3/0o40) ) * vidSkalo * ( akvaIlo ? 0o12/0o10 : 1 ));
    k.beginPath();
    k.arc(px, py, r, 0, Math.PI * 2);
    k.fillStyle = elektita ? "rgba(144,224,255,0.9)" : "rgba(64,168,208,0.78)";
    k.fill();
    k.strokeStyle = elektita ? "#ffffff" : "rgba(240,248,255,0.85)";
    k.lineWidth = elektita ? 0o5/0o2 : 0o3/0o2;
    k.stroke();
    k.beginPath();
    k.arc(px, py, r * 0o13/0o40, 0, Math.PI * 2);
    k.fillStyle = "#ffffff";
    k.fill();
  }
}


// ⟪ ſɭэ ᶗ‹ , ꞙɭэ , 📃 ⟫ , ſɭᴜ ſןᴜ ,
// ſɭᴜ ſןᴜ , ꞙɭɩ ,
// ſɭᴜ ſןᴜ , ꞙɭꞟ ,
type Kursoro = { x: number; z: number };
interface BildaStato {
  cx: number;
  cz: number;
  p6zukani: number;
  kursoro: Kursoro | null;
  penikoAktiva: string;
  aktivaTabo: string;
}
interface BildaLigo {
  stato: () => BildaStato;
  tsekeMovigi: () => boolean;
  hak6h6Aktiva: () => boolean;
  ka5ik: () => number;
  markiDesegnon: () => void;
}
// ſɭᴜ ſןᴜ , ꞙɭı ,
let vidCX = 0, vidCZ = 0, vidSkalo = 1;
let kursoro: Kursoro | null = null;
let penikoAktiva = "levi";
let aktivaTabo = "tereno";
let preniStaton: () => BildaStato = () => ( { cx: 0, cz: 0, p6zukani: 1, kursoro: null, penikoAktiva: "levi", aktivaTabo: "tereno" } );
let tsekeMovigi: () => boolean = () => false;
let hak6h6Aktiva: () => boolean = () => false;
let ka5ik: () => number = () => 0;
let markiDesegnon: () => void = () => { };
/* ſɭэ ᶗ‹ , ꞙɭɿ ,
    @param L ( BildaLigo ) - កម្មវិធីអានស្ថានភាព និងឧបករណ៍ជំនួយរបស់កម្មវិធីកែសម្រួល។ */
export function agordiBildon2D(L: BildaLigo): void {
  preniStaton = L.stato;
  tsekeMovigi = L.tsekeMovigi;
  hak6h6Aktiva = L.hak6h6Aktiva;
  ka5ik = L.ka5ik;
  markiDesegnon = L.markiDesegnon;
}
