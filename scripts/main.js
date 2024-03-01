// Dynamically generating list of years
var currentYear = new Date().getFullYear()
var selectYear = document.getElementById('year')

for (var i = currentYear; i >= 1950; i--) {
  var option = document.createElement('option')
  option.value = i
  option.text = i
  selectYear.add(option)
}

// User Data Input's Add Functionality
var description = document.getElementById('description')
var type = document.getElementById('type')
var year = document.getElementById('year')
var make = document.getElementById('make')
var model = document.getElementById('model')
var a_vkt = document.getElementById('a_vkt')
var a_fuel = document.getElementById('a_fuel')
var f_type = document.getElementById('f_type')
var fuel_flex = document.getElementById('fuel-flex')
var quantity = document.getElementById('quantity')
var table = document.getElementById('table-content')

// Load data from local storage on page load
window.onload = function () {
  loadDataFromLocalStorage()
}

// Flag to indicate whether the button is in edit mode
let isEditMode = false
let rowIndex = -1

// Function to get the input element value by index
function getInputValue(index) {
  switch (index) {
    case 0:
      return description.value
    case 1:
      return type.value
    case 2:
      return parseInt(year.value, 10)
    case 3:
      return make.value
    case 4:
      return model.value
    case 5:
      return a_vkt.value
    case 6:
      return a_fuel.value
    case 7:
      return f_type.value
    case 8:
      return fuel_flex.value
    case 9:
      return quantity.value
    default:
      return ''
  }
}

// Function to edit a record
function edit(index) {
  if (!isEditMode) {
    isEditMode = true
    rowIndex = index
    selectedRow = table.rows[rowIndex + 1]

    // Check if a "Save" button already exists
    let saveButtonCell = table.rows[1].cells[10]
    let saveButton = saveButtonCell.querySelector('button')

    if (!saveButton) {
      // If no "Save" button exists, create and add one
      addSaveButton()
      addCancelButton()
    } else {
      // If a "Save" button exists, update its onclick function
      saveButton.onclick = function () {
        update()
        removeSaveButton()
        removeCancelButton()
        loadDataFromLocalStorage()
        clearFields() // Clear fields after updating
        location.reload()
      }
    }

    // Set the input values for editing
    description.value = selectedRow.cells[0].innerText
    type.value = selectedRow.cells[1].innerText
    year.value = selectedRow.cells[2].innerText
    make.value = selectedRow.cells[3].innerText
    model.value = selectedRow.cells[4].innerText
    a_vkt.value = selectedRow.cells[5].innerText
    a_fuel.value = selectedRow.cells[6].innerText
    f_type.value = selectedRow.cells[7].innerText
    fuel_flex.value = selectedRow.cells[8].innerText
    quantity.value = selectedRow.cells[9].innerText
  }
}

// Function to add or update the "Save" button
function addSaveButton() {
  let saveButtonCell = table.rows[1].insertCell(10)
  saveButtonCell.colSpan = 0

  let saveButton = document.createElement('button')
  saveButton.innerHTML = '<img src="./Images/check.png">'
  saveButton.className = 'action-btn alter-btn'
  saveButton.onclick = function () {
    update()
    removeSaveButton()
    clearFields() // Clear fields after updating
  }

  saveButtonCell.appendChild(saveButton)
}

// Function to add or update the "Save" button
function addCancelButton() {
  let cancelButtonCell = table.rows[1].insertCell(11)
  cancelButtonCell.colSpan = 0

  let cancelButton = document.createElement('button')
  cancelButton.innerHTML = '<img src="./Images/cross.png">'
  cancelButton.className = 'action-btn alter-btn'
  cancelButton.onclick = function () {
    removeCancelButton()
    removeSaveButton()
    clearFields() // Clear fields after updating
    location.reload()
  }

  cancelButtonCell.appendChild(cancelButton)
}

// Function to remove the "Save" button
function removeSaveButton() {
  let saveButtonCell = table.rows[1].cells[10]
  let saveButton = saveButtonCell.querySelector('button')

  if (saveButton) {
    saveButtonCell.removeChild(saveButton)
  }
}

// Function to remove the "Save" button
function removeCancelButton() {
  let cancelButtonCell = table.rows[1].cells[11]
  let cancelButton = cancelButtonCell.querySelector('button')

  if (cancelButton) {
    cancelButtonCell.removeChild(cancelButton)
  }
}

// Function to add a new row
function addRow() {
  if (validate()) {
    let newRow = table.insertRow(table.rows.length)
    let cells = []

    for (let i = 0; i < 10; i++) {
      cells[i] = newRow.insertCell(i)
      cells[i].innerHTML = i === 2 ? parseInt(year.value, 10) : getInputValue(i)
    }

    // Save data to local storage
    saveDataToLocalStorage()

    // Add update and delete buttons
    let updateButton = document.createElement('button')
    updateButton.innerHTML = 'Update'
    updateButton.onclick = function () {
      let rowIndex = newRow.rowIndex - 1
      console.log(rowIndex)
      edit(rowIndex)
    }
    cells[10] = newRow.insertCell(10)
    cells[10].appendChild(updateButton)

    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete'
    deleteButton.onclick = function () {
      deleteRecord(newRow)
    }
    cells[11] = newRow.insertCell(11)
    cells[11].appendChild(deleteButton)

    clearFields()
    location.reload()
  }
}

// Function to update or save a record
function update() {
  if (isEditMode) {
    if (validate()) {
      let records = JSON.parse(localStorage.getItem('tableData')) || []

      // Update the selected row with the new values
      let updatedRecord = {
        description: description.value,
        type: type.value,
        year: year.value,
        make: make.value,
        model: model.value,
        a_vkt: a_vkt.value,
        a_fuel: a_fuel.value,
        f_type: f_type.value,
        fuel_flex: fuel_flex.value,
        quantity: quantity.value,
      }

      records[rowIndex - 1] = updatedRecord

      // Remove the existing row from the table
      table.deleteRow(rowIndex - 1)

      // Insert the updated row in place of the deleted row
      let newRow = table.insertRow(rowIndex - 1)
      let cells = []

      for (let i = 0; i < 10; i++) {
        cells[i] = newRow.insertCell(i)
        cells[i].innerHTML =
          i === 2
            ? parseInt(year.value, 10)
            : updatedRecord[Object.keys(updatedRecord)[i]]
      }

      // Save data to local storage
      localStorage.setItem('tableData', JSON.stringify(records))

      clearFields()
      isEditMode = false
      rowIndex = -1

      // Reload the page after the update
      location.reload()
    }
  } else {
    // Handle adding a new row if not in edit mode
    addRow()
  }
}

// Function to delete a record
function deleteRecord(r) {
  if (confirm('Are you sure you want to delete this record?')) {
    entries = JSON.parse(localStorage.getItem('tableData')) || []
    selectedRow = r.parentElement.parentElement
    rowIndex = selectedRow.rowIndex

    entries.splice(rowIndex - 1, 1)

    localStorage.setItem('tableData', JSON.stringify(entries))
    // Call loadDataFromLocalStorage after updating local storage
    loadDataFromLocalStorage()

    table.deleteRow(rowIndex - 1) // Adjusted index to reflect the correct row

    // Reload the page
    location.reload()
  }
}

// Function to get the input element by index
function getInputElement(index) {
  switch (index) {
    case 0:
      return 'description'
    case 1:
      return 'type'
    case 2:
      return 'year'
    case 3:
      return 'make'
    case 4:
      return 'model'
    case 5:
      return 'a_vkt'
    case 6:
      return 'a_fuel'
    case 7:
      return 'f_type'
    case 8:
      return 'fuel_flex'
    case 9:
      return 'quantity'
    default:
      return ''
  }
}

function cancelRow() {
  clearFields()
}

function clearFields() {
  description.value = ''
  type.value = ''
  year.value = ''
  make.value = ''
  model.value = ''
  a_vkt.value = ''
  a_fuel.value = ''
  f_type.value = ''
  fuel_flex.value = ''
  quantity.value = ''
}

function validate() {
  if (!description.value) {
    alert('Please enter Description.')
    description.focus()
    return false
  } else if (!type.value) {
    alert('Please enter Type.')
    type.focus()
    return false
  } else if (!year.value) {
    alert('Please enter Year.')
    year.focus()
    return false
  } else if (!make.value) {
    alert('Please enter Make.')
    make.focus()
    return false
  } else if (!model.value) {
    alert('Please enter Model.')
    model.focus()
    return false
  } else if (!isNumber(a_vkt.value)) {
    alert('Please enter a valid Annual VKT (numeric value).')
    a_vkt.focus()
    return false
  } else if (!isNumber(a_fuel.value)) {
    alert('Please enter a valid Annual Fuel (numeric value).')
    a_fuel.focus()
    return false
  } else if (!f_type.value) {
    alert('Please select Fuel Type.')
    f_type.focus()
    return false
  } else if (!fuel_flex.value) {
    alert('Please select Fuel Flex.')
    fuel_flex.focus()
    return false
  } else if (!isNumber(quantity.value)) {
    alert('Please enter a valid Quantity (numeric value).')
    quantity.focus()
    return false
  }

  return true
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

function saveDataToLocalStorage() {
  let data = JSON.parse(localStorage.getItem('tableData')) || []
  let rowData = {
    description: description.value,
    type: type.value,
    year: year.value,
    make: make.value,
    model: model.value,
    a_vkt: a_vkt.value,
    a_fuel: a_fuel.value,
    f_type: f_type.value,
    fuel_flex: fuel_flex.value,
    quantity: quantity.value,
  }
  data.push(rowData)
  localStorage.setItem('tableData', JSON.stringify(data))
}

function loadDataFromLocalStorage() {
  let data = JSON.parse(localStorage.getItem('tableData')) || []
  data.forEach((rowData, index) => {
    let newRow = table.insertRow(table.rows.length)

    // Add cells for each property
    Object.values(rowData).forEach((value) => {
      let cell = newRow.insertCell()
      cell.innerHTML = value
    })

    // Add edit and delete buttons
    let editCell = newRow.insertCell()
    let editButton = document.createElement('button')
    editButton.className = 'action-btn edit-btn'
    editButton.innerHTML = '<img src="./Images/edit.png">'
    editButton.onclick = function () {
      edit(newRow.rowIndex - 1)
    }
    editCell.appendChild(editButton)

    let deleteCell = newRow.insertCell()
    let deleteButton = document.createElement('button')
    deleteButton.className = 'action-btn delete-btn'
    deleteButton.innerHTML = '<img src="./Images/trash.png">'
    deleteButton.onclick = function () {
      deleteRecord(newRow)
    }
    deleteCell.appendChild(deleteButton)
  })
}

// Function to populate Green Options
function populateGreenOptions() {
  var storedRecords = JSON.parse(localStorage.getItem('tableData')) || []
  var optionsContainer = document.querySelector('.green-options-table')

  optionsContainer.innerHTML = ''

  if (storedRecords.length === 0) {
    var noRecordsRow = optionsContainer.insertRow()
    var noRecordsCell = noRecordsRow.insertCell()
    noRecordsCell.textContent = 'No records'
    return
  }

  var headerRow = optionsContainer.insertRow()
  var fleetVehicleHeader = document.createElement('th')
  fleetVehicleHeader.textContent = 'Fleet Vehicle'
  headerRow.appendChild(fleetVehicleHeader)
  var greenOptionsHeader = document.createElement('th')
  greenOptionsHeader.textContent = 'Green Options'
  headerRow.appendChild(greenOptionsHeader)

  for (var i = 0; i < storedRecords.length; i++) {
    var record = storedRecords[i]
    var newRow = optionsContainer.insertRow()

    var concatenatedValues = Object.values(record).slice(0, 5).join(' - ')
    var cell1 = newRow.insertCell()
    cell1.textContent = concatenatedValues

    var dropdownCell = newRow.insertCell()
    var dropdown = document.createElement('select')
    dropdown.className = 'custom-select'
    var type = record.type
    var fuelFlex = record.fuel_flex
    var fuelType = record.f_type

    if (type === 'Car' && fuelFlex === 'Yes' && fuelType === 'Gasoline') {
      dropdown.innerHTML =
        '<option value="EV Vehicle">Replace w/ EV Vehicle</option><option value="E85 Ethanol Usage">E85 Ethanol Usage</option>'
    } else if (type === 'Car' && fuelFlex === 'No' && fuelType === 'Gasoline') {
      dropdown.innerHTML =
        '<option value="EV Car">Replace w/ EV Car</option><option value="Biofuel Car E85">Replace w/ Biofuel Car E85</option>'
    } else if (
      type === 'Light Duty Truck' &&
      fuelFlex === 'No' &&
      fuelType === 'Gasoline'
    ) {
      dropdown.innerHTML =
        '<option value="EV Light Duty Truck">Replace w/ EV Light Duty Truck</option><option value="Biofuel E85 Light Duty Truck">Replace w/ Biofuel E85 Light Duty Truck</option><option value="Right Size to Car">Right Size to Car</option><option value="Right Size to Biofuel Car">Right Size to Biofuel Car</option>'
    } else if (
      type === 'Light Duty Truck' &&
      fuelFlex === 'Yes' &&
      fuelType === 'Gasoline'
    ) {
      dropdown.innerHTML =
        '<option value="E85 Biofuel Usage">E85 Biofuel Usage</option><option value="EV Light Duty Truck">Replace w/ EV Light Duty Truck</option><option value="Right Size to Car">Right Size to Car</option><option value="Right Size to Biofuel Car">Right Size to Biofuel Car</option>'
    } else if (
      type === 'Light Duty Truck' &&
      fuelFlex === 'No' &&
      fuelType === 'Diesel'
    ) {
      dropdown.innerHTML =
        '<option value="EV Light Duty Truck">Replace w/ EV Light Duty Truck</option><option value="Biofuel E85 Light Duty Truck">Replace w/ Biofuel E85 Light Duty Truck</option><option value="Right Size to Car">Right Size to Car</option><option value="Right Size to Biofuel E85 Car">Right Size to Biofuel E85 Car</option>'
    } else if (
      type === 'Light Duty Truck' &&
      fuelFlex === 'Yes' &&
      fuelType === 'Diesel'
    ) {
      dropdown.innerHTML =
        '<option value="B20 Diesel Usage">B20 Diesel Usage</option><option value="EV Light Duty Truck">Replace w/ EV Light Duty Truck</option><option value="Biofuel E85 Light Duty Truck">Replace w/ Biofuel E85 Light Duty Truck</option><option value="Right Size to Car">Right Size to Car</option><option value="Right Size to Biofuel E85 Car">Right Size to Biofuel E85 Car</option>'
    } else {
      dropdown.innerHTML = '<option value="">No options available</option>'
    }

    dropdownCell.appendChild(dropdown)
  }
}

// Call the function to populate the options-container on page load
document.addEventListener('DOMContentLoaded', function () {
  populateGreenOptions()
})

// Hide n Show using Next button
document.getElementById('toggle').addEventListener('click', function () {
  var firstElement = document.getElementById('target1')
  var secondElement = document.getElementById('target2')

  // Toggle the visibility of the first element
  if (
    firstElement.style.display === 'none' ||
    firstElement.style.display === ''
  ) {
    firstElement.style.display = 'block'
    secondElement.style.display = 'none'
  } else {
    firstElement.style.display = 'none'

    // Show the second element after hiding the first one
    secondElement.style.display = 'block'
  }
})
