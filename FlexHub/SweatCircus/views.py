from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
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
   return render(request, "premiumPump.html")
