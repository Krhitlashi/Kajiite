// ≺⧼ រូបភាព 2D 🗺️ ⧽≻
// ផ្ទាំងគំនូររបស់ផែនទី និងការគូរទិដ្ឋភាព គឺដី ( ផ្ទាំងគំនូរ
// ដែលដុតដោយ bako.js ) រូបរាងពិភពលោក ស្រទាប់សំណាញ់ ផ្លូវ
// កំពង់ ប្រភព វត្ថុ និងទ្រនិច។ ស្ថានភាពរបស់កម្មវិធីកែសម្រួល ( ទិដ្ឋភាព
// ទ្រនិច ជក់កំពុងប្រើ ) មកតាម agordiBildon2D ហើយការគូរ
// អានវា ប៉ុន្តែមិនដែលផ្លាស់ប្តូរវាទេ។
import { MONDO, MONDO_HALFO, REZ } from "./mezuroj.js";
import { bazaCanvas, pentri, rekalkuliDeklivojn } from "./bako.js";
import { urboj, elektitaUrbo, vojoj, dokoj, elektitaVojo, elektitaPunkto, elektitaDoko,
  elektitaAldonaBloko, kradoOfsX, kradoOfsZ, kradoPlano, vojaDuonLargho,
  desegniKradanTavolon } from "./kradaro.js";
import { fontoj, elektitaFonto } from "./akvo.js";
import { objektoj, objektaModo, elektitaObjekto, objektaBakaKanvaso } from "./objektoj.js";
import { formajRandaj } from "./dosieroj.js";
import { elemento, kunteksto2d } from "../../komunajxoj/dom.js";

export const mapo = elemento<HTMLCanvasElement>("mapo");
export const mapoKunteksto = kunteksto2d(mapo);
// សន្លឹកស្ទីលក្នុងតំបន់ ( stiloj.css ) បំពេញទទឹង ព្រោះទ្រនិច និង
// touch-action មានមុខងារ ( ការគូរដោយជក់ និងការអូសលើផ្ទាំងគំនូរ )។
mapo.style.cursor = "crosshair";
mapo.style.touchAction = "none";
// ឧបករណ៍មើល Movigi ✋ ប្រើផ្ទាំងគំនូរដូចគ្នា ដែលទ្រនិចផ្លាស់ប្តូរដោយ
// gxisdatigiKursoro ( ដៃចាប់ ជំនួសឈើឆ្កាងគោលដៅ )។
// gxisdatigiPlenan2Dn គឺការគណនាឡើងវិញពេញលេញនៃស្រមោល និងរូបភាព 2D។
export function gxisdatigiPlenan2Dn(): void {
  rekalkuliDeklivojn(0, 0, REZ - 1, REZ - 1);
  pentri(0, 0, REZ - 1, REZ - 1);
  markiDesegnon();
}

export function desegniVidon(): void {
  // ស្ថានភាពរបស់កម្មវិធីកែសម្រួលត្រូវបានធ្វើឱ្យស្រស់រាល់ការគូរ ព្រោះទិដ្ឋភាព
  // ទ្រនិច និងជក់ផ្លាស់ប្តូរដោយគ្មានការផ្លាស់ប្តូរការគូរខ្លួនឯង។
  ( { cx: vidCX, cz: vidCZ, skalo: vidSkalo, kursoro, penikoAktiva, aktivaTabo } = preniStaton() );
  const k = mapoKunteksto;
  const duonw = mapo.width / 2, duonh = mapo.height / 2;
  // ពិភពលោកទៅអេក្រង់។ ខាងជើង ( +z ) នៅខាងលើ ខាងកើត ( −x ) នៅខាងស្តាំ គឺ
  // ការតម្រង់ទិសដូចផែនទីតូចរបស់ហ្គេម។
  const sxMondo = ( x: number ): number => duonw - ( x - vidCX ) * vidSkalo;
  const syMondo = ( z: number ): number => duonh - ( z - vidCZ ) * vidSkalo;
  k.imageSmoothingEnabled = true;
  // ផ្ទៃខាងក្រោយមេឃ គឺសម្លេងខៀវស្រាលដូចទិដ្ឋភាព 3D។ ដីគ្របដណ្តប់
  // ពិភពលោកទាំងមូល ដូច្នេះមេឃឃើញនៅគែម និងក្រៅពិភពលោក។
  k.fillStyle = "#a8d0e8";
  k.fillRect(0, 0, mapo.width, mapo.height);
  // ផ្ទាំងគំនូរមូលដ្ឋានមានខាងលិចនៅខាងឆ្វេង ( ភិចសែល 0 = x +MONDO_HALFO )
  // និងខាងជើងនៅខាងលើ ( ភិចសែល 0 = z +MONDO_HALFO )។
  k.drawImage(bazaCanvas, sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  // ⟪ រូបរាងពិភពលោក 📃 ⟫ គឺពិភពលោកមិនមែនសំណាញ់ទិន្នន័យទាំងមូលទេ។ ផ្នែក
  // ខាងក្រៅនៃរូបរាង ( រង្វង់ ចតុកោណកែងមូល ឬ
  // ត្រីកោណមូល ) ងងឹតនៅក្រោមស្រទាប់ភ្លឺ ព្រោះហ្គេមគ្មានដីនោះទាល់តែសោះ
  // ហើយគែមទទួលបន្ទាត់ ដូច្នេះគេឃើញកន្លែងដែលពិភពលោកបញ្ចប់។
  const formoVojo = new Path2D();
  const formoEkstero = new Path2D();
  formoEkstero.rect(0, 0, mapo.width, mapo.height);
  formoVojo.moveTo(sxMondo(formajRandaj[0][0]), syMondo(formajRandaj[0][1]));
  for ( let i = 1; i < formajRandaj.length; i++ ) {
    formoVojo.lineTo(sxMondo(formajRandaj[i][0]), syMondo(formajRandaj[i][1]));
  }
  formoVojo.closePath();
  formoEkstero.addPath(formoVojo);
  k.fillStyle = "rgba(228,236,240,0.74)";
  k.fill(formoEkstero, "evenodd");
  k.strokeStyle = "rgba(255,255,255,0.92)";
  k.lineWidth = 2;
  k.stroke(formoVojo);
  // វត្ថុដែលបានដាក់ គឺការដុតពីលើនៃសំណាញ់ 3D ពិត ( ដូច
  // ផែនទីពេញរបស់ហ្គេម ) ថ្លានៅលើដី។
  if ( objektaBakaKanvaso && objektoj.length > 0 ) {
    // ការដុតមានខាងលិចនៅខាងឆ្វេង ( imgX 0 = x +MONDO_HALFO ) និង
    // ខាងជើងនៅខាងលើ គឺការតម្រង់ទិសដូចផ្ទាំងគំនូរមូលដ្ឋាន ដូច្នេះវាភ្ជាប់
    // នៅ sxMondo(MONDO_HALFO) ដូចគោល។ ( ការភ្ជាប់មុន sxMondo(-MONDO_HALFO)
    // ដាក់ស្រទាប់ដុតនៅខាងខុស គឺក្រៅអេក្រង់ពេល
    // ពង្រីកធំ )។
    k.drawImage(objektaBakaKanvaso,
      sxMondo(MONDO_HALFO), syMondo(MONDO_HALFO), MONDO * vidSkalo, MONDO * vidSkalo);
  }
  // ទីក្រុងសំណាញ់ គឺផ្លូវ ស្ពរ និងអគារលើដី។
  // បង្ហាញតែពេលផ្ទាំង សំណាញ់ 🏙️ សកម្ម ( ព្រោះអគារមិនគួរ
  // បង្ហាញលើផែនទីក្នុងករណីផ្សេង )។ កូអរដោនេផែនការជាសាច់ញាតិទៅ
  // ចំណុចកណ្តាលសំណាញ់ ហើយអុហ្វសិតដាក់សំណាញ់ក្នុងពិភពលោក។
  if ( aktivaTabo === "krado" ) {
    desegniKradanTavolon(k, kradoPlano(), ( x: number ) => sxMondo(x + kradoOfsX), ( z: number ) => syMondo(z + kradoOfsZ), vidSkalo);
    // សញ្ញាទីក្រុង គឺទីក្រុងនីមួយៗនៃ SKULPTA_URBOJ ជាពេជ្រ ជាមួយ
    // ឈ្មោះ ហើយទីក្រុងដែលជ្រើសត្រូវបំភ្លឺ។ ការចុចលើសញ្ញាជ្រើសទីក្រុង
    // ( ដោយ pointerdown របស់ផែនទី )។ សញ្ញាមានទំហំថេរលើ
    // អេក្រង់ ដើម្បីអានបាននៅគ្រប់ការពង្រីក។
    urboj.forEach(( u, i ) => {
      const sx = sxMondo(u.ofsX), sy = syMondo(u.ofsZ);
      const elektita = i === elektitaUrbo;
      k.fillStyle = elektita ? "rgba(255,214,64,0.95)" : "rgba(255,255,255,0.85)";
      k.beginPath();
      k.moveTo(sx, sy - 7);
      k.lineTo(sx + 7, sy);
      k.lineTo(sx, sy + 7);
      k.lineTo(sx - 7, sy);
      k.closePath();
      k.fill();
      k.strokeStyle = elektita ? "#e0b840" : "rgba(0,0,0,0.5)";
      k.lineWidth = elektita ? 0o5/0o2 : 1;
      k.stroke();
      k.font = "bold 12px sans-serif";
      k.textAlign = "center";
      k.textBaseline = "bottom";
      k.lineWidth = 3;
      k.strokeStyle = "rgba(0,0,0,0.85)";
      k.strokeText(u.nomo, sx, sy - 10);
      k.fillStyle = elektita ? "#f8e8a8" : "#ffffff";
      k.fillText(u.nomo, sx, sy - 10);
    });
    // វេទិកាកំពង់របស់ទីក្រុងមេ គឺការ៉េតូចៗនៅ
    // ទីតាំង x របស់កំពង់ ( កំពង់ និងមហាវិថីបង្ហាញក្នុងផែនការ )។
    if ( elektitaUrbo === 0 ) {
      for ( const d of dokoj ) {
        const dx = d.x;
        const sx = sxMondo(dx), sy = syMondo(d.z);
        k.fillStyle = "rgba(200,160,80,0.9)";
        k.fillRect(sx - 4, sy - 4, 8, 8);
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.strokeRect(sx - 4, sy - 4, 8, 8);
      }
    }
    // ប្លុកបន្ថែម គឺប្លុកដែលជ្រើសបំភ្លឺដោយចិញ្ចៀន ( សំណង់
    // ខ្លួនឯងបង្ហាញក្នុងផែនការ )។ ការចុចលើសញ្ញា
    // ជ្រើសវា ហើយការអូសផ្លាស់ទីវា។
    const uAld = urboj[elektitaUrbo];
    const aldonaj = uAld && uAld.aldonajBlokoj ? uAld.aldonajBlokoj : [];
    aldonaj.forEach(( b, i: number ) => {
      const bx = sxMondo(kradoOfsX + b.x), bz = syMondo(kradoOfsZ + b.z);
      if ( i === elektitaAldonaBloko ) {
        k.strokeStyle = "#f8e8a8";
        k.lineWidth = 0o5/0o2;
        k.beginPath();
        k.arc(bx, bz, 9, 0, Math.PI * 2);
        k.stroke();
        k.lineWidth = 1;
      }
    });
    // ខេអ៊ូហ្វហេសូ គឺផ្កាយកំពូលប្រាំមួយបួនជុំវិញចំណុចកណ្តាល ( បង្ហាញតែ
    // ពេលទីក្រុងដែលកំពុងកែមានពួកវា ) ដូចក្នុងទិដ្ឋភាព 3D។
    if ( uAld && uAld.keuxfhxeso ) {
      const R = 0o10;
      k.fillStyle = "rgba(150,210,220,0.95)";
      k.strokeStyle = "rgba(0,0,0,0.4)";
      k.lineWidth = 1;
      for ( let i = 0; i < 4; i++ ) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const sx = sxMondo(kradoOfsX + Math.cos(a) * R), sy = syMondo(kradoOfsZ + Math.sin(a) * R);
        k.beginPath();
        for ( let q = 0; q < 6; q++ ) {
          const ang = a + q * Math.PI / 3;
          const px = sx + Math.cos(ang) * 4, py = sy + Math.sin(ang) * 4;
          if ( q === 0 ) k.moveTo(px, py); else k.lineTo(px, py);
        }
        k.closePath();
        k.fill();
        k.stroke();
      }
    }
    // ចង្កៀងផ្លូវរបស់សំណាញ់ គឺគំរូបួនចង្កៀងជុំវិញថ្នាំងផ្សារ
    // និងផ្លូវប្រសព្វ ( ធរណីមាត្រដូចហ្គេម ពីផែនការ )។ ចំណុចលឿងក្តៅ
    // ជាមួយស្នូលភ្លឺ ដូចពន្លឺចង្កៀងក្នុងទិដ្ឋភាព 3D។
    if ( uAld && uAld.lampoj !== false ) {
      const plano = kradoPlano();
      for ( const l of plano.lampoj ) {
        const sx = sxMondo(kradoOfsX + l.x), sy = syMondo(kradoOfsZ + l.z);
        k.fillStyle = "rgba(248,168,72,0.95)";
        k.beginPath();
        k.arc(sx, sy, 2.2, 0, Math.PI * 2);
        k.fill();
        k.fillStyle = "rgba(248,232,184,0.95)";
        k.beginPath();
        k.arc(sx, sy, 1.1, 0, Math.PI * 2);
        k.fill();
      }
    }
  }
  // ផ្ទាំងរង ផ្លូវ នៃបន្ទះសំណាញ់ គឺផ្លូវ និងកំពង់កម្រិតពិភពលោក
  // ដែលកែលើផែនទី លើទីក្រុងសំណាញ់ ( ដើម្បីឱ្យអាចភ្ជាប់
  // ពួកវាទៅទីក្រុង )។ រូបរាងដូចផែនទីពេញរបស់ហ្គេម គឺ
  // ផ្លូវពណ៌ប្រផេះស្រាលជាមួយគែមអង់ដេស៊ីតងងឹត និងវេទិកាកំពង់។
  if ( vojojAktiva() ) {
    // ផ្លូវ គឺបន្ទាត់ពហុកោណក្រាស់។ ឆ្នូតងងឹតខាងក្រៅ ( គែម
    // អង់ដេស៊ីត ទទឹងដូចកន្លះផ្លូវ ) និងស្នូលឌីអូរីតភ្លឺ ជាមួយ
    // ចុងមូលដូចក្បាលផ្លូវក្នុងហ្គេម។ ផ្លូវដែលជ្រើសត្រូវបំភ្លឺ។
    for ( let vi = 0; vi < vojoj.length; vi++ ) {
      const v = vojoj[vi];
      if ( !v.punktoj || v.punktoj.length < 2 ) continue;
      const elektita = vi === elektitaVojo;
      const duono = vojaDuonLargho(v) * 2;
      const centro = ( v.larĝo || 0o7/0o2 ) / 2;
      const punktoj = v.punktoj.map(p => [ sxMondo(p[0]), syMondo(p[1]) ]);
      const spuro = ( larĝo: number, koloro: string ): void => {
        k.strokeStyle = koloro;
        k.lineWidth = Math.max(1, larĝo * vidSkalo);
        k.lineCap = "round";
        k.lineJoin = "round";
        k.beginPath();
        punktoj.forEach(( p, i: number ) => i === 0 ? k.moveTo(p[0], p[1]) : k.lineTo(p[0], p[1]));
        k.stroke();
      };
      spuro(duono, elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)");
      spuro(centro, elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)");
      // ចំណុច គឺចំណុចដែលជ្រើសត្រូវបំភ្លឺ។
      punktoj.forEach(( p, i: number ) => {
        const aktiva = elektita && i === elektitaPunkto;
        k.fillStyle = aktiva ? "#f8e8a8" : "rgba(255,255,255,0.9)";
        k.beginPath();
        k.arc(p[0], p[1], aktiva ? 5 : 0o7/0o2, 0, Math.PI * 2);
        k.fill();
        k.strokeStyle = "rgba(0,0,0,0.5)";
        k.lineWidth = 1;
        k.stroke();
      });
    }
    // វេទិកាកំពង់ គឺស្នូលឌីអូរីតជាមួយស៊ុមអង់ដេស៊ីត ( រង្វាស់
    // ដូចក្នុង doko.ts គឺទទឹង 0o16/0o10 ស៊ុម 0o4/0o10 )។
    // ⟨ ការបង្វិល 📃 ⟩ គឺវេទិកាខ្លួនឯងជាចតុកោណកែង ប៉ុន្តែការបង្វិល (
    // ដូចក្នុងហ្គេម ) សម្រេចថាកំពូលចង្អុលទៅខាងណា
    // ដូច្នេះការគូរបង្វិលជុំវិញចំណុចកណ្តាលកំពង់។ ការបង្វិលក្នុងពិភពលោក θ ក្លាយជា
    // ការបង្វិលលើអេក្រង់ −θ ( ផែនទីឆ្លុះអ័ក្ស x គឺខាងកើតខាងស្តាំ = −x )។
    // កំពូល ( ខាងទឹក ដែលមូល ) ផ្ទុកសញ្ញាខៀវតូច
    // ដើម្បីឱ្យគេឃើញទិសរបស់កំពង់ ទោះបីកំពង់មិនបង្ហាញ
    // ( កំពូលស្ថិតនៅ −z ក្នុងតំបន់ ដូច្នេះក្រោមចំណុចកណ្តាលលើផែនទី )។
    for ( let di = 0; di < dokoj.length; di++ ) {
      const d = dokoj[di];
      const elektita = di === elektitaDoko;
      const w = 0o16/0o10, prof = d.profundo || 16, kadro = 0o4/0o10;
      const rotacio = d.rotacio ?? 0;
      const sxp = sxMondo(d.x), syp = syMondo(d.z);
      k.save();
      k.translate(sxp, syp);
      k.rotate(-rotacio);
      k.fillStyle = elektita ? "rgba(120,140,120,0.95)" : "rgba(90,98,88,0.9)";
      k.fillRect(-( w / 2 + kadro ) * vidSkalo, -( prof / 2 + kadro ) * vidSkalo,
        ( w + 2 * kadro ) * vidSkalo, ( prof + 2 * kadro ) * vidSkalo);
      k.fillStyle = elektita ? "rgba(255,232,150,0.95)" : "rgba(216,216,208,0.95)";
      k.fillRect(-( w / 2 ) * vidSkalo, -( prof / 2 ) * vidSkalo,
        w * vidSkalo, prof * vidSkalo);
      // ⟨ កំពូលខាងទឹក 📃 ⟩ គឺព្រួញនៅគែមខាងទឹក ( ខាងមុខ )។ បើគ្មានវា កំពង់
      // ដែលបង្វិល π មើលទៅដូចគ្នាបេះបិទនឹងបង្វិល 0 ( ព្រោះវេទិកាជា
      // ចតុកោណកែងស៊ីមេទ្រី ) ដូច្នេះព្រួញគឺជាសញ្ញាតែមួយអំពីទិសរបស់
      // កំពូល។ វាត្រូវបានគូរជាភិចសែលអេក្រង់ ( មិនមែនឯកតាពិភពលោក )
      // ព្រោះផែនទីខ្លួនឯងបង្ហាញពេលបង្រួមនៅក្នុងទំព័រ។
      const pintoY = ( prof / 2 + kadro ) * vidSkalo;
      k.fillStyle = elektita ? "rgba(150,200,240,0.95)" : "rgba(128,170,210,0.9)";
      k.beginPath();
      k.moveTo(0, pintoY + 9);
      k.lineTo(-7, pintoY + 1);
      k.lineTo(7, pintoY + 1);
      k.closePath();
      k.fill();
      k.restore();
    }
  }
  // ចិញ្ចៀនជក់ និងចំណុចកណ្តាល ដែលមិនមានក្នុងឧបករណ៍មើល Movigi ✋ ឬក្នុង
  // ផ្ទាំង សំណាញ់ ( ព្រោះការចុចកែក្រឡា មិនមែនគូរ )។ ក្នុងឧបករណ៍វត្ថុ
  // ចិញ្ចៀនមានកាំតូចថេរ ( ជើងរបស់វត្ថុ )។
  if ( kursoro && !cxuMovigi() && aktivaTabo !== "krado" ){
    const sx2 = sxMondo(kursoro.x);
    const sy2 = syMondo(kursoro.z);
    k.strokeStyle = "rgba(255,255,255,0.8)";
    k.lineWidth = 0o3/0o2;
    k.beginPath();
    k.arc(sx2, sy2, ( objektaModo ? 0o3/0o2 : radiuso() ) * vidSkalo, 0, Math.PI * 2);
    k.stroke();
    k.beginPath();
    k.arc(sx2, sy2, 2, 0, Math.PI * 2);
    k.stroke();
  }
  // វត្ថុដែលជ្រើស គឺចិញ្ចៀនសនៅលើការដុត។
  if ( elektitaObjekto >= 0 && elektitaObjekto < objektoj.length ) {
    const o = objektoj[elektitaObjekto];
    k.strokeStyle = "#ffffff";
    k.lineWidth = 2;
    k.beginPath();
    k.arc(sxMondo(o.x), syMondo(o.z), 6, 0, Math.PI * 2);
    k.stroke();
  }
  // ⟪ ប្រភពទឹក 📃 ⟫ គឺចំណុចដែលទឹកហូរចេញ។ រង្វាស់របស់
  // ចំណុចតាមលំហូរ ( គ្រាប់រំកិល ) ហើយប្រភពដែលជ្រើសមាន
  // ចិញ្ចៀនស។ ប្រភពគឺជាការបញ្ចូលតែមួយគត់របស់ទឹក ដូច្នេះពួកវាបង្ហាញ
  // ជានិច្ច ប៉ុន្តែការបំភ្លឺខ្លាំងជាងពេលប្រើឧបករណ៍ទឹក។
  for ( let i = 0; i < fontoj.length; i++ ) {
    const f = fontoj[i];
    const elektita = i === elektitaFonto;
    const akvaIlo = penikoAktiva === "akvo" || penikoAktiva === "akvoforvisxi";
    const px = sxMondo(f.x), py = syMondo(f.z);
    const r = Math.max(0o7/0o2, ( 1.2 + Math.min(2.4, f.fluo * 0.09) ) * vidSkalo * ( akvaIlo ? 1.25 : 1 ));
    k.beginPath();
    k.arc(px, py, r, 0, Math.PI * 2);
    k.fillStyle = elektita ? "rgba(150,230,255,0.9)" : "rgba(70,170,215,0.78)";
    k.fill();
    k.strokeStyle = elektita ? "#ffffff" : "rgba(240,252,255,0.85)";
    k.lineWidth = elektita ? 0o5/0o2 : 0o3/0o2;
    k.stroke();
    k.beginPath();
    k.arc(px, py, r * 0.35, 0, Math.PI * 2);
    k.fillStyle = "#ffffff";
    k.fill();
  }
}


// ⟪ ការភ្ជាប់ទៅកម្មវិធីកែសម្រួល 📃 ⟫ គឺទិដ្ឋភាព ទ្រនិច ជក់កំពុងប្រើ និង
// ឧបករណ៍ជំនួយរបស់ម៉ូឌុលមេ។ preniStaton ត្រឡប់តម្លៃផ្ទាល់រាល់
// ការគូរ ( ព្រោះកម្មវិធីកែសម្រួលកាន់កាប់ពួកវា )។
type Kursoro = { x: number; z: number };
interface BildaStato {
  cx: number;
  cz: number;
  skalo: number;
  kursoro: Kursoro | null;
  penikoAktiva: string;
  aktivaTabo: string;
}
interface BildaLigo {
  stato: () => BildaStato;
  cxuMovigi: () => boolean;
  vojojAktiva: () => boolean;
  radiuso: () => number;
  markiDesegnon: () => void;
}
// តម្លៃដែលការគូរអាន ដែលត្រូវបានធ្វើឱ្យស្រស់រាល់ស៊ុមពី preniStaton។
let vidCX = 0, vidCZ = 0, vidSkalo = 1;
let kursoro: Kursoro | null = null;
let penikoAktiva = "levi";
let aktivaTabo = "tereno";
let preniStaton: () => BildaStato = () => ( { cx: 0, cz: 0, skalo: 1, kursoro: null, penikoAktiva: "levi", aktivaTabo: "tereno" } );
let cxuMovigi: () => boolean = () => false;
let vojojAktiva: () => boolean = () => false;
let radiuso: () => number = () => 0;
let markiDesegnon: () => void = () => { };
/* ការភ្ជាប់តែម្តងជាមួយឯកសារមេ។
    @param L ( BildaLigo ) - កម្មវិធីអានស្ថានភាព និងឧបករណ៍ជំនួយរបស់កម្មវិធីកែសម្រួល។ */
export function agordiBildon2D(L: BildaLigo): void {
  preniStaton = L.stato;
  cxuMovigi = L.cxuMovigi;
  vojojAktiva = L.vojojAktiva;
  radiuso = L.radiuso;
  markiDesegnon = L.markiDesegnon;
}
