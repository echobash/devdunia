(function () {
  var CSS = `
.dd-masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a1410;
  border-bottom: 4px solid #1a1410;
  box-shadow: 0 6px 0 rgba(0,0,0,.3);
  padding: 0 28px;
  height: 54px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}
.dd-mast-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dd-mast-left img {
  width: 30px;
  height: 30px;
  border: 3px solid #ffd23f;
  border-radius: 5px;
  background: #fff;
  object-fit: contain;
  box-shadow: 2px 2px 0 rgba(255,210,63,.4);
}
.dd-brand {
  font-family: 'Bangers', cursive;
  font-size: 1.7rem;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 0 rgba(0,0,0,.5);
  line-height: 1;
  text-decoration: none;
}
.dd-brand span { color: #ffd23f; }
.dd-issue-pill {
  font-family: 'Bangers', cursive;
  font-size: .9rem;
  letter-spacing: 2px;
  background: #ffd23f;
  color: #1a1410;
  padding: 4px 14px;
  border-radius: 20px;
  white-space: nowrap;
  box-shadow: 2px 2px 0 rgba(0,0,0,.3);
}
.dd-mast-right {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}
.dd-by-label {
  font-family: 'Comic Neue', cursive;
  font-size: .75rem;
  color: rgba(255,255,255,.55);
  font-style: italic;
}
.dd-author-link {
  font-family: 'Bangers', cursive;
  font-size: .95rem;
  letter-spacing: 1px;
  color: #ffd23f;
  text-decoration: none;
  text-shadow: 1px 1px 0 rgba(0,0,0,.5);
}
.dd-author-link:hover { text-decoration: underline; }
.dd-icon-btn {
  width: 28px;
  height: 28px;
  border: 2px solid #ffd23f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 2px 2px 0 rgba(255,210,63,.4);
  text-decoration: none;
  flex-shrink: 0;
  transition: transform .1s;
}
.dd-icon-btn:hover { transform: translate(-1px,-1px); }
.dd-icon-btn svg { width: 15px; height: 15px; }
.dd-back-link {
  font-family: 'Bangers', cursive;
  font-size: .88rem;
  color: #1a1410;
  text-decoration: none;
  background: #ffd23f;
  padding: 3px 10px;
  border-radius: 4px;
  letter-spacing: 1px;
  box-shadow: 2px 2px 0 rgba(0,0,0,.4);
  white-space: nowrap;
  transition: opacity .15s;
}
.dd-back-link:hover { opacity: .85; }
@media (max-width: 860px) {
  .dd-masthead { grid-template-columns: 1fr 1fr; height: auto; padding: 10px 16px; gap: 8px; }
  .dd-issue-pill { display: none; }
  .dd-by-label, .dd-author-link { display: none; }
}
`;

  function injectStyles() {
    if (document.getElementById('dd-masthead-css')) return;
    var s = document.createElement('style');
    s.id = 'dd-masthead-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function render(el) {
    el.className = 'dd-masthead';
    el.innerHTML =
      '<div class="dd-mast-left">' +
        '<a href="../index.html">' +
          '<img src="../images/logo.png" alt="DevDunia">' +
        '</a>' +
        '<a href="../index.html" class="dd-brand">DEV<span>DUNIA</span></a>' +
      '</div>' +
      '<div style="text-align:center">' +
        '<span class="dd-issue-pill">DEVDUNIA &middot; JUNE 2026</span>' +
      '</div>' +
      '<div class="dd-mast-right">' +
        '<span class="dd-by-label">by</span>' +
        '<a href="https://echobash.com" target="_blank" rel="noopener" class="dd-author-link">ECHOBASH.COM</a>' +
        '<a href="https://linkedin.com/in/echobash" target="_blank" rel="noopener" class="dd-icon-btn" title="LinkedIn">' +
          '<svg viewBox="0 0 24 24" fill="#0077b5"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>' +
        '</a>' +
        '<a href="https://github.com/echobash" target="_blank" rel="noopener" class="dd-icon-btn" title="GitHub">' +
          '<svg viewBox="0 0 24 24" fill="#1a1410"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>' +
        '</a>' +
        '<a href="../index.html" class="dd-back-link">&#9664; ALL TOOLS</a>' +
      '</div>';
  }

  function autoInit() {
    injectStyles();
    var targets = document.querySelectorAll('[data-masthead]');
    for (var i = 0; i < targets.length; i++) render(targets[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.DevDuniaMasthead = { init: autoInit };
})();
