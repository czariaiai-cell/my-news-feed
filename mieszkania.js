const fmt = new Intl.NumberFormat('pl-PL');
const mode = document.body.dataset.mode;
const isPurchase = mode === 'purchase';
const dataPath = 'data/mieszkania.json';
const unknown = value => !value || value === 'unknown' ? '—' : value;
const money = value => value && value !== 'unknown' ? `${fmt.format(Number(value))} zł` : '—';

function titleFor(row) { return row.title || 'Oferta bez tytułu'; }
function areaFor(row) { return row.area_m2 ? `${row.area_m2} m²` : '—'; }
function score(row) { const n = Number(row.ranking_score); return Number.isFinite(n) ? n : null; }
function rowPrice(row) { return isPurchase ? Number(row.asking_price_pln) : Number(row.owner_rent_pln); }
function relativeDate(row) { return row.first_seen === data.generated_at ? 'nowe dziś' : `pierwszy zapis: ${unknown(row.first_seen)}`; }
function median(values) { const a=values.filter(Number.isFinite).sort((x,y)=>x-y); if(!a.length)return null; const m=Math.floor(a.length/2); return a.length%2?a[m]:(a[m-1]+a[m])/2; }
function zoneMedians(rows, value, label) { return Object.entries(rows.reduce((groups,row)=>{ const n=Number(row[value]); if(Number.isFinite(n)) (groups[row[label]]??=[]).push(n); return groups; },{})).map(([zone,values])=>({zone,value:median(values),count:values.length})).filter(x=>x.value!==null).sort((a,b)=>a.value-b.value); }
function listingLabel(row) { return `${row.district_area || row.area_focus || 'lokalizacja nieznana'} — ${money(isPurchase ? row.asking_price_pln : row.owner_rent_pln)}, ${areaFor(row)}`; }
let data;

function setSummary(rows, summary) {
  const active = rows.filter(r => r.status === 'active');
  const uncertain = rows.filter(r => r.status === 'uncertain');
  const now = active.filter(r => r.first_seen === data.generated_at);
  const insights = document.getElementById('insights');
  const metricGrid = document.getElementById('metric-grid');
  if (isPurchase) {
    const ranked = active.filter(r => score(r) !== null).sort((a,b) => score(b)-score(a));
    const top = ranked[0], next = ranked[1];
    const newLabels = now.map(listingLabel).join('; ') || 'brak nowych rekordów w dzisiejszym eksporcie';
    const perM2 = active.map(r=>Number(r.price_per_m2_pln));
    const zones = zoneMedians(active,'price_per_m2_pln','district_area');
    const cheapestZone = zones[0], priciestZone = zones[zones.length-1];
    insights.innerHTML = `<div class="insight"><b>1. Priorytet zakupowy na dziś</b><br>${top ? `${escapeHtml(titleFor(top))} (${listingLabel(top)}), wynik <b>${score(top)}/100</b>. ${next ? `Następny liczbowy kandydat: ${escapeHtml(titleFor(next))}, ${score(next)}/100.` : ''} To jest ranking roboczy — nie decyzja zakupowa.` : 'Brak liczbowo sklasyfikowanej oferty.'}</div>
      <div class="insight"><b>2. Co zmieniło się w tym eksporcie</b><br>Do aktywnego widoku weszło <b>${now.length}</b> rekordów zapisanych dziś: ${escapeHtml(newLabels)}. „Nowe” oznacza nowe w bazie, a nie automatycznie świeżo opublikowane przez portal.</div>
      <div class="insight"><b>3. Obraz cen zakupu</b><br>Wśród ${active.length} aktywnych ofert mediana ceny wynosi <b>${money(median(perM2))}/m²</b>. ${cheapestZone ? `Najniższa dostępna mediana strefy: ${escapeHtml(cheapestZone.zone)} — ${money(cheapestZone.value)}/m² (${cheapestZone.count} oferta/y).` : ''} ${priciestZone && priciestZone !== cheapestZone ? `Najwyższa: ${escapeHtml(priciestZone.zone)} — ${money(priciestZone.value)}/m².` : ''}</div>
      <div class="insight"><b>4. Co wymaga ostrożności</b><br>${uncertain.length} rekord(y) mają status niepewny i nie wpływają na rekomendację. Dla nowych ofert trzeba jeszcze potwierdzić aktywność na żywo, rzeczywistą trasę pieszą, pełne opłaty administracyjne oraz CAPEX. Przy obecnej historii obserwacji nie ma jeszcze podstaw, aby twierdzić, że rynek jako całość rośnie lub spada.</div>`;
    metricGrid.innerHTML = metric('Aktywne oferty', summary.active) + metric('Nowe dziś', summary.new_today) + metric('Mediana ceny', money(summary.median_price_pln)) + metric('Do weryfikacji', uncertain.length);
  } else {
    const knownRates = active.filter(r => Number(r.rent_per_m2_pln));
    const zones = zoneMedians(active,'rent_per_m2_pln','area_focus');
    const low = zones[0], high = zones[zones.length-1];
    const lowest = knownRates.slice().sort((a,b)=>Number(a.rent_per_m2_pln)-Number(b.rent_per_m2_pln))[0];
    const highest = knownRates.slice().sort((a,b)=>Number(b.rent_per_m2_pln)-Number(a.rent_per_m2_pln))[0];
    const newLabels = now.map(listingLabel).join('; ') || 'brak nowych rekordów w dzisiejszym eksporcie';
    insights.innerHTML = `<div class="insight"><b>1. Podaż najmu dzisiaj</b><br>Aktywny widok obejmuje <b>${active.length}</b> ofert; <b>${now.length}</b> zapisano dziś w bazie: ${escapeHtml(newLabels)}. To zmiana monitoringu, nie automatyczny dowód, że wszystkie oferty pojawiły się dziś na portalu.</div>
      <div class="insight"><b>2. Stawki właściciela — porównywalna część bazy</b><br>${knownRates.length} ofert ma jednocześnie metraż i oddzielony owner-rent. Mediana wynosi <b>${median(knownRates.map(r=>Number(r.rent_per_m2_pln))).toFixed(2)} zł/m²</b>. ${low ? `Najniższa mediana strefy: ${escapeHtml(low.zone)} — ${low.value.toFixed(2)} zł/m².` : ''} ${high && high!==low ? `Najwyższa: ${escapeHtml(high.zone)} — ${high.value.toFixed(2)} zł/m².` : ''}</div>
      <div class="insight"><b>3. Widełki, które warto widzieć</b><br>${lowest ? `Najniższa znana stawka: ${listingLabel(lowest)} (${Number(lowest.rent_per_m2_pln).toFixed(2)} zł/m²).` : ''} ${highest ? ` Najwyższa: ${listingLabel(highest)} (${Number(highest.rent_per_m2_pln).toFixed(2)} zł/m²).` : ''} Porównuj tylko po owner-rent, nie po kwocie „z czynszem”.</div>
      <div class="insight"><b>4. Granice wnioskowania</b><br>${uncertain.length} rekord(y) ma status niepewny. Oferty z połączoną kwotą najmu i czynszu administracyjnego są pokazane, ale wyłączone ze stawki owner-rent/m². Historia obserwacji jest jeszcze zbyt krótka, by uczciwie ogłosić trwały trend podaży albo cen najmu.</div>`;
    metricGrid.innerHTML = metric('Aktywne oferty', summary.active) + metric('Nowe dziś', summary.new_today) + metric('Mediana owner-rent/m²', summary.median_owner_rent_per_m2_pln ? `${summary.median_owner_rent_per_m2_pln} zł` : '—') + metric('Niepewne', uncertain.length);
  }
}
function metric(label, value) { return `<div class="metric"><span>${label}</span><b>${value}</b></div>`; }
function escapeHtml(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function card(row) {
  const uncertain = row.status !== 'active';
  const rentTotal = row.monthly_total_cost_pln;
  const primary = isPurchase ? money(row.asking_price_pln) : money(row.owner_rent_pln);
  const secondary = isPurchase ? `${unknown(row.price_per_m2_pln)} zł/m²` : (row.rent_per_m2_pln !== 'unknown' ? `${unknown(row.rent_per_m2_pln)} zł/m² owner-rent` : 'owner-rent nieznany');
  const facts = isPurchase
    ? [['Metraż',areaFor(row)],['Pokoje',unknown(row.rooms)],['Opłata adm.',money(row.admin_fee_pln)],['Stan',unknown(row.property_condition)],['Ogrzewanie',unknown(row.heating_type)],['Wynik',score(row) === null ? '—' : `${score(row)}/100`]]
    : [['Metraż',areaFor(row)],['Pokoje',unknown(row.rooms)],['Owner rent',money(row.owner_rent_pln)],['Całość/mies.',unknown(rentTotal)],['Opłata adm.',money(row.admin_fee_pln)],['Stan',unknown(row.property_condition)]];
  return `<article class="card ${uncertain ? 'uncertain' : ''}"><div class="meta"><span class="pill">${uncertain ? 'niepewne' : 'aktywne'}</span><span>${relativeDate(row)}</span></div><div><h3>${escapeHtml(titleFor(row))}</h3><div class="address">${escapeHtml(unknown(row.address || row.address_or_area || row.district_area || row.area_focus))}</div></div><div><div class="price">${primary}</div><div class="address">${secondary}</div></div><div class="facts">${facts.map(([k,v])=>`<div class="fact"><b>${k}</b><br>${escapeHtml(String(v))}</div>`).join('')}</div><div class="note">${escapeHtml((row.investment_fit || row.notes || 'Brak dodatkowej notatki.').slice(0,280))}</div><a class="listing" href="${escapeHtml(row.url)}" target="_blank" rel="noopener">Otwórz ogłoszenie ↗</a></article>`;
}
function render() {
  const query = document.getElementById('search').value.toLowerCase();
  const status = document.getElementById('status').value;
  const sort = document.getElementById('sort').value;
  let rows = (isPurchase ? data.purchase : data.rental).filter(r => status === 'all' || r.status === status).filter(r => Object.values(r).join(' ').toLowerCase().includes(query));
  rows.sort((a,b) => sort === 'new' ? String(b.first_seen).localeCompare(String(a.first_seen)) : sort === 'price' ? (rowPrice(a)||Infinity)-(rowPrice(b)||Infinity) : isPurchase ? (score(b)??-1)-(score(a)??-1) : (Number(a.rent_per_m2_pln)||Infinity)-(Number(b.rent_per_m2_pln)||Infinity));
  document.getElementById('count').textContent = `${rows.length} ofert`;
  document.getElementById('cards').innerHTML = rows.length ? rows.map(card).join('') : '<div class="empty">Brak ofert spełniających filtr.</div>';
}
fetch(dataPath).then(r => { if (!r.ok) throw Error(); return r.json(); }).then(payload => { data=payload; document.getElementById('snapshot-date').textContent=`Snapshot bazy: ${data.generated_at}`; setSummary(isPurchase ? data.purchase : data.rental, data.summary[mode]); render(); ['search','status','sort'].forEach(id=>document.getElementById(id).addEventListener(id==='search'?'input':'change',render)); }).catch(()=>{document.getElementById('status-message').textContent='Brak pliku danych. Uruchom tools/sync_mieszkania_data.py.';});
