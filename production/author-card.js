(function () {
  var GITHUB_USER = 'echobash';
  var DISPLAY_NAME = 'Ali Anwar';
  var TAGLINE = 'Solo dev building tools devs actually need — 100+ free, no login, no BS.';
  var SITE_URL = 'https://echobash.com';
  var LINKEDIN_URL = 'https://linkedin.com/in/echobash';
  var TOOLS_COUNT = '100+';

  var CSS = `
.acard {
  background: rgba(0,0,0,.28);
  background-image: none;
  border-left: 4px solid rgba(26,20,16,.5);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}
.acard-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: .58rem;
  font-weight: 700;
  color: rgba(255,255,255,.55);
  letter-spacing: 3px;
  text-transform: uppercase;
}
.acard-profile {
  display: flex;
  align-items: center;
  gap: 14px;
}
.acard-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid #1a1410;
  box-shadow: 3px 3px 0 #1a1410;
  object-fit: cover;
  flex-shrink: 0;
  background: #fff;
}
.acard-identity {}
.acard-name {
  font-family: 'Bangers', cursive;
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 0 #1a1410;
  line-height: 1;
}
.acard-handle {
  font-family: 'Space Mono', monospace;
  font-size: .68rem;
  color: #ffd23f;
  margin-top: 2px;
  font-weight: 700;
}
.acard-bio {
  font-family: 'Comic Neue', cursive;
  font-size: .88rem;
  color: rgba(255,255,255,.88);
  line-height: 1.55;
}
.acard-stats {
  display: flex;
  gap: 0;
  background: rgba(0,0,0,.25);
  border: 2px solid #1a1410;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 3px 3px 0 #1a1410;
}
.acard-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 6px;
  border-right: 2px solid #1a1410;
}
.acard-stat:last-child { border-right: none; }
.acard-stat-n {
  font-family: 'Bangers', cursive;
  font-size: 1.25rem;
  color: #ffd23f;
  text-shadow: 1px 1px 0 #1a1410;
  line-height: 1;
}
.acard-stat-l {
  font-family: 'Space Mono', monospace;
  font-size: .55rem;
  color: rgba(255,255,255,.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
}
.acard-links {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: auto;
}
.acard-link {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'Bangers', cursive;
  font-size: .9rem;
  letter-spacing: 1px;
  text-decoration: none;
  border: 2px solid #1a1410;
  border-radius: 6px;
  padding: 5px 10px;
  box-shadow: 3px 3px 0 #1a1410;
  transition: transform .1s, box-shadow .1s;
}
.acard-link:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 #1a1410; }
.acard-link:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 #1a1410; }
.acard-link-web { background: #ffd23f; color: #1a1410; }
.acard-link-gh  { background: #1a1410; color: #ffd23f; }
.acard-link-li  { background: #0077b5; color: #fff; }
.acard-link svg { width: 14px; height: 14px; flex-shrink: 0; }
`;

  function injectStyles() {
    if (document.getElementById('devdunia-acard-css')) return;
    var s = document.createElement('style');
    s.id = 'devdunia-acard-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function fmt(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  function render(el, followers, repos) {
    el.innerHTML = `
      <div class="acard">
        <div class="acard-eyebrow">&#x1F4AC; Dev behind the tools</div>
        <div class="acard-profile">
          <img class="acard-avatar"
               src="https://github.com/${GITHUB_USER}.png?size=128"
               alt="${DISPLAY_NAME}">
          <div class="acard-identity">
            <div class="acard-name">${DISPLAY_NAME}</div>
            <div class="acard-handle">@${GITHUB_USER}</div>
          </div>
        </div>
        <p class="acard-bio">${TAGLINE}</p>
        <div class="acard-stats">
          <div class="acard-stat">
            <span class="acard-stat-n">${followers !== null ? fmt(followers) : '—'}</span>
            <span class="acard-stat-l">Followers</span>
          </div>
          <div class="acard-stat">
            <span class="acard-stat-n">${repos !== null ? fmt(repos) : '—'}</span>
            <span class="acard-stat-l">Repos</span>
          </div>
          <div class="acard-stat">
            <span class="acard-stat-n">${TOOLS_COUNT}</span>
            <span class="acard-stat-l">Tools</span>
          </div>
        </div>
        <div class="acard-links">
          <a href="${SITE_URL}" target="_blank" rel="noopener" class="acard-link acard-link-web">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            echobash.com
          </a>
          <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener" class="acard-link acard-link-gh">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            github.com/${GITHUB_USER}
          </a>
          <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" class="acard-link acard-link-li">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            linkedin.com/in/${GITHUB_USER}
          </a>
        </div>
      </div>
    `;
  }

  function init(selector) {
    injectStyles();
    var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;

    // Render immediately with placeholders, then update with live data
    render(el, null, null);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/' + GITHUB_USER);
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          render(el, data.followers || 0, data.public_repos || 0);
        } catch (e) {}
      }
    };
    xhr.send();
  }

  // Auto-init any element with data-author-card attribute
  function autoInit() {
    var targets = document.querySelectorAll('[data-author-card]');
    for (var i = 0; i < targets.length; i++) init(targets[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.DevDuniaAuthorCard = { init: init };
})();
