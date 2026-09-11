# Payem Turizm

Next.js + Tailwind + Neon (Drizzle) turizm sitesi. Rezervasyon yalnızca WhatsApp.

## Kurulum

1. Bağımlılıklar: `npm install`
2. `.env.local` dosyasını düzenleyin:
   - `DATABASE_URL` — Neon connection string
   - `AUTH_SECRET` — rastgele uzun secret
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — admin girişi
3. Şema ve seed:
   - `npm run db:push`
   - `npm run db:seed`
4. Geliştirme: `npm run dev`

`DATABASE_URL` yoksa site eski içerik seed’i ile çalışır; admin CRUD için Neon gerekir.

## Admin

- Giriş: `/admin/login`
- Varsayılan (seed / yerel): `admin@payemtravel.com` / `.env.local` içindeki `ADMIN_PASSWORD`

## Sayfalar

- `/` `/turlarimiz` `/gezilerimiz` `/hizmetlerimiz` `/hakkimizda` `/iletisim`
- Admin: tur, gezi, hizmet, sayfa metinleri, ayarlar
