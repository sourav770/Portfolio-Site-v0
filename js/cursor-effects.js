/* AMBIENT GLOW CURSOR LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Expand cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .grid-showcase-box, .project-card, .badge-item');

  hoverables.forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('active'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
});
