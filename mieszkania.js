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
let data;

function setSummary(rows, summary) {
  const active = rows.filter(r => r.status === 'active');
  const uncertain = rows.filter(r => r.status === 'uncertain');
  const now = active.filter(r => r.first_seen === data.generated_at);
  const insights = document.getElementById('insights');
  const metricGrid = document.getElementById('metric-grid');
  if (isPurchase) {
    const top = active.filter(r => score(r) !== null).sort((a,b) => score(b)-score(a))[0];
    insights.innerHTML = `<div class="insight"><b>Priorytet dnia:</b> ${top ? `${escapeHtml(titleFor(top))} — wynik ${score(top)}/100.` : 'Brak liczbowo sklasyfikowanej oferty.'}</div>
      <div class="insight"><b>Zmiana:</b> ${now.length} nowych aktywnych ofert zapisanych w tym snapshocie; oceniaj je po trasie pieszej, CAPEX i opłatach, nie tylko po cenie/m².</div>
      <div class="insight"><b>Kontrola jakości:</b> ${uncertain.length} rekord(y) niepewne nie wchodzą do aktywnego rankingu.</div>`;
    metricGrid.innerHTML = metric('Aktywne oferty', summary.active) + metric('Nowe dziś', summary.new_today) + metric('Mediana ceny', money(summary.median_price_pln)) + metric('Do weryfikacji', uncertain.length);
  } else {
    const knownRates = active.filter(r => Number(r.rent_per_m2_pln));
    insights.innerHTML = `<div class="insight"><b>Obraz najmu:</b> ${active.length} aktywnych ofert, z czego ${now.length} dodano do bazy dziś.</div>
      <div class="insight"><b>Porównywalność:</b> tylko ${knownRates.length} ofert ma rozdzielony czynsz właściciela i metraż; łącznych kwot nie używamy do stawki właściciela/m².</div>
      <div class="insight"><b>Kontrola jakości:</b> ${uncertain.length} rekord(y) ma status niepewny i nie jest dowodem bieżącej dostępności.</div>`;
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
