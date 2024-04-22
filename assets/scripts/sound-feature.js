/* jshint esversion: 11 */

/* Define sound sources */
const soundSources = {
    sound1: "assets/sounds/short-car-ignition.wav",
    sound2: "assets/sounds/car-double-horn.wav",
    police: "assets/sounds/police-siren.mp3",
    nextLevel: "assets/sounds/next-level.mp3",
    gameOver: "assets/sounds/game-over.mp3",
    click: "assets/sounds/click.mp3",
};
/* Function to play sound */
function playSound(sound) {
    const audio = new Audio(soundSources[sound]);
    audio.muted = sounds[sound].muted; // Set the muted state of the sound
    audio.volume = sounds.effectsVolume;
    audio.play();
}
/* Define sound objects */
const sounds = {};
/* Load sounds */
for (const key in soundSources) {
    if (Object.hasOwnProperty.call(soundSources, key)) {
        const soundSrc = soundSources[key];
        sounds[key] = new Audio(soundSrc);
        sounds[key].muted = true; // Start with sounds muted
    }
}
sounds.effectsVolume = 0.3;
/* Define background music */
const backgroundMusicSrc = 'assets/sounds/cyberpunk-getaway-car-karl-casey.mp3';
let backgroundMusic = new Audio(backgroundMusicSrc);
backgroundMusic.muted = true; // Start with background music muted
/* Toggle function for sound1 and sound2 */
function toggleSounds(isPlaying) {
    for (const key in sounds) {
        if (Object.hasOwnProperty.call(sounds, key)) {
            const sound = sounds[key];
            if (isPlaying) {
                sound.muted = false;
            } else {
                sound.muted = true;
            }
        }
    }
}
/* Add event listeners to the DOM elements when the DOM is loaded */
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById('toggleButton');
    const volumeControl = document.getElementById('volumeControl');
    const backgroundMusic = document.getElementById('backgroundMusic');
    // Retrieve volume and play/pause state from localStorage if available
    const savedVolume = localStorage.getItem('bgMusicVolume');
    const isMusicPlaying = localStorage.getItem('bgMusicPlaying');
    const effectsVolumeControl = document.getElementById('effectsVolumeControl');
    /* Set the volume and play/pause state if available */
    if (savedVolume !== null) {
        backgroundMusic.volume = savedVolume;
        volumeControl.value = savedVolume;
    }
    /* Set the effects volume if available */
    if (isMusicPlaying !== null && isMusicPlaying === 'true') {
        backgroundMusic.play();
        toggleButton.textContent = 'Pause Music';
    }
    /* Add event listeners background to save play/pause state to localStorage */
    toggleButton.addEventListener('click', function () {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            toggleButton.textContent = 'Pause Music';
            localStorage.setItem('bgMusicPlaying', 'true');
            toggleSounds(true); // Unmute all sounds when background music is playing
        } else {
            backgroundMusic.pause();
            toggleButton.textContent = 'Play Music';
            localStorage.setItem('bgMusicPlaying', 'false');
            toggleSounds(false); // Mute all sounds when background music is paused
        }
    });
    /* Add event listener to volume control for background music and save volume to localStorage */
    volumeControl.addEventListener('input', function () {
        backgroundMusic.volume = volumeControl.value;
        localStorage.setItem('bgMusicVolume', volumeControl.value);
    });
    // Function to toggle sounds and save the setting to local storage
    function toggleSounds(isPlaying) {
        for (const key in sounds) {
            if (Object.hasOwnProperty.call(sounds, key)) {
                const sound = sounds[key];
                if (isPlaying) {
                    sound.muted = false;
                } else {
                    sound.muted = true;
                }
            }
        }
        // Save sound settings to local storage
        localStorage.setItem('isSoundOn', isPlaying ? 'true' : 'false');
    }

    // Function to initialize sound settings based on local storage or default if not set
    function soundSettings() {
        const isSoundOn = localStorage.getItem('isSoundOn');
        if (isSoundOn === 'true') {
            toggleSounds(true);
        } else {
            toggleSounds(false);
        }
    }
    soundSettings();
});

module.exports = { playSound };

/* Bug: When user goes to a different html page, the sound effects are muted, but the background music continues to play.
    The user needs to click pause/play music toggle button to hear the sound effects again. */
// Working on a solution to fix this bug.


