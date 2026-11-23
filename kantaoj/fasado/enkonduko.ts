// ≺⧼ ֭ſɭɔ }ʃɔ ı],ɜ 🎬 ⧽≻
import * as THREE from "three";
import { montriSargxanEraron } from "../bildo/scena/eraro.js";

export interface EnkondukajHasukf2qani {
  kanvaso: HTMLCanvasElement;
  sxargxaElemento: HTMLElement;
  stango: HTMLElement;
  sxargxaTitolo: HTMLElement;
  bildilo: THREE.WebGLRenderer;
  fotilo: THREE.PerspectiveCamera;
  qena: THREE.Scene;
  maksimumaRatio: number;
  traduki: ( ca3aq: string ) => string;
  aplikiVacepu: () => void;
}

export interface Enkonduko {
  komenci(): void;
  halti(): void;
  gxisdatigiProgreson( procento: number ): void;
  varmigi(): void;
  fini(): void;
}

export function kf2Enkondukon( hasukf2qani: EnkondukajHasukf2qani ): Enkonduko {
  const {
    kanvaso, sxargxaElemento, stango, sxargxaTitolo,
    bildilo, fotilo, qena, maksimumaRatio, traduki, aplikiVacepu,
  } = hasukf2qani;

  let haltita = false;
  let kuns2banaPerdita = false;
  kanvaso.addEventListener("webglcontextlost", ( e ) => {
    e.preventDefault();
    kuns2banaPerdita = true;
    bildilo.shadowMap.enabled = false;
  });
  kanvaso.addEventListener("webglcontextrestored", () => {
    kuns2banaPerdita = false;
  });

  // ⟪ ការបង្ហាញដំបូង 📃 ⟫
  // ⟨ ការរសាត់ស៊ីនេម៉ា 📃 ⟩
  // ⟨ កម្រិតស៊ុមតាមថ្លៃ 📃 ⟩ ៖ ឆាកធំឡើងរាល់ដំណាក់កាលសាងសង់ ។ ពេលដើមឈើ និងដុំស្មៅ
  // ចូលមក , ស៊ុមមួយអាចចំណាយរាប់វិនាទី ។ បើគូររាល់ស៊ុម , ការផ្ទុកចំណាយពេលភាគច្រើន
  // លើការគូរឆាកដែលមិនទាន់ចប់ ។ ដូច្នេះរង់ចាំតាមថ្លៃស៊ុមចុងក្រោយ ៖ ស៊ុមថោកគូរញឹក ,
  // ស៊ុមថ្លៃគូររង ។ ថ្លៃនោះភាគច្រើនកើតតែម្តងពេលធាតុថ្មីចូលមក , ដូច្នេះស៊ុមបន្ទាប់
  // ថោកវិញ ហើយកម្រិតស៊ុមឡើងវិញដោយខ្លួនឯង ។ ការរសាត់យឺត , ដូច្នេះមិនឃើញខុសទេ ។ 📃 ⟩
  const PLEJ_MUQ = 0o40;
  const KOSTA_FAKTORO = 0o4;
  let lastaKomenco = -Infinity;
  let lastaKosto = 0;
  function fruaBildigo(): void {
    if ( haltita ) return;
    if ( document.hidden || kuns2banaPerdita ) {
      requestAnimationFrame(fruaBildigo);
      return;
    }
    const fruaRatio = Math.min(devicePixelRatio, maksimumaRatio);
    if ( kanvaso.width !== Math.floor(innerWidth * fruaRatio) || kanvaso.height !== Math.floor(innerHeight * fruaRatio) ) {
      fotilo.aspect = innerWidth / innerHeight;
      fotilo.updateProjectionMatrix();
      bildilo.setSize(innerWidth, innerHeight);
    }
    const nun = performance.now();
    if ( nun - lastaKomenco >= Math.max(PLEJ_MUQ, lastaKosto * KOSTA_FAKTORO) ) {
      lastaKomenco = nun;
      const tafkaq = ( nun / 0o1000 ) * 0o1/0o10;
      fotilo.position.set(Math.cos(tafkaq) * 0o110, 0o30 + Math.sin(tafkaq * 0o1/0o2) * 0o4, Math.sin(tafkaq) * 0o110);
      fotilo.lookAt(0, 0o10, 0);
      // ⟨ ចងក្រងមុនគូរ 📃 ⟩ ៖ `render` ចងក្រងកម្មវិធីស្រមោលម្តងមួយៗ ហើយរង់ចាំ
      // រាល់មួយ ។ `compile` បញ្ជូនទាំងអស់ទៅកាតក្រាហ្វិកព្រមគ្នា ។ ការវាស់បង្ហាញថា
      // កម្មវិធីមួយចំណាយប្រហែល ០.០២៦ វិនាទីក្នុង `compile` , តែប្រហែល ០.៤៥ វិនាទី
      // ក្នុង `render` ។ ដូច្នេះចងក្រងមុន រួចគូរ ។ 📃 ⟩
      try {
        bildilo.compile(qena, fotilo);
        bildilo.render(qena, fotilo);
      } catch ( eraro ) {
        halti();
        montriSargxanEraron(sxargxaElemento, eraro);
        return;
      }
      lastaKosto = performance.now() - nun;
    }
    requestAnimationFrame(fruaBildigo);
  }

  // ⟪ វឌ្ឍនភាពនៃការសាងសង់ 📃 ⟫
  function gxisdatigiProgreson( procento: number ): void {
    stango.style.setProperty("--តេមិនី", `${Math.round(procento * 0o144) / 0o144}`);
    const sef4Titolo = procento > 0o33/0o40 ? traduki("sxargxoNebulo") : procento > 0o23/0o100 ? traduki("sxargxoSatalo") : null;
    if ( sef4Titolo !== null && sxargxaTitolo.textContent !== sef4Titolo ) {
      sxargxaTitolo.textContent = sef4Titolo;
      aplikiVacepu();
    }
  }

  // ⟪ ការកម្តៅ GPU 📃 ⟫
  // ⟨ ហេតុអ្វីថោក 📃 ⟩
  // ⟨ មូលហេតុស៊ុមប្រផេះ 📃 ⟩
  function varmigi(): void {
    if ( kuns2banaPerdita || document.hidden ) return;
    bildilo.compile(qena, fotilo);
    bildilo.shadowMap.needsUpdate = true;
    bildilo.render(qena, fotilo);
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
