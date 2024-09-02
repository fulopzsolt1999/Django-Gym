document.addEventListener("DOMContentLoaded", function () {
   const logout = document.getElementById("logout");
   if (logout !== null) {
      logout.addEventListener("click", function () {
         window.alert("Sikeres kijelentkezés!");
      });
   }
})

