/* =====================================================
   THEME SYSTEM — AUTO DETECT + USER OVERRIDE
===================================================== */

const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

/* 1️⃣ Detect system preference */
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

/* 2️⃣ Load saved preference OR system preference */
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  body.classList.toggle('light-theme', savedTheme === 'light');
} else {
  body.classList.toggle('light-theme', systemPrefersLight);
}

/* 3️⃣ Set correct icon */
toggleBtn.textContent = body.classList.contains('light-theme') ? '🌙' : '☀️';

/* 4️⃣ Toggle manually */
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');

  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  toggleBtn.textContent = isLight ? '🌙' : '☀️';
});

/* =====================================================
   MICRO HOVER GLOW — SKILLS / PROJECTS / CONTACT
===================================================== */

const cards = document.querySelectorAll('.skill-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(125,168,123,0.18),
        transparent 40%
      ),
      var(--bg-hover)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--bg-card)';
  });
});


document.querySelectorAll(".contact-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});


/* ===== Existing JS code above (leave it as-is) ===== */


/* =====================================================
   THEME TOGGLE (ADD THIS AT THE END)
===================================================== */
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (toggleBtn) {
  // Load saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀";
    }
  });
}

// ===============================
// Theme Toggle (Dark / Light)
// ===============================

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-theme");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  const isLight = body.classList.contains("light-theme");

  themeToggle.textContent = isLight ? "🌙" : "☀";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
