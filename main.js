const roles = ["IT Developer","PHP Developer","Node.js Developer","Freelance Programmer","Technical Support Engineer","Open to Work 🚀"];
let ri = 0, ci = 0, del = false;
const el = document.getElementById('typedText');

function type() {
  const r = roles[ri];
  el.textContent = del ? r.substring(0, ci - 1) : r.substring(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === r.length) setTimeout(() => del = true, 1800);
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 60 : 100);
}
type();

const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('section').forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? '#c084fc' : '';
  });
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  const msg = document.getElementById('responseMsg');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const res = await fetch('/contact/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      })
    });
    const data = await res.json();
    msg.textContent = data.success ? '✅ Message sent! Talk soon.' : '❌ Something went wrong.';
    msg.style.color = data.success ? '#4ade80' : '#f87171';
    if (data.success) form.reset();
  } catch {
    msg.textContent = '❌ Failed. Email me directly.';
    msg.style.color = '#f87171';
  }
  btn.textContent = 'Send Message 🚀';
  btn.disabled = false;
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.proj-card, .exp-card, .about-grid, .contact-wrap').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  obs.observe(el);
});


  const typedTextElement = document.getElementById('typedText');
    if (typedTextElement) {
      const roles = ['IT Developer', 'Problem Solver', 'Freelance Programmer', 'System Builder'];
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      
      function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
          typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 500);
        } else {
          setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
      }
      typeEffect();
    }