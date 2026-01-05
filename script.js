/* =====================================================
   THEME TOGGLE — CLEAN & RELIABLE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  if (!themeToggle) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀";
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    const isLight = body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙" : "☀";
  });

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
          rgba(127, 227, 195, 0.22),
          transparent 40%
        ),
        var(--bg-secondary)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "var(--bg-secondary)";
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
});
