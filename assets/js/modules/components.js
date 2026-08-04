/**
 * UI Component Library Module (Modals, Toasts, Hamburgers, Lazy Loading)
 */
window.Components = {
    /**
     * Sticky Navigation toggle drawer for mobile view.
     */
    initMobileMenu(toggleBtn, navMenu) {
        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleBtn.classList.toggle('header__hamburger--active');
            navMenu.classList.toggle('header__nav--active');
        });

        // Close menu on backdrop clicks
        document.addEventListener('click', () => {
            toggleBtn.classList.remove('header__hamburger--active');
            navMenu.classList.remove('header__nav--active');
        });
        
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    },

    /**
     * Display a temporary Toast notification on the bottom-right.
     */
    showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;

        container.appendChild(toast);
        
        // Render slide in
        setTimeout(() => toast.classList.add('toast--show'), 10);

        // Slide out and remove
        setTimeout(() => {
            toast.classList.remove('toast--show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    /**
     * Modal trigger controllers.
     */
    initModal(modalElement, openTriggers, closeTriggers) {
        if (!modalElement) return;

        const openModal = () => {
            modalElement.classList.add('modal--open');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modalElement.classList.remove('modal--open');
            document.body.style.overflow = '';
        };

        openTriggers.forEach(btn => btn.addEventListener('click', openModal));
        closeTriggers.forEach(btn => btn.addEventListener('click', closeModal));

        // Close on backdrop click
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                closeModal();
            }
        });
    },

    /**
     * Lazy Load Image observer.
     */
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy');
                        observer.unobserve(image);
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img.lazy').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
};
