// Lab Schedule page: demo CRUD, operating-hours checks, and assignment confirmation.
document.addEventListener('DOMContentLoaded', () => {
  const labForm = document.querySelector('form');
  const labTable = document.querySelector('.table-wrap table');
  const labName = document.querySelector('#lab-name');
  if (!labForm || !labTable || !labName) return;
  const hiddenId = labForm.querySelector('[name="lab_id"]');
  let nextId = 3;
  // Add a new laboratory row using the values entered in the form (browser-only demo).
  labForm.addEventListener('submit', event => {
    event.preventDefault();
    const values = ['#lab-name', '#location', '#capacity'];
    const name = document.querySelector('#lab-name').value.trim();
    const code = document.querySelector('#lab-code').value.trim();
    const location = document.querySelector('#location').value.trim();
    const capacity = document.querySelector('#capacity').value;
    const status = document.querySelector('#lab-status').value;
    if (!name || !code || !location || Number(capacity) < 1 || !status) return;
    const row = document.createElement('tr');
    [nextId++, name, location, capacity, 'Not configured', 'Unassigned'].forEach(value => {
      const cell = document.createElement('td'); cell.textContent = value; row.appendChild(cell);
    });
    const statusCell = document.createElement('td');
    const badge = document.createElement('span'); badge.className = 'status active-status'; badge.textContent = status; statusCell.appendChild(badge); row.appendChild(statusCell);
    const action = document.createElement('td'); action.textContent = 'Added (demo)'; row.appendChild(action);
    labTable.appendChild(row);
    labForm.reset(); if (hiddenId) hiddenId.value = '';
    alert('Laboratory added to this page (demo only; not saved to a server).');
  });
  // Operating hours: ensure a valid time range and at least one open day.
  const hoursForm = labForm.nextElementSibling?.nextElementSibling;
  const forms = document.querySelectorAll('.main-content form');
  if (forms[1]) forms[1].addEventListener('submit', event => {
    event.preventDefault();
    const days = forms[1].querySelectorAll('input[type="checkbox"]:checked');
    const opening = document.querySelector('#opening-time').value;
    const closing = document.querySelector('#closing-time').value;
    if (!days.length || !opening || !closing || opening >= closing) { alert('Choose at least one open day and a valid opening/closing time.'); return; }
    alert('Operating hours validated (demo only).');
  });
  // Technician assignment: validate the form and show a confirmation in this frontend demo.
  if (forms[2]) forms[2].addEventListener('submit', event => {
    event.preventDefault(); alert('Technician assignment recorded for this demo (not stored on a server).'); forms[2].reset();
  });
  // Clicking the existing Edit links loads the row's values into the laboratory form.
  labTable.querySelectorAll('a[href="#lab-details"]').forEach(link => link.addEventListener('click', () => {
    const cells = link.closest('tr').cells;
    document.querySelector('#lab-name').value = cells[1].textContent;
    document.querySelector('#location').value = cells[2].textContent;
    document.querySelector('#capacity').value = cells[3].textContent;
    document.querySelector('#lab-status').value = 'active';
    document.querySelector('#lab-details').scrollIntoView({behavior: 'smooth'});
  }));
});
