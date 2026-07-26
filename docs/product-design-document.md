# Ebeltoft Marineforening — Digital Platform
### Produktdesign-dokument v1.0

**Udarbejdet til:** Bestyrelsen, Ebeltoft Marineforening
**Formål:** Grundlag for beslutning om udvikling af en samlet digital platform (hjemmeside, PWA, medlems- og bestyrelsesportal)
**Princip:** Platformen designes modulært, så den senere kan genbruges af andre foreninger (marineforeninger, golfklubber, veteranforeninger, grundejerforeninger, vejlaug, idrætsforeninger) ved kun at ændre logo, farver og indhold.

---

## 1. Informationsarkitektur (sitemap)

```
Ebeltoft Marineforening (offentlig)
│
├── Forside
│   ├── Hero (Velkommen til Ebeltoft Marineforening)
│   ├── Seneste nyheder
│   ├── Næste arrangement
│   ├── Bliv frivillig (CTA)
│   ├── Betal kontingent (CTA)
│   ├── Galleri (udpluk)
│   ├── Historie (udpluk)
│   └── Kontakt (udpluk)
│
├── Nyheder
│   └── Enkelt nyhedsopslag
│
├── Kalender
│   └── Arrangement (detaljeside)
│       └── Tilmelding (popup/flow)
│
├── Aktiviteter
│   └── Enkelt aktivitet
│
├── Frivillig
│   └── Opgave (detaljeside)
│       └── "Meld mig" (popup/flow)
│
├── Galleri
│
├── Historie
│   ├── Marinestuen
│   ├── Slupkoret
│   ├── 100-års jubilæum
│   ├── Mindestene
│   └── Symbolerne
│
├── Links
│
├── Kontakt
│
├── Bliv medlem (tilmeldingsflow)
│
└── Mit Ebeltoft (medlemsområde — kræver login)
    ├── Mine arrangementer
    ├── Mine frivilligopgaver
    ├── Mine betalinger
    ├── Mit kontingent
    └── Mine oplysninger

Bestyrelsesportal (kræver login + rolle)
│
├── Dashboard (overblik)
├── Nyheder (opret/redigér)
├── Kalender (opret/redigér arrangementer)
├── Tilmeldinger
│   ├── Digitale tilmeldinger (automatisk)
│   ├── Manuel registrering (telefon/seddel/mail)
│   └── Venteliste
├── Frivillige
│   ├── Opgaver (opret/redigér)
│   ├── Hvem hjælper / hvem mangler
│   └── Historik
├── Medlemmer
│   ├── Medlemsliste
│   └── Kontingentstatus
├── Dokumenter
│   ├── Referater
│   ├── Vedtægter
│   ├── Historiske dokumenter
│   └── Marineforeningens Fond
├── Galleri (administration)
├── Links (administration)
└── Roller og adgang
```

**Princip for navigation:** Den offentlige struktur følger den viste liste (Forside, Nyheder, Kalender, Aktiviteter, Galleri, Historie med undersider, Marinestuen, Slupkoret, 100-års jubilæum, Mindestene, Symbolerne, Links, Kontakt, Bliv medlem, Bestyrelse-login). "Historie" er en samlet forside med de fem undertemaer som kort, ikke fem separate menupunkter — det holder hovedmenuen overskuelig.

---

## 2. Designsystem

### 2.1 Farver

| Rolle | Farve | Hex |
|---|---|---|
| Primær marineblå (overskrifter, headers) | Mørk marineblå | `#15294A` |
| Sekundær marineblå (flader, baggrunde) | Lys/rolig marineblå | `#3B5D82` |
| Baggrund | Hvid | `#FFFFFF` |
| Flader / kort | Lys grå | `#F5F5F3` |
| Accent (diskret) | Guld/messing | `#B08D57` |
| Accent (kun hvor relevant — fx status/fejl) | Rød | `#B0223A` |
| Brødtekst | Mørk gråblå (ikke sort) | `#2B3648` |
| Sekundær tekst | Grå | `#6B7484` |

Rød bruges **kun** til: fejlbeskeder, "venteliste fuld", afmeldingsknap — aldrig som dekoration.

### 2.2 Typografi

- **Display/overskrifter:** Serif (fx Cambria/Georgia-familie) — giver den klassiske, tidløse fornemmelse.
- **Brødtekst og UI:** Sans-serif (fx system-ui/Inter/Segoe) — rolig og letlæselig i lister, formularer, tabeller.
- Minimumsstørrelse i UI: 15px brødtekst, 13px hjælpetekst. Ingen "lille skrift" i vigtigt indhold.

### 2.3 Komponenter (standardbibliotek)

- **Knapper:** Primær (guld/navy udfyldt), sekundær (kant, ingen fyld), tekstlink. Store klikflader (min. 44px høje på mobil).
- **Kort:** Bruges til arrangementer, frivilligopgaver, nyheder, dokumenter. Fast struktur: titel, metadata-linje, kort tekst, handling.
- **Formular/popup:** Samme mønster overalt (arrangement-tilmelding og frivillig-tilmelding bruger identisk komponent — kun felterne varierer).
- **Status-mærker:** "Ledige pladser", "Venteliste", "Fuldt booket", "Mangler frivillige" — tekst + farve, ingen dekorative ikoner.
- **Tabel/liste:** Bruges i bestyrelsesportalen (medlemmer, tilmeldinger, kontingent).

### 2.4 Ikoner

Få, konsekvente, linjebaserede ikoner — kun hvor de erstatter tekst hurtigere end ord (kalender, telefon, mail, dokument). Ingen ikoner som ren dekoration.

### 2.5 Logo

Det originale logo bruges uændret. Det placeres diskret (fast str. ca. 40–56px højde) i header — aldrig som baggrund eller i stor skala.

---

## 3. Teknisk arkitektur

### 3.1 Overordnet

```
Bruger (browser/PWA)
        │
        ▼
Next.js (frontend + API routes) ── hostet på Vercel
        │
        ▼
Supabase (PostgreSQL + Auth + Storage)
        │
        ├── Row Level Security (adgang styret pr. rolle)
        ├── Storage (billeder, dokumenter)
        └── Scheduled backup
```

- **Next.js + TypeScript:** Ét kodebase til både offentlig side, medlemsområde og bestyrelsesportal — adskilt via ruter og rolle-tjek.
- **Tailwind CSS:** Implementerer designsystemet (afsnit 2) som genbrugelige klasser/tokens — samme opsætning kan "re-themes" til andre foreninger.
- **Supabase:** Database, login (medlem/bestyrelse), fillagring (dokumenter, billeder), automatisk backup.
- **PWA:** Manifest + service worker, så siden kan installeres på mobil/tablet og fungere delvist offline (fx se kalender uden forbindelse).
- **Vercel:** Hosting, automatisk deployment fra GitHub, EU-region.
- **GitHub:** Kildekode, versionsstyring, issues til fejl/ønsker.

### 3.2 Modulær opbygning (til genbrug på tværs af foreninger)

```
/config
  club.config.ts     ← navn, logo, farver, aktive moduler
/modules
  /news
  /calendar
  /events            ← arrangementer + tilmelding
  /volunteers        ← frivilligmodul (samme motor som events)
  /members
  /payments          ← MobilePay/kontingent
  /documents
  /board             ← bestyrelsesportal
```

Hvert modul kan slås til/fra i `club.config.ts`. Events og Volunteers deler samme underliggende "tilmeldings-motor" (samme datamodel, samme UI-komponenter), som beskrevet i kravene — kun label og felter varierer.

### 3.3 AI-funktioner (hjælpende, ikke styrende)

AI foreslås brugt afgrænset og med menneske i kontrol:
- Søgning i referater, vedtægter og historiske dokumenter (semantisk søgning).
- Forslag til nyhedstekst/udkast — bestyrelsen godkender og redigerer altid før offentliggørelse.

AI må aldrig offentliggøre indhold, ændre data eller godkende tilmeldinger automatisk.

---

## 4. Database og brugerroller

### 4.1 Roller

| Rolle | Adgang |
|---|---|
| **Gæst** | Offentligt indhold, tilmelding til arrangementer/frivilligopgaver, oprette medlemskab |
| **Medlem** | Alt fra gæst + "Mit Ebeltoft": egne tilmeldinger, betalinger, kontingent, oplysninger |
| **Frivillig-koordinator** | Medlem + kan oprette/redigere frivilligopgaver, se tilmeldte |
| **Redaktør** | Medlem + kan oprette/redigere nyheder, galleri |
| **Kasserer** | Medlem + kontingentstatus, betalingsoverblik, CSV-eksport |
| **Bestyrelsesmedlem** | Fuld adgang til bestyrelsesportal (nyheder, kalender, dokumenter, referater) |
| **Administrator** | Alt ovenstående + brugerroller, moduler til/fra, systemindstillinger |

Roller er additive og styres via Row Level Security i databasen — en bruger kan have flere roller.

### 4.2 Centrale tabeller (forenklet)

```sql
members            (id, name, email, phone, member_since, status)
user_roles         (user_id, role)                      -- én bruger, flere roller
events             (id, type['event'|'volunteer'], title, date, time,
                    location, description, capacity, price, status)
registrations      (id, event_id, member_id | manual_contact,
                    guests_count, meal_choice, note,
                    source['digital'|'phone'|'paper'|'email'],
                    status['confirmed'|'waitlist'|'cancelled'],
                    created_by, created_at)
volunteer_shifts    (id, event_id, needed, filled)         -- antal frivillige pr. opgave
payments           (id, member_id, type['contingent'|'event'|'donation'],
                    amount, method, status, receipt_sent_at)
documents          (id, category, title, file_url, visible_to_role)
news               (id, title, body, published_at, author_id)
```

`source`-feltet på `registrations` er nøglen til hybridmodellen: en tilmelding registreret af bestyrelsen pr. telefon eller seddel lander i **samme tabel og samme liste** som en digital tilmelding — så alt samles ét sted, uden at erstatte de nuværende arbejdsgange.

---

## 5. Udviklingsplan (faser)

| Fase | Indhold | Resultat |
|---|---|---|
| **1. Fundament** | Design system, projektopsætning (Next.js/Supabase/Vercel), forside, nyheder, kalender (visning) | Offentlig side klar til visning |
| **2. Medlemskab & betaling** | Bliv medlem-flow, MobilePay-integration, kontingent, automatisk kvittering | Medlemmer kan melde sig ind og betale |
| **3. Arrangementer & frivillig** | Tilmeldingsmotor (arrangementer + frivillig), venteliste, afmelding, manuel registrering, CSV-eksport | Fuld hybrid tilmeldingsløsning |
| **4. Bestyrelsesportal** | Dashboard, dokumentarkiv, referater, roller/rettigheder | Bestyrelsen kan drive foreningen digitalt |
| **5. Medlemsområde** | "Mit Ebeltoft" — egne tilmeldinger, betalinger, oplysninger | Selvbetjening for medlemmer |
| **6. PWA & finish** | Installérbar app, offline-understøttelse, historie-sektion, galleri | Færdigt produkt |
| **Senere** | Push-notifikationer, sponsorportal, online afstemninger, booking, digital historik/arkiv, AI-søgning | Udvidelser efter behov |

Hver fase kan godkendes og igangsættes selvstændigt af bestyrelsen.

---

## 6. Genbrug til andre foreninger

Fordi modulerne, designsystemet og tilmeldings-motoren er adskilt fra Ebeltoft Marineforenings konkrete indhold, kan platformen genudrulles til en ny forening ved at:

1. Udskifte `club.config.ts` (navn, logo, farver, aktive moduler).
2. Oprette en ny Supabase-instans med samme skema.
3. Genbruge samme Next.js-kodebase uændret.

Dette er beskrevet nærmere i det medfølgende repository (`README.md`).
