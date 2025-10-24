// ---- Config ----
const CONTACT_EMAIL = ""; // <- add your email later like "tapon@example.com"
const CONTACT_URL = "https://www.linkedin.com/in/tapon-paul-174267351/";

// Theme handling
const root = document.documentElement;
const THEME_KEY = "simple-portfolio-theme";

// Set theme (light/dark)
function setTheme(mode) {
  if (mode === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
  localStorage.setItem(THEME_KEY, mode);
}

// Initialize theme based on localStorage or system preferences
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    setTheme(saved);
  } else {
    const prefersLight = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }
})();

// Event listener for theme toggle button
document.getElementById("themeToggle").addEventListener("click", () => {
  const isLight = root.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const menu = document.getElementById("menu");
navToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// Set the current year in the footer dynamically
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form handling -> email if provided, else LinkedIn
function handleContactSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById("name").value || "").trim();
  const email = (document.getElementById("email").value || "").trim();
  const message = (document.getElementById("message").value || "").trim();

  if (CONTACT_EMAIL) {
    // If an email is provided, create a mailto link
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  } else {
    // Fallback: open LinkedIn profile to message you there
    window.open(CONTACT_URL, "_blank", "noopener");
  }
  return false;
}

// Handle the "Dataset" link clicks (if applicable)
function handleDatasetLink() {
  window.open("https://data.mendeley.com/datasets/w8sr775pjb/5", "_blank", "noopener");
}

// Handle the "Research Article" link clicks (if applicable)
function handleResearchLink() {
  window.open("https://doi.org/10.1016/j.dib.2025.112174", "_blank", "noopener");
}

// Event listener for Dataset and Research Article links
document.getElementById("datasetLink").addEventListener("click", handleDatasetLink);
document.getElementById("researchLink").addEventListener("click", handleResearchLink);

// Mobile nav toggle (for better accessibility and visibility)
const mobileNavToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("menu");
mobileNavToggle.addEventListener("click", () => {
  const menuIsOpen = mobileMenu.classList.toggle("open");
  mobileNavToggle.setAttribute("aria-expanded", String(menuIsOpen));
});
