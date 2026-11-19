// ≺⧼ ការសាកល្បងបង្កើតឧទាហរណ៍ចែករំលែក 🧩 ⧽≻
import * as THREE from "three";
import { kunfandiMondajnMeshojn } from "../../eskekoj/komunajxoj/kunfandajxoj.js";
import { spacigiInstancojn } from "../../kantaoj/bildo/vidlimo.js";
import { alOkto } from "../../kantaoj/komunajxoj/unuoj.js";

function certigi( kondiĉo: boolean, mesaĝo: string ): void {
  if ( !kondiĉo ) throw new Error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${mesaĝo}`);
}

const radiko = new THREE.Scene();
const geometrio = new THREE.BoxGeometry(1, 1, 1);
const materialo = new THREE.MeshBasicMaterial();
for ( let i = 0; i < 0o10; i++ ) {
  const mesho = new THREE.Mesh(geometrio, materialo);
  mesho.position.set(i % 0o2 === 0 ? 0 : 0o200, 0, 0);
  radiko.add(mesho);
  mesho.updateMatrixWorld(true);
}
const rezulto = kunfandiMondajnMeshojn(radiko, [ ...radiko.children ]);
certigi( rezulto.antaŭe === 0o10 && rezulto.poste === 1,
  "ចំនួនមុន និង ក្រោយមិនត្រឹមត្រូវ" );
certigi( radiko.children.length === 1, "គំរូដើមមិនបានដកចេញ" );
const instancigita = radiko.children[0] as THREE.InstancedMesh;
certigi( instancigita.isInstancedMesh && instancigita.count === 0o10,
  "ការបង្កើតឧទាហរណ៍មិនត្រឹមត្រូវ" );
certigi( instancigita.geometry === geometrio, "គំរូត្រូវបានចម្លងជំនួសឱ្យចែករំលែក" );
const matrico = new THREE.Matrix4();
instancigita.getMatrixAt(0o1, matrico);
certigi( matrico.elements[0o14] === 0o200, "មាត្រីពិភពលោកមិនរក្សាទីតាំង" );

const disigo = spacigiInstancojn(radiko, 0o40);
certigi( disigo.tavoloj === 1 && disigo.pecoj === 0o2,
  "ការបំបែកលំហមិនជោគជ័យ" );
certigi( radiko.children.every(infano => ( infano as THREE.InstancedMesh ).geometry === geometrio ),
  "ការបំបែកបានផ្លាស់ប្តូរ ឬ ចម្លងគំរូ" );

// ⟨ គំរូខុស UUID មិនត្រូវបញ្ចូលគ្នា 📃 ⟩
const malsama = new THREE.Scene();
malsama.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materialo));
malsama.add(new THREE.Mesh(new THREE.BoxGeometry(0o2, 1, 1), materialo));
const malsamaRezulto = kunfandiMondajnMeshojn(malsama, [ ...malsama.children ]);
certigi( malsamaRezulto.poste === 0o2 && malsama.children.length === 0o2,
  "គំរូខុស UUID ត្រូវបានបញ្ចូលខុស" );

console.log(`( ꞁȷ̀ɹ ʃᴜ ſɭɹ ſןɹ ) ចែករំលែក ${alOkto(rezulto.antaŭe, 0)} ទៅ ${alOkto(rezulto.poste, 0)} ហើយបំបែកជា ${alOkto(disigo.pecoj, 0)} ដោយគំរូតែមួយ`);
