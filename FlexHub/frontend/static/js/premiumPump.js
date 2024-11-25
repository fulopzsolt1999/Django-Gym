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
   const allWorkoutPlans = await fetchWorkoutsData();
   const exercises = await FetchExercisesData();
   const muscleGroup = document.querySelector("#muscleGroup");

   if (muscleGroup) {
      muscleGroup.addEventListener("input", () => {
         const select = document.querySelector("#exercises");
         if (muscleGroup.value !== "") {
            select.innerHTML = "";
            const selectedMuscleGroup = muscleGroup.value;
           /*  const ENExercises = exercises.map(exercise => exercise.split(" (")[0]);
            const HUExercises = exercises.map(exercise => exercise.split(" (")[1].pop());
            const filteredENExercises = ENExercises.filter(exercise => exercise.muscleGroup.name === selectedMuscleGroup
            );
            const filteredHUExercises = HUExercises.filter(exercise => exercise.muscleGroup.name === selectedMuscleGroup
            ); */
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

function DeleteWorkoutPlan(workoutPlanId) {
   const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
   const request = new Request(
      `http://127.0.0.1:8000/deleteWorkoutPlan/${workoutPlanId}`,
      {headers: {'X-CSRFToken': csrftoken}}
   );
   fetch(request, {
      method: "DELETE"
   }).then(() => {
      window.location.reload();
   });
}