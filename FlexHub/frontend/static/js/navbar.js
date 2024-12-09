document.addEventListener("DOMContentLoaded", () => {
   const profileDropdown = document.querySelector("#profile-dropdown");
   const windowWidth = window.innerWidth;   
   if (profileDropdown && windowWidth < 992) {
      console.log("removed1");
      ProfileButtonActions();
   }
   window.addEventListener("resize", () => {
      if (profileDropdown && windowWidth < 992) {
         console.log("removed2");
         ProfileButtonActions();
      }
   });
   
   function ProfileButtonActions() {
      const collapseDiv = document.querySelector(".collapse");
      console.log("removed3");
      collapseDiv.lastChild.remove();
      
      // TODO: ezt másik function-ben kell majd megoldani!!!
   
      /* const navMenu = document.querySelector(".navbar-nav");
      const ul = document.createElement("ul");
      const profileLi = document.createElement("li");
      const a = document.createElement("a");
      const div = document.createElement("div");
      const button = document.createElement("button");
   
      button.setAttribute("class", "btn btn-secondary dropdown-toggle");
      button.setAttribute("type", "button");
      button.setAttribute("data-bs-toggle", "dropdown");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("id", "profile-dropdown-button");
   
      div.textContent = "Profil";
      div.setAttribute("class", "btn-group dropend");
      div.appendChild(button);
   
      a.setAttribute("class", "nav-link");
      a.appendChild(div);
   
      profileLi.setAttribute("class", "nav-item");
      profileLi.appendChild(a);
   
      navMenu.appendChild(profileLi); */
   }
});

