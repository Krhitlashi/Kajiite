// ≺⧼ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ ſɭэ j͐ʃꞇ ſ͕ɭɀᴜ j͐ʃɹ 📃 ⧽≻

import * as THREE from "three";
import { HERBATAVOLAKSAKA } from "../../skek2/pudal/xa3e/fe1af/fe1af.js";
import { devigiHerbanGxisdatigon } from "../../skek2/pudal/xa3e/fe1af/g2b2.js";
import { ts2na } from "../s2cel2f/ts2na.js";
import { vidhaplosteqKol2, vidhaplosteqSaxe } from "./vidlimo.js";
import { MALPOTENCAAPARATO } from "./scena/cak2p2.js";

export interface BAL2HASUKF2QANI {
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
  skakef: ( ca3aq: string ) => string;
  k2reiVacepu: () => void;
}

export interface Minimapo {
  tlak2(vidX: number, vidZ: number, sost2X: number, sost2Z: number): void;
  tsekeBakita(): boolean;

  pretigi(): Promise<void>;
  tsekeH6w6ita(): boolean;
  h6w6i(): void;
  pukxei(): void;
  k2fRadaron(): void;
  k2fL2hanBal2(): void;
}

export function kf2Minimapon(hasukf2qani: BAL2HASUKF2QANI): Minimapo {
  const { qena, k2fcakuk, miniP2t6zo, kompaso, nadlo, kubapuc2qx2t2, kubapuc2qx2t2Enhavo,
    bal2Pal6, skakef, k2reiVacepu } = hasukf2qani;
  const { hanpco, has2kaj2, hapaga, hatemek } = hasukf2qani.movantoj;

  let bal2H6w6ita = false;
  let l2haP2t6zo: HTMLCanvasElement | null = null;
  let l2haKuns2bana: CanvasRenderingContext2D | null = null;
  let xokafitaBal2: HTMLCanvasElement | null = null;
  let bal2Xokaf2 = false;
  let bal2Malsukcesis = false;
  let bal2Petita = false;
  let h6w6iAmal = false;
  let mapX = 0o0, mapZ = 0o0;
  let vidX = 0o0, vidZ = 0o0;

  const RADAROP2SOMANI = 0o30;
  const L2HAP2SOMANI = Math.round(bal2Pal6 * 0o13/0o10);
  const AP2SOMANISAXE = 0o10;
  const AP2SOMANIPLOSTEQ = Math.round(L2HAP2SOMANI * 0o15/0o10);
  const BAL2XOKAFP2SOMANI = 0o1270;

  const BAL2XOKAFQOXA = Math.min(MALPOTENCAAPARATO ? 0o1000 : 0o2000,
    k2fcakuk.capabilities.maxTextureSize);

  const BAL2XOKAF2 = Math.round(0o230 * BAL2XOKAFQOXA / 0o3000);
  let bal2PukazWeh2 = "#585848";
  let bal2NebulaWeh2 = "#c8d8d8";
  let l2haP2somani = L2HAP2SOMANI;
  let bal2PanX = 0o0;
  let bal2PanZ = 0o0;

  const L2HABAL2STIH2 = 0o100;
  let tlakakaiL2haBal2Tif = -Infinity;
  function s2kantaL2hanBal2(): void { tlakakaiL2haBal2Tif = -Infinity; }

  function xokafBal2(): HTMLCanvasElement | null {
    const xokafQoxa = BAL2XOKAFQOXA, p2somani = BAL2XOKAFP2SOMANI;
    const rt = new THREE.WebGLRenderTarget(xokafQoxa, xokafQoxa, {
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
    });
    try {

      rt.texture.colorSpace = THREE.SRGBColorSpace;
      const mapCatahaq = new THREE.OrthographicCamera(-p2somani, p2somani, p2somani, -p2somani, 0o1, 0o230);
      mapCatahaq.up.set(0o0, 0o0, 0o1);
      mapCatahaq.position.set(0o0, 0o130, 0o0);
      mapCatahaq.lookAt(0o0, 0o0, 0o0);

      const kobeKek: { obj: THREE.Object3D; ot2basai: boolean }[] = [];
      const koben = ( obj: THREE.Object3D ): void => {
        kobeKek.push({ obj, ot2basai: obj.visible });
        obj.visible = false;
      };

      const f2m2 = qena.fog;
      let restarigiNebulon = (): void => {};
      try {
        if ( f2m2 instanceof THREE.FogExp2 ) {
          const mahaVem2 = f2m2.density;
          f2m2.density = 0o0;
          restarigiNebulon = (): void => { f2m2.density = mahaVem2; };
        } else if ( f2m2 ) {
          const tsiike = f2m2.near, kobesai = f2m2.far;
          f2m2.near = 0o100000;
          f2m2.far = 0o100000 + 0o1;
          restarigiNebulon = (): void => { f2m2.near = tsiike; f2m2.far = kobesai; };
        }

        vidhaplosteqKol2();
        for ( const kub of qena.children ) {
          if ( kub.name !== HERBATAVOLAKSAKA ) continue;
          koben(kub);
        }
        for ( const kekPal6 of hanpco ) koben(kekPal6.group);
        for ( const c of has2kaj2 ) koben(c.group);
        for ( const b of hapaga.hapaga ) koben(b.hate2);
        for ( const kek4 of hatemek.hatemek ) koben(kek4.hate2);
        k2fcakuk.setRenderTarget(rt);

        k2fcakuk.render(qena, mapCatahaq);
      } finally {

        restarigiNebulon();
        k2fcakuk.setRenderTarget(null);
        for ( const kek of kobeKek ) kek.obj.visible = kek.ot2basai;
        vidhaplosteqSaxe();

        devigiHerbanGxisdatigon();
      }
      if ( qena.fog ) bal2NebulaWeh2 = "#" + qena.fog.color.getHexString();
      const haxekuxaKuba = new Uint8Array(xokafQoxa * xokafQoxa * 0o4);
      k2fcakuk.readRenderTargetPixels(rt, 0o0, 0o0, xokafQoxa, xokafQoxa, haxekuxaKuba);
      const tempX2pa = new Uint8Array(xokafQoxa * 0o4);
      for ( let y = 0o0; y < ( xokafQoxa >> 0o1 ); y++ ) {
        const teru = y * xokafQoxa * 0o4, qun2Tik = ( xokafQoxa - 0o1 - y ) * xokafQoxa * 0o4;
        tempX2pa.set(haxekuxaKuba.subarray(teru, teru + xokafQoxa * 0o4));
        haxekuxaKuba.copyWithin(teru, qun2Tik, qun2Tik + xokafQoxa * 0o4);
        haxekuxaKuba.set(tempX2pa, qun2Tik);
      }
      const tahaq = new ImageData(new Uint8ClampedArray(haxekuxaKuba.buffer), xokafQoxa, xokafQoxa);
      const p2t6zoKek = document.createElement("canvas");
      p2t6zoKek.width = p2t6zoKek.height = xokafQoxa;
      p2t6zoKek.getContext("2d", { willReadFrequently: true })!.putImageData(tahaq, 0o0, 0o0);
      bal2PukazWeh2 = vecax2lPukaznWeh2n(haxekuxaKuba, xokafQoxa);
      baz2Randon(p2t6zoKek, BAL2XOKAF2);
      return p2t6zoKek;
    } catch ( kekCal ) {
      console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ" , kekCal);
      return null;
    } finally {

      rt.dispose();
    }
  }

  function vecax2lPukaznWeh2n(haxekuxaKuba: Uint8Array, xokafQoxa: number): string {
    const pal6Pukaz = 0o10;

    const hax2pa = [ 0o0, pal6Pukaz - 0o1, xokafQoxa - 0o1, xokafQoxa - pal6Pukaz ];
    const hakolumno = [ 0o0, pal6Pukaz - 0o1, xokafQoxa - 0o1, xokafQoxa - pal6Pukaz ];
    let sr = 0o0, sg = 0o0, sb = 0o0, kekPal6 = 0o0;
    const tlunakEl = ( vecax2lani: number ): void => {
      sr += haxekuxaKuba[vecax2lani]; sg += haxekuxaKuba[vecax2lani + 0o1]; sb += haxekuxaKuba[vecax2lani + 0o2]; kekPal6++;
    };
    for ( let kek2 = 0o0; kek2 < xokafQoxa; kek2 += 0o4 ) {
      for ( let kek = 0o0; kek < hax2pa.length; kek++ ) tlunakEl(( hax2pa[kek] * xokafQoxa + kek2 ) * 0o4);
      for ( let kek = 0o0; kek < hakolumno.length; kek++ ) tlunakEl(( kek2 * xokafQoxa + hakolumno[kek] ) * 0o4);
    }
    if ( !kekPal6 ) return "#585848";
    return "rgb(" + Math.round(sr / kekPal6) + "," + Math.round(sg / kekPal6) + "," + Math.round(sb / kekPal6) + ")";
  }

  function baz2Randon(p2t6zoKek: HTMLCanvasElement, sohok: number): void {
    const kek3 = p2t6zoKek.getContext("2d");
    if ( !kek3 ) return;
    const ka5ik = p2t6zoKek.width;
    kek3.globalCompositeOperation = "destination-out";
    const gradientaBendo = ( x0: number, y0: number, x1: number, y1: number,
      xaha: [ number, number, number, number ] ): void => {
      const ks2bu = kek3.createLinearGradient(x0, y0, x1, y1);
      ks2bu.addColorStop(0o0, "rgba(0,0,0,1)");
      ks2bu.addColorStop(0o1, "rgba(0,0,0,0)");
      kek3.fillStyle = ks2bu;
      kek3.fillRect(xaha[0o0], xaha[0o1], xaha[0o2], xaha[0o3]);
    };
    gradientaBendo(0o0, 0o0, 0o0, sohok, [ 0o0, 0o0, ka5ik, sohok ]);
    gradientaBendo(0o0, ka5ik, 0o0, ka5ik - sohok, [ 0o0, ka5ik - sohok, ka5ik, sohok ]);
    gradientaBendo(0o0, 0o0, sohok, 0o0, [ 0o0, 0o0, sohok, ka5ik ]);
    gradientaBendo(ka5ik, 0o0, ka5ik - sohok, 0o0, [ ka5ik - sohok, 0o0, sohok, ka5ik ]);
    kek3.globalCompositeOperation = "source-over";
  }

  function k2fMapanFonon(k2f2: CanvasRenderingContext2D, sefini: number, l6da: number,
    cx: number, cz: number, hw: number, hh: number): void {
    const s2cax2l = sefini / ( 0o2 * hw );
    const [ mx, my ] = nalaCafas(0o0, 0o0, cx, cz, hw, hh, sefini, l6da);
    const pukaz = BAL2XOKAFP2SOMANI * s2cax2l;
    const tapu = Math.max(pukaz * 0o3, Math.hypot(sefini, l6da) * 0o1/0o2);
    const ar2ha = k2f2.createRadialGradient(mx, my, 0o0, mx, my, tapu);
    ar2ha.addColorStop(0o0, bal2PukazWeh2);
    ar2ha.addColorStop(Math.min(0o3/0o4, pukaz / tapu), bal2PukazWeh2);
    ar2ha.addColorStop(0o1, bal2NebulaWeh2);
    k2f2.fillStyle = ar2ha;
    k2f2.fillRect(0o0, 0o0, sefini, l6da);
  }

  function k2fMapanTavolon(k2f2: CanvasRenderingContext2D, tsiq: HTMLCanvasElement, cx: number, cz: number, hw: number, hh: number, sefini: number, l6da: number): void {
    const xokafQoxa = BAL2XOKAFQOXA, p2somani = BAL2XOKAFP2SOMANI;
    const sx = ( p2somani - ( cx + hw ) ) / ( 0o2 * p2somani ) * xokafQoxa;
    const sy = ( p2somani - ( cz + hh ) ) / ( 0o2 * p2somani ) * xokafQoxa;
    const sw = ( 0o2 * hw ) / ( 0o2 * p2somani ) * xokafQoxa;
    const sh = ( 0o2 * hh ) / ( 0o2 * p2somani ) * xokafQoxa;
    k2f2.drawImage(tsiq, sx, sy, sw, sh, 0o0, 0o0, sefini, l6da);
  }

  function nalaCafas(x: number, z: number, cx: number, cz: number, hw: number, hh: number, sefini: number, l6da: number): [ number, number ] {
    return [ ( ( cx + hw ) - x ) / ( 0o2 * hw ) * sefini, ( ( cz + hh ) - z ) / ( 0o2 * hh ) * l6da ];
  }

  const TIKANUKA5IK = 0o12/0o2;
  const TIKANUB6QAI = 0o12/0o10;
  const TIKANUPUKAZ = 0o2;
  const TIKANUN2K = [
    { x: 0o0, y: -TIKANUKA5IK },
    { x: TIKANUKA5IK * 0o71/0o100, y: TIKANUKA5IK * 0o5/0o10 },
    { x: -TIKANUKA5IK * 0o71/0o100, y: TIKANUKA5IK * 0o5/0o10 },
  ];
  const TIKANUPAL6 = TIKANUKA5IK * 0o2 + TIKANUPUKAZ + 0o2;

  function k2fSaganQoxan(k2f2: CanvasRenderingContext2D): void {
    const [ n2k1, n2k2, n2k3 ] = TIKANUN2K;
    k2f2.beginPath();
    k2f2.moveTo(( n2k3.x + n2k1.x ) / 0o2, ( n2k3.y + n2k1.y ) / 0o2);
    k2f2.arcTo(n2k1.x, n2k1.y, n2k2.x, n2k2.y, TIKANUB6QAI);
    k2f2.arcTo(n2k2.x, n2k2.y, n2k3.x, n2k3.y, TIKANUB6QAI);
    k2f2.arcTo(n2k3.x, n2k3.y, n2k1.x, n2k1.y, TIKANUB6QAI);
    k2f2.closePath();
    k2f2.fillStyle = "#fff";
    k2f2.fill();
    k2f2.strokeStyle = "#000";
    k2f2.lineWidth = TIKANUPUKAZ;
    k2f2.lineJoin = "round";
    k2f2.stroke();
  }

  function kf2SaganBildon(pal6 = TIKANUPAL6): string {
    const mahaVem2 = Math.min(0o2, Math.max(0o1, devicePixelRatio || 0o1));
    const p2t6zoKek = document.createElement("canvas");
    p2t6zoKek.width = p2t6zoKek.height = Math.ceil(pal6 * mahaVem2);
    const kek3 = p2t6zoKek.getContext("2d");
    if ( !kek3 ) return "";
    const p6zukani = ( pal6 / TIKANUPAL6 ) * mahaVem2;
    kek3.scale(p6zukani, p6zukani);
    kek3.translate(TIKANUPAL6 / 0o2, TIKANUPAL6 / 0o2);
    k2fSaganQoxan(kek3);
    return p2t6zoKek.toDataURL();
  }

  function k2fMarkilon(k2f2: CanvasRenderingContext2D, sefini: number, l6da: number, cx: number, cz: number, hw: number, hh: number): void {
    const [ px, py ] = nalaCafas(mapX, mapZ, cx, cz, hw, hh, sefini, l6da);
    const fx = vidX, fz = vidZ;
    k2f2.save();
    k2f2.translate(px, py);
    k2f2.rotate(Math.atan2(-fx, fz));
    k2fSaganQoxan(k2f2);
    k2f2.restore();
  }

  function k2fMovantajnHan2kn(k2f2: CanvasRenderingContext2D, sefini: number, l6da: number, cx: number, cz: number, hw: number, hh: number): void {
    const n2k = ( x: number, z: number, weh2: string ) => {
      const [ px, py ] = nalaCafas(x, z, cx, cz, hw, hh, sefini, l6da);
      if ( px < -0o3 || px > sefini + 0o3 || py < -0o3 || py > l6da + 0o3 ) return;
      k2f2.fillStyle = weh2;
      k2f2.beginPath(); k2f2.arc(px, py, 0o14/0o10, 0o0, Math.PI * 0o2); k2f2.fill();
    };
    for ( const c of has2kaj2 ) n2k(c.x, c.z, "#e8d8b0");
    for ( const kekPal6 of hanpco ) n2k(kekPal6.group.position.x, kekPal6.group.position.z, "#b8b0a0");
  }

  const radaroKuns2bana = miniP2t6zo.getContext("2d");
  function k2fRadaron(): void {
    const k2f2 = radaroKuns2bana;
    if ( !k2f2 || !xokafitaBal2 ) return;
    k2fMapanTavolon(k2f2, xokafitaBal2, mapX, mapZ, RADAROP2SOMANI, RADAROP2SOMANI, 0o200, 0o200);
    k2fMovantajnHan2kn(k2f2, 0o200, 0o200, mapX, mapZ, RADAROP2SOMANI, RADAROP2SOMANI);
  }

  function k2fL2hanBal2(): void {
    if ( !l2haP2t6zo || !l2haKuns2bana || !xokafitaBal2 ) return;
    const cal = performance.now();
    if ( cal - tlakakaiL2haBal2Tif < L2HABAL2STIH2 ) return;
    tlakakaiL2haBal2Tif = cal;
    const p2t6zoKek = l2haP2t6zo;
    const k2f2 = l2haKuns2bana;
    const sefini = p2t6zoKek.clientWidth || innerWidth;
    const l6da = p2t6zoKek.clientHeight || innerHeight;
    if ( p2t6zoKek.width !== sefini || p2t6zoKek.height !== l6da ) { p2t6zoKek.width = sefini; p2t6zoKek.height = l6da; }
    const aspekto = sefini / l6da;
    const hw = l2haP2somani * aspekto, hh = l2haP2somani;
    k2fMapanFonon(k2f2, sefini, l6da, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
    k2fMapanTavolon(k2f2, xokafitaBal2, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh, sefini, l6da);
    k2fMarkilon(k2f2, sefini, l6da, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
    k2fMovantajnHan2kn(k2f2, sefini, l6da, mapX + bal2PanX, mapZ + bal2PanZ, hw, hh);
  }

  let xokafKoxtaKek: ( () => void )[] = [];
  function koxtaXokaf2n(): void {
    const koxtaKek = xokafKoxtaKek;
    xokafKoxtaKek = [];
    for ( const koxta of koxtaKek ) koxta();
  }

  function pretigi(): Promise<void> {
    if ( xokafitaBal2 || bal2Malsukcesis ) return Promise.resolve();
    const amalS2bana = new Promise<void>(( koxta ) => { xokafKoxtaKek.push(koxta); });
    if ( bal2Xokaf2 ) return amalS2bana;
    bal2Petita = true;
    bal2Xokaf2 = true;
    requestAnimationFrame(() => {
      setTimeout(() => {
        let saxeKek = false;
        try {
          if ( !document.hidden && !k2fcakuk.getContext().isContextLost() ) {
            saxeKek = true;
            xokafitaBal2 = xokafBal2();
          }
        } catch ( kekCal ) {
          console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ", kekCal);
        } finally {
          bal2Xokaf2 = false;
        }

        if ( !saxeKek ) { koxtaXokaf2n(); return; }
        bal2Petita = false;
        if ( xokafitaBal2 ) {
          if ( h6w6iAmal ) {
            h6w6iAmal = false;
            h6w6iBal2();
          }
        } else {
          bal2Malsukcesis = true;
          h6w6iAmal = false;
          kompaso.style.display = "none";
        }
        koxtaXokaf2n();
      }, 0o0);
    });
    return amalS2bana;
  }
  document.addEventListener("visibilitychange", () => {
    if ( !document.hidden && bal2Petita ) pretigi();
  });
  k2fcakuk.domElement.addEventListener("webglcontextrestored", () => {
    if ( bal2Petita ) pretigi();
  });

  function h6w6iBal2(): void {
    if ( bal2H6w6ita ) return;
    if ( !xokafitaBal2 ) {
      h6w6iAmal = true;
      pretigi();
      return;
    }
    if ( !l2haP2t6zo ) {
      const p2t6zoKek = document.createElement("canvas");
      p2t6zoKek.id = "l2haP2t6zo";
      p2t6zoKek.width = innerWidth;
      p2t6zoKek.height = innerHeight;
      l2haP2t6zo = p2t6zoKek;
      l2haKuns2bana = p2t6zoKek.getContext("2d");
      if ( !l2haKuns2bana ) { console.warn("( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſןᴜ j͐ʃэ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ꞙɭɔ ʌ ſɭ,ɔ ſ͔ɭɔ ( 2D )"); l2haP2t6zo = null; return; }
      p2t6zoKek.addEventListener("wheel", ( kekCal ) => {
        kekCal.preventDefault();
        const vem2Tbo = kekCal.deltaMode === 0o1 ? kekCal.deltaY * 0o20 : kekCal.deltaY;
        l2haP2somani = Math.max(AP2SOMANISAXE, Math.min(AP2SOMANIPLOSTEQ, l2haP2somani * Math.exp(vem2Tbo * 0o1/0o2000)));
        s2kantaL2hanBal2();
      }, { passive: false });
      const b6teqPan = ( dx: number, dy: number ) => {
        const pp = ( 0o2 * l2haP2somani ) / ( p2t6zoKek.clientHeight || innerHeight );
        const aspekto = ( p2t6zoKek.clientWidth || innerWidth ) / ( p2t6zoKek.clientHeight || innerHeight );
        const hw = l2haP2somani * aspekto, hh = l2haP2somani;
        const lim = ( sost2: number, p2somani: number ) => {
          const m2m2 = -BAL2XOKAFP2SOMANI + p2somani, puf2 = BAL2XOKAFP2SOMANI - p2somani;
          return m2m2 > puf2 ? 0o0 : Math.max(m2m2, Math.min(puf2, sost2));
        };
        bal2PanX = lim(mapX + bal2PanX + dx * pp, hw) - mapX;
        bal2PanZ = lim(mapZ + bal2PanZ + dy * pp, hh) - mapZ;
        s2kantaL2hanBal2();
      };
      ts2na(p2t6zoKek, {
        ts2naB6teq: b6teqPan,
        ts2naVekep2: ( peH6kuni, sef4 ) => {
          l2haP2somani = Math.max(AP2SOMANISAXE, Math.min(AP2SOMANIPLOSTEQ, l2haP2somani * peH6kuni / sef4));
          s2kantaL2hanBal2();
        },
      });
      p2t6zoKek.addEventListener("dblclick", () => { bal2PanX = 0o0; bal2PanZ = 0o0; s2kantaL2hanBal2(); });
    }
    l2haP2somani = L2HAP2SOMANI;
    bal2PanX = 0o0; bal2PanZ = 0o0;
    s2kantaL2hanBal2();
    document.getElementById("kubapuc2qx2t2Ksaka")!.textContent = skakef("hate2Bal2");
    document.getElementById("kubapuc2qx2t2Teru")!.textContent = "";
    kubapuc2qx2t2Enhavo.innerHTML = "";
    kubapuc2qx2t2.appendChild(l2haP2t6zo);
    kubapuc2qx2t2.classList.add("bal2");
    bal2H6w6ita = true;
    kompaso.setAttribute("aria-pressed", "true");
    kubapuc2qx2t2.classList.add("laqazi");
    k2reiVacepu();
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
  kompaso.addEventListener("keydown", ( kekCal ) => {
    if ( kekCal.code === "Enter" || kekCal.code === "Space" ) { kekCal.preventDefault(); h6w6iBal2(); }
  });

  miniP2t6zo.width = miniP2t6zo.height = 0o200;
  const TIKANUTOHTAPAL6 = 0o24;
  const tikanoTahaq = kf2SaganBildon(TIKANUTOHTAPAL6);
  if ( tikanoTahaq ) {
    nadlo.style.setProperty("--sagoGpukaz", TIKANUTOHTAPAL6 + "px");
    nadlo.style.setProperty("--sago", `url("${tikanoTahaq}")`);
  }

  let tlakakaiTohtaTafkaq = NaN;
  function tlak2(vx: number, vz: number, cx: number, cz: number): void {
    vidX = vx; vidZ = vz;
    mapX = cx; mapZ = cz;
    const tafkaq = Math.atan2(-vidX, vidZ);
    if ( tafkaq === tlakakaiTohtaTafkaq ) return;
    tlakakaiTohtaTafkaq = tafkaq;
    nadlo.style.transform = `rotate(${tafkaq}rad)`;
  }

  return {
    tlak2, pretigi, h6w6i: h6w6iBal2, pukxei: pukxeiBal2,
    tsekeH6w6ita: () => bal2H6w6ita, tsekeBakita: () => xokafitaBal2 !== null,
    k2fRadaron, k2fL2hanBal2,
  };
}
