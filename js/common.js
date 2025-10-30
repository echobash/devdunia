// ===========================================================
// DevDunia Common JavaScript Utilities
// Author: Aditya Rana
// Version: 2.1
// Description: Utility + Theme Management + Export Ready
// ===========================================================

const DevDuniaUtils = {
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    showCopyFeedback(button, success = true) {
        const originalText = button.innerHTML;
        const originalClasses = button.className;
        if (success) {
            button.innerHTML = '<span>✅ Copied!</span>';
            button.classList.add('bg-green-600');
        } else {
            button.innerHTML = '<span>❌ Failed!</span>';
            button.classList.add('bg-red-600');
        }
        setTimeout(() => {
            button.innerHTML = originalText;
            button.className = originalClasses;
        }, 2000);
    },

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    showStatus(message, type = 'info', container) {
        if (!container) return;
        const div = document.createElement('div');
        div.className = `p-3 rounded-lg mb-4 ${
            type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
        }`;
        div.textContent = message;
        container.innerHTML = '';
        container.appendChild(div);
        container.classList.remove('hidden');
        if (type !== 'error') setTimeout(() => container.classList.add('hidden'), 4000);
    },

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    },

    isValidJSON(str) { try { JSON.parse(str); return true; } catch { return false; } },
    isValidURL(str) { try { new URL(str); return true; } catch { return false; } },

    generateRandomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        let result = '';
        for (let i = 0; i < length; i++) result += charset.charAt(Math.floor(Math.random() * charset.length));
        return result;
    },

    debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },

    formatNumber(num) { return num.toLocaleString(); },

    getTextStats(text) {
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split('\n').length;
        const bytes = new Blob([text]).size;
        return { characters: chars, words, lines, bytes, size: this.formatBytes(bytes) };
    },

    // --- New Utility Additions ---
    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
        for (const [key, value] of Object.entries(intervals)) {
            const count = Math.floor(seconds / value);
            if (count >= 1) return `${count} ${key}${count > 1 ? 's' : ''} ago`;
        }
        return 'just now';
    },

    getDeviceInfo() {
        return {
            browser: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            online: navigator.onLine
        };
    },

    downloadFile(filename, content, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    storage: {
        set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
        get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
        remove(key) { localStorage.removeItem(key); },
        clear() { localStorage.clear(); }
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-6 right-6 z-50 p-3 rounded-lg shadow-md text-white 
            ${type === 'success' ? 'bg-green-600' :
              type === 'error' ? 'bg-red-600' :
              type === 'warning' ? 'bg-yellow-500' : 'bg-blue-600'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    autoThemeByTime() {
        const hour = new Date().getHours();
        if (hour >= 19 || hour <= 6) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
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
        } else {
            this.autoDetectTheme();
        }
        this.updateToggle();
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.addEventListener('click', () => this.toggleTheme());
    },

    injectLightStyles() {
        if (document.getElementById('light-theme-overrides')) return;
        const css = `
html.light body { background: #fff !important; color: #0f172a !important; }
html.light [class*="bg-slate-900"], html.light [class*="bg-slate-800"] { background: #ffffff !important; color: #0f172a !important; }
html.light [class*="text-white"] { color: #0f172a !important; }`;
        const style = document.createElement('style');
        style.id = 'light-theme-overrides';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    },

    updateToggle() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.theme-toggle-dark').forEach(el => el.classList.toggle('hidden', !isDark));
        document.querySelectorAll('.theme-toggle-light').forEach(el => el.classList.toggle('hidden', isDark));
    },

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateToggle();
    },

    autoDetectTheme() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }
};

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    document.querySelectorAll('textarea').forEach(t =>
        t.addEventListener('input', () => DevDuniaUtils.autoResizeTextarea(t))
    );
});

// ===========================================================
// Exports (for module usage)
// ===========================================================
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { DevDuniaUtils, ThemeManager };
} else {
    window.DevDuniaUtils = DevDuniaUtils;
    window.ThemeManager = ThemeManager;
}

export { DevDuniaUtils, ThemeManager };
