// retilo.ts — La retilo ( multludada ) por Aranis
// Konektas al la servila WebSocket ( /retilo ) kaj interŝanĝas poziciojn kun
// la aliaj ludantoj. La foraj ludantoj aperas kiel figuroj ( la sama modelo
// kiel la NPC-oj ), kun glata sekvo de iliaj pozicioj kaj marŝaj animacioj.
import * as THREE from "three";
import { konstruiFiguron, marŝSvingo } from "../assets/shalaj-specioj/homoj.js";
import type { Figuro } from "../assets/shalaj-specioj/homoj.js";
import { VESTOJ, HARSTILOJ, HARKOLOROJ } from "../assets/vestaro/vestoj.js";

// La stato sendata per la retilo. La reala sendo estas malakrigita ( 8 Hz );
// la loka kopio ĝisdatiĝas ĉiukadre por la videbleco-logiko.
export interface LokaStato {
  x: number;
  y: number;
  z: number;
  direkto: number;
  movo: number;      // 0..1 — mova intenseco ( por la marŝa animacio )
  naĝas: boolean;
  surKanuo: boolean;
  interno: string;   // "" = ekstere; alie la identigilo de la konstruaĵo
  reĝimo: "walk" | "interior" | "orbit";
  vesto: number;     // indekso en VESTOJ
  haro: number;      // indekso en HARSTILOJ
  harKoloro: number; // indekso en HARKOLOROJ
}

export interface Retilo {
  aktiva: boolean;
  grupo: THREE.Group;
  // sendi — donu BUILDER-funkcion anstataŭ pre-konstruitan staton: la stato
  // ( kaj la suba akumuligita por la sendo ) nur konstruiĝas kiam la sendo
  // vere okazas ( je 8 Hz ), ne ĉiukadre.
  sendi: ( konstrui: () => LokaStato ) => void;
  animacii: ( deltaTempo: number, t: number ) => void;
  fermi: () => void;
}

// La servilaj pordoj ( vidu servilo/servilo.js ).
const PORD_RETILO = 0o5660;
const PORD_FALLO = 0o5671;
// ≈ 8 Hz — la paŭzo inter la realaj sendo-oj ( 0o200 = 128 ms ).
const SENDOPAŬZO = 0o200;
// 3 sekundoj inter la rekonekto-provoj.
const REKONEKTAŬZO = 0o5660;
// Glataj sekvoj — la lerp-faktoroj por pozicio/rotacio kaj movo. La sama
// valoro kiel la fotila glatigo ( 0o10 ) en sperto.ts, por ke la foraj
// figuroj sekvu sian celon simile al la loka kamerao.
const SEKVO = 0o10;
const MOVOSEKVO = 0o10;

interface ForaFiguro {
  figuro: Figuro;
  angulo: number;        // celo-direkto
  x: number; y: number; z: number;  // celaj pozicioj
  celMovo: number;
  movo: number;          // nuna movo ( glata transiro )
  fazo: number;          // marŝa fazo
  interno: string;
  reĝimo: "walk" | "interior" | "orbit";
  vesto: number;
  haro: number;
  harKoloro: number;
}

// kreiRetilon — Konektu al la retilo kaj redonu la kontrolon.
//     @param sceno ( THREE.Scene ) - La sceno por la foraj figuroj.
//     @param jeTost ( funkcio ) - Montru toston ( aliĝo/foriro ).
//     @param traduki ( funkcio ) - Traduku la tosto-klavojn.
//     @returns retilo ( Retilo ) - La retila kontrolo.
export function kreiRetilon(sceno: THREE.Scene, jeTost: ( mesagxo: string ) => void, traduki: ( klavo: string ) => string): Retilo {
  const grupo = new THREE.Group();
  grupo.name = "retilo";
  sceno.add(grupo);

  let so: WebSocket | null = null;
  let aktiva = false;
  let fermita = false;
  let lastaSukcesa = "";          // la lasta sukcesa URL — provu ĝin unue
  let provoIndekso = 0;
  let lastaStato: LokaStato | null = null;
  let lastaSendoTempo = 0;
  let rekonektaTempilo: ReturnType<typeof setTimeout> | null = null;
  const foraj = new Map<string, ForaFiguro>();

  // retilaURLoj — La kandidataj retilaj URL-oj, en ordo de prefero.
  //   1. Eksplicita agordo ( ?retilo=wss://... aŭ window.RETILO_SERVILO ).
  //   2. La lasta sukcesa URL ( por rekonektoj ).
  //   3. Sur loka gastiganto. la nuna paĝo-pordo, poste la servilaj pordoj.
  //   4. Sur fora gastiganto ( ekz. Vercel ). la sama domajno per wss/ws, se oni
  //      starigas reverse-proxy al la retilo-servilo.
  // La protokolo sekvas la paĝon ( https → wss, http → ws ) por eviti miksitan
  // enhavon — necesa kiam la paĝo estas servata de sekura gastiganto.
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

  // konekti — Provu la pordojn sinsekve ( la unua sukceso gajnas ).
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

  // traktiMesagxon — Ricevu la mesaĝojn de la servilo ( stato / foriris ).
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

  // finiaj — Ĉu la numera kampo de la mesaĝo estas uzebla? Infinity kaj NaN
  // venas tra JSON.parse ( 1e999 → Infinity ) kaj havas typeof "number" —
  // sen ĉi tiu defendo ili envenas en la lerp de animacii kaj venenigas la
  // matricojn de la fora figuro por ĉiam.
  function finiaj(m: Record<string, any>): boolean {
    return Number.isFinite(m.x) && Number.isFinite(m.y) && Number.isFinite(m.z)
      && ( m.r === undefined || Number.isFinite(m.r) )
      && ( m.m === undefined || Number.isFinite(m.m) );
  }

  // riceviStaton — Ĝisdatigu ( aŭ kreu ) la figuro de fora ludanto.
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
      // La aspekto ŝanĝiĝas nur kiam ĝi vere ŝanĝiĝis ( la teksturoj estas koste re-generitaj ).
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

  // sendi — Konservu la lokan staton ĉiukadre; sendu ĝin je 8 Hz.
  // La konstrui-funkcio VOKIĜAS nur ĉe la realaj sendo-oj — neniu per-kadra
  // stato-objekto asigniĝas kiam la reto estas malŝaltita aŭ inter la sendo-oj.
  function sendi(konstrui: () => LokaStato): void {
    if ( !aktiva || !so ) { lastaStato = null; return; }
    const nun = performance.now();
    if ( nun - lastaSendoTempo < SENDOPAŬZO ) return;
    lastaSendoTempo = nun;
    const stato = konstrui();
    lastaStato = stato;
    // Duobla rondigo al 1/64 ( 0o100 ) — sufiĉa precizeco, malpli da bitokoj.
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

  // animacii — Glate sekvu la forajn figurojn kaj animaciu ilin ĉiukadre.
  // Videblo. nur samlokaj ludantoj ( same ekstere aŭ en la SAMA interno );
  // orbitantoj ( spektantoj ) neniam aperas kiel figuroj.
  function animacii(deltaTempo: number, t: number): void {
    const nia = lastaStato;
    for ( const f of foraj.values() ) {
      const g = f.figuro.group;
      const k = Math.min(1, deltaTempo * SEKVO);
      g.position.x += ( f.x - g.position.x ) * k;
      g.position.y += ( f.y - g.position.y ) * k;
      g.position.z += ( f.z - g.position.z ) * k;
      // Rotacio — la plej mallonga arko ( la figuro-turno egalas la lokan konvertiĝon ).
      const celR = Math.atan2(-Math.sin(f.angulo), -Math.cos(f.angulo));
      let deltaR = ( ( celR - g.rotation.y + Math.PI ) % ( Math.PI * 2 ) + Math.PI * 2 ) % ( Math.PI * 2 ) - Math.PI;
      g.rotation.y += deltaR * k;
      // Mova transiro kaj marŝa animacio ( la sama ritmo kiel la NPC-oj ).
      f.movo += ( f.celMovo - f.movo ) * Math.min(1, deltaTempo * MOVOSEKVO);
      const movo = f.movo;
      if ( movo > 0o1/0o100 ) {
        f.fazo += deltaTempo * 0o4 * movo;
        const paso = Math.sin(f.fazo);
        marŝSvingo(f.figuro, paso, movo);
      } else {
        // Stara idla balancado.
        const idla = Math.sin(t * 0o7 + f.fazo) * 0o2/0o100;
        f.figuro.brakoj[0].rotation.x = idla;
        f.figuro.brakoj[1].rotation.x = -idla;
        f.figuro.kruroj[0].rotation.x = 0;
        f.figuro.kruroj[1].rotation.x = 0;
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

  // La getter tenas `aktiva` VIVA — la fermita variablo sxangxigxas dum la
  // konektoj, kaj la return-objekto montru la nunan staton, ne la komencan.
  return { get aktiva() { return aktiva; }, grupo, sendi, animacii, fermi };
}
