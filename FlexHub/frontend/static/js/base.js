document.addEventListener("DOMContentLoaded", () => {
   const logout = document.getElementById("logout");
   const flagHU = document.getElementById("flag-hu");
   const flagEN = document.getElementById("flag-en");

   if (logout !== null) {
      logout.addEventListener("click", () => {
         window.alert("Sikeres kijelentkezés!");
      });
   }

   flagEN.addEventListener("click", () => {
      if (!flagEN.classList.contains("active")) {
         flagEN.classList.add("active");
      }
      flagHU.classList.remove("active");
   });
   flagHU.addEventListener("click", () => {
      if (!flagHU.classList.contains("active")) {
         flagHU.classList.add("active");
      }
      flagEN.classList.remove("active");
   });
})

