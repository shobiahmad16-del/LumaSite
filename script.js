// Update current year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const rootElement = document.documentElement;

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    if (rootElement.hasAttribute('data-theme')) {
        rootElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
