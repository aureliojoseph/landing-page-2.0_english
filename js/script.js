///////////////////////////////////////////////////////////
// Dark/Light Mode button
function toggleDarkMode() {
  const html = document.documentElement
  html.classList.toggle('light')
}

///////////////////////////////////////////////////////////
// Language Mode
const langBtn = document.querySelector('#lang-btn');
const translateElements = document.querySelectorAll('.translate');

fetch('./translations.json')
  .then(response => response.json())
  .then(data => {
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'pt' : 'en';

      translateElements.forEach(element => {
        const key = element.dataset.translationKey;
        element.textContent = data[currentLang][key];
      });
    });
  });

///////////////////////////////////////////////////////////
// Current Year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Mobile Navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const mainHeaderEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  mainHeaderEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth Scrolling Animation
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close Mobile Navigation
    if (link.classList.contains("main-nav-link"))
      mainHeaderEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky Navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky-border");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky-border");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-60px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();