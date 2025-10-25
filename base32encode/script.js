// Base32 Encoder Script
document.addEventListener('DOMContentLoaded', function() {
    const base32Input = document.getElementById('base32-input');
    const base32Output = document.getElementById('base32-output');
    const encodeBtn = document.getElementById('encode-btn');
    const outputSection = document.getElementById('output-section');
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');
    const originalSize = document.getElementById('original-size');
    const base32Size = document.getElementById('base32-size');
    const overhead = document.getElementById('overhead');
    const padding = document.getElementById('padding');

    // Base32 alphabet (RFC 4648)
    const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    // Encode to Base32
    encodeBtn.addEventListener('click', function() {
        const input = base32Input.value.trim();
        if (!input) {
            showError('Please enter some text to encode');
            return;
        }

        try {
            const encoded = encodeToBase32(input);
            base32Output.value = encoded;
            showOutput();
            updateStats(input, encoded);
            hideError();
        } catch (error) {
            showError('Error encoding to Base32: ' + error.message);
            hideOutput();
        }
    });

    // Clear all functionality
    document.querySelector('.clear-btn').addEventListener('click', function() {
        base32Input.value = '';
        hideOutput();
        hideError();
    });

    // Copy functionality
    document.querySelector('.copy-btn').addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.select();
            document.execCommand('copy');

            // Visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
            this.classList.add('bg-green-600');

            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('bg-green-600');
            }, 2000);
        }
    });

    // Helper functions
    function showOutput() {
        outputSection.classList.remove('hidden');
    }

    function hideOutput() {
        outputSection.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');
    }

    function hideError() {
        errorDisplay.classList.add('hidden');
    }

    function encodeToBase32(input) {
        const bytes = new TextEncoder().encode(input);
        let binary = '';

        // Convert bytes to binary string
        for (let i = 0; i < bytes.length; i++) {
            binary += bytes[i].toString(2).padStart(8, '0');
        }

        // Pad binary to multiple of 5 bits
        while (binary.length % 5 !== 0) {
            binary += '0';
        }

        let result = '';
        // Group by 5 bits and convert to Base32
        for (let i = 0; i < binary.length; i += 5) {
            const chunk = binary.substr(i, 5);
            const index = parseInt(chunk, 2);
            result += base32Alphabet[index];
        }

        // Add padding
        const paddingLength = (8 - (result.length % 8)) % 8;
        result += '='.repeat(paddingLength);

        return result;
    }

    function updateStats(original, encoded) {
        const originalBytes = new Blob([original]).size;
        const base32Bytes = new Blob([encoded]).size;
        const overheadPercent = ((base32Bytes - originalBytes) / originalBytes * 100).toFixed(1);

        // Calculate padding characters
        const paddingChars = encoded.match(/=+$/);
        const paddingCount = paddingChars ? paddingChars[0].length : 0;

        originalSize.textContent = formatBytes(originalBytes);
        base32Size.textContent = formatBytes(base32Bytes);
        overhead.textContent = overheadPercent + '%';
        padding.textContent = paddingCount + ' chars';
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Example text on page load
    window.addEventListener('load', () => {
        base32Input.value = 'Hello, DevDunia!';
    });
});
