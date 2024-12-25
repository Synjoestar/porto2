
AOS.init({
  duration: 1000,
  once: true
});

// Typewriter Animation
const text = document.querySelector('.typewriter');
const originalText = text.textContent;
text.textContent = '';

let i = 0;
function typeWriter() {
  if (i < originalText.length) {
      text.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
  }
}


window.addEventListener('load', typeWriter);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('page-transition');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card').forEach((element) => {
    observer.observe(element);
});


const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');


document.documentElement.setAttribute('data-theme', 
    prefersDarkScheme.matches ? 'dark' : 'light'
);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    localStorage.setItem('theme', newTheme);
});

// cek theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}


document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item .typing');
    
    skillItems.forEach((item, index) => {
        const text = item.textContent;
        const width = getTextWidth(text);
        
        // Hapus Original Text
        item.textContent = '';
        
        // Animasi Typing
        let charIndex = 0;
        const typingDelay = 100;
        const startDelay = index * 1000;

        setTimeout(() => {
            const typing = setInterval(() => {
                if (charIndex < text.length) {
                    item.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typing);
                }
            }, typingDelay);
        }, startDelay);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes typing-${index} {
                to { width: ${width}px; }
            }
        `;
        document.head.appendChild(style);
        
        item.style.animation = `typing-${index} 1s steps(${text.length}, end) ${index * 0.5}s forwards, blink-skills 0.75s step-end infinite`;
    });
});

function getTextWidth(text) {
    const span = document.createElement('span');
    span.style.font = window.getComputedStyle(document.querySelector('.typing')).font;
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width + 4;
}

document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    const text = typewriter.textContent;
    typewriter.textContent = '';

    let charIndex = 0;
    const typingSpeed = 500; 

    function type() {
        if (charIndex < text.length) {
            typewriter.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }

    setTimeout(() => {
        type();
    }, 500);
});
