document.addEventListener("DOMContentLoaded", () => {
   const inputFields = document.querySelectorAll("input");
   inputFields.forEach(inputField => {
      inputField.setAttribute("class", "form-control");
   });
});