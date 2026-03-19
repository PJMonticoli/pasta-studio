/**
 * Pasta Studio — Countdown Module (Dual Phase)
 *
 * FASE 1: Countdown → Degustación (27 marzo 20hs)
 * FASE 2: Info degustación visible (27 marzo → 3 abril)
 * FASE 3: Countdown → Apertura (24 abril 12hs)
 * FASE 4: ¡Abrimos!
 */

// CONTADOR OFICIAL
const DATES = {
  degustacion: new Date('2026-03-27T20:00:00-03:00'),
  degustacionEnd: new Date('2026-04-03T00:00:00-03:00'),
  apertura: new Date('2026-04-24T12:00:00-03:00'),
};

// PRUEBAS RÁPIDAS
// const DATES = {
//   degustacion:    new Date('2026-03-10T20:00:00-03:00'),
//   degustacionEnd: new Date('2026-04-11T00:00:00-03:00'),
//   apertura:       new Date('2026-04-24T12:00:00-03:00'),
// };

// const DATES = {
//   degustacion:    new Date('2026-03-05T20:00:00-03:00'),  
//   degustacionEnd: new Date('2026-03-11T00:00:00-03:00'),  
//   apertura:       new Date('2026-03-24T12:00:00-03:00'),  
// };

// const DATES = {
//   degustacion:    new Date('2026-03-05T20:00:00-03:00'),  
//   degustacionEnd: new Date('2026-03-10T00:00:00-03:00'),  
//   apertura:       new Date('2026-03-11T12:00:00-03:00'),  
// };

const elements = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

function padZero(num) {
  return String(num).padStart(2, '0');
}

function getTimeRemaining(target) {
  const diff = target - new Date();

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

function getCurrentPhase() {
  const now = new Date();

  if (now < DATES.degustacion) return 'countdown-degustacion';
  if (now < DATES.degustacionEnd) return 'info-degustacion';
  if (now < DATES.apertura) return 'countdown-apertura';
  return 'abierto';
}

function updateDisplay(time) {
  const fields = ['days', 'hours', 'minutes', 'seconds'];

  fields.forEach((field) => {
    const el = elements[field];
    const newValue = padZero(time[field]);

    if (el && el.textContent !== newValue) {
      el.textContent = newValue;
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 300);
    }
  });
}

function setPhaseUI(phase) {
  const phaseLabel = document.getElementById('phase-label');
  const heroDate = document.getElementById('hero-date');
  const heroCta = document.getElementById('hero-cta');
  const countdownEl = document.getElementById('countdown');
  
  //  CONTROL DEL FORMULARIO Y NAV
  const reservaSection = document.getElementById('reserva');
  const reservaNavLink = document.querySelector('a[href="#reserva"]');

  switch (phase) {
    case 'countdown-degustacion':
      //  FASE 1: Mostrar formulario y nav link
      if (reservaSection) reservaSection.style.display = '';
      if (reservaNavLink) reservaNavLink.style.display = '';
      
      if (phaseLabel) phaseLabel.textContent = 'Degustación Exclusiva';
      if (heroDate) {
        heroDate.textContent = '27 de Marzo 2026 — Degustación';
        heroDate.style.display = '';
      }
      if (heroCta) {
        heroCta.textContent = 'Reservá tu lugar';
        heroCta.href = '#reserva';
        heroCta.style.display = '';
      }
      break;

    case 'info-degustacion':
      //  FASE 2: Ocultar formulario y nav link
      if (reservaSection) reservaSection.style.display = 'none';
      if (reservaNavLink) reservaNavLink.style.display = 'none';
      
      if (phaseLabel) phaseLabel.textContent = '';
      if (heroDate) heroDate.style.display = 'none';
      if (heroCta) heroCta.style.display = 'none';
      if (countdownEl) {
        countdownEl.innerHTML = `
          <div class="countdown__message">
            <p class="countdown__message-title">Ya podés venir</p>
            <p class="countdown__message-sub">
              Gracias a todos los que reservaron.<br>
              Nos vemos muy pronto para la apertura oficial.
            </p>
          </div>
        `;
      }
      break;

    case 'countdown-apertura':
      //  FASE 3: Formulario sigue oculto
      if (reservaSection) reservaSection.style.display = 'none';
      if (reservaNavLink) reservaNavLink.style.display = 'none';
      
      if (phaseLabel) phaseLabel.textContent = 'Apertura Oficial';
      if (heroDate) {
        heroDate.textContent = '24 de Abril 2026 — Apertura Oficial';
        heroDate.style.display = '';
      }
      if (heroCta) {
        heroCta.textContent = 'Cómo llegar';
        heroCta.href = '#location';
        heroCta.style.display = '';
      }
      break;

    case 'abierto':
      //  FASE 4: Formulario permanece oculto
      if (reservaSection) reservaSection.style.display = 'none';
      if (reservaNavLink) reservaNavLink.style.display = 'none';
      
      if (phaseLabel) phaseLabel.textContent = '';
      if (heroDate) heroDate.style.display = 'none';
      if (heroCta) {
        heroCta.textContent = 'Encontranos';
        heroCta.href = '#location';
        heroCta.style.display = '';
      }
      if (countdownEl) {
        countdownEl.innerHTML = `
          <div class="countdown__message">
            <p class="countdown__message-title">¡Ya abrimos!</p>
            <p class="countdown__message-sub">Te esperamos en Pasta Studio</p>
          </div>
        `;
      }
      break;
  }
}

function setCountdownMessage(title, subtitle) {
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    countdownEl.innerHTML = `
      <div class="countdown__message">
        <p class="countdown__message-title">${title}</p>
        <p class="countdown__message-sub">${subtitle}</p>
      </div>
    `;
  }
}

export function initCountdown() {
  elements.days = document.getElementById('days');
  elements.hours = document.getElementById('hours');
  elements.minutes = document.getElementById('minutes');
  elements.seconds = document.getElementById('seconds');

  let currentPhase = null;

  function tick() {
    const phase = getCurrentPhase();

    if (phase !== currentPhase) {
      currentPhase = phase;
      setPhaseUI(phase);
    }

    if (phase === 'countdown-degustacion') {
      updateDisplay(getTimeRemaining(DATES.degustacion));
    } else if (phase === 'countdown-apertura') {
      updateDisplay(getTimeRemaining(DATES.apertura));
    }

    if (phase !== 'abierto') {
      requestAnimationFrame(() => setTimeout(tick, 1000));
    }
  }

  tick();
}