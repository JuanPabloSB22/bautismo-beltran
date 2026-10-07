document.addEventListener('DOMContentLoaded', () => {
    
    // Configuración
    // Fecha del evento: 31 de Octubre de 2026, 09:30 AM (Hora Argentina, UTC-3)
    // Asumimos el año actual si no se provee. Vamos a usar 2026 dado el tiempo del sistema.
    const eventDate = new Date('2026-10-31T09:30:00-03:00').getTime();
    
    // Variables (Placeholders)
    const whatsappNumber = "5493516373468"; // Número de WhatsApp
    const whatsappMessage = encodeURIComponent("¡Hola! Confirmo mi asistencia al bautismo de Beltrán.");
    const googleMapsUrl = "https://maps.app.goo.gl/zQAZAkuLBHfmF4mTA"; // URL de Google Maps
    
    // Elementos DOM
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const mapsLink = document.getElementById('maps-link');
    
    // Set links
    if(whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    }
    if(mapsLink) {
        mapsLink.href = googleMapsUrl;
    }

    // Countdown logic
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // El evento ya pasó o está sucediendo
            document.getElementById('countdown').innerHTML = "<p>¡El gran día ha llegado!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minsEl.innerText = String(minutes).padStart(2, '0');
        secsEl.innerText = String(seconds).padStart(2, '0');
    }

    // Iniciar cuenta regresiva si estamos antes del evento
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Dispara un poco antes de llegar al fondo
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target); // Dejar de observar una vez visible
            }
        });
    }, observerOptions);

    // Seleccionar elementos para animar
    const animatedElements = document.querySelectorAll('.seq-1, .seq-2, .seq-3, .seq-4, .seq-5, .seq-6, .seq-7, .photo-container, .info-item, .cd-item');
    
    animatedElements.forEach((el, index) => {
        // Añadir retraso escalonado a los elementos de las grillas
        if(el.classList.contains('info-item') || el.classList.contains('cd-item')) {
            // calculamos un pequeño delay basado en su posición
            const delay = (index % 4) * 0.15;
            el.style.transitionDelay = `${delay}s`;
        }
        scrollObserver.observe(el);
    });
});
