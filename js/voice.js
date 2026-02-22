/* ============================================
   VOICE INTRO — Audio Playback Controller
   ============================================ */

(function () {
    'use strict';

    const btn = document.getElementById('voice-intro-btn');
    if (!btn) return;

    const audio = new Audio('assets/sounds/intro-voice.mp3');
    audio.volume = 0.85;
    audio.preload = 'auto';

    let isPlaying = false;

    function setPlayState() {
        isPlaying = true;
        btn.classList.add('playing');
    }

    function setIdleState() {
        isPlaying = false;
        btn.classList.remove('playing');
    }

    btn.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            setIdleState();
        } else {
            audio.play()
                .then(setPlayState)
                .catch(function (e) {
                    console.warn('Audio playback blocked:', e);
                });
        }
    });

    audio.addEventListener('ended', setIdleState);
})();
