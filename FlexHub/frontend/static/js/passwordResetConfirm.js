// Input fields
const password1 = document.getElementById("id_password1");
const password2 = document.getElementById("id_password2");
const submitButton = document.querySelector("button[type='submit']");

// Error container
const passwordError = document.getElementById("id_password_error");

// Variable for validated input field
let passwordValid = false;

// Event listener for real-time validation
password1.addEventListener("input", () => {
   const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,16}$/;
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
         passwordError.textContent = "Minimum 8 karakter. Formátum: [hP@dg072]";
         password1.style.border = "2px solid red";
      } else if (commonPasswords.includes(password1.value.toLowerCase())) {
         passwordError.textContent = "Túl egyszerű a jelszó.";
      } else if (password1.value !== password2.value) {
         passwordError.textContent = "Nem egyeznek a jelszavak.";
         password1.style.border = "2px solid red";
         password2.style.border = "2px solid red";
      } else {
         passwordError.textContent = "";
         password1.style.border = "2px solid green";
         password2.style.border = "2px solid green";
         passwordValid = true;
      }
   }
});

document.addEventListener("keyup", () => {
   if (passwordValid) {
      submitButton.classList.remove("disabled");
   } else {
      submitButton.classList.add("disabled");
   }
});

// Successed registration feedback
submitButton.addEventListener("click", () => {
   window.alert("Sikeres jelszó változtatás!");
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

// Prevent enter key pressing
jQuery("form").bind("keypress keydown keyup", function (e) {
   if (e.keyCode == 13) {
      e.preventDefault();
   }
});