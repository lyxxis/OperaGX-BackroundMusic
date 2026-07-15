// 1. Define your playlist (pointing to the 'music' folder)
const playlist = [
  { title: "Boywithuke - IDGAF", src: "music/TrackTwo.mp3" }
];

// 2. Get DOM elements
const audio = document.getElementById("bg-audio");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const loadingOverlay = document.getElementById("loading-overlay");

// 3. Retrieve saved state from localStorage (fallback to track index 0 and paused state)
let currentTrackIndex = parseInt(localStorage.getItem("currentTrackIndex")) || 0;
let isPlaying = localStorage.getItem("isPlaying") === "true";

if (currentTrackIndex < 0 || currentTrackIndex >= playlist.length) {
  currentTrackIndex = 0;
}

function setLoading(isLoading) {
  loadingOverlay.classList.toggle("visible", isLoading);
}

// 4. Load the active track
function loadTrack(index) {
  setLoading(true);
  audio.src = playlist[index].src;
  songTitle.textContent = `Song: ${playlist[index].title}`;
  localStorage.setItem("currentTrackIndex", index);
}

// 5. Play / Pause Control
function togglePlay() {
  if (audio.paused) {
    setLoading(true);
    audio.play()
      .then(() => {
        isPlaying = true;
        localStorage.setItem("isPlaying", "true");
        playIcon.src = "stop.png"; // Show stop.png while audio plays
      })
      .catch(err => {
        console.log("Autoplay blocked by browser. Click play to start listening!");
      });
  } else {
    audio.pause();
    isPlaying = false;
    localStorage.setItem("isPlaying", "false");
    playIcon.src = "play.png"; // Show play.png while paused
  }
}

// 6. Switch Tracks
function changeTrack(direction) {
  if (direction === "next") {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  } else if (direction === "prev") {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  }
  
  loadTrack(currentTrackIndex);
  
  if (isPlaying) {
    setLoading(true);
    audio.play()
      .then(() => {
        playIcon.src = "stop.png";
      })
      .catch(err => console.log("Playback interrupted. Click play manually."));
  }
}

// --- Event Listeners ---
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", () => changeTrack("next"));
prevBtn.addEventListener("click", () => changeTrack("prev"));

// Loop to the next song automatically when finished
audio.addEventListener("ended", () => changeTrack("next"));
audio.addEventListener("loadstart", () => setLoading(true));
audio.addEventListener("waiting", () => setLoading(true));
audio.addEventListener("canplay", () => setLoading(false));
audio.addEventListener("playing", () => setLoading(false));
audio.addEventListener("pause", () => setLoading(false));

// --- Initialization on Load ---
// Load whichever track was last active
loadTrack(currentTrackIndex);

// Handle the autoplay restore safely
if (isPlaying) {
  setLoading(true);
  audio.play()
    .then(() => {
      playIcon.src = "stop.png";
    })
    .catch(() => {
      // Browser blocked the autoplay on fresh load. Reset state safely.
      isPlaying = false;
      localStorage.setItem("isPlaying", "false");
      playIcon.src = "play.png";
    });
} else {
  playIcon.src = "play.png";
}