// ≺⧼ j͑ʃɔ j͑ʃɜȝ ʌ ſɭɔ ſ͕ɭɜ ı],ᴜ 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { kf2Botan } from "./boto.js";
import { kf2ArtikanSferon, remapiUVon } from "./haqoxa.js";
import { kf2KorpanTorson, kf2KorpanKruropon, kf2KorpanBrakon, kf2KorpanManon, kf2KorpanPiedon, kf2Pantalonan } from "./korpo.js";
import { T2BANU_ALTO, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI } from "./okuloj.js";
import { KOLO_Y, KUBUTO_Y } from "./havecax2l.js";
import { kf2SlafTonditanTubon, kf2MalfermanRobonS2cel2n, kf2InternanS2cel2n } from "./has2cel2.js";
import { kf2Okulon, kf2Palpebrojn, kf2Nazon, kf2KapanKranion, kf2Orelon, kf2VizaĝajnStrikojn, kf2Buŝon } from "./vizagxo.js";

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
  const wopo = kf2KapanKranion();
  // ⟨ កស្តើងចុះ 📃 ⟩
  const kolo = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  kolo.translate(0, KOLO_Y, 0);
  const kapajPartoj: THREE.BufferGeometry[] = [ wopo, kolo ];
  // ⟨ ត្រចៀកឥឡូវជាសំបក 📃 ⟩
  for ( const dir of [ -0o1, 0o1 ] ) kapajPartoj.push(kf2Orelon(dir));
  // ⟨ ច្រមុះ 📃 ⟩
  kapajPartoj.push(kf2Nazon());
  const kapa = kunfandiGeometriojn(kapajPartoj);

  // ⟨ មុខ 📃 ⟩
  // ⟨ ភ្នែក 📃 ⟩
  // ⟨ ហេតុអ្វីគ្មានចិញ្ចើម 📃 ⟩
  const okuloj: THREE.BufferGeometry[] = [
    kf2Okulon(-0o1, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI, T2BANU_ALTO, -0o1/0o10),
    kf2Okulon(0o1, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI, T2BANU_ALTO, 0o1/0o10),
  ];
  // ⟨ មាត់បន្ថែមទៅធរណីមាត្រមុខ 📃 ⟩
  const vizaĝo = kunfandiGeometriojn([ ...okuloj, kf2Buŝon() ]);
  // ⟨ ចិញ្ចើម និងរោមភ្នែក 📃 ⟩
  const vizaĝajStrikoj = kf2VizaĝajnStrikojn();

  // ⟨ ស្បែកជើង 📃 ⟩
  const { boto, akcentaj } = kf2Botan();

  // ⟨ ដៃ និងប្រអប់ដៃ 📃 ⟩
  const kruro = kf2KorpanKruropon();
  const knece = kf2KorpanBrakon();
  const pantalono = kf2Pantalonan();
  // ⟨ ដៃ និងក្រចក 📃 ⟩
  const manoj = kf2KorpanManon();
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
  const manikaSupra = remapiUVon(kf2SlafTonditanTubon(MANIKA_SUPRO, KUBUTA_R, 0,
    KUBUTA_Y, 0o60, 0o4, 0, 0, true), 0, KUBUTA_V);
  // ⟨ គែមស្លឹករាក់ចុះ 📃 ⟩
  // ⟨ គែមមានរលកតិចលើដៃ 📃 ⟩
  const malprofundeco = 0o3/0o200;
  const manikaMalsupra = kf2SlafTonditanTubon(KUBUTA_R, MANIKA_MALSUPRO, KUBUTA_Y,
    MANIKA_BAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMalsupra, KUBUTA_V, 0o1);
  manikaMalsupra.translate(0, -KUBUTA_Y, 0);
  // ⟨ កែងដៃនៃដៃអាវ 📃 ⟩
  // ⟨ ស្វ៊ែរនៅដូចកែងដៃ 📃 ⟩
  const manikaArtiko = kf2ArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTA_R, 0o7/0o10);
  figurajGeometrioj = {
    // ⟨ គំរូមនុស្ស 📃 ⟩
    kapa,
    vizaĝo,
    vizaĝajStrikoj,
    palpebroj: kf2Palpebrojn(),
    korpo: kf2KorpanTorson(),
    kruroSupra: kruro.teru,
    kruroMalsupra: kruro.malsupra,
    korpaPiedo: kf2KorpanPiedon(),
    brakoSupra: knece.teru,
    brakoMalsupra: knece.malsupra,
    mano: manoj.mano,
    ungoj: manoj.ungoj,
    interna: kf2InternanS2cel2n(),
    // ⟨ គំរូសម្លៀកបំពាក់ 📃 ⟩
    roba: kf2MalfermanRobonS2cel2n(),
    pantalonaSupra: pantalono.teru,
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
