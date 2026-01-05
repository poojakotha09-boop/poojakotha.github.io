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
