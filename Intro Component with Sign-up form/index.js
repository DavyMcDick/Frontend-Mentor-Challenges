const validateEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.text(email);
};

const handleSubmit = function (e) {
    e.preventDefault();
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const firstnameError = document.getElementById("firstname-error");
    const lastnameError = document.getElementById("lastname-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    const errorIconFirstname = document.querySelector("errorIcon-firstname");
    const errorIconLastname = document.querySelector("errorIcon-lastname");
    const errorIconEmail = document.querySelector("errorIcon-email");
    const errorIconPassword = document.querySelector("errorIcon-password");

    let hasError = false;

    if (firstname.value === "") {
        firstnameError.textContent = "Firstname cannot be empty";
        errorIconFirstname.classList.remove("hidden");
        hasError = true;
    } else {
        firstnameError.textContent = "";
        errorIconFirstname.classList.add("hidden");
    }

    if (lastname.value === "") {
        lastnameError.textContent = "Lastname cannot be empty";
        errorIconLastname.classList.remove("hidden");
        hasError = true;
    } else {
        lastnameError.textContent = "";
        errorIconLastname.classList.add("hidden");
    }

    if(!validateEmail(email.value)) {
        emailError.textContent = "Lokks like this is not an email";
        errorIconEmail.classList.remove("hidden");
        hasError = true;
    } else {
        emailError.textContent = "";
        errorIconEmail.classList.add("hidden");
        alert("Email is valid");
    }

    if (password.value === "") {
        passwordError.textContent = "Password cannot be empty";
        errorIconPassword.classList.remove("hidden");
        hasError = true;
    } else {
        passwordError.textContent = "";
        errorIconPassword.classList.add("hidden");
    }

    if(hasError) {
        return;
    }
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);