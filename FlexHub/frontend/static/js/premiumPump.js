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
      checkbox.addEventListener('change', () => {
         const workoutPlanTable = document.querySelector(`#table-${checkbox.value}`);
         const modifyWorkoutPlan = document.querySelector(`#btn-${checkbox.value}`);
         if (checkbox.checked) {
            workoutPlanTable.setAttribute('hidden', true);
            modifyWorkoutPlan.setAttribute('hidden', true);
         } else {
            workoutPlanTable.removeAttribute('hidden');
            modifyWorkoutPlan.removeAttribute('hidden');
         }
      });
   })
});

const username = document.querySelector("#profile-username").textContent.replace(/\s|\!/g, '').split(",")[1];