// Input fields
const username = document.getElementById("id_username");
const email = document.getElementById("id_email");
const firstName = document.getElementById("id_first_name");
const lastName = document.getElementById("id_last_name");
const password1 = document.getElementById("id_password1");
const password2 = document.getElementById("id_password2");
const submitButton = document.querySelector("button[type='submit']");

// Error containers
const usernameError = document.getElementById("id_username_error");
const emailError = document.getElementById("id_email_error");
const firstNameError = document.getElementById("id_first_name_error");
const lastNameError = document.getElementById("id_last_name_error");
const passwordError = document.getElementById("id_password_error");

// Variables for validated input fields
let usernameValid = false;
let emailValid = false;
let firstNameValid = false;
let lastNameValid = false;
let passwordValid = false;

// Event listeners for real-time validation
username.addEventListener("input", () => {
   const usernamePattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,150}$/;
   if (!checkIfBlank(username, usernameError) && !usernamePattern.test(username.value)) {
      usernameError.textContent =
         "Nem megfelelő felhasználónév formátum. (min. 8 karakter) [a-z,A-Z,0-9,@.+-_]";
      username.style.border = "2px solid red";
   } else {
      usernameError.textContent = "";
      username.style.border = "2px solid green";
      usernameValid = true;
   }
});

email.addEventListener("input", () => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!checkIfBlank(email, emailError) && !emailPattern.test(email.value)) {
      emailError.textContent = "Nem megfelelő email cím formátum. [example@example.com]";
      email.style.border = "2px solid red";
   } else {
      emailError.textContent = "";
      email.style.border = "2px solid green";
      emailValid = true;
   }
});

firstName.addEventListener("input", () => {
   firstOrLastNameChecking(firstName, firstNameError);
});

lastName.addEventListener("input", () => {
   firstOrLastNameChecking(lastName, lastNameError);
});

password1.addEventListener("input", () => {
   const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,16}$/;
   const usernameSimilarity = username.value.replace(/[^a-zA-Z]/g, "");
   const commonPasswords = [
      "123456",
      "password",
      "123456789",
      "12345678",
      "12345",
      "1234567",
      "admin",
      "123123",
      "qwerty",
      "abc123",
      "letmein",
      "monkey",
      "111111",
      "password1",
      "qwerty123",
      "dragon",
      "1234",
      "baseball",
      "iloveyou",
      "trustno1",
      "sunshine",
      "princess",
      "football",
      "welcome",
      "shadow",
      "superman",
      "michael",
      "ninja",
      "mustang",
      "jessica",
      "charlie",
      "ashley",
      "bailey",
      "passw0rd",
      "master",
      "love",
      "hello",
      "freedom",
      "whatever",
      "nicole",
   ];
   if (!checkIfBlank(password1, passwordError)) {
      if (!passwordPattern.test(password1.value)) {
         passwordError.textContent = "Nem megfelelő jelszó formátum. [a-z,A-Z,0-9,?!.:-/*]";
         password1.style.border = "2px solid red";
      } else if (
         password1.value
            .toLowerCase()
            .includes(
               usernameSimilarity.toLowerCase() |
                  firstName.value.toLowerCase() |
                  lastName.value.toLowerCase()
            )
      ) {
         passwordError.textContent =
            "Nem lehet hasonló a jelszó mint a felhasználónév/nevet. [a-z,A-Z,0-9,?!%$&@*]";
      } else if (commonPasswords.includes(password1.value.toLowerCase())) {
         passwordError.textContent = "Nem lehet ilyen egyszerű a jelszó. [a-z,A-Z,0-9,?!.:-/*]";
      } else {
         passwordError.textContent = "Meg kell egyeznie a 2 mezőben a jelszónak.";
         password2.style.border = "2px solid red";
      }
   }
});

password2.addEventListener("input", () => {
   if (password1.value === password2.value) {
      passwordError.textContent = "";
      password1.style.border = "2px solid green";
      password2.style.border = "2px solid green";
      passwordValid = true;
   }
});

// Check if not empty
function checkIfBlank(inputField, errorField) {
   if (inputField.value.trim() === "") {
      errorField.textContent = "Kérjük, töltse ki ezt a mezőt.";
      inputField.style.border = "2px solid red";
      return true;
   } else {
      errorField.textContent = "";
   }
   return false;
}

// Check first and last name
function firstOrLastNameChecking(inputField, errorField) {
   const namePattern = /^[A-ZÁÉÚÓÓÜÖ][-,a-záéúőóüö. '].{1,}$/;
   if (!checkIfBlank(inputField, errorField) && !namePattern.test(inputField.value)) {
      errorField.textContent = "Nem megfelelő név formátum. [Minta]";
      inputField.style.border = "2px solid red";
   } else {
      errorField.textContent = "";
      inputField.style.border = "2px solid green";
      if (inputField === firstName) {
         firstNameValid = true;
      } else {
         lastNameValid = true;
      }
   }
}

document.addEventListener("keyup", () => {
   console.log("keyup");
   if (usernameValid && emailValid && firstNameValid && lastNameValid && passwordValid) {
      submitButton.classList.remove("disabled");
   } else {
      submitButton.classList.add("disabled");
   }
});
