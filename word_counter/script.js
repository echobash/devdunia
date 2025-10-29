document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const analyzeBtn = document.getElementById('analyze-btn');
    const statsSection = document.getElementById('stats-section');

    // Event listeners
    inputText.addEventListener('input', function() {
        analyzeText();
    });

    analyzeBtn.addEventListener('click', function() {
        analyzeText();
    });

    function analyzeText() {
        const text = inputText.value;
        
        if (!text.trim()) {
            statsSection.classList.add('hidden');
            return;
        }

        const stats = calculateStats(text);
        updateStatsDisplay(stats);
        statsSection.classList.remove('hidden');
    }

    function calculateStats(text) {
        // Basic counts
        const words = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0) : [];
        const wordCount = words.length;
        const charCount = text.length;
        const charNoSpaces = text.replace(/\s/g, '').length;
        const lineCount = text.split('\n').length;

        // Sentence analysis
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;
        const avgWordsPerSentence = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : 0;

        // Character breakdown
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const numbers = (text.match(/[0-9]/g) || []).length;
        const spaces = (text.match(/\s/g) || []).length;
        const special = charCount - letters - numbers - spaces;

        // Paragraph count
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const paragraphCount = paragraphs.length;

        // Average characters per word
        const avgCharsPerWord = wordCount > 0 ? (charNoSpaces / wordCount).toFixed(1) : 0;

        // Reading time (in minutes)
        const readingTimeSlow = wordCount > 0 ? (wordCount / 200).toFixed(1) : 0;
        const readingTimeAvg = wordCount > 0 ? (wordCount / 250).toFixed(1) : 0;
        const readingTimeFast = wordCount > 0 ? (wordCount / 300).toFixed(1) : 0;

        return {
            wordCount,
            charCount,
            charNoSpaces,
            lineCount,
            sentenceCount,
            paragraphCount,
            avgWordsPerSentence,
            avgCharsPerWord,
            letters,
            numbers,
            spaces,
            special,
            readingTimeSlow,
            readingTimeAvg,
            readingTimeFast
        };
    }

    function updateStatsDisplay(stats) {
        document.getElementById('word-count').textContent = stats.wordCount;
        document.getElementById('char-count').textContent = stats.charCount;
        document.getElementById('char-no-spaces').textContent = stats.charNoSpaces;
        document.getElementById('line-count').textContent = stats.lineCount;
        document.getElementById('sentence-count').textContent = stats.sentenceCount;
        document.getElementById('paragraph-count').textContent = stats.paragraphCount;
        document.getElementById('avg-words-per-sentence').textContent = stats.avgWordsPerSentence;
        document.getElementById('avg-chars-per-word').textContent = stats.avgCharsPerWord;
        document.getElementById('letter-count').textContent = stats.letters;
        document.getElementById('number-count').textContent = stats.numbers;
        document.getElementById('space-count').textContent = stats.spaces;
        document.getElementById('special-count').textContent = stats.special;
        document.getElementById('reading-time-slow').textContent = stats.readingTimeSlow + ' min';
        document.getElementById('reading-time-avg').textContent = stats.readingTimeAvg + ' min';
        document.getElementById('reading-time-fast').textContent = stats.readingTimeFast + ' min';
    }

    // Example on page load
    window.addEventListener('load', () => {
        inputText.value = `This is a sample text for analysis.

It contains multiple paragraphs and sentences. The word counter will analyze various aspects of this text including word count, character count, and reading time.

You can paste any text here to get detailed statistics about it. The tool will automatically update as you type!`;
    });
});
