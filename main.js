// -----------------------------------------------------------------------------
// The Guitarist - page behaviour
// Each function does one small job so they are easy to change or remove.
// Add new behaviour by writing a function and calling it from the listeners
// at the bottom of the file.
//
// Needs Live Server (or any local server) - ES modules do not load from file://
// -----------------------------------------------------------------------------
//grabbing the elements we need from the page
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

//show the button once the hero has been scrolled past
function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

//highlight the nav link that matches the section on screen
function highlightNavLink() {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

//sending the user back to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  toggleBackToTop();
  highlightNavLink();
});

backToTop.addEventListener("click", scrollToTop);
