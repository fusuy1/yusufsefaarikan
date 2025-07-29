// Mobile-optimized preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    // Faster preloader on mobile
    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 1500 : 2000;
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, delay);
});

// Enhanced mobile navbar
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Mobile-optimized smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 70 : 80; // Account for mobile navbar height
            
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect for mobile
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = window.innerWidth <= 768 ? 50 : 100;
    
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile-optimized active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 120 : 200;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - offset)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Touch-optimized counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / 150; // Faster on mobile
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 10);
        } else {
            counter.innerText = target;
        }
    });
}

// Mobile-optimized intersection observer
const mobileObserverOptions = {
    threshold: window.innerWidth <= 768 ? 0.05 : 0.1, // Lower threshold for mobile
    rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
};

const mainObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            if (entry.target.classList.contains('about')) {
                animateCounters();
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('animate-in');
            }
        }
    });
}, mobileObserverOptions);

// Observe elements with mobile-optimized settings
document.querySelectorAll('section, .timeline-item, .skill-category, .achievement-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = window.innerWidth <= 768 ? 'translateY(30px)' : 'translateY(50px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    mainObserver.observe(el);
});

// Mobile-optimized skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const delay = window.innerWidth <= 768 ? 100 : 200;
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, delay);
    });
}

// Touch-optimized floating elements
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`; // Faster sequence on mobile
    });
}

// Reduced parallax for mobile performance
window.addEventListener('scroll', function() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) { // Only apply parallax on desktop
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Mobile-optimized typing effect
function typeWriterEffect() {
    const titleMain = document.querySelector('.title-main');
    const text = titleMain.textContent;
    const isMobile = window.innerWidth <= 768;
    
    titleMain.textContent = '';
    titleMain.style.borderRight = '2px solid';
    
    let i = 0;
    const speed = isMobile ? 80 : 100; // Faster on mobile
    
    const timer = setInterval(function() {
        if (i < text.length) {
            titleMain.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                titleMain.style.borderRight = 'none';
            }, 1000);
        }
    }, speed);
}

// Enhanced mobile form handling
document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        // Better mobile alert
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            showMobileAlert('Lütfen tüm alanları doldurunuz.');
        } else {
            alert('Lütfen tüm alanları doldurunuz.');
        }
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Gönderiliyor...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            showMobileAlert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.');
        } else {
            alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.');
        }
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Custom mobile alert
function showMobileAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        z-index: 10000;
        max-width: 90%;
        text-align: center;
        font-family: var(--font-family);
    `;
    
    alertDiv.innerHTML = `
        <p style="margin: 0 0 15px 0; color: var(--text-primary);">${message}</p>
        <button onclick="this.parentElement.remove()" style="
            background: var(--bg-gradient);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        ">Tamam</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Reduced particle count for mobile performance
function createParticles() {
    const hero = document.querySelector('.hero');
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 20 : 50; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Optimized cursor effect (disabled on touch devices)
function createCursorEffect() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-effect';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(99, 102, 241, 0.2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(99, 102, 241, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(99, 102, 241, 0.2)';
            });
        });
    }
}

// Mobile-optimized text reveal
function revealText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) { // Only apply on desktop for performance
        textElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            const chars = text.split('');
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.3s ease ${index * 0.02}s`;
                element.appendChild(span);
            });
        });
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(el => textObserver.observe(el));
    }
}

// Mobile-optimized initialization
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    const delay = isMobile ? 1800 : 2500;
    
    setTimeout(() => {
        typeWriterEffect();
    }, delay);
    
    animateFloatingElements();
    createParticles();
    createCursorEffect();
    
    if (!isMobile) {
        revealText();
    }
});

// Touch-optimized scroll to top
function createScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    const isMobile = window.innerWidth <= 768;
    const size = isMobile ? '45px' : '50px';
    const bottom = isMobile ? '20px' : '30px';
    const right = isMobile ? '20px' : '30px';
    
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: ${bottom};
        right: ${right};
        width: ${size};
        height: ${size};
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        font-size: ${isMobile ? '1rem' : '1.2rem'};
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        const threshold = isMobile ? 300 : 500;
        if (window.scrollY > threshold) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTop();

// Mobile performance optimizations
if (window.innerWidth <= 768) {
    // Reduce animation duration for better performance
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    
    // Disable some heavy animations on very small screens
    if (window.innerWidth <= 360) {
        const style = document.createElement('style');
        style.textContent = `
            .profile-ring { animation: none !important; }
            .float-element { animation-duration: 6s !important; }
        `;
        document.head.appendChild(style);
    }
}

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
        
        // Recalculate heights and positions
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.height = window.innerWidth <= 768 ? '70px' : '80px';
        }
    }, 500);
});

// Optimize scroll performance on mobile
let ticking = false;

function updateScrollEffects() {
    // Update navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = window.innerWidth <= 768 ? 50 : 100;
    
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll to top button
    const scrollBtn = document.querySelector('.scroll-to-top');
    const threshold = window.innerWidth <= 768 ? 300 : 500;
    
    if (scrollBtn) {
        if (window.scrollY > threshold) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add viewport meta tag if not present for proper mobile scaling
if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewportMeta);
}

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}



// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero title
function typeWriterEffect() {
    const titleMain = document.querySelector('.title-main');
    const text = titleMain.textContent;
    titleMain.textContent = '';
    titleMain.style.borderRight = '2px solid';
    
    let i = 0;
    const timer = setInterval(function() {
        if (i < text.length) {
            titleMain.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                titleMain.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Form submission
document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Lütfen tüm alanları doldurunuz.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Gönderiliyor...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Particle system for background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Mouse cursor effect
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'rgba(99, 102, 241, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(99, 102, 241, 0.2)';
        });
    });
}

// Text reveal animation
function revealText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 0.02}s`;
            element.appendChild(span);
        });
    });
    
    // Trigger text reveal on scroll
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => textObserver.observe(el));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect after preloader
    setTimeout(() => {
        typeWriterEffect();
    }, 2500);
    
    // Initialize floating elements animation
    animateFloatingElements();
    
    // Create particles
    createParticles();
    
    // Create cursor effect
    createCursorEffect();
    
    // Initialize text reveal
    revealText();
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
createScrollToTop();

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'all 0.3s ease';
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.textContent = `© ${currentYear} Yusuf Sefa Arıkan. Tüm hakları saklıdır.`;
    }
});

// Add hover effects to floating elements
document.querySelectorAll('.float-element').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) translateY(-10px)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);
