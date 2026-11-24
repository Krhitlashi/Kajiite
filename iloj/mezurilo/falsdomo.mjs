// ≺⧼ ſɭɜ ſɭ,w ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ 🧪 ⧽≻
// ⟨ DOM ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ ʌ j͑ʃᴜꞇ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ ⟅ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞
// ſɟwƽ ʌ }ʃᴜ j͐ʃᴜ ʌ SEMO ⟅ ſɭᴜ }ʃᴜȝ ʌ j͑ʃɜ j͑ʃƨɹ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩

const semo = process.env.SEMO ?? "testo";

class FalsaKunteksto {
  canvas = null;
  fillStyle = "#000";
  strokeStyle = "#000";
  lineWidth = 1;
  font = "";
  globalAlpha = 1;
  constructor( canvas ) { this.canvas = canvas; }
  getImageData( x, y, w, h ) { return { data: new Uint8ClampedArray( Math.max(1, w * h * 4) ), width: w, height: h }; }
  putImageData() {}
  createImageData( w, h ) { return { data: new Uint8ClampedArray( Math.max(1, w * h * 4) ), width: w, height: h }; }
  createLinearGradient() { return { addColorStop() {} }; }
  createRadialGradient() { return { addColorStop() {} }; }
  createPattern() { return null; }
  measureText( t ) { return { width: String(t).length * 7 }; }
  setTransform() {} resetTransform() {} save() {} restore() {} translate() {} rotate() {} scale() {}
  beginPath() {} closePath() {} moveTo() {} lineTo() {} arc() {} arcTo() {} rect() {} ellipse() {}
  quadraticCurveTo() {} bezierCurveTo() {} fill() {} stroke() {} clip() {}
  fillRect() {} strokeRect() {} clearRect() {} fillText() {} strokeText() {}
  drawImage() {} setLineDash() {} getLineDash() { return []; }
}

// ⟨ ſɭэ ֭ſɭэ ʌ ſɟᴜ ſȷᴜɔ˞ 📏 ⟩ ⟅ j͐ʃƽɜ ʌ j͑ʃͷ̗ᴜʞ ʌ Path2D ⟅ ſɟᴜᴜ̩ ɭʃɹ
// ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅ ſɭᴜ ſɭ,w j͐ʃᴜ ʌ j͑ʃᴜꞇ 📃 ⟩
class FalsaPath2D {
  moveTo() {} lineTo() {} closePath() {} arc() {} arcTo() {} rect() {} ellipse() {}
  quadraticCurveTo() {} bezierCurveTo() {} translate() {} rotate() {} scale() {}
  addPath() {}
}

class FalsaKanvaso {
  width = 1;
  height = 1;
  style = {};
  constructor() { this._2d = new FalsaKunteksto(this); }
  getContext( speco ) { return speco === "2d" ? this._2d : null; }
  toDataURL() { return "data:image/png;base64,"; }
  getBoundingClientRect() { return { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }; }
  addEventListener() {} removeEventListener() {}
  setAttribute() {} appendChild() {}
}

class FalsaElemento extends FalsaKanvaso {
  tagName = "div";
  id = "";
  textContent = "";
  dataset = {};
  children = [];
  classList = { add() {}, remove() {}, toggle() {}, contains() { return false; } };
  appendChild( c ) { this.children.push(c); return c; }
  removeChild( c ) { this.children = this.children.filter(x => x !== c); return c; }
  insertBefore( c ) { this.children.push(c); return c; }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  getContext( speco ) { return speco === "2d" ? this._2d : null; }
  focus() {} blur() {} click() {}
}

const stokejo = new Map();

const falsaStokado = {
  getItem( k ) { return stokejo.has(k) ? stokejo.get(k) : null; },
  setItem( k, v ) { stokejo.set(String(k), String(v)); },
  removeItem( k ) { stokejo.delete(k); },
  clear() { stokejo.clear(); },
  key( i ) { return [ ...stokejo.keys() ][i] ?? null; },
  get length() { return stokejo.size; },
};

// ⟨ }ʃᴜ j͐ʃᴜ ʌ ſɟwƽ ⟅ ſɭc̗ᴜ ɭʃэ ſɭɔȝ ꞁȷ̀ᴜ }ʃw ʌ ſɟɔȝ , j͑ʃᴜꞇ ʌ ſɟwƽ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
stokejo.set("aranis-mondoj", JSON.stringify([
  { id: "kajiite", klavo: "titoloUrbo", nomo: "Ĉefa", smino: semo, tempo: 0 },
]));
stokejo.set("aranis-aktiva-mondo", "kajiite");

const documento = {
  createElement( tag ) { const el = new FalsaElemento(); el.tagName = tag; return el; },
  createElementNS( ns, tag ) { return documento.createElement(tag); },
  createTextNode( t ) { return { textContent: t }; },
  getElementById() { return null; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  addEventListener() {},
  removeEventListener() {},
  body: new FalsaElemento(),
  head: new FalsaElemento(),
  documentElement: new FalsaElemento(),
};

globalThis.Path2D = FalsaPath2D;
globalThis.localStorage = falsaStokado;
globalThis.document = documento;
globalThis.window = globalThis;
globalThis.navigator ??= { userAgent: "node", language: "eo" };
globalThis.location = { search: "", href: "http://localhost/", reload() {} };
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
globalThis.requestAnimationFrame = ( fn ) => setTimeout(() => fn(performance.now()), 0);
globalThis.cancelAnimationFrame = ( id ) => clearTimeout(id);
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.dispatchEvent = () => true;
globalThis.CustomEvent = class CustomEvent {
  constructor( speco, agordo = {} ) { this.type = speco; this.detail = agordo.detail; }
};
globalThis.Event = globalThis.CustomEvent;
