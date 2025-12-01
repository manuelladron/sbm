/**
 * SBM Project Page - JavaScript
 * Handles carousel initialization and page interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize carousels
  initCarousels();
  
  // Initialize navbar burger menu
  initNavbar();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Lazy load images
  initLazyLoad();
  
});

/**
 * Initialize Bulma Carousel
 */
function initCarousels() {
  // Check if bulmaCarousel exists
  if (typeof bulmaCarousel !== 'undefined') {
    // Initialize all carousels
    const carousels = bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: 3,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      navigation: true,
      navigationKeys: true,
      pagination: true,
      breakpoints: [
        { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 },
        { changePoint: 1024, slidesToShow: 2, slidesToScroll: 1 },
        { changePoint: 1280, slidesToShow: 3, slidesToScroll: 1 }
      ]
    });

    // Log carousel initialization
    carousels.forEach(function(carousel) {
      carousel.on('show', function(state) {
        console.log('Carousel slide changed to: ' + state.index);
      });
    });
  }
}

/**
 * Initialize Navbar burger menu for mobile
 */
function initNavbar() {
  // Get all "navbar-burger" elements
  const navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'), 
    0
  );

  // Add a click event on each of them
  navbarBurgers.forEach(function(el) {
    el.addEventListener('click', function() {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const targetEl = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      if (targetEl) {
        targetEl.classList.toggle('is-active');
      }
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Lazy load images with IntersectionObserver
 */
function initLazyLoad() {
  // Check for IntersectionObserver support
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          imageObserver.unobserve(image);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(image) {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    });
  }
}

/**
 * Copy BibTeX to clipboard
 */
function copyBibTeX() {
  const bibtexCode = document.querySelector('#BibTeX pre code');
  if (bibtexCode) {
    navigator.clipboard.writeText(bibtexCode.textContent).then(function() {
      // Show success notification
      showNotification('BibTeX copied to clipboard!', 'is-success');
    }).catch(function(err) {
      console.error('Failed to copy BibTeX: ', err);
      showNotification('Failed to copy BibTeX', 'is-danger');
    });
  }
}

/**
 * Show notification toast
 */
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = 'notification ' + type + ' is-light';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
  `;
  notification.innerHTML = `
    <button class="delete"></button>
    ${message}
  `;
  
  document.body.appendChild(notification);
  
  // Add close button handler
  notification.querySelector('.delete').addEventListener('click', function() {
    notification.remove();
  });
  
  // Auto-remove after 3 seconds
  setTimeout(function() {
    notification.remove();
  }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

