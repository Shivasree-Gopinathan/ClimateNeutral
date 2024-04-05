document.querySelectorAll('.hover-right').forEach((button) => {
  button.addEventListener('click', function () {
    document.querySelector('.car').classList.add('move-once')
  })
})

var FuelEmissionsCoefficient = 0

var fuelEmissionsCoefficient = {
  Gasoline: 2299,
  'E10 Gasoline': 2071,
  Diesel: 2730,
}

document.addEventListener('DOMContentLoaded', function () {
  calculateEmissionIntensity()
})

function getEmissionsIntensityRange(val) {
  let range = Math.floor(Math.random() * 3)

  let lower = val - rangeNumber
  let upper = val + rangeNumber
}

//Calculating Emission Intensity
function calculateEmissionIntensity() {
  var table = document.getElementById('table-content')
  var tbody = table.querySelector('tbody')
  var rows = tbody.querySelectorAll('tr:not(.table-tab):not(.table-input)')

  var annualEmissionsData = []
  var emissionsIntensityData = []

  rows.forEach(function (row, index) {
    var cells = row.querySelectorAll('td')
    var annualFuelConsumption = cells[6].textContent.trim()
    var annualVKT = cells[5].textContent.trim()
    var fuelType = cells[7].textContent.trim()
    var description = cells[0].textContent.trim().slice(0, 15) // Limit to 15 characters

    var fuelEfficiency = annualFuelConsumption / annualVKT
    var annualEmissions =
      annualFuelConsumption * fuelEmissionsCoefficient[fuelType]
    var emissionsIntensity = Math.floor(annualEmissions / annualVKT)
    selectedOptions[index + 1].annualEmissions = annualEmissions / 1000
    selectedOptions[index + 1].emissionsIntensity = emissionsIntensity

    annualEmissionsData.push({ label: description, value: annualEmissions })
    emissionsIntensityData.push({
      label: description,
      value: emissionsIntensity,
    })
  })

  drawHorizontalBarChart('emissionChart', annualEmissionsData, 'value')
  drawHorizontalBarChart(
    'emissionIntensityChart',
    emissionsIntensityData,
    'emissionIntensity'
  )
}

// function drawHorizontalBarChart(canvasId, data, valueType) {
//   var canvas = document.getElementById(canvasId)
//   var ctx = canvas.getContext('2d')

//   var requiredHeight = data.length * 75
//   canvas.height = requiredHeight

//   ctx.clearRect(0, 0, canvas.width, canvas.height)

//   var maxValue = Math.max(...data.map((item) => item.value))

//   var barHeight = 40
//   var horizontalGap = 160
//   var verticalGap = 30

//   var animationSpeed = 3
//   var animationInterval = 10

//   var barColor = canvasId === 'emissionChart' ? '#0c1081' : '#26b170'
//   var borderColor = canvasId === 'emissionChart' ? '#26b170' : '#0c1081'

//   ctx.font = 'bold 20px Lato, sans-serif'

//   data.forEach(function (item, index) {
//     var startX = horizontalGap - 155
//     var startY =
//       (index + 1) * verticalGap + index * barHeight + barHeight / 2 + 6
//     ctx.textAlign = 'left'
//     ctx.fillStyle = barColor
//     ctx.fillText(item.label, startX, startY) // Use description as label

//     var targetWidth =
//       (item.value / maxValue) * (canvas.width - 2 * horizontalGap)
//     var currentWidth = 0
//     var animation = setInterval(function () {
//       ctx.clearRect(
//         horizontalGap,
//         startY - barHeight / 2,
//         currentWidth,
//         barHeight
//       )

//       currentWidth += animationSpeed

//       ctx.fillStyle = barColor
//       ctx.fillRect(
//         horizontalGap,
//         startY - barHeight / 2,
//         currentWidth,
//         barHeight
//       )
//       ctx.strokeStyle = borderColor
//       ctx.strokeRect(
//         horizontalGap,
//         startY - barHeight / 2,
//         currentWidth,
//         barHeight
//       )

//       if (currentWidth >= targetWidth) {
//         clearInterval(animation)
//         // Display value with units after animation completes
//         ctx.fillStyle = barColor
//         ctx.textAlign = 'left'

//         if (valueType === 'value') {
//           // For annual emissions
//           ctx.fillText(
//             (item.value / 1000).toFixed(2) + ' kgCO2e',
//             horizontalGap + currentWidth + 5,
//             startY + 6
//           )
//         } else if (valueType === 'emissionIntensity') {
//           // For emission intensity
//           ctx.fillText(
//             item.value.toFixed(2) + ' gCO2e/km',
//             horizontalGap + currentWidth + 5,
//             startY + 6
//           )
//         }
//       }
//     }, animationInterval)
//   })
// }

function drawHorizontalBarChart(canvasId, data, valueType) {
  var ctx = document.getElementById(canvasId).getContext('2d')

  // Check if there's an existing Chart instance
  var existingChart = Chart.getChart(ctx)
  if (existingChart) {
    existingChart.destroy() // Destroy the existing Chart instance
  }

  var labels = data.map((item) => item.label)
  var values = data.map((item) => item.value)

  var maxValue = Math.max(...values)

  var barColor = canvasId === 'emissionChart' ? '#0c1081' : '#26b170'
  var borderColor = canvasId === 'emissionChart' ? '#26b170' : '#0c1081'

  var datasets = [
    {
      label: valueType === 'value' ? 'kgCO2e' : 'gCO2e/km',
      backgroundColor: barColor,
      borderColor: borderColor,
      borderWidth: 1,
      data: values,
      barThickness: 34,
    },
  ]

  var chartOptions = {
    indexAxis: 'y', // This will make the bar chart horizontal
    scales: {
      x: {
        // Adjust the axis options as per the new version
        ticks: {
          beginAtZero: true,
        },
        grid: {
          display: false, // This will hide the grid lines on the x-axis
        },
      },
      y: {
        // Adjust the axis options for labels
        grid: {
          display: false, // This will hide the grid lines on the y-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // This will hide the legend
      },
    },
    barPercentage: 0.5, // Controls the width of the bars, set this to a lower number for narrower bars
    categoryPercentage: 0.8,
  }

  var chartConfig = {
    type: 'bar', // Set type to 'bar' for both vertical and horizontal bars
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: chartOptions,
  }

  new Chart(ctx, chartConfig)
}

function toggleVisibility() {
  var totalEmissionsTitle = document.getElementById('totalEmissionsTitle')
  var emissionIntensityTitle = document.getElementById('emissionIntensityTitle')
  var emissionIntensityDiv = document.getElementById('EmissionIntensity')
  var greenOption = document.getElementById('green-option')
  var dataEntry = document.getElementById('pageBody')
  var contact = document.getElementById('contact-container')

  totalEmissionsTitle.style.display = 'block'
  emissionIntensityTitle.style.display = 'block'
  emissionIntensityDiv.style.display = 'block'
  greenOption.style.display = 'none'
  dataEntry.style.display = 'none'
  contact.style.display = 'none'
}
