from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView
from .models import City, GymAddress, Gym, BodyGoals, User
import bcrypt

def MainPage(request):
   return render(request, "home.html")

def GymSearch(request):
   allGymData = Gym.objects.all()
   return render(request, "budgetBiceps.html", {"allGymData": allGymData})

def PremiumPump(request):
   return render(request, "premiumPump.html")

def Signup(request):
   bodyGoals = BodyGoals.objects.all()

   if request.method == "POST":
      email = request.POST.get("email")
      hashedPW = bcrypt.hashpw(request.POST.get("password").encode("utf-8"), bcrypt.gensalt())
      name = f"{request.POST.get("last-name")} {request.POST.get('first-name')}"
      weight = request.POST.get("weight")
      height = request.POST.get("height")
      body_goals = request.POST.get("goal")

      for goal in bodyGoals:
         if goal.name == body_goals:
            body_goals = goal

      if all([email, hashedPW, name, weight, height, body_goals]):
         User(email=email, password=hashedPW, name=name, weight=weight, height=height, body_goals=body_goals).save()

      return redirect("Login")
   
   else:
      return render(request, "signup.html", {"bodyGoals": bodyGoals})

def Login(request):
   return render(request, "login.html")

def ForgotPassword(request):
   return render(request, "forgotPassword.html")

def AboutUs(request):
   return render(request, "aboutUs.html")
