// Base58 Decoder Script
class Base58Decoder {
    constructor() {
        this.base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadExample();
    }

    bindEvents() {
        const decodeBtn = document.getElementById('decode-btn');
        const clearBtn = document.querySelector('.clear-btn');
        const copyBtn = document.querySelector('.copy-btn');

        if (decodeBtn) {
            decodeBtn.addEventListener('click', () => this.decode());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard());
        }

        // Real-time validation
        const input = document.getElementById('base58-input');
        if (input) {
            input.addEventListener('input', () => this.validateInput());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.decode();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.clear();
                        break;
                }
            }
        });
    }

    validateInput() {
        const input = document.getElementById('base58-input');
        const value = input.value.trim();

        if (!value) {
            input.classList.remove('input-valid', 'input-invalid');
            return;
        }

        const isValid = this.isValidBase58(value);
        input.classList.toggle('input-valid', isValid);
        input.classList.toggle('input-invalid', !isValid);
    }

    isValidBase58(str) {
        for (let char of str) {
            if (this.base58Alphabet.indexOf(char) === -1) {
                return false;
            }
        }
        return true;
    }

    decode() {
        const input = document.getElementById('base58-input').value.trim();
        const output = document.getElementById('base58-output');
        const outputSection = document.getElementById('output-section');
        const errorDisplay = document.getElementById('error-display');

        if (!input) {
            this.showError('Please enter a Base58 string to decode');
            return;
        }

        if (!this.isValidBase58(input)) {
            this.showError('Invalid Base58 string. Base58 can only contain: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
            return;
        }

        try {
            const decoded = this.decodeFromBase58(input);
            output.value = decoded;
            outputSection.classList.remove('hidden');
            errorDisplay.classList.add('hidden');
            this.updateStats(input, decoded);
            this.showSuccess();
        } catch (error) {
            this.showError('Error decoding from Base58: ' + error.message);
            outputSection.classList.add('hidden');
        }
    }

    decodeFromBase58(input) {
        // Handle empty input
        if (!input || input === '1') {
            return '';
        }

        // Count leading '1's (which represent leading zeros)
        let leadingZeros = 0;
        for (let i = 0; i < input.length && input[i] === '1'; i++) {
            leadingZeros++;
        }

        // Convert Base58 to big integer
        let num = BigInt(0);
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const index = this.base58Alphabet.indexOf(char);
            if (index === -1) {
                throw new Error('Invalid Base58 character: ' + char);
            }
            num = num * BigInt(58) + BigInt(index);
        }

        // Convert to bytes
        const bytes = [];
        while (num > 0) {
            bytes.unshift(Number(num % BigInt(256)));
            num = num / BigInt(256);
        }

        // Add leading zeros
        const result = new Uint8Array(leadingZeros + bytes.length);
        for (let i = 0; i < leadingZeros; i++) {
            result[i] = 0;
        }
        for (let i = 0; i < bytes.length; i++) {
            result[leadingZeros + i] = bytes[i];
        }

        // Try to decode as text, fallback to hex representation
        try {
            const text = new TextDecoder().decode(result);
            // Check if it's printable text
            if (this.isPrintableText(text)) {
                return text;
            } else {
                // Show as hex for binary data
                return this.bytesToHex(result);
            }
        } catch (e) {
            // If not valid UTF-8, show as hex
            return this.bytesToHex(result);
        }
    }

    isPrintableText(str) {
        // Check if string contains only printable ASCII characters
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
                return false;
            }
        }
        return true;
    }

    bytesToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join(' ')
            .toUpperCase();
    }

    clear() {
        document.getElementById('base58-input').value = '';
        document.getElementById('base58-output').value = '';
        document.getElementById('output-section').classList.add('hidden');
        document.getElementById('error-display').classList.add('hidden');
        this.resetStats();
        this.validateInput(); // Reset validation state
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
        const decodeBtn = document.getElementById('decode-btn');
        const originalText = decodeBtn.innerHTML;

        decodeBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Decoded!</span>';
        decodeBtn.classList.add('success');

        setTimeout(() => {
            decodeBtn.innerHTML = originalText;
            decodeBtn.classList.remove('success');
        }, 1500);
    }

    updateStats(encoded, decoded) {
        const base58Size = document.getElementById('base58-size');
        const decodedSize = document.getElementById('decoded-size');
        const compression = document.getElementById('compression');

        const encodedBytes = new Blob([encoded]).size;
        const decodedBytes = new Blob([decoded]).size;
        const compressionPercent = ((encodedBytes - decodedBytes) / decodedBytes * 100).toFixed(1);

        base58Size.textContent = this.formatBytes(encodedBytes);
        decodedSize.textContent = this.formatBytes(decodedBytes);
        compression.textContent = compressionPercent + '%';
    }

    resetStats() {
        document.getElementById('base58-size').textContent = '0 B';
        document.getElementById('decoded-size').textContent = '0 B';
        document.getElementById('compression').textContent = '0%';
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
                input.value = 'JxF12TrwUP45BMd';
            }
        });
    }
}

// Initialize the decoder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Base58Decoder();
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
