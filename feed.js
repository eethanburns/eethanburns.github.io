const posts = [
  {
    type: 'album',
    mediaUrl: 'instagram/cd_collage.jpg',
    permalink: 'https://www.instagram.com/p/DeuQhD8nOXe/?img_index=1'
  },
  {
    type: 'album',
    mediaUrl: 'instagram/cd_release.jpg',
    permalink: 'https://www.instagram.com/p/DesRDA5nOu8/?img_index=1'
  },
  {
    type: 'image',
    mediaUrl: 'instagram/album_streaming.jpg',
    permalink: 'https://www.instagram.com/p/DeioakONn5s/'
  },
  {
    type: 'album',
    mediaUrl: 'instagram/single_streaming.jpg',
    permalink: 'https://www.instagram.com/p/DeZRo-bHE7t/?img_index=1'
  },
  {
    type: 'video',
    mediaUrl: 'instagram/mv_promo.mp4',
    posterUrl: 'instagram/mv_promo.jpg',
    permalink: 'https://www.instagram.com/p/DeUnegTtt5x/'
  }
];

const ICONS = {
  video: `<svg class="ig-badge-icon" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
  album: `<svg class="ig-badge-icon" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
  image: `<svg class="ig-badge-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
};

const carousel = document.getElementById('igCarousel');

carousel.innerHTML = posts.map(item => {
  const content = item.type === 'video'
    ? `<video src="${item.mediaUrl}" poster="${item.posterUrl || ''}" muted loop playsinline preload="metadata"></video>`
    : `<img src="${item.mediaUrl}" loading="lazy" alt="Feed item" />`;

  return `
    <a href="${item.permalink}" target="_blank" rel="noopener noreferrer" class="ig-card">
      ${content}
      <div class="ig-overlay">${ICONS[item.type] || ICONS.image}</div>
    </a>
  `;
}).join('');

// Autoplays video when scrolled into direct view, pauses when scrolled out
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play().catch(() => {});
    } else {
      entry.target.pause();
    }
  });
}, { root: carousel, threshold: 0.65 });

carousel.querySelectorAll('video').forEach(video => observer.observe(video));




