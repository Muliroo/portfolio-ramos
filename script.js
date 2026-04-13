const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.16,
});

reveals.forEach((el) => observer.observe(el));

const massiveWord = document.querySelector('.massive-word');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (massiveWord) {
    massiveWord.style.transform = `translateY(${y * 0.05}px)`;
    massiveWord.style.opacity = `${Math.max(0.2, 1 - y / 1800)}`;
  }
});
