from django.shortcuts import render, redirect
from .models import City, GymAddress, Gym, BodyGoals, User
import bcrypt

def MainPage(request):
   return render(request, "base.html")

def GymSearch(request):
   allGymData = Gym.objects.all()
   return render(request, "budgetBiceps.html", {"allGymData": allGymData})

def AboutUs(request):
   return render(request, "aboutUs.html")

def PremiumPump(request):
   return render(request, "premiumPump.html")
