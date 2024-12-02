from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from .models import City, GymAddress, Gym, Days, MuscleGroups, Exercises, WorkoutPlans
from .serializers import CitySerializer, GymAddressSerializer, GymSerializer, DaysSerializer, MuscleGroupsSerializer, ExercisesSerializer, WorkoutPlansSerializer
import json

def MainPage(request):
   return render(request, "base.html")

def GymSearch(request):
   allGymData = Gym.objects.all()
   serializedGymData = GymSerializer(allGymData, many=True).data
   return render(request, "budgetBiceps.html", {"allGymData": serializedGymData})

def getSerializedGymAndCityData(request):
   allGymData = Gym.objects.all()
   serializedGymData = GymSerializer(allGymData, many=True).data
   return JsonResponse(serializedGymData, safe=False)

def AboutUs(request):
   return render(request, "aboutUs.html")

def PremiumPump(request):
   days = Days.objects.all()
   workoutPlans = WorkoutPlans.objects.all()
   exercises = []
   for workoutPlan in workoutPlans:
      exercises.append(Exercises.objects.filter(name=workoutPlan.exerciseName).values())
   for exercise in exercises:
      print(exercise[0])
   return render(request, "premiumPump.html", {"days": days, "workoutPlans": workoutPlans, "exercises": exercises})

def CreateWorkoutPlan(request):
   days = Days.objects.all()
   muscleGroups = MuscleGroups.objects.all()
   exercises = Exercises.objects.all()
   workoutPlans = WorkoutPlans.objects.all()

   if request.method == "POST":
      exercisesJson = json.loads(request.body.decode('utf-8'))
      newWorkoutPlan = []
      for exercise in exercisesJson:
         userName = User.objects.get(username=exercise["user_name"])
         day = days.get(name=exercise["day"])
         muscleGroup = muscleGroups.get(name=exercise["muscle_group_name"])
         exerciseName = exercises.get(name=exercise["exercise_name"]) 
         series = exercise["series"]
         reps = exercise["reps"]
         comment = exercise["comment"]
         newWorkoutPlan.append(WorkoutPlans(userName=userName, day=day, muscleGroupName=muscleGroup, exerciseName=exerciseName, series=series, reps=reps, comment=comment))
      previousExercises = [exercise.exerciseName for exercise in workoutPlans if newWorkoutPlan[0].day == exercise.day]

      for newExercise in newWorkoutPlan:
         if newExercise.exerciseName not in previousExercises:
            newExercise.save()

      return redirect("PremiumPump")

   elif request.method == "GET":
      getCurrentDay = Days.objects.get(name=request.GET.get("day"))

      return render(request, "creatingWorkoutPlan.html", {"currentDay": getCurrentDay, "muscleGroups": muscleGroups, "exercises": exercises, "workoutPlans": workoutPlans})

def DeleteExercise(request, id):
   workoutPlans = WorkoutPlans.objects.all()
   workoutPlans.filter(id=id).delete()
   return redirect("PremiumPump")

def getSerializedWorkoutPlansData(request):
   workoutPlans = WorkoutPlans.objects.all()
   serializedWorkoutPlans = WorkoutPlansSerializer(workoutPlans, many=True).data
   return JsonResponse(serializedWorkoutPlans, safe=False)

def getSerializedExercisesData(request):
   exercises = Exercises.objects.all()
   serializedExercises = ExercisesSerializer(exercises, many=True).data
   return JsonResponse(serializedExercises, safe=False)   
