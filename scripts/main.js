window.onload = function() {
  createCar();
};

function createCar() {
  const car = document.createElement('div');
  car.classList.add('car');
  document.body.appendChild(car);
}
// Dynamically generating list of years for User's Data Input
var currentYear = new Date().getFullYear()
var selectYear = document.getElementById('year')

for (var i = currentYear; i >= 1950; i--) {
  var option = document.createElement('option')
  option.value = i
  option.text = i
  selectYear.add(option)
}

// User Data Input's Add Functionality with loal storage
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



