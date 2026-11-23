// ≺⧼ ſןɔ ɭʃƣ̋ɔ j͐ʃᴜ j͑ʃᴜꞇ ʌ ſןͷ̗w ŋᷠᴜ ɽ͑ʃ'ɜ j͑ʃᴜꞇ ʌ j͐ʃƽɜ }ʃꞇ 🕊️ ⧽≻
import { kf2P2t6zoCac2sex } from "./helpiloj.js";
import * as THREE from "three";

interface PetrelaPlumaX2pa { v: number; fazo: number; malhelo: number; }

interface PetrelaFlugilaStrio { u: number; tafkaq: number; dikeco: number; }

interface PetrelaSkizo {
  korpajHax2pa: PetrelaPlumaX2pa[];
  kovrilajHax2pa: PetrelaPlumaX2pa[];
  primarajStrioj: PetrelaFlugilaStrio[];
}

let petrelaSkizo: PetrelaSkizo | null = null;

function generiPetrelanSkizon(): PetrelaSkizo {
  if ( petrelaSkizo ) return petrelaSkizo;
  const korpajHax2pa: PetrelaPlumaX2pa[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    korpajHax2pa.push({
      v: 0o2/0o100 + ( i / 0o40 ) * 0o74/0o100,
      fazo: Math.random(),
      malhelo: 0o10/0o100 + Math.random() * 0o12/0o100,
    });
  }
  const kovrilajHax2pa: PetrelaPlumaX2pa[] = [];
  for ( let i = 0; i < 0o10; i++ ) {
    kovrilajHax2pa.push({
      v: 0o10/0o100 + i * 0o10/0o100,
      fazo: Math.random(),
      malhelo: 0o12/0o100 + Math.random() * 0o10/0o100,
    });
  }
  const primarajStrioj: PetrelaFlugilaStrio[] = [];
  for ( let i = 0; i < 0o30; i++ ) {
    const t = i / 0o27;
    primarajStrioj.push({
      u: 0o54/0o100 + t * 0o44/0o100,
      tafkaq: -0o20/0o100 + t * 0o40/0o100,
      dikeco: 0o3 + Math.random() * 0o2,
    });
  }
  petrelaSkizo = { korpajHax2pa, kovrilajHax2pa, primarajStrioj };
  return petrelaSkizo;
}

const KORPA_S = 0o400;

const KORPA_STUPO = 0o16;

const kf2KorpanCac2sex = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(KORPA_S, KORPA_S, ( k ) => {
    k.fillStyle = "#f8f8f8"; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const dorsa = k.createLinearGradient(0, 0, KORPA_S, 0);
    dorsa.addColorStop(0, "rgba(184,200,208,0.22)");
    dorsa.addColorStop(0o1/0o4, "rgba(176,192,208,0.34)");
    dorsa.addColorStop(0o1/0o2, "rgba(192,208,216,0.16)");
    dorsa.addColorStop(0o3/0o4, "rgba(216,224,232,0.02)");
    dorsa.addColorStop(1, "rgba(184,200,208,0.22)");
    k.fillStyle = dorsa; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const skizo = generiPetrelanSkizon();
    for ( const x2pa of skizo.korpajHax2pa ) {
      const y = ( 1 - x2pa.v ) * KORPA_S;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.fazo ) / 0o40 ) * KORPA_S;
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x, y, KORPA_STUPO / 0o2, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.6)";
        k.beginPath();
        k.arc(x, y + 1, KORPA_STUPO / 0o2, Math.PI, 0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vOkulo = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 1 - vOkulo ) * KORPA_S, yAl = ( 1 - vBeko ) * KORPA_S;
      k.save();
      k.translate(u * KORPA_S, yDe);
      k.fillStyle = "rgba(48,56,64,0.6)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPA_S * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0, 0, Math.PI * 2);
      k.fill();
      k.fillStyle = "rgba(64,72,80,0.3)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPA_S * 0o1/0o4,
        Math.abs(yAl - yDe) / 0o2 + 1, 0, 0, Math.PI * 2);
      k.fill();
      k.restore();
    }
    const vosta = k.createLinearGradient(0, KORPA_S, 0, KORPA_S * 0o4/0o5);
    vosta.addColorStop(0, "rgba(168,184,200,0.24)");
    vosta.addColorStop(1, "rgba(168,184,200,0)");
    k.fillStyle = vosta; k.fillRect(0, 0, KORPA_S, KORPA_S);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kf2KorpanBumpanCac2sex = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(KORPA_S, KORPA_S, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const skizo = generiPetrelanSkizon();
    for ( const x2pa of skizo.korpajHax2pa ) {
      const y = ( 1 - x2pa.v ) * KORPA_S;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + x2pa.fazo ) / 0o40 ) * KORPA_S;
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x, y, KORPA_STUPO / 0o2, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(176,176,176,0.7)";
        k.beginPath();
        k.arc(x, y + 1, KORPA_STUPO / 0o2, Math.PI, 0);
        k.stroke();
      }
    }
    const EKZ = 0o5/0o20, BEKX = 0o27/0o100;
    for ( const u of [ 0o11/0o100, 0o67/0o100 ] ) {
      const vOkulo = vPorZ(EKZ), vBeko = vPorZ(BEKX);
      const yDe = ( 1 - vOkulo ) * KORPA_S, yAl = ( 1 - vBeko ) * KORPA_S;
      k.fillStyle = "rgba(104,104,104,0.55)";
      k.beginPath();
      k.ellipse(u * KORPA_S, ( yDe + yAl ) / 0o2, KORPA_S * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0, 0, Math.PI * 2);
      k.fill();
    }
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 0o4 });

const FLUGILA_S = 0o400;

const kf2FlugilanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILA_S, FLUGILA_S, ( k ) => {
    k.fillStyle = "#f8f8f8"; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
    const limoDe = 0o40/0o100, limoAl = 0o52/0o100;
    const skizo = generiPetrelanSkizon();
    for ( const x2pa of skizo.kovrilajHax2pa ) {
      const y = ( 1 - x2pa.v ) * FLUGILA_S;
      for ( let x = 0; x < limoDe * FLUGILA_S; x += 0o20 ) {
        k.strokeStyle = `rgba(144,160,176,${x2pa.malhelo})`;
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( x2pa.fazo * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.65)";
        k.beginPath();
        k.arc(x + ( x2pa.fazo * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    const nigro = k.createLinearGradient(limoDe * FLUGILA_S, 0, FLUGILA_S, 0);
    nigro.addColorStop(0, "rgba(48,56,64,0.9)");
    nigro.addColorStop(0o1/0o2, "rgba(24,32,40,1)");
    nigro.addColorStop(1, "rgba(16,16,24,1)");
    k.fillStyle = nigro;
    k.beginPath();
    k.moveTo(limoDe * FLUGILA_S, 0);
    k.lineTo(limoAl * FLUGILA_S, FLUGILA_S);
    k.lineTo(FLUGILA_S, FLUGILA_S);
    k.lineTo(FLUGILA_S, 0);
    k.closePath();
    k.fill();
    for ( let i = 1; i <= 0o4; i++ ) {
      const t = i / 0o5;
      k.strokeStyle = `rgba(48,56,64,${0o3/0o10 * ( 1 - t )})`;
      k.lineWidth = 0o4 * i;
      k.beginPath();
      k.moveTo(( limoDe - 0o4/0o100 * t ) * FLUGILA_S, 0);
      k.lineTo(( limoAl - 0o4/0o100 * t ) * FLUGILA_S, FLUGILA_S);
      k.stroke();
    }
    for ( const strio of skizo.primarajStrioj ) {
      k.strokeStyle = `rgba(96,104,120,${0o45/0o100})`;
      k.lineWidth = strio.dikeco;
      const x = strio.u * FLUGILA_S;
      const dx = strio.tafkaq * FLUGILA_S * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILA_S);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILA_S * 0o10/0o100);
    rimo.addColorStop(0, "rgba(144,168,184,0.5)");
    rimo.addColorStop(1, "rgba(144,168,184,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S * 0o10/0o100);
    const hunanu = k.createLinearGradient(0, FLUGILA_S, 0, FLUGILA_S * 0o66/0o100);
    hunanu.addColorStop(0, "rgba(120,136,152,0.3)");
    hunanu.addColorStop(1, "rgba(120,136,152,0)");
    k.fillStyle = hunanu; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kf2FlugilanBumpanCac2sex = (): THREE.CanvasTexture =>
  kf2P2t6zoCac2sex(FLUGILA_S, FLUGILA_S, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
    const limoDe = 0o40/0o100;
    const skizo = generiPetrelanSkizon();
    for ( const x2pa of skizo.kovrilajHax2pa ) {
      const y = ( 1 - x2pa.v ) * FLUGILA_S;
      for ( let x = 0; x < limoDe * FLUGILA_S; x += 0o20 ) {
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( x2pa.fazo * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(184,184,184,0.7)";
        k.beginPath();
        k.arc(x + ( x2pa.fazo * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    for ( const strio of skizo.primarajStrioj ) {
      k.strokeStyle = "rgba(120,120,120,0.5)";
      k.lineWidth = strio.dikeco;
      const x = strio.u * FLUGILA_S;
      const dx = strio.tafkaq * FLUGILA_S * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILA_S);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILA_S * 0o10/0o100);
    rimo.addColorStop(0, "rgba(192,192,192,0.85)");
    rimo.addColorStop(1, "rgba(128,128,128,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S * 0o10/0o100);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 0o4 });

let petrelajCac2sexStoko: {
  korpo: THREE.CanvasTexture; korpoBump: THREE.CanvasTexture;
  flugilo: THREE.CanvasTexture; flugiloBump: THREE.CanvasTexture;
} | null = null;

export function petrelajCac2sex(vPorZ: ( z: number ) => number) {
  if ( !petrelajCac2sexStoko ) {
    petrelajCac2sexStoko = {
      korpo: kf2KorpanCac2sex(vPorZ), korpoBump: kf2KorpanBumpanCac2sex(vPorZ),
      flugilo: kf2FlugilanCac2sex(), flugiloBump: kf2FlugilanBumpanCac2sex(),
    };
  }
  return petrelajCac2sexStoko;
}
