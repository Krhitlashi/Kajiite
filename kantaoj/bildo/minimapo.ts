// ≺⧼ ŋᷠɹ ʃᴜ j͐ʃɹ 🧭 ⧽≻
import * as THREE from "three";
import { HERBA_TAVOLA_NOMO } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/gazono.js";
import { devigiHerbanGxisdatigon } from "../../eskekoj/shalaj-hapudal/vegetajxo/fe1af/vento.js";
import { tuŝaGesto } from "../fasado/gestoj.js";
import { vidlimojnMalŝalti, vidlimojnŜalti } from "./vidlimo.js";
import { MALPOTENCA_APARATO } from "./scena/aparato.js";

export interface MinimapajHasukf2qani {
  qena: THREE.Scene;
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
    hapaga: { hapaga: { hate: THREE.Object3D }[] };
    hatemek: { hatemek: { hate: THREE.Object3D }[] };
  };
  traduki: ( ca3aq: string ) => string;
  aplikiVacepu: () => void;
}

export interface Minimapo {
  gxisdatigi(vidX: number, vidZ: number, centroX: number, centroZ: number): void;
  tsekeBakita(): boolean;
  // ⟨ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  pretigi(): Promise<void>;
  tsekeMalfermita(): boolean;
  malfermi(): void;
  fermi(): void;
  k2fRadaron(): void;
  k2fPlenanMapon(): void;
}

export function kf2Minimapon(hasukf2qani: MinimapajHasukf2qani): Minimapo {
  const { qena, bildilo, miniKanvaso, kompaso, nadlo, supermeta, supermetaEnhavo,
    mapoGrandeco, traduki, aplikiVacepu } = hasukf2qani;
  const { npcoj, kanuoj, hapaga, hatemek } = hasukf2qani.movantoj;

  // ⟪ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ , ſȷwɔ˞ ʌ ſɭꞇ ı],ɹ ʌ j͑ʃᴜꞇ 📃 ⟫
  let mapoMalfermita = false;
  let plenaKanvaso: HTMLCanvasElement | null = null;
  let plenaKuns2bana: CanvasRenderingContext2D | null = null;
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
  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ , }ʃᴜ j͐ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅ ſןɹ ɭʃэ ſɭ,ɜ ʌ ꞙɭı ʌ ꞙɭı GPU
  //   maxTextureSize 📃 ⟩
  const MAPA_BAKA_REZ = Math.min(MALPOTENCA_APARATO ? 0o1000 : 0o2000,
    bildilo.capabilities.maxTextureSize);
  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭᴜ ſɭw j͐ʃᴜ ʌ ʃэȝ , ſɭᴜ ſ͕ȷɔ ʌ ſȷwɔ˞
  //   ꞙɭɔ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
  const MAPA_BAKA_FADO = Math.round(0o230 * MAPA_BAKA_REZ / 0o3000);
  let mapaRandaKoloro = "#585848";
  let mapaNebulaKoloro = "#c8d8d8";
  let plenaDuono = PLENA_DUONO;
  let mapaPanX = 0;
  let mapaPanZ = 0;
  // ⟨ ſɭꞇ ı],ɹ ʌ j͑ʃᴜꞇ ʌ ꞙɭıɔɔ ⟅ j͑ʃɹ j͑ʃᴜ ʃɜ
  //   j͑ʃɹ j͑ʃᴜ ʃɜ ʌ j͑ʃᴜꞇ 📃 ⟩
  const PLENA_MAPA_PERIODO = 0o100;
  let lastaPlenaMapoTempo = -Infinity;
  function postuliPlenanMapon(): void { lastaPlenaMapoTempo = -Infinity; }

  function bakiMapon(): HTMLCanvasElement | null {
    const rez = MAPA_BAKA_REZ, p2somani = MAPA_BAKA_DUONO;
    const rt = new THREE.WebGLRenderTarget(rez, rez, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    try {
      // ⟨ ſןɹ ɭʃэ ſɭ,ɜ ʌ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɜ j͑ʃƨɹ ⟅
      // ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ 📃 ⟩
      rt.texture.colorSpace = THREE.SRGBColorSpace;
      const mapFotilo = new THREE.OrthographicCamera(-p2somani, p2somani, p2somani, -p2somani, 1, 0o230);
      mapFotilo.up.set(0, 0, 1);
      mapFotilo.position.set(0, 0o130, 0);
      mapFotilo.lookAt(0, 0, 0);
      // ⟨ ſɟᴜ ֭ſɭэ ſɭэ ʌ ꞙɭı ʌ ꞙɭı ⟅ ſȷwɔ˞ ſןw ʃᴜ }ʃꞇ ʌ ꞙɭı
      //   j͑ʃᴜꞇ ʌ ꞙɭı ʌ ꞙɭı , ſɭэ ſɭᴜ 📃 ⟩
      const kaŝitaj: { obj: THREE.Object3D; videbla: boolean }[] = [];
      const kaŝu = ( obj: THREE.Object3D ): void => {
        kaŝitaj.push({ obj, videbla: obj.visible });
        obj.visible = false;
      };
      // ⟨ ŋᷠᴜ ֭ſɭᴜ ʌ ſȷwɔ˞ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɟᴜ ɭʃᴜ ֭ſɭᴜȝ
      //   ŋᷠᴜ ֭ſɭᴜ ʌ j͑ʃᴜꞇ ⟅ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃɜ ſɭ,ᴜ ⟅
      //   ſɭw ʃᴜ }ʃꞇ ʌ ꞙɭɔ ⟅ ſןw ʃᴜ }ʃꞇ ꞙɭɔ ⟅
      //   ꞙɭɔ ʌ ꞙɭı ʌ ſɭɜ ʃɔ ʌ ſȷwɔ˞ 📃 ⟩
      const nebulo = qena.fog;
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
        // ⟨ ſȷwɔ˞ ʌ ſɭꞇ ı],ɹ 📃 ⟩
        vidlimojnMalŝalti();
        // ⟨ ſȷɔ ſᶘᴜʞ ʌ ꞙɭɔ ʌ ſɭᴜʞ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
        for ( const o of qena.children ) {
          if ( o.name !== HERBA_TAVOLA_NOMO ) continue;
          kaŝu(o);
        }
        for ( const n of npcoj ) kaŝu(n.group);
        for ( const c of kanuoj ) kaŝu(c.group);
        for ( const b of hapaga.hapaga ) kaŝu(b.hate);
        for ( const p of hatemek.hatemek ) kaŝu(p.hate);
        bildilo.setRenderTarget(rt);
        // ⟨ ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅
        //   ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
        bildilo.render(qena, mapFotilo);
      } finally {
        // ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ , ſןɹ ɭʃэ ſɭ,ɜ ʌ ſɭˬɹ ʌ ſɭɜ ʃɔ 📃 ⟩
        restarigiNebulon();
        bildilo.setRenderTarget(null);
        for ( const ero of kaŝitaj ) ero.obj.visible = ero.videbla;
        vidlimojnŜalti();
        // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſȷwɔ˞ ʌ ꞁȷ̀ɜ ɭʃɹ ʃᴜ j͑ʃᴜꞇ ʌ ſɭɹ ſןᴜ ⟅
        //   ſȷɔ ſᶘᴜʞ ʌ ꞙɭı ʌ ſɭɜ ɭʃᴜ 📃 ⟩
        devigiHerbanGxisdatigon();
      }
      if ( qena.fog ) mapaNebulaKoloro = "#" + qena.fog.color.getHexString();
      // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭı 📃 ⟩
      const buf = new Uint8Array(rez * rez * 4);
      bildilo.readRenderTargetPixels(rt, 0, 0, rez, rez, buf);
      const tempX2pa = new Uint8Array(rez * 4);
      for ( let y = 0; y < ( rez >> 1 ); y++ ) {
        const teru = y * rez * 4, malsupra = ( rez - 1 - y ) * rez * 4;
        tempX2pa.set(buf.subarray(teru, teru + rez * 4));
        buf.copyWithin(teru, malsupra, malsupra + rez * 4);
        buf.set(tempX2pa, malsupra);
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
      console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ" , e);
      return null;
    } finally {
      // ⟨ GPU render target ʌ ꞙɭɔ ʌ j͑ʃᴜꞇ 📃 ⟩
      rt.dispose();
    }
  }

  // ⟨ ſןw ſɭᴜƴ ʌ GPU ⟅
  //   getImageData ꞙɭıɔ ⟅ ſןɹ ɭʃэ ſɭ,ɜ 📃 ⟩
  function mezuriRandanKoloron(buf: Uint8Array, rez: number): string {
    const bendo = 0o10;
    // ⟨ ſןw ſɭᴜƴ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const hax2pa = [ 0, bendo - 1, rez - 1, rez - bendo ];
    const kolumnoj = [ 0, bendo - 1, rez - 1, rez - bendo ];
    let sr = 0, sg = 0, sb = 0, n = 0;
    const aldoniEl = ( vecax2lani: number ): void => {
      sr += buf[vecax2lani]; sg += buf[vecax2lani + 1]; sb += buf[vecax2lani + 2]; n++;
    };
    for ( let k2 = 0; k2 < rez; k2 += 0o4 ) {
      for ( let i = 0; i < hax2pa.length; i++ ) aldoniEl(( hax2pa[i] * rez + k2 ) * 4);
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

  function k2fMapanFonon(ctx: CanvasRenderingContext2D, w: number, h: number,
    cx: number, cz: number, hw: number, hh: number): void {
    const unuo = w / ( 2 * hw );
    const [ mx, my ] = mondoAlEkrano(0, 0, cx, cz, hw, hh, w, h);
    const pukaz = MAPA_BAKA_DUONO * unuo;
    const horizonto = Math.max(pukaz * 0o3, Math.hypot(w, h) * 0o1/0o2);
    const ar2ha = ctx.createRadialGradient(mx, my, 0, mx, my, horizonto);
    ar2ha.addColorStop(0, mapaRandaKoloro);
    ar2ha.addColorStop(Math.min(0o3/0o4, pukaz / horizonto), mapaRandaKoloro);
    ar2ha.addColorStop(1, mapaNebulaKoloro);
    ctx.fillStyle = ar2ha;
    ctx.fillRect(0, 0, w, h);
  }

  function k2fMapanTavolon(ctx: CanvasRenderingContext2D, tsiq: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, w: number, h: number): void {
    const rez = MAPA_BAKA_REZ, p2somani = MAPA_BAKA_DUONO;
    const sx = ( p2somani - ( cx + hw ) ) / ( 2 * p2somani ) * rez;
    const sy = ( p2somani - ( cz + hh ) ) / ( 2 * p2somani ) * rez;
    const sw = ( 2 * hw ) / ( 2 * p2somani ) * rez;
    const sh = ( 2 * hh ) / ( 2 * p2somani ) * rez;
    ctx.drawImage(tsiq, sx, sy, sw, sh, 0, 0, w, h);
  }

  function mondoAlEkrano(x: number, z: number, cx: number, cz: number, hw: number, hh: number, w: number, h: number): [ number, number ] {
    return [ ( ( cx + hw ) - x ) / ( 2 * hw ) * w, ( ( cz + hh ) - z ) / ( 2 * hh ) * h ];
  }

  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  const SAGO_R = 0o12/0o2;
  const SAGO_RONDIGO = 0o12/0o10;
  const SAGO_BORDO = 0o2;
  const SAGO_VERTICOJ = [
    { x: 0, y: -SAGO_R },
    { x: SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
    { x: -SAGO_R * 0o71/0o100, y: SAGO_R * 0o5/0o10 },
  ];
  const SAGO_GRANDO = SAGO_R * 0o2 + SAGO_BORDO + 0o2;

  function k2fSaganQoxan(ctx: CanvasRenderingContext2D): void {
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

  function kf2SaganBildon(grandeco = SAGO_GRANDO): string {
    const denso = Math.min(0o2, Math.max(1, devicePixelRatio || 1));
    const kanvasa = document.createElement("canvas");
    kanvasa.width = kanvasa.height = Math.ceil(grandeco * denso);
    const k = kanvasa.getContext("2d");
    if ( !k ) return "";
    const p6zukani = ( grandeco / SAGO_GRANDO ) * denso;
    k.scale(p6zukani, p6zukani);
    k.translate(SAGO_GRANDO / 0o2, SAGO_GRANDO / 0o2);
    k2fSaganQoxan(k);
    return kanvasa.toDataURL();
  }

  function k2fMarkilon(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const [ px, py ] = mondoAlEkrano(mapX, mapZ, cx, cz, hw, hh, w, h);
    const fx = vidX, fz = vidZ;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(-fx, fz));
    k2fSaganQoxan(ctx);
    ctx.restore();
  }

  function k2fMovantajnPunktojn(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const n2k = ( x: number, z: number, weh2: string ) => {
      const [ px, py ] = mondoAlEkrano(x, z, cx, cz, hw, hh, w, h);
      if ( px < -3 || px > w + 3 || py < -3 || py > h + 3 ) return;
      ctx.fillStyle = weh2;
      ctx.beginPath(); ctx.arc(px, py, 0o14/0o10, 0, Math.PI * 2); ctx.fill();
    };
    for ( const c of kanuoj ) n2k(c.x, c.z, "#e8d8b0");
    for ( const n of npcoj ) n2k(n.group.position.x, n.group.position.z, "#b8b0a0");
  }

  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɔ ſᶘɹ ʌ ꞙɭı 📃 ⟩
  const radaraKuns2bana = miniKanvaso.getContext("2d");
  function k2fRadaron(): void {
    const ctx = radaraKuns2bana;
    if ( !ctx || !bakitaMapo ) return;
    k2fMapanTavolon(ctx, bakitaMapo, mapX, mapZ, RADARA_DUONO, RADARA_DUONO, 0o200, 0o200);
    k2fMovantajnPunktojn(ctx, 0o200, 0o200, mapX, mapZ, RADARA_DUONO, RADARA_DUONO);
  }

  function k2fPlenanMapon(): void {
    if ( !plenaKanvaso || !plenaKuns2bana || !bakitaMapo ) return;
    const nun = performance.now();
    if ( nun - lastaPlenaMapoTempo < PLENA_MAPA_PERIODO ) return;
    lastaPlenaMapoTempo = nun;
    const kanvasa = plenaKanvaso;
    const ctx = plenaKuns2bana;
    const w = kanvasa.clientWidth || innerWidth;
    const h = kanvasa.clientHeight || innerHeight;
    if ( kanvasa.width !== w || kanvasa.height !== h ) { kanvasa.width = w; kanvasa.height = h; }
    const aspekto = w / h;
    const hw = plenaDuono * aspekto, hh = plenaDuono;
    k2fMapanFonon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    k2fMapanTavolon(ctx, bakitaMapo, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh, w, h);
    k2fMarkilon(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
    k2fMovantajnPunktojn(ctx, w, h, mapX + mapaPanX, mapZ + mapaPanZ, hw, hh);
  }

  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭı ʌ ꞙɭı , ꞙɭɔ ʌ ſȷwɔ˞ ʌ }ʃᴜ j͐ʃᴜ 📃 ⟩
  // ſɭɜ ſɭᴜ j͐ʃᴜ ʌ ɭl̀ɜ ſ͕ɭᴜ ⟅ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞
  // ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſȷwɔ˞ , ꞙɭɔ ʌ }ʃᴜ j͐ʃᴜ ⟅
  // ⟨ j͑ʃᴜꞇ ʌ j͑ʃᴜ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅ ſɟᴜ ſȷᴜɔ˞
  //   ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃɜ ſןɹ , ꞙɭı 📃 ⟩
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
          console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ", e);
        } finally {
          mapaBakado = false;
        }
        // ⟨ ꞙɭɔ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ ( ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ ) ⟅
        //   j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
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
      plenaKuns2bana = kanvasa.getContext("2d");
      if ( !plenaKuns2bana ) { console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ ( 2D )"); plenaKanvaso = null; return; }
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
        const lim = ( sost2: number, p2somani: number ) => {
          const min = -MAPA_BAKA_DUONO + p2somani, max = MAPA_BAKA_DUONO - p2somani;
          return min > max ? 0 : Math.max(min, Math.min(max, sost2));
        };
        mapaPanX = lim(mapX + mapaPanX + dx * pp, hw) - mapX;
        mapaPanZ = lim(mapZ + mapaPanZ + dy * pp, hh) - mapZ;
        postuliPlenanMapon();
      };
      tuŝaGesto(kanvasa, {
        jeTiro: tiriPans,
        jePinĉo: ( pinĉaDistanco, sef4 ) => {
          plenaDuono = Math.max(MINA_DUONO, Math.min(MAXA_DUONO, plenaDuono * pinĉaDistanco / sef4));
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
    plenaKuns2bana = null;
  }
  kompaso.addEventListener("click", malfermiMapon);
  kompaso.addEventListener("keydown", ( e ) => {
    if ( e.code === "Enter" || e.code === "Space" ) { e.preventDefault(); malfermiMapon(); }
  });

  miniKanvaso.width = miniKanvaso.height = 0o200;
  const SAGO_NADLA_GRANDO = 0o24;
  const sagoBildo = kf2SaganBildon(SAGO_NADLA_GRANDO);
  if ( sagoBildo ) {
    nadlo.style.setProperty("--sagoGrando", SAGO_NADLA_GRANDO + "px");
    nadlo.style.setProperty("--sago", `url("${sagoBildo}")`);
  }

  // ⟨ style.transform ʌ j͑ʃᴜꞇ ʌ ſɭɜ ⟅ DOM ɭl̀ɜ ſ͕ɭᴜ
  //   ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
  let lastaNadlaAngulo = NaN;
  function gxisdatigi(vx: number, vz: number, cx: number, cz: number): void {
    vidX = vx; vidZ = vz;
    mapX = cx; mapZ = cz;
    const tafkaq = Math.atan2(-vidX, vidZ);
    if ( tafkaq === lastaNadlaAngulo ) return;
    lastaNadlaAngulo = tafkaq;
    nadlo.style.transform = `rotate(${tafkaq}rad)`;
  }

  return {
    gxisdatigi, pretigi, malfermi: malfermiMapon, fermi: fermiMapon,
    tsekeMalfermita: () => mapoMalfermita, tsekeBakita: () => bakitaMapo !== null,
    k2fRadaron, k2fPlenanMapon,
  };
}
