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

    // Function to handle tab switching
    window.switchTab = function(tabId) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none'; // Ensure inline hidden
        });
        
        // Deactivate all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById('tab-' + tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block';
            setTimeout(() => selectedTab.classList.add('active'), 10);
            
            // Re-trigger scroll spy for elements in new tab
            selectedTab.querySelectorAll('.section-fade').forEach(section => {
                section.classList.remove('visible'); // Reset visibility
                observer.observe(section);
            });
        }
        
        // Activate clicked nav link
        const activeNav = document.getElementById('nav-' + tabId);
        if (activeNav) {
            activeNav.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
