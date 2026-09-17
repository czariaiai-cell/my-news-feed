const researchEscape = value => {
  const node = document.createElement('span');
  node.textContent = String(value ?? 'brak danych');
  return node.innerHTML;
};

function screeningScore(row) {
  const area = parseFloat(row.area.replace(',', '.'));
  let score = 50;
  if (row.district.includes('Rokitnica') || row.district.includes('Pogoń')) score += 15;
  else if (row.district.includes('Niwka')) score += 6;
  else if (row.district.includes('Mikulczyce')) score += 5;
  else if (row.district.includes('Zaborze')) score += 4;
  if (area >= 55 && area <= 60) score += 10;
  else if (area > 60) score -= 8;
  if (row.price <= 260000) score += 12;
  else if (row.price <= 300000) score += 6;
  else if (row.price > 350000) score -= 14;
  else if (row.price > 320000) score -= 8;
  const fee = Number(String(row.fee).replace(/[^\d,]/g, '').replace(',', '.'));
  if (!fee) score -= 8;
  else if (fee <= 550) score += 12;
  else if (fee <= 700) score += 4;
  else if (fee >= 900) score -= 14;
  if (row.rooms >= 4) score += 8;
  if (row.condition.includes('do remontu')) score -= 8;
  if (row.visual_review?.includes('WIZUALIZACJA')) score -= 12;
  return score;
}

async function loadResearch() {
  const cards = document.getElementById('research-cards');
  if (!cards) return;
  try {
    const response = await fetch(`data/mieszkania-research-2026-09-17.json?t=${Date.now()}`, {cache: 'no-store'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    document.getElementById('research-profile').textContent = data.profile;
    cards.innerHTML = data.listings.sort((a, b) => screeningScore(b) - screeningScore(a)).map(row => `<article class="card">
      <div class="meta"><span class="pill">Ocena wstępna ${screeningScore(row)}/100</span><span class="pill">${researchEscape(row.fit)}</span><span class="pill">${researchEscape(row.status)}</span></div>
      <h3>${researchEscape(row.city)} · ${researchEscape(row.district)}</h3>
      <div class="price">${new Intl.NumberFormat('pl-PL').format(row.price)} zł</div><div class="address">Po tej cenie zostaje ${new Intl.NumberFormat('pl-PL').format(800000 - row.price)} zł na dwa pozostałe zakupy oraz koszty</div>
      <div class="facts"><div><b>Metraż</b><br>${researchEscape(row.area)}</div><div><b>Pokoje</b><br>${researchEscape(row.rooms)}</div><div><b>Cena/m²</b><br>${Math.round(row.price / parseFloat(row.area.replace(',', '.'))).toLocaleString('pl-PL')} zł</div><div><b>Czynsz</b><br>${researchEscape(row.fee)}</div><div><b>Stan</b><br>${researchEscape(row.condition)}</div><div><b>Układ</b><br>${researchEscape(row.layout)}</div></div>
      <div class="note"><b>Zdjęcia:</b> ${researchEscape(row.visual_review)}<br><b>Najem:</b> ${researchEscape(row.demand)}<br><b>Do sprawdzenia:</b> ${researchEscape(row.risk)}</div>
      <a class="listing" href="${researchEscape(row.url)}" target="_blank" rel="noopener noreferrer">Otwórz bezpośrednie ogłoszenie ↗</a>
    </article>`).join('');
    document.getElementById('research-status').textContent = `Sprawdzono treść stron ${data.checked_at}. Dostępność i cena wymagają potwierdzenia u sprzedawcy przed oględzinami.`;
  } catch (error) {
    document.getElementById('research-status').textContent = `Nie udało się załadować bieżącego researchu: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', loadResearch);
