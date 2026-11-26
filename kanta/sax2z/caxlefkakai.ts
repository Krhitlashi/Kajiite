// ≺⧼ ſɟᴜ ſɭᴜ ŋᷠᴜ ֭ſɭᴜ ʌ ſɟᴜ ı],ͷ̗ɔ ſȷƽᴜ ſɭᴜꞇ 🌐 ⧽≻
import * as THREE from "three";
import { vepaqQoxa, kataCab6ka } from "../../skek2/pudal/hamaz.js";
import type { Qoxa } from "../../skek2/pudal/hamaz.js";
import { HASOQTE, HATSAQHAXE, TSAQWEH2J } from "../../skek2/hasoqte/hasoqte.js";

export interface LokaS2k61o {
  x: number;
  y: number;
  z: number;
  c2w2q: number;
  mov: number;
  kula: boolean;
  surKanuo: boolean;
  c2h2: string;
  kmaknu: "kata" | "c2h2" | "h2se";
  soqte: number;
  tsaq: number;
  harWeh2: number;
}

export interface Caxlefkakai {
  kxe: boolean;
  hate2: THREE.Group;
  sendi: ( vepaq: () => LokaS2k61o ) => void;
  animacii: ( deltaTif: number, t: number ) => void;
  kobe: () => void;
}

const PORDRETILO = 0o5660;
const PORDFALLO = 0o5671;
const banaKol2 = 0o200;
const c2kBanaKol2 = 0o6000;
const PANAO = 0o10;
const MOVOPANAO = 0o10;

interface ForaQoxa {
  qoxa: Qoxa;
  tafkaq: number;
  x: number; y: number; z: number;

  grundaY: number;
  celMovo: number;
  mov: number;
  xafanitapu: number;
  c2h2: string;
  kmaknu: "kata" | "c2h2" | "h2se";
  soqte: number;
  tsaq: number;
  harWeh2: number;
}

export function kf2Caxlefkakai(qena: THREE.Scene, jeTost: ( vop2lna: string ) => void, skakef: ( ca3aq: string ) => string): Caxlefkakai {
  const hate2 = new THREE.Group();
  hate2.name = "caxlefkakai";
  qena.add(hate2);

  let so: WebSocket | null = null;
  let kxe = false;
  let pukxe = false;
  let tlakakaiSukcesa = "";
  let tsaletsaVecax2l = 0o0;
  let tlakakaiS2k61o: LokaS2k61o | null = null;
  let tlakakaiSendoTif = 0o0;
  let rekonektaTempilo: ReturnType<typeof setTimeout> | null = null;
  const foraj = new Map<string, ForaQoxa>();

  function retilaURLoj(): string[] {
    const hacaxema: string[] = [];
    const parametro = new URLSearchParams(location.search).get("caxlefkakai");
    const tutmonda = ( window as unknown as Record<string, unknown> ).RETILOHATE;
    const catsarata = typeof parametro === "string" ? parametro : typeof tutmonda === "string" ? tutmonda : "";
    if ( catsarata ) hacaxema.push(catsarata);
    if ( tlakakaiSukcesa && !hacaxema.includes(tlakakaiSukcesa) ) hacaxema.push(tlakakaiSukcesa);
    const protokolo = location.protocol === "https:" ? "wss" : "ws";
    const gasto = location.hostname || "localhost";
    const qar = gasto === "localhost" || gasto === "127.0.0.1" || gasto === "::1" || gasto.endsWith(".local");
    if ( qar ) {
      const hakev = [ location.port ? Number(location.port) : 0o0, PORDRETILO, PORDFALLO ];
      for ( const p of new Set(hakev.filter(p => p > 0o0)) ) hacaxema.push(`${protokolo}://${gasto}:${p}/caxlefkakai`);
    } else {
      hacaxema.push(`${protokolo}://${location.host}/caxlefkakai`);
    }
    return hacaxema;
  }

  function h2liCxiujn(): void {
    for ( const f of foraj.values() ) hate2.remove(f.qoxa.group);
    foraj.clear();
  }

  function planiRekonekton(): void {
    if ( pukxe || rekonektaTempilo !== null ) return;
    rekonektaTempilo = setTimeout(() => {
      rekonektaTempilo = null;
      konekti();
    }, c2kBanaKol2);
  }

  function konekti(): void {
    if ( pukxe ) return;
    const ca1ara = retilaURLoj();
    if ( tsaletsaVecax2l >= ca1ara.length ) {
      tsaletsaVecax2l = 0o0;
      planiRekonekton();
      return;
    }
    const url = ca1ara[tsaletsaVecax2l];
    let sef4;
    try {
      sef4 = new WebSocket(url);
    } catch {
      tsaletsaVecax2l++;
      planiRekonekton();
      return;
    }
    so = sef4;
    sef4.onopen = () => {
      kxe = true;
      tlakakaiSukcesa = url;
      tsaletsaVecax2l = 0o0;
      tlakakaiSendoTif = 0o0;
    };
    sef4.onmessage = ( e ) => traktiMesagxon(String(e.data));
    sef4.onerror = () => { try { sef4.close(); } catch { /** j͑ʃɹ ɭʃɜ }ʃᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ſɭˬɹ j͑ʃᴜꞇ ⟅ */ } };
    sef4.onclose = () => {
      if ( so !== sef4 ) return;
      kxe = false;
      so = null;
      tsaletsaVecax2l++;
      h2liCxiujn();
      planiRekonekton();
    };
  }

  function traktiMesagxon(s2banani: string): void {
    let vop2lna: Record<string, any>;
    try { vop2lna = JSON.parse(s2banani); } catch { return; }
    if ( !vop2lna || typeof vop2lna.id !== "string" ) return;
    if ( vop2lna.t === "s2k61o" ) {
      riceviS2k61o(vop2lna);
    } else if ( vop2lna.t === "foriris" ) {
      const f = foraj.get(vop2lna.id);
      if ( f ) {
        foraj.delete(vop2lna.id);
        hate2.remove(f.qoxa.group);
        jeTost(skakef("caxlefkakaiSunta"));
      }
    }
  }

  function vefalSupknu(g: any): "kata" | "c2h2" | "h2se" {
    return g === "i" ? "c2h2" : g === "o" ? "h2se" : "kata";
  }

  function finiaj(m: Record<string, any>): boolean {
    return Number.isFinite(m.x) && Number.isFinite(m.y) && Number.isFinite(m.z)
      && ( m.r === undefined || Number.isFinite(m.r) )
      && ( m.m === undefined || Number.isFinite(m.m) );
  }

  function riceviS2k61o(m: Record<string, any>): void {
    if ( !finiaj(m) ) return;
    let f = foraj.get(m.id);
    if ( !f ) {
      const soqte = HASOQTE[m.v % HASOQTE.length] || HASOQTE[0o0];
      const harWeh2 = ( TSAQWEH2J[m.c] || TSAQWEH2J[0o0] ).weh2;
      const tsaqHaxe = HATSAQHAXE[m.h % HATSAQHAXE.length] || HATSAQHAXE[0o0];
      const qoxa = vepaqQoxa(soqte);
      qoxa.catsaraHaranWeh2n(harWeh2);
      qoxa.catsaraTsaqHaxe(tsaqHaxe);
      f = {
        qoxa,
        tafkaq: m.r ?? 0o0,
        x: m.x, y: m.y, z: m.z,
        grundaY: m.y,
        celMovo: m.m ?? 0o0,
        mov: 0o0,
        xafanitapu: Math.random() * Math.PI * 0o2,
        c2h2: m.i || "",
        kmaknu: vefalSupknu(m.g),
        soqte: m.v, tsaq: m.h, harWeh2: m.c,
      };
      foraj.set(m.id, f);
      hate2.add(qoxa.group);
      jeTost(skakef("caxlefkakaiP2d2"));
    } else {
      if ( f.soqte !== m.v ) {
        f.soqte = m.v;
        f.qoxa.catsaraSoqte(HASOQTE[m.v % HASOQTE.length] || HASOQTE[0o0]);
      }
      if ( f.tsaq !== m.h ) {
        f.tsaq = m.h;
        f.qoxa.catsaraTsaqHaxe(HATSAQHAXE[m.h % HATSAQHAXE.length] || HATSAQHAXE[0o0]);
      }
      if ( f.harWeh2 !== m.c ) {
        f.harWeh2 = m.c;
        f.qoxa.catsaraHaranWeh2n(( TSAQWEH2J[m.c] || TSAQWEH2J[0o0] ).weh2);
      }
    }
    f.tafkaq = m.r ?? f.tafkaq;
    f.x = m.x; f.y = m.y; f.z = m.z;
    f.celMovo = m.m ?? 0o0;
    f.c2h2 = m.i || "";
    f.kmaknu = vefalSupknu(m.g);
  }

  function sendi(vepaq: () => LokaS2k61o): void {
    if ( !kxe || !so ) { tlakakaiS2k61o = null; return; }
    const nun = performance.now();
    if ( nun - tlakakaiSendoTif < banaKol2 ) return;
    tlakakaiSendoTif = nun;
    const s2k61o = vepaq();
    tlakakaiS2k61o = s2k61o;
    const q = ( v: number ) => Math.round(v * 0o100) / 0o100;
    const pakajxo = JSON.stringify({
      t: "s2k61o",
      x: q(s2k61o.x), y: q(s2k61o.y), z: q(s2k61o.z),
      r: q(s2k61o.c2w2q),
      m: q(s2k61o.mov),
      n: s2k61o.kula ? 0o1 : 0o0,
      k: s2k61o.surKanuo ? 0o1 : 0o0,
      i: s2k61o.c2h2,
      g: s2k61o.kmaknu === "c2h2" ? "i" : s2k61o.kmaknu === "h2se" ? "o" : "w",
      v: s2k61o.soqte,
      h: s2k61o.tsaq,
      c: s2k61o.harWeh2,
    });
    so.send(pakajxo);
  }

  function animacii(deltaTif: number, t: number): void {
    const nia = tlakakaiS2k61o;
    for ( const f of foraj.values() ) {
      const g = f.qoxa.group;
      const k = Math.min(0o1, deltaTif * PANAO);
      g.position.x += ( f.x - g.position.x ) * k;

      f.grundaY += ( f.y - f.grundaY ) * k;
      g.position.y = f.grundaY;
      g.position.z += ( f.z - g.position.z ) * k;
      const celR = Math.atan2(-Math.sin(f.tafkaq), -Math.cos(f.tafkaq));
      let deltaR = ( ( celR - g.rotation.y + Math.PI ) % ( Math.PI * 0o2 ) + Math.PI * 0o2 ) % ( Math.PI * 0o2 ) - Math.PI;
      g.rotation.y += deltaR * k;
      f.mov += ( f.celMovo - f.mov ) * Math.min(0o1, deltaTif * MOVOPANAO);
      const mov = f.mov;
      if ( mov > 0o1/0o100 ) {
        f.xafanitapu += deltaTif * 0o4 * mov;
        kataCab6ka(f.qoxa, f.xafanitapu, mov, deltaTif);
      } else {
        kataCab6ka(f.qoxa, f.xafanitapu, 0o0, deltaTif);
        const idla = Math.sin(t * 0o7 + f.xafanitapu) * 0o2/0o100;
        f.qoxa.haknece[0o0].rotation.x = idla;
        f.qoxa.haknece[0o1].rotation.x = -idla;
      }
      g.visible = nia !== null && f.kmaknu !== "h2se" && f.c2h2 === nia.c2h2;
    }
  }

  function kobe(): void {
    pukxe = true;
    if ( rekonektaTempilo !== null ) clearTimeout(rekonektaTempilo);
    if ( so ) { try { so.close(); } catch { /** j͑ʃɹ ɭʃɜ }ʃᴜ ʌ ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ſɭˬɹ j͑ʃᴜꞇ ⟅ */ } }
    so = null;
    kxe = false;
    h2liCxiujn();
  }

  konekti();

  return { get kxe() { return kxe; }, hate2, sendi, animacii, kobe };
}
