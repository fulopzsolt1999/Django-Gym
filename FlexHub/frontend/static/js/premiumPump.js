document.addEventListener("DOMContentLoaded", () => {
   document.querySelectorAll('.exercise-image').forEach(image => {
      image.addEventListener('mouseenter', () => {
         image.querySelector('.bubble').style.display = 'block';
      });
      image.addEventListener('mouseleave', () => {
         image.querySelector('.bubble').style.display = 'none';
      });
   });

   const checkboxes = document.querySelectorAll('.is-rest-day');
   checkboxes.forEach(checkbox => {
      CheckIfChecked(checkbox);

      checkbox.addEventListener('change', () => {
         const username = document.querySelector("#profile-username").textContent.replace(/\s|\!/g, '').split(",")[1];
         const day = checkbox.value;
         const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

         const request = new Request(
            `http://127.0.0.1:8000/setRestDay/`,
            {headers: {'X-CSRFToken': csrftoken}}
         );
         
         fetch(request, {
            method: "POST",
            body: JSON.stringify({
               username: username,
               day: day})
         }).then(() => {
            CheckIfChecked(checkbox);
         });
      });
   });

   function CheckIfChecked(checkbox) {
      const workoutPlanTable = document.querySelector(`#table-${checkbox.value}`);
      const modifyWorkoutPlan = document.querySelector(`#btn-${checkbox.value}`);
      if (checkbox.checked) {
         workoutPlanTable.setAttribute('hidden', true);
         modifyWorkoutPlan.setAttribute('hidden', true);
      } else {
         workoutPlanTable.removeAttribute('hidden');
         modifyWorkoutPlan.removeAttribute('hidden');
      }
   }
});

