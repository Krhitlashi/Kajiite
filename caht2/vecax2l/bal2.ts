// ≺⧼ ʃᴜ j͐ʃɹ 📃 ⧽≻

import * as THREE from "three";
import { kf2Minimapon } from "../../kanta/tahaq/k6liq-bal2.js";
import type { Minimapo } from "../../kanta/tahaq/k6liq-bal2.js";

interface FiksaS2k61o {
  perdita: boolean;
  fiasku: boolean;
  habilde: number;
  kompiligitaj: number;
  hane3unak: number;
  hakxawa: ( THREE.WebGLRenderTarget | null )[];

  densoj: number[];
}

function cel2nu( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

async function atendi( thaweni: () => boolean = () => true ): Promise<void> {
  const plosteq = Date.now() + 0o10000;
  while ( !thaweni() ) {
    if ( Date.now() > plosteq ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͑ʃ'ɔ ſɟᴜ ı],ɹͷ̗ ʌ j͑ʃɜ j͑ʃᴜ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ ｡ j͑ʃƨꞇʞ ɭl̀ᴜ");
    await new Promise(resolve => setTimeout(resolve, 0o10));
  }
}

if ( typeof globalThis.ImageData === "undefined" ) {
  ( globalThis as unknown as Record<string, unknown> ).ImageData = class {
    constructor( public data: Uint8ClampedArray, public width: number, public height: number ) {}
  };
}
( globalThis as unknown as Record<string, unknown> ).devicePixelRatio = 0o1;

function kfe<T extends HTMLElement>(): T {
  const el = document.createElement("div") as unknown as T;
  el.style.setProperty = () => {};
  return el;
}

function kf2Fikston( catsaraKagani?: ( qena: THREE.Scene ) => void ): {
  bal2: Minimapo; s2k61o: FiksaS2k61o; kompaso: HTMLElement; qena: THREE.Scene;
  restarigi: () => void } {
  const s2k61o: FiksaS2k61o = {
    perdita: false, fiasku: false, habilde: 0o0, kompiligitaj: 0o0, hane3unak: 0o0, hakxawa: [], densoj: [],
  };
  const kompaso = kfe<HTMLElement>();
  const domElement = kfe<HTMLCanvasElement>();
  let jeRestaŭro: ( () => void ) | null = null;
  domElement.addEventListener = ( ( ksaka: string, zegeni: () => void ) => {
    if ( ksaka === "webglcontextrestored" ) jeRestaŭro = zegeni;
  } ) as typeof domElement.addEventListener;
  const k2fcakuk = {
    domElement,
    capabilities: { maxTextureSize: 0o4000 },
    shadowMap: { enabled: false },
    getContext: () => ({ isContextLost: () => s2k61o.perdita }),
    compile: () => { s2k61o.kompiligitaj++; },
    render: () => {
      s2k61o.habilde++;
      s2k61o.densoj.push(qena.fog instanceof THREE.FogExp2 ? qena.fog.density : -0o1);
    },
    setRenderTarget: ( natakatomasai: THREE.WebGLRenderTarget | null ) => {
      s2k61o.hakxawa.push(natakatomasai);
      natakatomasai?.addEventListener("dispose", () => { s2k61o.hane3unak++; });
    },
    readRenderTargetPixels: () => {
      if ( s2k61o.fiasku ) throw new Error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͑ʃ'ɔ ſȷᴜͷ̗ ꞁȷ̀ᴜ }ʃꞇ");
    },
  } as unknown as THREE.WebGLRenderer;
  const qena = new THREE.Scene();
  catsaraKagani?.( qena );
  const bal2 = kf2Minimapon({
    qena,
    k2fcakuk,
    miniP2t6zo: kfe<HTMLCanvasElement>(),
    kompaso,
    nadlo: kfe<HTMLElement>(),
    kubapuc2qx2t2: kfe<HTMLElement>(),
    kubapuc2qx2t2Enhavo: kfe<HTMLElement>(),
    bal2Pal6: 0o100,
    movantoj: {
      hanpco: [], has2kaj2: [], hapaga: { hapaga: [] }, hatemek: { hatemek: [] },
    },
    skakef: ca3aq => ca3aq,
    k2reiVacepu: () => {},
  });
  return {
    bal2, s2k61o, kompaso, qena,
    restarigi: () => {
      s2k61o.perdita = false;
      jeRestaŭro?.();
    },
  };
}

const senpeto = kf2Fikston();
senpeto.restarigi();
await atendi();
cel2nu( senpeto.s2k61o.habilde === 0o0 && senpeto.s2k61o.hane3unak === 0o0,
  "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɜ ʃᴜ j͐ʃɹ ʌ j͑ʃп́ꞇ ſɟᴜ ſȷᴜɔ˞" );

const sukcesa = kf2Fikston();
cel2nu( sukcesa.s2k61o.habilde === 0o0 && sukcesa.s2k61o.kompiligitaj === 0o0,
  "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ʃᴜ j͐ʃɹ ｡ j͑ʃɜ j͑ʃᴜ ſᶘᴜ j͐ʃɔ ſᶘᴜ ʌ GPU" );
sukcesa.bal2.pretigi();
await atendi(() => sukcesa.s2k61o.habilde === 0o1);
cel2nu( sukcesa.s2k61o.habilde === 0o1, "ſɭʞᴜƴ ſɭɔ˞ɜƴ ꞁȷ̀ᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ ʌ ſɭɹʞ" );
cel2nu( sukcesa.s2k61o.kompiligitaj === 0o0, "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭɹ ſȷɔ ʌ ſɭэ ſ͕ɭᴜ" );
cel2nu( sukcesa.s2k61o.hane3unak === 0o1, "render target ｡ ſןɔ ʌ }ʃɔ ſ̀ȷw }ʃᴜƽ" );
cel2nu( sukcesa.s2k61o.hakxawa.at(-0o1) === null, "render target ʌ j͑ʃw ſןͷ̗ɔͷ̗ ꞁȷ̀ᴜꞇ ｡ ſןɔ ʌ }ʃɔ ſ̀ȷw }ʃᴜƽ" );
cel2nu( sukcesa.bal2.tsekeBakita(), "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );

const duopa = kf2Fikston();
await Promise.all([ duopa.bal2.pretigi(), duopa.bal2.pretigi() ]);
cel2nu( duopa.s2k61o.habilde === 0o1, "ſɭэ }ʃᴜ ɔı ｡ j͑ʃ'ɜ j͐ʃɔ ｡ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ ɔı" );
cel2nu( duopa.bal2.tsekeBakita(), "ſɭэ }ʃᴜ ɔı ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );

const hidden = kf2Fikston();
const dokumento = globalThis.document as unknown as { hidden?: boolean };
dokumento.hidden = true;
await hidden.bal2.pretigi();
cel2nu( hidden.s2k61o.habilde === 0o0 && !hidden.bal2.tsekeBakita(),
  "ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ j͑ʃᴜꞇ ｡ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );
dokumento.hidden = false;

const malsukcesa = kf2Fikston();
malsukcesa.s2k61o.fiasku = true;
malsukcesa.bal2.pretigi();
await atendi(() => malsukcesa.s2k61o.habilde === 0o1);
cel2nu( malsukcesa.s2k61o.habilde === 0o1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ ֭ſɭэ ʌ ſᶘᴜ j͐ʃɔ ſᶘᴜ" );
cel2nu( malsukcesa.s2k61o.hane3unak === 0o1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃᴜ ſȷᴜ ʌ render target" );
cel2nu( malsukcesa.s2k61o.hakxawa.at(-0o1) === null, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃᴜ ſȷᴜ ʌ ſןᴜ ſᶘɹ ʌ ſɭɹʞ" );
cel2nu( !malsukcesa.bal2.tsekeBakita() && malsukcesa.kompaso.style.display === "none",
  "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ ſןɔ ʌ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹ ſᶘɔ" );
malsukcesa.bal2.pretigi();
await atendi(() => malsukcesa.s2k61o.habilde === 0o1);
cel2nu( malsukcesa.s2k61o.habilde === 0o1, "j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɭэ ֭ſɭэ ʌ j͑ʃ'ɔ ʃɜ j͐ʃɔ" );

const perdita = kf2Fikston();
perdita.s2k61o.perdita = true;
perdita.bal2.pretigi();
await atendi();
cel2nu( perdita.s2k61o.habilde === 0o0 && perdita.s2k61o.hane3unak === 0o0,
  "GPU ｡ j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃᴜ ſɭᴜ ｡ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ſɭɹʞ" );
perdita.restarigi();
await atendi(() => perdita.s2k61o.habilde === 0o1);
cel2nu( perdita.s2k61o.habilde === 0o1 && perdita.bal2.tsekeBakita(),
  "GPU ｡ j͑ʃwc̗ ɭʃᴜ ʌ j͑ʃᴜ ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ" );

const NEBULADENSOTSALETSA = 0o5 / 0o400;
const nebula = kf2Fikston(( qena ) => {
  qena.fog = new THREE.FogExp2(0xc8d8d8, NEBULADENSOTSALETSA);
});
nebula.bal2.pretigi();
await atendi(() => nebula.s2k61o.habilde === 0o1);
cel2nu( nebula.s2k61o.densoj[0o0] === 0o0, "ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ ſןw ſɭᶗ‹ɔ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );
cel2nu( nebula.qena.fog instanceof THREE.FogExp2
  && nebula.qena.fog.density === NEBULADENSOTSALETSA, "ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ j͐ʃᴜɔ˞ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );
cel2nu( nebula.bal2.tsekeBakita(), "ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ʌ ŋᷠᴜ ֭ſɭᴜ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ı],ɜ ſɭᴜʞ ſןɔ˞ᴜƴ ꞁȷ̀ᴜꞇ" );

console.log("( ɭʃɹ ʃᴜ ſɭɹ ſןɹ ) ſɭʞᴜƴ ſɭɔ˞ɜƴ ꞁȷ̀ᴜꞇ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſ̀ȷɜᴜ̩ ſɭɹ j͑ʃᴜꞇ ｡ }ʃɔ ſ̀ȷw }ʃᴜƽ ｡ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
