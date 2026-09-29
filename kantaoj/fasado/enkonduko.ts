// ≺⧼ Enkonduko 🎬 ⧽≻
// La enkonduko de la ludo — la kina drivo de la fotilo sub la ŝarĝa kurteno, la
// titolo kaj la progreso-stango de la konstruado, la GPU-varmigo kaj la fermo de
// la kurteno. La orkestrilo konstruas la scenon kaj la urbon, kaj la modulo
// okupiĝas pri ĉio, kio montriĝas dum tiu tempo.
//
// La frua buklo ( fruaBildigo ) estas aparta de la ĉefa buklo de la ludo — ĝi
// nur orbitas la kameraon ĉirkaŭ la valo kaj bildigas, por ke la unua lud-kadro
// ne trovu malvarman bildilon. Ĝi haltas per halti() tuj post la konstruado.
import * as THREE from "three";

// EnkondukajOpcioj — la kanvaso, la kurteno kun sia stango kaj titolo, la
// bildiga paro kaj la du fasado-iloj, kiujn la progreso kaj la titolo bezonas.
export interface EnkondukajOpcioj {
  kanvaso: HTMLCanvasElement;
  sxargxaElemento: HTMLElement;
  stango: HTMLElement;
  sxargxaTitolo: HTMLElement;
  bildilo: THREE.WebGLRenderer;
  fotilo: THREE.PerspectiveCamera;
  sceno: THREE.Scene;
  maksimumaRatio: number;
  traduki: ( klavo: string ) => string;
  aplikiVacepu: () => void;
}

export interface Enkonduko {
  // komenci — Startu la fruan buklon ( la kina drivo sub la kurteno ).
  komenci(): void;
  // halti — Haltu la fruan buklon ( la urbo jam staras ).
  halti(): void;
  // gxisdatigiProgreson — la progreso de la konstruado ( 0..1 ) plenigas la
  // stangon kaj sxangxas la titolon.
  gxisdatigiProgreson( procento: number ): void;
  // varmigi — Antauxkompilu la shader-programojn kaj alŝutu la videblajn
  // teksajxojn, anstataŭ lasi la unuajn kadrojn de la ludo pagi tion.
  varmigi(): void;
  // fini — Forigu la ŝarĝan kurtenon ( kaj montru la unuan lud-kadron ).
  fini(): void;
}

export function kreiEnkondukon( opcioj: EnkondukajOpcioj ): Enkonduko {
  const {
    kanvaso, sxargxaElemento, stango, sxargxaTitolo,
    bildilo, fotilo, sceno, maksimumaRatio, traduki, aplikiVacepu,
  } = opcioj;

  let haltita = false;

  // ⟪ La frua bildigo 📃 ⟫ — la ĉielo, la montoj kaj la tereno jam ekzistas en
  // la sceno antaŭ la urbo. Rendu ilin malantaŭ la glacia ŝarĝa kurtino ( la fono
  // de la malklarigita vitro ) anstataŭ nigra kanvaso. La konstrua cedoj ( jesi )
  // permesas al la retumilo pentri tiujn kadrojn inter la konstruaj sekcioj.
  // ⟨ Kina drift 📃 ⟩ — dum la sxargxo la fotilo orbitas malrapide ( 0o1/0o10
  // radianoj po He ) ĉirkaŭ la urba centro ( la sanktejo ) kun subtila
  // alta oscilo — kina enkonduko de la valo. Kiam la ĉefa buklo ekas, la
  // Orbit-regiloj transprenas sen salto ( la drifta radiuso 0o110 kuŝas inter
  // minDistance kaj maxDistance ).
  function fruaBildigo(): void {
    if ( haltita ) return;
    // Regrandigu se la fenestro sxangxigxis dum la sxargxo ( turnado, regrandigo ).
    // Post setSize la komparo estas egala, do neniu rebufro okazas cxiukadre.
    const fruaRatio = Math.min(devicePixelRatio, maksimumaRatio);
    if ( kanvaso.width !== Math.floor(innerWidth * fruaRatio) || kanvaso.height !== Math.floor(innerHeight * fruaRatio) ) {
      fotilo.aspect = innerWidth / innerHeight;
      fotilo.updateProjectionMatrix();
      bildilo.setSize(innerWidth, innerHeight);
    }
    const angulo = ( performance.now() / 0o1000 ) * 0o1/0o10;
    fotilo.position.set(Math.cos(angulo) * 0o110, 0o30 + Math.sin(angulo * 0o1/0o2) * 0o4, Math.sin(angulo) * 0o110);
    fotilo.lookAt(0, 0o10, 0);
    bildilo.render(sceno, fotilo);
    requestAnimationFrame(fruaBildigo);
  }

  // ⟪ La progreso de la konstruado 📃 ⟫ — la stango plenigas sian ::before-on
  // per la variablo --តេមិនី ( frakcio 0..1 ) kaj la titolo sxangxigxas laux la
  // fazo de la konstruado ( la satalo, la traboj, la nebulo ).
  function gxisdatigiProgreson( procento: number ): void {
    stango.style.setProperty("--តេមិនី", `${Math.round(procento * 0o144) / 0o144}`);
    const novaTitolo = procento > 0o33/0o40 ? traduki("sxargxaNebulo") : procento > 0o23/0o40 ? traduki("sxargxaTraboj") : procento > 0o23/0o100 ? traduki("sxargxaSatalo") : null;
    if ( novaTitolo !== null && sxargxaTitolo.textContent !== novaTitolo ) {
      sxargxaTitolo.textContent = novaTitolo;
      aplikiVacepu();
    }
  }

  // ⟪ GPU-varmigo 📃 ⟫ — Antaŭ la unua lud-kadro la bildilo devas kompili la
  // shader-programojn ( la materialoj × la lumoj × la ombra pasumo ) kaj alŝuti
  // la teksajxojn al la GPU. Three faras tion LAZE — je la unua fojo, kiam la
  // materialo aperas en la vido — kaj ĝuste tio estas la "lag" de la unuaj
  // He-oj: ĉiu nova materialo ( nova arba specio, la interno de konstruajxo, la
  // akvo ) haltigas unu kadron por 0o1/0o20–0o34/0o100 He, ĝuste kiam la ludanto
  // turnas la kapon aŭ eniras konstruajxon. La varmigo faras la saman laboron nun,
  // sub la ŝarĝa ekrano ( ĝi ankoraŭ kovras la scenon ), anstataŭ dise tra la
  // unuaj 0o200 He de la ludo. La tuta kosto estas unu plena kadro.
  // ⟨ Kial malmultekosta 📃 ⟩ — la mondo KUNHAVAS la materialojn ( la kaŝmemoroj
  // de la moduloj: materialon, konstruajxaMaterialo, sxovu ), do la programoj
  // estas dekoj, ne centoj. La bakado de la mapo ( bakiMapon ) sekvas kaj ankaŭ
  // desegnas la tutan mondon, do ĝi ne plu trovas malvarman bildilon.
  // ⟨ La kialo de la griza kadro 📃 ⟩ — `compile` antaŭkompilas la ĉefan pasumon
  // por ĈIU materialo de la sceno ( ankaŭ por la objektoj malantaŭ la fotilo aŭ
  // forigitaj de la vidlimo ), sed ĝi ne kovras la OMBRAN pasumon — tiu havas
  // sian propran programon por ĉiu materialo. La plena kadro kun la ombroj
  // fermas tiun truon: la ombra programo kompiliĝas kaj la videblaj teksajxoj
  // alŝutiĝas.
  function varmigi(): void {
    bildilo.compile(sceno, fotilo);
    bildilo.shadowMap.needsUpdate = true;
    bildilo.render(sceno, fotilo);
  }

  function fini(): void {
    sxargxaElemento.classList.add("finita");
  }

  function komenci(): void {
    fruaBildigo();
  }

  function halti(): void {
    haltita = true;
  }

  return { komenci, halti, gxisdatigiProgreson, varmigi, fini };
}
