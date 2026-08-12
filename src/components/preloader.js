/**
 * Minimalistic Preloader — Only Mask Image with Pulse + Fade
 * WebDesign-ps Portfolio
 */

export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const maskImg = document.getElementById('preloader-mask');

  if (!preloader) {
    if (onComplete) onComplete();
    return;
  }

  // Fade in the mask image
  if (maskImg) {
    requestAnimationFrame(() => {
      maskImg.style.opacity = '1';
    });
  }

  // Wait for assets to feel "loaded", then exit
  const duration = 1800; // ms

  setTimeout(() => {
    // Fade out preloader
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    
    setTimeout(() => {
      preloader.style.display = 'none';
      if (onComplete) onComplete();
    }, 800);
  }, duration);
}
