/* VIDEO LIGHTBOX MODAL LOGIC */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('videoModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  const videoPlayer = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalTag = document.getElementById('modalTag');

  // Triggers to open modal
  const openShowreelBtn = document.getElementById('openShowreelBtn');
  const playMainShowreel = document.getElementById('playMainShowreel');
  const projectCards = document.querySelectorAll('.project-card');

  function openModal(src, title, subtitle, tag) {
    if (!modal || !videoPlayer) return;
    
    // Set video source
    videoPlayer.src = src || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
    if (modalTitle) modalTitle.textContent = title || 'SOURAV — 2025 Showreel';
    if (modalSubtitle) modalSubtitle.textContent = subtitle || 'Full HD 60FPS Video Preview';
    if (modalTag) modalTag.textContent = tag || 'FEATURED';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Play video safely
    videoPlayer.play().catch(err => console.log('Autoplay prevented:', err));
  }

  function closeModal() {
    if (!modal || !videoPlayer) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  // Event Listeners
  if (openShowreelBtn) {
    openShowreelBtn.addEventListener('click', () => {
      openModal(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'SOURAV — 2025 Editing & Motion Reel',
        'High-Pacing Edits, Color Grading & VFX',
        'SHOWREEL'
      );
    });
  }

  if (playMainShowreel) {
    playMainShowreel.addEventListener('click', () => {
      openModal(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        'SOURAV — 2025 Editing & Motion Reel',
        'High-Pacing Edits, Color Grading & VFX',
        'SHOWREEL'
      );
    });
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video-src');
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const software = card.getAttribute('data-software');
      
      openModal(
        src,
        title || 'Selected Project Edit',
        `Client: ${client || 'Brand Partner'} // Software: ${software || 'Premiere / AE'}`,
        'PROJECT'
      );
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
});
