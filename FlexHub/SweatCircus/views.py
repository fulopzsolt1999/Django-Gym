from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from .models import City, GymAddress, Gym, Days, MuscleGroups, Exercises, WorkoutPlans
from .serializers import CitySerializer, GymAddressSerializer, GymSerializer, DaysSerializer, MuscleGroupsSerializer, ExercisesSerializer, WorkoutPlansSerializer

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
   muscleGroups = MuscleGroups.objects.all()
   exercises = Exercises.objects.all()
   workoutPlans = WorkoutPlans.objects.all()

   if request.method == "POST":
      userName = User.objects.get(username=request.user.username)
      
      dayForm = days.get(name=request.POST.get("day"))
      muscleGroupForm = muscleGroups.get(name=request.POST.get("muscleGroups"))
      exerciseForm = exercises.get(name=request.POST.get("exercise"))
      seriesForm = request.POST.get("workoutPlanSeries")
      repsForm = request.POST.get("workoutPlanReps")
      commentForm = request.POST.get("comment")
      
      newWorkoutPlan = WorkoutPlans(userName=userName, day=dayForm, muscleGroupName=muscleGroupForm, exerciseName=exerciseForm, series=seriesForm, reps=repsForm, comment=commentForm)
      newWorkoutPlan.save()

      return redirect("PremiumPump")
      
   return render(request, "premiumPump.html", {"days": days, "muscleGroups": muscleGroups, "workoutPlans": workoutPlans})

def deleteWorkoutPlan(request, id):
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
