// ≺⧼ ការសាកល្បងផ្ទុកផែនទី 🗺️ ⧽≻
// ⟨ សន្ទះក្លែងក្លាយវាស់តែលំដាប់ការងារ និង ការដោះលែងធនធាន ។ វាមិន
//   គូររូប ឬ ផ្ទៀងផ្ទាត់ WebGL driver ទេ ដូច្នេះលទ្ធផលនេះជាការពិនិត្យ
//   សុវត្ថិភាពផ្ទុក មិនមែនការវាស់ល្បឿន GPU ពិត 📃 ⟩
import * as THREE from "three";
import { kreiMinimapon } from "../../kantaoj/bildo/minimapo.js";
import type { Minimapo } from "../../kantaoj/bildo/minimapo.js";

interface FiksaStato {
  perdita: boolean;
  fiasku: boolean;
  bildigitaj: number;
  kompiligitaj: number;
  forigitaj: number;
  celoj: ( THREE.WebGLRenderTarget | null )[];
  // ⟨ ដង់ស៊ីតេអ័ព្ទខណៈគូរ ៖ -0o1 មានន័យថាគ្មានអ័ព្ទ 📃 ⟩
  densoj: number[];
}

function certigi( kondiĉo: boolean, mesaĝo: string ): void {
  if ( !kondiĉo ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${mesaĝo}`);
}

async function atendi( kondiĉo: () => boolean = () => true ): Promise<void> {
  const limo = Date.now() + 0o10000;
  while ( !kondiĉo() ) {
    if ( Date.now() > limo ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ការរង់ចាំស្ថានភាពសាកល្បងផុតពេល");
    await new Promise(resolve => setTimeout(resolve, 0o10));
  }
}

// ⟨ Node មិនមាន ImageData នៅក្នុងជំនាន់ខ្លះទេ ។ ផែនទីត្រូវការតែ
//   រចនាសម្ព័ន្ធទិន្នន័យ មិនមែនវិធីគូរ 📃 ⟩
if ( typeof globalThis.ImageData === "undefined" ) {
  ( globalThis as unknown as Record<string, unknown> ).ImageData = class {
    constructor( public data: Uint8ClampedArray, public width: number, public height: number ) {}
  };
}
( globalThis as unknown as Record<string, unknown> ).devicePixelRatio = 1;

function elemento<T extends HTMLElement>(): T {
  const el = document.createElement("div") as unknown as T;
  el.style.setProperty = () => {};
  return el;
}

function kreiFikston( agordiScenon?: ( qena: THREE.Scene ) => void ): {
  mapo: Minimapo; stato: FiksaStato; kompaso: HTMLElement; qena: THREE.Scene;
  restarigi: () => void } {
  const stato: FiksaStato = {
    perdita: false, fiasku: false, bildigitaj: 0, kompiligitaj: 0, forigitaj: 0, celoj: [], densoj: [],
  };
  const kompaso = elemento<HTMLElement>();
  const domElement = elemento<HTMLCanvasElement>();
  let jeRestaŭro: ( () => void ) | null = null;
  domElement.addEventListener = ( ( ksaka: string, ago: () => void ) => {
    if ( ksaka === "webglcontextrestored" ) jeRestaŭro = ago;
  } ) as typeof domElement.addEventListener;
  const bildilo = {
    domElement,
    capabilities: { maxTextureSize: 0o4000 },
    shadowMap: { enabled: false },
    getContext: () => ({ isContextLost: () => stato.perdita }),
    compile: () => { stato.kompiligitaj++; },
    render: () => {
      stato.bildigitaj++;
      stato.densoj.push(qena.fog instanceof THREE.FogExp2 ? qena.fog.density : -0o1);
    },
    setRenderTarget: ( celo: THREE.WebGLRenderTarget | null ) => {
      stato.celoj.push(celo);
      celo?.addEventListener("dispose", () => { stato.forigitaj++; });
    },
    readRenderTargetPixels: () => {
      if ( stato.fiasku ) throw new Error("provo de malsukcesa legado");
    },
  } as unknown as THREE.WebGLRenderer;
  const qena = new THREE.Scene();
  agordiScenon?.( qena );
  const mapo = kreiMinimapon({
    qena,
    bildilo,
    miniKanvaso: elemento<HTMLCanvasElement>(),
    kompaso,
    nadlo: elemento<HTMLElement>(),
    supermeta: elemento<HTMLElement>(),
    supermetaEnhavo: elemento<HTMLElement>(),
    mapoGrandeco: 0o100,
    movantoj: {
      npcoj: [], kanuoj: [], bestoj: { bestoj: [] }, petreloj: { petreloj: [] },
    },
    traduki: ca3aq => ca3aq,
    aplikiVacepu: () => {},
  });
  return {
    mapo, stato, kompaso, qena,
    restarigi: () => {
      stato.perdita = false;
      jeRestaŭro?.();
    },
  };
}

// ⟨ ការត្រឡប់ GPU ដោយគ្មានសំណើ មិនត្រូវផ្ទុកផែនទី 📃 ⟩
const senpeto = kreiFikston();
senpeto.restarigi();
await atendi();
certigi( senpeto.stato.bildigitaj === 0 && senpeto.stato.forigitaj === 0,
  "ផែនទីរត់ដោយគ្មានសំណើរបស់អ្នកប្រើ" );

// ⟨ ការសាងសង់មិនអាចប៉ះ GPU មុនស៊ុមហ្គេម 📃 ⟩
const sukcesa = kreiFikston();
certigi( sukcesa.stato.bildigitaj === 0 && sukcesa.stato.kompiligitaj === 0,
  "ការសាងសង់ផែនទីបានប៉ះ GPU ភ្លាម" );
sukcesa.mapo.pretigi();
await atendi(() => sukcesa.stato.bildigitaj === 1);
certigi( sukcesa.stato.bildigitaj === 1, "ការរៀបចំយឺតមិនបានគូរម្តង" );
certigi( sukcesa.stato.kompiligitaj === 0, "ផែនទីបានចងក្រងឆាកម្តងទៀត" );
certigi( sukcesa.stato.forigitaj === 1, "render target មិនបានដោះលែង" );
certigi( sukcesa.stato.celoj.at(-1) === null, "render target សកម្មមិនបានដកចេញ" );
certigi( sukcesa.mapo.cxuBakita(), "ផែនទីជោគជ័យមិនបានសម្គាល់" );

// ⟨ ការហៅពីរដងក្នុងពេលតែមួយចែកការដុតតែមួយ 📃 ⟩
const duopa = kreiFikston();
await Promise.all([ duopa.mapo.pretigi(), duopa.mapo.pretigi() ]);
certigi( duopa.stato.bildigitaj === 1, "ការហៅពីរដងបានដុតពីរដង" );
certigi( duopa.mapo.cxuBakita(), "ការហៅពីរដងមិនបានបញ្ចប់ផែនទី" );

// ⟨ ផ្ទាំងលាក់ ៖ មិនដុត , ប៉ុន្តែសន្យាត្រូវបញ្ចប់ ដើម្បីកុំឱ្យវាំងននផ្ទុកជាប់ 📃 ⟩
const kasxita = kreiFikston();
const dokumento = globalThis.document as unknown as { hidden?: boolean };
dokumento.hidden = true;
await kasxita.mapo.pretigi();
certigi( kasxita.stato.bildigitaj === 0 && !kasxita.mapo.cxuBakita(),
  "ផ្ទាំងលាក់បានដុតផែនទី" );
dokumento.hidden = false;

// ⟨ ការអានបរាជ័យត្រូវដោះលែង និង បិទតែផែនទី មិនព្យាយាមជាប់ៗគ្នា 📃 ⟩
const malsukcesa = kreiFikston();
malsukcesa.stato.fiasku = true;
malsukcesa.mapo.pretigi();
await atendi(() => malsukcesa.stato.bildigitaj === 1);
certigi( malsukcesa.stato.bildigitaj === 1, "ការអានបរាជ័យមិនបានឆ្លងកាត់ផ្លូវសាកល្បង" );
certigi( malsukcesa.stato.forigitaj === 1, "ការអានបរាជ័យទុក render target" );
certigi( malsukcesa.stato.celoj.at(-1) === null, "ការអានបរាជ័យទុកចានគំនូរសកម្ម" );
certigi( !malsukcesa.mapo.cxuBakita() && malsukcesa.kompaso.style.display === "none",
  "ការបរាជ័យមិនបានបិទតែផែនទី" );
malsukcesa.mapo.pretigi();
await atendi(() => malsukcesa.stato.bildigitaj === 1);
certigi( malsukcesa.stato.bildigitaj === 1, "ការបរាជ័យបានបង្កើតរង្វិលជុំសាកល្បង" );

// ⟨ GPU បាត់មុនដុត មិនគួរគូរ ហើយត្រូវបន្តបន្ទាប់ពី restored 📃 ⟩
const perdita = kreiFikston();
perdita.stato.perdita = true;
perdita.mapo.pretigi();
await atendi();
certigi( perdita.stato.bildigitaj === 0 && perdita.stato.forigitaj === 0,
  "GPU បាត់បង់ប៉ុន្តែផែនទីនៅតែគូរ" );
perdita.restarigi();
await atendi(() => perdita.stato.bildigitaj === 1);
certigi( perdita.stato.bildigitaj === 1 && perdita.mapo.cxuBakita(),
  "ការត្រឡប់ GPU មិនបានបន្តផែនទី" );

// ⟨ អ័ព្ទបិទខណៈដុត ហើយស្តារវិញ 📃 ⟩
// កាមេរ៉ាផែនទីនៅខ្ពស់ , ដូច្នេះអ័ព្ទធម្មតាគ្របដណ្តប់ផែនទីទាំងមូល ។
// បើមិនបិទ , ផែនទីក្លាយជាផ្ទៃពណ៌ស ។
const NEBULA_DENSO_PROVO = 0o5 / 0o400;
const nebula = kreiFikston(( qena ) => {
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULA_DENSO_PROVO);
});
nebula.mapo.pretigi();
await atendi(() => nebula.stato.bildigitaj === 1);
certigi( nebula.stato.densoj[0] === 0, "អ័ព្ទមិនបានបិទខណៈដុតផែនទី" );
certigi( nebula.qena.fog instanceof THREE.FogExp2
  && nebula.qena.fog.density === NEBULA_DENSO_PROVO, "អ័ព្ទមិនបានស្តារក្រោយដុត" );
certigi( nebula.mapo.cxuBakita(), "ផែនទីដែលមានអ័ព្ទមិនបានសម្គាល់" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ការផ្ទុកផែនទីយឺត ការបរាជ័យ និង ការដោះលែងទាំងអស់ត្រឹមត្រូវ");
