const validateEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Fixed regex
    return emailRegex.test(email); // Corrected method
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

    const errorIconFirstname = document.querySelector(".errorIcon-firstname");
    const errorIconLastname = document.querySelector(".errorIcon-lastname");
    const errorIconEmail = document.querySelector(".errorIcon-email");
    const errorIconPassword = document.querySelector(".errorIcon-password");

    let hasError = false;

    // Validate firstname
    if (firstname.value.trim() === "") {
        firstnameError.textContent = "Firstname cannot be empty";
        errorIconFirstname?.classList.remove("hidden");
        hasError = true;
    } else {
        firstnameError.textContent = "";
        errorIconFirstname?.classList.add("hidden");
    }

    // Validate lastname
    if (lastname.value.trim() === "") {
        lastnameError.textContent = "Lastname cannot be empty";
        errorIconLastname?.classList.remove("hidden");
        hasError = true;
    } else {
        lastnameError.textContent = "";
        errorIconLastname?.classList.add("hidden");
    }

    // Validate email
    if (!validateEmail(email.value.trim())) {
        emailError.textContent = "Looks like this is not an email";
        errorIconEmail?.classList.remove("hidden");
        hasError = true;
    } else {
        emailError.textContent = "";
        errorIconEmail?.classList.add("hidden");
    }

    // Validate password
    if (password.value.trim() === "") {
        passwordError.textContent = "Password cannot be empty";
        errorIconPassword?.classList.remove("hidden");
        hasError = true;
    } else {
        passwordError.textContent = "";
        errorIconPassword?.classList.add("hidden");
    }

    // If no errors, proceed
    if (!hasError) {
        alert("Form submitted successfully!");
    }
};

const forms = document.getElementById("form");
forms.addEventListener("submit", handleSubmit);
