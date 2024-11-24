const API_KEY = "cd57a1db-1799-42d2-b3f2-32a165556066"

const URL_API = "http://146.59.242.125:3009"

let titleContainer = document.getElementById("titleContainer")

let FirstDateContainer = document.getElementById("FirstDateContainer")

let LastDateContainer = document.getElementById("LastDateContainer")

let promotionContainer = document.getElementById("promotionContainer")

let submitButtonTwo = document.querySelector("#submitButtonTwo")

let submitModify = document.querySelector("#submitModify")

let firstNameContainer = document.getElementById("firstNameContainer")

let lastNameContainer = document.getElementById("lastNameContainer")

let ageContainer = document.getElementById("ageContainer")

let avatarContainer = document.getElementById("avatarContainer")

let newStudentContainer = document.getElementById("newStudentContainer")

const currentUrl = window.location.href;

const url = new URL(currentUrl);

const id = url.searchParams.get("id");

console.log(id);


async function GETPromo() {
    const response = await fetch(URL_API + "/promos/" + id, {
        method: "GET",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
    })
    const data = await response.json()
    console.log(data);

    return data
}


async function DISPLAYpromo() {
    const promo = await GETPromo()
    titleContainer.value = promo.name
    FirstDateContainer.value = new Date(promo.startDate).toLocaleDateString("fr").split("T")[0];
    LastDateContainer.value = new Date(promo.endDate).toLocaleDateString("fr").split("T")[0];
    const students = promo.students
    createStudent(students)

}

DISPLAYpromo()


async function addPromo() {
    const promodata = {
        name: document.querySelector("#titleContainer").value,
        startDate: document.querySelector("#FirstDateContainer").value,
        endDate: document.querySelector("#LastDateContainer").value,
    }
    const response = await fetch(URL_API + "/promos/", {
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


async function addStudent() {
    const studentdata = {

        firstName: document.querySelector("#firstNameContainer").value,
        lastName: document.querySelector("#lastNameContainer").value,
        age: document.querySelector("#ageContainer").value,
        avatar: document.querySelector("#avatarContainer").value,

    }
    const response = await fetch(URL_API + "/promos/" + id + "/students", {
        method: "POST",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(studentdata)
    })
    const data = await response.json()
    console.log(data);
}


StudentContainer.addEventListener("submit", (e) => {
    e.preventDefault()
    addStudent()
}
)


function createStudent(data) {
    let newStudentContainer = document.getElementById("newStudentContainer");
    newStudentContainer.innerHTML = "";



    data.forEach(element => {
        let studDiv = document.createElement("article");
        studDiv.className = "student-item";
        let firstnameDiv = document.createElement("h3");
        let lastnameDiv = document.createElement("p");
        let ageDiv = document.createElement("p");
        let resetButton = document.createElement("button");
        resetButton.textContent = "Supprimer";



        firstnameDiv.textContent = element.firstName
        newStudentContainer.appendChild(firstnameDiv)

        lastnameDiv.textContent = element.lastName
        newStudentContainer.appendChild(lastnameDiv)

        ageDiv.textContent = element.age
        newStudentContainer.appendChild(ageDiv)

        studDiv.appendChild(firstnameDiv);
        studDiv.appendChild(lastnameDiv);
        studDiv.appendChild(ageDiv);
        newStudentContainer.appendChild(studDiv);

        studDiv.appendChild(resetButton)

        let modifyButton = document.createElement("button");
        modifyButton.textContent = "Modifier";
        studDiv.appendChild(modifyButton)
        modifyButton.addEventListener("click", () => {
            submitButtonTwo.classList.add("hidden")
            submitModify.classList.remove("hidden")
            modifyStudent(element)
            putStudent(element)
        })
        resetButton.addEventListener("click", () => {
            deleteStudent(element._id, data._id);
            studDiv.remove();
        }

        );
    });
}


submitModify.addEventListener("click", (e) => {
    e.preventDefault();
    const studentId = document.querySelector("#firstNameContainer").dataset.studentId;
    putStudent(studentId);
    submitModify.classList.add("hidden");
    submitButtonTwo.classList.remove("hidden");
});

function modifyStudent(stud) {
    StudentContainer.classList.remove("hidden");
    StudentContainer.querySelector('#firstNameContainer').value = stud.firstName;
    StudentContainer.querySelector('#lastNameContainer').value = stud.lastName;
    StudentContainer.querySelector('#ageContainer').value = stud.age;
    StudentContainer.querySelector('#avatarContainer').value = stud.avatar;
    StudentContainer.querySelector('#firstNameContainer').dataset.studentId = stud._id;
}


async function deleteStudent(studentid) {
    const response = await fetch(URL_API + "/promos/" + id + "/students/" + studentid, {
        method: "DELETE",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
    });

    const data = await response.json();
    console.log(data);
}


async function putStudent(studentId) {
    const studentdata = {
        firstName: document.querySelector("#firstNameContainer").value,
        lastName: document.querySelector("#lastNameContainer").value,
        age: document.querySelector("#ageContainer").value,
        avatar: document.querySelector("#avatarContainer").value,
    };

    const response = await fetch(URL_API + "/promos/" + id + "/students/" + studentId, {
        method: "PUT",
        headers: {
            authorization: "Bearer " + API_KEY,
            "Content-type": "Application/json"
        },
        body: JSON.stringify(studentdata)
    });

    const data = await response.json();
    console.log(data);
}


GETPromo();

