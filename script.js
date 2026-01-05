/* =====================================================
   THEME TOGGLE + MICRO HOVER GLOW
===================================================== */

const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

/* Load saved theme */
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-theme');
  toggleBtn.textContent = '🌙';
}

/* Toggle theme */
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');

  const isLight = body.classList.contains('light-theme');
  toggleBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* =====================================================
   MICRO HOVER GLOW — SKILL / PROJECT / CONTACT CARDS
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
