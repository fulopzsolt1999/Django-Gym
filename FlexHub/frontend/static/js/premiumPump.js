async function fetchAllData() {
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

document.addEventListener("DOMContentLoaded", async () => {
   const USER = document.querySelector("#profile-username").textContent.replace(/\s|\!/g, '').split(",")[1];
   const allWorkoutPlans = await fetchAllData();
});