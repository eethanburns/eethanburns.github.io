  document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll("img");

    images.forEach(img => {
      if (img.complete) {
        img.style.opacity = 1;
      } else {
        img.addEventListener("load", () => {
          img.style.opacity = 1;
        });
      }
    });
  });



document.addEventListener('DOMContentLoaded', () => {
  const pageVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Enforce DOM-level muted state to clear browser autoplay restrictions
        video.muted = true;
        video.defaultMuted = true;
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback rejected for:', video.src, error);
          });
        }
      } else {
        video.pause();
      }
    });
  }, { 
    root: null, 
    threshold: 0.2 // Lowered to 20% visibility to trigger immediately on screen entry
  });

  const videos = document.querySelectorAll('video.autoplay-video');
  console.log(`Found ${videos.length} videos to observe.`);
  videos.forEach(video => pageVideoObserver.observe(video));
});
