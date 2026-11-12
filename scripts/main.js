// MOBILE MENU
let navToggle = document.querySelector(".nav-toggle");
let navLinks = document.querySelector(".nav-links");
let navLinkItems = document.querySelectorAll(".nav-links a");
let closeButton = document.querySelector(".close-button");

if (navToggle && navLinks) {
  function setNavState(isOpen) {
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", isOpen);
  }

  navToggle.addEventListener("click", () => {
    let isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isOpen);
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      setNavState(false);
    });
  }

  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      setNavState(false);
    });
  });

  document.addEventListener("click", (event) => {
    let isOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isOpen && !navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      setNavState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      setNavState(false);
    }
  });
}


// BACK TO TOP
let backToTop = document.querySelector(".back-to-top");
let customCursor = document.querySelector(".custom-cursor");
let cursorImage = customCursor ? customCursor.querySelector("img") : null;

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 420) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// CUSTOM CURSOR
if (customCursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let defaultCursorSrc = cursorImage ? cursorImage.dataset.defaultSrc : "";
  let altCursorSrc = cursorImage ? cursorImage.dataset.altSrc : "";
  let coralCursorTargets = document.querySelectorAll(".carousel-btn:not(.carousel-btn-blue):not(.carousel-btn-purple), .visit-hero-btn");
  document.documentElement.classList.add("has-custom-cursor");

  function setCursorVariant(useAlt) {
    if (!cursorImage) return;

    cursorImage.src = useAlt && altCursorSrc ? altCursorSrc : defaultCursorSrc;
  }

  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = e.clientX + "px";
    customCursor.style.top = e.clientY + "px";
    customCursor.classList.add("is-visible");
  });

  document.addEventListener("mousedown", () => {
    customCursor.classList.add("is-active");
  });

  document.addEventListener("mouseup", () => {
    customCursor.classList.remove("is-active");
  });

  document.addEventListener("mouseleave", () => {
    customCursor.classList.remove("is-visible");
  });

  coralCursorTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      setCursorVariant(true);
    });

    target.addEventListener("mouseleave", () => {
      setCursorVariant(false);
    });
  });
}


// CAROUSEL
let carousel = document.querySelector(".carousel");
let slides = document.querySelectorAll(".carousel-slide");
let dots = document.querySelectorAll(".carousel-dot");

if (carousel && slides.length > 0 && dots.length > 0) {
  let current = 0;
  let interval;
  let isWrapping = false;
  let transitionSpeed = 850;

  function updateDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
      dot.setAttribute("aria-pressed", dotIndex === index ? "true" : "false");
    });
  }

  function showSlide(index) {
    if (isWrapping) return;

    if (current === slides.length - 1 && index === 0) {
      isWrapping = true;
      updateDots(index);

      slides.forEach((slide, slideIndex) => {
        if (slideIndex === current) {
          slide.style.transition = `transform ${transitionSpeed}ms ease-in-out`;
          slide.style.transform = "translateX(0%)";
          slide.classList.add("active");
        } else if (slideIndex === index) {
          slide.style.transition = "none";
          slide.style.transform = "translateX(100%)";
          slide.classList.add("active");
        } else {
          slide.style.transition = "none";
          slide.style.transform = "translateX(100%)";
          slide.classList.remove("active");
        }
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slides[current].style.transform = "translateX(-100%)";
          slides[index].style.transition = `transform ${transitionSpeed}ms ease-in-out`;
          slides[index].style.transform = "translateX(0%)";
        });
      });

      setTimeout(() => {
        slides.forEach((slide, slideIndex) => {
          let offset = (slideIndex - index) * 100;
          slide.style.transition = "";
          slide.style.transform = `translateX(${offset}%)`;
          slide.classList.toggle("active", slideIndex === index);
        });

        current = index;
        isWrapping = false;
      }, transitionSpeed);

      return;
    }

    slides.forEach((slide, slideIndex) => {
      let offset = (slideIndex - index) * 100;
      slide.style.transform = `translateX(${offset}%)`;
      slide.classList.toggle("active", slideIndex === index);
    });

    updateDots(index);
    current = index;
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  function startCarousel() {
    stopCarousel();

    interval = setInterval(() => {
      current += 1;

      if (current == slides.length) {
        current = 0;
      }

      showSlide(current);
    }, 4500);
  }

  function goToPreviousSlide() {
    stopCarousel();
    current -= 1;

    if (current < 0) {
      current = slides.length - 1;
    }

    showSlide(current);
    startCarousel();
  }

  function goToNextSlide() {
    stopCarousel();
    current += 1;

    if (current == slides.length) {
      current = 0;
    }

    showSlide(current);
    startCarousel();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopCarousel();
      showSlide(index);
      startCarousel();
    });
  });

  showSlide(current);
  startCarousel();
}


// ANIMAL CARDS
let animalCards = document.querySelectorAll(".animal-card");

if (animalCards.length > 0) {
  animalCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        card.classList.toggle("is-flipped");
      }
    });
  });
}


// FAQ
let faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    let button = item.querySelector(".faq-question");
    let icon = item.querySelector(".faq-icon");

    if (!button || !icon) return;

    button.addEventListener("click", () => {
      let isOpen = item.classList.contains("active");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");

        let faqButton = faqItem.querySelector(".faq-question");
        let faqIcon = faqItem.querySelector(".faq-icon");

        if (faqButton) faqButton.setAttribute("aria-expanded", "false");
        if (faqIcon) faqIcon.textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        icon.textContent = "−";
      }
    });
  });
}

// Keep mobile dots below the text panel, separated from its last button.
(() => {
  const hero = document.querySelector('.explore-hero');
  if (!hero) return;
  const panels = [...hero.querySelectorAll('.carousel-content')];
  const positionDots = () => {
    const tallest = Math.max(0, ...panels.map(panel => panel.offsetHeight));
    hero.style.setProperty('--carousel-dots-top', `${hero.clientHeight / 2 + tallest / 2 + 20}px`);
  };
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(positionDots);
    observer.observe(hero);
    panels.forEach(panel => observer.observe(panel));
  }
  window.addEventListener('resize', positionDots);
  document.fonts?.ready.then(positionDots);
  positionDots();
})();
