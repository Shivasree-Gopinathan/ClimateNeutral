// class InputData {
//   description = "";
//   type = "";
//   year = "";
//   make = "";
//   model = "";
//   a_vkt = "";
//   a_fuel = "";
//   f_type = "";
//   fuel_flex = "";
//   quantity = "";
// }

// function uploadFile(event) {
//   let fl_files = event.target.files;
//   const file = fl_files[0];

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const data = new Uint8Array(e.target.result);

//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//       const table = document.getElementById("table-content");

//       // Remove existing rows
//       for (let i = table.rows.length - 1; i > 0; i--) {
//         //table.deleteRow(i);
//       }

//       // Add new rows from Excel file
//       jsonData.slice(1).forEach((row) => {
//         let tableData = JSON.parse(localStorage.getItem("tableData")) || [];


//         const newRow = table.insertRow(-1);
//         let cells = [];
//         let temp = new InputData();
//         row.forEach((cellData, index) => {
//           const cell = newRow.insertCell(index);
//           cell.textContent = cellData;
          
//           switch (index) {
//             case 0:
//               temp.description = cellData;
//               break;
//             case 1:
//               temp.type = cellData;
//               break;
//             case 2:
//               temp.year = cellData;
//               break;
//             case 3:
//               temp.make = cellData;
//               break;
//             case 4:
//               temp.model = cellData;
//               break;
//             case 5:
//               temp.a_vkt = cellData;
//               break;
//             case 6:
//               temp.a_fuel = cellData;

//               break;
//             case 7:
//               temp.f_type = cellData;

//               break;
//             case 8:
//               temp.fuel_flex = cellData;
//               break;
//             case 9:
//               temp.quantity = cellData;
//               break;
//             default:
//           }
//         });
//         let updateButton = document.createElement("button");
//         updateButton.className = "action-btn edit-btn";
//         updateButton.innerHTML = '<img src="./Images/edit.png">';
//         updateButton.onclick = function () {
//           let rowIndex = newRow.rowIndex - 1;
//           console.log(rowIndex);
//           edit(rowIndex);
//         };
//         cells[10] = newRow.insertCell(10);
//         cells[10].appendChild(updateButton);

//         let deleteButton = document.createElement("button");
//         deleteButton.className = "action-btn delete-btn";
//         deleteButton.innerHTML = '<img src="./Images/trash.png">';
//         deleteButton.onclick = function () {
//           deleteRecord(newRow);
//         };
//         cells[11] = newRow.insertCell(11);
//         cells[11].appendChild(deleteButton);

//         // if (tableData.length > 0) {
//         //   tableData.push(temp);
//         // } else {
//         //   tableData.push(temp);
//         //   localStorage.setItem("tableData", JSON.stringify(tableData));
//         // }
//         tableData.push(temp);
//         localStorage.setItem("tableData", JSON.stringify(tableData));
//         // tableData.push(temp);
//         // localStorage.setItem("tableData", JSON.stringify = "table-row");
//       });

//       // Show input row for manual data entry
//       document.querySelector(".table-input").style.display = "table-row";
//     };
//     reader.readAsArrayBuffer(file);
//   } else {
//     alert("Please select a file.");
//   }
// }
// document
//   .getElementById("file-upload-input")
//   .addEventListener("change", uploadFile, false);




// New
class InputData {
  description = "";
  type = "";
  year = "";
  make = "";
  model = "";
  a_vkt = "";
  a_fuel = "";
  f_type = "";
  fuel_flex = "";
  quantity = "";
}

function uploadFile(event) {
  let fl_files = event.target.files;
  const file = fl_files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const table = document.getElementById("table-content");

      // Remove existing rows
      for (let i = table.rows.length - 1; i > 0; i--) {
        //table.deleteRow(i);
      }

      // Add new rows from Excel file
      jsonData.slice(1).forEach((row) => {
        let tableData = JSON.parse(localStorage.getItem("tableData")) || [];


        const newRow = table.insertRow(-1);
        let cells = [];
        let temp = new InputData();
        row.forEach((cellData, index) => {
          const cell = newRow.insertCell(index);
          cell.textContent = cellData;
          
          switch (index) {
            case 0:
              temp.description = cellData;
              break;
            case 1:
              temp.type = cellData;
              break;
            case 2:
              temp.year = cellData;
              break;
            case 3:
              temp.make = cellData;
              break;
            case 4:
              temp.model = cellData;
              break;
            case 5:
              temp.a_vkt = cellData;
              break;
            case 6:
              temp.a_fuel = cellData;

              break;
            case 7:
              temp.f_type = cellData;

              break;
            case 8:
              temp.fuel_flex = cellData;
              break;
            case 9:
              temp.quantity = cellData;
              break;
            default:
          }
        });
        let updateButton = document.createElement("button");
        updateButton.className = "action-btn edit-btn";
        updateButton.innerHTML = '<img src="./Images/edit.png">';
        updateButton.onclick = function () {
          let rowIndex = newRow.rowIndex - 1;
          console.log(rowIndex);
          edit(rowIndex);
        };
        cells[10] = newRow.insertCell(10);
        cells[10].appendChild(updateButton);

        let deleteButton = document.createElement("button");
        deleteButton.className = "action-btn delete-btn";
        deleteButton.innerHTML = '<img src="./Images/trash.png">';
        deleteButton.onclick = function () {
          deleteRecord(newRow);
        };
        cells[11] = newRow.insertCell(11);
        cells[11].appendChild(deleteButton);

        tableData.push(temp);
        localStorage.setItem("tableData", JSON.stringify(tableData));
        
        // tableData.push(temp);
        // localStorage.setItem("tableData", JSON.stringify = "table-row");
      });

      // Show input row for manual data entry
      document.querySelector(".table-input").style.display = "table-row";
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Please select a file.");
  }
}
document
  .getElementById("file-upload-input")
  .addEventListener("change", uploadFile, false);
