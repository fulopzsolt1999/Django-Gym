from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import LoginView
from .models import City, GymAddress, Gym 

def MainPage(request):
   return render(request, "home.html")

def GymSearch(request):
   allGymData = Gym.objects.all()
   return render(request, "budgetBiceps.html", {"allGymData": allGymData})

def PremiumPump(request):
   return render(request, "premiumPump.html")

def Signup(request):
   if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")
   else:
        form = UserCreationForm()
   return render(request, "signup.html", {"form": form})

class CustomLoginView(LoginView):
    template_name = "login.html"

def Login(request):
   return render(request, "login.html")
