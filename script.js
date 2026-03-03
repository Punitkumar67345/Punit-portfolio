// 1. PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("preloader-hidden");
  }, 500); 
});

// 2. THEME TOGGLE (WITH LOCAL STORAGE FIX)
const themeToggle = document.getElementById("theme-toggle");

// Step 1: Page load hote hi check karo ki purani memory mein kya save hai
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light"); // Theme light kar do
  themeToggle.checked = true; // Toggle button (Sun/Moon) ko bhi right side set kar do
}

// Step 2: Jab koi button dabaye, toh theme change karo aur memory mein save kar lo
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  
  // Agar light mode on hai, toh 'light' save karo, warna 'dark' save karo
  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// 3. TYPING EFFECT
const text = ["Frontend Developer", "UI Designer", "React Learner"];
let i = 0, j = 0, currentText = "", isDeleting = false;
function type() {
  const typing = document.getElementById("typing");
  currentText = text[i];
  if (!isDeleting) {
    typing.textContent = currentText.slice(0, j++);
    if (j > currentText.length) { isDeleting = true; setTimeout(type, 1200); return; }
  } else {
    typing.textContent = currentText.slice(0, j--);
    if (j === 0) { isDeleting = false; i = (i + 1) % text.length; }
  }
  setTimeout(type, isDeleting ? 40 : 80);
}
type();

// 4. SCROLL REVEAL ANIMATION
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// 5. ACTIVE NAV HIGHLIGHT (SCROLLSPY)
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navbar ul li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach((li) => {
    li.classList.remove("active-link");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active-link");
    }
  });
});

// 6. CURSOR GLOW EFFECT
const cursorGlow = document.createElement("div");
cursorGlow.classList.add("cursor-glow");
document.body.appendChild(cursorGlow);
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// 7. MAGNETIC BUTTON EFFECT
const btn = document.querySelector(".hero button");
if (btn) {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0px, 0px)";
    btn.style.transition = "transform 0.3s ease";
  });
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "none";
  });
}

// 8. 3D TILT EFFECT FOR PROJECT CARDS
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transition = "none"; 
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"; 
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});