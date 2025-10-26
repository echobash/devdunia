(function () {
    const textInput = document.getElementById('textInput');
    const charsEl = document.getElementById('chars');
    const charsNoSpacesEl = document.getElementById('charsNoSpaces');
    const wordsEl = document.getElementById('words');

    const btnCopy = document.getElementById('btnCopy');
    const btnClear = document.getElementById('btnClear');
    const btnDownload = document.getElementById('btnDownload');

    function updateCounts(text) {
        text = text || '';
        const totalChars = text.length;
        const charsNoSpaces = text.replace(/\s+/g, '').length;

        const trimmed = text.trim();
        const words = trimmed === '' ? 0 : trimmed.split(/\s+/).filter(Boolean).length;

        charsEl.textContent = totalChars;
        charsNoSpacesEl.textContent = charsNoSpaces;
        wordsEl.textContent = words;
    }

    function debounce(fn, wait) {
        let t = null;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    const debouncedUpdate = debounce((value) => updateCounts(value), 150);

    textInput.addEventListener('input', (e) => {
        debouncedUpdate(e.target.value);
    });

    document.addEventListener('DOMContentLoaded', () => {
        updateCounts(textInput.value);
    });

    btnCopy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(textInput.value);
            btnCopy.textContent = 'Copied';
            setTimeout(() => (btnCopy.textContent = 'Copy'), 1200);
        } catch (err) {
            textInput.select();
            try {
                document.execCommand('copy');
                btnCopy.textContent = 'Copied';
                setTimeout(() => (btnCopy.textContent = 'Copy'), 1200);
            } catch (e) {
                btnCopy.textContent = 'Copy failed';
                setTimeout(() => (btnCopy.textContent = 'Copy'), 1200);
            }
        }
    });

    btnClear.addEventListener('click', () => {
        textInput.value = '';
        updateCounts('');
        textInput.focus();
    });

    btnDownload.addEventListener('click', () => {
        const text = textInput.value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    [btnCopy, btnClear, btnDownload].forEach((btn) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    window.__wordCounter = { updateCounts };
})();