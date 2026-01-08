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
    downloadFile(STATE.resumePath, "KothaUshaResume.pdf");
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
      handleResume(e.target.dataset.resume);
    });
  });

  /* Skill Filter Buttons */
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", e => {
      filterSkills(e.target.dataset.filter);
    });
  });
}

/* =====================================================
   RESUME ACTION HANDLING (INTERVIEW SAFE)
===================================================== */
document.addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "view-resume") {
    window.open(STATE.resumePath, "_blank");
  }

  if (action === "download-resume") {
    downloadFile(STATE.resumePath, "KothaUshaResume.pdf");
  }
});

/* =====================================================
   PAGE CONTEXT DETECTION
   (Home vs Inner Pages)
===================================================== */
function detectPageContext() {
  const body = document.body;
  const page = window.location.pathname.split("/").pop();

  if (page === "" || page === "index.html") {
    body.classList.add("home-page");
    body.classList.add("page-home");
  } else {
    body.classList.add("inner-page");
    body.classList.add("page-inner");
  }
}

/* =========================================
   PAGE TRANSITION FADE (SAFE VERSION)
========================================= */

document.querySelectorAll("a[href]").forEach(link => {
  const href = link.getAttribute("href");

  // ❌ Skip resume actions
  if (link.dataset.resume) return;

  // ❌ Skip new tabs & downloads
  if (link.hasAttribute("download")) return;
  if (link.getAttribute("target") === "_blank") return;

  // Only internal HTML navigation
  if (
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http") &&
    !href.startsWith("mailto") &&
    href.endsWith(".html")
  ) {
    link.addEventListener("click", e => {
      e.preventDefault();

      document.body.classList.add("page-fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  }
});
