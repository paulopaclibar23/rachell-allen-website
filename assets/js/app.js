/**
 * Global Application Bootstrapper & Interaction Runner
 */
document.addEventListener('DOMContentLoaded', () => {
    // 0. Auto-inject CSRF tokens to all POST forms
    const csrfTokenVal = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfTokenVal) {
        document.querySelectorAll('form[method="POST"]').forEach(form => {
            if (!form.querySelector('input[name="csrf_token"]')) {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'csrf_token';
                hiddenInput.value = csrfTokenVal;
                form.appendChild(hiddenInput);
            }
        });
    }

    // 0.5. Admin Theme Switcher Toggle Handler
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('theme-dark');
            if (isDark) {
                document.documentElement.classList.remove('theme-dark');
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('admin_theme', 'light');
            } else {
                document.documentElement.classList.add('theme-dark');
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('admin_theme', 'dark');
            }
        });
    }

    // 1. Initialize mobile menu and hamburger drawer
    const toggleBtn = document.querySelector('.header__hamburger');
    const navMenu = document.querySelector('.header__nav');
    if (toggleBtn && navMenu && window.Components) {
        window.Components.initMobileMenu(toggleBtn, navMenu);
    }

    // 2. Initialize image lazy loading
    if (window.Components) {
        window.Components.initLazyLoading();
    }

    // 3. Initialize article reading progress bar indicator
    const progressIndicator = document.querySelector('.progress-bar-indicator');
    if (progressIndicator) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressIndicator.style.width = scrolled + '%';
        });
    }

    // 4. Initialize Course Catalog regional tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetPanelId = btn.dataset.tab;
                
                // Toggle active buttons
                tabButtons.forEach(b => b.classList.remove('tab-btn--active'));
                btn.classList.add('tab-btn--active');

                // Toggle active panels
                tabPanels.forEach(p => {
                    if (p.id === targetPanelId) {
                        p.classList.add('tab-panel--active');
                    } else {
                        p.classList.remove('tab-panel--active');
                    }
                });
            });
        });
    }

    // 5. Initialize Newsletter Subscription Validator
    const newsletterForm = document.querySelector('.footer__newsletter-form');
    if (newsletterForm && window.Validation && window.Components) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.footer__newsletter-input');
            const email = input.value.trim();

            if (!window.Validation.isValidEmail(email)) {
                window.Components.showToast('Please enter a valid email address.', 'error');
                input.focus();
                return;
            }

            window.Components.showToast('Thank you! You have subscribed to our newsletter notifications.');
            input.value = '';
        });
    }
});
