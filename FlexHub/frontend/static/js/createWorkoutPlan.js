async function fetchWorkoutsData() {
   const response = await fetch("http://127.0.0.1:8000/getSerializedWorkoutPlansData");
   const result = await response.json();
   return result.map(gym => ({
      id: gym.id,
      userName: gym.userName,
      day: gym.day,
      muscleGroup: gym.muscleGroupName,
      exercise: gym.exerciseName,
      reps: gym.reps,
      series: gym.series,
      comment: gym.comment
   }));
}

async function FetchExercisesData() {
   const response = await fetch("http://127.0.0.1:8000/getSerializedExercisesData");
   const result = await response.json();
   return result.map(exercise => ({
      id: exercise.id,
      name: exercise.name,
      muscleGroup: exercise.muscle_group,
      image: exercise.image,
      video: exercise.video
   }));   
}

document.addEventListener("DOMContentLoaded", async () => {
   const exercises = await FetchExercisesData();
   const muscleGroup = document.querySelector("#muscle-groups");
   if (muscleGroup) {
      muscleGroup.addEventListener("input", () => {
         const select = document.querySelector("#exercises");
         if (muscleGroup.value !== "") {
            select.innerHTML = "";
            const selectedMuscleGroup = muscleGroup.value;
            const filteredExercises = exercises.filter(exercise => exercise.muscleGroup.name === selectedMuscleGroup
            );
            
            filteredExercises.forEach(exercise => {
               const option = document.createElement("option");
               option.value = exercise.name;
               option.textContent = exercise.name;
               select.appendChild(option);
            });
         } else {
            select.innerHTML = "";
         }
      });
   }
});

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
   const div = document.createElement("div");
   const li = document.createElement("li");
   const button = document.createElement("button");
   li.textContent = `${muscleGroup} - ${exercise} - ${series}x${reps} - ${comment}`;
   button.type = "button";
   button.textContent = "Törlés";
   button.setAttribute("onclick", `DeleteExercise('${exercise.split(" ").join("").split("(")[0]}')`);
   div.className = "ui-state-default show-exercises my-3";
   div.id = `ex-${exercise.split(" ").join("").split("(")[0]}`;
   div.appendChild(li);
   div.appendChild(button);
   document.querySelector("#sortable").appendChild(div);
});

function DeleteExercise(exerciseId) {
   const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;   
   if (Number(exerciseId)) {
      const div = document.querySelector(`#ex-${exerciseId}`);
      const request = new Request(
         `http://127.0.0.1:8000/deleteExercise/${exerciseId}`,
         {headers: {'X-CSRFToken': csrftoken}}
      );
      fetch(request, {
         method: "DELETE"
      }).then(() => {
         window.location.reload();
      });
      div.remove();
   } else {
      const div = document.querySelector(`#ex-${exerciseId}`);
      div.remove();
   }
}

document.querySelector("#save-workout-plan").addEventListener("click", () => {
   const workoutExercises = document.querySelectorAll("#sortable li");
   const workoutPlanData = Array.from(workoutExercises).map(li => {
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
      document.querySelector("#workout-plan-form").reset();
      window.location.reload();
   });
})