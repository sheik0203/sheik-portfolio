/**
 * Theme Toggle Logic
 * Persists theme preference in localStorage and handles UI updates
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const bodyElement = document.body;

    // Check for saved theme in localStorage or system preference
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const currentTheme = getInitialTheme();

    // Apply initial theme
    if (currentTheme === 'dark') {
        bodyElement.setAttribute('data-theme', 'dark');
    } else {
        bodyElement.removeAttribute('data-theme');
    }
    updateToggleIcons(currentTheme);

    function updateToggleIcons(theme) {
        const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';

        if (themeToggle) {
            const desktopIcon = themeToggle.querySelector('i');
            if (desktopIcon) desktopIcon.className = `fas ${iconClass}`;
        }

        if (themeToggleMobile) {
            const mobileIcon = themeToggleMobile.querySelector('i');
            if (mobileIcon) mobileIcon.className = `fas ${iconClass}`;
        }
    }

    // Audio for click sound
    const clickSound = new Audio('assets/sounds/mixkit-camera-shutter-click-1133.wav');
    clickSound.volume = 0.2; // Set low, pleasant volume

    function toggleTheme() {
        // Play click sound
        clickSound.currentTime = 0; // Reset to start for rapid clicks
        clickSound.play().catch(err => console.log('Audio play failed:', err));

        const isDark = bodyElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        if (newTheme === 'dark') {
            bodyElement.setAttribute('data-theme', 'dark');
        } else {
            bodyElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', newTheme);
        updateToggleIcons(newTheme);
    }

    // Event Listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
});
