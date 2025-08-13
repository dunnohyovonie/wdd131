/**
 * Liahona's Youth Cleaning Company
 * Unified JavaScript - Final Project (W06)
 * Handles: Mobile Menu, Nav Active Link, Services, Testimonials, Booking Form
 */

document.addEventListener("DOMContentLoaded", function () {
  // ============ 1. MOBILE MENU TOGGLE ============
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector("nav ul");

  if (menuToggle && navList) {
    // Initialize aria-expanded
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
      const isExpanded = navList.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Close mobile menu when clicking a link
    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navList.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ============ 2. HIGHLIGHT ACTIVE NAV LINK ============
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ============ 3. SERVICES DATA & RENDERING ============
  const services = [
    {
      name: "Residential Cleaning",
      desc: "Regular or deep cleaning for homes of all sizes. Kitchens, bathrooms, floors, and more.",
      price: 120,
      image: "residential.jpg"
    },
    {
      name: "Commercial Cleaning",
      desc: "Keep your office spotless and professional. Daily, weekly, or monthly plans available.",
      price: 180,
      image: "office.jpg"
    },
    {
      name: "Carpet and Upholstery",
      desc: "Deep steam cleaning to remove stains, odors, and allergens.",
      price: 90,
      image: "carpet.jpg"
    },
    {
      name: "Move-In/Move-Out",
      desc: "Thorough cleaning before moving in or out. Landlords love it!",
      price: 200,
      image: "move.jpg"
    }
  ];

  // Render on services.html
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid) {
    servicesGrid.innerHTML = "<p>Loading services...</p>";

    setTimeout(() => {
      const html = services.map(s => `
        <article class="service-card">
          <img src="images/${s.image}" alt="${s.name}" loading="lazy">
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <p class="price"><strong>Starting at $${s.price}</strong></p>
          <a href="#booking" class="btn btn-primary">Book Now</a>
        </article>
      `).join("");

      servicesGrid.innerHTML = html;
    }, 100);
  }

  // Render preview on index.html (first 2 services)
  const servicesList = document.getElementById("services-list");
  if (servicesList) {
    const previewHTML = services.slice(0, 2).map(s => `
      <div class="service-card">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <p class="price"><strong>From: $${s.price}</strong></p>
      </div>
    `).join("");
    servicesList.innerHTML = previewHTML;
  }

  // ============ 4. TESTIMONIAL SLIDER ============
  const quoteEl = document.getElementById("quote");
  const nextBtn = document.getElementById("next-testimonial");
  const prevBtn = document.getElementById("prev-testimonial");

  const testimonials = [
    "The team was punctual, respectful, and did an amazing job. My home has never looked better!",
    "Affordable, reliable, and clean. I'll definitely use them again for my office.",
    "As a youth group, they showed great responsibility and attention to detail."
  ];

  let currentQuoteIndex = 0;

  function showCurrentQuote() {
    if (quoteEl) {
      quoteEl.textContent = `"${testimonials[currentQuoteIndex]}"`;
    }
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % testimonials.length;
      showCurrentQuote();
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentQuoteIndex = (currentQuoteIndex - 1 + testimonials.length) % testimonials.length;
      showCurrentQuote();
    });
  }

  // Auto-rotate every 6 seconds
  if (quoteEl) {
    setInterval(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % testimonials.length;
      showCurrentQuote();
    }, 6000);
  }

  // Show first quote
  if (quoteEl) showCurrentQuote();

  // ============ 5. BOOKING FORM HANDLING ============
  const bookingForm = document.getElementById("booking-form");
  const confirmation = document.getElementById("confirmation");
  const confirmName = document.getElementById("confirm-name");
  const confirmService = document.getElementById("confirm-service");
  const confirmDate = document.getElementById("confirm-date");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent reload

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;

      // Validation
      if (!name || !email || !service || !date) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Format date
      const formattedDate = new Date(date).toLocaleDateString();

      // Update confirmation message
      confirmName.textContent = name;
      confirmService.textContent = service;
      confirmDate.textContent = formattedDate;

      // Save to localStorage
      const request = {
        name,
        email,
        service,
        date,
        timestamp: new Date().toLocaleString()
      };

      const requests = JSON.parse(localStorage.getItem("cleaningRequests")) || [];
      requests.push(request);
      localStorage.setItem("cleaningRequests", JSON.stringify(requests));

      // ✅ Show success message
      confirmation.classList.remove("hidden");

      // 🛑 Hide the form
      bookingForm.style.display = "none";

      // ➕ Add "Book Another" button
      const container = bookingForm.parentElement;
      const bookAnotherBtn = document.createElement("a");
      bookAnotherBtn.href = "#";
      bookAnotherBtn.textContent = "Book Another Cleaning";
      bookAnotherBtn.className = "btn btn-primary";
      bookAnotherBtn.style.display = "block";
      bookAnotherBtn.style.marginTop = "1rem";
      bookAnotherBtn.style.textAlign = "center";

      bookAnotherBtn.addEventListener("click", function (e) {
        e.preventDefault();
        bookingForm.style.display = "block";
        confirmation.classList.add("hidden");
        container.appendChild(bookingForm); // Re-append if needed
        bookingForm.reset();
        container.removeChild(bookAnotherBtn);
      });

      container.appendChild(bookAnotherBtn);
    });
  }

  // ============ 6. LAZY-LOAD IMAGE FADE-IN ============
  const images = document.querySelectorAll("img[loading='lazy']");
  images.forEach(img => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
    if (img.complete) {
      img.classList.add("loaded");
    }
    // ============ 7. ANIMATE STATS COUNTERS ============
function animateCounter(id, target, duration = 2000) {
  const element = document.getElementById(id);
  if (!element) return;

  let start = 0;
  const increment = Math.ceil(target / (duration / 30)); // 30ms per step
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = start.toLocaleString();
  }, 30);
}

// Trigger when stats section is in view
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter("counter-jobs", 24);
        animateCounter("counter-homes", 350);
        animateCounter("counter-eco", 1200);
        observer.unobserve(entry.target); // Run once
      }
    });
  }, { threshold: 0.1 });

  observer.observe(statsSection);
}
  });
});
