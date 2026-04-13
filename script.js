document.addEventListener("DOMContentLoaded", () => {
    // 1. Configuração da animação de revelação (Scrollytelling)
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, // O elemento aparece quando 15% dele entra na tela
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Opcional: remover a observação depois que aparecer uma vez
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. Autoplay inteligente de Vídeos (Estilo Apple)
    // Os vídeos só tocam quando estão visíveis na tela
    const videos = document.querySelectorAll("video");

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tenta dar play no vídeo silenciosamente
                entry.target.play().catch(e => console.log("Autoplay bloqueado pelo navegador", e));
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 }); // Toca quando 50% do vídeo aparece

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});
