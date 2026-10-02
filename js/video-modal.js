/* VIDEO LIGHTBOX MODAL & GALLERY INTERACTION */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('videoModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  const videoPlayer = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalVideoNav = document.getElementById('modalVideoNav');
  const navButtons = modalVideoNav ? modalVideoNav.querySelectorAll('.mvn-btn') : [];

  const projectCards = document.querySelectorAll('.project-card');

  // Complete mapping of all 18 portrait videos (3 per category)
  const GALLERY_DATA = {
    'speed-ramping': {
      title: 'Speed Ramping',
      tag: 'AFTER EFFECTS',
      videos: [
        { src: 'assets/Videos/video-01-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-02-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-03-portrait.mp4', label: 'Edit 03' }
      ]
    },
    'talking-head': {
      title: 'Talking Head',
      tag: 'PREMIERE PRO',
      videos: [
        { src: 'assets/Videos/video-04-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-05-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-06-portrait.mp4', label: 'Edit 03' }
      ]
    },
    'motion-graphics': {
      title: 'Motion Graphics',
      tag: 'AFTER EFFECTS',
      videos: [
        { src: 'assets/Videos/video-07-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-08-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-09-portrait.mp4', label: 'Edit 03' }
      ]
    },
    'ai-voice': {
      title: 'AI Voice',
      tag: 'DAVINCI RESOLVE',
      videos: [
        { src: 'assets/Videos/video-10-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-11-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-12-portrait.mp4', label: 'Edit 03' }
      ]
    },
    'ui-animation': {
      title: 'UI Animation',
      tag: 'AFTER EFFECTS',
      videos: [
        { src: 'assets/Videos/video-13-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-14-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-15-portrait.mp4', label: 'Edit 03' }
      ]
    },
    'podcasts': {
      title: 'Podcasts',
      tag: 'PREMIERE PRO',
      videos: [
        { src: 'assets/Videos/video-16-portrait.mp4', label: 'Edit 01' },
        { src: 'assets/Videos/video-17-portrait.mp4', label: 'Edit 02' },
        { src: 'assets/Videos/video-18-portrait.mp4', label: 'Edit 03' }
      ]
    }
  };

  let activeCategoryKey = 'speed-ramping';
  let activeVideoIndex = 0;

  function setModalVideo(index) {
    const category = GALLERY_DATA[activeCategoryKey];
    if (!category || !category.videos[index]) return;

    activeVideoIndex = index;
    const videoItem = category.videos[index];

    // Update video source
    if (videoPlayer) {
      videoPlayer.src = videoItem.src;
      videoPlayer.load();
      videoPlayer.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }

    // Update title and tag
    if (modalTitle) {
      modalTitle.textContent = `${category.title} — ${videoItem.label}`;
    }
    if (modalTag) {
      modalTag.textContent = category.tag;
    }

    // Update active nav button
    navButtons.forEach((btn, idx) => {
      const isSelected = idx === index;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  function openModal(categoryKey, videoIndex = 0) {
    if (!modal || !videoPlayer) return;

    activeCategoryKey = GALLERY_DATA[categoryKey] ? categoryKey : 'speed-ramping';
    setModalVideo(videoIndex);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal || !videoPlayer) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
  }

  // Open modal on project card click
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryKey = card.getAttribute('data-card-id') || card.getAttribute('data-category');
      openModal(categoryKey, 0);
    });

    // Card hover video teaser preview
    const previewVideo = card.querySelector('.card-video-preview');
    if (previewVideo) {
      card.addEventListener('mouseenter', () => {
        previewVideo.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        previewVideo.pause();
      });
    }
  });

  // Switch video when clicking 01 / 02 / 03 tabs
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-video-index'), 10);
      if (!isNaN(idx)) {
        setModalVideo(idx);
      }
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Close modal when clicking outside modal shell
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
});
