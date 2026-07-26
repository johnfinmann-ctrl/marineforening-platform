# Ebeltoft Marineforening — digital platform

Modulær Next.js/Supabase-platform til Ebeltoft Marineforening. Kodebasen er bevidst
opbygget, så den kan genbruges af andre foreninger (golfklubber, veteranforeninger,
grundejerforeninger, vejlaug, idrætsforeninger) ved kun at ændre `config/club.config.ts`,
farver/logo og indhold.

Se det fulde produktdesign-dokument for baggrund, informationsarkitektur, designsystem,
teknisk arkitektur, database/roller og udviklingsplan i faser: `docs/product-design-document.md`
(leveret sammen med dette repository).

## Teknologi

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — implementerer designsystemet som tokens/klasser
- **Supabase** — PostgreSQL, Auth, Storage, Row Level Security
- **Vercel** — hosting og deployment
- PWA-understøttelse via `manifest.json` + service worker (tilføjes i fase 6, se udviklingsplan)

## Kom i gang lokalt

```bash
npm install
cp .env.example .env.local   # udfyld med jeres Supabase-projekt
npm run dev
```

## Struktur

```
config/club.config.ts     ← navn, farver, logo, aktive moduler for DENNE forening
supabase/schema.sql       ← database-skema (tabeller)
supabase/policies.sql     ← Row Level Security-politikker (roller)
supabase/seed.sql         ← eksempeldata til udvikling
src/app/                  ← sider (forside, kalender, frivillig, mit-ebeltoft, bestyrelse, dokumenter)
src/modules/              ← ét modul pr. forretningsområde — kan slås til/fra
src/lib/supabaseClient.ts ← Supabase-forbindelse
```

Hvert modul i `src/modules` indeholder sin egen datahentning og UI-komponenter, og er
uafhængigt af de øvrige moduler ud over fælles typer i `src/lib`. `events` og `volunteers`
deler samme tilmeldings-mønster (samme databasetabel `registrations`, samme UI-komponent
til tilmeldingsformular) — kun label og felter varierer, som beskrevet i produktdesign-dokumentet.

## Genbrug til en ny forening

1. Duplikér repositoriet (eller brug det som template).
2. Ret `config/club.config.ts` — navn, farver, logo-fil, hvilke moduler der er aktive.
3. Opret en ny Supabase-instans og kør `supabase/schema.sql` + `supabase/policies.sql`.
4. Deploy til Vercel med de nye miljøvariabler.

Ingen ændringer i selve kodebasen bør være nødvendige for en forening med samme
modulbehov som Ebeltoft Marineforening.

## Udviklingsfaser

Se afsnit 5 i `docs/product-design-document.md` for den fulde fase-plan
(Fundament → Medlemskab & betaling → Arrangementer & frivillig → Bestyrelsesportal →
Medlemsområde → PWA & finish → senere udvidelser).

## Sikkerhedsopdatering (juli 2026)

Projektet er opdateret fra Next.js 14.2.5 (som Vercel afviste pga. kendte sårbarheder)
til **Next.js 15.5.22** og **React 19**. `npm audit` viser 0 sårbarheder efter opdateringen.

Bemærk: `package.json` indeholder et `overrides`-felt, der tvinger Next.js' egne
indlejrede afhængigheder (`postcss`, `sharp`) op til patched versioner. Dette er
nødvendigt, fordi Next.js 15.5.22 selv bundler ældre, sårbare versioner af disse —
uden overrides ville `npm audit` stadig vise højrisiko-fund, som ikke kan rettes
via de normale dependencies/devDependencies alene.

## Status

Dette er et **arkitektur- og struktur-udkast** (skelet), ikke en færdig, produktionsklar
applikation. Sider under `src/app` er stub-komponenter, der viser strukturen og er klar
til at blive fyldt med rigtig data via Supabase-klienten i `src/lib/supabaseClient.ts`.
