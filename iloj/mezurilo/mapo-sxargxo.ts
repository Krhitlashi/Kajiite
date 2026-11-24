// ≺⧼ ʃᴜ j͐ʃɹ ʌ j͑ʃɹ ɭʃɜ j͑ʃᴜᶗ‹ ꞁȷ̀ᴜ }ʃꞇ ʌ j͐ʃɹ ŋᷠɔ 🗺️ ⧽≻
// ⟨ ſɭᴜ ſןᴜ , ſɭэ ɭʃᴜ , ꞙɭɿ , 📃 ⟩
//   ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭɔ ,
//   ſɭэ ɭʃᴜ , ꞙɭı , 📃 ⟩
import * as THREE from "three";
import { kf2Minimapon } from "../../kantaoj/bildo/minimapo.js";
import type { Minimapo } from "../../kantaoj/bildo/minimapo.js";

interface FiksaStato {
  perdita: boolean;
  fiasku: boolean;
  bildigitaj: number;
  kompiligitaj: number;
  forigitaj: number;
  celoj: ( THREE.WebGLRenderTarget | null )[];
// ⟨ ſɭэ ſɭw , ꞙɭı , ⟅ ꞙɭɔ , 📃 ⟩
  densoj: number[];
}

function certigi( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

async function atendi( thaweni: () => boolean = () => true ): Promise<void> {
  const limo = Date.now() + 0o10000;
  while ( !thaweni() ) {
    if ( Date.now() > limo ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃɜ j͑ʃᴜ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ ｡ j͑ʃƨꞇʞ ɭl̀ᴜ");
    await new Promise(resolve => setTimeout(resolve, 0o10));
  }
}

// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
//   ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
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

function kf2Fikston( agordiScenon?: ( qena: THREE.Scene ) => void ): {
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
  const mapo = kf2Minimapon({
    qena,
    bildilo,
    miniKanvaso: elemento<HTMLCanvasElement>(),
    kompaso,
    nadlo: elemento<HTMLElement>(),
    supermeta: elemento<HTMLElement>(),
    supermetaEnhavo: elemento<HTMLElement>(),
    mapoGrandeco: 0o100,
    movantoj: {
      npcoj: [], kanuoj: [], hapaga: { hapaga: [] }, hatemek: { hatemek: [] },
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

// ⟨ ſɭᴜ ſןᴜ , ſɭэ ſɭᴜ , 📃 ⟩
const senpeto = kf2Fikston();
senpeto.restarigi();
await atendi();
certigi( senpeto.stato.bildigitaj === 0 && senpeto.stato.forigitaj === 0,
  "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɜ ʃᴜ j͐ʃɹ ʌ j͑ʃп́ꞇ ſɟᴜ ſȷᴜɔ˞" );

// ⟨ ſɭɜ ᶗ‹ , ſɭэ ɭʃᴜ , 📃 ⟩
const sukcesa = kf2Fikston();
certigi( sukcesa.stato.bildigitaj === 0 && sukcesa.stato.kompiligitaj === 0,
  "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ʃᴜ j͐ʃɹ ｡ j͑ʃɜ j͑ʃᴜ ſᶘᴜ j͐ʃɔ ſᶘᴜ ʌ GPU" );
sukcesa.mapo.pretigi();
await atendi(() => sukcesa.stato.bildigitaj === 1);
certigi( sukcesa.stato.bildigitaj === 1, "ſɭʞᴜƴ ſɭɔ˞ɜƴ ꞁȷ̀ᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ ʌ ſɭɹʞ" );
certigi( sukcesa.stato.kompiligitaj === 0, "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭɹ ſȷɔ ʌ ſɭэ ſ͕ɭᴜ" );
certigi( sukcesa.stato.forigitaj === 1, "render target ｡ ſןɔ ʌ }ʃɔ ſ̀ȷw }ʃᴜƽ" );
certigi( sukcesa.stato.celoj.at(-1) === null, "render target ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ｡ ſןɔ ʌ }ʃɔ ſ̀ȷw }ʃᴜƽ" );
certigi( sukcesa.mapo.tsekeBakita(), "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɿ , 📃 ⟩
const duopa = kf2Fikston();
await Promise.all([ duopa.mapo.pretigi(), duopa.mapo.pretigi() ]);
certigi( duopa.stato.bildigitaj === 1, "ſɭэ }ʃᴜ ɔı ｡ j͑ʃ'ɜ j͐ʃɔ ｡ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ ɔı" );
certigi( duopa.mapo.tsekeBakita(), "ſɭэ }ʃᴜ ɔı ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );

// ⟨ ſɭᴜ ſןᴜ , ꞙɭɔ , 📃 ⟩
const kasxita = kf2Fikston();
const dokumento = globalThis.document as unknown as { hidden?: boolean };
dokumento.hidden = true;
await kasxita.mapo.pretigi();
certigi( kasxita.stato.bildigitaj === 0 && !kasxita.mapo.tsekeBakita(),
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );
dokumento.hidden = false;

// ⟨ ſɭэ ſɭᴜ , ꞙɭɿ , 📃 ⟩
const malsukcesa = kf2Fikston();
malsukcesa.stato.fiasku = true;
malsukcesa.mapo.pretigi();
await atendi(() => malsukcesa.stato.bildigitaj === 1);
certigi( malsukcesa.stato.bildigitaj === 1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ" );
certigi( malsukcesa.stato.forigitaj === 1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃᴜ ſȷᴜ ʌ render target" );
certigi( malsukcesa.stato.celoj.at(-1) === null, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃᴜ ſȷᴜ ʌ ſןᴜ ſᶘɹ ʌ ſɭɹʞ" );
certigi( !malsukcesa.mapo.tsekeBakita() && malsukcesa.kompaso.style.display === "none",
  "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ ſןɔ ʌ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹ ſᶘɔ" );
malsukcesa.mapo.pretigi();
await atendi(() => malsukcesa.stato.bildigitaj === 1);
certigi( malsukcesa.stato.bildigitaj === 1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ʃɜ j͐ʃɔ" );

// ⟨ ſɭᴜ ſןᴜ , ꞙɭц , 📃 ⟩
const perdita = kf2Fikston();
perdita.stato.perdita = true;
perdita.mapo.pretigi();
await atendi();
certigi( perdita.stato.bildigitaj === 0 && perdita.stato.forigitaj === 0,
  "GPU ｡ j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃᴜ ſɭᴜ ｡ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹʞ" );
perdita.restarigi();
await atendi(() => perdita.stato.bildigitaj === 1);
certigi( perdita.stato.bildigitaj === 1 && perdita.mapo.tsekeBakita(),
  "GPU ｡ j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃᴜ ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );

// ⟨ ſɭэ ſɭw , ꞙɭɔ , 📃 ⟩
// ſɭᴜ ſןᴜ , j͑ʃᴜ ſɭ,w , ꞙɭı ,
// ſɭᴜ ſןᴜ , ꞙɭı , 📃 ⟩
const NEBULA_DENSO_PROVO = 0o5 / 0o400;
const nebula = kf2Fikston(( qena ) => {
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULA_DENSO_PROVO);
});
nebula.mapo.pretigi();
await atendi(() => nebula.stato.bildigitaj === 1);
certigi( nebula.stato.densoj[0] === 0, "ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ ſןw ſɭᶗ‹ɔ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );
certigi( nebula.qena.fog instanceof THREE.FogExp2
  && nebula.qena.fog.density === NEBULA_DENSO_PROVO, "ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ j͐ʃᴜɔ˞ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );
certigi( nebula.mapo.tsekeBakita(), "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ſɭʞᴜƴ ſɭɔ˞ɜƴ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ }ʃɔ ſ̀ȷw }ʃᴜƽ ｡ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
