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

// ⟨ ſ͕ɭɜ ı],ᴜ ʌ ſɭᴜ ſןᴜ , ⟅ ⟩
// ⟨ ſɭᴜ ſןᴜ , ꞙɭı , ⟅ ⟩

// ⟨ ſɭᴜ ſ͕ȷɔ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
let figurajGeometrioj: {
  kapa: THREE.BufferGeometry;
  vizaĝo: THREE.BufferGeometry;
  vizaĝajStrikoj: THREE.BufferGeometry;
  palpebroj: THREE.BufferGeometry;
  korpo: THREE.BufferGeometry;
// ⟨ ſɭᴜ ſ͕ȷɔ , ꞙɭɿ , ⟅ ⟩
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

  // ⟨ ſɭэ ɭʃᴜ , ⟅ ⟩
  const wopo = kf2KapanKranion();
  // ⟨ ɭʃᴜ , ꞙɭı , ⟅ ⟩
  const kolo = new THREE.CylinderGeometry(0o56/0o1000, 0o71/0o1000, 0o5/0o40, 0o14, 0o1);
  kolo.translate(0, KOLO_Y, 0);
  const kapajPartoj: THREE.BufferGeometry[] = [ wopo, kolo ];
  // ⟨ ɭʃɜ ſɭɹȝ , ſɟɔȝ , ⟅ ⟩
  for ( const dir of [ -0o1, 0o1 ] ) kapajPartoj.push(kf2Orelon(dir));
  // ⟨ j͑ʃɹ ŋᷠɹ , ɭʃᴜ , ⟅ ⟩
  kapajPartoj.push(kf2Nazon());
  const kapa = kunfandiGeometriojn(kapajPartoj);

  // ⟨ j͑ʃᴜ ʃɜƽ , ɭʃɜ ſɭɹȝ , ⟅ ⟩
  // ⟨ ɭʃɹ ʃᴜ }ʃw , ⟅ ⟩
  // ⟨ ſᶘɔ ʌ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ ꞙɭɔ , ⟅ ⟩
  const okuloj: THREE.BufferGeometry[] = [
    kf2Okulon(-0o1, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI, T2BANU_ALTO, -0o1/0o10),
    kf2Okulon(0o1, T2BANU_DX, T2BANU_DY, T2BANU_DZ, T2BANU_SEFINI, T2BANU_ALTO, 0o1/0o10),
  ];
  // ⟨ ᶅſэ ſ͕ɭᴜ , ſ͕ɭɜ ı],ᴜ ʌ ɭʃɜ ſɭɹȝ , ⟅ ⟩
  const vizaĝo = kunfandiGeometriojn([ ...okuloj, kf2Buŝon() ]);
  // ⟨ ſ̀ȷᴜ ſɟɔ ɭʃɹ ʃᴜ }ʃw j͑ʃᴜꞇ , ⟅ ⟩
  const vizaĝajStrikoj = kf2VizaĝajnStrikojn();

  // ⟨ ſןᴜ ɭʃэ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  const { boto, akcentaj } = kf2Botan();

  // ⟨ ɭʃꞇƽ , ⟅ ⟩
  const kruro = kf2KorpanKruropon();
  const knece = kf2KorpanBrakon();
  const pantalono = kf2Pantalonan();
  // ⟨ ɭʃꞇƽ , ſɟᴜ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ , ⟅ ⟩
  const manoj = kf2KorpanManon();
  // ⟨ j͑ʃɜȝ ɭʃɔ , ſɭᴜc̭ ſɟɹƽ , ⟅ ⟩
  // ⟨ ꞙɭɿ , UV , ꞙɭı , ⟅ ⟩
  const MANIKA_SUPRO = 0o11/0o200;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ɭʃꞇƽ , ⟅ ⟩
  const MANIKA_MALSUPRO = 0o50/0o1000;
  const KUBUTA_Y = KUBUTO_Y;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ɔ.ɿꞟ , ſɭᴜc̭ ſɟɹƽ , ꞙɭı , ⟅ ⟩
  const MANUMO_MALSUPRO = 0o1/0o4;
  const MANIKA_BAZO = KUBUTA_Y - MANUMO_MALSUPRO;
  const KUBUTA_V = KUBUTA_Y / MANIKA_BAZO;
  // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ꞙɭı , ⟅ ⟩
  const KUBUTA_R = MANIKA_SUPRO + ( MANIKA_MALSUPRO - MANIKA_SUPRO ) * 0o1/0o4;
  const manikaSupra = remapiUVon(kf2SlafTonditanTubon(MANIKA_SUPRO, KUBUTA_R, 0,
    KUBUTA_Y, 0o60, 0o4, 0, 0, true), 0, KUBUTA_V);
  // ⟨ j͑ʃͷ̗ᴜʞ , j͑ʃᴜ ʃɜ , ſɭɜ ſɭᴜƽ , ⟅ ⟩
  // ⟨ ı],э ŋᷠꞇ , ꞙɭı , ɭʃꞇƽ , ⟅ ⟩
  const malprofundeco = 0o3/0o200;
  const manikaMalsupra = kf2SlafTonditanTubon(KUBUTA_R, MANIKA_MALSUPRO, KUBUTA_Y,
    MANIKA_BAZO, 0o60, 0o4, malprofundeco, 0o10/0o1000, false);
  remapiUVon(manikaMalsupra, KUBUTA_V, 0o1);
  manikaMalsupra.translate(0, -KUBUTA_Y, 0);
  // ⟨ ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
  // ⟨ ꞙɭı , ɭʃᴜʞ ꞁȷ̀ᴜ }ʃꞇ ɭʃᴜc̭ ſɟɔ j͑ʃᴜꞇ , ⟅ ⟩
  const manikaArtiko = kf2ArtikanSferon([ 0, 0, -0o3/0o1000 ], KUBUTA_R, 0o7/0o10);
  figurajGeometrioj = {
    // ⟨ ſɭᴜ ſ͕ȷɔ , ⟅ ⟩
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
    // ⟨ j͑ʃɜȝ ɭʃɔ , ⟅ ⟩
    roba: kf2MalfermanRobonS2cel2n(),
    pantalonaSupra: pantalono.teru,
    pantalonaMalsupra: pantalono.malsupra,
    boto,
    akcenta: akcentaj,
    // ⟨ j͑ʃɜȝ ɭʃɔ , j͑ʃᴜ ֭ſɭᴜƽ ɭʃɔ , ⟅ ⟩
    // ⟨ j͑ʃɜȝ ɭʃɔ , ꞙɭɔ , ɭʃꞇƽ , ⟅ ⟩
    manikaSupra,
    manikaMalsupra: kunfandiGeometriojn([ manikaMalsupra, manikaArtiko ]),
  };
  return figurajGeometrioj;
}
