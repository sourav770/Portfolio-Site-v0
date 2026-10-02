/* ==========================================================================
   STATS COUNT-UP ANIMATION — Clients / Metrics Section
   Animates numeric values from 0 to target (500, 20, 5, 6) on viewport entry.
   Preserves static '+' suffix and runs once per page load.
   ========================================================================== */

(function () {
  'use strict';

  function initStatsCounter() {
    const section = document.querySelector('.clients-section');
    const statElements = document.querySelectorAll('.clients-stat-number[data-target]');

    if (!section || !statElements.length) return;

    let hasAnimated = false;
    const DURATION = 1400; // ~1.4 seconds smooth animation

    // Cubic ease-out for natural deceleration
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCountUp() {
      if (hasAnimated) return;
      hasAnimated = true;

      // Extract target values and identify the text node for each stat
      const items = Array.from(statElements).map(el => {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;

        // Find the text node (preceding the .clients-stat-plus span)
        let textNode = null;
        for (let i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === Node.TEXT_NODE) {
            textNode = el.childNodes[i];
            break;
          }
        }

        // If no text node exists, create one before the plus span
        if (!textNode) {
          textNode = document.createTextNode('0');
          const plusSpan = el.querySelector('.clients-stat-plus');
          el.insertBefore(textNode, plusSpan || el.firstChild);
        }

        // Initialize text to '0'
        textNode.nodeValue = '0';

        return {
          textNode,
          target
        };
      });

      let startTime = null;

      function step(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const easedProgress = easeOutCubic(progress);

        items.forEach(item => {
          const currentValue = Math.round(easedProgress * item.target);
          item.textNode.nodeValue = currentValue.toString();
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Ensure exact final target values
          items.forEach(item => {
            item.textNode.nodeValue = item.target.toString();
          });
        }
      }

      requestAnimationFrame(step);
    }

    // Trigger on viewport entry using IntersectionObserver
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.disconnect();
            animateCountUp();
          }
        });
      }, {
        threshold: 0.2
      });

      observer.observe(section);
    } else {
      // Fallback for browsers without IntersectionObserver
      animateCountUp();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsCounter);
  } else {
    initStatsCounter();
  }
})();
