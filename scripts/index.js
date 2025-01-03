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

        if (input.type === 'checkbox') { // if checkbox input
            inputData[key] = input.checked
        } else { // if regular input 
            inputData[key] = input.value
        }
    })

    return inputData
}

function saveData(page) {
    const pageData = saveInputsOrderedAsDict()
    formData[page] = pageData
    localStorage.setItem("calculatorData", JSON.stringify(formData))
}

function loadData(page) {
    if (formData && formData[page]) {
        const pageData = formData[page]
        const inputs = document.querySelectorAll(".inputs")

        inputs.forEach((input, index) => {
            const key = `input${index + 1}`
            if (pageData[key]) {
                if (input.type === 'checkbox') { // if checkbox input
                    input.checked = pageData[key]
                } else {
                    input.value = pageData[key] // if regular input
                }
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