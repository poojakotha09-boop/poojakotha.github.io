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
