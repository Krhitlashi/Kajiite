// ≺⧼ La materialoj 🎨 ⧽≻
// La kaŝmemoritaj materialoj de la figuro — la ungoj ( ungaMaterialo ), la ledo de
// la botoj kaj la akcentaj partoj ( ledajMaterialoj ) kaj la vestaj materialoj
// ( vestajMaterialoj, kiuj uzas la kanvasajn teksturojn el pentristoj.ts ).
import * as THREE from "three";
import { kreiLederanTeksajxon } from "../../komunajxoj/teksajxoj/ledo.js";
import { kreiSxtofanBumpanTeksajxon } from "../../komunajxoj/teksajxoj/sxtofo.js";
import { type Vesto } from "../../vestaro/vestoj.js";
import { vestaTeksajxo } from "./pentristoj.js";

// ungaMaterialo — La materialo de la ungoj ( kaŝmemorita, unu por la tuta mondo ).
// ⟨ Kial aparta materialo 📃 ⟩ — la ungo estas la SAMA haŭto, nur pli hela kaj pli
// brila ( vera ungo estas travidebla kaj la karno sub ĝi lumas tra ĝi ). La
// haŭta materialo estas dividita — ĝi ne portas tekston — do la ungo ne povas
// preni alian koloron el ĝi per UV-oj kiel la buŝo faras. La ungo do estas aparta
// geometrio kun aparta materialo. La materialo mem estas KAŜMEMORITA kaj dividita
// inter ĉiuj figuroj — la ungoj havas neniun variaĵon po figuro.
//     @returns materialo ( THREE.MeshStandardMaterial ) - La unga materialo.
const UNGA_KOLORO = 0x987880;         // pli hela, pli varma kaj pli ruĝeta ol la haŭto
let ungaMaterialoStoko: THREE.MeshStandardMaterial | null = null;
export function ungaMaterialo(): THREE.MeshStandardMaterial {
  if ( !ungaMaterialoStoko ) ungaMaterialoStoko = new THREE.MeshStandardMaterial({
    color: UNGA_KOLORO, roughness: 0o25/0o100 });
  return ungaMaterialoStoko;
}

// ⟨ La ledaj materialoj 📃 ⟩ — la botoj kaj la akcentaj partoj de la ŝuoj dependas
// nur de la boto-koloro kaj de la akcenta koloro de la vesto, do ili kaŝmemoriĝas
// same kiel la ŝtofaj materialoj. La leda teksajxo ( kreiLederanTeksajxon ) estas
// grizhela kaj multiplikiĝas per la koloro, do unu dividita teksajxo servas ĉiujn
// ŝuojn de la mondo — samtempe kiel map KAJ kiel bumpMap, ĉar la grajno kaj la
// sulkoj reliefiĝu.
// ⟨ La akcenta koloro REVENIS al la ŝuo 📃 ⟩ Dum unu versio la plando estis simple
// mallumigita bota koloro, ĉar la akcentoj de la paletro estas preskaŭ blankaj kaj
// la plando iĝis la plej hela surfaco de la tuta korpo. Nun la akcento denove
// portas la ŝuajn randojn ( la plandon, la randon ĉe la maleolo kaj la kolumon ) —
// la vesto kaj la ŝuo do dividas la saman oran fadenon — kaj la boto mem restas
// bruna ledo, do la kontrasto restas sur la randoj anstataŭ sur la tuta plando.
interface LedajMaterialoj {
  botoM: THREE.MeshStandardMaterial;
  akcentaM: THREE.MeshStandardMaterial;
}
const LEDAJ_MATERIALOJ = new Map<string, LedajMaterialoj>();
export function ledajMaterialoj(o: Vesto): LedajMaterialoj {
  const klavo = o.botoj + ":" + o.akcenta;
  let m = LEDAJ_MATERIALOJ.get(klavo);
  if ( !m ) {
    m = {
      botoM: new THREE.MeshStandardMaterial({
        color: o.botoj, map: kreiLederanTeksajxon(), bumpMap: kreiLederanTeksajxon(),
        bumpScale: 0o1/0o50, roughness: 0o33/0o40,
      }),
      akcentaM: new THREE.MeshStandardMaterial({
        color: o.akcenta, map: kreiLederanTeksajxon(),
        bumpMap: kreiLederanTeksajxon(), bumpScale: 0o1/0o400, roughness: 0o63/0o100,
      }),
    };
    LEDAJ_MATERIALOJ.set(klavo, m);
  }
  return m;
}

// ⟨ Komunaj vestaj materialoj 📃 ⟩ — la KVAR teksturitaj vestaj materialoj
// ( interno, supra, pantalono, maniko ) dependas nur de la vesto, ne de la
// figuro — ili cacheiĝas po vesto kaj dividiĝas inter ĉiuj figuroj kun la sama
// vesto. La unuopaj figuroj ŝanĝas nur la map-referon ( agordiVeston ), do
// nenia klonita materialo bezoniĝas. La haŭto, la botoj kaj la haro restas
// po-figuraj ( la haro havas hazardan koloron, kaj la botoj kaj la plandoj
// portas la nuancojn de la vesto ).
// ⟨ La tuka reliefo 📃 ⟩ Ĉiu materialo ankaŭ ricevas la komunan tuk-reliefan
// teksaĵon ( kreiSxtofanBumpanTeksajxon ) kiel bumpMap. Ĝi estas la SAMA
// dividita teksaĵo por ĉiuj vestoj kaj ĉiuj partoj — nenia kroma tekstura
// memoro — kaj ĝi donas la interplekton de la ŝtofo, kiun la ebena koloro sole
// ne povas montri. Antaŭe la vestoj havis neniun reliefon, do la malgrandaj
// figuroj aspektis kiel pentritaj paperfolioj.
interface VestajMaterialoj {
  internoM: THREE.MeshStandardMaterial;
  eksteraM: THREE.MeshStandardMaterial;
  pantalonoM: THREE.MeshStandardMaterial;
  manikoM: THREE.MeshStandardMaterial;
}
const vestajMaterialojStoko = new Map<string, VestajMaterialoj>();
export function vestajMaterialoj(o: Vesto): VestajMaterialoj {
  const klavo = o.nomo + "|" + o.ĉefa + "|" + o.akcenta + "|" + o.interno + "|" + o.pantalono;
  let m = vestajMaterialojStoko.get(klavo);
  if ( !m ) {
    const tukO = kreiSxtofanBumpanTeksajxon();
    const vesto = ( speco: string, roughness: number ): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({
        map: vestaTeksajxo(o, speco),
        bumpMap: tukO, bumpScale: 0o1/0o400,
        roughness,
        side: THREE.DoubleSide,
      });
    m = {
      internoM: vesto("interno", 0o33/0o40),
      eksteraM: vesto("supra", 0o63/0o100),
      pantalonoM: vesto("pantalono", 0o63/0o100),
      manikoM: vesto("maniko", 0o63/0o100),
    };
    vestajMaterialojStoko.set(klavo, m);
  }
  return m;
}
