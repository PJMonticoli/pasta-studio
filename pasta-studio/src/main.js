import './style.css';
import { initCountdown } from './countdown.js';

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  document.getElementById('year').textContent = new Date().getFullYear();

  // Active nav link on scroll
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav__link');
  const landing = document.getElementById('landing');

  function updateActiveLink() {
    let current = '';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  landing.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Smooth scroll for nav links (within snap container)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
