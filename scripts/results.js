dict = JSON.parse(localStorage.getItem('calculatorData'))
energyUse = dict['energyUse']
transporation = dict['transportationPage']
wasteManagement = dict['wasteManagementPage']
waterUsage = dict['waterUsagePage']
food = dict['foodPage']
householdSize = dict['householdSizePage']


// Energy Use
electricity = energyUse['input1']
heatingType = energyUse['input2']
heating = energyUse['input3']
renewableElectricity = energyUse['input4']

electricity = electricity * 0.47

switch(heatingType) {
    case 'Natural Gas': heating = heating * 1.9;
    break;
    case 'Oil': heating = heating * 2.68;
    break;
    case 'Propane': heating = heating * 1.51;
    break;
}

renewableElectricity = renewableElectricity / 10

electricity = electricity * (1 - renewableElectricity)

energyEmission = electricity + heating


// Transporation
bus = transportation['input1']
train = transportation['input2']
vehicle = transporation['input3']
mileage = transportation['input4']
typeOfFuel = transportation['input5']
flight = transportation['input6']

bus = bus * 0.11 * 20
train = train * 0.06 * 20
flight = flight * 0.12 

switch(typeOfFuel) {
    case 'Gasoline': vehicle * (1/mileage) * 2.31;
    break;
    case 'Diesel': vehicle * (1/mileage) * 2.68;
    break;
    case 'Electric': //ill do it later
    break;
    case 'Hybrid': //this too
}



// Waste Management
waste = wasteManagement[input1]
recycle = wasteManagement[input2]
compost = wasteManagement[input3]
wasteSaved = 0
recycleSaved = 0
compostSaved = 0


if (recycle) {
    recycle = waste * 0.4          //assuming 40% of waste is recycled
    recycleSaved = recycle * 2    //emission saved by recycling
    wasteSaved += recycle
}

if (compost)  {
    compost = waste * 0.3           //assuming 30% of waste is composted
    compostSaved = compost * 0.5     //emission saved by compost
    wasteSaved += compost
}

waste = waste - wasteSaved

wasteEmission = waste + recycleSaved + compostSaved


//Water Usage
