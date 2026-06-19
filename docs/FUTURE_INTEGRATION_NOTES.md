# Supabase холболтын заавар (Future Integration)

Энэ нь development mode (localStorage)-оос production (Supabase) руу шилжих
алхам алхмаар заавар юм. **Гол санаа:** component-ууд service-ийг л дууддаг тул
зөвхөн **adapter** болон **service-ийн дотоод хэсгийг** солих хэрэгтэй.

---

## Архитектур

```
Component  →  Service  →  Adapter  →  (localStorage | Supabase)
```

- **Component** ямар ч өөрчлөлтгүй
- **Service**-ийн public функцийн нэр/signature хэвээр
- Зөвхөн **adapter import** болон зарим service-ийн дотоод async болгох

---

## Алхам 1 — Supabase суулгах

```bash
npm install @supabase/supabase-js
```

`.env` файл үүсгэх (project root):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> `.env`-г `.gitignore`-д нэмэхээ мартуузай.

---

## Алхам 2 — Database үүсгэх

`docs/SUPABASE_SCHEMA.md` доtorх SQL-г Supabase SQL Editor дээр ажиллуулна.

---

## Алхам 3 — supabaseAdapter бичих

`src/services/adapters/supabaseAdapter.placeholder.js` дотор комментоор бичсэн
жишээ кодыг идэвхжүүлж, `supabaseAdapter.js` нэртэй болгож хадгална.

---

## Алхам 4 — Service-үүдийн adapter солих

Жишээ нь `contentService.js` дотор:

```js
// өмнө:
import { localAdapter } from './adapters/localAdapter.js';
const adapter = localAdapter;

// дараа:
import { supabaseAdapter } from './adapters/supabaseAdapter.js';
const adapter = supabaseAdapter;
```

> Supabase нь async тул `getSiteContent()` зэрэг функцийг `async` болгож,
> дуудаж буй component-уудад `await` / `useEffect` дотор зохицуулна.
> (Одоо ч component-ууд `useEffect` дотор дууддаг тул өөрчлөлт бага.)

---

## Алхам 5 — Auth солих

`authService.js`-ийг Supabase Auth-аар солино:

```js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? { success: false, error: error.message } : { success: true };
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function isAuthenticated() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}
```

> `ProtectedRoute.jsx` нь `isAuthenticated()`-г async болгоход session-г
> useEffect/state-аар шалгахаар бага зэрэг өөрчилнө.

---

## Алхам 6 — File storage солих

`fileStorageService.js` дотор `uploadImage` болон `getImageUrl`-г Supabase
Storage руу чиглүүлнэ:

```js
export async function uploadImage(file, folder = 'general') {
  const path = `${folder}/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from('resort-images').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('resort-images').getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export function getImageUrl(path) {
  if (!path) return placeholder;
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from('resort-images').getPublicUrl(path);
  return data.publicUrl;
}
```

---

## Алхам 7 — AI орчуулга (заавал биш)

`src/services/translation/aiTranslatorPlaceholder.js` дотор комментоор бичсэн
API дуудлагыг идэвхжүүлж, `translationService.js` дотор `USE_AI = true` болгоно.

---

## Шалгах жагсаалт

- [ ] `.env` тохируулсан
- [ ] Database table-ууд үүссэн
- [ ] RLS policy тохируулсан
- [ ] Storage bucket public
- [ ] supabaseAdapter бичсэн
- [ ] Service-үүд adapter сольсон
- [ ] Auth Supabase болсон
- [ ] `npm run build` алдаагүй
