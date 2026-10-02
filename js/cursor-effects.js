/* AMBIENT GLOW CURSOR LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // Do not execute on touch devices
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isMoving = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateCursor);
    }
  }, { passive: true });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.45;
    cursorY += (mouseY - cursorY) * 0.45;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1) {
      requestAnimationFrame(updateCursor);
    } else {
      isMoving = false;
    }
  }

  // Expand cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .grid-showcase-box, .project-card, .badge-item, .process-circle');

  hoverables.forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('active'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
});

