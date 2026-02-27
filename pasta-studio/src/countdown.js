/**
 * Pasta Studio — Countdown Module
 * Target: 13 de Abril 2026, 12:00 HS Argentina (UTC-3)
 */

const TARGET_DATE = new Date('2026-04-13T12:00:00-03:00');

const elements = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

function padZero(num) {
  return String(num).padStart(2, '0');
}

function getTimeRemaining() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function updateDisplay(time) {
  const fields = ['days', 'hours', 'minutes', 'seconds'];

  fields.forEach((field) => {
    const el = elements[field];
    const newValue = padZero(time[field]);

    if (el && el.textContent !== newValue) {
      el.textContent = newValue;
      // Trigger tick animation
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 300);
    }
  });
}

function handleExpired() {
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    countdownEl.innerHTML = `
      <p style="
        font-family: var(--font-display);
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        color: var(--color-accent);
      ">
        🎉 ¡Ya estamos abiertos!
      </p>
    `;
  }
}

export function initCountdown() {
  // Cache DOM references
  elements.days = document.getElementById('days');
  elements.hours = document.getElementById('hours');
  elements.minutes = document.getElementById('minutes');
  elements.seconds = document.getElementById('seconds');

  function tick() {
    const time = getTimeRemaining();

    if (time.expired) {
      handleExpired();
      return;
    }

    updateDisplay(time);
    requestAnimationFrame(() => setTimeout(tick, 1000));
  }

  tick();
}
