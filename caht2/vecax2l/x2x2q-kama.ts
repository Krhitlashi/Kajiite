import { strict as kamai } from "node:assert";
import { test as provi } from "node:test";
import { kf2Ku1o, vefalKu1o, ve3aqKu1o } from "../../skek2/x2x2q/kutso.js";
import { kf2Sakxo, kf2SakxoKlasika } from "../../skek2/x2x2q/caq2q.js";

provi("ku1o / persistence, caching, namespaces and unavailable storage", () => {
  const xaqadi = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
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
    hax2ni.set("aranis-haku1o", JSON.stringify({ bolero: false, t2bakobesai: 0o2 }));
    kamai.equal(vefalKu1o("bolero", true), false);
    kamai.equal(vefalKu1o("t2bakobesai", -0o1), 0o2);
    kamai.equal(legadoj, 0o1);
    ve3aqKu1o("bolero", false);
    kamai.equal(skriboj, 0o0);
    ve3aqKu1o("bolero", true);
    kamai.equal(skriboj, 0o1);
    kamai.deepEqual(JSON.parse(hax2ni.get("aranis-haku1o")!), { bolero: true, t2bakobesai: 0o2 });

    const xaqadi = kf2Ku1o("xaqadi");
    const p2sadi = kf2Ku1o("p2sadi");
    xaqadi.ve3aqKu1o("t2bakobesai", 0o3);
    p2sadi.ve3aqKu1o("t2bakobesai", 0o4);
    kamai.equal(xaqadi.vefalKu1o("t2bakobesai", -0o1), 0o3);
    kamai.equal(p2sadi.vefalKu1o("t2bakobesai", -0o1), 0o4);
    kamai.equal(kf2Ku1o("xaqadi").vefalKu1o("t2bakobesai", -0o1), 0o3);
    kamai.equal(xaqadi.vefalKu1o("t2bakobesai", "apriora"), "apriora");

    hax2ni.set("filtrita", '{"xobe":false,"k2fe":2,"s2bana":"","nula":null,"aro":[],"zace":{},"sentlakak":1e999,"proto":"propra"}');
    const filtrita = kf2Ku1o("filtrita");
    kamai.equal(filtrita.vefalKu1o("xobe", true), false);
    kamai.equal(filtrita.vefalKu1o("k2fe", 0o0), 0o2);
    kamai.equal(filtrita.vefalKu1o("s2bana", "apriora"), "");
    for ( const ksaka of [ "nula", "aro", "zace", "sentlakak", "constructor", "toString" ] ) {
      kamai.equal(filtrita.vefalKu1o(ksaka, "apriora"), "apriora");
    }
    kamai.equal(filtrita.vefalKu1o("proto", "apriora"), "propra");
    filtrita.ve3aqKu1o("proto", "sef4");
    kamai.equal(JSON.parse(hax2ni.get("filtrita")!).proto, "sef4");
    for ( const kruda of [ "{", "null", "[]", "[1,2]", "true", "42", '"s2bana"' ] ) {
      hax2ni.set("rompita", kruda);
      const rompita = kf2Ku1o("rompita");
      kamai.equal(rompita.vefalKu1o("0", "apriora"), "apriora");
      rompita.ve3aqKu1o("xobe", true);
      kamai.deepEqual(JSON.parse(hax2ni.get("rompita")!), { xobe: true });
    }

    malsukcesi = true;
    const bakawe = kf2Ku1o("bakawe");
    bakawe.ve3aqKu1o("bolero", false);
    kamai.equal(bakawe.vefalKu1o("bolero", true), false);
    kamai.equal(hax2ni.has("bakawe"), false);
    malsukcesi = false;
    bakawe.ve3aqKu1o("bolero", false);
    kamai.deepEqual(JSON.parse(hax2ni.get("bakawe")!), { bolero: false });
    const antauaj = skriboj;
    bakawe.ve3aqKu1o("bolero", false);
    kamai.equal(skriboj, antauaj);

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() { throw new Error("SecurityError"); },
    });
    const senStokado = kf2Ku1o("sen-stokado");
    kamai.equal(senStokado.vefalKu1o("bolero", true), true);
    senStokado.ve3aqKu1o("bolero", false);
    kamai.equal(senStokado.vefalKu1o("bolero", true), false);
  } finally {
    if ( xaqadi ) Object.defineProperty(globalThis, "localStorage", xaqadi);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});

provi("sakxo / preserved sequences, custom increments and independent generators", () => {
  const hapxeutso: [ typeof kf2Sakxo, number, number | undefined, number[] ][] = [
    [ kf2Sakxo, 0o0, undefined, [ 0o21366236534, 0o30375650162, 0o4556076155, 0o34705156562 ] ],
    [ kf2Sakxo, 0o1, undefined, [ 0o31655326747, 0o17227415012, 0o24466120402, 0o6003706300 ] ],
    [ kf2Sakxo, -0o1, undefined, [ 0o1520070605, 0o4432207764, 0o4135237562, 0o6663001354 ] ],
    [ kf2Sakxo, 0o52, 0o1, [ 0o15372536, 0o17302224, 0o17503076, 0o21554011 ] ],
    [ kf2SakxoKlasika, 0o0, undefined, [ 0o10414363756, 0o5316470, 0o7112626441, 0o4533641141 ] ],
    [ kf2SakxoKlasika, 0o1, undefined, [ 0o24043660260, 0o54640060, 0o20703124265, 0o37312474466 ] ],
    [ kf2SakxoKlasika, -0o1, undefined, [ 0o34535430664, 0o6040467667, 0o26717126062, 0o36150232536 ] ],
    [ kf2SakxoKlasika, 0o52, 0o1, [ 0o15042051, 0o16717746, 0o17622054, 0o21646426 ] ],
  ];
  for ( const [ kf2, tk2ni, tlunak, atenditaj ] of hapxeutso ) {
    const sakxo = kf2(tk2ni, tlunak);
    kamai.deepEqual(atenditaj.map(() => sakxo() * 0o40000000000), atenditaj);
    const xaqadi = kf2(tk2ni, tlunak);
    const p2sadi = kf2(tk2ni, tlunak);
    const volvita = kf2(tk2ni + 0o40000000000, tlunak);
    for ( let i = 0o0; i < 0o1000; i++ ) {
      const skek = xaqadi();
      kamai.equal(skek, p2sadi());
      kamai.equal(skek, volvita());
      kamai.ok(skek >= 0o0 && skek < 0o1);
    }
  }
});
