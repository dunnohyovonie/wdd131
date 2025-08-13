/**
 * Liahona Youth Cleaning - Final Project (W06)
 * Unified JavaScript for all pages
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============ 1. MOBILE MENU TOGGLE ============
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector("nav ul");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("show");
    });
  }

  // Highlight active page in navigation
  const currentPage = window.location.basename = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // ============ 2. SERVICES DATA & RENDERING ============
  const services = [
    {
      name: "Residential Cleaning",
      desc: "Deep cleaning for homes, including kitchens, bathrooms, bedrooms, and living areas. Perfect for move-ins, move-outs, or regular maintenance.",
      price: 90,
      image: "cleaning1.jpg"
    },
    {
      name: "Commercial Cleaning",
      desc: "Professional cleaning for offices, retail stores, and church facilities. We help keep your workspace healthy and welcoming.",
      price: 120,
      image: "cleaning2.jpg"
    },
    {
      name: "Sanitization",
      desc: "High-touch surface disinfection using EPA-approved products. Ideal for homes and businesses concerned about germs and illness prevention.",
      price: 110,
      image: "sanitization.jpg"
    },
    {
      name: "Pest Control",
      desc: "Safe, humane removal of ants, spiders, rodents, and other pests. Includes prevention tips and follow-up recommendations.",
      price: 150,
      image: "pest.jpg"
    }
  ];

  // Render services on services.html
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid) {
    servicesGrid.innerHTML = "<p>Loading services...</p>";

    // Simulate small delay for better UX (optional)
    setTimeout(() => {
      const html = services.map(s => `
        <article class="service-card">
          <img src="images/${s.image}" alt="Professional ${s.name}" loading="lazy">
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <p><strong>Starting at: $${s.price}</strong></p>
          <a href="contact.html" class="btn">Schedule ${s.name}</a>
        </article>
      `).join("");

      servicesGrid.innerHTML = html;
    }, 100);
  }

  // Render service preview on index.html (first 2 services)
  const servicesList = document.getElementById("services-list");
  if (servicesList) {
    const previewHTML = services.slice(0, 2).map(s => `
      <div class="service-card">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <p><strong>From: $${s.price}</strong></p>
      </div>
    `).join("");
    servicesList.innerHTML = previewHTML;
  }

  // ============ 3. TESTIMONIAL SLIDER ============
  const quoteEl = document.getElementById("quote");
  const nextBtn = document.getElementById("next-testimonial");

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

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % testimonials.length;
      showCurrentQuote();
    });
  }

  // Show first quote on load
  if (quoteEl) showCurrentQuote();

  // ============ 4. CONTACT FORM HANDLING ============
  const form = document.getElementById("contact-form");
  const lastSubmissionEl = document.getElementById("last-submission");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();

      // Simple validation
      if (!name || !email) {
        alert("Please fill in all required fields (Name and Email).");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Gather form data
      const request = {
        name,
        email,
        service: form.service.value,
        date: form.date.value || "Not specified",
        message: form.message.value || "None",
        timestamp: new Date().toLocaleString()
      };

      // Save to localStorage
      const requests = JSON.parse(localStorage.getItem("cleaningRequests")) || [];
      requests.push(request);
      localStorage.setItem("cleaningRequests", JSON.stringify(requests));

      // Success feedback
      alert(`Thank you, ${request.name}! We'll contact you shortly about your ${request.service} request.`);
      form.reset();

      // Update last submission display
      if (lastSubmissionEl) {
        lastSubmissionEl.innerHTML = `
          <p style="color: green; margin-top: 1rem;">
            ✅ Last request: <strong>${request.name}</strong> for <em>${request.service}</em> on ${request.timestamp}
          </p>`;
      }
    });

    // On page load: show last submission (if exists)
    if (lastSubmissionEl) {
      const requests = JSON.parse(localStorage.getItem("cleaningRequests")) || [];
      if (requests.length > 0) {
        const last = requests[requests.length - 1];
        lastSubmissionEl.innerHTML = `
          <p style="color: green; margin-top: 1rem;">
            ✅ Last request: <strong>${last.name}</strong> for <em>${last.service}</em> on ${last.timestamp}
          </p>`;
      }
    }
  }
});