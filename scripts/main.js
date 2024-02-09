// User Data Input's Add Functionality
var description = document.getElementById('description')
var type = document.getElementById('type')
var year = document.getElementById('year')
var make = document.getElementById('make')
var model = document.getElementById('model')
var a_vkt = document.getElementById('a_vkt')
var a_fuel = document.getElementById('a_fuel')
var f_type = document.getElementById('f_type')
var f_flex = document.getElementById('f_flex')
var quantity = document.getElementById('quantity')
var table = document.getElementById('table-content')
var selectedrow = null
var flag = false
var rowIndex = 0

// Dynamically generating list of years
var currentYear = new Date().getFullYear()
var selectYear = document.getElementById('year')

for (var i = currentYear; i >= 1950; i--) {
  var option = document.createElement('option')
  option.value = i
  option.text = i
  selectYear.add(option)
}

function validate() {
  var field1 = document.getElementById('description').value
  var field2 = document.getElementById('type').value
  var field3 = document.getElementById('year').value
  var field4 = document.getElementById('make').value
  var field5 = document.getElementById('model').value
  var field6 = document.getElementById('a_vkt').value
  var field7 = document.getElementById('a_fuel').value
  var field8 = document.getElementById('f_type').value
  var field9 = document.getElementById('f_flex').value
  var field10 = document.getElementById('quantity').value

  if (field1 === '') {
    alert('Enter the description')
    return false
  } else if (field2 === '') {
    alert('Enter the type')
    return false
  } else if (field3 === '') {
    alert('Enter the year')
    return false
  } else if (field4 === '') {
    alert('Enter the make')
    return false
  } else if (field5 === '') {
    alert('Enter the model')
    return false
  } else if (field6 === '') {
    alert('Enter the annual vkt')
    return false
  } else if (field7 === '') {
    alert('Enter the annual fuel')
    return false
  } else if (field8 === '') {
    alert('Enter the fuel type')
    return false
  } else if (field9 === '') {
    alert('Enter the fuel flex')
    return false
  } else if (field10 === '') {
    alert('Enter the quantity')
    return false
  } else {
    return true
  }
}

function showPopUp() {
  document.getElementById('tableTabform').style.display = 'flex'
}

function closePopUp() {
  document.getElementById('tableTabform').style.display = 'none'
  clearForm()
}

function submitForm() {
  // Check for existence of null records
  var nullRecordsRow = document.getElementById('null-records')
  if (nullRecordsRow) {
    nullRecordsRow.parentNode.removeChild(nullRecordsRow)
  }

  // Checkkfor validation
  if (!validate()) {
    return
  }

  // Getting the selected value for Fuel Flex
  var fuelFlexOptions = document.getElementsByName('fuel_flex')
  var selectedFuelFlex
  for (var i = 0; i < fuelFlexOptions.length; i++) {
    if (fuelFlexOptions[i].checked) {
      selectedFuelFlex = fuelFlexOptions[i].value
      break
    }
  }

  var description = document.getElementById('description').value
  var type = document.getElementById('type').value
  var year = document.getElementById('year').value
  var make = document.getElementById('make').value
  var model = document.getElementById('model').value
  var a_vkt = document.getElementById('a_vkt').value
  var a_fuel = document.getElementById('a_fuel').value
  var f_type = document.getElementById('f_type').value
  var f_flex = document.getElementById('f_flex').value
  var quantity = document.getElementById('quantity').value

  // Creation and insertion of records as per values defined by user
  var table = document.getElementById('table-content')
  var newRow = table.insertRow(-1)

  var cells = []
  for (var i = 0; i < 10; i++) {
    cells.push(newRow.insertCell(i))
  }

  var f_flexOptions = document.getElementsByName('fuel_flex')
  var selectedFuelFlex

  for (var i = 0; i < f_flexOptions.length; i++) {
    if (f_flexOptions[i].checked) {
      selectedFuelFlex = f_flexOptions[i].value
      break
    }
  }

  // Savings the user defined values
  cells[0].innerHTML = description
  cells[1].innerHTML = type
  cells[2].innerHTML = year
  cells[3].innerHTML = make
  cells[4].innerHTML = model
  cells[5].innerHTML = a_vkt
  cells[6].innerHTML = a_fuel
  cells[7].innerHTML = f_type
  cells[8].innerHTML = selectedFuelFlex
  cells[9].innerHTML = quantity

  closePopUp()
  alert('Data added to the table!')
  clearForm()
}

function validate() {
  var fields = [
    'description',
    'type',
    'year',
    'make',
    'model',
    'a_vkt',
    'a_fuel',
    'f_type',
    'f_flex',
    'quantity',
  ]

  for (var i = 0; i < fields.length; i++) {
    var fieldId = fields[i]
    var value

    if (fieldId === 'f_flex') {
      // For radio buttons, check if at least one option is selected
      var fuelFlexOptions = document.getElementsByName('fuel_flex')
      var selectedFuelFlex = false

      for (var j = 0; j < fuelFlexOptions.length; j++) {
        if (fuelFlexOptions[j].checked) {
          selectedFuelFlex = true
          break
        }
      }

      if (!selectedFuelFlex) {
        alert('Please select Fuel Flex option.')
        console.error('Validation failed for field: ' + fieldId)
        return false
      }
    } else if (
      fieldId === 'year' ||
      fieldId === 'a_vkt' ||
      fieldId === 'a_fuel' ||
      fieldId === 'quantity'
    ) {
      // For 'Year', 'Annual VKT', 'Annual Fuel' and 'Quantity, check if the value is an integer
      value = document.getElementById(fieldId).value.trim()
      if (!Number.isInteger(Number(value))) {
        alert('Please enter a valid integer for ' + fieldId)
        document.getElementById(fieldId).focus()
        console.error('Validation failed for field: ' + fieldId)
        return false
      }
    } else {
      // For other fields, check if the value is not an empty string
      value = document.getElementById(fieldId).value.trim()
      if (value === '') {
        alert('Please fill in all fields.\nField: ' + fieldId)
        console.error('Validation failed for field: ' + fieldId)
        return false
      }
    }
  }

  return true
}

function clearForm() {
  document.getElementById('description').value = ''
  document.getElementById('type').value = ''
  document.getElementById('year').selectedIndex = 0
  document.getElementById('make').value = ''
  document.getElementById('model').value = ''
  document.getElementById('a_vkt').value = ''
  document.getElementById('a_fuel').value = ''
  document.getElementById('f_type').value = ''
  document.getElementById('f_flex').selectedIndex = 0
  document.getElementById('quantity').value = ''
}
