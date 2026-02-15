// HAL Corporate Website - JavaScript

// =============================
// Dark Mode Toggle
// =============================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// =============================
// Navigation
// =============================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// =============================
// Animated Counter
// =============================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all elements with data-target attribute
document.querySelectorAll('[data-target]').forEach(element => {
    counterObserver.observe(element);
});

// =============================
// Scroll Animations (AOS Alternative)
// =============================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('aos-animate');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', animateOnScroll);
// Run on load
window.addEventListener('load', animateOnScroll);

// =============================
// Product Category Filter
// =============================
const categoryTabs = document.querySelectorAll('.category-tab');
const productCards = document.querySelectorAll('.product-card');

if (categoryTabs.length > 0 && productCards.length > 0) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =============================
// Gallery Filter
// =============================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =============================
// Contact Form Validation
// =============================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Success message (in production, this would send to backend)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// =============================
// Newsletter Form
// =============================
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
    });
});

// =============================
// Smooth Scroll for Anchor Links
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =============================
// Parallax Effect for Hero
// =============================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroPattern = hero.querySelector('.hero-pattern');
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// =============================
// Loading Animation
// =============================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

// =============================
// Performance Optimization
// =============================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============================
// Interactive Stats Cards
// =============================
const statCards = document.querySelectorAll('.stat-card, .financial-card, .dashboard-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// =============================
// Product Card Interactions
// =============================
const productFeatures = document.querySelectorAll('.product-feature');
productFeatures.forEach(feature => {
    const placeholder = feature.querySelector('.product-placeholder');
    if (placeholder) {
        feature.addEventListener('mouseenter', () => {
            placeholder.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        feature.addEventListener('mouseleave', () => {
            placeholder.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// =============================
// Timeline Horizontal Scroll
// =============================
const timelineContainer = document.querySelector('.timeline-container');
if (timelineContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    timelineContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineContainer.style.cursor = 'grabbing';
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });
    
    timelineContainer.addEventListener('mouseleave', () => {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
    });
    
    timelineContainer.addEventListener('mouseup', () => {
        isDown = false;
        timelineContainer.style.cursor = 'grab';
    });
    
    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 2;
        timelineContainer.scrollLeft = scrollLeft - walk;
    });
}

// =============================
// Gallery Item Click (Zoom)
// =============================
const galleryZoomButtons = document.querySelectorAll('.gallery-zoom');
galleryZoomButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        // In production, this would open a lightbox
        alert('Gallery zoom functionality - would open full-screen image viewer');
    });
});

// =============================
// Video Placeholder Click
// =============================
const videoPlaceholders = document.querySelectorAll('.video-placeholder');
videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        // In production, this would open video player
        alert('Video player would open here');
    });
});

// =============================
// Ownership Bar Animation
// =============================
const ownershipBar = document.querySelector('.ownership-bar');
if (ownershipBar) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const segments = ownershipBar.querySelectorAll('.ownership-segment');
                segments.forEach((segment, index) => {
                    setTimeout(() => {
                        segment.style.animation = 'slideIn 0.8s ease forwards';
                    }, index * 200);
                });
                barObserver.unobserve(ownershipBar);
            }
        });
    }, observerOptions);
    
    barObserver.observe(ownershipBar);
}

// =============================
// Circular Progress Charts
// =============================
const circularCharts = document.querySelectorAll('.circular-chart');
circularCharts.forEach(chart => {
    const circle = chart.querySelector('.circle');
    if (circle) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percent = chart.parentElement.getAttribute('data-percent');
                    circle.style.strokeDasharray = `${percent}, 100`;
                    chartObserver.unobserve(chart);
                }
            });
        }, observerOptions);
        
        chartObserver.observe(chart);
    }
});

// =============================
// Add hover effect to all links
// =============================
document.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('nav-link')) {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    }
});

// =============================
// Button Ripple Effect
// =============================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes slideIn {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// =============================
// Resize Handler
// =============================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate animations and positions
        animateOnScroll();
    }, 250);
});

// =============================
// Print Functionality
// =============================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// =============================
// Accessibility Enhancements
// =============================
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus trap for mobile menu
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// =============================
// Console Welcome Message
// =============================
console.log('%c Welcome to HAL India Website ', 'background: #0a2463; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Hindustan Aeronautics Limited - Pioneering Aerospace Excellence Since 1940 ', 'color: #ff6b35; font-size: 14px;');
console.log('%c Built with modern web technologies ', 'color: #3e92cc; font-size: 12px;');

// =============================
// Initialize Everything
// =============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('HAL Website initialized successfully');
    
    // Set initial state
    animateOnScroll();
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

