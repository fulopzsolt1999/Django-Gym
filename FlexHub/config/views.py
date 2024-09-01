from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django import forms
from django.shortcuts import render, redirect
from pyexpat.errors import messages

class RegistrationForm(UserCreationForm):
   email = forms.EmailField(required=True)

   class Meta:
      model = User
      fields = ("username", "email", "first_name", "last_name", "password1", "password2")

def registration_view(request):
   if request.method == "POST":
      form = RegistrationForm(request.POST)
      if form.is_valid():
         username = form.cleaned_data.get("username")
         email = form.cleaned_data.get("email")
         # Check if username already exists
         if User.objects.filter(username=username).exists():
            messages.error(request, "Username is already taken.")
            return redirect('register')

         # Check if email already exists
         if User.objects.filter(email=email).exists():
            messages.error(request, "Email is already registered.")
            return redirect('register')
         
         form.save()
         return render(request, "register.html")
   else:
      form = RegistrationForm()
   return render(request, "registration/register.html", {"form": form})