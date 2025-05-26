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