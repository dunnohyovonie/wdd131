// List of cleaning services offered
const services = [
  { id: "clean101", name: "Home Interior Cleaning" },
  { id: "clean102", name: "Window & Glass Cleaning" },
  { id: "clean103", name: "Yard Work & Landscaping" },
  { id: "clean104", name: "Carpet & Upholstery Cleaning" },
  { id: "clean105", name: "Move-In/Move-Out Deep Clean" }
];

// Populate service dropdown
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("serviceType");

  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    select.appendChild(option);
  });

  // Update current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});