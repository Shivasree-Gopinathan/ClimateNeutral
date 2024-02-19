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

function addRow() {
  if (validate()) {
    let newRow = table.insertRow(table.rows.length)
    let cell1 = newRow.insertCell(0)
    let cell2 = newRow.insertCell(1)
    let cell3 = newRow.insertCell(2)
    let cell4 = newRow.insertCell(3)
    let cell5 = newRow.insertCell(4)
    let cell6 = newRow.insertCell(5)
    let cell7 = newRow.insertCell(6)
    let cell8 = newRow.insertCell(7)
    let cell9 = newRow.insertCell(8)
    let cell10 = newRow.insertCell(9)

    cell1.innerHTML = description.value
    cell2.innerHTML = type.value
    cell3.innerHTML = year.value
    cell4.innerHTML = make.value
    cell5.innerHTML = model.value
    cell6.innerHTML = a_vkt.value
    cell7.innerHTML = a_fuel.value
    cell8.innerHTML = f_type.value
    cell9.innerHTML = fuel_flex.value
    cell10.innerHTML = quantity.value

    // Save data to local storage
    saveDataToLocalStorage()

    clearFields()
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
  data.forEach((rowData) => {
    let newRow = table.insertRow(table.rows.length)
    Object.values(rowData).forEach((value) => {
      let cell = newRow.insertCell()
      cell.innerHTML = value
    })
  })
}

// ==== js ===

function populateGreenOptions() {
  // loadDataFromLocalStorage()

  // Get records from local storage
  var storedRecords = JSON.parse(localStorage.getItem('tableData')) || []

  // Get the options container reference
  var optionsContainer = document.querySelector('.green-options-table')

  // Clear existing content
  optionsContainer.innerHTML = ''

  // Check if there are no records
  if (storedRecords.length === 0) {
    // Display a message in the options container
    var noRecordsRow = optionsContainer.insertRow()
    var noRecordsCell = noRecordsRow.insertCell()
    noRecordsCell.textContent = 'No records'
    return
  }

  // Create header row
  var headerRow = optionsContainer.insertRow()
  var fleetVehicleHeader = document.createElement('th')
  fleetVehicleHeader.textContent = 'Fleet Vehicle'
  headerRow.appendChild(fleetVehicleHeader)
  var greenOptionsHeader = document.createElement('th')
  greenOptionsHeader.textContent = 'Green Options'
  headerRow.appendChild(greenOptionsHeader)

  // Loop through stored records
  for (var i = 0; i < storedRecords.length; i++) {
    var record = storedRecords[i]

    // Create a new row in the options container
    var newRow = optionsContainer.insertRow()

    // Concatenate the first five properties with "-"
    var concatenatedValues = Object.values(record).slice(0, 5).join(' - ')

    // Create a single cell for the concatenated values
    var cell1 = newRow.insertCell()
    cell1.textContent = concatenatedValues

    // Create a cell for the dropdown (second cell)
    var dropdownCell = newRow.insertCell()

    // Create a dropdown based on the 'type', 'fuel_flex', and 'f_type' properties
    var dropdown = document.createElement('select')
    dropdown.className = 'custom-select'
    var type = record.type
    var fuelFlex = record.fuel_flex
    var fuelType = record.f_type

    // Customize the dropdown options based on the record's properties
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

    // Append the dropdown to the cell
    dropdownCell.appendChild(dropdown)
  }
}

// Call the function to populate the options-container on page load
document.addEventListener('DOMContentLoaded', function () {
  populateGreenOptions()
})
