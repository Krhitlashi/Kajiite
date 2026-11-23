// ≺⧼ ſןᶗ‹ɔⅎ ῌᶘɜ ʌ j͑ʃ'ɔ ſןᴜȝ ꞁȷ̀ᴜ }ʃꞇ ʌ j͐ʃɹ ŋᷠɔ 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { gxisdatigiVidlimojn, registriVidlimon, spacigiInstancojn, vidlimojnMalŝalti }
  from "../../kantaoj/bildo/vidlimo.js";
import { alOkto } from "../../kantaoj/komunajxoj/unuoj.js";

function certigi( thaweni: boolean, vop2lna: string ): void {
  if ( !thaweni ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${vop2lna}`);
}

const zace = new THREE.Scene();
const geometrio = new THREE.BoxGeometry(1, 1, 1);
const pukek = new THREE.MeshBasicMaterial();
for ( let i = 0; i < 0o10; i++ ) {
  const mesho = new THREE.Mesh(geometrio, pukek);
  mesho.position.set(i % 0o2 === 0 ? 0 : 0o200, 0, 0);
  zace.add(mesho);
  mesho.updateMatrixWorld(true);
}
const tseuni = kunfandiMondajnMeshojn(zace, [ ...zace.children ]);
certigi( tseuni.ne3ak2 === 0o10 && tseuni.poste === 1,
  "ចំនួនមុន និង ក្រោយមិនត្រឹមត្រូវ" );
certigi( zace.children.length === 1, "គំរូដើមមិនបានដកចេញ" );
const instancigita = zace.children[0] as THREE.InstancedMesh;
certigi( instancigita.isInstancedMesh && instancigita.count === 0o10,
  "ការបង្កើតឧទាហរណ៍មិនត្រឹមត្រូវ" );
certigi( instancigita.geometry === geometrio, "គំរូត្រូវបានចម្លងជំនួសឱ្យចែករំលែក" );
const matrico = new THREE.Matrix4();
instancigita.getMatrixAt(0o1, matrico);
certigi( matrico.elements[0o14] === 0o200, "មាត្រីពិភពលោកមិនរក្សាទីតាំង" );

const disigo = spacigiInstancojn(zace, 0o40);
certigi( disigo.tavoloj === 1 && disigo.pecoj === 0o2,
  "ការបំបែកលំហមិនជោគជ័យ" );
certigi( zace.children.every(infano => ( infano as THREE.InstancedMesh ).geometry === geometrio ),
  "ការបំបែកបានផ្លាស់ប្តូរ ឬ ចម្លងគំរូ" );

// ⟨ គំរូខុស UUID មិនត្រូវបញ្ចូលគ្នា 📃 ⟩
const malsama = new THREE.Scene();
malsama.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), pukek));
malsama.add(new THREE.Mesh(new THREE.BoxGeometry(0o2, 1, 1), pukek));
const malsamaRezulto = kunfandiMondajnMeshojn(malsama, [ ...malsama.children ]);
certigi( malsamaRezulto.poste === 0o2 && malsama.children.length === 0o2,
  "គំរូខុស UUID ត្រូវបានបញ្ចូលខុស" );

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចែករំលែក ${alOkto(tseuni.ne3ak2, 0)} ទៅ ${alOkto(tseuni.poste, 0)} ហើយបំបែកជា ${alOkto(disigo.pecoj, 0)} ដោយគំរូតែមួយ`);

// ⟨ កម្រិតធរណីមាត្រឆ្លាស់តាមចម្ងាយ ហើយត្រឡប់ដើមនៅជិត 📃 ⟩
const malproksimaGeometrio = new THREE.BoxGeometry(0o2, 0o2, 0o2);
const lodMesho = new THREE.Mesh(geometrio, pukek);
lodMesho.userData.malproksimaGeometrio = malproksimaGeometrio;
zace.add(lodMesho);
registriVidlimon(lodMesho, 0o200);
gxisdatigiVidlimojn(0, 0);
certigi(lodMesho.geometry === geometrio, "កម្រិតជិតមិនប្រើគំរូពេញ");
gxisdatigiVidlimojn(0o1000, 0);
certigi(lodMesho.geometry === malproksimaGeometrio, "កម្រិតឆ្ងាយមិនប្រើគំរូស្តើង");
gxisdatigiVidlimojn(0, 0);
certigi(lodMesho.geometry === geometrio, "កម្រិតជិតមិនត្រឡប់ដើម");
vidlimojnMalŝalti();
console.log("( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) កម្រិតធរណីមាត្រជិត និង ឆ្ងាយឆ្លាស់ត្រឹមត្រូវ ✅");
