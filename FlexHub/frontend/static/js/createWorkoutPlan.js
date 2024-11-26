$(function() {
   $("#sortable").sortable();
   $("#sortable").disableSelection();
});

document.querySelector("#add-exercise").addEventListener("click", () => {
   const muscleGroup = document.querySelector("#muscle-groups").value;
   const exercise = document.querySelector("#exercises").value;
   const reps = document.querySelector("#workout-plan-reps").value;
   const series = document.querySelector("#workout-plan-series").value;
   const comment = document.querySelector("#comment").value;
   const li = document.createElement("li");
   li.textContent = `${muscleGroup} - ${exercise} - ${series}x${reps} - ${comment}`;
   document.querySelector("#sortable").appendChild(li);
});

function DeleteExercise(id) {
   const li = document.querySelector(`#ex-${id}`).parentElement;
   li.remove();
}

document.querySelector("#save-workout-plan").addEventListener("click", () => {
   const workoutPlans = document.querySelectorAll("#sortable li");
   const workoutPlanData = Array.from(workoutPlans).map(li => {
      return {
         user_name: document.querySelector("#profile-username").textContent.replace(/\s|\!/g, '').split(",")[1],
         day: document.querySelector("#current-day").value,
         muscle_group_name: li.textContent.split(" - ")[0],
         exercise_name: li.textContent.split(" - ")[1],
         series: li.textContent.split(" - ")[2].split("x")[0],
         reps: li.textContent.split(" - ")[2].split("x")[1].split(" - ")[0],
         comment: li.textContent.split(" - ")[3]
      }
   });
   const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
   const request = new Request(
      "http://127.0.0.1:8000/createWorkoutPlan/",
      {headers: {'X-CSRFToken': csrftoken}}
   );
   fetch(request, {
      method: "POST",
      body: JSON.stringify(workoutPlanData)
   }).then(() => {
      window.location.reload();
   });
})