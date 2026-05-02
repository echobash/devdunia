// Common JavaScript utilities for DevDunia tools

// ─── DevDunia Theme Injection ───
// Runs synchronously in <head> so styles apply before first paint
(function() {
    if (document.getElementById('dd-theme')) return;

    // Google Fonts (Ubuntu Mono)
    if (!document.getElementById('dd-fonts')) {
        var pc1 = document.createElement('link'); pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com';
        var pc2 = document.createElement('link'); pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com'; pc2.crossOrigin = '';
        var fl  = document.createElement('link');
        fl.id = 'dd-fonts'; fl.rel = 'stylesheet';
        fl.href = 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap';
        document.head.appendChild(pc1); document.head.appendChild(pc2); document.head.appendChild(fl);
    }

    // Resolve path to css/tool-theme.css (handles root and sub-directory pages)
    var scriptSrc = (document.currentScript && document.currentScript.src) || '';
    var base = scriptSrc ? scriptSrc.replace(/js\/common\.js.*$/, '') : '/';
    var link = document.createElement('link');
    link.id = 'dd-theme'; link.rel = 'stylesheet';
    link.href = base + 'css/tool-theme.css';
    document.head.appendChild(link);
})();

// Inject animated background elements (blobs, grid, matrix, cursor glow)
// Called from DOMContentLoaded so document.body is available
function _ddInjectBg() {
    // Skip pages that already have their own background elements (index.html, home.html)
    if (document.getElementById('dd-bg-injected') || document.getElementById('matrix-canvas')) return;

    var marker = document.createElement('span');
    marker.id = 'dd-bg-injected'; marker.style.display = 'none';
    document.body.insertBefore(marker, document.body.firstChild);

    // Blobs — Ubuntu aubergine + lime green glow
    [
        { id: 'dd-b1', cls: 'dd-blob', css: 'top:-250px;left:-150px;width:700px;height:700px;background:rgba(138,226,52,0.045);animation-duration:24s' },
        { id: 'dd-b2', cls: 'dd-blob', css: 'top:35%;right:-180px;width:400px;height:400px;background:rgba(90,30,80,0.12);animation-duration:19s;animation-delay:-7s' },
        { id: 'dd-b3', cls: 'dd-blob', css: 'bottom:5%;left:25%;width:300px;height:300px;background:rgba(138,226,52,0.03);animation-duration:16s;animation-delay:-4s' }
    ].forEach(function(b) {
        var el = document.createElement('div'); el.id = b.id; el.className = b.cls; el.style.cssText = b.css;
        document.body.appendChild(el);
    });

    // Grid
    var grid = document.createElement('div'); grid.id = 'dd-grid-bg';
    document.body.appendChild(grid);

    // Matrix canvas — Ubuntu lime green
    var canvas = document.createElement('canvas'); canvas.id = 'dd-matrix-canvas';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d'), cols, drops, bright;
    var chars = '01アイウエオカキクケコサシスセソ{}[]<>/\\|!@#$%^&*abcdefABCDEF0123456789ｦｧｨｩｪｫｬｭｮｯ';
    function _resize() {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / 16);
        drops = new Array(cols).fill(1);
        bright = new Array(cols).fill(false);
    }
    _resize(); window.addEventListener('resize', _resize);
    setInterval(function() {
        ctx.fillStyle = 'rgba(26,10,24,0.08)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drops.length; i++) {
            bright[i] = (Math.random() > 0.98);
            ctx.font = (bright[i] ? 'bold ' : '') + '14px Ubuntu Mono,monospace';
            if (bright[i]) {
                ctx.fillStyle = '#d4f89a'; ctx.globalAlpha = 0.9;
            } else {
                ctx.fillStyle = '#8AE234'; ctx.globalAlpha = Math.random() * 0.45 + 0.12;
            }
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, drops[i] * 16);
            if (drops[i] * 16 > canvas.height && Math.random() > 0.97) drops[i] = 0;
            drops[i]++;
        }
        ctx.globalAlpha = 1;
    }, 60);

    // CRT vignette
    var vig = document.createElement('div'); vig.id = 'dd-vignette';
    document.body.appendChild(vig);

    // Cursor glow
    var glow = document.createElement('div'); glow.id = 'dd-cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', function(e) {
        glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    });
}

// Utility functions
const DevDuniaUtils = {
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (fallbackErr) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    // Show visual feedback for copy operations
    showCopyFeedback(button, success = true) {
        const originalText = button.innerHTML;
        const originalClasses = button.className;
        
        if (success) {
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>[COPIED]</span>';
            button.style.cssText = 'background:rgba(0,255,65,0.15)!important;border-color:#00ff41!important;color:#00ff41!important;box-shadow:0 0 15px rgba(0,255,65,0.3)!important';
        } else {
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg><span>[FAILED]</span>';
            button.style.cssText = 'background:rgba(255,0,64,0.15)!important;border-color:#ff0040!important;color:#ff0040!important';
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.className = originalClasses;
            button.style.cssText = '';
        }, 2000);
    },

    // Format bytes to human readable format
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Show status message
    showStatus(message, type = 'info', container) {
        if (!container) return;
        
        const statusDiv = document.createElement('div');
        statusDiv.className = `p-3 rounded-lg mb-4 ${
            type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
            type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
            type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            'bg-blue-100 text-blue-800 border border-blue-200'
        }`;
        statusDiv.textContent = message;
        
        container.innerHTML = '';
        container.appendChild(statusDiv);
        container.classList.remove('hidden');
        
        // Auto-hide after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                container.classList.add('hidden');
            }, 5000);
        }
    },

    // Hide status message
    hideStatus(container) {
        if (container) {
            container.classList.add('hidden');
        }
    },

    // Auto-resize textarea
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    },

    // Validate JSON
    isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Validate Base64
    isValidBase64(str) {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    },

    // Validate URL
    isValidURL(str) {
        try {
            new URL(str);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Validate IP address
    isValidIP(ip) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    },

    // Generate random string
    generateRandomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format number with commas
    formatNumber(num) {
        return num.toLocaleString();
    },

    // Calculate text statistics
    getTextStats(text) {
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split('\n').length;
        const bytes = new Blob([text]).size;
        
        return {
            characters: chars,
            words: words,
            lines: lines,
            bytes: bytes,
            size: this.formatBytes(bytes)
        };
    },

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Unescape HTML
    unescapeHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },

    // Generate UUID/GUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // Hash functions (using Web Crypto API)
    async hashText(text, algorithm = 'SHA-256') {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // Color utilities
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    // Date utilities
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },

    // String transformation utilities
    transformString(text, transform) {
        switch (transform) {
            case 'uppercase':
                return text.toUpperCase();
            case 'lowercase':
                return text.toLowerCase();
            case 'capitalize':
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            case 'title-case':
                return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            case 'camel-case':
                return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                    return index === 0 ? word.toLowerCase() : word.toUpperCase();
                }).replace(/\s+/g, '');
            case 'pascal-case':
                return text.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '');
            case 'kebab-case':
                return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
            case 'snake-case':
                return text.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase();
            case 'constant-case':
                return text.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toUpperCase();
            case 'reverse':
                return text.split('').reverse().join('');
            case 'slug':
                return text.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            case 'remove-spaces':
                return text.replace(/\s+/g, '');
            default:
                return text;
        }
    }
};

// Theme management
const ThemeManager = {
    init() {
        this.injectLightStyles();
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }

        this.updateThemeToggle();
        
        // Use event delegation to handle both existing and dynamically loaded buttons
        // This ensures the toggle works even if navbar is loaded asynchronously
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-float')) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            }
        });
        
        // Also attach direct listeners if buttons exist (for immediate feedback)
        this.attachThemeToggleListeners();
        
        // Watch for dynamically loaded navbar/theme toggle buttons
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the added node or its children contain theme toggle buttons
                        if (node.id === 'theme-toggle' || node.id === 'theme-toggle-float' || 
                            node.querySelector && (node.querySelector('#theme-toggle') || node.querySelector('#theme-toggle-float'))) {
                            this.updateThemeToggle();
                            this.attachThemeToggleListeners();
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    attachThemeToggleListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle && !themeToggle.dataset.listenerAttached) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            themeToggle.dataset.listenerAttached = 'true';
        }
        const floatToggle = document.getElementById('theme-toggle-float');
        if (floatToggle && !floatToggle.dataset.listenerAttached) {
            floatToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            floatToggle.dataset.listenerAttached = 'true';
        }
    },

    
    injectLightStyles() {
        if (document.getElementById('light-theme-overrides')) return;
        const css = `
html.light body { background: #ffffff !important; color: #0f172a !important; }
html.light nav, html.light [class*="bg-slate-900"], html.light [class*="bg-slate-800"], html.light .hero-bg { background: #ffffff !important; color: #0f172a !important; }
html.light [class*="text-white"] { color: #0f172a !important; }
html.light [class*="text-gray-300"], html.light [class*="text-gray-400"], html.light [class*="text-gray-500"] { color: #475569 !important; }
html.light [class*="bg-slate-800"] { background-color: #f8fafc !important; }
html.light [class*="border-slate-700"], html.light [class*="border-slate-600"], html.light [class*="border-slate-700\\/50"] { border-color: rgba(15,23,42,0.08) !important; }
html.light .bg-slate-900\\/95 { background-color: #ffffff !important; }
        `;
        const style = document.createElement('style');
        style.id = 'light-theme-overrides';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    },

    updateThemeToggle() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.theme-toggle-dark').forEach(el => el.classList.toggle('hidden', !isDark));
        document.querySelectorAll('.theme-toggle-light').forEach(el => el.classList.toggle('hidden', isDark));
    },

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateThemeToggle();
    },

    // Call this after navbar is loaded to ensure icons are updated
    refresh() {
        this.updateThemeToggle();
        this.attachThemeToggleListeners();
    }
};

// Common event listeners setup
document.addEventListener('DOMContentLoaded', function() {
    _ddInjectBg();
    ThemeManager.init();
    
    // Auto-resize all textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            DevDuniaUtils.autoResizeTextarea(this);
        });
    });

    // Common copy button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
            const button = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const text = targetElement.value || targetElement.textContent;
                DevDuniaUtils.copyToClipboard(text).then(success => {
                    DevDuniaUtils.showCopyFeedback(button, success);
                });
            }
        }
    });

    // Common clear button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('clear-btn') || e.target.closest('.clear-btn')) {
            const button = e.target.classList.contains('clear-btn') ? e.target : e.target.closest('.clear-btn');
            const container = button.closest('.tool-container') || document;
            
            // Clear all inputs
            container.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
                input.value = '';
            });
            
            // Clear all outputs
            container.querySelectorAll('.output-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Hide status messages
            container.querySelectorAll('.status-display').forEach(status => {
                status.classList.add('hidden');
            });
        }
    });
});

// --- Back to Top Button ---
(function() {
  function createBackToTopBtn() {
    if (document.getElementById('back-to-top-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.className = 'fixed bottom-6 right-6 z-50 hidden p-3 rounded-full transition-all duration-300';
    btn.style.cssText = 'background:rgba(0,229,199,0.1);border:1px solid rgba(0,229,199,0.25);color:#00e5c7;box-shadow:0 0 18px rgba(0,229,199,0.15)';
    btn.innerHTML = `<svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>`;
    document.body.appendChild(btn);

    // Scroll to top
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function toggleBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;
    if (window.scrollY > 200) {
      btn.classList.remove('hidden');
      btn.classList.add('animate-fade-in');
    } else {
      btn.classList.add('hidden');
      btn.classList.remove('animate-fade-in');
    }
  }

  document.addEventListener('DOMContentLoaded', createBackToTopBtn);
  window.addEventListener('scroll', DevDuniaUtils.throttle(toggleBackToTop, 100));
})();

// Export for use in other scripts
window.DevDuniaUtils = DevDuniaUtils;
// Expose ThemeManager so other scripts (floating toggle) can call it
window.ThemeManager = ThemeManager;
