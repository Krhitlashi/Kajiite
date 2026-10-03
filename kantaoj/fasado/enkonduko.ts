// ≺⧼ ការណែនាំ 🎬 ⧽≻
import * as THREE from "three";

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
  komenci(): void;
  halti(): void;
  gxisdatigiProgreson( procento: number ): void;
  varmigi(): void;
  fini(): void;
}

export function kreiEnkondukon( opcioj: EnkondukajOpcioj ): Enkonduko {
  const {
    kanvaso, sxargxaElemento, stango, sxargxaTitolo,
    bildilo, fotilo, sceno, maksimumaRatio, traduki, aplikiVacepu,
  } = opcioj;

  let haltita = false;

  // ⟪ ការបង្ហាញដំបូង 📃 ⟫
  // ⟨ ការរសាត់ស៊ីនេម៉ា 📃 ⟩
  function fruaBildigo(): void {
    if ( haltita ) return;
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

  // ⟪ វឌ្ឍនភាពនៃការសាងសង់ 📃 ⟫
  function gxisdatigiProgreson( procento: number ): void {
    stango.style.setProperty("--តេមិនី", `${Math.round(procento * 0o144) / 0o144}`);
    const novaTitolo = procento > 0o33/0o40 ? traduki("sxargxaNebulo") : procento > 0o23/0o40 ? traduki("sxargxaTraboj") : procento > 0o23/0o100 ? traduki("sxargxaSatalo") : null;
    if ( novaTitolo !== null && sxargxaTitolo.textContent !== novaTitolo ) {
      sxargxaTitolo.textContent = novaTitolo;
      aplikiVacepu();
    }
  }

  // ⟪ ការកម្តៅ GPU 📃 ⟫
  // ⟨ ហេតុអ្វីថោក 📃 ⟩
  // ⟨ មូលហេតុស៊ុមប្រផេះ 📃 ⟩
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
