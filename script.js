document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Scroll Effect for Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(2, 132, 199, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-fade').forEach(section => {
        observer.observe(section);
    });

    // Email Copy Logic with Highlight Effect
    const copyBtn = document.getElementById('copy-email-btn');
    const emailWrapper = document.getElementById('email-wrapper');
    const emailText = document.getElementById('user-email').textContent;
    const notification = document.getElementById('copy-notification');

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText);
            
            // Visual feedback loop
            emailWrapper.classList.add('highlight');
            notification.classList.add('show');
            
            // Icon transition
            const icon = copyBtn.querySelector('i');
            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');
            
            setTimeout(() => {
                emailWrapper.classList.remove('highlight');
                notification.classList.remove('show');
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
            }, 2500);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
            notification.textContent = "Failed to copy email!";
            notification.style.color = "#ef4444";
            notification.classList.add('show');
            setTimeout(() => notification.classList.remove('show'), 2500);
        }
    });

    // Simple functionality for the custom insight form modal
    const insightForm = document.getElementById('addInsightForm');
    insightForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('insightTitle').value;
        const desc = document.getElementById('insightDesc').value;
        const date = new Date().getFullYear();

        const cardGrid = document.querySelector('.card-grid');
        const addNewCard = document.querySelector('.add-new');

        const newArticle = document.createElement('article');
        newArticle.className = 'pub-card glass-card glass-hover';
        newArticle.innerHTML = `
            <div class="pub-date">${date}</div>
            <h3 class="pub-title">${title}</h3>
            <p class="pub-desc">${desc}</p>
            <a href="#" class="pub-link">Read More <i class="fas fa-external-link-alt"></i></a>
        `;

        cardGrid.insertBefore(newArticle, addNewCard);
        
        // Reset and close modal
        insightForm.reset();
        document.getElementById('insightModal').style.display = 'none';
    });
});
