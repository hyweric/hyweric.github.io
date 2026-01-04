// Simple Schematic Border Animation Controller - Phase 1
class SchematicBorderController {
  constructor() {
    this.initialized = false;
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
    this.startAnimation();
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

    // Add to the about section
    container.appendChild(borderContainer);
    
    this.borderContainer = borderContainer;
  }

  startAnimation() {
    // Start the animation sequence after a short delay
    setTimeout(() => {
      if (this.borderContainer) {
        this.borderContainer.classList.add('active');
      }
    }, 1000);
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