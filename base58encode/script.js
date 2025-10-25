// Base58 Encoder Script
class Base58Encoder {
    constructor() {
        this.base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadExample();
    }

    bindEvents() {
        const encodeBtn = document.getElementById('encode-btn');
        const clearBtn = document.querySelector('.clear-btn');
        const copyBtn = document.querySelector('.copy-btn');

        if (encodeBtn) {
            encodeBtn.addEventListener('click', () => this.encode());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.encode();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.clear();
                        break;
                }
            }
        });
    }

    encode() {
        const input = document.getElementById('base58-input').value.trim();
        const output = document.getElementById('base58-output');
        const outputSection = document.getElementById('output-section');
        const errorDisplay = document.getElementById('error-display');

        if (!input) {
            this.showError('Please enter some text to encode');
            return;
        }

        try {
            const encoded = this.encodeToBase58(input);
            output.value = encoded;
            outputSection.classList.remove('hidden');
            errorDisplay.classList.add('hidden');
            this.updateStats(input, encoded);
            this.showSuccess();
        } catch (error) {
            this.showError('Error encoding to Base58: ' + error.message);
            outputSection.classList.add('hidden');
        }
    }

    encodeToBase58(input) {
        // Convert input to bytes
        const bytes = new TextEncoder().encode(input);

        // Handle empty input
        if (bytes.length === 0) {
            return '';
        }

        // Count leading zeros
        let leadingZeros = 0;
        for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
            leadingZeros++;
        }

        // Convert bytes to big integer
        let num = BigInt(0);
        for (let i = 0; i < bytes.length; i++) {
            num = num * BigInt(256) + BigInt(bytes[i]);
        }

        // Convert to Base58
        let result = '';
        while (num > 0) {
            const remainder = Number(num % BigInt(58));
            result = this.base58Alphabet[remainder] + result;
            num = num / BigInt(58);
        }

        // Add leading '1's for leading zeros
        result = '1'.repeat(leadingZeros) + result;

        return result || '1'; // Return '1' for zero input
    }

    clear() {
        document.getElementById('base58-input').value = '';
        document.getElementById('base58-output').value = '';
        document.getElementById('output-section').classList.add('hidden');
        document.getElementById('error-display').classList.add('hidden');
        this.resetStats();
    }

    copyToClipboard() {
        const output = document.getElementById('base58-output');
        const copyBtn = document.querySelector('.copy-btn');

        if (!output.value) {
            this.showError('Nothing to copy');
            return;
        }

        navigator.clipboard.writeText(output.value).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            this.showError('Failed to copy to clipboard');
        });
    }

    showError(message) {
        const errorDisplay = document.getElementById('error-display');
        const errorMessage = document.getElementById('error-message');

        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDisplay.classList.add('hidden');
        }, 5000);
    }

    showSuccess() {
        const encodeBtn = document.getElementById('encode-btn');
        const originalText = encodeBtn.innerHTML;

        encodeBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Encoded!</span>';
        encodeBtn.classList.add('success');

        setTimeout(() => {
            encodeBtn.innerHTML = originalText;
            encodeBtn.classList.remove('success');
        }, 1500);
    }

    updateStats(original, encoded) {
        const originalSize = document.getElementById('original-size');
        const base58Size = document.getElementById('base58-size');
        const overhead = document.getElementById('overhead');

        const originalBytes = new Blob([original]).size;
        const base58Bytes = new Blob([encoded]).size;
        const overheadPercent = ((base58Bytes - originalBytes) / originalBytes * 100).toFixed(1);

        originalSize.textContent = this.formatBytes(originalBytes);
        base58Size.textContent = this.formatBytes(base58Bytes);
        overhead.textContent = overheadPercent + '%';
    }

    resetStats() {
        document.getElementById('original-size').textContent = '0 B';
        document.getElementById('base58-size').textContent = '0 B';
        document.getElementById('overhead').textContent = '0%';
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    loadExample() {
        // Load example text on page load
        window.addEventListener('load', () => {
            const input = document.getElementById('base58-input');
            if (!input.value) {
                input.value = 'Hello, DevDunia!';
            }
        });
    }
}

// Initialize the encoder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Base58Encoder();
});

// Utility functions for global use
window.DevDuniaUtils = {
    formatBytes: function(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
};
