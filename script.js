// AOS removed
// Hover Spotlight Effect in Hero Section
const heroSection = document.getElementById('hero');
const spotlight = document.getElementById('spotlight');

if (heroSection && spotlight) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        spotlight.style.setProperty('--x', `${x}%`);
        spotlight.style.setProperty('--y', `${y}%`);
    });
}

// Expandable Cards Logic
const expandCards = document.querySelectorAll('.expand-card');
expandCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all
        expandCards.forEach(c => c.classList.remove('active'));
        // Add to clicked
        card.classList.add('active');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // 1. Horizontal Scroll for Global Network Section
    const horizontalSection = document.querySelector('.network-section');
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');

    if (horizontalSection && horizontalContainer) {
        // Calculate total scroll distance (width of container minus viewport width)
        function getScrollAmount() {
            let containerWidth = horizontalContainer.scrollWidth;
            return -(containerWidth - window.innerWidth);
        }

        const tween = gsap.to(horizontalContainer, {
            x: getScrollAmount,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: horizontalSection,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });
    }

    // 2. Sticky Scroll Content Fade In/Out (Technology Section)
    const scrollCards = gsap.utils.toArray('.scroll-card');

    scrollCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%", // When the top of the card hits 80% down the viewport
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
            opacity: 0,
            y: 50,
            duration: 0.5
        });
    });

    // 3. Stacking Cards Parallax (Sustainability Section)
    const stackCards = gsap.utils.toArray('.stack-card');

    stackCards.forEach((card, i) => {
        ScrollTrigger.create({
            trigger: card,
            start: `top ${100 + (i * 30)}px`,
            pin: true,
            pinSpacing: false,
            endTrigger: ".sustainability-section",
            end: "bottom bottom",
        });
    });
});

// 4. Bento Box Entry Animations
const bentoWrapper = document.querySelector('.bento-wrapper');

if (bentoWrapper) {
    const bentoTl = gsap.timeline({ delay: 0.1 });
    
    // Animate the main layout shapes
    bentoTl.fromTo('.bento-light-shape', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0
    )
    .fromTo('.bento-image-wrapper', 
        { x: 40, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.2
    )
    .fromTo('.bento-bottom-shape', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.4
    );
      
    // Animate internal content elements
    bentoTl.fromTo(['.bento-title', '.bento-subtitle'], 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.5
    )
    .fromTo('.bento-search-bar', 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.7
    )
    .fromTo('.bento-glass-card', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.8
    )
    .fromTo('.service-card', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)" }, 0.9
    );
}

// 5. Sticky Header Logic
const stickyHeader = document.getElementById('sticky-header');
if (stickyHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    });
}

// 6. Hamburger Menu Logic (Mobile)
const stickyHamburger = document.querySelector('.sticky-hamburger');
const stickyLinks = document.querySelector('.sticky-links');
const menuCloseButtons = document.querySelectorAll('.menu-close');

function toggleMenu() {
    if (stickyLinks) {
        stickyLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        const header = stickyLinks.closest('header');
        if (header) header.classList.toggle('menu-open');
    }
}

function closeMenu() {
    if (stickyLinks) {
        stickyLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
        const header = stickyLinks.closest('header');
        if (header) header.classList.remove('menu-open');
    }
}

if (stickyHamburger && stickyLinks) {
    stickyHamburger.addEventListener('click', toggleMenu);
}

menuCloseButtons.forEach(btn => {
    btn.addEventListener('click', closeMenu);
});

const bentoHamburger = document.querySelector('.bento-hamburger');
const bentoNav = document.querySelector('.bento-nav');
if (bentoHamburger && bentoNav) {
    bentoHamburger.addEventListener('click', () => {
        bentoNav.classList.toggle('active');
    });
}

// 6a. Standard Page Hamburger (Mobile Menu Overlay)
const pageHamburger = document.querySelector('.page-hamburger');
const pageHeader = document.querySelector('.header-section');
if (pageHamburger && pageHeader) {
    pageHamburger.addEventListener('click', () => {
        const isOpen = pageHeader.classList.toggle('menu-open');
        if (isOpen) {
            pageHamburger.classList.remove('fa-bars');
            pageHamburger.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden'; // block scrolling
        } else {
            pageHamburger.classList.remove('fa-xmark');
            pageHamburger.classList.add('fa-bars');
            document.body.style.overflow = ''; // restore scrolling
        }
    });
}

// 6. Background Animation Canvas (Elegant Floating Nodes)
const canvas = document.getElementById('bg-net');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5, // Tiny elegant dots
            vx: (Math.random() - 0.5) * 0.2, // Very slow movement
            vy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.4 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges seamlessly
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 84, 65, ${p.alpha})`; // Premium dark green dots
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// 7. Clear forms on back navigation (bfcache & history)
window.addEventListener('pageshow', function(event) {
    let isBack = event.persisted;
    if (!isBack && window.performance) {
        if (window.performance.getEntriesByType) {
            const nav = window.performance.getEntriesByType('navigation')[0];
            if (nav && nav.type === 'back_forward') isBack = true;
        } else if (window.performance.navigation && window.performance.navigation.type === 2) {
            isBack = true;
        }
    }
    if (isBack) {
        document.querySelectorAll('form').forEach(f => f.reset());
        document.querySelectorAll('input').forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button' && !input.hasAttribute('value')) {
                input.value = '';
            }
        });
    }
});
