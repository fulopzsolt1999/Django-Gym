document.addEventListener("DOMContentLoaded", () => {
   const form = document.querySelector("form");
   const formDivElements = form.querySelectorAll("div");
   const inputElements = form.querySelectorAll("div input");
   const pw1HelpTextDiv = document.querySelector("#id-password1-helptext")
   const pw2HelpTextDiv = document.querySelector("#id-password2-helptext")
   formDivElements.forEach(div => {
      if (!div.classList.contains("helptext")) {
         console.log(div);
         
      }
      div.setAttribute("class", "form-group");
   });
});