// ≺⧼ ſɟɔȝ ʌ ſɭɔ ŋᷠᴜ ꞁȷ̀ᴜ }ʃꞇ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ }ʃꞇ 🔬 ⧽≻
import * as THREE from "three";
import { vepaqPonton, PONT_VOJA_SUPERPONO } from "../../eskekoj/medio/qakaj2/ponto.js";
import { aldoniEnirejon } from "../../eskekoj/hapaq/satalaj/enirejo.js";
import { vepaqSatalon } from "../../eskekoj/hapaq/satalaj-hapaq.js";
import { vepaqHak6h6n } from "../../eskekoj/medio/hak6h6.js";
import { vojSuprajxoj } from "../../eskekoj/medio/hak6h6/hahunaq.js";
import { STUPA_RISERO, VOJA_SUPRO_LEVIGXO } from "../../eskekoj/medio/hak6h6/havecax2l.js";
import { SANKTEJA_BAZPLATO_ALTO, SANKTEJA_BAZPLATO_KROMO }
  from "../../eskekoj/hapaq/satalaj/haqoxa.js";

function certigi(thaweni: boolean, vop2lna: string): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

// ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃw , ſ͕ɭɜ ı],ᴜ 🌉 ⟫
{
  const qena = new THREE.Scene();
  const pukek = new THREE.MeshStandardMaterial({
    map: new THREE.Texture(), bumpMap: new THREE.Texture(),
  });
  const sahakani = 0o20;
  vepaqPonton(qena, 0, 0, sahakani, 0, 0o7/0o2, pukek, () => 0);
  const maŝoj = qena.children[0].children.filter(( infano ): infano is THREE.Mesh =>
    ( infano as THREE.Mesh ).isMesh);
  certigi(maŝoj.length > 0, "ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſןɔ ʌ j͑ʃɜ ſɭ,ᴜ");
  for ( const maŝo of maŝoj ) {
    const mat = maŝo.material as THREE.MeshStandardMaterial;
    certigi(mat.map?.channel === 1 && mat.bumpMap?.channel === 1,
      "ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſןɔ ʌ ſɟɹ ɭʃᴜ ʌ j͐ʃƽɜ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ");
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
      "ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ j͐ʃƽɜ ʌ ſɭᴜc̗ ɭʃɜ ｡ j͑ʃᴜ ſȷᴜ ʌ ſɭᴜ ʌ j͑ʃᴜ ꞁȷ̀ᴜ");
  }
  qena.updateMatrixWorld(true);
  for ( const x of [ -PONT_VOJA_SUPERPONO / 0o2, sahakani + PONT_VOJA_SUPERPONO / 0o2 ] ) {
    const radio = new THREE.Raycaster(new THREE.Vector3(x, -0o2, 0), new THREE.Vector3(0, 1, 0));
    certigi(radio.intersectObjects(qena.children, true).length > 0,
      "ſ̀ȷᴜ ſɭᴜƽ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃw ｡ ſןɔ ʌ ſɭɜʞ ɭl̀ᴜ ʌ ſɭэ ֭ſɭэ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ");
  }
}

// ⟪ ſןɔ˞ᴜƴ , ſɭɜ ſɭᴜ 🚪 ⟫
{
  const hate = new THREE.Group();
  const pukek = new THREE.MeshStandardMaterial();
  aldoniEnirejon(hate, 0o10, pukek, pukek, 1, 0o4, true);
  const nagetoj: THREE.Object3D[] = [];
  hate.traverse(infano => {
    if ( infano.name === "porda-nageto" ) nagetoj.push(infano);
  });
  certigi(nagetoj.length === 0o2, "ſɭᴜc̗ ɭʃɜ ʌ ſɭᴜ ʃэ ʌ ſɟᴜ ｡ ſןɔ ʌ ſɭɹ ſᶘɔ");
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
      certigi(limo.containsPoint(celo), "ſɭᴜc̗ ɭʃɜ ʌ ſɭᴜ ʃэ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ ſɟɹƽ ʌ ſᶘᴜ ſɟᴜ");
    nageto.parent!.updateMatrix();
    const mondaLimo = limo.clone().applyMatrix4(nageto.parent!.matrix);
    const eksteraCelo = new THREE.Vector3(signo * bazaLargho / 0o2, SANKTEJA_BAZPLATO_ALTO,
      0o10/0o2 + SANKTEJA_BAZPLATO_KROMO / 0o2);
    certigi(mondaLimo.containsPoint(eksteraCelo), "ſɭᴜc̗ ɭʃɜ ʌ ſɭᴜ ʃэ ｡ ſןɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ſןᴜ ſᶘɹ");
  }
}

// ⟪ j͑ʃɜ j͑ʃƨɹ , ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w 🏛️ ⟫
{
  const qena = new THREE.Scene();
  const grundo = ( x: number, _z: number ): number => x * 0o1/0o4;
  const hate = vepaqSatalon({
    x: 0, z: 0, type: "sanktejo", name: "provo", havem2: 0o7,
    w: 0o10, d: 0o10, tieroAlto: 0o3, sube: 0o7, rot: 0, h0: 0,
  }, qena, [], grundo);
  const bazpa12 = hate.getObjectByName("sankteja-bazpa12") as THREE.Mesh;
  certigi(!!bazpa12, "ſןɔ ʌ ɭl̀ᴜȝ ſןᴜ ɭʃɔ");
  certigi(bazpa12.castShadow && bazpa12.receiveShadow,
    "ɭl̀ᴜȝ ſןᴜ ɭʃɔ ｡ ſןɔ ʌ ֭ſɭw }ʃᴜ }ʃw");
  const p2somani = ( 0o10 + 0o72/0o100 ) / 0o2;
  certigi(hate.position.y >= grundo(p2somani, 0),
    "ɭl̀ᴜȝ ſןᴜ ɭʃɔ ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſɭɜ ſɭ,w");
}

// ⟪ ſɭᴜ ſןᴜ , ſɭɜ ſɭ,w ⚓ ⟫
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const grundo = ( _x: number, z: number ): number => z > 1 && z < 3 ? 0o3/0o2 : -0o2;
  const t6g6 = new THREE.MeshStandardMaterial();
  const t6hna = new THREE.MeshStandardMaterial();
  vepaqHak6h6n(qena, [ {
    pts: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ],
    w: 0o7/0o4, stuparo: true,
    heightFn: ( _x, z ) => 0o2 - z * 0o1/0o2,
    grundoFn: grundo,
  } ], grundo, t6g6, t6hna);
  for ( const kek of vojSuprajxoj ) {
    for ( const [ x, y, z ] of [ [ kek.x1, kek.y0, kek.z1 ],
      [ kek.x2, kek.y1, kek.z2 ] ] ) {
      certigi(y >= grundo(x, z) + VOJA_SUPRO_LEVIGXO - 0o1/0o1000,
        "j͑ʃɜ ſɭ,ᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ｡ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſɭɜ ſɭ,w");
    }
  }
}

// ⟪ ſᶘᴜ j͑ʃᴜ , ſןɔ˞ᴜƴ 🌊 ⟫
{
  vojSuprajxoj.length = 0;
  const qena = new THREE.Scene();
  const grundo = (): number => -0o2;
  const akvo = (): number => 0;
  vepaqHak6h6n(qena, [ {
    pts: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ],
    w: 0o7/0o4, stuparo: true,
    heightFn: ( _x, z ) => 0o1 - z,
    grundoFn: grundo,
  } ], grundo, new THREE.MeshStandardMaterial(), new THREE.MeshStandardMaterial(), [],
  { akvaFn: akvo } );
  const subakvaj = vojSuprajxoj.filter(kek => kek.z1 >= 0o2);
  certigi(subakvaj.length > 0, "ſןɔ ʌ j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ ſᶘᴜ j͐ʃɔ ſᶘᴜ");
  const celo = grundo() + VOJA_SUPRO_LEVIGXO + STUPA_RISERO;
  for ( const kek of subakvaj ) {
    certigi(kek.y0 >= celo - 0o1/0o1000, "j͑ʃɜ ſɭ,ᴜ ʌ j͑ʃᴜ ꞁȷ̀ᴜ ʌ ſᶘᴜ j͑ʃᴜ ｡ ſןɔ ʌ ꞁȷ̀ꞇʞ ʌ ſɭɹ ſȷɔ ɭʃɜ }ʃᴜ");
    certigi(kek.y0 <= akvo() - VOJA_SUPRO_LEVIGXO + 0o1/0o1000,
      "j͑ʃɜ ſɭ,ᴜ ｡ ꞁȷ̀ꞇʞ ʌ ɭl̀ᴜ ʌ j͑ʃɜ ſɭ,ᴜ ʌ ſᶘᴜ j͑ʃᴜ");
  }
}

console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) j͑ʃɜ ſɭ,ᴜ ʌ ſɭɹ ſᶘɔ ｡ j͑ʃ'ᴜ j͑ʃᴜ ſȷᴜ ｡ ſןɔ");
