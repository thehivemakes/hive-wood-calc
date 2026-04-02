/* calc-core.js — shared utilities for all calculator pages */

const CalcCore = {
  /* Read URL params on page load and populate matching inputs */
  loadParams() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((val, key) => {
      const el = document.getElementById(key);
      if (!el) return;
      if (el.type === 'radio') {
        const radio = document.querySelector(`input[name="${key}"][value="${val}"]`);
        if (radio) radio.checked = true;
      } else {
        el.value = val;
      }
    });
  },

  /* Save current inputs to URL params (for sharing) */
  saveParams(fields) {
    const params = new URLSearchParams();
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value) params.set(id, el.value);
    });
    const url = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', url);
  },

  /* Show result block */
  showResult(id) {
    const el = document.getElementById(id || 'result');
    if (el) el.classList.add('visible');
  },

  /* Format number with commas */
  fmt(n, decimals = 2) {
    if (isNaN(n) || n === null) return '—';
    return Number(n).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  /* Format as integer */
  fmtInt(n) {
    if (isNaN(n) || n === null) return '—';
    return Math.round(n).toLocaleString('en-US');
  },

  /* Set text content by ID */
  set(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  },

  /* Get numeric value from input by ID */
  get(id) {
    const el = document.getElementById(id);
    if (!el) return NaN;
    return parseFloat(el.value);
  },

  /* Get select value */
  getSelect(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    return el.value;
  },

  /* Highlight matching row in reference table */
  highlightRow(tableId, colIndex, value, tolerance) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.classList.remove('highlight');
      const cell = row.cells[colIndex];
      if (!cell) return;
      const cellVal = parseFloat(cell.textContent);
      if (!isNaN(cellVal) && Math.abs(cellVal - value) <= (tolerance || 0.5)) {
        row.classList.add('highlight');
      }
    });
  }
};

/* Auto-load params on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => CalcCore.loadParams());
