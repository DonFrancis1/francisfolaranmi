// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat h3');
                statNumbers.forEach((stat, index) => {
                    const values = ['50+', '100TB+', '99.9%'];
                    const numericValues = [50, 100, 99.9];
                    
                    setTimeout(() => {
                        if (index < 2) {
                            animateCounter(stat, numericValues[index]);
                            setTimeout(() => {
                                stat.textContent = values[index];
                            }, 2000);
                        } else {
                            animateCounter(stat, numericValues[index]);
                            setTimeout(() => {
                                stat.textContent = values[index];
                            }, 2000);
                        }
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stats');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        setTimeout(() => {
            typeWriter(heroSubtitle, 'Data Engineer', 150);
        }, 1000);
    }
});

// Particle animation for hero section
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    .particle {
        pointer-events: none;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }
    
    .hero {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Chart.js for hero section data visualization
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heroChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Simple animated chart using canvas
        let animationId;
        let progress = 0;
        
        function drawChart() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set canvas size
            canvas.width = 300;
            canvas.height = 200;
            
            // Draw bars
            const bars = [
                { x: 50, height: 120, color: '#fbbf24' },
                { x: 100, height: 80, color: '#10b981' },
                { x: 150, height: 150, color: '#3b82f6' },
                { x: 200, height: 100, color: '#f59e0b' },
                { x: 250, height: 90, color: '#ef4444' }
            ];
            
            bars.forEach(bar => {
                const currentHeight = (bar.height * progress) / 100;
                ctx.fillStyle = bar.color;
                ctx.fillRect(bar.x - 15, canvas.height - currentHeight - 20, 30, currentHeight);
            });
            
            // Draw lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            for (let i = 0; i < bars.length - 1; i++) {
                const currentHeight1 = (bars[i].height * progress) / 100;
                const currentHeight2 = (bars[i + 1].height * progress) / 100;
                
                if (i === 0) {
                    ctx.moveTo(bars[i].x, canvas.height - currentHeight1 - 20);
                }
                ctx.lineTo(bars[i + 1].x, canvas.height - currentHeight2 - 20);
            }
            ctx.stroke();
            
            if (progress < 100) {
                progress += 1;
                animationId = requestAnimationFrame(drawChart);
            }
        }
        
        // Start animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && progress === 0) {
                    setTimeout(() => {
                        drawChart();
                    }, 1000);
                }
            });
        });
        
        heroObserver.observe(document.querySelector('.hero'));
    }
});

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill bar animations
function animateSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.transform = 'translateX(0)';
            category.style.opacity = '1';
        }, index * 200);
    });
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

// Add CSS for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);
