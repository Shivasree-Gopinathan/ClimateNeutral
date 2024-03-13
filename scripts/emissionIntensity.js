var FuelEmissionsCoefficient = 0

var fuelEmissionsCoefficient = {
  Gasoline: 2299,
  'E10 Gasoline': 2071,
  Diesel: 2730,
}

document.addEventListener('DOMContentLoaded', function () {
  calculateEmissionIntensity()
})

//Calculating Emission Intensity
function calculateEmissionIntensity() {
  console.log('Inside calculateEmissionIntensity')

  var table = document.getElementById('table-content')
  var tbody = table.querySelector('tbody')
  var rows = tbody.querySelectorAll('tr:not(.table-tab):not(.table-input)')
  console.log('Number of rows found::', rows.length)

  var annualEmissionsData = []
  var emissionsIntensityData = []

  rows.forEach(function (row, index) {
    console.log('Row::', index + 1)

    var cells = row.querySelectorAll('td')
    var annualFuelConsumption = cells[6].textContent.trim()
    var annualVKT = cells[5].textContent.trim()
    var fuelType = cells[7].textContent.trim()
    var type = cells[1].textContent.trim()

    var fuelEfficiency = annualFuelConsumption / annualVKT
    var annualEmissions =
      annualFuelConsumption * fuelEmissionsCoefficient[fuelType]
    var emissionsIntensity = annualEmissions / annualVKT

    annualEmissionsData.push({ label: type, value: annualEmissions })
    emissionsIntensityData.push({ label: type, value: emissionsIntensity })
    console.log(
      'Feul Efficieny::',
      fuelEfficiency,
      'Fuel Type::',
      fuelType,
      'Fuel Annual Emission::',
      annualEmissions,
      'Emissions Intensity::',
      emissionsIntensity
    )
  })
  // Call a function to draw the chart
  drawHorizontalBarChart('emissionChart', annualEmissionsData)
  drawHorizontalBarChart('emissionIntensityChart', emissionsIntensityData)
  // drawHorizontalBarChart(
  //   'emissionChart',
  //   annualEmissionsData,
  //   annualEmissionsData.map((item) => item.label)
  // )
  // drawHorizontalBarChart(
  //   'emissionIntensityChart',
  //   emissionsIntensityData,
  //   emissionsIntensityData.map((item) => item.label)
  // )
}

function drawHorizontalBarChart(canvasId, data) {
  var canvas = document.getElementById(canvasId)
  var ctx = canvas.getContext('2d')

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Calculate the maximum value for scaling
  var maxValue = Math.max(...data.map((item) => item.value))

  // Bar height and gap settings
  var barHeight = 40
  var horizontalGap = 100 // Horizontal gap between bars
  var verticalGap = 30 // Vertical gap between caption and bars

  // Animation settings
  var animationSpeed = 3 // Increase to speed up animation
  var animationInterval = 10 // Milliseconds between animation frames

  var barColor = canvasId === 'emissionChart' ? '#0c1081' : '#26b170'

  // Set label font size and weight
  ctx.font = 'bold 20px Lato, sans-serif' // Adjust font size and family as needed

  // Draw labels
  data.forEach(function (item, index) {
    var startX = horizontalGap - 95 // Adjust startX for left alignment
    var startY =
      (index + 1) * verticalGap + index * barHeight + barHeight / 2 + 6 // Adjust startY for vertical alignment
    ctx.textAlign = 'left'
    ctx.fillStyle = barColor
    ctx.fillText('Vehicle ' + (index + 1), startX, startY)
  })

  // Draw bars horizontally with animation
  data.forEach(function (item, index) {
    var targetWidth =
      (item.value / maxValue) * (canvas.width - 2 * horizontalGap)
    var currentWidth = 0
    var startX = horizontalGap
    var startY = (index + 1) * verticalGap + index * barHeight + barHeight / 2 // Adjust startY to center vertically

    // Animate the bars
    var animation = setInterval(function () {
      ctx.clearRect(startX, startY - barHeight / 2, currentWidth, barHeight)

      currentWidth += animationSpeed

      // Draw the bar
      ctx.fillStyle = barColor
      ctx.fillRect(startX, startY - barHeight / 2, currentWidth, barHeight)

      // Stop the animation when reaching the target width
      if (currentWidth >= targetWidth) {
        clearInterval(animation)
      }
    }, animationInterval)
  })
}

function toggleVisibility() {
  var totalEmissionsTitle = document.getElementById('totalEmissionsTitle')
  var emissionIntensityTitle = document.getElementById('emissionIntensityTitle')

  totalEmissionsTitle.style.display = 'block'
  emissionIntensityTitle.style.display = 'block'
}
