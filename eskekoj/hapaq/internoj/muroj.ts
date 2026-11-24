// ≺⧼ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ ſɟɹ ֭ſɭɹ 🧱 ⧽≻
import * as THREE from "three";
import { kf2Cawez2Qoxa, kf2SexiQoxa, veb6qaiPukaz } from "../../komunajxoj/haqoxa.js";

export function vepaqMuronKunPilolaTruo(
  g: THREE.Group,
  plataLargho: number,
  bazaY: number,
  l6da: number,
  dikeco: number,
  ww: number,
  hh: number,
  fenY: number,
  pukek: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  rotacio = 0
): void {
  const wc = ww / 2;
  const fenLokY = fenY - bazaY;
  const segLargho = plataLargho - ww / 2;
  const segAlto = l6da - ( fenLokY + hh );

  // ⟨ ſɟᴜ j͑ʃᴜ ʌ ſɟɔȝ ʌ j͑ʃᴜ ʌ ſɭɜ ſɭ,w }ʃw 📃 ⟩
  const hate = new THREE.Group();
  hate.position.set(cx, bazaY, cz);
  hate.rotation.y = rotacio;
  g.add(hate);

  const aldoniBlokon = ( lokalX: number, lokalY: number, sefini: number, alteco: number ) => {
    if ( sefini <= 0 || alteco <= 0 ) return;
    const b = new THREE.Mesh(new THREE.BoxGeometry(sefini, alteco, dikeco), pukek);
    b.position.set(lokalX + sefini / 2, lokalY + alteco / 2, 0);
    hate.add(b);
  };
  const aldoniAngulon = ( qoxa: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry(qoxa, { depth: dikeco, bevelEnabled: false, curveSegments: 0o20 });
    geo.translate(0, 0, -dikeco / 2);
    const m = new THREE.Mesh(geo, pukek);
    m.position.set(cxLoka, cyLoka, 0);
    hate.add(m);
  };

  if ( segLargho > 0 ) {
    aldoniBlokon(-plataLargho, 0, segLargho, l6da);
    aldoniBlokon(wc, 0, segLargho, l6da);
  }
  if ( fenLokY > 0 ) aldoniBlokon(-wc, 0, ww, fenLokY);
  if ( segAlto > 0 ) aldoniBlokon(-wc, fenLokY + hh, ww, segAlto);

  const r = hh / 2;
  const cyArk = fenLokY + r;
  const tr = new THREE.Shape();
  tr.moveTo(r / 2, -r / 2);
  tr.lineTo(r / 2, r / 2);
  tr.lineTo(-r / 2, r / 2);
  tr.absarc(-r / 2, -r / 2, r, Math.PI / 2, 0, true);
  tr.closePath();
  aldoniAngulon(tr, wc - r / 2, cyArk + r / 2);
  const br = new THREE.Shape();
  br.moveTo(r / 2, r / 2);
  br.lineTo(r / 2, -r / 2);
  br.lineTo(-r / 2, -r / 2);
  br.absarc(-r / 2, r / 2, r, -Math.PI / 2, 0, false);
  br.closePath();
  aldoniAngulon(br, wc - r / 2, cyArk - r / 2);
  const tl = new THREE.Shape();
  tl.moveTo(-r / 2, -r / 2);
  tl.lineTo(-r / 2, r / 2);
  tl.lineTo(r / 2, r / 2);
  tl.absarc(r / 2, -r / 2, r, Math.PI / 2, Math.PI, false);
  tl.closePath();
  aldoniAngulon(tl, -( wc - r / 2 ), cyArk + r / 2);
  const bl = new THREE.Shape();
  bl.moveTo(-r / 2, r / 2);
  bl.lineTo(-r / 2, -r / 2);
  bl.lineTo(r / 2, -r / 2);
  bl.absarc(r / 2, r / 2, r, -Math.PI / 2, -Math.PI, true);
  bl.closePath();
  aldoniAngulon(bl, -( wc - r / 2 ), cyArk - r / 2);
}

export function aldoniLonganFenestron(
  group: THREE.Group,
  cx: number, cz: number, bazaY: number, l6da: number,
  plataLargho: number,
  orientacio: "ne3ak2" | "neteru" | "maldekstra" | "dekstra",
  muraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  joqaMaterialo: THREE.MeshStandardMaterial
): void {
  const ww = Math.min(plataLargho * 2 - 0o3/0o10, plataLargho * 4/3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, l6da * 0o23/0o100);
  const fenY = bazaY + Math.max(l6da * 2/5, 0o3/0o4);
  if ( fenY + hh > bazaY + l6da ) return;
  const neteru = orientacio === "neteru";
  const ne3ak2 = orientacio === "ne3ak2";
  // ⟨ ſɟɹ ᶅſɹȝ ʌ ɭʃᴜ 📃 ⟩
  const rotacio = orientacio === "dekstra" ? -Math.PI / 2
    : orientacio === "maldekstra" ? Math.PI / 2 : Math.PI;
  const ofseto = 0o3/0o40;
  const aCx = neteru || ne3ak2 ? cx : cx + ( orientacio === "dekstra" ? -ofseto : ofseto );
  const aCz = neteru ? cz + ofseto : ne3ak2 ? cz - ofseto : cz;
  const dikeco = 0o3/0o20;
  vepaqMuronKunPilolaTruo(group, plataLargho, bazaY, l6da, dikeco, ww, hh, fenY, muraMaterialo, cx, cz, neteru ? 0 : rotacio);
  const fenGeo = new THREE.ShapeGeometry(kf2Cawez2Qoxa(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
  fen.position.set(aCx, fenY, aCz);
  if ( !neteru ) fen.rotation.y = rotacio;
  group.add(fen);
  // ⟨ j͑ʃɔ ı],ꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃᴜ jᷠᴜ 📃 ⟩
  const joqaLargho = 0o1/0o10, joqaDikeco = 0o1/0o20;
  // ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
  const liberoLonga = plataLargho - ww / 2;
  const liberoMallonga = Math.min(fenY - hh / 2 - bazaY, bazaY + l6da - fenY - hh / 2);
  const pintoSupre = hh * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - joqaLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre, liberoMallonga - joqaLargho - 0o1/0o100));
  const stelo = veb6qaiPukaz(
    kf2SexiQoxa(ww, hh, joqaLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    0o1/0o20);
  const truo = kf2Cawez2Qoxa(ww - 0o1/0o100, hh - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const joqaGeo = new THREE.ExtrudeGeometry(stelo,
    { depth: joqaDikeco, bevelEnabled: false, curveSegments: 0o10 });
  const joqa = new THREE.Mesh(joqaGeo, joqaMaterialo);
  // ⟨ ſ͕ɭᴜ ʃэ ɭʃɔ ŋᷠɹ ʌ ſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
  const elstaro = 0o1/0o100;
  joqa.position.set(
    neteru || ne3ak2 ? aCx : aCx + ( orientacio === "dekstra" ? -elstaro : elstaro ),
    fenY,
    neteru ? aCz + elstaro : ne3ak2 ? aCz - elstaro : aCz);
  if ( !neteru ) joqa.rotation.y = rotacio;
  group.add(joqa);
}
