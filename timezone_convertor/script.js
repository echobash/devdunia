// Timezone data with display names
const timezones = [
    { value: 'UTC', name: 'UTC', display: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', name: 'EST', display: 'New York (Eastern Time)' },
    { value: 'America/Chicago', name: 'CST', display: 'Chicago (Central Time)' },
    { value: 'America/Los_Angeles', name: 'PST', display: 'Los Angeles (Pacific Time)' },
    { value: 'Europe/London', name: 'GMT', display: 'London (GMT)' },
    { value: 'Europe/Paris', name: 'CET', display: 'Paris (Central European)' },
    { value: 'Asia/Kolkata', name: 'IST', display: 'India (IST)' },
    { value: 'Asia/Dubai', name: 'GST', display: 'Dubai (Gulf Standard)' },
    { value: 'Asia/Shanghai', name: 'CST', display: 'Shanghai (China Standard)' },
    { value: 'Asia/Tokyo', name: 'JST', display: 'Tokyo (Japan Standard)' },
    { value: 'Australia/Sydney', name: 'AEDT', display: 'Sydney (Australian Eastern)' },
    { value: 'Pacific/Auckland', name: 'NZDT', display: 'Auckland (New Zealand)' }
];

// DOM Elements
const dateInput = document.getElementById('dateInput');
const sourceTimezone = document.getElementById('sourceTimezone');
const convertBtn = document.getElementById('convertBtn');
const resultsCard = document.getElementById('resultsCard');
const sourceTime = document.getElementById('sourceTime');
const sourceTimezoneLabel = document.getElementById('sourceTimezoneLabel');
const epochTime = document.getElementById('epochTime');
const timezoneGrid = document.getElementById('timezoneGrid');
const useCurrentTimeBtn = document.getElementById('useCurrentTime');
const clearBtn = document.getElementById('clearBtn');
const copyEpochBtn = document.getElementById('copyEpoch');

// Initialize with current time
function initializeDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    dateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Format date for display
function formatDate(date, timezone) {
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Format time only
function formatTime(date, timezone) {
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Format date only
function formatDateOnly(date, timezone) {
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Get timezone offset
function getTimezoneOffset(date, timezone) {
    const options = { timeZone: timezone, timeZoneName: 'short' };
    const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
    const match = formatted.match(/GMT([+-]\d+)/);
    return match ? match[1] : '';
}

// Convert timezones
function convertTimezones() {
    if (!dateInput.value) {
        alert('Please select a date and time');
        return;
    }

    // Get input date
    const inputDate = new Date(dateInput.value);
    const selectedTimezone = sourceTimezone.value;
    
    // Display source time
    const formattedSource = formatDate(inputDate, selectedTimezone);
    sourceTime.textContent = formattedSource;
    
    const tzOption = sourceTimezone.options[sourceTimezone.selectedIndex].text;
    sourceTimezoneLabel.textContent = tzOption;
    
    // Display epoch time
    const epoch = Math.floor(inputDate.getTime() / 1000);
    epochTime.textContent = epoch;
    
    // Convert to all timezones
    timezoneGrid.innerHTML = '';
    timezones.forEach(tz => {
        const tzTime = formatTime(inputDate, tz.value);
        const tzDate = formatDateOnly(inputDate, tz.value);
        
        const tzCard = document.createElement('div');
        tzCard.className = 'timezone-item';
        tzCard.innerHTML = `
            <div class="timezone-name">${tz.display}</div>
            <div class="timezone-time">${tzTime}</div>
            <div class="timezone-date">${tzDate}</div>
        `;
        
        timezoneGrid.appendChild(tzCard);
    });
    
    // Show results
    resultsCard.style.display = 'block';
    
    // Smooth scroll to results
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Copy epoch to clipboard
function copyEpoch() {
    const epoch = epochTime.textContent;
    
    navigator.clipboard.writeText(epoch).then(() => {
        // Visual feedback
        copyEpochBtn.classList.add('copied');
        const originalHTML = copyEpochBtn.innerHTML;
        copyEpochBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M16 6L8 14L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        setTimeout(() => {
            copyEpochBtn.classList.remove('copied');
            copyEpochBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// Use current time
function useCurrentTime() {
    initializeDateTime();
    convertTimezones();
}

// Clear all
function clearAll() {
    dateInput.value = '';
    resultsCard.style.display = 'none';
    sourceTime.textContent = '-';
    sourceTimezoneLabel.textContent = '-';
    epochTime.textContent = '-';
    timezoneGrid.innerHTML = '';
}

// Event listeners
convertBtn.addEventListener('click', convertTimezones);
copyEpochBtn.addEventListener('click', copyEpoch);
useCurrentTimeBtn.addEventListener('click', useCurrentTime);
clearBtn.addEventListener('click', clearAll);

// Allow Enter key to convert
dateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTimezones();
    }
});

// Initialize on load
initializeDateTime();