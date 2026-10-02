/* ==========================================================================
   PROCESS WORKFLOW — INTERACTIVE CIRCULAR STEPS
   Handles hover & tap interactions, smooth scaling, depth layering,
   and keyboard accessibility for the 4 process circles.
   ========================================================================== */

(function () {
  'use strict';

  function initProcessWorkflow() {
    const stage = document.querySelector('.process-circles-stage');
    const circles = document.querySelectorAll('.process-circle');

    if (!stage || !circles.length) return;

    circles.forEach(circle => {
      // Mouse Enter
      circle.addEventListener('mouseenter', () => {
        stage.classList.add('has-hovered-circle');
        circles.forEach(c => c.classList.remove('is-hovered'));
        circle.classList.add('is-hovered');
      });

      // Mouse Leave
      circle.addEventListener('mouseleave', () => {
        stage.classList.remove('has-hovered-circle');
        circle.classList.remove('is-hovered');
      });

      // Keyboard Focus
      circle.addEventListener('focus', () => {
        stage.classList.add('has-hovered-circle');
        circles.forEach(c => c.classList.remove('is-hovered'));
        circle.classList.add('is-hovered');
      });

      // Keyboard Blur
      circle.addEventListener('blur', () => {
        stage.classList.remove('has-hovered-circle');
        circle.classList.remove('is-hovered');
      });

      // Mobile Touch / Tap toggle
      circle.addEventListener('click', (e) => {
        const wasActive = circle.classList.contains('is-hovered');
        circles.forEach(c => c.classList.remove('is-hovered'));

        if (!wasActive) {
          stage.classList.add('has-hovered-circle');
          circle.classList.add('is-hovered');
        } else {
          stage.classList.remove('has-hovered-circle');
        }
      });
    });

    // Reset when clicking outside the stage
    document.addEventListener('click', (e) => {
      if (!stage.contains(e.target)) {
        stage.classList.remove('has-hovered-circle');
        circles.forEach(c => c.classList.remove('is-hovered'));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProcessWorkflow);
  } else {
    initProcessWorkflow();
  }
})();
