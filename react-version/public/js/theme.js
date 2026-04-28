/**
 * Theme Toggle Logic
 * Persists theme preference in localStorage and handles UI updates
 */

(function() {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    const getSavedTheme = () => localStorage.getItem('theme');
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.removeAttribute('data-theme');
        }
        updateToggleIcons(theme);
    }

    function updateToggleIcons(theme) {
        const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        
        // Find both desktop and mobile toggles
        const toggles = [
            document.getElementById('theme-toggle'),
            document.getElementById('theme-toggle-mobile')
        ];

        toggles.forEach(toggle => {
            if (toggle) {
                const icon = toggle.querySelector('i');
                if (icon) icon.className = `fas ${iconClass}`;
            }
        });
    }

    function toggleTheme() {
        const currentTheme = getSavedTheme() || (root.classList.contains('dark') ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // Initialize
    const initialTheme = getSavedTheme() || getSystemTheme();
    applyTheme(initialTheme);

    // Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        const toggles = [
            document.getElementById('theme-toggle'),
            document.getElementById('theme-toggle-mobile')
        ];

        toggles.forEach(toggle => {
            if (toggle) toggle.addEventListener('click', toggleTheme);
        });
        
        updateToggleIcons(initialTheme);
    });

    // Listen for changes from other tabs/parent
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            applyTheme(e.newValue || 'dark');
        }
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getSavedTheme()) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();
