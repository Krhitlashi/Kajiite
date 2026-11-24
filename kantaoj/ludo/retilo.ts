// ≺⧼ ſɟᴜ ſɭᴜ ŋᷠᴜ ֭ſɭᴜ 🌐 ⧽≻
import * as THREE from "three";
import { vepaqFiguron, marŝSvingo } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import type { Figuro } from "../../eskekoj/shalaj-hapudal/hamaz.js";
import { VESTOJ, HARSTILOJ, HARKOLOROJ } from "../../eskekoj/vestaro/vestoj.js";

// ⟪ ſɭэ ſɭᴜ , ſɭэ ɭʃᴜ , 📃 ⟫
export interface LokaStato {
  x: number;
  y: number;
  z: number;
  c2w2q: number;
  movo: number;
  naĝas: boolean;
  surKanuo: boolean;
  interno: string;
  reĝimo: "promeno" | "interno" | "orbito";
  vesto: number;
  haro: number;
  harKoloro: number;
}

export interface Retilo {
  aktiva: boolean;
  hate: THREE.Group;
  sendi: ( vepaq: () => LokaStato ) => void;
  animacii: ( deltaTempo: number, t: number ) => void;
  fermi: () => void;
}

// ⟪ ſɭэ ɭʃᴜ , ſ͔ɭᴜ }ʃꞇ , 📃 ⟫
// ⟨ j͑ʃᴜ ſɭ,w , j͑ʃᴜ ſɭᴜ , 📏 ⟩
const PORD_RETILO = 0o5660;
const PORD_FALLO = 0o5671;
const SENDOPAŬZO = 0o200;
const REKONEKTAŬZO = 0o6000;
const SEKVO = 0o10;
const MOVOSEKVO = 0o10;

interface ForaFiguro {
  figuro: Figuro;
  tafkaq: number;
  x: number; y: number; z: number;
// ⟨ j͑ʃᴜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭı ,
// j͑ʃᴜ ſɭ,w , ꞙɭı , ꞙɭı , 📃 ⟩
  grundaY: number;
  celMovo: number;
  movo: number;
  fazo: number;
  interno: string;
  reĝimo: "promeno" | "interno" | "orbito";
  vesto: number;
  haro: number;
  harKoloro: number;
}

export function kf2Retilon(qena: THREE.Scene, jeTost: ( mesagxo: string ) => void, traduki: ( ca3aq: string ) => string): Retilo {
  const hate = new THREE.Group();
  hate.name = "retilo";
  qena.add(hate);

  let so: WebSocket | null = null;
  let aktiva = false;
  let fermita = false;
  let lastaSukcesa = "";
  let provoIndekso = 0;
  let lastaStato: LokaStato | null = null;
  let lastaSendoTempo = 0;
  let rekonektaTempilo: ReturnType<typeof setTimeout> | null = null;
  const foraj = new Map<string, ForaFiguro>();

  function retilaURLoj(): string[] {
    const ujoj: string[] = [];
    const parametro = new URLSearchParams(location.search).get("retilo");
    const tutmonda = ( window as unknown as Record<string, unknown> ).RETILO_SERVILO;
    const agordita = typeof parametro === "string" ? parametro : typeof tutmonda === "string" ? tutmonda : "";
    if ( agordita ) ujoj.push(agordita);
    if ( lastaSukcesa && !ujoj.includes(lastaSukcesa) ) ujoj.push(lastaSukcesa);
    const protokolo = location.protocol === "https:" ? "wss" : "ws";
    const gasto = location.hostname || "localhost";
    const loka = gasto === "localhost" || gasto === "127.0.0.1" || gasto === "::1" || gasto.endsWith(".local");
    if ( loka ) {
      const pordoj = [ location.port ? Number(location.port) : 0, PORD_RETILO, PORD_FALLO ];
      for ( const p of new Set(pordoj.filter(p => p > 0)) ) ujoj.push(`${protokolo}://${gasto}:${p}/retilo`);
    } else {
      ujoj.push(`${protokolo}://${location.host}/retilo`);
    }
    return ujoj;
  }

  function forigiCxiujn(): void {
    for ( const f of foraj.values() ) hate.remove(f.figuro.group);
    foraj.clear();
  }

  function planiRekonekton(): void {
    if ( fermita || rekonektaTempilo !== null ) return;
    rekonektaTempilo = setTimeout(() => {
      rekonektaTempilo = null;
      konekti();
    }, REKONEKTAŬZO);
  }

  function konekti(): void {
    if ( fermita ) return;
    const ca1ara = retilaURLoj();
    if ( provoIndekso >= ca1ara.length ) {
      provoIndekso = 0;
      planiRekonekton();
      return;
    }
    const url = ca1ara[provoIndekso];
    let sef4;
    try {
      sef4 = new WebSocket(url);
    } catch {
      provoIndekso++;
      planiRekonekton();
      return;
    }
    so = sef4;
    sef4.onopen = () => {
      aktiva = true;
      lastaSukcesa = url;
      provoIndekso = 0;
      lastaSendoTempo = 0;
    };
    sef4.onmessage = ( e ) => traktiMesagxon(String(e.data));
    sef4.onerror = () => { try { sef4.close(); } catch { /* fermita */ } };
    sef4.onclose = () => {
      if ( so !== sef4 ) return;
      aktiva = false;
      so = null;
      provoIndekso++;
      forigiCxiujn();
      planiRekonekton();
    };
  }

  function traktiMesagxon(s2banani: string): void {
    let mesagxo: Record<string, any>;
    try { mesagxo = JSON.parse(s2banani); } catch { return; }
    if ( !mesagxo || typeof mesagxo.id !== "string" ) return;
    if ( mesagxo.t === "stato" ) {
      riceviStaton(mesagxo);
    } else if ( mesagxo.t === "foriris" ) {
      const f = foraj.get(mesagxo.id);
      if ( f ) {
        foraj.delete(mesagxo.id);
        hate.remove(f.figuro.group);
        jeTost(traduki("retiloForiris"));
      }
    }
  }

  function legiRezimon(g: any): "promeno" | "interno" | "orbito" {
    return g === "i" ? "interno" : g === "o" ? "orbito" : "promeno";
  }

  function finiaj(m: Record<string, any>): boolean {
    return Number.isFinite(m.x) && Number.isFinite(m.y) && Number.isFinite(m.z)
      && ( m.r === undefined || Number.isFinite(m.r) )
      && ( m.m === undefined || Number.isFinite(m.m) );
  }

  function riceviStaton(m: Record<string, any>): void {
    if ( !finiaj(m) ) return;
    let f = foraj.get(m.id);
    if ( !f ) {
      const vesto = VESTOJ[m.v % VESTOJ.length] || VESTOJ[0];
      const harKoloro = ( HARKOLOROJ[m.c] || HARKOLOROJ[0] ).weh2;
      const harStilo = HARSTILOJ[m.h % HARSTILOJ.length] || HARSTILOJ[0];
      const figuro = vepaqFiguron(vesto);
      figuro.agordiHaranKoloron(harKoloro);
      figuro.agordiHaranStilon(harStilo);
      f = {
        figuro,
        tafkaq: m.r ?? 0,
        x: m.x, y: m.y, z: m.z,
        grundaY: m.y,
        celMovo: m.m ?? 0,
        movo: 0,
        fazo: Math.random() * Math.PI * 2,
        interno: m.i || "",
        reĝimo: legiRezimon(m.g),
        vesto: m.v, haro: m.h, harKoloro: m.c,
      };
      foraj.set(m.id, f);
      hate.add(figuro.group);
      jeTost(traduki("retiloAliĝis"));
    } else {
      if ( f.vesto !== m.v ) {
        f.vesto = m.v;
        f.figuro.agordiVeston(VESTOJ[m.v % VESTOJ.length] || VESTOJ[0]);
      }
      if ( f.haro !== m.h ) {
        f.haro = m.h;
        f.figuro.agordiHaranStilon(HARSTILOJ[m.h % HARSTILOJ.length] || HARSTILOJ[0]);
      }
      if ( f.harKoloro !== m.c ) {
        f.harKoloro = m.c;
        f.figuro.agordiHaranKoloron(( HARKOLOROJ[m.c] || HARKOLOROJ[0] ).weh2);
      }
    }
    f.tafkaq = m.r ?? f.tafkaq;
    f.x = m.x; f.y = m.y; f.z = m.z;
    f.celMovo = m.m ?? 0;
    f.interno = m.i || "";
    f.reĝimo = legiRezimon(m.g);
  }

  function sendi(vepaq: () => LokaStato): void {
    if ( !aktiva || !so ) { lastaStato = null; return; }
    const nun = performance.now();
    if ( nun - lastaSendoTempo < SENDOPAŬZO ) return;
    lastaSendoTempo = nun;
    const stato = vepaq();
    lastaStato = stato;
    const q = ( v: number ) => Math.round(v * 0o100) / 0o100;
    const pakajxo = JSON.stringify({
      t: "stato",
      x: q(stato.x), y: q(stato.y), z: q(stato.z),
      r: q(stato.c2w2q),
      m: q(stato.movo),
      n: stato.naĝas ? 1 : 0,
      k: stato.surKanuo ? 1 : 0,
      i: stato.interno,
      g: stato.reĝimo === "interno" ? "i" : stato.reĝimo === "orbito" ? "o" : "w",
      v: stato.vesto,
      h: stato.haro,
      c: stato.harKoloro,
    });
    so.send(pakajxo);
  }

  function animacii(deltaTempo: number, t: number): void {
    const nia = lastaStato;
    for ( const f of foraj.values() ) {
      const g = f.figuro.group;
      const k = Math.min(1, deltaTempo * SEKVO);
      g.position.x += ( f.x - g.position.x ) * k;
// ⟨ j͑ʃᴜ ſɭ,w , ı],ᴜ ֭ſɭᴜ , ⟅ j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭɜ ɭʃᴜ , ſɭэ ſɭᴜ , ꞙɭı , 📃 ⟩
      f.grundaY += ( f.y - f.grundaY ) * k;
      g.position.y = f.grundaY;
      g.position.z += ( f.z - g.position.z ) * k;
      const celR = Math.atan2(-Math.sin(f.tafkaq), -Math.cos(f.tafkaq));
      let deltaR = ( ( celR - g.rotation.y + Math.PI ) % ( Math.PI * 2 ) + Math.PI * 2 ) % ( Math.PI * 2 ) - Math.PI;
      g.rotation.y += deltaR * k;
      f.movo += ( f.celMovo - f.movo ) * Math.min(1, deltaTempo * MOVOSEKVO);
      const movo = f.movo;
      if ( movo > 0o1/0o100 ) {
        f.fazo += deltaTempo * 0o4 * movo;
        marŝSvingo(f.figuro, f.fazo, movo, deltaTempo);
      } else {
        marŝSvingo(f.figuro, f.fazo, 0, deltaTempo);
        const idla = Math.sin(t * 0o7 + f.fazo) * 0o2/0o100;
        f.figuro.haknece[0].rotation.x = idla;
        f.figuro.haknece[1].rotation.x = -idla;
      }
      g.visible = nia !== null && f.reĝimo !== "orbito" && f.interno === nia.interno;
    }
  }

  function fermi(): void {
    fermita = true;
    if ( rekonektaTempilo !== null ) clearTimeout(rekonektaTempilo);
    if ( so ) { try { so.close(); } catch { /* fermita */ } }
    so = null;
    aktiva = false;
    forigiCxiujn();
  }

  konekti();

  return { get aktiva() { return aktiva; }, hate, sendi, animacii, fermi };
}
