// Base32 Decoder Script
document.addEventListener('DOMContentLoaded', function() {
    const base32Input = document.getElementById('base32-input');
    const base32Output = document.getElementById('base32-output');
    const decodeBtn = document.getElementById('decode-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const outputSection = document.getElementById('output-section');
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');
    const base32Size = document.getElementById('base32-size');
    const decodedSize = document.getElementById('decoded-size');
    const compression = document.getElementById('compression');
    const padding = document.getElementById('padding');

    // Base32 alphabet (RFC 4648)
    const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    // Decode Base32
    decodeBtn.addEventListener('click', function() {
        const input = base32Input.value.trim();
        if (!input) {
            showError('Please enter Base32 data to decode');
            return;
        }

        try {
            // Remove whitespace and validate Base32
            const cleanInput = input.replace(/\s/g, '');
            if (!isValidBase32(cleanInput)) {
                throw new Error('Invalid Base32 string - contains invalid characters or incorrect padding');
            }

            const decoded = decodeFromBase32(cleanInput);
            base32Output.value = decoded;
            showOutput();
            updateStats(cleanInput, decoded);
            hideError();
        } catch (error) {
            showError('Error decoding from Base32: ' + error.message);
            hideOutput();
        }
    });

    // Clear all
    clearBtn.addEventListener('click', function() {
        base32Input.value = '';
        hideOutput();
        hideError();
    });

    // Copy output
    copyBtn.addEventListener('click', function() {
        base32Output.select();
        document.execCommand('copy');

        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
        copyBtn.classList.add('bg-green-600');

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('bg-green-600');
        }, 2000);
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

    function isValidBase32(str) {
        // Check for valid Base32 characters and padding
        const validChars = /^[A-Z2-7]+=*$/;
        if (!validChars.test(str)) {
            return false;
        }

        // Check padding is valid (0, 1, 3, 4, 6 padding characters)
        const paddingCount = (str.match(/=+$/) || [''])[0].length;
        const validPadding = [0, 1, 3, 4, 6];
        if (!validPadding.includes(paddingCount)) {
            return false;
        }

        return true;
    }

    function decodeFromBase32(input) {
        // Remove padding
        const cleanInput = input.replace(/=+$/, '');
        let binary = '';

        // Convert Base32 to binary
        for (let i = 0; i < cleanInput.length; i++) {
            const char = cleanInput[i];
            const index = base32Alphabet.indexOf(char);
            if (index === -1) {
                throw new Error('Invalid Base32 character: ' + char);
            }
            binary += index.toString(2).padStart(5, '0');
        }

        // Remove padding bits (Base32 uses 5 bits per character, but we need 8 bits per byte)
        const originalLength = Math.floor(binary.length / 8) * 8;
        binary = binary.substring(0, originalLength);

        // Convert binary to bytes
        const bytes = [];
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            bytes.push(parseInt(byte, 2));
        }

        // Convert bytes to string
        return new TextDecoder().decode(new Uint8Array(bytes));
    }

    function updateStats(base32, decoded) {
        const base32Bytes = new Blob([base32]).size;
        const decodedBytes = new Blob([decoded]).size;
        const compressionPercent = ((base32Bytes - decodedBytes) / base32Bytes * 100).toFixed(1);

        // Calculate padding characters
        const paddingChars = base32.match(/=+$/);
        const paddingCount = paddingChars ? paddingChars[0].length : 0;

        base32Size.textContent = formatBytes(base32Bytes);
        decodedSize.textContent = formatBytes(decodedBytes);
        compression.textContent = compressionPercent + '%';
        padding.textContent = paddingCount + ' chars';
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Example Base32 on page load
    window.addEventListener('load', () => {
        base32Input.value = 'JBSWY3DPEBLW64TMMQQQ====';
    });
});
