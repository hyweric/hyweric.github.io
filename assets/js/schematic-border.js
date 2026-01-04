// Simple Schematic Border Animation Controller - Phase 1
class SchematicBorderController {
  constructor() {
    this.initialized = false;
    this.scrollAmount = 0;
    this.maxScroll = 1300; // Doubled from 650 to slow down animation
    this.animationElements = [];
    this.animationComplete = false;
    this.scrollUnlocked = false;
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    // Wait for the page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Find the profile section
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) {
      console.log('About section not found, retrying...');
      setTimeout(() => this.setup(), 500);
      return;
    }

    this.createBorderElements(aboutSection);
    this.setupScrollListener();
    this.setupAnimationTimeline();
    this.initialized = true;
  }

  createBorderElements(container) {
    // Create the main container for border elements
    const borderContainer = document.createElement('div');
    borderContainer.className = 'schematic-border-container';

    // Create left vertical border line
    const leftBorder = document.createElement('div');
    leftBorder.className = 'schematic-border-left';
    borderContainer.appendChild(leftBorder);

    // Create right vertical border line
    const rightBorder = document.createElement('div');
    rightBorder.className = 'schematic-border-right';
    borderContainer.appendChild(rightBorder);

    // Create left horizontal connector
    const leftHorizontal = document.createElement('div');
    leftHorizontal.className = 'schematic-border-horizontal-left';
    borderContainer.appendChild(leftHorizontal);

    // Create right horizontal connector
    const rightHorizontal = document.createElement('div');
    rightHorizontal.className = 'schematic-border-horizontal-right';
    borderContainer.appendChild(rightHorizontal);

    // Create center vertical line
    const centerVertical = document.createElement('div');
    centerVertical.className = 'schematic-border-center';
    borderContainer.appendChild(centerVertical);

    // Create junction circles
    const leftJunction = document.createElement('div');
    leftJunction.className = 'schematic-border-junction-left';
    borderContainer.appendChild(leftJunction);

    const rightJunction = document.createElement('div');
    rightJunction.className = 'schematic-border-junction-right';
    borderContainer.appendChild(rightJunction);

    const centerJunction = document.createElement('div');
    centerJunction.className = 'schematic-border-junction-center';
    borderContainer.appendChild(centerJunction);

    // Create final bottom circle
    const bottomCircle = document.createElement('div');
    bottomCircle.className = 'schematic-border-circle pulse';
    borderContainer.appendChild(bottomCircle);

    // Create electrical ground symbol (static, always visible)
    const groundSymbol = document.createElement('div');
    groundSymbol.className = 'schematic-border-ground';
    borderContainer.appendChild(groundSymbol);

    // Create second horizontal line for ground symbol
    const groundLine2 = document.createElement('div');
    groundLine2.className = 'schematic-border-ground-line2';
    borderContainer.appendChild(groundLine2);

    // Create third horizontal line for ground symbol
    const groundLine3 = document.createElement('div');
    groundLine3.className = 'schematic-border-ground-line3';
    borderContainer.appendChild(groundLine3);

    // Add to the about section
    container.appendChild(borderContainer);
    
    this.borderContainer = borderContainer;
    
    // Store references to animation elements
    this.animationElements = [
      { element: leftBorder, startAt: 0, duration: 400 }, // Doubled
      { element: rightBorder, startAt: 100, duration: 400 }, // Doubled
      { element: leftJunction, startAt: 500, duration: 100 }, // Doubled
      { element: rightJunction, startAt: 540, duration: 100 }, // Doubled
      { element: leftHorizontal, startAt: 600, duration: 300 }, // Doubled
      { element: rightHorizontal, startAt: 640, duration: 300 }, // Doubled
      { element: centerJunction, startAt: 900, duration: 100 }, // Doubled
      { element: centerVertical, startAt: 1000, duration: 300 }, // Doubled
      { element: bottomCircle, startAt: 1200, duration: 100 } // Doubled
      // Ground symbol elements are static and don't animate
    ];
  }

  setupScrollListener() {
    // Prevent default scrolling behavior but allow animation triggering
    document.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
    document.addEventListener('touchmove', this.handleTouch.bind(this), { passive: false });
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  setupAnimationTimeline() {
    // Set initial state - all elements hidden
    this.animationElements.forEach(item => {
      item.element.style.opacity = '0';
      if (item.element.className.includes('horizontal')) {
        item.element.style.transform = 'scaleX(0)';
      } else if (item.element.className.includes('center')) {
        item.element.style.transform = 'scaleY(0)';
      } else if (item.element.className.includes('junction') || item.element.className.includes('circle')) {
        item.element.style.transform = 'scale(0)';
        item.element.style.transformOrigin = 'center';
      } else {
        item.element.style.transform = 'scaleY(0)';
      }
    });
  }

  handleScroll(event) {
    // Only prevent scrolling if we're on the about section and animation isn't complete
    const aboutSection = document.querySelector('#about');
    if (aboutSection && this.isInViewport(aboutSection) && !this.scrollUnlocked) {
      event.preventDefault();
      
      // Add to scroll amount based on scroll direction
      if (event.deltaY > 0) {
        this.scrollAmount += Math.abs(event.deltaY) * 2; // Scroll down
      } else if (event.deltaY < 0) {
        this.scrollAmount -= Math.abs(event.deltaY) * 2; // Scroll up
      }
      
      // Clamp scroll amount between 0 and maxScroll
      this.scrollAmount = Math.max(0, Math.min(this.scrollAmount, this.maxScroll));
      
      this.updateAnimationProgress();
      
      // Check if animation is complete and trigger electricity flow
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        this.triggerElectricityFlow(); // Immediate, no delay
      }
    }
  }

  handleTouch(event) {
    // Handle touch scrolling for mobile devices
    const aboutSection = document.querySelector('#about');
    if (aboutSection && this.isInViewport(aboutSection) && !this.scrollUnlocked) {
      event.preventDefault();
      
      // For touch, we'll increment scroll amount
      this.scrollAmount += 50;
      this.scrollAmount = Math.min(this.scrollAmount, this.maxScroll);
      this.updateAnimationProgress();
      
      // Check if animation is complete and trigger electricity flow
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        this.triggerElectricityFlow(); // Immediate, no delay
      }
    }
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  resetAnimation() {
    this.scrollAmount = 0;
    this.animationComplete = false;
    this.scrollUnlocked = false;
    this.updateAnimationProgress();
  }

  handleKeydown(event) {
    // Prevent scrolling with arrow keys, page down, space, etc. only if animation isn't complete
    const aboutSection = document.querySelector('#about');
    if (aboutSection && this.isInViewport(aboutSection) && !this.scrollUnlocked) {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.includes(event.keyCode)) {
        event.preventDefault();
        
        // Adjust scroll amount based on key
        if ([32, 34, 40].includes(event.keyCode)) { // Space, Page Down, Down Arrow
          this.scrollAmount += 100;
        } else if ([33, 38].includes(event.keyCode)) { // Page Up, Up Arrow
          this.scrollAmount -= 100;
        }
        
        this.scrollAmount = Math.max(0, Math.min(this.scrollAmount, this.maxScroll));
        this.updateAnimationProgress();
        
        // Check if animation is complete and unlock scrolling
        if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
          this.animationComplete = true;
          setTimeout(() => {
            this.unlockScrollAndNavigate();
          }, 500);
        }
      }
    }
  }

  updateAnimationProgress() {
    const progress = this.scrollAmount / this.maxScroll;
    
    this.animationElements.forEach(item => {
      const elementStart = item.startAt / this.maxScroll;
      const elementEnd = (item.startAt + item.duration) / this.maxScroll;
      
      if (progress >= elementStart) {
        if (progress >= elementEnd) {
          // Element fully animated
          item.element.style.opacity = '1';
          if (item.element.className.includes('horizontal')) {
            item.element.style.transform = 'scaleX(1)';
          } else if (item.element.className.includes('center')) {
            item.element.style.transform = 'scaleY(1)';
          } else if (item.element.className.includes('extended-line')) {
            item.element.style.transform = 'scaleY(1)';
          } else if (item.element.className.includes('junction') || item.element.className.includes('circle') || item.element.className.includes('arrow')) {
            item.element.style.transform = 'scale(1)';
            item.element.style.transformOrigin = 'center';
          } else {
            item.element.style.transform = 'scaleY(1)';
          }
        } else {
          // Element partially animated
          const elementProgress = (progress - elementStart) / (elementEnd - elementStart);
          item.element.style.opacity = Math.min(1, elementProgress * 2); // Fade in faster
          
          if (item.element.className.includes('horizontal')) {
            item.element.style.transform = `scaleX(${elementProgress})`;
          } else if (item.element.className.includes('center')) {
            item.element.style.transform = `scaleY(${elementProgress})`;
          } else if (item.element.className.includes('extended-line')) {
            item.element.style.transform = `scaleY(${elementProgress})`;
          } else if (item.element.className.includes('junction') || item.element.className.includes('circle') || item.element.className.includes('arrow')) {
            // Ensure all junctions, circles, and arrows use scale() for uniform growth animation
            item.element.style.transform = `scale(${elementProgress})`;
            item.element.style.transformOrigin = 'center';
          } else {
            item.element.style.transform = `scaleY(${elementProgress})`;
          }
        }
      } else {
        // Element not yet started
        item.element.style.opacity = '0';
        if (item.element.className.includes('horizontal')) {
          item.element.style.transform = 'scaleX(0)';
        } else if (item.element.className.includes('center')) {
          item.element.style.transform = 'scaleY(0)';
        } else if (item.element.className.includes('extended-line')) {
          item.element.style.transform = 'scaleY(0)';
        } else if (item.element.className.includes('junction') || item.element.className.includes('circle') || item.element.className.includes('arrow')) {
          item.element.style.transform = 'scale(0)';
          item.element.style.transformOrigin = 'center';
        } else {
          item.element.style.transform = 'scaleY(0)';
        }
      }
    });
  }

  triggerElectricityFlow() {
    // Add transition class to all elements first (including ground symbol)
    const allElements = document.querySelectorAll('.schematic-border-left, .schematic-border-right, .schematic-border-horizontal-left, .schematic-border-horizontal-right, .schematic-border-center, .schematic-border-junction-left, .schematic-border-junction-right, .schematic-border-junction-center, .schematic-border-circle, .schematic-border-ground, .schematic-border-ground-line2, .schematic-border-ground-line3');
    
    allElements.forEach(element => {
      element.classList.add('electricity-transition');
    });

    // Apply electricity flow animation in new order - vertical first, then horizontal, then middle, then ground
    const elements = [
      // Top vertical lines light up first
      { element: document.querySelector('.schematic-border-left'), delay: 0 },
      { element: document.querySelector('.schematic-border-right'), delay: 0 },
      { element: document.querySelector('.schematic-border-junction-left'), delay: 100 },
      { element: document.querySelector('.schematic-border-junction-right'), delay: 100 },
      // Then horizontal lines
      { element: document.querySelector('.schematic-border-horizontal-left'), delay: 200 },
      { element: document.querySelector('.schematic-border-horizontal-right'), delay: 200 },
      { element: document.querySelector('.schematic-border-junction-center'), delay: 300 },
      // Then middle vertical line and circle
      { element: document.querySelector('.schematic-border-center'), delay: 400 },
      { element: document.querySelector('.schematic-border-circle'), delay: 500 },
      // Finally ground symbol (arrow) lights up last
      { element: document.querySelector('.schematic-border-ground'), delay: 600 },
      { element: document.querySelector('.schematic-border-ground-line2'), delay: 600 },
      { element: document.querySelector('.schematic-border-ground-line3'), delay: 600 }
    ];

    elements.forEach(({ element, delay }) => {
      if (element) {
        setTimeout(() => {
          element.classList.add('electricity-active');
        }, delay);
      }
    });

    // After electricity flow completes, unlock scrolling - slower
    setTimeout(() => {
      this.unlockScrollAndNavigate();
    }, 1200); // Doubled completion time
  }

  unlockScrollAndNavigate() {
    this.scrollUnlocked = true;
    
    // Find the projects section (which uses id="blog" based on the HTML)
    const projectsSection = document.querySelector('#blog');
    if (projectsSection) {
      // Calculate a position that's less than the full section top
      const sectionTop = projectsSection.offsetTop;
      const offset = window.innerHeight * 0.1; // Show 10% of previous section
      const targetPosition = sectionTop - offset;
      
      // Custom slow scroll animation
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 3 seconds for very slow scroll
      let startTime = null;
      
      function slowScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition + distance * easeOutCubic);
        
        if (progress < 1) {
          requestAnimationFrame(slowScroll);
        }
      }
      
      requestAnimationFrame(slowScroll);
    }
  }
}
// Initialize when page is ready
function initSchematicBorder() {
  if (!window.schematicBorderController) {
    window.schematicBorderController = new SchematicBorderController();
  }
}

// Multiple initialization points to ensure it runs
document.addEventListener('DOMContentLoaded', initSchematicBorder);

// Backup initialization for jQuery
$(document).ready(function() {
  setTimeout(initSchematicBorder, 500);
});

// Final backup
window.addEventListener('load', function() {
  setTimeout(initSchematicBorder, 1000);
});