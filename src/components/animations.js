/**
 * Scroll, Entrance & Horizontal Pinning Animations Component
 * WebDesign-ps Portfolio — Enhanced with more animations
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobile: skip expensive pinned/scrub animations and ignore URL-bar resize jitter
const isMobile = window.matchMedia('(max-width: 768px)').matches;
ScrollTrigger.config({ ignoreMobileResize: true });

export function initAnimations() {

  if (isMobile) {
    // Mobile: show everything immediately, skip scroll-driven/scrub work
    const els = document.querySelectorAll('.hero-line, .hero-fade-in, .site-header, .nav-link, .mask-hint, .fade-up, .process-step, .skill-item, .contact-section h2, #statement-text .word');
    gsap.set(els, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  // ============================
  // Hero Section Entrance
  // ============================
  
  // Hero lines — staggered slide up
  const heroLines = document.querySelectorAll('.hero-line');
  if (heroLines.length > 0) {
    gsap.to(heroLines, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.1,
    });
  }

  // Hero fade-in elements (bottom bar)
  const heroFadeIns = document.querySelectorAll('.hero-fade-in');
  if (heroFadeIns.length > 0) {
    gsap.to(heroFadeIns, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.8,
    });
  }

  // Header entrance — slide down from top
  const header = document.querySelector('.site-header');
  if (header) {
    gsap.fromTo(header,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }

  // Mask hint entrance
  const maskHint = document.querySelector('.mask-hint');
  if (maskHint) {
    gsap.fromTo(maskHint,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.5 }
    );
  }

  // ============================
  // Generic Fade-Up on Scroll (all .fade-up elements)
  // ============================
  const fadeUpElements = document.querySelectorAll('.fade-up');
  fadeUpElements.forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ============================
  // Horizontal Scroll Pinning — FIXED TIMING (triggers earlier)
  // ============================
  const track = document.getElementById('horizontal-track');
  const horizontalSection = document.getElementById('work');

  if (track && horizontalSection) {
    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true,
        scrub: 0.5,
        start: 'top top',  // Pin as soon as section hits the top
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
      },
    });
  }

  // ============================
  // Statement Section: Word-by-word Scroll Reveal
  // ============================
  const statementWords = document.querySelectorAll('#statement-text .word');
  if (statementWords.length > 0) {
    statementWords.forEach((word) => {
      gsap.to(word, {
        scrollTrigger: {
          trigger: word,
          start: 'top 85%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
          onEnter: () => word.classList.add('active'),
          onLeaveBack: () => word.classList.remove('active'),
        },
      });
    });
  }

  // ============================
  // Process Steps Stagger Reveal with scale
  // ============================
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length > 0) {
    gsap.fromTo(
      processSteps,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 75%',
        },
      }
    );
  }

  // ============================
  // Capabilities Grid Items Reveal with stagger
  // ============================
  const skillItems = document.querySelectorAll('.skill-item');
  if (skillItems.length > 0) {
    gsap.fromTo(
      skillItems,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 60%',
        },
      }
    );
  }

  // ============================
  // Project Slides — Image parallax on scroll
  // ============================
  const projectImages = document.querySelectorAll('.project-slide img');
  projectImages.forEach((img) => {
    gsap.fromTo(img,
      { scale: 1.08 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.project-slide'),
          start: 'left right',
          end: 'right left',
          scrub: 1,
          containerAnimation: track ? gsap.getById && gsap.getById('horizontalScroll') : undefined,
        },
      }
    );
  });

  // ============================
  // Contact Section text reveal
  // ============================
  const contactHeading = document.querySelector('.contact-section h2');
  if (contactHeading) {
    gsap.fromTo(contactHeading,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
        },
      }
    );
  }

  // ============================
  // Section borders animate in
  // ============================
  const sectionBorders = document.querySelectorAll('section');
  sectionBorders.forEach((section) => {
    gsap.fromTo(section,
      { borderColor: 'rgba(255,255,255,0)' },
      {
        borderColor: 'rgba(255,255,255,0.1)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
        },
      }
    );
  });

  // ============================
  // Nav links micro-stagger on load
  // ============================
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks.length > 0) {
    gsap.fromTo(navLinks,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.7 }
    );
  }
}
