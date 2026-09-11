# MEDIA MANIFEST — Ebeltoft Marineforening

Status pr. denne levering: **6 autentiske fotos fra foreningen er nu implementeret.**
Hero-video (MP4/WebM) mangler fortsat fysisk — se nederst.

---

## LEVEREDE, AUTENTISKE FOTOS (i brug)

| Foto | Motiv | Sti | Bruges til |
|---|---|---|---|
| A | Foreningshuset forfra | `assets/media/foreningen/foreningshuset-forfra.jpg` | Storytelling "Mere end en forening" + universelt sikkerheds-fallback overalt |
| B | Slupkoret/medlemmer synger | `assets/media/foreningen/slupkoret.jpg` | Oplev Marineforeningen → Kammeratskab |
| C | Foreningshuset med flag | `assets/media/foreningen/foreningshuset-med-flag.jpg` | Oplev Marineforeningen → Maritim historie + Senest sket "Flagdag ved mindestenen" |
| D | Dækket bord i Marinestuen | `assets/media/arrangementer/marinestuen-bord.jpg` | Oplev Marineforeningen → Arrangementer + Storytelling "Marinestuen" + Senest sket "Kammeratskabsaften" |
| E | Foreningens kanon | `assets/media/historie/kanonen.jpg` | Kopieret ind i projektet — **endnu ikke placeret** (ingen ledig plads på forsiden uden at ændre struktur). Klar til fx Historien-siden i en senere runde. |
| F | Medlemmer i Sluppen på vandet | `assets/media/arrangementer/sluppen-paa-vandet.jpg` | Oplev Marineforeningen → Sejlads + Senest sket "Sejlads til Tunø" + fallback for "Næste i Marineforeningen", hvis et arrangement mangler eget billede |
| G (bonus) | Roligt hav/kystlinje | `assets/media/hero/marineforeningen-poster.jpg` | **Hero poster/fallback** — vises altid bag videoen |

Alle 7 filer er konverteret til optimeret, progressivt JPEG (10–46 KB pr. fil).

**Fallback-kæde (aldrig et tomt felt):** Hvert billede har nu `onerror` → springer til `foreningshuset-forfra.jpg` (foto A), hvis den primære fil mod forventning ikke kan indlæses. "Næste i Marineforeningen" springer specifikt til sejlads-fotoet (F) først, derefter til A.

---

## HERO-VIDEO (mangler stadig fysisk)

| Filnavn | Sti | Status |
|---|---|---|
| ebeltoft-marine-hero.webm | `assets/media/hero/ebeltoft-marine-hero.webm` | MANGLER FIL |
| ebeltoft-marine-hero.mp4 | `assets/media/hero/ebeltoft-marine-hero.mp4` | MANGLER FIL |

Indtil videoen leveres, viser heroen **foto G** (roligt hav) permanent som poster/fallback — aldrig en blå eller tom flade.

## IKKE RØRT I DENNE OMGANG

Arrangementer-siden (fuld liste) og Galleri-siden bruger fortsat midlertidige eksterne billeder — uden for scope ("kun forsiden, ingen andre sider").
