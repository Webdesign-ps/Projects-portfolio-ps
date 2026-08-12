/**
 * Main Application Entry Point
 * Artem Tsudziak — Interactive Dark Editorial Portfolio
 */
import '/src/styles/main.css';
import { initPreloader } from '/src/components/preloader.js';
import { initMaskCanvas } from '/src/components/maskCanvas.js';
import { initSmoothScroll } from '/src/components/smoothScroll.js';
import { initCursor } from '/src/components/cursor.js';
import { initAnimations } from '/src/components/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Cursor
  initCursor();

  // Initialize Smooth Scroll
  initSmoothScroll();

  // Initialize Interactive Mask Canvas
  initMaskCanvas();

  // Initialize Preloader & Entrance Animations
  initPreloader(() => {
    initAnimations();
  });
});
