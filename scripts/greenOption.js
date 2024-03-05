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

        // Creating a new <h3> element for each vehicle
        var vehicleHeading = document.createElement('h3');
        vehicleHeading.textContent = "Vehicle " + (index + 1) + " - " + type;

        // Appending the vehicle details to the container
        document.getElementById('vehicle-container').appendChild(vehicleHeading);

		
        console.log("Type::", type, ", Flex Fuel::", flexFuel, ", Fuel Type::", fuelType); 
        // Call the function to populate green options into the dropdown
        populateGreenOptions(type, flexFuel,fuelType);

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

// Function to populate green options into the dropdown
function populateGreenOptions(type, flexFuel, fuelType) {
    var dropdown = document.getElementById("green-option-selector");
    dropdown.innerHTML = ""; // Clear existing options

    var greenOptions = getGreenOptions(type, flexFuel, fuelType); // Calculate green options

    greenOptions.forEach(function(option) {
        var optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}


var calculateGreenBtn = document.getElementById("calculate-green-btn");
var sectionAbove = document.getElementById("DataEntry");
var greenOptionsDiv1 = document.getElementById("greenOptionsDiv1");
var greenOptionsDiv2 = document.getElementById("greenOptionsDiv2");
calculateGreenBtn.addEventListener("click", function() {
        // Hide the section above
        sectionAbove.style.display = "none";
        // Show the green options div
        greenOptionsDiv1.style.display = "block";
        greenOptionsDiv2.style.display = "block";
    });


