function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
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

  const totalEmissionsSavings = document.getElementById('totalEmissionsSavings')
  const emissionsSavingsPercentage = document.getElementById(
    'emissionsSavingsPercentage'
  )

  let totalEmissionsSavingsAverage = 0
  let emissionsSavingsPercentageAverage = 0
  let count = 0

  var emissionContainer = document.getElementById('emissionContainer')
  emissionContainer.style.display = 'block'

  var contactContainer = document.getElementById('contact-container')
  contactContainer.style.display = 'none'

  //console.log(selectedOptions)
  while (table.rows.length > 1) {
    table.deleteRow(1)
  }

  for (const key in selectedOptions) {
    if (Object.hasOwnProperty.call(selectedOptions, key)) {
      const item = selectedOptions[key]
      console.log('Row::', key)
      console.log('Option::', item.option)
      console.log('Car Model::', item.car)
      console.log('Emissions Intensity::', item.emissionsIntensity)
      console.log('Annual Emission::', item.annualEmissions)

      count++
      totalEmissionsSavingsAverage += item.annualEmissions

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
      console.log('Savings::', savings)

      emissionsSavingsPercentageAverage += savings

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
  totalEmissionsSavingsAverage = totalEmissionsSavingsAverage / count
  emissionsSavingsPercentageAverage = emissionsSavingsPercentageAverage / count

  totalEmissionsSavings.textContent = `${totalEmissionsSavingsAverage.toFixed(
    2
  )} Tonnes/Year`
  // emissionsSavingsPercentage.innerHTML = `${emissionsSavingsPercentageAverage.toFixed(
  //   2
  // )}%`

  if (isNaN(emissionsSavingsPercentageAverage)) {
    emissionsSavingsPercentage.innerHTML = '0%';
  } else {
    emissionsSavingsPercentage.innerHTML = `${emissionsSavingsPercentageAverage.toFixed(2)}%`;
  }
}

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

// function calculateSavings(car, opt, annualEmm, emmisionInt) {
//   if (opt === 'EV Vehicle') {
//     console.log('-----Inside EV-----')
//     savings = calculateEV(car, annualEmm, emmisionInt)
//     return savings
//   } else if (opt.includes('B20')) {
//     savings = 15
//     console.log('Savings::', savings)
//     totalEmissionsSavings = 0
//     return savings
//   } else if (opt.includes('E85')) {
//     //Could change in future
//     savings = 79
//     console.log('Savings::', savings)
//     totalEmissionsSavings = annualEmm * 0.8
//     return savings
//   } else if (opt.includes('Right Size')) {
//     console.log('---car---', car)
//     calculateRightCar(car)
//   }
// }

function calculateSavings(car, opt, annualEmm, emmisionInt) {
  if (opt === 'EV Vehicle') {
    console.log('-----Inside EV-----')
    savings = calculateEV(car, annualEmm, emmisionInt)
    calculateRightCar(car)
    return savings
  } else if (opt.includes('B20')) {
    savings = 15
    console.log('Savings::', savings)
    totalEmissionsSavings = 0
    calculateRightCar(car)
    return savings
  } else if (opt.includes('E85')) {
    //Could change in future
    savings = 79
    console.log('Savings::', savings)
    totalEmissionsSavings = annualEmm * 0.8
    calculateRightCar(car)
    return savings
  } else if (opt.includes('Right Size')) {
    console.log('---car---', car)
    calculateRightCar(car)
  }
  else if (opt.includes('Biofuel')) {
    console.log('---car---', car)
    calculateRightCar(car)
  }
  else if (opt.includes('EV')) {
    console.log('---car---', car)
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
  const result = []

  console.log('------Inside calculateRightCar------')
  var vehicleCO2 = 0

  for (let i = 0; i < FeulData.length; i++) {
    const vehicle = FeulData[i]
    //console.log("--------",vehicle["Make Model"])

    //Check if the "Make Model" match is found
    if (vehicle['Make Model'] === carModel) {
      //console.log("---carModel---", vehicle['Make Model'])
      vehicleCO2 = vehicle['CO2 emissions']
      console.log('---vehicleCO2---', vehicleCO2)
      break
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
  const shuffledFeulData = shuffleArray(FeulData)

  for (let i = 0; i < shuffledFeulData.length; i++) {
    const vehicle = shuffledFeulData[i]
    if (
      vehicle['CO2 emissions'] < vehicleCO2 &&
      vehicle['Make Model'] !== carModel
    ) {
      result.push({
        makeModel: vehicle['Make Model'],
        CO2Emissions: vehicle['CO2 emissions'],
      })
      if (result.length === 10) break
    }
    displayBarGraph(result)
  }

  console.log(result)
}

/* function displayBarGraph(result) {
  const makeModels = result.map((item) => item.makeModel)
  const co2Emissions = result.map((item) => item.CO2Emissions)

  var ctx = document.getElementById('myChart').getContext('2d')

  // Destroy existing chart if it exists
  if (window.myChart instanceof Chart) {
    window.myChart.destroy()
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: makeModels,
      datasets: [
        {
          label: 'CO2 Emissions',
          data: co2Emissions,
          backgroundColor: '#26b170',
          borderColor: '#0c1c81',
          borderWidth: 2,
          // Set bar thickness manually or use maxBarThickness to limit thickness
          barThickness: 34, // you can also try maxBarThickness: <value>
        },
      ],
    },
    options: {
      indexAxis: 'y', // Set the index axis to 'y' for horizontal bars
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false, // Remove grid lines from the x-axis
          },
          ticks: {
            font: {
              size: 16, // Increase font size for x-axis labels
            },
          },
          // Add this to adjust the spacing between bars
          barPercentage: 0.1,
          categoryPercentage: 0.1,
        },
        y: {
          grid: {
            display: true, // Remove grid lines from the y-axis
          },
          ticks: {
            font: {
              size: 16, // Increase font size for y-axis labels
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18, // Increase font size for the legend
            },
          },
        },
      },
      // maintainAspectRatio: false, // Add this to prevent default aspect ratio constraints
    },
  })
} */

function displayBarGraph(result) {
  // Sort the data in descending order based on CO2 emissions
  result.sort((a, b) => b.CO2Emissions - a.CO2Emissions);

  const makeModels = result.map((item) => item.makeModel);
  const co2Emissions = result.map((item) => item.CO2Emissions);

  var ctx = document.getElementById('myChart').getContext('2d');

  // Destroy existing chart if it exists
  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: makeModels,
      datasets: [
        {
          label: 'CO2 Emissions',
          data: co2Emissions,
          backgroundColor: co2Emissions.map(emission => {
            if (emission < 200) {
              return '#8bc34a';
            } else if (emission >= 200 && emission < 300) {
              return '#26b170';
            } else {
              return '#007f4c';
            }
          }),
          borderColor: '#0c1c81',
          borderWidth: 2,
          // Set bar thickness manually or use maxBarThickness to limit thickness
          barThickness: 34, // you can also try maxBarThickness: <value>
        },
      ],
    },
    options: {
      indexAxis: 'y', // Set the index axis to 'y' for horizontal bars
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false, // Remove grid lines from the x-axis
          },
          ticks: {
            font: {
              size: 16, // Increase font size for x-axis labels
            },
          },
          // Add this to adjust the spacing between bars
          barPercentage: 0.1,
          categoryPercentage: 0.1,
        },
        y: {
          grid: {
            display: true, // Remove grid lines from the y-axis
          },
          ticks: {
            font: {
              size: 16, // Increase font size for y-axis labels
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18, // Increase font size for the legend
            },
          },
        },
      },
      // maintainAspectRatio: false, // Add this to prevent default aspect ratio constraints
    },
  });
}
