/**
 * LUMASITE — Advanced Motion System
 * Semua animasi diterapkan otomatis dari JS tanpa mengubah HTML.
 * GPU-optimized, < 500ms duration, ease-out easing.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. SCROLL REVEAL — Otomatis mendeteksi elemen & memberi
          efek fade-up staggered saat masuk viewport.
          (Ubah SELECTORS untuk menambah/mengurangi target elemen)
       ========================================================== */
    const REVEAL_SELECTORS = [
        '.portfolio-card',
        '.demo-card',
        '.deliverables-card',
        '.testimonial-card',
        '.section-header',
        '.ba-card',
        '.lead-capture-card',
        '.faq-container'
    ];

    const revealTargets = document.querySelectorAll(REVEAL_SELECTORS.join(','));

    // Tambahkan kelas .scroll-reveal dan staggered delay otomatis
    revealTargets.forEach((el, i) => {
        el.classList.add('scroll-reveal');
        // Staggered: elemen dalam grid yang sama diberi delay bertahap
        const siblings = el.parentElement.querySelectorAll(':scope > ' + el.tagName.toLowerCase() + '.' + el.classList[0]);
        const index = Array.from(siblings).indexOf(el);
        if (index > 0) {
            el.style.transitionDelay = (index * 80) + 'ms';
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));


    /* ==========================================================
       2. HERO PARALLAX BACKGROUND — Inject shapes & animate
          on scroll. Shapes bergerak dengan kecepatan berbeda.
       ========================================================== */
    const hero = document.querySelector('.hero');
    if (hero) {
        // Inject parallax background container
        const bg = document.createElement('div');
        bg.className = 'hero-parallax-bg';
        bg.innerHTML = `
            <div class="shape" style="width:420px;height:420px;background:var(--accent);top:-120px;right:-80px;"></div>
            <div class="shape" style="width:300px;height:300px;background:#818cf8;bottom:-60px;left:-60px;"></div>
        `;
        hero.prepend(bg);

        const shapes = bg.querySelectorAll('.shape');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y < 900) {
                        shapes[0].style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
                        shapes[1].style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }


    /* ==========================================================
       3. BUTTON RIPPLE EFFECT — Efek riak saat tombol diklik.
          Otomatis diterapkan ke semua tombol CTA.
       ========================================================== */
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-large, .btn-demo')
        .forEach(btn => {
            btn.addEventListener('click', function(e) {
                const existing = this.querySelector('.ripple');
                if (existing) existing.remove();

                const circle = document.createElement('span');
                const d = Math.max(this.clientWidth, this.clientHeight);
                const r = d / 2;
                circle.style.width = circle.style.height = d + 'px';
                circle.style.left = (e.clientX - this.getBoundingClientRect().left - r) + 'px';
                circle.style.top = (e.clientY - this.getBoundingClientRect().top - r) + 'px';
                circle.className = 'ripple';
                this.appendChild(circle);

                setTimeout(() => circle.remove(), 500);
            });
        });


    /* ==========================================================
       4. STICKY NAVBAR
       ========================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });


    /* ==========================================================
       5. DARK/LIGHT THEME TOGGLE
       ========================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const moon = document.querySelector('.moon-icon');
    const sun = document.querySelector('.sun-icon');

    const setThemeIcons = (dark) => {
        if (moon) moon.style.display = dark ? 'none' : 'block';
        if (sun) sun.style.display = dark ? 'block' : 'none';
    };

    // Init theme
    const prefersDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
        setThemeIcons(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                setThemeIcons(false);
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                setThemeIcons(true);
            }
        });
    }


    /* ==========================================================
       6. MOBILE MENU
       ========================================================== */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    }


    /* ==========================================================
       7. LEAD CAPTURE FORM
       ========================================================== */
    const form = document.getElementById('preview-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Request Received ✓';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';
                form.reset();

                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }


    /* ==========================================================
       8. FAQ ACCORDION
       ========================================================== */
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

});
