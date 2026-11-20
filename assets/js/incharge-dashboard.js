// Dashboard: filters the sample schedule rows by selected laboratory and date.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const labFilter = document.querySelector('#lab-id');
  const dateInput = document.querySelector('#schedule-date');
  const scheduleTable = document.querySelector('table');
  if (!form || !scheduleTable || !labFilter) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const chosenLab = labFilter.options[labFilter.selectedIndex].text;
    scheduleTable.querySelectorAll('tr').forEach((row, index) => {
      if (index === 0) return;
      const labCell = row.cells[1];
      row.hidden = !!labFilter.value && labCell && !labCell.textContent.includes(chosenLab);
    });
    const caption = scheduleTable.querySelector('caption');
    if (caption) caption.textContent = `Laboratory schedule${dateInput.value ? ' for ' + dateInput.value : ''} (sample rows)`;
  });
  form.addEventListener('reset', () => setTimeout(() => {
    scheduleTable.querySelectorAll('tr').forEach(row => row.hidden = false);
    const caption = scheduleTable.querySelector('caption');
    if (caption) caption.textContent = 'Laboratory schedule for the selected date';
  }, 0));
});
