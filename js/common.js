// Common JavaScript utilities for DevDunia tools

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
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
            button.classList.add('bg-green-600');
        } else {
            button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg><span>Failed!</span>';
            button.classList.add('bg-red-600');
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.className = originalClasses;
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

// Common event listeners setup
document.addEventListener('DOMContentLoaded', function() {
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

// Export for use in other scripts
window.DevDuniaUtils = DevDuniaUtils;

// Theme switching logic
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.add(currentTheme);
/**
 * Initializes and handles the theme switching functionality for the application.
 * On DOMContentLoaded, it retrieves the current theme from localStorage, applies it to the
 * document's root element, and sets up a click event listener on the theme toggle button
 * to switch between 'light' and 'dark' themes, persisting the selection.
 * @param {Event} event - The DOMContentLoaded event object.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.add(currentTheme);
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    themeToggleButton.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    themeToggleButton.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
