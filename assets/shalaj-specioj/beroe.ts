// ≺⧼ Beroe 🪼 ⧽≻
// La plej granda ktenoforo de la rivero. Melonoforma ĝelo kun ok
// kombovicoj, larĝa buŝo ĉe la malsupra poluso kaj la faringo videbla tra la
// travidebla korpo, kiel ĉe vera Beroe ( la rabema kombulo, kiu englutas
// fiŝojn pli grandajn ol ĝi mem ).
//
// ⟨ Kio estis rompita 📃 ⟩ — la malnova buŝa rando staris ĉe la buŝa poluso,
// sed ĝia radiuso ( 0.33 ) estis tiu de la KORPA MEZO, dum la korpo mem
// mallarĝiĝis al 0.01 ĉe tiu poluso: la ringo ŝvebis ĉirkaŭ maldika pinto kiel
// hulo, kaj ĝi ankaŭ NE sekvis la pulson de la korpo — ĉe ĉiu kunpremo videblis
// fendo inter la ĝelo kaj la membrano. Nun la profilo estas vera melono ( la
// buŝa rando estas 0.21 de la meza radiuso ), la ringa radiuso estas LEGITA el
// la profilo ( do ili ne povas malkongrui ) kaj la ringo sekvas la pulson per
// surfacxaParto/gluuSurfacxon.
import * as THREE from "three";
import type { Besto, SpecoMalneto } from "./speco-tipoj.js";
import { aldoniKombovicojn, aplikiKtenoforanPulson, gluuSurfacxon, kreiGelanTeksajxon,
  kreiKombilanMaterialon, kreiKorpon, kreiKombovicanTeksajxon, ktenoforaPulsaFazo,
  profiloR, surfacxaParto } from "./ktenofora-komunajxoj.js";

// La korpa profilo ( r, y ) de la buŝa poluso ( malsupre ) ĝis la aborala
// ( supre ). Vidu la klarigon supre: la antaŭa profilo havis radiuson 0.35 ĉe
// la SUPRO kaj 0.01 ĉe la buŝo, do Beroe aspektis kiel konuso kun ringo.
const PROFILO: [ number, number ][] = [
  [ 0.21, -1.00 ],   // la buŝa rando ( malfermita ringo — la lipo ĝin kovras )
  [ 0.30, -0.95 ],   // la buŝa funelo
  [ 0.34, -0.85 ],
  [ 0.35, -0.65 ],
  [ 0.35, -0.35 ],   // la plej larĝa parto — la ŝultroj de la melono
  [ 0.34, -0o1/0o20 ],
  [ 0.32, 0o1/0o4 ],
  [ 0.28, 0.50 ],
  [ 0.22, 0.72 ],
  [ 0.14, 0.88 ],
  [ 0.06, 0.97 ],    // la aborala poluso ( preskaŭ fermita )
];

export function konstruiMalneton(teksajxo: THREE.CanvasTexture): SpecoMalneto {
  const grupo = new THREE.Group();
  const gelo = kreiGelanTeksajxon({
    bazo: "rgb(240,212,222)", kanalo: "rgb(198,140,168)",
    poluso: "rgb(236,180,198)", polusaForto: 0o50/0o100, grajnoj: 0o500,
  });
  const korpo = kreiKorpon(gelo, teksajxo, PROFILO, 0xe8d8e0, 0x285078);
  korpo.name = "korpo";
  grupo.add(korpo);

  // La ok kombovicoj — la vera geometrio anstataŭ pentritaj strioj.
  aldoniKombovicojn(grupo, PROFILO, kreiKombilanMaterialon(0x88c0f0));

  // La buŝa lipo — Beroe havas LARĜAN buŝon, kiu povas engluti fiŝon pli
  // grandan ol ĝi mem. La radiuso venas de la profilo mem ( profiloR ), do la
  // lipo ĉiam kongruas kun la korpa rando, kien ajn oni movas ĝin.
  const buŝaY = -0o74/0o100;   // -0.9375 — iomete ene de la buŝa funelo
  const buŝaR = profiloR(PROFILO, buŝaY);
  const buŝaRando = new THREE.Mesh(
    new THREE.TorusGeometry(buŝaR, buŝaR * 0o12/0o100, 0o6, 0o24),
    new THREE.MeshPhysicalMaterial({
      color: 0xd8a8c0, transparent: true, opacity: 0o11/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x50203a, emissiveIntensity: 0o1/0o4,
    }));
  buŝaRando.rotation.x = -Math.PI / 0o2;
  buŝaRando.position.y = buŝaY;
  // La nomo — la animacio malfermas la buŝon per ĝi ( vidu gxisdatigiBeran ).
  buŝaRando.name = "busxo";
  surfacxaParto(buŝaRando);
  grupo.add(buŝaRando);

  // La faringo kaj la stomako — la malhela buŝa tubo, videbla tra la ĝelo.
  // Ĝi staras sur la akso, do la radia pulso ne movas ĝin.
  const faringo = new THREE.Mesh(
    new THREE.CylinderGeometry(0o40/0o1000, 0o10/0o100, 0o7/0o10, 0o12)
      .translate(0, 0o7/0o20, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x986080, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
      side: THREE.DoubleSide,
    }));
  faringo.name = "faringo";
  faringo.position.y = -0o64/0o100;
  surfacxaParto(faringo);
  grupo.add(faringo);
  const stomako = new THREE.Mesh(
    new THREE.SphereGeometry(0o11/0o100, 0o10, 0o10).scale(0o1, 0o15/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xa06888, transparent: true, opacity: 0o5/0o20, depthWrite: false,
      roughness: 0o1/0o4, emissive: 0x402040, emissiveIntensity: 0o1/0o4,
    }));
  stomako.name = "stomako";
  stomako.position.y = 0o44/0o100;
  surfacxaParto(stomako);
  grupo.add(stomako);

  // La statocisto — la sensorgano sur la aborala poluso.
  const statocisto = new THREE.Mesh(
    new THREE.SphereGeometry(0o4/0o100, 0o10, 0o6).scale(0o1, 0o7/0o10, 0o1),
    new THREE.MeshPhysicalMaterial({
      color: 0xf0d8e4, transparent: true, opacity: 0o3/0o5, depthWrite: false,
      roughness: 0o1/0o10, emissive: 0xc07898, emissiveIntensity: 0o7/0o10,
    }));
  statocisto.name = "statocisto";
  statocisto.position.y = 0o74/0o100;
  surfacxaParto(statocisto);
  grupo.add(statocisto);

  // Beroe — la plej granda kaj plej rapida ktenoforo de la tri: malmultaj
  // fortaj pulsoj. La vertikala platigo restas modera — la korpo estas MELONO,
  // ne disko ( la antaŭa valoro 0.3 kunpremis la tutan beston al triono ).
  return { malneto: grupo, platigxo: new THREE.Vector3(0o1, 0o1, 0o63/0o100),
    supro: 0o1, speco: "beroe",
    pulsaRapido: 0o25/0o10, pulsaForto: 0o1/0o10, pulsaOndo: 0o1/0o10,
    plata: 0o5/0o10 };
}

// gxisdatigiBeran — La buŝo malfermiĝas kaj fermiĝas kun la pulso: Beroe
// englutas per larĝa buŝmalfermo je la fino de ĉiu kunpremo. Ĉiuj partoj sur
// la surfaco ( la lipo, la faringo, la statocisto ) sekvas la pulson, do la
// membrano restas gluita al la ĝelo.
export function gxisdatigiBeran(b: Besto, t: number): void {
  const pulso = aplikiKtenoforanPulson(b, t);
  const malfermo = 0o1 + Math.max(0, Math.sin(ktenoforaPulsaFazo(b, t) + 0o1/0o4)) * 0o2/0o10;
  const vertikalaAldono = 1 + ( malfermo - 1 ) * 0o1/0o2;
  for ( const parto of b.animajxoj ) {
    if ( parto.name === "busxo" ) {
      gluuSurfacxon(parto, pulso, { x: malfermo, y: vertikalaAldono, z: malfermo });
    } else if ( parto.name === "faringo" || parto.name === "stomako" ) {
      // La faringo malfermiĝas malpli ol la rando — ĝi restas tubo.
      const milda = 1 + ( malfermo - 1 ) * 0o1/0o4;
      gluuSurfacxon(parto, pulso, { x: milda, y: 1 + ( malfermo - 1 ) * 0o1/0o2, z: milda });
    } else if ( parto.name === "statocisto" ) {
      gluuSurfacxon(parto, pulso);
    }
  }
  // La besto kliniĝas iomete dum la naĝado.
  b.grupo.rotation.x = Math.sin(t * 0o1/0o2 + b.phase * 0o3) * 0o2/0o100;
  b.grupo.rotation.z = Math.sin(t * b.rapido + b.phase) * 0o1/0o100;
}
