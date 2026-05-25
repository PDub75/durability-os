# Durability OS — Setup & Usage Instructions

## Overview
**Durability OS** is a personal longevity coaching app that runs entirely in your browser. It requires **no server, no installation, no internet connection** after first opening. All your data is stored privately on your computer.

---

## Quick Start (5 minutes)

### Step 1: Extract the Zip File
1. Download the `Durability-OS-Ready-to-Run.zip` file
2. Right-click → **Extract All** (or use your preferred unzip tool)
3. You'll see a folder with these items:
   - `dist/` folder (the app)
   - `RUN-DURABILITY-OS.bat` (the launcher)
   - `SETUP_INSTRUCTIONS.md` (this file)

### Step 2: Run the Launcher
1. **Double-click** `RUN-DURABILITY-OS.bat`
2. A web server will start automatically (no admin access needed)
3. Your browser will open the app at `http://localhost:9999`
4. You're done! The app loads instantly

That's it. The launcher handles everything behind the scenes.

### Step 3: Bookmark for Daily Access
In your browser:
- Press **Ctrl+D** (or **⌘+D** on Mac) to bookmark the page
- Name it "Durability OS"
- Tomorrow, you can click the bookmark instead of running the launcher again
- Keep the browser tab open during the day for quickest access

---

## Your Data is Safe

✅ **Private:** All data stays on your computer — nothing is sent anywhere  
✅ **No Internet Required:** Works offline after first open  
✅ **Persistent:** Your data is saved automatically in your browser  
⚠️ **Backup Note:** If you clear your browser's cache, your data will be deleted. See "Data Backup" below if you want to back up your entries.

---

## How to Use the App

### Morning (5 minutes)
1. Open the app (bookmark or find `index.html`)
2. Tap **Check-in** tab
3. Enter your Garmin metrics:
   - Body Battery (0-100)
   - HRV Status (Balanced / Low / High / Unbalanced)
   - Sleep Score (0-100)
   - Stress Score (0-100)
   - Resting Heart Rate (40-100 bpm)
4. Enter context:
   - Energy level (1-5 scale)
   - Schedule intensity (Light / Moderate / Heavy)
   - Traveling today? (Yes / No)
   - External stressors? (Yes / No)
5. Tap **"Generate today's brief ↗"**
   - Your personalized coaching brief appears on the Home tab
6. Return to **Home** tab to see your daily plan

### Throughout the Day
- **Food tab:** Log meals, track protein & hydration
- **Home tab:** Check off habits as you complete them, see your progress
- **Mind tab:** Log cognitive challenges (optional, throughout day)

### Evening (5 minutes)
1. Tap **Mind** tab
2. Rate your stress & clarity (1-5 scale)
3. Answer reflection questions (connection, learning, outdoors, screen time)
4. Share what worked today (optional)
5. Tap **"Save reflection & archive today"**
   - Your day is recorded for future weekly analysis

### Weekly Review (Optional)
1. Tap **Review** tab
2. See your 7-day habit consistency chart
3. Tap **"Generate weekly note ↗"** for coaching insights
4. Review pillar breakdown (what you accomplished this week)

---

## Navigation

The app has **6 tabs** at the bottom (always accessible):

| Tab | Purpose |
|-----|---------|
| **Home** | Daily dashboard — your brief, habits, nutrition summary |
| **Check-in** | Morning Garmin data entry → generates your daily brief |
| **Food** | Meal logging, hydration tracking, smoothie management |
| **Mind** | Evening reflection, cognitive challenges, stress reduction activities |
| **Quit** | Track a habit you're eliminating (e.g., alcohol, late scrolling) |
| **Review** | 7-day trends, habit consistency, weekly coaching notes |

---

## Common Questions

### Q: Where is my data stored?
**A:** All data is stored in your browser's local storage. It never leaves your computer or goes to any server.

### Q: What if I clear my browser cache?
**A:** Your data will be deleted. To prevent this, don't clear cache/cookies for the page with the app. Better yet, back it up (see below).

### Q: Can I access it on my phone?
**A:** Yes! Copy the `Durability-OS` folder to your phone via:
- Dropbox / OneDrive / Google Drive
- Email (zip it first)
- USB transfer
Then open `index.html` on your phone's browser.

### Q: Does it need the internet?
**A:** No. After you open it once, it works completely offline. (External links like NYT Games require internet, but the app itself doesn't.)

### Q: Can I share my data with someone?
**A:** You can back it up (see below). The data is a JSON object in your browser's local storage. Tim can export it as a file if needed.

---

## Data Backup (Optional but Recommended)

If you want to back up your entries:

1. Open the app in your browser
2. Press **F12** to open Developer Tools
3. Click **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click **Local Storage** on the left
5. Click the entry for your `index.html` file
6. Find the key **`durability_os_v1`**
7. Copy the entire value (right-click → Copy)
8. Paste into a text file named `durability_os_backup.json` and save it somewhere safe

**To restore from backup:**
1. Open the Developer Tools (F12) in the app
2. Go to **Application** → **Local Storage**
3. Delete the existing `durability_os_v1` key
4. Paste your backed-up JSON as the new value

---

## Troubleshooting

### The launcher (RUN-DURABILITY-OS.bat) says "Python or Node not found"
- **Solution:** The launcher tried to start a web server but couldn't find the necessary tools
- **Easy fix:** Install Python from https://www.python.org/downloads/
  - During installation, **check the box that says "Add Python to PATH"**
  - After installation, try the launcher again
- **Alternative:** Install Node.js from https://nodejs.org/ instead of Python

### The page is blank/white after the launcher opens
- **Solution:** Wait 2-3 seconds for it to fully load
- If still blank, check your browser console (F12) for errors
- Try refreshing the page (Ctrl+R or ⌘+R)
- Make sure the launcher window is still running in the background (do NOT close it)

### The launcher opened a browser tab but it says "connection refused"
- **Solution:** The web server didn't start properly
- Close the browser and the launcher window
- Try the launcher again
- If it still fails, install Python (see above)

### My data disappeared
- **Solution:** Check if you accidentally cleared browser cache
- If you have a backup (see Data Backup section), you can restore it
- Otherwise, the data may be lost — always back up regularly!

### The styling looks off / buttons look weird
- **Solution:** This is likely a browser rendering issue
- Try refreshing the page (Ctrl+R)
- Try a different browser (Chrome or Edge recommended)
- Close the launcher, delete browser cache, run launcher again

---

## Tips for Success

✅ **Morning routine:** Set a daily reminder to open the app at a consistent time  
✅ **Bookmark it:** In your browser, bookmark the page for instant access  
✅ **Log everything:** The more data you enter, the better your weekly insights  
✅ **Back up weekly:** Export your data every Friday (see Data Backup section)  
✅ **Trust the coaching:** The app reads your readiness data and gives you a smart daily plan  

---

## Support

If you have questions or issues:
1. Check the Troubleshooting section above
2. Verify you extracted the zip file completely
3. Try opening in a different browser (Chrome, Edge, Firefox all work well)
4. Contact Paul Westgate (paul.westgate@) for technical support

---

## What's Included in the Zip

```
Durability-OS/
├── index.html          ← OPEN THIS FILE to start the app
├── favicon.svg
├── icons.svg
└── assets/
    ├── index-*.css     (styling)
    └── index-*.js      (app code)
```

That's it! Just extract and open `index.html`. The app is self-contained and ready to use.

---

## System Requirements

- **Browser:** Chrome, Edge, Firefox, or Safari (any recent version)
- **Storage:** ~1 MB on your computer for the app + data
- **Memory:** No special requirements
- **OS:** Works on Windows, Mac, Linux, iOS, Android
- **Internet:** Not required after first open

---

**Version:** 1.0  
**Last Updated:** May 2026  
**Author:** Paul Westgate, Law Society of Saskatchewan
