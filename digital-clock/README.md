# Digital Clock - Multiple Time Zones

A beautiful, responsive digital clock application that displays the current time across multiple time zones with local storage functionality.

## Features ✨

- **Multiple Time Zones**: Display time in 26+ different time zones worldwide
- **Primary Clock**: South Africa (SAST) as the featured primary timezone
- **24-Hour Format Toggle**: Switch between 12-hour (AM/PM) and 24-hour formats
- **Add/Remove Time Zones**: Dynamically add or remove timezones from the display
- **Local Storage**: Automatically saves your preferences (selected timezones and time format)
- **Real-Time Updates**: Clock updates every second with accurate times
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Supported Time Zones

### Africa
- South Africa (SAST)
- Egypt (EET)
- Nigeria (WAT)
- Kenya (EAT)

### Europe
- London (GMT/BST)
- Paris (CET/CEST)
- Berlin (CET/CEST)
- Moscow (MSK)

### Asia
- Dubai (GST)
- India (IST)
- Bangkok (ICT)
- Singapore (SGT)
- Hong Kong (HKT)
- Tokyo (JST)
- Seoul (KST)

### Australia & Pacific
- Sydney (AEDT/AEST)
- Melbourne (AEDT/AEST)
- Auckland (NZDT/NZST)

### Americas
- New York (EST/EDT)
- Chicago (CST/CDT)
- Denver (MST/MDT)
- Los Angeles (PST/PDT)
- Toronto (EST/EDT)
- Mexico City (CST/CDT)
- São Paulo (BRT/BRST)
- Buenos Aires (ART)

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **View Primary Clock**: South Africa time is displayed as the main clock
3. **Toggle Time Format**: Check the "24-Hour Format" checkbox to switch between formats
4. **Add Time Zones**: Click the "+ Add Time Zone" button to select and add new timezones
5. **Remove Time Zones**: Click the "×" button on any clock card to remove it
6. **Auto-Save**: Your preferences are automatically saved to your browser's local storage

## Local Storage

The application uses browser local storage to persist:
- Selected time zones (key: `timezone_clocks`)
- Time format preference (key: `time_format_24h`)

These settings are automatically restored when you revisit the application.

## Files

- `index.html` - Main HTML structure
- `styles.css` - Responsive styling with animations
- `script.js` - Clock logic and interactivity

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Features Explained

### Primary Clock
- Always shows South Africa (SAST) timezone
- Featured with larger font and gradient background
- Updates in real-time every second

### Additional Time Zones
- Grid layout that adapts to screen size
- Shows timezone name, current time, and date
- Easy remove button for each zone

### Time Format
- 12-hour: Shows AM/PM (e.g., 02:30:45 PM)
- 24-hour: 24-hour format (e.g., 14:30:45)
- Preference is saved and persisted

## Customization

To add more time zones, edit the `timeZones` object in `script.js`:

```javascript
const timeZones = {
    'Timezone/Name': { name: 'Display Name (TZ)', offset: utc_offset },
    // Add more...
};
```

## Performance

- Lightweight with minimal resource usage
- Single update interval for all clocks
- Efficient DOM updates
- Smooth CSS animations
- No external libraries or dependencies

## License

This project is provided as-is for use at Phola Lounge.

---

**Created for Phola Lounge** 🍹
