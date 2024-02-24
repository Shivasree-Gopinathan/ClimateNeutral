function handleDropdownChange() {
	var jsonData = {
            "ontario": 29,
            "quebec": 1.7,
            "newfound": 17,
            "prince": 123,
            "nova": 690,
            "brunswick": 300,
            "manitoba": 2,
            "saskatchewan": 123,
            "alberta": 540,
            "columbia": 15
        };

            var dropdown = document.getElementById("province");
            var selectedValue = dropdown.options[dropdown.selectedIndex].value;
            console.log("Selected Value: " + selectedValue);
            
			 var correspondingValue = jsonData[selectedValue];
            console.log("Corresponding Value: " + correspondingValue);
}

//Event listener for the dropdown
document.getElementById("province").addEventListener("change", handleDropdownChange);
//"Ontario" as the default selected option
//document.getElementById("province").selectedIndex = 0;

//Calculating green options
function calculateGreenOptions() {
    console.log("Inside calculateGreenOptions"); 

    var table = document.getElementById('table-content');
    var tbody = table.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr:not(.table-tab):not(.table-input)');
    console.log("Number of rows found::", rows.length); 

    rows.forEach(function(row, index) {
        console.log("Row::", index + 1);

        var cells = row.querySelectorAll('td');
        var type = cells[1].textContent.trim();
        var flexFuel = cells[8].textContent.trim();
        var fuelType = cells[7].textContent.trim();
		
        console.log("Type::", type, ", Flex Fuel::", flexFuel, ", Fuel Type::", fuelType); 

        try {
            var greenOptions = getGreenOptions(type, flexFuel, fuelType);
            console.log("Green Options for Row " + (index + 1) + ":: ", greenOptions.join(', ')); 
        } catch (error) {
            console.error("Error calculating green options for Row " + (index + 1) + "::", error);
        }
    });
}

//Values for Green Options
function getGreenOptions(type, flexFuel, fuelType) {
    var greenOptions = [];

    if (type === "Car" && flexFuel === "Yes" && fuelType === "Gasoline") {
        greenOptions.push("Replace w/ EV Vehicle");
        greenOptions.push("E85 Ethanol Usage");
    }

    if (type === "Car" && flexFuel === "No" && fuelType === "Gasoline") {
        greenOptions.push("Replace w/ EV Car");
        greenOptions.push("Replace w/ Biofuel Car E85");
    }

    if (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Gasoline") {
        greenOptions.push("Replace w/ EV Light Duty Truck");
        greenOptions.push("Replace w/ Biofuel E85 Light Duty Truck");
        greenOptions.push("Right Size to Car");
        greenOptions.push("Right Size to Biofuel Car");
    }

    if (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Gasoline") {
        greenOptions.push("E85 Biofuel Usage");
        greenOptions.push("Replace w/ EV Light Duty Truck");
        greenOptions.push("Right Size to Car");
        greenOptions.push("Right Size to Biofuel Car");
    }

    if (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Diesel") {
        greenOptions.push("Replace w/ EV Light Duty Truck");
        greenOptions.push("Replace w/ Biofuel E85 Light Duty Truck");
        greenOptions.push("Right Size to Car");
        greenOptions.push("Right Size to Biofuel E85 Car");
    }

    if (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Diesel") {
        greenOptions.push("B20 Diesel Usage");
        greenOptions.push("Replace w/ EV Light Duty Truck");
        greenOptions.push("Replace w/ Biofuel E85 Light Duty Truck");
        greenOptions.push("Right Size to Car");
        greenOptions.push("Right Size to Biofuel E85 Car");
    }

    return greenOptions;
}