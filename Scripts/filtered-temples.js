const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "April 6, 1893",
    area: 253015,
    imageUrl: "images/salt-lake-temple.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "March 10, 2019",
    area: 40000,
    imageUrl: "images/rome-italy-temple.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "January 11, 2004",
    area: 17300,
    imageUrl: "images/accra-ghana-temple.jpg"
  },
  {
    templeName: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicated: "November 27, 1919",
    area: 42000,
    imageUrl: "images/laie-hawaii-temple.jpg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "May 21, 2017",
    area: 44000,
    imageUrl: "images/paris-france-temple.jpg"
  }
];


// Display all temples
function displayTemples(templesList) {
  const container = document.getElementById("temples-container");
  container.innerHTML = "";

  templesList.forEach(temple => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    `;
    container.appendChild(card);
  });
}

// Filter buttons
document.getElementById("home").addEventListener("click", () => displayTemples(temples));

document.getElementById("old").addEventListener("click", () => {
  const oldTemples = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
  displayTemples(oldTemples);
});

document.getElementById("new").addEventListener("click", () => {
  const newTemples = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
  displayTemples(newTemples);
});

document.getElementById("large").addEventListener("click", () => {
  const largeTemples = temples.filter(t => t.area > 90000);
  displayTemples(largeTemples);
});

document.getElementById("small").addEventListener("click", () => {
  const smallTemples = temples.filter(t => t.area < 10000);
  displayTemples(smallTemples);
});

// Footer date info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load all temples on initial page load
displayTemples(temples);
