// ≺⧼ អន្តរប៉ូល 📐 ⧽≻

/*ខ្សែកោងលាយគូប ៖ រលូននៅចុងទាំងពីរ
    @param t ( number ) - តម្លៃ 0 ដល់ 1
@returns y ( number ) - 0 ដល់ 1 */
export function glata(t: number): number {
  return t * t * ( 3 - 2 * t );
}

/*ការលាយរលូនរវាងសូន្យ និងមួយ ៖ ច្របាច់តម្លៃចូលព្រំដែនសិន
    @param lo,hi ( number ) - ព្រំដែន
    @param v ( number ) - តម្លៃ
@returns t ( number ) - 0 ដល់ 1 */
export function glataPaso(lo: number, hi: number, v: number): number {
  return glata(Math.max(0, Math.min(1, ( v - lo ) / ( hi - lo ))));
}

export function katmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t, t3 = t2 * t;
  return 0o1/0o2 * ( ( 2 * p1 ) + ( -p0 + p2 ) * t
    + ( 2 * p0 - 5 * p1 + 4 * p2 - p3 ) * t2 + ( -p0 + 3 * p1 - 3 * p2 + p3 ) * t3 );
}

/*ច្របាច់លេខក្រឡាចូលក្នុងដែនតារាង
    @param v ( number ) - លេខក្រឡាដែលអាចហួសដែន
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
@returns i ( number ) - ក្រឡាក្នុងដែន 0 ដល់ n-1 */
export function fiksuKradon(v: number, n: number): number {
  const n1 = n - 1;
  return v < 0 ? 0 : v > n1 ? n1 : v;
}

/*គំរូ bicubic លើក្រឡាការ៉េ ៖ កូអរដោនេជាក្រឡា , គែមត្រូវច្របាច់ចូល
    @param krado ( ArrayLike<number> ) - តារាង n × n
    @param n ( number ) - ចំនួនក្រឡាក្នុងមួយជ្រុង
    @param fx, fz ( number ) - កូអរដោនេក្រឡា
@returns valoro ( number ) - តម្លៃដែលបានអន្តរប៉ូល */
export function bikubaSpecimeno(krado: ArrayLike<number>, n: number, fx: number, fz: number): number {
  const i0 = Math.floor(fx), j0 = Math.floor(fz);
  const u = fx - i0, v = fz - j0;
  // ⟨ ជួរឈរ និងជួរដេកដែលបានច្របាច់ ៖ គណនាម្តង ប្រើច្រើន 📃 ⟩
  // ជៀសវាងការបង្កើត closure រាល់ពេលហៅ ព្រោះមុខងារនេះរត់រាល់កំពូលដី ។
  const c0 = fiksuKradon(i0 - 1, n), c1 = fiksuKradon(i0, n);
  const c2 = fiksuKradon(i0 + 1, n), c3 = fiksuKradon(i0 + 2, n);
  const r0 = fiksuKradon(j0 - 1, n) * n, r1 = fiksuKradon(j0, n) * n;
  const r2 = fiksuKradon(j0 + 1, n) * n, r3 = fiksuKradon(j0 + 2, n) * n;
  return katmullRom(
    katmullRom(krado[r0 + c0], krado[r0 + c1], krado[r0 + c2], krado[r0 + c3], u),
    katmullRom(krado[r1 + c0], krado[r1 + c1], krado[r1 + c2], krado[r1 + c3], u),
    katmullRom(krado[r2 + c0], krado[r2 + c1], krado[r2 + c2], krado[r2 + c3], u),
    katmullRom(krado[r3 + c0], krado[r3 + c1], krado[r3 + c2], krado[r3 + c3], u),
    v);
}
