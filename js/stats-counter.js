/* ANIMATED NUMERIC STATS COUNTER ON SCROLL */

document.addEventListener('DOMContentLoaded', () => {
  const statNums = document.querySelectorAll('.stat-num');
  let hasAnimated = false;

  function animateCounters() {
    statNums.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1500; // 1.5 seconds
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // Intersection Observer for scroll trigger
  const observerOptions = {
    root: null,
    threshold: 0.4
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, observerOptions);

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    observer.observe(statsStrip);
  }
});
