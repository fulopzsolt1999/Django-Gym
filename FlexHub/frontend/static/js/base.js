document.addEventListener("DOMContentLoaded", () => {
   const logout = document.getElementById("logout");

   if (logout !== null) {
      logout.addEventListener("click", () => {
         window.alert("Sikeres kijelentkezés!");
      });
   }
})

