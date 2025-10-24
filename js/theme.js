// Theme Management for DevDunia
(function() {
    'use strict';

    const ThemeManager = {
        // Theme constants
        THEME_DARK: 'dark',
        THEME_LIGHT: 'light',
        STORAGE_KEY: 'devdunia-theme',
        
        // Initialize theme on page load
        init() {
            this.applyStoredTheme();
            this.setupToggleButton();
            this.setupSystemThemeListener();
        },

        // Get stored theme or detect system preference
        getPreferredTheme() {
            const storedTheme = localStorage.getItem(this.STORAGE_KEY);
            
            if (storedTheme) {
                return storedTheme;
            }
            
            // Detect system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return this.THEME_DARK;
            }
            
            return this.THEME_DARK; // Default to dark theme
        },

        // Apply theme to document
        applyTheme(theme) {
            const html = document.documentElement;
            const body = document.body;
            
            if (theme === this.THEME_LIGHT) {
                html.classList.remove('dark');
                html.classList.add('light');
                body.classList.remove('dark');
                body.classList.add('light');
            } else {
                html.classList.remove('light');
                html.classList.add('dark');
                body.classList.remove('light');
                body.classList.add('dark');
            }
            
            // Store preference
            localStorage.setItem(this.STORAGE_KEY, theme);
            
            // Update toggle button icon
            this.updateToggleIcon(theme);
            
            // Dispatch custom event for other components
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        },

        // Apply stored theme immediately
        applyStoredTheme() {
            const theme = this.getPreferredTheme();
            this.applyTheme(theme);
        },

        // Toggle between themes
        toggleTheme() {
            const currentTheme = document.documentElement.classList.contains('dark') 
                ? this.THEME_DARK 
                : this.THEME_LIGHT;
            
            const newTheme = currentTheme === this.THEME_DARK 
                ? this.THEME_LIGHT 
                : this.THEME_DARK;
            
            this.applyTheme(newTheme);
        },

        // Update toggle button icon
        updateToggleIcon(theme) {
            const toggleBtn = document.getElementById('theme-toggle');
            if (!toggleBtn) return;
            
            const icon = toggleBtn.querySelector('svg');
            if (!icon) return;
            
            if (theme === this.THEME_LIGHT) {
                // Show moon icon for light mode (to switch to dark)
                icon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                `;
            } else {
                // Show sun icon for dark mode (to switch to light)
                icon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                `;
            }
        },

        // Setup toggle button event listener
        setupToggleButton() {
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    this.toggleTheme();
                    
                    // Add animation
                    toggleBtn.classList.add('rotate-animation');
                    setTimeout(() => {
                        toggleBtn.classList.remove('rotate-animation');
                    }, 300);
                });
            }
        },

        // Listen for system theme changes
        setupSystemThemeListener() {
            if (!window.matchMedia) return;
            
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            darkModeQuery.addEventListener('change', (e) => {
                // Only apply system theme if user hasn't set a preference
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.applyTheme(e.matches ? this.THEME_DARK : this.THEME_LIGHT);
                }
            });
        }
    };

    // Initialize theme as early as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
    } else {
        ThemeManager.init();
    }

    // Export for global access
    window.ThemeManager = ThemeManager;
})();
