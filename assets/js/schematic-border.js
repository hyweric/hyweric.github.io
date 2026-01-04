// Simple Schematic Border Animation Controller - Phase 1
class SchematicBorderController {
  constructor() {
    this.initialized = false;
    this.scrollAmount = 0;
    this.maxScroll = 1200; // Increased to accommodate extended animation
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

    // Create extended line from bottom circle
    const extendedLine = document.createElement('div');
    extendedLine.className = 'schematic-border-extended-line';
    borderContainer.appendChild(extendedLine);

    // Create arrow pointing to projects
    const arrow = document.createElement('div');
    arrow.className = 'schematic-border-arrow';
    borderContainer.appendChild(arrow);

    // Add to the about section
    container.appendChild(borderContainer);
    
    this.borderContainer = borderContainer;
    
    // Store references to animation elements
    this.animationElements = [
      { element: leftBorder, startAt: 0, duration: 200 },
      { element: rightBorder, startAt: 50, duration: 200 },
      { element: leftJunction, startAt: 250, duration: 50 },
      { element: rightJunction, startAt: 270, duration: 50 },
      { element: leftHorizontal, startAt: 300, duration: 150 },
      { element: rightHorizontal, startAt: 320, duration: 150 },
      { element: centerJunction, startAt: 450, duration: 50 },
      { element: centerVertical, startAt: 500, duration: 150 },
      { element: bottomCircle, startAt: 650, duration: 100 },
      { element: extendedLine, startAt: 800, duration: 200 },
      { element: arrow, startAt: 1000, duration: 100 }
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
      
      // Check if animation is complete and unlock scrolling
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        setTimeout(() => {
          this.unlockScrollAndNavigate();
        }, 500); // Small delay to let final animation complete
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
      
      // Check if animation is complete and unlock scrolling
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        setTimeout(() => {
          this.unlockScrollAndNavigate();
        }, 500);
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

  unlockScrollAndNavigate() {
    this.scrollUnlocked = true;
    
    // Find the projects section (which uses id="blog" based on the HTML)
    const projectsSection = document.querySelector('#blog');
    if (projectsSection) {
      // Smooth scroll to projects section
      projectsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
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