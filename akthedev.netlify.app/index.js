// headers controll
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.content-section');
    const toggleMenu = document.getElementById('toggle-menu');

    // Function to switch active sections
    function switchTab(event) {
        const targetTab = event.target;
        const targetSection = document.getElementById(targetTab.getAttribute('href').substring(1));  // Get section by matching href

        // Remove 'active' class from all sections
        sections.forEach(section => section.classList.remove('active'));

        // Add 'active' class to the selected section
        targetSection.classList.add('active');

        // Close the hamburger menu if it's open
        if (toggleMenu.checked) {
            toggleMenu.checked = false;
        }
    }

    // Add event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', switchTab);
    });

    // Make sure clicking the "Start Learning" button switches to Lessons
    document.querySelector('.btn').addEventListener('click', function () {
        const lessonsTab = document.querySelector('.tab[href="#lessons"]');
        lessonsTab.click();  // Trigger a click on the "Lessons" tab
    });
});

// BACK TO TOP BUTTON JS STARTS HERE 

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// GSAP Animations
window.addEventListener('load', () => {
    gsap.to('.text-content', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.to('.profile-img', {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
});



// Animate elements when they come into view
gsap.to(".glowing-text", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.to(".role-container", {
    opacity: 1,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

// Animate cards using GSAP
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 * (index + 1),
        ease: "power3.out"
    });
});

// Animate skill bars
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach((bar, index) => {
    gsap.to(bar, {
        scaleX: 1,
        duration: 1,
        delay: 0.5 * (index + 1),
        ease: "power3.out"
    });
});

// IntersectionObserver for fade-in animations
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.6s ease'; // Add transition here
        }
    });
}, observerOptions);

// Animate project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Animate section title using GSAP
gsap.from(".section-title", {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
        trigger: ".section-title",
        start: "top 80%"
    }
});

// Observe fade-up elements
const fadeElements = document.querySelectorAll('.fade-up');
fadeElements.forEach(element => {
    observer.observe(element);
});

// Form input animations
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateX(10px)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateX(0)';
    });
});

// Create particles on hover over tech items
function createParticle(x, y, element) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const tx = (Math.random() - 0.5) * 100;
    const ty = -50 - Math.random() * 50;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    element.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseover', (e) => {
        const rect = item.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            createParticle(
                e.clientX - rect.left,
                e.clientY - rect.top,
                item
            );
        }
    });
});

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate cards when they enter viewport
function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        if (isElementInViewport(card) && !card.style.animation) {
            card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
        }
    });
}

// Add hover effect for cards
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x-pos', `${x}px`);
        card.style.setProperty('--y-pos', `${y}px`);
    });
});

// Initial check
animateCards();

// Check on scroll and resize
window.addEventListener('scroll', animateCards);
window.addEventListener('resize', animateCards);


(function () {
    const skillItems = document.querySelectorAll('.skill-box');

    const observerOptions = {
        threshold: 0.5
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.fundamental-level');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(box => {
        skillsObserver.observe(box);
    });

    // Floating shapes animation
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach(shape => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
})();


const previewButtons = document.querySelectorAll('.js-preview');
const modal = document.getElementById('preview-modal');
const modalImage = document.getElementById('preview-image');

previewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const imgSrc = button.closest('.portfolio-item').querySelector('.portfolio-image').src;
        modalImage.src = imgSrc;
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    });
});

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});





//* curser js 
const cursor = document.querySelector('.cursor');
let particles = [];
let hue = 0;

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 4 + 2;
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 2 + 1;
  const lifetime = Math.random() * 500 + 300;
  
  const dx = Math.cos(angle) * velocity;
  const dy = Math.sin(angle) * velocity;
  
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  
  const color = `hsl(${hue}, 100%, 50%)`;
  particle.style.backgroundColor = color;
  particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
  
  document.body.appendChild(particle);
  
  const startTime = Date.now();
  
  function updateParticle() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / lifetime;
    
    if (progress >= 1) {
      particle.remove();
      return;
    }
    
    const currentX = parseFloat(particle.style.left);
    const currentY = parseFloat(particle.style.top);
    
    particle.style.left = (currentX + dx) + 'px';
    particle.style.top = (currentY + dy) + 'px';
    
    const fadeProgress = Math.max(0, 1 - progress);
    particle.style.opacity = fadeProgress;
    particle.style.transform = `scale(${fadeProgress})`;
    
    requestAnimationFrame(updateParticle);
  }
  
  updateParticle();
}

let lastX = 0;
let lastY = 0;
let lastTime = Date.now();

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();
  if (currentTime - lastTime < 16) return; // Limit to ~60 FPS
  
  const x = e.clientX;
  const y = e.clientY;
  
  // Update cursor position
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  
  const dx = x - lastX;
  const dy = y - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  
  if (speed > 1) {
    // Create multiple particles based on movement speed
    const particleCount = Math.min(Math.floor(speed / 2), 5);
    for (let i = 0; i < particleCount; i++) {
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      createParticle(x + offsetX, y + offsetY);
    }
    
    hue = (hue + 1) % 360;
  }
  
  lastX = x;
  lastY = y;
  lastTime = currentTime;
});

// Cleanup particles periodically
setInterval(() => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    if (parseFloat(particle.style.opacity) <= 0.1) {
      particle.remove();
    }
  });
}, 1000);


document.addEventListener('DOMContentLoaded', function() {
    const projectsPerLoad = 8; // Number of projects to show per load
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentlyShown = 0;

    // Initially show first batch of items
    function showInitialItems() {
        for(let i = 0; i < Math.min(projectsPerLoad, portfolioItems.length); i++) {
            portfolioItems[i].classList.add('show');
        }
        currentlyShown = projectsPerLoad;

        // Hide button if all items are shown
        if(currentlyShown >= portfolioItems.length) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    // Load more items when button is clicked
    loadMoreBtn.addEventListener('click', function() {
        const nextItems = Math.min(currentlyShown + projectsPerLoad, portfolioItems.length);
        
        for(let i = currentlyShown; i < nextItems; i++) {
            portfolioItems[i].classList.add('show');
        }
        
        currentlyShown = nextItems;

        // Hide button if all items are shown
        if(currentlyShown >= portfolioItems.length) {
            loadMoreBtn.classList.add('hidden');
        }
    });

    // Initialize
    showInitialItems();
});


document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation and view more clicks
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Add check for mobile menu
            const toggleMenu = document.getElementById('toggle-menu');
            if (toggleMenu && toggleMenu.checked) {
                toggleMenu.checked = false; // Close mobile menu if open
            }
            
            if (targetSection) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active section
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                targetSection.classList.add('active');
            }
        });
    });
});

// Count initial projects
const projectCounter = {
    count: 0,
    
    // Initialize counter
    init() {
        this.updateCount();
        this.addMutationObserver();
    },
    
    // Update project count
    updateCount() {
        const projects = document.querySelectorAll('.portfolio-item');
        this.count = projects.length;
        this.displayCount();
    },
    
    // Display count on page
    displayCount() {
        const projectSection = document.getElementById('project');
        let countDisplay = document.getElementById('project-count');
        
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.id = 'project-count';
            projectSection.insertBefore(countDisplay, projectSection.firstChild);
        }
        
        countDisplay.textContent = `Total Projects: ${this.count}`;
    },
    
    // Watch for DOM changes
    addMutationObserver() {
        const observer = new MutationObserver(() => this.updateCount());
        const gallery = document.querySelector('.portfolio-gallery');
        
        observer.observe(gallery, {
            childList: true,
            subtree: true
        });
    }
};const projectManager = {
    init() {
        this.createSearchBar();
        this.addEventListeners();
        this.updateCount();
    },
    
    createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.innerHTML = `
            <div class="input-wrapper">
                <button class="icon">
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M22 22L20 20" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <input type="text" class="input" placeholder="search.." />
            </div>
            <div id="project-count"></div>
        `;
        
        const projectSection = document.getElementById('project');
        projectSection.insertBefore(searchContainer, projectSection.firstChild);
    },
    
    addEventListeners() {
        const searchInput = document.querySelector('.input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    },
    
    handleSearch(query) {
        const projects = document.querySelectorAll('.portfolio-item');
        query = query.toLowerCase();
        
        projects.forEach(project => {
            const title = project.querySelector('.portfolio-item-title').textContent.toLowerCase();
            project.style.display = title.includes(query) ? 'block' : 'none';
        });
        
        this.updateCount(query);
    },
    
    updateCount(query = '') {
        const projects = document.querySelectorAll('.portfolio-item');
        const count = query ? 
            Array.from(projects).filter(p => p.style.display !== 'none').length : 
            projects.length;
            
        document.getElementById('project-count').textContent = `Total Projects: ${count}`;
    }
};

document.addEventListener('DOMContentLoaded', () => projectManager.init());

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => projectCounter.init());



