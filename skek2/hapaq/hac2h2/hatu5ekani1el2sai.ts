// ≺⧼ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ ſɟɹ ֭ſɭɹ 🧱 ⧽≻
import * as THREE from "three";
import { kf2Cawez2Qoxa, kf2SexiQoxa, veb6qaiPukaz } from "../../x2x2q/haqoxa.js";

export function vepaqTu5ekani1el2saiKunPilolaTruo(
  g: THREE.Group,
  tap2Sefini: number,
  kozunuY: number,
  l6da: number,
  kof: number,
  ww: number,
  hh: number,
  fenY: number,
  pukek: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  s2sabo = 0
): void {
  const wc = ww / 2;
  const fenLokY = fenY - kozunuY;
  const segSefini = tap2Sefini - ww / 2;
  const segL6da = l6da - ( fenLokY + hh );

  // ⟨ ſɟᴜ j͑ʃᴜ ʌ ſɟɔȝ ʌ j͑ʃᴜ ʌ ſɭɜ ſɭ,w }ʃw 📃 ⟩
  const hate2 = new THREE.Group();
  hate2.position.set(cx, kozunuY, cz);
  hate2.rotation.y = s2sabo;
  g.add(hate2);

  const tlunakBlokon = ( lokalX: number, lokalY: number, sefini: number, l6da: number ) => {
    if ( sefini <= 0 || l6da <= 0 ) return;
    const b = new THREE.Mesh(new THREE.BoxGeometry(sefini, l6da, kof), pukek);
    b.position.set(lokalX + sefini / 2, lokalY + l6da / 2, 0);
    hate2.add(b);
  };
  const tlunakAngulon = ( qoxa: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry(qoxa, { depth: kof, bevelEnabled: false, curveSegments: 0o20 });
    geo.translate(0, 0, -kof / 2);
    const m = new THREE.Mesh(geo, pukek);
    m.position.set(cxLoka, cyLoka, 0);
    hate2.add(m);
  };

  if ( segSefini > 0 ) {
    tlunakBlokon(-tap2Sefini, 0, segSefini, l6da);
    tlunakBlokon(wc, 0, segSefini, l6da);
  }
  if ( fenLokY > 0 ) tlunakBlokon(-wc, 0, ww, fenLokY);
  if ( segL6da > 0 ) tlunakBlokon(-wc, fenLokY + hh, ww, segL6da);

  const r = hh / 2;
  const cyArk = fenLokY + r;
  const tr = new THREE.Shape();
  tr.moveTo(r / 2, -r / 2);
  tr.lineTo(r / 2, r / 2);
  tr.lineTo(-r / 2, r / 2);
  tr.absarc(-r / 2, -r / 2, r, Math.PI / 2, 0, true);
  tr.closePath();
  tlunakAngulon(tr, wc - r / 2, cyArk + r / 2);
  const br = new THREE.Shape();
  br.moveTo(r / 2, r / 2);
  br.lineTo(r / 2, -r / 2);
  br.lineTo(-r / 2, -r / 2);
  br.absarc(-r / 2, r / 2, r, -Math.PI / 2, 0, false);
  br.closePath();
  tlunakAngulon(br, wc - r / 2, cyArk - r / 2);
  const tl = new THREE.Shape();
  tl.moveTo(-r / 2, -r / 2);
  tl.lineTo(-r / 2, r / 2);
  tl.lineTo(r / 2, r / 2);
  tl.absarc(r / 2, -r / 2, r, Math.PI / 2, Math.PI, false);
  tl.closePath();
  tlunakAngulon(tl, -( wc - r / 2 ), cyArk + r / 2);
  const bl = new THREE.Shape();
  bl.moveTo(-r / 2, r / 2);
  bl.lineTo(-r / 2, -r / 2);
  bl.lineTo(r / 2, -r / 2);
  bl.absarc(r / 2, r / 2, r, -Math.PI / 2, -Math.PI, true);
  bl.closePath();
  tlunakAngulon(bl, -( wc - r / 2 ), cyArk - r / 2);
}

export function tlunakSahakananCah6k6(
  group: THREE.Group,
  cx: number, cz: number, kozunuY: number, l6da: number,
  tap2Sefini: number,
  orientacio: "ne3ak2" | "neteru" | "maldekstra" | "dekstra",
  muraPukek: THREE.MeshStandardMaterial,
  fenestraPukek: THREE.MeshStandardMaterial,
  joqaPukek: THREE.MeshStandardMaterial
): void {
  const ww = Math.min(tap2Sefini * 2 - 0o3/0o10, tap2Sefini * 4/3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, l6da * 0o23/0o100);
  const fenY = kozunuY + Math.max(l6da * 2/5, 0o3/0o4);
  if ( fenY + hh > kozunuY + l6da ) return;
  const neteru = orientacio === "neteru";
  const ne3ak2 = orientacio === "ne3ak2";
  // ⟨ ſɟɹ ᶅſɹȝ ʌ ɭʃᴜ 📃 ⟩
  const s2sabo = orientacio === "dekstra" ? -Math.PI / 2
    : orientacio === "maldekstra" ? Math.PI / 2 : Math.PI;
  const ofseto = 0o3/0o40;
  const aCx = neteru || ne3ak2 ? cx : cx + ( orientacio === "dekstra" ? -ofseto : ofseto );
  const aCz = neteru ? cz + ofseto : ne3ak2 ? cz - ofseto : cz;
  const kof = 0o3/0o20;
  vepaqTu5ekani1el2saiKunPilolaTruo(group, tap2Sefini, kozunuY, l6da, kof, ww, hh, fenY, muraPukek, cx, cz, neteru ? 0 : s2sabo);
  const fenGeo = new THREE.ShapeGeometry(kf2Cawez2Qoxa(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraPukek);
  fen.position.set(aCx, fenY, aCz);
  if ( !neteru ) fen.rotation.y = s2sabo;
  group.add(fen);
  // ⟨ j͑ʃɔ ı],ꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ ʌ j͑ʃᴜ jᷠᴜ 📃 ⟩
  const joqaSefini = 0o1/0o10, joqaKof = 0o1/0o20;
  // ⟨ ɭʃw ſɭˬɔƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɟᴜ ֭ſɭэ ſɭэ 📃 ⟩
  const liberoSahakani = tap2Sefini - ww / 2;
  const liberoC2na = Math.min(fenY - hh / 2 - kozunuY, kozunuY + l6da - fenY - hh / 2);
  const cet2Tik = hh * 0o1/0o2;
  const cet2Flanko = Math.max(0, Math.min(cet2Tik, liberoSahakani - joqaSefini - 0o1/0o100));
  const cet2C2na = Math.max(0, Math.min(cet2Tik, liberoC2na - joqaSefini - 0o1/0o100));
  const sexi = veb6qaiPukaz(
    kf2SexiQoxa(ww, hh, joqaSefini, cet2Flanko, cet2C2na).getPoints(0o20),
    0o1/0o20);
  const truo = kf2Cawez2Qoxa(ww - 0o1/0o100, hh - 0o1/0o100).getPoints(0o20);
  sexi.holes.push(new THREE.Path(truo.reverse()));
  const joqaGeo = new THREE.ExtrudeGeometry(sexi,
    { depth: joqaKof, bevelEnabled: false, curveSegments: 0o10 });
  const joqa = new THREE.Mesh(joqaGeo, joqaPukek);
  // ⟨ ſ͕ɭᴜ ʃэ ɭʃɔ ŋᷠɹ ʌ ſןɔ ſ͕ɭɔ }ʃꞇ 📃 ⟩
  const santa = 0o1/0o100;
  joqa.position.set(
    neteru || ne3ak2 ? aCx : aCx + ( orientacio === "dekstra" ? -santa : santa ),
    fenY,
    neteru ? aCz + santa : ne3ak2 ? aCz - santa : aCz);
  if ( !neteru ) joqa.rotation.y = s2sabo;
  group.add(joqa);
}
