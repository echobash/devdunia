// Floating theme toggle helper (creates the button and delegates to common ThemeManager when present)
// Floating theme toggle button (delegates actual state work to common.js ThemeManager)
(function() {
    function createToggleButton() {
        if (document.getElementById('theme-toggle-float')) return;
        // If common ThemeManager isn't available on this page (index.html), inject light-mode overrides
        if (!window.ThemeManager) {
            injectLightStyles();
        }
        const button = document.createElement('button');
        button.id = 'theme-toggle-float';
        button.className = 'fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-lg hover:scale-110 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 z-50';
        button.innerHTML = `
            <svg class="w-6 h-6 theme-toggle-dark hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3c.27 0 .54.01.8.04A7 7 0 0021 12.79z" />
            </svg>
            <svg class="w-6 h-6 theme-toggle-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
        `;
        document.body.appendChild(button);

        // If ThemeManager from common.js is available, it will handle clicks via event delegation
        // Otherwise, add a fallback listener
        if (!window.ThemeManager || typeof window.ThemeManager.toggleTheme !== 'function') {
            button.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                document.documentElement.classList.toggle('light', !isDark);
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                // ensure icons reflect state
                // Update icons if present
                document.querySelectorAll('.theme-toggle-dark').forEach(el => el.classList.toggle('hidden', !isDark));
                document.querySelectorAll('.theme-toggle-light').forEach(el => el.classList.toggle('hidden', isDark));
            });
        }

        // Sync icon initially
        if (window.ThemeManager && typeof window.ThemeManager.updateThemeToggle === 'function') {
            window.ThemeManager.updateThemeToggle();
        } else {
            const isDark = document.documentElement.classList.contains('dark');
            document.querySelectorAll('.theme-toggle-dark').forEach(el => el.classList.toggle('hidden', !isDark));
            document.querySelectorAll('.theme-toggle-light').forEach(el => el.classList.toggle('hidden', isDark));
        }
        
        // If ThemeManager exists, refresh it to attach listeners to the new button
        if (window.ThemeManager && typeof window.ThemeManager.refresh === 'function') {
            window.ThemeManager.refresh();
        }
    }

    document.addEventListener('DOMContentLoaded', createToggleButton);

    // Inject light-mode CSS for pages that don't load common.js
    function injectLightStyles() {
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
    }
})();