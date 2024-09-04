document.addEventListener("DOMContentLoaded", () => {
   const selectedCity = document.querySelector("#city-select");
   const selectedPrice = document.querySelector("#price-select");
   
   
   selectedCity.addEventListener("change", (e) => {
      const activeCityOption = document.querySelector(".active-city");
      if (activeCityOption !== null){
         if (activeCityOption.value !== e.target.value && activeCityOption.classList.contains("active-city")) {
            activeCityOption.classList.remove("active-city");
         }
      }
      document.getElementById(selectedCity.value).classList.add("active-city");
      showFilterdGyms();
   });

   selectedPrice.addEventListener("change", (e) => {
      const activePriceOption = document.querySelector(".active-price");
      if (activePriceOption !== null){
         if (activePriceOption.value !== e.target.value && activePriceOption.classList.contains("active-price")) {
            activePriceOption.classList.remove("active-price");
         }
      }
      document.getElementById(selectedPrice.value).classList.add("active-price");
      showFilterdGyms();
   });

   function showFilterdGyms() {
      const selectedCity = document.querySelector(".active-city");
      const selectedPrice = document.querySelector(".active-price");
      const gymAddresses = document.querySelectorAll(".gym-adress");
      const gymPrices = document.querySelectorAll(".gym-price");
      
      for (const city of gymAddresses) {
         if (selectedCity !== null && selectedCity.value === city.textContent.split(" ")[0]) {
            city.parentElement.parentElement.parentElement.classList.remove("d-none");
         } else {
            city.parentElement.parentElement.parentElement.classList.add("d-none");
         }
      }
      
      /* const gymAdressesAndPrices = [[document.querySelectorAll(".gym-adress")], [document.querySelectorAll(".gym-price")]];
      const selectedCity = document.querySelector(".active-city");
      const selectedPrice = document.querySelector(".active-price");
      
      for (let i = 0; i < gymAdressesAndPrices.length; i++) {
         if (gymAdressesAndPrices[i][0].value === selectedCity.value && gymAdressesAndPrices[i][1].value === selectedPrice.value) {
            
         }
      }; */
   }
});