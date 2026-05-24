// Time zones configuration with UTC offsets
const timeZones = {
    // Africa
    'Africa/Johannesburg': { name: 'South Africa (SAST)', offset: 2 },
    'Africa/Cairo': { name: 'Egypt (EET)', offset: 2 },
    'Africa/Lagos': { name: 'Nigeria (WAT)', offset: 1 },
    'Africa/Nairobi': { name: 'Kenya (EAT)', offset: 3 },
    'Africa/Accra': { name: 'Ghana (GMT)', offset: 0 },
    'Africa/Addis_Ababa': { name: 'Ethiopia (EAT)', offset: 3 },
    'Africa/Casablanca': { name: 'Morocco (WET/WEST)', offset: 0 },

    // Europe
    'Europe/London': { name: 'London (GMT/BST)', offset: 0 },
    'Europe/Paris': { name: 'Paris (CET/CEST)', offset: 1 },
    'Europe/Berlin': { name: 'Berlin (CET/CEST)', offset: 1 },
    'Europe/Madrid': { name: 'Madrid (CET/CEST)', offset: 1 },
    'Europe/Rome': { name: 'Rome (CET/CEST)', offset: 1 },
    'Europe/Amsterdam': { name: 'Amsterdam (CET/CEST)', offset: 1 },
    'Europe/Brussels': { name: 'Brussels (CET/CEST)', offset: 1 },
    'Europe/Vienna': { name: 'Vienna (CET/CEST)', offset: 1 },
    'Europe/Prague': { name: 'Prague (CET/CEST)', offset: 1 },
    'Europe/Moscow': { name: 'Moscow (MSK)', offset: 3 },
    'Europe/Istanbul': { name: 'Istanbul (EET/EEST)', offset: 2 },
    'Europe/Athens': { name: 'Athens (EET/EEST)', offset: 2 },

    // Asia
    'Asia/Dubai': { name: 'Dubai (GST)', offset: 4 },
    'Asia/Kolkata': { name: 'India (IST)', offset: 5.5 },
    'Asia/Bangkok': { name: 'Bangkok (ICT)', offset: 7 },
    'Asia/Singapore': { name: 'Singapore (SGT)', offset: 8 },
    'Asia/Hong_Kong': { name: 'Hong Kong (HKT)', offset: 8 },
    'Asia/Tokyo': { name: 'Tokyo (JST)', offset: 9 },
    'Asia/Seoul': { name: 'Seoul (KST)', offset: 9 },
    'Asia/Shanghai': { name: 'Shanghai (CST)', offset: 8 },
    'Asia/Karachi': { name: 'Karachi (PKT)', offset: 5 },
    'Asia/Jakarta': { name: 'Jakarta (WIB)', offset: 7 },
    'Asia/Manila': { name: 'Manila (PST)', offset: 8 },

    // Australia & Pacific
    'Australia/Sydney': { name: 'Sydney (AEDT/AEST)', offset: 10 },
    'Australia/Melbourne': { name: 'Melbourne (AEDT/AEST)', offset: 10 },
    'Australia/Brisbane': { name: 'Brisbane (AEST)', offset: 10 },
    'Australia/Perth': { name: 'Perth (AWST)', offset: 8 },
    'Pacific/Auckland': { name: 'Auckland (NZDT/NZST)', offset: 12 },
    'Pacific/Fiji': { name: 'Fiji (FJT)', offset: 12 },

    // Americas
    'America/New_York': { name: 'New York (EST/EDT)', offset: -5 },
    'America/Chicago': { name: 'Chicago (CST/CDT)', offset: -6 },
    'America/Denver': { name: 'Denver (MST/MDT)', offset: -7 },
    'America/Los_Angeles': { name: 'Los Angeles (PST/PDT)', offset: -8 },
    'America/Anchorage': { name: 'Anchorage (AKST/AKDT)', offset: -9 },
    'America/Toronto': { name: 'Toronto (EST/EDT)', offset: -5 },
    'America/Vancouver': { name: 'Vancouver (PST/PDT)', offset: -8 },
    'America/Mexico_City': { name: 'Mexico City (CST/CDT)', offset: -6 },
    'America/Sao_Paulo': { name: 'São Paulo (BRT/BRST)', offset: -3 },
    'America/Argentina/Buenos_Aires': { name: 'Buenos Aires (ART)', offset: -3 },
    'America/Caracas': { name: 'Caracas (VET)', offset: -4 },
};

// DOM Elements
const primaryTimeEl = document.getElementById('primaryTime');
const primaryDateEl = document.getElementById('primaryDate');
const clocksContainer = document.getElementById('clocksContainer');
const formatToggle = document.getElementById('formatToggle');
const addTimeZoneBtn = document.getElementById('addTimeZoneBtn');
const timeZoneModal = document.getElementById('timeZoneModal');
const closeModal = document.getElementById('closeModal');
const timeZoneSearch = document.getElementById('timeZoneSearch');
const timeZoneList = document.getElementById('timeZoneList');

// Local Storage Keys
const STORAGE_KEYS = {
    TIMEZONES: 'timezone_clocks',
    FORMAT_24H: 'time_format_24h',
};

// State
let selectedTimezones = ['Africa/Cairo', 'America/New_York', 'Asia/Tokyo'];
let use24HourFormat = true;

// Initialize Application
function init() {
    loadPreferences();
    renderTimeZoneList();
    updateAllClocks();
    setupEventListeners();
    
    // Update clocks every second
    setInterval(updateAllClocks, 1000);
}

// Load preferences from local storage
function loadPreferences() {
    const savedTimezones = localStorage.getItem(STORAGE_KEYS.TIMEZONES);
    const saved24HFormat = localStorage.getItem(STORAGE_KEYS.FORMAT_24H);

    if (savedTimezones) {
        try {
            selectedTimezones = JSON.parse(savedTimezones);
        } catch (e) {
            console.error('Error loading timezones:', e);
        }
    }

    if (saved24HFormat !== null) {
        use24HourFormat = JSON.parse(saved24HFormat);
        formatToggle.checked = use24HourFormat;
    }
}

// Save preferences to local storage
function savePreferences() {
    localStorage.setItem(STORAGE_KEYS.TIMEZONES, JSON.stringify(selectedTimezones));
    localStorage.setItem(STORAGE_KEYS.FORMAT_24H, JSON.stringify(use24HourFormat));
}

// Setup Event Listeners
function setupEventListeners() {
    formatToggle.addEventListener('change', (e) => {
        use24HourFormat = e.target.checked;
        savePreferences();
        updateAllClocks();
    });

    addTimeZoneBtn.addEventListener('click', () => {
        timeZoneModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => {
        timeZoneModal.classList.remove('show');
    });

    timeZoneModal.addEventListener('click', (e) => {
        if (e.target === timeZoneModal) {
            timeZoneModal.classList.remove('show');
        }
    });

    timeZoneSearch.addEventListener('input', filterTimeZones);
}

// Render timezone list in modal
function renderTimeZoneList() {
    timeZoneList.innerHTML = '';
    
    Object.entries(timeZones).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'timezone-item';
        item.textContent = value.name;
        item.addEventListener('click', () => {
            if (!selectedTimezones.includes(key)) {
                selectedTimezones.push(key);
                savePreferences();
                updateAllClocks();
            }
            timeZoneModal.classList.remove('show');
            timeZoneSearch.value = '';
        });
        timeZoneList.appendChild(item);
    });
}

// Filter timezones in search
function filterTimeZones(e) {
    const searchTerm = e.target.value.toLowerCase();
    const items = timeZoneList.querySelectorAll('.timezone-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

// Format time based on preference
function formatTime(date, use24Hour = true) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (use24Hour) {
        return `${hours}:${minutes}:${seconds}`;
    } else {
        const hour12 = date.getHours() % 12 || 12;
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${String(hour12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }
}

// Format date
function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get time in specific timezone
function getTimeInTimezone(timezone) {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    
    const localTime = new Date(date.getTime() + (offset - date.getTimezoneOffset() / 60) * 60 * 60 * 1000);
    return localTime;
}

// Update all clock displays
function updateAllClocks() {
    // Update primary clock (South Africa)
    const saTime = getTimeInTimezone('Africa/Johannesburg');
    primaryTimeEl.textContent = formatTime(saTime, use24HourFormat);
    primaryDateEl.textContent = formatDate(saTime);

    // Update secondary clocks
    clocksContainer.innerHTML = '';
    
    selectedTimezones.forEach(tzKey => {
        if (timeZones[tzKey]) {
            const tzTime = getTimeInTimezone(tzKey);
            const card = createClockCard(tzKey, timeZones[tzKey], tzTime);
            clocksContainer.appendChild(card);
        }
    });
}

// Create clock card element
function createClockCard(tzKey, tzData, time) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    
    const timeStr = formatTime(time, use24HourFormat);
    const dateStr = formatDate(time);

    card.innerHTML = `
        <button class="clock-card-remove" data-tz="${tzKey}">×</button>
        <div class="clock-card-time">${timeStr}</div>
        <div class="clock-card-timezone">${tzData.name}</div>
        <div class="clock-card-date">${dateStr}</div>
    `;

    card.querySelector('.clock-card-remove').addEventListener('click', () => {
        removeTimezone(tzKey);
    });

    return card;
}

// Remove timezone from display
function removeTimezone(tzKey) {
    selectedTimezones = selectedTimezones.filter(tz => tz !== tzKey);
    savePreferences();
    updateAllClocks();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
