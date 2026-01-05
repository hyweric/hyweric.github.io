class SchematicBorderController {
  constructor() {
    this.initialized = false;
    this.scrollAmount = 0;
    this.maxScroll = 1300; // don't touch
    this.animationElements = [];
    this.animationComplete = false;
    this.scrollUnlocked = false;
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
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
    // main container for border elements
    const borderContainer = document.createElement('div');
    borderContainer.className = 'schematic-border-container';

    // left vertical border line
    const leftBorder = document.createElement('div');
    leftBorder.className = 'schematic-border-left';
    borderContainer.appendChild(leftBorder);

    // right vertical border line
    const rightBorder = document.createElement('div');
    rightBorder.className = 'schematic-border-right';
    borderContainer.appendChild(rightBorder);

    // left horizontal connector
    const leftHorizontal = document.createElement('div');
    leftHorizontal.className = 'schematic-border-horizontal-left';
    borderContainer.appendChild(leftHorizontal);

    // right horizontal connector
    const rightHorizontal = document.createElement('div');
    rightHorizontal.className = 'schematic-border-horizontal-right';
    borderContainer.appendChild(rightHorizontal);

    // center vertical line
    const centerVertical = document.createElement('div');
    centerVertical.className = 'schematic-border-center';
    borderContainer.appendChild(centerVertical);

    // junction circles
    const leftJunction = document.createElement('div');
    leftJunction.className = 'schematic-border-junction-left';
    borderContainer.appendChild(leftJunction);

    const rightJunction = document.createElement('div');
    rightJunction.className = 'schematic-border-junction-right';
    borderContainer.appendChild(rightJunction);

    const centerJunction = document.createElement('div');
    centerJunction.className = 'schematic-border-junction-center';
    borderContainer.appendChild(centerJunction);

    // bottom circle
    const bottomCircle = document.createElement('div');
    bottomCircle.className = 'schematic-border-circle pulse';
    borderContainer.appendChild(bottomCircle);

    // electrical ground symbol (static, always visible)
    const groundSymbol = document.createElement('div');
    groundSymbol.className = 'schematic-border-ground';
    borderContainer.appendChild(groundSymbol);

    // second horizontal line for ground symbol
    const groundLine2 = document.createElement('div');
    groundLine2.className = 'schematic-border-ground-line2';
    borderContainer.appendChild(groundLine2);

    // third horizontal line for ground symbol
    const groundLine3 = document.createElement('div');
    groundLine3.className = 'schematic-border-ground-line3';
    borderContainer.appendChild(groundLine3);

    // Add to the about section
    container.appendChild(borderContainer);
    
    this.borderContainer = borderContainer;
    
    // references to animation elements
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
    // prevent default scrolling behavior but allow animation triggering
    document.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
    document.addEventListener('touchmove', this.handleTouch.bind(this), { passive: false });
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  setupAnimationTimeline() {
    // hidden initial state
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
    const aboutSection = document.querySelector('#about');
    const inAboutSection = aboutSection && this.isInViewport(aboutSection);
    
    if (!inAboutSection && this.scrollUnlocked === false) {
      this.scrollUnlocked = true;
      return;
    }
  
    if (inAboutSection && !this.scrollUnlocked) {
      event.preventDefault();
      
      // add to scroll amount based on scroll direction
      if (event.deltaY > 0) {
        this.scrollAmount += Math.abs(event.deltaY) * 2; // down
      } else if (event.deltaY < 0) {
        this.scrollAmount -= Math.abs(event.deltaY) * 2; // up
      }
      this.scrollAmount = Math.max(0, Math.min(this.scrollAmount, this.maxScroll));
      
      this.updateAnimationProgress();
      
      // if animation is complete trigger electricity flow
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        this.triggerElectricityFlow();
      }
    }
  }

  handleTouch(event) {
    const aboutSection = document.querySelector('#about');
    const inAboutSection = aboutSection && this.isInViewport(aboutSection);
    
    if (!inAboutSection && this.scrollUnlocked === false) {
      this.scrollUnlocked = true;
      return;
    }
    
    if (inAboutSection && !this.scrollUnlocked) {
      event.preventDefault();
      
      // for touch increment scroll amount
      this.scrollAmount += 50;
      this.scrollAmount = Math.min(this.scrollAmount, this.maxScroll);
      this.updateAnimationProgress();
      
      if (this.scrollAmount >= this.maxScroll && !this.animationComplete) {
        this.animationComplete = true;
        this.triggerElectricityFlow();
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
    const aboutSection = document.querySelector('#about');
    const inAboutSection = aboutSection && this.isInViewport(aboutSection);
    
    if (!inAboutSection && this.scrollUnlocked === false) {
      this.scrollUnlocked = true;
      return;
    }
    
    if (inAboutSection && !this.scrollUnlocked) {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.includes(event.keyCode)) {
        event.preventDefault();
        
        if ([32, 34, 40].includes(event.keyCode)) { // space, page down, down arrow
          this.scrollAmount += 100;
        } else if ([33, 38].includes(event.keyCode)) { // page up, up arrow
          this.scrollAmount -= 100;
        }
        
        this.scrollAmount = Math.max(0, Math.min(this.scrollAmount, this.maxScroll));
        this.updateAnimationProgress();
        
        // check if animation complete -> unlock scrolling
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
          // if fully animated
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
          // partially animated
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
      const allElements = document.querySelectorAll('.schematic-border-left, .schematic-border-right, .schematic-border-horizontal-left, .schematic-border-horizontal-right, .schematic-border-center, .schematic-border-junction-left, .schematic-border-junction-right, .schematic-border-junction-center, .schematic-border-circle, .schematic-border-ground, .schematic-border-ground-line2, .schematic-border-ground-line3');
      
      allElements.forEach(element => {
        element.classList.add('electricity-transition');
      });

      const elements = [
        { element: document.querySelector('.schematic-border-left'), delay: 0 },
        { element: document.querySelector('.schematic-border-right'), delay: 0 },
        { element: document.querySelector('.schematic-border-junction-left'), delay: 100 },
        { element: document.querySelector('.schematic-border-junction-right'), delay: 100 },
        { element: document.querySelector('.schematic-border-horizontal-left'), delay: 200 },
        { element: document.querySelector('.schematic-border-horizontal-right'), delay: 200 },
        { element: document.querySelector('.schematic-border-junction-center'), delay: 300 },
        { element: document.querySelector('.schematic-border-center'), delay: 400 },
        { element: document.querySelector('.schematic-border-circle'), delay: 500 },
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

      setTimeout(() => {
        this.unlockScrollAndNavigate();
      }, 1200);
    }

    triggerElectricityFlowAndNavigate(targetHref, offsetAdjustment) {
      const allElements = document.querySelectorAll('.schematic-border-left, .schematic-border-right, .schematic-border-horizontal-left, .schematic-border-horizontal-right, .schematic-border-center, .schematic-border-junction-left, .schematic-border-junction-right, .schematic-border-junction-center, .schematic-border-circle, .schematic-border-ground, .schematic-border-ground-line2, .schematic-border-ground-line3');
      
      allElements.forEach(element => {
        element.classList.add('electricity-transition');
      });

      const elements = [
        { element: document.querySelector('.schematic-border-left'), delay: 0 },
        { element: document.querySelector('.schematic-border-right'), delay: 0 },
        { element: document.querySelector('.schematic-border-junction-left'), delay: 100 },
        { element: document.querySelector('.schematic-border-junction-right'), delay: 100 },
        { element: document.querySelector('.schematic-border-horizontal-left'), delay: 200 },
        { element: document.querySelector('.schematic-border-horizontal-right'), delay: 200 },
        { element: document.querySelector('.schematic-border-junction-center'), delay: 300 },
        { element: document.querySelector('.schematic-border-center'), delay: 400 },
        { element: document.querySelector('.schematic-border-circle'), delay: 500 },
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

      setTimeout(() => {
        this.scrollUnlocked = true;
        
        const targetSection = document.querySelector(targetHref);
        if (targetSection) {
          if (targetHref === '#contact') {
            const checkContactLoaded = () => {
              const contactContent = targetSection.querySelector('.vg-contact-form');
              if (contactContent && targetSection.offsetHeight > 100) {
                this.scrollToTarget(targetSection, offsetAdjustment);
              } else {
                setTimeout(checkContactLoaded, 100);
              }
            };
            checkContactLoaded();
          } else {
            this.scrollToTarget(targetSection, offsetAdjustment);
          }
        }
      }, 1200);
    }

    scrollToTarget(targetSection, offsetAdjustment) {
      const sectionTop = targetSection.offsetTop;
      const targetPosition = sectionTop - offsetAdjustment;
      
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let startTime = null;
      
      function slowScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition + distance * easeOutCubic);
        
        if (progress < 1) {
          requestAnimationFrame(slowScroll);
        }
      }
      
      requestAnimationFrame(slowScroll);
    }

    unlockScrollAndNavigate() {
      this.scrollUnlocked = true;
      
      const projectsSection = document.querySelector('#blog');
      if (projectsSection) {
        const sectionTop = projectsSection.offsetTop;
        const offset = window.innerHeight * 0.1;
        const targetPosition = sectionTop - offset;
        
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let startTime = null;
        
        function slowScroll(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
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

  function initSchematicBorder() {
    if (!window.schematicBorderController) {
      window.schematicBorderController = new SchematicBorderController();
    }
  }

  document.addEventListener('DOMContentLoaded', initSchematicBorder);

  $(document).ready(function() {
    setTimeout(initSchematicBorder, 500);
  });

  window.addEventListener('load', function() {
    setTimeout(initSchematicBorder, 1000);
  });
