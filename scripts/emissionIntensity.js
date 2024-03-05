var FuelEmissionsCoefficient = 0;

var fuelEmissionsCoefficient = {
            "Gasoline": 2299,
			"E10 Gasoline": 2071,
			"Diesel": 2730
};

//Calculating Emission Intensity
function calculateEmissionIntensity() {
    console.log("Inside calculateEmissionIntensity");
    
    var table = document.getElementById('table-content');
    var tbody = table.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr:not(.table-tab):not(.table-input)');
    console.log("Number of rows found::", rows.length); 

    rows.forEach(function(row, index) {
        console.log("Row::", index + 1);

        var cells = row.querySelectorAll('td');
        var annualFuelConsumption = cells[6].textContent.trim();
        var annualVKT = cells[5].textContent.trim();
        var fuelType = cells[7].textContent.trim();
		var type = cells[1].textContent.trim();

		var fuelEfficiency = annualFuelConsumption/annualVKT;
		var annualEmissions = annualFuelConsumption * fuelEmissionsCoefficient[fuelType]
		var emissionsIntensity = annualEmissions/annualVKT
		
        console.log("Feul Efficieny::", fuelEfficiency, "Fuel Type::", fuelType, "Fuel Annual Emission::", annualEmissions, "Emissions Intensity::", emissionsIntensity); 
        
    });
}

