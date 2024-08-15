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
      name = request.POST.get("name")
      weight = request.POST.get("weight")
      height = request.POST.get("height")
      body_goals = request.POST.get("goal")
      comment = request.POST.get("comment") if request.POST.get("comment") else "-"
      for goal in bodyGoals:
         if goal.name == body_goals:
            body_goals = goal
      if all([email, hashedPW, name, weight, height, body_goals, comment]):
         newUser = User(email=email, password=hashedPW, name=name, weight=weight, height=height, body_goals=body_goals, comment=comment)
         newUser.save()
      return redirect("Login")
   else:
      return render(request, "signup.html", {"bodyGoals": bodyGoals})
   return render(request, "signup.html")

class CustomLoginView(LoginView):
    template_name = "login.html"

def Login(request):
   return render(request, "login.html")

def AboutUs(request):
   return render(request, "aboutUs.html")
