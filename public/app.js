import { AREAS, TILTAK, KURS, MORGEN, MORGEN_FORSLAG, HELP_LINES, WHEEL } from './data.js';

// ---------- Lagring (localStorage, alt blir på brukerens maskin) ----------

const STORE_KEY = 'skoen-trykker-v1';
const emptyState = () => ({ assessments: [], plan: [], log: {}, kurs: {}, morgen: [], wheel: [] });

function load() {
  try {
    return { ...emptyState(), ...JSON.parse(localStorage.getItem(STORE_KEY)) };
  } catch {
    return emptyState();
  }
}
let state = load();
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* privat modus o.l. */ }
}

// ---------- Hjelpere ----------

const $ = (sel) => document.querySelector(sel);
// Tiltak kan høre til et livsområde eller et område i livsstilshjulet
const areaById = (id) => AREAS.find((a) => a.id === id) || WHEEL.find((w) => w.id === id);
const today = () => dateKey(new Date());
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function lastDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(dateKey(d));
  }
  return days;
}
const latest = () => state.assessments[state.assessments.length - 1];
const formatDate = (iso) => new Date(iso).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long' });
const minutesLabel = (m) => (m === 0 ? 'ingen ekstra tid' : `${m} min`);

function isDone(itemId, day = today()) {
  return Boolean(state.log[day]?.[itemId]);
}
function toggleDone(itemId) {
  const day = today();
  state.log[day] = state.log[day] || {};
  if (state.log[day][itemId]) delete state.log[day][itemId];
  else state.log[day][itemId] = true;
  save();
}
function streak(itemId) {
  let count = 0;
  const d = new Date();
  if (!isDone(itemId, dateKey(d))) d.setDate(d.getDate() - 1); // dagens er ikke gjort ennå, tell fra i går
  while (isDone(itemId, dateKey(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

// Fokusområdene: de tre laveste skårene (bare de under 8).
function focusAreas(assessment) {
  return Object.entries(assessment.scores)
    .sort((a, b) => a[1] - b[1])
    .filter(([, score]) => score < 8)
    .slice(0, 3)
    .map(([id]) => id);
}

// Anbefalte tiltak for et område, rangert etter hvor mange av de valgte tegnene som peker på dem.
function recommendFor(areaId, signs) {
  const area = areaById(areaId);
  const counts = new Map();
  const chosen = area.signs.filter((s) => signs.includes(s.id));
  for (const sign of chosen.length ? chosen : area.signs) {
    sign.tiltak.forEach((t, i) => counts.set(t, (counts.get(t) || 0) + 10 - i));
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 3);
}

function hasCrisisFlag(assessment) {
  if (!assessment) return false;
  const crisisSigns = AREAS.flatMap((a) => a.signs).filter((s) => s.crisis).map((s) => s.id);
  return assessment.signs.some((s) => crisisSigns.includes(s)) || assessment.scores.mental <= 2;
}

// ---------- Komponenter ----------

function radar(scores, size = 300) {
  const c = size / 2;
  const r = c - 46;
  const n = AREAS.length;
  const point = (i, value) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(angle) * r * (value / 10), c + Math.sin(angle) * r * (value / 10)];
  };
  const rings = [2, 4, 6, 8, 10]
    .map((v) => `<polygon class="radar-ring" points="${AREAS.map((_, i) => point(i, v).join(',')).join(' ')}"/>`)
    .join('');
  const axes = AREAS.map((_, i) => {
    const [x, y] = point(i, 10);
    return `<line class="radar-axis" x1="${c}" y1="${c}" x2="${x}" y2="${y}"/>`;
  }).join('');
  const shape = AREAS.map((a, i) => point(i, scores[a.id] ?? 0).join(',')).join(' ');
  const labels = AREAS.map((a, i) => {
    const [x, y] = point(i, 12.4);
    return `<text class="radar-label" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${a.emoji}<tspan class="radar-score" x="${x}" dy="1.2em">${scores[a.id] ?? '–'}</tspan></text>`;
  }).join('');
  return `<svg class="radar" viewBox="0 0 ${size} ${size}" role="img" aria-label="Livshjulet ditt">${rings}${axes}<polygon class="radar-shape" points="${shape}"/>${labels}</svg>`;
}

function helpBox(strong = false) {
  return `
    <aside class="help ${strong ? 'help-strong' : ''}">
      <h3>${strong ? 'Du fortjener støtte, og du trenger ikke stå i dette alene' : 'Trenger du noen å snakke med?'}</h3>
      ${strong ? '<p>Det du kjenner på er viktig. Små grep i hverdagen kan hjelpe, men det beste første steget nå er å snakke med noen. Ta kontakt med fastlegen, eller ring en av disse:</p>' : ''}
      <ul>${HELP_LINES.map((h) => `<li><a href="tel:${h.number.replace(/\s/g, '')}"><strong>${h.number}</strong></a> ${h.name}</li>`).join('')}</ul>
    </aside>`;
}

function tiltakCard(id, { showAdd = true } = {}) {
  const t = TILTAK[id];
  const inPlan = state.plan.includes(id);
  return `
    <article class="card tiltak">
      <div class="card-head">
        <span class="chip">${areaById(t.area).emoji} ${minutesLabel(t.minutes)}</span>
        <h3>${t.title}</h3>
      </div>
      <p>${t.why}</p>
      <details>
        <summary>Slik gjør du det</summary>
        <ol>${t.how.map((s) => `<li>${s}</li>`).join('')}</ol>
      </details>
      ${showAdd ? `<button class="btn ${inPlan ? 'btn-ghost' : ''}" data-action="toggle-plan" data-id="${id}">${inPlan ? '✓ I planen din' : '+ Legg til i planen'}</button>` : ''}
    </article>`;
}

function kursCard(id) {
  const k = KURS[id];
  const done = (state.kurs[id] || []).length;
  return `
    <a class="card kurs-card" href="#/kurs/${id}">
      <span class="kurs-emoji">${k.emoji}</span>
      <div>
        <span class="chip">Minikurs · ${k.lessons.length} dager</span>
        <h3>${k.title}</h3>
        <p>${done ? `${done} av ${k.lessons.length} leksjoner fullført` : k.intro}</p>
      </div>
    </a>`;
}

// ---------- Visninger ----------

function viewHome() {
  const a = latest();
  if (!a) {
    return `
      <section class="hero">
        <p class="eyebrow">Hvor trykker skoen?</p>
        <h1>Små grep for å få det litt bedre</h1>
        <p class="lead">Kjenner du at noe er litt «off»? Ta en kort kartlegging av åtte områder i livet ditt. Du får vite hvor skoen trykker akkurat nå, og konkrete, små ting du kan prøve.</p>
        <a class="btn btn-big" href="#/kartlegging">Start kartleggingen · 3 min</a>
        <p class="muted small">Alt du svarer lagres bare i nettleseren din.</p>
      </section>
      <section class="grid areas-grid">
        ${AREAS.map((ar) => `<a class="area-pill" href="#/utforsk/${ar.id}"><span>${ar.emoji}</span>${ar.name}</a>`).join('')}
      </section>
      <section>
        <h2>Eller start rett med noe av dette</h2>
        <div class="grid">
          <a class="card kurs-card" href="#/livsstilshjulet"><span class="kurs-emoji">🎡</span><div><span class="chip">${WHEEL.length} områder · 5 min</span><h3>Livsstilshjulet</h3><p>Få oversikt over hele livet: søvn, økonomi, bolig, relasjoner og mer.</p></div></a>
          <a class="card kurs-card" href="#/morgen"><span class="kurs-emoji">🌄</span><div><span class="chip">10–15 min</span><h3>Bygg ditt morgenritual</h3><p>Sett sammen en rolig start på dagen.</p></div></a>
          ${kursCard('si-nei')}
          ${kursCard('smalltalk')}
        </div>
      </section>`;
  }
  const focus = focusAreas(a);
  return `
    ${hasCrisisFlag(a) ? helpBox(true) : ''}
    <section class="split">
      <div>
        <p class="eyebrow">Kartlagt ${formatDate(a.date)}</p>
        <h1>${focus.length ? 'Her trykker skoen' : 'Det ser ganske bra ut!'}</h1>
        ${focus.length
          ? `<ul class="focus-list">${focus.map((id) => `<li><span>${areaById(id).emoji}</span> ${areaById(id).name} <strong>${a.scores[id]}/10</strong></li>`).join('')}</ul>`
          : '<p class="lead">Ingen områder skiller seg ut som vanskelige. Utforsk gjerne tiltak for å bygge videre.</p>'}
        <div class="row">
          <a class="btn" href="#/resultat">Se forslagene</a>
          <a class="btn btn-ghost" href="#/kartlegging">Ny kartlegging</a>
          <a class="btn btn-ghost" href="#/livsstilshjulet">🎡 Livsstilshjulet</a>
        </div>
      </div>
      ${radar(a.scores)}
    </section>
    ${todaySection()}`;
}

function todaySection({ linkToPlan = true } = {}) {
  const items = [...state.plan];
  const hasMorgen = state.morgen.length > 0;
  if (!items.length && !hasMorgen) {
    return `<section class="card empty"><h2>Planen din er tom</h2><p>Velg et par små tiltak fra <a href="#/resultat">forslagene dine</a>, så kan du huke av dem her hver dag.</p></section>`;
  }
  const doneCount = items.filter((id) => isDone(id)).length + (hasMorgen && isDone('morgen') ? 1 : 0);
  const total = items.length + (hasMorgen ? 1 : 0);
  return `
    <section>
      <div class="section-head"><h2>I dag</h2><span class="muted">${doneCount} av ${total} gjort</span></div>
      <div class="checklist">
        ${hasMorgen ? checkRow('morgen', '🌄 Morgenritualet ditt', `${state.morgen.length} steg · ${MORGEN.filter((m) => state.morgen.includes(m.id)).reduce((s, m) => s + m.minutes, 0)} min`) : ''}
        ${items.map((id) => checkRow(id, `${areaById(TILTAK[id].area).emoji} ${TILTAK[id].title}`, minutesLabel(TILTAK[id].minutes))).join('')}
      </div>
      ${linkToPlan ? '<p><a href="#/plan">Se hele planen og historikken →</a></p>' : ''}
    </section>`;
}

function checkRow(id, label, meta) {
  const done = isDone(id);
  const s = streak(id);
  return `
    <button class="check-row ${done ? 'done' : ''}" data-action="toggle-done" data-id="${id}" aria-pressed="${done}">
      <span class="checkbox">${done ? '✓' : ''}</span>
      <span class="check-label">${label}<small>${meta}${s > 1 ? ` · 🔥 ${s} dager på rad` : ''}</small></span>
    </button>`;
}

// Kartleggingen er en veiviser: ett område per steg, deretter utdypning av de laveste.
let draft = null;
function viewKartlegging() {
  if (!draft) draft = { step: 0, scores: {}, signs: [] };
  const total = AREAS.length + 1;
  const progress = `<div class="progress"><div style="width:${(draft.step / total) * 100}%"></div></div>`;

  if (draft.step < AREAS.length) {
    const area = AREAS[draft.step];
    const value = draft.scores[area.id];
    return `
      ${progress}
      <section class="wizard">
        <p class="eyebrow">${draft.step + 1} av ${AREAS.length} · ${area.emoji} ${area.name}</p>
        <h1>${area.question}</h1>
        <div class="scale" role="radiogroup" aria-label="Skala fra 1 til 10">
          ${Array.from({ length: 10 }, (_, i) => i + 1).map((n) => `<button class="scale-btn ${value === n ? 'selected' : ''}" data-action="score" data-value="${n}" role="radio" aria-checked="${value === n}">${n}</button>`).join('')}
        </div>
        <div class="scale-legend"><span>Svært misfornøyd</span><span>Helt fornøyd</span></div>
        <div class="row">
          ${draft.step > 0 ? '<button class="btn btn-ghost" data-action="back">← Tilbake</button>' : ''}
        </div>
      </section>`;
  }

  const focus = focusAreas({ scores: draft.scores });
  if (!focus.length) {
    return `${progress}
      <section class="wizard">
        <h1>Du skårer høyt på alle områder 🎉</h1>
        <p class="lead">Da hopper vi over utdypingen. Du kan fortsatt utforske tiltak for å bygge gode vaner.</p>
        <div class="row"><button class="btn btn-ghost" data-action="back">← Tilbake</button><button class="btn" data-action="finish">Se resultatet</button></div>
      </section>`;
  }
  return `
    ${progress}
    <section class="wizard">
      <p class="eyebrow">Siste steg</p>
      <h1>Hva kjenner du deg igjen i?</h1>
      <p class="lead">Dette er områdene der du ga lavest skår. Huk av det som passer, så blir forslagene mer treffsikre.</p>
      ${focus.map((id) => {
        const area = areaById(id);
        return `
          <fieldset class="signs">
            <legend>${area.emoji} ${area.name} <span class="muted">(${draft.scores[id]}/10)</span></legend>
            ${area.signs.map((s) => `
              <label class="sign ${draft.signs.includes(s.id) ? 'checked' : ''}">
                <input type="checkbox" data-action="sign" data-id="${s.id}" ${draft.signs.includes(s.id) ? 'checked' : ''}>
                ${s.text}
              </label>`).join('')}
          </fieldset>`;
      }).join('')}
      <div class="row"><button class="btn btn-ghost" data-action="back">← Tilbake</button><button class="btn" data-action="finish">Vis hvor skoen trykker</button></div>
    </section>`;
}

function viewResultat() {
  const a = latest();
  if (!a) return `<section class="card empty"><h2>Ingen kartlegging ennå</h2><a class="btn" href="#/kartlegging">Start kartleggingen</a></section>`;
  const focus = focusAreas(a);
  const prev = state.assessments[state.assessments.length - 2];
  return `
    ${hasCrisisFlag(a) ? helpBox(true) : ''}
    <section class="split">
      <div>
        <p class="eyebrow">Resultat · ${formatDate(a.date)}</p>
        <h1>${focus.length ? 'Her trykker skoen akkurat nå' : 'Du har det ganske bra!'}</h1>
        <p class="lead">${focus.length
          ? 'Du trenger ikke fikse alt på en gang. Velg <strong>ett eller to små tiltak</strong> og prøv dem i en uke. Små endringer som blir vaner gir mest.'
          : 'Ingen områder skiller seg ut. Velg gjerne et tiltak for å styrke det som allerede fungerer.'}</p>
        ${prev ? `<p class="muted">Endring siden ${formatDate(prev.date)}: ${AREAS.map((ar) => {
          const d = a.scores[ar.id] - prev.scores[ar.id];
          return d ? `${ar.emoji} ${d > 0 ? '+' : ''}${d}` : '';
        }).filter(Boolean).join(' · ') || 'ingen'}</p>` : ''}
      </div>
      ${radar(a.scores)}
    </section>
    ${focus.map((id) => {
      const area = areaById(id);
      const chosen = area.signs.filter((s) => a.signs.includes(s.id));
      return `
        <section class="focus-section">
          <div class="section-head">
            <h2>${area.emoji} ${area.name}</h2>
            <span class="score-badge">${a.scores[id]}/10</span>
          </div>
          ${chosen.length ? `<p class="muted">Du kjente deg igjen i: ${chosen.map((s) => `«${s.text.toLowerCase()}»`).join(', ')}</p>` : ''}
          <div class="grid">
            ${recommendFor(id, a.signs).map((t) => tiltakCard(t)).join('')}
            ${area.kurs.map(kursCard).join('')}
          </div>
        </section>`;
    }).join('')}
    <section class="row center">
      <a class="btn" href="#/plan">Gå til planen min</a>
      <a class="btn btn-ghost" href="#/utforsk">Utforsk alle tiltak</a>
    </section>`;
}

function viewPlan() {
  const days = lastDays(7);
  const rows = [...(state.morgen.length ? ['morgen'] : []), ...state.plan];
  const label = (id) => (id === 'morgen' ? '🌄 Morgenritual' : `${areaById(TILTAK[id].area).emoji} ${TILTAK[id].title}`);
  const activeKurs = Object.keys(state.kurs).filter((id) => KURS[id]);
  return `
    <section>
      <p class="eyebrow">Min plan</p>
      <h1>Små steg, hver dag</h1>
      ${rows.length > 4 ? '<p class="note">Tips: Mange tiltak samtidig kan bli mye. Det er bedre å gjøre to ting hver dag enn seks ting av og til.</p>' : ''}
    </section>
    ${todaySection({ linkToPlan: false })}
    ${rows.length ? `
      <section>
        <h2>Siste sju dager</h2>
        <div class="history">
          <div class="history-row history-head"><span></span>${days.map((d) => `<span>${new Date(`${d}T12:00`).toLocaleDateString('nb-NO', { weekday: 'short' }).slice(0, 2)}</span>`).join('')}<span></span></div>
          ${rows.map((id) => `
            <div class="history-row">
              <span class="history-label">${label(id)}</span>
              ${days.map((d) => `<span class="dot ${isDone(id, d) ? 'on' : ''}" title="${d}"></span>`).join('')}
              ${id === 'morgen' ? '<a class="link-btn" href="#/morgen">Endre</a>' : `<button class="link-btn" data-action="toggle-plan" data-id="${id}">Fjern</button>`}
            </div>`).join('')}
        </div>
      </section>` : ''}
    ${activeKurs.length ? `<section><h2>Kursene dine</h2><div class="grid">${activeKurs.map(kursCard).join('')}</div></section>` : ''}
    ${state.assessments.length > 1 ? `
      <section>
        <h2>Utvikling over tid</h2>
        <div class="trend">
          ${AREAS.map((ar) => `
            <div class="trend-row">
              <span>${ar.emoji} ${ar.name}</span>
              <span class="trend-values">${state.assessments.slice(-6).map((x) => `<span class="trend-bar" style="--v:${x.scores[ar.id]}" title="${formatDate(x.date)}: ${x.scores[ar.id]}"></span>`).join('')}</span>
            </div>`).join('')}
        </div>
      </section>` : ''}`;
}

function viewUtforsk(areaId) {
  const areas = areaId ? [areaById(areaId)].filter(Boolean) : AREAS;
  return `
    <section>
      <p class="eyebrow">Utforsk</p>
      <h1>Tiltak og kurs</h1>
      <nav class="filter">
        <a href="#/utforsk" class="${!areaId ? 'active' : ''}">Alle</a>
        ${AREAS.map((a) => `<a href="#/utforsk/${a.id}" class="${a.id === areaId ? 'active' : ''}">${a.emoji} ${a.name}</a>`).join('')}
      </nav>
    </section>
    ${areas.map((area) => {
      const tiltak = Object.keys(TILTAK).filter((id) => TILTAK[id].area === area.id);
      const kurs = Object.keys(KURS).filter((id) => KURS[id].area === area.id);
      return `
        <section>
          <h2>${area.emoji} ${area.name}</h2>
          <div class="grid">${kurs.map(kursCard).join('')}${tiltak.map((t) => tiltakCard(t)).join('')}</div>
        </section>`;
    }).join('')}
    ${!areaId || areaId === 'sovn' ? `<section><div class="grid"><a class="card kurs-card" href="#/morgen"><span class="kurs-emoji">🌄</span><div><span class="chip">10–15 min</span><h3>Bygg ditt morgenritual</h3><p>Velg blant ${MORGEN.length} byggeklosser.</p></div></a></div></section>` : ''}`;
}

function viewKurs(id) {
  const k = KURS[id];
  if (!k) return viewNotFound();
  const done = state.kurs[id] || [];
  const next = k.lessons.findIndex((_, i) => !done.includes(i));
  return `
    <section>
      <a class="muted" href="#/utforsk/${k.area}">← ${areaById(k.area).name}</a>
      <p class="eyebrow">Minikurs · ${k.lessons.length} dager</p>
      <h1>${k.emoji} ${k.title}</h1>
      <p class="lead">${k.intro}</p>
      <div class="progress"><div style="width:${(done.length / k.lessons.length) * 100}%"></div></div>
      <p class="muted">${done.length === k.lessons.length ? 'Kurset er fullført! 🎉' : `${done.length} av ${k.lessons.length} fullført`}</p>
    </section>
    <ol class="lessons">
      ${k.lessons.map((l, i) => `
        <li class="lesson ${done.includes(i) ? 'done' : ''} ${i === next ? 'current' : ''}">
          <details ${i === next ? 'open' : ''}>
            <summary><span class="lesson-num">${done.includes(i) ? '✓' : `Dag ${i + 1}`}</span> ${l.title}</summary>
            <p>${l.text}</p>
            <div class="task"><strong>Dagens oppgave</strong><p>${l.task}</p></div>
            <button class="btn ${done.includes(i) ? 'btn-ghost' : ''}" data-action="lesson" data-kurs="${id}" data-index="${i}">${done.includes(i) ? 'Marker som ikke gjort' : 'Jeg har gjort oppgaven'}</button>
          </details>
        </li>`).join('')}
    </ol>`;
}

let morgenDraft = null;
function viewMorgen() {
  if (!morgenDraft) morgenDraft = [...state.morgen];
  const total = MORGEN.filter((m) => morgenDraft.includes(m.id)).reduce((s, m) => s + m.minutes, 0);
  const hint = total < 10 ? 'Legg gjerne til litt mer' : total > 15 ? 'Litt mye? Et kort ritual er lettere å holde.' : 'Perfekt lengde 👌';
  return `
    <section>
      <p class="eyebrow">Morgenritual</p>
      <h1>🌄 Bygg din morgen</h1>
      <p class="lead">Velg noen byggeklosser som til sammen blir 10–15 minutter. Gjør dem i samme rekkefølge hver morgen, så blir det fort en vane.</p>
      <div class="row">${MORGEN_FORSLAG.map((f, i) => `<button class="btn btn-ghost" data-action="morgen-preset" data-index="${i}">${f.title}</button>`).join('')}</div>
    </section>
    <section class="morgen-grid">
      ${MORGEN.map((m) => `
        <button class="morgen-item ${morgenDraft.includes(m.id) ? 'selected' : ''}" data-action="morgen-toggle" data-id="${m.id}" aria-pressed="${morgenDraft.includes(m.id)}">
          <span class="morgen-emoji">${m.emoji}</span>
          <span>${m.title}</span>
          <small>${minutesLabel(m.minutes)}</small>
        </button>`).join('')}
    </section>
    <section class="sticky-bar">
      <div><strong>${total} minutter</strong> · ${morgenDraft.length} steg <span class="muted">· ${hint}</span></div>
      <button class="btn" data-action="morgen-save" ${morgenDraft.length ? '' : 'disabled'}>${state.morgen.length ? 'Lagre endringer' : 'Legg til i planen'}</button>
    </section>`;
}

// ---------- Livsstilshjulet ----------

let wheelDraft = null;
const latestWheel = () => state.wheel[state.wheel.length - 1];
const scoreClass = (v) => (v == null ? '' : v <= 4 ? 'low' : v <= 7 ? 'mid' : 'high');

// Hjul der hvert område er en sektor som fylles utover etter skår (1–10).
function wheelChart(scores) {
  const size = 560;
  const c = size / 2;
  const r0 = 34;
  const R = 160;
  const n = WHEEL.length;
  const step = (Math.PI * 2) / n;
  const pt = (angle, r) => [c + Math.cos(angle) * r, c + Math.sin(angle) * r].map((v) => v.toFixed(1)).join(',');
  const sector = (a0, a1, r) => `M${pt(a0, r0)} L${pt(a0, r)} A${r},${r} 0 0 1 ${pt(a1, r)} L${pt(a1, r0)} A${r0},${r0} 0 0 0 ${pt(a0, r0)}Z`;
  const parts = WHEEL.map((w, i) => {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step;
    const mid = a0 + step / 2;
    const v = scores[w.id];
    const fill = v ? sector(a0 + 0.012, a1 - 0.012, r0 + ((R - r0) * v) / 10) : '';
    const cos = Math.cos(mid);
    // Ingen sektor ligger midt på topp/bunn, så etiketten kan alltid legges til høyre eller venstre
    const anchor = cos > 0 ? 'start' : 'end';
    const [lx, ly] = pt(mid, R + 14).split(',');
    return `
      <g class="wheel-seg" data-action="wheel-jump" data-id="${w.id}">
        <title>${w.name}: ${v ?? 'ikke vurdert'}</title>
        <path class="wheel-bg" d="${sector(a0, a1, R)}"/>
        ${fill ? `<path class="wheel-fill ${scoreClass(v)}" d="${fill}"/>` : ''}
        <text class="wheel-label" x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle">${w.name}${v ? ` · ${v}` : ''}</text>
      </g>`;
  }).join('');
  const rings = [0.5, 1].map((f) => `<circle class="wheel-ring" cx="${c}" cy="${c}" r="${r0 + (R - r0) * f}"/>`).join('');
  return `<svg class="wheel" viewBox="0 0 ${size} ${size}" role="img" aria-label="Livsstilshjulet">${parts}${rings}<text x="${c}" y="${c}" class="wheel-center" text-anchor="middle" dominant-baseline="central">👟</text></svg>`;
}

function viewLivsstil() {
  const last = latestWheel();
  if (!wheelDraft && !last) wheelDraft = {};
  const intro = `
    <p class="eyebrow">Livsstilshjulet</p>
    <h1>Hele livet, ${WHEEL.length} områder</h1>`;
  const credit = '<p class="muted small">Områdene er hentet fra Livsstilshjulet © InFlow24.</p>';

  if (wheelDraft) {
    const rated = WHEEL.filter((w) => wheelDraft[w.id]).length;
    return `
      <section class="split wheel-split">
        <div>
          ${intro}
          <p class="lead">Mange ting påvirker hvordan vi har det: søvn, økonomi, bolig, relasjoner og mer. Gi hvert område en skår fra 1 (fungerer dårlig) til 10 (fungerer godt). Er et område ikke aktuelt for deg, for eksempel røyking, gir du 10.</p>
          ${credit}
        </div>
        <div>${wheelChart(wheelDraft)}</div>
      </section>
      <section class="wheel-list">
        ${WHEEL.map((w) => `
          <div class="wheel-item ${wheelDraft[w.id] ? 'rated' : ''}" id="hjul-${w.id}">
            <div class="wheel-item-text">
              <h3>${w.emoji} ${w.name}</h3>
              <p class="muted">${w.description}</p>
            </div>
            <div class="mini-scale" role="radiogroup" aria-label="${w.name}">
              ${Array.from({ length: 10 }, (_, i) => i + 1).map((v) => `<button class="mini-btn ${wheelDraft[w.id] === v ? `selected ${scoreClass(v)}` : ''}" data-action="wheel-score" data-id="${w.id}" data-value="${v}" role="radio" aria-checked="${wheelDraft[w.id] === v}">${v}</button>`).join('')}
            </div>
          </div>`).join('')}
      </section>
      <section class="sticky-bar">
        <div><strong>${rated} av ${WHEEL.length}</strong> vurdert</div>
        <button class="btn" data-action="wheel-save" ${rated === WHEEL.length ? '' : 'disabled'}>Se hvor skoen trykker</button>
      </section>`;
  }

  const lowest = WHEEL.filter((w) => last.scores[w.id] < 8).sort((a, b) => last.scores[a.id] - last.scores[b.id]).slice(0, 3);
  const strongest = WHEEL.filter((w) => !w.optional && last.scores[w.id] >= 8).sort((a, b) => last.scores[b.id] - last.scores[a.id]).slice(0, 3);
  const prev = state.wheel[state.wheel.length - 2];
  return `
    <section class="split wheel-split">
      <div>
        ${intro}
        <p class="lead">${lowest.length
          ? `Skoen trykker mest på <strong>${lowest.map((w) => w.name.toLowerCase()).join('</strong>, <strong>')}</strong>. Velg ett område og ett lite tiltak å starte med.`
          : 'Alle områdene fungerer ganske godt for deg nå. Bra!'}</p>
        ${strongest.length ? `<p class="muted">Styrkene dine: ${strongest.map((w) => `${w.emoji} ${w.name}`).join(' · ')}</p>` : ''}
        ${prev ? `<p class="muted">Endring siden ${formatDate(prev.date)}: ${WHEEL.map((w) => {
          const d = last.scores[w.id] - prev.scores[w.id];
          return d ? `${w.emoji} ${d > 0 ? '+' : ''}${d}` : '';
        }).filter(Boolean).join(' · ') || 'ingen'}</p>` : ''}
        <div class="row"><button class="btn btn-ghost" data-action="wheel-edit">Oppdater hjulet</button></div>
        ${credit}
      </div>
      <div>${wheelChart(last.scores)}<p class="muted small center-text">Vurdert ${formatDate(last.date)}</p></div>
    </section>
    ${lowest.map((w) => `
      <section class="focus-section">
        <div class="section-head">
          <h2>${w.emoji} ${w.name}</h2>
          <span class="score-badge">${last.scores[w.id]}/10</span>
        </div>
        <p class="muted">${w.description}</p>
        ${w.help ? `<aside class="help"><h3>Her kan du få hjelp</h3><ul>${w.help.map((h) => `<li>${h.number ? `<a href="tel:${h.number.replace(/\s/g, '')}"><strong>${h.number}</strong></a> ` : '• '}${h.name}</li>`).join('')}</ul></aside>` : ''}
        <div class="grid">
          ${w.tiltak.map((t) => tiltakCard(t)).join('')}
          ${(w.kurs || []).map(kursCard).join('')}
          ${w.morgen ? '<a class="card kurs-card" href="#/morgen"><span class="kurs-emoji">🌄</span><div><span class="chip">10–15 min</span><h3>Bygg ditt morgenritual</h3><p>En fast start på dagen gir rytme.</p></div></a>' : ''}
        </div>
      </section>`).join('')}
    <section class="row center"><a class="btn" href="#/plan">Gå til planen min</a></section>`;
}

function viewNotFound() {
  return `<section class="card empty"><h2>Fant ikke siden</h2><a class="btn" href="#/">Til forsiden</a></section>`;
}

// ---------- Ruting og hendelser ----------

function route() {
  const [, page = '', param] = location.hash.replace(/^#/, '').split('/');
  if (page !== 'kartlegging') draft = null;
  if (page !== 'morgen') morgenDraft = null;
  if (page !== 'livsstilshjulet') wheelDraft = null;
  const views = {
    '': viewHome,
    kartlegging: viewKartlegging,
    resultat: viewResultat,
    plan: viewPlan,
    utforsk: () => viewUtforsk(param),
    kurs: () => viewKurs(param),
    morgen: viewMorgen,
    livsstilshjulet: viewLivsstil,
  };
  $('#app').innerHTML = (views[page] || viewNotFound)();
  document.querySelectorAll('.nav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#/${page}`));
}

function rerender() {
  const y = window.scrollY;
  route();
  window.scrollTo(0, y);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.dataset.action === 'sign') return;
  const { action, id } = el.dataset;

  switch (action) {
    case 'score':
      draft.scores[AREAS[draft.step].id] = Number(el.dataset.value);
      draft.step++;
      route();
      window.scrollTo(0, 0);
      return;
    case 'back':
      draft.step = Math.max(0, draft.step - 1);
      return route();
    case 'finish': {
      const focus = focusAreas({ scores: draft.scores });
      // Behold bare tegn fra fokusområdene (brukeren kan ha gått tilbake og endret skår)
      const focusSigns = focus.flatMap((f) => areaById(f).signs.map((s) => s.id));
      const signs = draft.signs.filter((s) => focusSigns.includes(s));
      state.assessments.push({ date: new Date().toISOString(), scores: draft.scores, signs });
      save();
      draft = null;
      location.hash = '#/resultat';
      window.scrollTo(0, 0);
      return;
    }
    case 'toggle-plan':
      state.plan = state.plan.includes(id) ? state.plan.filter((x) => x !== id) : [...state.plan, id];
      save();
      return rerender();
    case 'toggle-done':
      toggleDone(id);
      return rerender();
    case 'lesson': {
      const k = el.dataset.kurs;
      const i = Number(el.dataset.index);
      const done = state.kurs[k] || [];
      state.kurs[k] = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
      save();
      return rerender();
    }
    case 'morgen-toggle':
      morgenDraft = morgenDraft.includes(id) ? morgenDraft.filter((x) => x !== id) : [...morgenDraft, id];
      return rerender();
    case 'morgen-preset':
      morgenDraft = [...MORGEN_FORSLAG[Number(el.dataset.index)].ids];
      return rerender();
    case 'morgen-save':
      state.morgen = MORGEN.map((m) => m.id).filter((m) => morgenDraft.includes(m));
      save();
      location.hash = '#/plan';
      return;
    case 'wheel-score':
      wheelDraft[id] = Number(el.dataset.value);
      return rerender();
    case 'wheel-jump':
      if (!wheelDraft) return;
      document.getElementById(`hjul-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    case 'wheel-edit':
      wheelDraft = { ...(latestWheel()?.scores || {}) };
      route();
      window.scrollTo(0, 0);
      return;
    case 'wheel-save':
      state.wheel.push({ date: new Date().toISOString(), scores: { ...wheelDraft } });
      save();
      wheelDraft = null;
      route();
      window.scrollTo(0, 0);
      return;
    case 'reset':
      if (confirm('Slette alle svar, planer og historikk fra denne nettleseren?')) {
        state = emptyState();
        save();
        location.hash = '#/';
        route();
      }
      return;
  }
});

document.addEventListener('change', (e) => {
  const el = e.target.closest('[data-action="sign"]');
  if (!el) return;
  const id = el.dataset.id;
  draft.signs = el.checked ? [...draft.signs, id] : draft.signs.filter((s) => s !== id);
  el.closest('.sign').classList.toggle('checked', el.checked);
});

window.addEventListener('hashchange', () => {
  route();
  window.scrollTo(0, 0);
});
$('#help-footer').innerHTML = helpBox();
route();
