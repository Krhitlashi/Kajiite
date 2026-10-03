// ≺⧼ ជញ្ជាំង និងបង្អួចខាងក្នុង 🧱 ⧽≻
import * as THREE from "three";
import { kreiPilolFenestranFormon, kreiStelanFenestranFormon, rondigiKonturon } from "../../komunajxoj/formoj.js";

export function konstruiMuronKunPilolaTruo(
  g: THREE.Group,
  plataLargho: number,
  bazaY: number,
  alto: number,
  dikeco: number,
  ww: number,
  hh: number,
  fenY: number,
  materialo: THREE.MeshStandardMaterial,
  cx: number,
  cz: number,
  rotacio = 0
): void {
  const wc = ww / 2;
  const fenLokY = fenY - bazaY;
  const segLargho = plataLargho - ww / 2;
  const segAlto = alto - ( fenLokY + hh );

  // ⟨ អ្វីៗសង់ក្នុងក្រុមមូលដ្ឋាន 📃 ⟩
  const grupo = new THREE.Group();
  grupo.position.set(cx, bazaY, cz);
  grupo.rotation.y = rotacio;
  g.add(grupo);

  const aldoniBlokon = ( lokalX: number, lokalY: number, largho: number, alteco: number ) => {
    if ( largho <= 0 || alteco <= 0 ) return;
    const b = new THREE.Mesh(new THREE.BoxGeometry(largho, alteco, dikeco), materialo);
    b.position.set(lokalX + largho / 2, lokalY + alteco / 2, 0);
    grupo.add(b);
  };
  const aldoniAngulon = ( formo: THREE.Shape, cxLoka: number, cyLoka: number ) => {
    const geo = new THREE.ExtrudeGeometry(formo, { depth: dikeco, bevelEnabled: false, curveSegments: 0o20 });
    geo.translate(0, 0, -dikeco / 2);
    const m = new THREE.Mesh(geo, materialo);
    m.position.set(cxLoka, cyLoka, 0);
    grupo.add(m);
  };

  if ( segLargho > 0 ) {
    aldoniBlokon(-plataLargho, 0, segLargho, alto);
    aldoniBlokon(wc, 0, segLargho, alto);
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
  cx: number, cz: number, bazaY: number, alto: number,
  plataLargho: number,
  orientacio: "antaŭ" | "malantaŭ" | "maldekstra" | "dekstra",
  muraMaterialo: THREE.MeshStandardMaterial,
  fenestraMaterialo: THREE.MeshStandardMaterial,
  kadraMaterialo: THREE.MeshStandardMaterial
): void {
  const ww = Math.min(plataLargho * 2 - 0o3/0o10, plataLargho * 4/3 + 0o1/0o4);
  const hh = Math.min(0o5/0o10, alto * 0o23/0o100);
  const fenY = bazaY + Math.max(alto * 2/5, 0o3/0o4);
  if ( fenY + hh > bazaY + alto ) return;
  const malantaŭ = orientacio === "malantaŭ";
  const antaŭ = orientacio === "antaŭ";
  // ⟨ ទិសបួន 📃 ⟩
  const rotacio = orientacio === "dekstra" ? -Math.PI / 2
    : orientacio === "maldekstra" ? Math.PI / 2 : Math.PI;
  const ofseto = 0o3/0o40;
  const aCx = malantaŭ || antaŭ ? cx : cx + ( orientacio === "dekstra" ? -ofseto : ofseto );
  const aCz = malantaŭ ? cz + ofseto : antaŭ ? cz - ofseto : cz;
  const dikeco = 0o3/0o20;
  konstruiMuronKunPilolaTruo(group, plataLargho, bazaY, alto, dikeco, ww, hh, fenY, muraMaterialo, cx, cz, malantaŭ ? 0 : rotacio);
  const fenGeo = new THREE.ShapeGeometry(kreiPilolFenestranFormon(ww, hh), 0o100);
  const fen = new THREE.Mesh(fenGeo, fenestraMaterialo);
  fen.position.set(aCx, fenY, aCz);
  if ( !malantaŭ ) fen.rotation.y = rotacio;
  group.add(fen);
  // ⟨ ស៊ុមផ្កាយដូចបង្អួចខាងក្រៅ 📃 ⟩
  const kadroLargho = 0o1/0o10, kadroDikeco = 0o1/0o20;
  // ⟨ ជញ្ជាំងទទេជុំវិញបង្អួចប៉ុន្មាន 📃 ⟩
  const liberoLonga = plataLargho - ww / 2;
  const liberoMallonga = Math.min(fenY - hh / 2 - bazaY, bazaY + alto - fenY - hh / 2);
  const pintoSupre = hh * 0o1/0o2;
  const pintoFlanko = Math.max(0, Math.min(pintoSupre, liberoLonga - kadroLargho - 0o1/0o100));
  const pintoMallonga = Math.max(0, Math.min(pintoSupre, liberoMallonga - kadroLargho - 0o1/0o100));
  const stelo = rondigiKonturon(
    kreiStelanFenestranFormon(ww, hh, kadroLargho, pintoFlanko, pintoMallonga).getPoints(0o20),
    0o1/0o20);
  const truo = kreiPilolFenestranFormon(ww - 0o1/0o100, hh - 0o1/0o100).getPoints(0o20);
  stelo.holes.push(new THREE.Path(truo.reverse()));
  const kadroGeo = new THREE.ExtrudeGeometry(stelo,
    { depth: kadroDikeco, bevelEnabled: false, curveSegments: 0o10 });
  const kadro = new THREE.Mesh(kadroGeo, kadraMaterialo);
  // ⟨ ការលេចតូចនៅមុខកញ្ចក់ 📃 ⟩
  const elstaro = 0o1/0o100;
  kadro.position.set(
    malantaŭ || antaŭ ? aCx : aCx + ( orientacio === "dekstra" ? -elstaro : elstaro ),
    fenY,
    malantaŭ ? aCz + elstaro : antaŭ ? aCz - elstaro : aCz);
  if ( !malantaŭ ) kadro.rotation.y = rotacio;
  group.add(kadro);
}
