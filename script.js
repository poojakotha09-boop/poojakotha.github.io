/* =====================================================
   GLOBAL STATE
===================================================== */
const STATE = {
  theme: localStorage.getItem("theme") || "dark",
  resumePath: "KothaUshaResume.pdf"
};

/* =====================================================
   INITIALIZATION
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  detectPageContext();
  applyTheme();
  bindUIEvents();
});

/* =====================================================
   PAGE CONTEXT DETECTION (NO DUPLICATES)
===================================================== */
function detectPageContext() {
  const body = document.body;
  const path = window.location.pathname;

  if (path.includes("index") || path === "/" || path === "") {
    body.classList.add("home-page");
  } else {
    body.classList.add("inner-page");
  }
}

/* =====================================================
   THEME LOGIC
===================================================== */
function applyTheme() {
  if (STATE.theme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");

  STATE.theme = document.body.classList.contains("light")
    ? "light"
    : "dark";

  localStorage.setItem("theme", STATE.theme);
}

/* =====================================================
   RESUME HANDLING (PROBLEM SOLVING)
===================================================== */
function handleResume(action) {
  if (!STATE.resumePath) {
    console.error("Resume path not found");
    return;
  }

  if (action === "view") {
    window.open(STATE.resumePath, "_blank");
  }

  if (action === "download") {
    const link = document.createElement("a");
    link.href = STATE.resumePath;
    link.download = "KothaUshaResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/* =====================================================
   SKILL FILTERING (LOGIC + DOM)
===================================================== */
function filterSkills(level) {
  document.querySelectorAll(".skill-card").forEach(card => {
    const skillLevel = card.dataset.level;
    card.style.display =
      level === "all" || skillLevel === level ? "block" : "none";
  });
}

/* =====================================================
   EVENT BINDING
===================================================== */
function bindUIEvents() {
  /* Theme toggle */
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  /* Resume buttons */
  document.querySelectorAll("[data-resume]").forEach(btn => {
    btn.addEventListener("click", e => {
      handleResume(e.target.dataset.resume);
    });
  });

  /* Skill filters */
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", e => {
      filterSkills(e.target.dataset.filter);
    });
  });
}

/* =========================================
   PAGE STATE DETECTION
   Shows problem-solving skill
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = window.location.pathname.split("/").pop();

  // Default = Home page
  if (page === "" || page === "index.html") {
    body.classList.add("page-home");
  } else {
    body.classList.add("page-inner");
  }
});
