// ≺⧼ ទិដ្ឋភាពជិត 📷 ⧽≻
// ⟨ ទំព័រវាស់មើល ៖ សាងសង់ពិភពលោកពិតប្រាកដ ( ដី + ផ្លូវ + ចានភ្ជាប់ ) ដូចហ្គេម ,
// ហើយថតពីកាមេរ៉ាដែលយើងកំណត់ ។ ប៉ារ៉ាម៉ែត្រតាម URL ៖ x , y , z , tx , ty , tz , fov ។ 📃 ⟩
import * as THREE from "three";
import { kreiScenon } from "../../kantaoj/bildo/scena.js";
import { konstruiUrbon } from "../../kantaoj/mondo/urbo.js";
import { alteco } from "../../kantaoj/mondo/tereno.js";
import { surGrid, VOJA_BORDA_LARĜO, VOJA_EKSTERA_DUONO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { kreiNivelanProfilon } from "../../eskekoj/medio/vojoj/niveloj.js";
import { vojaSuproDeKunigo } from "../../eskekoj/medio/vojoj/formoj.js";

const parametroj = new URLSearchParams(location.search);
const nombro = ( klavo: string, defauxlto: number ): number => {
  const kruda = parametroj.get(klavo);
  if ( kruda === null ) return defauxlto;
  const valoro = parseFloat(kruda);
  return Number.isFinite(valoro) ? valoro : defauxlto;
};

const kanvaso = document.getElementById("sceno") as HTMLCanvasElement;
const scena = kreiScenon(kanvaso, document.body);
if ( nombro("nebulo", 1) === 0 ) scena.sceno.fog = null;
const urbo = await konstruiUrbon(scena.sceno, scena.dioritaMaterialo,
  scena.andezitaMaterialo, scena.eniraMaterialo, scena.oraMaterialo, () => {});

const fotilo = scena.fotilo;
const cxefaj = urbo.vojSpecimenoj ?? [];
fotilo.position.set(nombro("x", 40), nombro("y", 30), nombro("z", 100));
fotilo.lookAt(nombro("tx", 0), nombro("ty", 0), nombro("tz", 0));
fotilo.fov = nombro("fov", 55);
fotilo.updateProjectionMatrix();
fotilo.updateMatrixWorld(true);
scena.bildilo.render(scena.sceno, fotilo);

// ⟨ ការរាយការណ៍ ៖ ចំណុចផ្លូវមួយចំនួន សម្រាប់ជ្រើសកាមេរ៉ា 📃 ⟩
// ⟨ មុខឈរ 📏 ⟩ ៖ ត្រីកោណដែលស្ទើរតែឈរ ( ធម្មតាស្ទើរតែផ្ដេក ) ហើយខ្ពស់លើសមួយជំហាន ។
// ទាំងនេះជាជញ្ជាំងថ្មដែលឃើញក្រោមគែមផ្លូវ ។ 📃 ⟩
type Muro = { y: number; x: number; z: number; sx: number; sz: number };
type Floso = { alto: number; x: number; z: number; malsupre: number; tero: number };
const muroj: Muro[] = [];
const flosantaj: Floso[] = [];
// ⟨ តែជិតផ្លូវ 📏 ⟩ ៖ ភ្នំក៏មានមុខឈរដែរ ។ ដូច្នេះរកតែក្នុងរង្វង់ ៨ ឯកតាពីខ្សែកណ្តាលផ្លូវ ។ 📃 ⟩
const CXELO = 0o10;
const vojCxeloj = new Set<string>();
const cxeloDe = ( v: number ): number => Math.floor(v / CXELO);
for ( const p of cxefaj ) {
  const gx = cxeloDe(p.x), gz = cxeloDe(p.z);
  for ( let dx = -1; dx <= 1; dx++ )
    for ( let dz = -1; dz <= 1; dz++ ) vojCxeloj.add(( gx + dx ) + "," + ( gz + dz ));
}
const apudVojo = ( x: number, z: number ): boolean => vojCxeloj.has(cxeloDe(x) + "," + cxeloDe(z));
const portempa = new THREE.Vector3();
const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3();
const ab = new THREE.Vector3(), ac = new THREE.Vector3(), normalo = new THREE.Vector3();
scena.sceno.traverse(objekto => {
  const mesho = objekto as THREE.Mesh;
  if ( !( mesho as any ).isMesh || !mesho.geometry ) return;
  // ⟨ តែផ្លូវ និងចានភ្ជាប់ 📏 ⟩ ៖ វត្ថុផ្សេងទៀត ( ដើមឈើ , បង្គោល ) ក៏មានមុខឈរដែរ ។
  // ផ្លូវប្រើ polygonOffset ដើម្បីកុំឱ្យជាន់លើដី ។ 📃 ⟩
  if ( ( mesho.material as any ).polygonOffset !== true ) return;
  const geo = mesho.geometry as THREE.BufferGeometry;
  const pozicio = geo.getAttribute("position");
  if ( !pozicio ) return;
  const indekso = geo.getIndex();
  const kvanto = indekso ? indekso.count : pozicio.count;
  for ( let i = 0; i + 0o2 < kvanto; i += 0o3 ) {
    const i0 = indekso ? indekso.getX(i) : i;
    const i1 = indekso ? indekso.getX(i + 1) : i + 1;
    const i2 = indekso ? indekso.getX(i + 2) : i + 2;
    va.fromBufferAttribute(pozicio, i0).applyMatrix4(mesho.matrixWorld);
    vb.fromBufferAttribute(pozicio, i1).applyMatrix4(mesho.matrixWorld);
    vc.fromBufferAttribute(pozicio, i2).applyMatrix4(mesho.matrixWorld);
    ab.subVectors(vb, va); ac.subVectors(vc, va);
    normalo.crossVectors(ab, ac);
    const longo = normalo.length();
    if ( longo < 0o1/0o1000000 ) continue;
    normalo.divideScalar(longo);
    if ( Math.abs(normalo.y) > 0o3/0o10 ) continue;
    const plejAlta = Math.max(va.y, vb.y, vc.y);
    const plejMalalta = Math.min(va.y, vb.y, vc.y);
    const alto = plejAlta - plejMalalta;
    if ( alto < 0o15/0o10 ) continue;
    const cx = ( va.x + vb.x + vc.x ) / 0o3, cz = ( va.z + vb.z + vc.z ) / 0o3;
    if ( !apudVojo(cx, cz) ) continue;
    const tero = alteco(cx, cz);
    // ⟨ អណ្តែត 📏 ⟩ ៖ បាតមុខឈរនៅលើដី , ឬក្នុងខ្យល់ ។
    if ( plejMalalta - tero > 0o2/0o10 )
      flosantaj.push({ alto, x: cx, z: cz, malsupre: plejMalalta, tero });
    muroj.push({ y: alto, x: cx, z: cz,
      sx: Math.max(va.x, vb.x, vc.x) - Math.min(va.x, vb.x, vc.x),
      sz: Math.max(va.z, vb.z, vc.z) - Math.min(va.z, vb.z, vc.z) });
  }
});
muroj.sort(( a, b ) => b.y - a.y );
flosantaj.sort(( a, b ) => b.alto - a.alto );
const flosajPintoj = flosantaj.slice(0, 12).map(f => ({
  h: +f.alto.toFixed(2), x: Math.round(f.x), z: Math.round(f.z),
  sube: +f.malsupre.toFixed(2), tero: +f.tero.toFixed(2) }));
const flosaSumo = flosantaj.length;
const murojSupraj = muroj.slice(0, 15).map(m => ({
  h: +m.y.toFixed(2), x: Math.round(m.x), z: Math.round(m.z),
  w: +Math.max(m.sx, m.sz).toFixed(2) }));

// ⟨ កម្ពស់ផ្លូវលើដី 📏 ⟩ ៖ ផ្ទៃផ្លូវធៀបនឹងដីពិត ។ លេខធំ = ផ្លូវអណ្តែត ។
let sumoLevi = 0, maksLevi = 0, maksLoko = "", maksIndekso = 0, minLevi = 0, minLoko = "";
const kasitaj: number[] = [];
for (let i = 0; i < cxefaj.length; i++) {
  const p = cxefaj[i];
  const levi = p.y - alteco(p.x, p.z);
  sumoLevi += levi;
  if (levi > maksLevi) { maksLevi = levi; maksLoko = `${Math.round(p.x)},${Math.round(p.z)}`; maksIndekso = i; }
  if (levi < minLevi) { minLevi = levi; minLoko = `${Math.round(p.x)},${Math.round(p.z)}`; }
  if (levi > 0.5) kasitaj.push(levi);
}
kasitaj.sort((a, b) => b - a);
// ⟨ បន្ទាត់កម្ពស់ជុំវិញកន្លែងអាក្រក់បំផុត 📃 ⟩ ៖ ផ្លូវ ( លើ ) ធៀបដី ( ក្រោម ) ។
const linio: string[] = [];
for (let i = Math.max(0, maksIndekso - 12); i <= Math.min(cxefaj.length - 1, maksIndekso + 24); i++) {
  const p = cxefaj[i];
  linio.push(`${i}${i === maksIndekso ? "*" : ""} (${Math.round(p.x)},${Math.round(p.z)}) ផ្លូវ ${p.y.toFixed(1)} ដី ${alteco(p.x, p.z).toFixed(1)}`);
}
const levajxo = {
  meza: +(sumoLevi / Math.max(1, cxefaj.length)).toFixed(2),
  maks: +maksLevi.toFixed(2),
  loko: maksLoko,
  min: +minLevi.toFixed(2),
  minLoko,
  superUnuStupo: kasitaj.length,
  tutaj: cxefaj.length,
  supraj: kasitaj.slice(0, 10).map(v => +v.toFixed(2)),
  linio,
};

( window as any ).__vido = {
  preta: true,
  specimenoj: cxefaj.length,
  muroj: muroj.length,
  murojSupraj,
  flosaj: flosaSumo,
  flosajPintoj,
  levajxo,
  diagno: ( () => {
    const d = ( globalThis as any ).__urboDiagnostiko;
    if ( !d ) return null;
    const px = nombro("dx", 12), pz = nombro("dz", -127);
    const proksimaj = ( d.kunigoj as [ number, number ][] )
      .map(([ x, z ]) => ({ x, z, d: Math.hypot(x - px, z - pz),
        h: surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, d.vojoAlteco).supro) }))
      .sort(( a, b ) => a.d - b.d).slice(0, 6)
      .map(k => ({ x: k.x, z: k.z, d: +k.d.toFixed(1), h: +k.h.toFixed(2) }));
    // ⟨ ផ្លូវណាដែលកាត់ចំណុចនេះ 📃 ⟩
    const difinoj = d.difinoj as any[];
    const trovita = difinoj.map((f, i) => {
      let plej = Infinity;
      const pts = f.pts as [number, number][];
      for (let j = 0; j + 1 < pts.length; j++) {
        const [ax, az] = pts[j], [bx, bz] = pts[j + 1];
        const dx = bx - ax, dz = bz - az;
        const l2 = dx * dx + dz * dz || 1;
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / l2));
        plej = Math.min(plej, Math.hypot(px - (ax + dx * t), pz - (az + dz * t)));
      }
      return { i, plej, f };
    }).sort((a, b) => a.plej - b.plej).slice(0, 3);
    const vojaj = trovita.map(({ i, plej, f }) => ({
      i, d: +plej.toFixed(2), w: f.w, glata: !!f.glata, stuparo: !!f.stuparo,
      kapoj: !!f.kapoj, havasHeightFn: typeof f.heightFn === "function",
      havasGrundoFn: typeof f.grundoFn === "function",
      pts: f.pts.length,
      h: typeof f.heightFn === "function" ? +f.heightFn(px, pz).toFixed(2) : null,
    }));
    // ⟨ ការលើកតាមផ្លូវនីមួយៗ 📏 ⟩ ៖ ផ្លូវធៀបដី ។ ស្ពាន ( glata ) ធៀបផ្លូវជណ្តើរ ។
    const lauxVojo = difinoj.map((f, i) => {
      const pts = f.pts as [number, number][];
      let maks = 0, loko = "";
      for (let j = 0; j + 1 < pts.length; j++) {
        const [ax, az] = pts[j], [bx, bz] = pts[j + 1];
        const lo = Math.hypot(bx - ax, bz - az);
        const n = Math.max(1, Math.round(lo));
        for (let k = 0; k <= n; k++) {
          const t = k / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
          const sup = typeof f.heightFn === "function" ? f.heightFn(x, z) : d.vojoAlteco(x, z);
          const levi = sup - alteco(x, z);
          if (levi > maks) { maks = levi; loko = `${Math.round(x)},${Math.round(z)}`; }
        }
      }
      return { i, glata: !!f.glata, stuparo: !!f.stuparo, maks: +maks.toFixed(2), loko };
    }).sort((a, b) => b.maks - a.maks);
    const glataj = lauxVojo.filter(v => v.glata);
    const stupaj = lauxVojo.filter(v => !v.glata);
    // ⟨ ទំហំជំហាន 📏 ⟩ ៖ ការឡើង/ចុះរវាងគំរូជាប់គ្នា ។ គួរស្មើគ្នាទាំងអស់ ។
    const levigxoj = new Map<string, number>();
    const ankroj = (d.kunigoj as [number, number][]).map(([x, z]) => ({ x, z,
      alto: surGrid(vojaSuproDeKunigo(x, z, [], VOJA_EKSTERA_DUONO, d.vojoAlteco).supro) }));
    for (const f of difinoj) {
      if (f.glata || f.stuparo || !f.pts || f.pts.length < 2) continue;
      const profilo = kreiNivelanProfilon(f.pts, f.w / 2 + VOJA_BORDA_LARĜO, d.vojoAlteco,
        undefined, ankroj);
      for (let i = 1; i < profilo.altoj.length; i++) {
        const dd = profilo.altoj[i] - profilo.altoj[i - 1];
        if (Math.abs(dd) < 1e-6) continue;
        const k = dd.toFixed(2);
        levigxoj.set(k, (levigxoj.get(k) ?? 0) + 1);
      }
    }
    const levigxaj = [...levigxoj.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    return {
      alteco: +alteco(px, pz).toFixed(2),
      baza: +d.bazaVojoAlteco(px, pz).toFixed(2),
      vojo: +d.vojoAlteco(px, pz).toFixed(2),
      proksimaj,
      vojaj,
      plejLevaj: lauxVojo.slice(0, 8),
      levigxaj,
      glatajSuperUnu: glataj.filter(v => v.maks > 1).length,
      glatajTutaj: glataj.length,
      glataMaks: glataj.length ? glataj[0].maks : 0,
      stupajSuperUnu: stupaj.filter(v => v.maks > 1).length,
      stupajTutaj: stupaj.length,
      stupaMaks: stupaj.length ? stupaj[0].maks : 0,
      difinoj: difinoj.length,
    };
  })(),
  unuaj: cxefaj.slice(0, 40).map(( p: any ) => [ Math.round(p.x), Math.round(p.y), Math.round(p.z) ]),
};
