// Dark Mode
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

/* =====================================================
   MICRO HOVER EFFECT — SKILLS / PROJECTS / CONTACT
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
        rgba(99,102,241,0.12),
        transparent 40%
      ),
      #020617
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '#020617';
  });
});
