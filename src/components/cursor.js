/**
 * Custom Editorial Cursor Component
 * WebDesign-ps Portfolio
 */

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const badge = document.getElementById('cursor-badge');

  if (!dot || !badge) return;

  let mouseX = -100;
  let mouseY = -100;
  let dotX = -100;
  let dotY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    badge.style.transform = `translate3d(${dotX + 16}px, ${dotY + 16}px, 0)`;

    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  // Hover targets — Mask Container
  const maskContainer = document.getElementById('mask-container');
  if (maskContainer) {
    maskContainer.addEventListener('mouseenter', () => {
      dot.classList.add('active');
      badge.textContent = 'REVEAL';
      badge.classList.add('visible');
    });
    maskContainer.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
      badge.classList.remove('visible');
    });
  }

  // Horizontal Project Slides hover
  document.querySelectorAll('.project-slide').forEach((slide) => {
    slide.addEventListener('mouseenter', () => {
      dot.classList.add('active');
      badge.textContent = 'EXPLORE';
      badge.classList.add('visible');
    });
    slide.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
      badge.classList.remove('visible');
    });
  });

  // Links & Buttons hover
  document.querySelectorAll('a, button').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      dot.classList.add('active');
    });
    link.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
    });
  });
}
