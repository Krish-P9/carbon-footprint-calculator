// const electricityInpt = document.getElementById("electricity-inpt")
// const heatingMthdInpt = document.getElementById("heating-mthd-inpt")
// const heatingAmntInpt = document.getElementById("heating-amnt-inpt")
// const electricityRenewableInpt = document.getElementById("electricity-renewable-inpt")
const nextSaveBtn = document.getElementById("next-save-btn")
const backSaveBtn = document.getElementById("back-save-btn")
let formData = {}

if (JSON.parse(localStorage.getItem("calculatorData"))) {
    formData = JSON.parse(localStorage.getItem("calculatorData"))
}

function saveInputsOrderedAsDict() {
    inputData = {}
    const inputs = document.querySelectorAll(".inputs")

    inputs.forEach((input, index) => {
        const key = `input${index + 1}`
        inputData[key] = input.value
    })

    return inputData
}

function saveData(page) {
    const pageData = saveInputsOrderedAsDict()
    formData[page] = pageData
    localStorage.setItem("calculatorData", JSON.stringify(formData))
}

function loadData(page) {
    if (formData || formData[page]) {
        const pageData = formData[page]
        const inputs = document.querySelectorAll(".inputs")

        inputs.forEach((input, index) => {
            const key = `input${index + 1}`
            if (pageData[key]) {
                input.value = pageData[key]
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = document.body.id
    loadData(currentPage)
})

if (nextSaveBtn) {
    nextSaveBtn.addEventListener("click", function() {
        const page = document.body.id
        saveData(page)
    })
}

if (backSaveBtn) {
    backSaveBtn.addEventListener("click", function() {
        const page = document.body.id
        saveData(page)
    })
}