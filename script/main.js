document.addEventListener('DOMContentLoaded', () => {

    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initScrollReveal();
    }, 600);

    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left').forEach(el => observer.observe(el));
    }

    const skillCards = document.querySelectorAll('.skill-card');
    const modal = document.getElementById('skillModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.querySelector('.modal-close');

    let typingInterval;

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            
            modalTitle.innerText = title;

            modalDesc.innerHTML = ''; 
            modalDesc.classList.remove('typing-done'); 
            modalDesc.classList.add('typing-effect'); 

            if (typingInterval) clearInterval(typingInterval);

            modal.classList.add('active');

            let i = 0;
            const speed = 50; 

            typingInterval = setInterval(() => {
                modalDesc.textContent += desc.charAt(i);
                i++;

                if (i > desc.length - 1) {
                    clearInterval(typingInterval);
                }
            }, speed);
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        if (typingInterval) clearInterval(typingInterval);
        modalDesc.innerHTML = ''; 
    };
    
    if(modalClose) modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => { 
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal(); 
        }
    });
    
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') closeModal(); 
    });

    const robloxCards = document.querySelectorAll('.roblox-card');

    robloxCards.forEach(card => {
        card.addEventListener('click', function(e) {

            if (e.target.closest('.discord-btn')) return;

            robloxCards.forEach(c => {
                if (c !== this) c.classList.remove('card-active');
            });

            this.classList.toggle('card-active');
        });
    });

});