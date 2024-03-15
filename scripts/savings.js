document.querySelectorAll('.hover-right').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelector('.car').classList.add('move-once');
  });
});var ProvincialEECoefficient = 0;
var litreEquivalent = 8.9;
var totalEmissionsSavings =0;

var province = {
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

ProvincialEECoefficient = province["ontario"];
console.log("Default Provincial Electricity Emissions Coefficient:: " + ProvincialEECoefficient);

function handleDropdownChange() {

            var dropdown = document.getElementById("province");
            var selectedValue = dropdown.options[dropdown.selectedIndex].value;
            console.log("Selected Value:: " + selectedValue);
            
			ProvincialEECoefficient = province[selectedValue];
            console.log("Provincial Electricity Emissions Coefficient:: " + ProvincialEECoefficient);
}

//Event listener for the dropdown
document.getElementById("province").addEventListener("change", handleDropdownChange);

function iterateThroughList(){
	
	for (const key in selectedOptions) {
    if (Object.hasOwnProperty.call(selectedOptions, key)) {
        const item = selectedOptions[key];
        console.log("Row::", key);
        console.log("Option::", item.option);
		console.log("Car Model::", item.car);
        console.log("Emissions Intensity::", item.emissionsIntensity);
		console.log("Annual Emission::", item.annualEmissions);
		calculateSavings(item.car, item.option, item.annualEmissions, item.emissionsIntensity);
    }
}
}

function getCombinedKWh(makeModel) {
	for (let i = 0; i < EVData.length; i++) {
        //Accessing the current object
        const vehicle = EVData[i];
        //console.log("--------",vehicle["Make Model"])
			
        //Check if the "Make Model" match is found
        if (vehicle["Make Model"] === makeModel) {
            // Match found, return the value of "Combined (kWh/100 km)"
			console.log("----Found Match----")
			console.log("----Value----", vehicle["Combined Fuel"])
            return vehicle["Combined Fuel"];
        }
    }

    //No car model match found
    return null;
}

 function calculateSavings(car, opt, annualEmm, emmisionInt) {
	
	if(opt==="EV Vehicle"){
		console.log("-----Inside EV-----");
		calculateEV(car, annualEmm, emmisionInt)
	}
	
	else if(opt.includes("B20")){
		savings = 15;
		console.log("Savings::", savings);
		totalEmissionsSavings = 0
	}
	
	else if(opt.includes("E85")){
		//Could change in future
		savings = 79
		console.log("Savings::", savings);
		totalEmissionsSavings = annualEmm * 0.80
	}
} 

function calculateEV(carModel, annualEmission, EmissionsIntensity){
	CombinedKWh = getCombinedKWh(carModel);
	if(CombinedKWh != null){
	electricalEfficiency = litreEquivalent * CombinedKWh;
	evEmissionsIntensity = electricalEfficiency * ProvincialEECoefficient;
	savings = (EmissionsIntensity - evEmissionsIntensity) / (EmissionsIntensity) *100
	totalEmissionsSavings = savings * annualEmission
	newAnnualEmissions = annualEmission - totalEmissionsSavings
	console.log("Savings::", savings);
	}
}

/*function calculateE85(){
	savings = 79;
	totalEmissionsSavings = annualEmissions * 0.80
}

function calculateB20Diesel(){
	savings = 15;
}*/
