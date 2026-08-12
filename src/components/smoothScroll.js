/**
 * Smooth Scroll Component using Lenis
 * Artem Tsudziak Portfolio
 */
import Lenis from 'lenis';

export function initSmoothScroll() {
  // Native scroll on touch devices: smoother, no jank, battery friendly
  if (window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Anchor links smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: -40, duration: 1.5 });
        }
      }
    });
  });

  return lenis;
}
