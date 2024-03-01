function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const table = document.getElementById('table-content');

        // Remove existing rows
        for (let i = table.rows.length - 1; i > 0; i--) {
          table.deleteRow(i);
        }

        // Add new rows from Excel file
        jsonData.slice(1).forEach((row) => {
          const newRow = table.insertRow(-1);
          row.forEach((cellData, index) => {
            const cell = newRow.insertCell(index);
            cell.textContent = cellData;
          });
        });

        // Show input row for manual data entry
        document.querySelector('.table-input').style.display = 'table-row';
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }