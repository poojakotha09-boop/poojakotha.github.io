/* =====================================================
   THEME SYSTEM — AUTO DETECT + USER OVERRIDE
===================================================== */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

/* Detect system preference */
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

/* Load saved theme OR system preference */
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.toggle("light-theme", savedTheme === "light");
} else {
  body.classList.toggle("light-theme", systemPrefersLight);
}

/* Set correct icon */
if (themeToggle) {
  themeToggle.textContent = body.classList.contains("light-theme") ? "🌙" : "☀";
}

/* Toggle theme manually */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    const isLight = body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙" : "☀";
  });
}

/* =====================================================
   MICRO HOVER GLOW — SKILLS / PROJECTS
===================================================== */

document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(125,168,123,0.18),
        transparent 40%
      ),
      var(--bg-card)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "var(--bg-card)";
  });
});

/* =====================================================
   CONTACT CARD CURSOR GLOW
===================================================== */

document.querySelectorAll(".contact-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});
