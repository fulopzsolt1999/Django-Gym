async function fetchAllData() {
   const response = await fetch("http://127.0.0.1:8000/getSerializedGym&CityData");
   const result = await response.json();
   return result.map(gym => ({
      id: gym.id,
      name: gym.name,
      address: gym.address.city_name.name + ", " + gym.address.street + " " + gym.address.street_number,
      price_group: gym.price_group,
      url: gym.url            
   }));
}

document.addEventListener("DOMContentLoaded", async () => {
   const allGymData = await fetchAllData();
   const searchField = document.querySelector("#text-search");
   const priceFilter = document.querySelector("#price-filter");
   const allGymDataIds = allGymData.map(gym => gym.id);
   
   searchField.addEventListener("input", () => {
      const searchTerm = searchField.value.toLowerCase();
      let showGymIds = [];
      if (searchTerm === "") {
         showFilteredData(showGymIds=allGymDataIds, allGymDataIds);
      } else {
         showGymIds = allGymData.map(gym => {
            if (gym.name.toLowerCase().includes(searchTerm) || gym.address.split(",")[0].toLowerCase().includes(searchTerm)) {
               return gym.id;
            }
         }).filter(id => id !== undefined);      
      }
      showFilteredData(showGymIds, allGymDataIds);
   });
});

function showFilteredData(showGymIds, allGymDataIds) {
   if (showGymIds.length > 0) {
      for (let gymId of allGymDataIds) {
         if (showGymIds.includes(gymId)) {
            if (document.querySelector(`#id-${gymId}`).classList.contains("d-none")) {
               document.querySelector(`#id-${gymId}`).classList.remove("d-none");
            }
         } else {
            if (!document.querySelector(`#id-${gymId}`).classList.contains("d-none")) {
               document.querySelector(`#id-${gymId}`).classList.add("d-none");
            }
         }
      }
   } else {
      for (let gymId of allGymDataIds) {
         if (!document.querySelector(`#id-${gymId}`).classList.contains("d-none")) {
            document.querySelector(`#id-${gymId}`).classList.add("d-none");
         }
      }
   }
}