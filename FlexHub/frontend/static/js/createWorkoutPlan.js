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
   const allExercises = await FetchExercisesData();
   const muscleGroup = document.querySelector("#muscle-groups");
   const selectExercise = document.querySelector("#exercises");
   document.querySelector("#workout-plan-form").reset();

   muscleGroup.addEventListener("input", () => {
      if (muscleGroup.value !== "") {
         document.querySelector("#exercises-form-container").hidden = false;
         selectExercise.innerHTML = "";
         const selectedMuscleGroup = muscleGroup.value;
         const filteredExercises = allExercises.filter(exercise => exercise.muscleGroup.name === selectedMuscleGroup
         );
         const option = document.createElement("option");
         option.value = "";
         option.textContent = "Válassz...";
         selectExercise.appendChild(option);
         filteredExercises.forEach(exercise => {
            const option = document.createElement("option");
            option.value = exercise.name;
            option.textContent = exercise.name;
            selectExercise.appendChild(option);
         });
      } else {
         document.querySelector("#exercises-form-container").hidden = true;
         const imgVideoContainer = document.querySelector("#exercise-image-video");
         imgVideoContainer.setAttribute("hidden", true);
      }
   });

   selectExercise.addEventListener("input", () => {
      const imgVideoContainer = document.querySelector("#exercise-image-video");
      imgVideoContainer.innerHTML = "";
      const selectedExerciseName = selectExercise.value;
      const exercise = allExercises.find(exercise => exercise.name === selectedExerciseName);
      if (exercise) {
         const img = document.createElement("img");
         const a = document.createElement("a");
         const h4 = document.createElement("h4");
         h4.textContent = "Kattints a képre, ha érdekel a videó a gyakorlat bemutatásáról!";
         a.href = exercise.video;
         a.target = "_blank";
         img.src = exercise.image;
         img.alt = exercise.name;
         img.width = 400;
         img.height = 300;
         a.appendChild(img);
         imgVideoContainer.appendChild(h4);
         imgVideoContainer.appendChild(a);
      }
      imgVideoContainer.removeAttribute("hidden");
   });
});

$(function() {
   $("#sortable").sortable();
   $("#sortable").disableSelection();
});

document.querySelector("#add-exercise").addEventListener("click", () => {
   const addedDDValues = [
      document.querySelector("#muscle-groups").value,
      document.querySelector("#workout-plan-reps").value,
      document.querySelector("#workout-plan-series").value,
      document.querySelector("#comment").value
   ]
   const exercise = document.querySelector("#exercises").value;
   const engExerciseNameInOne = exercise.split(" ").join("").split("(")[0];
   
   const div = document.createElement("div");
   const li = document.createElement("li");
   const dl = document.createElement("dl");
   const dt = document.createElement("dt");
   const button = document.createElement("button");

   dt.textContent = exercise;
   dt.classList.add("border-bottom", "border-3", "mb-2");
   dl.appendChild(dt);
   addedDDValues.forEach(value => {
      const dd = document.createElement("dd");
      dd.textContent = `- ${value}`;
      dd.classList.add("ps-3");
      dl.appendChild(dd);
   });

   li.classList.add("ps-3", "pt-2");
   li.appendChild(dl);

   button.type = "button";
   button.textContent = "Törlés";
   button.classList.add("btn", "btn-danger");
   button.setAttribute("onclick", `DeleteExercise('${exercise.engExerciseNameInOne}')`);

   div.className = "ui-state-default show-exercises my-3";
   div.id = `ex-${engExerciseNameInOne}`;
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