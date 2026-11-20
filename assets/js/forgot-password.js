// Forgot-password: checks the account field and displays a simulated request message.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const field = document.querySelector('#email-or-student-id');
  if (!form || !field) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = field.value.trim();
    if (!value) { field.focus(); return; }
    // This frontend does not send email or verify accounts; real reset needs a backend.
    alert('If the account exists, reset instructions would be sent (demo only).');
    form.reset();
  });
});
