document.addEventListener("DOMContentLoaded", function() {
   // Select all relevant elements
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

   // Validation function
   function validateInput() {
      let isValid = true;
      let isUsernameValid = usernameValidator(username);
      let isNameValid = nameValidator(firstName, lastName);
      let isEmailValid = emailValidator(email);
      let isPasswordValid = passwordValidator(password1, password2);
      if (isUsernameValid && isNameValid && isEmailValid && isPasswordValid) {
         submitButton.classList.remove("disabled");
      }

      // Enable or disable the submit button based on form validity
      submitButton.disabled = !isValid;
   }

   // Event listeners for real-time validation
   [username, email, firstName, lastName, password1, password2].forEach(input => {
      input.addEventListener("input", validateInput);
      input.addEventListener("blur", validateInput);
   });

   // Initial validation check
   validateInput();

   function usernameValidator(username) {
      return checkIfBlank(username, usernameError);
   }

   function nameValidator(firstName, lastName) {
      return [checkIfBlank(firstName, firstNameError), checkIfBlank(lastName, lastNameError)];
   }

   function emailValidator(email) {
      let isValid = checkIfBlank(email, emailError);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
         emailError.textContent += "Nem megfelelő email cím formátum. [example@example.com]";
      } else {
         emailError.textContent = "";
      }
   }

   function passwordValidator(password1, password2) {
      let isValid = checkIfBlank(password1, passwordError);
   }

   function checkIfBlank(inputField, errorField) {
      if (inputField.value.trim() === "") {
         errorField.textContent = "Kérjük, töltse ki ezt a mezőt.";
         return false;
      } else {
         errorField.textContent = "";
      }
      return true;
   }
});
