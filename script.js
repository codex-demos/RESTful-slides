document.addEventListener('DOMContentLoaded', function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function positionSlides() {
    slides.forEach((slide, index) => {
      slide.style.left = index * 100 + '%';
    });
  }

  function showSlide(index) {
    // Boundary check
    if (index < 0) index = totalSlides - 1;
    else if (index >= totalSlides) index = 0;

    // Slide transition
    slides.forEach((slide) => {
      slide.style.transform = 'translateX(-' + index * 100 + '%)';
    });

    currentSlide = index;
  }

  document.getElementById('prevBtn').addEventListener('click', function () {
    showSlide(currentSlide - 1);
  });

  document.getElementById('nextBtn').addEventListener('click', function () {
    showSlide(currentSlide + 1);
  });

  positionSlides();
  showSlide(currentSlide); // Initialize first slide
});
