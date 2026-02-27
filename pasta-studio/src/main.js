import './style.css';
import { initCountdown } from './countdown.js';
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  document.getElementById('year').textContent = new Date().getFullYear();
});