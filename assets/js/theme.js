// Theme handling
function toggleTheme(event) {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    updateThemeIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThreeJsColors(isDark);

    // Add icon animation
    const icon = document.getElementById('theme-toggle-icon');
    icon.classList.add('rotate-icon');
    setTimeout(() => icon.classList.remove('rotate-icon'), 700);

    // Add pulse effect
    const pulse = document.querySelector('.theme-switch-pulse');
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    pulse.style.setProperty('--x', `${x}px`);
    pulse.style.setProperty('--y', `${y}px`);
    pulse.classList.add('active');
    
    setTimeout(() => {
        pulse.classList.remove('active');
    }, 500);
}

function updateThemeIcon(isDark) {
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (isDark) {
        themeIcon.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    class="transition-all duration-500">
                </path>
            </svg>`;
    } else {
        themeIcon.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646"
                    class="transition-all duration-500">
                </path>
            </svg>`;
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    updateThemeIcon(savedTheme === 'dark');
    updateThreeJsColors(savedTheme === 'dark');
}

function updateThreeJsColors(isDark) {
    const particleColor = isDark ? 0x3b82f6 : 0x2563eb;
    const particleOpacity = isDark ? 0.3 : 0.5;

    if (particles && particles.material) {
        particles.material.color.setHex(particleColor);
        particles.material.opacity = particleOpacity;
    }
    if (navParticles && navParticles.material) {
        navParticles.material.color.setHex(particleColor);
        navParticles.material.opacity = particleOpacity;
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('theme') === null) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', e.matches);
        updateThemeIcon(e.matches);
        updateThreeJsColors(e.matches);
    }
});

// Initialize theme
document.addEventListener('DOMContentLoaded', initTheme);
// ... other theme related functions 