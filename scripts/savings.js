function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.querySelectorAll('.hover-right').forEach((button) => {
  button.addEventListener('click', function () {
    document.querySelector('.car').classList.add('move-once')
  })
})
var ProvincialEECoefficient = 0
var litreEquivalent = 8.9
var totalEmissionsSavings = 0

var province = {
  ontario: 29,
  quebec: 1.7,
  newfound: 17,
  prince: 123,
  nova: 690,
  brunswick: 300,
  manitoba: 2,
  saskatchewan: 123,
  alberta: 540,
  columbia: 15,
}

ProvincialEECoefficient = province['ontario']
console.log(
  'Default Provincial Electricity Emissions Coefficient:: ' +
    ProvincialEECoefficient
)

function handleDropdownChange() {
  var dropdown = document.getElementById('province')
  var selectedValue = dropdown.options[dropdown.selectedIndex].value
  console.log('Selected Value:: ' + selectedValue)

  ProvincialEECoefficient = province[selectedValue]
  console.log(
    'Provincial Electricity Emissions Coefficient:: ' + ProvincialEECoefficient
  )
}

//Event listener for the dropdown
document
  .getElementById('province')
  .addEventListener('change', handleDropdownChange)
function iterateThroughList() {
  var table = document.getElementById('emission-table')
  var emissionIntensityDiv = document.getElementById('EmissionIntensity')
  emissionIntensityDiv.style.display = 'none'

  var emissionContainer = document.getElementById('emissionContainer')
  emissionContainer.style.display = 'block'

  var contactContainer = document.getElementById('contact-container')
  contactContainer.style.display = 'none'

  //console.log(selectedOptions)

  for (const key in selectedOptions) {
    if (Object.hasOwnProperty.call(selectedOptions, key)) {
      const item = selectedOptions[key]
      console.log('Row::', key)
      console.log('Option::', item.option)
      console.log('Car Model::', item.car)
      console.log('Emissions Intensity::', item.emissionsIntensity)
      console.log('Annual Emission::', item.annualEmissions)

      var row = document.createElement('tr')
      var car = document.createElement('td')
      var option = document.createElement('td')
      var annualEmissions = document.createElement('td')
      var emissionsIntensity = document.createElement('td')

      car.textContent = selectedOptions[key].car
      option.textContent = selectedOptions[key].option || 'None'
      annualEmissions.textContent = selectedOptions[key].annualEmissions
      

      savings = calculateSavings(
        item.car,
        item.option,
        item.annualEmissions,
        item.emissionsIntensity
      )
      console.log('Savings::',savings)
      emissionsIntensity.textContent = savings
      row.appendChild(car)
      row.appendChild(option)
      row.appendChild(annualEmissions)
      row.appendChild(emissionsIntensity)

      table.appendChild(row)
      // calculateSavings(
      //   item.car,
      //   item.option,
      //   item.annualEmissions,
      //   item.emissionsIntensity
      // )
    }
  }
}

// function iterateThroughList() {

// 	for (const key in selectedOptions) {
// 		if (Object.hasOwnProperty.call(selectedOptions, key)) {
// 			const item = selectedOptions[key];
// 			console.log("Row::", key);
// 			console.log("Option::", item.option);
// 			console.log("Car Model::", item.car);
// 			console.log("Emissions Intensity::", item.emissionsIntensity);
// 			console.log("Annual Emission::", item.annualEmissions);
// 			calculateSavings(item.car, item.option, item.annualEmissions, item.emissionsIntensity);
// 		}
// 	}
// }

function getCombinedKWh(makeModel) {
  for (let i = 0; i < EVData.length; i++) {
    //Accessing the current object
    const vehicle = EVData[i]
    //console.log("--------",vehicle["Make Model"])

    //Check if the "Make Model" match is found
    if (vehicle['Make Model'] === makeModel) {
      // Match found, return the value of "Combined (kWh/100 km)"
      //console.log('----Found Match----')
      //console.log('----Value----', vehicle['Combined Fuel'])
      return vehicle['Combined Fuel']
    }
  }

  //No car model match found
  return null
}

function calculateSavings(car, opt, annualEmm, emmisionInt) {
  if (opt === 'EV Vehicle') {
    console.log('-----Inside EV-----')
    savings = calculateEV(car, annualEmm, emmisionInt)
    return savings
  } else if (opt.includes('B20')) {
    savings = 15
    console.log('Savings::', savings)
    totalEmissionsSavings = 0
    return savings
  } else if (opt.includes('E85')) {
    //Could change in future
    savings = 79
    console.log('Savings::', savings)
    totalEmissionsSavings = annualEmm * 0.8
    return savings
  }
  else if (opt.includes('Right Size')) {
	  console.log("---car---", car)
	  calculateRightCar(car)
  }
}

function calculateEV(carModel, annualEmission, EmissionsIntensity) {
  CombinedKWh = getCombinedKWh(carModel)
  if (CombinedKWh != null) {
    electricalEfficiency = litreEquivalent * CombinedKWh
    evEmissionsIntensity = electricalEfficiency * ProvincialEECoefficient
    savings =
      ((EmissionsIntensity - evEmissionsIntensity) / EmissionsIntensity) * 100
    totalEmissionsSavings = savings * annualEmission
    newAnnualEmissions = annualEmission - totalEmissionsSavings
    console.log('Savings::', savings)
    return savings
  }
  return 0
}

/*function calculateE85(){
	savings = 79;
	totalEmissionsSavings = annualEmissions * 0.80
}

function calculateB20Diesel(){
	savings = 15;
}*/

function calculateRightCar(carModel) {
	const result = [];
	
	console.log("------Inside calculateRightCar------")
	var vehicleCO2 = 0
    
	for (let i = 0; i < FeulData.length; i++) {
    const vehicle = FeulData[i]
	//console.log("--------",vehicle["Make Model"])

    //Check if the "Make Model" match is found
    if (vehicle['Make Model'] === carModel) {
		//console.log("---carModel---", vehicle['Make Model'])
		vehicleCO2 = vehicle['CO2 emissions']
		console.log("---vehicleCO2---", vehicleCO2)
		break;
	}
	}	
	
	// Find cars with lower CO2 emissions
/*   for (let i = 0; i < FeulData.length; i++) {
    const vehicle = FeulData[i];
    if (vehicle['CO2 emissions'] < vehicleCO2 && vehicle['Make Model'] !== carModel) {
	   //console.log(vehicle['Make Model'])
       result.push({
        makeModel: vehicle['Make Model'],
        CO2Emissions: vehicle['CO2 emissions']
      });
      if (result.length === 10) break;
    }
  } */
  // Shuffle the FeulData array
const shuffledFeulData = shuffleArray(FeulData);

  for (let i = 0; i < shuffledFeulData.length; i++) {
  const vehicle = shuffledFeulData[i];
  if (vehicle['CO2 emissions'] < vehicleCO2 && vehicle['Make Model'] !== carModel) {
    result.push({
      makeModel: vehicle['Make Model'],
      CO2Emissions: vehicle['CO2 emissions']
    });
    if (result.length === 10) break;
  }
}
  
  console.log(result)
	
}
