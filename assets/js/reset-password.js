// Reset-password: verifies matching entries before simulating a successful reset.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const password = document.querySelector('#new-password');
  const confirmation = document.querySelector('#confirm-password');
  if (!form || !password || !confirmation) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (password.value.length < 8) { alert('Password must contain at least 8 characters.'); password.focus(); return; }
    if (password.value !== confirmation.value) { alert('The passwords do not match.'); confirmation.focus(); return; }
    alert('Password validation passed (demo only; no password was changed).');
    form.reset();
  });
});
