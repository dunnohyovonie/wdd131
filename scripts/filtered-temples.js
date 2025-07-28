// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/800x500/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x500/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Albuquerque New Mexico",
        location: "Albuquerque, New Mexico, United States",
        dedicated: "2000, March, 5",
        area: 34200,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/800x500/albuquerque-temple-lds-137885-wallpaper.jpg"
    },
    {
        templeName: "Anchorage Alaska",
        location: "Anchorage, Alaska, United States",
        dedicated: "1999, January, 9",
        area: 11937,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/800x500/albuquerque-temple-lds-137885-wallpaper.jpg"
    },
    {
        templeName: "Baton Rouge Louisiana",
        location: "Baton Rouge, Louisiana, United States",
        dedicated: "2000, July, 16",
        area: 10890,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x500/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Bern Switzerland",
        location: "Bern, Switzerland",
        dedicated: "1955, September, 11",
        area: 35000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x500/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Billings Montana",
        location: "Billings, Montana, United States",
        dedicated: "1999, November, 20",
        area: 33700,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/800x500/albuquerque-temple-lds-137885-wallpaper.jpg"
    },
    {
        templeName: "Birmingham Alabama",
        location: "Birmingham, Alabama, United States",
        dedicated: "2000, September, 3",
        area: 10200,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/800x500/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Bogotá Colombia",
        location: "Bogotá, Colombia",
        dedicated: "1999, April, 24",
        area: 53000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x500/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    // Additional temples
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/800x500/albuquerque-temple-lds-137885-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/800x500/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Kirtland Temple",
        location: "Kirtland, Ohio, United States",
        dedicated: "1836, March, 27",
        area: 15000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/albuquerque-new-mexico/800x500/albuquerque-temple-lds-137885-wallpaper.jpg"
    }
];

// Function to display temples
function displayTemples(filteredTemples = temples) {
    const templeContainer = document.querySelector('#temple-cards');
    templeContainer.innerHTML = ''; // Clear existing content
    
    filteredTemples.forEach(temple => {
        const card = document.createElement('article');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <h3>${temple.templeName}</h3>
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;
        
        templeContainer.appendChild(card);
    });
}

// Function to filter temples
function filterTemples(criteria) {
    switch(criteria) {
        case 'old':
            return temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
        case 'new':
            return temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
        case 'large':
            return temples.filter(temple => temple.area > 90000);
        case 'small':
            return temples.filter(temple => temple.area < 11000);
        default:
            return temples;
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    displayTemples();
    
    // Navigation event listeners
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.getAttribute('data-filter') || 'all';
            const filtered = filterTemples(filter);
            displayTemples(filtered);
            
            // Update active state
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Update footer
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});