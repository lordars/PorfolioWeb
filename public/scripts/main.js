(function () {
  if (window.AOS) {
    window.AOS.init({
      once: true,
      offset: 30,
      easing: 'ease-out-cubic'
    });
  }

  if (window.gsap) {
    window.gsap.from('.topbar', {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    window.gsap.from('.hero .tag, .hero h1, .hero p, .hero .btn', {
      y: 22,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.15
    });
  }

  var projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      if (window.gsap) {
        window.gsap.to(card, {
          y: -4,
          duration: 0.25,
          boxShadow: '0 16px 34px rgba(0,0,0,0.11)'
        });
      }
    });

    card.addEventListener('mouseleave', function () {
      if (window.gsap) {
        window.gsap.to(card, {
          y: 0,
          duration: 0.25,
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        });
      }
    });
  });
})();
