// Typing Effect
let words = ["web developer", "web designer", "coder", "problem solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 60;
let pauseTime = 800;

function typingEffect() {
    let currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    document.getElementById("typing").innerText = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, pauseTime);
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typingEffect, isDeleting ? deletingSpeed : typingSpeed);
}

// Dark/Light Mode Toggle
let BTN = document.getElementById("BTN");
let imgO = document.getElementById("Image");
let leftimg = document.getElementById("leftImg");

function toggle() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        BTN.innerHTML = "&#127774";
        imgO.style.filter = "grayscale(100%)";
        leftimg.style.border = "6px solid white";
        localStorage.setItem("theme", "dark");
    } else {
        BTN.innerHTML = "&#127769";
        imgO.style.filter = "grayscale(0%)";
        leftimg.style.border = "6px solid rgb(122, 122, 42)";
        localStorage.setItem("theme", "light");
    }
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        BTN.innerHTML = "&#127774";
        imgO.style.filter = "grayscale(100%)";
        leftimg.style.border = "6px solid white";
    }
}

// Floating Skills Animation
// const balls = document.querySelectorAll(".ball");
const box = document.querySelector(".skill-box");

function initFloatingAnimation() {
    if (!box) return;
    
    balls.forEach(ball => {
        let x = Math.random() * (box.clientWidth - 80);
        let y = Math.random() * (box.clientHeight - 80);
        let dx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.5 + 0.2);
        let dy = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.5 + 0.2);

        function move() {
            x += dx;
            y += dy;
            
            // Add some randomness to movement
            dx += (Math.random() - 0.5) * 0.01;
            dy += (Math.random() - 0.5) * 0.01;
            
            // Bounce off walls
            if (x <= 0 || x + 80 >= box.clientWidth) dx *= -1;
            if (y <= 0 || y + 80 >= box.clientHeight) dy *= -1;
            
            // Apply movement
            ball.style.left = x + "px";
            ball.style.top = y + "px";
            
            // Continue animation
            requestAnimationFrame(move);
        }
        
        move();
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const rightNav = document.getElementById("rightNav");
    
    if (mobileMenuBtn && rightNav) {
        mobileMenuBtn.addEventListener("click", () => {
            rightNav.classList.toggle("active");
            mobileMenuBtn.innerHTML = rightNav.classList.contains("active") ? "×" : "☰";
        });
        
        // Close menu when clicking on a link
        const navLinks = rightNav.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                rightNav.classList.remove("active");
                mobileMenuBtn.innerHTML = "☰";
            });
        });
    }
}

// Animate Skill Bars on Scroll
function initSkillBars() {
    const bars = document.querySelectorAll(".bar");
    
    function animateBars() {
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Animate on page load
    setTimeout(animateBars, 500);
    
    // Animate when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

document.addEventListener("DOMContentLoaded", () => {

  const supabaseUrl = "https://svlgsstqbosbsbafijzp.supabase.co";
  const supabaseKey = "sb_publishable_9KzjYlwdyDihZ4t4BV-f9g_g1grEXq4";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      status.innerText = "Something went wrong ❌";
      console.error(error);
    } else {
      status.innerText = "Message sent successfully ✅";
      form.reset();
    }
  });

});


// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function() {
    // Start typing effect
    typingEffect();
    
    // Check for saved theme
    checkTheme();
    
    // Initialize animations
    initFloatingAnimation();
    initSkillBars();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Add resize listener for responsive adjustments
    window.addEventListener("resize", function() {
        // Reinitialize floating animation on resize
        if (window.innerWidth > 768) {
            initFloatingAnimation();
        }
    });
});
// Improved Floating Animation for all screen sizes
const balls = document.querySelectorAll(".ball");
const skillBox = document.querySelector(".skill-box");

function initFloatingAnimation() {
    if (!skillBox) return;
    
    balls.forEach(ball => {
        // Calculate positions based on screen size
        const boxWidth = skillBox.clientWidth;
        const boxHeight = skillBox.clientHeight;
        const ballSize = ball.offsetWidth;
        
        // Set initial random position
        let x = Math.random() * (boxWidth - ballSize);
        let y = Math.random() * (boxHeight - ballSize);
        
        // Adjust speed based on screen size
        let baseSpeed = window.innerWidth < 768 ? 0.1 : 0.2;
        let dx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * baseSpeed + 0.1);
        let dy = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * baseSpeed + 0.1);

        function move() {
            if (!skillBox) return;
            
            x += dx;
            y += dy;
            
            // Gentle random movement
            dx += (Math.random() - 0.5) * 0.02;
            dy += (Math.random() - 0.5) * 0.02;
            
            // Keep speed within limits
            const maxSpeed = window.innerWidth < 768 ? 0.3 : 0.5;
            dx = Math.max(Math.min(dx, maxSpeed), -maxSpeed);
            dy = Math.max(Math.min(dy, maxSpeed), -maxSpeed);
            
            // Bounce off walls
            if (x <= 0) {
                x = 0;
                dx = Math.abs(dx);
            }
            if (x + ballSize >= boxWidth) {
                x = boxWidth - ballSize;
                dx = -Math.abs(dx);
            }
            if (y <= 0) {
                y = 0;
                dy = Math.abs(dy);
            }
            if (y + ballSize >= boxHeight) {
                y = boxHeight - ballSize;
                dy = -Math.abs(dy);
            }
            
            // Apply movement with boundary check
            ball.style.left = Math.max(0, Math.min(x, boxWidth - ballSize)) + "px";
            ball.style.top = Math.max(0, Math.min(y, boxHeight - ballSize)) + "px";
            
            // Continue animation
            requestAnimationFrame(move);
        }
        
        // Set initial position
        ball.style.left = x + "px";
        ball.style.top = y + "px";
        
        // Start animation
        move();
    });
}


let resizeTimeout;
window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initFloatingAnimation();
    }, 250); // Debounce resize event
});


document.addEventListener("DOMContentLoaded", function() {

    setTimeout(initFloatingAnimation, 100);
});


function initSkillBars() {
    const bars = document.querySelectorAll(".bar");
    
    function animateBars() {
        bars.forEach(bar => {
            const width = bar.getAttribute("data-width") || "0%";
            bar.style.width = width;
        });
    }
    
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

initSkillBars();
