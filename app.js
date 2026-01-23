// Navbar scroll effect
const navbar = document.getElementById("navbar");
const homeSection = document.getElementById("home");

window.addEventListener("scroll", () => {
  const homeBottom = homeSection.offsetHeight - 80;

  if (window.scrollY > homeBottom) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Typing Text Animation =====
const texts = [
  "Web Developer",
  "Frontend Developer",
  "UI/UX Designer"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 80;
const delayBetweenTexts = 1200;

const typingElement = document.querySelector(".typing-text");

function typeEffect() {
  const currentText = texts[index];

  if (!isDeleting) {
    typingElement.textContent = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => isDeleting = true, delayBetweenTexts);
    }
  } else {
    typingElement.textContent = currentText.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

// ===== Contact Form with Loading Spinner =====
const form = document.querySelector(".contact-form");
const message = document.querySelector(".form-message");
const button = document.querySelector(".contact-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  // ❌ Error state
  if (!isValid) {
    message.textContent = "Please fill all fields!";
    message.className = "form-message error";
    form.classList.add("shake");

    setTimeout(() => form.classList.remove("shake"), 400);
    return;
  }

  // ⏳ Loading state
  button.classList.add("loading");
  message.style.opacity = "0";

  // ⏱ Simulate sending (fake API delay)
  setTimeout(() => {
    button.classList.remove("loading");

    // ✅ Success
    

    setTimeout(() => {
      message.style.opacity = "0";
    }, 3000);
  }, 2000);
});




// ===== About Section Counters =====
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.dataset.target;
  let count = 0;
  const increment = target / 80;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
