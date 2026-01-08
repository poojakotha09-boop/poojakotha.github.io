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
});
