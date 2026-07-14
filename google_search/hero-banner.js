(function () {

  var COLOR_HEX = {
    green:  '#3fa34d', blue:   '#1d6fb8', red:    '#e63946',
    purple: '#8a4fff', orange: '#ff8c42', pink:   '#ff6b9d',
    yellow: '#ffd23f', ink:    '#1a1410', teal:   '#0d9488'
  };

  var BADGE_STYLES = {
    white:  'background:#fff;color:#1a1410',
    yellow: 'background:#ffd23f;color:#1a1410',
    ink:    'background:#1a1410;color:#ffd23f',
    red:    'background:#e63946;color:#fff',
    green:  'background:#3fa34d;color:#fff',
    blue:   'background:#1d6fb8;color:#fff',
    purple: 'background:#8a4fff;color:#fff',
    orange: 'background:#ff8c42;color:#fff',
    pink:   'background:#ff6b9d;color:#fff'
  };

  var CSS = `
.hb-hero {
  border: 4px solid #1a1410;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #1a1410;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 360px;
  margin-bottom: 20px;
}
.hb-left {
  padding: 22px 28px;
  display: flex;
  align-items: center;
  gap: 18px;
  background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px);
  background-size: 12px 12px;
}
.hb-icon {
  font-size: 3rem;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(3px 3px 0 #1a1410);
}
.hb-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hb-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: .6rem;
  font-weight: 700;
  color: rgba(255,255,255,.65);
  letter-spacing: 3px;
  text-transform: uppercase;
}
.hb-title {
  font-family: 'Bangers', cursive;
  font-size: 3.4rem;
  letter-spacing: 2px;
  color: #fff;
  -webkit-text-stroke: 1.5px #1a1410;
  text-shadow: 5px 5px 0 #1a1410;
  line-height: 1;
  text-transform: uppercase;
}
.hb-desc {
  font-family: 'Comic Neue', cursive;
  font-size: 1.05rem;
  color: rgba(255,255,255,.92);
  line-height: 1.55;
  max-width: 500px;
}
.hb-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.hb-badge {
  font-family: 'Space Mono', monospace;
  font-size: .62rem;
  font-weight: 700;
  padding: 3px 8px;
  border: 2px solid #1a1410;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #1a1410;
}
@media (max-width: 860px) {
  .hb-hero { grid-template-columns: 1fr; }
  .hb-left { padding: 22px 20px; gap: 14px; }
  .hb-icon { font-size: 2.8rem; }
  .hb-title { font-size: 2.2rem; }
}
`;

  function injectStyles() {
    if (document.getElementById('hb-css')) return;
    var s = document.createElement('style');
    s.id = 'hb-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function render(el) {
    var title    = el.getAttribute('data-title')    || 'Tool';
    var chapter  = el.getAttribute('data-chapter')  || '01';
    var category = el.getAttribute('data-category') || 'DevDunia Tools';
    var icon     = el.getAttribute('data-icon')     || '🛠';
    var desc     = el.getAttribute('data-desc')     || '';
    var color    = el.getAttribute('data-color')    || 'green';
    var badgesRaw  = el.getAttribute('data-badges')       || '';
    var bColorsRaw = el.getAttribute('data-badge-colors') || '';

    var accentHex = COLOR_HEX[color] || color;
    var badges  = badgesRaw  ? badgesRaw.split(',')  : [];
    var bColors = bColorsRaw ? bColorsRaw.split(',') : [];

    var badgeHtml = badges.map(function (b, i) {
      var style = BADGE_STYLES[bColors[i] ? bColors[i].trim() : 'white'] || BADGE_STYLES.white;
      return '<span class="hb-badge" style="' + style + '">' + b.trim() + '</span>';
    }).join('');

    el.className = 'hb-hero';
    el.style.background = accentHex;
    el.innerHTML =
      '<div class="hb-left">' +
        '<div class="hb-icon">' + icon + '</div>' +
        '<div class="hb-body">' +
          '<div class="hb-eyebrow">&#x1F4DA; ' + category + ' &middot; Chapter ' + chapter + '</div>' +
          '<div class="hb-title">' + title + '</div>' +
          '<p class="hb-desc">' + desc + '</p>' +
          '<div class="hb-badges">' + badgeHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div data-author-card></div>';

    // Trigger author card if already loaded
    if (window.DevDuniaAuthorCard) {
      window.DevDuniaAuthorCard.init(el.querySelector('[data-author-card]'));
    }
  }

  function autoInit() {
    injectStyles();
    var targets = document.querySelectorAll('[data-tool-hero]');
    for (var i = 0; i < targets.length; i++) render(targets[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  window.DevDuniaHeroBanner = { init: autoInit };
})();
