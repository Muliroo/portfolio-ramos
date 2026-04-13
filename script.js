const progressBar = document.querySelector(".progress-bar");
const revealElements = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const floatingShapes = document.querySelectorAll(".orb, .rounded-shape");

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

function animateParallax() {
  const scrollY = window.scrollY;

  floatingShapes.forEach((shape, index) => {
    const speed = index % 2 === 0 ? 0.08 : 0.12;
    const offset = scrollY * speed;
    shape.style.transform += ` translate3d(0, ${offset}px, 0)`;
  });
}

function resetParallaxTransform() {
  floatingShapes.forEach((shape, index) => {
    if (shape.classList.contains("rounded-shape-1")) {
      shape.style.transform = "rotate(12deg)";
    } else if (shape.classList.contains("rounded-shape-2")) {
      shape.style.transform = "rotate(-12deg)";
    } else {
      shape.style.transform = "";
    }
  });
  animateParallax();
}

window.addEventListener("scroll", () => {
  updateProgressBar();
  resetParallaxTransform();
});

window.addEventListener("load", () => {
  updateProgressBar();
  resetParallaxTransform();
});