let newPromoContainer = document.getElementById("newPromoContainer")

let modifContainer = document.getElementById("modifContainer")


const API_KEY = "cd57a1db-1799-42d2-b3f2-32a165556066"

const URL_API = "http://146.59.242.125:3009"

modifContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    putPromo(modifContainer.querySelector('#idPromo').value)

})

async function GetPromo() {
    const response = await fetch(URL_API + "/promos", {
        method: "GET",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
    })
    const data = await response.json()
    console.log(data);
    createPromo(data)
}

GetPromo()

function createPromo(data) {
    let newPromoContainer = document.getElementById("newPromoContainer");
    newPromoContainer.innerHTML = "";



    data.forEach(element => {
        let promoDiv = document.createElement("article");
        promoDiv.className = "promo-item";
        let nameDiv = document.createElement("h3");
        let dateDebutDiv = document.createElement("p");
        let dateFindiv = document.createElement("p");
        let resetButton = document.createElement("button");
        resetButton.textContent = "Supprimer";
        let detailstud = document.createElement("a");
        detailstud.textContent = "Détails de la Promotion";



        nameDiv.textContent = element.name
        newPromoContainer.appendChild(nameDiv)

        dateDebutDiv.textContent = new Date(element.startDate).toISOString().split("T")[0];
        newPromoContainer.appendChild(dateDebutDiv)

        dateFindiv.textContent = new Date(element.endDate).toISOString().split("T")[0];
        newPromoContainer.appendChild(dateFindiv)

        promoDiv.appendChild(nameDiv);
        promoDiv.appendChild(dateDebutDiv);
        promoDiv.appendChild(dateFindiv);
        newPromoContainer.appendChild(promoDiv);

        promoDiv.appendChild(detailstud);

        detailstud.href = "/details.html?id=" + element._id;



        promoDiv.appendChild(resetButton)
        let modifyButton = document.createElement("button");
        modifyButton.textContent = "Modifier";
        promoDiv.appendChild(modifyButton)
        modifyButton.addEventListener("click", () => {
            modifyPromo(element)
        })
        resetButton.addEventListener("click", () => {
            deletePromo(element._id);
            promoDiv.remove();
        }

        );
    });
}



function modifyPromo(promo) {
    modifContainer.classList.remove("hidden")
    modifContainer.querySelector('#titleContainer').value = promo.name
    modifContainer.querySelector('#FirstDateContainer').value = new Date(promo.startDate).toISOString().split("T")[0];
    modifContainer.querySelector('#LastDateContainer').value = new Date(promo.endDate).toISOString().split("T")[0];
    modifContainer.querySelector('#idPromo').value = promo._id
}



async function deletePromo(id) {
    const response = await fetch(URL_API + "/promos/" + id, {
        method: "DELETE",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
    });

    const data = await response.json();
    console.log(data);
}

async function putPromo(id) {
    const promodata = {
        name: document.querySelector("#titleContainer").value,
        startDate: document.querySelector("#FirstDateContainer").value,
        endDate: document.querySelector("#LastDateContainer").value,
    }
    const response = await fetch(URL_API + "/promos/" + id, {
        method: "PUT",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(promodata)
    })
    const data = await response.json()
    console.log(data);
}



GetPromo();

