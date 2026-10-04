// ≺⧼ វាយនភាពស្លាបផេត្រេល 🕊️ ⧽≻
import { kreiKanvasanTeksajxon } from "./helpiloj.js";
import * as THREE from "three";

interface PetrelaPlumaVico { v: number; fazo: number; malhelo: number; }

interface PetrelaFlugilaStrio { u: number; angulo: number; dikeco: number; }

interface PetrelaSkizo {
  korpajVicoj: PetrelaPlumaVico[];
  kovrilajVicoj: PetrelaPlumaVico[];
  primarajStrioj: PetrelaFlugilaStrio[];
}

let petrelaSkizo: PetrelaSkizo | null = null;

function generiPetrelanSkizon(): PetrelaSkizo {
  if ( petrelaSkizo ) return petrelaSkizo;
  const korpajVicoj: PetrelaPlumaVico[] = [];
  for ( let i = 0; i < 0o40; i++ ) {
    korpajVicoj.push({
      v: 0o2/0o100 + ( i / 0o40 ) * 0o74/0o100,
      fazo: Math.random(),
      malhelo: 0o10/0o100 + Math.random() * 0o12/0o100,
    });
  }
  const kovrilajVicoj: PetrelaPlumaVico[] = [];
  for ( let i = 0; i < 0o10; i++ ) {
    kovrilajVicoj.push({
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
      angulo: -0o20/0o100 + t * 0o40/0o100,
      dikeco: 0o3 + Math.random() * 0o2,
    });
  }
  petrelaSkizo = { korpajVicoj, kovrilajVicoj, primarajStrioj };
  return petrelaSkizo;
}

const KORPA_S = 0o400;

const KORPA_STUPO = 0o16;

const kreiKorpanTeksajxon = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(KORPA_S, KORPA_S, ( k ) => {
    k.fillStyle = "#fbfbfd"; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const dorsa = k.createLinearGradient(0, 0, KORPA_S, 0);
    dorsa.addColorStop(0, "rgba(186,200,214,0.22)");
    dorsa.addColorStop(0o1/0o4, "rgba(176,192,208,0.34)");
    dorsa.addColorStop(0o1/0o2, "rgba(196,208,220,0.16)");
    dorsa.addColorStop(0o3/0o4, "rgba(216,224,232,0.02)");
    dorsa.addColorStop(1, "rgba(186,200,214,0.22)");
    k.fillStyle = dorsa; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const skizo = generiPetrelanSkizon();
    for ( const vico of skizo.korpajVicoj ) {
      const y = ( 1 - vico.v ) * KORPA_S;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + vico.fazo ) / 0o40 ) * KORPA_S;
        k.strokeStyle = `rgba(148,166,182,${vico.malhelo})`;
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
      k.fillStyle = "rgba(48,56,66,0.6)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPA_S * 0o12/0o100,
        Math.abs(yAl - yDe) / 0o2, 0, 0, Math.PI * 2);
      k.fill();
      k.fillStyle = "rgba(64,74,86,0.3)";
      k.beginPath();
      k.ellipse(0, ( yAl - yDe ) / 0o2, KORPA_S * 0o1/0o4,
        Math.abs(yAl - yDe) / 0o2 + 1, 0, 0, Math.PI * 2);
      k.fill();
      k.restore();
    }
    const vosta = k.createLinearGradient(0, KORPA_S, 0, KORPA_S * 0o4/0o5);
    vosta.addColorStop(0, "rgba(172,186,200,0.24)");
    vosta.addColorStop(1, "rgba(172,186,200,0)");
    k.fillStyle = vosta; k.fillRect(0, 0, KORPA_S, KORPA_S);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kreiKorpanBumpanTeksajxon = ( vPorZ: ( z: number ) => number ): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(KORPA_S, KORPA_S, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, KORPA_S, KORPA_S);
    const skizo = generiPetrelanSkizon();
    for ( const vico of skizo.korpajVicoj ) {
      const y = ( 1 - vico.v ) * KORPA_S;
      for ( let i = 0; i < 0o40; i++ ) {
        const x = ( ( i + vico.fazo ) / 0o40 ) * KORPA_S;
        k.strokeStyle = "rgba(56,56,56,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x, y, KORPA_STUPO / 0o2, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(182,182,182,0.7)";
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

const kreiFlugilanTeksajxon = (): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(FLUGILA_S, FLUGILA_S, ( k ) => {
    k.fillStyle = "#f9f9fc"; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
    const limoDe = 0o40/0o100, limoAl = 0o52/0o100;
    const skizo = generiPetrelanSkizon();
    for ( const vico of skizo.kovrilajVicoj ) {
      const y = ( 1 - vico.v ) * FLUGILA_S;
      for ( let x = 0; x < limoDe * FLUGILA_S; x += 0o20 ) {
        k.strokeStyle = `rgba(150,166,182,${vico.malhelo})`;
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( vico.fazo * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(255,255,255,0.65)";
        k.beginPath();
        k.arc(x + ( vico.fazo * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    const nigro = k.createLinearGradient(limoDe * FLUGILA_S, 0, FLUGILA_S, 0);
    nigro.addColorStop(0, "rgba(52,60,70,0.9)");
    nigro.addColorStop(0o1/0o2, "rgba(30,36,44,1)");
    nigro.addColorStop(1, "rgba(18,22,28,1)");
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
      k.strokeStyle = `rgba(52,60,70,${0o3/0o10 * ( 1 - t )})`;
      k.lineWidth = 0o4 * i;
      k.beginPath();
      k.moveTo(( limoDe - 0o4/0o100 * t ) * FLUGILA_S, 0);
      k.lineTo(( limoAl - 0o4/0o100 * t ) * FLUGILA_S, FLUGILA_S);
      k.stroke();
    }
    for ( const strio of skizo.primarajStrioj ) {
      k.strokeStyle = `rgba(96,110,126,${0o45/0o100})`;
      k.lineWidth = strio.dikeco;
      const x = strio.u * FLUGILA_S;
      const dx = strio.angulo * FLUGILA_S * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILA_S);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILA_S * 0o10/0o100);
    rimo.addColorStop(0, "rgba(150,168,186,0.5)");
    rimo.addColorStop(1, "rgba(150,168,186,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S * 0o10/0o100);
    const ombro = k.createLinearGradient(0, FLUGILA_S, 0, FLUGILA_S * 0o66/0o100);
    ombro.addColorStop(0, "rgba(120,138,156,0.3)");
    ombro.addColorStop(1, "rgba(120,138,156,0)");
    k.fillStyle = ombro; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, anisotropio: 0o4 });

const kreiFlugilanBumpanTeksajxon = (): THREE.CanvasTexture =>
  kreiKanvasanTeksajxon(FLUGILA_S, FLUGILA_S, ( k ) => {
    k.fillStyle = "#808080"; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S);
    const limoDe = 0o40/0o100;
    const skizo = generiPetrelanSkizon();
    for ( const vico of skizo.kovrilajVicoj ) {
      const y = ( 1 - vico.v ) * FLUGILA_S;
      for ( let x = 0; x < limoDe * FLUGILA_S; x += 0o20 ) {
        k.strokeStyle = "rgba(58,58,58,0.6)";
        k.lineWidth = 1;
        k.beginPath();
        k.arc(x + ( vico.fazo * 0o20 ), y, 0o10, Math.PI, 0);
        k.stroke();
        k.strokeStyle = "rgba(184,184,184,0.7)";
        k.beginPath();
        k.arc(x + ( vico.fazo * 0o20 ), y + 1, 0o10, Math.PI, 0);
        k.stroke();
      }
    }
    for ( const strio of skizo.primarajStrioj ) {
      k.strokeStyle = "rgba(126,126,126,0.5)";
      k.lineWidth = strio.dikeco;
      const x = strio.u * FLUGILA_S;
      const dx = strio.angulo * FLUGILA_S * 0o1/0o2;
      k.beginPath();
      k.moveTo(x - dx, 0);
      k.lineTo(x + dx, FLUGILA_S);
      k.stroke();
    }
    const rimo = k.createLinearGradient(0, 0, 0, FLUGILA_S * 0o10/0o100);
    rimo.addColorStop(0, "rgba(196,196,196,0.85)");
    rimo.addColorStop(1, "rgba(128,128,128,0)");
    k.fillStyle = rimo; k.fillRect(0, 0, FLUGILA_S, FLUGILA_S * 0o10/0o100);
  }, [ 1, 1 ], { volvado: THREE.ClampToEdgeWrapping, sRGB: false, anisotropio: 0o4 });

let petrelajTeksajxojStoko: {
  korpo: THREE.CanvasTexture; korpoBump: THREE.CanvasTexture;
  flugilo: THREE.CanvasTexture; flugiloBump: THREE.CanvasTexture;
} | null = null;

export function petrelajTeksajxoj(vPorZ: ( z: number ) => number) {
  if ( !petrelajTeksajxojStoko ) {
    petrelajTeksajxojStoko = {
      korpo: kreiKorpanTeksajxon(vPorZ), korpoBump: kreiKorpanBumpanTeksajxon(vPorZ),
      flugilo: kreiFlugilanTeksajxon(), flugiloBump: kreiFlugilanBumpanTeksajxon(),
    };
  }
  return petrelajTeksajxojStoko;
}
