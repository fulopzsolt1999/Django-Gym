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
  const priceFilterSelect = document.querySelector("#price-select");
  
  searchField.addEventListener("input", () => {
      applyFilters(allGymData);
  });

  priceFilterSelect.addEventListener("change", () => {
      applyFilters(allGymData);
  });

  applyFilters(allGymData);
});

function getPriceValue(priceGroup) {
  switch (priceGroup) {
      case "$":
          return 1;
      case "$$":
          return 2;
      case "$$$":
          return 3;
      case "$$$$":
          return 4;
      default:
          return 0;
  }
}

function applyFilters(allGymData) {
  const searchField = document.querySelector("#text-search");
  const priceFilterSelect = document.querySelector("#price-select");
  const gymsContainer = document.getElementById("gyms-container");

  const searchTerm = searchField.value.toLowerCase();
  const priceFilter = priceFilterSelect.value;

  let filteredGyms = allGymData;

  if (searchTerm !== "") {
      filteredGyms = filteredGyms.filter(gym =>
          gym.name.toLowerCase().includes(searchTerm) || 
          gym.address.split(",")[0].toLowerCase().includes(searchTerm)
      );
  }

  if (priceFilter === "increasing") {
      filteredGyms.sort((a, b) => getPriceValue(a.price_group) - getPriceValue(b.price_group));
  } else if (priceFilter === "decreasing") {
      filteredGyms.sort((a, b) => getPriceValue(b.price_group) - getPriceValue(a.price_group));
  }

  if (filteredGyms.length === 0) {
      gymsContainer.innerHTML = "";
      const noFoundGym = document.createElement("h3");
      gymsContainer.style.height = "fit-content";
      gymsContainer.classList.remove("m-auto");
      noFoundGym.textContent = "Nincs találat!";
      noFoundGym.classList.add("text-center", "mt-0");
      gymsContainer.append(noFoundGym);
  } else {
      if (!gymsContainer.classList.contains("m-auto")) {
          gymsContainer.classList.add("m-auto");
      }
      showFilteredData(filteredGyms);
  }
}

function showFilteredData(filteredGyms) {
  const gymsContainer = document.querySelector("#gyms-container");
  gymsContainer.innerHTML = "";

  gymsContainer.append(...filteredGyms.map(createGymsContainerContent));
}

function createGymsContainerContent(gym) {
  const gymContainerDiv = document.createElement("div");
  const gymDataDiv = document.createElement("div");
  const h3Tag = document.createElement("h3");

  const gymDataConfig = {
      addressP: { icon: "fa-solid fa-location-dot", spanText: gym.address },
      linkP: { icon: "fa-solid fa-link", aTagHref: gym.url, aTagTarget: "_blank", aTagText: "Weboldal link / Facebook link" },
      priceP: { icon: "fa-solid fa-link", spanText: "Árkategória:", gymPriceSpanClass: "gym-price", gymPriceSpanText: gym.price_group },
  };

  Object.keys(gymDataConfig).forEach((key) => {
      const config = gymDataConfig[key];
      const pTag = document.createElement("p");
      const spanTag = document.createElement("span");
      const iTag = document.createElement("i");

      iTag.classList.add(...config.icon.split(" "));

      if (config.spanClass) {
          spanTag.classList.add(config.spanClass);
      }

      spanTag.textContent = config.spanText;

      if (config.aTagHref) {
          const aTag = document.createElement("a");
          aTag.href = config.aTagHref;
          aTag.target = config.aTagTarget;
          aTag.textContent = config.aTagText;
          pTag.appendChild(iTag);
          pTag.appendChild(aTag);
      } else if (config.gymPriceSpanClass) {
          const gymPriceSpan = document.createElement("span");
          gymPriceSpan.classList.add(config.gymPriceSpanClass);
          gymPriceSpan.textContent = config.gymPriceSpanText;
          pTag.appendChild(iTag);
          pTag.appendChild(gymPriceSpan);
      } else {
          pTag.appendChild(iTag);
          pTag.appendChild(spanTag);
      }

      pTag.classList.add("m-0");
      gymDataDiv.appendChild(pTag);
  });

  h3Tag.classList.add("mx-2", "mt-2", "mb-0", "ps-2", "pb-1");
  h3Tag.textContent = gym.name;

  gymDataDiv.classList.add("m-auto", "w-fit-content");

  gymContainerDiv.classList.add("col-4", "p-2", "gym-data", `id-${gym.id}`);
  gymContainerDiv.appendChild(h3Tag);
  gymContainerDiv.appendChild(gymDataDiv);

  return gymContainerDiv;
}
