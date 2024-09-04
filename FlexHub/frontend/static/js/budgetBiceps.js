document.addEventListener("DOMContentLoaded", () => {
   const selectedCity = document.getElementById("city-select");
   const selectedPrice = document.getElementById("price-select");
   
   selectedCity.addEventListener("change", (e) => {
      const activeCityOption = document.querySelector(".active-city");
      if (activeCityOption !== null){
         if (activeCityOption.value !== e.target.value && activeCityOption.classList.contains("active-city")) {
            activeCityOption.classList.remove("active-city");
         }
      }
      document.getElementById(selectedCity.value).classList.add("active-city");
   });

   selectedPrice.addEventListener("change", (e) => {
      const activePriceOption = document.querySelector(".active-price");
      if (activePriceOption !== null){
         if (activePriceOption.value !== e.target.value && activePriceOption.classList.contains("active-price")) {
            activePriceOption.classList.remove("active-price");
         }
      }
      document.getElementById(selectedPrice.value).classList.add("active-price");
   });
});