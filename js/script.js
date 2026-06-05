// Advanced SPA Router
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        // Setup event listeners
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleNav());
        }

        // Setup page navigation
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigate(page);
            });
        });

        // Setup contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Show home page by default
        this.navigate('home');

        // Add smooth scroll behavior
        this.setupSmoothScroll();

        console.log('Portfolio App Initialized ✨');
    }

    navigate(pageName) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
        }

        // Update nav links active state
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile nav after navigation
        this.closeNav();

        // Scroll to top
        window.scrollTo(0, 0);
    }

    toggleNav() {
        if (this.navLinks.classList.contains('active')) {
            this.closeNav();
        } else {
            this.openNav();
        }
    }

    openNav() {
        this.navLinks.classList.add('active');
    }

    closeNav() {
        this.navLinks.classList.remove('active');
    }

    handleContactForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Show success message
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        btn.style.opacity = '0.8';
        
        // Reset form
        form.reset();
        
        // Restore button text
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 2000);
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
