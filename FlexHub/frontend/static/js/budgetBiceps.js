document.addEventListener("DOMContentLoaded", () => {
   const selectedCity = document.querySelector("#city-select");
   const selectedPrice = document.querySelector("#price-select");
   const cityOptionText = document.querySelector("#city-option-text");
   const priceOptionText = document.querySelector("#price-option-text");
   const gymDataContainer = document.querySelectorAll(".gym-data");
   const gymsAddresses = document.querySelectorAll(".gym-adress");
   const gymsPrices = document.querySelectorAll(".gym-price");
   
   document.querySelector("#filter-btn").addEventListener("click", () => {
      const gymData = convertGymDataToDict();
      if (selectedCity.value !== cityOptionText.textContent && selectedPrice.value !== priceOptionText.textContent) {
         const filteredDataByCity = filteredDataByCity(gymData);
         showFilteredData(filteredDataByPrice(filteredDataByCity))
      } else if (selectedCity.value !== cityOptionText.textContent) {
         showFilteredData(filteredDataByCity(gymData));
      } else {
         showFilteredData(filteredDataByPrice(gymData));
      }
   });
   
   function convertGymDataToDict() {
      const gymData = [];
      for (let i = 0; i < gymsAddresses.length; i++) {
         gymData.push(
            {
               id: gymsAddresses[i].parentElement.parentElement.parentElement.id,
               address: gymsAddresses[i].textContent.split(" ")[0],
               price: gymsPrices[i].textContent
            }
         )
      }
      return gymData;
   }

   function filteredDataByCity(gymData) {
      const filteredGymDataByCity = [];
      gymData.forEach(gym => {
         if (gym.address === selectedCity.value) {
            filteredGymDataByCity.push(gym);
         }         
      });
      return filteredGymDataByCity;
   }

   function filteredDataByPrice(gymData) {
      const filteredGymDataByPrice = [];
      gymData.forEach(gym => {
         if (gym.price === selectedPrice.value) {
            filteredGymDataByPrice.push(gym);
         }         
      });
      return filteredGymDataByPrice;
   }

   function showFilteredData(filteredData) {
      for (let i = 0; i < filteredData.length; i++) {
         for (let j = 0; j < gymsAddresses.length; j++) {
            if (filteredData[i].id !== gymsAddresses[j].parentElement.parentElement.parentElement.id && filteredData[i].address !== gymsAddresses[j].textContent.split(" ")[0]) {
               gymsAddresses[j].parentElement.parentElement.parentElement.classList.add("d-none");
            } else {
               gymsAddresses[j].parentElement.parentElement.parentElement.classList.remove("d-none");
            }
         }
      }
   }
});