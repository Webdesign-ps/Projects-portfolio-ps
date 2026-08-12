/**
 * Interactive Fullscreen Dual-State Sculptural Mask Canvas Component
 * WebDesign-ps Portfolio
 * 
 * Base State: Static Black Stone Mask (Fullscreen Cover)
 * Reveal State: Living Vegetation & Flying Butterflies Video (Fullscreen Cover)
 * Interaction: Cursor / Touch portal reveal with lerp inertia & feathered organic edges
 */

export function initMaskCanvas() {
  const canvas = document.getElementById('mask-canvas');
  const container = document.getElementById('mask-container');
  const video = document.getElementById('nature-video');

  if (!canvas || !container || !video) return;

  const ctx = canvas.getContext('2d');
  
  // Offscreen canvases for composite masking
  const videoCanvas = document.createElement('canvas');
  const videoCtx = videoCanvas.getContext('2d');
  
  const maskBuffer = document.createElement('canvas');
  const maskCtx = maskBuffer.getContext('2d');

  // Load Base Stone Mask Image
  const stoneImage = new Image();
  stoneImage.src = `${import.meta.env.BASE_URL}assets/stone_mask.jpg`;
  
  let isImageLoaded = false;
  stoneImage.onload = () => {
    isImageLoaded = true;
    resizeCanvas();
  };

  // Ensure Video Playback
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.play().catch(err => {
    console.warn("Autoplay muted video fallback:", err);
  });

  // Interaction State Variables
  let isHovered = false;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  let targetRadius = 0;
  let currentRadius = 0;
  let baseRadius = 180;

  let mouseVelocity = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;

  let animFrameId = null;

  // Canvas Resize Handler (High DPI support) — FULLSCREEN COVER
  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    videoCanvas.width = canvas.width;
    videoCanvas.height = canvas.height;
    
    maskBuffer.width = canvas.width;
    maskBuffer.height = canvas.height;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    videoCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!currentX && !currentY) {
      currentX = rect.width / 2;
      currentY = rect.height / 2;
      targetX = currentX;
      targetY = currentY;
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Helper: Draw image/video fitted as background-cover
  function getCoverDimensions(imgWidth, imgHeight, containerWidth, containerHeight) {
    const imgRatio = imgWidth / imgHeight;
    const containerRatio = containerWidth / containerHeight;
    
    let drawWidth = containerWidth;
    let drawHeight = containerHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio < imgRatio) {
      drawWidth = containerHeight * imgRatio;
      drawHeight = containerHeight;
      offsetX = (containerWidth - drawWidth) / 2;
    } else {
      drawWidth = containerWidth;
      drawHeight = containerWidth / imgRatio;
      offsetY = (containerHeight - drawHeight) / 2;
    }

    return { drawWidth, drawHeight, offsetX, offsetY };
  }

  // Pointer Movement Handlers
  function updatePointerPosition(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    targetX = clientX - rect.left;
    targetY = clientY - rect.top;

    const dx = targetX - lastMouseX;
    const dy = targetY - lastMouseY;
    mouseVelocity = Math.sqrt(dx * dx + dy * dy);
    
    lastMouseX = targetX;
    lastMouseY = targetY;
  }

  container.addEventListener('mouseenter', (e) => {
    isHovered = true;
    updatePointerPosition(e.clientX, e.clientY);
  });

  container.addEventListener('mousemove', (e) => {
    isHovered = true;
    updatePointerPosition(e.clientX, e.clientY);
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isHovered = true;
    if (e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    isHovered = true;
    if (e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isHovered = false;
  });

  // Main Render Loop
  function render() {
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Lerp cursor position
    const lerpFactor = 0.08;
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    // Dynamic radius
    const dynamicBase = baseRadius + Math.min(mouseVelocity * 1.5, 50);
    targetRadius = isHovered ? dynamicBase : 0;
    
    const radiusLerp = isHovered ? 0.1 : 0.04;
    currentRadius += (targetRadius - currentRadius) * radiusLerp;

    // Clear
    ctx.clearRect(0, 0, w, h);
    videoCtx.clearRect(0, 0, w, h);
    maskCtx.clearRect(0, 0, w, h);

    if (isImageLoaded) {
      // Draw fullscreen cover stone mask
      const stoneDim = getCoverDimensions(stoneImage.width, stoneImage.height, w, h);
      ctx.drawImage(stoneImage, stoneDim.offsetX, stoneDim.offsetY, stoneDim.drawWidth, stoneDim.drawHeight);

      // Nature reveal
      if (currentRadius > 0.5) {
        const videoWidth = video.videoWidth || 1920;
        const videoHeight = video.videoHeight || 1080;
        const vidDim = getCoverDimensions(videoWidth, videoHeight, w, h);
        
        videoCtx.drawImage(video, vidDim.offsetX, vidDim.offsetY, vidDim.drawWidth, vidDim.drawHeight);

        // Soft radial feather mask
        const grad = maskCtx.createRadialGradient(
          currentX, currentY, currentRadius * 0.15,
          currentX, currentY, currentRadius
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
        grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
        maskCtx.fill();

        // Composite mask onto video
        videoCtx.globalCompositeOperation = 'destination-in';
        videoCtx.drawImage(maskBuffer, 0, 0, w, h);
        videoCtx.globalCompositeOperation = 'source-over';

        // Draw composited video on main canvas
        ctx.drawImage(videoCanvas, 0, 0, w, h);

        // Subtle green glow around edge
        const edgeGrad = ctx.createRadialGradient(
          currentX, currentY, currentRadius * 0.85,
          currentX, currentY, currentRadius * 1.15
        );
        edgeGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
        edgeGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.12)');
        edgeGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = edgeGrad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentRadius * 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', resizeCanvas);
  };
}
