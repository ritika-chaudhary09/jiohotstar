// your code here

document.addEventListener('DOMContentLoaded', () => {
  // Fixed Color Palette Logic
  const themeToggle = document.getElementById('theme-toggle');
  const colorOptions = document.getElementById('color-options');

  // EDIT YOUR THEME COLORS HERE::
  // You only need to change colors in this array. They will automatically update across all pages!
  const themeColors = ['#10b981', '#f3a724ff', '#be5353ff'];

  if (colorOptions) {
    colorOptions.innerHTML = '';
    themeColors.forEach(color => {
      const dot = document.createElement('div');
      dot.className = 'color-dot';
      dot.setAttribute('data-color', color);
      dot.style.backgroundColor = color;
      colorOptions.appendChild(dot);
    });
  }

  const colorDots = document.querySelectorAll('.color-dot');

  function darkenHex(hex, percent) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  function applyColor(hex) {
    document.documentElement.style.setProperty('--accent-color', hex);
    document.documentElement.style.setProperty('--accent-hover', darkenHex(hex, 15));

    // Update active class on dots
    colorDots.forEach(dot => {
      if (dot.getAttribute('data-color') === hex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  const savedColor = localStorage.getItem('custom-theme-color') || '#10b981';
  applyColor(savedColor);

  if (themeToggle && colorOptions) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      colorOptions.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeToggle.contains(e.target) && !colorOptions.contains(e.target)) {
        colorOptions.classList.remove('show');
      }
    });
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const hex = dot.getAttribute('data-color');
      applyColor(hex);
      localStorage.setItem('custom-theme-color', hex);
      colorOptions.classList.remove('show');
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const menuIcon = menuToggle.querySelector('i');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (navLinks.classList.contains('active')) {
        menuIcon.className = 'fa-solid fa-xmark';
      } else {
        menuIcon.className = 'fa-solid fa-bars';
      }
    });
  }



  // Intersection Observer for Scroll Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Trigger progress bar animations if inside the revealed element
        if (entry.target.classList.contains('skill-category')) {
          const bars = entry.target.querySelectorAll('.progress');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            // Small timeout to ensure the transition takes effect after render
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }

        // Unobserve after revealing
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
