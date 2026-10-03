// ≺⧼ ស្ពាន 🌉 ⧽≻
import * as THREE from "three";
import { aldoniKadranTubon } from "../../konstruajxoj/satalaj/pilieroj.js";
import { kunfandiGeometriojn } from "../../komunajxoj/kunfandajxoj.js";
import { VOJA_BORDA_LARĜO, VOJA_DIKECO } from "../vojoj/mezuroj.js";

// ⟨ នាំចូល មិនចម្លង 📃 ⟩
export const PONT_DEKA_DIKECO = VOJA_DIKECO;

export const PONT_FINA_LEVIGXO = PONT_DEKA_DIKECO;

// ⟨ ភាពច្បាស់ទូក 📃 ⟩
export const PONT_POL_LEVIGXO = 0o3/0o2;

export function pontaDeko(t: number, ay: number, by: number): number {
  return ay + ( by - ay ) * t;
}

export function pontaPolSupro(t: number, dekaY: number, polAlto: number,
  levigxo = PONT_POL_LEVIGXO): number {
  return dekaY + polAlto + levigxo * Math.sin(Math.PI * t);
}

export function konstruiPonton(
  sceno: THREE.Scene,
  ax: number, az: number, ay: number,
  bx: number, bz: number, by: number,
  largho: number,
  heightFn: ( x: number, z: number ) => number,
  cxuAkvo: ( x: number, z: number ) => boolean,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  oraMaterialo: THREE.MeshStandardMaterial
): void {
  const longo = Math.hypot(bx - ax, bz - az);
  if ( longo < 0o1/0o10 ) return;
  const direkto = Math.atan2(bx - ax, bz - az);
  // ⟨ ទទឹងនៃដប់ 📃 ⟩
  const duon = largho / 4 + VOJA_BORDA_LARĜO;
  // ⟨ ម៉ាស់ធ្នូជាសក់ធំជាងដប់ 📃 ⟩
  const masaDuono = duon + 0o1/0o500;
  const bendoX = largho / 4 + 0o1/0o10;
  const grupo = new THREE.Group();
  grupo.position.set(ax, 0, az);
  grupo.rotation.y = direkto;
  const cosR = Math.cos(direkto), sinR = Math.sin(direkto);
  const mondaX = (lx: number, lz: number) => ax + cosR * lx + sinR * lz;
  const mondaZ = (lx: number, lz: number) => az - sinR * lx + cosR * lz;
  const dekaDikeco = PONT_DEKA_DIKECO;
  const arko = (t: number) => pontaDeko(t, ay, by);
  // ⟨ របារមាស 📃 ⟩
  const polAlto = 0o13/0o20;
  const poloj = Math.max(0o5, Math.round(longo / 0o25/0o10) + 1);
  const polX = bendoX;
  const geos: THREE.BufferGeometry[] = [];
  for ( const sX of [ -1, 1 ] ) {
    for ( let i = 0; i < poloj; i++ ) {
      const t = i / ( poloj - 1 );
      const lz = longo * t;
      const bazo = arko(t) - 0o1/0o100;
      const supro = pontaPolSupro(t, bazo, polAlto);
      // ⟨ ទំពក់យោលចូលក្នុង 📃 ⟩
      aldoniKadranTubon(geos, sX * polX, lz, bazo, supro, -sX, 0, true, 0, true, 0);
    }
    const traboPunktoj: THREE.Vector3[] = [];
    const trabajSekcioj = poloj * 2;
    for ( let i = 0; i <= trabajSekcioj; i++ ) {
      const t = i / trabajSekcioj;
      traboPunktoj.push(new THREE.Vector3(sX * polX, pontaPolSupro(t, arko(t), polAlto), longo * t));
    }
    const trabaKurbo = new THREE.CatmullRomCurve3(traboPunktoj, false, "centripetal", 0);
    const trabo = new THREE.Mesh(
      new THREE.TubeGeometry(trabaKurbo, trabajSekcioj, 0o1/0o20, 0o10, false), oraMaterialo);
    trabo.castShadow = true;
    grupo.add(trabo);
  }
  const balustrado = new THREE.Mesh(kunfandiGeometriojn(geos), oraMaterialo);
  balustrado.castShadow = true;
  grupo.add(balustrado);
  // ⟨ ធ្នូអង់ដេស៊ីត 📃 ⟩
  // ⟨ ហេតុអ្វីវាមើលទៅដូចបន្តផ្លូវ 📃 ⟩
  // ⟨ ការបើកមួយលើទឹក 📃 ⟩
  // ⟨ ចំហៀងស្ពានជាអង់ដេស៊ីតដល់ផ្លូវ 📃 ⟩
  // ⟨ កំពូល និងរង្វង់ 📃 ⟩
  const ringaDikeco = 0o1/0o2;
  const kronoY = arko(0o1/0o2) - dekaDikeco - ringaDikeco;
  // ⟨ កន្លែងទឹក និងកន្លែងដីទាបបំផុត 📃 ⟩
  const specimenoj = Math.max(0o10, Math.round(longo));
  let akvoUnua = -1, akvoLasta = -1;
  let teraFino = Infinity;
  for ( let i = 0; i <= specimenoj; i++ ) {
    const lz = longo * i / specimenoj;
    if ( cxuAkvo(mondaX(0, lz), mondaZ(0, lz)) ) {
      if ( akvoUnua < 0 ) akvoUnua = i;
      akvoLasta = i;
    }
    for ( const lx of [ -bendoX, 0, bendoX ] )
      teraFino = Math.min(teraFino, heightFn(mondaX(lx, lz), mondaZ(lx, lz)));
  }
  const arkMarĝeno = 0o1/0o20;
  let arkaT0 = 0, arkaT1 = 1;
  if ( akvoUnua >= 0 ) {
    arkaT0 = Math.max(0, akvoUnua / specimenoj - arkMarĝeno);
    arkaT1 = Math.min(1, akvoLasta / specimenoj + arkMarĝeno);
  }
  if ( arkaT1 - arkaT0 < 0o1/0o10 ) { arkaT0 = 0; arkaT1 = 1; }
  const arkaLongo = ( arkaT1 - arkaT0 ) * longo;
  // ⟨ ការលើកធ្នូ 📃 ⟩
  let piedoY = kronoY - arkaLongo * 0o1/0o4;
  piedoY = Math.min(piedoY, teraFino - 0o1/0o2);
  const intradoso = (t: number) => piedoY + ( kronoY - piedoY ) * ( 1 - Math.pow(2 * t - 1, 2) );
  // ⟨ កំពូលម៉ាស់ ផ្ទៃផ្លូវ មិនមែនបាតវា 📃 ⟩
  const suproDe = (z: number) => arko(z / longo) - 0o1/0o200;
  const arkaZ0 = arkaT0 * longo, arkaZ1 = arkaT1 * longo;
  // ⟨ បាតតាមដី 📃 ⟩
  const teraMalsupra = 0o1/0o4;
  const teraLaterala = (z: number) => Math.min(
    heightFn(mondaX(-masaDuono, z), mondaZ(-masaDuono, z)),
    heightFn(mondaX(0, z), mondaZ(0, z)),
    heightFn(mondaX(masaDuono, z), mondaZ(masaDuono, z)));
  const sube = (z: number) => {
    const tera = teraLaterala(z) - teraMalsupra;
    if ( z <= arkaZ0 || z >= arkaZ1 ) return tera;
    return Math.max(tera, intradoso(( z - arkaZ0 ) / ( arkaZ1 - arkaZ0 )));
  };
  const formo = new THREE.Shape();
  formo.moveTo(0, suproDe(0));
  formo.lineTo(0, sube(0));
  const subajPunktoj = 0o40;
  for ( let i = 1; i <= subajPunktoj; i++ ) {
    const z = longo * i / subajPunktoj;
    formo.lineTo(z, sube(z));
  }
  formo.lineTo(longo, suproDe(longo));
  formo.closePath();
  const arkaGeometrio = new THREE.ExtrudeGeometry(formo, { depth: masaDuono * 2, bevelEnabled: false });
  arkaGeometrio.rotateY(-Math.PI / 2);
  arkaGeometrio.translate(masaDuono, 0, 0);
  const arkaMaso = new THREE.Mesh(arkaGeometrio, andezitaMaterialo);
  arkaMaso.castShadow = arkaMaso.receiveShadow = true;
  grupo.add(arkaMaso);
  sceno.add(grupo);
}
