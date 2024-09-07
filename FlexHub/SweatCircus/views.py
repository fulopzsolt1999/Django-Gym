from django.shortcuts import render, redirect
from .models import City, GymAddress, Gym, Days, MuscleGroups, Exercises, WorkoutPlans

def MainPage(request):
   return render(request, "base.html")

def GymSearch(request):
   allGymData = Gym.objects.all()
   allCityData = City.objects.all().order_by('name')
   return render(request, "budgetBiceps.html", {"allGymData": allGymData, "allCityData": allCityData})

def AboutUs(request):
   return render(request, "aboutUs.html")

def PremiumPump(request):
   return render(request, "premiumPump.html")
