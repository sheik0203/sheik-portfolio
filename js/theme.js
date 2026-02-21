/**
 * Theme Toggle Logic
 * Persists theme preference in localStorage and handles UI updates
 */

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;

// Check for saved theme in localStorage or system preference
const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply initial theme
if (currentTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    updateToggleIcons('dark');
}

function updateToggleIcons(theme) {
    const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    const desktopIcon = themeToggle.querySelector('i');
    const mobileIcon = themeToggleMobile.querySelector('i');

    desktopIcon.className = `fas ${iconClass}`;
    mobileIcon.className = `fas ${iconClass}`;
}

function toggleTheme() {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
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
