# Supabase Database Schema

Энэ нь production-д Supabase руу шилжихэд хэрэглэх database бүтэц юм.
Supabase SQL Editor дээр доорх SQL-г ажиллуулна.

---

## 1. `site_content` — сайтын агуулга

Бүх сайтын агуулгыг нэг JSONB баганад хадгална (хамгийн хялбар хувилбар).

```sql
create table site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- анхны мөр (defaultContent.js-тэй ижил бүтэц)
insert into site_content (key, data) values ('site_content', '{}'::jsonb);
```

> `contentService.getSiteContent()` нь `key = 'site_content'` мөрийн `data`-г уншина.

---

## 2. `inquiries` — ирсэн хүсэлтүүд

```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  guest_count text,
  preferred_date text,
  message text,
  source_page text default 'contact',
  language text default 'mn',
  status text default 'new'
    check (status in ('new','contacted','confirmed','cancelled','archived')),
  submitted_at timestamptz default now()
);

create index inquiries_status_idx on inquiries (status);
create index inquiries_submitted_idx on inquiries (submitted_at desc);
```

---

## 3. `analytics_events` — статистикийн event

```sql
create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  language text default 'mn',
  device text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index analytics_type_idx on analytics_events (type);
create index analytics_created_idx on analytics_events (created_at);
```

---

## 4. Storage bucket — зураг

Supabase Dashboard → Storage → New bucket:

- Bucket нэр: `resort-images`
- Public: **ON** (зургийг олон нийтэд харуулна)

Folder бүтэц: `hero/`, `gallery/`, `logo/`, `general/`

---

## 5. Auth

Supabase Authentication ашиглана:

- Email + password бүхий admin хэрэглэгч үүсгэнэ
- `authService.js`-ийг Supabase Auth дуудлагаар солино (FUTURE_INTEGRATION_NOTES үзнэ үү)

---

## 6. Row Level Security (RLS)

```sql
-- site_content: бүгд унших, зөвхөн нэвтэрсэн хэрэглэгч засах
alter table site_content enable row level security;
create policy "public read" on site_content for select using (true);
create policy "auth write"  on site_content for all
  using (auth.role() = 'authenticated');

-- inquiries: бүгд нэмэх (форм), зөвхөн admin унших/засах
alter table inquiries enable row level security;
create policy "anyone insert" on inquiries for insert with check (true);
create policy "auth manage"   on inquiries for all
  using (auth.role() = 'authenticated');

-- analytics_events: бүгд нэмэх, зөвхөн admin унших
alter table analytics_events enable row level security;
create policy "anyone insert" on analytics_events for insert with check (true);
create policy "auth read"     on analytics_events for select
  using (auth.role() = 'authenticated');
```
