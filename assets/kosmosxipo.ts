// Kosmosxipa modulo — ciel-rombo ciela transporto de ornaveth-v2
// 5 tieroj supren, 3 malsupren, kapsulaj fenestroj cxe cxiu nivelo
// Rondigitaj rombo-enirejoj kun ora ornamo, soklo, brila ringo, plakedo, pordo
import * as THREE from "three";

// Rondigita rombo-formo (uzata por enirejoj)
function rondigitaRomboFormo(w: number, h: number, n: number = 99/64, seg: number = 0o100): THREE.Shape {
  const hw = w / 2, hh = h / 2;
  const s = new THREE.Shape();
  const e = 2 / n;
  for ( let i = 0; i <= seg; i++ ) {
    const a = i / seg * Math.PI * 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const x = Math.sign(ca) * Math.pow(Math.abs(ca), e) * hw;
    const y = Math.sign(sa) * Math.pow(Math.abs(sa), e) * hh;
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  return s;
}

function kadraTubo(cX: number, cZ: number, yB: number, yT: number, sX: number, sZ: number, upward: boolean): THREE.TubeGeometry {
  const out = 33/64, over = 9/16;
  const curve = upward
    ? new THREE.QuadraticBezierCurve3( new THREE.Vector3(cX, yB - 1/8, cZ),
        new THREE.Vector3(cX, yT - 13/32, cZ),
        new THREE.Vector3(cX + sX * out, yT + over, cZ + sZ * out))
    : new THREE.QuadraticBezierCurve3( new THREE.Vector3(cX, yT + 1/8, cZ),
        new THREE.Vector3(cX, yB + 13/32, cZ),
        new THREE.Vector3(cX + sX * out, yB - over, cZ + sZ * out));
  return new THREE.TubeGeometry(curve, 0o12, 1/8, 6, false);
}

export interface CielDiamanto {
  group: THREE.Group;
  windows: THREE.Mesh[];
  pordaPozicio: THREE.Vector3;
  doorDir: THREE.Vector3;
}

// konstruiCielDiamanton — Konstruu la spacosxipon kun diamant-formaj enirejoj kaj kapsulaj fenestroj.
export function konstruiCielDiamanton( sceno: THREE.Scene,
  x: number, y: number, z: number,
  name: string,
  oraMaterialo: THREE.MeshStandardMaterial,
  eniraMaterialo: THREE.MeshStandardMaterial,
  andezitaMaterialo: THREE.MeshStandardMaterial,
  scriptTex: THREE.Texture | null
): CielDiamanto {
  const group = new THREE.Group();
  const tieroAlto = 115/32, up = 5, down = 3, hw0 = 4;
  const ins = (4 - 83/64) / 4;
  const face = Math.atan2(-x, -z);

  const muraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x184838, roughness: 27/64, metalness: 5/64, envMapIntensity: 19/32,
  });
  const fenestraMaterialo = new THREE.MeshStandardMaterial({
    color: 0x082828, emissive: 0x103838, emissiveIntensity: 13/32, roughness: 5/32, metalness: 13/64,
  });

  const murajGeometrioj: THREE.BufferGeometry[] = [];
  const kadrajGeometrioj: THREE.BufferGeometry[] = [];

  // Suprenaj tieroj
  for ( let i = 0; i < up; i++ ) {
    const hw = hw0 - i * ins;
    const yT = i * tieroAlto;
    murajGeometrioj.push(new THREE.BoxGeometry(hw * 2, tieroAlto, hw * 2).translate(0, yT + tieroAlto / 2, 0));
    for (const a of [-1, 1]) for ( const b of [-1, 1] ) {
      kadrajGeometrioj.push(kadraTubo(a * hw, b * hw, yT, yT + tieroAlto, a, b, true));
    }
  }
  // Malsuprenaj tieroj
  for ( let j = 1; j <= down; j++ ) {
    const hw = hw0 - j * ins;
    const yTop = -(j - 1) * tieroAlto, yBot = -j * tieroAlto;
    murajGeometrioj.push(new THREE.BoxGeometry(hw * 2, tieroAlto, hw * 2).translate(0, (yTop + yBot) / 2, 0));
    for (const a of [-1, 1]) for ( const b of [-1, 1] ) {
      kadrajGeometrioj.push(kadraTubo(a * hw, b * hw, yBot, yTop, a, b, false));
    }
  }

  const muroj = new THREE.Mesh(kunfandiGeometriojn(murajGeometrioj), muraMaterialo);
  muroj.castShadow = true;
  group.add(muroj);
  group.add(new THREE.Mesh(kunfandiGeometriojn(kadrajGeometrioj), oraMaterialo));

  // Rondigitaj rombo-enirejoj sur 4 flankoj
  const rombaFormo = rondigitaRomboFormo(147/64, 24/8);
  for ( let f = 0; f < 4; f++ ) {
    const enirejaGeometrio = new THREE.ExtrudeGeometry(rombaFormo, {
      depth: 4/8, bevelEnabled: true, bevelSize: 1/16, bevelThickness: 1/16,
      bevelSegments: 2, curveSegments: 0o14,
    });
    const enirejaMreto = new THREE.Mesh(enirejaGeometrio, eniraMaterialo);
    enirejaMreto.rotation.y = f * Math.PI / 2;
    enirejaMreto.position.set( Math.sin(f * Math.PI / 2) * (hw0 - 1/64), 51/32,
      Math.cos(f * Math.PI / 2) * (hw0 - 1/64) );
    group.add(enirejaMreto);

    // Ora ornama konturo
    const konturo = rombaFormo.getPoints(0o30).map(p => new THREE.Vector3(p.x, p.y + 51/32, 0));
    const ornamo = new THREE.Mesh( new THREE.TubeGeometry(new THREE.CatmullRomCurve3(konturo, true, "catmullrom", 19/32), 0o60, 1/16, 6, true),
      oraMaterialo );
    ornamo.rotation.y = f * Math.PI / 2;
    ornamo.position.set( Math.sin(f * Math.PI / 2) * (hw0 + 4/8), 0,
      Math.cos(f * Math.PI / 2) * (hw0 + 4/8) );
    group.add(ornamo);
  }

  // Kapsulaj fenestroj sur cxiu nivelo
  const niveloj: { y: number; hw: number }[] = [];
  for (let i = 1; i < up; i++) niveloj.push({ y: i * tieroAlto + tieroAlto / 2, hw: hw0 - i * ins });
  for (let j = 1; j <= down; j++) niveloj.push({ y: -j * tieroAlto + tieroAlto / 2, hw: hw0 - j * ins });

  const fenestrajMretoj: THREE.Mesh[] = [];
  for ( const lv of niveloj ) {
    const longo = Math.max(77/64, lv.hw * 77/64);
    for ( let f = 0; f < 4; f++ ) {
      const w = new THREE.Mesh( new THREE.CapsuleGeometry(4/8, longo, 4, 0o12).rotateZ(Math.PI / 2),
        fenestraMaterialo );
      w.scale.set(1, 1, 19/64);
      w.rotation.y = f * Math.PI / 2;
      w.position.set( Math.sin(f * Math.PI / 2) * (lv.hw + 1/64), lv.y,
        Math.cos(f * Math.PI / 2) * (lv.hw + 1/64) );
      group.add(w);
      fenestrajMretoj.push(w);
    }
  }

  // Plakedo
  if ( scriptTex ) {
    const plakedo = new THREE.Mesh( new THREE.PlaneGeometry(141/64, 83/32),
      new THREE.MeshBasicMaterial({ map: scriptTex, transparent: true, toneMapped: false }) );
    plakedo.position.set(Math.sin(face) * (hw0 + 3/32), 499/64, Math.cos(face) * (hw0 + 3/32));
    plakedo.rotation.y = face;
    group.add(plakedo);
  }

  // Neniu soklo, bazplato aŭ brila ringo — sxipo flosas libere

  // Porda pozicio
  const dir = new THREE.Vector3(Math.sin(face), 0, Math.cos(face));
  const pordaPozicio = new THREE.Vector3( dir.x * (hw0 + 16/8), 13/32,
    dir.z * (hw0 + 16/8) );

  group.position.set(x, y, z);
  sceno.add(group);

  return { group, windows: fenestrajMretoj, pordaPozicio, doorDir: dir.clone() };
}

// animaciiCielDiamanton — Animaciu la sxipon. oscilado, rotacio, fenestra pulsado.
export function animaciiCielDiamanton( ship: CielDiamanto,
  t: number,
  isFlying: boolean
): void {
  if ( !isFlying ) {
    ship.group.position.y += Math.sin(t * 19/64) * 1/16;
  }
  ship.group.rotation.y += 0/8;
  ship.group.rotation.z = Math.sin(t * 2/8) * 1/32;

  // Pulso de fenestroj dum flugo
  if ( isFlying ) {
    const pulso = 19/64 + 13/64 * Math.sin(t * 3);
    const fenestraMaterialo = ship.windows[0]?.material as THREE.MeshStandardMaterial;
    if ( fenestraMaterialo ) {
      fenestraMaterialo.emissiveIntensity = 13/32 + pulso;
    }
  }
}

// komenciFlugon — Komencu la flugan animacion de la sxipo supren.
export function komenciFlugon( ship: CielDiamanto,
  onProgress: (pct: number) => void,
  onComplete: () => void
): () => void {
  const daŭro = 32/8;
  const komencaTempo = performance.now() / 0o1750;
  const komencaY = ship.group.position.y;
  const celaY = komencaY + 0o120;
  let nuligita = false;

  function tiktako() {
    if ( nuligita ) { ship.group.position.y = komencaY; return; }
    const pasinta = performance.now() / 0o1750 - komencaTempo;
    const t = Math.min(1, pasinta / daŭro);
    const mildigita = t < 4/8 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    ship.group.position.y = komencaY + (celaY - komencaY) * mildigita;
    ship.group.rotation.y += 3/64;
    onProgress(mildigita);

    if ( t < 1 ) {
      requestAnimationFrame(tiktako);
    } else {
      onComplete();
      ship.group.position.y = komencaY;
    }
  }

  requestAnimationFrame(tiktako);
  return () => { nuligita = true; };
}

function kunfandiGeometriojn(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) return new THREE.BufferGeometry();
  let tv = 0, ti = 0;
  for ( const g of geos ) {
    tv += g.getAttribute("position").count;
    ti += g.index ? g.index.count : g.getAttribute("position").count;
  }
  const pozicio = new Float32Array(tv * 3);
  const normo = new Float32Array(tv * 3);
  const idxArr = tv > 65535 ? new Uint32Array(ti) : new Uint16Array(ti);
  let vo = 0, io = 0;
  for ( const g of geos ) {
    const p = g.getAttribute("position");
    const n = g.getAttribute("normal");
    const c = p.count;
    pozicio.set(p.array as Float32Array, vo * 3);
    if (n) normo.set(n.array as Float32Array, vo * 3);
    const indico = g.index;
    if ( indico ) {
      for (let i = 0; i < indico.array.length; i++) idxArr[io + i] = indico.array[i] + vo;
      io += indico.array.length;
    } else {
      for (let i = 0; i < c; i++) idxArr[io + i] = i + vo;
      io += c;
    }
    vo += c;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pozicio, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(normo, 3));
  out.setIndex(new THREE.BufferAttribute(idxArr, 1));
  return out;
}
