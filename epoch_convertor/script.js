document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const epochToDateBtn = document.getElementById('epoch-to-date-btn');
    const dateToEpochBtn = document.getElementById('date-to-epoch-btn');
    const epochToDateSection = document.getElementById('epoch-to-date-section');
    const dateToEpochSection = document.getElementById('date-to-epoch-section');
    const epochInput = document.getElementById('epoch-input');
    const dateInput = document.getElementById('date-input');
    const timeInput = document.getElementById('time-input');
    const timezoneSelect = document.getElementById('timezone-select');
    const convertEpochBtn = document.getElementById('convert-epoch-btn');
    const convertDateBtn = document.getElementById('convert-date-btn');
    const currentTimeBtn = document.getElementById('current-time-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const epochOutput = document.getElementById('epoch-output');
    const outputSection = document.getElementById('output-section');
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.getElementById('error-message');
    const humanDate = document.getElementById('human-date');
    const isoFormat = document.getElementById('iso-format');
    const utcFormat = document.getElementById('utc-format');
    const localFormat = document.getElementById('local-format');
    const currentEpochExample = document.getElementById('current-epoch-example');
    const currentDateExample = document.getElementById('current-date-example');

    // Initialize with current time
    updateCurrentTimeExamples();
    setInterval(updateCurrentTimeExamples, 1000);
    setCurrentDateTime();

    // Event Listeners for Conversion Type
    epochToDateBtn.addEventListener('click', () => switchConversionType('epoch-to-date'));
    dateToEpochBtn.addEventListener('click', () => switchConversionType('date-to-epoch'));

    // Conversion Event Listeners
    convertEpochBtn.addEventListener('click', convertEpochToDate);
    convertDateBtn.addEventListener('click', convertDateToEpoch);
    currentTimeBtn.addEventListener('click', setCurrentDateTime);
    clearBtn.addEventListener('click', clearAll);
    copyBtn.addEventListener('click', copyOutput);

    // Enter key support
    epochInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertEpochToDate();
        }
    });

    // Helper Functions
    function switchConversionType(type) {
        // Update button states
        document.querySelectorAll('.conversion-type-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600');
            btn.classList.add('bg-slate-600');
        });

        // Show/hide sections
        if (type === 'epoch-to-date') {
            epochToDateBtn.classList.add('active', 'bg-blue-600');
            epochToDateBtn.classList.remove('bg-slate-600');
            epochToDateSection.classList.remove('hidden');
            dateToEpochSection.classList.add('hidden');
        } else {
            dateToEpochBtn.classList.add('active', 'bg-blue-600');
            dateToEpochBtn.classList.remove('bg-slate-600');
            dateToEpochSection.classList.remove('hidden');
            epochToDateSection.classList.add('hidden');
        }
        
        hideOutput();
        hideError();
    }

    function updateCurrentTimeExamples() {
        const now = new Date();
        currentEpochExample.textContent = Math.floor(now.getTime() / 1000);
        currentDateExample.textContent = now.toUTCString();
    }

    function setCurrentDateTime() {
        const now = new Date();
        
        // Set epoch input
        epochInput.value = Math.floor(now.getTime() / 1000);
        
        // Set date input (YYYY-MM-DD)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        dateInput.value = `${year}-${month}-${day}`;
        
        // Set time input (HH:MM:SS)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}:${seconds}`;
        
        // Auto-convert based on current active section
        if (!epochToDateSection.classList.contains('hidden')) {
            convertEpochToDate();
        } else {
            convertDateToEpoch();
        }
    }

    function convertEpochToDate() {
        const epochValue = epochInput.value.trim();
        
        if (!epochValue) {
            showError('Please enter an epoch timestamp');
            return;
        }

        // Validate epoch input
        if (!/^-?\d+$/.test(epochValue)) {
            showError('Please enter a valid numeric epoch timestamp');
            return;
        }

        const epochNum = parseInt(epochValue, 10);
        
        // Handle milliseconds vs seconds
        let timestamp = epochNum;
        if (epochValue.length > 10) {
            // Likely milliseconds
            timestamp = epochNum;
        } else {
            // Seconds
            timestamp = epochNum * 1000;
        }

        try {
            const date = new Date(timestamp);
            
            if (isNaN(date.getTime())) {
                showError('Invalid epoch timestamp');
                return;
            }

            displayConversionResult(date, epochNum, 'epoch-to-date');
            hideError();
        } catch (error) {
            showError('Error converting epoch to date: ' + error.message);
        }
    }

    function convertDateToEpoch() {
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;
    
    if (!dateValue || !timeValue) {
        showError('Please select both date and time');
        return;
    }

    try {
        const isUTC = timezoneSelect.value === 'utc';
        let epochSeconds;
        
        if (isUTC) {
            // Treat input as UTC
            const dateTimeString = `${dateValue}T${timeValue}Z`; // Add 'Z' for UTC
            const date = new Date(dateTimeString);
            epochSeconds = Math.floor(date.getTime() / 1000);
        } else {
            // Treat input as local time
            const dateTimeString = `${dateValue}T${timeValue}`;
            const date = new Date(dateTimeString);
            epochSeconds = Math.floor(date.getTime() / 1000);
        }
        
        console.log('Timezone:', isUTC ? 'UTC' : 'Local', 'Epoch:', epochSeconds);
        displayConversionResult(new Date(epochSeconds * 1000), epochSeconds, 'date-to-epoch');
        hideError();
    } catch (error) {
        showError('Error converting date to epoch: ' + error.message);
    }
}

    function displayConversionResult(date, epoch, conversionType) {
    const isUTC = timezoneSelect.value === 'utc';
    
    // Format outputs
    const readableDate = isUTC ? date.toUTCString() : date.toString();
    const isoString = date.toISOString();
    const utcString = date.toUTCString();
    
    // Format local date and timezone separately
    const localDateString = formatLocalDate(date);
    const timezoneName = getFormattedTimezone(date);
    
    // Update output based on conversion type
    if (conversionType === 'epoch-to-date') {
        epochOutput.value = `Epoch: ${Math.floor(epoch)}\nDate: ${readableDate}`;
    } else {
        epochOutput.value = `Date: ${readableDate}\nEpoch: ${epoch}`;
        epochInput.value = epoch;
    }
    
    humanDate.textContent = readableDate;
    isoFormat.textContent = isoString;
    utcFormat.textContent = utcString;
    localFormat.textContent = localDateString;
    
    // Set timezone display
    const timezoneDisplay = document.getElementById('timezone-display');
    timezoneDisplay.textContent = timezoneName;
    
    showOutput();
}

function formatLocalDate(date) {
    // Format: "Wed Dec 25 2024 14:30:45"
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    return date.toLocaleDateString('en-US', options);
}

function getFormattedTimezone(date) {
    const dateString = date.toString();
    console.log('Full date string:', dateString);
    
    // Direct extraction from parentheses
    const timezoneMatch = dateString.match(/\(([^)]+)\)/);
    if (timezoneMatch) {
        return timezoneMatch[1]; // This will be "India Standard Time"
    }
    
    // Fallback: GMT offset
    return formatFallbackTimezone(date);
}

function formatFallbackTimezone(date) {
    const offset = -date.getTimezoneOffset() / 60;
    const sign = offset >= 0 ? '+' : '-';
    return `GMT${sign}${Math.abs(offset)}`;
}

    function showOutput() {
        outputSection.classList.remove('hidden');
        outputSection.classList.add('animate-fade-in');
    }

    function hideOutput() {
        outputSection.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');
        errorDisplay.classList.add('animate-slide-up');
        hideOutput();
    }

    function hideError() {
        errorDisplay.classList.add('hidden');
    }

    function clearAll() {
        epochInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        epochOutput.value = '';
        humanDate.textContent = '';
        isoFormat.textContent = '';
        utcFormat.textContent = '';
        localFormat.textContent = '';
        hideOutput();
        hideError();
    }

 function copyOutput() {
    // Get the output text
    const outputText = epochOutput.value;
    
    // Extract only the desired part (epoch or date)
    let textToCopy = '';
    let copyType = '';
    
    if (outputText.startsWith('Epoch:')) {
        // For epoch-to-date conversion, copy only the date part
        const dateMatch = outputText.match(/Date: (.+)/);
        if (dateMatch) {
            textToCopy = dateMatch[1];
            copyType = 'date';
        }
    } else if (outputText.startsWith('Date:')) {
        // For date-to-epoch conversion, copy only the epoch part
        const epochMatch = outputText.match(/Epoch: (\d+)/);
        if (epochMatch) {
            textToCopy = epochMatch[1];
            copyType = 'epoch';
        }
    }
    
    // If extraction failed, fall back to full text
    if (!textToCopy) {
        textToCopy = outputText;
        copyType = 'text';
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback with specific message
        const originalText = copyBtn.innerHTML;
        
        if (copyType === 'epoch') {
            copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Epoch Copied!</span>';
        } else if (copyType === 'date') {
            copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Date Copied!</span>';
        } else {
            copyBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
        }
        
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showError('Failed to copy text to clipboard');
    });
}

    // Initialize with epoch-to-date as default
    switchConversionType('epoch-to-date');
});