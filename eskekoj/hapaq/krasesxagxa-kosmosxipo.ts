// ≺⧼ ſ̀ȷᴜ }ʃɔ ᶅſɜ ſɭˬᴜ j͑ʃɔ ı],ᴜƴ 🚀 ⧽≻
import * as THREE from "three";
import { aldoniPilolFenestron, fenestraMargxeno } from "./satalaj/fenestroj.js";
import { kf2JoqanKkaxten } from "./satalaj/enirejo.js";
import { MURA_KLINO } from "./satalaj/haqoxa.js";
import { preniTavolajnGeometriojn, tavolajHavem2 } from "./satalaj-hapaq.js";
import { kunfandiGeometriojn } from "../komunajxoj/kunfandajxoj.js";
import { sax0baPukazQan2kS2qena } from "../komunajxoj/haqoxa.js";
import { kf2Cah6k6Pukek } from "../komunajxoj/materialoj.js";


// ⟪ រង្វាស់យាន 📏 ⟫
// ⟨ ស្រទាប់ដូចអគារ 📃 ⟩
// យានប្រើទទឹង កម្ពស់ស្រទាប់ និងជម្រាលដូចផ្ទះ ដូច្នេះស្រទាប់ និង
// បង្អួចរបស់វាមានចន្លោះដូចអគារក្នុងទីក្រុង។
export const SXIPA_LARGO = 0o10;
export const SXIPA_TIERO = 0o315/0o100;
export const SXIPA_NIVELOJ = 0o5;

// ⟨ ទម្រង់ទ្វារពីរ 📃 ⟩
// ⟨ ហេតុអ្វីមិននាឡិកាខ្សាច់ 📃 ⟩
function rondigitaDupordaQoxa(blokoLargho: number, tw: number, eh: number,
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
  pordaXekuxa: THREE.Vector3;
  doorDir: THREE.Vector3;
}

export function vepaqKrasesxagxon(qena: THREE.Scene,
  x: number, y: number, z: number,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial
): Krasesxagxo {
  const group = new THREE.Group();
  const up = SXIPA_NIVELOJ, down = up;
  const tieroAlto = SXIPA_TIERO;
  const klino = MURA_KLINO;
  const hw0 = SXIPA_LARGO / 2;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 0o33/0o100, metalness: 0o5/0o100, envMapIntensity: 0o23/0o40,
  });
  // ⟨ កញ្ចក់ដូចទីក្រុង 📃 ⟩
  const fenestraMaterialo = kf2Cah6k6Pukek();

  // ⟨ ស្រទាប់ដូចអគារ 📃 ⟩
  // ⟨ ស្រទាប់ក្រោមជារូបឆ្លុះ 📃 ⟩
  const hateru = preniTavolajnGeometriojn("spacosxipo", SXIPA_LARGO, SXIPA_LARGO, up, tieroAlto);
  const subajMuroj = hateru.muroj.clone().rotateX(Math.PI);
  const subajJoqaj = hateru.hajoqa.clone().rotateX(Math.PI);

  const muroj = new THREE.Mesh(kunfandiGeometriojn([ hateru.muroj, subajMuroj ]), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn([ hateru.hajoqa, subajJoqaj ]), oraMaterialo));

  const pordaBlokaLargho = 0o233 / 0o100;
  const pordaSupraLargho = pordaBlokaLargho * 0o45 / 0o100;
  const pordaAlto = 0o11 / 0o4;
  const pordQoxa = rondigitaDupordaQoxa(pordaBlokaLargho, pordaSupraLargho, pordaAlto, 0o1/0o4);
  // ⟨ ទ្វារកម្រាស់ដូចអគារ 📃 ⟩
  const pordDikeco = 0o7/0o100, pordBevelo = 0o1/0o40;
  const pordDikecoTuta = pordDikeco + pordBevelo * 2;
  // ⟨ កន្លែងប្លង់ទ្វារនៅ 📃 ⟩
  const pordaRadiuso = hw0 - 0o1/0o100;
  // ⟨ ខ្សែមាសកណ្តាល ៖ តែលើផ្ទៃទ្វារប៉ុណ្ណោះ , មិនព័ទ្ធជុំវិញយានទេ ។ វាខ្ពស់ជាង
  // គែមស្រទាប់ ដើម្បីឲ្យឃើញច្បាស់លើផ្ទៃទ្វារ , ហើយកាត់ស្លឹកទ្វារជាពីរ ។ 📃 ⟩
  const CENTRA_RANDO_ALTO = 0o11/0o100;
  const CENTRA_RANDO_LARGO = 0o233/0o100 + 0o5/0o100;
  const CENTRA_RANDO_DIKECO = 0o12/0o100;
  const centraRadiuso = pordaRadiuso + pordDikeco / 2 + pordBevelo / 2;
  const centraGeometrio = new THREE.BoxGeometry(CENTRA_RANDO_LARGO, CENTRA_RANDO_ALTO,
    CENTRA_RANDO_DIKECO);
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(pordQoxa, {
      depth: pordDikeco, bevelEnabled: true, bevelSize: pordBevelo, bevelThickness: pordBevelo,
      bevelSegments: 2, curveSegments: 0o20,
    });
    // ⟨ មុខ trapeza ទាំងពីរទទួល uv ដាច់ដោយឡែក ដូច្នេះផ្នែកខាងក្រោមមិនបញ្ច្រាសខ្សែកោង 📃 ⟩
    sax0baPukazQan2kS2qena(enirejaGeometrio, [
      [ -pordaAlto, pordaSupraLargho ], [ 0, pordaBlokaLargho ],
      [ pordaAlto, pordaSupraLargho ],
    ]);
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(enirejaMreto);

    // ⟨ វណ្ឌវង្កមាស 📃 ⟩
    const joqaKkaxte = kf2JoqanKkaxten(pordQoxa, pordDikeco / 2);
    const ornamo = new THREE.Mesh(new THREE.TubeGeometry(joqaKkaxte, 0o200, pordDikecoTuta / 2, 0o14, true),
      oraMaterialo);
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set(Math.sin(f * Math.PI / 2) * pordaRadiuso, 0,
      Math.cos(f * Math.PI / 2) * pordaRadiuso);
    group.add(ornamo);

    // ⟨ ខ្សែកណ្តាល ៖ រត់កាត់ទ្វារនេះ ។ វាលាតហួសគែមទ្វារបន្តិច ហើយចេញហួស
    // ផ្ទៃទ្វារ ដូច្នេះឃើញច្បាស់ជាខ្សែមួយ ។ 📃 ⟩
    const centra = new THREE.Mesh(centraGeometrio, oraMaterialo);
    centra.rotation.y = f * Math.PI / 2;
    centra.position.set(Math.sin(f * Math.PI / 2) * centraRadiuso, 0,
      Math.cos(f * Math.PI / 2) * centraRadiuso);
    group.add(centra);
  }

  // ⟨ បង្អួច 📃 ⟩
  // ⟨ ចន្លោះដូចអគារ 📃 ⟩
  const fenAlto = Math.min(0o5/0o10, tieroAlto * 0o23/0o100);
  const facoPlejLarga = hw0 - klino / 2;
  const fenMargxeno = fenestraMargxeno(facoPlejLarga);
  const havem2 = tavolajHavem2(SXIPA_LARGO, SXIPA_LARGO, up, tieroAlto);
  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( let i = 1; i < up; i++ ) {
    const faco = havem2[i].hw - klino / 2;
    // ⟨ រង្វង់តូចពេក 📃 ⟩
    const horizontala = faco * 2 - fenMargxeno * 2 >= fenAlto;
    if ( !horizontala && faco < fenAlto * 0o1/0o2 + 0o1/0o10 ) continue;
    const hax2pa: { y: number; psaz: boolean }[] = [ { y: havem2[i].y + tieroAlto / 2, psaz: false } ];
    if ( i < down ) hax2pa.push({ y: -havem2[i].y - tieroAlto / 2, psaz: true });
    for ( const x2pa of hax2pa ) for ( let f = 0; f < 4; f++ ) {
      fenestrajMretoj.push(aldoniPilolFenestron(group, oraMaterialo, fenestraMaterialo,
        f, x2pa.y, faco, klino, tieroAlto, fenAlto, x2pa.psaz,
        horizontala ? fenMargxeno : undefined, !horizontala));
    }
  }

  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaXekuxa = new THREE.Vector3(dir.x * ( hw0 + 0o20/0o10 ), 0,
    dir.z * ( hw0 + 0o20/0o10 ));

  group.position.set(x, y, z);
  qena.add(group);

  return { group, windows: fenestrajMretoj, pordaXekuxa, doorDir: dir.clone() };
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
