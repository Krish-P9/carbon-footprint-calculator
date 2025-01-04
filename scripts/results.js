//need to finish units for energy in results and html page
//need to modify transportation.html for fuel efficency for electric cars

let dict = JSON.parse(localStorage.getItem('calculatorData'))
let energyUse = dict['energyPage']
let transportation = dict['transportationPage']
let wasteManagement = dict['wasteManagementPage']
let waterUsage = dict['waterUsagePage']
let food = dict['foodPage']
let householdSize = dict['householdSizePage']


// Energy Use
let electricity = energyUse['input1']
let heatingType = energyUse['input2']
let heating = energyUse['input3']
let renewableElectricity = energyUse['input4']

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

let energyEmission = electricity + heating //per month


// Transporation
let bus = transportation['input1']
let train = transportation['input2']
let vehicle = transportation['input3']
let mileage = transportation['input4']
let typeOfFuel = transportation['input5']
let flight = transportation['input6']

bus = bus * 0.11 * 20
train = train * 0.06 * 20
flight = flight * 0.12 

switch(typeOfFuel) {
    case 'Gasoline': vehicle = vehicle * 2.31 /mileage
    break
    case 'Diesel': vehicle = vehicle * 2.68 / mileage
    break
    case 'Electric': vehicle = vehicle * mileage/100 * 0.4
    break
    case 'Hybrid': vehicle = vehicle/mileage * 2.31
}


let transportationEmissionPerPerson = (bus + train + vehicle) * 20 //20 working days in a month
transportationEmissionPerPerson += flight //adding flight emissions, value per person


// Waste Management
let waste = wasteManagement['input1']
let recycle = wasteManagement['input2']
let compost = wasteManagement['input3']
let wasteSaved = 0
let recycleSaved = 0
let compostSaved = 0


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

let wasteEmission = waste + recycleSaved + compostSaved //per week
wasteEmission = wasteEmission * 4 //4 weeks per month


//Water Usage
let water = waterUsage['input1']
let waterHeat = waterUsage['input2']
let energyPerLiter = 0
let totalWaterEnergy = 0

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

let waterEmission = totalWaterEnergy    //per month

//Food
let meat = food['input1']
let dairy = food['input2']
let local = food['input3']
let foodWaste = food['input4']
let foodEmission = 0

meat = meat * 15
dairy = dairy * 3
foodWaste = foodWaste * 0.7

if (local) {
    foodEmission = (meat + dairy) * 0.8
}

foodEmission = foodEmission + foodWaste     //per week
foodEmission = foodEmission * 4 //4 weeks per month

//Household Size
let people = householdSize['input1']
let size = householdSize['input2']

let energyEmissionPerPerson = energyEmission / people
let transportationEmission = transportationEmissionPerPerson * people
let wasteEmissionPerPerson = wasteEmission / people
let waterEmissionPerPerson = waterEmission/ people
let foodEmissionPerPerson = foodEmission / people

console.log(energyEmission)
console.log(energyEmissionPerPerson)