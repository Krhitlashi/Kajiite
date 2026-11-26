// ≺⧼ ŋᷠɹ ʃᴜ j͐ʃɹ 🧭 ⧽≻
import * as THREE from "three";
import { HERBATAVOLANOMO } from "../../skek2/pudal/xa3e/fe1af/gazono.js";
import { devigiHerbanGxisdatigon } from "../../skek2/pudal/xa3e/fe1af/g2b2.js";
import { tuŝaTamaVaxafa } from "../fasado/tamaVaxafoj.js";
import { vidhaplosteqMalŝalti, vidhaplosteqŜalti } from "./vidlimo.js";
import { MALPOTENCAAPARATO } from "./scena/cak2p2.js";

export interface MinimapajHasukf2qani {
  qena: THREE.Scene;
  k2fcakuk: THREE.WebGLRenderer;
  miniP2t6zo: HTMLCanvasElement;
  kompaso: HTMLElement;
  nadlo: HTMLElement;
  kubapuc2qx2t2: HTMLElement;
  kubapuc2qx2t2Enhavo: HTMLElement;
  bal2Pal6: number;
  movantoj: {
    hanpco: { group: THREE.Object3D }[];
    has2kaj2: { x: number; z: number; group: THREE.Object3D }[];
    hapaga: { hapaga: { hate2: THREE.Object3D }[] };
    hatemek: { hatemek: { hate2: THREE.Object3D }[] };
  };
  traduki: ( ca3aq: string ) => string;
  aplikiVacepu: () => void;
}

export interface Minimapo {
  tlak2(vidX: number, vidZ: number, sost2X: number, sost2Z: number): void;
  tsekeBakita(): boolean;
  // ⟨ j͑ʃᴜꞇ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  pretigi(): Promise<void>;
  tsekeH6w6ita(): boolean;
  h6w6i(): void;
  pukxei(): void;
  k2fRadaron(): void;
  k2fL2hanBal2(): void;
}

export function kf2Minimapon(hasukf2qani: MinimapajHasukf2qani): Minimapo {
  const { qena, k2fcakuk, miniP2t6zo, kompaso, nadlo, kubapuc2qx2t2, kubapuc2qx2t2Enhavo,
    bal2Pal6, traduki, aplikiVacepu } = hasukf2qani;
  const { hanpco, has2kaj2, hapaga, hatemek } = hasukf2qani.movantoj;

  // ⟪ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſᶘɔ ŋᷠɹ ŋᷠɹ , ſȷwɔ˞ ʌ ſɭꞇ ı],ɹ ʌ j͑ʃᴜꞇ 📃 ⟫
  let bal2H6w6ita = false;
  let l2haP2t6zo: HTMLCanvasElement | null = null;
  let l2haKuns2bana: CanvasRenderingContext2D | null = null;
  let bakitaBal2: HTMLCanvasElement | null = null;
  let bal2Bakado = false;
  let bal2Malsukcesis = false;
  let bal2Petita = false;
  let h6w6oAtendas = false;
  let mapX = 0o0, mapZ = 0o0;
  let vidX = 0o0, vidZ = 0o0;

  const RADARAP2SOMANI = 0o30;
  const L2HAP2SOMANI = Math.round(bal2Pal6 * 0o13/0o10);
  const MINAP2SOMANI = 0o10;
  const MAXAP2SOMANI = Math.round(L2HAP2SOMANI * 0o15/0o10);
  const MAPABAKAP2SOMANI = 0o1270;
  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ , }ʃᴜ j͐ʃᴜ ʌ ſɟᴜ ſȷᴜɔ˞ ⟅ ſןɹ ɭʃэ ſɭ,ɜ ʌ ꞙɭı ʌ ꞙɭı GPU
  //   maxTextureSize 📃 ⟩
  const MAPABAKAREZ = Math.min(MALPOTENCAAPARATO ? 0o1000 : 0o2000,
    k2fcakuk.capabilities.maxTextureSize);
  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭᴜ ſɭw j͐ʃᴜ ʌ ʃэȝ , ſɭᴜ ſ͕ȷɔ ʌ ſȷwɔ˞
  //   ꞙɭɔ ʌ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
  const MAPABAKAFADO = Math.round(0o230 * MAPABAKAREZ / 0o3000);
  let bal2PukazWeh2 = "#585848";
  let bal2NebulaWeh2 = "#c8d8d8";
  let l2haP2somani = L2HAP2SOMANI;
  let bal2PanX = 0o0;
  let bal2PanZ = 0o0;
  // ⟨ ſɭꞇ ı],ɹ ʌ j͑ʃᴜꞇ ʌ ꞙɭıɔɔ ⟅ j͑ʃɹ j͑ʃᴜ ʃɜ
  //   j͑ʃɹ j͑ʃᴜ ʃɜ ʌ j͑ʃᴜꞇ 📃 ⟩
  const L2HAMAPAPERIODO = 0o100;
  let tlakakaiL2haBal2Tif = -Infinity;
  function postuliL2hanBal2(): void { tlakakaiL2haBal2Tif = -Infinity; }

  function bakiBal2(): HTMLCanvasElement | null {
    const rez = MAPABAKAREZ, p2somani = MAPABAKAP2SOMANI;
    const rt = new THREE.WebGLRenderTarget(rez, rez, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    try {
      // ⟨ ſןɹ ɭʃэ ſɭ,ɜ ʌ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɜ j͑ʃƨɹ ⟅
      // ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ 📃 ⟩
      rt.texture.colorSpace = THREE.SRGBColorSpace;
      const mapCatahaq = new THREE.OrthographicCamera(-p2somani, p2somani, p2somani, -p2somani, 0o1, 0o230);
      mapCatahaq.up.set(0o0, 0o0, 0o1);
      mapCatahaq.position.set(0o0, 0o130, 0o0);
      mapCatahaq.lookAt(0o0, 0o0, 0o0);
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
      const f2m2 = qena.fog;
      let restarigiNebulon = (): void => {};
      try {
        if ( f2m2 instanceof THREE.FogExp2 ) {
          const denso = f2m2.density;
          f2m2.density = 0o0;
          restarigiNebulon = (): void => { f2m2.density = denso; };
        } else if ( f2m2 ) {
          const tsiike = f2m2.near, maltsiike = f2m2.far;
          f2m2.near = 0o100000;
          f2m2.far = 0o100000 + 0o1;
          restarigiNebulon = (): void => { f2m2.near = tsiike; f2m2.far = maltsiike; };
        }
        // ⟨ ſȷwɔ˞ ʌ ſɭꞇ ı],ɹ 📃 ⟩
        vidhaplosteqMalŝalti();
        // ⟨ ſȷɔ ſᶘᴜʞ ʌ ꞙɭɔ ʌ ſɭᴜʞ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟩
        for ( const o of qena.children ) {
          if ( o.name !== HERBATAVOLANOMO ) continue;
          kaŝu(o);
        }
        for ( const n of hanpco ) kaŝu(n.group);
        for ( const c of has2kaj2 ) kaŝu(c.group);
        for ( const b of hapaga.hapaga ) kaŝu(b.hate2);
        for ( const p of hatemek.hatemek ) kaŝu(p.hate2);
        k2fcakuk.setRenderTarget(rt);
        // ⟨ ſɟᴜ j͑ʃᴜ ʌ j͑ʃᴜꞇ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ⟅
        //   ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɟᴜ ſȷᴜɔ˞ 📃 ⟩
        k2fcakuk.render(qena, mapCatahaq);
      } finally {
        // ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ , ſןɹ ɭʃэ ſɭ,ɜ ʌ ſɭˬɹ ʌ ſɭɜ ʃɔ 📃 ⟩
        restarigiNebulon();
        k2fcakuk.setRenderTarget(null);
        for ( const kek of kaŝitaj ) kek.obj.visible = kek.videbla;
        vidhaplosteqŜalti();
        // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſȷwɔ˞ ʌ ꞁȷ̀ɜ ɭʃɹ ʃᴜ j͑ʃᴜꞇ ʌ ſɭɹ ſןᴜ ⟅
        //   ſȷɔ ſᶘᴜʞ ʌ ꞙɭı ʌ ſɭɜ ɭʃᴜ 📃 ⟩
        devigiHerbanGxisdatigon();
      }
      if ( qena.fog ) bal2NebulaWeh2 = "#" + qena.fog.color.getHexString();
      // ⟨ ſɭɹ ſןᴜ ʌ ꞙɭı 📃 ⟩
      const buf = new Uint8Array(rez * rez * 0o4);
      k2fcakuk.readRenderTargetPixels(rt, 0o0, 0o0, rez, rez, buf);
      const tempX2pa = new Uint8Array(rez * 0o4);
      for ( let y = 0o0; y < ( rez >> 0o1 ); y++ ) {
        const teru = y * rez * 0o4, maltik = ( rez - 0o1 - y ) * rez * 0o4;
        tempX2pa.set(buf.subarray(teru, teru + rez * 0o4));
        buf.copyWithin(teru, maltik, maltik + rez * 0o4);
        buf.set(tempX2pa, maltik);
      }
      const bildo = new ImageData(new Uint8ClampedArray(buf.buffer), rez, rez);
      const kanvasa = document.createElement("canvas");
      kanvasa.width = kanvasa.height = rez;
      // ⟨ willReadFrequently 📃 ⟩
      kanvasa.getContext("2d", { willReadFrequently: true })!.putImageData(bildo, 0o0, 0o0);
      bal2PukazWeh2 = vecax2lPukaznWeh2n(buf, rez);
      baz2Randon(kanvasa, MAPABAKAFADO);
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
  function vecax2lPukaznWeh2n(buf: Uint8Array, rez: number): string {
    const siitsii = 0o10;
    // ⟨ ſןw ſɭᴜƴ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
    const hax2pa = [ 0o0, siitsii - 0o1, rez - 0o1, rez - siitsii ];
    const hakolumno = [ 0o0, siitsii - 0o1, rez - 0o1, rez - siitsii ];
    let sr = 0o0, sg = 0o0, sb = 0o0, n = 0o0;
    const tlunakEl = ( vecax2lani: number ): void => {
      sr += buf[vecax2lani]; sg += buf[vecax2lani + 0o1]; sb += buf[vecax2lani + 0o2]; n++;
    };
    for ( let k2 = 0o0; k2 < rez; k2 += 0o4 ) {
      for ( let i = 0o0; i < hax2pa.length; i++ ) tlunakEl(( hax2pa[i] * rez + k2 ) * 0o4);
      for ( let i = 0o0; i < hakolumno.length; i++ ) tlunakEl(( k2 * rez + hakolumno[i] ) * 0o4);
    }
    if ( !n ) return "#585848";
    return "rgb(" + Math.round(sr / n) + "," + Math.round(sg / n) + "," + Math.round(sb / n) + ")";
  }

  function baz2Randon(kanvasa: HTMLCanvasElement, fado: number): void {
    const k = kanvasa.getContext("2d");
    if ( !k ) return;
    const r = kanvasa.width;
    k.globalCompositeOperation = "destination-out";
    const gradientaBendo = ( x0: number, y0: number, x1: number, y1: number,
      rekt: [ number, number, number, number ] ): void => {
      const g = k.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0o0, "rgba(0,0,0,1)");
      g.addColorStop(0o1, "rgba(0,0,0,0)");
      k.fillStyle = g;
      k.fillRect(rekt[0o0], rekt[0o1], rekt[0o2], rekt[0o3]);
    };
    gradientaBendo(0o0, 0o0, 0o0, fado, [ 0o0, 0o0, r, fado ]);
    gradientaBendo(0o0, r, 0o0, r - fado, [ 0o0, r - fado, r, fado ]);
    gradientaBendo(0o0, 0o0, fado, 0o0, [ 0o0, 0o0, fado, r ]);
    gradientaBendo(r, 0o0, r - fado, 0o0, [ r - fado, 0o0, fado, r ]);
    k.globalCompositeOperation = "source-over";
  }

  function k2fMapanFonon(ctx: CanvasRenderingContext2D, w: number, h: number,
    cx: number, cz: number, hw: number, hh: number): void {
    const unuo = w / ( 0o2 * hw );
    const [ mx, my ] = nalaAlEkrano(0o0, 0o0, cx, cz, hw, hh, w, h);
    const pukaz = MAPABAKAP2SOMANI * unuo;
    const horizonto = Math.max(pukaz * 0o3, Math.hypot(w, h) * 0o1/0o2);
    const ar2ha = ctx.createRadialGradient(mx, my, 0o0, mx, my, horizonto);
    ar2ha.addColorStop(0o0, bal2PukazWeh2);
    ar2ha.addColorStop(Math.min(0o3/0o4, pukaz / horizonto), bal2PukazWeh2);
    ar2ha.addColorStop(0o1, bal2NebulaWeh2);
    ctx.fillStyle = ar2ha;
    ctx.fillRect(0o0, 0o0, w, h);
  }

  function k2fMapanTavolon(ctx: CanvasRenderingContext2D, tsiq: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, w: number, h: number): void {
    const rez = MAPABAKAREZ, p2somani = MAPABAKAP2SOMANI;
    const sx = ( p2somani - ( cx + hw ) ) / ( 0o2 * p2somani ) * rez;
    const sy = ( p2somani - ( cz + hh ) ) / ( 0o2 * p2somani ) * rez;
    const sw = ( 0o2 * hw ) / ( 0o2 * p2somani ) * rez;
    const sh = ( 0o2 * hh ) / ( 0o2 * p2somani ) * rez;
    ctx.drawImage(tsiq, sx, sy, sw, sh, 0o0, 0o0, w, h);
  }

  function nalaAlEkrano(x: number, z: number, cx: number, cz: number, hw: number, hh: number, w: number, h: number): [ number, number ] {
    return [ ( ( cx + hw ) - x ) / ( 0o2 * hw ) * w, ( ( cz + hh ) - z ) / ( 0o2 * hh ) * h ];
  }

  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭı ʌ ꞙɭı 📃 ⟩
  const SAGOR = 0o12/0o2;
  const SAGORONDIGO = 0o12/0o10;
  const SAGOBORDO = 0o2;
  const SAGOVERTICOJ = [
    { x: 0o0, y: -SAGOR },
    { x: SAGOR * 0o71/0o100, y: SAGOR * 0o5/0o10 },
    { x: -SAGOR * 0o71/0o100, y: SAGOR * 0o5/0o10 },
  ];
  const SAGOGRANDO = SAGOR * 0o2 + SAGOBORDO + 0o2;

  function k2fSaganQoxan(ctx: CanvasRenderingContext2D): void {
    const [ A, B, C ] = SAGOVERTICOJ;
    ctx.beginPath();
    ctx.moveTo(( C.x + A.x ) / 0o2, ( C.y + A.y ) / 0o2);
    ctx.arcTo(A.x, A.y, B.x, B.y, SAGORONDIGO);
    ctx.arcTo(B.x, B.y, C.x, C.y, SAGORONDIGO);
    ctx.arcTo(C.x, C.y, A.x, A.y, SAGORONDIGO);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = SAGOBORDO;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function kf2SaganBildon(pal6 = SAGOGRANDO): string {
    const denso = Math.min(0o2, Math.max(0o1, devicePixelRatio || 0o1));
    const kanvasa = document.createElement("canvas");
    kanvasa.width = kanvasa.height = Math.ceil(pal6 * denso);
    const k = kanvasa.getContext("2d");
    if ( !k ) return "";
    const p6zukani = ( pal6 / SAGOGRANDO ) * denso;
    k.scale(p6zukani, p6zukani);
    k.translate(SAGOGRANDO / 0o2, SAGOGRANDO / 0o2);
    k2fSaganQoxan(k);
    return kanvasa.toDataURL();
  }

  function k2fMarkilon(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const [ px, py ] = nalaAlEkrano(mapX, mapZ, cx, cz, hw, hh, w, h);
    const fx = vidX, fz = vidZ;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.atan2(-fx, fz));
    k2fSaganQoxan(ctx);
    ctx.restore();
  }

  function k2fMovantajnHan2kn(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cz: number, hw: number, hh: number): void {
    const n2k = ( x: number, z: number, weh2: string ) => {
      const [ px, py ] = nalaAlEkrano(x, z, cx, cz, hw, hh, w, h);
      if ( px < -0o3 || px > w + 0o3 || py < -0o3 || py > h + 0o3 ) return;
      ctx.fillStyle = weh2;
      ctx.beginPath(); ctx.arc(px, py, 0o14/0o10, 0o0, Math.PI * 0o2); ctx.fill();
    };
    for ( const c of has2kaj2 ) n2k(c.x, c.z, "#e8d8b0");
    for ( const n of hanpco ) n2k(n.group.position.x, n.group.position.z, "#b8b0a0");
  }

  // ⟨ ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɔ ſᶘɹ ʌ ꞙɭı 📃 ⟩
  const radaraKuns2bana = miniP2t6zo.getContext("2d");
  function k2fRadaron(): void {
    const ctx = radaraKuns2bana;
    if ( !ctx || !bakitaBal2 ) return;
    k2fMapanTavolon(ctx, bakitaBal2, mapX, mapZ, RADARAP2SOMANI, RADARAP2SOMANI, 0o200, 0o200);
    k2fMovantajnHan2kn(ctx, 0o200, 0o200, mapX, mapZ, RADARAP2SOMANI, RADARAP2SOMANI);
  }

  function k2fL2hanBal2(): void {
    if ( !l2haP2t6zo || !l2haKuns2bana || !bakitaBal2 ) return;
    const nun = performance.now();
    if ( nun - tlakakaiL2haBal2Tif < L2HAMAPAPERIODO ) return;
    tlakakaiL2haBal2Tif = nun;
    const kanvasa = l2haP2t6zo;
    const ctx = l2haKuns2bana;
    const w = kanvasa.clientWidth || innerWidth;
    const h = kanvasa.clientHeight || innerHeight;
    if ( kanvasa.width !== w || kanvasa.height !== h ) { kanvasa.width = w; kanvasa.height = h; }
    const aspekto = w / h;
    const hw = l2haP2somani * aspekto, hh = l2haP2somani;
    k2fMapanFonon(ctx, w, h, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
    k2fMapanTavolon(ctx, bakitaBal2, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh, w, h);
    k2fMarkilon(ctx, w, h, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
    k2fMovantajnHan2kn(ctx, w, h, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
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
    if ( bakitaBal2 || bal2Malsukcesis ) return Promise.resolve();
    const promeso = new Promise<void>(( solvi ) => { bakajSolvantoj.push(solvi); });
    if ( bal2Bakado ) return promeso;
    bal2Petita = true;
    bal2Bakado = true;
    requestAnimationFrame(() => {
      setTimeout(() => {
        let provis = false;
        try {
          if ( !document.hidden && !k2fcakuk.getContext().isContextLost() ) {
            provis = true;
            bakitaBal2 = bakiBal2();
          }
        } catch ( e ) {
          console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ", e);
        } finally {
          bal2Bakado = false;
        }
        // ⟨ ꞙɭɔ ʌ j͑ʃɹ j͐ʃɹ ŋᷠɔ ( ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭɜ ʃɔ ) ⟅
        //   j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
        if ( !provis ) { solviBakadon(); return; }
        bal2Petita = false;
        if ( bakitaBal2 ) {
          if ( h6w6oAtendas ) {
            h6w6oAtendas = false;
            h6w6iBal2();
          }
        } else {
          bal2Malsukcesis = true;
          h6w6oAtendas = false;
          kompaso.style.display = "none";
        }
        solviBakadon();
      }, 0o0);
    });
    return promeso;
  }
  document.addEventListener("visibilitychange", () => {
    if ( !document.hidden && bal2Petita ) pretigi();
  });
  k2fcakuk.domElement.addEventListener("webglcontextrestored", () => {
    if ( bal2Petita ) pretigi();
  });

  function h6w6iBal2(): void {
    if ( bal2H6w6ita ) return;
    if ( !bakitaBal2 ) {
      h6w6oAtendas = true;
      pretigi();
      return;
    }
    if ( !l2haP2t6zo ) {
      const kanvasa = document.createElement("canvas");
      kanvasa.id = "l2haP2t6zo";
      kanvasa.width = innerWidth;
      kanvasa.height = innerHeight;
      l2haP2t6zo = kanvasa;
      l2haKuns2bana = kanvasa.getContext("2d");
      if ( !l2haKuns2bana ) { console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ ( 2D )"); l2haP2t6zo = null; return; }
      kanvasa.addEventListener("wheel", ( e ) => {
        e.preventDefault();
        const delt = e.deltaMode === 0o1 ? e.deltaY * 0o20 : e.deltaY;
        l2haP2somani = Math.max(MINAP2SOMANI, Math.min(MAXAP2SOMANI, l2haP2somani * Math.exp(delt * 0o1/0o2000)));
        postuliL2hanBal2();
      }, { passive: false });
      const tiriPans = ( dx: number, dy: number ) => {
        const pp = ( 0o2 * l2haP2somani ) / ( kanvasa.clientHeight || innerHeight );
        const aspekto = ( kanvasa.clientWidth || innerWidth ) / ( kanvasa.clientHeight || innerHeight );
        const hw = l2haP2somani * aspekto, hh = l2haP2somani;
        const lim = ( sost2: number, p2somani: number ) => {
          const min = -MAPABAKAP2SOMANI + p2somani, max = MAPABAKAP2SOMANI - p2somani;
          return min > max ? 0o0 : Math.max(min, Math.min(max, sost2));
        };
        bal2PanX = lim(mapX + bal2PanX + dx * pp, hw) - mapX;
        bal2PanZ = lim(mapZ + bal2PanZ + dy * pp, hh) - mapZ;
        postuliL2hanBal2();
      };
      tuŝaTamaVaxafa(kanvasa, {
        jeTiro: tiriPans,
        jePinĉo: ( pinĉaH6kuni, sef4 ) => {
          l2haP2somani = Math.max(MINAP2SOMANI, Math.min(MAXAP2SOMANI, l2haP2somani * pinĉaH6kuni / sef4));
          postuliL2hanBal2();
        },
      });
      kanvasa.addEventListener("dblclick", () => { bal2PanX = 0o0; bal2PanZ = 0o0; postuliL2hanBal2(); });
    }
    l2haP2somani = L2HAP2SOMANI;
    bal2PanX = 0o0; bal2PanZ = 0o0;
    postuliL2hanBal2();
    document.getElementById("kubapuc2qx2t2Titolo")!.textContent = traduki("hate2Bal2");
    document.getElementById("kubapuc2qx2t2Teru")!.textContent = "";
    kubapuc2qx2t2Enhavo.innerHTML = "";
    kubapuc2qx2t2.appendChild(l2haP2t6zo);
    kubapuc2qx2t2.classList.add("bal2");
    bal2H6w6ita = true;
    kompaso.setAttribute("aria-pressed", "true");
    kubapuc2qx2t2.classList.add("laqazi");
    aplikiVacepu();
  }
  function pukxeiBal2(): void {
    bal2H6w6ita = false;
    kompaso.setAttribute("aria-pressed", "false");
    kubapuc2qx2t2.classList.remove("bal2");
    kubapuc2qx2t2.classList.remove("laqazi");
    l2haP2t6zo?.remove();
    l2haP2t6zo = null;
    l2haKuns2bana = null;
  }
  kompaso.addEventListener("click", h6w6iBal2);
  kompaso.addEventListener("keydown", ( e ) => {
    if ( e.code === "Enter" || e.code === "Space" ) { e.preventDefault(); h6w6iBal2(); }
  });

  miniP2t6zo.width = miniP2t6zo.height = 0o200;
  const SAGONADLAGRANDO = 0o24;
  const sagoBildo = kf2SaganBildon(SAGONADLAGRANDO);
  if ( sagoBildo ) {
    nadlo.style.setProperty("--sagoGpukaz", SAGONADLAGRANDO + "px");
    nadlo.style.setProperty("--sago", `url("${sagoBildo}")`);
  }

  // ⟨ style.transform ʌ j͑ʃᴜꞇ ʌ ſɭɜ ⟅ DOM ɭl̀ɜ ſ͕ɭᴜ
  //   ꞙɭɔ ʌ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ 📃 ⟩
  let tlakakaiNadlaTafkaq = NaN;
  function tlak2(vx: number, vz: number, cx: number, cz: number): void {
    vidX = vx; vidZ = vz;
    mapX = cx; mapZ = cz;
    const tafkaq = Math.atan2(-vidX, vidZ);
    if ( tafkaq === tlakakaiNadlaTafkaq ) return;
    tlakakaiNadlaTafkaq = tafkaq;
    nadlo.style.transform = `rotate(${tafkaq}rad)`;
  }

  return {
    tlak2, pretigi, h6w6i: h6w6iBal2, pukxei: pukxeiBal2,
    tsekeH6w6ita: () => bal2H6w6ita, tsekeBakita: () => bakitaBal2 !== null,
    k2fRadaron, k2fL2hanBal2,
  };
}
