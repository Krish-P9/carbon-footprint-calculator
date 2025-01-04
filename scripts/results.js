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

let energyEmission = Math.round(electricity + heating) //per month


// Transporation
let bus = transportation['input1']
let train = transportation['input2']
let vehicle = transportation['input3']
let typeOfFuel = transportation['input4']
let mileage = transportation['input5']
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
transportationEmissionPerPerson = Math.round(transportationEmissionPerPerson)


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
wasteEmission = Math.round(wasteEmission * 4) //4 weeks per month


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

let waterEmission = Math.round(totalWaterEnergy)    //per month

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
foodEmission = Math.round(foodEmission * 4) //4 weeks per month

//Household Size
let people = householdSize['input1']
let size = householdSize['input2']

let energyEmissionPerPerson = Math.round(energyEmission / people)
let transportationEmission = Math.round(transportationEmissionPerPerson * people)
let wasteEmissionPerPerson = Math.round(wasteEmission / people)
let waterEmissionPerPerson = Math.round(waterEmission/ people)
let foodEmissionPerPerson = Math.round(foodEmission / people)

let totalHouseholdEmission = Math.round((energyEmission + transportationEmission + wasteEmission + waterEmission + foodEmission))
let totalPersonEmission = Math.round((energyEmissionPerPerson + transportationEmissionPerPerson + wasteEmissionPerPerson + waterEmissionPerPerson + foodEmissionPerPerson))

// Display Calculations
let yourCarbonFootprint = document.getElementById("your-carbon-footprint")
let yourCarbonFootprintEnergy = document.getElementById("your-carbon-footprint-energy")
let yourCarbonFootprintTransportation = document.getElementById("your-carbon-footprint-transportation")
let yourCarbonFootprintWaste = document.getElementById("your-carbon-footprint-waste")
let yourCarbonFootprintWater = document.getElementById("your-carbon-footprint-water")
let yourCarbonFootprintFood = document.getElementById("your-carbon-footprint-food")
let yourHouseholdCarbonFootprint = document.getElementById("your-household-carbon-footprint")
let yourHouseholdCarbonFootprintEnergy = document.getElementById("your-household-carbon-footprint-energy")
let yourHouseholdCarbonFootprintTransportation = document.getElementById("your-household-carbon-footprint-transportation")
let yourHouseholdCarbonFootprintWaste = document.getElementById("your-household-carbon-footprint-waste")
let yourHouseholdCarbonFootprintWater = document.getElementById("your-household-carbon-footprint-water")
let yourHouseholdCarbonFootprintFood = document.getElementById("your-household-carbon-footprint-food")

yourCarbonFootprint.innerHTML += `${totalPersonEmission}` + ` kg CO₂`
yourCarbonFootprintEnergy.innerHTML += `${energyEmissionPerPerson}` + ` kg CO₂`
yourCarbonFootprintTransportation.innerHTML += `${transportationEmissionPerPerson}` + ` kg CO₂`
yourCarbonFootprintWaste.innerHTML += `${wasteEmissionPerPerson}` + ` kg CO₂`
yourCarbonFootprintWater.innerHTML += `${waterEmissionPerPerson}` + ` kg CO₂`
yourCarbonFootprintFood.innerHTML += `${foodEmissionPerPerson}` + ` kg CO₂`
yourHouseholdCarbonFootprint.innerHTML = `${totalHouseholdEmission}` + ` kg CO₂`
yourHouseholdCarbonFootprintEnergy.innerHTML += `${energyEmission}` + ` kg CO₂`
yourHouseholdCarbonFootprintTransportation.innerHTML += `${transportationEmission}` + ` kg CO₂`
yourHouseholdCarbonFootprintWaste.innerHTML += `${wasteEmission}` + ` kg CO₂`
yourHouseholdCarbonFootprintWater.innerHTML += `${waterEmission}` + ` kg CO₂`
yourHouseholdCarbonFootprintFood.innerHTML += `${foodEmission}` + ` kg CO₂`

// Pie Chart
google.charts.load('current', {'packages':['corechart']})
                        google.charts.setOnLoadCallback(drawChart)

                        function drawChart() {
                
                        var data = google.visualization.arrayToDataTable([
                            ['Factor', 'Carbon Footrpint Count'],
                            ['Energy Use', energyEmission],
                            ['Transportation', transportationEmission],
                            ['Waste Management', wasteEmission],
                            ['Water Usage', waterEmission],
                            ['Food', foodEmission],
                        ])
                
                        var options = {
                            is3D: true, // 3D version
                            tooltip: {
                                trigger: 'selection',
                            },
                            'width': 740,
                                'height': 400,
                                'backgroundColor': 'transparent',  // Transparent background
                                'chartArea': {
                                    'width': '100%',
                                    'height': '100%',
                                    'backgroundColor': 'transparent'  // Transparent chart area
                                },
                            'pieSliceText': 'percentage',  // Display percentage on pie slices
                            'slices': {
                                        // 0: { 'offset': 0.1, 'color': '#B6B9B9' },  // Grey Color of the slices
                                        // 1: { 'color': '#A9A9A9' },
                                        // 2: { 'color': '#808080' },
                                        // 3: { 'color': '#606060' },
                                        // 4: { 'color': '#404040' },
                                        // 5: { 'color': '#2F2F2F' }, 
                                        // 6: { 'color': '#1F1F1F' } 
                                        // 0: { 'offset': 0.1, 'color': '#A3D1A1' },  // Green Color of the slices
                                        0: { 'color': '#82B89E' },  // Green Color of the slices
                                        1: { 'color': '#A2C46E' },
                                        2: { 'color': '#B0D65B' },
                                        3: { 'color': '#40916C' },
                                        4: { 'color': '#2D6A4F' },
                                        5: { 'color': '#1B4332' }, 
                                        // Additional Slices as needed
                            },
                            'legend': {
                                position: 'right',
                                alignment: 'center',
                                textStyle: {
                                    color: 'white',
                                    fontSize: 22,
                                    // bold: true,
                                    fontName: 'Quicksand'
                                }
                            },
                            pieSliceTextStyle: {
                                color: 'white',
                                fontName: 'Quicksand',
                                fontSize: 15
                            }
                        }
                
                        var chart = new google.visualization.PieChart(document.getElementById('piechart'))
                
                        chart.draw(data, options)
                        }