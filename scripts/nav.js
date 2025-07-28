// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        // Toggle active class on hamburger and nav links
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Animate nav items
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Filter functionality for nav buttons
    const filterButtons = document.querySelectorAll('.nav-links a');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter temples
            filterTemples(filter);
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });

    // Filter temples function
    function filterTemples(filter) {
        const templeCards = document.querySelectorAll('.temple-card');
        const noResults = document.getElementById('no-results');
        let visibleCount = 0;

        templeCards.forEach(card => {
            const cardFilters = card.getAttribute('data-filter').split(' ');
            
            if (filter === 'all' || cardFilters.includes(filter)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Add animation to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});