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

  switch (action) {
    case "view":
      window.open(STATE.resumePath, "_blank");
      break;

    case "download":
      downloadFile(STATE.resumePath, "KothaUshaResume.pdf");
      break;

    default:
      console.warn("Unknown resume action:", action);
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

    if (level === "all" || skillLevel === level) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
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

  /* Resume Buttons */
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

/* =====================================
   RESUME ACTION HANDLING (INTERVIEW SAFE)
===================================== */

document.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "view-resume") {
    window.open("UshaKothaResume.pdf", "_blank");
  }

  if (action === "download-resume") {
    const link = document.createElement("a");
    link.href = "UshaKothaResume.pdf";
    link.download = "UshaKothaResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});

/* =====================================
   PAGE CONTEXT DETECTION
===================================== */

const body = document.body;
const path = window.location.pathname;

if (!path.includes("index")) {
  body.classList.add("inner-page");
}


