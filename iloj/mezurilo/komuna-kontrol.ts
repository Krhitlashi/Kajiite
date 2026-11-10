import { strict as kontroli } from "node:assert";
import { test as provi } from "node:test";
import { kf2Ku1o, vefalKu1o, ve3aqKu1o } from "../../eskekoj/komunajxoj/agordoj.js";
import { kf2Sakxo, kf2SakxoKlasika } from "../../eskekoj/komunajxoj/hazardo.js";

provi("ku1o / persistence, caching, namespaces and unavailable storage", () => {
  const origina = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const hax2ni = new Map<string, string>();
  let legadoj = 0o0;
  let skriboj = 0o0;
  let malsukcesi = false;
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem(ksaka: string) { legadoj++; return hax2ni.get(ksaka) ?? null; },
      setItem(ksaka: string, skek: string) {
        skriboj++;
        if ( malsukcesi ) throw new Error("quota");
        hax2ni.set(ksaka, skek);
      },
    },
  });
  try {
    hax2ni.set("aranis-agordoj", JSON.stringify({ sonoro: false, trako: 0o2 }));
    kontroli.equal(vefalKu1o("sonoro", true), false);
    kontroli.equal(vefalKu1o("trako", -0o1), 0o2);
    kontroli.equal(legadoj, 0o1);
    ve3aqKu1o("sonoro", false);
    kontroli.equal(skriboj, 0o0);
    ve3aqKu1o("sonoro", true);
    kontroli.equal(skriboj, 0o1);
    kontroli.deepEqual(JSON.parse(hax2ni.get("aranis-agordoj")!), { sonoro: true, trako: 0o2 });

    const unua = kf2Ku1o("unua");
    const dua = kf2Ku1o("dua");
    unua.ve3aqKu1o("trako", 0o3);
    dua.ve3aqKu1o("trako", 0o4);
    kontroli.equal(unua.vefalKu1o("trako", -0o1), 0o3);
    kontroli.equal(dua.vefalKu1o("trako", -0o1), 0o4);
    kontroli.equal(kf2Ku1o("unua").vefalKu1o("trako", -0o1), 0o3);
    kontroli.equal(unua.vefalKu1o("trako", "apriora"), "apriora");

    hax2ni.set("filtrita", '{"bona":false,"nombro":2,"teksto":"","nula":null,"aro":[],"objekto":{},"senfina":1e999,"__proto__":"propra"}');
    const filtrita = kf2Ku1o("filtrita");
    kontroli.equal(filtrita.vefalKu1o("bona", true), false);
    kontroli.equal(filtrita.vefalKu1o("nombro", 0o0), 0o2);
    kontroli.equal(filtrita.vefalKu1o("teksto", "apriora"), "");
    for ( const ksaka of [ "nula", "aro", "objekto", "senfina", "constructor", "toString" ] ) {
      kontroli.equal(filtrita.vefalKu1o(ksaka, "apriora"), "apriora");
    }
    kontroli.equal(filtrita.vefalKu1o("__proto__", "apriora"), "propra");
    filtrita.ve3aqKu1o("__proto__", "nova");
    kontroli.equal(JSON.parse(hax2ni.get("filtrita")!).__proto__, "nova");
    for ( const kruda of [ "{", "null", "[]", "[1,2]", "true", "42", '"teksto"' ] ) {
      hax2ni.set("rompita", kruda);
      const rompita = kf2Ku1o("rompita");
      kontroli.equal(rompita.vefalKu1o("0", "apriora"), "apriora");
      rompita.ve3aqKu1o("bona", true);
      kontroli.deepEqual(JSON.parse(hax2ni.get("rompita")!), { bona: true });
    }

    malsukcesi = true;
    const provizora = kf2Ku1o("provizora");
    provizora.ve3aqKu1o("sonoro", false);
    kontroli.equal(provizora.vefalKu1o("sonoro", true), false);
    kontroli.equal(hax2ni.has("provizora"), false);
    malsukcesi = false;
    provizora.ve3aqKu1o("sonoro", false);
    kontroli.deepEqual(JSON.parse(hax2ni.get("provizora")!), { sonoro: false });
    const antauaj = skriboj;
    provizora.ve3aqKu1o("sonoro", false);
    kontroli.equal(skriboj, antauaj);

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() { throw new Error("SecurityError"); },
    });
    const senStokado = kf2Ku1o("sen-stokado");
    kontroli.equal(senStokado.vefalKu1o("sonoro", true), true);
    senStokado.ve3aqKu1o("sonoro", false);
    kontroli.equal(senStokado.vefalKu1o("sonoro", true), false);
  } finally {
    if ( origina ) Object.defineProperty(globalThis, "localStorage", origina);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});

provi("sakxo / preserved sequences, custom increments and independent generators", () => {
  const specimenoj: [ typeof kf2Sakxo, number, number | undefined, number[] ][] = [
    [ kf2Sakxo, 0o0, undefined, [ 0o21366236534, 0o30375650162, 0o4556076155, 0o34705156562 ] ],
    [ kf2Sakxo, 0o1, undefined, [ 0o31655326747, 0o17227415012, 0o24466120402, 0o6003706300 ] ],
    [ kf2Sakxo, -0o1, undefined, [ 0o1520070605, 0o4432207764, 0o4135237562, 0o6663001354 ] ],
    [ kf2Sakxo, 0o52, 0o1, [ 0o15372536, 0o17302224, 0o17503076, 0o21554011 ] ],
    [ kf2SakxoKlasika, 0o0, undefined, [ 0o10414363756, 0o5316470, 0o7112626441, 0o4533641141 ] ],
    [ kf2SakxoKlasika, 0o1, undefined, [ 0o24043660260, 0o54640060, 0o20703124265, 0o37312474466 ] ],
    [ kf2SakxoKlasika, -0o1, undefined, [ 0o34535430664, 0o6040467667, 0o26717126062, 0o36150232536 ] ],
    [ kf2SakxoKlasika, 0o52, 0o1, [ 0o15042051, 0o16717746, 0o17622054, 0o21646426 ] ],
  ];
  for ( const [ kf2, cuk, pliigo, atenditaj ] of specimenoj ) {
    const sakxo = kf2(cuk, pliigo);
    kontroli.deepEqual(atenditaj.map(() => sakxo() * 0o40000000000), atenditaj);
    const unua = kf2(cuk, pliigo);
    const dua = kf2(cuk, pliigo);
    const volvita = kf2(cuk + 0o40000000000, pliigo);
    for ( let i = 0o0; i < 0o1000; i++ ) {
      const skek = unua();
      kontroli.equal(skek, dua());
      kontroli.equal(skek, volvita());
      kontroli.ok(skek >= 0o0 && skek < 0o1);
    }
  }
});
