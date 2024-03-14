var ProvincialEECoefficient = 0;

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
        console.log(`Option: ${item.option}`);
        console.log(`Emissions Intensity: ${item.emissionsIntensity}`);
		calculateSavings(item.option);
    }
}
}

 function calculateSavings(Val) {
	
	if(Val==="EV Vehicle"){
		console.log("-----Inside EV-----");
	}
	
	if(Val==="B20 DIESEL"){
		savings = 15;
	}
} 

/*function calculateEV(){
	evEmissionsIntensity = * ProvincialEECoefficient;
	savings = (Emissions Intensity - EV Emissions Intensity) / (EmissionsIntensity)
	Total Emissions Savings = %Savings * Annual Emissions
New Annual Emissions = Annual Emissions - (Total Emissions Savings)
}

function calculateE85(){
	savings = 79;
	totalEmissionsSavings = annualEmissions * 0.80
}

function calculateB20Diesel(){
	savings = 15;
}*/
