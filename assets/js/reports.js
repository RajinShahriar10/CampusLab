// Reports: validate date range and toggle the appropriate sample report table.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const tables = document.querySelectorAll('.table-wrap table');
  if (!form || tables.length < 2) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const from = document.querySelector('#from-date').value;
    const to = document.querySelector('#to-date').value;
    const type = document.querySelector('input[name="report_type"]:checked')?.value;
    if (!from || !to || from > to || !type) { alert('Select a report type and valid date range.'); return; }
    // Lab-wise shows table 1; equipment-wise shows table 2. Data remains illustrative.
    tables[0].closest('.table-wrap').hidden = type !== 'lab_wise';
    tables[1].closest('.table-wrap').hidden = type !== 'equipment_wise';
    alert(`Showing the ${type.replace('_', '-')} sample report from ${from} to ${to}.`);
  });
  form.addEventListener('reset', () => setTimeout(() => tables.forEach(t => t.closest('.table-wrap').hidden = false), 0));
});
