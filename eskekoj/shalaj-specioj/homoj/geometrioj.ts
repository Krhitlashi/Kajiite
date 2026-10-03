// ≺⧼ ធរណីមាត្រថេរ 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kreiBotan } from "./boto.js";
import { kreiArtikanSferon, remapiUVon } from "./formoj.js";
import { kreiKorpanTorson, kreiKorpanKruropon, kreiKorpanBrakon, kreiKorpanManon, kreiKorpanPiedon, kreiPantalonan } from "./korpo.js";
import { OKULA_ALTO, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO } from "./okuloj.js";
import { KOLO_Y, KUBUTO_Y } from "./mezuroj.js";
import { kreiFoliaTonditanTubon, kreiMalfermanRobonSxelon, kreiInternanSxelon } from "./sxeloj.js";
import { kreiOkulon, kreiPalpebrojn, kreiNazon, kreiKapanKranion, kreiOrelon, kreiVizaĝajnStrikojn, kreiBuŝon } from "./vizagxo.js";

// ⟨ ធរណីមាត្រថេរ 📃 ⟩
// ⟨ ការភ្ជាប់ 📃 ⟩

// ⟨ គំរូមនុស្ស និងគំរូសម្លៀកបំពាក់ 📃 ⟩
let figurajGeometrioj: {
  kapa: THREE.BufferGeometry;
  vizaĝo: THREE.BufferGeometry;
  vizaĝajStrikoj: THREE.BufferGeometry;
  palpebroj: THREE.BufferGeometry;
  korpo: THREE.BufferGeometry;
  // ⟨ អវយវៈមកជាពីរផ្នែក 📃 ⟩
  kruroSupra: THREE.BufferGeometry;
  kruroMalsupra: THREE.BufferGeometry;
  korpaPiedo: THREE.BufferGeometry;
  brakoSupra: THREE.BufferGeometry;
  brakoMalsupra: THREE.BufferGeometry;
  mano: THREE.BufferGeometry;
  ungoj: THREE.BufferGeometry;
  interna: THREE.BufferGeometry;
  roba: THREE.BufferGeometry;
  pantalonaSupra: THREE.BufferGeometry;
  pantalonaMalsupra: THREE.BufferGeometry;
  boto: THREE.BufferGeometry;
  akcenta: THREE.BufferGeometry;
  manikaSupra: THREE.BufferGeometry;
  manikaMalsupra: THREE.BufferGeometry;
} | null = null;

export function figurajGeometriojn(): NonNullable<typeof figurajGeometrioj> {
  if ( figurajGeometrioj ) return figurajGeometrioj;

  // ⟨ ក្បាល 📃 ⟩
  const kapo = kreiKapanKranion();
  // ⟨ កស្តើងចុះ 📃 ⟩
  const kolo = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  kolo.translate(0, KOLO_Y, 0);
  const kapajPartoj: THREE.BufferGeometry[] = [ kapo, kolo ];
  // ⟨ ត្រចៀកឥឡូវជាសំបក 📃 ⟩
  for ( const dir of [ -0o1, 0o1 ] ) kapajPartoj.push(kreiOrelon(dir));
  // ⟨ ច្រមុះ 📃 ⟩
  kapajPartoj.push(kreiNazon());
  const kapa = kunfandiGeometriojn(kapajPartoj);

  // ⟨ មុខ 📃 ⟩
  // ⟨ ភ្នែក 📃 ⟩
  // ⟨ ហេតុអ្វីគ្មានចិញ្ចើម 📃 ⟩
  const okuloj: THREE.BufferGeometry[] = [
    kreiOkulon(-0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, -0o1/0o10),
    kreiOkulon(0o1, OKULA_DX, OKULA_DY, OKULA_DZ, OKULA_LARĜO, OKULA_ALTO, 0o1/0o10),
  ];
  // ⟨ មាត់បន្ថែមទៅធរណីមាត្រមុខ 📃 ⟩
  const vizaĝo = kunfandiGeometriojn([ ...okuloj, kreiBuŝon() ]);
  // ⟨ ចិញ្ចើម និងរោមភ្នែក 📃 ⟩
  const vizaĝajStrikoj = kreiVizaĝajnStrikojn();

  // ⟨ ស្បែកជើង 📃 ⟩
  const { boto, akcentaj } = kreiBotan();

  // ⟨ ដៃ និងប្រអប់ដៃ 📃 ⟩
  const kruro = kreiKorpanKruropon();
  const brako = kreiKorpanBrakon();
  const pantalono = kreiPantalonan();
  // ⟨ ដៃ និងក្រចក 📃 ⟩
  const manoj = kreiKorpanManon();
  // ⟨ ដៃអាវបែកនៅកែងដៃ 📃 ⟩
  // ⟨ ពាក់កណ្តាលទាំងពីរទទួល UV ដូចគ្នា 📃 ⟩
  const MANIKA_SUPRO = 0o11/0o200;
  // ⟨ កដៃឥឡូវគ្របដៃ 📃 ⟩
  const MANIKA_MALSUPRO = 0o50/0o1000;
  const KUBUTA_Y = KUBUTO_Y;
  // ⟨ កដៃព្យួរ 0.25 ក្រោមកែងដៃ 📃 ⟩
  const MANUMO_MALSUPRO = 0o1/0o4;
  const MANIKA_BAZO = KUBUTA_Y - MANUMO_MALSUPRO;
  const KUBUTA_V = KUBUTA_Y / MANIKA_BAZO;
  // ⟨ ដៃអាវលែងរួមតូច 📃 ⟩
  const KUBUTA_R = MANIKA_SUPRO + ( MANIKA_MALSUPRO - MANIKA_SUPRO ) * 0o1/0o4;
  const manikaSupra = remapiUVon(kreiFoliaTonditanTubon(MANIKA_SUPRO, KUBUTA_R, 0,
    KUBUTA_Y, 0o60, 0o4, 0, 0, true), 0, KUBUTA_V);
  // ⟨ គែមស្លឹករាក់ចុះ 📃 ⟩
  // ⟨ គែមមានរលកតិចលើដៃ 📃 ⟩
  const malprofundeco = 0o3/0o200;
  const manikaMalsupra = kreiFoliaTonditanTubon(KUBUTA_R, MANIKA_MALSUPRO, KUBUTA_Y,
    MANIKA_BAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMalsupra, KUBUTA_V, 0o1);
  manikaMalsupra.translate(0, -KUBUTA_Y, 0);
  // ⟨ កែងដៃនៃដៃអាវ 📃 ⟩
  // ⟨ ស្វ៊ែរនៅដូចកែងដៃ 📃 ⟩
  const manikaArtiko = kreiArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTA_R, 0o7/0o10);
  figurajGeometrioj = {
    // ⟨ គំរូមនុស្ស 📃 ⟩
    kapa,
    vizaĝo,
    vizaĝajStrikoj,
    palpebroj: kreiPalpebrojn(),
    korpo: kreiKorpanTorson(),
    kruroSupra: kruro.supra,
    kruroMalsupra: kruro.malsupra,
    korpaPiedo: kreiKorpanPiedon(),
    brakoSupra: brako.supra,
    brakoMalsupra: brako.malsupra,
    mano: manoj.mano,
    ungoj: manoj.ungoj,
    interna: kreiInternanSxelon(),
    // ⟨ គំរូសម្លៀកបំពាក់ 📃 ⟩
    roba: kreiMalfermanRobonSxelon(),
    pantalonaSupra: pantalono.supra,
    pantalonaMalsupra: pantalono.malsupra,
    boto,
    akcenta: akcentaj,
    // ⟨ ដៃអាវខ្លីជាមួយរ៉ូប 📃 ⟩
    // ⟨ កដៃលែងចាក់ដៃ 📃 ⟩
    manikaSupra,
    manikaMalsupra: kunfandiGeometriojn([ manikaMalsupra, manikaArtiko ]),
  };
  return figurajGeometrioj;
}
