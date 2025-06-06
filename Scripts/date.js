const lastModified = new Date(document.lastModified);
const formatted = lastModified.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
document.getElementById("lastModified").textContent = formatted;
