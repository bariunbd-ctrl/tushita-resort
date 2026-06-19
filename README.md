# Амралтын газрын вэб сайт (CMS-ready)

Монгол/Англи хэлтэй, админ удирдлагын самбартай амралтын газрын вэб сайт.
Одоогоор **local development mode** дээр ажиллана (localStorage + mock adapter),
гэхдээ цаашид **Supabase** (Database, Storage, Auth) руу хялбар шилжихэд бэлэн
**service layer / adapter** бүтэцтэй.

---

## 1. Технологи

- React + Vite + Tailwind CSS (JavaScript)
- react-router-dom — public сайт ба админ хоёр тусдаа route
- lucide-react — icon
- Development mode: localStorage + mock adapter
- Production-ready: Supabase adapter (placeholder)

---

## 2. Суулгах ба ажиллуулах

```bash
npm install      # хамаарлуудыг суулгана
npm run dev      # хөгжүүлэлтийн сервер (http://localhost:5173)
npm run build    # production build (dist/ folder)
npm run preview  # build-ийг локалд урьдчилан үзэх
```

---

## 3. Cursor дээр нээх заавар

1. Энэ folder-ийг задлаад Cursor дээр **File → Open Folder** хийнэ
2. Доод талын terminal нээж (`Ctrl/Cmd + ~`) дараах командыг бичнэ:
   ```bash
   npm install
   npm run dev
   ```
3. Terminal-д гарч ирэх `http://localhost:5173` холбоосыг browser-ээр нээнэ
4. Код засахдаа Cursor-ийн AI-г ашиглаж болно — файлууд тодорхой бүтэцтэй

---

## 4. Хуудаснууд

- **Нүүр (public сайт):** `http://localhost:5173/`
- **Админ нэвтрэх:** `http://localhost:5173/admin/login`
- **Админ самбар:** `http://localhost:5173/admin/dashboard`

### Админ нэвтрэх (туршилт)

| Талбар | Утга |
|--------|------|
| Нэвтрэх нэр | `admin` |
| Нууц үг | `admin123` |

---

## 5. Мэдээлэл засах

Админ самбарын зүүн талын цэснээс хүссэн хэсгээ сонгоно:

- **Ерөнхий мэдээлэл** — сайтын нэр, уриа, лого
- **Hero section** — нүүрний гарчиг, арын зураг
- **Бидний тухай** — танилцуулга, давуу талууд
- **Байгаль & Gallery** — мэдлэгийн card + зургийн цомог (нэг section)
- **Үйлчилгээ** — үйлчилгээний жагсаалт
- **Үнийн мэдээлэл** — багц, үнэ, багтсан зүйлс
- **Байршил** — хаяг, Google Maps embed
- **Холбоо барих** — утас, имэйл, хаяг
- **Social links** — сошиал хаягууд
- **Ирсэн хүсэлтүүд** — формоор ирсэн хүсэлтүүд, статус
- **Статистик** — хандалт, товч дарсан тоо

Засаад **"Хадгалах"** товч дарвал ногоон мэдэгдэл гарч, өгөгдөл хадгалагдана.

---

## 6. Автомат орчуулга (MN → EN)

MN/EN талбар бүрийн дээр **"Auto translate"** toggle байна:

- **ON** үед: MN талбарт бичээд зогсонгуут (500ms дараа) EN талбар автоматаар бөглөгдөнө
- **OFF** үед: EN-г гараар засна
- **"Автоматаар орчуулах"** товчоор тухайн агшинд орчуулж болно

### Орчуулга хэрхэн ажилладаг вэ

1. **Интернет байвал** — Google-ийн нээлттэй орчуулгын холбоосоор (API key,
   token **шаардахгүй**) шууд орчуулна. Бүрэн өгүүлбэрийг чанартай орчуулна.
2. **Интернетгүй / алдаа гарвал** — автоматаар дотоод dictionary руу унаж
   (fallback), апп эвдрэхгүй. Dictionary нь зөвхөн түгээмэл үгсийг орчуулах
   тул танихгүй өгүүлбэрт `[Translation needed]` гарч магадгүй.

> ⚠️ **Анхааруулга:** Google-ийн ашиглаж буй холбоос нь албан ёсоор
> баримтжуулаагүй дотоод endpoint юм. Олон жил ажилладаг ч Google хүссэн үедээ
> өөрчилж болзошгүй. Production-д бат тогтвортой байдал шаардвал DeepL эсвэл
> Google Cloud Translation API (key-тэй) руу шилжихийг зөвлөнө —
> `src/services/translation/translationService.js` дотор хялбар солино.
>
> Зөвхөн dictionary ашиглахыг хүсвэл `translationService.js` доtorх
> `USE_GOOGLE = false` болгоно.

---

## 7. Зураг оруулах тухай

- Админ самбарт зураг оруулахад browser дотор **base64 болж localStorage**-д хадгалагдана
- Энэ нь зөвхөн тухайн browser дээр харагдана (development mode)
- Production-д Supabase Storage руу шилжүүлнэ (доорх заавар)
- Зургийн дээд хэмжээ: **3MB**

---

## 8. Өгөгдөл хадгалах (localStorage)

Бүх өгөгдөл browser-ийн localStorage-д хадгалагдана:

- `resort_site_content` — сайтын бүх агуулга
- `resort_inquiries` — ирсэн хүсэлтүүд
- `resort_analytics_events` — статистикийн event-ууд
- `resort_auth` — нэвтрэлтийн төлөв
- `file_*` — base64 зургууд

> 💡 Browser-ийн өгөгдлийг цэвэрлэвэл бүх засвар арилна. Анхны өгөгдөлд буцаахдаа
> `contentService.resetSiteContent()`-г ашиглана.

---

## 9. Supabase-ready бүтэц

Энэ project нь **adapter pattern**-тэй. Component-ууд **хэзээ ч** localStorage-г шууд
дуудахгүй — зөвхөн **service layer**-аар дамжина:

```
Component → Service (contentService, inquiryService, ...) → Adapter (localAdapter)
```

Supabase руу шилжихэд зөвхөн **adapter**-г солих хэрэгтэй, бусад код хэвээр.
Дэлгэрэнгүйг үзнэ үү:

- `docs/SUPABASE_SCHEMA.md` — database table бүтэц
- `docs/FUTURE_INTEGRATION_NOTES.md` — холбох алхамууд

---

## 10. Анхааруулга

- Энэ нь **production-д шууд deploy хийх** зорилготой биш — бодит хэрэглээнд
  Supabase холбоход **бэлэн бүтэцтэй** template юм
- `admin / admin123` нь зөвхөн **туршилтын** нэвтрэлт — production-д Supabase Auth ашиглана
- localStorage өгөгдөл нь зөвхөн нэг browser дээр хадгалагдана

---

## 11. Folder бүтэц (товч)

```
src/
  App.jsx                  ← public + admin routing
  contexts/LanguageContext.jsx
  data/defaultContent.js   ← анхны default өгөгдөл
  services/                ← бүх логик энд (component-ууд эндээс дуудна)
    contentService.js
    inquiryService.js
    authService.js
    fileStorageService.js
    analyticsService.js
    translation/
    adapters/
  components/               ← public сайтын хэсгүүд
  admin/                    ← админ самбар
```
