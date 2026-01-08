/* =====================================================
   GLOBAL STATE
===================================================== */
const STATE = {
  theme: localStorage.getItem("theme") || "dark",
  resumePath: "UshaKothaResume.pdf"
};

/* =====================================================
   INITIALIZATION
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  bindUIEvents();
  detectPageContext();
});

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
   RESUME HANDLING (PROBLEM-SOLVING LOGIC)
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
    downloadFile(STATE.resumePath, "UshaKothaResume.pdf");
  }
}

function downloadFile(path, filename) {
  const link = document.createElement("a");
  link.href = path;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* =====================================================
   SKILL FILTERING (DSA + DOM LOGIC)
===================================================== */
function filterSkills(level) {
  const cards = document.querySelectorAll(".skill-card");

  cards.forEach(card => {
    const skillLevel = card.dataset.level;

    card.style.display =
      level === "all" || skillLevel === level
        ? "block"
        : "none";
  });
}

/* =====================================================
   UTILITY FUNCTIONS
===================================================== */
function openExternalLink(url) {
  if (!url) {
    console.error("Invalid URL");
    return;
  }
  window.open(url, "_blank", "noopener");
}

/* =====================================================
   EVENT BINDING (CLEAN & SCALABLE)
===================================================== */
function bindUIEvents() {
  /* Theme Toggle */
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  /* Resume Buttons (data-resume) */
  document.querySelectorAll("[data-resume]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault(); // ensure anchor doesn’t override JS
      handleResume(e.currentTarget.dataset.resume);
    });
  });

  /* Skill Filter Buttons */
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", e => {
      filterSkills(e.currentTarget.dataset.filter);
    });
  });
}

/* =====================================================
   PAGE CONTEXT DETECTION
   (BIG profile on home, MINI on inner pages)
===================================================== */
function detectPageContext() {
  const body = document.body;
  const page = window.location.pathname.split("/").pop();

  if (page === "" || page === "index.html") {
    body.classList.add("page-home");
    body.classList.remove("page-inner");
  } else {
    body.classList.add("page-inner");
    body.classList.remove("page-home");
  }
}
