// ≺⧼ បណ្តាញ 🌐 ⧽≻
import * as THREE from "three";
import { konstruiFiguron, marŝSvingo } from "../../eskekoj/shalaj-specioj/homoj.js";
import type { Figuro } from "../../eskekoj/shalaj-specioj/homoj.js";
import { VESTOJ, HARSTILOJ, HARKOLOROJ } from "../../eskekoj/vestaro/vestoj.js";

// ⟪ ទម្រង់ស្ថានភាព 📃 ⟫
export interface LokaStato {
  x: number;
  y: number;
  z: number;
  direkto: number;
  movo: number;
  naĝas: boolean;
  surKanuo: boolean;
  interno: string;
  reĝimo: "walk" | "interior" | "orbit";
  vesto: number;
  haro: number;
  harKoloro: number;
}

export interface Retilo {
  aktiva: boolean;
  grupo: THREE.Group;
  sendi: ( konstrui: () => LokaStato ) => void;
  animacii: ( deltaTempo: number, t: number ) => void;
  fermi: () => void;
}

// ⟪ ច្រកម៉ាស៊ីនមេ និងការកំណត់ពេល 📃 ⟫
// ⟨ ឯកតានៃលេខទាំងនេះ 📏 ⟩
const PORD_RETILO = 0o5660;
const PORD_FALLO = 0o5671;
const SENDOPAŬZO = 0o200;
const REKONEKTAŬZO = 0o6000;
const SEKVO = 0o10;
const MOVOSEKVO = 0o10;

interface ForaFiguro {
  figuro: Figuro;
  angulo: number;
  x: number; y: number; z: number;
  celMovo: number;
  movo: number;
  fazo: number;
  interno: string;
  reĝimo: "walk" | "interior" | "orbit";
  vesto: number;
  haro: number;
  harKoloro: number;
}

export function kreiRetilon(sceno: THREE.Scene, jeTost: ( mesagxo: string ) => void, traduki: ( klavo: string ) => string): Retilo {
  const grupo = new THREE.Group();
  grupo.name = "retilo";
  sceno.add(grupo);

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
    for ( const f of foraj.values() ) grupo.remove(f.figuro.group);
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
    const listo = retilaURLoj();
    if ( provoIndekso >= listo.length ) {
      provoIndekso = 0;
      planiRekonekton();
      return;
    }
    const url = listo[provoIndekso];
    let nova;
    try {
      nova = new WebSocket(url);
    } catch {
      provoIndekso++;
      planiRekonekton();
      return;
    }
    so = nova;
    nova.onopen = () => {
      aktiva = true;
      lastaSukcesa = url;
      provoIndekso = 0;
      lastaSendoTempo = 0;
    };
    nova.onmessage = ( e ) => traktiMesagxon(String(e.data));
    nova.onerror = () => { try { nova.close(); } catch { /* fermita */ } };
    nova.onclose = () => {
      if ( so !== nova ) return;
      aktiva = false;
      so = null;
      provoIndekso++;
      forigiCxiujn();
      planiRekonekton();
    };
  }

  function traktiMesagxon(teksto: string): void {
    let mesagxo: Record<string, any>;
    try { mesagxo = JSON.parse(teksto); } catch { return; }
    if ( !mesagxo || typeof mesagxo.id !== "string" ) return;
    if ( mesagxo.t === "stato" ) {
      riceviStaton(mesagxo);
    } else if ( mesagxo.t === "foriris" ) {
      const f = foraj.get(mesagxo.id);
      if ( f ) {
        foraj.delete(mesagxo.id);
        grupo.remove(f.figuro.group);
        jeTost(traduki("retiloForiris"));
      }
    }
  }

  function legiRezimon(g: any): "walk" | "interior" | "orbit" {
    return g === "i" ? "interior" : g === "o" ? "orbit" : "walk";
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
      const harKoloro = ( HARKOLOROJ[m.c] || HARKOLOROJ[0] ).koloro;
      const harStilo = HARSTILOJ[m.h % HARSTILOJ.length] || HARSTILOJ[0];
      const figuro = konstruiFiguron(vesto);
      figuro.agordiHaranKoloron(harKoloro);
      figuro.agordiHaranStilon(harStilo);
      f = {
        figuro,
        angulo: m.r ?? 0,
        x: m.x, y: m.y, z: m.z,
        celMovo: m.m ?? 0,
        movo: 0,
        fazo: Math.random() * Math.PI * 2,
        interno: m.i || "",
        reĝimo: legiRezimon(m.g),
        vesto: m.v, haro: m.h, harKoloro: m.c,
      };
      foraj.set(m.id, f);
      grupo.add(figuro.group);
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
        f.figuro.agordiHaranKoloron(( HARKOLOROJ[m.c] || HARKOLOROJ[0] ).koloro);
      }
    }
    f.angulo = m.r ?? f.angulo;
    f.x = m.x; f.y = m.y; f.z = m.z;
    f.celMovo = m.m ?? 0;
    f.interno = m.i || "";
    f.reĝimo = legiRezimon(m.g);
  }

  function sendi(konstrui: () => LokaStato): void {
    if ( !aktiva || !so ) { lastaStato = null; return; }
    const nun = performance.now();
    if ( nun - lastaSendoTempo < SENDOPAŬZO ) return;
    lastaSendoTempo = nun;
    const stato = konstrui();
    lastaStato = stato;
    const q = ( v: number ) => Math.round(v * 0o100) / 0o100;
    const pakajxo = JSON.stringify({
      t: "stato",
      x: q(stato.x), y: q(stato.y), z: q(stato.z),
      r: q(stato.direkto),
      m: q(stato.movo),
      n: stato.naĝas ? 1 : 0,
      k: stato.surKanuo ? 1 : 0,
      i: stato.interno,
      g: stato.reĝimo === "interior" ? "i" : stato.reĝimo === "orbit" ? "o" : "w",
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
      g.position.y += ( f.y - g.position.y ) * k;
      g.position.z += ( f.z - g.position.z ) * k;
      const celR = Math.atan2(-Math.sin(f.angulo), -Math.cos(f.angulo));
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
        f.figuro.brakoj[0].rotation.x = idla;
        f.figuro.brakoj[1].rotation.x = -idla;
      }
      g.visible = nia !== null && f.reĝimo !== "orbit" && f.interno === nia.interno;
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

  return { get aktiva() { return aktiva; }, grupo, sendi, animacii, fermi };
}
