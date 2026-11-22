// ≺⧼ ការត្រួតពិនិត្យការជួសជុលផ្ទៃ 🔬 ⧽≻
import * as THREE from "three";
import { konstruiPonton, PONT_VOJA_SUPERPONO } from "../../eskekoj/medio/doko/ponto.js";
import { aldoniEnirejon } from "../../eskekoj/konstruajxoj/satalaj/enirejo.js";
import { konstruiSatalon } from "../../eskekoj/konstruajxoj/satalaj-konstruajxoj.js";
import { konstruiVojojn } from "../../eskekoj/medio/vojoj.js";
import { vojSuprajxoj } from "../../eskekoj/medio/vojoj/tipoj.js";
import { STUPA_RISERO, VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/vojoj/mezuroj.js";
import { SANKTEJA_BAZPLATO_ALTO, SANKTEJA_BAZPLATO_KROMO }
  from "../../eskekoj/konstruajxoj/satalaj/formoj.js";

function certigi(kondiĉo: boolean, mesaĝo: string): void {
  if ( !kondiĉo ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${mesaĝo}`);
}

// ⟪ វាយនភាពស្ពាន 🌉 ⟫
{
  const qena = new THREE.Scene();
  const pukek = new THREE.MeshStandardMaterial({
    map: new THREE.Texture(), bumpMap: new THREE.Texture(),
  });
  const sahakani = 0o20;
  konstruiPonton(qena, 0, 0, sahakani, 0, 0o7/0o2, pukek, () => 0);
  const maŝoj = qena.children[0].children.filter(( infano ): infano is THREE.Mesh =>
    ( infano as THREE.Mesh ).isMesh);
  certigi(maŝoj.length > 0, "ស្ពានមិនមានផ្ទៃ");
  for ( const maŝo of maŝoj ) {
    const mat = maŝo.material as THREE.MeshStandardMaterial;
    certigi(mat.map?.channel === 1 && mat.bumpMap?.channel === 1,
      "ស្ពានមិនប្រើវាយនភាពតាមឯកតា");
    const geometrio = maŝo.geometry;
    const uv1 = geometrio.getAttribute("uv1") as THREE.BufferAttribute;
    const normaloj = geometrio.getAttribute("normal") as THREE.BufferAttribute;
    let malgranda = Infinity, granda = -Infinity;
    for ( let i = 0; i < uv1.count; i++ ) {
      if ( Math.abs(normaloj.getX(i)) < 0o7/0o10 ) continue;
      malgranda = Math.min(malgranda, uv1.getX(i));
      granda = Math.max(granda, uv1.getX(i));
    }
    certigi(granda - malgranda > sahakani * 0o3/0o4,
      "វាយនភាពមុខចំហៀងស្ពាននៅតែលាត");
  }
  qena.updateMatrixWorld(true);
  for ( const x of [ -PONT_VOJA_SUPERPONO / 0o2, sahakani + PONT_VOJA_SUPERPONO / 0o2 ] ) {
    const radio = new THREE.Raycaster(new THREE.Vector3(x, -0o2, 0), new THREE.Vector3(0, 1, 0));
    certigi(radio.intersectObjects(qena.children, true).length > 0,
      "ចុងស្ពានមិនជាន់ចូលក្រោមផ្លូវ");
  }
}

// ⟪ ព្រុយទ្វារ 🚪 ⟫
{
  const hate = new THREE.Group();
  const pukek = new THREE.MeshStandardMaterial();
  aldoniEnirejon(hate, 0o10, pukek, pukek, 1, 0o4, true);
  const nagetoj: THREE.Object3D[] = [];
  hate.traverse(infano => {
    if ( infano.name === "porda-nageto" ) nagetoj.push(infano);
  });
  certigi(nagetoj.length === 0o2, "ព្រុយទ្វារមិនគ្រប់");
  const bazaLargho = 0o233/0o100;
  const supraLargho = bazaLargho * 0o45/0o100;
  const z = -0o1/0o100 + 0o7/0o100 / 0o2;
  for ( const [ vecax2lani, signo ] of [ -1, 1 ].entries() ) {
    const nageto = nagetoj[vecax2lani] as THREE.Mesh;
    const geometrio = nageto.geometry;
    geometrio.computeBoundingBox();
    const limo = geometrio.boundingBox!.clone().expandByScalar(0o1/0o1000);
    const celoj = [
      new THREE.Vector3(signo * bazaLargho / 0o2, 0, z),
      new THREE.Vector3(signo * supraLargho / 0o2, 0o11/0o4, z),
    ];
    for ( const celo of celoj )
      certigi(limo.containsPoint(celo), "ព្រុយមិនប៉ះជ្រុងទ្វារ");
    nageto.parent!.updateMatrix();
    const mondaLimo = limo.clone().applyMatrix4(nageto.parent!.matrix);
    const eksteraCelo = new THREE.Vector3(signo * bazaLargho / 0o2, SANKTEJA_BAZPLATO_ALTO,
      0o10/0o2 + SANKTEJA_BAZPLATO_KROMO / 0o2);
    certigi(mondaLimo.containsPoint(eksteraCelo), "ព្រុយមិនប៉ះផ្ទៃខាងលើចាន");
  }
}

// ⟪ មូលដ្ឋានអគារកណ្តាល 🏛️ ⟫
{
  const qena = new THREE.Scene();
  const grundo = ( x: number, _z: number ): number => x * 0o1/0o4;
  const hate = konstruiSatalon({
    x: 0, z: 0, type: "sanktejo", name: "provo", havem2: 0o7,
    w: 0o10, d: 0o10, tieroAlto: 0o3, sube: 0o7, rot: 0, h0: 0,
  }, qena, [], grundo);
  const bazplato = hate.getObjectByName("sankteja-bazplato") as THREE.Mesh;
  certigi(!!bazplato, "មិនមានមូលដ្ឋាន");
  certigi(bazplato.castShadow && bazplato.receiveShadow,
    "មូលដ្ឋានមិនមានស្រមោល");
  const p2somani = ( 0o10 + 0o72/0o100 ) / 0o2;
  certigi(hate.position.y >= grundo(p2somani, 0),
    "មូលដ្ឋាននៅក្រោមដី");
}

// ⟪ កម្រាលចំណត ⚓ ⟫
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const grundo = ( _x: number, z: number ): number => z > 1 && z < 3 ? 0o3/0o2 : -0o2;
  const diorito = new THREE.MeshStandardMaterial();
  const andezito = new THREE.MeshStandardMaterial();
  konstruiVojojn(qena, [ {
    pts: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ],
    w: 0o7/0o4, stuparo: true,
    heightFn: ( _x, z ) => 0o2 - z * 0o1/0o2,
    grundoFn: grundo,
  } ], grundo, diorito, andezito);
  for ( const kek of vojSuprajxoj ) {
    for ( const [ x, y, z ] of [ [ kek.x1, kek.y0, kek.z1 ],
      [ kek.x2, kek.y1, kek.z2 ] ] ) {
      certigi(y >= grundo(x, z) + VOJA_SUPRO_LEVIGXO - 0o1/0o1000,
        "កម្រាលចំណតនៅក្រោមដី");
    }
  }
}

// ⟪ កម្រាលក្រោមទឹក 🌊 ⟫
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const grundo = (): number => -0o2;
  const akvo = (): number => 0;
  konstruiVojojn(qena, [ {
    pts: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ],
    w: 0o7/0o4, stuparo: true,
    heightFn: ( _x, z ) => 0o1 - z,
    grundoFn: grundo,
  } ], grundo, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial(), [],
  { akvaFn: akvo } );
  const subakvaj = vojSuprajxoj.filter(kek => kek.z1 >= 0o2);
  certigi(subakvaj.length > 0, "គ្មានកម្រាលក្រោមទឹកសម្រាប់សាកល្បង");
  const celo = grundo() + VOJA_SUPRO_LEVIGXO + STUPA_RISERO;
  for ( const kek of subakvaj ) {
    certigi(kek.y0 >= celo - 0o1/0o1000, "កម្រាលក្រោមទឹកមិនឡើងមួយជំហាន");
    certigi(kek.y0 <= akvo() - VOJA_SUPRO_LEVIGXO + 0o1/0o1000,
      "កម្រាលឡើងលើផ្ទៃទឹក");
  }
}

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ការជួសជុលផ្ទៃទាំងអស់ជោគជ័យ");
