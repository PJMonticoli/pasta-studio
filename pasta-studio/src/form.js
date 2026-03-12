/**
 * Pasta Studio — Form Module
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

function validateForm(data) {
  const errors = [];

  if (!data.nombre.trim()) errors.push('Nombre es requerido');
  if (!data.apellido.trim()) errors.push('Apellido es requerido');
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email no válido');
  }
  if (!data.telefono.trim()) errors.push('Teléfono es requerido');
  if (!data.fecha) errors.push('Seleccioná una fecha');

  return errors;
}

function showFeedback(el, message, type) {
  el.textContent = message;
  el.className = `reserva__feedback reserva__feedback--${type}`;
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.classList.add('toast--visible');

  setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 4000);
}

export function initForm() {
  const form = document.getElementById('reserva-form');
  const submitBtn = document.getElementById('reserva-submit');
  const feedback = document.getElementById('reserva-feedback');

  if (!form || !submitBtn || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) return;

    if (!APPS_SCRIPT_URL) {
      showFeedback(feedback, 'Formulario no configurado. Contactanos por Instagram.', 'error');
      return;
    }

    const data = {
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      email: form.email.value,
      telefono: form.telefono.value,
      fecha: form.fecha.value,
    };

    const errors = validateForm(data);
    if (errors.length > 0) {
      showFeedback(feedback, errors[0], 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    feedback.textContent = '';

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      showFeedback(
        feedback,
        '¡Registro exitoso!',
        'success'
      );

      showToast();
      form.reset();

    } catch (error) {
      showFeedback(
        feedback,
        'Hubo un error de conexión, intentá de nuevo.',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Reservar mi lugar';
    }
  });
}
