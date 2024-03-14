//Storing values for each row
const selectedOptions = {};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.custom-select').forEach(function(dropdown) {
        const rowIndex = dropdown.closest('tr').rowIndex;
        //selectedOptions[rowIndex] = dropdown.value;
		selectedOptions[rowIndex] = {
            option: dropdown.value,
            emissionsIntensity: 0
        };
    });

    //Adding event listener to the dropdown elements
    document.addEventListener('change', function(event) {
        const target = event.target;
        if (target.tagName === 'SELECT' && target.className === 'custom-select') {
            //Getting the row index
            const rowIndex = target.closest('tr').rowIndex;
            //selectedOptions[rowIndex] = target.value;
			selectedOptions[rowIndex] = {
            option: target.value,
            emissionsIntensity: 0
        };
            console.log('Selected option for row ' + rowIndex + ':', selectedOptions[rowIndex]);
			console.log('New selectedOptions::');
			console.log(selectedOptions);
        }
    });
});

//Calculating green options
function calculateGreenOptions() {
  console.log('Inside calculateGreenOptions')
  console.log(selectedOptions);

  var table = document.getElementById('table-content')
  var tbody = table.querySelector('tbody')
  var rows = tbody.querySelectorAll('tr:not(.table-tab):not(.table-input)')
  console.log('Number of rows found::', rows.length)

  rows.forEach(function (row, index) {
    console.log('Row::', index + 1)

    var cells = row.querySelectorAll('td')
    var type = cells[1].textContent.trim()
    var flexFuel = cells[8].textContent.trim()
    var fuelType = cells[7].textContent.trim()

    // Creating a new <h3> element for each vehicle
    var vehicleHeading = document.createElement('h3')
    vehicleHeading.textContent = 'Vehicle ' + (index + 1) + ' - ' + type

    // Appending the vehicle details to the left container
    document.getElementById('left-container').appendChild(vehicleHeading)

    console.log(
      'Type::',
      type,
      ', Flex Fuel::',
      flexFuel,
      ', Fuel Type::',
      fuelType
    )
    // Call the function to populate green options into the dropdown
    populateGreenOptions()

    try {
      var greenOptions = getGreenOptions(type, flexFuel, fuelType)
      console.log(
        'Green Options for Row ' + (index + 1) + ':: ',
        greenOptions.join(', ')
      )
    } catch (error) {
      console.error(
        'Error calculating green options for Row ' + (index + 1) + '::',
        error
      )
    }
  })
}

//Values for Green Optionsfunction
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
    var vehicleNumber = "Vehicle " + (i + 1);
    var cell1 = newRow.insertCell()
    cell1.textContent = vehicleNumber + ' - ' + record.type + ' - ' + record.make + ' - ' + record.model;

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

var calculateGreenBtn = document.getElementById('calculate-green-btn')
var sectionAbove = document.getElementById('pageBody')
var greenOptionsDiv1 = document.getElementById('green-option')
var emissionIntensity = document.getElementById('EmissionIntensity')
// var emission = document.getElementById('emission-intensity')

calculateGreenBtn.addEventListener('click', function () {
  sectionAbove.style.display = 'none'
  emissionIntensity.style.display = 'none'
  // emission.style.display = "none"
  greenOptionsDiv1.style.display = 'block'
})
