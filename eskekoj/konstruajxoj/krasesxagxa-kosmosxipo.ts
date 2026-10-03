// ≺⧼ យានអវកាសគ្រោះថ្នាក់ 🚀 ⧽≻
import * as THREE from "three";
import { aldoniKadranTubon } from "./satalaj/pilieroj.js";
import { aldoniPilolFenestron, fenestraMargxeno } from "./satalaj/fenestroj.js";
import { kreiKlinoTavolon } from "./satalaj/formoj.js";
import { kreiKadranKurbon } from "./satalaj/enirejo.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { kreiFenestranMaterialon } from "../komunajxoj/materialoj.js";

// ⟨ ទម្រង់ទ្វារពីរ 📃 ⟩
// ⟨ ហេតុអ្វីមិននាឡិកាខ្សាច់ 📃 ⟩
function rondigitaDupordaFormo(blokoLargho: number, tw: number, eh: number,
  r: number): THREE.Shape {
  const s = new THREE.Shape();
  const hb = blokoLargho / 2, ht = tw / 2;
  const sl = ( hb - ht ) / eh;
  const d = sl * r;
  s.moveTo(-ht + r, -eh);
  s.lineTo(ht - r, -eh);
  s.quadraticCurveTo(ht, -eh, ht + d, -eh + r);
  s.lineTo(hb - d, -r);
  s.quadraticCurveTo(hb, 0, hb - d, r);
  s.lineTo(ht + d, eh - r);
  s.quadraticCurveTo(ht, eh, ht - r, eh);
  s.lineTo(-ht + r, eh);
  s.quadraticCurveTo(-ht, eh, -ht - d, eh - r);
  s.lineTo(-hb + d, r);
  s.quadraticCurveTo(-hb, 0, -hb + d, -r);
  s.lineTo(-ht - d, -eh + r);
  s.quadraticCurveTo(-ht, -eh, -ht + r, -eh);
  s.closePath();
  return s;
}

export interface Krasesxagxo {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaPozicio: THREE.Vector3;
  doorDir: THREE.Vector3;
}

export function konstruiKrasesxagxon(sceno: THREE.Scene,
  x: number, y: number, z: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial
): Krasesxagxo {
  const group = new THREE.Group();
  const tieroAlto = 0o163/0o40, up = 5, down = up, hw0 = 4;
  const ins = ( 4 - 0o123/0o100 ) / 4;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 0o33/0o100, metalness: 0o5/0o100, envMapIntensity: 0o23/0o40,
  });
  // ⟨ កញ្ចក់ដូចទីក្រុង 📃 ⟩
  const fenestraMaterialo = kreiFenestranMaterialon();

  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  const klino = 0o5/0o20;
  for ( let i = 0; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const yB = i * tieroAlto, yT = yB + tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw, hw, hw - klino, hw - klino, tieroAlto).translate(0, yB + tieroAlto / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yB, yT, a, b, true, klino);
    }
  }
  for ( let j = 1; j <= down; j++ ) {
    const hw = hw0 - ( j - 1 ) * ins;
    const yTop = -( j - 1 ) * tieroAlto, yBot = -j * tieroAlto;
    murajGeometrioj.push(kreiKlinoTavolon(hw - klino, hw - klino, hw, hw, tieroAlto).translate(0, ( yTop + yBot ) / 2, 0));
    for ( const a of [ -1, 1 ] ) for ( const b of [ -1, 1 ] ) {
      aldoniKadranTubon(kadrajGeometrioj, a * hw, b * hw, yBot, yTop, a, b, false, klino);
    }
  }

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), oraMaterialo));

  const pordFormo = rondigitaDupordaFormo(0o233/0o100, 0o233/0o100 * 0o45/0o100, 0o11/0o4, 0o1/0o4);
  // ⟨ ទ្វារកម្រាស់ដូចអគារ 📃 ⟩
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  // ⟨ កន្លែងប្លង់ទ្វារនៅ 📃 ⟩
  const pordaRadiuso = hw0 - 0o1/0o100;
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(pordFormo, {
      depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo,
      bevelSegments: 2, curveSegments: 0o20,
    });
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(enirejaMreto);

    // ⟨ វណ្ឌវង្កមាស 📃 ⟩
    const kadraKurbo = kreiKadranKurbon(pordFormo, pordDikeco / 2);
    const ornamo = new THREE.Mesh(new THREE.TubeGeometry(kadraKurbo, 0o200, pordDikecoTuta / 2, 0o14, true),
      oraMaterialo);
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(ornamo);
  }

  // ⟨ បង្អួច 📃 ⟩
  // ⟨ បង្អួចយានធំជាងបន្តិច 📃 ⟩
  const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100) * 0o11/0o10;
  const niveloj: { y: number; faco: number; suba: boolean }[] = [];
  for ( let i = 1; i < up; i++ ) {
    niveloj.push({ y: i * tieroAlto + tieroAlto / 2, faco: hw0 - i * ins - klino / 2, suba: false });
  }
  for ( let j = 2; j <= down; j++ ) {
    niveloj.push({ y: -j * tieroAlto + tieroAlto / 2, faco: hw0 - ( j - 1 ) * ins - klino / 2, suba: true });
  }
  // ⟨ លេខរឹមមួយសម្រាប់យានទាំងមូល 📃 ⟩
  const facoPlejLarga = hw0 - ins - klino / 2;
  const fenMargxeno = fenestraMargxeno(facoPlejLarga) * 0o3/0o4;
  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( const lv of niveloj ) {
    // ⟨ រង្វង់តូចពេក 📃 ⟩
    const horizontala = lv.faco * 2 - fenMargxeno * 2 >= fenAlto;
    if ( !horizontala && lv.faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
    for ( let f = 0; f < 4; f++ ) {
      fenestrajMretoj.push(aldoniPilolFenestron(group, oraMaterialo, fenestraMaterialo,
        f, lv.y, lv.faco, klino, tieroAlto, fenAlto, lv.suba,
        horizontala ? fenMargxeno : undefined, !horizontala));
    }
  }

  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaPozicio = new THREE.Vector3(dir.x * ( hw0 + 0o20/0o10 ), 0,
    dir.z * ( hw0 + 0o20/0o10 ));

  group.position.set(x, y, z);
  sceno.add(group);

  return { group, windows: fenestrajMretoj, pordaPozicio, doorDir: dir.clone() };
}

export function animaciiKrasesxagxon(ship: Krasesxagxo,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    if ( ship.group.userData.bazaY === undefined ) {
      ship.group.userData.bazaY = ship.group.position.y;
    }
    ship.group.position.y = ( ship.group.userData.bazaY as number ) + Math.sin(t * 0o23/0o100) * 0o1/0o20;
  }
  ship.group.rotation.y += 0o0/0o10;
  ship.group.rotation.z = Math.sin(t * 0o2/0o10) * 0o1/0o40;

  if ( isFlying ) {
    const pulso = 0o23/0o100 + 0o15/0o100 * Math.sin(t * 3);
    const fenestraMaterialo = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraMaterialo ) {
      fenestraMaterialo.emissiveIntensity = 0o15/0o40 + pulso;
    }
  }
}

export function komenciFlugon(ship: Krasesxagxo,
  onProgress: ( pct: number ) => void,
  onComplete: () => void
): () => void {
  const dauxro = 0o40/0o10;
  const komencaTempo = performance.now() / 0o1740;
  const komencaY = ship.group.position.y;
  const celaY = komencaY + 0o110;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = komencaY; return; }
    const pasinta = performance.now() / 0o1740 - komencaTempo;
    const t = Math.min(1, pasinta / dauxro);
    const mildigita = t < 0o4/0o10 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = komencaY + ( celaY - komencaY ) * mildigita;
    ship.group.rotation.y += 0o3/0o100;
    onProgress(mildigita);

    if ( t < 1 ) {
      requestAnimationFrame(tiktako);
    } else {
      onComplete();
      ship.group.position.y = komencaY;
    }
  }

  requestAnimationFrame(tiktako);
  return () => { nuligita = true; };
}
