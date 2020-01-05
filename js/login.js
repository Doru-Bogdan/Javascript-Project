let genders = ["Male", "Female", "Prefer not to say"];
let dificulties = ["Choose...", "Easy", "Medium", "Hard"];

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Displaying input for email
let email = document.createElement("input");
email.classList.add("form-control");
email.type = "email";
email.id = "emailSignUp";
insertAfter(email, document.getElementById("email"));

// Displaying input for password
let password = document.createElement("input");
password.classList.add("form-control");
password.type = "password";
password.id = "passwordSignUp";
insertAfter(password, document.getElementById("password"));

// Displaying input for the radio buttons
for (let index = genders.length - 1; index >= 0; index--) {
    let radio = document.createElement("input");
    radio.type = "radio";
    if (index === 0)
        radio.checked = true;
    radio.value = genders[index];
    radio.name = "exampleRadios";
    radio.classList.add("form-check-input");
    radio.tagName = "radioButton";

    let label = document.createElement("label");
    label.classList.add("form-check-label");
    label.innerHTML = genders[index];

    let div = document.createElement("div");
    div.classList.add("form-check");
    div.append(radio);
    div.append(label);
    insertAfter(div, document.getElementById("startRadio"));
}

// Displaying input for the option menu
let select = document.createElement("select");
select.id = "inputState";
select.classList.add("form-control");

for (let index = 0; index < dificulties.length; index++) {
    let option = document.createElement("option");
    option.innerHTML = dificulties[index];
    if (index === 0)
        option.selected = true;
    select.appendChild(option)
}
insertAfter(select, document.getElementById("optionMenu"));

// Displaying input for the check box
let checkBox = document.createElement("input");
checkBox.classList.add("form-check-input");
checkBox.type = "checkbox";
checkBox.id = "gridCheck";
checkBox.checked = false;
document.getElementById("checkBox").insertBefore(checkBox, document.getElementById("checkBox").childNodes[0]);


// Signup verification

let responses = null;
$.get("https://jsonplaceholder.typicode.com/users")
    .done(function(response) {
        console.log( "s-a terminat cu bine",response);
        responses = response;
    })
    .fail(function(error) {
        console.log( "error",error);
    })
    .always(function() {
        console.log( "Cod-ul din .always se apeleaza de fiecare data, indiferent daca request-ul a fost cu success sau cu fail" );
    });



// Log in function
let button = document.getElementById("logInButton");
button.addEventListener("click", function () {
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    let difficulty = document.getElementById("inputState").value;

    let validation = false;
    responses.forEach(function (user) {
        if (user.email === email && user.username === password) {
            validation = true;
        }
    });
    if (validation === true) {
        event.preventDefault();
        localStorage.setItem("difficulty", difficulty);
        window.location.href = "snakegame.html";
    } else {
        alert("User doesn't exist!");
    }
});

// Sign in function
let isEmailOk = false;
let isPassOk = false;

let writeEmail = document.getElementById("emailSignUp");
writeEmail.onkeyup = function () {
    let email = writeEmail.value;
    let validation = false;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    responses.forEach(function (user) {
        if (user.email === email) {
            validation = true;
        }
    });

    if (email !== null && !validation && reg.test(email) === true) {
        writeEmail.style.borderColor = "green";
        writeEmail.style.borderWidth = "2px";
        isEmailOk = true;
    } else {
        writeEmail.style.borderColor = "red";
        writeEmail.style.borderWidth = "2px";
    }
};

let writePass = document.getElementById("passwordSignUp");
writePass.onkeyup = function () {
    let pass = writePass.value;

    if (pass !== null && pass.length > 6) {
        writePass.style.borderColor = "green";
        writePass.style.borderWidth = "2px";
        isPassOk = true;
    } else {
        writePass.style.borderColor = "red";
        writePass.style.borderWidth = "2px";
    }
};

document.getElementById("signInButton").onclick = function () {
    let email = document.getElementById("emailSignUp").value;
    let pass = document.getElementById("passwordSignUp").value;
    let nickname = document.getElementById("inputAddress").value;
    let gender = document.querySelector('input[name="exampleRadios"]:checked').value;
    let checkBox1 = document.getElementById("gridCheck").checked;
    let newUser = {
        email:email,
        pass:pass,
        nickname:nickname,
        gender:gender,
    };

    if (checkBox1) {
        let usersArr = JSON.parse(localStorage.getItem("users"));
        if (typeof usersArr === 'undefined' || usersArr === null) {
            usersArr = [];
            localStorage.setItem("users", JSON.stringify(usersArr));
        }

        usersArr.push(newUser);
        localStorage.removeItem("users");
        localStorage.setItem("users", usersArr);
    }
    if (!isEmailOk || !isPassOk)
        alert("Email or password wrong!");
    else alert("New user created!");
};