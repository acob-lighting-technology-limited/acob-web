import NProgress from 'nprogress';

// Configure NProgress
NProgress.configure({
  showSpinner: false, // Hide the spinner
  minimum: 0.1, // Minimum percentage
  easing: 'ease', // CSS easing
  speed: 500, // Animation speed in ms
  trickle: true, // Enable trickling
  trickleSpeed: 200, // Trickle speed in ms
});

// Custom CSS for NProgress
const nprogressStyles = `
  #nprogress {
    pointer-events: none;
  }
  
  #nprogress .bar {
    background: hsl(var(--primary));
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }
  
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--primary));
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }
  
  #nprogress .spinner {
    display: none;
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    #nprogress .bar {
      background: hsl(var(--primary));
    }
    
    #nprogress .peg {
      box-shadow: 0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--primary));
    }
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = nprogressStyles;
  document.head.appendChild(style);
}

export default NProgress;
