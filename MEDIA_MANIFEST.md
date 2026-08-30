# MEDIA MANIFEST — Ebeltoft Marineforening

Denne fil lister præcis hvilke mediefiler forsiden forventer, og hvor de skal ligge.
Ingen af filerne nedenfor findes fysisk i projektet endnu — mapperne er oprettet og klar,
men **status er MANGLER FIL for alle**, indtil de rigtige filer leveres.

Ingen af disse manglende filer vises som tekst på den offentlige side. Koden peger blot
på den korrekte sti; browseren viser intet/ingenting for det pågældende element, indtil
filen findes der.

---

## HERO

| Filnavn | Sti | Format | Status |
|---|---|---|---|
| ebeltoft-marine-poster.jpg | `assets/media/hero/ebeltoft-marine-poster.jpg` | JPG (poster/fallback, altid synligt bag video) | MANGLER FIL |
| ebeltoft-marine-hero.webm | `assets/media/hero/ebeltoft-marine-hero.webm` | WebM (primær video-kilde) | MANGLER FIL |
| ebeltoft-marine-hero.mp4 | `assets/media/hero/ebeltoft-marine-hero.mp4` | MP4 (fallback video-kilde) | MANGLER FIL |

Anbefalet indhold: 8–12 sekunders roligt klip af vand/havn i Ebeltoft, evt. med
sejlbåd eller maritim aktivitet. Poster-billedet bør være et enkeltbillede fra
samme klip eller stemning, så der ikke er et synligt spring, når videoen fader ind.

## NÆSTE ARRANGEMENT (dynamisk — "Næste i Marineforeningen")

| Filnavn | Sti | Fallback | Status |
|---|---|---|---|
| `{arrangement-id}.jpg` (fx sommeraften-paa-vandet.jpg) | `assets/media/events/` | → `event-fallback.jpg` → `general-fallback.jpg` | MANGLER FIL |
| event-fallback.jpg | `assets/media/events/event-fallback.jpg` | → `general-fallback.jpg` | MANGLER FIL |

Systemet forsøger automatisk et event-specifikt billede først. Findes det ikke,
falder det tilbage til et generelt arrangementsbillede, og til sidst til det
generelle maritime fallback-billede (se nedenfor).

## OPLEV MARINEFORENINGEN

| Sektion | Sti | Status |
|---|---|---|
| Sejlads | `assets/media/activities/sejlads.jpg` | MANGLER FIL |
| Kammeratskab | `assets/media/community/kammeratskab.jpg` | MANGLER FIL |
| Maritim historie | `assets/media/history/maritim-historie.jpg` | MANGLER FIL |
| Arrangementer | `assets/media/events/arrangementer.jpg` | MANGLER FIL |

## STORYTELLING

| Sektion | Sti | Status |
|---|---|---|
| "Mere end en forening" | `assets/media/history/mere-end-en-forening.jpg` | MANGLER FIL |
| "Marinestuen — Et hjem ved havnen" | `assets/media/history/marinestuen.jpg` | MANGLER FIL |

## SENEST SKET

| Historie | Sti | Status |
|---|---|---|
| Kammeratskabsaften i Marinestuen | `assets/media/community/senest-sket-kammeratskabsaften.jpg` | MANGLER FIL |
| Sejlads til Tunø i flot vejr | `assets/media/events/senest-sket-sejlads-tunoe.jpg` | MANGLER FIL |
| Flagdag ved mindestenen | `assets/media/community/senest-sket-flagdag.jpg` | MANGLER FIL |

## GENERELT FALLBACK-BILLEDE

| Filnavn | Sti | Anvendes af | Status |
|---|---|---|---|
| general-fallback.jpg | `assets/media/community/general-fallback.jpg` | Sidste fallback-trin for alle billeder på forsiden (Discover-kort, storytelling, nyheder, arrangement) | MANGLER FIL |

Dette er det vigtigste billede at levere først — det er sikkerhedsnettet for
hele forsiden, indtil de øvrige, mere specifikke billeder er klar.

---

## Prioriteret rækkefølge for levering

1. **`general-fallback.jpg`** — dækker alle tomme felter med det samme
2. **`ebeltoft-marine-poster.jpg`** — hero er sidens vigtigste visuelle element
3. De 4 Oplev Marineforeningen-billeder
4. Storytelling- og Senest sket-billeder
5. Hero-video (webm + mp4) — kan eftersendes; hero fungerer fuldt ud med kun poster-billedet

## Ikke rørt i denne omgang

Arrangementer-siden (fulde arrangementsliste) og Galleri-siden bruger fortsat
midlertidige eksterne billeder — de var uden for scope for denne rettelse
("kun forsiden"). Sig til, når disse skal have samme lokale mediestrategi.
