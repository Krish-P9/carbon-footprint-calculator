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

energyEmission = electricity + heating //per month


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
    case 'Gasoline': vehicle = vehicle * 2.31 /mileage;
    break;
    case 'Diesel': vehicle = vehicle * 2.68 / mileage;
    break;
    case 'Electric': vehicle = vehicle * mileage/100 * 0.4
    break;
    case 'Hybrid': vehicle = vehicle/mileage * 2.31
}


transportationEmission = (bus + train + vehicle) * 20 //20 working days in a month
transportationEmission = transportationEmission + flight //adding flight emissions


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

wasteEmission = waste + recycleSaved + compostSaved //per week
wasteEmission = wasteEmission * 4 //4 weeks per month


//Water Usage
water = waterUsage['input1']
waterHeat = waterUsage['input2']

if (waterHeat == 'Natural Gas') {
    energyPerLiter = 0.0664
    totalWaterEnergy = water * energyPerLiter
    totalWaterEnergy = totalWaterEnergy * 0.185
} else if (waterHeat == 'Electric') {
    energyPerLiter = 0.0517
    totalWaterEnergy = water * energyPerLiter
    totalWaterEnergy = totalWaterEnergy * 0.47
} else {
    energyPerLiter = 0
    totalWaterEnergy = water * energyPerLiter
}

waterEmission = totalWaterEnergy    //per month

//Food
meat = food['input1']
dairy = food['input2']
local = food['input3']
foodWaste = food['input4']

meat = meat * 15
dairy = dairy * 3
foodWaste = foodWaste * 0.7

if (local) {
    foodEmission = (meat + dairy) * 0.8
}

foodEmission = foodEmission + foodWaste     //per week
foodEmission = foodEmission * 4 //4 weeks per month

//Household Size
people = householdSize['input1']
size = householdSize['input2']

finalEmission = energyEmission + wasteEmission + waterEmission + foodEmission

emissionPerPerson = finalEmission/people //carbon emission per person