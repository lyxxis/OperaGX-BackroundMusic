# Opera GX Background Music Mod

A custom Opera GX mod that adds background music, plus a small local player UI for previewing tracks.

## Features
- Opera GX mod package (`manifest.json`) with background music payload
- Local web player (`index.html`) with play/pause, previous, and next controls
- Track loading overlay and persistent playback state via `localStorage`

## Requirements
- Opera GX installed
- This project downloaded or cloned locally

## How to Use in Opera GX
1. Download this repository as ZIP and extract it, or clone it:
   ```bash
   git clone https://github.com/lyxxis/OperaGX-BackroundMusic.git
   ```
2. Open Opera GX.
3. Go to Mods and choose to load/import a local mod (Developer/Local mode).
4. Select the project folder that contains `manifest.json`.
5. Enable the mod.

Note: The mod currently points to:
- `music/TrackTwo.mp3`

This is configured in `manifest.json` under:
- `mod.payload.background_music`

## Use the Local Player (Optional)
You can preview music locally in your browser.

### Option 1: Run batch file (Windows)
- Double-click `open-player.bat`

### Option 2: Open directly
- Open `index.html` in your browser

## Customize Tracks
### Update Opera GX mod track
Edit `manifest.json`:
```json
"background_music": [
  "music/TrackTwo.mp3"
]
```
Replace the file path with your own track in the `music/` folder.

### Update local player playlist
Edit `script.js` and change the `playlist` array, for example:
```js
const playlist = [
  { title: "Track 1", src: "music/TrackOne.mp3" },
  { title: "Track 2", src: "music/TrackTwo.mp3" }
];
```

## Project Structure
- `manifest.json`: Opera GX mod manifest
- `music/`: audio files used by the mod/player
- `index.html`, `style.css`, `script.js`: local preview player
- `open-player.bat`: convenience launcher for the local player
- `LICENSE`: MIT license

## License
MIT License. Attribution is preserved through the included copyright and license notice.
