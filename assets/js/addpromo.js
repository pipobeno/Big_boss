let titleContainer = document.getElementById("titleContainer")

let FirstDateContainer = document.getElementById("FirstDateContainer")

let LastDateContainer = document.getElementById("LastDateContainer")

let promotionContainer = document.getElementById("promotionContainer")

let submitButton = document.querySelector("#submitButton")

let resetButton = document.querySelector("#resetButton")

let StudentContainer = document.getElementById("StudentContainer")

const API_KEY = "cd57a1db-1799-42d2-b3f2-32a165556066"

const URL_API = "http://146.59.242.125:3009"



async function addPromo() {
    const promodata = {
        name: document.querySelector("#titleContainer").value,
        startDate: document.querySelector("#FirstDateContainer").value,
        endDate: document.querySelector("#LastDateContainer").value,
    }
    const response = await fetch(URL_API + "/promos", {
        method: "POST",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(promodata)
    })
    const data = await response.json()
    console.log(data);
}

addPromo()

promotionContainer.addEventListener("submit", (e) => {
    e.preventDefault()
    addPromo()
}
)