(() => {
  const storageKey = 'pigulla-access-v1';
  const passwordHash = 'ae8cb968af4e893092548bc29baccd312dbc528af4adaffa94cdff3bc5aa24a9';
  document.documentElement.style.visibility = 'hidden';

  const hash = async value => {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  };
  const reveal = () => { document.documentElement.style.visibility = 'visible'; };
  const granted = () => { try { return localStorage.getItem(storageKey) === passwordHash; } catch { return false; } };

  const mount = () => {
    if (granted()) { reveal(); return; }
    const style = document.createElement('style');
    style.textContent = `#pigulla-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:20px;background:linear-gradient(135deg,#edf4f6,#dce8ed);font-family:Outfit,system-ui,sans-serif;color:#152333}#pigulla-gate .box{width:min(100%,390px);background:#fff;border:1px solid #dbe5ed;border-radius:18px;padding:28px;box-shadow:0 20px 45px rgba(21,35,51,.16)}#pigulla-gate h1{font-size:1.45rem;margin:8px 0}#pigulla-gate p{color:#64748b;line-height:1.45;font-size:.92rem}#pigulla-gate input{width:100%;box-sizing:border-box;margin:14px 0 9px;padding:12px;border:1px solid #cbd5e1;border-radius:9px;font:inherit}#pigulla-gate button{width:100%;padding:12px;border:0;border-radius:9px;background:#126b56;color:#fff;font:700 1rem Outfit,system-ui,sans-serif;cursor:pointer}#pigulla-gate .error{min-height:20px;color:#b42318;font-size:.82rem;margin-top:8px}`;
    document.head.append(style);
    const gate = document.createElement('section'); gate.id = 'pigulla-gate';
    gate.innerHTML = `<div class="box"><div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#126b56;text-transform:uppercase">Piguła prywatna</div><h1>Dostęp chroniony</h1><p>Wpisz hasło, aby otworzyć stronę. To urządzenie zapamięta dostęp.</p><form><input type="password" autocomplete="current-password" placeholder="Hasło" aria-label="Hasło" autofocus><button type="submit">Otwórz stronę</button><div class="error" aria-live="polite"></div></form></div>`;
    document.body.append(gate); reveal();
    gate.querySelector('form').addEventListener('submit', async event => { event.preventDefault(); const input=gate.querySelector('input'), error=gate.querySelector('.error'); if (await hash(input.value) !== passwordHash) { error.textContent='Nieprawidłowe hasło.'; input.select(); return; } try { localStorage.setItem(storageKey,passwordHash); } catch {} gate.remove(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
