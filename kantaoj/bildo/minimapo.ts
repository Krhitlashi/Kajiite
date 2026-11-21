// ≺⧼ ផែនទីតូច 🧭 ⧽≻
import * as THREE from "three";
import { HERBA_TAVOLA_NOMO } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/gazono.js";
import { devigiHerbanGxisdatigon } from "../../eskekoj/shalaj-specioj/vegetajxo/herbo/vento.js";
import { tuŝaGesto } from "../fasado/gestoj.js";
import { vidlimojnMalŝalti, vidlimojnŜalti } from "./vidlimo.js";
import { MALPOTENCA_APARATO } from "./scena/aparato.js";

export interface MinimapajOpcioj {
  sceno: THREE.Scene;
  bildilo: THREE.WebGLRenderer;
  miniKanvaso: HTMLCanvasElement;
  kompaso: HTMLElement;
  nadlo: HTMLElement;
  supermeta: HTMLElement;
  supermetaEnhavo: HTMLElement;
  mapoGrandeco: number;
  movantoj: {
    npcoj: { group: THREE.Object3D }[];
    kanuoj: { x: number; z: number; group: THREE.Object3D }[];
    bestoj: { bestoj: { grupo: THREE.Object3D }[] };
    petreloj: { petreloj: { grupo: THREE.Object3D }[] };
  };
  traduki: ( klavo: string ) => string;
  aplikiVacepu: () => void;
}

export interface Minimapo {
  gxisdatigi(vidX: number, vidZ: number, centroX: number, centroZ: number): void;
  cxuBakita(): boolean;
  // ⟨ សន្យាបញ្ចប់ពេលការដុតចប់ ឬ ពេលវាមិនអាចធ្វើបានឥឡូវ 📃 ⟩
  pretigi(): Promise<void>;
  cxuMalfermita(): boolean;
  malfermi(): void;
  fermi(): void;
  desegniRadaron(): void;
  desegniPlenanMapon(): void;
}

export function kreiMinimapon(opcioj: MinimapajOpcioj): Minimapo {
  const { sceno, bildilo, miniKanvaso, kompaso, nadlo, supermeta, supermetaEnhavo,
    mapoGrandeco, traduki, aplikiVacepu } = opcioj;
  const { npcoj, kanuoj, bestoj, petreloj } = opcioj.movantoj;

  // ⟪ ផែនទីតូច , ត្រីវិស័យក្លាយជាផែនទីរ៉ាដា; ចុចបើកទិដ្ឋភាពពេញ 📃 ⟫
  let mapoMalfermita = false;
  let plenaKanvaso: HTMLCanvasElement | null = null;
  let plenaKunteksto: CanvasRenderingContext2D | null = null;
  let bakitaMapo: HTMLCanvasElement | null = null;
  let mapaBakado = false;
  let mapaMalsukcesis = false;
  let mapaPetita = false;
  let malfermoAtendas = false;
  let mapX = 0, mapZ = 0;
  let vidX = 0, vidZ = 0;

  const RADARA_DUONO = 0o30;
  const PLENA_DUONO = Math.round(mapoGrandeco * 0o13/0o10);
  const MINA_DUONO = 0o10;
  const MAXA_DUONO = Math.round(PLENA_DUONO * 0o15/0o10);
  const MAPA_BAKA_DUONO = 0o1270;
  // ⟨ ផែនទីដុតតែម្តង , ក្រោយពេលពិភពលោកផ្ទុករួច ។ ចានគំនូរតូចកាត់ទាំងការងារ GPU
  //   និង ស្មាមអានត្រឡប់ ហើយគុណភាពផ្លាស់ទីក៏តាម maxTextureSize 📃 ⟩
  const MAPA_BAKA_REZ = Math.min(MALPOTENCA_APARATO ? 0o1000 : 0o2000,
    bildilo.capabilities.maxTextureSize);
  // ⟨ កាំរង្វង់ឆ្លុះផែនទី , គិតជាផ្នែកនៃទំហំផែនទី ។ គែមការ៉េត្រូវបើក
  //   ចំហៀង មិនមែនបិទជាប់ ទើបមិនឃើញក្រឡាចតុកោណពណ៌សជុំវិញផែនទី 📃 ⟩
  const MAPA_BAKA_FADO = Math.round(0o230 * MAPA_BAKA_REZ / 0o3000);
  let mapaRandaKoloro = "#585848";
  let mapaNebulaKoloro = "#c8d8d8";
  let plenaDuono = PLENA_DUONO;
  let mapaPanX = 0;
  let mapaPanZ = 0;
  // ⟨ ទិដ្ឋភាពពេញគូរឡើងវិញតែ 0o100 មិល្លីវិនាទីម្តង ។ ការបង្វិល
  //   កង់ ទាញ ឬ ពង្រីកបង្ខំឱ្យគូរភ្លាម ដើម្បីរក្សាអារម្មណ៍ឆ្លើយតប ។ 📃 ⟩
  const PLENA_MAPA_PERIODO = 0o100;
  let lastaPlenaMapoTempo = -Infinity;
  function postuliPlenanMapon(): void { lastaPlenaMapoTempo = -Infinity; }

  function bakiMapon(): HTMLCanvasElement | null {
    const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
    const rt = new THREE.WebGLRenderTarget(rez, rez, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    try {
      // ⟨ ចានគំនូរត្រូវសរសេរជាពណ៌ដូចអេក្រង់ ។ បើមិនកំណត់ , ចានគំនូរសរសេរជាលីនេអ៊ែរ
      // ហើយផែនទីក្លាយជាងងឹត និងឆ្អែតពណ៌ខុសពីពិភពលោក ។ 📃 ⟩
      rt.texture.colorSpace = THREE.SRGBColorSpace;
      const mapFotilo = new THREE.OrthographicCamera(-duono, duono, duono, -duono, 1, 0o230);
      mapFotilo.up.set(0, 0, 1);
      mapFotilo.position.set(0, 0o130, 0);
      mapFotilo.lookAt(0, 0, 0);
      // ⟨ រក្សាស្រមោលដូចឆាកចម្បង ។ ការបិទវាបង្កើត shader programs ថ្មី
      //   សម្រាប់វត្ថុរាប់ពាន់ ហើយអាចធ្វើឱ្យ Edge អស់ស្មាម 📃 ⟩
      const kaŝitaj: { obj: THREE.Object3D; videbla: boolean }[] = [];
      const kaŝu = ( obj: THREE.Object3D ): void => {
        kaŝitaj.push({ obj, videbla: obj.visible });
        obj.visible = false;
      };
      // ⟨ អ័ព្ទបិទពេលដុតផែនទី ។ កាមេរ៉ាផែនទីនៅខ្ពស់ ,
      //   ដូច្នេះអ័ព្ទធម្មតាគ្របដណ្តប់ស្ទើរតែទាំងអស់ , ហើយផែនទីក្លាយជាផ្ទៃស ។
      //   ការកំណត់ដង់ស៊ីតេជា 0 មិនបង្កើតកម្មវិធីស្រមោលថ្មីទេ ,
      //   ខុសពីការដកអ័ព្ទចេញទាំងស្រុង 📃 ⟩
      const nebulo = sceno.fog;
      let restarigiNebulon = (): void => {};
      try {
        if ( nebulo instanceof THREE.FogExp2 ) {
          const denso = nebulo.density;
          nebulo.density = 0;
          restarigiNebulon = (): void => { nebulo.density = denso; };
        } else if ( nebulo ) {
          const proksima = nebulo.near, malproksima = nebulo.far;
          nebulo.near = 0o100000;
          nebulo.far = 0o100000 + 1;
          restarigiNebulon = (): void => { nebulo.near = proksima; nebulo.far = malproksima; };
        }
        // ⟨ ដែនមើលបិទ 📃 ⟩
        vidlimojnMalŝalti();
        // ⟨ ស្មៅមិនក្តៅ 📃 ⟩
        for ( const o of sceno.children ) {
          if ( o.name !== HERBA_TAVOLA_NOMO ) continue;
          kaŝu(o);
        }
        for ( const n of npcoj ) kaŝu(n.group);
        for ( const c of kanuoj ) kaŝu(c.group);
        for ( const b of bestoj.bestoj ) kaŝu(b.grupo);
        for ( const p of petreloj.petreloj ) kaŝu(p.grupo);
        bildilo.setRenderTarget(rt);
        // ⟨ ឆាកចម្បងបានចងក្រងរួចហើយ ។ ការចងក្រងឆាកទាំងមូលម្តងទៀត
        //   មុនផែនទីបង្កើនស្មាម និង ពេលផ្ទុកដោយមិនចាំបាច់ 📃 ⟩
        bildilo.render(sceno, mapFotilo);
      } finally {
        // ⟨ សូម្បីការគូរបរាជ័យក៏ត្រូវដកចានគំនូរ និង ស្ថានភាពចាស់ចេញ 📃 ⟩
        restarigiNebulon();
        bildilo.setRenderTarget(null);
        for ( const ero of kaŝitaj ) ero.obj.visible = ero.videbla;
        vidlimojnŜalti();
        // ⟨ ការដុតផែនទីបិទភាពមើលឃើញរបស់ក្រឡាទាំងអស់ ហើយបើកវាឡើងវិញដោយ
        //   មិនដឹងចម្ងាយ ។ បង្ខំឱ្យប្រព័ន្ធស្មៅគណនាឡើងវិញលើស៊ុមបន្ទាប់ ។ 📃 ⟩
        devigiHerbanGxisdatigon();
      }
      if ( sceno.fog ) mapaNebulaKoloro = "#" + sceno.fog.color.getHexString();
      // ⟨ ប៊ូហ្វ័រមួយ 📃 ⟩
      const buf = new Uint8Array(rez * rez * 4);
      bildilo.readRenderTargetPixels(rt, 0, 0, rez, rez, buf);
      const tempVico = new Uint8Array(rez * 4);
      for ( let y = 0; y < ( rez >> 1 ); y++ ) {
        const supra = y * rez * 4, malsupra = ( rez - 1 - y ) * rez * 4;
        tempVico.set(buf.subarray(supra, supra + rez * 4));
        buf.copyWithin(supra, malsupra, malsupra + rez * 4);
        buf.set(tempVico, malsupra);
      }
      const bildo = new ImageData(new Uint8ClampedArray(buf.buffer), rez, rez);
      const kanvasa = document.createElement("canvas");
      kanvasa.width = kanvasa.height = rez;
      // ⟨ willReadFrequently 📃 ⟩
      kanvasa.getContext("2d", { willReadFrequently: true })!.putImageData(bildo, 0, 0);
      mapaRandaKoloro = mezuriRandanKoloron(buf, rez);
      molaRandon(kanvasa, MAPA_BAKA_FADO);
      return kanvasa;
    } catch ( e ) {
      console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ការដុតផែនទីមិនអាចប្រើបាន" , e);
      return null;
    } finally {
      // ⟨ ការអាន ឬ ការបម្លែងបរាជ័យក៏មិនទុក GPU render target នៅឡើយ 📃 ⟩
      rt.dispose();
    }
  }

  // ⟨ វាស់គែមដោយផ្ទាល់ពីប៊ូហ្វ័រដែលបានអានពី GPU រួចហើយ ។ ពីមុន
  //   getImageData អាន 0o10 ជួរពេញពីចានគំនូរវិញ ទាំងដែលប៊ូហ្វ័រមានរួច ។ 📃 ⟩
  function mezuriRandanKoloron(buf: Uint8Array, rez: number): string {
    const bendo = 0o10;
    // ⟨ តែគែម 📃 ⟩
    const vicoj = [ 0, bendo - 1, rez - 1, rez - bendo ];
    const kolumnoj = [ 0, bendo - 1, rez - 1, rez - bendo ];
    let sr = 0, sg = 0, sb = 0, n = 0;
    const aldoniEl = ( indekso: number ): void => {
      sr += buf[indekso]; sg += buf[indekso + 1]; sb += buf[indekso + 2]; n++;
    };
    for ( let k2 = 0; k2 < rez; k2 += 0o4 ) {
      for ( let i = 0; i < vicoj.length; i++ ) aldoniEl(( vicoj[i] * rez + k2 ) * 4);
      for ( let i = 0; i < kolumnoj.length; i++ ) aldoniEl(( k2 * rez + kolumnoj[i] ) * 4);
    }
    if ( !n ) return "#585848";
    return "rgb(" + Math.round(sr / n) + "," + Math.round(sg / n) + "," + Math.round(sb / n) + ")";
  }

  function molaRandon(kanvasa: HTMLCanvasElement, fado: number): void {
    const k = kanvasa.getContext("2d");
    if ( !k ) return;
    const r = kanvasa.width;
    k.globalCompositeOperation = "destination-out";
    const gradientaBendo = ( x0: number, y0: number, x1: number, y1: number,
      rekt: [ number, number, number, number ] ): void => {
      const g = k.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      k.fillStyle = g;
      k.fillRect(rekt[0], rekt[1], rekt[2], rekt[3]);
    };
    gradientaBendo(0, 0, 0, fado, [ 0, 0, r, fado ]);
    gradientaBendo(0, r, 0, r - fado, [ 0, r - fado, r, fado ]);
    gradientaBendo(0, 0, fado, 0, [ 0, 0, fado, r ]);
    gradientaBendo(r, 0, r - fado, 0, [ r - fado, 0, fado, r ]);
    k.globalCompositeOperation = "source-over";
  }

  function desegniMapanFonon(ctx: CanvasRenderingContext2D, w: number, h: number,
    cx: number, cz: number, hw: number, hh: number): void {
    const unuo = w / ( 2 * hw );
    const [ mx, my ] = mondoAlEkrano(0, 0, cx, cz, hw, hh, w, h);
    const rando = MAPA_BAKA_DUONO * unuo;
    const horizonto = Math.max(rando * 0o3, Math.hypot(w, h) * 0o1/0o2);
    const gradiento = ctx.createRadialGradient(mx, my, 0, mx, my, horizonto);
    gradiento.addColorStop(0, mapaRandaKoloro);
    gradiento.addColorStop(Math.min(0o3/0o4, rando / horizonto), mapaRandaKoloro);
    gradiento.addColorStop(1, mapaNebulaKoloro);
    ctx.fillStyle = gradiento;
    ctx.fillRect(0, 0, w, h);
  }

  function desegniMapanTavolon(ctx: CanvasRenderingContext2D, fonto: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, w: number, h: number): void {
    const rez = MAPA_BAKA_REZ, duono = MAPA_BAKA_DUONO;
    const sx = ( duono - ( cx + hw ) ) / ( 2 * duono ) * rez;
    const sy = ( duono - ( cz + hh ) ) / ( 2 * duono ) * rez;
    const sw = ( 2 * hw ) / ( 2 * duono ) * rez;
    const sh = ( 2 * hh ) / ( 2 * duono ) * rez;
    ctx.drawImage(fonto, sx, sy, sw, sh, 0, 0, w, h);
  }

  function mondoAlEkrano(x: number, z: number, cx: number, cz: number, hw: number, hh: number, w: number, h: number): [ number, number ] {
    return [ ( ( cx + hw ) - x ) / ( 2 * hw ) * w, ( ( cz + hh ) - z ) / ( 2 * hh ) * h ];
  }

  // ⟨ ព្រួញផែនទី , ទម្រង់មួយសម្រាប់ទាំងពីរ 📃 ⟩
  const SAGO_R = 0o12/0o2;
  const SAGO_RONDIGO = 0o12/0o10;
  const SAGO_BORDO = 0o2;
  const SAGO_VERTICOJ = [
    { x: 0, y: -SAGO_R },
    { x: SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
    { x: -SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
  ];
  const SAGO_GRANDO = SAGO_R * 0o2 + SAGO_BORDO + 0o2;

  function desegniSaganFormon(ctx: CanvasRenderingContext2D): void {
    const [ A, B, C ] = SAGO_VERTICOJ;
    ctx.beginPath();
    ctx.moveTo(( C.x + A.x ) / 0o2, ( C.y + A.y ) / 0o2);
    ctx.arcTo(A.x, A.y, B.x, B.y, SAGO_RONDIGO);
    ctx.arcTo(B.x, B.y, C.x, C.y, SAGO_RONDIGO);
    ctx.arcTo(C.x, C.y, A.x, A.y, SAGO_RONDIGO);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = SAGO_BORDO;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function kreiSaganBildon(grandeco = SAGO_GRANDO): string {
    const denso = Math.min(0o2, Math.max(1, devicePixelRatio || 1));
    const kanvasa = document.createElement("canvas");
    kanvasa.width = kanvasa.height = Math.ceil(grandeco * denso);
    const k = kanvasa.getContext("2d");
    if ( !k ) return "";
    const skalo = ( grandeco / SAGO_GRANDO ) * denso;
    k.scale(skalo, skalo);
    k.translate(SAGO_GRANDO / 0o2, SAGO_GRANDO / 0o2);
    desegniSaganFormon(k);
    return kanvasa.toDataURL();
  }

  function desegniMarkilon(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const [ px, py ] = mondoAlEkrano(mapX, mapZ, cx, cz, hw, hh, w, h);
    const fx = vidX, fz = vidZ;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(-fx, fz));
    desegniSaganFormon(ctx);
    ctx.restore();
  }

  function desegniMovantajnPunktojn(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const punkto = ( x: number, z: number, koloro: string ) => {
      const [ px, py ] = mondoAlEkrano(x, z, cx, cz, hw, hh, w, h);
      if ( px < -3 || px > w + 3 || py < -3 || py > h + 3 ) return;
      ctx.fillStyle = koloro;
      ctx.beginPath(); ctx.arc(px, py, 0o14/0o10, 0, Math.PI * 2); ctx.fill();
    };
    for ( const c of kanuoj ) punkto(c.x, c.z, "#e8d8b0");
    for ( const n of npcoj ) punkto(n.group.position.x, n.group.position.z, "#b8b0a0");
  }

  // ⟨ ម្ជុលពាក់សញ្ញាសម្គាល់លើរ៉ាដា 📃 ⟩
  const radaraKunteksto = miniKanvaso.getContext("2d");
  function desegniRadaron(): void {
    const ctx = radaraKunteksto;
    if ( !ctx || !bakitaMapo ) return;
    desegniMapanTavolon(ctx, bakitaMapo, mapX, mapZ, RADARA_DUONO, RADARA_DUONO, 0o200, 0o200);
    desegniMovantajnPunktojn(ctx, 0o200, 0o200, mapX, mapZ, RADARA_DUONO, RADARA_DUONO);
  }

  function desegniPlenanMapon(): void {
    if ( !plenaKanvaso || !plenaKunteksto || !bakitaMapo ) return;
    const nun = performance.now();
    if ( nun - lastaPlenaMapoTempo < PLENA_MAPA_PERIODO ) return;
    lastaPlenaMapoTempo = nun;
    const kanvasa = plenaKanvaso;
    const ctx = plenaKunteksto;
    const w = kanvasa.clientWidth || innerWidth;
    const h = kanvasa.clientHeight || innerHeight;
    if ( kanvasa.width !== w || kanvasa.height !== h ) { kanvasa.width = w; kanvasa.height = h; }
    const aspekto = w / h;
    const hw = plenaDuono * aspekto, hh = plenaDuono;
    desegniMapanFonon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    desegniMapanTavolon(ctx, bakitaMapo, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh, w, h);
    desegniMarkilon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    desegniMovantajnPunktojn(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
  }

  // ⟨ ផែនទីជាជម្រើសបន្ថែម មិនមែនលក្ខខណ្ឌចូលពិភពលោក 📃 ⟩
  // រង់ចាំស៊ុមហ្គេមមួយ រួចទុកពេលឱ្យកម្មវិធីរុករកបង្ហាញវា ។ ការបរាជ័យ
  // បិទតែផែនទី ហើយមិនបញ្ឈប់ពិភពលោក ឬ ព្យាយាមបង្កើត GPU context ថ្មីជាប់ៗគ្នាទេ ។
  // ⟨ អ្នករង់ចាំការដុត ៖ វាំងននផ្ទុករង់ចាំរហូតរ៉ាដារួចរាល់ ។
  //   បើការដុតពន្យារ , ពួកគេត្រូវដោះលែងដើម្បីកុំឱ្យហ្គេមជាប់ជារៀងរហូត 📃 ⟩
  let bakajSolvantoj: ( () => void )[] = [];
  function solviBakadon(): void {
    const solvantoj = bakajSolvantoj;
    bakajSolvantoj = [];
    for ( const solvi of solvantoj ) solvi();
  }

  function pretigi(): Promise<void> {
    if ( bakitaMapo || mapaMalsukcesis ) return Promise.resolve();
    const promeso = new Promise<void>(( solvi ) => { bakajSolvantoj.push(solvi); });
    if ( mapaBakado ) return promeso;
    mapaPetita = true;
    mapaBakado = true;
    requestAnimationFrame(() => {
      setTimeout(() => {
        let provis = false;
        try {
          if ( !document.hidden && !bildilo.getContext().isContextLost() ) {
            provis = true;
            bakitaMapo = bakiMapon();
          }
        } catch ( e ) {
          console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ការរៀបចំផែនទីបរាជ័យ", e);
        } finally {
          mapaBakado = false;
        }
        // ⟨ មិនបានសាកល្បង ( ផ្ទាំងលាក់ ឬ GPU បាត់ ) ៖ ទុកសំណើទុក
        //   ហើយព្រឹត្តិការណ៍បន្តនឹងហៅម្តងទៀត 📃 ⟩
        if ( !provis ) { solviBakadon(); return; }
        mapaPetita = false;
        if ( bakitaMapo ) {
          if ( malfermoAtendas ) {
            malfermoAtendas = false;
            malfermiMapon();
          }
        } else {
          mapaMalsukcesis = true;
          malfermoAtendas = false;
          kompaso.style.display = "none";
        }
        solviBakadon();
      }, 0);
    });
    return promeso;
  }
  document.addEventListener("visibilitychange", () => {
    if ( !document.hidden && mapaPetita ) pretigi();
  });
  bildilo.domElement.addEventListener("webglcontextrestored", () => {
    if ( mapaPetita ) pretigi();
  });

  function malfermiMapon(): void {
    if ( mapoMalfermita ) return;
    if ( !bakitaMapo ) {
      malfermoAtendas = true;
      pretigi();
      return;
    }
    if ( !plenaKanvaso ) {
      const kanvasa = document.createElement("canvas");
      kanvasa.id = "plenaKanvaso";
      kanvasa.width = innerWidth;
      kanvasa.height = innerHeight;
      plenaKanvaso = kanvasa;
      plenaKunteksto = kanvasa.getContext("2d");
      if ( !plenaKunteksto ) { console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ផែនទីពេញមិនអាចប្រើបាន ( បរិបទ 2D )"); plenaKanvaso = null; return; }
      kanvasa.addEventListener("wheel", ( e ) => {
        e.preventDefault();
        const delt = e.deltaMode === 1 ? e.deltaY * 0o20 : e.deltaY;
        plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * Math.exp(delt * 0o1/0o2000)));
        postuliPlenanMapon();
      }, { passive: false });
      const tiriPans = ( dx: number, dy: number ) => {
        const pp = ( 2 * plenaDuono ) / ( kanvasa.clientHeight || innerHeight );
        const aspekto = ( kanvasa.clientWidth || innerWidth ) / ( kanvasa.clientHeight || innerHeight );
        const hw = plenaDuono * aspekto, hh = plenaDuono;
        const lim = ( centro: number, duono: number ) => {
          const min = -MAPA_BAKA_DUONO + duono, max = MAPA_BAKA_DUONO - duono;
          return min > max ? 0 : Math.max(min, Math.min(max, centro));
        };
        mapaPanX = lim(mapX + mapaPanX + dx * pp, hw) - mapX;
        mapaPanZ = lim(mapZ + mapaPanZ + dy * pp, hh) - mapZ;
        postuliPlenanMapon();
      };
      tuŝaGesto(kanvasa, {
        jeTiro: tiriPans,
        jePinĉo: ( pinĉaDistanco, nova ) => {
          plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * pinĉaDistanco / nova));
          postuliPlenanMapon();
        },
      });
      kanvasa.addEventListener("dblclick", () => { mapaPanX = 0; mapaPanZ = 0; postuliPlenanMapon(); });
    }
    plenaDuono = PLENA_DUONO;
    mapaPanX = 0; mapaPanZ = 0;
    postuliPlenanMapon();
    document.getElementById("supermetaTitolo")!.textContent = traduki("titoloMapo");
    document.getElementById("supermetaSupra")!.textContent = "";
    supermetaEnhavo.innerHTML = "";
    supermeta.appendChild(plenaKanvaso);
    supermeta.classList.add("mapo");
    mapoMalfermita = true;
    kompaso.setAttribute("aria-pressed", "true");
    supermeta.classList.add("montri");
    aplikiVacepu();
  }
  function fermiMapon(): void {
    mapoMalfermita = false;
    kompaso.setAttribute("aria-pressed", "false");
    supermeta.classList.remove("mapo");
    supermeta.classList.remove("montri");
    plenaKanvaso?.remove();
    plenaKanvaso = null;
    plenaKunteksto = null;
  }
  kompaso.addEventListener("click", malfermiMapon);
  kompaso.addEventListener("keydown", ( e ) => {
    if ( e.code === "Enter" || e.code === "Space" ) { e.preventDefault(); malfermiMapon(); }
  });

  miniKanvaso.width = miniKanvaso.height = 0o200;
  const SAGO_NADLA_GRANDO = 0o24;
  const sagoBildo = kreiSaganBildon(SAGO_NADLA_GRANDO);
  if ( sagoBildo ) {
    nadlo.style.setProperty("--sagoGrando", SAGO_NADLA_GRANDO + "px");
    nadlo.style.setProperty("--sago", `url("${sagoBildo}")`);
  }

  // ⟨ សរសេរ style.transform តែពេលមុំប្រែ ។ ការសរសេរ DOM រាល់ហ្វ្រេម
  //   បង្ខំឱ្យកម្មវិធីរុករកគណនារចនាប័ទ្មឡើងវិញដោយឥតប្រយោជន៍ ។ 📃 ⟩
  let lastaNadlaAngulo = NaN;
  function gxisdatigi(vx: number, vz: number, cx: number, cz: number): void {
    vidX = vx; vidZ = vz;
    mapX = cx; mapZ = cz;
    const angulo = Math.atan2(-vidX, vidZ);
    if ( angulo === lastaNadlaAngulo ) return;
    lastaNadlaAngulo = angulo;
    nadlo.style.transform = `rotate(${angulo}rad)`;
  }

  return {
    gxisdatigi, pretigi, malfermi: malfermiMapon, fermi: fermiMapon,
    cxuMalfermita: () => mapoMalfermita, cxuBakita: () => bakitaMapo !== null,
    desegniRadaron, desegniPlenanMapon,
  };
}
