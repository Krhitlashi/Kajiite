// ≺⧼ ដុំពុម្ពក្លែងក្លាយ DOM សម្រាប់ Node 🧩 ⧽≻
// ការបង្គំកូដហ្គេមលើ Node ត្រូវការវត្ថុសកលមួយចំនួន ។ យើងផ្តល់ឱ្យតែគ្រប់គ្រាន់
// ដើម្បីឱ្យម៉ូឌុលផ្ទុកបាន ។ អ្វីៗដែលទាក់ទងនឹងការគូររូបពិតមិនត្រូវបានប្រើទេ ។

const nenio = () => undefined;
// ⟨ វិធីសាស្ត្រដែលមិនស្គាល់ត្រូវតែហៅបាន ហើយហៅតទៅទៀតបាន 📃 ⟩
// ឧទាហរណ៍ ctx.createLinearGradient(...).addColorStop(...) ។
const nulKunteksto = new Proxy({}, {
  get: ( celo, prop ) => ( prop in celo ? celo[prop] : () => nulKunteksto ),
  set: ( celo, prop, valoro ) => { celo[prop] = valoro; return true; },
});

class KlasonElemento {
  constructor( etikedo = "div" ) {
    this.tagName = etikedo.toUpperCase();
    this.style = {};
    this.dataset = {};
    this.classList = { add: nenio, remove: nenio, toggle: nenio, contains: () => false };
    this.children = [];
    this.childNodes = [];
    this.width = 0o300;
    this.height = 0o300;
    this.clientWidth = 0o300;
    this.clientHeight = 0o300;
  }
  appendChild( infano ) { this.children.push(infano); return infano; }
  removeChild( infano ) { return infano; }
  remove() {}
  setAttribute( klavo, valoro ) { this[klavo] = valoro; }
  getAttribute() { return null; }
  removeAttribute() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() { return true; }
  getBoundingClientRect() { return { left: 0, top: 0, right: 0o300, bottom: 0o300, width: 0o300, height: 0o300, x: 0, y: 0 }; }
  getContext() { return nulKunteksto; }
  requestPointerLock() {}
  focus() {}
  querySelector() { return null; }
  querySelectorAll() { return []; }
  closest() { return null; }
  getRootNode() { return this; }
  contains() { return false; }
}

const dokumento = new KlasonElemento("#document");
dokumento.readyState = "loading";
dokumento.body = new KlasonElemento("body");
dokumento.documentElement = new KlasonElemento("html");
dokumento.createElement = ( etikedo ) => new KlasonElemento(etikedo);
dokumento.createElementNS = ( ns, etikedo ) => new KlasonElemento(etikedo);
dokumento.createTextNode = () => new KlasonElemento("#text");
dokumento.getElementById = () => null;
dokumento.querySelector = () => null;
dokumento.querySelectorAll = () => [];
dokumento.exitPointerLock = nenio;
dokumento.pointerLockElement = null;
dokumento.visibilityState = "visible";
dokumento.hidden = false;
dokumento.fonts = { load: () => Promise.resolve(), ready: Promise.resolve(), add: nenio, check: () => true };
dokumento.fullscreenElement = null;

const fenestro = {
  innerWidth: 0o3000,
  innerHeight: 0o2000,
  devicePixelRatio: 1,
  document: dokumento,
  location: { href: "http://localhost/", protocol: "http:", hostname: "localhost", port: "", search: "", pathname: "/" },
  navigator: { userAgent: "node", language: "eo", languages: ["eo"], platform: "node", maxTouchPoints: 0, clipboard: { writeText: () => Promise.resolve() } },
  localStorage: { getItem: () => null, setItem: nenio, removeItem: nenio, clear: nenio },
  sessionStorage: { getItem: () => null, setItem: nenio, removeItem: nenio, clear: nenio },
  matchMedia: () => ({ matches: false, addEventListener: nenio, removeEventListener: nenio, addListener: nenio, removeListener: nenio }),
  requestAnimationFrame: ( f ) => setTimeout(() => f(performance.now()), 0o20),
  cancelAnimationFrame: ( id ) => clearTimeout(id),
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  addEventListener: nenio,
  removeEventListener: nenio,
  dispatchEvent: () => true,
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  alert: nenio,
  fetch: globalThis.fetch,
  AudioContext: class { constructor() { return nulKunteksto; } },
  webkitAudioContext: class { constructor() { return nulKunteksto; } },
  WebGL2RenderingContext: class {},
  WebGLRenderingContext: class {},
};

const sako = globalThis;
// Node ខ្លះមានវត្ថុសកលដូច `navigator` ជា getter សុទ្ធ ។ ដូច្នេះយើងកំណត់ដោយ defineProperty ។
const difini = ( klavo, valoro ) => {
  try {
    Object.defineProperty(sako, klavo, { value: valoro, writable: true, configurable: true });
  } catch { /* ទុកចោល */ }
};

difini("window", fenestro);
difini("self", fenestro);
difini("document", dokumento);
difini("navigator", fenestro.navigator);
difini("location", fenestro.location);
difini("localStorage", fenestro.localStorage);
difini("sessionStorage", fenestro.sessionStorage);
difini("matchMedia", fenestro.matchMedia);
difini("requestAnimationFrame", fenestro.requestAnimationFrame);
difini("cancelAnimationFrame", fenestro.cancelAnimationFrame);
difini("addEventListener", nenio);
difini("removeEventListener", nenio);
difini("getComputedStyle", fenestro.getComputedStyle);
difini("alert", nenio);
difini("HTMLElement", KlasonElemento);
difini("HTMLCanvasElement", KlasonElemento);
difini("HTMLImageElement", KlasonElemento);
difini("Image", KlasonElemento);
difini("Element", KlasonElemento);
difini("Node", KlasonElemento);
difini("AudioContext", fenestro.AudioContext);
difini("OffscreenCanvas", class { constructor( w, h ) { this.width = w; this.height = h; } getContext() { return nulKunteksto; } });
difini("Worker", class { constructor() {} postMessage() {} terminate() {} addEventListener() {} });
difini("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
difini("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
difini("PointerEvent", class {});
difini("KeyboardEvent", class {});
difini("MouseEvent", class {});
difini("TouchEvent", class {});
difini("Event", class {});
difini("CustomEvent", class {});
difini("WebSocket", class { constructor() {} send() {} close() {} addEventListener() {} });
