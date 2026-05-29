var _0xN3={k:function(x){return x;}};
function _0x4a() {
      _0x9d4.clear();
      _0x9c3.forEach((image, idx) => _0x9d4.set(image.name, idx + 1));
      document.querySelectorAll('.image-checkbox').forEach(c => c.checked = true);
      document.querySelectorAll('.image-card').forEach(card => card.classList.add('selected'));
      _0x4e();  _0x4f();
    }
function _0x4b() { _0x4c(); }
function _0x4c(updateUI=true) {
      _0x9d4.clear();
      if (updateUI) {
        document.querySelectorAll('.image-checkbox').forEach(c => c.checked = false);
        document.querySelectorAll('.image-card').forEach(card => card.classList.remove('selected'));
        _0x4e(); _0x4f();
      }
    }
function _0x4d() {
      const ordered = Array.from(_0x9d4.entries()).sort((a,b) => a[1]-b[1]).map(([name]) => name);
      _0x9d4.clear();
      ordered.forEach((name, idx) => _0x9d4.set(name, idx + 1));
    }
function _0x4e() { document.getElementById('selected-count').textContent = `(${_0x9d4.size} selected)`; }
function _0x4f() {
      document.querySelectorAll('.selection-order').forEach(el => {
        const name = el.dataset.name;
        if (_0x9d4.has(name)) { el.style.display = 'flex'; el.textContent = _0x9d4.get(name); }
        else el.style.display = 'none';
      });
    }
function _0x5a() {
      for (const category in _0x9f6) _0x9f6[category] = [];
      document.querySelectorAll('.filter-option.selected').forEach(option => option.classList.remove('selected'));
      document.getElementById('chapter-input').value = '';
      _0x4c(false);
      document.getElementById('result-count').textContent = '0';
      _0x2c();
      _0x6b();
      _0x4e(); 
    }
function _0x5b() {
      return Array.from(_0x9d4.entries())
        .sort((a,b) => a[1]-b[1])
        .map(([name]) => _0x9c3.find(img => img.name === name) || _0x9b2.find(img => img.name === name))
        .filter(Boolean);
    }
function _0x5c() {
      const active = [];
      for (const category in _0x9f6) if (_0x9f6[category].length) active.push(`${category}: ${_0x9f6[category].join(', ')}`);
      const chapter = document.getElementById('chapter-input').value.trim();
      if (chapter) active.push(`chapter: ${chapter}`);
      return active.length ? active.join('; ') : 'No filters';
    }
async function _0x5d(fileId) {
      if (!fileId) return null;
      const urls = [
        `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w2000`,
        `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1000`,
        `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`
      ];
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const blob = await res.blob();
          if (!blob.type.startsWith('image/')) continue;
          return await _0x5e(blob);
        } catch (e) { console.warn('Image fetch failed:', e); }
      }
      return null;
    }
function _0x5e(blob) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    }
function _0x5f(dataUrl) {
      const base64 = dataUrl.split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i=0; i<binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return bytes;
    }
function _0x6a(dataUrl) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
        img.onerror = () => resolve({ width: 600, height: 400 });
        img.src = dataUrl;
      });
    }
function _0x6b() {
      let prompt = document.getElementById('initial-prompt');
      if (!prompt) {
        prompt = document.createElement('div');
        prompt.id = 'initial-prompt';
        prompt.className = 'initial-prompt';
        prompt.innerHTML = `<div class="prompt-content"><div class="prompt-tips"><ul><li>Select the filter on the left to show questions</li><li>Reload the page if not all the questions (1332 Qs) are found</li><li>Click the question to show another language</li></ul></div></div>`;
        document.querySelector('.results').appendChild(prompt);
      }
      prompt.style.display = 'block';
    }
function _0x6c() { const prompt = document.getElementById('initial-prompt'); if (prompt) prompt.style.display = 'none'; }
function _0x6d(message) {
      const errorContainer = document.getElementById('error-container');
      errorContainer.innerHTML = message ? `<div class="error-message"><strong>錯誤:</strong> ${_0x3c(message)}</div>` : '';
    }
