(function () {
  const form = document.getElementById('contributors-form');
  const ownerInput = document.getElementById('owner');
  const repoInput = document.getElementById('repo');
  const results = document.getElementById('results');
  const status = document.getElementById('status');
  const clearBtn = document.getElementById('clear-btn');

  function parseOwnerRepo() {
    let owner = ownerInput.value.trim();
    let repo = repoInput.value.trim();
    const rx = /^([\w.-]+)\/([\w.-]+)$/i;

    if (!owner && rx.test(repo)) {
      const m = rx.exec(repo); owner = m[1]; repo = m[2];
      ownerInput.value = owner; repoInput.value = repo;
    } else if (!repo && rx.test(owner)) {
      const m = rx.exec(owner); owner = m[1]; repo = m[2];
      ownerInput.value = owner; repoInput.value = repo;
    }
    return { owner, repo };
  }

  async function fetchAllContributors(owner, repo) {
    const perPage = 100;
    let page = 1;
    const acc = [];
    while (true) {
      const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=${perPage}&page=${page}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`GitHub API ${res.status}: ${t || res.statusText}`);
      }
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      acc.push(...data);
      if (data.length < perPage) break;
      page += 1;
      if (page > 10) break; // safety
    }
    const map = new Map(); // dedupe
    for (const c of acc) map.set(c.id, c);
    return [...map.values()];
  }

  function renderContributors(list) {
    results.innerHTML = '';
    if (!list.length) {
      results.innerHTML = `<div class="dd-card">No contributors found.</div>`;
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach((c) => {
      const card = document.createElement('article');
      card.className = 'dd-contrib';
      card.innerHTML = `
        <div class="row">
          <img src="${c.avatar_url}" alt="${c.login} avatar" loading="lazy">
          <div>
            <div><a href="${c.html_url}" target="_blank" rel="noopener noreferrer">${c.login}</a></div>
            <div class="dd-badge">Contributions: ${c.contributions ?? '-'}</div>
          </div>
        </div>
        <div class="row">
          <a href="https://github.com/${c.login}" target="_blank" rel="noopener noreferrer">Profile</a>
          <span style="margin-left:auto" class="dd-badge">ID: ${c.id}</span>
        </div>`;
      frag.appendChild(card);
    });
    results.appendChild(frag);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    results.innerHTML = '';
    status.textContent = 'Fetching contributors...';
    try {
      const { owner, repo } = parseOwnerRepo();
      if (!owner || !repo) { status.textContent = 'Owner y repo son obligatorios.'; return; }
      const data = await fetchAllContributors(owner, repo);
      renderContributors(data);
      status.textContent = `Found ${data.length} contributor(s).`;
    } catch (err) {
      console.error(err);
      status.textContent = `Error: ${err.message}`;
      results.innerHTML = `<div class="dd-card">No se pudo obtener la lista. Verifica el nombre del repo o el límite de rate de GitHub.</div>`;
    }
  });

  clearBtn.addEventListener('click', () => {
    ownerInput.value = ''; repoInput.value = ''; results.innerHTML = ''; status.textContent = ''; ownerInput.focus();
  });
})();
