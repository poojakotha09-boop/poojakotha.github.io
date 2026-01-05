/* =====================================================
   MICRO HOVER GLOW — UNIQUE OLIVE THEME
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
