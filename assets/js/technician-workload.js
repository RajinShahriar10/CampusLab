// Technician workload: filter sample rows and validate demo reassignments.
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.querySelector('.main-content form');
  const table = document.querySelector('.table-wrap table');
  if (!filterForm || !table) return;
  const rows = [...table.querySelectorAll('tr')].slice(1);
  filterForm.addEventListener('submit', event => {
    event.preventDefault();
    const technician = document.querySelector('#filter-technician-id').value;
    const status = document.querySelector('#status').value;
    // This table has aggregate counts; status filter hides rows with zero matching workload.
    rows.forEach(row => {
      const id = row.cells[0].textContent.trim();
      const selectedStatusCount = status ? row.cells[{pending:2, approved:3, completed:4}[status]].textContent.trim() : '';
      row.hidden = (technician && id !== technician) || (status && Number(selectedStatusCount) === 0);
    });
  });
  filterForm.addEventListener('reset', () => setTimeout(() => rows.forEach(row => row.hidden = false), 0));
  // Each row's inline form confirms the chosen new lab; no server-side assignment occurs.
  table.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const lab = form.querySelector('select').selectedOptions[0]?.text;
    const tech = form.querySelector('[name="technician_id"]').value;
    if (lab) alert(`Technician ${tech} reassigned to ${lab} (demo only).`);
  }));
});
