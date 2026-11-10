# 👟 Skoen trykker

Finn ut hvor skoen trykker akkurat nå, og få små, konkrete grep for å få det litt bedre.

## Kom i gang

```bash
npm start          # http://localhost:3002
npm run dev        # samme, men restarter ved endringer i server.js
PORT=4000 npm start
```

Ingen avhengigheter, bare Node (v18+). All data lagres i nettleserens `localStorage`.

## Konseptet

1. **Kartlegging (3 min):** Gi skår 1–10 på åtte livsområder (et «livshjul»): søvn, humør, fysisk aktivitet, kosthold, relasjoner, stress/grenser, mestring og glede.
2. **Utdyping:** For de tre laveste områdene krysser du av hva du kjenner deg igjen i, for eksempel «jeg er trøtt om morgenen» eller «jeg sier ja til ting jeg ikke vil».
3. **Her trykker skoen:** Du får 2–3 skreddersydde småtiltak per område (1–30 min) og relevante minikurs.
4. **Min plan:** Legg tiltak i planen, huk av hver dag, se striker og sju-dagershistorikk. Ta ny kartlegging senere for å se utviklingen.
5. **Minikurs:** Fem dager med én leksjon og én oppgave per dag: *Si nei og sett grenser*, *Smalltalk med fremmede*, *Nullstill døgnrytmen*.
6. **Livsstilshjulet (`#/livsstilshjulet`):** 18 områder (overskudd, stress, tankesett, egenomsorg, hygiene, rus, spill, økonomi, bolig, utdanning, arbeid, fritid …) vurderes 1–10 i et interaktivt hjul. De tre laveste gir tiltak, kurs og (for økonomi, spill, rus, bolig, røyking) hvor man kan få hjelp. Områdene er hentet fra Livsstilshjulet © InFlow24; beskrivelsene er omskrevet med egne ord.
7. **Morgenritual:** Bygg 10–15 minutter fra tolv byggeklosser, eller start fra et ferdig forslag.

**Trygghet:** Lav skår på mental helse, eller avkrysning av «tanker om at jeg ikke orker mer», gir en tydelig boks med hjelpetelefoner (113, 116 117, 116 123, Kirkens SOS). Hjelpelinjene ligger også alltid i bunnteksten.

## Struktur

```
server.js          Liten statisk server (SPA-fallback, ingen avhengigheter)
public/index.html  Skall + navigasjon
public/app.js      Visninger, ruting (#/…), lagring, anbefalingslogikk
public/data.js     ALT innhold: områder, tegn → tiltak, kurs, morgenritual, hjelpelinjer
public/styles.css  Design (lys/mørk modus)
```

Nytt innhold legges til i `data.js`, uten kodeendringer. Hvert «tegn» peker på tiltak-ID-er, og rekkefølgen styrer rangeringen.

## Forslag til veien videre

- **Innhold:** Kvalitetssikre tekstene med fagperson (psykolog/helsesykepleier). Flere kurs, for eksempel stressmestring, selvmedfølelse og bedre søvn.
- **Ukentlig innsjekk:** Kort puls med 3 spørsmål i stedet for full kartlegging, med påminnelse.
- **Mer innsikt:** Vis sammenheng mellom gjennomførte tiltak og endring i skår.
- **Brukerkonto og synk:** Når dere vil ha data på tvers av enheter. Merk at helseopplysninger er særlige kategorier under GDPR, så lokal lagring er et bevisst førstevalg.
- **AI-samtale (valgfritt):** «Fortell med egne ord hva som er off», som kobles til områder og tiltak. Det krever gode sikkerhetsrammer.
- **PWA:** Installerbar på mobil, med varsler for morgenritual og leggealarm.
- **Teknisk:** Flytt til et rammeverk (for eksempel Vite + React/Svelte) når appen vokser. Datamodellen i `data.js` kan flyttes til et CMS.

## Publisering

Hver push til `main` publiserer `public/` til GitHub Pages via `.github/workflows/deploy.yml`.
